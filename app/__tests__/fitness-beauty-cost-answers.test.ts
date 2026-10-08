import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  GYM_DEEP_DIVE,
  SALON_COST_DEEP_DIVE,
  SPA_DEEP_DIVE,
} from "@/lib/service-deep-dive-content";
import { PACKAGE_PRICES, SHORT_FORM, usd } from "@/lib/pricing";
import { spanishNichePages } from "@/lib/spanish-site";

// Fitness & beauty niche pages (2026-10-07). Evidence: the Google AI Overview
// for "how much does a gym promo video cost in miami" cites small-studio cost
// pages, and none of these six pages answered the cost question.

const countWords = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

const fromPrice = (id: keyof typeof PACKAGE_PRICES) => {
  const price = PACKAGE_PRICES[id];
  if (price.kind !== "from") throw new Error(`${id} has no published figure`);
  return usd(price.amount);
};

// Claims the site does not publish: no drone (no Part 107), no compliance
// regime, no turnaround promise, no guarantee, no result statistic.
const BANNED =
  /drone|aerial|\bdron\b|a[eé]reo|HIPAA|same-day|mismo d[ií]a|guarantee|garantiz|sin riesgo|high-converting|\d+\s?%|licensed|licenciad/i;

const EN = {
  gym: {
    dive: GYM_DEEP_DIVE,
    headings: [
      "How much does a gym promo video cost in Miami?",
      "What does it cost to film at the gym or studio?",
      "What does a monthly content plan for a gym cost?",
      "What should a gym, trainer or pilates studio film first?",
      "Which fitness work is in Esteban's portfolio?",
    ],
  },
  salon: {
    dive: SALON_COST_DEEP_DIVE,
    headings: [
      "How much does salon or barbershop video cost in Miami?",
      "What does filming inside the salon cost?",
      "What does a monthly posting plan for a salon cost?",
    ],
  },
  spa: {
    dive: SPA_DEEP_DIVE,
    headings: [
      "How much does a spa promotional video cost in Miami?",
      "What does filming at the spa cost?",
      "How does a spa film without showing guests?",
      "What does a monthly content plan for a spa cost?",
    ],
  },
} as const;

const ES = {
  "marketing-de-video-para-gimnasios-miami": [
    "¿Cuánto cuesta un video promocional para un gimnasio en Miami?",
    "¿Cuánto cuesta grabar en el gimnasio o el estudio?",
    "¿Cuánto cuesta un plan mensual de contenido para un gimnasio?",
    "¿Qué debe grabar primero un gimnasio, un entrenador o un estudio de pilates?",
    "¿Qué trabajos de fitness hay en el portafolio de Esteban?",
  ],
  "marketing-de-video-para-salones-y-barberias-miami": [
    "¿Cuánto cuesta el video para un salón o una barbería en Miami?",
    "¿Cuánto cuesta grabar dentro del salón?",
    "¿Cuánto cuesta un plan mensual de publicaciones para un salón?",
  ],
  "marketing-de-video-para-spas-y-bienestar-miami": [
    "¿Cuánto cuesta un video promocional para un spa en Miami?",
    "¿Cuánto cuesta grabar en el spa?",
    "¿Cómo graba un spa sin mostrar a sus clientes?",
    "¿Cuánto cuesta un plan mensual de contenido para un spa?",
  ],
} as const;

const read = (rel: string) => readFileSync(path.join(process.cwd(), rel), "utf8");

describe("fitness & beauty cost answers (EN)", () => {
  for (const [name, { dive, headings }] of Object.entries(EN)) {
    it(`${name}: question headings, in order, each 100-180 words`, () => {
      expect(dive.sections.map((s) => s.heading)).toEqual([...headings]);
      for (const section of dive.sections) {
        const words = countWords(section.paragraphs.join(" "));
        expect(words, section.heading).toBeGreaterThanOrEqual(100);
        expect(words, section.heading).toBeLessThanOrEqual(180);
      }
    });

    it(`${name}: prices come from lib/pricing.ts and no unpublished claim appears`, () => {
      const text = JSON.stringify(dive);
      expect(text).toContain(usd(SHORT_FORM.weekly[0].pricePerWeek));
      expect(text).toContain(usd(SHORT_FORM.weekly[1].pricePerWeek));
      expect(text).toContain(fromPrice("arranque"));
      expect(text).toContain(fromPrice("presencia-local"));
      expect(text).toContain(fromPrice("crecimiento"));
      expect(text).not.toMatch(BANNED);
    });
  }

  it("gym: the fitness portfolio is described as web work, not video", () => {
    const text = JSON.stringify(GYM_DEEP_DIVE);
    expect(text).toContain("](/portfolio/gains-from-geebs)");
    expect(text).toContain("](/portfolio/titanforge)");
    expect(text).toMatch(/not (a )?video/i);
  });

  it("pages render the deep dives and drop the mislabelled proof", () => {
    const gym = read("app/(english)/services/fitness-gym-video-marketing-miami/page.tsx");
    const salon = read("app/(english)/services/salon-barbershop-video-marketing-miami/page.tsx");
    const spa = read("app/(english)/services/wellness-spa-video-marketing-miami/page.tsx");
    expect(gym).toContain("GYM_DEEP_DIVE");
    expect(salon).toContain("SALON_COST_DEEP_DIVE");
    expect(spa).toContain("SPA_DEEP_DIVE");
    for (const page of [gym, spa]) {
      // Healthy Smile is a dental clinic's social videos, not fitness or spa work.
      expect(page).not.toMatch(/Healthy Smile<\/strong> proves/);
      expect(page).not.toMatch(/high-converting|licensed workout audio/i);
    }
  });
});

describe("fitness & beauty cost answers (ES)", () => {
  for (const [slug, headings] of Object.entries(ES)) {
    const page = spanishNichePages.find((p) => p.slug === slug);

    it(`${slug}: cost sections first, question headings, 100-180 words`, () => {
      expect(page).toBeDefined();
      const sections = page!.sections ?? [];
      expect(sections.slice(0, headings.length).map((s) => s.heading)).toEqual([...headings]);
      for (const section of sections.slice(0, headings.length)) {
        const words = countWords(section.paragraphs.join(" "));
        expect(words, section.heading).toBeGreaterThanOrEqual(100);
        expect(words, section.heading).toBeLessThanOrEqual(180);
      }
    });

    it(`${slug}: prices come from lib/pricing.ts and no unpublished claim appears`, () => {
      const text = JSON.stringify(page);
      expect(text).toContain(usd(SHORT_FORM.weekly[0].pricePerWeek));
      expect(text).toContain(usd(SHORT_FORM.weekly[1].pricePerWeek));
      expect(text).toContain(fromPrice("arranque"));
      expect(text).toContain(fromPrice("presencia-local"));
      expect(text).toContain(fromPrice("crecimiento"));
      expect(text).not.toMatch(BANNED);
    });
  }

  it("gimnasios: the fitness portfolio is described as web work, not video", () => {
    const text = JSON.stringify(
      spanishNichePages.find((p) => p.slug === "marketing-de-video-para-gimnasios-miami"),
    );
    expect(text).toContain("](/es/portafolio/gains-from-geebs)");
    expect(text).toMatch(/no (es|son) (un )?video/i);
  });
});
