"use client";

import { MessageSquare, Plus, Trash2, X, ExternalLink, Clock } from "lucide-react";
import type { Conversation } from "@/lib/history";
import { useState } from "react";

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  conversations,
  activeId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}: HistoryDrawerProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  return (
    <>
      {isOpen && (
        <div className="drawer-backdrop" onClick={onClose} aria-hidden="true" />
      )}

      <dialog
        className={`history-drawer desktop-sidebar mobile-sidebar ${isOpen ? "open" : ""}`}
        open={isOpen}
        aria-label="Զրույցների պատմություն (Conversation History)"
      >
        <div className="drawer-header">
          <div className="flex items-center gap-2.5">
            <span className="drawer-icon-wrap">
              <Clock size={18} className="text-cyan-300" />
            </span>
            <div>
              <h2 className="drawer-title">Զրույցների պատմություն</h2>
              <p className="drawer-subtitle">Saved on this device (IndexedDB)</p>
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

        {/* New Conversation Button */}
        <div className="px-5 py-3">
          <button
            className="new-chat-dock-btn"
            onClick={() => {
              onNewConversation();
              onClose();
            }}
            aria-label="New conversation"
          >
            <Plus size={16} />
            <span>New conversation</span>
          </button>
        </div>

        {/* Conversation List */}
        <div className="history-list-scroll">
          {conversations.length === 0 ? (
            <div className="empty-vocab-state">
              <p className="text-sm text-slate-400">Պատմությունը դատարկ է</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = conv.id === activeId;
              const isConfirming = confirmDeleteId === conv.id;
              return (
                <div
                  key={conv.id}
                  className={`history-item-card conversation-select ${isActive ? "active-item" : ""}`}
                  onClick={() => {
                    onSelectConversation(conv.id);
                    onClose();
                  }}
                >
                  <MessageSquare size={16} className="text-cyan-400/70 shrink-0 mt-0.5" />
                  <div className="history-item-info">
                    <span className="history-item-title">{conv.title || "Նոր զրույց"}</span>
                    <span className="history-item-time">
                      {new Date(conv.updatedAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {isConfirming ? (
                    <div
                      className="flex items-center gap-1.5 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-1 py-0.5"
                        onClick={() => {
                          onDeleteConversation(conv.id);
                          setConfirmDeleteId(null);
                        }}
                        aria-label="Delete conversation"
                      >
                        Delete conversation
                      </button>
                      <button
                        className="text-xs text-slate-400 hover:text-slate-200 px-1 py-0.5"
                        onClick={() => setConfirmDeleteId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      className="history-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setConfirmDeleteId(conv.id);
                      }}
                      title="Delete conversation"
                      aria-label={`Delete ${conv.title}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer with Links */}
        <div className="drawer-footer">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <a
              href="https://royalarm.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300 transition-colors"
            >
              royalarm.uk
            </a>
            <span>•</span>
            <a
              href="https://youtube.com/@RoyalArm001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
            >
              YouTube <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </dialog>
    </>
  );
}
