import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("interior hub published proof", () => {
  it("keeps the case-studies hub attached to a live Healthy Smile portfolio entry in both languages", () => {
    const source = read("components/case-studies-index.tsx");

    expect(source).toContain('href: "/portfolio/healthy-smile"');
    expect(source).toContain('href: "/es/portafolio/healthy-smile"');
    expect(source).toContain("<PublishedProjectProof proof={publishedProof} compact />");
  });

  it("keeps the guides hub attached to the published Gains From Geebs Shorts entry in both languages", () => {
    const source = read("components/guide-pages.tsx");

    expect(source).toContain('href: "/portfolio/gains-from-geebs-shorts"');
    expect(source).toContain('href: "/es/portafolio/gains-from-geebs-shorts"');
    expect(source).toContain("<PublishedProjectProof proof={publishedProof} compact />");
  });
});
