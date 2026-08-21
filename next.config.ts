import type { NextConfig } from "next";

import consolidation from "./config/cohort-consolidation.json";

// The 2026-08-12 cohort MERGE decisions, executed. Each merged URL 301s to the
// cluster winner that outperformed it. See lib/consolidation.ts.
// merges is empty while the guide merges are deferred, so the JSON import
// widens to never[]; the annotation keeps it a real shape.
const mergeDecisions = consolidation.merges as { from: string; to: string }[];
const mergeRedirects = mergeDecisions.map((entry) => ({
  source: entry.from,
  destination: entry.to,
  permanent: true,
}));

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      {
        source: "/es/servicios/produccion-video-bienes-raices-coral-gables",
        destination: "/es/video-inmobiliario-coral-gables",
        permanent: true,
      },
      {
        source: "/es/servicios/produccion-video-firmas-abogados-miami",
        destination: "/es/produccion-de-video-para-firmas-de-abogados-miami",
        permanent: true,
      },
      ...mergeRedirects,
    ];
  },
};

export default nextConfig;
