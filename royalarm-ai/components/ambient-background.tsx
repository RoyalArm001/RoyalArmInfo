"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  color: string;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const colors = [
      "rgba(34, 211, 238,", // cyan
      "rgba(139, 92, 246,", // violet
      "rgba(56, 189, 248,", // sky
      "rgba(99, 102, 241,", // indigo
    ];

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Create 35 lightweight particles
    const particleCount = prefersReducedMotion ? 15 : 35;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2.2 + 0.8;
      const baseAlpha = Math.random() * 0.45 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius,
        baseAlpha,
        alpha: baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let frame = 0;

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      // Render subtle celestial particles
      for (const p of particles) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          p.alpha = p.baseAlpha + Math.sin(frame * p.pulseSpeed) * 0.15;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0.05, p.alpha)})`;
        ctx.shadowColor = `${p.color} 0.8)`;
        ctx.shadowBlur = p.radius * 4;
        ctx.fill();
      }

      frame++;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Pause animation when page is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          render();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="ambient-background-layer" aria-hidden="true">
      {/* Deep cosmic gradient mesh */}
      <div className="ambient-gradient-mesh" />
      {/* Lightweight canvas particles */}
      <canvas ref={canvasRef} className="ambient-canvas" />
    </div>
  );
}
