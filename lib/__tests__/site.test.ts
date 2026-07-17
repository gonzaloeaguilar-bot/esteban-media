import { describe, expect, it } from "vitest";

import {
  languageAlternates,
  spanishAreas,
  spanishRoutes,
} from "../spanish-site";
import { serviceAreas, site } from "../site";

describe("site contact details", () => {
  it("publishes Esteban's current email and phone number", () => {
    expect(site.email).toBe("esmolopez@gmail.com");
    expect(site.phone).toEqual({
      display: "(305) 497-4478",
      e164: "+13054974478",
      href: "tel:+13054974478",
    });
    expect(site.phone.e164).toMatch(/^\+1\d{10}$/);
  });

  it("publishes Esteban's canonical YouTube channel", () => {
    expect(site.youtube).toBe(
      "https://www.youtube.com/@estebanmorenolopez3811",
    );
  });

  it("keeps the Google Search Console verification token available", () => {
    expect(site.googleSiteVerification).toBe(
      "I70vr7LMsVyZc_VO4grb6fDxQXPTbhB7LIIFjJUlvUs",
    );
  });
});

describe("portfolio language routes", () => {
  it("keeps reciprocal English, Spanish, and default portfolio URLs", () => {
    const englishPath = "/portfolio";
    const spanishPath = "/es/portafolio";
    const expectedAlternates = {
      "en-US": englishPath,
      "es-US": spanishPath,
      "x-default": englishPath,
    };

    expect(languageAlternates[englishPath]).toEqual(expectedAlternates);
    expect(languageAlternates[spanishPath]).toEqual(expectedAlternates);
    expect(spanishRoutes).toContain(spanishPath);
  });
});

describe("Palm Beach County coverage", () => {
  it("publishes the county in both language area lists", () => {
    const englishArea = serviceAreas.find(
      (area) => area.name === "Palm Beach County",
    );
    const spanishArea = spanishAreas.find(
      (area) => area.name === "Palm Beach County",
    );

    expect(englishArea).toMatchObject({
      county: "Palm Beach County, FL",
      schemaType: "AdministrativeArea",
      href: "/areas/palm-beach-county",
    });
    expect(englishArea?.neighborhoods).toEqual(
      expect.arrayContaining(["Boca Raton", "West Palm Beach", "Jupiter"]),
    );

    expect(spanishArea).toMatchObject({
      county: "Palm Beach County",
      href: "/es/areas/palm-beach-county",
    });
    expect(spanishArea?.neighborhoods).toEqual(
      expect.arrayContaining(["Boca Raton", "West Palm Beach", "Jupiter"]),
    );
  });

  it("keeps reciprocal English, Spanish, and default language URLs", () => {
    const englishPath = "/areas/palm-beach-county";
    const spanishPath = "/es/areas/palm-beach-county";
    const expectedAlternates = {
      "en-US": englishPath,
      "es-US": spanishPath,
      "x-default": englishPath,
    };

    expect(languageAlternates[englishPath]).toEqual(expectedAlternates);
    expect(languageAlternates[spanishPath]).toEqual(expectedAlternates);
  });
});
