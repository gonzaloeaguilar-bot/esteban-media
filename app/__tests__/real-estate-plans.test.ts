import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
} from "@/lib/pricing";
import {
  realEstatePlansCopy,
  realEstateTerms,
} from "@/lib/real-estate-plans";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

/**
 * The monthly plans are owner-set figures from the 2026-09-30 Real Estate
 * guide. These tests pin them to that guide and keep the section from
 * growing a second copy of any figure.
 */
describe("real estate monthly plans", () => {
  it("matches the published guide", () => {
    expect(
      REAL_ESTATE_PLANS.map((p) => [p.id, p.price, p.properties, p.productionDays, p.drone, p.postsPerWeek]),
    ).toEqual([
      ["essential", 450, 1, 2, "add-on", "2"],
      ["plus", 700, 2, 3, "add-on", "3–4"],
      ["premium", 1250, 3, 3, "included", "5"],
    ]);
    expect(REAL_ESTATE_PLAN_TERMS.minimumMonths).toBe(3);
    expect(REAL_ESTATE_PLAN_TERMS.cancelNoticeDays).toBe(30);
  });

  it("reads the terms' figures from lib/pricing.ts in both languages", () => {
    for (const locale of ["en", "es"] as const) {
      const terms = realEstateTerms(locale).join(" ");
      expect(terms).toContain("3");
      expect(terms).toContain("30");
      expect(terms).not.toContain("{");
    }
  });

  it("has a full Spanish and English copy set", () => {
    const en = realEstatePlansCopy("en");
    const es = realEstatePlansCopy("es");
    expect(Object.keys(es.rows)).toEqual(Object.keys(en.rows));
    expect(es.everyPlan.items).toHaveLength(en.everyPlan.items.length);
  });

  it("never inlines a price figure in the component or the copy", () => {
    for (const path of ["components/needs-chooser.tsx", "lib/needs-doors.ts", "lib/real-estate-plans.ts"]) {
      const text = source(path);
      expect(text).not.toMatch(/\$\d/);
      for (const n of ["450", "700", "1250", "1,250"]) expect(text).not.toContain(n);
    }
  });

  it("is rendered by the packages section on every page that shows packages", () => {
    // Behind the first, highlighted door of the needs chooser (2026-10-08).
    expect(source("components/packages-section.tsx")).toContain("<NeedsChooser locale={locale} />");
    const chooser = source("components/needs-chooser.tsx");
    expect(chooser).toContain('door.id === "real-estate" && <RealEstatePanel');
    expect(chooser).toContain("realEstatePlans().map(");
  });
});
