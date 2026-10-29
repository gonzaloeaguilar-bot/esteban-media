import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("Contact page conversion proof and Google profile connection", () => {
  it("renders verified Google client reviews on /contact", () => {
    const text = source("app/(english)/contact/page.tsx");
    expect(text).toContain('import { ClientReviews } from "@/components/client-reviews";');
    expect(text).toContain('<ClientReviews locale="en" />');
  });
});
