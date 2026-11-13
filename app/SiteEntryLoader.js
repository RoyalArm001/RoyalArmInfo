"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MIN_SHOWCASE_MS = 1450;
const MAX_WAIT_MS = 2800;
const COMPLETE_HOLD_MS = 220;
const EXIT_FADE_MS = 560;

const COPY = {
  en: {
    eyebrow: "SIGNAL HANDSHAKE",
    rolePortfolio: "IT Infrastructure · Networks · Security",
    roleIt: "IT Specialist Matching Platform",
    roleShop: "Verified Software & Tools Catalog",
    stages: [
      "Establishing secure route…",
      "Synchronizing network nodes & assets…",
      "Ready — entering workspace",
    ],
    skip: "Enter site",
    ariaLabel: "Loading website",
  },
  hy: {
    eyebrow: "ՀԱՄԱԿԱՐԳԻ ՄԻԱՑՈՒՄ",
    rolePortfolio: "ՏՏ ենթակառուցվածք · Ցանցեր · Անվտանգություն",
    roleIt: "ՏՏ մասնագետների ընտրության հարթակ",
    roleShop: "Ստուգված ծրագրերի և գործիքների կատալոգ",
    stages: [
      "Ապահով կապի հաստատում…",
      "Ցանցային հանգույցների և ռեսուրսների սինխրոնիզացում…",
      "Մուտքը պատրաստ է",
    ],
    skip: "Մուտք գործել",
    ariaLabel: "Կայքը բեռնվում է",
  },
  ru: {
    eyebrow: "СИНХРОНИЗАЦИЯ УЗЛА",
    rolePortfolio: "ИТ-инфраструктура · Сети · Безопасность",
    roleIt: "Платформа подбора ИТ-специалистов",
    roleShop: "Каталог проверенных программ",
    stages: [
      "Установка защищённого маршрута…",
      "Синхронизация узлов и ресурсов…",
      "Готово — вход на сайт",
    ],
    skip: "Войти на сайт",
    ariaLabel: "Загрузка сайта",
  },
};

function isExcludedRoute(hostname, pathname) {
  return (
    hostname.startsWith("ai.") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/ai") ||
    pathname.startsWith("/cv")
  );
}

function resolveBrandContext(hostname, pathname) {
  if (hostname.startsWith("it.") || pathname.startsWith("/it")) {
    return { domain: "IT.ROYALARM.UK", title: "RoyalArm IT", roleKey: "roleIt" };
  }
  if (hostname.startsWith("shop.") || pathname.startsWith("/shop")) {
    return { domain: "SHOP.ROYALARM.UK", title: "RoyalArm Shop", roleKey: "roleShop" };
  }
  return { domain: "ROYALARM.UK", title: "Sipan Danielyan", roleKey: "rolePortfolio" };
}

export default function SiteEntryLoader() {
  const [phase, setPhase] = useState("loading");
  const [progress, setProgress] = useState(12);
  const [lang, setLang] = useState("en");
  const [brand, setBrand] = useState({
    domain: "ROYALARM.UK",
    title: "Sipan Danielyan",
    roleKey: "rolePortfolio",
  });

  const leavingRef = useRef(false);
  const timersRef = useRef([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const finishLoading = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setProgress(100);

    const holdId = window.setTimeout(() => {
      setPhase("leaving");
      const hideId = window.setTimeout(() => {
        setPhase("hidden");
      }, EXIT_FADE_MS);
      timersRef.current.push(hideId);
    }, COMPLETE_HOLD_MS);

    timersRef.current.push(holdId);
  }, []);

  const skipImmediately = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    clearAllTimers();
    setProgress(100);
    setPhase("leaving");
    const hideId = window.setTimeout(() => {
      setPhase("hidden");
    }, EXIT_FADE_MS);
    timersRef.current.push(hideId);
  }, [clearAllTimers]);

  useEffect(() => {
    const hostname = window.location.hostname.toLowerCase();
    const pathname = window.location.pathname;

    if (
      document.documentElement.dataset.skipEntryLoader === "1" ||
      isExcludedRoute(hostname, pathname) ||
      document.querySelector(".ai-root, [data-admin-page], .resume-sheet")
    ) {
      setPhase("hidden");
      return undefined;
    }

    setBrand(resolveBrandContext(hostname, pathname));

    try {
      const savedLang = window.localStorage.getItem("portfolio-language");
      if (savedLang && Object.hasOwn(COPY, savedLang)) {
        setLang(savedLang);
      }
    } catch (_) {}

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const quickId = window.setTimeout(skipImmediately, 260);
      return () => window.clearTimeout(quickId);
    }

    const startTime = window.performance.now();
    let assetsReady = document.readyState === "complete";
    let fontsReady = !document.fonts?.ready;
    let lastProgress = 12;
    let rafId = 0;

    const onWindowLoad = () => {
      assetsReady = true;
    };

    if (!assetsReady) {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(
        () => {
          fontsReady = true;
        },
        () => {
          fontsReady = true;
        }
      );
    }

    const tick = (now) => {
      if (leavingRef.current) return;
      const elapsed = now - startTime;
      const ready = assetsReady && fontsReady;

      // Smoothly advance toward 92% while waiting, then complete cleanly once ready.
      const nextProgress = Math.round(Math.min(92, 12 + 80 * (1 - Math.exp(-elapsed / 620))));

      if ((ready && elapsed >= MIN_SHOWCASE_MS) || elapsed >= MAX_WAIT_MS) {
        finishLoading();
        return;
      }

      if (nextProgress !== lastProgress) {
        lastProgress = nextProgress;
        setProgress(nextProgress);
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    const hardTimeoutId = window.setTimeout(finishLoading, MAX_WAIT_MS + 120);
    timersRef.current.push(hardTimeoutId);

    const onKeyDown = (event) => {
      if (event.key === "Escape") skipImmediately();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("load", onWindowLoad);
      window.removeEventListener("keydown", onKeyDown);
      clearAllTimers();
    };
  }, [clearAllTimers, finishLoading, skipImmediately]);

  useEffect(() => {
    if (phase !== "loading") return undefined;
    document.documentElement.classList.add("entry-loader-lock");
    return () => {
      document.documentElement.classList.remove("entry-loader-lock");
    };
  }, [phase]);

  if (phase === "hidden") return null;

  const copy = COPY[lang] || COPY.en;
  const stageIndex = progress >= 96 ? 2 : progress >= 52 ? 1 : 0;

  return (
    <>
      <noscript>
        <style>{`.site-entry-loader{display:none!important}`}</style>
      </noscript>
      <div
        className={`site-entry-loader${phase === "leaving" ? " is-leaving" : ""}`}
        role="status"
        aria-live="polite"
        aria-label={copy.ariaLabel}
        suppressHydrationWarning
      >
        <div className="site-entry-loader-grid" aria-hidden="true" />
        <div className="site-entry-loader-glow" aria-hidden="true" />

        <div className="site-entry-loader-hud" aria-hidden="true">
          <span className="site-entry-loader-domain" suppressHydrationWarning>
            <i className="site-entry-loader-led" />
            {brand.domain}
          </span>
          <span className="site-entry-loader-percent">
            {String(progress).padStart(2, "0")}%
          </span>
        </div>

        <div className="site-entry-loader-core">
          <div className="site-entry-loader-emblem" aria-hidden="true">
            <svg className="site-entry-loader-rings" viewBox="0 0 180 180" fill="none">
              <circle
                cx="90"
                cy="90"
                r="82"
                className="site-entry-ring-outer"
                strokeDasharray="4 7"
              />
              <circle
                cx="90"
                cy="90"
                r="68"
                className="site-entry-ring-arc"
                strokeDasharray="165 265"
                strokeLinecap="round"
              />
              <circle
                cx="90"
                cy="90"
                r="54"
                className="site-entry-ring-inner"
                strokeDasharray="95 250"
                strokeLinecap="round"
              />
            </svg>

            <div className="site-entry-loader-crest">
              <img
                src="/assets/royalarm-logo-180.png"
                alt=""
                width="44"
                height="44"
                decoding="sync"
              />
            </div>

            <span className="site-entry-loader-orbit">
              <i />
            </span>
          </div>

          <p className="site-entry-loader-eyebrow" suppressHydrationWarning>
            {copy.eyebrow}
          </p>
          <strong className="site-entry-loader-title" suppressHydrationWarning>
            {brand.title}
          </strong>
          <p className="site-entry-loader-role" suppressHydrationWarning>
            {copy[brand.roleKey]}
          </p>

          <div className="site-entry-loader-progress">
            <div
              className="site-entry-loader-track"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="site-entry-loader-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="site-entry-loader-stage" suppressHydrationWarning>
              {copy.stages[stageIndex]}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="site-entry-loader-skip"
          onClick={skipImmediately}
          suppressHydrationWarning
        >
          <span>{copy.skip}</span>
          <span aria-hidden="true">↵</span>
        </button>
      </div>
    </>
  );
}
