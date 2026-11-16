"use client";

import { usePortfolioLanguage } from "../usePortfolioLanguage";

export default function LocalizedText({ en, hy, ru }) {
  const language = usePortfolioLanguage();
  return <span data-no-translate>{{ en, hy, ru }[language] || en}</span>;
}
