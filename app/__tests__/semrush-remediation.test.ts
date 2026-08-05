import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { sitemapRoutes } from "@/app/sitemap";
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
      .filter((path) => path.startsWith("/services/"));

    expect(linkedRoutes).toEqual(new Set(expectedRoutes));
    expect(linkedRoutes).toContain("/services/law-firm-video-production-miami");
    expect(linkedRoutes).toContain("/services/video-editing-palm-beach-gardens");
  });
});
