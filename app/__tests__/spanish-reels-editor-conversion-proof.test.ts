import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("Spanish Reels editor Fort Lauderdale conversion proof and Google profile connection", () => {
  it("renders verified Google client reviews on /es/editor-de-reels-fort-lauderdale", () => {
    const text = source("app/(spanish)/es/editor-de-reels-fort-lauderdale/page.tsx");
    expect(text).toContain('import { ClientReviews } from "@/components/client-reviews";');
    expect(text).toContain('<ClientReviews locale="es" />');
  });
});
