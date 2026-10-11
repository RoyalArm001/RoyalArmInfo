import "server-only";
import { RequestError } from "./http";

// Best effort per instance, keyed by client address and endpoint. Vercel Firewall
// should also be configured for deployment-wide limits; see README.
const buckets = new Map<string, { count: number; until: number }>();
export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  for (const [id, bucket] of buckets) if (bucket.until <= now) buckets.delete(id);
  const current = buckets.get(key);
  if (current && current.count >= max) throw new RequestError("Too many requests. Please wait a minute and try again.", 429);
  if (current) current.count++;
  else {
    if (buckets.size >= 1000) throw new RequestError("Please wait a minute and try again.", 429);
    buckets.set(key, { count: 1, until: now + windowMs });
  }
}
