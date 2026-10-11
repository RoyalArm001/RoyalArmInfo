"use client";

import type { ModelSummary, PlanId, PlanSummary } from "../lib/catalog-types";
import { useLanguage } from "./language";
import { SiteNav } from "./site-nav";

export function PlansPage({ plans, models, activePlan }: { plans: PlanSummary[]; models: ModelSummary[]; activePlan?: PlanId }) {
  const { language } = useLanguage();
  const hy = language === "hy";
  return (
    <div className="catalog-page">
      <SiteNav activePlan={activePlan ?? plans.find((plan) => plan.isActive)?.id} />
      <main className="catalog-main">
        <div className="catalog-hero">
          <span className="eyebrow">{hy ? "ԱՆՁՆԱԿԱՆ ՊԼԱՆՆԵՐ" : "PERSONAL PLANS"}</span>
          <h1>{hy ? "Ընտրիր քեզ հարմար փորձը" : "Choose your workspace"}</h1>
          <p>{hy ? "Պլանը կարգավորվում է սերվերում․ այստեղ վճարում կամ գնում չկա։" : "Your plan is configured on the server. There is no checkout or purchase flow here."}</p>
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
                <h2>{plan.id === "free" ? (hy ? "Անվճար հավելվածի պլան" : "Free application plan") : (hy ? "Ավելի մեծ հնարավորություններ" : "More room to explore")}</h2>
                {plan.priceLabel && <p className="plan-price">{plan.priceLabel}</p>}
                <ul className="feature-list">
                  {plan.features.map((feature, index) => <li key={feature}>{hy ? feature : [
                    plan.id === "free" ? "Economical text models with streaming" : "Economical and advanced text models with streaming",
                    "Conversation history saved in this browser",
                    plan.id === "free" ? "General, English practice, translation and travel templates" : "All seven assistant templates",
                    "Browser speech input and read-aloud controls",
                    plan.id === "free" ? "Standard request and response limits" : "Larger configurable context and response limits",
                  ][index]}</li>)}
                </ul>
                <div className="plan-models">
                  <strong>{hy ? "Մոդելներ" : "Models"}</strong>
                  {planModels.map((model) => <span key={model.id}>{model.displayName} <small>({model.id})</small></span>)}
                  {!planModels.length && <span>{hy ? "Մոդելներ չեն կարգավորվել" : "No models configured"}</span>}
                </div>
                <p className="plan-budget">{plan.contextTokens.toLocaleString()} {hy ? "համատեքստի token" : "context tokens"} · {plan.outputTokens.toLocaleString()} {hy ? "ելքային token" : "output tokens"} · {plan.requestsPerMinute} {hy ? "հարցում/րոպե" : "requests/minute"}</p>
                <a className="secondary-link" href={`/preview/${plan.id}`}>{hy ? "Դիտել ցուցադրումը" : `Preview ${plan.name}`}</a>
              </article>
            );
          })}
        </div>
        <div className="notice-card">
          <strong>{hy ? "Free հավելվածի պլանը չի նշանակում անվճար provider API օգտագործում։" : "The Free app plan does not mean free provider API usage."}</strong>
          <p>{hy
            ? "Հարցումները կատարվում են սերվերի OpenAI API բանալիով և կարող են վճարովի լինել։ OpenAI-ի account-ի billing-ը, usage tier-ը և սահմանաչափերը առանձին են։ Այս հավելվածը provider-ի անվճար quota կամ անվճար API credits չի խոստանում։"
            : "Requests use the server's OpenAI API key and may incur charges. OpenAI account billing, usage tier, and limits are separate. This app does not promise a provider free quota or free API credits."}</p>
          <a href="https://developers.openai.com/api/docs/pricing" target="_blank" rel="noreferrer">{hy ? "OpenAI API պաշտոնական գնացուցակ ↗" : "Official OpenAI API pricing ↗"}</a>
        </div>
        <footer className="catalog-footer"><a href="https://royalarm.uk">royalarm.uk</a><span>·</span><a href="https://youtube.com/@RoyalArm001" target="_blank" rel="noreferrer">YouTube</a></footer>
      </main>
    </div>
  );
}
