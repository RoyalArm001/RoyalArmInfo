import webpush from "web-push";
import { getRedis } from "./redis";

const vapidKey = "royalarm:vapid-keys";
const subscriptionKey = "royalarm:push-subscriptions";

function parseJson(value) {
  if (!value) return null;
  if (typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

async function getVapidKeys() {
  if (process.env.ROYALARM_IT_VAPID_PUBLIC_KEY && process.env.ROYALARM_IT_VAPID_PRIVATE_KEY) {
    return {
      publicKey: process.env.ROYALARM_IT_VAPID_PUBLIC_KEY,
      privateKey: process.env.ROYALARM_IT_VAPID_PRIVATE_KEY,
    };
  }

  const redis = getRedis();
  const stored = parseJson(await redis.get(vapidKey));
  if (stored?.publicKey && stored?.privateKey) return stored;

  const generated = webpush.generateVAPIDKeys();
  await redis.set(vapidKey, generated);
  return generated;
}

function configure(keys) {
  webpush.setVapidDetails("mailto:royalarm001@gmail.com", keys.publicKey, keys.privateKey);
}

export async function getPushPublicKey() {
  const keys = await getVapidKeys();
  configure(keys);
  return keys.publicKey;
}

export async function savePushSubscription(subscription) {
  if (!subscription?.endpoint) throw new Error("Invalid subscription");
  await getRedis().sadd(subscriptionKey, JSON.stringify(subscription));
}

export async function notifyAppUsers({ title, body, url = "https://it.royalarm.uk/" } = {}) {
  try {
    const keys = await getVapidKeys();
    configure(keys);
    const redis = getRedis();
    const subscriptions = await redis.smembers(subscriptionKey);
    const payload = JSON.stringify({
      title: title || "RoyalArm IT",
      body: body || "You have a new update.",
      url,
    });

    await Promise.all(subscriptions.map(async (raw) => {
      const encoded = typeof raw === "string" ? raw : JSON.stringify(raw);
      const subscription = parseJson(raw);
      if (!subscription?.endpoint) return;
      try {
        await webpush.sendNotification(subscription, payload);
      } catch (error) {
        if (error?.statusCode === 404 || error?.statusCode === 410) {
          await redis.srem(subscriptionKey, encoded);
        }
      }
    }));
  } catch {
    // Notifications are optional; never block the main request.
  }
}
