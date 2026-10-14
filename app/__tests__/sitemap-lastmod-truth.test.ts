import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { contentDateFor } from "@/lib/content-dates";

// A shallow clone (CI's default, Vercel's default) cannot be dated honestly, so
// there lastmod must be ABSENT. On a full clone every date must trace to a real
// commit. Either way the old failure stays impossible: one bulk date on every URL.
const shallow = (() => {
  try {
    return execFileSync("git", ["rev-parse", "--is-shallow-repository"], { encoding: "utf8" }).trim() !== "false";
  } catch {
    return true;
  }
})();

describe("sitemap lastmod truthfulness", () => {
  const entries = sitemap();
  const dated = entries.filter((entry) => entry.lastModified !== undefined);

  it("emits the full inventory", () => {
    expect(entries.length).toBeGreaterThan(230);
  });

  it("only asserts a lastModified it can trace to a git commit for that route's source", () => {
    if (shallow) {
      expect(dated, "a shallow clone cannot be dated; lastmod must be absent, not guessed").toHaveLength(0);
      return;
    }
    expect(dated.length).toBeGreaterThan(0);
    for (const entry of dated) {
      const path = new URL(entry.url).pathname.replace(/\/$/, "") || "/";
      expect(entry.lastModified, `${path} has a date git cannot account for`).toBe(contentDateFor(path));
    }
  });

  it("would reject a single bulk date across the inventory", () => {
    // Guards the specific regression: every URL stamped with one shared date.
    const dates = dated.map((entry) => new Date(entry.lastModified as string).toISOString().slice(0, 10));
    const unique = new Set(dates);
    const isBulkStamped = dates.length > 50 && unique.size === 1;
    expect(isBulkStamped).toBe(false);
  });
});
