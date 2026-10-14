import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { contentDateFor, isoDay, pageFileFor, updatedLabel } from "@/lib/content-dates";

const shallow = (() => {
  try {
    return execFileSync("git", ["rev-parse", "--is-shallow-repository"], { encoding: "utf8" }).trim() !== "false";
  } catch {
    return true;
  }
})();

describe("route dates are honest", () => {
  it("formats the visible line in both languages", () => {
    expect(updatedLabel("2026-10-14T00:39:38-04:00", "en")).toBe("Updated October 14, 2026");
    expect(updatedLabel("2026-10-14T00:39:38-04:00", "es")).toBe("Actualizado el 14 de octubre de 2026");
    expect(isoDay("2026-10-14T00:39:38-04:00")).toBe("2026-10-14");
  });

  it("finds the page file for static and dynamic routes", () => {
    expect(pageFileFor("/")).toBe("app/(english)/page.tsx");
    expect(pageFileFor("/es")).toBe("app/(spanish)/es/page.tsx");
    expect(pageFileFor("/guides/anything")).toContain("guides/[slug]/page.tsx");
    expect(pageFileFor("/not-a-route-xyz")).toBeNull();
  });

  // A shallow clone reports its boundary commit as the author of every file;
  // the module must refuse to date anything there instead of inventing dates.
  it.skipIf(!shallow)("emits nothing on a shallow clone", () => {
    expect(contentDateFor("/")).toBeUndefined();
    expect(sitemap().some((entry) => entry.lastModified)).toBe(false);
  });

  it.skipIf(shallow)("sitemap lastmod is real: present, past, varied, never a blanket date", () => {
    const entries = sitemap();
    const dated = entries.filter((entry) => entry.lastModified);
    expect(dated.length).toBeGreaterThan(entries.length * 0.9);
    const days = new Set(dated.map((entry) => String(entry.lastModified).slice(0, 10)));
    expect(days.size).toBeGreaterThan(2);
    for (const entry of dated) {
      expect(Date.parse(String(entry.lastModified))).toBeLessThanOrEqual(Date.now() + 86_400_000);
    }
    // Each date equals a real commit date for the route's source files.
    const home = entries.find((e) => new URL(e.url).pathname === "/")!;
    expect(home.lastModified).toBe(contentDateFor("/"));
  });
});
