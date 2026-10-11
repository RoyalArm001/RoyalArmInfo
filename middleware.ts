import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Support independent subdomain ai.royalarm.uk
  if (host.startsWith("ai.") || host === "ai.royalarm.uk") {
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/ai", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets|sw.js).*)",
  ],
};
