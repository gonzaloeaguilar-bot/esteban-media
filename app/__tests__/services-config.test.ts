import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { CREW_RECORDING_RATES, FILMING_RATES, PRODUCT_PHOTO_MARKET } from "@/lib/pricing";
import {
  REAL_ESTATE_MEDIA,
  listingPhotographyPrice,
} from "@/lib/services-config";

/**
 * Esteban sent three rate cards in September 2026. ONE is the public card; the
 * other two are a specific client's negotiated terms — a $500/month package
 * prepared for a named agency, and a preferred-rate card for his first client.
 *
 * This repository became PUBLIC on 2026-09-29. A negotiated rate committed here
 * would publish that client's commercial terms to anyone who looks, and would
 * undercut the public card at the same time. So the client figures live in the
 * private vault and this test is the thing that keeps them out.
 */

/**
 * A bare figure is the wrong thing to search for: `500` and `300` already appear
 * in lib/pricing.ts as PUBLISHED MARKET BANDS ("market $500-2,500 per explainer"),
 * which have nothing to do with any client. A first version of this test flagged
 * them and would have been switched off as noise — the same substring trap that
 * sent a b-roll guide to a pricing illustration earlier the same day.
 *
 * What actually identifies the private cards is the LADDER as a set, and the
 * client's name. Those cannot appear by coincidence.
 */
const PREFERRED_PHOTO_LADDER = [150, 190, 225, 300, 375];
const MONTHLY_SURCHARGE_LADDER = [35, 110, 185];
const CLIENT_NAMES = [/dupont\s+real\s+stat|dupont\s+real\s+estate/i];
const MONTHLY_PACKAGE = /\$?500\s*\/\s*(month|mes)/i;

/** How many of a ladder's figures appear price-shaped in one file. */
function ladderHits(text: string, ladder: number[]): number {
  return ladder.filter((n) => new RegExp(`\\$${n}\\b|amount:\\s*${n}\\b`).test(text)).length;
}

/**
 * The Spanish text-parity fixture is the ONE file whose figures come from many
 * unrelated public pages at once: it stores the visible words of ~200 built
 * /es routes. On 2026-11-26 a full refresh put $150 (es/reels-comerciales-con-
 * ia-miami: lib/pricing.ts bRollPerVideo / filmOrProject), $225 (es/precios:
 * the published hourly rate) and $300 (es/precios and eight more pages: the
 * published "from $300" market floors) in that one file. Three rungs, three
 * public prices, no client card: no single route held more than two.
 *
 * So the ladder is counted per ROUTE inside that file, the unit the private
 * card would actually appear in. Everything else stays whole-file, and the
 * client name and the $500/month package are still searched across the whole
 * fixture. This is narrower than exempting the file: a page that shows three
 * rungs is still caught (see the negative controls below).
 */
const TEXT_PARITY_FIXTURE = "app/__tests__/fixtures/spanish-niche-text-baseline.json";

/**
 * 2026-11-26: the owner set filming at $500 half day / $900 full day / $150 per
 * extra hour. es/precios now shows $150 (extra hour), $225 (multi-camera hour)
 * and $300 (published market floor): three rungs, all three public prices from
 * lib/pricing.ts, no client card. Inside the fixture, a route is therefore
 * flagged only when its three-plus rungs include at least one figure that no
 * published price explains ($190, $375). A leak of the private card still
 * shows those rungs; see the negative controls below.
 */
const PUBLISHED_RUNGS = new Set<number>([
  FILMING_RATES.extraHour,
  CREW_RECORDING_RATES.multiCamera.hourly,
  PRODUCT_PHOTO_MARKET.halfDayMin,
]);

function routeLadderOffenders(label: string, text: string): string[] {
  const hits = PREFERRED_PHOTO_LADDER.filter((n) => new RegExp(`\\$${n}\\b|amount:\\s*${n}\\b`).test(text));
  const out = ladderOffenders(label, text).filter((o) => !o.endsWith("preferred photo ladder"));
  if (hits.length >= 3 && hits.some((n) => !PUBLISHED_RUNGS.has(n))) out.push(`${label} -> preferred photo ladder`);
  return out;
}

function ladderOffenders(label: string, text: string): string[] {
  const out: string[] = [];
  // Three of five rungs together is the card, not a coincidence.
  if (ladderHits(text, PREFERRED_PHOTO_LADDER) >= 3) out.push(`${label} -> preferred photo ladder`);
  if (ladderHits(text, MONTHLY_SURCHARGE_LADDER) >= 3) out.push(`${label} -> monthly surcharge ladder`);
  return out;
}

function rateCardOffenders(file: string, text: string): string[] {
  const offenders: string[] = [];
  let perRoute: Record<string, unknown> | null = null;
  if (file === TEXT_PARITY_FIXTURE) {
    try {
      const parsed: unknown = JSON.parse(text);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        perRoute = parsed as Record<string, unknown>;
      }
    } catch {
      perRoute = null; // unparseable: judge it whole, fail closed
    }
  }
  if (perRoute) {
    for (const [route, entry] of Object.entries(perRoute)) {
      offenders.push(...routeLadderOffenders(`${file} [${route}]`, JSON.stringify(entry)));
    }
  } else {
    offenders.push(...ladderOffenders(file, text));
  }
  if (MONTHLY_PACKAGE.test(text)) offenders.push(`${file} -> the $500/month package`);
  for (const name of CLIENT_NAMES) if (name.test(text)) offenders.push(`${file} -> client name`);
  return offenders;
}

function sourceFiles(dir: string): string[] {
  return readdirSync(join(process.cwd(), dir), { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === "node_modules" || entry.name === "vendor") return [];
    const rel = `${dir}/${entry.name}`;
    if (entry.isDirectory()) return sourceFiles(rel);
    return /\.(ts|tsx|mjs|json|md)$/.test(entry.name) ? [rel] : [];
  });
}

describe("services config", () => {
  it("publishes the public card's figures exactly", () => {
    expect(REAL_ESTATE_MEDIA.photography.map((t) => t.amount)).toEqual([
      199, 249, 299, 399, 499, null,
    ]);
    expect(REAL_ESTATE_MEDIA.addOns.map((a) => a.amount)).toEqual([99, 149, 200]);
    expect(REAL_ESTATE_MEDIA.fees.map((f) => f.amount)).toEqual([75, 100]);
  });

  it("never invents a price for the size Esteban quotes individually", () => {
    const biggest = REAL_ESTATE_MEDIA.photography.at(-1)!;
    expect(biggest.maxSf).toBeNull();
    expect(biggest.amount).toBeNull();
    expect(listingPhotographyPrice(12000)).toBeNull();
  });

  it("prices every size in the table, and refuses a size it does not cover", () => {
    expect(listingPhotographyPrice(1)).toBe(199);
    expect(listingPhotographyPrice(1500)).toBe(199);
    expect(listingPhotographyPrice(1501)).toBe(249);
    expect(listingPhotographyPrice(8000)).toBe(499);
    // A gap would silently return undefined and render as a free shoot.
    expect(() => listingPhotographyPrice(-1)).toThrow();
  });

  it("leaves no gap or overlap between size tiers", () => {
    const tiers = REAL_ESTATE_MEDIA.photography;
    for (let i = 1; i < tiers.length; i += 1) {
      expect(tiers[i].minSf).toBe((tiers[i - 1].maxSf as number) + 1);
    }
  });

  it("inside the parity fixture, ignores three PUBLISHED rungs but still flags a private one", () => {
    const fx = (words: string) => JSON.stringify({ "es/x.html": { words } });
    expect(rateCardOffenders(TEXT_PARITY_FIXTURE, fx("$150 $225 $300"))).toEqual([]);
    expect(rateCardOffenders(TEXT_PARITY_FIXTURE, fx("$150 $190 $225"))).toEqual([
      `${TEXT_PARITY_FIXTURE} [es/x.html] -> preferred photo ladder`,
    ]);
    expect(rateCardOffenders(TEXT_PARITY_FIXTURE, fx("$150 $300 $375"))).toHaveLength(1);
    // Outside the fixture the whole-file rule is unchanged.
    expect(rateCardOffenders("lib/x.ts", "$150 $225 $300")).toEqual(["lib/x.ts -> preferred photo ladder"]);
  });

  it("keeps a client's negotiated rates out of a PUBLIC repository", () => {
    const files = [...sourceFiles("lib"), ...sourceFiles("app"), ...sourceFiles("components")]
      // Two files name the forbidden figures ON PURPOSE, because naming them is
      // the only way to prove they get caught: this test, and the one that
      // exercises the gate reviewing Esteban's pushes. Exempting a file for any
      // other reason is how this guard quietly stops guarding.
      .filter((f) => !f.endsWith("services-config.test.ts"))
      .filter((f) => !f.endsWith("esteban-qa.test.ts"));
    const offenders = files.flatMap((file) =>
      rateCardOffenders(file, readFileSync(join(process.cwd(), file), "utf8")),
    );
    expect(offenders).toEqual([]);
  });

  describe("the text-parity fixture is judged one page at a time", () => {
    // Negative controls: the per-page reading must still catch the card.
    const fixture = (routes: Record<string, string>) =>
      JSON.stringify(
        Object.fromEntries(Object.entries(routes).map(([r, words]) => [r, { words }])),
      );

    it("passes public prices that only meet in the aggregate file", () => {
      // The real 2026-11-26 shape: $150 on one page, $225 and $300 on another.
      const text = fixture({
        "es/reels-comerciales-con-ia-miami.html": "Desde $150 por video",
        "es/precios.html": "$225 por hora · desde $300",
      });
      expect(rateCardOffenders(TEXT_PARITY_FIXTURE, text)).toEqual([]);
      // The same text in any OTHER file is still judged whole, and is caught.
      expect(rateCardOffenders("lib/somewhere.ts", text)).toEqual([
        "lib/somewhere.ts -> preferred photo ladder",
      ]);
    });

    it("still catches the ladder when a single page carries it", () => {
      const text = fixture({
        "es/precios.html": "$150 $190 $225",
        "es/otra.html": "nada",
      });
      expect(rateCardOffenders(TEXT_PARITY_FIXTURE, text)).toEqual([
        `${TEXT_PARITY_FIXTURE} [es/precios.html] -> preferred photo ladder`,
      ]);
    });

    it("still catches the client name and the $500/month package anywhere in the fixture", () => {
      expect(rateCardOffenders(TEXT_PARITY_FIXTURE, fixture({ "es/a.html": "DuPont Real Estate" }))).toEqual([
        `${TEXT_PARITY_FIXTURE} -> client name`,
      ]);
      expect(rateCardOffenders(TEXT_PARITY_FIXTURE, fixture({ "es/a.html": "$500/mes" }))).toEqual([
        `${TEXT_PARITY_FIXTURE} -> the $500/month package`,
      ]);
    });

    it("falls back to judging the whole file if the fixture stops parsing", () => {
      expect(rateCardOffenders(TEXT_PARITY_FIXTURE, "not json $150 $190 $225")).toEqual([
        `${TEXT_PARITY_FIXTURE} -> preferred photo ladder`,
      ]);
    });
  });
});
