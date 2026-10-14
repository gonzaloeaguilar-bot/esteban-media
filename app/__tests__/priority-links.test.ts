import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import { PRIORITY_LINKS } from "@/lib/priority-links";

const paths = new Set(sitemap().map((e) => new URL(e.url).pathname.replace(/\/$/, "") || "/"));

describe("priority links into unindexed money pages", () => {
  it("links only sitemap pages, from sitemap pages", () => {
    for (const [source, links] of Object.entries(PRIORITY_LINKS)) {
      expect(paths.has(source), source).toBe(true);
      for (const link of links) expect(paths.has(link.href), `${source} -> ${link.href}`).toBe(true);
    }
  });

  it("never links a page to itself and keeps Spanish pages on Spanish targets", () => {
    for (const [source, links] of Object.entries(PRIORITY_LINKS)) {
      const es = source.startsWith("/es/");
      for (const link of links) {
        expect(link.href).not.toBe(source);
        expect(link.href.startsWith("/es/") || link.href === "/es", `${source} -> ${link.href}`).toBe(es);
      }
      expect(new Set(links.map((l) => l.href)).size).toBe(links.length);
    }
  });
});
