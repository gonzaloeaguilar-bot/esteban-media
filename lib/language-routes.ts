const pairedLanguageRoutes: Record<string, string> = {
  "/": "/es",
  "/services": "/es/servicios",
  "/services/website-design-fort-lauderdale": "/es/diseno-web-fort-lauderdale",
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
  "/daily-publish-prompt": "/es/prompt-de-publicacion-diaria",
  "/daily-hook-planner": "/es/planificador-de-ganchos-de-video",
};

for (const [englishPath, spanishPath] of Object.entries({
  ...pairedLanguageRoutes,
})) {
  pairedLanguageRoutes[spanishPath] = englishPath;
}

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
