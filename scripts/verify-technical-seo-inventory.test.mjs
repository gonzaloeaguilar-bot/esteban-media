import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import {
  verifyApprovedSitemap,
  verifyLocalizedPairs,
} from "./verify-technical-seo-inventory.mjs";

const origin = "https://estebanmorenomedia.com";
const urls = [`${origin}/`, `${origin}/es`];
const freeze = {
  approvedSitemapUrlCount: urls.length,
  approvedSitemapUrlSetSha256: createHash("sha256")
    .update([...urls].sort().join("\n"))
    .digest("hex"),
};

describe("live technical SEO inventory", () => {
  it("accepts the approved exact URL set", () => {
    expect(verifyApprovedSitemap(urls, freeze, origin)).toEqual(["/", "/es"]);
  });

  it("rejects duplicate, foreign, and unapproved URLs", () => {
    expect(() => verifyApprovedSitemap([urls[0], urls[0]], freeze, origin)).toThrow("unique pages");
    expect(() => verifyApprovedSitemap([urls[0], "https://other.example/es"], freeze, origin)).toThrow("outside");
    expect(() => verifyApprovedSitemap([urls[0], `${origin}/extra`], freeze, origin)).toThrow("differs");
  });

  it("requires a nonempty balanced EN/ES group as inventories grow", () => {
    expect(verifyLocalizedPairs(["/portfolio/a", "/es/portafolio/a"], "/portfolio/", "/es/portafolio/", "watch")).toBe(2);
    expect(() => verifyLocalizedPairs(["/portfolio/a"], "/portfolio/", "/es/portafolio/", "watch")).toThrow("1 English and 0 Spanish");
    expect(() => verifyLocalizedPairs([], "/guides", "/es/guias", "guides")).toThrow("0 English and 0 Spanish");
  });
});
