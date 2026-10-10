import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The four folds that render FULL-BLEED — a direct child of <main> instead of
 * inside a Container: both home pages, the portfolio page, and the guide
 * article's related-guides fold. On production (checked 2026-10-10) their
 * summaries kept the kit's 4px gutter, so the title sat on the viewport edge,
 * the hairlines read at 12% ink on paper (barely there), and the keyboard
 * focus ring painted two rules across the whole viewport width.
 *
 * `.em-fold` (app/cinema.css) is the class for exactly that placement: it
 * centres the summary on the Container size="xl" width with matching gutters,
 * lifts the hairline to the site's separator tone (#ddd4c8), and keeps the
 * focus ring inside the box. These tests keep the class on all four call
 * sites — a nested fold (inside a Container) must NOT need it, so this list
 * is the full-bleed set, not every KeepReading on the site.
 */
const FULL_BLEED_FOLDS: Array<[string, string]> = [
  ["app/(english)/page.tsx", 'id="more"'],
  ["app/(spanish)/es/page.tsx", 'id="mas"'],
  ["app/(english)/portfolio/page.tsx", 'id="portfolio-standards"'],
  ["components/guide-pages.tsx", 'id="related-guides"'],
];

const source = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

/** The opening tag of the fold-out that owns the given id attribute. */
function openingTag(src: string, id: string): string {
  const idAt = src.indexOf(id);
  expect(idAt, `${id} not found in source`).toBeGreaterThan(-1);
  const start = src.lastIndexOf("<KeepReading", idAt);
  expect(start, `no <KeepReading before ${id}`).toBeGreaterThan(-1);
  const end = src.indexOf(">", idAt);
  expect(end, `opening tag for ${id} never closes`).toBeGreaterThan(-1);
  return src.slice(start, end + 1);
}

describe("full-bleed folds — the .em-fold placement", () => {
  it.each(FULL_BLEED_FOLDS)(
    "%s (%s) carries the class",
    (file, id) => {
      expect(openingTag(source(file), id)).toContain('className="em-fold"');
    },
  );

  it("the class still exists and still fixes the placement", () => {
    const css = source("app/cinema.css");
    expect(css).toContain(".em-fold");
    // The gutters match <Container size="xl"> (px-4 / sm:px-6 / lg:px-8) and
    // the focus ring stays inside the summary box, not across the viewport.
    expect(css).toContain(".em-fold > summary:focus-visible { outline-offset: -2px; }");
    expect(css).toContain("max-width: 80rem;");
  });
});