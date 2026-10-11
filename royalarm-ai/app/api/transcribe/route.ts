import { toFile } from "openai";
import { jsonError, RequestError } from "@/lib/http";
import { protect, openAI, providerError } from "@/lib/server-api";
import { getDefaultModelId, getRequestModelLimits, resolveModelRequest } from "@/lib/models";
export const runtime = "nodejs";
export const maxDuration = 60;
const types: Record<string, string> = { "audio/webm": "webm", "audio/mp4": "mp4", "audio/ogg": "ogg", "audio/wav": "wav", "audio/mpeg": "mp3" };
export async function POST(request: Request) {
  try {
    const model = resolveModelRequest(getDefaultModelId());
    const limits = getRequestModelLimits(model);
    await protect(request, "transcribe", Math.min(10, limits.requestsPerMinute));
    const mime = request.headers.get("content-type")?.split(";")[0] ?? "";
    if (!types[mime]) throw new RequestError("Unsupported recording format.", 415);
    const limit = 3 * 1024 * 1024;
    if (Number(request.headers.get("content-length")) > limit) throw new RequestError("Recording exceeds the 3 MiB limit.", 413);
    if (!request.body) throw new RequestError("Recording is missing.");
    const reader = request.body.getReader(); const chunks: Uint8Array[] = []; let size = 0;
    try { while (true) { const part = await reader.read(); if (part.done) break; size += part.value.length; if (size > limit) { await reader.cancel(); throw new RequestError("Recording exceeds the 3 MiB limit.", 413); } chunks.push(part.value); } } finally { reader.releaseLock(); }
    if (size < 100) throw new RequestError("Recording is empty or too short.");
    const audio = Buffer.concat(chunks);
    const transcript = await openAI().audio.transcriptions.create({ model: process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-4o-mini-transcribe", file: await toFile(audio, `recording.${types[mime]}`, { type: mime }), response_format: "json" }, { signal: request.signal });
    if (transcript.text.length > 8000) throw new RequestError("Transcript exceeds the message limit. Record a shorter message.", 413);
    return Response.json({ text: transcript.text }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(providerError(error)); }
}
