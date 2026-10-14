import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * THE BRAND HAS NO GREEN. This is the durability fix, not another hue swap.
 *
 * Green was removed from the chooser on 2026-10-13 as an identity defect
 * (`#e7efea`, a colour appearing nowhere else except Google's verified pill).
 * By 2026-10-14 THREE green surfaces were back in a single day:
 *
 *   .em-single-panel  background:#e7eee6   (two units from the one removed)
 *   .em-carte-preparation background:#e7eee6
 *   .em-funnel-rec[data-done] i  #3f6b4f
 *
 * Each had been fixed by hand and each came back, because nothing stopped it.
 * An art-direction pass put it plainly: "three green surfaces reintroduced in
 * one day; the fix needed is DURABILITY, not hue."
 *
 * So: no green in the stylesheets. A colour is green here if its hue sits in
 * the green band AND it is not effectively neutral — which lets the brand's
 * warm creams and greys through while catching mint, sage and forest.
 */

const CSS_DIR = join(process.cwd(), "app");

const hexes = (css: string): string[] => {
  // Strip comments first: the explanation of WHY green was removed names the
  // colour, and must not trip the rule it documents.
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
  return withoutComments.match(/#[0-9a-fA-F]{6}\b/g) ?? [];
};

const isGreen = (hex: string): boolean => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // A first attempt gated on chroma >= 18 as a "near-neutral" guard. The
  // negative control caught that it let the ACTUAL defect through: the mint
  // #e7eee6 has a chroma of 8, because it is pale, not because it is neutral.
  // A guard tuned by intuition rather than against the real values is how a
  // gate ships that cannot bite.
  //
  // What actually separates this brand from green is simpler: every colour in
  // the palette is red-dominant (the creams, the accent) or blue-dominant
  // (the inks). NONE has green as its leading channel. So green leading, by a
  // margin big enough to not be rounding on a grey, is the whole rule.
  const max = Math.max(r, g, b);
  if (g !== max) return false;
  // Both margins matter. The brand's dark inks (#172322, #293433, #263534)
  // lead green by 11-15 over red but by only ONE over blue — they are
  // near-black with a faint cast, not green surfaces. Requiring a real margin
  // over BLUE too is what separates "a charcoal that happens to be cool" from
  // "a mint".
  return g - r >= 4 && g - b >= 4;
};

describe("no off-brand green in the stylesheets", () => {
  const files = readdirSync(CSS_DIR).filter((f) => f.endsWith(".css"));

  it("finds stylesheets to check (guards against a vacuous pass)", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  /**
   * Depicted artwork is not brand chrome.
   *
   * The defect this test exists for is green UI SURFACES — a mint panel, a
   * green status dot. The illustrations legitimately contain green because
   * they DEPICT things: an editing clip, an audio track, one band of a film
   * colour-bar gradient. A rule that flags those accuses the innocent, and a
   * gate that accuses the innocent gets ignored.
   *
   * Each exception is named with its reason. Adding one is a decision, not a
   * silencer — if a NEW green shows up outside this list, the test fails.
   */
  const DEPICTED_ARTWORK: Record<string, string> = {
    "#346250": "a-la-carte 'create' effect dot — inside the depicted artwork",
    "#759084": "em-edit-clips gradient — a depicted editing clip",
    "#2f7a3a": "cinema.css film colour-bar gradient — depicting SMPTE-style bars",
    "#81b3a7": "em-edit-audio waveform bars — inside the depicted audio track",
    "#7ba18a": "em-art-film frame 2 — one cell of the depicted filmstrip",
    "#213a32": "em-art-flight drop-shadow — depth on the depicted flight path",
  };

  it.each(files)("%s contains no green UI surface", (file) => {
    const found = hexes(readFileSync(join(CSS_DIR, file), "utf8"))
      .filter(isGreen)
      .filter((hex) => !(hex.toLowerCase() in DEPICTED_ARTWORK));
    expect(
      [...new Set(found)],
      `green is not in this brand's palette. Use the creams (#fffaf4, #f4ebdf, #f7f5f1), ink (#101214, #6a625a) or the accent (#9d3d2b). A "done" state is carried by motion stopping and the label changing, not by a hue borrowed from nowhere.`,
    ).toEqual([]);
  });

  it("the detector actually bites (negative control)", () => {
    // The three that shipped, plus the original.
    expect(isGreen("#e7eee6")).toBe(true);
    expect(isGreen("#e7efea")).toBe(true);
    expect(isGreen("#3f6b4f")).toBe(true);
    expect(isGreen("#233b31")).toBe(true);
    // And it must NOT accuse the brand's own palette.
    for (const ok of ["#fffaf4", "#f4ebdf", "#f7f5f1", "#101214", "#6a625a", "#9d3d2b", "#ddd4c8"]) {
      expect(isGreen(ok), `${ok} is brand palette and must pass`).toBe(false);
    }
    // The allowlist is for DEPICTED artwork only. Every entry must really be
    // green, or it is dead weight hiding nothing.
    for (const hex of ["#346250", "#759084", "#2f7a3a", "#81b3a7", "#7ba18a", "#213a32"]) {
      expect(isGreen(hex), `${hex} is allowlisted and must actually be green`).toBe(true);
    }
  });
});
