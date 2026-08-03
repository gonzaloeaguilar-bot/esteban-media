import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");

describe("public/llms.txt for AI crawlers", () => {
  it("keeps the canonical identity and confirmed service scope", () => {
    expect(llms).toContain("# Esteban Moreno Media");
    expect(llms).toContain("Canonical site: https://estebanmorenomedia.com/");
    expect(llms).toContain("- Video editing for supplied footage.");
    expect(llms).toContain("- AI-assisted content.");
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
      "Are prices, turnaround times, or revision counts published? No.",
    );
  });

  it("does not fabricate packages, prices, turnaround, or guaranteed results", () => {
    // Photography/drone stay framed as pending, not confirmed services.
    expect(llms).toContain(
      "Photography and drone work are not currently published as confirmed services",
    );
    expect(llms).toContain("guaranteed views/rankings.");
    expect(llms).not.toMatch(/\$\d/);
    expect(llms.toLowerCase()).not.toContain("guaranteed results");
  });

  it("carries the correct current contact details", () => {
    expect(llms).toContain("Email: esmolopez@gmail.com");
    expect(llms).toContain("Phone: (305) 497-4478");
    expect(llms).toContain("Last updated: 2026-07-29");
  });
});
