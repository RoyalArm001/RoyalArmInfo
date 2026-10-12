import { notFound } from "next/navigation";
import { TemplateDetail } from "../../../../royalarm-ai/components/template-catalog";
import { getActivePlan } from "../../../../royalarm-ai/lib/plans";
import { getTemplateSummary } from "../../../../royalarm-ai/lib/templates";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = getTemplateSummary(slug);
  if (!template) notFound();
  return <TemplateDetail template={template} activePlan={getActivePlan()} />;
}
