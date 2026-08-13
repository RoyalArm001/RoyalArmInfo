import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "royalarm_admin";

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  return left.length === right.length && timingSafeEqual(left, right);
}

export function validAdminPassword(password) {
  return Boolean(process.env.ROYALARM_IT_ADMIN_PASSWORD)
    && safeEqual(password, process.env.ROYALARM_IT_ADMIN_PASSWORD);
}

export function adminToken() {
  if (!process.env.ROYALARM_IT_SESSION_SECRET) {
    throw new Error("Admin secret is not configured");
  }
  return createHmac("sha256", process.env.ROYALARM_IT_SESSION_SECRET)
    .update("royalarm-admin-session-v1")
    .digest("hex");
}

export function isAdmin(request) {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  return Boolean(token) && safeEqual(token, adminToken());
}
