export const LIMITS = {
  requestBytes: 128 * 1024,
  messageChars: 8000,
  contextChars: 24000,
  contextMessages: 24,
  outputTokens: 2048,
  outputChars: 16000,
} as const;

export type ContextMessage = { role: "user" | "assistant"; content: string };

export function boundContext(messages: ContextMessage[]): ContextMessage[] {
  const result: ContextMessage[] = [];
  let remaining: number = LIMITS.contextChars;
  for (const message of messages.slice(-LIMITS.contextMessages).reverse()) {
    const content = message.content.slice(0, Math.min(LIMITS.messageChars, remaining));
    if (!content.trim()) continue;
    result.unshift({ role: message.role, content });
    remaining -= content.length;
    if (!remaining) break;
  }
  return result;
}
