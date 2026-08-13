import { Redis } from "@upstash/redis";

export function getRedis() {
  const url = process.env.ROYALARM_IT_REDIS_REST_URL;
  const token = process.env.ROYALARM_IT_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Upstash is not configured");
  return new Redis({ url, token });
}
