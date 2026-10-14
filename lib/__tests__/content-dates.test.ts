import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { readFileSync } from "node:fs";
import { contentDateFor, isoDay, updatedLabel } from "@/lib/content-dates";
import { pageLastModified } from "@/lib/page-lastmod";


describe("route dates are honest", () => {
  it("formats the visible line in both languages", () => {
    expect(updatedLabel("2026-10-14T00:39:38-04:00", "en")).toBe("Updated October 14, 2026");
    expect(updatedLabel("2026-10-14T00:39:38-04:00", "es")).toBe("Actualizado el 14 de octubre de 2026");
    expect(isoDay("2026-10-14T00:39:38-04:00")).toBe("2026-10-14");
  });

  // A computed fs path under process.cwd() makes Next's tracer bundle the whole
  // project into every function importing this module: llms.txt.rsc hit 386 MB
  // against Vercel's 250 MB limit and three production deploys failed.
  it("does no fs or git work (it would drag the project into every function's trace)", () => {
    const code = readFileSync("lib/content-dates.ts", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
    expect(code).not.toMatch(/node:(fs|child_process|path)/);
    expect(code).not.toMatch(/process\.cwd\(\)/);
  });

  // Dates now come from the per-page ledger, so a shallow clone (Vercel, CI)
  // emits the same real dates as a full one; nothing is read from git at build.
  it("dates come from the per-page ledger, present, past and varied", () => {
    const entries = sitemap();
    const dated = entries.filter((entry) => entry.lastModified);
    expect(dated.length).toBe(entries.length);
    const days = new Set(dated.map((entry) => String(entry.lastModified).slice(0, 10)));
    expect(days.size).toBeGreaterThan(10);
    for (const entry of dated) {
      expect(Date.parse(String(entry.lastModified))).toBeLessThanOrEqual(Date.now() + 86_400_000);
    }
    const home = entries.find((e) => new URL(e.url).pathname === "/")!;
    expect(home.lastModified).toBe(contentDateFor("/"));
    expect(contentDateFor("/")).toBe(pageLastModified("/"));
  });
});
