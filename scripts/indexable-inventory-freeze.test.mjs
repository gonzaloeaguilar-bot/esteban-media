import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import sitemap from "../app/sitemap.ts";

const root = new URL("../", import.meta.url);

describe("indexable inventory demand gate", () => {
  it("bounds sitemap growth to the demand-gated allowance and detects drift", async () => {
    const freeze = JSON.parse(
      await readFile(new URL("config/indexable-inventory-freeze.json", root), "utf8"),
    );
    const urls = sitemap().map((entry) => entry.url);
    const hash = createHash("sha256")
      .update([...urls].sort().join("\n"))
      .digest("hex");

    expect(freeze.status).toBe("demand_gated");
    // Growth is allowed but BOUNDED: at most allowedNewIndexableUrls beyond the
    // approved baseline per change. A PR that grows the sitemap must also update
    // approvedSitemapUrlCount + approvedSitemapUrlSetSha256 to the new state, so
    // silent drift (a URL shipped without touching this contract) still fails.
    expect(freeze.allowedNewIndexableUrls).toBeGreaterThanOrEqual(1);
    expect(freeze.allowedNewIndexableUrls).toBeLessThanOrEqual(3);
    expect(urls).toHaveLength(freeze.approvedSitemapUrlCount);
    expect(new Set(urls).size).toBe(urls.length);
    expect(hash).toBe(freeze.approvedSitemapUrlSetSha256);
    expect(freeze.reason).toContain("demand-backed");
  });
});
