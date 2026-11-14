import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { GuideDetailPage } from "@/components/guide-pages";
import { getGuides } from "@/lib/guides";

describe("guide human-entry visuals", () => {
  it.each(["en", "es"] as const)("gives every %s guide the same cinematic entry system as the homepage", (locale) => {
    for (const guide of getGuides(locale)) {
      const html = renderToStaticMarkup(React.createElement(GuideDetailPage, { guide }));
      expect(html, guide.slug).toContain('data-section="guide-cinematic-hero"');
      expect(html, guide.slug).toContain('src="/about/esteban-on-set.mp4"');
      expect(html, guide.slug).toContain('data-cta="guide_hero_start_reading"');
    }
  });

  it("does not put the caption guide's next-step cards inside the hero", () => {
    const guide = getGuides("en").find((item) => item.id === "caption-styles-reels-guide");
    expect(guide).toBeTruthy();
    const html = renderToStaticMarkup(React.createElement(GuideDetailPage, { guide: guide! }));
    const hero = html.match(/data-section="guide-cinematic-hero"[\s\S]*?<\/section>/)?.[0] ?? "";
    expect(hero).not.toContain('caption_guide_next_step');
    expect(html).toContain('href="#section-1"');
  });

  it("uses the guide title, not the company name, as the cinematic headline", () => {
    const guide = getGuides("en").find((item) => item.id === "caption-styles-reels-guide");
    expect(guide).toBeTruthy();
    const html = renderToStaticMarkup(React.createElement(GuideDetailPage, { guide: guide! }));
    const hero = html.match(/data-section="guide-cinematic-hero"[\s\S]*?<\/section>/)?.[0] ?? "";
    expect(hero).toContain(`<h1 id="guide-hero-heading" class="em-cine__title em-cine__title--guide"><span class="em-cine__guide-title">${guide!.title}</span></h1>`);
    expect(hero).not.toContain('<span class="em-cine__brand">Esteban Moreno Media</span>');
  });

  it("opens the caption guide with the published work before the reading sections", () => {
    const guide = getGuides("en").find((item) => item.id === "caption-styles-reels-guide");
    expect(guide).toBeTruthy();
    const html = renderToStaticMarkup(React.createElement(GuideDetailPage, { guide: guide! }));
    expect(html.indexOf('id="selected-work-en"')).toBeGreaterThan(html.indexOf('data-section="guide-cinematic-hero"'));
    expect(html.indexOf('id="selected-work-en"')).toBeLessThan(html.indexOf('id="section-1"'));
  });

  it("gives every caption-guide answer an editorial visual without presenting it as client work", () => {
    const guide = getGuides("en").find((item) => item.id === "caption-styles-reels-guide");
    expect(guide).toBeTruthy();
    const html = renderToStaticMarkup(React.createElement(GuideDetailPage, { guide: guide! }));
    expect((html.match(/data-section="caption-guide-editorial-visual"/g) ?? [])).toHaveLength(3);
    expect(html).toContain("Illustrative editorial image; not client work.");
  });
});
