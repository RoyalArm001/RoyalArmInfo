import { z } from "zod";
import { readJson, jsonError, RequestError } from "@/lib/http";
import { protect, openAI, providerError } from "@/lib/server-api";
import { getDefaultModelId, getRequestModelLimits, resolveModelRequest } from "@/lib/models";
export const runtime = "nodejs";
export const maxDuration = 60;
const schema = z.object({ text: z.string().trim().min(1).max(4000), voice: z.enum(["marin", "cedar", "alloy", "coral", "sage", "verse"]).optional() }).strict();
export async function POST(request: Request) {
  try {
    const model = resolveModelRequest(getDefaultModelId());
    const limits = getRequestModelLimits(model);
    await protect(request, "speech", limits.requestsPerMinute); const parsed = schema.safeParse(await readJson(request, 32 * 1024));
    if (!parsed.success) throw new RequestError("Read-aloud text must contain 1–4,000 characters.");
    const response = await openAI().audio.speech.create({ model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts", voice: parsed.data.voice || process.env.OPENAI_VOICE || "marin", input: parsed.data.text, response_format: "mp3", speed: 0.85 }, { signal: request.signal });
    return new Response(response.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(providerError(error)); }
}
