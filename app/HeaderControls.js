"use client";

import { setPortfolioLanguage, usePortfolioLanguage } from "./usePortfolioLanguage";
import ThemeToggle from "./ThemeToggle";
import PageTranslation from "./PageTranslation";

export default function HeaderControls() {
  const lang = usePortfolioLanguage();
  const languages = ["hy", "en", "ru"];
  const next = languages[(languages.indexOf(lang) + 1) % languages.length];

  return (
    <div className="header-controls">
      <PageTranslation />
      <button
        type="button"
        className="header-language-toggle"
        onClick={() => setPortfolioLanguage(next)}
        title="Toggle Language"
        aria-label="Change page language"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span data-no-translate>{lang.toUpperCase()}</span>
      </button>
      <ThemeToggle variant="icon" />
      <span data-no-translate className="sr-only" aria-live="polite">
        {{ en: "English selected", hy: "Ընտրված է հայերենը", ru: "Выбран русский язык" }[lang]}
      </span>
    </div>
  );
}
