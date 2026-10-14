import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import {
  DECLARED_SOURCES,
  declaredSources,
  gitSeedDate,
  hashSources,
  pageSources,
  readLedger,
  todayNewYork,
} from "@/scripts/page-lastmod.mjs";

// The per-page lastmod ledger (config/page-lastmod.json) must match each page's
// own sources. `pnpm lastmod:update` rewrites it: a changed page gets today's
// date, a new page is seeded from git. Without that, this test fails, so a
// content change cannot ship with a stale date and no date is ever invented.

const root = join(__dirname, "..", "..");
const UPDATE = process.env.PAGE_LASTMOD_UPDATE === "1";

type Ledger = Record<string, { date: string; hash: string }>;

const paths = sitemap().map((entry) => {
  const p = new URL(entry.url).pathname.replace(/\/$/, "");
  return p === "" ? "/" : p;
});

describe("per-page lastmod ledger", () => {
  if (UPDATE) {
    it("rewrites config/page-lastmod.json", () => {
      const before = readLedger(root) as Ledger;
      const today = todayNewYork();
      const next: Ledger = {};
      let changed = 0;
      let seeded = 0;
      for (const path of [...paths].sort()) {
        const sources = pageSources(root, path);
        const hash = hashSources(root, sources);
        const old = before[path];
        if (old && old.hash === hash) {
          next[path] = old;
        } else if (old) {
          next[path] = { date: today, hash };
          changed += 1;
        } else {
          next[path] = { date: gitSeedDate(root, sources) ?? today, hash };
          seeded += 1;
        }
      }
      writeFileSync(join(root, "config", "page-lastmod.json"), `${JSON.stringify(next, null, 1)}\n`);
      console.log(`page-lastmod: ${changed} changed, ${seeded} seeded, ${paths.length} total`);
      expect(Object.keys(next)).toHaveLength(paths.length);
    }, 900_000);
    return;
  }

  const ledger = readLedger(root) as Ledger;

  it("has a date for every sitemap path and nothing else", () => {
    const missing = paths.filter((p) => !ledger[p]);
    const extra = Object.keys(ledger).filter((p) => !paths.includes(p));
    expect(missing, "new sitemap path without a date: run `pnpm lastmod:update`").toEqual([]);
    expect(extra, "ledger lists a path the sitemap dropped: run `pnpm lastmod:update`").toEqual([]);
  });

  it("moves a page's date whenever that page's own sources change", () => {
    const stale = paths.filter((p) => ledger[p] && ledger[p].hash !== hashSources(root, pageSources(root, p)));
    expect(
      stale,
      "these pages changed but their lastmod did not: run `pnpm lastmod:update` and commit config/page-lastmod.json",
    ).toEqual([]);
  });

  it("is not one bulk date, and never a future date", () => {
    const dates = Object.values(ledger).map((e) => e.date);
    expect(new Set(dates).size).toBeGreaterThan(10);
    const tomorrow = new Date(Date.now() + 36 * 3_600_000).toISOString().slice(0, 10);
    expect(dates.filter((d) => !/^\d{4}-\d{2}-\d{2}$/.test(d) || d > tomorrow)).toEqual([]);
  });

  it("maps every sitemap path to at least one source of its own", () => {
    const orphans = paths.filter((p) => {
      const s = pageSources(root, p);
      return s.files.length === 0 && s.blocks.length === 0;
    });
    expect(orphans).toEqual([]);
  });

  it("resolves a block for every page that renders copy from a declared content file", () => {
    const unresolved: string[] = [];
    for (const p of paths) {
      const own = pageSources(root, p).files.filter((f) => f.startsWith("app/"));
      for (const d of declaredSources(root, own)) {
        if (d.blocks.length === 0) unresolved.push(`${p} (${d.rule.name})`);
      }
    }
    expect(unresolved, "a declared rule matched but found no block: fix DECLARED_SOURCES in scripts/page-lastmod.mjs").toEqual([]);
  });

  it("covers the Boat Show, the events hubs and the study (row 28)", () => {
    const fromFile = (p: string, file: string) => pageSources(root, p).blocks.some((b) => b.file === file);
    expect(fromFile("/events/fort-lauderdale-boat-show-video", "lib/event-content.ts")).toBe(true);
    expect(fromFile("/es/eventos/video-para-el-boat-show-de-fort-lauderdale", "lib/event-content.ts")).toBe(true);
    expect(fromFile("/events", "lib/event-content.ts")).toBe(true);
    expect(fromFile("/es/eventos", "lib/event-content.ts")).toBe(true);
    expect(fromFile("/guides/miami-restaurant-instagram-study", "lib/restaurant-ig-study.ts")).toBe(true);
    expect(fromFile("/es/guias/estudio-instagram-restaurantes-miami", "lib/restaurant-ig-study.ts")).toBe(true);
    expect(DECLARED_SOURCES.length).toBeGreaterThanOrEqual(3);
  });

  it("changes a page's hash when its copy changes in a declared content file, and only that page's", () => {
    // Copy the files these pages read into a scratch root, edit one builder,
    // and check the hash moves for that event's pages and not for another's.
    const tmp = mkdtempSync(join(tmpdir(), "lastmod-"));
    try {
      const rel = [
        "lib",
        "data/studies",
        "app/(english)/events",
        "app/(spanish)/es/eventos",
        "app/(english)/guides/miami-restaurant-instagram-study",
        "app/(spanish)/es/guias/estudio-instagram-restaurantes-miami",
      ];
      for (const r of rel) cpSync(join(root, r), join(tmp, r), { recursive: true });
      const boat = "/events/fort-lauderdale-boat-show-video";
      const boatEs = "/es/eventos/video-para-el-boat-show-de-fort-lauderdale";
      const basel = "/events/art-basel-miami-beach-video";
      const study = "/guides/miami-restaurant-instagram-study";
      const before = Object.fromEntries([boat, boatEs, basel, study].map((p) => [p, hashSources(tmp, pageSources(tmp, p))]));

      const file = join(tmp, "lib", "event-content.ts");
      const src = readFileSync(file, "utf8");
      const marker = 'metaTitle: "Fort Lauderdale Boat Show Content for Exhibitors"';
      expect(src.includes(marker)).toBe(true);
      writeFileSync(file, src.replace(marker, 'metaTitle: "Fort Lauderdale Boat Show Content, Edited"'));
      expect(hashSources(tmp, pageSources(tmp, boat))).not.toBe(before[boat]);
      expect(hashSources(tmp, pageSources(tmp, boatEs))).not.toBe(before[boatEs]);
      expect(hashSources(tmp, pageSources(tmp, basel))).toBe(before[basel]);

      const studyFile = join(tmp, "lib", "restaurant-ig-study.ts");
      const studySrc = readFileSync(studyFile, "utf8");
      const enStart = studySrc.indexOf("const en: StudyCopy = {");
      expect(enStart).toBeGreaterThan(0);
      writeFileSync(studyFile, studySrc.replace("const en: StudyCopy = {", "const en: StudyCopy = {\n  // edited"));
      expect(hashSources(tmp, pageSources(tmp, study))).not.toBe(before[study]);
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });
});
