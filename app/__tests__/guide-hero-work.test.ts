import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { GuideDetailPage } from "@/components/guide-pages";
import { getGuides } from "@/lib/guides";

describe("guide human-entry visuals", () => {
  it.each(["en", "es"] as const)("gives every %s guide a visible hero work card", (locale) => {
    for (const guide of getGuides(locale)) {
      const html = renderToStaticMarkup(React.createElement(GuideDetailPage, { guide }));
      expect(html, guide.slug).toContain('data-section="guide-hero-work"');
    }
  });

  it("keeps the published Great Reviewer reel playable from the caption guide hero", () => {
    const guide = getGuides("en").find((item) => item.id === "caption-styles-reels-guide");
    expect(guide).toBeTruthy();
    const html = renderToStaticMarkup(React.createElement(GuideDetailPage, { guide: guide! }));
    expect(html).toContain('data-video-facade="BDRru8eXaj4"');
    expect(html).toContain("great-reviewer-iphone-18.jpg");
  });
});
