import { getOllamaBaseUrl, isOllamaHostEnabled } from "@/lib/models";

export const runtime = "nodejs";

export async function GET() {
  const cloudConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  let ollamaReachable = false;
  let installedOllamaModels: string[] = [];

  if (isOllamaHostEnabled()) {
    try {
      const response = await fetch(`${getOllamaBaseUrl()}/api/tags`, {
        method: "GET",
        signal: AbortSignal.timeout(650),
        cache: "no-store",
      });
      if (response.ok) {
        const data = (await response.json()) as { models?: Array<{ name?: string }> };
        ollamaReachable = true;
        installedOllamaModels = (data.models ?? [])
          .map((item) => item.name)
          .filter((name): name is string => typeof name === "string" && name.length > 0)
          .slice(0, 12);
      }
    } catch {
      ollamaReachable = false;
    }
  }

  return Response.json(
    {
      localMindReady: true,
      cloudConfigured,
      ollamaReachable,
      installedOllamaModels,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

