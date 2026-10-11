import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_SECONDS = 60 * 60 * 12;
export const COOKIE_NAME = process.env.NODE_ENV === "production" ? "__Host-royalarm-session" : "royalarm-session";
export const COOKIE_OPTIONS = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/" };

function configuration() {
  const password = process.env.CHAT_PASSWORD || process.env.ROYALARM_IT_ADMIN_PASSWORD;
  const secret = process.env.SESSION_SECRET || process.env.ROYALARM_IT_SESSION_SECRET;
  if (!password || password.length < 12 || !secret || secret.length < 32) throw new Error("Authentication is not configured");
  return { password, secret };
}

export function isAuthConfigured() {
  const password = process.env.CHAT_PASSWORD || process.env.ROYALARM_IT_ADMIN_PASSWORD;
  const secret = process.env.SESSION_SECRET || process.env.ROYALARM_IT_SESSION_SECRET;
  return Boolean(password && password.length >= 12 && secret && secret.length >= 32);
}

export function passwordMatches(candidate: string) {
  const { password } = configuration();
  return timingSafeEqual(createHash("sha256").update(candidate).digest(), createHash("sha256").update(password).digest());
}

function sign(payload: string) {
  const { password, secret } = configuration();
  return createHmac("sha256", secret).update(password).update("\0").update(payload).digest("base64url");
}

export function createSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS, nonce: randomBytes(16).toString("hex") })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySession(token: string | undefined) {
  if (!token || token.length > 1024) return false;
  try {
    const [payload, signature, extra] = token.split(".");
    if (!payload || !signature || extra !== undefined) return false;
    const expected = Buffer.from(sign(payload));
    const actual = Buffer.from(signature);
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    const now = Math.floor(Date.now() / 1000);
    return Number.isInteger(data.exp) && data.exp > now && data.exp <= now + SESSION_SECONDS && typeof data.nonce === "string";
  } catch { return false; }
}

export async function authenticated() {
  return verifySession((await cookies()).get(COOKIE_NAME)?.value);
}
