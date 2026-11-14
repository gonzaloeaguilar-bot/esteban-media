import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("../caption-safe-zone-diagnostic.tsx", import.meta.url), "utf8");

describe("caption safe-zone diagnostic", () => {
  it("returns a clear in-place recommendation after all answers instead of only a lead link", () => {
    expect(source).toContain('data-section="caption_safe_zone_result"');
    expect(source).toContain("Your caption decision");
    expect(source).toContain("Set the caption lane before you style it.");
    expect(source).toContain('aria-live="polite"');
    expect(source).not.toContain("caption_safe_zone_brief");
  });
});
