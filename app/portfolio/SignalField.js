"use client";

import { useEffect, useRef, useState } from "react";

// Each group of fibres shares an endpoint but follows a different route.
const terminals = [
  [0.56, 0.14], [0.73, 0.22], [0.91, 0.10], [0.98, 0.38],
  [0.89, 0.68], [0.97, 0.88], [0.69, 0.80], [0.52, 0.93],
];

function pointOnRoute(t, lane, terminal, time, width, height) {
  const bend = Math.sin(Math.PI * t);
  const spread = (lane - 3) * 0.009;
  const wave = Math.sin(t * 7 - time * 0.55 + terminal[1] * 4);
  const y = 0.66 + (terminal[1] - 0.66) * (t * t * (3 - 2 * t));
  return [
    width * (0.18 + (terminal[0] - 0.18) * t),
    height * (y + bend * (0.14 * wave + spread)),
  ];
}

export default function SignalField() {
  const canvasRef = useRef(null);
  const pausedRef = useRef(false);
  const syncRef = useRef(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width, height, frame = 0, last = 0, time = 0, visible = true;
    let palette;

    function render() {
      context.clearRect(0, 0, width, height);
      for (const [group, terminal] of terminals.entries()) {
        const color = palette[group % palette.length];
        context.strokeStyle = color;
        context.fillStyle = color;
        for (let lane = 0; lane < 7; lane++) {
          context.beginPath();
          for (let step = 0; step <= 48; step++) {
            const [x, y] = pointOnRoute(step / 48, lane, terminal, time, width, height);
            if (step === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
          }
          context.globalAlpha = lane === 3 ? 0.54 : 0.26;
          context.lineWidth = lane === 3 ? 1.4 : 0.85;
          context.stroke();
        }
        // The short bright trails resolve into a pulse when they reach a node.
        const progress = (time * (0.12 + group * 0.006) + group * 0.371) % 1;
        context.globalAlpha = 0.95;
        context.lineWidth = 2;
        context.beginPath();
        for (let step = 0; step <= 8; step++) {
          const t = Math.max(0, progress - 0.042 * (1 - step / 8));
          const [x, y] = pointOnRoute(t, 3, terminal, time, width, height);
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.stroke();
        const x = terminal[0] * width, y = terminal[1] * height;
        context.beginPath();
        context.arc(x, y, 2.5, 0, Math.PI * 2);
        context.fill();
        context.globalAlpha = 0.6 * (1 - progress);
        context.lineWidth = 1;
        context.beginPath();
        context.arc(x, y, 4 + progress * 12, 0, Math.PI * 2);
        context.stroke();
      }
      context.globalAlpha = 1;
    }

    function animate(now) {
      if (now - last >= 32) {
        time += last ? Math.min(now - last, 100) / 1000 : 0;
        last = now;
        render();
      }
      frame = requestAnimationFrame(animate);
    }

    function sync() {
      cancelAnimationFrame(frame);
      last = 0;
      if (width && height) {
        render();
        if (visible && !document.hidden && !reduced.matches && !pausedRef.current)
          frame = requestAnimationFrame(animate);
      }
    }

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      context.setTransform(density, 0, 0, density, 0, 0);
      palette = document.documentElement.dataset.theme === "light"
        ? ["#9b4716", "#3f7562", "#936e29"] : ["#ffac78", "#80d7b8", "#d9ce82"];
      sync();
    }

    const size = new ResizeObserver(resize);
    const theme = new MutationObserver(resize);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    size.observe(canvas);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    visibility.observe(canvas);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    syncRef.current = sync;
    resize();
    return () => {
      syncRef.current = null;
      cancelAnimationFrame(frame);
      size.disconnect();
      theme.disconnect();
      visibility.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="signal-field" aria-hidden="true" />
      <button className="signal-toggle" type="button" aria-pressed={paused}
        aria-label="Pause or resume background animation" onClick={() => {
          pausedRef.current = !pausedRef.current;
          setPaused(pausedRef.current);
          syncRef.current?.();
        }}>
        <span hidden={paused}>Pause motion</span><span hidden={!paused}>Resume motion</span>
      </button>
    </>
  );
}
