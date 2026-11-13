"use client";

import { useEffect, useRef } from "react";

// Read each character box from the laid-out heading. Font ascent locates the
// top of the glyph inside that box, including after a language or font change.
function letterEdges(heading, context) {
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

const height = 102;
const clamp = (n, low, high) => Math.max(low, Math.min(high, n));

function drawSignals(ctx, edges, progress, light, width, top) {
  const colors = light ? ["#197174", "#6751a6", "#2e63ad"] : ["#77f0d7", "#c19aff", "#76baff"];
  const last = edges.length - 1;
  for (const [lane, color] of colors.entries()) {
    // Stagger the three arrivals. Each tip settles briefly at a letter before
    // gliding to the next, while its trailing fibre bends in perspective.
    const position = clamp((progress * .55 + lane * .19) * last, 0, last);
    const index = Math.floor(position);
    const next = edges[Math.min(index + 1, last)];
    const phase = clamp((position - index - .25) / .75, 0, 1);
    const ease = phase * phase * (3 - 2 * phase);
    const endX = edges[index].x + (next.x - edges[index].x) * ease;
    const endY = edges[index].y + (next.y - edges[index].y) * ease - top;
    const tipY = endY - Math.sin(phase * Math.PI) * (5 + lane * 2);
    const tail = Math.min(width * .58, 250 + lane * 46);
    const startX = endX - tail;
    const startY = tipY - 32 - lane * 19;
    const bend = 7 * Math.sin(progress * Math.PI * 2 + lane);
    const gradient = ctx.createLinearGradient(startX, startY, endX, tipY);
    gradient.addColorStop(0, color + "00");
    gradient.addColorStop(.55, color + "58");
    gradient.addColorStop(1, color);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.6 - lane * .26;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(startX + tail * .6, startY + bend,
      endX - tail * .27, tipY - 48 + bend, endX, tipY);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(endX, tipY, 1.45, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function HeadingSignals() {
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
    let frame = 0, width = 0;
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
      const contacts = letterEdges(chosen, ctx);
      if (contacts.length < 3 || contacts.at(-1).x <= contacts[0].x) return;
      const progress = clamp((innerHeight * .86 - contacts[0].y) / (innerHeight * .66), 0, 1);
      ctx.clearRect(0, 0, width, height);
      const top = Math.min(...contacts.map((point) => point.y)) - 82;
      drawSignals(ctx, contacts, progress, document.documentElement.dataset.theme === "light", width, top);
      canvas.style.transform = `translateY(${top}px)`;
      canvas.style.opacity = String(clamp((1 - distance / (innerHeight * .35)) * 3, 0, 1));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
    function resize() {
      const density = Math.min(devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
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
  return <canvas ref={ref} aria-hidden="true" className="heading-signals" height={height} />;
}
