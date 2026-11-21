import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(resolve(process.cwd(), path), "utf8");

describe("Fort Lauderdale Reels editor local proof", () => {
  it("places the verified Google profile action at the first contact decision", () => {
    const page = source("app/(english)/services/reels-editor-fort-lauderdale/page.tsx");
    const renderer = source("components/geo-service-page.tsx");

    expect(page).toContain('import { reviewSourceUrl } from "@/lib/client-reviews";');
    expect(page).toContain("href: reviewSourceUrl");
    expect(page).toContain('label: "Read public Google reviews before you ask"');
    expect(renderer).toContain("geo_service_local_proof_");
    expect(renderer).toContain('target="_blank"');
    expect(renderer).toContain('rel="noopener noreferrer"');
  });
});
