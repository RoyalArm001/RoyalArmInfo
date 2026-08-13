(function setupLocalTranslation() {
  const supportedLanguages = ["en", "hy", "ru"];
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  let translations = {};
  let currentLanguage = "en";
  let refreshTimer = 0;

  function normalize(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function setStatus(message) {
    document.querySelectorAll("[data-translation-status]").forEach(function (status) {
      status.textContent = message;
    });
  }

  function translateTextNode(node, language) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue || "");

    const source = originalText.get(node);
    const key = normalize(source);
    if (!key) return;

    const translated = translations[language]?.[key];
    if (!translated) {
      node.nodeValue = source;
      return;
    }

    const leading = source.match(/^\s*/)?.[0] || "";
    const trailing = source.match(/\s*$/)?.[0] || "";
    node.nodeValue = `${leading}${translated}${trailing}`;
  }

  function translateAttributes(element, language) {
    const names = ["placeholder", "title", "aria-label"];
    let stored = originalAttributes.get(element);
    if (!stored) {
      stored = {};
      names.forEach(function (name) {
        if (element.hasAttribute(name)) stored[name] = element.getAttribute(name);
      });
      originalAttributes.set(element, stored);
    }

    Object.entries(stored).forEach(function ([name, source]) {
      element.setAttribute(name, translations[language]?.[normalize(source)] || source);
    });
  }

  function applyLanguage(language) {
    const selected = supportedLanguages.includes(language) ? language : "en";
    currentLanguage = selected;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest("script, style, code, pre, #typed-name, #cursor")) {
          return NodeFilter.FILTER_REJECT;
        }
        return normalize(node.nodeValue || "")
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      translateTextNode(node, selected);
    });

    document.querySelectorAll("[placeholder], [title], [aria-label]").forEach(function (element) {
      translateAttributes(element, selected);
    });

    document.documentElement.lang = selected;
    document.querySelectorAll("[data-language-select]").forEach(function (select) {
      select.value = selected;
    });
    try {
      window.localStorage.setItem("portfolio-language", selected);
    } catch (_) {}
    setStatus(selected === "en" ? "English selected" : "Local translation applied");
  }

  function watchDynamicContent() {
    const observer = new MutationObserver(function (mutations) {
      const hasNewContent = mutations.some(function (mutation) {
        return mutation.addedNodes.length > 0
          && !mutation.target.closest?.("[data-translation-status]");
      });
      if (!hasNewContent) return;

      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(function () {
        applyLanguage(currentLanguage);
      }, 0);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  async function initialize() {
    const selects = Array.from(document.querySelectorAll("[data-language-select]"));
    if (!selects.length) return;

    try {
      const response = await fetch("/i18n/translations.json?v=request-questionnaire-20260813", { cache: "force-cache" });
      if (!response.ok) throw new Error("Translation file could not be loaded");
      translations = await response.json();
    } catch (_) {
      setStatus("Local translation file is unavailable");
      return;
    }

    let savedLanguage = "en";
    try {
      savedLanguage = window.localStorage.getItem("portfolio-language") || "en";
    } catch (_) {}
    if (!supportedLanguages.includes(savedLanguage)) savedLanguage = "en";

    selects.forEach(function (select) {
      select.addEventListener("change", function () {
        applyLanguage(select.value);
      });
    });
    applyLanguage(savedLanguage);
    watchDynamicContent();

    window.setPortfolioLanguage = applyLanguage;
    window.getPortfolioLanguage = function () {
      return currentLanguage;
    };
  }

  initialize();
})();
