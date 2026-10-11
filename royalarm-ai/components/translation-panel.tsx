"use client";
import { useState } from "react";
import { getValue, putValue } from "@/lib/db";
import { learnEntry } from "@/lib/learning/storage";
import type { TranslationResult } from "@/lib/translation/providers";
export function TranslationPanel({ initialText = "", context = "" }: { initialText?: string; context?: string }) {
  const [text, setText] = useState(initialText.slice(0, 8000)); const [source, setSource] = useState<"en" | "hy">(/[\u0530-\u058f]/.test(initialText) ? "hy" : "en");
  const [result, setResult] = useState<TranslationResult | null>(null); const [busy, setBusy] = useState(false); const [error, setError] = useState(""); const [note, setNote] = useState("");
  async function translate() {
    if (busy || !text.trim()) return; setBusy(true); setError(""); setNote(""); setResult(null);
    try {
      const input = { text: text.trim(), source, target: source === "en" ? "hy" : "en", context: context.slice(0, 2000) };
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(input))); const id = Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
      const cached = await getValue<{ result: TranslationResult }>("translations", id).catch(() => undefined);
      if (cached) { setResult(cached.result); setNote("Saved translation · available offline"); return; }
      const response = await fetch("/api/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Translation is unavailable.");
      setResult(data);
      if (data.cacheable) await putValue("translations", { id, result: data }).catch(() => setNote("Translation worked, but the local cache is unavailable."));
    } catch (error) { setError(error instanceof Error ? error.message : "Translation failed. Try again."); }
    finally { setBusy(false); }
  }
  async function save() {
    if (!result?.cacheable) return;
    try { await learnEntry({ id: `saved-${crypto.randomUUID()}`, kind: text.length < 60 && !text.includes(" ") ? "word" : "phrase", term: source === "en" ? text : result.translation.slice(0, 4000), translation: (source === "en" ? result.translation : text).slice(0, 2000), definition: "", example: result.example.slice(0, 4000), level: "A1", estimatedLevel: true, source: "Personal OpenAI translation", license: "Personal material" }); setNote("Saved for vocabulary review."); } catch { setError("Could not save this translation locally."); }
  }
  return <section className="utility-panel"><h2>Armenian ↔ English</h2><div className="toolbar"><label>Direction <select aria-label="Translation direction" value={source} onChange={(e) => setSource(e.target.value as "en" | "hy")}><option value="en">English → Հայերեն</option><option value="hy">Հայերեն → English</option></select></label></div><textarea aria-label="Text to translate" maxLength={8000} value={text} onChange={(e) => setText(e.target.value)} rows={4} dir="auto" /><button className="accent-button" disabled={busy || !text.trim()} onClick={() => void translate()}>{busy ? "Translating…" : "Translate text"}</button>
    {error && <p role="alert" className="error-text">{error}</p>}{result && <div className="translation-result"><p dir="auto">{result.translation}</p>{result.example && <p dir="auto">{result.example}</p>}<small>{result.provider === "google" ? "Translated by Google" : "OpenAI translation"}</small>{result.note && <p className="subtle">{result.note}</p>}{result.cacheable && <button onClick={() => void save()}>Save translation for review</button>}</div>}{note && <p role="status">{note}</p>}
  </section>;
}
