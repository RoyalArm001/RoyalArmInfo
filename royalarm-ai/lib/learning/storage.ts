import { z } from "zod";
import { getValue, openDatabase, putValue, readAll, STORES } from "../db";
import { DEFAULT_PREFERENCES, entrySchema, mistakeSchema, preferencesSchema, progressSchema, type LearningEntry, type Mistake, type Preferences, type Progress } from "./schema";

export async function getPreferences() { return preferencesSchema.parse((await getValue("settings", "preferences")) ?? DEFAULT_PREFERENCES); }
export const setPreferences = (prefs: Preferences) => putValue("settings", preferencesSchema.parse(prefs), "preferences");
export const saveEntry = (entry: LearningEntry) => putValue("entries", { ...entrySchema.parse(entry), normalized: entry.term.toLowerCase().trim() });
export async function searchEntries(query = "", kind = "all"): Promise<LearningEntry[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("entries"); const store = tx.objectStore("entries"); const q = query.toLowerCase().trim();
    const request = q ? store.index("normalized").getAll(IDBKeyRange.bound(q, q + "\uffff"), 100) : kind !== "all" ? store.index("kind").getAll(kind, 100) : store.getAll(undefined, 100);
    tx.oncomplete = () => resolve(request.result.filter((entry: LearningEntry) => kind === "all" || entry.kind === kind)); tx.onerror = () => reject(tx.error);
  });
}
export async function dueReviews(now = Date.now()): Promise<Progress[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => { const tx = db.transaction("progress"); const request = tx.objectStore("progress").index("due").getAll(IDBKeyRange.upperBound(now), 100); tx.oncomplete = () => resolve(request.result); tx.onerror = () => reject(tx.error); });
}
export async function reviewWord(id: string, grade: "again" | "good" | "easy") {
  const previous = await getValue<Progress>("progress", id);
  const interval = Math.min(3650, grade === "again" ? 0 : grade === "easy" ? Math.max(4, (previous?.interval ?? 1) * 3) : Math.max(1, (previous?.interval ?? 0) * 2));
  const progress: Progress = { id, due: Date.now() + (interval ? interval * 86400000 : 10 * 60000), interval, repetitions: (previous?.repetitions ?? 0) + 1, learned: grade !== "again" };
  await putValue("progress", progress); return progress;
}
export async function learnEntry(entry: LearningEntry) {
  await saveEntry(entry);
  if (!(await getValue("progress", entry.id))) await putValue("progress", { id: entry.id, due: Date.now(), interval: 0, repetitions: 0, learned: false });
}
export async function saveMistake(original: string, correction: string) {
  const id = original.toLowerCase().trim().slice(0, 140); const old = await getValue<Mistake>("mistakes", id);
  await putValue("mistakes", mistakeSchema.parse({ id, original, correction, count: (old?.count ?? 0) + 1, updatedAt: Date.now() }));
}
export async function learningContext(prefs: Preferences) {
  const [mistakes, reviews] = await Promise.all([readAll<Mistake>("mistakes"), dueReviews()]);
  const words = await Promise.all(reviews.slice(0, 8).map((review) => getValue<LearningEntry>("entries", review.id)));
  return { mode: prefs.mode, level: prefs.level, topic: prefs.topic, mistakes: mistakes.sort((a, b) => b.count - a.count).slice(0, 3).map(({ original, correction }) => ({ original, correction })), words: words.filter((word) => word && word.term.length <= 100).map((word) => word!.term) };
}
export async function importPack(onProgress: (message: string) => void) {
  const manifest = z.object({ version: z.string(), chunks: z.array(z.object({ path: z.string().regex(/^\/packs\/[\w-]+\.json$/), count: z.number().int().positive() })).max(100) }).passthrough().parse(await (await fetch("/packs/manifest.json")).json());
  let imported = 0;
  for (const chunk of manifest.chunks) {
    const response = await fetch(chunk.path); if (!response.ok) throw new Error("Pack download failed. You can retry safely.");
    const entries = z.array(entrySchema).max(500).parse(await response.json());
    if (entries.length !== chunk.count) throw new Error("Learning pack count mismatch.");
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => { const tx = db.transaction("entries", "readwrite"); for (const entry of entries) tx.objectStore("entries").put({ ...entry, normalized: entry.term.toLowerCase() }); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); });
    imported += entries.length; onProgress(`Imported ${imported} entries`);
  }
  await putValue("settings", { version: manifest.version, imported }, "pack"); return imported;
}
const messageSchema = z.object({ id: z.string().max(150), role: z.enum(["user", "assistant"]), content: z.string().max(16000), status: z.enum(["complete", "streaming", "interrupted", "error"]), error: z.string().max(2000).optional(), source: z.enum(["text", "voice", "greeting"]).optional() }).strict();
const conversationSchema = z.object({ id: z.string().max(150), title: z.string().max(200), updatedAt: z.number().finite(), messages: z.array(messageSchema).max(10000) }).strict();
const exportSchema = z.object({ format: z.literal("royalarm-learning"), version: z.literal(2), conversations: z.array(conversationSchema).max(2000), entries: z.array(entrySchema).max(30000), progress: z.array(progressSchema).max(30000), mistakes: z.array(mistakeSchema).max(10000), preferences: preferencesSchema }).strict();
export async function exportData() {
  const [conversations, entries, progress, mistakes, preferences] = await Promise.all([readAll("conversations"), readAll("entries"), readAll("progress"), readAll("mistakes"), getPreferences()]);
  return exportSchema.parse({ format: "royalarm-learning", version: 2, conversations, entries, progress, mistakes, preferences });
}
export async function importData(text: string) {
  if (new TextEncoder().encode(text).length > 20 * 1024 * 1024) throw new Error("Import limit is 20 MiB.");
  const data = exportSchema.parse(JSON.parse(text));
  for (const name of ["conversations", "entries", "progress", "mistakes"] as const) if (new Set(data[name].map((item) => item.id)).size !== data[name].length) throw new Error("Duplicate IDs in import.");
  const db = await openDatabase();
  // Validate everything before a single atomic merge. Existing IDs are replaced.
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(["conversations", "entries", "progress", "mistakes", "settings"], "readwrite");
    for (const item of data.conversations) tx.objectStore("conversations").put({ ...item, messages: item.messages.map((m) => m.status === "streaming" ? { ...m, status: "interrupted" } : m) });
    for (const entry of data.entries) tx.objectStore("entries").put({ ...entry, normalized: entry.term.toLowerCase() });
    for (const name of ["progress", "mistakes"] as const) for (const item of data[name]) tx.objectStore(name).put(item);
    tx.objectStore("settings").put(data.preferences, "preferences");
    tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error);
  });
}
export async function deleteLocalData() {
  const db = await openDatabase();
  await new Promise<void>((resolve, reject) => { const tx = db.transaction([...STORES], "readwrite"); STORES.forEach((name) => tx.objectStore(name).clear()); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); });
}
