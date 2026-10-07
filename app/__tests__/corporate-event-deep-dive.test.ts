import { describe, expect, it } from "vitest";

import { CORPORATE_EVENT_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { EXPRESS_MULTIPLIER, PRICING_BANDS, usd } from "@/lib/pricing";

const countWords = (text: string) =>
  text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim().split(/\s+/).filter(Boolean).length;

describe("corporate event deep dive", () => {
  it("is built of question-headed sections in the 100-180 word citable band", () => {
    expect(CORPORATE_EVENT_DEEP_DIVE.sections.length).toBeGreaterThanOrEqual(3);
    for (const section of CORPORATE_EVENT_DEEP_DIVE.sections) {
      expect(section.heading).toMatch(/\?$/);
      const words = countWords(section.paragraphs.join(" "));
      expect(words, section.heading).toBeGreaterThanOrEqual(100);
      expect(words, section.heading).toBeLessThanOrEqual(180);
    }
  });

  it("answers the cost question with figures from lib/pricing.ts only", () => {
    const [cost] = CORPORATE_EVENT_DEEP_DIVE.sections;
    expect(cost.heading).toBe("How much does event videography cost in Miami?");
    const text = JSON.stringify(CORPORATE_EVENT_DEEP_DIVE);
    expect(text).toContain(usd(PRICING_BANDS.corporate.baseMin));
    expect(text).toContain(usd(PRICING_BANDS.corporate.baseMax));
    expect(text).toContain(usd(PRICING_BANDS["on-location"].baseMin));
    expect(text).toContain(String(EXPRESS_MULTIPLIER));
    expect(text).toContain("](/portfolio/diana-jack)");
    expect(text).not.toMatch(/drone|aerial|HIPAA|same-day/i);
  });
});
