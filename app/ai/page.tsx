import { redirect } from "next/navigation";
import { Chat } from "../../royalarm-ai/components/chat";
import { getDefaultModelId, getModelSummaries } from "../../royalarm-ai/lib/models";
import { getActivePlan } from "../../royalarm-ai/lib/plans";
import { canUseTemplate, getTemplateSummary } from "../../royalarm-ai/lib/templates";

export const metadata = {
  title: "RoyalArm AI — Սիփանի Ինժեներական Աշխատասեղան",
  description: "Private local-first engineering AI workspace by Sipan Danielyan (RoyalArm).",
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060a10",
};

export default async function AiPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = searchParams ? await searchParams : {};
  const templateSlug = typeof query.template === "string" ? query.template : undefined;
  const modelParam = typeof query.model === "string" ? query.model : undefined;
  const template = templateSlug ? getTemplateSummary(templateSlug) : undefined;

  if (templateSlug && (!template || !canUseTemplate(template))) {
    redirect(template ? `/ai/templates/${encodeURIComponent(template.slug)}` : "/ai/templates");
  }

  const models = getModelSummaries();
  const initialModelId =
    modelParam && models.some((m) => m.id === modelParam && m.selectable) ? modelParam : undefined;

  return (
    <Chat
      initialAuthenticated={true}
      models={models}
      defaultModelId={getDefaultModelId()}
      activePlan={getActivePlan()}
      initialTemplate={template}
      initialModelId={initialModelId}
    />
  );
}
