import { jsonError, readJson, RequestError } from "@/lib/http";
import { LIMITS } from "@/lib/limits";
import { tutorInstructions } from "@/lib/system-prompt";
import { tutorContextSchema, type TutorContext } from "@/lib/learning/schema";
import { validateChat } from "@/lib/validate-chat";
import { openAI, protect, providerError } from "@/lib/server-api";
import { getOllamaBaseUrl, getRequestModelLimits, resolveModelRequest } from "@/lib/models";
import { resolveTemplateInstructions } from "@/lib/templates";
import { authenticated } from "@/lib/auth";
import { runLocalReasoning } from "@/lib/local-mind";
import type { ModelSummary } from "@/lib/catalog-types";

export const runtime = "nodejs";

function streamTextInChunks(
  text: string,
  maxChars: number,
  signal: AbortSignal,
  onChunk: (chunk: string) => void
): Promise<boolean> {
  return new Promise((resolve) => {
    const clipped = text.slice(0, maxChars);
    const incomplete = text.length > maxChars;
    let offset = 0;
    const step = clipped.length > 900 ? 64 : 36;

    const tick = () => {
      if (signal.aborted) {
        resolve(true);
        return;
      }
      const next = clipped.slice(offset, offset + step);
      if (next) onChunk(next);
      offset += step;
      if (offset >= clipped.length) {
        resolve(incomplete);
      } else {
        setTimeout(tick, 12);
      }
    };

    tick();
  });
}

function makeNdjsonResponse(handler: (send: (event: object) => void) => Promise<void>, cleanup: () => void, abort: AbortController) {
  const encoder = new TextEncoder();
  let cancelled = false;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: object) => {
        if (!cancelled) controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      };
      try {
        await handler(send);
      } catch (error) {
        if (!cancelled) send({ type: "error", error: providerError(error).message });
      } finally {
        abort.abort();
        cleanup();
        if (!cancelled) controller.close();
      }
    },
    cancel() {
      cancelled = true;
      abort.abort();
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

async function streamLocalEngine({
  model,
  messages,
  tutor,
  templateId,
  outputChars,
  abort,
  send,
  fallbackBanner,
}: {
  model: ModelSummary;
  messages: { role: "user" | "assistant"; content: string }[];
  tutor: TutorContext;
  templateId?: string;
  outputChars: number;
  abort: AbortController;
  send: (event: object) => void;
  fallbackBanner?: string;
}) {
  const local = runLocalReasoning({ messages, model, tutor, templateId });
  send({ type: "meta", engine: fallbackBanner ? "local-fallback" : "local", modelId: model.id, domain: local.domain });
  send({ type: "reasoning", text: local.reasoning });
  const finalBody = fallbackBanner ? `${fallbackBanner}\n\n${local.content}` : local.content;
  const incomplete = await streamTextInChunks(finalBody, outputChars, abort.signal, (chunk) => {
    send({ type: "delta", text: chunk });
  });
  if (!abort.signal.aborted) send({ type: "done", incomplete });
}

export async function POST(request: Request) {
  const abort = new AbortController();
  const disconnect = () => abort.abort();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cleanup = () => {
    clearTimeout(timer);
    request.signal.removeEventListener("abort", disconnect);
  };

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
    const rawTemplateId = body && typeof body === "object" && "templateId" in body ? body.templateId : undefined;
    const templateId = typeof rawTemplateId === "string" ? rawTemplateId : undefined;
    const templateInstructions = resolveTemplateInstructions(rawTemplateId);
    const instructions = `${tutorInstructions(parsed.data)}\n\n${templateInstructions}`;

    request.signal.addEventListener("abort", disconnect, { once: true });
    if (request.signal.aborted) abort.abort();
    timer = setTimeout(() => abort.abort(), 50_000);
    const outputChars = Math.min(LIMITS.outputChars, limits.outputTokens * 8);

    // 1. Built-in Sipan Local Reasoning Engine
    if (model.engine === "local") {
      return makeNdjsonResponse(
        async (send) => {
          await streamLocalEngine({
            model,
            messages: input,
            tutor: parsed.data,
            templateId,
            outputChars,
            abort,
            send,
          });
        },
        cleanup,
        abort
      );
    }

    // 2. Local Ollama Daemon Engine (falls back seamlessly to Arm Local Engine if offline)
    if (model.engine === "ollama") {
      const baseUrl = getOllamaBaseUrl();
      return makeNdjsonResponse(
        async (send) => {
          try {
            const timeoutCtrl = new AbortController();
            const onAbort = () => timeoutCtrl.abort();
            abort.signal.addEventListener("abort", onAbort, { once: true });
            const connectTimer = setTimeout(() => timeoutCtrl.abort(), 12_000);
            let ollamaRes: Response;
            try {
              ollamaRes = await fetch(`${baseUrl}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  model: model.id,
                  stream: true,
                  messages: [{ role: "system", content: instructions }, ...input],
                  options: { num_predict: limits.outputTokens },
                }),
                signal: timeoutCtrl.signal,
              });
            } finally {
              clearTimeout(connectTimer);
              abort.signal.removeEventListener("abort", onAbort);
            }

            if (!ollamaRes.ok || !ollamaRes.body) {
              throw new Error(`Ollama status ${ollamaRes.status}`);
            }

            send({ type: "meta", engine: "ollama", modelId: model.id });
            const reader = ollamaRes.body.getReader();
            const decoder = new TextDecoder();
            let pending = "";
            let chars = 0;
            let inThink = false;

            while (true) {
              const { value, done } = await reader.read();
              pending += done ? decoder.decode() : decoder.decode(value, { stream: true });
              const lines = pending.split("\n");
              pending = lines.pop() ?? "";

              for (const line of lines) {
                if (!line.trim()) continue;
                const pkt = JSON.parse(line) as {
                  message?: { content?: string; thinking?: string };
                  done?: boolean;
                };
                if (pkt.message?.thinking) {
                  send({ type: "reasoning", text: pkt.message.thinking });
                }
                let text = pkt.message?.content ?? "";
                if (text) {
                  if (text.includes("<think>")) {
                    inThink = true;
                    text = text.replace("<think>", "");
                  }
                  if (inThink) {
                    const closeIdx = text.indexOf("</think>");
                    if (closeIdx >= 0) {
                      const thought = text.slice(0, closeIdx);
                      if (thought) send({ type: "reasoning", text: thought });
                      inThink = false;
                      text = text.slice(closeIdx + 8);
                    } else {
                      send({ type: "reasoning", text });
                      text = "";
                    }
                  }
                  if (text) {
                    const delta = text.slice(0, outputChars - chars);
                    chars += delta.length;
                    if (delta) send({ type: "delta", text: delta });
                    if (chars >= outputChars) {
                      send({ type: "done", incomplete: true });
                      return;
                    }
                  }
                }
                if (pkt.done) {
                  send({ type: "done", incomplete: false });
                  return;
                }
              }
              if (done) {
                send({ type: "done", incomplete: false });
                return;
              }
            }
          } catch {
            // Seamless local fallback when Ollama daemon is not running locally
            await streamLocalEngine({
              model,
              messages: input,
              tutor: parsed.data,
              templateId,
              outputChars,
              abort,
              send,
              fallbackBanner: `> *Լոկալ Ollama սերվերը (\`${baseUrl}\`, մոդել՝ \`${model.id}\`) այս պահին ակտիվ չէ․ կիրառվեց **Arm Local Mind** ինքնավար շարժիչը։ Տեղում գործարկելու համար՝ \`ollama serve && ollama pull ${model.id}\`։*`,
            });
          }
        },
        cleanup,
        abort
      );
    }

    // 3. Cloud OpenAI / OpenRouter / Groq Responses API
    const upstream = await openAI().responses.create(
      { model: model.id, instructions, input, stream: true, store: false, max_output_tokens: limits.outputTokens },
      { signal: abort.signal }
    );

    return makeNdjsonResponse(
      async (send) => {
        send({ type: "meta", engine: "openai", modelId: model.id });
        let terminal = false;
        let chars = 0;
        let inThink = false;

        for await (const event of upstream) {
          if (event.type === "response.output_text.delta" || event.type === "response.refusal.delta") {
            let text = event.delta;
            if (text.includes("<think>")) {
              inThink = true;
              text = text.replace("<think>", "");
            }
            if (inThink) {
              const closeIdx = text.indexOf("</think>");
              if (closeIdx >= 0) {
                const thought = text.slice(0, closeIdx);
                if (thought) send({ type: "reasoning", text: thought });
                inThink = false;
                text = text.slice(closeIdx + 8);
              } else {
                if (text) send({ type: "reasoning", text });
                text = "";
              }
            }
            if (text) {
              const delta = text.slice(0, outputChars - chars);
              chars += delta.length;
              if (delta) send({ type: "delta", text: delta });
              if (chars >= outputChars) {
                send({ type: "done", incomplete: true });
                terminal = true;
                break;
              }
            }
          } else if (event.type === "response.completed" || event.type === "response.incomplete") {
            send({ type: "done", incomplete: event.type === "response.incomplete" });
            terminal = true;
            break;
          } else if (event.type === "response.failed" || event.type === "error") {
            throw new Error("Upstream failure");
          }
        }
        if (!terminal && !abort.signal.aborted) {
          send({ type: "error", error: "The connection ended before the reply finished. Try again." });
        }
      },
      cleanup,
      abort
    );
  } catch (error) {
    abort.abort();
    cleanup();
    return jsonError(providerError(error));
  }
}
