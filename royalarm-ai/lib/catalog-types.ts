export type PlanId = "free" | "pro";

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
  access: PlanId;
  capabilities: {
    text: boolean;
    streaming: boolean;
    voice: boolean;
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
};
