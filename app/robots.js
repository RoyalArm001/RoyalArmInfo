const PUBLIC_ALLOW = [
  "/",
  "/assets/",
  "/cv/",
  "/service-request",
  "/ai",
  "/ai/",
  "/it",
  "/it/",
  "/shop",
  "/shop/",
  "/shopblog",
  "/_next/static/",
  "/_next/image/",
];

const PRIVATE_DISALLOW = ["/api/", "/admin", "/admin/"];

const SEARCH_CRAWLERS = [
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-Mobile",
  "AdsBot-Google",
  "Mediapartners-Google",
  "Bingbot",
  "msnbot",
  "Yandex",
  "YandexBot",
  "YandexImages",
  "DuckDuckBot",
  "Applebot",
  "Slurp",
  "Baiduspider",
  "NaverBot",
  "SeznamBot",
];

const AI_SEARCH_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Google-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
];

const SOCIAL_CRAWLERS = [
  "facebookexternalhit",
  "Twitterbot",
  "LinkedInBot",
  "TelegramBot",
  "WhatsApp",
  "Discordbot",
  "Slackbot",
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: PUBLIC_ALLOW,
        disallow: PRIVATE_DISALLOW,
      },
      {
        userAgent: SEARCH_CRAWLERS,
        allow: PUBLIC_ALLOW,
        disallow: PRIVATE_DISALLOW,
      },
      {
        userAgent: AI_SEARCH_CRAWLERS,
        allow: ["/", "/cv/", "/service-request", "/ai", "/ai/", "/it", "/shop", "/assets/"],
        disallow: PRIVATE_DISALLOW,
      },
      {
        userAgent: SOCIAL_CRAWLERS,
        allow: "/",
      },
    ],
    host: "https://www.royalarm.uk",
    sitemap: [
      "https://www.royalarm.uk/sitemap.xml",
      "https://it.royalarm.uk/sitemap.xml",
      "https://shop.royalarm.uk/sitemap.xml",
    ],
  };
}
