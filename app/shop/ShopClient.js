"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS, SHOP_CATEGORIES } from "../../lib/shopData";
import "./shop.css";

export default function ShopClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [lang, setLang] = useState("en");

  // Sync with site language
  useEffect(() => {
    function detectLanguage() {
      const saved = localStorage.getItem("portfolio-language");
      if (saved && ["en", "hy", "ru"].includes(saved)) {
        setLang(saved);
      } else {
        const docLang = document.documentElement.lang;
        if (docLang && ["en", "hy", "ru"].includes(docLang)) setLang(docLang);
      }
    }
    detectLanguage();
    window.addEventListener("storage", detectLanguage);
    return () => window.removeEventListener("storage", detectLanguage);
  }, []);

  // Close modal on ESC key and prevent body scroll
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setActiveModalProduct(null);
      }
    }
    if (activeModalProduct) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModalProduct]);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" ||
        item.primaryCategory === selectedCategory ||
        item.categories.includes(selectedCategory);

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categories.some((c) => c.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.published) - new Date(a.published));
    } else if (sortBy === "title-asc") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "downloads") {
      list.sort((a, b) => b.downloads.length - a.downloads.length);
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  // Category title translation
  const getCategoryLabel = (cat) => {
    if (lang === "hy" && cat.labelHy) return cat.labelHy;
    if (lang === "ru" && cat.labelRu) return cat.labelRu;
    return cat.label;
  };

  const texts = {
    en: {
      badge: "ROYALARM SOFTWARE & TOOLS",
      title: "Software & Digital Catalog",
      subtitle:
        "Official releases, IDE tools, developer kits, macOS installers, and system utilities direct from Sipan Danielyan & RoyalArm.",
      searchPlaceholder: "Search software, tools, ISOs, keygens...",
      sortBy: "Sort by:",
      newest: "Newest First",
      titleAsc: "Name (A-Z)",
      mostDownloads: "Most Download Options",
      viewDetails: "View Details & Downloads",
      noResults: "No software found matching your search.",
      tryAnother: "Try selecting another category or clear the search query.",
      downloadsCount: "files available",
      downloadNow: "Download",
      requestInstall: "Need help installing or configuring?",
      requestBtn: "Request IT Specialist",
      close: "Close",
      videoTutorial: "Video Installation Tutorial",
      downloadSources: "Direct Download Sources",
      descriptionTitle: "Software Overview & Installation Notes",
      backToSite: "Portfolio",
      itApp: "IT App",
      serviceRequest: "Request Service",
    },
    hy: {
      badge: "ROYALARM ԾՐԱԳՐԱՅԻՆ ԱՊԱՀՈՎՈՒՄ ԵՎ ԳՈՐԾԻՔՆԵՐ",
      title: "Ծրագրերի և Գործիքների Կատալոգ",
      subtitle:
        "Պաշտոնական տարբերակներ, ծրագրավորման գործիքներ, Delphi, Adobe, macOS և համակարգային կոմունալներ Սիփան Դանիելյանից։",
      searchPlaceholder: "Փնտրել ծրագրեր, ISO, գործիքներ...",
      sortBy: "Տեսակավորել:",
      newest: "Նորերը սկզբում",
      titleAsc: "Անվանում (A-Z)",
      mostDownloads: "Շատ ֆայլեր ունեցողները",
      viewDetails: "Մանրամասներ և Բեռնել",
      noResults: "Ձեր հարցմանը համապատասխան ոչինչ չգտնվեց։",
      tryAnother: "Փորձեք ընտրել այլ բաժին կամ փոխել որոնման բառը։",
      downloadsCount: "բեռնման ֆայլ",
      downloadNow: "Բեռնել",
      requestInstall: "Կարիք ունե՞ք տեղադրման կամ կարգավորման աջակցության։",
      requestBtn: "Պատվիրել ՏՏ Մասնագետ",
      close: "Փակել",
      videoTutorial: "Տեսադաս և Տեղադրման Ուղեցույց",
      downloadSources: "Ուղիղ Բեռնման Հղումներ",
      descriptionTitle: "Ծրագրի Նկարագրություն և Տեղադրման Նշումներ",
      backToSite: "Գլխավոր",
      itApp: "IT Հավելված",
      serviceRequest: "Դիմել Ծառայության",
    },
    ru: {
      badge: "ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ И ИНСТРУМЕНТЫ ROYALARM",
      title: "Каталог Программ и Систем",
      subtitle:
        "Официальные релизы, среды разработки Delphi, пакеты Adobe, macOS и системные утилиты от Сипана Даниеляна.",
      searchPlaceholder: "Поиск программ, инструментов, ISO, ключей...",
      sortBy: "Сортировка:",
      newest: "Сначала новые",
      titleAsc: "По названию (А-Я)",
      mostDownloads: "Много файлов",
      viewDetails: "Подробнее и Скачать",
      noResults: "По вашему запросу ничего не найдено.",
      tryAnother: "Попробуйте выбрать другую категорию или очистить поиск.",
      downloadsCount: "файлов доступно",
      downloadNow: "Скачать",
      requestInstall: "Нужна помощь с установкой или настройкой?",
      requestBtn: "Вызвать IT-Специалиста",
      close: "Закрыть",
      videoTutorial: "Видеоинструкция по установке",
      downloadSources: "Прямые ссылки на скачивание",
      descriptionTitle: "Описание и Инструкция по установке",
      backToSite: "Портфолио",
      itApp: "IT Сервис",
      serviceRequest: "Заказать услугу",
    },
  }[lang] || {
    badge: "ROYALARM SOFTWARE & TOOLS",
    title: "Software & Digital Catalog",
    subtitle:
      "Official releases, IDE tools, developer kits, macOS installers, and system utilities direct from Sipan Danielyan & RoyalArm.",
    searchPlaceholder: "Search software, tools, ISOs, keygens...",
    sortBy: "Sort by:",
    newest: "Newest First",
    titleAsc: "Name (A-Z)",
    mostDownloads: "Most Download Options",
    viewDetails: "View Details & Downloads",
    noResults: "No software found matching your search.",
    tryAnother: "Try selecting another category or clear the search query.",
    downloadsCount: "files available",
    downloadNow: "Download",
    requestInstall: "Need help installing or configuring?",
    requestBtn: "Request IT Specialist",
    close: "Close",
    videoTutorial: "Video Installation Tutorial",
    downloadSources: "Direct Download Sources",
    descriptionTitle: "Software Overview & Installation Notes",
    backToSite: "Portfolio",
    itApp: "IT App",
    serviceRequest: "Request Service",
  };

  return (
    <div className="shop-container">
      <div className="shop-glow-1" aria-hidden="true" />
      <div className="shop-glow-2" aria-hidden="true" />

      {/* Navigation Header */}
      <header className="shop-nav">
        <div className="shop-nav-inner">
          <Link href="/" className="shop-brand" aria-label="RoyalArm Portfolio Home">
            <span className="shop-brand-badge">S / D</span>
            <span>RoyalArm Shop</span>
          </Link>

          <nav className="shop-nav-links">
            <Link href="/" className="shop-nav-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>{texts.backToSite}</span>
            </Link>

            <a href="https://it.royalarm.uk/" className="shop-nav-link" target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>{texts.itApp}</span>
            </a>

            <Link href="/service-request" className="shop-nav-cta">
              {texts.serviceRequest}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Header */}
      <section className="shop-header">
        <div className="shop-badge">{texts.badge}</div>
        <h1 className="shop-title">
          RoyalArm <span className="shop-title-accent">{texts.title}</span>
        </h1>
        <p className="shop-subtitle">{texts.subtitle}</p>
      </section>

      {/* Filter and Search Bar */}
      <section className="shop-controls">
        <div className="shop-search-bar">
          <div className="shop-search-input-wrap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="shop-search-input"
              placeholder={texts.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={texts.searchPlaceholder}
            />
          </div>

          <div className="shop-sort-wrap">
            <span className="shop-sort-label">{texts.sortBy}</span>
            <select
              className="shop-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="newest">{texts.newest}</option>
              <option value="title-asc">{texts.titleAsc}</option>
              <option value="downloads">{texts.mostDownloads}</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="shop-categories" role="tablist">
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
                {getCategoryLabel(cat)} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Product Catalog Grid */}
      <main className="shop-grid">
        {filteredProducts.length === 0 ? (
          <div className="shop-empty">
            <svg className="shop-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <h3>{texts.noResults}</h3>
            <p>{texts.tryAnother}</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const formats = Array.from(new Set(product.downloads.map((d) => d.format).filter(Boolean)));

            return (
              <article key={product.id} className="shop-card">
                <div className="shop-card-thumb-wrap">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="shop-card-thumb"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/LogoArm.png";
                    }}
                  />
                  <span className="shop-card-category-tag">{product.primaryCategory}</span>
                  {product.youtubeId && (
                    <span className="shop-card-video-indicator" title="Includes Video Tutorial">
                      ▶
                    </span>
                  )}
                </div>

                <div className="shop-card-body">
                  <div className="shop-card-meta">
                    <span>{product.published}</span>
                    <span>
                      {product.downloads.length} {texts.downloadsCount}
                    </span>
                  </div>

                  <h2 className="shop-card-title">{product.title}</h2>
                  <p className="shop-card-desc">{product.description}</p>

                  <div className="shop-card-downloads-info">
                    {formats.slice(0, 3).map((fmt) => (
                      <span key={fmt} className={`shop-format-badge ${fmt.toLowerCase()}`}>
                        {fmt}
                      </span>
                    ))}
                    {formats.length > 3 && (
                      <span className="shop-format-badge">+{formats.length - 3}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="shop-card-btn"
                    onClick={() => setActiveModalProduct(product)}
                  >
                    <span>{texts.viewDetails}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            );
          })
        )}
      </main>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="shop-modal-overlay" onClick={() => setActiveModalProduct(null)}>
          <div
            className="shop-modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-product-title"
          >
            <button
              type="button"
              className="shop-modal-close"
              onClick={() => setActiveModalProduct(null)}
              aria-label={texts.close}
            >
              ×
            </button>

            <div className="shop-modal-header">
              <span className="shop-card-category-tag">{activeModalProduct.primaryCategory}</span>
              <h2 id="modal-product-title" className="shop-modal-title">
                {activeModalProduct.title}
              </h2>
              <div className="shop-modal-tags">
                {activeModalProduct.categories.map((c) => (
                  <span key={c} className="shop-modal-tag">
                    #{c}
                  </span>
                ))}
              </div>
            </div>

            {/* Media Section: YouTube or Image */}
            <div className="shop-modal-media">
              {activeModalProduct.youtubeId ? (
                <div className="shop-video-container">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${activeModalProduct.youtubeId}`}
                    title={`${activeModalProduct.title} Tutorial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : activeModalProduct.images.length > 0 ? (
                <img
                  src={activeModalProduct.images[0]}
                  alt={activeModalProduct.title}
                  className="shop-modal-img"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/LogoArm.png";
                  }}
                />
              ) : null}
            </div>

            {/* Direct Downloads List */}
            <div className="shop-modal-downloads">
              <h3 className="shop-section-subtitle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>{texts.downloadSources} ({activeModalProduct.downloads.length})</span>
              </h3>

              <div className="shop-download-list">
                {activeModalProduct.downloads.map((dl, idx) => (
                  <div key={idx} className="shop-download-item">
                    <div className="shop-download-info">
                      <span className="shop-download-name">{dl.name}</span>
                      <div className="shop-download-details">
                        {dl.format && (
                          <span className={`shop-format-badge ${dl.format.toLowerCase()}`}>
                            {dl.format}
                          </span>
                        )}
                        {dl.size && <span>• {dl.size}</span>}
                      </div>
                    </div>

                    <a
                      href={dl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shop-dl-btn"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>{texts.downloadNow}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Description / Installation Notes */}
            {activeModalProduct.fullText && (
              <div>
                <h3 className="shop-section-subtitle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  <span>{texts.descriptionTitle}</span>
                </h3>
                <div className="shop-modal-desc">{activeModalProduct.fullText}</div>
              </div>
            )}

            {/* IT Service Installation CTA */}
            <div className="shop-service-cta">
              <div className="shop-service-cta-text">
                <h4>{texts.requestInstall}</h4>
                <p>Contact Sipan Danielyan for remote configuration, server setups, or software maintenance.</p>
              </div>
              <Link href="/service-request" className="shop-service-cta-btn">
                <span>{texts.requestBtn}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
