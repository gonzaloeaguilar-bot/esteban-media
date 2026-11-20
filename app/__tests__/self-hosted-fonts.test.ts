import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Guards against the 2026-11-19 latin-ext regression (PRs #776/#780/#782) where
 * all 5 self-hosted Google Fonts were accidentally downloaded from Google's
 * `latin-ext` block instead of `latin` — leaving only uppercase `A` in Oswald
 * and silently falling back to Arial across the entire site.
 *
 * Each hash below was verified with fontTools to contain 26/26 A-Z, 26/26 a-z,
 * 10/10 0-9, and all 14 Spanish diacritics/punctuation (áéíóúñÁÉÍÓÚÑ¿¡).
 */
const VERIFIED_LATIN_FONTS: Record<string, string> = {
  "geist-mono-latin.woff2": "5f3d6ad60f29d6cb708414ec6887163d63bf197377ef5417d2483ff31ace6c3b",
  "geist-sans-latin.woff2": "9b6f5ff45b278c744b5f379a2c4ecbaf858a842b8eaf82ac8d21b699ca16c608",
  "instrument-serif-latin.woff2": "60c06664b5a95c7de6cc3e00d1f9034d78bd1e40b564016b241674449a067d4d",
  "newsreader-latin.woff2": "01817351be3edfc1714fe6d60ddea6a22a169a5ebd033b50c7f9495e5d9c386a",
  "oswald-latin.woff2": "9dde3797547520f762f4ba3a822d417a0872b962bc78753a7ee9f955382b6b85",
};

describe("self-hosted latin fonts", () => {
  it.each(Object.entries(VERIFIED_LATIN_FONTS))("%s is the verified latin WOFF2 subset (not latin-ext)", (filename, expectedSha256) => {
    const buf = readFileSync(join(process.cwd(), "app/fonts", filename));
    expect(buf.subarray(0, 4).toString("ascii")).toBe("wOF2");
    const actualSha256 = createHash("sha256").update(buf).digest("hex");
    expect(actualSha256).toBe(expectedSha256);
  });
});
