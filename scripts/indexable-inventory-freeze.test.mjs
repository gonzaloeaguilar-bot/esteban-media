import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import sitemap from "../app/sitemap.ts";

const root = new URL("../", import.meta.url);

describe("indexable inventory freeze", () => {
  it("keeps new sitemap URLs frozen at the approved live baseline", async () => {
    const freeze = JSON.parse(
      await readFile(new URL("config/indexable-inventory-freeze.json", root), "utf8"),
    );
    const urls = sitemap().map((entry) => entry.url);
    const hash = createHash("sha256")
      .update([...urls].sort().join("\n"))
      .digest("hex");

    expect(freeze.status).toBe("frozen");
    expect(freeze.allowedNewIndexableUrls).toBe(0);
    expect(urls).toHaveLength(freeze.approvedSitemapUrlCount);
    expect(new Set(urls).size).toBe(urls.length);
    expect(hash).toBe(freeze.approvedSitemapUrlSetSha256);
    expect(freeze.unfreezeRequires.length).toBeGreaterThanOrEqual(3);
  });
});
