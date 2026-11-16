"use client";

import { useSyncExternalStore } from "react";

const storageKey = "portfolio-language";
const changeEvent = "portfolio-language-change";
const supported = ["en", "hy", "ru"];
let memoryLanguage = "en";

export function getPortfolioLanguage() {
  try {
    const shared = document.cookie.match(/(?:^|;\s*)portfolio-language=(en|hy|ru)(?:;|$)/);
    if (shared) return shared[1];
    const saved = localStorage.getItem(storageKey);
    if (supported.includes(saved)) return saved;
  } catch {}
  return memoryLanguage;
}

export function setPortfolioLanguage(language) {
  if (!supported.includes(language)) return;
  memoryLanguage = language;
  if (/(^|\.)royalarm\.uk$/.test(location.hostname)) {
    try {
      document.cookie = `${storageKey}=${language}; Domain=royalarm.uk; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
    } catch {}
  }
  try { localStorage.setItem(storageKey, language); } catch {}
  window.dispatchEvent(new CustomEvent(changeEvent, { detail: language }));
}

function subscribe(callback) {
  function onStorage(event) {
    if (event.key === storageKey || event.key === null) {
      memoryLanguage = "en";
      callback();
    }
  }
  window.addEventListener(changeEvent, callback);
  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", callback);
  return () => {
    window.removeEventListener(changeEvent, callback);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", callback);
  };
}

export function usePortfolioLanguage() {
  return useSyncExternalStore(subscribe, getPortfolioLanguage, () => "en");
}
