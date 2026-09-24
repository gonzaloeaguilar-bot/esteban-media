import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  englishRootMetadata,
  spanishRootMetadata,
} from "@/lib/site-metadata";
import { site } from "@/lib/site";

// The English and Spanish root layouts each set a `title.template` of
// `%s | Esteban Moreno Media`. Any page.tsx that exports a plain string
// title gets the brand appended automatically by Next's metadata resolver.
// A page whose OWN title already names the brand (a common pattern for
// pages we hand-tune for CTR, e.g. "Contact Esteban Moreno Media | ...")
// then renders with the brand twice: once from the page, once from the
// template. That happened in production on /contact and on /es (2026-09-21
// GSC pull: the home page ranked ~7.6 for its own brand name instead of the
// usual ~4 — a double-branded <title> is a documented cause of exactly that
// kind of self-cannibalized SERP snippet).
//
// This test resolves the EFFECTIVE rendered <title> the way Next.js metadata
// resolution actually works (string title -> template; `{ absolute }` ->
// verbatim; `{ default }` -> verbatim) for every page.tsx in the app, and
// fails if the brand name appears more than once in any of them. It is a
// negative control: it must fail on the pre-fix code (verified locally by
// reverting the site-metadata.ts fix) and pass after it.

const appDir = path.resolve(__dirname, "..");

type NextTitle =
  | string
  | { absolute?: string; default?: string; template?: string | null }
  | undefined
  | null;

function resolveEffectiveTitle(title: NextTitle, template: string): string | null {
  if (title == null) return null;
  if (typeof title === "string") {
    return template.replace("%s", title);
  }
  if (typeof title.absolute === "string" && title.absolute.length > 0) {
    return title.absolute;
  }
  if (typeof title.default === "string" && title.default.length > 0) {
    return title.default;
  }
  return null;
}

function countBrandOccurrences(value: string): number {
  const needle = site.name.toLowerCase();
  const haystack = value.toLowerCase();
  let count = 0;
  let index = 0;
  while (true) {
    const found = haystack.indexOf(needle, index);
    if (found === -1) break;
    count += 1;
    index = found + needle.length;
  }
  return count;
}

function findPageFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "__tests__") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findPageFiles(full));
    } else if (entry.isFile() && entry.name === "page.tsx") {
      results.push(full);
    }
  }
  return results;
}

function templateFor(filePath: string): string {
  if (filePath.includes(`${path.sep}(spanish)${path.sep}`)) {
    const t = spanishRootMetadata.title;
    return typeof t === "object" && t && "template" in t && t.template
      ? t.template
      : "%s";
  }
  const t = englishRootMetadata.title;
  return typeof t === "object" && t && "template" in t && t.template
    ? t.template
    : "%s";
}

describe("no page renders the brand name twice in its <title>", () => {
  const pageFiles = findPageFiles(appDir);

  it("found the full set of app router pages (sanity check on the walker)", () => {
    // Guards against the test silently checking zero pages if the app
    // directory layout ever changes.
    expect(pageFiles.length).toBeGreaterThan(100);
  });

  for (const file of pageFiles) {
    const relative = path.relative(appDir, file);
    const template = templateFor(file);

    it(`${relative} does not double-brand its title`, async () => {
      const mod = await import(file);

      const titles: NextTitle[] = [];

      if (typeof mod.generateMetadata === "function") {
        let paramSets: Array<Record<string, string>> = [{}];
        if (typeof mod.generateStaticParams === "function") {
          const generated = await mod.generateStaticParams();
          if (Array.isArray(generated) && generated.length > 0) {
            paramSets = generated;
          }
        }
        for (const params of paramSets) {
          const metadata = await mod.generateMetadata({
            params: Promise.resolve(params),
          });
          titles.push(metadata?.title as NextTitle);
        }
      } else if (mod.metadata) {
        titles.push(mod.metadata.title as NextTitle);
      }

      for (const title of titles) {
        const effective = resolveEffectiveTitle(title, template);
        if (effective === null) continue;
        expect(
          countBrandOccurrences(effective),
          `title "${effective}" from ${relative}`,
        ).toBeLessThanOrEqual(1);
      }
    });
  }
});
