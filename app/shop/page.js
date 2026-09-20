import ShopClient from "./ShopClient";
import { PRODUCTS } from "../../lib/shopData";

export const metadata = {
  title: "RoyalArm Shop | Software, IDEs, Developer Tools & OS Downloads",
  description:
    "Official software catalog from Sipan Danielyan & RoyalArm: Delphi RAD Studio, Adobe Suite 2024, Microsoft Office, macOS installers, activation tools, and system utilities.",
  keywords: [
    "RoyalArm Shop",
    "Delphi 12 Athens download",
    "Delphi 11 Alexandria",
    "Adobe 2024 repack",
    "Office 2021 download",
    "Hackintosh macOS Armenia",
    "Sipan Danielyan software",
    "RoyalArm store",
    "Ծրագրերի խանութ",
  ],
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    title: "RoyalArm Shop | Software & Developer Tools",
    description:
      "Direct downloads, ISOs, development environments, and utilities curated by Sipan Danielyan.",
    url: "/shop",
    siteName: "Sipan Danielyan — IT Services & Shop",
    locale: "hy_AM",
    type: "website",
    images: [
      {
        url: "/assets/images/Sipan-Danielyan-2026.jpg",
        width: 1200,
        height: 630,
        alt: "RoyalArm Software & Tools",
      },
    ],
  },
};

export default function ShopPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RoyalArm Software & Tools Catalog",
    description: "Software packages, developer tools, and operating system installers by Sipan Danielyan.",
    url: "https://royalarm.store/shop",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: PRODUCTS.slice(0, 10).map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: p.title,
          applicationCategory: p.primaryCategory,
          operatingSystem: "Windows, macOS",
          description: p.description,
          image: p.thumbnail,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ShopClient />
    </>
  );
}
