export default function sitemap() {
  const baseUrl = "https://www.royalarm.uk";
  const now = new Date();

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${baseUrl}/assets/images/Sipan-Danielyan-2026.jpg`,
        `${baseUrl}/assets/royalarm-logo-512.png`,
      ],
    },
    {
      url: `${baseUrl}/service-request`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cv/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${baseUrl}/cv/en`,
          hy: `${baseUrl}/cv/hy`,
        },
      },
    },
    {
      url: `${baseUrl}/cv/hy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
      alternates: {
        languages: {
          en: `${baseUrl}/cv/en`,
          hy: `${baseUrl}/cv/hy`,
        },
      },
    },
    {
      url: `${baseUrl}/ai`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai/models`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ai/templates`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/it`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  return staticRoutes;
}
