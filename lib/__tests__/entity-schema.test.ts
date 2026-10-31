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
      name: "Esteban Moreno López",
      alternateName: "Esteban Moreno",
      sameAs: [site.instagram, site.youtube, site.linkedin],
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
  it("lists the brand Instagram on the business only", () => {
    // @estebanmorenomedia is the business account; @steeban1 stays the person's.
    expect(localBusinessEntityJsonLd.sameAs).toContain(site.instagramBusiness);
    expect(personEntityJsonLd.sameAs).not.toContain(site.instagramBusiness);
    expect(personEntityJsonLd.sameAs).toContain(site.instagram);
  });

  it("lists the Bing Places listing on the business only", () => {
    // Bing imported the Google profile; verified live 2026-10-07.
    expect(localBusinessEntityJsonLd.sameAs).toContain(site.bingPlaces);
    expect(personEntityJsonLd.sameAs).not.toContain(site.bingPlaces);
  });

  it("lists verified business directory and portfolio profiles on the business only", () => {
    // Portfolio/directory URLs were live-checked; Clutch was verified in its
    // authenticated public profile UI on 2026-10-18.
    const directories = [site.behance, site.vimeo, site.nextdoor, site.clutch];
    expect(directories).toEqual([
      "https://www.behance.net/estebanmoreno15",
      "https://vimeo.com/user175241719",
      "https://nextdoor.com/pages/esteban-moreno-media-fort-lauderdale-fl/",
      "https://clutch.co/profile/esteban-moreno-media",
    ]);
    for (const url of directories) {
      expect(localBusinessEntityJsonLd.sameAs).toContain(url);
      expect(personEntityJsonLd.sameAs).not.toContain(url);
    }
  });

  it("lists Esteban's LinkedIn on the person only, never the business", () => {
    // curl_cffi impersonate=chrome returned 999 (LinkedIn's bot wall) on 2026-10-14.
    expect(site.linkedin).toBe(
      "https://www.linkedin.com/in/esteban-moreno-l%C3%B3pez-a95290377/",
    );
    expect(personEntityJsonLd.sameAs).toContain(site.linkedin);
    expect(localBusinessEntityJsonLd.sameAs).not.toContain(site.linkedin);
    const businessSameAs = localBusinessEntityJsonLd.sameAs as string[];
    expect(businessSameAs.some((url) => url.includes("linkedin.com"))).toBe(false);
  });

  it("never publishes a street address or coordinates", () => {
    const sameAs = localBusinessEntityJsonLd.sameAs as string[];
    expect(new Set(sameAs).size).toBe(sameAs.length);
    const json = JSON.stringify(localBusinessEntityJsonLd);
    expect(json).not.toContain("streetAddress");
    expect(json).not.toContain('"geo"');
  });

  it("lists the verified business profile on the business, not the person", () => {
    // The profile that carries the reviews. Read live from the Business
    // Information API 2026-08-14: locations/9465569364777265733,
    // place ChIJz5tunn0FmqERd6F9Q9Irxao.
    expect(site.googleBusinessProfile).toBe(
      "https://maps.google.com/?cid=12305289738935181687",
    );
    expect(personEntityJsonLd.sameAs).not.toContain(site.googleBusinessProfile);
    expect(localBusinessEntityJsonLd.sameAs).toContain(
      site.googleBusinessProfile,
    );
  });

  it("publishes a price range spanning only the published starting prices", () => {
    // Published starting prices (lib/pricing.ts): the lowest is Arranque /
    // Starter from $100 per video; the highest fixed starting price is
    // Presencia Local / Local Presence from $1,600 per month, with
    // Todo Incluido / All-In quoted per project. "+" marks the custom ceiling.
    expect(localBusinessEntityJsonLd.priceRange).toBe("$100-$1,600+");
  });

  it("gives the Organization/LocalBusiness node a logo so it's eligible for rich results", () => {
    expect(localBusinessEntityJsonLd.logo).toMatchObject({
      "@type": "ImageObject",
      url: "https://estebanmorenomedia.com/apple-icon.png",
    });
  });

  it("carries name, url, and WebSite name matching the brand exactly once", () => {
    expect(localBusinessEntityJsonLd.name).toBe(site.name);
    expect(localBusinessEntityJsonLd.url).toBe("https://estebanmorenomedia.com/");
    expect(websiteEntityJsonLd.name).toBe(site.name);
    expect(websiteEntityJsonLd.url).toBe("https://estebanmorenomedia.com/");
  });

  it("never asserts a rating about the business on its own pages", () => {
    // reference-no-self-serving-aggregaterating: a 5.0 collected on Google is
    // self-serving markup here, ineligible for rich results and a manual-action
    // risk. State it in visible copy and link the profile instead.
    expect(localBusinessEntityJsonLd).not.toHaveProperty("aggregateRating");
    expect(localBusinessEntityJsonLd).not.toHaveProperty("review");
    expect(personEntityJsonLd).not.toHaveProperty("aggregateRating");
  });

  it("publishes the business city without ever publishing a street address", () => {
    // 2026-08-15 NAP audit: the LocalBusiness node shipped with no `address` at
    // all — no locality, region or postal code on any of the 269 URLs, checked
    // in production. areaServed is where he works; address is where the
    // business is, and Google reads them differently.
    expect(localBusinessEntityJsonLd.address).toEqual({
      "@type": "PostalAddress",
      addressLocality: "Fort Lauderdale",
      addressRegion: "FL",
      addressCountry: "US",
    });

    // Service-area business: the Google profile hides the address by design
    // (CUSTOMER_LOCATION_ONLY, storefrontAddress null). Publishing one here
    // would contradict the profile and every citation built from it.
    expect(localBusinessEntityJsonLd.address).not.toHaveProperty(
      "streetAddress",
    );

    // The city must match site.location, which the footer already renders, so
    // the visible NAP and the markup can never drift apart.
    expect(site.location).toBe(
      `${localBusinessEntityJsonLd.address.addressLocality}, ${localBusinessEntityJsonLd.address.addressRegion}`,
    );
  });

  it("covers all three counties Esteban serves in the Google profile", () => {
    // GBP serviceArea (patched 2026-08-14) is Broward + Miami-Dade + Palm Beach.
    // The site must not claim a narrower area than the profile.
    const areas = personEntityJsonLd.workLocation.map((entry) => entry.name);
    expect(areas).toContain("Broward County, Florida");
    expect(areas).toContain("Miami-Dade County, Florida");
    expect(areas).toContain("Palm Beach County, Florida");
  });

  it("keeps the owner-confirmed Keys coverage in service markup, not the address", () => {
    const areas = localBusinessEntityJsonLd.areaServed.map((entry) => entry.name);
    expect(areas).toContain("Florida Keys, Florida");
    expect(localBusinessEntityJsonLd.address.addressLocality).toBe(
      "Fort Lauderdale",
    );
  });
});
