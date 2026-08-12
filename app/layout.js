import Script from "next/script";
import "./globals.css";
import ThemeToggle from "./ThemeToggle";

export const metadata = {
  metadataBase: new URL("https://royalarm.store"),
  title: "Sipan Danielyan | IT Support & Network Engineer Armenia",
  description:
    "IT support in Armenia by Sipan Danielyan: networks, servers, Proxmox, TrueNAS, Nextcloud, Hikvision CCTV, monitoring systems, websites, and remote technical service.",
  keywords: [
    "Sipan Danielyan",
    "IT programmer",
    "network engineer",
    "Hikvision",
    "server installation",
    "website developer",
    "IT support Armenia",
    "ՏՏ սպասարկում Հայաստանում",
    "ցանցերի տեղադրում",
    "սերվերների սպասարկում",
    "տեսախցիկների տեղադրում",
    "remote IT support Armenia",
    "Proxmox Armenia",
    "TrueNAS Armenia",
    "Nextcloud Armenia",
    "Zabbix Armenia",
  ],
  authors: [{ name: "Sipan Danielyan" }],
  openGraph: {
    title: "Sipan Danielyan | IT Support & Network Engineer Armenia",
    description:
      "Remote IT support, networks, servers, CCTV, monitoring systems, and web development across Armenia.",
    url: "/",
    siteName: "Sipan Danielyan — IT Services Armenia",
    locale: "hy_AM",
    type: "website",
    images: ["/assets/images/Sipan-Danielyan.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sipan Danielyan | IT Services Armenia",
    description: "Networks, servers, CCTV, monitoring, software, and remote IT support across Armenia.",
    images: ["/assets/images/Sipan-Danielyan.jpg"],
  },
  alternates: { canonical: "/" },
  icons: { icon: "/assets/LogoArm.png" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://royalarm.store/#person",
        name: "Sipan Danielyan",
        url: "https://royalarm.store",
        image: "https://royalarm.store/assets/images/Sipan-Danielyan.jpg",
        jobTitle: "IT Programmer and Network Engineer",
        email: "mailto:royalarm001@gmail.com",
        telephone: "+37491733633",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jermuk",
          addressCountry: "AM",
        },
        knowsAbout: [
          "IT support",
          "Network engineering",
          "Server administration",
          "Proxmox VE",
          "TrueNAS",
          "Nextcloud",
          "Hikvision CCTV",
          "DitakNet",
          "Zabbix",
          "Nagios",
          "Netdata",
          "Web development",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://royalarm.store/#service",
        name: "Sipan Danielyan IT Services",
        url: "https://royalarm.store",
        image: "https://royalarm.store/assets/images/Sipan-Danielyan.jpg",
        telephone: "+37491733633",
        email: "royalarm001@gmail.com",
        priceRange: "$$",
        areaServed: { "@type": "Country", name: "Armenia" },
        founder: { "@id": "https://royalarm.store/#person" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jermuk",
          addressCountry: "AM",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "IT services in Armenia",
          itemListElement: [
            "Remote IT support",
            "Network installation and configuration",
            "Server installation and maintenance",
            "Proxmox, TrueNAS and Nextcloud",
            "Hikvision CCTV installation",
            "Monitoring server installation",
            "Website and software development",
            "RoyalArm IT app access and support",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
    ],
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('portfolio-theme');var theme=saved||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Merienda:wght@300..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Tangerine:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/styles.css?v=intermediary-admin-20260812" />
      </head>
      <body className="bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <div className="site-controls">
          <ThemeToggle />
          <div className="language-switcher" aria-label="Translate page">
            <i className="fas fa-language" aria-hidden="true" />
            <span className="language-label">Translate</span>
            <label className="language-control" htmlFor="site-language-select">
              <span className="sr-only">Choose page language</span>
              <select id="site-language-select" className="site-language-select" data-language-select defaultValue="en">
                <option value="en">EN · English</option>
                <option value="hy">HY · Հայերեն</option>
                <option value="ru">RU · Русский</option>
              </select>
            </label>
            <span id="translation-status" data-translation-status className="sr-only" aria-live="polite" />
          </div>
        </div>
        <Script src="/js/lottie.min.js" strategy="afterInteractive" />
        <Script src="/js/aos.js" strategy="afterInteractive" />
        <Script src="/js/lottie-player.js" strategy="afterInteractive" />
        <Script src="/js/script.js" strategy="afterInteractive" />
        <Script src="/js/translate.js?v=intermediary-admin-20260812" strategy="afterInteractive" />
      </body>
    </html>
  );
}
