import { PRODUCTS } from "../lib/shopData";

export default function sitemap() {
  const baseUrl = "https://royalarm.store";
  const shopBaseUrl = "https://shop.royalarm.uk";

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/service-request`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${shopBaseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
  ];

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${shopBaseUrl}/${product.slug}`,
    lastModified: new Date(product.published || Date.now()),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes];
}
