"use client";

import { useState } from "react";
import { BookOpen, X, Volume2, Trash2, Plus, Sparkles, Trophy, Flame } from "lucide-react";
import type { VocabularyItem } from "@/lib/history";

interface VocabularyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: VocabularyItem[];
  onDeleteItem: (id: string) => void;
  onAddItem: (word: string, meaning: string, context?: string) => void;
  totalConversations: number;
  activeMode: string;
}

export function VocabularyPanel({
  isOpen,
  onClose,
  items,
  onDeleteItem,
  onAddItem,
  totalConversations,
  activeMode,
}: VocabularyPanelProps) {
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  if (!isOpen) return null;

  function handleAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newWord.trim()) return;
    onAddItem(newWord.trim(), newMeaning.trim());
    setNewWord("");
    setNewMeaning("");
    setIsAdding(false);
  }

  function handleSpeakWord(word: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    // Determine language: if Armenian letters exist, use hy-AM; else en-US
    const hasArmenian = /[\u0530-\u058F]/.test(word);
    utterance.lang = hasArmenian ? "hy-AM" : "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Drawer / Bottom sheet panel */}
      <aside
        className="vocabulary-drawer"
        role="dialog"
        aria-label="Բառապաշար և առաջընթաց (Vocabulary & Progress)"
      >
        <div className="drawer-header">
          <div className="flex items-center gap-2.5">
            <span className="drawer-icon-wrap">
              <BookOpen size={18} className="text-cyan-300" />
            </span>
            <div>
              <h2 className="drawer-title">Բառապաշար և առաջընթաց</h2>
              <p className="drawer-subtitle">Vocabulary & Learning Progress</p>
            </div>
          </div>
          <button
            className="icon-btn-subtle"
            onClick={onClose}
            aria-label="Փակել (Close)"
          >
            <X size={20} />
          </button>
        </div>

        {/* Learning Progress Cards */}
        <div className="progress-stats-grid">
          <div className="stat-card">
            <div className="stat-icon-row">
              <Flame size={16} className="text-amber-400" />
              <span className="stat-label">Պահված բառեր</span>
            </div>
            <div className="stat-value">{items.length}</div>
            <div className="stat-caption">բառ / արտահայտություն</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-row">
              <Trophy size={16} className="text-cyan-400" />
              <span className="stat-label">Զրույցներ</span>
            </div>
            <div className="stat-value">{totalConversations}</div>
            <div className="stat-caption">ընդհանուր նիստ</div>
          </div>
        </div>

        {/* Add Word Button or Inline Form */}
        <div className="px-5 py-3">
          {!isAdding ? (
            <button
              className="add-word-btn"
              onClick={() => setIsAdding(true)}
              aria-label="Ավելացնել նոր բառ (Add new word)"
            >
              <Plus size={16} />
              <span>Ավելացնել նոր բառ</span>
            </button>
          ) : (
            <form onSubmit={handleAddSubmit} className="add-word-form">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-cyan-300">Նոր բառապաշար</span>
                <button
                  type="button"
                  className="text-xs text-slate-400 hover:text-slate-200"
                  onClick={() => setIsAdding(false)}
                >
                  Չեղարկել
                </button>
              </div>
              <input
                type="text"
                className="drawer-input"
                placeholder="Բառը կամ արտահայտությունը (օր.՝ Resilient)"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                autoFocus
                required
              />
              <input
                type="text"
                className="drawer-input"
                placeholder="Թարգմանություն / իմաստ (օր.՝ Տոկուն, ճկուն)"
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
              />
              <button type="submit" className="primary-pill-btn">
                Պահպանել բառը
              </button>
            </form>
          )}
        </div>

        {/* Word List */}
        <div className="vocabulary-list-scroll">
          {items.length === 0 ? (
            <div className="empty-vocab-state">
              <Sparkles size={28} className="text-cyan-400/40 mb-2" />
              <p className="text-sm font-medium text-slate-300">Դեռ բառեր չկան</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Զրույցի ընթացքում սեղմեք «Պահել բառը» կամ ավելացրեք ձեռքով՝ նոր բառապաշար կառուցելու համար։
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="vocab-card">
                <div className="vocab-card-main">
                  <div className="flex items-center gap-2">
                    <span className="vocab-word">{item.word}</span>
                    <button
                      className="icon-btn-mini"
                      onClick={() => handleSpeakWord(item.word)}
                      title="Լսել բառը"
                      aria-label={`Լսել ${item.word}`}
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                  {item.meaning && <p className="vocab-meaning">{item.meaning}</p>}
                  {item.context && <p className="vocab-context">«{item.context}»</p>}
                </div>
                <button
                  className="icon-btn-delete"
                  onClick={() => onDeleteItem(item.id)}
                  title="Ջնջել"
                  aria-label={`Ջնջել ${item.word}`}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
