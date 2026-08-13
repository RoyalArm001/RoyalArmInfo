/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["web-push"],
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self'" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/pages/portfolio-1.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/app",
        destination: "https://it.royalarm.uk/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
