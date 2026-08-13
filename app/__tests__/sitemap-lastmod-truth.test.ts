import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";

describe("sitemap lastmod truthfulness", () => {
  const entries = sitemap();

  it("emits the full inventory", () => {
    expect(entries.length).toBeGreaterThan(250);
  });

  it("does not assert a lastModified it cannot substantiate", () => {
    const withDates = entries.filter((entry) => entry.lastModified !== undefined);
    expect(
      withDates,
      "The content model has no per-item updated date. Emitting one anyway " +
        "means inventing it. Add real per-item dates before restoring lastmod.",
    ).toHaveLength(0);
  });

  it("would reject a single bulk date across the inventory", () => {
    // Guards the specific regression: every URL stamped with one shared date.
    const dates = entries
      .map((entry) => entry.lastModified)
      .filter((value): value is Date | string => value !== undefined)
      .map((value) => new Date(value).toISOString().slice(0, 10));
    const unique = new Set(dates);
    const isBulkStamped = dates.length > 50 && unique.size === 1;
    expect(isBulkStamped).toBe(false);
  });
});
