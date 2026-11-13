import "server-only";

export class RequestError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "::1", "[::1]"]);

export function sameOrigin(request: Request) {
  const originHeader = request.headers.get("origin");
  if (!originHeader) {
    throw new RequestError("This request must come from RoyalArm AI. Reload and try again.", 403);
  }

  let parsedOrigin: URL;
  try {
    parsedOrigin = new URL(originHeader);
  } catch {
    throw new RequestError("This request must come from RoyalArm AI. Reload and try again.", 403);
  }

  const reqUrl = new URL(request.url);
  if (parsedOrigin.origin === reqUrl.origin) return;

  const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || reqUrl.protocol.replace(/:$/, "");
  const rawHost =
    request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    request.headers.get("host")?.trim();

  if (rawHost && parsedOrigin.origin === `${proto}://${rawHost}`) return;

  // NextRequest normalizes 127.0.0.1 / [::1] in request.url to "localhost"
  if (
    parsedOrigin.protocol === reqUrl.protocol &&
    parsedOrigin.port === reqUrl.port &&
    LOOPBACK_HOSTS.has(parsedOrigin.hostname) &&
    LOOPBACK_HOSTS.has(reqUrl.hostname)
  ) {
    return;
  }

  throw new RequestError("This request must come from RoyalArm AI. Reload and try again.", 403);
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
