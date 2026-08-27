import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { metadata as englishAreasMetadata } from "../(english)/areas/page";
import EnglishAreasPage from "../(english)/areas/page";
import { metadata as englishPortfolioMetadata } from "../(english)/portfolio/page";
import { metadata as spanishAreasMetadata } from "../(spanish)/es/areas/page";
import SpanishAreasPage from "../(spanish)/es/areas/page";
import { metadata as spanishPortfolioMetadata } from "../(spanish)/es/portafolio/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

function collectStrings(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(collectStrings).join(" ");
  if (!React.isValidElement(node)) return "";
  return collectStrings((node.props as { children?: React.ReactNode }).children);
}

function collectHrefs(node: React.ReactNode): string[] {
  if (Array.isArray(node)) return node.flatMap(collectHrefs);
  if (!React.isValidElement(node)) return [];
  const props = node.props as { children?: React.ReactNode; href?: string };
  return [
    ...(typeof props.href === "string" ? [props.href] : []),
    ...collectHrefs(props.children),
  ];
}

describe("near-top-10 CTR metadata and canonical service targeting", () => {
  it("renders click-focused, localized areas and portfolio metadata", () => {
    expect(englishAreasMetadata.title).toBe(
      "Miami & Fort Lauderdale Video Editing Services | Esteban",
    );
    expect(englishAreasMetadata.description).toBe(
      "Explore video editing, AI-assisted content, and social planning for Fort Lauderdale, Broward, and Miami-Dade. Palm Beach projects are scoped individually.",
    );
    expect(englishPortfolioMetadata.title).toBe(
      "Miami & Fort Lauderdale Video Editing Portfolio | Esteban",
    );
    expect(englishPortfolioMetadata.description).toBe(
      "See selected video editing, promotional, social, event, animation, and narrative work from Esteban Moreno Media for Miami and Fort Lauderdale projects.",
    );
    expect(spanishAreasMetadata.title).toBe(
      "Servicios de edición de video en Miami y Fort Lauderdale",
    );
    expect(spanishAreasMetadata.description).toBe(
      "Explora edición de video, contenido con IA y planificación social para Fort Lauderdale, Broward y Miami-Dade. Palm Beach se evalúa según el proyecto.",
    );
    expect(spanishPortfolioMetadata.title).toBe(
      "Portafolio de edición de video en Miami y Fort Lauderdale",
    );
    expect(spanishPortfolioMetadata.description).toBe(
      "Mira trabajos seleccionados de edición, promoción, contenido social, eventos, animación y narrativa para proyectos en Miami y Fort Lauderdale.",
    );

    for (const metadata of [
      englishAreasMetadata,
      englishPortfolioMetadata,
      spanishAreasMetadata,
      spanishPortfolioMetadata,
    ]) {
      expect(String(metadata.title).length).toBeGreaterThanOrEqual(50);
      expect(String(metadata.title).length).toBeLessThanOrEqual(60);
      expect(metadata.description?.length).toBeGreaterThanOrEqual(120);
      expect(metadata.description?.length).toBeLessThanOrEqual(160);
    }
  });

  it("routes restaurant-promo intent from area pages to the dedicated service", () => {
    expect(collectStrings(EnglishAreasPage())).toContain(
      "Looking for restaurant video editing rather than area coverage?",
    );
    expect(collectStrings(SpanishAreasPage())).toContain(
      "¿Buscas edición de video para un restaurante, no cobertura por zona?",
    );
    expect(collectHrefs(EnglishAreasPage())).toContain(
      "/services/restaurant-promo-video-editing-miami",
    );
    expect(collectHrefs(SpanishAreasPage())).toContain(
      "/es/edicion-de-video-promocional-para-restaurantes-miami",
    );
  });
});
