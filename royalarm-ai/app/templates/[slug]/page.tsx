import { notFound } from "next/navigation";
import { TemplateDetail } from "../../../components/template-catalog";
import { getActivePlan } from "../../../lib/plans";
import { getTemplateSummary } from "../../../lib/templates";

export default async function Page({ params }: PageProps<"/templates/[slug]">) {
  const { slug } = await params;
  const template = getTemplateSummary(slug);
  if (!template) notFound();
  return <TemplateDetail template={template} activePlan={getActivePlan()} />;
}
