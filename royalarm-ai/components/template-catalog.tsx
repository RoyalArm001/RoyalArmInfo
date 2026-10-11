"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { PlanId, TemplateSummary } from "../lib/catalog-types";
import { SiteNav } from "./site-nav";
import { useLanguage } from "./language";

const FAVORITES_KEY = "royalarm-ai-template-favorites";

export function TemplateCatalog({ templates, activePlan }: { templates: TemplateSummary[]; activePlan: PlanId }) {
  const { language } = useLanguage();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "favorites" | PlanId>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const hy = language === "hy";

  useEffect(() => {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (saved) {
      try {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
          window.setTimeout(() => setFavorites(parsed), 0);
        }
      } catch (error) {
        console.error("Could not read saved template favorites.", error);
      }
    }
  }, []);

  function toggleFavorite(slug: string) {
    const next = favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [...favorites, slug];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }

  const visible = useMemo(() => templates.filter((template) => {
    if (filter === "favorites" && !favorites.includes(template.slug)) return false;
    if (filter === "free" || filter === "pro") {
      if (template.requiredPlan !== filter) return false;
    }
    const content = `${template.title} ${template.titleEn} ${template.description} ${template.descriptionEn} ${template.examplePrompts.join(" ")}`.toLowerCase();
    return content.includes(query.trim().toLowerCase());
  }), [favorites, filter, query, templates]);

  return (
    <div className="catalog-page">
      <SiteNav activePlan={activePlan} />
      <main className="catalog-main">
        <div className="catalog-hero">
          <span className="eyebrow">{hy ? "ՊԱՏՐԱՍՏ ՕԳՆԱԿԱՆՆԵՐ" : "READY-TO-USE ASSISTANTS"}</span>
          <h1>{hy ? "Շաբլոններ՝ քո նպատակների համար" : "Templates for what you want to do"}</h1>
          <p>{hy ? "Յուրաքանչյուր շաբլոն ստեղծում է իրական զրույց և սերվերից ստանում է իր հատուկ հրահանգները։" : "Each template starts a real conversation with its own server-defined assistant instructions."}</p>
        </div>
        <div className="catalog-controls">
          <label className="search-box">
            <span>{hy ? "Որոնել շաբլոններ" : "Search templates"}</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={hy ? "Թեմա, նկարագրություն կամ օրինակ..." : "Topic, description, or prompt..."} />
          </label>
          <div className="filter-buttons" role="group" aria-label={hy ? "Ֆիլտրել շաբլոնները" : "Filter templates"}>
            {(["all", "favorites", "free", "pro"] as const).map((option) => (
              <button key={option} type="button" className={filter === option ? "selected" : ""} onClick={() => setFilter(option)}>
                {option === "all" ? (hy ? "Բոլորը" : "All") : option === "favorites" ? (hy ? "Պահպանվածները" : "Favorites") : option === "free" ? "Free" : "Pro"}
              </button>
            ))}
          </div>
        </div>
        <div className="catalog-grid template-grid">
          {visible.map((template) => {
            const locked = template.requiredPlan === "pro" && activePlan !== "pro";
            return (
              <article className="glass-card template-card" key={template.slug}>
                <div className="card-topline">
                  <span className={`plan-badge ${template.requiredPlan}`}>{template.requiredPlan}</span>
                  <button className={`favorite-button ${favorites.includes(template.slug) ? "saved" : ""}`} type="button" onClick={() => toggleFavorite(template.slug)} aria-label={favorites.includes(template.slug) ? (hy ? "Հեռացնել պահպանվածներից" : "Remove from favorites") : (hy ? "Պահպանել ընտրյալներում" : "Save to favorites")} aria-pressed={favorites.includes(template.slug)}>
                    {favorites.includes(template.slug) ? "★" : "☆"}
                  </button>
                </div>
                <h2>{hy ? template.title : template.titleEn}</h2>
                <p>{hy ? template.description : template.descriptionEn}</p>
                <ul className="prompt-list">{template.examplePrompts.map((prompt) => <li key={prompt}>“{prompt}”</li>)}</ul>
                <Link className="secondary-link" href={`/templates/${template.slug}`} aria-label={`${hy ? template.title : template.titleEn} - ${hy ? "Դիտել շաբլոնը" : "View template"}`}>{hy ? "Դիտել շաբլոնը" : "View template"} <span aria-hidden="true">→</span></Link>
                {locked && <p className="model-lock-note">{hy ? "Ակտիվացրու Pro պլանը սերվերում՝ օգտագործելու համար։" : "Activate Pro on the server to use this template."}</p>}
              </article>
            );
          })}
          {!visible.length && <p className="empty-filter">{hy ? "Համապատասխան շաբլոն չի գտնվել։" : "No matching templates found."}</p>}
        </div>
        <footer className="catalog-footer"><a href="https://royalarm.uk">royalarm.uk</a><span>·</span><a href="https://youtube.com/@RoyalArm001" target="_blank" rel="noreferrer">YouTube</a></footer>
      </main>
    </div>
  );
}

export function TemplateDetail({ template, activePlan }: { template: TemplateSummary; activePlan: PlanId }) {
  const { language } = useLanguage();
  const hy = language === "hy";
  const locked = template.requiredPlan === "pro" && activePlan !== "pro";
  return (
    <div className="catalog-page">
      <SiteNav activePlan={activePlan} />
      <main className="catalog-main detail-main">
        <Link className="back-link" href="/templates">← {hy ? "Բոլոր շաբլոնները" : "All templates"}</Link>
        <div className="glass-card template-detail-card">
          <span className={`plan-badge ${template.requiredPlan}`}>{template.requiredPlan}</span>
          <h1>{hy ? template.title : template.titleEn}</h1>
          <p className="detail-description">{hy ? template.description : template.descriptionEn}</p>
          <h2>{hy ? "Փորձիր այս հուշումները" : "Try these example prompts"}</h2>
          <ul className="prompt-list">{template.examplePrompts.map((prompt) => <li key={prompt}>“{prompt}”</li>)}</ul>
          {locked
            ? <div className="locked-action"><p>{hy ? "Այս շաբլոնը հասանելի է Pro պլանի դեպքում։ Պլանը փոխվում է սերվերի կարգավորումներում։" : "This template is available with the Pro plan configured on the server."}</p><Link className="primary-link" href="/plans">{hy ? "Տեսնել պլանները" : "View plans"}</Link></div>
            : <Link className="primary-link" href={`/?template=${encodeURIComponent(template.slug)}`}>{hy ? "Սկսել զրույցը" : "Start conversation"} <span aria-hidden="true">→</span></Link>}
        </div>
      </main>
    </div>
  );
}
