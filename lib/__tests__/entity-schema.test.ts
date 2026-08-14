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
      sameAs: [site.instagram, site.youtube, site.googleBusinessProfile],
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

describe("Google Business Profile entity link", () => {
  it("lists the verified profile in sameAs on both the person and the business", () => {
    // The profile that carries the reviews. Read live from the Business
    // Information API 2026-08-14: locations/9465569364777265733,
    // place ChIJz5tunn0FmqERd6F9Q9Irxao.
    expect(site.googleBusinessProfile).toBe(
      "https://maps.google.com/?cid=12305289738935181687",
    );
    expect(personEntityJsonLd.sameAs).toContain(site.googleBusinessProfile);
    expect(localBusinessEntityJsonLd.sameAs).toContain(
      site.googleBusinessProfile,
    );
  });

  it("never asserts a rating about the business on its own pages", () => {
    // reference-no-self-serving-aggregaterating: a 5.0 collected on Google is
    // self-serving markup here, ineligible for rich results and a manual-action
    // risk. State it in visible copy and link the profile instead.
    expect(localBusinessEntityJsonLd).not.toHaveProperty("aggregateRating");
    expect(localBusinessEntityJsonLd).not.toHaveProperty("review");
    expect(personEntityJsonLd).not.toHaveProperty("aggregateRating");
  });

  it("covers all three counties Esteban serves in the Google profile", () => {
    // GBP serviceArea (patched 2026-08-14) is Broward + Miami-Dade + Palm Beach.
    // The site must not claim a narrower area than the profile.
    const areas = personEntityJsonLd.workLocation.map((entry) => entry.name);
    expect(areas).toContain("Broward County, Florida");
    expect(areas).toContain("Miami-Dade County, Florida");
    expect(areas).toContain("Palm Beach County, Florida");
  });
});
