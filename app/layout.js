import Script from "next/script";
import SiteEntryLoader from "./SiteEntryLoader";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.royalarm.uk"),
  applicationName: "Sipan Danielyan — RoyalArm",
  title: {
    default: "Sipan Danielyan (Սիփան Դանիելյան) | IT Support & Network Engineer Armenia",
    template: "%s | Sipan Danielyan — RoyalArm",
  },
  description:
    "Official website of Sipan Danielyan (Սիփան Դանիելյան) — IT Technician & Network Engineer in Armenia (Mota-Engil, RoyalArm). Enterprise networks, servers, Proxmox VE, TrueNAS, Nextcloud, Hikvision CCTV, Zabbix monitoring, RoyalArm AI, and remote IT support.",
  keywords: [
    "Sipan Danielyan",
    "Սիփան Դանիելյան",
    "Сипан Даниелян",
    "RoyalArm",
    "royalarm.uk",
    "Sipan Danielyan Armenia",
    "Sipan Danielyan IT",
    "IT Technician Armenia",
    "network engineer Armenia",
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
  authors: [{ name: "Sipan Danielyan", url: "https://www.royalarm.uk" }],
  creator: "Sipan Danielyan",
  publisher: "Sipan Danielyan",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Sipan Danielyan (Սիփան Դանիելյան) | IT Support & Network Engineer Armenia",
    description:
      "Official portfolio and IT infrastructure hub of Sipan Danielyan: networks, servers, Proxmox, TrueNAS, CCTV, monitoring systems, and RoyalArm AI.",
    url: "https://www.royalarm.uk",
    siteName: "Sipan Danielyan — RoyalArm",
    locale: "en_US",
    alternateLocale: ["hy_AM", "ru_RU"],
    type: "profile",
    firstName: "Sipan",
    lastName: "Danielyan",
    username: "RoyalArm",
    images: [
      {
        url: "/assets/images/Sipan-Danielyan-2026.jpg",
        width: 1200,
        height: 1200,
        alt: "Sipan Danielyan — IT Technician and Network Engineer in Armenia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sipan Danielyan (Սիփան Դանիելյան) | IT & Network Engineer Armenia",
    description: "Official website of Sipan Danielyan: networks, servers, CCTV, monitoring, software, and RoyalArm AI.",
    images: ["/assets/images/Sipan-Danielyan-2026.jpg"],
  },
  alternates: {
    canonical: "https://www.royalarm.uk",
    languages: {
      "en-US": "https://www.royalarm.uk",
      "hy-AM": "https://www.royalarm.uk",
      "ru-RU": "https://www.royalarm.uk",
    },
  },
  icons: { icon: "/assets/LogoArm.png", apple: "/assets/royalarm-logo-180.png" },
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
        "@type": "ProfilePage",
        "@id": "https://www.royalarm.uk/#profilepage",
        url: "https://www.royalarm.uk",
        name: "Sipan Danielyan (Սիփան Դանիելյան) — Official Portfolio & IT Engineering Hub",
        isPartOf: { "@id": "https://www.royalarm.uk/#website" },
        about: { "@id": "https://www.royalarm.uk/#person" },
        mainEntity: { "@id": "https://www.royalarm.uk/#person" },
      },
      {
        "@type": "Person",
        "@id": "https://www.royalarm.uk/#person",
        name: "Sipan Danielyan",
        givenName: "Sipan",
        familyName: "Danielyan",
        url: "https://www.royalarm.uk",
        mainEntityOfPage: { "@id": "https://www.royalarm.uk/#profilepage" },
        image: "https://www.royalarm.uk/assets/images/Sipan-Danielyan-2026.jpg",
        alternateName: ["Սիփան Դանիելյան", "Сипан Даниелян", "RoyalArm"],
        description:
          "Sipan Danielyan is an IT Technician and Network Engineer in Armenia specializing in enterprise networks, Linux/Windows servers, Proxmox VE, TrueNAS, Nextcloud, Hikvision CCTV, and AI engineering.",
        jobTitle: ["IT Technician", "Network Engineer", "Systems Administrator"],
        worksFor: { "@type": "Organization", name: "Mota-Engil" },
        knowsLanguage: ["hy", "en", "ru"],
        sameAs: [
          "https://www.royalarm.uk",
          "https://ai.royalarm.uk",
          "https://it.royalarm.uk",
          "https://shop.royalarm.uk",
          "https://gen.royalarm.uk",
          "https://www.royalarm.uk/cv/en",
          "https://www.royalarm.uk/cv/hy",
        ],
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
          "Docker",
          "Linux server administration",
          "C# and .NET",
          "Web development",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.royalarm.uk/#service",
        name: "Sipan Danielyan IT Services",
        url: "https://www.royalarm.uk",
        image: "https://www.royalarm.uk/assets/images/Sipan-Danielyan-2026.jpg",
        telephone: "+37491733633",
        email: "royalarm001@gmail.com",
        priceRange: "$$",
        areaServed: { "@type": "Country", name: "Armenia" },
        founder: { "@id": "https://www.royalarm.uk/#person" },
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
      {
        "@type": "WebSite",
        "@id": "https://www.royalarm.uk/#website",
        url: "https://www.royalarm.uk",
        name: "Sipan Danielyan — RoyalArm",
        inLanguage: ["en", "hy", "ru"],
        publisher: { "@id": "https://www.royalarm.uk/#person" },
      },
    ],
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=location.pathname;var h=location.hostname.toLowerCase();var isAi=h.indexOf('ai.')===0||p.indexOf('/ai')===0;var saved=localStorage.getItem('portfolio-theme');var theme=isAi?'dark':(saved==='light'?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;if(isAi||p.indexOf('/admin')===0||p.indexOf('/cv')===0){document.documentElement.dataset.skipEntryLoader='1';}}catch(e){document.documentElement.dataset.theme='dark';}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/all.min.css" />
        <link rel="stylesheet" href="/css/aos.css" />
        <link rel="stylesheet" href="/css/styles.css?v=galaxy-themes-20260922" />
      </head>
      <body className="bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <SiteEntryLoader />
        <Script src="/js/script.js?v=portfolio-navigation-20260920" strategy="afterInteractive" />
        <Script src="/js/translate.js?v=portfolio-depth" strategy="afterInteractive" />
      </body>
    </html>
  );
}
