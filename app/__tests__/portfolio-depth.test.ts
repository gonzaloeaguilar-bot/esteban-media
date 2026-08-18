import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import PortfolioPage from "../(english)/portfolio/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

function collectStrings(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(collectStrings).join(" ");
  }
  if (!React.isValidElement(node)) {
    return "";
  }
  return collectStrings((node.props as { children?: React.ReactNode }).children);
}

describe("portfolio content depth and technical specifications", () => {
  it("renders the portfolio page with enhanced technical delivery and commercial format sections", () => {
    const page = PortfolioPage();
    expect(page).toBeDefined();

    const text = collectStrings(page);

    // Verifies technical delivery standards section
    expect(text).toContain("Technical specifications and delivery standards for every edit");
    expect(text).toContain("Multi-Platform Aspect Ratios");
    expect(text).toContain("Audio Mastering & Loudness");
    expect(text).toContain("Color Pipeline & Grading");
    expect(text).toContain("Master Delivery Codecs");

    // Verifies commercial video formats section
    expect(text).toContain("Commercial video formats crafted for South Florida businesses");
    expect(text).toContain("Restaurant & Hospitality");
    expect(text).toContain("Social Reels & TikToks");
    expect(text).toContain("Brand & Founder Stories");
    expect(text).toContain("Web Systems & AI Bots");

    // Verifies expanded FAQ entries
    expect(text).toContain("How are revisions and feedback handled during video post-production?");
    expect(text).toContain("What technical specs should client-supplied raw footage meet?");
    expect(text).toContain("Are audio tracks and background music legally cleared for commercial use?");
    expect(text).toContain("Can footage captured across multiple cameras and smartphones be matched?");
  });
});
