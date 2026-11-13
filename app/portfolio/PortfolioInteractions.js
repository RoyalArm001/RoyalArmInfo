"use client";

import { useEffect } from "react";

export default function PortfolioInteractions() {
  useEffect(() => {
    const root = document.querySelector(".portfolio-page");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
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
    return () => {
      observer.disconnect();
      textTargets.forEach((target) => { target.classList.remove("text-reveal"); target.style.removeProperty("--reveal-delay"); });
    };
  }, []);
  return null;
}
