import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder hero assets live in /public/placeholders/*.svg until Esteban
    // delivers real reels/frames. Next.js refuses to optimize SVGs unless this
    // is explicit; the CSP below keeps script execution disabled so a
    // malicious SVG can't run JS in the optimizer's response.
    //
    // NOTE: this flag is global. If/when we add `remotePatterns` (Cloudinary,
    // Mux, etc.), revisit — we likely want to drop SVG once real assets land
    // and serve only raster formats from trusted origins.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
