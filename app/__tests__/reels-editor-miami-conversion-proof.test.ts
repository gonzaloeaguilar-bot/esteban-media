import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("Reels editor Miami conversion proof and Google profile connection", () => {
  it("renders verified Google client reviews on /services/reels-editor-miami", () => {
    const text = source("app/(english)/services/reels-editor-miami/page.tsx");
    expect(text).toContain('import { ClientReviews } from "@/components/client-reviews";');
    expect(text).toContain('<ClientReviews locale="en" />');
  });
});
