export type PlanId = "free" | "pro";
export type ModelEngine = "local" | "ollama" | "openai";
export type ThinkingProfileId = "architect" | "diagnostic" | "developer" | "mentor";
export type ReasoningDepth = "fast" | "deep";

export type PlanSummary = {
  id: PlanId;
  name: string;
  priceLabel?: string;
  isActive: boolean;
  contextTokens: number;
  outputTokens: number;
  requestsPerMinute: number;
  features: string[];
};

export type ModelSummary = {
  id: string;
  provider: string;
  displayName: string;
  engine: ModelEngine;
  access: PlanId;
  badge?: string;
  specialty?: string;
  specialtyHy?: string;
  tagline?: string;
  taglineHy?: string;
  reasoningMode?: "architect" | "diagnostic" | "bilingual" | "standard";
  capabilities: {
    text: boolean;
    streaming: boolean;
    voice: boolean;
    reasoning?: boolean;
    offline?: boolean;
  };
  contextWindowTokens: number;
  contextTokens: number;
  outputTokens: number;
  configured: boolean;
  selectable: boolean;
  availability: "configured" | "missing-api-key" | "plan-locked";
  price?: {
    inputUsdPerMillion: number;
    outputUsdPerMillion: number;
  };
  githubUrl?: string;
  license?: string;
  openSource?: boolean;
  freeTier?: boolean;
  releaseVersion?: string;
};

export type TemplateSummary = {
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  examplePrompts: string[];
  requiredPlan: PlanId;
  category?: "engineering" | "security" | "language" | "general";
  badgeHy?: string;
};
