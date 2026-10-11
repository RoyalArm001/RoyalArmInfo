import "server-only";
import type { PlanId, PlanSummary } from "./catalog-types";

function positiveInteger(name: string, fallback: number, max: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 1 || value > max) {
    throw new Error(`${name} must be a whole number from 1 to ${max}.`);
  }
  return value;
}

function optionalPrice(name: string) {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${name} must be a non-negative number.`);
  }
  return `US$${value.toFixed(2)}/month`;
}

export function getActivePlan(): PlanId {
  const value = process.env.AI_ACTIVE_PLAN || "free";
  if (value !== "free" && value !== "pro") {
    throw new Error("AI_ACTIVE_PLAN must be set to either free or pro.");
  }
  return value;
}

const definitions = {
  free: {
    name: "Free",
    priceEnv: "AI_FREE_PLAN_PRICE_USD",
    contextEnv: "AI_FREE_CONTEXT_TOKENS",
    outputEnv: "AI_FREE_OUTPUT_TOKENS",
    requestsEnv: "AI_FREE_REQUESTS_PER_MINUTE",
    defaults: { contextTokens: 4_000, outputTokens: 2_048, requestsPerMinute: 60 },
    features: [
      "Economical text models with streaming",
      "Conversation history saved in this browser",
      "General, English practice, translation and travel templates",
      "Browser speech input and read-aloud controls",
      "Standard request and response limits",
    ],
  },
  pro: {
    name: "Pro",
    priceEnv: "AI_PRO_PLAN_PRICE_USD",
    contextEnv: "AI_PRO_CONTEXT_TOKENS",
    outputEnv: "AI_PRO_OUTPUT_TOKENS",
    requestsEnv: "AI_PRO_REQUESTS_PER_MINUTE",
    defaults: { contextTokens: 16_000, outputTokens: 4_096, requestsPerMinute: 20 },
    features: [
      "Economical and advanced text models with streaming",
      "Conversation history saved in this browser",
      "All seven assistant templates",
      "Browser speech input and read-aloud controls",
      "Larger configurable context and response limits",
    ],
  },
} as const;

export function getPlanSummaries(): PlanSummary[] {
  const activePlan = getActivePlan();
  return (["free", "pro"] as const).map((id) => {
    const definition = definitions[id];
    const prefix = id === "free" ? "AI_FREE" : "AI_PRO";
    const priceLabel = optionalPrice(definition.priceEnv);
    return {
      id,
      name: definition.name,
      ...(priceLabel ? { priceLabel } : {}),
      isActive: id === activePlan,
      contextTokens: positiveInteger(definition.contextEnv, definition.defaults.contextTokens, 1_047_576),
      outputTokens: positiveInteger(definition.outputEnv, definition.defaults.outputTokens, 32_768),
      requestsPerMinute: positiveInteger(definition.requestsEnv, definition.defaults.requestsPerMinute, 120),
      features: [...definition.features],
    };
  });
}

export function getPlanSummary(id: PlanId) {
  return getPlanSummaries().find((plan) => plan.id === id)!;
}

export function planAllows(active: PlanId, required: PlanId) {
  return active === "pro" || required === "free";
}
