"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS, SHOP_CATEGORIES } from "../../lib/shopData";
import ThemeToggle from "../ThemeToggle";
import "./shop.css";

const ALPHABET = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "#"];

export default function ShopClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [selectedLicense, setSelectedLicense] = useState("all");
  const [selectedLetter, setSelectedLetter] = useState("ALL");
  const [sortBy, setSortBy] = useState("popular");
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [lang, setLang] = useState("hy"); // Armenian default

  // Sync site language
  useEffect(() => {
    function detectLanguage() {
      const saved = localStorage.getItem("portfolio-language");
      if (saved && ["en", "hy", "ru"].includes(saved)) {
        setLang(saved);
      } else {
        const docLang = document.documentElement.lang;
        if (docLang && ["en", "hy", "ru"].includes(docLang)) {
          setLang(docLang);
        }
      }
    }
    detectLanguage();
    window.addEventListener("storage", detectLanguage);
    return () => window.removeEventListener("storage", detectLanguage);
  }, []);

  // Keyboard shortcut: ESC to close modal, "/" to focus search
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setActiveModalProduct(null);
      }
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        document.getElementById("shop-search-box")?.focus();
      }
    }
    if (activeModalProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalProduct]);

  // Latest updates feed (inspired by network.am)
  const latestUpdates = useMemo(() => {
    return [...PRODUCTS]
      .sort((a, b) => new Date(b.published || 0) - new Date(a.published || 0))
      .slice(0, 6);
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((item) => {
      // 1. Category match
      const matchesCategory =
        selectedCategory === "all" ||
        item.primaryCategory === selectedCategory ||
        item.categories.includes(selectedCategory);

      // 2. Platform match (windows, macos, linux)
      const matchesPlatform =
        selectedPlatform === "all" ||
        (item.osList && item.osList.includes(selectedPlatform));

      // 3. License match
      const matchesLicense =
        selectedLicense === "all" ||
        (selectedLicense === "opensource" && item.license.toLowerCase().includes("open source")) ||
        (selectedLicense === "freeware" && item.license.toLowerCase().includes("freeware")) ||
        (selectedLicense === "commercial" && (item.license.toLowerCase().includes("commercial") || item.license.toLowerCase().includes("freemium") || item.license.toLowerCase().includes("shareware")));

      // 4. Alphabet match (A-Z, #)
      let matchesLetter = true;
      if (selectedLetter !== "ALL") {
        const firstChar = item.title.trim().charAt(0).toUpperCase();
        if (selectedLetter === "#") {
          matchesLetter = !/[A-Z]/i.test(firstChar);
        } else {
          matchesLetter = firstChar === selectedLetter;
        }
      }

      // 5. Search query match
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        (item.developer && item.developer.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.descriptionHy && item.descriptionHy.toLowerCase().includes(query)) ||
        (item.descriptionRu && item.descriptionRu.toLowerCase().includes(query)) ||
        (item.seoKeywords && item.seoKeywords.some((k) => k.toLowerCase().includes(query))) ||
        item.categories.some((c) => c.toLowerCase().includes(query));

      return matchesCategory && matchesPlatform && matchesLicense && matchesLetter && matchesSearch;
    });

    // Sorting options
    if (sortBy === "popular") {
      list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    } else if (sortBy === "title-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "rating") {
      list.sort((a, b) => (b.ratingValue || 0) - (a.ratingValue || 0));
    } else if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.published || 0) - new Date(a.published || 0));
    }

    return list;
  }, [selectedCategory, selectedPlatform, selectedLicense, selectedLetter, searchQuery, sortBy]);

  // Translations
  const t = {
    hy: {
      badge: "ROYALARM ՍՏՈՒԳՎԱԾ ԾՐԱԳՐԵՐԻ ԿԱՏԱԼՈԳ",
      title: "Անհրաժեշտ Ծրագրեր և",
      titleGradient: "Պաշտոնական Բեռնումներ",
      subtitle:
        "Բրաուզերներ, Օֆիսային փաթեթներ, ծրագրավորման գործիքներ, դիզայն և համակարգային կոմունալներ։ 100% ստուգված և պաշտոնական հղումներ Սիփան Դանիելյանի կողմից (նման Network.am ինֆոբազային)։",
      statTools: "45+ Անհրաժեշտ Ծրագրեր",
      statToolsSub: "Բրաուզերներ, Office, Dev, Tools",
      statLinks: "100% Պաշտոնական Հղումներ",
      statLinksSub: "Ուղիղ մշակողների կայքերից",
      statClean: "Առանց Վիրուսների & Գովազդի",
      statCleanSub: "Անվտանգ և ստուգված ֆայլեր",
      statPlatforms: "Windows • macOS • Linux",
      statPlatformsSub: "Բազմապլատֆորմ աջակցություն",
      latestUpdatesTitle: "Վերջին Թարմացումներ",
      searchPlaceholder: "Որոնել ծրագրեր (Chrome, Office, Python, Photoshop... սեղմեք /)",
      allPlatforms: "Բոլոր ՕՀ",
      windowsOnly: "Windows",
      macOnly: "macOS",
      linuxOnly: "Linux",
      allLicenses: "Բոլոր Արտոնագրերը",
      openSource: "Open Source",
      freeware: "Freeware",
      commercial: "Commercial / Trial",
      sortBy: "Տեսակավորել:",
      sortPopular: "Ներբեռնումների քանակի",
      sortName: "Այբբենական (A-Z)",
      sortRating: "Օգտվողների գնահատման",
      sortNewest: "Վերջին թարմացումներ",
      verifiedVendor: "ՍՏՈՒԳՎԱԾ ՊԱՇՏՈՆԱԿԱՆ",
      directDownload: "Պաշտոնական Բեռնում",
      detailsAndMirrors: "Մանրամասներ",
      noResults: "Ձեր հարցմանը համապատասխան ոչինչ չգտնվեց",
      tryAnother: "Փորձեք մաքրել որոնման դաշտը կամ ընտրել այլ կատեգորիա։",
      clearSearch: "Մաքրել ֆիլտրերը",
      officialSite: "Պաշտոնական Կայք",
      downloadOptions: "Ներբեռնման Տարբերակներ & Հղումներ",
      keyFeatures: "Ծրագրի Հիմնական Հնարավորությունները",
      sysRequirements: "Համակարգային Պահանջներ",
      needInstallHelp: "Կարիք ունե՞ք տեղադրման կամ կարգավորման աջակցության։",
      specialistSub: "Կապվեք Սիփան Դանիելյանի հետ հեռավար տեղադրման, ՕՀ-ի կարգավորման կամ IT սպասարկման համար։",
      requestSpecialist: "Դիմել ՏՏ Մասնագետի",
      close: "Փակել",
      backToHome: "Գլխավոր Էջ",
      itPlatform: "IT Ծառայություններ",
      resultsCount: "Ցուցադրված է",
      ofTotal: "-ից",
      disclaimerTitle: "Անվտանգության & Օրինականության Երաշխիք",
      disclaimerText: "Ուշադրություն. RoyalArm Shop-ում ներկայացված բոլոր ծրագրերի հղումները տանում են բացառապես մշակողների պաշտոնական կայքեր և ստուգված հայելային աղբյուրներ (Google, Microsoft, Mozilla, The Document Foundation, Adobe, Ghisler, Oracle և այլն)։ Ֆայլերը չեն պարունակում կողմնակի գովազդային հավելվածներ (adware/malware): Բոլոր ապրանքանիշերը և լոգոտիպերը պատկանում են իրենց օրինական իրավատերերին։",
    },
    en: {
      badge: "ROYALARM VERIFIED SOFTWARE HUB",
      title: "Essential Software &",
      titleGradient: "Official Downloads",
      subtitle:
        "High-performance browsers, office productivity suites, developer IDEs, multimedia and system utilities. 100% verified official vendor links curated by Sipan Danielyan.",
      statTools: "45+ Essential Tools",
      statToolsSub: "Browsers, Office, Dev & Media",
      statLinks: "100% Official Links",
      statLinksSub: "Direct from verified vendors",
      statClean: "Zero Malware Guarantee",
      statCleanSub: "Clean, direct & secure mirrors",
      statPlatforms: "Windows • macOS • Linux",
      statPlatformsSub: "Full cross-platform support",
      latestUpdatesTitle: "Latest Software Releases",
      searchPlaceholder: "Search software (Chrome, Office, VS Code, Blender... press /)",
      allPlatforms: "All Platforms",
      windowsOnly: "Windows",
      macOnly: "macOS",
      linuxOnly: "Linux",
      allLicenses: "All Licenses",
      openSource: "Open Source",
      freeware: "Freeware",
      commercial: "Commercial / Trial",
      sortBy: "Sort by:",
      sortPopular: "Most Downloaded",
      sortName: "Alphabetical (A-Z)",
      sortRating: "User Rating",
      sortNewest: "Recently Updated",
      verifiedVendor: "VERIFIED OFFICIAL",
      directDownload: "Official Download",
      detailsAndMirrors: "Details & Specs",
      noResults: "No software found matching your search",
      tryAnother: "Try clearing your search query or selecting a different category.",
      clearSearch: "Clear Filters",
      officialSite: "Official Website",
      downloadOptions: "Download Mirrors & Architectures",
      keyFeatures: "Key Capabilities & Features",
      sysRequirements: "System Requirements",
      needInstallHelp: "Need help installing or configuring?",
      specialistSub: "Contact Sipan Danielyan for remote installation, driver setups, or corporate IT maintenance.",
      requestSpecialist: "Request IT Specialist",
      close: "Close",
      backToHome: "Portfolio",
      itPlatform: "IT Platform",
      resultsCount: "Showing",
      ofTotal: "of",
      disclaimerTitle: "Official Vendor & Safety Guarantee",
      disclaimerText: "Notice: All download links provided on RoyalArm Shop lead strictly to verified official vendor domains and secure repositories (Google, Microsoft, Mozilla, The Document Foundation, Adobe, Ghisler, Oracle, etc.). Files are clean, unmodified, and free of adware or third-party wrappers. All trademarks and logos belong to their respective owners.",
    },
    ru: {
      badge: "КАТАЛОГ ПРОВЕРЕННОГО ПО ROYALARM",
      title: "Необходимый Софт и",
      titleGradient: "Официальные Загрузки",
      subtitle:
        "Браузеры, офисные пакеты, среды разработки, дизайн и системные утилиты. 100% проверенные официальные ссылки от Сипана Даниеляна.",
      statTools: "45+ Проверенных Программ",
      statToolsSub: "Браузеры, Офис, Dev и Графика",
      statLinks: "100% Официальные Ссылки",
      statLinksSub: "Напрямую от разработчиков",
      statClean: "Без Вирусов и Рекламы",
      statCleanSub: "Безопасные и чистые зеркала",
      statPlatforms: "Windows • macOS • Linux",
      statPlatformsSub: "Кроссплатформенность",
      latestUpdatesTitle: "Последние обновления",
      searchPlaceholder: "Поиск программ (Chrome, Office, Python, Photoshop... нажмите /)",
      allPlatforms: "Все ОС",
      windowsOnly: "Windows",
      macOnly: "macOS",
      linuxOnly: "Linux",
      allLicenses: "Все Лицензии",
      openSource: "Open Source",
      freeware: "Freeware",
      commercial: "Commercial / Trial",
      sortBy: "Сортировка:",
      sortPopular: "По количеству скачиваний",
      sortName: "По алфавиту (А-Я)",
      sortRating: "По рейтингу",
      sortNewest: "По дате обновления",
      verifiedVendor: "ПРОВЕРЕНО ОФИЦИАЛЬНО",
      directDownload: "Официальная Загрузка",
      detailsAndMirrors: "Подробнее",
      noResults: "По вашему запросу ничего не найдено",
      tryAnother: "Попробуйте очистить фильтры или выбрать другую категорию.",
      clearSearch: "Сбросить фильтры",
      officialSite: "Официальный сайт",
      downloadOptions: "Варианты загрузки и архитектуры",
      keyFeatures: "Основные возможности",
      sysRequirements: "Системные требования",
      needInstallHelp: "Нужна помощь с установкой или настройкой?",
      specialistSub: "Свяжитесь с Сипаном Даниеляном для удаленной установки ПО, настройки ОС или серверов.",
      requestSpecialist: "Вызвать Специалиста",
      close: "Закрыть",
      backToHome: "Главная",
      itPlatform: "IT Сервис",
      resultsCount: "Показано",
      ofTotal: "из",
      disclaimerTitle: "Гарантия подлинности и безопасности",
      disclaimerText: "Внимание: Все ссылки в каталоге RoyalArm Shop ведут исключительно на официальные сайты разработчиков и проверенные зеркала. Файлы не содержат рекламного или вредоносного кода. Все права и товарные знаки принадлежат их правообладателям.",
    },
  }[lang] || {};

  const getCategoryLabel = (cat) => {
    if (lang === "hy" && cat.labelHy) return cat.labelHy;
    if (lang === "ru" && cat.labelRu) return cat.labelRu;
    return cat.label;
  };

  const getProductDesc = (p) => {
    if (lang === "hy" && p.descriptionHy) return p.descriptionHy;
    if (lang === "ru" && p.descriptionRu) return p.descriptionRu;
    return p.description;
  };

  return (
    <div className="shop-container">
      <div className="shop-glow-1" aria-hidden="true" />
      <div className="shop-glow-2" aria-hidden="true" />

      {/* Navigation Header */}
      <header className="shop-nav">
        <div className="shop-nav-inner">
          <Link href="/" className="shop-brand" aria-label="RoyalArm Portfolio Home">
            <span className="shop-brand-badge">S/D</span>
            <span>RoyalArm Shop</span>
          </Link>

          <nav className="shop-nav-links">
            <Link href="/" className="shop-nav-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>{t.backToHome}</span>
            </Link>

            <a href="https://it.royalarm.uk/" className="shop-nav-link" target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>{t.itPlatform}</span>
            </a>

            <Link href="/service-request" className="shop-nav-cta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{t.requestSpecialist}</span>
            </Link>

            <div className="shop-nav-tools">
              <button
                type="button"
                className="shop-lang-toggle"
                onClick={() => {
                  const langs = ["hy", "en", "ru"];
                  const nextLang = langs[(langs.indexOf(lang) + 1) % langs.length];
                  setLang(nextLang);
                  localStorage.setItem("portfolio-language", nextLang);
                  document.documentElement.lang = nextLang;
                  window.dispatchEvent(new Event("storage"));
                }}
                title="Toggle Language"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span>{lang.toUpperCase()}</span>
              </button>
              <ThemeToggle variant="icon" />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="shop-hero">
        <div className="shop-badge">
          <span className="shop-badge-dot" />
          <span>{t.badge}</span>
        </div>

        <h1 className="shop-title">
          {t.title} <span className="shop-title-gradient">{t.titleGradient}</span>
        </h1>

        <p className="shop-subtitle">{t.subtitle}</p>

        {/* Live Metric Strip */}
        <div className="shop-stats-strip">
          <div className="shop-stat-card">
            <div className="shop-stat-icon-wrap cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <div>
              <span className="shop-stat-value">{t.statTools}</span>
              <span className="shop-stat-label">{t.statToolsSub}</span>
            </div>
          </div>

          <div className="shop-stat-card">
            <div className="shop-stat-icon-wrap green">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div>
              <span className="shop-stat-value">{t.statLinks}</span>
              <span className="shop-stat-label">{t.statLinksSub}</span>
            </div>
          </div>

          <div className="shop-stat-card">
            <div className="shop-stat-icon-wrap purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div>
              <span className="shop-stat-value">{t.statPlatforms}</span>
              <span className="shop-stat-label">{t.statPlatformsSub}</span>
            </div>
          </div>

          <div className="shop-stat-card">
            <div className="shop-stat-icon-wrap amber">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <span className="shop-stat-value">{t.statClean}</span>
              <span className="shop-stat-label">{t.statCleanSub}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Feed Strip (Inspired by Network.am) */}
      <section className="shop-updates-section">
        <div className="shop-updates-card">
          <div className="shop-updates-header">
            <div className="shop-updates-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              <span>{t.latestUpdatesTitle}</span>
            </div>
            <span style={{ fontSize: "0.78rem", color: "var(--shop-text-dim)", fontFamily: "var(--shop-font-mono)" }}>
              2026 Direct Mirrors
            </span>
          </div>

          <div className="shop-updates-grid">
            {latestUpdates.map((item) => (
              <button
                key={item.id}
                type="button"
                className="shop-update-item"
                onClick={() => setActiveModalProduct(item)}
              >
                <div className="shop-update-left">
                  <img src={item.thumbnail} alt="" className="shop-update-icon" />
                  <span className="shop-update-name">{item.title}</span>
                  <span className="shop-update-ver">v{item.version}</span>
                </div>
                <span className="shop-update-date">{item.published}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Controls & Filter Panel */}
      <section className="shop-controls">
        <div className="shop-controls-glass">
          {/* Main Search Row */}
          <div className="shop-search-row">
            <div className="shop-search-input-wrap">
              <svg className="shop-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="shop-search-box"
                type="text"
                className="shop-search-input"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search software catalog"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="shop-search-clear"
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown (Network.am style) */}
            <div className="shop-sort-wrap">
              <span className="shop-sort-label">{t.sortBy}</span>
              <select
                className="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">{t.sortPopular}</option>
                <option value="title-asc">{t.sortName}</option>
                <option value="rating">{t.sortRating}</option>
                <option value="newest">{t.sortNewest}</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Row: Platforms & Licenses */}
          <div className="shop-filters-row">
            <div className="shop-platform-pills">
              <span className="shop-platform-label">OS:</span>
              <button
                type="button"
                className={`shop-pill-btn ${selectedPlatform === "all" ? "active" : ""}`}
                onClick={() => setSelectedPlatform("all")}
              >
                {t.allPlatforms}
              </button>
              <button
                type="button"
                className={`shop-pill-btn ${selectedPlatform === "windows" ? "active" : ""}`}
                onClick={() => setSelectedPlatform("windows")}
              >
                🪟 {t.windowsOnly}
              </button>
              <button
                type="button"
                className={`shop-pill-btn ${selectedPlatform === "macos" ? "active" : ""}`}
                onClick={() => setSelectedPlatform("macos")}
              >
                🍎 {t.macOnly}
              </button>
              <button
                type="button"
                className={`shop-pill-btn ${selectedPlatform === "linux" ? "active" : ""}`}
                onClick={() => setSelectedPlatform("linux")}
              >
                🐧 {t.linuxOnly}
              </button>
            </div>

            <div className="shop-platform-pills">
              <span className="shop-platform-label">License:</span>
              <button
                type="button"
                className={`shop-pill-btn ${selectedLicense === "all" ? "active" : ""}`}
                onClick={() => setSelectedLicense("all")}
              >
                {t.allLicenses}
              </button>
              <button
                type="button"
                className={`shop-pill-btn ${selectedLicense === "opensource" ? "active" : ""}`}
                onClick={() => setSelectedLicense("opensource")}
              >
                {t.openSource}
              </button>
              <button
                type="button"
                className={`shop-pill-btn ${selectedLicense === "freeware" ? "active" : ""}`}
                onClick={() => setSelectedLicense("freeware")}
              >
                {t.freeware}
              </button>
              <button
                type="button"
                className={`shop-pill-btn ${selectedLicense === "commercial" ? "active" : ""}`}
                onClick={() => setSelectedLicense("commercial")}
              >
                {t.commercial}
              </button>
            </div>
          </div>

          {/* Categories Pill Bar */}
          <div className="shop-categories-bar" role="tablist">
            {SHOP_CATEGORIES.map((cat) => {
              const count =
                cat.id === "all"
                  ? PRODUCTS.length
                  : PRODUCTS.filter(
                      (p) => p.primaryCategory === cat.id || p.categories.includes(cat.id)
                    ).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat.id}
                  className={`shop-cat-btn ${selectedCategory === cat.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{getCategoryLabel(cat)}</span>
                  <span className="shop-cat-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Alphabet Fast Jump Bar (A-Z inspired by Network.am) */}
          <div className="shop-alpha-bar" title="Filter by initial letter">
            {ALPHABET.map((char) => (
              <button
                key={char}
                type="button"
                className={`shop-alpha-btn ${selectedLetter === char ? "active" : ""}`}
                onClick={() => setSelectedLetter(char)}
              >
                {char}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="shop-grid-section">
        <div className="shop-results-meta">
          <span className="shop-results-count">
            {t.resultsCount} <strong>{filteredProducts.length}</strong> {t.ofTotal} {PRODUCTS.length}
          </span>
          {(searchQuery || selectedCategory !== "all" || selectedPlatform !== "all" || selectedLicense !== "all" || selectedLetter !== "ALL") && (
            <button
              type="button"
              className="shop-pill-btn"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedPlatform("all");
                setSelectedLicense("all");
                setSelectedLetter("ALL");
              }}
            >
              ✕ {t.clearSearch}
            </button>
          )}
        </div>

        <div className="shop-grid">
          {filteredProducts.length === 0 ? (
            <div className="shop-empty">
              <svg className="shop-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3>{t.noResults}</h3>
              <p>{t.tryAnother}</p>
              <button
                type="button"
                className="shop-btn-primary"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedPlatform("all");
                  setSelectedLicense("all");
                  setSelectedLetter("ALL");
                }}
              >
                {t.clearSearch}
              </button>
            </div>
          ) : (
            filteredProducts.map((p) => {
              const primaryDownload = p.downloads && p.downloads[0] ? p.downloads[0].url : p.officialSite;

              return (
                <article key={p.id} className="shop-card">
                  {/* Card Header: Icon & Verification Tags */}
                  <div className="shop-card-header">
                    <div className="shop-card-icon-frame">
                      <img
                        src={p.thumbnail}
                        alt={`${p.title} icon`}
                        className="shop-card-icon"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "/assets/LogoArm.png";
                        }}
                      />
                    </div>

                    <div className="shop-card-badges-col">
                      <span className="shop-verified-tag">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <polyline points="9 12 11 14 15 10" />
                        </svg>
                        <span>{t.verifiedVendor}</span>
                      </span>

                      <span
                        className={`shop-license-tag ${
                          p.license.toLowerCase().includes("open source")
                            ? "open-source"
                            : p.license.toLowerCase().includes("freeware")
                            ? "freeware"
                            : "commercial"
                        }`}
                      >
                        {p.license}
                      </span>
                    </div>
                  </div>

                  {/* Developer & Version */}
                  <div className="shop-card-dev-row">
                    <span className="shop-card-developer">{p.developer}</span>
                    <span className="shop-card-version">v{p.version}</span>
                  </div>

                  {/* Title & Description */}
                  <h2 className="shop-card-title">{p.title}</h2>
                  <p className="shop-card-desc">{getProductDesc(p)}</p>

                  {/* OS Chips */}
                  <div className="shop-card-os-row">
                    <span className={`shop-os-chip ${p.osList?.includes("windows") ? "supported" : ""}`}>
                      🪟 Windows
                    </span>
                    {p.osList?.includes("macos") && (
                      <span className="shop-os-chip supported">🍎 macOS</span>
                    )}
                    {p.osList?.includes("linux") && (
                      <span className="shop-os-chip supported">🐧 Linux</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="shop-card-actions">
                    <a
                      href={primaryDownload}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shop-btn-primary"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>{t.directDownload}</span>
                    </a>

                    <button
                      type="button"
                      className="shop-btn-secondary"
                      onClick={() => setActiveModalProduct(p)}
                      title="View specifications and all download mirrors"
                    >
                      <span>{t.detailsAndMirrors}</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>



      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="shop-modal-overlay" onClick={() => setActiveModalProduct(null)}>
          <div
            className="shop-modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-p-title"
          >
            <button
              type="button"
              className="shop-modal-close"
              onClick={() => setActiveModalProduct(null)}
              aria-label={t.close}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="shop-modal-top">
              <div className="shop-modal-logo">
                <img
                  src={activeModalProduct.thumbnail}
                  alt={activeModalProduct.title}
                  onError={(e) => {
                    e.currentTarget.src = "/assets/LogoArm.png";
                  }}
                />
              </div>

              <div className="shop-modal-title-group">
                <h2 id="modal-p-title">{activeModalProduct.title}</h2>
                <div className="shop-modal-dev-info">
                  <span>{activeModalProduct.developer}</span>
                  <span>•</span>
                  <span>v{activeModalProduct.version}</span>
                  <span>•</span>
                  <a
                    href={activeModalProduct.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-modal-official-link"
                  >
                    <span>{t.officialSite}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="shop-card-desc" style={{ WebkitLineClamp: "unset", fontSize: "0.95rem" }}>
              {activeModalProduct.fullText || getProductDesc(activeModalProduct)}
            </p>

            {/* Download Options Box */}
            <div className="shop-modal-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{t.downloadOptions}</span>
            </div>

            <div className="shop-modal-downloads-box">
              {activeModalProduct.downloads.map((dl, idx) => (
                <div key={idx} className="shop-dl-row">
                  <div className="shop-dl-info">
                    <span className="shop-dl-name">{dl.name}</span>
                    <div className="shop-dl-meta">
                      <span>Format: {dl.format}</span>
                      {dl.size && <span>• Size: {dl.size}</span>}
                    </div>
                  </div>

                  <a
                    href={dl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shop-dl-action-btn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>{t.directDownload}</span>
                  </a>
                </div>
              ))}
            </div>

            {/* Key Features */}
            {activeModalProduct.features && activeModalProduct.features.length > 0 && (
              <>
                <div className="shop-modal-section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{t.keyFeatures}</span>
                </div>

                <div className="shop-features-grid">
                  {activeModalProduct.features.map((feat, fIdx) => (
                    <div key={fIdx} className="shop-feature-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* System Requirements */}
            {activeModalProduct.systemRequirements && (
              <>
                <div className="shop-modal-section-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                    <line x1="20" y1="9" x2="23" y2="9" />
                    <line x1="20" y1="14" x2="23" y2="14" />
                    <line x1="1" y1="9" x2="4" y2="9" />
                    <line x1="1" y1="14" x2="4" y2="14" />
                  </svg>
                  <span>{t.sysRequirements}</span>
                </div>

                <div className="shop-sys-req-grid">
                  <div className="shop-req-box">
                    <span className="shop-req-label">OS</span>
                    <span className="shop-req-val">{activeModalProduct.systemRequirements.os}</span>
                  </div>
                  <div className="shop-req-box">
                    <span className="shop-req-label">RAM</span>
                    <span className="shop-req-val">{activeModalProduct.systemRequirements.ram}</span>
                  </div>
                  <div className="shop-req-box">
                    <span className="shop-req-label">Disk</span>
                    <span className="shop-req-val">{activeModalProduct.systemRequirements.disk}</span>
                  </div>
                  <div className="shop-req-box">
                    <span className="shop-req-label">CPU</span>
                    <span className="shop-req-val">{activeModalProduct.systemRequirements.cpu}</span>
                  </div>
                </div>
              </>
            )}

            {/* Dedicated Page Link */}
            <div style={{ marginTop: "1.25rem", textAlign: "right" }}>
              <Link
                href={`/shop/${activeModalProduct.slug}`}
                className="shop-modal-official-link"
                style={{ fontSize: "0.86rem" }}
              >
                <span>Open Dedicated Product Page & SEO Specs →</span>
              </Link>
            </div>

            {/* Sipan Danielyan Support Box */}
            <div className="shop-specialist-box">
              <div className="shop-specialist-text">
                <h4>{t.needInstallHelp}</h4>
                <p>{t.specialistSub}</p>
              </div>

              <Link href="/service-request" className="shop-specialist-btn">
                {t.requestSpecialist}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
