import Script from "next/script";
import "./globals.css";

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
    images: ["/assets/images/Sipan-Danielyan-2026.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sipan Danielyan | IT Services Armenia",
    description: "Networks, servers, CCTV, monitoring, software, and remote IT support across Armenia.",
    images: ["/assets/images/Sipan-Danielyan-2026.jpg"],
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
        image: "https://royalarm.store/assets/images/Sipan-Danielyan-2026.jpg",
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
          "Docker",
          "Linux server administration",
          "C# and .NET",
          "Web development",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://royalarm.store/#service",
        name: "Sipan Danielyan IT Services",
        url: "https://royalarm.store",
        image: "https://royalarm.store/assets/images/Sipan-Danielyan-2026.jpg",
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
            __html: `(function(){try{var saved=localStorage.getItem('portfolio-theme');var theme=saved||'dark';document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.dataset.theme='dark';}})();`,
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
        <link rel="stylesheet" href="/css/styles.css?v=cv-downloads-20260920" />
      </head>
      <body className="bg-bg text-text">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <Script src="/js/script.js?v=portfolio-navigation-20260920" strategy="afterInteractive" />
        <Script src="/js/translate.js?v=header-controls-20260920" strategy="afterInteractive" />
      </body>
    </html>
  );
}
