import "server-only";

export class RequestError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

export function sameOrigin(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    throw new RequestError("This request must come from RoyalArm AI. Reload and try again.", 403);
  }
}

export async function readJson(request: Request, maxBytes: number): Promise<unknown> {
  const contentType = request.headers.get("content-type")?.split(";")[0].trim();
  if (contentType !== "application/json") {
    throw new RequestError("Send an application/json request.", 415);
  }
  const length = Number(request.headers.get("content-length"));
  if (length > maxBytes) {
    throw new RequestError("Request is too large. Shorten your message.", 413);
  }
  if (!request.body) throw new RequestError("Request body is missing.");

  const reader = request.body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let size = 0;
  let body = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) {
        await reader.cancel();
        throw new RequestError("Request is too large. Shorten your message.", 413);
      }
      body += decoder.decode(value, { stream: true });
    }
    body += decoder.decode();
    return JSON.parse(body);
  } catch (error) {
    if (error instanceof RequestError) throw error;
    throw new RequestError("The request contains invalid JSON.");
  } finally {
    reader.releaseLock();
  }
}

export function jsonError(error: unknown) {
  return Response.json(
    {
      error:
        error instanceof RequestError
          ? error.message
          : "Server configuration is unavailable. Check the environment variables.",
    },
    {
      status: error instanceof RequestError ? error.status : 503,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
