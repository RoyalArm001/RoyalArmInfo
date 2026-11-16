"use client";

import { useEffect, useState } from "react";
import { usePortfolioLanguage } from "../usePortfolioLanguage";
import SignalField from "./SignalField";

const BRIEF_COPY = {
  en: {
    welcome: "Welcome",
    biography: "Sipan Danielyan short biography",
    badge: "LIVE DOSSIER · JERMUK, ARMENIA",
    status: "ONLINE",
    lines: [
      { tag: "01 // ENGINEER", text: "Sipan Danielyan — IT Technician & Network Engineer" },
      { tag: "02 // ROLE", text: "IT Infrastructure Specialist at Mota-Engil Armenia" },
      { tag: "03 // NETWORKS", text: "Enterprise Routing, VLAN, VPN, Firewall & Fiber Systems" },
      { tag: "04 // SERVERS", text: "Proxmox VE, TrueNAS, Nextcloud, Linux/Windows & Zabbix" },
      { tag: "05 // SECURITY", text: "Hikvision CCTV Architecture & RoyalArm AI / IT Platforms" },
    ],
  },
  hy: {
    welcome: "Բարի գալուստ",
    biography: "Սիփան Դանիելյանի համառոտ կենսագրությունը",
    badge: "ՈՒՂԻՂ ՊՐՈՖԻԼ · ՋԵՐՄՈՒԿ, ՀԱՅԱՍՏԱՆ",
    status: "ԱԿՏԻՎ",
    lines: [
      { tag: "01 // ՄԱՍՆԱԳԵՏ", text: "Սիփան Դանիելյան — ՏՏ տեխնիկ և ցանցային ինժեներ" },
      { tag: "02 // ՊԱՇՏՈՆ", text: "Mota-Engil Armenia-ի ՏՏ ենթակառուցվածքների մասնագետ" },
      { tag: "03 // ՑԱՆՑԵՐ", text: "Կորպորատիվ ցանցեր, VLAN, VPN, Firewall և օպտիկական գծեր" },
      { tag: "04 // ՍԵՐՎԵՐՆԵՐ", text: "Proxmox VE, TrueNAS, Nextcloud, Linux/Windows և Zabbix" },
      { tag: "05 // ԱՆՎՏԱՆԳՈՒԹՅՈՒՆ", text: "Hikvision տեսահսկում և RoyalArm AI / IT հարթակներ" },
    ],
  },
  ru: {
    welcome: "Добро пожаловать",
    biography: "Краткая биография Сипана Даниеляна",
    badge: "ДОСЬЕ ИНЖЕНЕРА · ДЖЕРМУК, АРМЕНИЯ",
    status: "ОНЛАЙН",
    lines: [
      { tag: "01 // ИНЖЕНЕР", text: "Сипан Даниелян — ИТ-техник и сетевой инженер" },
      { tag: "02 // ДОЛЖНОСТЬ", text: "Специалист ИТ-инфраструктуры в Mota-Engil Armenia" },
      { tag: "03 // СЕТИ", text: "Корпоративные сети, VLAN, VPN, межсетевые экраны и оптика" },
      { tag: "04 // СЕРВЕРЫ", text: "Proxmox VE, TrueNAS, Nextcloud, Linux/Windows и Zabbix" },
      { tag: "05 // БЕЗОПАСНОСТЬ", text: "Системы Hikvision CCTV и платформы RoyalArm AI / IT" },
    ],
  },
};

export default function Hero() {
  const [stage, setStage] = useState("intro");
  const lang = usePortfolioLanguage();
  const [typedChars, setTypedChars] = useState(0);

  const copy = BRIEF_COPY[lang] || BRIEF_COPY.en;
  const totalChars = copy.lines.reduce((sum, item) => sum + item.text.length, 0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage("compact");
      setTypedChars(9999);
      return undefined;
    }

    let shrinkTimer = 0;
    let started = false;

    const beginSequence = () => {
      if (started) return;
      started = true;
      shrinkTimer = window.setTimeout(() => {
        setStage("compact");
      }, 950);
    };

    if (!document.documentElement.classList.contains("entry-loader-lock")) {
      beginSequence();
    }

    const observer = new MutationObserver(() => {
      if (!document.documentElement.classList.contains("entry-loader-lock")) {
        beginSequence();
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Fallback in case entry-loader-lock is slow to clear
    const fallbackTimer = window.setTimeout(beginSequence, 1800);

    return () => {
      observer.disconnect();
      window.clearTimeout(shrinkTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (stage !== "compact") return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setTypedChars(totalChars);
      return undefined;
    }

    setTypedChars(0);
    let current = 0;
    const interval = window.setInterval(() => {
      current += 2;
      setTypedChars(current);
      if (current >= totalChars) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [stage, lang, totalChars]);

  let remaining = typedChars;

  return (
    <section
      id="home"
      className={`systems-hero${stage === "compact" ? " is-compact" : " is-intro"}`}
      aria-labelledby="hero-heading"
    >
      <div className="systems-intro">
        <p className="systems-role">IT Technician · Network Engineer</p>
        <h1 id="hero-heading" className="welcome-heading" data-no-translate="">
          <span className="welcome-word">{copy.welcome}</span>{" "}
          <span className="royalarm-word">RoyalArm</span>
        </h1>
        <p className="systems-summary">
          I work as an IT technician at Mota-Engil and build tools for networks and servers in Armenia.
        </p>
        <div className="systems-links">
          <a href="#projects">
            View My Work <span aria-hidden="true">↗</span>
          </a>
          <a href="#resume">View CV</a>
          <a href="https://ai.royalarm.uk/">RoyalArm AI</a>
        </div>
      </div>

      <aside
        className="hero-live-brief"
        data-no-translate=""
        aria-label={copy.biography}
      >
        <div className="hero-brief-header">
          <span className="hero-brief-badge">
            <i className="hero-brief-dot" />
            {copy.badge}
          </span>
          <span className="hero-brief-status">{copy.status}</span>
        </div>

        <ul className="hero-brief-list">
          {copy.lines.map((item, idx) => {
            const visibleCount = Math.max(0, Math.min(item.text.length, remaining));
            remaining -= visibleCount;
            const isTypingLine =
              stage === "compact" &&
              visibleCount > 0 &&
              visibleCount < item.text.length;
            const isLastFinished =
              stage === "compact" &&
              idx === copy.lines.length - 1 &&
              visibleCount === item.text.length;

            return (
              <li
                key={item.tag}
                className={`hero-brief-item${visibleCount > 0 ? " is-active" : ""}`}
              >
                <span className="hero-brief-tag">{item.tag}</span>
                <p className="hero-brief-text">
                  <span>{item.text.slice(0, visibleCount)}</span>
                  {(isTypingLine || isLastFinished) && (
                    <span className="hero-brief-cursor" aria-hidden="true">
                      ▍
                    </span>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </aside>

      <SignalField />
    </section>
  );
}
