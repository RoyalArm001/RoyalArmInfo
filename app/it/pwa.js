export const APP_ORIGIN = "https://it.royalarm.uk";

export function isOfficialAppHost() {
  return window.location.hostname === "it.royalarm.uk";
}

export function goToOfficialApp(path = "/") {
  const next = new URL(path, APP_ORIGIN);
  window.location.assign(next.toString());
}

export function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches
    || window.navigator.standalone === true;
}

export function isIosDevice() {
  return /iPad|iPhone|iPod/.test(window.navigator.userAgent)
    || (window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1);
}

export async function registerAppWorker() {
  if (!("serviceWorker" in window.navigator) || !isOfficialAppHost()) return null;
  return window.navigator.serviceWorker.register("/sw.js", {
    scope: "/",
    updateViaCache: "none",
  });
}

function urlBase64ToUint8Array(value) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = `${value}${padding}`.replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
}

export async function enablePushNotifications() {
  if (!("Notification" in window) || !("serviceWorker" in window.navigator)) {
    return "unsupported";
  }

  const permission = await window.Notification.requestPermission();
  if (permission !== "granted") return permission;

  const registration = await window.navigator.serviceWorker.ready;
  try {
    const keyResponse = await fetch("/api/push", { cache: "no-store" });
    if (keyResponse.ok) {
      const { publicKey } = await keyResponse.json();
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      await fetch("/api/push", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(subscription),
      });
    }
  } catch (_) {}

  await registration.showNotification("RoyalArm IT", {
    body: "Notifications are on. You will get updates in this app.",
    icon: "/assets/royalarm-logo-192.png",
    data: { url: APP_ORIGIN + "/" },
  });

  return "granted";
}
