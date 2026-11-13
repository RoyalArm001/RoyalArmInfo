import "server-only";
import type { ModelEngine, ModelSummary, PlanId } from "./catalog-types";
import { RequestError } from "./http";
import { getActivePlan, getPlanSummary, planAllows } from "./plans";

type ModelDefinition = {
  envId: string;
  legacyEnvId?: string;
  id: string;
  displayName: string;
  provider: string;
  engine: ModelEngine;
  access: PlanId;
  badge: string;
  specialty: string;
  specialtyHy: string;
  tagline: string;
  taglineHy: string;
  reasoningMode: "architect" | "diagnostic" | "bilingual" | "standard";
  reasoningCapable?: boolean;
  offlineCapable?: boolean;
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
    envId: "LOCAL_ARCHITECT_MODEL",
    id: "royalarm-local-architect",
    displayName: "Arm Local Core · Սիփանի Ճարտարապետ",
    provider: "RoyalArm Local Mind v3",
    engine: "local",
    access: "free",
    badge: "LOCAL MIND",
    specialty: "Networks (MikroTik/FortiGate), AD, Proxmox, TrueNAS, CCTV, Delphi & Store",
    specialtyHy: "MikroTik, FortiGate, AD, Proxmox, TrueNAS, CCTV, Delphi և RoyalArm Store",
    tagline: "Zero-latency local engineering engine tuned to Sipan’s infrastructure workflow.",
    taglineHy: "Անմիջական լոկալ ինժեներական մտածողություն՝ հարմարեցված Սիփանի աշխատանքային ստեքին։",
    reasoningMode: "architect",
    reasoningCapable: true,
    offlineCapable: true,
    contextEnv: "LOCAL_ARCHITECT_CONTEXT_TOKENS",
    outputEnv: "LOCAL_ARCHITECT_OUTPUT_TOKENS",
    contextWindowTokens: 128_000,
    outputWindowTokens: 8_192,
    openSource: true,
    freeTier: true,
    releaseVersion: "3.0.0",
  },
  {
    envId: "LOCAL_REASONER_MODEL",
    id: "royalarm-local-reasoner",
    displayName: "Arm Deep Think · Ախտորոշիչ Մոդել",
    provider: "RoyalArm Diagnostic Lab",
    engine: "local",
    access: "free",
    badge: "DEEP THINK",
    specialty: "Root-Cause Analysis, CIDR/VLSM Subnetting, Firewall Audit & Backup Plans",
    specialtyHy: "Խորը տրամաբանական ախտորոշում, CIDR/VLSM հաշվիչ, firewall և backup աուդիտ",
    tagline: "Step-by-step local reasoning trace with verification commands and risk checks.",
    taglineHy: "Փուլային մտածողության շղթա, ստուգման հրամաններ և ռիսկերի գնահատում։",
    reasoningMode: "diagnostic",
    reasoningCapable: true,
    offlineCapable: true,
    contextEnv: "LOCAL_REASONER_CONTEXT_TOKENS",
    outputEnv: "LOCAL_REASONER_OUTPUT_TOKENS",
    contextWindowTokens: 128_000,
    outputWindowTokens: 8_192,
    openSource: true,
    freeTier: true,
    releaseVersion: "3.0.0",
  },
  {
    envId: "LOCAL_BILINGUAL_MODEL",
    id: "royalarm-local-bilingual",
    displayName: "Arm Bilingual · Հայ–Անգլերեն Թյուտոր",
    provider: "RoyalArm Offline Lexicon",
    engine: "local",
    access: "free",
    badge: "HY ↔ EN",
    specialty: "Technical English, Armenian Translation, IT Vocabulary & Interview Coaching",
    specialtyHy: "ՏՏ անգլերեն (A1–C2), հայ ↔ անգլերեն թարգմանություն և CV պատրաստում",
    tagline: "Offline bilingual assistant for IT terminology, corrections and daily English.",
    taglineHy: "Անցանց երկլեզու օգնական՝ տեխնիկական տերմինների ու անգլերենի պրակտիկայի համար։",
    reasoningMode: "bilingual",
    reasoningCapable: true,
    offlineCapable: true,
    contextEnv: "LOCAL_BILINGUAL_CONTEXT_TOKENS",
    outputEnv: "LOCAL_BILINGUAL_OUTPUT_TOKENS",
    contextWindowTokens: 64_000,
    outputWindowTokens: 4_096,
    openSource: true,
    freeTier: true,
    releaseVersion: "3.0.0",
  },
  {
    envId: "OLLAMA_MODEL",
    id: "llama3.2",
    displayName: "Ollama Llama 3.2 (Local GPU/CPU)",
    provider: "Ollama · 127.0.0.1:11434",
    engine: "ollama",
    access: "free",
    badge: "OLLAMA",
    specialty: "Private on-device LLM inference via local Ollama daemon",
    specialtyHy: "Լոկալ LLM մոդել՝ անմիջապես քո համակարգչի Ollama սերվերի վրա",
    tagline: "Runs local weights privately on localhost:11434 with local reasoning fallback.",
    taglineHy: "Աշխատում է տեղային համակարգչում՝ ավտոմատ fallback-ով դեպի Arm Local Mind։",
    reasoningMode: "standard",
    reasoningCapable: false,
    offlineCapable: true,
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
    envId: "OLLAMA_DEEPSEEK_MODEL",
    id: "deepseek-r1:8b",
    displayName: "Ollama DeepSeek-R1 8B (Local Reasoning)",
    provider: "Ollama · 127.0.0.1:11434",
    engine: "ollama",
    access: "free",
    badge: "OLLAMA R1",
    specialty: "Local open-weights chain-of-thought reasoning with <think> trace",
    specialtyHy: "Տեղային open-weights reasoning մոդել՝ մտածողության բլոկով",
    tagline: "Executes DeepSeek-R1 locally via Ollama and parses thinking traces natively.",
    taglineHy: "Մտածողության գործընթացը ցուցադրվում է առանձին վահանակում։",
    reasoningMode: "diagnostic",
    reasoningCapable: true,
    offlineCapable: true,
    contextEnv: "OLLAMA_DEEPSEEK_CONTEXT_TOKENS",
    outputEnv: "OLLAMA_DEEPSEEK_OUTPUT_TOKENS",
    contextWindowTokens: 64_000,
    outputWindowTokens: 8_192,
    githubUrl: "https://github.com/deepseek-ai/DeepSeek-R1",
    license: "MIT License",
    openSource: true,
    freeTier: true,
    releaseVersion: "8B Local",
  },
  {
    envId: "OLLAMA_CODER_MODEL",
    id: "qwen2.5-coder:7b",
    displayName: "Ollama Qwen 2.5 Coder 7B (Local Dev)",
    provider: "Ollama · 127.0.0.1:11434",
    engine: "ollama",
    access: "free",
    badge: "OLLAMA DEV",
    specialty: "Delphi, PowerShell, Bash, RouterOS Scripts, Next.js & TypeScript",
    specialtyHy: "Delphi, PowerShell, Bash, RouterOS սկրիպտներ և Next.js ծրագրավորում",
    tagline: "Local coding specialist for private scripts, firewall automation and debugging.",
    taglineHy: "Մասնագիտացված տեղային կոդավորման մոդել՝ սեփական սկրիպտների համար։",
    reasoningMode: "architect",
    reasoningCapable: false,
    offlineCapable: true,
    contextEnv: "OLLAMA_CODER_CONTEXT_TOKENS",
    outputEnv: "OLLAMA_CODER_OUTPUT_TOKENS",
    contextWindowTokens: 32_768,
    outputWindowTokens: 4_096,
    githubUrl: "https://github.com/QwenLM/Qwen2.5-Coder",
    license: "Apache 2.0",
    openSource: true,
    freeTier: true,
    releaseVersion: "7B Local",
  },
  {
    envId: "OPENAI_FREE_MODEL",
    legacyEnvId: "OPENAI_MODEL",
    id: "gpt-4.1-mini",
    displayName: "Arm AI Free (GPT-4.1 Mini)",
    provider: "OpenAI Cloud",
    engine: "openai",
    access: "free",
    badge: "CLOUD",
    specialty: "Fast multimodal-ready assistant with 1M token context via API",
    specialtyHy: "Արագ ամպային մոդել՝ 1M տոկեն կոնտեքստով (API բանալիի առկայության դեպքում)",
    tagline: "Fast cloud generation paired with Sipan's engineering system prompt.",
    taglineHy: "Արագ ամպային պատասխաններ՝ Սիփանի համակարգային հրահանգներով։",
    reasoningMode: "standard",
    reasoningCapable: false,
    offlineCapable: false,
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
    provider: "OpenAI Cloud",
    engine: "openai",
    access: "free",
    badge: "ECONOMY",
    specialty: "Lightweight cloud chat and quick bilingual queries",
    specialtyHy: "Թեթև և արագ ամպային մոդել՝ ամենօրյա հարցումների համար",
    tagline: "Economical cloud routing with streaming responses.",
    taglineHy: "Խնայողական ամպային տարբերակ՝ հոսքային արդյունքով։",
    reasoningMode: "standard",
    reasoningCapable: false,
    offlineCapable: false,
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
    provider: "Meta AI / OpenRouter Free",
    engine: "openai",
    access: "free",
    badge: "OSS 70B",
    specialty: "Open-source general engineering & bilingual dialogue via OpenRouter",
    specialtyHy: "Բաց կոդով 70B մոդել՝ ինժեներական վերլուծության և երկխոսության համար",
    tagline: "Open-weights 70B instruction model routed over OpenAI-compatible API.",
    taglineHy: "Հզոր բաց կոդով 70B մոդել OpenRouter-ի միջոցով։",
    reasoningMode: "standard",
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
    provider: "DeepSeek AI / OpenRouter Free",
    engine: "openai",
    access: "free",
    badge: "REASONING",
    specialty: "Deep logical verification, architecture & multi-step troubleshooting",
    specialtyHy: "Խորը տրամաբանական reasoning՝ բարդ ցանցային և կոդի խնդիրների համար",
    tagline: "Frontier open-weights reasoning model with transparent thinking steps.",
    taglineHy: "Մտածողության բարձր խորություն՝ բարդ ախտորոշումների համար։",
    reasoningMode: "diagnostic",
    reasoningCapable: true,
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
    provider: "Alibaba / OpenRouter Free",
    engine: "openai",
    access: "free",
    badge: "CODER",
    specialty: "Full-stack code, Delphi, networking scripts & CLI generation",
    specialtyHy: "Delphi, Next.js, TypeScript, PowerShell և ցանցային սկրիպտների մոդել",
    tagline: "Open-source coding specialist tailored to clean production code.",
    taglineHy: "Մասնագիտացված բաց կոդով ծրագրավորող մոդել։",
    reasoningMode: "architect",
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
    provider: "Mistral AI / OpenRouter Free",
    engine: "openai",
    access: "free",
    badge: "OSS 24B",
    specialty: "Fast European open-weights model for clear technical summaries",
    specialtyHy: "Արագ բաց կոդով մոդել՝ հակիրճ տեխնիկական վերլուծությունների համար",
    tagline: "Compact Apache 2.0 cloud instruction model.",
    taglineHy: "Արագ և ճշգրիտ Apache 2.0 մոդել։",
    reasoningMode: "standard",
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
    envId: "OPENAI_PRO_MODEL",
    id: "gpt-4.1",
    displayName: "Arm AI Pro (GPT-4.1)",
    provider: "OpenAI Cloud",
    engine: "openai",
    access: "pro",
    badge: "PRO",
    specialty: "Extended context flagship architecture & engineering model",
    specialtyHy: "Ֆլագման ամպային մոդել՝ մեծածավալ ճարտարապետական վերլուծության համար",
    tagline: "High-precision flagship model when Pro plan and API key are active.",
    taglineHy: "Առավելագույն ճշգրտություն՝ սերվերի Pro կարգավորման դեպքում։",
    reasoningMode: "architect",
    reasoningCapable: true,
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

export function getOllamaBaseUrl() {
  const raw = process.env.OLLAMA_BASE_URL?.trim();
  if (raw) return raw.replace(/\/+$/, "");
  return "http://127.0.0.1:11434";
}

export function isOllamaHostEnabled() {
  return Boolean(process.env.OLLAMA_BASE_URL?.trim()) || process.env.VERCEL !== "1";
}

function isEngineConfigured(engine: ModelEngine, apiKeyConfigured: boolean, ollamaEnabled: boolean) {
  if (engine === "local") return true;
  if (engine === "ollama") return ollamaEnabled;
  return apiKeyConfigured;
}

function modelSummaries(activePlan: PlanId): ModelSummary[] {
  const apiKeyConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  const ollamaEnabled = isOllamaHostEnabled();

  return definitions.map((definition) => {
    const id = configuredId(definition);
    const accessAllowed = planAllows(activePlan, definition.access);
    const configured = isEngineConfigured(definition.engine, apiKeyConfigured, ollamaEnabled);
    const contextTokens = boundedInteger(
      definition.contextEnv,
      definition.engine === "local" ? 32_768 : definition.access === "pro" ? 32_768 : 8_192,
      definition.contextWindowTokens
    );
    const outputTokens = boundedInteger(
      definition.outputEnv,
      definition.engine === "local" ? 4_096 : definition.access === "pro" ? 4_096 : 2_048,
      definition.outputWindowTokens
    );
    const inputPrice = optionalPrice(definition.priceInputEnv);
    const outputPrice = optionalPrice(definition.priceOutputEnv);

    return {
      id,
      provider: definition.provider,
      displayName: definition.displayName,
      engine: definition.engine,
      access: definition.access,
      badge: definition.badge,
      specialty: definition.specialty,
      specialtyHy: definition.specialtyHy,
      tagline: definition.tagline,
      taglineHy: definition.taglineHy,
      reasoningMode: definition.reasoningMode,
      capabilities: {
        text: true,
        streaming: true,
        voice: true,
        reasoning: Boolean(definition.reasoningCapable),
        offline: Boolean(definition.offlineCapable),
      },
      contextWindowTokens: definition.contextWindowTokens,
      contextTokens,
      outputTokens,
      configured,
      selectable: configured && accessAllowed,
      availability: !accessAllowed ? "plan-locked" : !configured ? "missing-api-key" : "configured",
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
  const apiKeyConfigured = Boolean(process.env.OPENAI_API_KEY?.trim());
  if (apiKeyConfigured) {
    const selectedCloud = models.find(
      (model) => model.engine === "openai" && model.access === activePlan && model.selectable
    );
    if (selectedCloud) return selectedCloud.id;
  }
  const localDefault = models.find((model) => model.engine === "local" && model.selectable);
  return localDefault?.id ?? models.find((model) => model.selectable)?.id ?? models[0]!.id;
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
    throw new RequestError("Arm AI is not connected yet. Switch to an Arm Local model or connect an API key.", 503);
  }
  if (model.availability === "plan-locked") {
    throw new RequestError("This model requires the Pro plan configured for this application.", 403);
  }
  return model;
}

export function getRequestModelLimits(model: ModelSummary) {
  const plan = getPlanSummary(getActivePlan());
  return {
    contextTokens: Math.min(model.contextTokens, Math.max(plan.contextTokens, model.engine === "local" ? 16_000 : plan.contextTokens)),
    contextChars: Math.min(24_000, Math.max(1, Math.min(model.contextTokens, Math.max(plan.contextTokens, model.engine === "local" ? 16_000 : plan.contextTokens)) * 4)),
    outputTokens: Math.min(model.outputTokens, Math.max(plan.outputTokens, model.engine === "local" ? 4_096 : plan.outputTokens)),
    requestsPerMinute: plan.requestsPerMinute,
  };
}
