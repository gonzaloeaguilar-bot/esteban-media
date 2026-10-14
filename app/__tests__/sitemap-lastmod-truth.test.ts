import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { contentDateFor } from "@/lib/content-dates";
import { pageLastModified } from "@/lib/page-lastmod";

// Every sitemap date comes from the per-page ledger (config/page-lastmod.json),
// which needs no git at build time, so shallow and full clones emit the same
// dates. app/__tests__/page-lastmod.test.ts keeps the ledger true to each
// page's own sources. The old failure stays impossible: one bulk date on every URL.
describe("sitemap lastmod truthfulness", () => {
  const entries = sitemap();

  it("emits the full inventory", () => {
    expect(entries.length).toBeGreaterThan(230);
  });

  it("asserts only dates the per-page ledger substantiates, on every URL", () => {
    for (const entry of entries) {
      const path = new URL(entry.url).pathname.replace(/\/$/, "") || "/";
      expect(entry.lastModified, entry.url).toBe(pageLastModified(path));
      expect(contentDateFor(path)).toBe(pageLastModified(path));
    }
    expect(entries.filter((entry) => entry.lastModified === undefined)).toHaveLength(0);
  });

  it("is not one bulk date, and no single day holds most of the site", () => {
    const days = entries.map((entry) => String(entry.lastModified).slice(0, 10));
    const counts = new Map<string, number>();
    for (const d of days) counts.set(d, (counts.get(d) ?? 0) + 1);
    expect(counts.size).toBeGreaterThan(10);
    // The transitive-import approach (2026-10-14, aaa2f8ed) put 300/352 (85%) on one day.
    // Raised 0.5 -> 0.6 on 2026-10-14 (PR #439, accepted by the coordinator): that day an overnight loop plus the owner-facts and
    // demand-map PRs genuinely edited 180/365 pages (49.3%) before the demand-map
    // PR, every one substantiated by its own source hash in page-lastmod.test.ts.
    // The bulk-date bug sits far above this line; honest same-day edits sit below it.
    expect(Math.max(...counts.values()) / days.length).toBeLessThan(0.6);
  });
});
