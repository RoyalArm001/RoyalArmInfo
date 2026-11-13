"use client";

import { useEffect, useRef } from "react";

const tau = Math.PI * 2;
const rings = [
  { radius: 1, tube: .085, tilt: .9, yaw: -.5, hue: 185 },
  { radius: .77, tube: .1, tilt: -.76, yaw: .6, hue: 247 },
  { radius: .51, tube: .095, tilt: 1.04, yaw: 1.2, hue: 303 },
];

// Build the glass facets once. Their view-space normals drive the travelling highlights.
function mesh({ radius, tube }) {
  const vertices = [], quads = [];
  const around = 64, across = 8;
  for (let i = 0; i < around; i++) {
    const a = tau * i / around;
    for (let j = 0; j < across; j++) {
      const b = tau * j / across;
      const r = radius + tube * Math.cos(b);
      vertices.push([r * Math.cos(a), r * Math.sin(a), tube * Math.sin(b)]);
      const index = (u, v) => (u % around) * across + v % across;
      quads.push([index(i, j), index(i + 1, j), index(i + 1, j + 1), index(i, j + 1)]);
    }
  }
  return { vertices, quads };
}
const models = rings.map(mesh);

export default function PrismOrbit() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const toggle = document.querySelector(".portfolio-page .signal-toggle");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0, height = 0, elapsed = 0, previous = 0, frame = 0, visible = false;

    function draw() {
      const faces = [];
      const light = document.documentElement.dataset.theme === "light";
      const scale = Math.min(width, height) * .405;
      ctx.clearRect(0, 0, width, height);
      models.forEach(({ vertices, quads }, k) => {
        const ring = rings[k];
        const pitch = ring.tilt + .47 * Math.sin(elapsed * .53 + k);
        const yaw = ring.yaw + elapsed * (.33 + k * .07);
        const roll = -.54 + .34 * Math.sin(elapsed * .4 + k * 1.5);
        const cp = Math.cos(pitch), sp = Math.sin(pitch), cy = Math.cos(yaw), sy = Math.sin(yaw);
        const cr = Math.cos(roll), sr = Math.sin(roll);
        const points = vertices.map(([x, y, z]) => {
          const v = y * cp - z * sp, w = y * sp + z * cp;
          const u = x * cy + w * sy, depth = -x * sy + w * cy;
          const perspective = scale * 4 / (4 - depth);
          return [width / 2 + (u * cr - v * sr) * perspective,
            height / 2 + (u * sr + v * cr) * perspective, depth];
        });
        for (const indices of quads) {
          const [a,b,c,d] = indices.map(i => points[i]);
          const area = (b[0]-a[0]) * (d[1]-a[1]) - (b[1]-a[1]) * (d[0]-a[0]);
          if (area <= 0) continue;
          const depth = (a[2]+b[2]+c[2]+d[2])/4;
          const glint = Math.sin(indices[0] * .012 + elapsed * 1.3 + indices[0] % 8 * .9);
          const luma = (light ? 44 : 56) + depth * 13 + glint * 10 + 19 * Math.pow(Math.max(0,glint),8);
          faces.push({ points: [a,b,c,d], depth, fill: `hsl(${ring.hue + 24 * glint} 93% ${luma}%)` });
        }
      });
      faces.sort((a,b) => a.depth - b.depth);
      for (const face of faces) {
        ctx.beginPath();
        face.points.forEach(([x,y],i) => i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
        ctx.closePath();
        ctx.fillStyle = ctx.strokeStyle = face.fill;
        ctx.lineWidth = .7;
        ctx.fill();
        ctx.stroke();
      }
    }

    function animate(now) {
      if (now - previous >= 32) {
        if (previous) elapsed += Math.min(now - previous,100)/1000;
        previous = now;
        draw();
      }
      frame = requestAnimationFrame(animate);
    }
    function sync() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!width || !height || !visible || document.hidden) return;
      draw();
      if (!reduced.matches && toggle?.getAttribute("aria-pressed") !== "true") frame = requestAnimationFrame(animate);
    }
    const size = new ResizeObserver(() => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const density = Math.min(devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      ctx.setTransform(density,0,0,density,0,0);
      sync();
    });
    size.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    visibility.observe(canvas);
    const changes = new MutationObserver(sync);
    changes.observe(document.documentElement,{ attributes:true, attributeFilter:["data-theme"] });
    if (toggle) changes.observe(toggle,{ attributes:true, attributeFilter:["aria-pressed"] });
    reduced.addEventListener("change",sync);
    document.addEventListener("visibilitychange",sync);
    return () => {
      cancelAnimationFrame(frame);
      size.disconnect(); visibility.disconnect(); changes.disconnect();
      reduced.removeEventListener("change",sync);
      document.removeEventListener("visibilitychange",sync);
    };
  }, []);
  return <canvas ref={ref} className="hero-prism-orbit" aria-hidden="true" />;
}
