import "server-only";
import { LIMITS, type ContextMessage } from "./limits";
import { RequestError } from "./http";

export function validateChat(body: unknown, contextLimit: number = LIMITS.contextChars): ContextMessage[] {
  if (!body || typeof body !== "object" || !("messages" in body) || !Array.isArray(body.messages)) throw new RequestError("Messages must be an array.");
  if (!body.messages.length || body.messages.length > LIMITS.contextMessages) throw new RequestError("Send between 1 and 24 messages.");
  let total = 0;
  const messages = body.messages.map((item: unknown): ContextMessage => {
    if (!item || typeof item !== "object" || !("role" in item) || !("content" in item) ||
        (item.role !== "user" && item.role !== "assistant") || typeof item.content !== "string" ||
        !item.content.trim() || item.content.length > LIMITS.messageChars) throw new RequestError("Each message needs a user or assistant role and 1–8,000 characters.");
    total += item.content.length;
    return { role: item.role, content: item.content };
  });
  if (total > contextLimit) throw new RequestError("Conversation context is too long for the selected model and plan.");
  if (messages.at(-1)?.role !== "user") throw new RequestError("The last message must be from you.");
  return messages;
}
