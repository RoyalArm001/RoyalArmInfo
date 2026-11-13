"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { ModelEngine, ModelSummary, PlanId } from "../lib/catalog-types";
import { useAiBasePath } from "../lib/ai-routes";
import { SiteNav } from "./site-nav";
import { useLanguage } from "./language";

type LocalStatus = {
  localMindReady: boolean;
  cloudConfigured: boolean;
  ollamaReachable: boolean;
  installedOllamaModels: string[];
};

export function ModelCatalog({ models, activePlan }: { models: ModelSummary[]; activePlan: PlanId }) {
  const { language } = useLanguage();
  const aiHref = useAiBasePath();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | ModelEngine | "pro">("all");
  const [status, setStatus] = useState<LocalStatus | null>(null);
  const hy = language === "hy";

  useEffect(() => {
    let mounted = true;
    fetch("/api/local-models")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: LocalStatus | null) => {
        if (mounted && data) setStatus(data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const visible = useMemo(
    () =>
      models.filter((model) => {
        const matchesFilter =
          filter === "all"
            ? true
            : filter === "pro"
            ? model.access === "pro"
            : model.engine === filter;
        const content = `${model.displayName} ${model.id} ${model.provider} ${model.specialty ?? ""} ${model.specialtyHy ?? ""} ${model.access}`.toLowerCase();
        return matchesFilter && content.includes(query.trim().toLowerCase());
      }),
    [filter, models, query]
  );

  return (
    <div className="catalog-page">
      <SiteNav activePlan={activePlan} />
      <main className="catalog-main">
        <div className="catalog-hero">
          <span className="eyebrow">{hy ? "ՄՈԴԵԼՆԵՐԻ ՃԱՐՏԱՐԱՊԵՏՈՒԹՅՈՒՆ" : "MODEL ARCHITECTURE"}</span>
          <h1>{hy ? "Լոկալ մտածողություն և բազմաշարժիչ մոդելներ" : "Local Reasoning & Multi-Engine Models"}</h1>
          <p>
            {hy
              ? "Ընտրիր Սիփանի ինժեներական Arm Local Mind շարժիչը, տեղային Ollama կամ ամպային մոդելները։"
              : "Switch seamlessly between Sipan’s built-in Arm Local Mind engine, local Ollama daemons, and cloud providers."}
          </p>
        </div>

        <div className="engine-telemetry-strip glass-card">
          <div className="telemetry-node">
            <span className="telemetry-dot online" />
            <div>
              <strong>Arm Local Mind v3</strong>
              <span>{hy ? "Ակտիվ · 0 ms latency · 100% տեղային" : "Active · Zero key required · Instant"}</span>
            </div>
          </div>
          <div className="telemetry-node">
            <span className={`telemetry-dot ${status?.ollamaReachable ? "online" : "standby"}`} />
            <div>
              <strong>Ollama Daemon (127.0.0.1:11434)</strong>
              <span>
                {status?.ollamaReachable
                  ? hy
                    ? `Միացված (${status.installedOllamaModels.slice(0, 3).join(", ") || "պատրաստ է"})`
                    : `Online (${status.installedOllamaModels.slice(0, 3).join(", ") || "ready"})`
                  : hy
                  ? "Սպասման ռեժիմ (fallback -> Arm Local)"
                  : "Standby (falls back to Arm Local)"}
              </span>
            </div>
          </div>
          <div className="telemetry-node">
            <span className={`telemetry-dot ${status?.cloudConfigured ? "online" : "standby"}`} />
            <div>
              <strong>Cloud / OpenRouter API</strong>
              <span>
                {status?.cloudConfigured
                  ? hy
                    ? "Միացված է սերվերում"
                    : "Configured on server"
                  : hy
                  ? "Կարգավորված չէ (Arm Local-ը միացված է)"
                  : "Unconfigured (Arm Local active)"}
              </span>
            </div>
          </div>
        </div>

        <div className="catalog-controls">
          <label className="search-box">
            <span>{hy ? "Որոնել մոդել կամ մասնագիտացում" : "Search models or specialty"}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={hy ? "Local, Ollama, DeepSeek, MikroTik..." : "Name, ID, or provider..."}
            />
          </label>
          <div className="filter-buttons" role="group" aria-label={hy ? "Ֆիլտրել ըստ շարժիչի" : "Filter by engine"}>
            {(
              [
                ["all", hy ? "Բոլորը" : "All"],
                ["local", hy ? "Arm Local" : "Arm Local"],
                ["ollama", "Ollama"],
                ["openai", hy ? "Cloud / OSS" : "Cloud / OSS"],
                ["pro", "Pro"],
              ] as const
            ).map(([option, label]) => (
              <button
                key={option}
                type="button"
                className={filter === option ? "selected" : ""}
                onClick={() => setFilter(option)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-grid model-grid">
          {visible.map((model) => {
            const locked = model.access === "pro" && activePlan === "free";
            return (
              <article className="glass-card model-card" key={`${model.engine}:${model.id}`}>
                <div className="card-topline">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`plan-badge ${model.access}`}>{model.badge || model.access}</span>
                    <span className={`engine-pill engine-${model.engine}`}>
                      {model.engine === "local" ? (hy ? "Լոկալ" : "Local") : model.engine === "ollama" ? "Ollama" : "Cloud API"}
                    </span>
                  </div>
                  <span className={`availability ${model.selectable ? "configured" : "unavailable"}`}>
                    {model.selectable
                      ? hy
                        ? "Պատրաստ է"
                        : "Ready"
                      : model.availability === "plan-locked"
                      ? "Pro"
                      : hy
                      ? "Բանալի է պետք"
                      : "Unavailable"}
                  </span>
                </div>
                <h2>{model.displayName}</h2>
                <p className="model-id">{model.provider} · <code>{model.id}</code></p>
                {(model.specialtyHy || model.specialty) && (
                  <p className="model-specialty">{hy ? model.specialtyHy || model.specialty : model.specialty}</p>
                )}
                <div className="capability-list">
                  <span>{hy ? "Մտածողություն" : "Reasoning"}: {model.capabilities.reasoning ? "✓ Trace" : "Standard"}</span>
                  <span>{hy ? "Անցանց" : "Local"}: {model.capabilities.offline ? "✓" : "Cloud"}</span>
                  <span>{hy ? "Կոնտեքստ" : "Context"}: {Math.round(model.contextWindowTokens / 1000)}K</span>
                </div>
                <p className="model-budget">
                  {hy ? "Հարցման բյուջե" : "Request budget"}: {model.contextTokens.toLocaleString()} ctx · {model.outputTokens.toLocaleString()} out
                </p>
                {model.price && (
                  <p className="provider-price">
                    API: ${model.price.inputUsdPerMillion}/1M in · ${model.price.outputUsdPerMillion}/1M out
                  </p>
                )}
                {model.selectable ? (
                  <Link className="secondary-link" href={aiHref(`/?model=${encodeURIComponent(model.id)}`)}>
                    {hy ? "Օգտագործել չաթում →" : "Launch in Chat →"}
                  </Link>
                ) : locked ? (
                  <p className="model-lock-note">{hy ? "Պահանջվում է սերվերում ակտիվացված Pro պլանը։" : "Requires Pro plan on server."}</p>
                ) : (
                  <p className="model-lock-note">{hy ? "Կարգավորիր API բանալի սերվերում կամ ընտրիր Arm Local։" : "Requires server API key; Arm Local is always ready."}</p>
                )}
              </article>
            );
          })}
          {!visible.length && <p className="empty-filter">{hy ? "Համապատասխան մոդել չի գտնվել։" : "No matching models found."}</p>}
        </div>
        <footer className="catalog-footer">
          <a href="https://royalarm.uk">royalarm.uk</a>
          <span>·</span>
          <a href="https://it.royalarm.uk">it.royalarm.uk</a>
          <span>·</span>
          <a href="https://shop.royalarm.uk">shop.royalarm.uk</a>
        </footer>
      </main>
    </div>
  );
}
