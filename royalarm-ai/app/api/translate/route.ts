import { jsonError, readJson, RequestError } from "@/lib/http";
import { protect, providerError } from "@/lib/server-api";
import { translate, translationRequest } from "@/lib/translation/providers";
export const runtime = "nodejs";
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    await protect(request, "translate");
    const parsed = translationRequest.safeParse(await readJson(request, 64 * 1024));
    if (!parsed.success) throw new RequestError("Choose English and Armenian, and enter up to 8,000 characters.");
    return Response.json(await translate(parsed.data), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return jsonError(providerError(error)); }
}
