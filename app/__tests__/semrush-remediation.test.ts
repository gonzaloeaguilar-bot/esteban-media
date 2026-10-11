import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { sitemapRoutes } from "@/app/sitemap";
import { isConsolidatedPath } from "@/lib/consolidation";
import { ServiceLandingDirectory } from "@/components/service-landing-directory";
import nextConfig from "@/next.config";

describe("Semrush remediation", () => {
  it("permanently redirects both migrated Spanish commercial URLs", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
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
      ]),
    );
  });

  it("links every English service landing route from the shared directory", () => {
    const html = renderToStaticMarkup(createElement(ServiceLandingDirectory));
    const linkedRoutes = new Set(
      [...html.matchAll(/href="(\/services\/[^"]+)"/g)].map((match) => match[1]),
    );

    const expectedRoutes = sitemapRoutes
      .map(({ path }) => path)
      .filter((path) => path.startsWith("/services/"))
      // Consolidated pages are noindexed and no longer linked from the hubs
      // (SEO/GEO audit 2026-10-10, fix 5).
      .filter((path) => !isConsolidatedPath(path));

    expect(linkedRoutes).toEqual(new Set(expectedRoutes));
    expect(isConsolidatedPath("/services/law-firm-video-production-miami")).toBe(true);
    expect(linkedRoutes).not.toContain("/services/law-firm-video-production-miami");
    expect(linkedRoutes).toContain("/services/video-editing-palm-beach-gardens");
  });
});
