"use client";

import { useEffect } from "react";

export default function PortfolioInteractions() {
  useEffect(() => {
    const root = document.querySelector(".portfolio-page");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");
    const targets = [...root.querySelectorAll("[data-aos]")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) { target.classList.add("is-revealed"); observer.unobserve(target); }
      });
    }, { threshold: .06, rootMargin: "0px 0px -24px 0px" });
    targets.forEach((target) => {
      // Above-the-fold content never waits for an animation library.
      if (target.getBoundingClientRect().top < innerHeight || reduced.matches) target.classList.add("is-revealed");
      else { target.classList.add("reveal-ready"); observer.observe(target); }
    });
    // Animate reading-sized blocks once, without splitting words into DOM nodes.
    const textTargets = [...root.querySelectorAll("section:not(#home) h2, section:not(#home) h3, section:not(#home) p")]
      .filter((target) => !target.closest("[data-aos], [hidden], .hidden, details"));
    textTargets.forEach((target, index) => {
      if (reduced.matches || target.getBoundingClientRect().top < innerHeight) return;
      target.classList.add("text-reveal");
      target.style.setProperty("--reveal-delay", `${(index % 3) * 65}ms`);
      observer.observe(target);
    });
    const buttons = [...root.querySelectorAll("[data-magnetic]")];
    const cleanups = buttons.map((button) => {
      const move = (event) => {
        if (reduced.matches || !fine.matches) return;
        const rect = button.getBoundingClientRect();
        button.style.translate = `${(event.clientX - rect.left - rect.width / 2) * .06}px ${(event.clientY - rect.top - rect.height / 2) * .12}px`;
      };
      const reset = () => { button.style.translate = "0px 0px"; };
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", reset);
      button.addEventListener("blur", reset);
      return () => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", reset); button.removeEventListener("blur", reset); reset(); };
    });

    /* --- Scroll-reactive CSS glow: drive the --scroll-glow custom property --- */
    function updateScrollGlow() {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollMax > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollMax)) : 0;
      root.style.setProperty("--scroll-glow", progress.toFixed(3));
    }
    window.addEventListener("scroll", updateScrollGlow, { passive: true });
    updateScrollGlow();

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      textTargets.forEach((target) => { target.classList.remove("text-reveal"); target.style.removeProperty("--reveal-delay"); });
      window.removeEventListener("scroll", updateScrollGlow);
    };
  }, []);
  return null;
}
