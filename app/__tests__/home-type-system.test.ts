import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * The home pages had three competing headline voices (condensed all-caps,
 * heavy grotesk, editorial serif) and two price faces. The fix is one shared
 * section heading (.em-h2), one eyebrow (.em-eyebrow) and one price figure
 * (.em-price-figure), all defined in app/globals.css. These checks keep a
 * section from quietly growing its own one-off again.
 */

const root = process.cwd();
const read = (path: string) => readFileSync(join(root, path), "utf8");

// Every component that renders a section h2 on "/" or "/es".
const HOME_SECTIONS = [
  "components/packages-section.tsx",
  "components/real-estate-plans-section.tsx",
  "components/a-la-carte-section.tsx",
  "components/portfolio-teaser.tsx",
  "components/real-estate-reels.tsx",
  "components/client-reviews.tsx",
  "components/home-authority-hub.tsx",
  "components/services-strip.tsx",
  "components/about-teaser.tsx",
  "components/contact-cta.tsx",
];

function h2ClassNames(source: string): string[] {
  return [...source.matchAll(/<h2\b[^>]*?className=(?:"([^"]*)"|\{`([^`]*)`\})/g)].map(
    (match) => match[1] ?? match[2],
  );
}

describe("home type system", () => {
  it("defines the shared heading, eyebrow and price classes from tokens", () => {
    const globals = read("app/globals.css");
    for (const selector of [".em-h2", ".em-eyebrow", ".em-price-figure"]) {
      expect(globals).toMatch(new RegExp(`\\${selector}\\s*\\{`));
    }
    expect(globals).toMatch(/--em-h2-size:\s*clamp\(36px/);
  });

  it.each(HOME_SECTIONS)("every section h2 in %s uses .em-h2", (file) => {
    const classes = h2ClassNames(read(file));
    expect(classes.length).toBeGreaterThan(0);
    for (const className of classes) expect(className.split(/\s+/)).toContain("em-h2");
  });

  it("keeps the condensed display face for the hero brand mark and ident only", () => {
    const cinema = read("app/cinema.css");
    const selectors = [...cinema.matchAll(/([^{}]+)\{[^}]*font-family:\s*var\(--font-display\)/g)].map((m) =>
      m[1].trim().split("\n").pop()!.trim(),
    );
    expect(selectors.length).toBeGreaterThan(0);
    for (const selector of selectors) expect(selector).toMatch(/^\.em-(cine__brand|signal__)/);
  });

  it("sets every price in Instrument Serif, from the one shared token", () => {
    // Owner choice (PR #318): big Instrument Serif figures, unit small beside.
    const globals = read("app/globals.css");
    expect(globals).toMatch(/--em-price-font:\s*var\(--font-price\),\s*"Instrument Serif"/);
    // The token must sit where next/font defines --font-price (body), never on
    // :root, where the var() resolves to nothing.
    const bodyBlock = globals.match(/\nbody\s*\{([^}]*)\}/)?.[1] ?? "";
    expect(bodyBlock).toMatch(/--em-price-font:/);
    expect(read("components/site-chrome.tsx")).toMatch(/Instrument_Serif\(\{[^}]*variable:\s*"--font-price"/);
    expect(globals).toMatch(/\.em-price-figure\s*\{[^}]*font-family:\s*var\(--em-price-font\)/);
  });

  it("no home price figure declares its own font stack", () => {
    // The home figures take their face from .em-price-figure / the token only.
    const css = read("app/cinema.css") + read("app/illustrated-commercial.css");
    const figures = [
      ".em-pk-card__price-num",
      ".em-pk-card__price-custom",
      ".em-pk-open-price__num",
      ".em-pk-open-price__custom",
      ".em-pk-starter-tile__num",
      ".em-plan-overview .rail-price__now",
    ];
    for (const selector of figures) {
      const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      for (const [, body] of css.matchAll(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`, "g"))) {
        const font = body.match(/font-family:\s*([^;]+)/)?.[1]?.trim();
        if (font) expect(font).toBe("var(--em-price-font)");
      }
    }
  });

  // Negative control: the extractor must see an h2 that lacks the class.
  it("catches a section h2 without the shared class", () => {
    const classes = h2ClassNames('<h2 id="x" className="mt-3 font-serif text-4xl">Hi</h2>');
    expect(classes).toEqual(["mt-3 font-serif text-4xl"]);
    expect(classes[0].split(/\s+/)).not.toContain("em-h2");
  });
});
