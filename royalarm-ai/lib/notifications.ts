import type { Preferences } from "./learning/schema";
export function reminderDue(prefs: Preferences, now: Date) {
  if (!prefs.reminders) return false;
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: prefs.timezone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (name: string) => parts.find((part) => part.type === name)?.value ?? "";
  const day = `${get("year")}-${get("month")}-${get("day")}`; const hour = Number(get("hour"));
  const quiet = prefs.quietStart === prefs.quietEnd ? false : prefs.quietStart < prefs.quietEnd ? hour >= prefs.quietStart && hour < prefs.quietEnd : hour >= prefs.quietStart || hour < prefs.quietEnd;
  if (quiet || prefs.lastReminderDate === day || `${get("hour")}:${get("minute")}` < prefs.reminderTime) return false;
  return day;
}
export async function enableNotifications() {
  if (!("Notification" in window)) return "Browser notifications are unavailable. In-app reminders are enabled.";
  const permission = await Notification.requestPermission();
  return permission === "granted" ? "Notifications enabled while this app is open." : "Notification permission was not granted. In-app reminders are enabled.";
}
export function notifyPractice(count: number) {
  if ("Notification" in window && Notification.permission === "granted") {
    try { const notification = new Notification("RoyalArm AI · Practice time", { body: `A few minutes of English? ${count} saved words are due for review.`, tag: "royalarm-practice" }); notification.onclick = () => { window.focus(); notification.close(); }; } catch { /* in-app reminder remains available */ }
  }
}
