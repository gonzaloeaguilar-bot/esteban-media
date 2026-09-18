import { readdirSync, readFileSync } from "node:fs";
import { extname, join, relative } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * The hero headline used to be a fixed Tailwind step — `text-5xl leading-none`
 * — which renders 48px on a 375px phone. That wrapped the headline to five
 * lines (240px) and pushed the primary call to action to y=717 on a 667px
 * screen: measured on production, fifty pixels below the fold, on 60 of the
 * 149 routes that carry a hero CTA.
 *
 * The fix is a fluid `.em-display`, in the rail kit's own grammar. These tests
 * guard the mechanism, not the pixel: a fixed step must never come back, and
 * the mobile floor must stay small enough that a long headline still leaves
 * room for the button. The fold itself is measured in a real browser — a
 * jsdom test cannot lay out text, and pretending otherwise would be decoration.
 */

const root = process.cwd();
const sourceRoots = ["app", "components", "lib"];
const sourceExtensions = new Set([".ts", ".tsx"]);
const FIXED_STEP = /text-5xl\s+leading-none/;

function sourceFiles(path: string): string[] {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const absolute = join(path, entry.name);
    if (entry.isDirectory()) {
      return entry.name === "__tests__" ? [] : sourceFiles(absolute);
    }
    return sourceExtensions.has(extname(entry.name).toLowerCase()) ? [absolute] : [];
  });
}

const globals = readFileSync(join(root, "app/globals.css"), "utf8");

function displayRule(selector: string): string {
  const match = globals.match(new RegExp(`\\${selector}\\s*\\{([^}]*)\\}`));
  if (!match) throw new Error(`${selector} is not defined in app/globals.css`);
  return match[1];
}

function clampFloorPx(rule: string): number {
  const match = rule.match(/font-size:\s*clamp\(\s*(\d+(?:\.\d+)?)px/);
  if (!match) throw new Error(`rule has no clamp() font-size: ${rule.trim()}`);
  return Number(match[1]);
}

function clampCeilingPx(rule: string): number {
  const match = rule.match(/font-size:\s*clamp\([^)]*?,\s*(\d+(?:\.\d+)?)px\s*\)/);
  if (!match) throw new Error(`rule has no clamp() ceiling: ${rule.trim()}`);
  return Number(match[1]);
}

describe("hero display type", () => {
  it("no source file reintroduces the fixed 48px hero step", () => {
    const offenders = sourceFiles(join(root, sourceRoots[0]))
      .concat(sourceFiles(join(root, sourceRoots[1])))
      .concat(sourceFiles(join(root, sourceRoots[2])))
      .filter((file) => FIXED_STEP.test(readFileSync(file, "utf8")))
      .map((file) => relative(root, file));

    expect(offenders).toEqual([]);
  });

  it("the phone floor stays small enough to leave room for the button", () => {
    // 48px was the defect. Anything at or above 40px puts a five-line headline
    // back over 190px and the CTA back under the fold.
    expect(clampFloorPx(displayRule(".em-display"))).toBeLessThanOrEqual(36);
    expect(clampFloorPx(displayRule(".em-display--xl"))).toBeLessThanOrEqual(36);
  });

  it("the desktop ceiling is unchanged from the steps it replaced", () => {
    // sm:text-6xl was 60px and sm:text-7xl was 72px. Desktop must not move.
    expect(clampCeilingPx(displayRule(".em-display"))).toBe(60);
    expect(clampCeilingPx(displayRule(".em-display--xl"))).toBe(72);
  });

  it("no headline carries a 48px-or-larger fixed step as its phone size", () => {
    // The defect is the UNPREFIXED step: that is what a phone renders.
    // `sm:text-6xl` is fine, `text-6xl` is not.
    const tooBigOnPhone = /(?:^|\s)text-(?:5|6|7|8|9)xl(?:\s|$)/;
    const offenders = sourceFiles(join(root, "components"))
      .concat(sourceFiles(join(root, "app")))
      .flatMap((file) => {
        const source = readFileSync(file, "utf8");
        return [...source.matchAll(/<h1\s+className="([^"]*)"/g)]
          .map((match) => ({ file: relative(root, file), classes: match[1] }));
      })
      .filter((hero) => tooBigOnPhone.test(hero.classes));

    expect(offenders).toEqual([]);
  });

  // Negative controls: a checker that cannot fail is decoration.
  it("catches a reintroduced fixed step", () => {
    expect(FIXED_STEP.test('className="mt-4 font-serif text-5xl leading-none sm:text-6xl"')).toBe(true);
  });

  it("catches a floor that drifts back up", () => {
    expect(clampFloorPx("font-size: clamp(48px, 9.375vw, 60px);")).toBe(48);
    expect(48).toBeGreaterThan(36);
  });

  it("catches a ceiling that changes desktop", () => {
    expect(clampCeilingPx("font-size: clamp(32px, 9.375vw, 48px);")).toBe(48);
  });

  it("catches an oversized phone step while allowing a prefixed one", () => {
    const tooBigOnPhone = /(?:^|\s)text-(?:5|6|7|8|9)xl(?:\s|$)/;
    expect(tooBigOnPhone.test("mt-4 font-serif text-5xl sm:text-6xl")).toBe(true);
    expect(tooBigOnPhone.test("mt-4 font-serif em-display sm:text-6xl")).toBe(false);
    expect(tooBigOnPhone.test("mt-4 font-serif text-4xl sm:text-5xl")).toBe(false);
  });

  it("throws when the class is missing entirely", () => {
    expect(() => displayRule(".em-display-that-does-not-exist")).toThrow();
  });
});
