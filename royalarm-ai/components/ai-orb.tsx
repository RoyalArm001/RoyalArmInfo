"use client";

import { useEffect, useState } from "react";
import { Mic, VolumeX, AlertTriangle, Sparkles, AudioWaveform } from "lucide-react";

export type OrbState = "idle" | "listening" | "thinking" | "speaking" | "muted" | "error";

interface AiOrbProps {
  state: OrbState;
  micVolume?: number; // 0.0 to 1.0 from real Web Audio API
  onOrbClick?: () => void;
  statusLabel?: string;
}

export function AiOrb({ state, micVolume = 0, onOrbClick, statusLabel }: AiOrbProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Monitor prefers-reduced-motion and tab visibility
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);
    const initialMotionFrame = window.requestAnimationFrame(() =>
      setReducedMotion(mediaQuery.matches)
    );

    const handleVisibility = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.cancelAnimationFrame(initialMotionFrame);
    };
  }, []);

  // Compute scale and intensity based on state and real mic volume
  // Volume is ONLY applied when state === "listening" to obey the rule:
  // "Do not simulate listening when the microphone is inactive."
  const activeVolume = state === "listening" ? Math.min(Math.max(micVolume, 0), 1) : 0;
  const ringScale = 1 + activeVolume * 0.45;
  const auraOpacity = state === "listening" ? 0.6 + activeVolume * 0.4 : state === "thinking" ? 0.75 : 0.45;

  return (
    <div
      className={`ai-orb-wrapper state-${state} ${reducedMotion ? "reduced-motion" : ""} ${
        !isVisible ? "paused" : ""
      }`}
      onClick={onOrbClick}
      role="region"
      aria-label={`RoyalArm AI Orb - ${state}`}
    >
      {/* Dimensional Ambient Background Glow */}
      <div
        className="orb-ambient-glow"
        style={{
          opacity: auraOpacity,
          transform: `scale(${1 + activeVolume * 0.25})`,
        }}
      />

      {/* Outer Concentric Animated Energy Rings */}
      <div
        className="orb-ring ring-outer"
        style={{
          transform: `rotate(25deg) scale(${ringScale})`,
        }}
      >
        <span className="orbital-node node-1" />
      </div>

      <div
        className="orb-ring ring-middle"
        style={{
          transform: `rotate(-35deg) scale(${1 + activeVolume * 0.3})`,
        }}
      >
        <span className="orbital-node node-2" />
      </div>

      <div
        className="orb-ring ring-inner"
        style={{
          transform: `rotate(60deg) scale(${1 + activeVolume * 0.18})`,
        }}
      />

      {/* Real Audio Wave Arcs (Active during Speaking or Listening) */}
      {(state === "listening" || state === "speaking") && (
        <div className="orb-audio-arcs" aria-hidden="true">
          <span
            className="audio-arc arc-1"
            style={{
              transform: `scale(${1 + (state === "listening" ? activeVolume * 0.5 : 0.2)})`,
            }}
          />
          <span
            className="audio-arc arc-2"
            style={{
              transform: `scale(${1 + (state === "listening" ? activeVolume * 0.8 : 0.35)})`,
            }}
          />
        </div>
      )}

      {/* Dimensional Fluid Sphere Core */}
      <div className="orb-core">
        {/* Deep fluid plasma layer */}
        <div className="orb-plasma" />

        {/* Dynamic fluid mesh / radial layers */}
        <div className="orb-inner-wave wave-cyan" />
        <div className="orb-inner-wave wave-violet" />

        {/* Specular glass reflection & highlights */}
        <div className="orb-specular" />
        <div className="orb-specular-soft" />

        {/* State Glyph / Center Accent */}
        <div className="orb-center-icon">
          {state === "listening" && <Mic size={22} className="text-cyan-300 animate-pulse" />}
          {state === "thinking" && <Sparkles size={22} className="text-violet-300 animate-spin" />}
          {state === "speaking" && <AudioWaveform size={22} className="text-cyan-200 animate-bounce" />}
          {state === "muted" && <VolumeX size={20} className="text-slate-400 opacity-80" />}
          {state === "error" && <AlertTriangle size={22} className="text-rose-400" />}
          {state === "idle" && <span className="orb-idle-core-dot" />}
        </div>
      </div>

      {/* State Status Badge */}
      <div className="orb-status-badge">
        <span className={`status-indicator-dot dot-${state}`} />
        <span className="status-text">
          {statusLabel ||
            (state === "idle" && "Պատրաստ է") ||
            (state === "listening" && "Լսում եմ...") ||
            (state === "thinking" && "Մտածում եմ...") ||
            (state === "speaking" && "Խոսում եմ...") ||
            (state === "muted" && "Ձայնն անջատված է") ||
            (state === "error" && "Կապի խնդիր")}
        </span>
      </div>
    </div>
  );
}
