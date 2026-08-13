self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("push", (event) => {
  let data = {
    title: "RoyalArm IT",
    body: "You have a new update.",
    url: "https://it.royalarm.uk/",
  };

  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch (_) {}

  event.waitUntil(
    self.registration.showNotification(data.title || "RoyalArm IT", {
      body: data.body || "You have a new update.",
      icon: "/assets/royalarm-logo-192.png",
      data: { url: data.url || "https://it.royalarm.uk/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "https://it.royalarm.uk/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((client) => client.url.startsWith(self.location.origin));
      if (existing) {
        existing.focus();
        if ("navigate" in existing) {
          return existing.navigate(url.startsWith("http") ? url : `https://it.royalarm.uk${url}`);
        }
        return undefined;
      }
      return self.clients.openWindow(url.startsWith("http") ? url : `https://it.royalarm.uk${url}`);
    }),
  );
});
