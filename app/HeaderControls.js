"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function HeaderControls() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // Sync initial language state
    const currentLang = document.documentElement.lang || window.localStorage.getItem("portfolio-language") || "en";
    setLang(currentLang);
    
    // Sync on storage change across tabs
    const handleStorage = () => {
      const savedLang = window.localStorage.getItem("portfolio-language");
      if (savedLang) setLang(savedLang);
    };
    
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleLanguage = () => {
    const langs = ["hy", "en", "ru"];
    const nextLang = langs[(langs.indexOf(lang) + 1) % langs.length];
    
    setLang(nextLang);
    
    // Call the global function exposed by translate.js
    if (typeof window.setPortfolioLanguage === "function") {
      window.setPortfolioLanguage(nextLang);
    } else {
      window.localStorage.setItem("portfolio-language", nextLang);
      document.documentElement.lang = nextLang;
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="header-controls">
      <button
        type="button"
        className="header-language-toggle"
        onClick={toggleLanguage}
        title="Toggle Language"
        aria-label="Change page language"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{lang.toUpperCase()}</span>
      </button>
      <ThemeToggle variant="icon" />
      <span data-translation-status className="sr-only" aria-live="polite" />
    </div>
  );
}
