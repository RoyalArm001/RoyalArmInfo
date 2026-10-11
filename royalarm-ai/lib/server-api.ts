import "server-only";
import OpenAI from "openai";
import { RequestError, sameOrigin } from "./http";
import { rateLimit } from "./rate-limit";
export async function protect(request: Request, key: string, count = 20) {
  sameOrigin(request);
  const forwarded = request.headers.get("x-forwarded-for");
  const client = request.headers.get("x-real-ip")?.trim() ||
    forwarded?.split(",").at(-1)?.trim() ||
    "unknown";
  rateLimit(`${key}:${client}`, count, 60_000);
}
export function openAI() {
  if (!process.env.OPENAI_API_KEY) throw new RequestError("Arm AI is not connected yet. No reply was generated.", 503);
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || undefined,
    maxRetries: 0,
    timeout: 50_000,
  });
}
export function providerError(error: unknown): RequestError {
  if (error instanceof RequestError) return error;
  if (error instanceof OpenAI.APIError && error.status === 429) return new RequestError("OpenAI is at its usage or rate limit. Check billing or try again later.", 429);
  if (error instanceof OpenAI.APIError && [401, 403].includes(error.status ?? 0)) return new RequestError("Provider access failed. Check the server credentials and model permissions.", 502);
  return new RequestError("The provider request failed or was interrupted. Check the configured model and connection, then retry.", 502);
}
