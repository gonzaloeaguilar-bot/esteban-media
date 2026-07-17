import { describe, expect, it } from "vitest";

import { buildPortfolioCollectionSchema } from "../portfolio-schema";

const items = [
  {
    id: "sample-project",
    title: "Sample project",
    summary: "A verified project summary.",
    credits: "Direction and editing: Esteban Moreno",
    url: "https://www.youtube.com/watch?v=abcdefghijk",
    poster: "/portfolio/sample-project.jpg",
    videoId: "abcdefghijk",
    uploadDate: "2022-08-31T17:06:40-07:00",
    duration: "PT0M55S",
    location: "Miami",
  },
];

describe("portfolio collection schema", () => {
  it("connects the collection to the canonical business", () => {
    const schema = buildPortfolioCollectionSchema({
      path: "/portfolio",
      locale: "en-US",
      title: "Selected work",
      description: "A collection of selected projects.",
      items,
    });

    expect(schema["@type"]).toBe("CollectionPage");
    expect(schema.publisher["@id"]).toMatch(/\/#business$/);
    expect(schema.mainEntity["@type"]).toBe("ItemList");
    expect(schema.mainEntity.numberOfItems).toBe(1);
    expect(schema.mainEntity.itemListElement[0].item["@type"]).toBe(
      "VideoObject",
    );
    expect(schema.mainEntity.itemListElement[0].item.url).toMatch(
      /\/portfolio#sample-project$/,
    );
    expect(schema.mainEntity.itemListElement[0].item.sameAs).toBe(items[0].url);
  });

  it("uses verified video metadata without inventing authorship", () => {
    const schema = buildPortfolioCollectionSchema({
      path: "/es/portafolio",
      locale: "es-US",
      title: "Trabajos seleccionados",
      description: "Una colección de proyectos seleccionados.",
      items,
    });
    const serialized = JSON.stringify(schema);

    expect(serialized).toContain('"name":"Miami"');
    expect(serialized).not.toContain('"creator"');
    expect(serialized).not.toContain("copyrightYear");
    expect(serialized).not.toContain("dateCreated");
    expect(serialized).toContain('"uploadDate":"2022-08-31T17:06:40-07:00"');
    expect(serialized).toContain('"duration":"PT0M55S"');
    expect(serialized).toContain(
      '"embedUrl":"https://www.youtube-nocookie.com/embed/abcdefghijk"',
    );
    expect(serialized).not.toContain("drive.google.com");
  });

  it("keeps one language-neutral work identity across both collections", () => {
    const english = buildPortfolioCollectionSchema({
      path: "/portfolio",
      locale: "en-US",
      title: "Selected work",
      description: "A collection of selected projects.",
      items,
    });
    const spanish = buildPortfolioCollectionSchema({
      path: "/es/portafolio",
      locale: "es-US",
      title: "Trabajos seleccionados",
      description: "Una colección de proyectos seleccionados.",
      items,
    });

    expect(english.mainEntity.itemListElement[0].item["@id"]).toBe(
      spanish.mainEntity.itemListElement[0].item["@id"],
    );
    expect(JSON.stringify(english.mainEntity)).not.toContain('"inLanguage"');
    expect(JSON.stringify(spanish.mainEntity)).not.toContain('"inLanguage"');
  });
});
