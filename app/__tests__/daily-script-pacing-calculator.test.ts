import { afterEach, describe, expect, it, vi } from "vitest";

import { englishGroups, spanishGroups } from "@/components/site-footer-client";
import { getPairedLanguageRoute } from "@/lib/language-routes";
import { validateLeadPayload } from "@/lib/lead-responder";
import { languageAlternates } from "@/lib/spanish-site";
import {
  carriedStreak,
  drillForTodayIndex,
  nextStreak,
} from "@/components/daily-script-pacing-calculator";

afterEach(() => {
  vi.useRealTimers();
});

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

  it("publishes reciprocal language alternates", () => {
    expect(languageAlternates["/daily-script-pacing-calculator"]?.["es-US"]).toBe(
      "/es/calculadora-de-ritmo-de-video",
    );
    expect(languageAlternates["/es/calculadora-de-ritmo-de-video"]?.["en-US"]).toBe(
      "/daily-script-pacing-calculator",
    );
  });

  it("preserves a prior streak while a new day's checklist is in progress", () => {
    expect(nextStreak(4, false, false)).toBe(4);
    expect(nextStreak(4, false, true)).toBe(5);
    expect(nextStreak(5, true, false)).toBe(4);
  });

  it("carries streaks only from a completed consecutive day", () => {
    expect(carriedStreak(4, "2026-08-19", "2026-08-20", true)).toBe(4);
    expect(carriedStreak(4, "2026-08-18", "2026-08-20", true)).toBe(0);
    expect(carriedStreak(4, "2026-08-19", "2026-08-20", false)).toBe(0);
  });

  it("rotates the daily drill at local midnight", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 7, 20, 23, 59, 59));
    const beforeMidnight = drillForTodayIndex(7);
    vi.setSystemTime(new Date(2026, 7, 21, 0, 0, 0));
    expect(drillForTodayIndex(7)).toBe((beforeMidnight + 1) % 7);
  });

  it("links the Spanish daily script pacing calculator page to /es/areas", () => {
    const { readFileSync } = require("node:fs");
    const { join } = require("node:path");
    const markup = readFileSync(
      join(process.cwd(), "app/(spanish)/es/calculadora-de-ritmo-de-video/page.tsx"),
      "utf8",
    );
    expect(markup).toContain('href="/es/areas"');
    expect(markup).toContain("áreas de servicio en Fort Lauderdale, Broward y Miami-Dade");
  });
});
