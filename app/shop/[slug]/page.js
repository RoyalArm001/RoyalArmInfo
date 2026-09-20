import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "../../../lib/shopData";
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

  const pageTitle = `${product.title} - Download & Setup | RoyalArm Shop`;
  const pageDescription = `${product.title} download for ${product.os}. Direct ISO, keygen, and installer sources verified by Sipan Danielyan. Free download, instructions, and video guide.`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: product.seoKeywords || [product.title, "RoyalArm", "Sipan Danielyan"],
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
          url: product.thumbnail,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [product.thumbnail],
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
    description: product.description,
    image: product.thumbnail,
    downloadUrl: product.downloads[0]?.url,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: String(product.reviewCount || 42),
      bestRating: "5",
      worstRating: "1",
    },
    author: {
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
        name: `How can I download and install ${product.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `You can download ${product.title} using the verified direct download mirrors listed on this page (ISO, Archive, or Keypatch). Installation notes and prerequisites are provided in the overview section.`,
        },
      },
      {
        "@type": "Question",
        name: "Can Sipan Danielyan help me configure or install this software?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Sipan Danielyan offers professional remote IT support, software setup, and system configuration services across Armenia. Submit a service request to schedule assistance.",
        },
      },
    ],
  };

  return (
    <div className="shop-container">
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
          <Link href="/shop" className="shop-brand" aria-label="RoyalArm Shop">
            <span className="shop-brand-badge">S / D</span>
            <span>RoyalArm Shop</span>
          </Link>

          <nav className="shop-nav-links">
            <Link href="/shop" className="shop-nav-link">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Catalog</span>
            </Link>

            <Link href="/" className="shop-nav-link">
              <span>Portfolio</span>
            </Link>

            <Link href="/service-request" className="shop-nav-cta">
              Request Service
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content Article */}
      <main className="shop-header" style={{ maxWidth: "1080px", paddingTop: "2rem" }}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
          <ol
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: 0,
              margin: 0,
              listStyle: "none",
              fontSize: "0.85rem",
              color: "var(--shop-muted)",
              flexWrap: "wrap",
            }}
          >
            <li>
              <Link href="/" style={{ color: "var(--shop-muted)", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/shop" style={{ color: "var(--shop-muted)", textDecoration: "none" }}>
                Shop
              </Link>
            </li>
            <li>/</li>
            <li>
              <span style={{ color: "var(--shop-cyan)" }}>{product.primaryCategory}</span>
            </li>
            <li>/</li>
            <li aria-current="page" style={{ color: "var(--shop-text)", fontWeight: 600 }}>
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Product Title Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.8rem" }}>
            <span className="shop-card-category-tag" style={{ position: "static" }}>
              {product.primaryCategory}
            </span>
            <span
              style={{
                padding: "0.25rem 0.65rem",
                borderRadius: "4px",
                background: "rgba(56, 251, 167, 0.1)",
                border: "1px solid rgba(56, 251, 167, 0.3)",
                color: "#38fba7",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              ★ 4.9 Rating ({product.reviewCount} reviews)
            </span>
            <span
              style={{
                padding: "0.25rem 0.65rem",
                borderRadius: "4px",
                background: "rgba(28, 43, 56, 0.8)",
                border: "1px solid var(--shop-border)",
                color: "var(--shop-muted)",
                fontSize: "11px",
              }}
            >
              OS: {product.os}
            </span>
          </div>

          <h1 className="shop-title" style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", marginBottom: "0.75rem" }}>
            {product.title}
          </h1>
          <p style={{ color: "var(--shop-muted)", fontSize: "1rem", lineHeight: 1.6, maxWidth: "800px" }}>
            {product.description}
          </p>
        </div>

        {/* Media Section: YouTube Tutorial or Screenshot Gallery */}
        <div className="shop-modal-media" style={{ marginBottom: "2.5rem" }}>
          {product.youtubeId ? (
            <div className="shop-video-container">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${product.youtubeId}`}
                title={`${product.title} Video Guide`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="shop-modal-img"
              style={{ maxHeight: "480px" }}
            />
          ) : null}
        </div>

        {/* Direct Downloads Section */}
        <section className="shop-modal-downloads" style={{ marginBottom: "2.5rem" }}>
          <h2 className="shop-section-subtitle" style={{ fontSize: "1.3rem" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Verified Direct Download Mirrors ({product.downloads.length})</span>
          </h2>

          <div className="shop-download-list">
            {product.downloads.map((dl, idx) => (
              <div key={idx} className="shop-download-item">
                <div className="shop-download-info">
                  <span className="shop-download-name" style={{ fontSize: "1.02rem" }}>
                    {dl.name}
                  </span>
                  <div className="shop-download-details">
                    {dl.format && (
                      <span className={`shop-format-badge ${dl.format.toLowerCase()}`}>{dl.format}</span>
                    )}
                    {dl.size && <span>• {dl.size}</span>}
                    <span style={{ color: "#38fba7" }}>• Verified Source</span>
                  </div>
                </div>

                <a
                  href={dl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shop-dl-btn"
                  style={{ padding: "0.75rem 1.4rem", fontSize: "0.9rem" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download Now</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Overview and Instructions */}
        {product.fullText && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 className="shop-section-subtitle" style={{ fontSize: "1.3rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>Installation Guide &amp; Technical Notes</span>
            </h2>
            <div
              className="shop-modal-desc"
              style={{
                maxHeight: "none",
                fontSize: "0.92rem",
                padding: "1.75rem",
                lineHeight: 1.8,
              }}
            >
              {product.fullText}
            </div>
          </section>
        )}

        {/* IT Support / Installation Assistance CTA */}
        <section className="shop-service-cta" style={{ padding: "1.75rem", marginBottom: "3rem" }}>
          <div className="shop-service-cta-text">
            <h3 style={{ margin: "0 0 0.35rem", fontSize: "1.1rem", color: "#fff" }}>
              Need Help With Installation or Configuration?
            </h3>
            <p style={{ fontSize: "0.9rem" }}>
              Sipan Danielyan provides remote setup, activation support, network integration, and system optimization across Armenia.
            </p>
          </div>
          <Link
            href="/service-request"
            className="shop-service-cta-btn"
            style={{ padding: "0.8rem 1.4rem", fontSize: "0.9rem" }}
          >
            <span>Request Specialist Help</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

        {/* Related Software Packages */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="shop-section-subtitle" style={{ fontSize: "1.2rem", marginBottom: "1.25rem" }}>
              <span>More in {product.primaryCategory}</span>
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/shop/${rel.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article className="shop-card" style={{ height: "100%" }}>
                    <div className="shop-card-thumb-wrap">
                      <img src={rel.thumbnail} alt={rel.title} className="shop-card-thumb" loading="lazy" />
                      <span className="shop-card-category-tag">{rel.primaryCategory}</span>
                    </div>
                    <div className="shop-card-body">
                      <h3 className="shop-card-title" style={{ fontSize: "0.98rem" }}>
                        {rel.title}
                      </h3>
                      <p className="shop-card-desc" style={{ fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                        {rel.description}
                      </p>
                      <span
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--shop-cyan)",
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        View Details &rarr;
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
