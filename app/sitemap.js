export default function sitemap() {
  const baseUrl = "https://www.royalarm.uk";

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
  ];

  return [...staticRoutes, ...["en", "hy"].map((lang) => ({ url: `${baseUrl}/cv/${lang}` }))];
}
