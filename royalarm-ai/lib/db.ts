let database: Promise<IDBDatabase> | undefined;
export const DB_VERSION = 2;
export const STORES = ["conversations", "settings", "entries", "progress", "mistakes", "translations"] as const;
export type Store = typeof STORES[number];
export function openDatabase() {
  if (!database) database = new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open("royalarm-ai", DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (event.oldVersion < 1) { db.createObjectStore("conversations", { keyPath: "id" }); db.createObjectStore("settings"); }
      // Additive migration: existing history is never cleared.
      if (event.oldVersion < 2) {
        const entries = db.createObjectStore("entries", { keyPath: "id" }); entries.createIndex("normalized", "normalized"); entries.createIndex("kind", "kind");
        const progress = db.createObjectStore("progress", { keyPath: "id" }); progress.createIndex("due", "due");
        db.createObjectStore("mistakes", { keyPath: "id" }); db.createObjectStore("translations", { keyPath: "id" });
        request.transaction!.objectStore("conversations").createIndex("updatedAt", "updatedAt");
      }
    };
    request.onsuccess = () => { request.result.onversionchange = () => { request.result.close(); database = undefined; }; resolve(request.result); };
    request.onerror = () => { database = undefined; reject(request.error); };
    request.onblocked = () => { database = undefined; reject(new Error("Close other RoyalArm AI tabs, then reload to upgrade local storage.")); };
  });
  return database;
}
export async function readAll<T>(name: Store): Promise<T[]> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => { const tx = db.transaction(name); const request = tx.objectStore(name).getAll(); tx.oncomplete = () => resolve(request.result); tx.onerror = () => reject(tx.error); });
}
export async function getValue<T>(name: Store, key: IDBValidKey): Promise<T | undefined> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => { const tx = db.transaction(name); const request = tx.objectStore(name).get(key); tx.oncomplete = () => resolve(request.result); tx.onerror = () => reject(tx.error); });
}
export async function writeStore(name: Store, operation: (store: IDBObjectStore) => void) {
  const db = await openDatabase();
  return new Promise<void>((resolve, reject) => { const tx = db.transaction(name, "readwrite"); operation(tx.objectStore(name)); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error); });
}
export const putValue = (name: Store, value: unknown, key?: IDBValidKey) => writeStore(name, (store) => { if (key === undefined) store.put(value); else store.put(value, key); });
