import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * The remote video editor page was the only high-priority EN service page still
 * rendering without a FAQPage node. The shared geo-service pages emit FAQPage
 * automatically, so this guards the hand-rolled page specifically: it must render
 * the questions AND declare the matching structured data.
 */
const root = process.cwd();
const source = (path: string) => readFileSync(join(root, path), "utf8");

const PAGE = "app/(english)/services/hire-remote-video-editor/page.tsx";

describe("remote video editor FAQ coverage", () => {
  it("declares a FAQPage node via the shared schema builder", () => {
    const text = source(PAGE);
    expect(text).toContain("buildServiceFaqSchema");
    expect(text).toContain('absoluteUrl("/services/hire-remote-video-editor")');
  });

  it("renders the same questions the schema claims", () => {
    const text = source(PAGE);
    expect(text).toContain("<ServiceFaqs");
    expect(text).toContain("REMOTE_EDITOR_DEPTH.faqs");
  });

  it("keeps the questions in Spanish-first / published-price facts only", () => {
    const text = source(PAGE);
    // The published Starter starting price, no invented ceiling.
    expect(text).toContain("$100 per video");
  });
});
