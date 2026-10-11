"use client";

import { useMemo, useState } from "react";
import type { ModelSummary, PlanId } from "../lib/catalog-types";
import { SiteNav } from "./site-nav";
import { useLanguage } from "./language";

export function ModelCatalog({ models, activePlan }: { models: ModelSummary[]; activePlan: PlanId }) {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | PlanId>("all");
  const hy = language === "hy";
  const visible = useMemo(() => models.filter((model) => {
    const matchesFilter = filter === "all" || model.access === filter;
    const content = `${model.displayName} ${model.id} ${model.provider} ${model.access}`.toLowerCase();
    return matchesFilter && content.includes(query.trim().toLowerCase());
  }), [filter, models, query]);

  return (
    <div className="catalog-page">
      <SiteNav activePlan={activePlan} />
      <main className="catalog-main">
        <div className="catalog-hero">
          <span className="eyebrow">{hy ? "ՄՈԴԵԼՆԵՐԻ ԿԱՏԱԼՈԳ" : "MODEL CATALOG"}</span>
          <h1>{hy ? "Ընտրիր քո AI մոդելը" : "Choose your AI model"}</h1>
          <p>{hy ? "Ընտրությունը փոխանցվում է սերվերին և ստուգվում է յուրաքանչյուր հարցման ժամանակ։" : "Your selection is sent to the server and validated on every request."}</p>
        </div>

        <div className="catalog-controls">
          <label className="search-box">
            <span>{hy ? "Որոնել մոդել" : "Search models"}</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={hy ? "Անուն, ID կամ provider..." : "Name, ID, or provider..."} />
          </label>
          <div className="filter-buttons" role="group" aria-label={hy ? "Ֆիլտրել ըստ պլանի" : "Filter by plan"}>
            {(["all", "free", "pro"] as const).map((option) => (
              <button key={option} type="button" className={filter === option ? "selected" : ""} onClick={() => setFilter(option)}>
                {option === "all" ? (hy ? "Բոլորը" : "All") : option === "free" ? "Free" : "Pro"}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-grid model-grid">
          {visible.map((model) => {
            const locked = model.access === "pro" && activePlan === "free";
            return (
              <article className="glass-card model-card" key={`${model.provider}:${model.id}`}>
                <div className="card-topline">
                  <span className={`plan-badge ${model.access}`}>{model.access}</span>
                  <span className={`availability ${model.configured ? "configured" : "unavailable"}`}>
                    {model.configured ? (hy ? "Կարգավորված" : "Configured") : (hy ? "Անհասանելի" : "Unavailable")}
                  </span>
                </div>
                <h2>{model.displayName}</h2>
                <p className="model-id">{hy ? "Arm AI մոդել" : "Arm AI model"}</p>
                <div className="capability-list">
                  <span>{hy ? "Տեքստ" : "Text"}: {model.capabilities.text ? "✓" : "—"}</span>
                  <span>{hy ? "Հոսքային" : "Streaming"}: {model.capabilities.streaming ? "✓" : "—"}</span>
                  <span>{hy ? "Մոդելի ձայն" : "Model voice"}: {model.capabilities.voice ? "✓" : (hy ? "Չի աջակցվում" : "Not supported")}</span>
                </div>
                <p className="model-budget">
                  {hy ? "Հարցման բյուջե" : "Request budget"}: {model.contextTokens.toLocaleString()} {hy ? "համատեքստ" : "context"} · {model.outputTokens.toLocaleString()} {hy ? "ելքային token" : "output tokens"}
                </p>
                <p className="model-budget">{hy ? "Մոդելի առավելագույն համատեքստ" : "Model context window"}: {model.contextWindowTokens.toLocaleString()} {hy ? "token" : "tokens"}</p>
                {model.price && <p className="provider-price">API: ${model.price.inputUsdPerMillion}/1M input · ${model.price.outputUsdPerMillion}/1M output</p>}
                {locked && <p className="model-lock-note">{hy ? "Պահանջվում է սերվերում ակտիվացված Pro պլանը։" : "Requires the Pro plan to be activated on the server."}</p>}
                {!model.configured && <p className="model-lock-note">{hy ? "Arm AI ծառայությունը դեռ միացված չէ։ Զրույցներն այս սարքում պահպանվում են։" : "Arm AI is not connected yet. Conversations are saved on this device."}</p>}
              </article>
            );
          })}
          {!visible.length && <p className="empty-filter">{hy ? "Համապատասխան մոդել չի գտնվել։" : "No matching models found."}</p>}
        </div>
        <p className="catalog-footnote">
          {hy
            ? "Arm AI-ի հասանելիությունը որոշվում է սերվերի կարգավորումներով։ Մինչ ծառայությունը միացված չէ, զրույցներն ու ուսուցման տվյալները պահվում են այս սարքում։"
            : "Arm AI availability is controlled by server configuration. Until it is connected, conversations and learning data stay on this device."}
        </p>
        <footer className="catalog-footer"><a href="https://royalarm.uk">royalarm.uk</a><span>·</span><a href="https://youtube.com/@RoyalArm001" target="_blank" rel="noreferrer">YouTube</a></footer>
      </main>
    </div>
  );
}
