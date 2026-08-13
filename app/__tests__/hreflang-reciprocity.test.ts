import { describe, expect, it } from "vitest";

import { languageAlternates } from "@/lib/spanish-site";
import sitemap from "@/app/sitemap";

/**
 * hreflang is only honoured when both documents point at each other. A
 * one-directional declaration is discarded, so a page can silently lose its
 * language targeting without anything visibly breaking.
 */
describe("hreflang reciprocity", () => {
  it("every alternate target is itself a key in languageAlternates", () => {
    const missing: string[] = [];
    for (const [path, langs] of Object.entries(languageAlternates)) {
      for (const [lang, target] of Object.entries(langs)) {
        if (lang === "x-default") continue;
        if (!(target in languageAlternates)) {
          missing.push(`${path} declares ${lang} -> ${target}, which has no entry`);
        }
      }
    }
    expect(missing, missing.join("\n")).toEqual([]);
  });

  it("every alternate target points back at the declaring page", () => {
    const broken: string[] = [];
    for (const [path, langs] of Object.entries(languageAlternates)) {
      for (const [lang, target] of Object.entries(langs)) {
        if (lang === "x-default") continue;
        const back = languageAlternates[target];
        if (!back) continue; // covered by the previous test
        if (!Object.values(back).includes(path)) {
          broken.push(`${path} -> ${target} (${lang}) is not reciprocated`);
        }
      }
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });

  it("uses US-targeted Spanish, not Spain", () => {
    const codes = new Set(
      Object.values(languageAlternates).flatMap((l) => Object.keys(l)),
    );
    expect(codes).toContain("es-US");
    expect(codes).not.toContain("es-ES");
  });

  it("emits reciprocal alternates in the rendered sitemap", () => {
    const entries = sitemap();
    const byUrl = new Map(entries.map((e) => [e.url, e]));
    const broken: string[] = [];
    for (const entry of entries) {
      const languages = entry.alternates?.languages;
      if (!languages) continue;
      for (const [lang, target] of Object.entries(languages)) {
        if (lang === "x-default" || typeof target !== "string") continue;
        const other = byUrl.get(target);
        if (!other?.alternates?.languages) {
          broken.push(`${entry.url} -> ${target} has no alternates`);
          continue;
        }
        if (!Object.values(other.alternates.languages).includes(entry.url)) {
          broken.push(`${entry.url} -> ${target} is not reciprocated`);
        }
      }
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });
});
