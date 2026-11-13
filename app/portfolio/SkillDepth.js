"use client";

import { useEffect } from "react";

export default function SkillDepth() {
  useEffect(() => {
    const grid = document.querySelector("#skills .skills-grid");
    const pointer = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!grid) return;
    let activeCard;

    function reset() {
      if (!activeCard) return;
      for (const prop of ["--tilt-x", "--tilt-y", "--shine-x", "--shine-y"]) {
        activeCard.style.removeProperty(prop);
      }
      activeCard = null;
    }

    function update(event) {
      if (!pointer.matches || document.querySelector('.signal-toggle[aria-pressed="true"]')) {
        reset();
        return;
      }
      const card = event.target.closest(".skill-card");
      if (card !== activeCard) reset();
      if (!card) return;
      activeCard = card;
      const box = card.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width;
      const y = (event.clientY - box.top) / box.height;
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 12}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 14}deg`);
      card.style.setProperty("--shine-x", `${x * 100}%`);
      card.style.setProperty("--shine-y", `${y * 100}%`);
    }

    grid.addEventListener("pointermove", update, { passive: true });
    grid.addEventListener("pointerleave", reset);
    return () => {
      reset();
      grid.removeEventListener("pointermove", update);
      grid.removeEventListener("pointerleave", reset);
    };
  }, []);
  return null;
}
