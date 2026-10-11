const CACHE = "royalarm-ai-static-v2";
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const response = await fetch("/offline", { cache: "reload" });
    if (!response.ok) throw new Error("Offline shell unavailable");
    await cache.put("/offline", response.clone());
    const html = await response.text();
    const assets = [...new Set([...html.matchAll(/(?:src|href)="([^" ]+)"/g)].map((match) => match[1]).filter((url) => url.startsWith("/_next/static/")))];
    await Promise.all(assets.map((url) => cache.add(url)));
    await self.skipWaiting();
  })());
});
self.addEventListener("activate", (event) => { event.waitUntil((async () => { for (const name of await caches.keys()) if (name.startsWith("royalarm-ai-static-") && name !== CACHE) await caches.delete(name); await self.clients.claim(); })()); });
self.addEventListener("fetch", (event) => {
  const request = event.request; const url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method !== "GET" || url.pathname.startsWith("/api/")) return;
  if (request.mode === "navigate") {
    // Never cache authenticated HTML, cookies, session checks, or provider responses.
    event.respondWith(fetch(request).catch(async () => (await caches.match("/offline")) || Response.error())); return;
  }
  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/packs/")) event.respondWith((async () => {
    const cache = await caches.open(CACHE); const cached = await cache.match(request); if (cached) return cached;
    const response = await fetch(request); if (response.ok) await cache.put(request, response.clone()); return response;
  })());
});
