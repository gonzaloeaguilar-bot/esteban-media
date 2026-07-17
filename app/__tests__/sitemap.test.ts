import { describe, expect, it } from "vitest";

import sitemap from "../sitemap";

describe("portfolio sitemap entries", () => {
  const entries = sitemap();
  const englishUrl = "https://estebanmorenomedia.com/portfolio";
  const spanishUrl = "https://estebanmorenomedia.com/es/portafolio";

  it("includes both portfolio routes exactly once", () => {
    const urls = entries.map((entry) => entry.url);

    expect(urls.filter((url) => url === englishUrl)).toHaveLength(1);
    expect(urls.filter((url) => url === spanishUrl)).toHaveLength(1);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("publishes reciprocal language alternates", () => {
    const english = entries.find((entry) => entry.url === englishUrl);
    const spanish = entries.find((entry) => entry.url === spanishUrl);
    const expected = {
      "en-US": englishUrl,
      "es-US": spanishUrl,
      "x-default": englishUrl,
    };

    expect(english?.alternates?.languages).toEqual(expected);
    expect(spanish?.alternates?.languages).toEqual(expected);
  });
});
