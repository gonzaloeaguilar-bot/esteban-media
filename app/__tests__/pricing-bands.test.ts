import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

/**
 * The estimator publishes numbers on a live client site while Esteban has no
 * confirmed price list. These tests pin the bands to their documented basis so
 * a figure cannot drift without someone also updating docs/pricing-basis.md.
 */
describe("budget estimator pricing bands", () => {
  const estimator = source("components/video-budget-estimator.tsx");
  const basis = source("docs/pricing-basis.md");

  const BANDS: Array<[string, number, number]> = [
    ["social", 350, 675],
    ["youtube", 450, 850],
    ["corporate", 725, 1450],
    ["realestate", 575, 1075],
    ["ecommerce", 400, 775],
  ];

  it("uses exactly the documented bands", () => {
    for (const [, min, max] of BANDS) {
      expect(estimator, `expected a baseMin of ${min}`).toMatch(
        new RegExp(`baseMin\\s*[=+]=?\\s*${min}\\b`),
      );
      expect(estimator, `expected a baseMax of ${max}`).toMatch(
        new RegExp(`baseMax\\s*[=+]=?\\s*${max}\\b`),
      );
    }
  });

  it("keeps the on-location capture add-on at the documented figures", () => {
    expect(estimator).toMatch(/baseMin \+= 400;/);
    expect(estimator).toMatch(/baseMax \+= 775;/);
  });

  it("documents a basis for every band that appears in the estimator", () => {
    // The doc writes figures with thousands separators for readability.
    const digits = basis.replace(/,/g, "");
    for (const [, min, max] of BANDS) {
      expect(digits, `docs/pricing-basis.md must cite $${min}`).toContain(String(min));
      expect(digits, `docs/pricing-basis.md must cite $${max}`).toContain(String(max));
    }
  });

  it("states the discount and that output is an estimate, not a quote", () => {
    expect(basis).toMatch(/10%/);
    expect(basis.toLowerCase()).toContain("scoped quote");
  });

  it("records that the full-production-company comparable is deliberately not used", () => {
    // Guards against someone benchmarking against $4,500-20,000 agency pricing
    // and "correcting" the bands upward for the wrong business model.
    expect(estimator).toMatch(/full-production-company/i);
    expect(basis.replace(/,/g, "")).toMatch(/4500/);
  });

  it("keeps the cost guides free of asserted prices", () => {
    const guides = source("lib/guides.ts");
    expect(guides).toContain("no responsible one-price answer");
  });
});
