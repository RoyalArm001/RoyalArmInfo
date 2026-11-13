"use client";

import Link from "next/link";
import type { ModelSummary, PlanId, PlanSummary } from "../lib/catalog-types";
import { useAiBasePath } from "../lib/ai-routes";
import { useLanguage } from "./language";
import { SiteNav } from "./site-nav";

const HY_FEATURES: Record<PlanId, string[]> = {
  free: [
    "Arm Local Mind (100% տեղային ինժեներական մտածողություն) + Ollama աջակցություն",
    "Ամպային և բաց կոդով հոսքային մոդելներ (API բանալիով)",
    "Զրույցների պատմությունը պահվում է սարքի վրա (IndexedDB)",
    "Ցանցային ճարտարապետության, սերվերների, անգլերենի և թարգմանության շաբլոններ",
    "Ձայնային մուտքագրում և խոսակցական մոդուլացիա",
  ],
  pro: [
    "Arm Local Mind + Pro դասի ֆլագման ամպային մոդելներ",
    "Զրույցների պատմությունը պահվում է սարքի վրա (IndexedDB)",
    "Բոլոր 11 շաբլոնները՝ ներառյալ Delphi և IT Pro հրահանգները",
    "Ձայնային մուտքագրում և խոսակցական մոդուլացիա",
    "Ընդլայնված կոնտեքստի և ելքային տոկենների սահմանաչափեր",
  ],
};

export function PlansPage({ plans, models, activePlan }: { plans: PlanSummary[]; models: ModelSummary[]; activePlan?: PlanId }) {
  const { language } = useLanguage();
  const aiHref = useAiBasePath();
  const hy = language === "hy";
  return (
    <div className="catalog-page">
      <SiteNav activePlan={activePlan ?? plans.find((plan) => plan.isActive)?.id} />
      <main className="catalog-main">
        <div className="catalog-hero">
          <span className="eyebrow">{hy ? "ԱՆՁՆԱԿԱՆ ՊԼԱՆՆԵՐ" : "PERSONAL PLANS"}</span>
          <h1>{hy ? "Ընտրիր քեզ հարմար ռեժիմը" : "Choose your workspace tier"}</h1>
          <p>{hy ? "Ամպային պլանը կարգավորվում է սերվերում, իսկ Arm Local Mind լոկալ շարժիչը բաց է միշտ։" : "Cloud limits are configured on the server, while Arm Local Mind runs locally without billing."}</p>
        </div>
        <div className="catalog-grid plan-grid">
          {plans.map((plan) => {
            const planModels = models.filter((model) => model.access === plan.id);
            return (
              <article className={`glass-card plan-card ${plan.id}`} key={plan.id}>
                <div className="card-topline">
                  <span className={`plan-badge ${plan.id}`}>{plan.name}</span>
                  {plan.isActive && <span className="availability configured">{hy ? "Ակտիվ է սերվերում" : "Active on server"}</span>}
                </div>
                <h2>{plan.id === "free" ? (hy ? "Անվճար և Լոկալ պլան" : "Free & Local Engine Plan") : (hy ? "Ավելի մեծ հնարավորություններ" : "Extended Pro Workspace")}</h2>
                {plan.priceLabel && <p className="plan-price">{plan.priceLabel}</p>}
                <ul className="feature-list">
                  {plan.features.map((feature, index) => (
                    <li key={feature}>{hy ? HY_FEATURES[plan.id][index] ?? feature : feature}</li>
                  ))}
                </ul>
                <div className="plan-models">
                  <strong>{hy ? "Մոդելներ" : "Models"} ({planModels.length})</strong>
                  {planModels.slice(0, 6).map((model) => (
                    <span key={`${model.engine}:${model.id}`}>{model.displayName} <small>({model.badge || model.id})</small></span>
                  ))}
                  {planModels.length > 6 && (
                    <small>{hy ? `և ևս ${planModels.length - 6} մոդել` : `+ ${planModels.length - 6} more models`}</small>
                  )}
                </div>
                <p className="plan-budget">{plan.contextTokens.toLocaleString()} {hy ? "համատեքստի token" : "context tokens"} · {plan.outputTokens.toLocaleString()} {hy ? "ելքային token" : "output tokens"} · {plan.requestsPerMinute} {hy ? "հարցում/րոպե" : "requests/minute"}</p>
                <Link className="secondary-link" href={aiHref(`/preview/${plan.id}`)}>{hy ? "Դիտել ցուցադրումը" : `Preview ${plan.name}`}</Link>
              </article>
            );
          })}
        </div>
        <div className="notice-card">
          <strong>{hy ? "Arm Local Mind մոդելներն աշխատում են անվճար, իսկ ամպային API-ի համար անհրաժեշտ է սերվերի բանալի։" : "Arm Local Mind models run locally with zero quota, while cloud APIs require a configured key."}</strong>
          <p>{hy
            ? "Առանց OpenAI/OpenRouter բանալիի RoyalArm AI-ը լռելյայն աշխատում է Սիփանի համար կառուցված Arm Local Mind և լոկալ Ollama շարժիչներով։"
            : "Without an external API key, RoyalArm AI automatically powers conversations via Sipan's built-in Arm Local Mind or your localhost Ollama server."}</p>
        </div>
        <footer className="catalog-footer"><a href="https://royalarm.uk">royalarm.uk</a><span>·</span><a href="https://youtube.com/@RoyalArm001" target="_blank" rel="noreferrer">YouTube</a></footer>
      </main>
    </div>
  );
}
