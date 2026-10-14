import { eventLanguageAlternates } from "@/lib/events";
import { packageRoutes } from "@/lib/package-routes";

export const pairedLanguageRoutes: Record<string, string> = {
  ...Object.fromEntries(Object.values(packageRoutes).map((route) => [route.en, route.es])),
  // Annual-events section (2026-10-10): hub and per-event pairs from lib/events.ts.
  ...Object.fromEntries(
    Object.entries(eventLanguageAlternates())
      .filter(([path]) => !path.startsWith("/es"))
      .map(([path, langs]) => [path, langs["es-US"]]),
  ),
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
  "/services/food-and-places-creator-video-editing-miami":
    "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami",
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
  // Same pair as the hreflang map in lib/spanish-site.ts.
  "/services/short-form-video-editor-miami":
    "/es/editor-de-video-corto-para-redes-miami",
  "/daily-publish-prompt": "/es/prompt-de-publicacion-diaria",
  "/daily-hook-planner": "/es/planificador-de-ganchos-de-video",
  "/daily-shot-list-planner": "/es/planificador-de-tomas-de-video",
  "/daily-script-pacing-calculator": "/es/calculadora-de-ritmo-de-video",
  "/daily-script-timer": "/es/temporizador-de-guiones-de-video",
  "/reels-editing-cost-calculator": "/es/calculadora-de-costo-de-edicion-de-reels",
  // Row 30 (2026-10-14): ES twin + the Brickell pair (same pairs as the hreflang map).
  "/services/hire-remote-video-editor": "/es/contratar-editor-de-video-remoto",
  "/services/corporate-video-production-brickell":
    "/es/video-corporativo-distrito-financiero-miami",
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
  // 2026-10-07 niche batch.
  "/services/real-estate-reels-video-editor-south-florida":
    "/es/editor-de-video-real-estate-miami",
  "/services/wealth-management-video-production-miami":
    "/es/produccion-de-video-para-asesores-financieros-miami",
  // 2026-10-11 niche wave 8 (owner-approved).
  "/services/pre-construction-condo-video-marketing-miami":
    "/es/video-para-preventa-de-condominios-miami",
  "/services/vacation-rental-video-marketing-fort-lauderdale":
    "/es/video-para-alquileres-vacacionales-fort-lauderdale",
  "/services/insurance-agency-video-marketing-miami":
    "/es/marketing-de-video-para-agencias-de-seguros-miami",
  "/services/mortgage-broker-video-marketing-miami":
    "/es/marketing-de-video-para-brokers-hipotecarios-miami",
  "/services/immigration-attorney-video-marketing-miami":
    "/es/marketing-de-video-para-abogados-de-inmigracion-miami",
  "/services/church-sermon-clip-editing-miami":
    "/es/edicion-de-clips-de-predicas-para-iglesias-miami",
  "/services/personal-brand-video-editor-founders-miami":
    "/es/editor-de-video-para-marca-personal-miami",
  "/services/podcast-clipping-service-miami":
    "/es/edicion-de-clips-de-podcast-miami",
  "/guides/miami-restaurant-instagram-study":
    "/es/guias/estudio-instagram-restaurantes-miami",
  "/services/quinceanera-video-miami":
    "/es/video-para-quinceaneras-miami",
  "/services/dance-studio-music-school-video-marketing-miami":
    "/es/video-para-academias-de-baile-y-musica-miami",
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
pairedLanguageRoutes["/es/reels-para-negocios-miami"] =
  "/services/short-form-video-editor-miami";

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
