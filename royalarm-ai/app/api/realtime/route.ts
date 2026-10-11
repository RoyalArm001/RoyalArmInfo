import { z } from "zod";
import { readJson, jsonError, RequestError } from "@/lib/http";
import { protect, openAI, providerError } from "@/lib/server-api";
import { tutorContextSchema } from "@/lib/learning/schema";
import { tutorInstructions } from "@/lib/system-prompt";
import { getDefaultModelId, getRequestModelLimits, resolveModelRequest } from "@/lib/models";
export const runtime = "nodejs";
const schema = z.object({ tutor: tutorContextSchema, turnMode: z.enum(["auto", "push"]), voice: z.enum(["marin", "cedar", "alloy", "coral", "sage", "verse"]) }).strict();
export async function POST(request: Request) {
  try {
    const model = resolveModelRequest(getDefaultModelId());
    const limits = getRequestModelLimits(model);
    await protect(request, "realtime", Math.min(5, limits.requestsPerMinute)); const parsed = schema.safeParse(await readJson(request, 20 * 1024));
    if (!parsed.success) throw new RequestError("Invalid voice-session settings.");
    const { tutor, turnMode, voice } = parsed.data;
    const secret = await openAI().realtime.clientSecrets.create({ expires_after: { anchor: "created_at", seconds: 60 }, session: {
      type: "realtime", model: process.env.OPENAI_REALTIME_MODEL || "gpt-realtime", instructions: tutorInstructions(tutor) + "\nSpeak slowly and clearly. Do not repeat the website greeting unless explicitly asked to read it. Never give numeric pronunciation scores.", max_output_tokens: Math.min(700, limits.outputTokens), tracing: null,
      audio: { input: { transcription: { model: process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe" }, turn_detection: turnMode === "auto" ? { type: "server_vad", create_response: true, interrupt_response: true, silence_duration_ms: 700 } : null }, output: { voice, speed: 0.85 } },
    } });
    return Response.json({ value: secret.value, expires_at: secret.expires_at }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(providerError(error)); }
}
