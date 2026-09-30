import { describe, expect, it } from "vitest";

import { guideTheme } from "@/components/guide-illustration";
import { getGuides } from "@/lib/guides";

/**
 * The 78 guides rendered ZERO images, and the entire photo library is 13 project
 * frames — every one already in use, none of them about editing workflow. So the
 * guides get a drawing for their THEME instead of a photograph that would be
 * decoration.
 *
 * The theme is derived from the slug, which is cheap and needs no new data, but
 * a substring rule is exactly the kind of thing that goes quietly wrong. It did,
 * twice, before these tests existed:
 *
 *   - `rate` matched inside "corpo(rate)", so
 *     "how-to-select-broll-for-corporate-video" drew a pricing chart;
 *   - "agencies" vs "agencia" matched asymmetrically, so an agency workflow guide
 *     drew a comparison in one language and not the other.
 *
 * A guide and its translation must never show different pictures for the same
 * idea. That is what the first test pins.
 */
const EN = getGuides("en");
const ES = getGuides("es");
const pairs = EN.map((en) => ({ id: en.id, en, es: ES.find((g) => g.id === en.id)! })).filter((p) => p.es);

describe("guide illustration", () => {
  it("draws the same thing for a guide and its translation", () => {
    const mismatched = pairs
      .map((pair) => ({ id: pair.id, en: guideTheme(pair.en.slug), es: guideTheme(pair.es.slug) }))
      .filter((p) => p.en !== p.es);
    expect(mismatched).toEqual([]);
  });

  it("covers every guide", () => {
    expect(pairs.length).toBeGreaterThan(30);
    for (const pair of pairs) {
      expect(guideTheme(pair.en.slug)).toBeTruthy();
      expect(guideTheme(pair.es.slug)).toBeTruthy();
    }
  });

  it("does not collapse into one drawing for everything", () => {
    // If a rule breaks, the fallback swallows the site and every guide looks the
    // same — which is worse than no illustration, because it looks deliberate.
    const themes = pairs.map((pair) => guideTheme(pair.en.slug));
    const counts = new Map<string, number>();
    for (const t of themes) counts.set(t, (counts.get(t) ?? 0) + 1);
    expect(counts.size).toBeGreaterThanOrEqual(5);
    const biggest = Math.max(...counts.values());
    expect(biggest / themes.length).toBeLessThan(0.5);
  });

  it("keeps the substring traps that already bit us from coming back", () => {
    expect(guideTheme("how-to-select-broll-for-corporate-video")).not.toBe("price");
    expect(guideTheme("how-to-improve-video-retention-rate")).not.toBe("price");
    expect(guideTheme("video-editing-workflow-for-agencies-miami")).not.toBe("comparison");
    // and the ones that must still classify correctly
    expect(guideTheme("video-editor-vs-videographer")).toBe("comparison");
    expect(guideTheme("corporate-video-production-cost-miami")).toBe("price");
    expect(guideTheme("how-to-mix-audio-for-social-video")).toBe("audio");
    expect(guideTheme("fastest-way-to-send-large-video-files-to-editor")).toBe("files");
  });
});
