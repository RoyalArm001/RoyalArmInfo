"use client";

import type { ModelSummary, PlanSummary } from "../lib/catalog-types";
import { SiteNav } from "./site-nav";
import { useLanguage } from "./language";

export function PreviewPage({ plan, models }: { plan: PlanSummary; models: ModelSummary[] }) {
  const { language } = useLanguage();
  const hy = language === "hy";
  const examples = plan.id === "free"
    ? [{ role: "you", text: hy ? "Կօգնե՞ս ամեն օր անգլերեն վարժվել։" : "Can you help me practice English every day?" }, { role: "ai", text: hy ? "Բարև 👋 Իհարկե։ Սկսենք կարճ զրույցից։ Ի՞նչ ես սիրում անել ազատ ժամանակ։" : "Բարև 👋 Absolutely. Let’s start with a short conversation. What do you enjoy doing in your free time?" }]
    : [{ role: "you", text: hy ? "Օգնիր պատրաստվել ՏՏ հարցազրույցի։" : "Help me prepare for an IT interview." }, { role: "ai", text: hy ? "Բարև 👋 Կանցկացնենք փորձնական հարցազրույց՝ տեխնիկական և աշխատանքային անգլերենով։ Պատրա՞ստ ես սկսել։" : "Բարև 👋 We’ll run a practice interview using technical and workplace English. Ready to begin?" }];

  return (
    <div className="catalog-page">
      <SiteNav activePlan={plan.isActive ? plan.id : undefined} />
      <main className="catalog-main preview-main">
        <div className="catalog-hero">
          <span className={`plan-badge ${plan.id}`}>{plan.name} · {hy ? "ՑՈՒՑԱԴՐՈՒՄ" : "DEMO"}</span>
          <h1>{hy ? `${plan.name} պլանի ցուցադրում` : `${plan.name} plan preview`}</h1>
          <p>{hy ? "Սա ցուցադրական օրինակ է․ այն չի փոխում ակտիվ պլանը, չի ուղարկում հարցում և վճարում չի կատարում։" : "This is a demonstration only. It does not change your active plan, send an API request, or take payment."}</p>
        </div>
        <section className="preview-shell glass-card">
          <div className="ai-orb" aria-hidden="true"><span /><span /><span /></div>
          <div className="preview-chat">
            {examples.map((message, index) => <div className={`preview-message ${message.role}`} key={index}><span>{message.role === "ai" ? "RoyalArm AI" : (hy ? "Դու" : "You")}</span><p>{message.text}</p></div>)}
          </div>
          <div className="preview-meta">{models.filter((model) => model.access === plan.id).map((model) => <span className="plan-badge" key={model.id}>{model.displayName}</span>)}</div>
          <ul className="feature-list preview-features">{plan.features.map((feature) => <li key={feature}>{hy ? feature : feature.replace("Economical", "Economical").replace("Conversation history saved in this browser", "Conversation history saved in this browser")}</li>)}</ul>
          <p className="demo-watermark">{hy ? "ՑՈՒՑԱԴՐԱԿԱՆ ԷԿՐԱՆ" : "DEMONSTRATION SCREEN"}</p>
        </section>
        <a className="secondary-link" href="/plans">{hy ? "Վերադառնալ պլաններին" : "Back to plans"}</a>
      </main>
    </div>
  );
}
