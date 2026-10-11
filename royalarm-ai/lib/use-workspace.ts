"use client";
import { useEffect, useRef, useState } from "react";
import { deleteConversation, loadHistory, newConversation, saveActive, saveConversation, type Conversation, type Message } from "./history";
import { boundContext, LIMITS } from "./limits";
import { readReply } from "./read-stream";
import { DEFAULT_PREFERENCES, type Preferences } from "./learning/schema";
import { getPreferences, learningContext, setPreferences } from "./learning/storage";
import type { TemplateSummary } from "./catalog-types";

export function useWorkspace(onExpired?: () => void) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const current = useRef<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [prefs, setPrefs] = useState(DEFAULT_PREFERENCES);
  const run = useRef<AbortController | null>(null);
  const storageFailure = () => setError("Local storage is unavailable. Keep this tab open; changes may not survive reload. Check browser storage permissions and available space.");
  function update(conversation: Conversation, save = true) {
    current.current = [conversation, ...current.current.filter((c) => c.id !== conversation.id)].sort((a, b) => b.updatedAt - a.updatedAt);
    setConversations(current.current);
    if (save) void saveConversation(conversation).catch(storageFailure);
  }
  function select(id: string) { run.current?.abort(); setActiveId(id); void saveActive(id).catch(storageFailure); }
  function create(template?: TemplateSummary, modelId?: string) {
    const base = newConversation();
    const mode: Conversation["mode"] = template?.slug === "translation" ? "translation" : ["daily-english", "travel", "work-it-english", "voice-practice"].includes(template?.slug ?? "") ? "english" : "chat";
    const conversation = { ...base, ...(template ? { title: template.title, templateId: template.slug, mode } : {}), ...(modelId ? { modelId } : {}) };
    update(conversation); select(conversation.id); return conversation;
  }
  function setModel(modelId: string) {
    const conversation = current.current.find((item) => item.id === activeId);
    if (conversation) update({ ...conversation, modelId, updatedAt: Date.now() });
  }
  useEffect(() => {
    let mounted = true;
    Promise.all([loadHistory(), getPreferences()]).then(([history, settings]) => {
      if (!mounted) return;
      const rawList = history.conversations.length ? history.conversations : [newConversation()];
      const list = rawList.map((c) => ({
        ...c,
        messages: c.messages.map((m) =>
          m.status === "streaming"
            ? { ...m, status: "interrupted" as const, error: m.error || "This reply was interrupted. You can retry it." }
            : m
        ),
      }));
      current.current = list; setConversations(list); setPrefs(settings);
      const id = list.some((c) => c.id === history.activeId) ? history.activeId! : list[0].id; setActiveId(id);
      if (!history.conversations.length) void saveConversation(list[0]).catch(storageFailure);
      void saveActive(id).catch(storageFailure);
    }).catch(storageFailure).finally(() => { if (mounted) setReady(true); });
    return () => { mounted = false; run.current?.abort(); };
  }, []);
  function preferences(patch: Partial<Preferences>) {
    const next = { ...prefs, ...patch }; setPrefs(next); void setPreferences(next).catch(storageFailure);
  }
  async function remove(id: string) {
    if (run.current) return;
    try {
      await deleteConversation(id); const next = current.current.filter((c) => c.id !== id); current.current = next; setConversations(next);
      if (activeId === id) { if (next.length) select(next[0].id); else create(); }
    } catch { storageFailure(); }
  }
  function transcript(conversationId: string, id: string, role: "user" | "assistant", text: string) {
    const conversation = current.current.find((c) => c.id === conversationId); if (!conversation || !text.trim()) return;
    const message: Message = { id: `voice-${id}`, role, content: text.slice(0, LIMITS.outputChars), status: "complete", source: "voice" };
    const old = conversation.messages.findIndex((m) => m.id === message.id);
    const messages = [...conversation.messages]; if (old < 0) messages.push(message); else messages[old] = message;
    update({ ...conversation, messages, title: conversation.title === "New conversation" && role === "user" ? text.slice(0, 60) : conversation.title, updatedAt: Date.now() });
  }
  async function send(text: string, retry = false, voice = false, modelId?: string): Promise<string | undefined> {
    if (run.current || !ready || (!text.trim() && !retry)) return;
    if (text.trim().length > LIMITS.messageChars) { setError("Keep your message under 8,000 characters."); return; }
    let conversation = current.current.find((c) => c.id === activeId) ?? create(undefined, modelId);
    let messages = [...conversation.messages];
    if (retry) { const index = messages.findLastIndex((m) => m.role === "user"); if (index < 0) return; messages = messages.slice(0, index + 1); }
    else messages.push({ id: crypto.randomUUID(), role: "user", content: text.trim(), status: "complete", source: voice ? "voice" : "text" });
    const input = boundContext(messages.filter((m) => m.status === "complete" && m.source !== "greeting"));
    const answer: Message = { id: crypto.randomUUID(), role: "assistant", content: "", status: "streaming", source: voice ? "voice" : "text" };
    conversation = { ...conversation, ...(modelId ? { modelId } : {}), messages: [...messages, answer], title: messages.find((m) => m.role === "user")?.content.slice(0, 60) ?? conversation.title, updatedAt: Date.now() };
    update(conversation); setActiveId(conversation.id); setBusy(true); const abort = new AbortController(); run.current = abort;
    const id = conversation.id; let content = ""; let lastSave = Date.now();
    function patch(value: Partial<Message>, save = true) { const item = current.current.find((c) => c.id === id); if (item) update({ ...item, messages: item.messages.map((m) => m.id === answer.id ? { ...m, ...value } : m) }, save); }
    try {
      const tutor = await learningContext(prefs).catch(() => ({ mode: prefs.mode, level: prefs.level, topic: prefs.topic, mistakes: [], words: [] }));
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: input, tutor, modelId: conversation.modelId, templateId: conversation.templateId }), signal: abort.signal });
      if (!response.ok) { if (response.status === 401 && onExpired) onExpired(); const body = await response.json().catch(() => ({})); throw new Error(body.error || "The request failed. Try again."); }
      const incomplete = await readReply(response, (delta) => { content += delta; const save = Date.now() - lastSave > 250; patch({ content }, save); if (save) lastSave = Date.now(); });
      if (!content) throw new Error("No text was returned. Try a shorter request or check the model.");
      patch({ content, status: incomplete ? "interrupted" : "complete", error: incomplete ? "The reply reached its limit. Retry or ask for a shorter reply." : undefined });
      return content;
    } catch (error) { patch({ content, status: abort.signal.aborted ? "interrupted" : "error", error: abort.signal.aborted ? "This reply was interrupted. You can retry it." : error instanceof Error ? error.message : "The connection failed. Try again." }); }
    finally { run.current = null; setBusy(false); }
  }
  return { conversations, activeId, active: conversations.find((c) => c.id === activeId), ready, busy, error, setError, prefs, preferences, create, setModel, select, remove, send, transcript, stop: () => run.current?.abort() };
}
