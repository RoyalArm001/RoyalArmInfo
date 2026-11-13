"use client";

import { useEffect, useRef, useState } from "react";

// A ribbon is an open sheet of optical fibres. Its cross-section twists in
// world space; the camera projects both the sweep and its depth onto the hero.
const ribbons = [
  { offset: -.14, phase: 1.8, depth: -.17, breadth: .052 },
  { offset: .09, phase: -.6, depth: -.07, breadth: .045 },
  { offset: -.015, phase: .32, depth: .08, breadth: .094 },
];
const palettes = {
  dark: [
    ["#3767fc", "#696eff", "#be80ff"],
    ["#146cba", "#32e7d5", "#bbffe7"],
    ["#6055ff", "#db8dff", "#5ce6ff"],
  ],
  light: [
    ["#7362cd", "#6550b2", "#9b42bd"],
    ["#236297", "#087e88", "#198f72"],
    ["#465ebd", "#9651aa", "#188195"],
  ],
};

function project(t, across, ribbon, time, camera, width, height) {
  const phase = ribbon.phase;
  const sweep = Math.sin(t * 6.8 - .5 + phase + Math.sin(time * .27) * .48);
  const envelope = Math.sin(Math.PI * t);
  const angle = t * 8.5 + phase + time * .32;
  const radius = ribbon.breadth * (.28 + envelope);
  const z = ribbon.depth + .11 * Math.sin(t * 7 + phase + time * .24)
    + Math.sin(angle) * radius * across;
  const x = -.55 + t * 1.02;
  const y = .16 - t * .33 + ribbon.offset + sweep * (.1 + .09 * envelope)
    + Math.cos(angle) * radius * across;
  const perspective = 1.6 / (1.6 - z);
  return [
    width * (.66 + (x + z * camera.x * .12) * perspective),
    height * (.52 + (y + z * camera.y * .12) * perspective),
  ];
}

function trace(context, points) {
  context.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) context.lineTo(...points[i]);
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
    let light = false;
    const camera = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const hero = canvas.parentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    function aim(event) {
      if (!finePointer.matches || reduced.matches || pausedRef.current) return;
      const bounds = hero.getBoundingClientRect();
      target.x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      target.y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    }
    function centre() { target.x = 0; target.y = 0; }

    function render() {
      context.clearRect(0, 0, width, height);
      const palette = light ? palettes.light : palettes.dark;
      const samples = width < 750 ? 44 : 68;
      const laneCount = width < 750 ? 9 : 15;
      context.lineJoin = "round";
      for (const [group, ribbon] of ribbons.entries()) {
        const route = (t, across) => project(t, across, ribbon, time, camera, width, height);
        const color = context.createLinearGradient(width * .32, height * .7, width * .98, height * .22);
        palette[group].forEach((value, i) => color.addColorStop(i / 2, value));
        context.strokeStyle = color;
        context.fillStyle = color;
        const edges = [-1, 1].map(side => Array.from({ length: samples + 1 },
          (_, step) => route(step / samples, side)));

        context.beginPath();
        trace(context, edges[0]);
        for (let step = samples; step >= 0; step--) context.lineTo(...edges[1][step]);
        context.closePath();
        context.globalAlpha = light ? .09 : .16;
        context.fill();

        // Section lines are stronger on the front ribbon. They reveal the
        // alternating front and back faces as the network rotates.
        context.globalAlpha = group === 2 ? .24 : .09;
        context.lineWidth = .7;
        context.beginPath();
        for (let step = 0; step <= samples; step += 2) {
          context.moveTo(...edges[0][step]);
          context.lineTo(...edges[1][step]);
        }
        context.stroke();

        for (let lane = 0; lane < laneCount; lane++) {
          const across = 2 * lane / (laneCount - 1) - 1;
          const edge = lane === 0 || lane === laneCount - 1;
          context.globalAlpha = edge ? .86 : .34 + group * .09;
          context.lineWidth = edge ? 1.5 : .85;
          context.beginPath();
          if (edge) trace(context, edges[lane === 0 ? 0 : 1]);
          else {
            context.moveTo(...route(0, across));
            for (let step = 1; step <= samples; step++) context.lineTo(...route(step / samples, across));
          }
          context.stroke();
        }

        for (let pulse = 0; pulse < 3; pulse++) {
          const phase = (time * (.064 + group * .01) + pulse / 3 + group * .21) % 1;
          const lane = (pulse - 1) * .83;
          const head = route(phase, lane);
          context.beginPath();
          context.moveTo(...route(Math.max(0, phase - .026), lane));
          context.lineTo(...head);
          context.globalAlpha = .95;
          context.lineWidth = 1.9;
          context.stroke();
          context.fillStyle = palette[group][2];
          context.beginPath();
          context.arc(...head, 1.8, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    }

    function animate(now) {
      if (now - last >= 32) {
        time += last ? Math.min(now - last, 100) / 1000 : 0;
        camera.x += (target.x - camera.x) * .09;
        camera.y += (target.y - camera.y) * .09;
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
      light = document.documentElement.dataset.theme === "light";
      sync();
    }

    const size = new ResizeObserver(resize);
    const theme = new MutationObserver(resize);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    hero.addEventListener("pointermove", aim, { passive: true });
    hero.addEventListener("pointerleave", centre);
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
      hero.removeEventListener("pointermove", aim);
      hero.removeEventListener("pointerleave", centre);
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
