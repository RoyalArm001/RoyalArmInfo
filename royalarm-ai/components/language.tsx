"use client";

import { useEffect, useState } from "react";

export type Language = "hy" | "en";

const STORAGE_KEY = "royalarm-ai-language";

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("hy");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "hy" || saved === "en") {
      window.requestAnimationFrame(() => setLanguage(saved));
    }
  }, []);

  function toggleLanguage() {
    const next = language === "hy" ? "en" : "hy";
    setLanguage(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  return { language, toggleLanguage };
}

export function LanguageButton() {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button className="language-button" type="button" onClick={toggleLanguage} aria-label={language === "hy" ? "Switch to English" : "Փոխել հայերենի"}>
      {language === "hy" ? "EN" : "Հայ"}
    </button>
  );
}
