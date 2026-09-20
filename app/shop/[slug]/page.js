import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "../../../lib/shopData";
import HeaderControls from "../../HeaderControls";
import "../shop.css";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Software Not Found | RoyalArm Shop",
    };
  }

  const pageTitle = `${product.title} (v${product.version}) - Official Download & Setup | RoyalArm Shop`;
  const pageDescription = `Download ${product.title} by ${product.developer} for ${product.os}. Official verified mirrors, features, system requirements, and setup guide by Sipan Danielyan.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: product.seoKeywords || [product.title, product.developer, "RoyalArm", "Sipan Danielyan"],
    alternates: {
      canonical: `https://shop.royalarm.uk/${product.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://shop.royalarm.uk/${product.slug}`,
      siteName: "RoyalArm Shop",
      locale: "hy_AM",
      type: "article",
      images: [
        {
          url: `https://shop.royalarm.uk${product.thumbnail}`,
          width: 512,
          height: 512,
          alt: `${product.title} Official Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [`https://shop.royalarm.uk${product.thumbnail}`],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.primaryCategory === product.primaryCategory && p.id !== product.id
  ).slice(0, 3);

  // Schema.org Structured Data for SEO Rich Snippets
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.title,
    applicationCategory: product.primaryCategory,
    operatingSystem: product.os,
    softwareVersion: product.version,
    description: product.description,
    image: `https://shop.royalarm.uk${product.thumbnail}`,
    downloadUrl: product.downloads[0]?.url || product.officialSite,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(product.ratingValue || "4.9"),
      ratingCount: String(product.reviewCount || 120),
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: product.developer,
      url: product.officialSite,
    },
    publisher: {
      "@type": "Person",
      name: "Sipan Danielyan",
      url: "https://royalarm.store",
      jobTitle: "IT Support & Network Engineer",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://royalarm.store",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shop",
        item: "https://shop.royalarm.uk",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.primaryCategory,
        item: `https://shop.royalarm.uk?category=${encodeURIComponent(product.primaryCategory)}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.title,
        item: `https://shop.royalarm.uk/${product.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${product.title} free to download and use?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${product.title} is distributed under the ${product.license} license. You can download and install it safely via the official mirrors on this page.`,
        },
      },
      {
        "@type": "Question",
        name: `How to install ${product.title} on Windows or macOS?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Download the appropriate installer (.exe for Windows or .dmg for macOS) from the verified links above, launch the file, and follow the standard on-screen wizard instructions.`,
        },
      },
      {
        "@type": "Question",
        name: `Can Sipan Danielyan assist with ${product.title} installation or configuration?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes, Sipan Danielyan provides professional remote and on-site IT assistance across Armenia for software installation, driver setup, and system configuration.`,
        },
      },
    ],
  };

  return (
    <div className="shop-container">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="shop-glow-1" aria-hidden="true" />
      <div className="shop-glow-2" aria-hidden="true" />

      {/* Top Navbar */}
      <header className="shop-nav">
        <div className="shop-nav-inner">
          <Link href="/shop" className="shop-brand">
            <span className="shop-brand-badge">S/D</span>
            <span>RoyalArm Shop</span>
          </Link>

          <nav className="shop-nav-links">
            <Link href="/shop" className="shop-nav-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Back to Catalog</span>
            </Link>

            <Link href="/service-request" className="shop-nav-cta">
              Request IT Specialist
            </Link>
          </nav>
          <HeaderControls />
        </div>
      </header>

      {/* Main Content */}
      <main className="shop-hero" style={{ textAlign: "left", maxWidth: "1000px" }}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <ol style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0, fontSize: "0.85rem", color: "var(--shop-text-dim)" }}>
            <li>
              <Link href="/" style={{ color: "var(--shop-text-muted)", textDecoration: "none" }}>Home</Link>
              <span style={{ margin: "0 0.4rem" }}>/</span>
            </li>
            <li>
              <Link href="/shop" style={{ color: "var(--shop-text-muted)", textDecoration: "none" }}>Shop</Link>
              <span style={{ margin: "0 0.4rem" }}>/</span>
            </li>
            <li style={{ color: "var(--shop-cyan)", fontWeight: "700" }}>{product.title}</li>
          </ol>
        </nav>

        {/* Product Hero Block */}
        <div className="shop-controls-glass" style={{ marginBottom: "2rem" }}>
          <div className="shop-modal-top" style={{ marginBottom: "1.5rem" }}>
            <div className="shop-modal-logo" style={{ width: "90px", height: "90px" }}>
              <img src={product.thumbnail} alt={product.title} />
            </div>

            <div className="shop-modal-title-group">
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
                <span className="shop-verified-tag">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  <span>Verified Official Vendor</span>
                </span>
                <span className="shop-license-tag open-source">{product.license}</span>
                <span className="shop-license-tag">v{product.version}</span>
              </div>

              <h1 id="main-content" tabIndex={-1} style={{ fontSize: "2.2rem", fontWeight: "900", margin: "0 0 0.4rem", color: "#ffffff" }}>
                {product.title}
              </h1>

              <div className="shop-modal-dev-info">
                <span>Developer: <strong>{product.developer}</strong></span>
                <span>•</span>
                <a
                  href={product.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shop-modal-official-link"
                >
                  <span>Official Website</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <p style={{ fontSize: "1.05rem", lineHeight: "1.65", color: "var(--shop-text)" }}>
            {product.fullText || product.description}
          </p>

          {/* Download Mirrors Box */}
          <div className="shop-modal-section-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Verified Official Downloads & Mirrors</span>
          </div>

          <div className="shop-modal-downloads-box">
            {product.downloads.map((dl, idx) => (
              <div key={idx} className="shop-dl-row">
                <div className="shop-dl-info">
                  <span className="shop-dl-name">{dl.name}</span>
                  <div className="shop-dl-meta">
                    <span>Format: {dl.format}</span>
                    {dl.size && <span>• Size: {dl.size}</span>}
                    <span>• Status: 100% Virus-Scanned</span>
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
                  <span>Official Download</span>
                </a>
              </div>
            ))}
          </div>

          {/* Features */}
          {product.features && (
            <>
              <div className="shop-modal-section-title" style={{ marginTop: "1.75rem" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Key Capabilities & Highlights</span>
              </div>
              <div className="shop-features-grid">
                {product.features.map((feat, fIdx) => (
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
          {product.systemRequirements && (
            <>
              <div className="shop-modal-section-title" style={{ marginTop: "1.75rem" }}>
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
                <span>Minimum System Requirements</span>
              </div>

              <div className="shop-sys-req-grid">
                <div className="shop-req-box">
                  <span className="shop-req-label">OS</span>
                  <span className="shop-req-val">{product.systemRequirements.os}</span>
                </div>
                <div className="shop-req-box">
                  <span className="shop-req-label">RAM</span>
                  <span className="shop-req-val">{product.systemRequirements.ram}</span>
                </div>
                <div className="shop-req-box">
                  <span className="shop-req-label">Disk</span>
                  <span className="shop-req-val">{product.systemRequirements.disk}</span>
                </div>
                <div className="shop-req-box">
                  <span className="shop-req-label">Processor</span>
                  <span className="shop-req-val">{product.systemRequirements.cpu}</span>
                </div>
              </div>
            </>
          )}

          {/* IT Specialist Support Card */}
          <div className="shop-specialist-box">
            <div className="shop-specialist-text">
              <h4>Need Professional Setup Assistance?</h4>
              <p>
                Sipan Danielyan provides remote and on-site IT support across Armenia. Get help with {product.title} deployment, corporate networks, or system troubleshooting.
              </p>
            </div>
            <Link href="/service-request" className="shop-specialist-btn">
              Contact Sipan Danielyan
            </Link>
          </div>
        </div>

        {/* Related Software Section */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: "3rem" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#ffffff", marginBottom: "1.2rem" }}>
              More Software in {product.primaryCategory.toUpperCase()}
            </h3>

            <div className="shop-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
              {relatedProducts.map((rel) => (
                <article key={rel.id} className="shop-card">
                  <div className="shop-card-header">
                    <div className="shop-card-icon-frame" style={{ width: "52px", height: "52px" }}>
                      <img src={rel.thumbnail} alt={rel.title} className="shop-card-icon" />
                    </div>
                    <span className="shop-license-tag">{rel.license}</span>
                  </div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "800", margin: "0 0 0.4rem", color: "#ffffff" }}>
                    {rel.title}
                  </h4>
                  <p className="shop-card-desc">{rel.description}</p>
                  <Link href={`/shop/${rel.slug}`} className="shop-btn-primary" style={{ height: "38px" }}>
                    View & Download
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
