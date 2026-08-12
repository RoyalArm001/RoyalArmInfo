import { NextResponse } from "next/server";

const appHostname = "it.royalarm.uk";

function getHostname(request) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0];
  const host = forwardedHost || request.headers.get("host") || "";
  return host.trim().toLowerCase().split(":")[0];
}

export function proxy(request) {
  if (getHostname(request) !== appHostname) return NextResponse.next();

  if (request.nextUrl.pathname === "/robots.txt") {
    return new Response(
      "User-agent: *\nAllow: /\nSitemap: https://it.royalarm.uk/sitemap.xml\n",
      { headers: { "content-type": "text/plain; charset=utf-8" } }
    );
  }

  const destination = request.nextUrl.clone();
  if (destination.pathname === "/") destination.pathname = "/it";
  if (destination.pathname === "/sitemap.xml") destination.pathname = "/it/sitemap.xml";

  return NextResponse.rewrite(destination);
}

export const config = {
  matcher: ["/", "/robots.txt", "/sitemap.xml"],
};
