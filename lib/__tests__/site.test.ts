import { describe, expect, it } from "vitest";

import {
  languageAlternates,
  spanishAreas,
  spanishNichePages,
  spanishServices,
  spanishSite,
  spanishRoutes,
} from "../spanish-site";
import { serviceAreas, services, site, socialImage } from "../site";

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
    expect(englishArea).not.toHaveProperty("neighborhoods");

    expect(spanishArea).toMatchObject({
      county: "Palm Beach County",
      href: "/es/areas/palm-beach-county",
    });
    expect(spanishArea).not.toHaveProperty("neighborhoods");
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

describe("approved public facts", () => {
  it("publishes only the four confirmed service priorities", () => {
    expect(services.map((service) => service.id)).toEqual([
      "editing",
      "ai-content",
      "social-planning",
      "on-location",
      "website-design",
    ]);
    expect(spanishServices.map((service) => service.id)).toEqual([
      "edicion",
      "contenido-ia",
      "planificacion-social",
      "videografia",
      "diseno-web",
    ]);

    const publishedServices = JSON.stringify({ services, spanishServices });
    for (const gatedPhrase of [
      "product photography",
      "fotografía de producto",
      "aerial options",
      "opciones aéreas",
      "first cut",
      "primer corte",
      "review link",
      "enlace de revisión",
    ]) {
      expect(publishedServices.toLowerCase()).not.toContain(gatedPhrase);
    }
  });

  it("keeps area data at verified county level without city chips", () => {
    const areaData = JSON.stringify({ serviceAreas, spanishAreas });

    for (const area of [...serviceAreas, ...spanishAreas]) {
      expect(area).not.toHaveProperty("neighborhoods");
    }
    for (const unconfirmedCity of [
      "Boca Raton",
      "West Palm Beach",
      "Jupiter",
      "Hollywood",
      "Pompano Beach",
      "Brickell",
      "Doral",
    ]) {
      expect(areaData).not.toContain(unconfirmedCity);
    }
  });

  it("marks photography and drone routes as pending educational resources", () => {
    const photography = spanishNichePages.find(
      (page) => page.slug === "fotografo-en-fort-lauderdale",
    );
    const drone = spanishNichePages.find(
      (page) => page.slug === "drone-real-estate-miami",
    );

    for (const legacyPage of [photography, drone]) {
      expect(legacyPage?.availability).toBe("pending-confirmation");
      expect(legacyPage?.description).toContain("Ruta educativa heredada");
      expect(legacyPage?.lead).toContain("no ofrece");
    }
  });
});
