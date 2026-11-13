import { redirect } from "next/navigation";
import { Chat } from "../components/chat";
import { getDefaultModelId, getModelSummaries } from "../lib/models";
import { getActivePlan } from "../lib/plans";
import { canUseTemplate, getTemplateSummary } from "../lib/templates";

export default async function Page({ searchParams }: PageProps<"/">) {
  const query = await searchParams;
  const templateSlug = typeof query.template === "string" ? query.template : undefined;
  const modelParam = typeof query.model === "string" ? query.model : undefined;
  const template = templateSlug ? getTemplateSummary(templateSlug) : undefined;

  if (templateSlug && (!template || !canUseTemplate(template))) {
    redirect(template ? `/templates/${encodeURIComponent(template.slug)}` : "/templates");
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
