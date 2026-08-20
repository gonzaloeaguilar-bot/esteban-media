import { describe, expect, it } from "vitest";

import { englishGroups, spanishGroups } from "@/components/site-footer-client";
import { getPairedLanguageRoute } from "@/lib/language-routes";
import { validateLeadPayload } from "@/lib/lead-responder";

describe("Daily Script Pacing Calculator surface", () => {
  it("pairs English and Spanish daily script pacing calculator routes correctly", () => {
    expect(getPairedLanguageRoute("/daily-script-pacing-calculator")).toBe(
      "/es/calculadora-de-ritmo-de-video",
    );
    expect(getPairedLanguageRoute("/es/calculadora-de-ritmo-de-video")).toBe(
      "/daily-script-pacing-calculator",
    );
  });

  it("validates lead payloads from daily-pacing-calculator source", () => {
    const resultEn = validateLeadPayload({
      email: "creator@example.com",
      source: "daily-pacing-calculator",
      locale: "en",
    });
    expect(resultEn.valid).toBe(true);
    expect(resultEn.error).toBeUndefined();

    const resultEs = validateLeadPayload({
      email: "editor@example.com",
      source: "daily-pacing-calculator",
      locale: "es",
    });
    expect(resultEs.valid).toBe(true);
    expect(resultEs.error).toBeUndefined();
  });

  it("includes daily script pacing calculator in English and Spanish footer groups", () => {
    const englishSiteGroup = englishGroups.find((group) => group.title === "Site");
    expect(englishSiteGroup).toBeDefined();
    expect(
      englishSiteGroup?.items.some(
        (item) => item.href === "/daily-script-pacing-calculator",
      ),
    ).toBe(true);

    const spanishSiteGroup = spanishGroups.find((group) => group.title === "Sitio");
    expect(spanishSiteGroup).toBeDefined();
    expect(
      spanishSiteGroup?.items.some(
        (item) => item.href === "/es/calculadora-de-ritmo-de-video",
      ),
    ).toBe(true);
  });

  it("exports valid metadata for English and Spanish pages", async () => {
    const enPage = await import("../(english)/daily-script-pacing-calculator/page");
    expect(enPage.metadata.title).toBe("Daily Video Script Pacing Calculator");
    expect(enPage.metadata.alternates?.canonical).toBe("/daily-script-pacing-calculator");

    const esPage = await import("../(spanish)/es/calculadora-de-ritmo-de-video/page");
    expect(esPage.metadata.title).toBe("Calculadora de Ritmo de Video y Guion Diario");
    expect(esPage.metadata.alternates?.canonical).toBe("/es/calculadora-de-ritmo-de-video");
  });
});
