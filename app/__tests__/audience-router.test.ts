import { readFileSync } from "node:fs";
import { join } from "node:path";
import { existsSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { AUDIENCE_LANES } from "@/lib/audience-lanes";

/**
 * The audience router closes a measured conversion leak.
 *
 * GA4, 30 days to 2026-09-30: 36 sessions arrived from Facebook and Instagram and
 * EVERY ONE landed on "/". All three of the site's form starts in that window came
 * from m.facebook.com. Meanwhile the only contact click came from
 * /es/reels-para-negocios-miami, and the 4th-biggest landing page was
 * /es/guias/ideas-de-reels-para-agentes-de-bienes-raices with ONE search
 * impression — social traffic again.
 *
 * The converting pages existed. `grep` for all four slugs in either home page
 * returned 0. Social sent people who wanted those pages to a homepage that did
 * not mention them.
 */

const source = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const HOMES = ["app/(english)/page.tsx", "app/(spanish)/es/page.tsx"] as const;

describe("audience router — on both home pages, above the fold", () => {
  it.each(HOMES)("%s renders it", (page) => {
    expect(source(page)).toContain("<AudienceRouter");
  });

  it.each(HOMES)("%s puts it OUTSIDE the reading-path fold", (page) => {
    const src = source(page);
    const router = src.indexOf("<AudienceRouter");
    const fold = src.indexOf("<KeepReading");
    expect(router).toBeGreaterThan(-1);
    // Social traffic must not need a click to find its lane. If the router ever
    // moves inside the fold this goes red.
    if (fold > -1) expect(router).toBeLessThan(fold);
  });

  it.each(HOMES)("%s places it right after the hero, before the packages", (page) => {
    const src = source(page);
    const hero = src.indexOf("<HeroVideo");
    const router = src.indexOf("<AudienceRouter");
    const packages = src.indexOf("<PackagesSection");
    expect(hero).toBeLessThan(router);
    if (packages > -1) expect(router).toBeLessThan(packages);
  });
});

describe("audience router — the lanes point at pages that exist and earn", () => {
  it("every lane target is a real route in this repo", () => {
    for (const [locale, copy] of Object.entries(AUDIENCE_LANES)) {
      for (const lane of copy.lanes) {
        // A router that 404s is worse than no router.
        const guide = lane.href.match(/^\/(?:es\/guias|guides)\/([a-z0-9-]+)$/);
        if (guide) {
          expect(
            source("lib/guides.ts").includes(`slug: "${guide[1]}"`),
            `${locale} ${lane.href}: no guide with that slug`,
          ).toBe(true);
          continue;
        }
        const dirs = [
          `app/(english)${lane.href}/page.tsx`,
          `app/(spanish)${lane.href}/page.tsx`,
          `app${lane.href}/page.tsx`,
        ];
        expect(
          dirs.some((d) => existsSync(join(process.cwd(), d))),
          `${locale} ${lane.href}: no page.tsx found`,
        ).toBe(true);
      }
    }
  });

  it("sends the Spanish lanes to Spanish pages", () => {
    // The converting pages are the Spanish ones; routing a Spanish visitor to an
    // English page throws away the reason they converted.
    for (const lane of AUDIENCE_LANES.es.lanes) {
      expect(lane.href.startsWith("/es/"), `${lane.id} -> ${lane.href}`).toBe(true);
    }
  });

  it("leads with real estate, which is what the evidence says", () => {
    for (const copy of Object.values(AUDIENCE_LANES)) {
      expect(copy.lanes[0].id).toBe("real-estate");
      // Agency last: it is a white-label buyer, and the original outreach run's
      // only deliverable contacts were agencies, i.e. competitors.
      expect(copy.lanes[copy.lanes.length - 1].id).toBe("agency");
    }
  });

  it("gives every lane a distinct id and destination per locale", () => {
    for (const [locale, copy] of Object.entries(AUDIENCE_LANES)) {
      const ids = copy.lanes.map((l) => l.id);
      const hrefs = copy.lanes.map((l) => l.href);
      expect(new Set(ids).size, locale).toBe(ids.length);
      expect(new Set(hrefs).size, locale).toBe(hrefs.length);
    }
  });
});

describe("audience router — measurable, or it cannot be judged in 28 days", () => {
  it("carries the section and per-lane click attributes track.js reads", () => {
    const src = source("components/audience-router.tsx");
    expect(src).toContain('data-section="audience-router"');
    expect(src).toMatch(/data-cta=\{`audience-\$\{lane\.id\}`\}/);
    // Never a hand-written gtag call — that double-counted once already.
    expect(src).not.toMatch(/gtag\(|dataLayer\.push/);
  });
});
