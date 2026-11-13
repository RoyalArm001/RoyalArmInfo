"use client";

import { useEffect, useRef } from "react";

const glyphs = Array.from("01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホԱԲԳԴԵԶԷԸԹԺԻԼԽԾԿՀՁՂՃՄՅՆՇՈՉՊՋՌՍՎՏՐՑՒՓՔՕՖ");
const cell = 22;

// Cache the characters once (trail, near-head, and glowing head) so each frame only composites glyphs.
function makeAtlas(light) {
  const atlas = document.createElement("canvas");
  atlas.width = cell * glyphs.length;
  atlas.height = cell * 3;
  const ctx = atlas.getContext("2d");
  ctx.font = "700 18px ui-monospace, 'Cascadia Mono', Consolas, monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const styles = light
    ? [
        { fill: "#047857", shadow: "rgba(4, 120, 87, 0.45)", blur: 2.5 },
        { fill: "#065f46", shadow: "rgba(5, 150, 105, 0.6)", blur: 3.5 },
        { fill: "#022c22", shadow: "rgba(16, 185, 129, 0.75)", blur: 4.5 },
      ]
    : [
        { fill: "#34f5a6", shadow: "rgba(52, 245, 166, 0.7)", blur: 3.5 },
        { fill: "#8affd4", shadow: "rgba(138, 255, 212, 0.88)", blur: 5 },
        { fill: "#f0fff9", shadow: "rgba(110, 255, 209, 0.98)", blur: 6.5 },
      ];

  for (let row = 0; row < 3; row++) {
    ctx.fillStyle = styles[row].fill;
    ctx.shadowColor = styles[row].shadow;
    ctx.shadowBlur = styles[row].blur;
    glyphs.forEach((letter, i) => {
      const cx = cell * (i + 0.5);
      const cy = cell * (row + 0.5);
      ctx.fillText(letter, cx, cy);
      ctx.fillText(letter, cx, cy);
    });
  }
  return atlas;
}

export default function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let time = 0;
    let atlas, streams, width, height, frame = 0, last = 0, isLight = false;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const power = isLight ? 0.78 : 0.85;
      for (const stream of streams) {
        const { x, step, length, speed, offset, depth, seed } = stream;
        const travel = height + step * (length + 8);
        const head = (offset + time * speed) % travel;
        const generation = Math.floor((offset + time * speed) / step);
        for (let k = 0; k < length; k++) {
          const y = head - k * step;
          if (y < -step || y > height) continue;
          const index = Math.abs((seed + (generation - k) * 31 + Math.floor(time * 0.65 + k * 0.14)) % glyphs.length);
          const row = k === 0 ? 2 : k <= 2 ? 1 : 0;
          const fade = k === 0 ? 1 : Math.pow(1 - k / length, power);
          ctx.globalAlpha = Math.min(1, depth * fade);
          ctx.drawImage(atlas, index * cell, row * cell, cell, cell, x, y, step, step);
        }
      }
      ctx.globalAlpha = 1;
    }

    function tick(now) {
      if (now - last >= 40) {
        if (last) time += Math.min(now - last, 100) / 1000;
        last = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(frame);
      last = 0;
      draw();
      if (!reduced.matches && !document.hidden) frame = requestAnimationFrame(tick);
    }

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const density = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      ctx.setTransform(density, 0, 0, density, 0, 0);
      isLight = document.documentElement.dataset.theme === "light";
      // Deterministic columns keep the composition stable on orientation changes.
      streams = Array.from({ length: Math.ceil(width / 20) }, (_, i) => {
        const seed = ((i + 11) * 2654435761) >>> 0;
        return {
          seed,
          x: i * 20 + (seed % 4),
          step: 17 + (seed % 5),
          length: 13 + (seed % 17),
          speed: 22 + (seed % 46),
          offset: ((seed % 10007) / 10007) * (height + 350),
          depth: (isLight ? 0.82 : 0.76) + (seed % 19) / 100,
        };
      });
      atlas = makeAtlas(isLight);
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
  }, []);

  return <canvas className="portfolio-code-rain" ref={canvasRef} aria-hidden="true" />;
}
