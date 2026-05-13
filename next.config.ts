import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Domain TBD — metadataBase is set per-route via app/layout.tsx until the
  // production domain is purchased. Vercel preview URLs are used in the meantime.
  typedRoutes: true,
};

export default nextConfig;
