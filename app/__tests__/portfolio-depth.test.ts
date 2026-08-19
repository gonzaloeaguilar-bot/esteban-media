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

    // Verifies post-production engineering & retention section
    expect(text).toContain("Editorial engineering built for viewer retention and asset longevity");
    expect(text).toContain("Log & Raw Format Ingest");
    expect(text).toContain("Retention & Hook Pacing");
    expect(text).toContain("Kinetic Captions & Safe Zones");
    expect(text).toContain("Content Repurposing & Batching");

    // Verifies all 14 FAQ entries
    expect(text).toContain("What types of video projects can be edited from client-provided footage?");
    expect(text).toContain("How does remote editing collaboration work if I am outside South Florida?");
    expect(text).toContain("Can I send footage captured on a smartphone or GoPro?");
    expect(text).toContain("What export formats and aspect ratios are delivered for campaigns?");
    expect(text).toContain("Does Esteban Moreno Media handle bilingual English and Spanish content?");
    expect(text).toContain("Are on-location filming sessions available in South Florida?");
    expect(text).toContain("How are revisions and feedback handled during video post-production?");
    expect(text).toContain("What technical specs should client-supplied raw footage meet?");
    expect(text).toContain("Are audio tracks and background music legally cleared for commercial use?");
    expect(text).toContain("Can footage captured across multiple cameras and smartphones be matched?");
    expect(text).toContain("How does batch editing work for social media content campaigns?");
    expect(text).toContain("What camera color profiles and Log footage formats are supported?");
    expect(text).toContain("How are on-screen subtitles and safe zones formatted for vertical video?");
    expect(text).toContain("Can existing long-form videos or podcasts be repurposed into short-form clips?");
  });
});
