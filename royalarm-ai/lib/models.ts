import "server-only";
import type { ModelSummary, PlanId } from "./catalog-types";
import { RequestError } from "./http";
import { getActivePlan, getPlanSummary, planAllows } from "./plans";

type ModelDefinition = {
  envId: string;
  legacyEnvId?: string;
  id: string;
  displayName: string;
  provider?: string;
  access: PlanId;
  contextEnv: string;
  outputEnv: string;
  priceInputEnv?: string;
  priceOutputEnv?: string;
  contextWindowTokens: number;
  outputWindowTokens: number;
  githubUrl?: string;
  license?: string;
  openSource?: boolean;
  freeTier?: boolean;
  releaseVersion?: string;
};

const definitions: ModelDefinition[] = [
  {
    envId: "OPENAI_FREE_MODEL",
    legacyEnvId: "OPENAI_MODEL",
    id: "gpt-4.1-mini",
    displayName: "Arm AI Free",
    provider: "OpenAI",
    access: "free",
    contextEnv: "OPENAI_FREE_CONTEXT_TOKENS",
    outputEnv: "OPENAI_FREE_OUTPUT_TOKENS",
    priceInputEnv: "OPENAI_FREE_INPUT_USD_PER_MILLION",
    priceOutputEnv: "OPENAI_FREE_OUTPUT_USD_PER_MILLION",
    contextWindowTokens: 1_047_576,
    outputWindowTokens: 32_768,
    openSource: false,
    freeTier: true,
    releaseVersion: "v2025.1",
  },
  {
    envId: "OPENAI_FREE_ECONOMY_MODEL",
    id: "gpt-4o-mini",
    displayName: "Arm AI Free Economy",
    provider: "OpenAI",
    access: "free",
    contextEnv: "OPENAI_FREE_ECONOMY_CONTEXT_TOKENS",
    outputEnv: "OPENAI_FREE_ECONOMY_OUTPUT_TOKENS",
    priceInputEnv: "OPENAI_FREE_ECONOMY_INPUT_USD_PER_MILLION",
    priceOutputEnv: "OPENAI_FREE_ECONOMY_OUTPUT_USD_PER_MILLION",
    contextWindowTokens: 128_000,
    outputWindowTokens: 16_384,
    openSource: false,
    freeTier: true,
    releaseVersion: "v2024.7",
  },
  {
    envId: "LLAMA_MODEL",
    id: "meta-llama/llama-3.3-70b-instruct:free",
    displayName: "Meta Llama 3.3 70B (Open Source)",
    provider: "Meta AI / GitHub Open Source",
    access: "free",
    contextEnv: "LLAMA_CONTEXT_TOKENS",
    outputEnv: "LLAMA_OUTPUT_TOKENS",
    contextWindowTokens: 128_000,
    outputWindowTokens: 8_192,
    githubUrl: "https://github.com/meta-llama/llama-models",
    license: "Llama 3.3 Community License",
    openSource: true,
    freeTier: true,
    releaseVersion: "3.3.0",
  },
  {
    envId: "DEEPSEEK_R1_MODEL",
    id: "deepseek/deepseek-r1:free",
    displayName: "DeepSeek-R1 (Open Reasoning)",
    provider: "DeepSeek AI / GitHub Open Source",
    access: "free",
    contextEnv: "DEEPSEEK_R1_CONTEXT_TOKENS",
    outputEnv: "DEEPSEEK_R1_OUTPUT_TOKENS",
    contextWindowTokens: 128_000,
    outputWindowTokens: 8_192,
    githubUrl: "https://github.com/deepseek-ai/DeepSeek-R1",
    license: "MIT License",
    openSource: true,
    freeTier: true,
    releaseVersion: "1.0.0",
  },
  {
    envId: "QWEN_CODER_MODEL",
    id: "qwen/qwen-2.5-coder-32b-instruct:free",
    displayName: "Qwen 2.5 Coder 32B (Open Dev)",
    provider: "Alibaba / GitHub Open Source",
    access: "free",
    contextEnv: "QWEN_CODER_CONTEXT_TOKENS",
    outputEnv: "QWEN_CODER_OUTPUT_TOKENS",
    contextWindowTokens: 128_000,
    outputWindowTokens: 8_192,
    githubUrl: "https://github.com/QwenLM/Qwen2.5-Coder",
    license: "Apache 2.0",
    openSource: true,
    freeTier: true,
    releaseVersion: "2.5.0",
  },
  {
    envId: "MISTRAL_MODEL",
    id: "mistralai/mistral-small-24b-instruct-2501:free",
    displayName: "Mistral Small 24B (Open Source)",
    provider: "Mistral AI / GitHub Open Source",
    access: "free",
    contextEnv: "MISTRAL_CONTEXT_TOKENS",
    outputEnv: "MISTRAL_OUTPUT_TOKENS",
    contextWindowTokens: 32_768,
    outputWindowTokens: 4_096,
    githubUrl: "https://github.com/mistralai/mistral-src",
    license: "Apache 2.0",
    openSource: true,
    freeTier: true,
    releaseVersion: "2501",
  },
  {
    envId: "OLLAMA_MODEL",
    id: "llama3.2",
    displayName: "Ollama Local AI (100% Offline)",
    provider: "Ollama / Localhost GitHub",
    access: "free",
    contextEnv: "OLLAMA_CONTEXT_TOKENS",
    outputEnv: "OLLAMA_OUTPUT_TOKENS",
    contextWindowTokens: 32_768,
    outputWindowTokens: 4_096,
    githubUrl: "https://github.com/ollama/ollama",
    license: "MIT License",
    openSource: true,
    freeTier: true,
    releaseVersion: "0.5.x",
  },
  {
    envId: "OPENAI_PRO_MODEL",
    id: "gpt-4.1",
    displayName: "Arm AI Pro",
    provider: "OpenAI",
    access: "pro",
    contextEnv: "OPENAI_PRO_CONTEXT_TOKENS",
    outputEnv: "OPENAI_PRO_OUTPUT_TOKENS",
    priceInputEnv: "OPENAI_PRO_INPUT_USD_PER_MILLION",
    priceOutputEnv: "OPENAI_PRO_OUTPUT_USD_PER_MILLION",
    contextWindowTokens: 1_047_576,
    outputWindowTokens: 32_768,
    openSource: false,
    freeTier: false,
    releaseVersion: "v2025.1",
  },
];

function configuredId(definition: ModelDefinition) {
  const value = process.env[definition.envId]?.trim() ||
    (definition.legacyEnvId ? process.env[definition.legacyEnvId]?.trim() : undefined) ||
    definition.id;
  if (!/^[A-Za-z0-9._\/: -]+$/.test(value)) {
    throw new Error(`${definition.envId} must contain a valid provider model ID.`);
  }
  return value;
}

function boundedInteger(name: string, fallback: number, max: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value < 1 || value > max) {
    throw new Error(`${name} must be a whole number from 1 to ${max}.`);
  }
  return value;
}

function optionalPrice(name?: string) {
  if (!name) return undefined;
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${name} must be a non-negative number.`);
  }
  return value;
}

function modelSummaries(activePlan: PlanId): ModelSummary[] {
  const apiKeyConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  return definitions.map((definition) => {
    const id = configuredId(definition);
    const accessAllowed = planAllows(activePlan, definition.access);
    const contextTokens = boundedInteger(definition.contextEnv, definition.access === "pro" ? 32_768 : 8_192, definition.contextWindowTokens);
    const outputTokens = boundedInteger(definition.outputEnv, definition.access === "pro" ? 4_096 : 2_048, definition.outputWindowTokens);
    const inputPrice = optionalPrice(definition.priceInputEnv);
    const outputPrice = optionalPrice(definition.priceOutputEnv);
    return {
      id,
      provider: definition.provider || "OpenAI",
      displayName: definition.displayName,
      access: definition.access,
      capabilities: { text: true, streaming: true, voice: true },
      contextWindowTokens: definition.contextWindowTokens,
      contextTokens,
      outputTokens,
      configured: apiKeyConfigured,
      selectable: apiKeyConfigured && accessAllowed,
      availability: !apiKeyConfigured ? "missing-api-key" : accessAllowed ? "configured" : "plan-locked",
      ...(inputPrice !== undefined && outputPrice !== undefined
        ? { price: { inputUsdPerMillion: inputPrice, outputUsdPerMillion: outputPrice } }
        : {}),
      githubUrl: definition.githubUrl,
      license: definition.license,
      openSource: definition.openSource,
      freeTier: definition.freeTier,
      releaseVersion: definition.releaseVersion,
    };
  });
}

export function getModelSummaries() {
  return modelSummaries(getActivePlan());
}

export function getDefaultModelId() {
  const activePlan = getActivePlan();
  const models = modelSummaries(activePlan);
  const selected = models.find((model) => model.access === activePlan && model.selectable);
  return selected?.id ?? models.find((model) => model.access === "free")!.id;
}

export function resolveModelRequest(modelId: unknown) {
  const summaries = getModelSummaries();
  if (modelId !== undefined && (typeof modelId !== "string" || !modelId)) {
    throw new RequestError("Choose a valid model.", 400);
  }
  const requestedId = typeof modelId === "string" ? modelId : getDefaultModelId();
  const model = summaries.find((candidate) => candidate.id === requestedId);
  if (!model) throw new RequestError("That model is not configured for this application.", 400);
  if (model.availability === "missing-api-key") {
    throw new RequestError("Arm AI is not connected yet. Your message has been saved on this device.", 503);
  }
  if (model.availability === "plan-locked") {
    throw new RequestError("This model requires the Pro plan configured for this application.", 403);
  }
  return model;
}

export function getRequestModelLimits(model: ModelSummary) {
  const plan = getPlanSummary(getActivePlan());
  return {
    contextTokens: Math.min(model.contextTokens, plan.contextTokens),
    contextChars: Math.min(24_000, Math.max(1, Math.min(model.contextTokens, plan.contextTokens) * 4)),
    outputTokens: Math.min(model.outputTokens, plan.outputTokens),
    requestsPerMinute: plan.requestsPerMinute,
  };
}
