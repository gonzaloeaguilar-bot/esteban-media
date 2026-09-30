import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The interactive tools are the closest thing this site has to a product: a
 * budget estimator, a strategy assessment, a brief builder, a script kit and a
 * footage checklist. Measured 2026-09-29, none of them carried a `data-section`.
 *
 * That did not mean their clicks were lost — public/track.js catches any
 * `a, button, [role=button]` — it meant they were UNATTRIBUTABLE. `sectionOf()`
 * walks up looking for `data-section`, falls back to the nearest `<section>`,
 * and otherwise reports the literal string "page". Five of the eight tools had
 * neither, so every interaction inside them landed in one bucket shared with
 * every other click on the page, and no report could say which tool produced it.
 *
 * Verified by replicating track.js's own walk in a browser: a click inside the
 * estimator resolved to "page" before, and to "video_budget_estimator" after.
 */

const TOOLS: [string, string][] = [
  ["components/video-budget-estimator.tsx", "video_budget_estimator"],
  ["components/video-strategy-assessment.tsx", "video_strategy_assessment"],
  ["components/video-brief-builder.tsx", "video_brief_builder"],
  ["components/script-and-overlay-kit.tsx", "script_and_overlay_kit"],
  ["components/footage-handoff-checklist.tsx", "footage_handoff_checklist"],
];

const source = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("tool analytics", () => {
  it("gives every interactive tool its own attributable section", () => {
    for (const [file, section] of TOOLS) {
      expect(source(file)).toContain(`data-section="${section}"`);
    }
  });

  it("puts the marker on the tool's ROOT, not on an inner block", () => {
    // track.js walks UP from the clicked element. A marker on an inner div
    // attributes some clicks and silently drops the rest.
    for (const [file, section] of TOOLS) {
      const text = source(file);
      // Exact, not "near": a first version compared character distance and
      // happily passed with the marker moved to an inner block — a guard that
      // could not go red for the thing it claimed to check.
      expect(text).toMatch(
        new RegExp(`return \\(\\s*\\n\\s*<div data-section="${section}"`),
      );
    }
  });

  it("names each tool differently, or the buckets merge again", () => {
    const names = TOOLS.map(([, section]) => section);
    expect(new Set(names).size).toBe(names.length);
  });

  it("uses the contract's snake_case, not a hand-rolled label", () => {
    for (const [, section] of TOOLS) {
      expect(section).toMatch(/^[a-z][a-z0-9_]*$/);
    }
  });
});
