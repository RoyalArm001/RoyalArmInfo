import { LIMITS } from "./limits";

export async function readReply(response: Response, onDelta: (text: string) => void): Promise<boolean> {
  if (!response.body) throw new Error("No reply stream was received. Try again.");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let pending = "";
  let count = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      pending += done ? decoder.decode() : decoder.decode(value, { stream: true });
      if (pending.length > 256_000) throw new Error("The reply exceeded the stream limit.");
      const lines = pending.split("\n");
      pending = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.trim()) continue;
        const event = JSON.parse(line);
        if (event.type === "delta" && typeof event.text === "string") {
          count += event.text.length;
          if (count > LIMITS.outputChars) throw new Error("The reply exceeded the output limit.");
          onDelta(event.text);
        } else if (event.type === "done") {
          return event.incomplete === true;
        } else if (event.type === "error") {
          throw new Error(typeof event.error === "string" ? event.error : "The reply failed. Try again.");
        } else throw new Error("An invalid reply was received. Try again.");
      }
      if (done) throw new Error("The connection ended before the reply finished. Try again.");
    }
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
}
