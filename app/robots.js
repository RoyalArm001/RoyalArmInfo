export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Yandex", "DuckDuckBot"],
        allow: "/",
      },
    ],
    sitemap: "https://www.royalarm.uk/sitemap.xml",
  };
}
