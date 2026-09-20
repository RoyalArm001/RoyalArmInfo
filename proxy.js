import { NextResponse } from "next/server";

const itHostname = "it.royalarm.uk";
const shopHostname = "shop.royalarm.uk";
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

export function proxy(request) {
  const hostname = getHostname(request);
  const pathname = request.nextUrl.pathname;

  // 1. Redirect /it and /shop from main portfolio hostnames to their respective subdomains
  if (portfolioHostnames.has(hostname)) {
    if (pathname === "/it" || pathname.startsWith("/it/")) {
      const publicPath = pathname.replace(/^\/it/, "") || "/";
      return NextResponse.redirect(`https://${itHostname}${publicPath}`, 308);
    }
    if (pathname === "/shop" || pathname.startsWith("/shop/")) {
      const publicPath = pathname.replace(/^\/shop/, "") || "/";
      return NextResponse.redirect(`https://${shopHostname}${publicPath}`, 308);
    }
  }

  // 2. Handle it.royalarm.uk subdomain
  if (hostname === itHostname) {
    if (pathname === "/it" || pathname.startsWith("/it/")) {
      const publicPath = pathname.replace(/^\/it/, "") || "/";
      return NextResponse.redirect(`https://${itHostname}${publicPath}`, 308);
    }

    if (pathname === "/robots.txt") {
      return new Response(
        `User-agent: *\nAllow: /\nSitemap: https://${itHostname}/sitemap.xml\n`,
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      );
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
      return new Response(
        `User-agent: *\nAllow: /\nSitemap: https://${shopHostname}/sitemap.xml\n`,
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }

    const destination = request.nextUrl.clone();
    if (pathname === "/") destination.pathname = "/shop";

    return NextResponse.rewrite(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/it/:path*", "/shop/:path*", "/shop", "/specialists", "/request", "/robots.txt", "/sitemap.xml"],
};

