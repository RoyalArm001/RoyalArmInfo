import { Chat } from "../../royalarm-ai/components/chat";
import { getDefaultModelId, getModelSummaries } from "../../royalarm-ai/lib/models";
import { getActivePlan } from "../../royalarm-ai/lib/plans";
import { authenticated } from "../../royalarm-ai/lib/auth";

export const metadata = {
  title: "RoyalArm AI — Your personal AI space",
  description: "Private personal AI chat by RoyalArm.",
  robots: { index: false, follow: false },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080f1e",
};

export default async function AiPage() {
  const isAuth = await authenticated().catch(() => false);
  return (
    <Chat
      initialAuthenticated={isAuth}
      models={getModelSummaries()}
      defaultModelId={getDefaultModelId()}
      activePlan={getActivePlan()}
    />
  );
}
