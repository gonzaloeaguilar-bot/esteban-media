import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  accountMetrics,
  captionLanguage,
  dominantLanguage,
  followerBucket,
  handleFromHtml,
  median,
  pinnedCount,
} from "./ig-restaurant-study.mjs";

const study = JSON.parse(readFileSync(new URL("../data/studies/miami-restaurant-instagram-2026.json", import.meta.url), "utf8"));

describe("handleFromHtml", () => {
  it("takes the most-linked profile and ignores post, reel and builder links", () => {
    const html = `
      <a href="https://www.instagram.com/p/Cx1/">post</a>
      <a href="https://instagram.com/reel/abc">reel</a>
      <a href="https://www.instagram.com/wix">builder footer</a>
      <a href="https://www.instagram.com/casa_ejemplo/">ig</a>
      <a href="https://www.instagram.com/casa_ejemplo">ig again</a>
      <a href="https://www.instagram.com/someone_tagged">tag</a>`;
    expect(handleFromHtml(html)).toBe("casa_ejemplo");
  });
  it("returns null when the site links no profile", () => {
    expect(handleFromHtml('<a href="https://facebook.com/x">fb</a>')).toBeNull();
  });
});

describe("captionLanguage", () => {
  it("classifies English, Spanish, both and too-short", () => {
    expect(captionLanguage("Join us this weekend for the best brunch in town")).toBe("en");
    expect(captionLanguage("Ven a disfrutar de la mejor comida con nuestra familia")).toBe("es");
    expect(captionLanguage("Domingos sin prisa, buena mesa, perfectly served cocktails y el placer de disfrutar la tarde with the best vibes")).toBe("both");
    expect(captionLanguage("🔥🔥")).toBe("none");
  });
  it("ignores hashtags and handles", () => {
    expect(captionLanguage("#delaabuela #conlafamilia @la_casa_de_la_abuela")).toBe("none");
  });
});

describe("dominantLanguage", () => {
  it("calls an account bilingual when each language holds a quarter", () => {
    expect(dominantLanguage({ es: 3, en: 7, both: 0, none: 1 })).toBe("both");
    expect(dominantLanguage({ es: 1, en: 10, both: 0, none: 1 })).toBe("en");
    expect(dominantLanguage({ es: 0, en: 0, both: 0, none: 4 })).toBe("none");
  });
});

describe("pinnedCount", () => {
  it("skips leading posts older than a later one", () => {
    const posts = [
      { timestamp: "2026-03-01T00:00:00Z" },
      { timestamp: "2026-02-01T00:00:00Z" },
      { timestamp: "2026-10-10T00:00:00Z" },
      { timestamp: "2026-10-09T00:00:00Z" },
    ];
    expect(pinnedCount(posts)).toBe(2);
  });
  it("is zero for a chronological grid", () => {
    expect(pinnedCount([{ timestamp: "2026-10-10T00:00:00Z" }, { timestamp: "2026-10-01T00:00:00Z" }])).toBe(0);
  });
});

describe("accountMetrics", () => {
  it("counts formats, weekly frequency and Reel length", () => {
    const day = (d) => `2026-10-${String(d).padStart(2, "0")}T12:00:00Z`;
    const profile = {
      followersCount: 12000,
      latestPosts: [
        { type: "Video", shortCode: "a", timestamp: day(14), caption: "Join us tonight for the new menu" },
        { type: "Sidecar", shortCode: "b", timestamp: day(11), caption: "Our weekend specials are here" },
        { type: "Image", shortCode: "c", timestamp: day(7), caption: "" },
        { type: "Video", shortCode: "d", timestamp: day(0 + 1), caption: "Ven hoy con la familia" },
      ],
    };
    const m = accountMetrics(profile, { now: Date.parse(day(14)), durations: { a: 12, d: 30 } });
    expect(m.formats).toEqual({ reel: 2, photo: 1, carousel: 1 });
    expect(m.reelShare).toBe(0.5);
    expect(m.perWeek).toBeCloseTo((3 / 13) * 7, 5);
    expect(m.medianReelSeconds).toBe(21);
    expect(m.bucket).toBe("5k-20k");
    expect(m.captionedShare).toBe(0.75);
  });
});

describe("helpers", () => {
  it("median and buckets", () => {
    expect(median([3, 1, 2])).toBe(2);
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([])).toBeNull();
    expect(followerBucket(999)).toBe("<1k");
    expect(followerBucket(100000)).toBe("100k+");
  });
});

describe("published aggregate file", () => {
  it("carries no restaurant names or handles", () => {
    const text = JSON.stringify(study);
    expect(text).not.toMatch(/instagram\.com\//);
    expect(text).not.toMatch(/"handle"|"name"|"placeId"|"phone"|"website"/);
  });
  it("is internally consistent", () => {
    const f = study.formats;
    expect(f.reelPct + f.photoPct + f.carouselPct).toBeCloseTo(100, 0);
    expect(study.funnel.sample).toBe(study.sample);
    expect(study.neighborhoods.reduce((s, n) => s + n.accounts, 0)).toBe(study.sample);
    expect(study.sample).toBeGreaterThanOrEqual(40);
  });
});
