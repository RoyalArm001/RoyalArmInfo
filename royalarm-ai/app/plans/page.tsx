import { PlansPage } from "../../components/plans-page";
import { getModelSummaries } from "../../lib/models";
import { getActivePlan, getPlanSummaries } from "../../lib/plans";

export default function Page() {
  return <PlansPage plans={getPlanSummaries()} models={getModelSummaries()} activePlan={getActivePlan()} />;
}
