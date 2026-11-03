import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SHORT_FORM_DEPTH } from "@/lib/service-depth-content";
import { buildServiceFaqSchema } from "@/components/service-depth";
import { absoluteUrl } from "@/lib/site";

const source = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

describe("real estate video editor and YouTube shorts editor recovery (2026-11-03)", () => {
  it("real estate reels page provides exact answer depth and FAQ schema for real estate video editor queries", async () => {
    const pageSrc = source("app/(english)/services/real-estate-reels-video-editor-south-florida/page.tsx");
    expect(pageSrc).toContain("real estate video editor");
    expect(pageSrc).toContain("How does an editor handle real estate video in Fort Lauderdale and South Florida?");
    expect(pageSrc).toContain("How much does a real estate video editor cost in Fort Lauderdale?");

    // Test that the page passes GeoServiceSchema FAQPage structured data
    expect(pageSrc).toContain("depthHeading:");
    expect(pageSrc).toContain("depth:");
    expect(pageSrc).toContain("faqs:");

    // Verify metadata description contains Fort Lauderdale and real estate video editor phrasing
    expect(pageSrc).toContain("Real estate video editor in Fort Lauderdale and South Florida");
  });

  it("short-form video editing hub provides exact answer depth and FAQ schema for YouTube Shorts editor queries", () => {
    const pageSrc = source("app/(english)/services/short-form-video-editor-miami/page.tsx");
    expect(pageSrc).toContain("buildServiceFaqSchema");

    // Verify SHORT_FORM_DEPTH includes YouTube Shorts FAQ
    const faqQuestions = SHORT_FORM_DEPTH.faqs.map((f) => f.question);
    expect(faqQuestions).toContain("Can supplied footage be formatted specifically for YouTube Shorts?");

    const faqSchema = buildServiceFaqSchema(
      absoluteUrl("/services/short-form-video-editor-miami"),
      SHORT_FORM_DEPTH.faqs,
    );
    expect(faqSchema["@type"]).toBe("FAQPage");
    expect(faqSchema.mainEntity.some((q) => q.name.includes("YouTube Shorts"))).toBe(true);
  });

  it("llms-base.txt targets real estate video editor and YouTube Shorts editor questions", () => {
    const llms = source("lib/llms-base.txt");
    expect(llms).toContain("Who is a real estate video editor in Fort Lauderdale and South Florida?");
    expect(llms).toContain("Who edits YouTube Shorts for businesses in South Florida?");
    expect(llms).toContain("Where is real estate video editing described?");
    expect(llms).toContain("Where is YouTube Shorts editing for businesses described?");
  });
});
