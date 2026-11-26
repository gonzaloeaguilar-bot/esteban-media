import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { metadata } from "@/app/(english)/services/contractor-video-marketing-florida/page";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("Contractor Video Marketing Florida - Owned Site CTR Optimization", () => {
  it("includes HVAC and contractor video production in page metadata", () => {
    const rawTitle = metadata.title;
    const title =
      typeof rawTitle === "string"
        ? rawTitle
        : (rawTitle as { absolute?: string; default?: string })?.absolute ??
          (rawTitle as { absolute?: string; default?: string })?.default ??
          "";
    expect(title).toContain("HVAC & Contractor Video Production Florida");
    expect(title).toContain("Esteban Moreno Media");

    expect(metadata.description).toContain("HVAC and contractor video production in Florida");
    expect(metadata.description).toContain("roofing, HVAC, and solar companies");
  });

  it("renders ClientReviews component on contractor video marketing page", () => {
    const text = source("app/(english)/services/contractor-video-marketing-florida/page.tsx");
    expect(text).toContain('import { ClientReviews } from "@/components/client-reviews";');
    expect(text).toContain('<ClientReviews locale="en" compact />');
  });

  it("renders specific answer override targeting HVAC and trade contractors", () => {
    const text = source("app/(english)/services/contractor-video-marketing-florida/page.tsx");
    expect(text).toContain("Esteban Moreno Media provides jobsite video production and marketing for Florida HVAC");
    expect(text).toContain("compressor changeouts and duct installations");
  });
});
