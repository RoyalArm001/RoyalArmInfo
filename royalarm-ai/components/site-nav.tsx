"use client";

import Link from "next/link";
import { useLanguage } from "./language";
import { useAiBasePath } from "@/lib/ai-routes";

export function SiteNav({ activePlan }: { activePlan?: "free" | "pro" }) {
  const { language, toggleLanguage } = useLanguage();
  const aiHref = useAiBasePath();
  const labels =
    language === "hy"
      ? { chat: "Զրույց", plans: "Պլաններ", models: "Մոդելներ", templates: "Շաբլոններ", active: "Ակտիվ պլան" }
      : { chat: "Chat", plans: "Plans", models: "Models", templates: "Templates", active: "Active plan" };

  return (
    <header className="site-nav">
      <Link className="site-brand" href={aiHref("/")}>
        <span className="brand-mark"><span className="brand-orbit" /></span>
        <span>RoyalArm <strong>AI</strong></span>
      </Link>
      <nav aria-label={language === "hy" ? "Հիմնական նավարկում" : "Main navigation"}>
        <Link href={aiHref("/")}>{labels.chat}</Link>
        <Link href={aiHref("/plans")}>{labels.plans}</Link>
        <Link href={aiHref("/models")}>{labels.models}</Link>
        <Link href={aiHref("/templates")}>{labels.templates}</Link>
        <a href="https://royalarm.uk">royalarm.uk</a>
      </nav>
      <div className="site-nav-actions">
        {activePlan && <span className="active-plan-chip">{labels.active}: {activePlan === "free" ? "Free" : "Pro"}</span>}
        <button className="language-button" type="button" onClick={toggleLanguage} aria-label={language === "hy" ? "Switch to English" : "Փոխել հայերենի"}>
          {language === "hy" ? "EN" : "Հայ"}
        </button>
      </div>
    </header>
  );
}
