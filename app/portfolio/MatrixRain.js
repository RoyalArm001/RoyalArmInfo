"use client";

import { useEffect, useRef, useState } from "react";

const glyphs = Array.from("01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホԱԲԳԴԵԶ");
const cell = 24;

// Cache the characters once so each frame only composites existing glyphs.
function makeAtlas(light) {
  const atlas = document.createElement("canvas");
  atlas.width = cell * glyphs.length;
  atlas.height = cell * 2;
  const ctx = atlas.getContext("2d");
  ctx.font = "16px monospace";
  ctx.textAlign = "center";
  for (let row = 0; row < 2; row++) {
    ctx.fillStyle = (light ? ["#1a7962", "#07573d"] : ["#3eeaa1", "#c0ffe0"])[row];
    glyphs.forEach((letter, i) => ctx.fillText(letter, cell * (i + .5), cell * row + 18));
  }
  return atlas;
}

export default function MatrixRain() {
  const canvasRef = useRef(null);
  const elapsed = useRef(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let atlas, streams, width, height, frame = 0, last = 0;

    function draw() {
      const time = elapsed.current;
      ctx.clearRect(0, 0, width, height);
      for (const stream of streams) {
        const { x, step, length, speed, offset, depth, seed } = stream;
        const travel = height + step * (length + 8);
        const head = (offset + time * speed) % travel;
        const generation = Math.floor((offset + time * speed) / step);
        for (let k = 0; k < length; k++) {
          const y = head - k * step;
          if (y < -step || y > height) continue;
          const index = Math.abs((seed + (generation - k) * 31 + Math.floor(time * .6 + k * .13)) % glyphs.length);
          ctx.globalAlpha = depth * Math.pow(1 - k / length, 1.35);
          ctx.drawImage(atlas, index * cell, k === 0 ? cell : 0, cell, cell, x, y, step, step);
        }
      }
      ctx.globalAlpha = 1;
    }

    function tick(now) {
      if (now - last >= 45) {
        if (last) elapsed.current += Math.min(now - last, 100) / 1000;
        last = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(frame);
      last = 0;
      draw();
      if (!paused && !reduced.matches && !document.hidden) frame = requestAnimationFrame(tick);
    }

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const density = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      ctx.setTransform(density, 0, 0, density, 0, 0);
      // Deterministic columns keep the composition stable on orientation changes.
      streams = Array.from({ length: Math.ceil(width / 21) }, (_, i) => {
        const seed = ((i + 11) * 2654435761) >>> 0;
        return { seed, x: i * 21 + (seed % 6), step: 13 + seed % 7, length: 9 + seed % 18,
          speed: 21 + seed % 48, offset: (seed % 10007) / 10007 * (height + 350),
          depth: .38 + (seed % 53) / 100 };
      });
      atlas = makeAtlas(document.documentElement.dataset.theme === "light");
      sync();
    }

    resize();
    const size = new ResizeObserver(resize);
    size.observe(canvas);
    const theme = new MutationObserver(resize);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      cancelAnimationFrame(frame);
      size.disconnect();
      theme.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused]);

  return (
    <>
      <canvas className="portfolio-code-rain" ref={canvasRef} aria-hidden="true" />
      <button type="button" className="signal-toggle" aria-pressed={paused}
        aria-label="Pause or resume background animation" onClick={() => setPaused(!paused)}>
        <span hidden={paused}>Pause motion</span><span hidden={!paused}>Resume motion</span>
      </button>
    </>
  );
}
