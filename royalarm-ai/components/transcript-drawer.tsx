"use client";

import { X, MessageSquare, Bot, User as UserIcon, Copy, Check } from "lucide-react";
import type { Message } from "@/lib/history";
import { MessageMarkdown } from "./markdown";
import { useState } from "react";

interface TranscriptDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  messages: Message[];
}

export function TranscriptDrawer({ isOpen, onClose, title, messages }: TranscriptDrawerProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  async function handleCopy(id: string, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />

      <aside
        className="transcript-drawer"
        role="dialog"
        aria-label="Զրույցի ամբողջական պատմություն (Full Transcript)"
      >
        <div className="drawer-header">
          <div className="flex items-center gap-2.5">
            <span className="drawer-icon-wrap">
              <MessageSquare size={18} className="text-cyan-300" />
            </span>
            <div>
              <h2 className="drawer-title">Ամբողջական պատմություն</h2>
              <p className="drawer-subtitle line-clamp-1">{title || "Զրույց"}</p>
            </div>
          </div>
          <button
            className="icon-btn-subtle"
            onClick={onClose}
            aria-label="Փակել պատմությունը"
          >
            <X size={20} />
          </button>
        </div>

        <div className="transcript-content-scroll">
          {messages.length === 0 ? (
            <div className="empty-vocab-state">
              <p className="text-sm text-slate-400">Զրույցում դեռ հաղորդագրություններ չկան։</p>
            </div>
          ) : (
            messages.map((m, idx) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id || idx}
                  className={`transcript-message-item ${isUser ? "from-user" : "from-assistant"}`}
                >
                  <div className="transcript-meta">
                    <div className="flex items-center gap-1.5 font-medium text-xs">
                      {isUser ? (
                        <>
                          <UserIcon size={13} className="text-cyan-400" />
                          <span className="text-cyan-200">Դուք (You)</span>
                        </>
                      ) : (
                        <>
                          <Bot size={13} className="text-violet-400" />
                          <span className="text-violet-200">RoyalArm AI</span>
                        </>
                      )}
                    </div>
                    <button
                      className="copy-button"
                      onClick={() => handleCopy(m.id, m.content)}
                      title="Պատճենել տեքստը"
                    >
                      {copiedId === m.id ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedId === m.id ? "Պատճենված է" : "Պատճենել"}</span>
                    </button>
                  </div>

                  <div className="transcript-body selectable-text">
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <MessageMarkdown content={m.content} />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </>
  );
}
