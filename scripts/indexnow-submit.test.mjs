import { describe, expect, it } from "vitest";

import { parseSitemapLocations } from "./indexnow-submit.mjs";

describe("parseSitemapLocations", () => {
  it("extracts and de-dupes <loc> URLs, decoding XML entities", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url><loc>https://estebanmorenomedia.com/</loc></url>
        <url><loc>https://estebanmorenomedia.com/services?a=1&amp;b=2</loc></url>
        <url><loc>https://estebanmorenomedia.com/es</loc></url>
        <url><loc>https://estebanmorenomedia.com/</loc></url>
      </urlset>`;
    expect(parseSitemapLocations(xml)).toEqual([
      "https://estebanmorenomedia.com/",
      "https://estebanmorenomedia.com/services?a=1&b=2",
      "https://estebanmorenomedia.com/es",
    ]);
  });

  it("tolerates whitespace around loc values and returns [] for empty sitemaps", () => {
    expect(parseSitemapLocations("<urlset></urlset>")).toEqual([]);
    expect(
      parseSitemapLocations("<url><loc>\n  https://estebanmorenomedia.com/about\n </loc></url>"),
    ).toEqual(["https://estebanmorenomedia.com/about"]);
  });
});
