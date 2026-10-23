import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { AUDIENCE_LANES } from "@/lib/audience-lanes";

/**
 * AUDIENCE_LANES is the shared lane data behind the ONE chooser on the home
 * page, `components/home-project-path.tsx` (`<RailSegmented>` + the lane
 * card beneath it). It used to also back a second, duplicate chooser
 * (`AudienceRouter`, inside the KeepReading fold) that rendered the exact
 * same three lanes with the exact same artwork — removed 2026-10-12: the
 * visible chooser became animated in PR #388, so the fold copy had no
 * reason to exist. These tests keep guarding the DATA, since
 * `home-project-path.tsx` is still the only consumer and a bad lane there
 * is now a single point of failure instead of two.
 */

const source = (p: string) => readFileSync(join(process.cwd(), p), "utf8");
const HOMES = ["app/(english)/page.tsx", "app/(spanish)/es/page.tsx"] as const;

describe("audience lanes — the one chooser on both home pages", () => {
  it.each(HOMES)("%s renders the chooser before the reading-path fold", (page) => {
    const src = source(page);
    const path = src.indexOf("<HomeProjectPath");
    const fold = src.indexOf("<KeepReading");
    expect(path).toBeGreaterThan(-1);
    expect(src).not.toContain("<AudienceRouter");
    if (fold > -1) expect(path).toBeLessThan(fold);
    const component = source("components/home-project-path.tsx");
    expect(component).toContain("routeDefinitions");
    expect(component).toContain('id: "production"');
    expect(component).toContain('id: "local-business"');
    expect(component).toContain("em-route-card");
  });

  it.each(HOMES)("%s never ships the removed duplicate fold chooser", (page) => {
    expect(source(page)).not.toContain("audience-router");
  });
});

describe("audience router — the lanes point at pages that exist and earn", () => {
  it("every lane target is a real route in this repo", () => {
    for (const [locale, copy] of Object.entries(AUDIENCE_LANES)) {
      for (const lane of copy.lanes) {
        // A chooser that 404s is worse than no chooser.
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

describe("home-project-path — the AudienceVideo and EditingPreview it inherited", () => {
  it("still renders the business lane's real project video and the editing lane's live preview", () => {
    const component = source("components/home-project-path.tsx");
    expect(component).toContain("AudienceVideo");
    expect(component).toContain("EditingPreview");
    expect(component).toContain('data-section="home-project-path"');
  });
});
