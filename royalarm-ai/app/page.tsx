import { redirect } from "next/navigation";
import { Chat } from "../components/chat";
import { getDefaultModelId, getModelSummaries } from "../lib/models";
import { getActivePlan } from "../lib/plans";
import { canUseTemplate, getTemplateSummary } from "../lib/templates";
import { authenticated } from "../lib/auth";

export default async function Page({ searchParams }: PageProps<"/">) {
  const query = await searchParams;
  const templateSlug = typeof query.template === "string" ? query.template : undefined;
  const template = templateSlug ? getTemplateSummary(templateSlug) : undefined;
  if (templateSlug && (!template || !canUseTemplate(template))) {
    redirect(template ? `/templates/${encodeURIComponent(template.slug)}` : "/templates");
  }
  return (
    <Chat
      initialAuthenticated={true}
      models={getModelSummaries()}
      defaultModelId={getDefaultModelId()}
      activePlan={getActivePlan()}
      initialTemplate={template}
    />
  );
}
