import { cookies } from "next/headers";
import { authenticated, COOKIE_NAME, COOKIE_OPTIONS, createSession, passwordMatches, SESSION_SECONDS } from "@/lib/auth";
import { jsonError, readJson, RequestError, sameOrigin } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET() {
  return Response.json({ authenticated: await authenticated() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    sameOrigin(request);
    rateLimit("login", 10, 60_000);
    const body = await readJson(request, 2048);
    if (!body || typeof body !== "object" || !("password" in body) || typeof body.password !== "string" || body.password.length > 512) throw new RequestError("Enter your password.");
    if (!passwordMatches(body.password)) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      throw new RequestError("Incorrect password. Please try again.", 401);
    }
    (await cookies()).set(COOKIE_NAME, createSession(), { ...COOKIE_OPTIONS, maxAge: SESSION_SECONDS });
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(error); }
}

export async function DELETE(request: Request) {
  try {
    sameOrigin(request);
    (await cookies()).set(COOKIE_NAME, "", { ...COOKIE_OPTIONS, maxAge: 0 });
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(error); }
}
