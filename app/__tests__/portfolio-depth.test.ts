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

    // Verifies industry-tailored post-production applications section
    expect(text).toContain("Tailored post-production for specialized business sectors");
    expect(text).toContain("Real Estate & Architecture");
    expect(text).toContain("Medical & Dental Practices");
    expect(text).toContain("Contractors & Home Trades");
    expect(text).toContain("Corporate & Interview Series");

    // Verifies quality assurance protocol section
    expect(text).toContain("Rigorous post-production standards before final delivery");
    expect(text).toContain("Audio Isolation & Loudness Verification");
    expect(text).toContain("Color Calibration & Exposure Balancing");
    expect(text).toContain("Mobile Safe-Zone & Caption Formatting");
    expect(text).toContain("Master Codec & Metadata Packaging");

    // Verifies expanded FAQ entries
    expect(text).toContain("How are revisions and feedback handled during video post-production?");
    expect(text).toContain("What technical specs should client-supplied raw footage meet?");
    expect(text).toContain("Are audio tracks and background music legally cleared for commercial use?");
    expect(text).toContain("Can footage captured across multiple cameras and smartphones be matched?");
    expect(text).toContain("How do you handle content repurposing from long-form video into vertical reels?");
    expect(text).toContain("What is the process for submitting revision notes on draft cuts?");
    expect(text).toContain("Can you work with mixed framerates and multi-camera footage?");
    expect(text).toContain("How are final video masters formatted and organized for delivery?");
  });
});
