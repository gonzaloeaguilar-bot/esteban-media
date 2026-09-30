import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

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

  it("keeps a client's negotiated rates out of a PUBLIC repository", () => {
    const files = [...sourceFiles("lib"), ...sourceFiles("app"), ...sourceFiles("components")]
      // Two files name the forbidden figures ON PURPOSE, because naming them is
      // the only way to prove they get caught: this test, and the one that
      // exercises the gate reviewing Esteban's pushes. Exempting a file for any
      // other reason is how this guard quietly stops guarding.
      .filter((f) => !f.endsWith("services-config.test.ts"))
      .filter((f) => !f.endsWith("esteban-qa.test.ts"));
    const offenders: string[] = [];
    for (const file of files) {
      const text = readFileSync(join(process.cwd(), file), "utf8");
      // Three of five rungs together is the card, not a coincidence.
      if (ladderHits(text, PREFERRED_PHOTO_LADDER) >= 3) offenders.push(`${file} -> preferred photo ladder`);
      if (ladderHits(text, MONTHLY_SURCHARGE_LADDER) >= 3) offenders.push(`${file} -> monthly surcharge ladder`);
      if (MONTHLY_PACKAGE.test(text)) offenders.push(`${file} -> the $500/month package`);
      for (const name of CLIENT_NAMES) if (name.test(text)) offenders.push(`${file} -> client name`);
    }
    expect(offenders).toEqual([]);
  });
});
