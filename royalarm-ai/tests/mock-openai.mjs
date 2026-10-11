import { createServer } from "node:http";
import assert from "node:assert/strict";

// Exercises the actual SDK and server stream adapter without external credentials.
createServer(async (request, response) => {
  if (request.url === "/health") { response.end("ok"); return; }
  try {
    assert.equal(request.url, "/v1/responses");
    let raw = "";
    for await (const chunk of request) raw += chunk;
    const body = JSON.parse(raw);
    assert.equal(body.store, false);
    assert.equal(body.stream, true);
    assert.ok(Number.isInteger(body.max_output_tokens) && body.max_output_tokens > 0 && body.max_output_tokens <= 32768);
    assert.ok(typeof body.model === "string" && body.model.length > 0);
    assert.ok(body.instructions.includes("same language"));
    assert.ok(body.input.length <= 24);
    assert.ok(body.input.reduce((sum, item) => sum + item.content.length, 0) <= 24000);
    const prompt = body.input.at(-1).content;
    if (prompt.includes("template-check")) assert.ok(body.instructions.includes("patient English tutor"));
    if (prompt.includes("upstream-failure")) { response.writeHead(429, { "Content-Type": "application/json" }); response.end(JSON.stringify({ error: { message: "Test quota", type: "rate_limit_error" } })); return; }
    response.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" });
    const send = (event) => response.write(`event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`);
    const chunks = prompt.includes("unsafe") ? ["Safe text.\n\n<script>alert('xss')</script>\n\n[bad](javascript:alert(1))\n\n![remote](https://example.com/track.png)\n\n```js\nconst safe = true;\n```"] : [`Hello! Model ${body.model}. `, "Here is ", "a streamed ", "reply. ", "Բարև 👋", "\n\n```js\n", "const answer = 42;\n", "```"];
    let index = 0;
    const interval = setInterval(() => {
      if (index < chunks.length) send({ type: "response.output_text.delta", delta: chunks[index++] });
      else {
        clearInterval(interval);
        if (!prompt.includes("interrupt")) send({ type: prompt.includes("limit") ? "response.incomplete" : "response.completed", response: { status: "completed" } });
        response.end();
      }
    }, prompt.includes("slow") ? 650 : 70);
    response.on("close", () => clearInterval(interval));
  } catch {
    response.writeHead(400, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: { message: "Invalid test request", type: "invalid_request_error" } }));
  }
}).listen(3102, "127.0.0.1");
