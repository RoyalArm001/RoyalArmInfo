"use client";

import { useEffect, useRef, useState } from "react";
import HeaderControls from "../HeaderControls";

const links = [
  ["home", "Home"], ["about", "About"], ["skills", "Skills"],
  ["resume", "Resume"], ["projects", "Projects"], ["services", "Services"],
];

function NavigationLinks({ activeSection }) {
  return (
    <>
      {links.map(([section, label]) => (
        <a key={section} href={`#${section}`} data-nav-section={section}
          className={`site-nav-link${section === activeSection ? " is-active" : ""}`}
          aria-current={section === activeSection ? "location" : undefined}>{label}</a>
      ))}
      <a href="https://it.royalarm.uk/" className="site-nav-link">IT App</a>
      <a href="https://shop.royalarm.uk/" className="site-nav-link">Shop</a>
    </>
  );
}

export default function PortfolioNavigation() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const sections = links.map(([id]) => document.getElementById(id)).filter(Boolean);
    const desktop = window.matchMedia("(min-width: 1440px)");
    let frame = 0;

    function updateActiveSection() {
      frame = 0;
      const offset = navRef.current.querySelector(".portfolio-nav-row").offsetHeight + 40;
      let current = "home";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= offset) current = section.id;
      });
      setActiveSection(current);
    }
    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    }
    function closeOnDesktop(event) {
      if (event.matches) setOpen(false);
    }

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event) {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    }
    function closeOutside(event) {
      if (!navRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [open]);

  return (
    <nav ref={navRef} className="portfolio-navigation" data-portfolio-navigation aria-label="Main navigation">
      <div className="portfolio-nav-container">
        <div className="portfolio-nav-row">
          <a href="#home" className="portfolio-nav-brand" onClick={() => setOpen(false)}>
            <span className="portfolio-nav-name">Sipan Danielyan</span>
          </a>
          <div className="portfolio-nav-links"><NavigationLinks activeSection={activeSection} /></div>
          <div className="portfolio-nav-end">
            <div className="portfolio-nav-actions">
              <a href="/service-request" className="portfolio-nav-request">Request Service</a>
              <a href="#resume" className="portfolio-nav-cv">View CV</a>
            </div>
            <HeaderControls />
            <button ref={menuButtonRef} id="mobile-menu-toggle" type="button" className="portfolio-menu-button" aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div id="mobile-navigation" hidden={!open} className="mobile-navigation portfolio-mobile-navigation" onClick={(event) => { if (event.target.closest("a")) setOpen(false); }}>
        <div className="portfolio-mobile-links"><NavigationLinks activeSection={activeSection} /></div>
        <div className="portfolio-mobile-actions">
          <a href="/service-request" className="portfolio-nav-request">Request Service</a>
          <a href="#resume" className="portfolio-nav-cv">View CV</a>
        </div>
      </div>
    </nav>
  );
}
