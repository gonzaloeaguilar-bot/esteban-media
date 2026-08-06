import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  buildSpanishNicheStructuredData,
  getSpanishNichePage,
} from "../spanish-site";

const slug = "video-inmobiliario-sunny-isles";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("Sunny Isles factual proof boundary", () => {
  it("preserves intent while limiting the offer to client-supplied footage", () => {
    const page = getSpanishNichePage(slug);

    expect(page).toBeDefined();
    expect(page).toMatchObject({
      metadataTitle: "Video Inmobiliario Sunny Isles",
      keyword: "video inmobiliario en Sunny Isles Beach",
      location: "Sunny Isles Beach / Aventura",
      availability: "confirmed",
    });

    const copy = JSON.stringify(page);
    expect(copy).toContain("material suministrado por el cliente");
    expect(copy).not.toMatch(
      /oceanfront|penthouse|vistas? (?:de|al) (?:mar|océano)|clase mundial|alto patrimonio|portugués/i,
    );

    const context = source("components/spanish-niche-page.tsx");
    expect(context).toContain("/es/portafolio/homeowners");
    expect(context).toContain("No se presenta como un proyecto realizado en Sunny Isles");
    expect(context).toContain("material suministrado por 300 Bees");
  });

  it("keeps visible FAQ copy identical to FAQPage schema", () => {
    const page = getSpanishNichePage(slug)!;
    const schema = buildSpanishNicheStructuredData(page);
    const faq = schema["@graph"].find(
      (entry) => entry["@type"] === "FAQPage",
    ) as { mainEntity: unknown } | undefined;

    expect(faq).toBeDefined();
    expect(faq?.mainEntity).toEqual(
      page.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    );
  });

  it("replaces Homeowners performance claims with sourced project facts", () => {
    const spanish = JSON.parse(source("messages/es.json"));
    const english = JSON.parse(source("messages/en.json"));

    expect(spanish.Portfolio.items.homeowners.results).toEqual([
      { metric: "2021", label: "Proyecto de edición publicado" },
      { metric: "Solo edición", label: "Material aportado por 300 Bees" },
    ]);
    expect(english.Portfolio.items.homeowners.results).toEqual([
      { metric: "2021", label: "Published editing project" },
      { metric: "Editing only", label: "Footage supplied by 300 Bees" },
    ]);

    const homeowners = JSON.stringify({
      spanish: spanish.Portfolio.items.homeowners,
      english: english.Portfolio.items.homeowners,
    });
    expect(homeowners).not.toMatch(/\+130%|click-through|tasa de clics/i);
  });
});
