import { packageRoutes } from "@/lib/package-routes";

const pairedLanguageRoutes: Record<string, string> = {
  ...Object.fromEntries(Object.values(packageRoutes).map((route) => [route.en, route.es])),
  "/": "/es",
  "/services": "/es/servicios",
  "/pricing": "/es/precios",
  "/services/conversion-websites": "/es/sitios-web-de-conversion",
  "/services/ai-lead-capture-automation": "/es/captura-y-automatizacion-de-clientes-con-ia",
  "/services/local-presence-seo": "/es/presencia-local-seo",
  "/services/growth-funnel-audit": "/es/auditoria-de-funnel-y-datos",
  "/services/custom-operations-automation": "/es/automatizacion-de-operaciones",
  "/services/creative-production": "/es/produccion-creativa",
  "/services/website-design-fort-lauderdale": "/es/diseno-web-fort-lauderdale",
  "/services/restaurant-promo-video-editing-miami":
    "/es/edicion-de-video-promocional-para-restaurantes-miami",
  "/portfolio": "/es/portafolio",
  "/areas": "/es/areas",
  "/areas/palm-beach-county": "/es/areas/palm-beach-county",
  "/about": "/es/sobre-esteban",
  "/contact": "/es/contacto",
  "/privacy": "/es/privacidad",
  "/guides": "/es/guias",
  "/guides/prepare-footage-for-video-editing":
    "/es/guias/preparar-material-para-edicion-de-video",
  "/guides/write-a-useful-video-brief":
    "/es/guias/como-escribir-un-brief-util-de-video",
  "/guides/vertical-horizontal-video-exports-and-safe-zones":
    "/es/guias/video-vertical-horizontal-y-zonas-seguras",
  "/guides/remote-video-editing-handoff":
    "/es/guias/entrega-para-edicion-remota-de-video",
  "/services/short-form-video-editor-miami":
    "/es/reels-para-negocios-miami",
  "/daily-publish-prompt": "/es/prompt-de-publicacion-diaria",
  "/daily-hook-planner": "/es/planificador-de-ganchos-de-video",
  "/daily-shot-list-planner": "/es/planificador-de-tomas-de-video",
  "/daily-script-pacing-calculator": "/es/calculadora-de-ritmo-de-video",
  "/daily-script-timer": "/es/temporizador-de-guiones-de-video",
  // 2026-10-06 niche batch.
  "/services/medical-practice-video-marketing-miami":
    "/es/marketing-de-video-para-consultorios-medicos-miami",
  "/services/content-creator-video-editing-miami":
    "/es/edicion-de-video-para-creadores-de-contenido-miami",
  "/services/white-label-video-editing-for-agencies":
    "/es/edicion-de-video-marca-blanca-para-agencias",
  "/services/salon-barbershop-video-marketing-miami":
    "/es/marketing-de-video-para-salones-y-barberias-miami",
  "/services/auto-detailing-tint-wrap-video-marketing-miami":
    "/es/marketing-de-video-para-detallado-y-wraps-miami",
};

for (const [englishPath, spanishPath] of Object.entries({
  ...pairedLanguageRoutes,
})) {
  pairedLanguageRoutes[spanishPath] = englishPath;
}

// Secondary Spanish demand pages that share one English counterpart. The forward
// English -> Spanish direction stays owned by the canonical pair declared above;
// these only declare Spanish -> English so the page still resolves a counterpart.
pairedLanguageRoutes["/es/video-para-restaurantes-miami"] =
  "/services/restaurant-promo-video-editing-miami";

export function getPairedLanguageRoute(pathname: string) {
  const exactMatch = pairedLanguageRoutes[pathname];

  if (exactMatch) {
    return exactMatch;
  }

  const englishPortfolioMatch = pathname.match(/^\/portfolio\/([^/]+)$/);

  if (englishPortfolioMatch) {
    return `/es/portafolio/${englishPortfolioMatch[1]}`;
  }

  const spanishPortfolioMatch = pathname.match(/^\/es\/portafolio\/([^/]+)$/);

  if (spanishPortfolioMatch) {
    return `/portfolio/${spanishPortfolioMatch[1]}`;
  }

  return pathname === "/es" || pathname.startsWith("/es/") ? "/" : "/es";
}
