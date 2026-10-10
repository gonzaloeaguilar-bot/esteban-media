import { describe, expect, it } from "vitest";

import { languageAlternates, spanishNichePages } from "@/lib/spanish-site";
import { pairedLanguageRoutes } from "@/lib/language-routes";
import { buildSpanishNicheMetadata } from "@/components/spanish-niche-page";
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
  /**
   * Regression for 2026-08-14. The three checks above all passed while
   * production served ONE-WAY hreflang: buildSpanishNicheMetadata hardcoded
   * `{ "es-US": path }` for every slug but one, so the map and the sitemap were
   * reciprocal and the rendered page metadata was not. Validating the data
   * source is not the same as validating what the page emits.
   */
  it("Spanish niche pages emit the alternates from the shared map", () => {
    const broken: string[] = [];
    for (const page of spanishNichePages) {
      const path = `/es/${page.slug}`;
      const expected = languageAlternates[path];
      if (!expected) continue; // unpaired page: self-reference is correct
      const emitted = buildSpanishNicheMetadata(page.slug)?.alternates?.languages as
        | Record<string, string>
        | undefined;
      if (!emitted) {
        broken.push(`${path} emits no alternates but is paired in the map`);
        continue;
      }
      for (const [lang, target] of Object.entries(expected)) {
        if (emitted[lang] !== target) {
          broken.push(`${path} emits ${lang}=${String(emitted[lang])}, map says ${target}`);
        }
      }
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });

  it("a paired Spanish page advertises its English counterpart", () => {
    const paired = Object.keys(languageAlternates).filter((k) => k.startsWith("/es/"));
    expect(paired.length).toBeGreaterThan(30);
    for (const path of paired) {
      const slug = path.replace("/es/", "");
      if (!spanishNichePages.some((p) => p.slug === slug)) continue;
      const langs = (buildSpanishNicheMetadata(slug)?.alternates?.languages ??
        {}) as Record<string, string>;
      expect(langs["en-US"], `${path} must advertise en-US`).toBeTruthy();
      expect(langs["x-default"], `${path} must advertise x-default`).toBeTruthy();
    }
  });
});

/**
 * The runtime EN<->ES pairing behind the language switcher and canonical
 * targeting lives in lib/language-routes.ts (pairedLanguageRoutes). Every
 * English route must map to exactly one Spanish route that maps back, or the
 * toggle sends a visitor to a page that never points home.
 *
 * The two entries at the bottom of that file (video-para-restaurantes-miami and
 * reels-para-negocios-miami) are documented shared-demand aliases: they declare
 * only Spanish -> English and deliberately share one canonical counterpart.
 * They are the sole allowed exceptions, and the last test pins that so a new
 * one-way entry cannot slip in unnoticed.
 */
describe("language-routes reciprocity", () => {
  const SHARED_SPANISH_ALIASES = [
    "/es/video-para-restaurantes-miami",
    "/es/reels-para-negocios-miami",
  ];

  const entries = Object.entries(pairedLanguageRoutes);
  const isSpanish = (route: string) => route === "/es" || route.startsWith("/es/");

  it("declares both directions for every pair", () => {
    const missing = entries
      .filter(([, target]) => !(target in pairedLanguageRoutes))
      .map(([route, target]) => `${route} -> ${target} but ${target} is not declared`);
    expect(missing, missing.join("\n")).toEqual([]);
  });

  it("maps every English route to exactly one Spanish route, reciprocally", () => {
    const broken: string[] = [];
    const spanishTargets = new Map<string, string>();
    for (const [route, target] of entries) {
      if (isSpanish(route)) continue;
      if (!isSpanish(target)) broken.push(`${route} -> ${target} is not a Spanish route`);
      if (pairedLanguageRoutes[target] !== route) {
        broken.push(
          `${route} -> ${target} is not reciprocated (${target} -> ${pairedLanguageRoutes[target]})`,
        );
      }
      const clash = spanishTargets.get(target);
      if (clash) broken.push(`${route} and ${clash} both map to ${target}`);
      spanishTargets.set(target, route);
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });

  it("maps every Spanish route to exactly one English route", () => {
    const broken: string[] = [];
    for (const [route, target] of entries) {
      if (!isSpanish(route)) continue;
      if (isSpanish(target)) broken.push(`${route} -> ${target} is not an English route`);
      if (!(target in pairedLanguageRoutes)) broken.push(`${route} -> ${target} is not declared`);
      if (pairedLanguageRoutes[target] !== route && !SHARED_SPANISH_ALIASES.includes(route)) {
        broken.push(
          `${route} is not reciprocated (${target} -> ${pairedLanguageRoutes[target]})`,
        );
      }
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });

  it("keeps the shared-demand aliases as the only non-reciprocal entries", () => {
    const nonReciprocal = entries
      .filter(([route, target]) => isSpanish(route) && pairedLanguageRoutes[target] !== route)
      .map(([route]) => route)
      .sort();
    expect(nonReciprocal).toEqual([...SHARED_SPANISH_ALIASES].sort());
  });
});
