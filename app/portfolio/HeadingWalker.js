"use client";

import { useEffect, useRef } from "react";

// Read each character box from the laid-out heading. Font ascent locates the
// top of the glyph inside that box, including after a language or font change.
function footholds(heading, context) {
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  const points = [];
  let node;
  while ((node = walker.nextNode())) {
    const style = getComputedStyle(node.parentElement);
    context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    let offset = 0;
    for (const char of node.data) {
      const start = offset;
      offset += char.length;
      if (!char.trim()) continue;
      range.setStart(node, start);
      range.setEnd(node, offset);
      const box = range.getBoundingClientRect();
      if (!box.width || !box.height) continue;
      if (points.length && Math.abs(box.bottom - points[0].bottom) > box.height / 2) break;
      const metrics = context.measureText(char);
      const ascent = metrics.fontBoundingBoxAscent ?? box.height * .78;
      const descent = metrics.fontBoundingBoxDescent ?? box.height * .22;
      const baseline = box.top + (box.height - ascent - descent) / 2 + ascent;
      points.push({ x: box.left + box.width / 2, y: baseline - metrics.actualBoundingBoxAscent + 1, bottom: box.bottom });
    }
  }
  return points;
}

const width = 152, height = 100;
const clamp = (n, low, high) => Math.max(low, Math.min(high, n));

function drawWalker(ctx, contacts, progress, light) {
  const left = contacts[0].x, right = contacts.at(-1).x;
  const span = right - left;
  const scale = Math.min(1, span / 100, innerWidth / 540);
  const stride = 17 * scale;
  const margin = Math.min(31 * scale, span / 3);
  const x = left + margin + progress * (span - 2 * margin);
  const nearest = (target) => contacts.reduce((best, p) =>
    Math.abs(p.x - target) < Math.abs(best.x - target) ? p : best);
  const base = Math.min(...contacts.map((p) => p.y));
  const originX = x - width / 2, originY = base - 58;
  const phase = (x - left) / stride;
  // Perspective projection: height raises a joint from the text, depth
  // foreshortens the far legs and separates them from the near legs.
  function project(dx, depth, lift) {
    const k = 155 / (155 - depth);
    return [width / 2 + dx * k * scale, 58 + (depth * .46 - lift) * k * scale];
  }
  function dot(px, py, r, color) {
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
  const bronze = light ? "#81572f" : "#dcb581";
  const mint = light ? "#24594c" : "#a1dac2";
  const lift = 17 + 1.2 * Math.cos(phase * Math.PI * 2);
  ctx.lineCap = "round";
  for (const side of [-1, 1]) {
    for (let leg = 0; leg < 4; leg++) {
      const offset = (leg - 1.5) * 13 + side * 3;
      const beat = phase + ((leg + (side + 1) / 2) % 2) * .5;
      const fraction = beat - Math.floor(beat);
      const swing = clamp((fraction - .52) / .48, 0, 1);
      const planted = x + offset * scale - fraction * stride;
      const from = nearest(planted), to = nearest(planted + stride);
      const ease = swing * swing * (3 - 2 * swing);
      const footX = from.x + (to.x - from.x) * ease - originX;
      const footY = from.y + (to.y - from.y) * ease - Math.sin(swing * Math.PI) * 11 * scale - originY;
      const hip = project((leg - 1.5) * 3.4, side * 2, lift);
      const knee = project(offset * .95, side * (11 + leg % 2 * 4), lift + 5 + 2 * Math.sin(beat * Math.PI * 2));
      ctx.strokeStyle = side < 0 ? bronze : mint;
      ctx.globalAlpha = side < 0 ? .67 : .98;
      ctx.lineWidth = side < 0 ? 1 : 1.5;
      ctx.beginPath();
      ctx.moveTo(...hip);
      ctx.lineTo(...knee);
      ctx.lineTo(footX, footY);
      ctx.stroke();
      dot(...knee, 1.35 * scale, bronze);
      dot(footX, footY, (swing ? 1.1 : 1.8) * scale, mint);
    }
  }
  ctx.globalAlpha = 1;
  const [cx, cy] = project(0, 0, lift);
  const shell = ctx.createLinearGradient(cx, cy - 4 * scale, cx, cy + 4 * scale);
  shell.addColorStop(0, mint);
  shell.addColorStop(.4, bronze);
  shell.addColorStop(1, light ? "#333e37" : "#4a5145");
  ctx.fillStyle = shell;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 8 * scale, 4 * scale, -.13, 0, Math.PI * 2);
  ctx.fill();
  dot(cx + 8 * scale, cy - scale, 2.6 * scale, mint);
  return [originX, originY];
}

export default function HeadingWalker() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const root = canvas.closest("main");
    const targets = root.querySelectorAll(".portfolio-markup section h2, .portfolio-markup section h3");
    const visible = new Set();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const toggle = root.querySelector(".signal-toggle");
    let frame = 0;
    function paint() {
      frame = 0;
      canvas.style.opacity = "0";
      if (document.hidden || !scrollY || reduced.matches || toggle?.getAttribute("aria-pressed") === "true") return;
      const focus = innerHeight * .52;
      let chosen, distance = Infinity;
      for (const target of visible) {
        const { top } = target.getBoundingClientRect();
        if (top < Math.max(105, innerHeight * .2) || top > innerHeight * .86) continue;
        const d = Math.abs(top - focus);
        if (d < distance) { distance = d; chosen = target; }
      }
      if (!chosen) return;
      const contacts = footholds(chosen, ctx);
      if (contacts.length < 3 || contacts.at(-1).x <= contacts[0].x) return;
      const progress = clamp((innerHeight * .86 - contacts[0].y) / (innerHeight * .66), 0, 1);
      ctx.clearRect(0, 0, width, height);
      const [x, y] = drawWalker(ctx, contacts, progress, document.documentElement.dataset.theme === "light");
      canvas.style.transform = `translate3d(${x}px,${y}px,0)`;
      canvas.style.opacity = String(clamp((1 - distance / (innerHeight * .35)) * 3, 0, 1));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
    function resize() {
      const density = Math.min(devicePixelRatio || 1, 2);
      canvas.width = width * density;
      canvas.height = height * density;
      ctx.setTransform(density, 0, 0, density, 0, 0);
      schedule();
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      schedule();
    });
    targets.forEach((el) => observer.observe(el));
    const changes = new MutationObserver(schedule);
    changes.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "lang"] });
    if (toggle) changes.observe(toggle, { attributes: true, attributeFilter: ["aria-pressed"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    root.addEventListener("transitionend", schedule);
    document.fonts.addEventListener("loadingdone", schedule);
    reduced.addEventListener("change", schedule);
    resize();
    return () => {
      observer.disconnect();
      changes.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      root.removeEventListener("transitionend", schedule);
      document.fonts.removeEventListener("loadingdone", schedule);
      reduced.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="heading-walker" width={width} height={height} />;
}
