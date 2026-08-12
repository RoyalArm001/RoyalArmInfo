"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "../ThemeToggle";
import styles from "../app/app.module.css";

const appLinks = [
  { href: "#app-top", label: "Home" },
  { href: "#specialists", label: "Specialists" },
  { href: "#app-request", label: "Employer request" },
  { href: "#specialist-join", label: "Join as a specialist" },
];

const bottomLinks = [
  { href: "#app-top", label: "Home", tab: "home", icon: "fas fa-home" },
  { href: "#specialists", label: "Specialists", tab: "specialists", icon: "fas fa-users" },
  { href: "#app-request", label: "Request", tab: "request", icon: "fas fa-clipboard-list", featured: true },
  { href: "#specialist-join", label: "Join", tab: "join", icon: "fas fa-user-plus" },
];

function LanguageControl({ compact = false }) {
  return (
    <label className={`${styles.appLanguage} ${compact ? styles.appLanguageCompact : ""}`}>
      <span className={styles.srOnly}>Choose page language</span>
      <span aria-hidden="true">A/Ա</span>
      <select data-language-select defaultValue="en" aria-label="Choose page language">
        <option value="en">EN</option>
        <option value="hy">HY</option>
        <option value="ru">RU</option>
      </select>
    </label>
  );
}

export default function ItAppNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const sections = [
      { id: "app-top", tab: "home" },
      { id: "specialists", tab: "specialists" },
      { id: "app-request", tab: "request" },
      { id: "specialist-join", tab: "join" },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const section = sections.find((item) => item.id === visible?.target.id);
        if (section) setActiveSection(section.tab);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

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

  return (
    <>
      <header className={styles.appHeader}>
        <a href="#app-top" className={styles.brand} aria-label="RoyalArm IT app home">
          <span className={styles.brandMark}>RA</span>
          <span>
            <strong>RoyalArm IT</strong>
            <small>Specialist matching</small>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="App navigation">
          {appLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
          <a className={styles.desktopSiteLink} href="https://royalarm.uk">
            Desktop website <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <div className={styles.desktopTools}>
          <LanguageControl compact />
          <ThemeToggle />
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
          <span>ROYALARM / IT</span>
          <strong>Specialist platform</strong>
        </div>

        <div className={styles.mobileMenuLinks}>
          {appLinks.map((link, index) => (
            <a
              key={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              href={link.href}
              tabIndex={open ? 0 : -1}
              onClick={closeMenu}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              {link.label}
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

        <div className={styles.mobileMenuTools}>
          <div>
            <small>Appearance</small>
            <ThemeToggle />
          </div>
          <div>
            <small>Language</small>
            <LanguageControl />
          </div>
        </div>
      </nav>

      <nav className={styles.bottomNav} aria-label="Mobile primary navigation">
        {bottomLinks.map((link) => {
          const active = activeSection === link.tab && !open;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`${link.featured ? styles.bottomNavScan : ""} ${active ? styles.bottomNavActive : ""}`}
              aria-current={active ? "location" : undefined}
              onClick={() => setActiveSection(link.tab)}
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
