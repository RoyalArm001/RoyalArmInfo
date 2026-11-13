"use client";

import { useEffect, useRef } from "react";

// Sculptural 3D optical-fibre wave ribbons. Each ribbon twists in world space
// and projects onto the hero canvas with depth perspective and travelling light pulses.
const ribbons = [
  { offset: -0.155, phase: 2.05, depth: -0.22, breadth: 0.044, speed: 0.056 },
  { offset: 0.105, phase: -0.65, depth: -0.09, breadth: 0.052, speed: 0.068 },
  { offset: -0.045, phase: 1.15, depth: 0.02, breadth: 0.064, speed: 0.076 },
  { offset: -0.01, phase: 0.28, depth: 0.11, breadth: 0.098, speed: 0.084 },
];

const palettes = {
  dark: [
    ["#3b82f6", "#6366f1", "#a855f7", "#e879f9"],
    ["#0284c7", "#06b6d4", "#2dd4bf", "#a7f3d0"],
    ["#4f46e5", "#8b5cf6", "#38bdf8", "#99f6e4"],
    ["#6366f1", "#c084fc", "#22d3ee", "#f0abfc"],
  ],
  light: [
    ["#4f46e5", "#6d28d9", "#9333ea", "#7e22ce"],
    ["#0369a1", "#0e7490", "#0d9488", "#047857"],
    ["#3730a3", "#6366f1", "#0284c7", "#0f766e"],
    ["#4338ca", "#7c3aed", "#0891b2", "#86198f"],
  ],
};

function project(t, across, ribbon, time, camera, width, height) {
  const phase = ribbon.phase;
  const harmonic = Math.sin(t * 6.4 - 0.45 + phase + Math.sin(time * 0.34) * 0.55)
    + 0.28 * Math.cos(t * 11.2 + phase * 1.4 - time * 0.42);
  const envelope = Math.sin(Math.PI * t);
  const twist = t * 8.2 + phase + time * 0.38;
  const radius = ribbon.breadth * (0.26 + envelope * 0.92);
  const z = ribbon.depth
    + 0.12 * Math.sin(t * 6.8 + phase + time * 0.28)
    + Math.sin(twist) * radius * across;
  const x = -0.58 + t * 1.08;
  const y = 0.18 - t * 0.35 + ribbon.offset
    + harmonic * (0.092 + 0.082 * envelope)
    + Math.cos(twist) * radius * across;
  const perspective = 1.65 / (1.65 - z);
  return [
    width * (0.64 + (x + z * camera.x * 0.14) * perspective),
    height * (0.51 + (y + z * camera.y * 0.14) * perspective),
  ];
}

function traceSmooth(context, points) {
  if (!points.length) return;
  context.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length - 1; i++) {
    const mx = (points[i][0] + points[i + 1][0]) * 0.5;
    const my = (points[i][1] + points[i + 1][1]) * 0.5;
    context.quadraticCurveTo(points[i][0], points[i][1], mx, my);
  }
  const last = points[points.length - 1];
  context.lineTo(last[0], last[1]);
}

export default function SignalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, frame = 0, last = 0, time = 0, visible = true;
    let light = false;
    const camera = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const hero = canvas.parentElement;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    function aim(event) {
      if (!finePointer.matches || reduced.matches) return;
      const bounds = hero.getBoundingClientRect();
      target.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      target.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    }

    function centre() {
      target.x = 0;
      target.y = 0;
    }

    function render() {
      context.clearRect(0, 0, width, height);
      const palette = light ? palettes.light : palettes.dark;
      const samples = width < 750 ? 58 : 92;
      const laneCount = width < 750 ? 11 : 17;
      context.lineCap = "round";
      context.lineJoin = "round";

      for (const [group, ribbon] of ribbons.entries()) {
        const route = (t, across) => project(t, across, ribbon, time, camera, width, height);
        const stops = palette[group];
        const gradient = context.createLinearGradient(width * 0.26, height * 0.76, width * 0.98, height * 0.18);
        stops.forEach((value, i) => gradient.addColorStop(i / (stops.length - 1), value));

        const edges = [-1, 1].map((side) =>
          Array.from({ length: samples + 1 }, (_, step) => route(step / samples, side))
        );

        // Soft volumetric ribbon veil
        context.beginPath();
        traceSmooth(context, edges[0]);
        for (let step = samples; step >= 0; step--) {
          context.lineTo(edges[1][step][0], edges[1][step][1]);
        }
        context.closePath();
        context.fillStyle = gradient;
        context.globalAlpha = light ? 0.11 + group * 0.025 : 0.14 + group * 0.035;
        context.fill();

        // Cross-section mesh struts that reveal 3D torsion
        context.strokeStyle = gradient;
        context.globalAlpha = group === 3 ? (light ? 0.28 : 0.32) : (light ? 0.12 : 0.14);
        context.lineWidth = 0.65;
        context.beginPath();
        for (let step = 0; step <= samples; step += 2) {
          context.moveTo(edges[0][step][0], edges[0][step][1]);
          context.lineTo(edges[1][step][0], edges[1][step][1]);
        }
        context.stroke();

        // Individual optical fibres across the ribbon width
        for (let lane = 0; lane < laneCount; lane++) {
          const across = (2 * lane) / (laneCount - 1) - 1;
          const isEdge = lane === 0 || lane === laneCount - 1;
          const isCenter = lane === (laneCount - 1) >> 1;
          context.globalAlpha = isEdge
            ? (light ? 0.92 : 0.96)
            : isCenter
              ? (light ? 0.62 : 0.72)
              : (light ? 0.34 + group * 0.07 : 0.36 + group * 0.08);
          context.lineWidth = isEdge ? 1.65 : isCenter ? 1.15 : 0.85;
          context.beginPath();
          if (isEdge) {
            traceSmooth(context, edges[lane === 0 ? 0 : 1]);
          } else {
            const pts = Array.from({ length: samples + 1 }, (_, step) => route(step / samples, across));
            traceSmooth(context, pts);
          }
          context.stroke();
        }

        // Luminous travelling data packets along the fibres
        const pulseCount = 4;
        for (let pulse = 0; pulse < pulseCount; pulse++) {
          const phase = (time * ribbon.speed + pulse / pulseCount + group * 0.19) % 1;
          if (phase < 0.04 || phase > 0.96) continue;
          const lane = ((pulse % 3) - 1) * 0.82;
          const tailStart = Math.max(0, phase - 0.042);
          const mid = route(Math.max(0, phase - 0.018), lane);
          const head = route(phase, lane);
          const tail = route(tailStart, lane);

          context.strokeStyle = gradient;
          context.globalAlpha = light ? 0.92 : 0.98;
          context.lineWidth = 2.2;
          context.beginPath();
          context.moveTo(tail[0], tail[1]);
          context.quadraticCurveTo(mid[0], mid[1], head[0], head[1]);
          context.stroke();

          // Soft outer glow + crisp core on packet head
          context.fillStyle = stops[stops.length - 1];
          context.globalAlpha = light ? 0.28 : 0.42;
          context.beginPath();
          context.arc(head[0], head[1], 5.2, 0, Math.PI * 2);
          context.fill();

          context.fillStyle = light ? stops[1] : "#ffffff";
          context.globalAlpha = 0.96;
          context.beginPath();
          context.arc(head[0], head[1], 2.0, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    }

    function animate(now) {
      if (last) {
        const dt = Math.min(now - last, 64) / 1000;
        time += dt;
        camera.x += (target.x - camera.x) * Math.min(1, dt * 4.5);
        camera.y += (target.y - camera.y) * Math.min(1, dt * 4.5);
      }
      last = now;
      render();
      frame = requestAnimationFrame(animate);
    }

    function sync() {
      cancelAnimationFrame(frame);
      last = 0;
      if (width && height) {
        render();
        if (visible && !document.hidden && !reduced.matches) {
          frame = requestAnimationFrame(animate);
        }
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
    resize();
    return () => {
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

  return <canvas ref={canvasRef} className="signal-field" aria-hidden="true" />;
}

