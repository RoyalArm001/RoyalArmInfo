import { PreviewPage } from "../../../components/preview-page";
import { getModelSummaries } from "../../../lib/models";
import { getPlanSummary } from "../../../lib/plans";

export default function Page() {
  return <PreviewPage plan={getPlanSummary("pro")} models={getModelSummaries()} />;
}
