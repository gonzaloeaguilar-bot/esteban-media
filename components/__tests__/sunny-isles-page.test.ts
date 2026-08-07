import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  buildSpanishNicheMetadata,
  SpanishNichePage,
} from "../spanish-niche-page";

(globalThis as typeof globalThis & { React: typeof React }).React = React;

describe("rendered Sunny Isles page", () => {
  it("renders factual proof, FAQ schema, and qualified-inquiry links", () => {
    const html = renderToStaticMarkup(
      React.createElement(SpanishNichePage, {
        slug: "video-inmobiliario-sunny-isles",
      }),
    );

    expect(html).toContain("Edición de video inmobiliario para Sunny Isles Beach");
    expect(html).toContain("material suministrado por el cliente");
    expect(html).toContain("No se presenta como un proyecto realizado en Sunny Isles");
    expect(html).toContain('href="/es/portafolio/homeowners"');
    expect(html).toContain('href="/es/areas#miami-dade"');
    expect(html).toContain('href="/es/contacto"');
    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).not.toMatch(/\+130%|oceanfront|penthouse|vistas? al (?:mar|océano)/i);

    expect(
      buildSpanishNicheMetadata("video-inmobiliario-sunny-isles").alternates
        ?.canonical,
    ).toBe("/es/video-inmobiliario-sunny-isles");
  });
});
