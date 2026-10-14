import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { DEFINITION_ANSWERS } from "@/lib/definition-answers";
import { eventDatesSentence } from "@/lib/event-content";
import { EVENTS } from "@/lib/events";
import { getGuideBySlug } from "@/lib/guides";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const root = process.cwd();
const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

function tsxFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(join(root, dir), { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      if (entry.name !== "__tests__") out.push(...tsxFiles(path));
    } else if (entry.isFile() && path.endsWith(".tsx")) out.push(path);
  }
  return out;
}

describe("portfolio project facts (no unsourced results)", () => {
  // Round 4 found +220% patient inquiries, +45k impressions, +310% leads,
  // 98.4% accuracy and "100% Five-Star Client Review" under the heading
  // "Measurable outcomes driven for this client." on 24 live pages. None had
  // a source; the summaries say nothing of the kind. A fact chip may only
  // restate what the project's summary or credits already say.
  const PERFORMANCE_CLAIM = /\d\s*%|\b\d+(\.\d+)?x\b|^\+|\b\d+k\b|five-star|5 estrellas|conversion|conversión|increase|incremento|reduction|reducción|accuracy|precisión|festival|premio|honors/i;

  for (const [locale, messages] of [["en", en], ["es", es]] as const) {
    const items = messages.Portfolio.items as Record<string, { results?: { metric: string; label: string }[] }>;
    for (const [id, item] of Object.entries(items)) {
      for (const result of item.results ?? []) {
        it(`${locale} ${id}: "${result.metric}" is a fact, not a performance claim`, () => {
          expect(`${result.metric} ${result.label}`).not.toMatch(PERFORMANCE_CLAIM);
        });
      }
    }
  }

  it("the section no longer promises measurable outcomes", () => {
    const source = readFileSync(join(root, "components/portfolio-watch-page.tsx"), "utf8");
    expect(source).not.toContain("Measurable outcomes");
    expect(source).not.toContain("Impacto medible");
  });
});

describe("one visible Updated date per page", () => {
  // 17 pages printed two different dates: a hand-typed "Updated: October 8,
  // 2026" next to the ledger's PageUpdated line. Only the ledger may print one.
  const HAND_TYPED = /(Updated:?\s*<time|>Updated (January|February|March|April|May|June|July|August|September|October|November|December)|Actualizado:\s*<time)/;

  for (const file of [...tsxFiles("app"), ...tsxFiles("components")]) {
    it(`${file} prints no hand-typed Updated date`, () => {
      expect(readFileSync(join(root, file), "utf8")).not.toMatch(HAND_TYPED);
    });
  }
});

describe("definition-first answers", () => {
  const live = new Set(sitemap().map((entry) => new URL(entry.url).pathname));

  for (const entry of DEFINITION_ANSWERS) {
    it(`${entry.path} answers "${entry.heading}" in one citable section`, () => {
      expect(live.has(entry.path)).toBe(true);
      expect(entry.heading.endsWith("?")).toBe(true);
      const count = words(entry.paragraphs.join(" "));
      expect(count).toBeGreaterThanOrEqual(100);
      expect(count).toBeLessThanOrEqual(180);
    });
  }

  it("short-form definitions quote Starter from lib/pricing.ts", () => {
    const shortForm = DEFINITION_ANSWERS.filter((entry) => /short-form|corto/.test(entry.path));
    expect(shortForm).toHaveLength(2);
    // The figure is interpolated, so the source file never types "$100".
    const source = readFileSync(join(root, "lib/definition-answers.ts"), "utf8");
    expect(source).not.toMatch(/\$\d/);
    expect(source).toContain("shortFormPriceText(");
  });
});

describe("testimonial guide", () => {
  it("defines a video testimonial and gives a usable script, EN and ES", () => {
    const enGuide = getGuideBySlug("en", "customer-testimonial-video-script-template");
    const esGuide = getGuideBySlug("es", "plantilla-de-guion-para-video-testimonial");
    expect(enGuide?.sections[0].heading).toBe("What is a video testimonial?");
    expect(esGuide?.sections[0].heading).toBe("¿Qué es un video testimonial?");
    expect(enGuide?.sections[1].bullets).toHaveLength(6);
    expect(esGuide?.sections[1].bullets).toHaveLength(6);
  });
});

describe("event venues mid-sentence", () => {
  it("keeps a proper-name venue capitalised", () => {
    const now = new Date("2026-10-14T12:00:00Z");
    for (const event of EVENTS) {
      for (const locale of ["en", "es"] as const) {
        expect(eventDatesSentence(event, locale, now)).not.toMatch(/miami Beach/);
      }
    }
  });
});
