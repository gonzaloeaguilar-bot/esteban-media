import { describe, expect, it } from "vitest";

import {
  buildPortfolioCollectionSchema,
  buildPortfolioWatchSchema,
} from "../portfolio-schema";

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
    expect(schema.mainEntity.itemListElement[0].item["@type"]).toBe("WebPage");
    expect(schema.mainEntity.itemListElement[0].item.url).toMatch(
      /\/portfolio\/sample-project$/,
    );
    expect(schema.mainEntity.itemListElement[0].item["@id"]).toMatch(
      /\/portfolio\/sample-project#webpage$/,
    );
    expect(
      schema.mainEntity.itemListElement[0].item.primaryImageOfPage.url,
    ).toMatch(
      /\/portfolio\/sample-project\.jpg$/,
    );
  });

  it("reserves video-specific markup for the linked watch page", () => {
    const schema = buildPortfolioCollectionSchema({
      path: "/es/portafolio",
      locale: "es-US",
      title: "Trabajos seleccionados",
      description: "Una colección de proyectos seleccionados.",
      items,
    });
    const serialized = JSON.stringify(schema);

    expect(serialized).toContain('"primaryImageOfPage"');
    expect(serialized).toContain(
      '"url":"https://estebanmorenomedia.com/portfolio/sample-project.jpg"',
    );
    expect(serialized).not.toContain('"VideoObject"');
    expect(serialized).not.toContain('"uploadDate"');
    expect(serialized).not.toContain('"duration"');
    expect(serialized).not.toContain('"embedUrl"');
    expect(serialized).not.toContain('"sameAs"');
    expect(serialized).not.toContain('"creditText"');
    expect(serialized).not.toContain('"locationCreated"');
    expect(serialized).not.toContain('"creator"');
    expect(serialized).not.toContain("copyrightYear");
    expect(serialized).not.toContain("dateCreated");
    expect(serialized).not.toContain("drive.google.com");
  });

  it("points each localized collection to its corresponding watch page", () => {
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

    expect(english.mainEntity.itemListElement[0].item["@id"]).toMatch(
      /\/portfolio\/sample-project#webpage$/,
    );
    expect(spanish.mainEntity.itemListElement[0].item["@id"]).toMatch(
      /\/es\/portafolio\/sample-project#webpage$/,
    );
    expect(english.mainEntity.itemListElement[0].item.inLanguage).toBe("en-US");
    expect(spanish.mainEntity.itemListElement[0].item.inLanguage).toBe("es-US");
  });
});

describe("portfolio watch-page schema", () => {
  it("connects a localized page, visible video, and breadcrumbs", () => {
    const schema = buildPortfolioWatchSchema({
      path: "/portfolio/sample-project",
      locale: "en-US",
      ...items[0],
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Sample project", path: "/portfolio/sample-project" },
      ],
    });
    const webpage = schema["@graph"].find(
      (node) => node["@type"] === "WebPage",
    );
    const video = schema["@graph"].find(
      (node) => node["@type"] === "VideoObject",
    );
    const breadcrumbs = schema["@graph"].find(
      (node) => node["@type"] === "BreadcrumbList",
    );

    expect(webpage).toMatchObject({
      url: "https://estebanmorenomedia.com/portfolio/sample-project",
      inLanguage: "en-US",
      mainEntity: {
        "@id":
          "https://estebanmorenomedia.com/portfolio/sample-project#video",
      },
    });
    expect(video).toMatchObject({
      "@type": "VideoObject",
      name: "Sample project",
      description: "A verified project summary.",
      creditText: "Direction and editing: Esteban Moreno",
      thumbnailUrl:
        "https://estebanmorenomedia.com/portfolio/sample-project.jpg",
      sameAs: "https://www.youtube.com/watch?v=abcdefghijk",
      embedUrl: "https://www.youtube-nocookie.com/embed/abcdefghijk",
      inLanguage: "en-US",
    });
    expect(breadcrumbs).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        expect.objectContaining({ position: 1, name: "Home" }),
        expect.objectContaining({ position: 2, name: "Portfolio" }),
        expect.objectContaining({ position: 3, name: "Sample project" }),
      ],
    });
  });

  it("keeps optional location honest and does not invent authorship or dates", () => {
    const schema = buildPortfolioWatchSchema({
      path: "/es/portafolio/sample-project",
      locale: "es-US",
      ...items[0],
      breadcrumbs: [
        { name: "Inicio", path: "/es" },
        { name: "Portafolio", path: "/es/portafolio" },
        {
          name: "Sample project",
          path: "/es/portafolio/sample-project",
        },
      ],
    });
    const serialized = JSON.stringify(schema);

    expect(serialized).toContain('"locationCreated":{"@type":"Place","name":"Miami"}');
    expect(serialized).not.toContain('"creator"');
    expect(serialized).not.toContain('"copyrightYear"');
    expect(serialized).not.toContain('"dateCreated"');
  });
});
