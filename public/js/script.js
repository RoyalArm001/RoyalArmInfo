function initializePortfolio() {
  if (window.__portfolioInitialized) return;
  window.__portfolioInitialized = true;

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    formStatus.textContent = "Opening your email app...";
    window.location.href = `mailto:royalarm001@gmail.com?subject=${subject}&body=${body}`;
  });

  const menuToggle = document.getElementById("mobile-menu-toggle");
  const mobileNavigation = document.getElementById("mobile-navigation");
  const openIcon = menuToggle?.querySelector('[data-menu-icon="open"]');
  const closeIcon = menuToggle?.querySelector('[data-menu-icon="close"]');

  function setMenuOpen(isOpen) {
    if (!menuToggle || !mobileNavigation) return;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileNavigation.hidden = !isOpen;
    if (openIcon) openIcon.hidden = isOpen;
    if (closeIcon) closeIcon.hidden = !isOpen;
  }

  menuToggle?.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  mobileNavigation?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  const sections = [...document.querySelectorAll("section[id]")];
  const navigationLinks = [...document.querySelectorAll("[data-nav-section]")];
  let scrollUpdatePending = false;

  function updateActiveNavigation() {
    const scrollPosition = window.scrollY + 150;
    let activeSection = "home";
    for (const section of sections) {
      if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
        activeSection = section.id;
        break;
      }
    }
    for (const link of navigationLinks) {
      const isActive = link.dataset.navSection === activeSection;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    }
    scrollUpdatePending = false;
  }

  window.addEventListener("scroll", () => {
    if (scrollUpdatePending) return;
    scrollUpdatePending = true;
    window.requestAnimationFrame(updateActiveNavigation);
  }, { passive: true });
  updateActiveNavigation();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePortfolio, { once: true });
} else {
  initializePortfolio();
}
