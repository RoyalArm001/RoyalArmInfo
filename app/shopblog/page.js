import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Generate this page at build time (static generation)
export const dynamic = 'force-static';

export default async function BlogShopPage() {
  const feedUrl = 'https://royalarm010.blogspot.com/feeds/posts/default?alt=json&max-results=10';
  const res = await fetch(feedUrl);
  if (!res.ok) {
    return (
      <div className="shop-blog-page" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Shop Blog</h1>
        <p>Unable to load content. Please try again later.</p>
      </div>
    );
  }
  const json = await res.json();
  const entries = json.feed.entry || [];

  return (
    <section className="shop-blog-page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>Shop Blog</h1>
      <div className="posts" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        {entries.map((post) => {
          const title = post.title?.$t ?? 'Untitled';
          const link = post.link?.find((l) => l.rel === 'alternate')?.href ?? '#';
          const content = post.content?.$t ?? '';
          const preview = content.replace(/<[^>]*>/g, '').slice(0, 150) + '...';
          const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
          const imgSrc = imgMatch ? imgMatch[1] : null;
          return (
            <article key={link} style={{ border: '1px solid var(--contentL)', borderRadius: '12px', overflow: 'hidden', background: 'var(--contentB)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              {imgSrc && (
                <Image src={imgSrc} alt={title} width={400} height={250} style={{ objectFit: 'cover', width: '100%', height: '200px' }} />
              )}
              <div style={{ padding: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h2>
                <p style={{ marginBottom: '1rem', color: 'var(--bodyCa)' }}>{preview}</p>
                <Link href={link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--linkC)', textDecoration: 'underline' }}>Read more →</Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
