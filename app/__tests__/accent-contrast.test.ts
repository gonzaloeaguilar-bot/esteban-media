import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The accent is split in two because a single brand red cannot both sit behind
 * light type and BE type on cream. Measured 2026-09-28, before the split:
 *
 *   light text on the primary button   4.18:1   (AA needs 4.5)
 *   red text on cream                  4.37:1
 *   peach on red                       2.57:1
 *
 * The literal #c84a2c had been pasted into 364 places, so nothing stopped the
 * next paste from reintroducing the failure. This test is what stops it: the
 * tokens are read out of the stylesheet, so a change to either value has to keep
 * passing here, and any new TEXT use has to go through the token.
 */

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

function token(name: string): string {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`token --${name} is not defined in app/globals.css`);
  return match[1];
}

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function ratio(a: string, b: string): number {
  const [la, lb] = [luminance(a), luminance(b)];
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const CREAM = "#fbf6ef";
const LIGHT_TEXT = "#f6f1ea";
const AA = 4.5;

describe("accent contrast", () => {
  it("carries body text on cream at AA", () => {
    expect(ratio(token("em-accent-ink"), CREAM)).toBeGreaterThanOrEqual(AA);
  });

  it("carries light text on the primary button at AA", () => {
    expect(ratio(LIGHT_TEXT, token("em-accent-ink"))).toBeGreaterThanOrEqual(AA);
  });

  it("keeps the hover state readable AND visibly different from the resting state", () => {
    const ink = token("em-accent-ink");
    const hover = token("em-accent-ink-hover");
    expect(ratio(LIGHT_TEXT, hover)).toBeGreaterThanOrEqual(AA);
    // At the old #a93e29 the hover sat 0.8 luminance units from the ink, which
    // is a state change nobody can see. Demand a real step.
    expect(Math.abs(luminance(hover) - luminance(ink)) * 100).toBeGreaterThan(2);
  });

  it("negative control: the retired single accent really did fail", () => {
    expect(ratio(LIGHT_TEXT, "#c84a2c")).toBeLessThan(AA);
    expect(ratio("#c84a2c", CREAM)).toBeLessThan(AA);
  });

  it("no component paints TEXT with the raw brand red any more", () => {
    // Surfaces and borders may keep it: their threshold is 3:1 and they pass.
    const walk = (dir: string): string[] =>
      readdirSync(join(process.cwd(), dir), { withFileTypes: true }).flatMap((entry) => {
        if (entry.name === "vendor" || entry.name === "node_modules") return [];
        const rel = `${dir}/${entry.name}`;
        if (entry.isDirectory()) return walk(rel);
        return entry.name.endsWith(".tsx") ? [rel] : [];
      });
    const files = [...walk("app"), ...walk("components")];
    // The walk has to actually find the tree, or this assertion is vacuous.
    expect(files.length).toBeGreaterThan(100);
    const offenders = files.filter((f) =>
      readFileSync(join(process.cwd(), f), "utf8").includes("text-[#c84a2c]"),
    );
    expect(offenders).toEqual([]);
  });
});
