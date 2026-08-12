"use client";

import { useEffect, useState } from "react";

export default function LiveHackMap() {
  const [mapTheme, setMapTheme] = useState(null);

  useEffect(() => {
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

    return () => observer.disconnect();
  }, []);

  const mapUrl = mapTheme
    ? `https://cybermap.kaspersky.com/en/widget/dynamic/${mapTheme}?no-header=1&no-logo=1&no-title=1&theme=${mapTheme}`
    : null;

  return (
    <>
      <div className="live-hack-map-layer" aria-hidden="true">
        {mapUrl && (
          <iframe
            key={mapTheme}
            className="live-hack-map-frame is-ready"
            src={mapUrl}
            title="Kaspersky live cyberthreat map"
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
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
