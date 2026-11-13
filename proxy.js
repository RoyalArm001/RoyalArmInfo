import { NextResponse } from "next/server";

const itHostname = "it.royalarm.uk";
const shopHostname = "shop.royalarm.uk";
const aiHostname = "ai.royalarm.uk";
const portfolioHostnames = new Set([
  "royalarm.uk",
  "www.royalarm.uk",
  "royalarm.store",
  "www.royalarm.store",
]);

function getHostname(request) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0];
  const host = forwardedHost || request.headers.get("host") || "";
  return host.trim().toLowerCase().split(":")[0];
}

function createSubdomainRobotsResponse(hostname) {
  const crawlers = [
    "*",
    "Googlebot",
    "Googlebot-Image",
    "Googlebot-Mobile",
    "AdsBot-Google",
    "Bingbot",
    "Yandex",
    "YandexBot",
    "YandexImages",
    "DuckDuckBot",
    "Applebot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "PerplexityBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Google-Extended",
    "TelegramBot",
    "WhatsApp",
    "facebookexternalhit",
    "Twitterbot",
    "LinkedInBot",
  ];

  const agentLines = crawlers.map((agent) => `User-agent: ${agent}`).join("\n");

  return new Response(
    `${agentLines}
Allow: /
Allow: /_next/static/
Allow: /_next/image/
Allow: /assets/
Disallow: /api/
Disallow: /admin
Disallow: /admin/

Host: https://${hostname}
Sitemap: https://${hostname}/sitemap.xml
`,
    {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=3600, s-maxage=3600",
      },
    }
  );
}

export function proxy(request) {
  const hostname = getHostname(request);
  const pathname = request.nextUrl.pathname;

  // 1. Redirect /it, /shop, and /ai from main portfolio hostnames to their respective subdomains
  if (portfolioHostnames.has(hostname)) {
    if (pathname === "/it" || pathname.startsWith("/it/")) {
      const publicPath = pathname.replace(/^\/it/, "") || "/";
      return NextResponse.redirect(`https://${itHostname}${publicPath}`, 308);
    }
    if (pathname === "/shop" || pathname.startsWith("/shop/")) {
      const publicPath = pathname.replace(/^\/shop/, "") || "/";
      return NextResponse.redirect(`https://${shopHostname}${publicPath}`, 308);
    }
    if (pathname === "/ai" || pathname.startsWith("/ai/")) {
      const publicPath = pathname.replace(/^\/ai/, "") || "/";
      return NextResponse.redirect(`https://${aiHostname}${publicPath}`, 308);
    }
  }

  // 2. Handle it.royalarm.uk subdomain
  if (hostname === itHostname) {
    if (pathname === "/it" || pathname.startsWith("/it/")) {
      const publicPath = pathname.replace(/^\/it/, "") || "/";
      return NextResponse.redirect(`https://${itHostname}${publicPath}`, 308);
    }

    if (pathname === "/robots.txt") {
      return createSubdomainRobotsResponse(itHostname);
    }

    const destination = request.nextUrl.clone();
    if (pathname === "/") destination.pathname = "/it";
    if (pathname === "/specialists") destination.pathname = "/it/specialists";
    if (pathname === "/request") return NextResponse.redirect(`https://${itHostname}/#request`, 308);
    if (pathname === "/sitemap.xml") destination.pathname = "/it/sitemap.xml";

    return NextResponse.rewrite(destination);
  }

  // 3. Handle shop.royalarm.uk subdomain
  if (hostname === shopHostname) {
    if (pathname === "/shop" || pathname.startsWith("/shop/")) {
      const publicPath = pathname.replace(/^\/shop/, "") || "/";
      return NextResponse.redirect(`https://${shopHostname}${publicPath}`, 308);
    }

    if (pathname === "/robots.txt") {
      return createSubdomainRobotsResponse(shopHostname);
    }

    const destination = request.nextUrl.clone();
    if (pathname === "/") {
      destination.pathname = "/shop";
    } else if (pathname === "/sitemap.xml") {
      destination.pathname = "/shop/sitemap.xml";
    } else if (!pathname.startsWith("/shop")) {
      // e.g. /some-product → /shop/some-product
      destination.pathname = `/shop${pathname}`;
    }

    return NextResponse.rewrite(destination);
  }

  // 4. Handle ai.royalarm.uk subdomain
  if (hostname === aiHostname || hostname.startsWith("ai.")) {
    if (pathname === "/robots.txt") {
      return new Response(
        `User-agent: *\nAllow: /\n\nSitemap: https://${aiHostname}/sitemap.xml\n`,
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }

    const destination = request.nextUrl.clone();
    if (pathname === "/") {
      destination.pathname = "/ai";
    } else if (!pathname.startsWith("/ai") && !pathname.startsWith("/api") && !pathname.startsWith("/_next")) {
      destination.pathname = `/ai${pathname}`;
    }

    return NextResponse.rewrite(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/it",
    "/it/:path*",
    "/shop",
    "/shop/:path*",
    "/ai",
    "/ai/:path*",
    "/specialists",
    "/request",
    "/robots.txt",
    "/sitemap.xml",
    // Rewrite page routes, while keeping shared assets and APIs on their original paths.
    "/((?!(?:_next|api|assets|css|js|i18n|cv|devicon)(?:/|$)|favicon\\.ico$|sw\\.js$|manifest\\.webmanifest$).*)",
  ],
};
