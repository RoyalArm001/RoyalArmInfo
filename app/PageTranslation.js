"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import dictionary from "../public/i18n/translations.json";
import { usePortfolioLanguage } from "./usePortfolioLanguage";

const ignored = "script,style,noscript,svg,code,pre,.site-entry-loader,.resume-sheet,.ai-root,[data-no-translate]";
const attributes = ["placeholder", "title", "aria-label", "alt"];
const records = new WeakMap();

// Keep the author's text for switching back, and pick up fresh text written by React.
function translateValue(node, field, current, language) {
  const fields = records.get(node);
  const previous = fields?.[field];
  const source = previous?.output === current ? previous.source : current;
  const trimmed = source.trim();
  const localized = dictionary[language][trimmed.replace(/\s+/g, " ")];
  const output = typeof localized === "string" ? source.replace(trimmed, () => localized) : source;
  if (output !== current) {
    const record = fields || {};
    record[field] = { source, output };
    records.set(node, record);
    if (field === "text") node.nodeValue = output;
    else node.setAttribute(field, output);
  } else if (previous && previous.output !== current) {
    delete fields[field];
  }
}

function translateTree(node, language) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.nodeValue.trim()) translateValue(node, "text", node.nodeValue, language);
    return;
  }
  if (!(node instanceof HTMLElement) || node.matches(ignored)) return;
  for (const name of attributes) {
    if (node.hasAttribute(name)) translateValue(node, name, node.getAttribute(name), language);
  }
  for (const child of node.childNodes) translateTree(child, language);
}

export default function PageTranslation({ fixedLanguage }) {
  const language = usePortfolioLanguage();
  const path = usePathname();

  useEffect(() => {
    document.documentElement.lang = fixedLanguage || language;
    const skip = document.querySelector(".skip-link");
    if (skip) translateTree(skip, fixedLanguage || language);
    if (fixedLanguage) return;

    // Start inside the hydrated route. The root layout can mount before its page.
    const page = document.querySelector(".portfolio-page,.service-request-page,.royalarm-it-app,.shop-container");
    if (!page || page.matches(ignored)) return;
    translateTree(page, language);
    const observer = new MutationObserver((mutations) => {
      for (const change of mutations) {
        const element = change.target instanceof Element ? change.target : change.target.parentElement;
        if (element?.closest(ignored)) continue;
        if (change.type === "childList") {
          for (const child of change.addedNodes) translateTree(child, language);
        } else if (change.type === "characterData") {
          translateTree(change.target, language);
        } else {
          const value = change.target.getAttribute(change.attributeName);
          if (value !== null) translateValue(change.target, change.attributeName, value, language);
        }
      }
    });
    observer.observe(page, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attributes });
    return () => observer.disconnect();
  }, [language, fixedLanguage, path]);
  return null;
}
