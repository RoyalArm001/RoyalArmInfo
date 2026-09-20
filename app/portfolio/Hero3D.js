"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero3D({ fixed = false }) {
  const container = useRef(null);
  const sceneApi = useRef(null);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let disposeScene;
    // The content renders immediately; Three.js is a separate, client-only chunk.
    import("./createHeroScene").then(({ createHeroScene }) => {
      if (disposed) return;
      try {
        const api = createHeroScene(container.current, fixed ? container.current.closest(".portfolio-page") : null);
        sceneApi.current = api;
        disposeScene = api.dispose;
        setReady(true);
      } catch {
        // The CSS orbital illustration remains usable without WebGL.
        container.current?.setAttribute("data-renderer", "fallback");
      }
    }).catch(() => container.current?.setAttribute("data-renderer", "fallback"));
    return () => { disposed = true; disposeScene?.(); sceneApi.current = null; };
  }, []);

  return (
    <>
      <div className={`hero-scene${fixed ? " portfolio-background" : ""}`} ref={container} aria-hidden="true">
        <div className="scene-fallback"><span /><span /><span /><i /></div>
      </div>
      {ready && <button className="scene-motion-control" type="button" onClick={() => { const next = !paused; setPaused(next); sceneApi.current?.setPaused(next); }} aria-pressed={paused} aria-label="Pause or resume background animation">
        <span hidden={paused} aria-hidden="true">Ⅱ</span><span hidden={paused}>Pause motion</span>
        <span hidden={!paused} aria-hidden="true">▷</span><span hidden={!paused}>Resume motion</span>
      </button>}
    </>
  );
}
