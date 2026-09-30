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

/** The text between the fold-out's opening and closing tag. */
function collapsed(src: string): string {
  const open = src.indexOf("<KeepReading");
  const close = src.indexOf("</KeepReading>");
  expect(open).toBeGreaterThan(-1);
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
    const block = collapsed(src);
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
