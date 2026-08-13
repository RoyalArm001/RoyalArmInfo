import { NextResponse } from "next/server";

const appHostname = "it.royalarm.uk";
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

  if (portfolioHostnames.has(hostname) && (pathname === "/it" || pathname.startsWith("/it/"))) {
    const publicPath = pathname.replace(/^\/it/, "") || "/";
    return NextResponse.redirect(`https://it.royalarm.uk${publicPath}`, 308);
  }

  if (hostname !== appHostname) return NextResponse.next();

  if (pathname === "/it" || pathname.startsWith("/it/")) {
    const publicPath = pathname.replace(/^\/it/, "") || "/";
    return NextResponse.redirect(`https://it.royalarm.uk${publicPath}`, 308);
  }

  if (pathname === "/robots.txt") {
    return new Response(
      "User-agent: *\nAllow: /\nSitemap: https://it.royalarm.uk/sitemap.xml\n",
      { headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  const destination = request.nextUrl.clone();
  if (pathname === "/") destination.pathname = "/it";
  if (pathname === "/specialists") destination.pathname = "/it/specialists";
  if (pathname === "/request") return NextResponse.redirect("https://it.royalarm.uk/#request", 308);
  if (pathname === "/sitemap.xml") destination.pathname = "/it/sitemap.xml";

  return NextResponse.rewrite(destination);
}

export const config = {
  matcher: ["/", "/it/:path*", "/specialists", "/request", "/robots.txt", "/sitemap.xml"],
};
