import { PRODUCTS } from "../../lib/shopData";

export const revalidate = 3600;

export default function sitemap() {
  const baseUrl = "https://shop.royalarm.uk";

  // Base routes for the shop subdomain
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Dynamic routes for all products
  const productRoutes = [...new Map(PRODUCTS.map((product) => [product.slug, product])).values()]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((product) => ({
    url: `${baseUrl}/${product.slug}`,
    lastModified: Number.isFinite(Date.parse(product.updatedAt || product.published))
      ? new Date(product.updatedAt || product.published)
      : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...productRoutes];
}
