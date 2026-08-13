"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MINIMUM_INTRO_TIME = 1800;
const MAP_RENDER_BUFFER = 700;
const MAXIMUM_WAIT_TIME = 8000;
const INTRO_FADE_TIME = 650;

export default function LiveHackMap() {
  const [mapTheme, setMapTheme] = useState(null);
  const [frameReady, setFrameReady] = useState(false);
  const [introPhase, setIntroPhase] = useState("loading");
  const startedAt = useRef(0);
  const revealTimer = useRef(null);
  const hideTimer = useRef(null);
  const hasRevealed = useRef(false);

  const revealSite = useCallback(() => {
    if (hasRevealed.current) return;
    hasRevealed.current = true;
    setIntroPhase("leaving");
    hideTimer.current = window.setTimeout(() => {
      setIntroPhase("hidden");
    }, INTRO_FADE_TIME);
  }, []);

  useEffect(() => {
    startedAt.current = window.performance.now();
    const root = document.documentElement;
    const syncTheme = () => {
      setMapTheme(root.dataset.theme === "light" ? "light" : "dark");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const fallbackTimer = window.setTimeout(revealSite, MAXIMUM_WAIT_TIME);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(revealTimer.current);
      window.clearTimeout(hideTimer.current);
    };
  }, [revealSite]);

  useEffect(() => {
    if (!mapTheme) return;
    setFrameReady(false);
  }, [mapTheme]);

  useEffect(() => {
    if (introPhase === "hidden") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [introPhase]);

  function handleMapLoad() {
    setFrameReady(true);
    if (hasRevealed.current) return;

    const elapsed = window.performance.now() - startedAt.current;
    const remainingIntroTime = Math.max(MINIMUM_INTRO_TIME - elapsed, 0);
    revealTimer.current = window.setTimeout(
      revealSite,
      remainingIntroTime + MAP_RENDER_BUFFER,
    );
  }

  const mapUrl = mapTheme
    ? `https://cybermap.kaspersky.com/en/widget/dynamic/${mapTheme}?no-header=1&no-logo=1&no-title=1&theme=${mapTheme}`
    : null;

  return (
    <>
      <noscript>
        <style>{`.site-map-loader{display:none!important}`}</style>
      </noscript>

      {introPhase !== "hidden" && (
        <div
          className={`site-map-loader ${introPhase === "leaving" ? "is-leaving" : ""}`}
          role="status"
          aria-live="polite"
          aria-label="Loading the live cyber map"
        >
          <div className="site-map-loader-content">
            <div className="site-map-loader-globe" aria-hidden="true">
              <span className="site-map-loader-orbit" />
              <span className="site-map-loader-dot" />
            </div>
            <strong>ROYALARM / IT</strong>
            <span>Initializing live cyber map</span>
            <div className="site-map-loader-track" aria-hidden="true">
              <i />
            </div>
          </div>
        </div>
      )}

      <div className="live-hack-map-layer" aria-hidden="true">
        {mapUrl && (
          <iframe
            key={mapTheme}
            className={`live-hack-map-frame ${frameReady ? "is-ready" : ""}`}
            src={mapUrl}
            title="Kaspersky live cyberthreat map"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            onLoad={handleMapLoad}
          />
        )}
        <div className="live-hack-map-shade" />
      </div>
      <a
        className="live-hack-map-credit"
        href="https://cybermap.kaspersky.com/"
        target="_blank"
        rel="noreferrer"
      >
        <span aria-hidden="true">●</span> Live threat data: Kaspersky
      </a>
    </>
  );
}
