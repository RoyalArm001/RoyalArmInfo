import { GREETING } from "./identity";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  status: "complete" | "streaming" | "interrupted" | "error";
  error?: string;
  source?: string;
  createdAt?: number;
};

export type Conversation = {
  id: string;
  title: string;
  updatedAt: number;
  mode?: "chat" | "english" | "translation";
  templateId?: string;
  modelId?: string;
  messages: Message[];
};

export function newConversation(): Conversation {
  return {
    id: crypto.randomUUID(),
    title: "Նոր զրույց",
    updatedAt: Date.now(),
    mode: "chat",
    messages: [{
      id: crypto.randomUUID(),
      role: "assistant",
      content: GREETING,
      status: "complete",
      source: "greeting",
      createdAt: Date.now(),
    }],
  };
}

export type VocabularyItem = {
  id: string;
  word: string;
  meaning: string;
  context?: string;
  addedAt: number;
};

let database: Promise<IDBDatabase> | undefined;

function openDatabase() {
  if (!database) {
    database = new Promise<IDBDatabase>((resolve, reject) => {
      if (typeof window === "undefined" || !("indexedDB" in window)) {
        reject(new Error("IndexedDB is not supported in this environment"));
        return;
      }
      const request = indexedDB.open("royalarm-ai", 2);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("conversations")) {
          db.createObjectStore("conversations", { keyPath: "id" });
        }
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings");
        }
        if (!db.objectStoreNames.contains("vocabulary")) {
          db.createObjectStore("vocabulary", { keyPath: "id" });
        }
      };
      request.onsuccess = () => {
        request.result.onversionchange = () => {
          request.result.close();
          database = undefined;
        };
        resolve(request.result);
      };
      request.onerror = () => {
        database = undefined;
        reject(request.error);
      };
      request.onblocked = () => {
        database = undefined;
        reject(new Error("Local history is blocked by another tab."));
      };
    });
  }
  return database;
}

export async function loadHistory(): Promise<{
  conversations: Conversation[];
  activeId: string | null;
}> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(["conversations", "settings"], "readonly");
    const all = tx.objectStore("conversations").getAll();
    const active = tx.objectStore("settings").get("activeId");
    tx.oncomplete = () =>
      resolve({
        conversations: (all.result as Conversation[])
          .map((conversation) => ({
            ...conversation,
            messages: conversation.messages.map((message) =>
              message.status === "streaming"
                ? {
                    ...message,
                    status: "interrupted" as const,
                    error: "This reply was interrupted. You can retry it.",
                  }
                : message
            ),
          }))
          .sort((a, b) => b.updatedAt - a.updatedAt),
        activeId: typeof active.result === "string" ? active.result : null,
      });
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function loadVocabulary(): Promise<VocabularyItem[]> {
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction("vocabulary", "readonly");
      const req = tx.objectStore("vocabulary").getAll();
      tx.oncomplete = () => {
        const items = (req.result as VocabularyItem[]) || [];
        resolve(items.sort((a, b) => b.addedAt - a.addedAt));
      };
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  } catch {
    return [];
  }
}

async function write(store: string, operation: (store: IDBObjectStore) => void) {
  const db = await openDatabase();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(store, "readwrite");
    operation(tx.objectStore(store));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export const saveConversation = (value: Conversation) =>
  write("conversations", (store) => {
    store.put(value);
  });

export const deleteConversation = (id: string) =>
  write("conversations", (store) => {
    store.delete(id);
  });

export const saveActive = (id: string | null) =>
  write("settings", (store) => {
    store.put(id, "activeId");
  });

export const saveVocabularyItem = (item: VocabularyItem) =>
  write("vocabulary", (store) => {
    store.put(item);
  });

export const deleteVocabularyItem = (id: string) =>
  write("vocabulary", (store) => {
    store.delete(id);
  });
