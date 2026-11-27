import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { describe, expect, it } from "vitest";

import { getGuides } from "@/lib/guides";
import { buildLlmsTxt } from "@/lib/llms-txt";
import {
  CREW_RECORDING_RATES,
  FILMING_RATES,
  ON_LOCATION_CAPTURE,
  PRICING_BANDS,
  RAW_FILMING_RATES,
  filmingPriceShortText,
  filmingPriceText,
  filmingQuote,
  usd,
} from "@/lib/pricing";
import { spanishNichePages } from "@/lib/spanish-site";

/**
 * Filming price change, owner decision 2026-11-26 ("Ok hazlo" to $500 / $900 / $150).
 *
 * ONE filming-only price structure on the whole site:
 *   half day (up to 4 hours) $500, full day (up to 8 hours) $900, extra hour $150.
 * It replaced two contradicting structures: the event pages' "$400 half day /
 * $700 full day" and the "$125 per hour, 4-hour minimum" copy. This file fails
 * if either old structure reappears in source or in rendered copy.
 */

const ROOT = process.cwd();

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "__tests__" || name === "node_modules") continue;
      walk(p, out);
    } else if (/\.(ts|tsx|txt|mjs)$/.test(name)) out.push(p);
  }
  return out;
}

const SOURCES = ["app", "lib", "components"].flatMap((d) => walk(join(ROOT, d)));

// Old filming copy, in any phrasing we have shipped. "$125 per hour",
// "$125/hr", "125 por hora", "$400 half-day", "$700 full day", "4-hour minimum".
const OLD_FILMING = [
  /\$125\b/,
  /usd\(125\)/,
  /\b125\s*(\/\s*h|per hour|an hour|por hora|la hora)/i,
  /\$400[^\n]{0,40}(half|medi[oa])/i,
  /\$700[^\n]{0,40}(full|complet)/i,
  /(4|four)-hour minimum/i,
  /m[ií]nimo de (4|cuatro) horas/i,
  /per hour of filming|por hora de grabaci[oó]n/i,
];

describe("filming price 2026-11-26: one structure, $500 / $900 / $150", () => {
  it("lib/pricing.ts holds the owner figures and every alias reads from them", () => {
    expect(FILMING_RATES).toMatchObject({ halfDay: 500, halfDayHours: 4, fullDay: 900, fullDayHours: 8, extraHour: 150 });
    expect(RAW_FILMING_RATES.halfDay).toBe(FILMING_RATES.halfDay);
    expect(RAW_FILMING_RATES.fullDay).toBe(FILMING_RATES.fullDay);
    expect(RAW_FILMING_RATES.extraHour).toBe(FILMING_RATES.extraHour);
    expect(CREW_RECORDING_RATES.solo.halfDay).toBe(FILMING_RATES.halfDay);
    expect(CREW_RECORDING_RATES.solo.fullDay).toBe(FILMING_RATES.fullDay);
    expect(CREW_RECORDING_RATES.solo.extraHour).toBe(FILMING_RATES.extraHour);
    expect("hourly" in CREW_RECORDING_RATES.solo).toBe(false);
    expect(ON_LOCATION_CAPTURE.from).toBe(FILMING_RATES.halfDay);
    expect(PRICING_BANDS["on-location"].baseMin).toBe(FILMING_RATES.halfDay);
    expect(PRICING_BANDS["on-location"].baseMax).toBe(FILMING_RATES.fullDay);
  });

  it("prices hours on the half day, extra hours and the full-day cap", () => {
    expect(filmingQuote(2)).toBe(500);
    expect(filmingQuote(4)).toBe(500);
    expect(filmingQuote(5)).toBe(650);
    expect(filmingQuote(6)).toBe(800);
    expect(filmingQuote(7)).toBe(900);
    expect(filmingQuote(8)).toBe(900);
    expect(filmingQuote(9)).toBe(1050);
  });

  it("the phrases name all three figures (full) or both day rates (short)", () => {
    for (const locale of ["en", "es"] as const) {
      for (const f of [FILMING_RATES.halfDay, FILMING_RATES.fullDay, FILMING_RATES.extraHour]) {
        expect(filmingPriceText(locale)).toContain(usd(f));
      }
      expect(filmingPriceShortText(locale)).toContain(usd(FILMING_RATES.halfDay));
      expect(filmingPriceShortText(locale)).toContain(usd(FILMING_RATES.fullDay));
    }
  });

  it("no source file carries the old $125-per-hour or $400/$700 filming copy", () => {
    const hits: string[] = [];
    for (const file of SOURCES) {
      const rel = relative(ROOT, file);
      const lines = readFileSync(file, "utf8").split("\n");
      lines.forEach((line, i) => {
        const t = line.trimStart();
        if (t.startsWith("//") || t.startsWith("*") || t.startsWith("/*")) return;
        for (const re of OLD_FILMING) if (re.test(line)) hits.push(`${rel}:${i + 1} ${re}`);
      });
    }
    expect(hits).toEqual([]);
  });

  it("rendered copy (guides, Spanish pages, llms.txt) never shows the old filming prices", () => {
    const rendered = [
      JSON.stringify(getGuides("en")),
      JSON.stringify(getGuides("es")),
      JSON.stringify(spanishNichePages),
      buildLlmsTxt(),
    ].join("\n");
    for (const re of OLD_FILMING) expect(rendered, String(re)).not.toMatch(re);
    // No double-quoted "${...}" leaked to the page as literal text.
    expect(rendered).not.toMatch(/\$\{(usd|RAW_FILMING_RATES|ARRANQUE_WEEKLY_OPTIONS|SHORT_FORM)/);
    expect(rendered).toContain(usd(FILMING_RATES.extraHour));
  });

  it("the Spanish 'cuánto cobra un videógrafo' page opens on $500 / $900 / $150 and keeps weddings", () => {
    const page = spanishNichePages.find((p) => p.slug === "cuanto-cobra-un-videografo-en-miami")!;
    const first = page.lead.split(";")[0];
    expect(first).toContain(usd(FILMING_RATES.halfDay));
    expect(first).toContain(usd(FILMING_RATES.fullDay));
    expect(first).toContain(usd(FILMING_RATES.extraHour));
    expect(page.lead).toContain("$2,500");
  });

  it("the client catalog shows the new solo filming figures, not $125 / $1,000", () => {
    const html = readFileSync(join(ROOT, "public/deliverables/esteban-moreno-media-catalogo-2026.html"), "utf8");
    expect(html).not.toContain(">$125<");
    expect(html).toContain(">$150</span><span class=\"price-sub\">/ hora adicional");
    expect(html).toContain(">$900</span><span class=\"price-sub\">día completo (8h)");
  });
});
