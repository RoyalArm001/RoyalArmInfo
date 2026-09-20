import { PRODUCTS } from "../../lib/shopData";

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
  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/${product.slug}`,
    lastModified: product.published ? new Date(product.published) : new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    images: product.thumbnail ? [`${baseUrl}${product.thumbnail}`] : undefined,
  }));

  return [...routes, ...productRoutes];
}
