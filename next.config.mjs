/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/pages/portfolio-1.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/app",
        destination: "/it",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
