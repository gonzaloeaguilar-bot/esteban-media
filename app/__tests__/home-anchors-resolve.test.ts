import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * Every in-page anchor the home offers has to land on something.
 *
 * On 2026-09-28 the chooser and the packages track were merged into one
 * section. The merge deleted the element carrying id="paquetes" / "packages" —
 * which is exactly where the hero's primary CTA points. The button still
 * rendered, still looked right, and did nothing at all: no error, no jump.
 *
 * A source check is enough here and a browser is not: what broke was a pair of
 * strings that stopped matching.
 */
function source(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("home in-page anchors resolve", () => {
  const files = [
    "components/hero-video.tsx",
    "components/packages-section.tsx",
    // The packages section renders the needs chooser, which owns #paquetes / #packages.
    "components/needs-chooser.tsx",
    "components/site-header-client.tsx",
  ].map((f) => [f, source(f)] as const);

  const idsDeclared = new Set<string>();
  for (const [, src] of files) {
    for (const m of src.matchAll(/id=\{locale === "es" \? "([\w-]+)" : "([\w-]+)"\}/g)) {
      idsDeclared.add(m[1]);
      idsDeclared.add(m[2]);
    }
    for (const m of src.matchAll(/id="([\w-]+)"/g)) idsDeclared.add(m[1]);
    // ids built from a helper, e.g. id={anchor} where anchor = packageAnchor(id)
    if (/id=\{anchor\}/.test(src)) idsDeclared.add("__packageAnchor__");
  }

  it("every #hash the home links to is declared by one of its own sections", () => {
    const missing: string[] = [];
    for (const [file, src] of files) {
      for (const m of src.matchAll(/href=\{?\s*(?:isSpanish|locale === "es")\s*\?\s*"#([\w-]+)"\s*:\s*"#([\w-]+)"/g)) {
        for (const hash of [m[1], m[2]]) if (!idsDeclared.has(hash)) missing.push(`${file} -> #${hash}`);
      }
      for (const m of src.matchAll(/href="#([\w-]+)"/g)) {
        const hash = m[1];
        if (hash === "buscar" || hash === "main-content") continue; // opened by script, not an element id
        if (!idsDeclared.has(hash)) missing.push(`${file} -> #${hash}`);
      }
    }
    expect(missing, `dead in-page anchors: ${missing.join(", ")}`).toEqual([]);
  });

  it("the hero's primary call to action points at the packages section", () => {
    const hero = source("components/hero-video.tsx");
    expect(hero).toMatch(/href=\{isSpanish \? "#paquetes" : "#packages"\}/);
    expect(source("components/packages-section.tsx")).toMatch(/<NeedsChooser locale=\{locale\} \/>/);
    const section = source("components/needs-chooser.tsx");
    expect(section).toMatch(/id=\{locale === "es" \? "paquetes" : "packages"\}/);
  });
});
