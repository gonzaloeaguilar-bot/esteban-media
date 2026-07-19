import { describe, expect, it } from "vitest";

import {
  languageAlternates,
  spanishAreas,
  spanishNichePages,
  spanishSite,
  spanishRoutes,
} from "../spanish-site";
import { serviceAreas, site, socialImage } from "../site";

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

  it("publishes the Esteban Media GA4 stream and branded social image", () => {
    expect(site.googleAnalyticsMeasurementId).toBe("G-W9CM4CE2MQ");
    expect(socialImage).toEqual({
      url: "https://estebanmorenomedia.com/social-card",
      width: 1200,
      height: 630,
      alt: "Esteban Moreno Media video editing and content services in South Florida",
    });
  });

  it("keeps homepage descriptions concise and source-faithful", () => {
    expect(site.description).toBe(
      "Fort Lauderdale video editing, AI-assisted content, social planning, and selectively scoped on-location production for Broward, Miami-Dade, and remote clients.",
    );
    expect(spanishSite.description).toBe(
      "Edición de video, contenido con IA, planificación para redes y producción selectiva desde Fort Lauderdale para Broward, Miami-Dade y clientes remotos.",
    );
    expect(site.description.length).toBeLessThanOrEqual(160);
    expect(spanishSite.description.length).toBeLessThanOrEqual(160);
  });
});

describe("Spanish search titles", () => {
  it("stays within 60 characters after the brand template is applied", () => {
    for (const page of spanishNichePages) {
      expect(`${page.metadataTitle} | ${site.name}`.length).toBeLessThanOrEqual(
        60,
      );
    }
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
