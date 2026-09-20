import ShopClient from "./ShopClient";
import { PRODUCTS } from "../../lib/shopData";

export const metadata = {
  title: "RoyalArm Shop | Essential Software, Official Browsers, Office & Dev Tools",
  description:
    "Official verified software catalog curated by Sipan Danielyan & RoyalArm: Google Chrome, Firefox, LibreOffice, Microsoft 365, VS Code, Blender 3D, VLC Media Player, 7-Zip, and system utilities with 100% genuine vendor download links.",
  keywords: [
    "RoyalArm Shop",
    "Անվճար ծրագրեր համակարգչի համար",
    "Բեռնել բրաուզերներ",
    "Google Chrome ներբեռնել",
    "Mozilla Firefox download Armenia",
    "Brave Browser adblock",
    "LibreOffice հայերեն",
    "Microsoft 365 Office",
    "WPS Office",
    "Visual Studio Code",
    "Blender 3D ներբեռնել",
    "VLC Media Player",
    "7-Zip արխիվատոր",
    "Rufus bootable USB",
    "AnyDesk remote desktop",
    "Sipan Danielyan software",
    "RoyalArm store",
    "Ծրագրերի խանութ",
    "Скачать программы для Windows",
    "Бесплатные программы Ереван",
  ],
  alternates: {
    canonical: "https://shop.royalarm.uk",
  },
  openGraph: {
    title: "RoyalArm Shop | Verified Essential Software & Official Downloads",
    description:
      "Direct official vendor downloads, browsers, office suites, developer tools, and system utilities curated by Sipan Danielyan.",
    url: "https://shop.royalarm.uk",
    siteName: "Sipan Danielyan — IT Services & RoyalArm Shop",
    locale: "hy_AM",
    type: "website",
    images: [
      {
        url: "/assets/images/Sipan-Danielyan-2026.jpg",
        width: 1200,
        height: 630,
        alt: "RoyalArm Software Catalog & Official Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RoyalArm Shop | Essential Software & Official Downloads",
    description:
      "Browsers, office tools, developer kits, and utilities with 100% verified official vendor links.",
    images: ["/assets/images/Sipan-Danielyan-2026.jpg"],
  },
};

export default function ShopPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RoyalArm Verified Software & Tools Catalog",
    description:
      "Curated catalog of essential software applications, browsers, office productivity suites, and developer tools by Sipan Danielyan.",
    url: "https://shop.royalarm.uk",
    publisher: {
      "@type": "Person",
      name: "Sipan Danielyan",
      url: "https://royalarm.store",
      jobTitle: "IT Support & Network Engineer",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: PRODUCTS.length,
      itemListElement: PRODUCTS.slice(0, 15).map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: p.title,
          applicationCategory: p.primaryCategory,
          operatingSystem: p.os,
          softwareVersion: p.version,
          description: p.description,
          image: `https://shop.royalarm.uk${p.thumbnail}`,
          downloadUrl: p.downloads[0]?.url || p.officialSite,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Are all software download links on RoyalArm Shop official and safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100% of download links on RoyalArm Shop direct users to verified official vendor portals and verified developers (such as Google, Mozilla, Microsoft, The Document Foundation, Adobe, and Blender Foundation). Zero adware or repackaged installers.",
        },
      },
      {
        "@type": "Question",
        name: "Can Sipan Danielyan assist with software installation and computer configuration?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Sipan Danielyan provides professional remote and on-site IT support across Armenia, including Windows/macOS setups, office software deployment, network configuration, and hardware diagnostics.",
        },
      },
      {
        "@type": "Question",
        name: "Is there any fee to access or download software from RoyalArm Shop?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, RoyalArm Shop is a completely free curated software directory. All open-source and freeware tools can be downloaded without any charge or registration.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ShopClient />
    </>
  );
}
