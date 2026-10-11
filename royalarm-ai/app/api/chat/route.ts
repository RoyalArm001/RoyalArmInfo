import { jsonError, readJson, RequestError } from "@/lib/http";
import { LIMITS } from "@/lib/limits";
import { tutorInstructions } from "@/lib/system-prompt";
import { tutorContextSchema } from "@/lib/learning/schema";
import { validateChat } from "@/lib/validate-chat";
import { openAI, protect, providerError } from "@/lib/server-api";
import { getRequestModelLimits, resolveModelRequest } from "@/lib/models";
import { resolveTemplateInstructions } from "@/lib/templates";
import { authenticated } from "@/lib/auth";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  const abort = new AbortController(); const disconnect = () => abort.abort();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cleanup = () => { clearTimeout(timer); request.signal.removeEventListener("abort", disconnect); };
  try {
    if (process.env.CHAT_AUTH_REQUIRED === "true" && !(await authenticated())) {
      throw new RequestError("Your session has expired. Sign in again to continue.", 401);
    }
    const body = await readJson(request, LIMITS.requestBytes);
    const model = resolveModelRequest(body && typeof body === "object" && "modelId" in body ? body.modelId : undefined);
    const limits = getRequestModelLimits(model);
    await protect(request, "chat", limits.requestsPerMinute);
    const input = validateChat(body, limits.contextChars);
    const parsed = tutorContextSchema.safeParse(body && typeof body === "object" && "tutor" in body ? body.tutor : {});
    if (!parsed.success) throw new RequestError("Invalid learning context.");
    const templateId = body && typeof body === "object" && "templateId" in body ? body.templateId : undefined;
    const instructions = `${tutorInstructions(parsed.data)}\n\n${resolveTemplateInstructions(templateId)}`;
    request.signal.addEventListener("abort", disconnect, { once: true });
    if (request.signal.aborted) abort.abort();
    timer = setTimeout(() => abort.abort(), 50_000);
    const outputChars = Math.min(LIMITS.outputChars, limits.outputTokens * 8);
    const upstream = await openAI().responses.create({ model: model.id, instructions, input, stream: true, store: false, max_output_tokens: limits.outputTokens }, { signal: abort.signal });
    const encoder = new TextEncoder(); let cancelled = false;
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const send = (event: object) => { if (!cancelled) controller.enqueue(encoder.encode(JSON.stringify(event) + "\n")); };
        let terminal = false; let chars = 0;
        try {
          for await (const event of upstream) {
            if (event.type === "response.output_text.delta" || event.type === "response.refusal.delta") {
              const delta = event.delta.slice(0, outputChars - chars); chars += delta.length;
              if (delta) send({ type: "delta", text: delta });
              if (chars >= outputChars) { send({ type: "done", incomplete: true }); terminal = true; break; }
            } else if (event.type === "response.completed" || event.type === "response.incomplete") {
              send({ type: "done", incomplete: event.type === "response.incomplete" }); terminal = true; break;
            } else if (event.type === "response.failed" || event.type === "error") throw new Error("Upstream failure");
          }
          if (!terminal && !cancelled) send({ type: "error", error: "The connection ended before the reply finished. Try again." });
        } catch (error) { if (!cancelled) send({ type: "error", error: providerError(error).message }); }
        finally { abort.abort(); cleanup(); if (!cancelled) controller.close(); }
      },
      cancel() { cancelled = true; abort.abort(); cleanup(); },
    });
    return new Response(stream, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store, no-transform", "X-Accel-Buffering": "no" } });
  } catch (error) { abort.abort(); cleanup(); return jsonError(providerError(error)); }
}
