export default function sitemap() {
  const now = new Date();

  return [
    {
      url: "https://it.royalarm.uk",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      images: ["https://it.royalarm.uk/assets/royalarm-it-512.png"],
    },
    {
      url: "https://it.royalarm.uk/specialists",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
