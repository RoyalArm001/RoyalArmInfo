import { TemplateCatalog } from "../../components/template-catalog";
import { getActivePlan } from "../../lib/plans";
import { getTemplateSummaries } from "../../lib/templates";

export default function Page() {
  return <TemplateCatalog templates={getTemplateSummaries()} activePlan={getActivePlan()} />;
}
