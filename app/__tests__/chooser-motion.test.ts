import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// The illustration's depth layer lives in an overflow:hidden scene, so any
// scale below 1 exposes the backing colour (measured 10px on the capture).
// The record dot must pass through >=3 opacity levels, not flash between two.
// Filmed at 88 frames over HTTP; this guards the source against regressing.
const css = readFileSync(new URL("../illustrated-commercial.css", import.meta.url), "utf8");
const keyframes = (name: string) => css.match(new RegExp(`@keyframes ${name}\\{(.*)\\}\\n`))?.[1] ?? "";

describe("chooser illustration motion", () => {
  it("never scales the depth layer below 1 (no exposed edge)", () => {
    for (const name of ["em-art-breathe", "em-art-capture"]) {
      const scales = [...keyframes(name).matchAll(/scale\(([\d.]+)\)/g)].map((m) => Number(m[1]));
      expect(scales.length).toBeGreaterThan(0);
      expect(Math.min(...scales)).toBeGreaterThanOrEqual(1);
    }
  });
  it("record dot blinks through at least three opacity levels", () => {
    const levels = new Set([...keyframes("em-art-blink").matchAll(/opacity:([\d.]+)/g)].map((m) => m[1]));
    expect(levels.size).toBeGreaterThanOrEqual(3);
  });
  it("keeps the filmstrip parked and the dot lit under reduced motion", () => {
    const rm = css.slice(css.indexOf("@media(prefers-reduced-motion:reduce)"));
    expect(rm).toContain("em-art-film b{animation:none;left:75%}");
    expect(rm).toContain("em-art-record{animation:none;opacity:1}");
  });
});
