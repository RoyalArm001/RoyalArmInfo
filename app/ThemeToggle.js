"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle({ variant = "switch" }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      const currentTheme = root.dataset.theme || "dark";
      setTheme(currentTheme);
      const themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) themeMeta.setAttribute("content", currentTheme === "dark" ? "#020617" : "#f8fbff");
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    try {
      window.localStorage.setItem("portfolio-theme", nextTheme);
    } catch (_) {}
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", nextTheme === "dark" ? "#020617" : "#f8fbff");
    setTheme(nextTheme);
  }

  if (variant === "icon") {
    const isLight = theme === "light";
    return (
      <button
        type="button"
        className={`theme-icon-toggle ${isLight ? "is-light" : "is-dark"}`}
        onClick={toggleTheme}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        title={isLight ? "Dark mode" : "Light mode"}
        aria-pressed={isLight}
      >
        {isLight ? (
          <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.1 15.3A8.45 8.45 0 0 1 8.7 3.9 8.5 8.5 0 1 0 20.1 15.3Z" />
            <path className="theme-icon-spark" d="m17.8 4.2.35.95.95.35-.95.35-.35.95-.35-.95-.95-.35.95-.35.35-.95Z" />
          </svg>
        ) : (
          <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3.6" />
            <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      aria-pressed={theme === "light"}
    >
      <span className="theme-toggle-sun" aria-hidden="true">{"\u2600"}</span>
      <span className="theme-toggle-moon" aria-hidden="true">{"\u263E"}</span>
      <span className="theme-toggle-thumb" aria-hidden="true" />
    </button>
  );
}
