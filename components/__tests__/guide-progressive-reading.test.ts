import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

describe("guide progressive reading", () => {
  it("keeps every guide answer in server HTML while exposing only its lead first", () => {
    const source = readFileSync(join(process.cwd(), "components/guide-pages.tsx"), "utf8");

    expect(source).toContain('data-section="guide-detail"');
    expect(source).toContain("section.paragraphs.slice(0, 1)");
    expect(source).toContain("section.paragraphs.slice(1)");
    expect(source).toContain('en: "Read the full explanation"');
    expect(source).toContain('es: "Leer la explicación completa"');
  });
});
