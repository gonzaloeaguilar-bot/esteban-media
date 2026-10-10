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

// Legacy bare slugs that never existed as routes but get requested in the wild:
// Spanish-first visitors (and AI assistants / old shares) type the un-prefixed
// Spanish slug, and the winner page is often linked without its /services/
// segment. Each of these 404'd while its canonical twin served 200, so we 301
// them to the real page. Both slash and non-slash forms are listed so a
// trailing-slash request lands in one hop instead of a 308 -> 301 chain.
const legacyRedirects = [
  { source: "/precios", destination: "/es/precios", permanent: true },
  { source: "/precios/", destination: "/es/precios", permanent: true },
  { source: "/contacto", destination: "/es/contacto", permanent: true },
  { source: "/contacto/", destination: "/es/contacto", permanent: true },
  { source: "/servicios", destination: "/es/servicios", permanent: true },
  { source: "/servicios/", destination: "/es/servicios", permanent: true },
  { source: "/portafolio", destination: "/es/portafolio", permanent: true },
  { source: "/portafolio/", destination: "/es/portafolio", permanent: true },
  { source: "/guias", destination: "/es/guias", permanent: true },
  { source: "/guias/", destination: "/es/guias", permanent: true },
  { source: "/calculadora", destination: "/es/calculadora", permanent: true },
  { source: "/calculadora/", destination: "/es/calculadora", permanent: true },
  { source: "/evaluacion", destination: "/es/evaluacion", permanent: true },
  { source: "/evaluacion/", destination: "/es/evaluacion", permanent: true },
  { source: "/sobre-esteban", destination: "/es/sobre-esteban", permanent: true },
  { source: "/sobre-esteban/", destination: "/es/sobre-esteban", permanent: true },
  { source: "/videografo-en-miami", destination: "/es/videografo-en-miami", permanent: true },
  { source: "/videografo-en-miami/", destination: "/es/videografo-en-miami", permanent: true },
  {
    source: "/white-label-video-editing-for-agencies",
    destination: "/services/white-label-video-editing-for-agencies",
    permanent: true,
  },
  {
    source: "/white-label-video-editing-for-agencies/",
    destination: "/services/white-label-video-editing-for-agencies",
    permanent: true,
  },
];

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      {
        source: "/portfolio/gonzalo-tech-chatbots",
        destination: "/portfolio/ai-lead-automation",
        permanent: true,
      },
      {
        source: "/es/portafolio/gonzalo-tech-chatbots",
        destination: "/es/portafolio/ai-lead-automation",
        permanent: true,
      },
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
      ...legacyRedirects,
    ];
  },
};

export default nextConfig;
