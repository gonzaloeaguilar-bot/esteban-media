import { describe, expect, it } from "vitest";

import {
  buildProfilePageJsonLd,
  entityIds,
  localBusinessEntityJsonLd,
  personEntityJsonLd,
  siteEntityGraphJsonLd,
  websiteEntityJsonLd,
} from "../entity-schema";
import { site } from "../site";

describe("shared entity graph", () => {
  it("uses one bilingual founder identity with both verified profiles", () => {
    expect(site.founder).toEqual({
      name: "Esteban Moreno",
      fullName: "Esteban Moreno López",
    });
    expect(personEntityJsonLd).toMatchObject({
      "@id": entityIds.person,
      name: "Esteban Moreno",
      alternateName: "Esteban Moreno López",
      sameAs: [site.instagram, site.youtube],
      worksFor: { "@id": entityIds.business },
      jobTitle: "Video editor and content creator",
    });
    expect(personEntityJsonLd.description).not.toMatch(/audiovisual/i);
    expect(personEntityJsonLd.knowsAbout).not.toContain("product photography");
    expect(localBusinessEntityJsonLd.founder).toEqual({
      "@id": entityIds.person,
    });
    expect(websiteEntityJsonLd).toMatchObject({
      creator: { "@id": entityIds.person },
      about: { "@id": entityIds.person },
    });
    expect(siteEntityGraphJsonLd["@graph"]).toContain(personEntityJsonLd);
  });

  it("makes both localized About pages profiles of the same person", () => {
    const english = buildProfilePageJsonLd({
      path: "/about",
      name: "About Esteban Moreno",
      description: "English profile.",
      language: "en-US",
    });
    const spanish = buildProfilePageJsonLd({
      path: "/es/sobre-esteban",
      name: "Sobre Esteban Moreno",
      description: "Perfil en español.",
      language: "es-US",
    });

    expect(english.mainEntity).toEqual({ "@id": entityIds.person });
    expect(spanish.mainEntity).toEqual({ "@id": entityIds.person });
    expect(english.about).toEqual(spanish.about);
  });
});
