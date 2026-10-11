import { ModelCatalog } from "../../components/model-catalog";
import { getModelSummaries } from "../../lib/models";
import { getActivePlan } from "../../lib/plans";

export default function Page() {
  return <ModelCatalog models={getModelSummaries()} activePlan={getActivePlan()} />;
}
