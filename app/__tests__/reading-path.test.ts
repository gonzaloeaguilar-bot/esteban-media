import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { services } from "@/lib/site";
import { spanishServices } from "@/lib/spanish-site";

/**
 * The fold-out on the two longest pages. Measured on a real production server at
 * 390x844 before and after:
 *
 *   /services      16,937px -> 12,025px   (29% less)
 *   /es/servicios  20,913px -> 12,227px   (42% less)
 *
 * and the DOM word count was IDENTICAL open and closed — 7,668 and 9,262. That
 * is the property these tests exist to keep, because this site's organic
 * footprint is its acquisition channel: collapsed is not removed, so a crawler
 * sees exactly what it saw before. If a future change swaps the <details> for a
 * conditional render, the page gets shorter and the words leave the DOM, and
 * nothing in a screenshot would show it.
 */

const EN = "app/(english)/services/page.tsx";
const ES = "app/(spanish)/es/servicios/page.tsx";
const source = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

/**
 * The text between a fold-out's opening and closing tag.
 *
 * `id` is not optional garnish: guide-pages.tsx now holds TWO folds (the index
 * list and the related-guides block on a detail page). Matching on the first
 * `<KeepReading` made this helper return whichever one happened to appear
 * first in the file, so a test about one fold silently started asserting
 * against the other.
 */
function collapsed(src: string, id?: string): string {
  const open = id
    ? src.indexOf(`<KeepReading\n        id="${id}"`) >= 0
      ? src.indexOf(`<KeepReading\n        id="${id}"`)
      : src.indexOf(`id="${id}"`) >= 0
        ? src.lastIndexOf("<KeepReading", src.indexOf(`id="${id}"`))
        : -1
    : src.indexOf("<KeepReading");
  expect(open, `no fold-out with id ${id ?? "(first)"}`).toBeGreaterThan(-1);
  const close = src.indexOf("</KeepReading>", open);
  expect(close).toBeGreaterThan(open);
  return src.slice(open, close);
}

describe("reading path", () => {
  it("collapses the page-index on both long pages", () => {
    expect(source(EN)).toContain("<KeepReading");
    expect(source(ES)).toContain("<KeepReading");
  });

  it("collapses the directory, which is the part that only supports reading", () => {
    expect(collapsed(source(EN))).toContain("ServiceLandingDirectory");
    expect(collapsed(source(ES))).toContain("spanishNichePages.map");
  });

  it("never ships the fold-out open, or it saves nothing", () => {
    for (const page of [source(EN), source(ES)]) {
      const header = page.slice(page.indexOf("<KeepReading"), page.indexOf(">", page.indexOf("<KeepReading")));
      expect(header).not.toMatch(/\bopen\b/);
    }
  });

  it("names its destinations — 'keep reading' alone is mystery meat", () => {
    for (const page of [source(EN), source(ES)]) {
      const header = page.slice(page.indexOf("<KeepReading"), page.indexOf(">", page.indexOf("<KeepReading")));
      expect(header).toContain("destinations=");
      expect(header).toContain("title=");
    }
  });

  it("keeps every schema-anchored service OUTSIDE the collapsed block", () => {
    // The JSON-LD on these pages publishes #editing, #ai-content and
    // #social-planning as service @ids. Collapsing one is invisible in a
    // screenshot and breaks the structured data's own anchors.
    const enIds = services.map((s) => s.id);
    const esIds = spanishServices.map((s) => s.id);
    expect(enIds.length).toBeGreaterThan(2);
    expect(esIds.length).toBeGreaterThan(2);
    const enBlock = collapsed(source(EN));
    const esBlock = collapsed(source(ES));
    for (const id of enIds) expect(enBlock).not.toContain(`id="${id}"`);
    for (const id of esIds) expect(esBlock).not.toContain(`id="${id}"`);
  });

  it("loads the anchors script, so a link into collapsed content still lands", () => {
    for (const layout of ["app/(english)/layout.tsx", "app/(spanish)/layout.tsx"]) {
      expect(source(layout)).toContain("/wk-reading-path-anchors.js");
    }
    // And the vendored script actually calls the kit function it defines.
    const script = source("public/wk-reading-path-anchors.js");
    expect(script).toContain("function wkReadingPathAnchors");
    expect(script).toMatch(/wkReadingPathAnchors\(\);/);
  });

  it("never drives <details> from React state", () => {
    // The `open` prop is reconciled on every re-render, which snaps the panel
    // shut under the visitor's finger. The component opens it via the DOM node.
    const component = source("components/keep-reading.tsx");
    expect(component).not.toMatch(/open=\{/);
    expect(component).toContain("details.open = true");
  });
});

describe("reading path — portfolio", () => {
  const EN_PORTFOLIO = "app/(english)/portfolio/page.tsx";

  /**
   * Measured on production 2026-09-30: /portfolio was 29,360px on a phone, the
   * longest page on the site — and the work is not what made it long. The strip
   * and the grid are about 6,500px between them. Seven sections of essay —
   * post-production standards, technical specifications, creative disciplines,
   * delivery formats — accounted for roughly 8,000px on a page somebody opened
   * to LOOK at work.
   *
   * After folding: 29,360 -> 18,304px, 38% shorter, DOM word count identical at
   * 13,806.
   *
   * The Spanish portfolio is NOT folded, deliberately: it measures 13,287px and
   * has none of these sections. Folding a page that is already short adds a
   * click and saves nothing.
   */
  it("keeps the work itself visible and folds only the reading", () => {
    const src = source(EN_PORTFOLIO);
    const block = collapsed(src);
    // The two things a visitor came for must never be inside the fold.
    expect(block).not.toContain("PortfolioFilmstrip");
    expect(block).not.toContain("PortfolioGrid");
  });

  it("leaves the FAQ outside and below, per the kit's split rule", () => {
    const src = source(EN_PORTFOLIO);
    const close = src.indexOf("</KeepReading>");
    const faq = src.indexOf("Portfolio & Editing FAQ");
    expect(faq).toBeGreaterThan(close);
  });
});

describe("reading path — guides", () => {
  const GUIDE = "components/guide-pages.tsx";

  /**
   * Measured on production 2026-09-30: a guide was 24,217px on a phone — longer
   * than the services wall we folded the day before, and there are 78 of them.
   * 8,810px of that, more than a third, was the "Related practical guides" block:
   * navigation, not the article anybody arrived to read.
   *
   * After folding it: 24,381 -> 15,571px on the English guide and 16,821 -> 7,959
   * on the Spanish one, with the DOM word count IDENTICAL open and closed
   * (11,945 and 8,249) and all 38 links still inside. The internal linking a
   * crawler follows is untouched; only the scrolling changed.
   */
  it("folds the related-guides block, which is navigation and not the article", () => {
    const src = source(GUIDE);
    const block = collapsed(src, "related-guides");
    expect(block).toContain("related-guides-heading");
    // The article itself must NEVER end up inside the fold.
    expect(block).not.toContain("guide.answer");
    expect(block).not.toContain("guidePolicyNotes");
  });

  it("names where the fold leads, in both languages", () => {
    const src = source(GUIDE);
    expect(src).toContain("relatedFoldSummary");
    expect(src).toContain("relatedFoldHint");
    // Both locales define it, or one language gets a mystery-meat control.
    expect(src.match(/relatedFoldSummary:/g)?.length).toBe(2);
    expect(src.match(/relatedFoldHint:/g)?.length).toBe(2);
  });
});


describe("reading path — the guides directory", () => {
  const GUIDE_PAGES = "components/guide-pages.tsx";

  /**
   * Measured on production 2026-09-30: /guides was 21,326px on a phone, the
   * second-longest page on the site, and 39 identical 320px cards were
   * essentially all of it. Somebody opening a directory wants ONE guide.
   *
   * Eight stay as cards; the other 31 sit inside one fold-out. Collapsed is
   * not removed — every link, title and answer stays in the served HTML.
   */
  it("shows the first eight and folds the rest, never slicing them away", () => {
    const src = source(GUIDE_PAGES);
    // A `.slice(0, 8)` with no matching `.slice(8)` would DELETE 31 guides
    // from the page. Both halves must be rendered.
    expect(src).toContain("guides.slice(0, 8)");
    expect(src).toContain("guides.slice(8)");
    const block = collapsed(src, "all-guides");
    expect(block).toContain("folded.map");
  });

  it("names where the fold leads, in both languages", () => {
    const guides = source("lib/guides.ts");
    expect(guides.match(/listFoldSummary:/g)?.length).toBe(2);
    expect(guides.match(/listFoldHint:/g)?.length).toBe(2);
    // The hint states how many are behind the click, from the real count.
    expect(source(GUIDE_PAGES)).toContain("folded.length.toString()");
  });
});

describe("reading path — the areas pages", () => {
  const EN_AREAS = "app/(english)/areas/page.tsx";
  const ES_AREAS = "app/(spanish)/es/areas/page.tsx";

  /**
   * Measured on production 2026-09-30 at 390x844: /areas was 13,953px, and the
   * bottom page directory alone was 5,013px of that for 256 words — link tiles
   * between the FAQ and the one action on the page.
   *
   * /services has folded this exact component since the first reading-path
   * pass. /areas never did, and nothing noticed until the page heights were
   * measured one by one — which is why this test names the component rather
   * than just asserting "a fold exists".
   */
  it("folds the page directory on both areas pages", () => {
    expect(collapsed(source(EN_AREAS), "service-directory")).toContain(
      "<ServiceLandingDirectory />",
    );
    expect(collapsed(source(ES_AREAS), "directorio-de-servicios")).toContain(
      "<SpanishServiceLandingDirectory />",
    );
  });

  it("keeps the area cards and the contact action outside the fold", () => {
    // Each locale names its own list. A single shared literal would match
    // NEITHER on the Spanish page, and `expect(-1).toBeGreaterThan(-1)` is the
    // kind of assertion that looks meaningful and tests nothing.
    for (const [page, list] of [
      [EN_AREAS, "serviceAreas.map"],
      [ES_AREAS, "spanishAreas.map"],
    ] as const) {
      const src = source(page);
      const close = src.indexOf("</KeepReading>");
      expect(close).toBeGreaterThan(-1);
      // The area cards are what the page is FOR.
      const cards = src.indexOf(list);
      expect(cards, `${page} does not render ${list}`).toBeGreaterThan(-1);
      expect(cards).toBeLessThan(close);
      // And the action must be reachable without opening anything.
      expect(src.lastIndexOf("/contact")).toBeGreaterThan(close);
    }
  });
});
