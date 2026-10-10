import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PACKAGE_PRICES } from "@/lib/pricing";

const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

describe("public/llms.txt for AI crawlers", () => {
  it("keeps the canonical identity and confirmed service scope", () => {
    expect(llms).toContain("# Esteban Moreno Media");
    expect(llms).toContain("Canonical site: https://estebanmorenomedia.com/");
    expect(llms).toContain("- Video editing for supplied footage.");
    expect(llms).toContain(
      "- AI-assisted content and AI-assisted product or real estate visual content.",
    );
    expect(llms).toContain("- Social media planning.");
    expect(llms).toContain("- Selectively scoped on-location video production.");
  });

  it("advertises both sitemaps and the bilingual service hubs for discovery", () => {
    expect(llms).toContain("https://estebanmorenomedia.com/sitemap.xml");
    expect(llms).toContain("https://estebanmorenomedia.com/video-sitemap.xml");
    expect(llms).toContain("https://estebanmorenomedia.com/services");
    expect(llms).toContain("https://estebanmorenomedia.com/es/servicios");
  });

  it("ships an answer-first Common Questions block sourced from approved facts", () => {
    expect(llms).toContain("## Common Questions");
    expect(llms).toContain("What does Esteban Moreno Media do?");
    expect(llms).toContain("What languages are available?");
    expect(llms).toContain(
      "Are prices published? Yes, as starting points for four packages",
    );
  });

  it("does not fabricate packages, prices, turnaround, or guaranteed results", () => {
    // Drone flying stays framed narrowly; AI-assisted visual pages are now live.
    expect(llms).toContain(
      "Commercial drone flying is not published as a standalone promise",
    );
    expect(llms).toContain("Core questions these guides answer in both languages");
    expect(llms).toContain("guaranteed views/rankings.");
    // Prices ARE published since 2026-09-27 (Esteban's own packages). The
    // rule is now that every figure here is one of PACKAGE_PRICES, so this
    // file cannot quote a price the site does not show.
    const allowed = new Set(
      Object.values(PACKAGE_PRICES).flatMap((p) => (p.kind === "from" ? [`$${p.amount}`] : [])),
    );
    for (const m of llms.match(/\$\d[\d,]*/g) ?? []) expect(allowed.has(m), m).toBe(true);
    expect(allowed.size).toBeGreaterThan(0);
    expect(llms.toLowerCase()).not.toContain("guaranteed results");
  });

  it("carries the correct current contact details", () => {
    expect(llms).toContain("Email: esmolopez@gmail.com");
    expect(llms).toContain("Phone: (305) 497-4478");
    expect(llms).toContain("Last updated: 2026-10-10");
  });

  it("lists high-intent quote prompts for the priority service pages", () => {
    expect(llms).toContain("High-intent service pages with direct quote prompts");
    expect(llms).toContain("How much does a video editor cost in Miami or Fort Lauderdale?");
    expect(llms).toContain("/services/short-form-video-editor-miami");
    expect(llms).toContain("/services/ai-product-photography-miami");
  });

  it("lists the winner white-label, short-form, creator and food-and-places pages in both languages", () => {
    expect(llms).toContain(
      "/services/white-label-video-editing-for-agencies",
    );
    expect(llms).toContain(
      "/es/edicion-de-video-marca-blanca-para-agencias",
    );
    expect(llms).toContain("/es/editor-de-video-corto-para-redes-miami");
    expect(llms).toContain("/services/content-creator-video-editing-miami");
    expect(llms).toContain(
      "/services/food-and-places-creator-video-editing-miami",
    );
  });
});
