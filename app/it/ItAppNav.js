"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ThemeToggle";
import styles from "../app/app.module.css";
import { FlagIcon } from "./FlagIcon";
import PwaHeaderControls from "./PwaHeaderControls";

const appLinks = [
  { href: "/it", label: "Home", tab: "home" },
  { href: "/it/specialists", label: "Specialists", tab: "specialists" },
  { href: "#request", label: "Employer request", tab: "request", action: "request" },
  { href: "#join", label: "Join as a specialist", action: "join" },
];

const bottomLinks = [
  { href: "/it", label: "Home", tab: "home", icon: "fas fa-home" },
  { href: "/it/specialists", label: "Specialists", tab: "specialists", icon: "fas fa-users" },
  { href: "#request", label: "Request", tab: "request", icon: "fas fa-clipboard-list", action: "request" },
  { href: "#join", label: "Join", tab: "join", icon: "fas fa-user-plus", action: "join" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "hy", label: "Armenian" },
  { code: "ru", label: "Russian" },
];

function LanguageControl() {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("portfolio-language") || "en";
      setLanguage(languages.some((item) => item.code === saved) ? saved : "en");
    } catch (_) {}

    function syncFromDocument() {
      const current = window.getPortfolioLanguage?.() || document.documentElement.lang || "en";
      if (languages.some((item) => item.code === current)) setLanguage(current);
    }

    const timer = window.setTimeout(syncFromDocument, 0);
    window.addEventListener("storage", syncFromDocument);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", syncFromDocument);
    };
  }, []);

  function cycleLanguage() {
    const index = languages.findIndex((item) => item.code === language);
    const next = languages[(index + 1) % languages.length];
    setLanguage(next.code);

    if (typeof window.setPortfolioLanguage === "function") {
      window.setPortfolioLanguage(next.code);
      return;
    }

    document.querySelectorAll("[data-language-select]").forEach((select) => {
      select.value = next.code;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    try {
      window.localStorage.setItem("portfolio-language", next.code);
    } catch (_) {}
  }

  const current = languages.find((item) => item.code === language) || languages[0];

  return (
    <button
      type="button"
      className={styles.langFlagButton}
      onClick={cycleLanguage}
      aria-label={`Language: ${current.label}. Click to change`}
      title={current.label}
    >
      <FlagIcon code={current.code} className={styles.langFlag} />
    </button>
  );
}

export default function ItAppNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (pathname.endsWith("/specialists")) setActiveSection("specialists");
    else setActiveSection("home");
  }, [pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    function closeOnEscape(event) {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  function followLink(event, link) {
    if (link.action === "join") {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("royalarm:open-specialist-modal"));
    } else if (link.action === "request") {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent("royalarm:open-request-modal"));
    } else if (link.tab) {
      setActiveSection(link.tab);
    }
    closeMenu();
  }

  return (
    <>
      <header className={styles.appHeader}>
        <div className={styles.brandCluster}>
          <a href="/it" className={styles.brand} aria-label="RoyalArm IT app home">
            <span className={styles.brandLogo} aria-hidden="true">
              <img
                src="/assets/LogoArm.png"
                width="40"
                height="40"
                alt=""
              />
            </span>
            <span className={styles.brandName}>RoyalArm <b>IT</b></span>
          </a>
          <PwaHeaderControls />
        </div>

        <nav className={styles.desktopNav} aria-label="App navigation">
          {appLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => followLink(event, link)}>
              {link.label}
            </a>
          ))}
          <a className={styles.desktopSiteLink} href="https://royalarm.uk">
            Desktop website <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className={styles.headerTools}>
          <LanguageControl />
          <ThemeToggle variant="icon" />
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className={`${styles.menuButton} ${open ? styles.menuButtonOpen : ""}`}
          aria-label={open ? "Close app menu" : "Open app menu"}
          aria-expanded={open}
          aria-controls="it-app-mobile-menu"
          onClick={() => setOpen((current) => !current)}
        >
          <span /><span /><span />
        </button>
      </header>

      <button
        type="button"
        className={`${styles.menuBackdrop} ${open ? styles.menuBackdropOpen : ""}`}
        aria-label="Close app menu"
        tabIndex={open ? 0 : -1}
        onClick={closeMenu}
      />

      <nav
        id="it-app-mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        aria-label="Mobile app navigation"
        aria-hidden={!open}
      >
        <div className={styles.mobileMenuHandle} aria-hidden="true" />
        <button
          type="button"
          className={styles.mobileMenuClose}
          aria-label="Close app menu"
          tabIndex={open ? 0 : -1}
          onClick={closeMenu}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className={styles.mobileMenuHeading}>
          <span className={styles.mobileMenuBrandMark} aria-hidden="true">
            <img
              src="/assets/LogoArm.png"
              width="48"
              height="48"
              alt=""
            />
          </span>
          <div>
            <span>ROYALARM / IT</span>
            <strong>Specialist platform</strong>
          </div>
        </div>

        <div className={styles.mobileMenuLinks}>
          {appLinks.map((link, index) => (
            <a
              key={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={(event) => followLink(event, link)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {link.label}
              <i className={`fas fa-chevron-right ${styles.mobileMenuLinkArrow}`} aria-hidden="true" />
            </a>
          ))}
        </div>

        <a
          href="https://royalarm.uk"
          className={styles.mobileDesktopLink}
          tabIndex={open ? 0 : -1}
        >
          <span>
            <small>Leave the web app</small>
            <strong>Open RoyalArm website</strong>
          </span>
          <b aria-hidden="true">↗</b>
        </a>
      </nav>

      <nav className={styles.bottomNav} aria-label="Mobile primary navigation">
        {bottomLinks.map((link) => {
          const active = !link.action && activeSection === link.tab && !open;
          return (
            <a
              key={link.href}
              href={link.href}
              className={active ? styles.bottomNavActive : ""}
              aria-current={active ? "location" : undefined}
              onClick={(event) => followLink(event, link)}
            >
              <span className={styles.bottomNavIcon}>
                <i className={link.icon} aria-hidden="true" />
              </span>
              <strong>{link.label}</strong>
            </a>
          );
        })}
      </nav>
    </>
  );
}
