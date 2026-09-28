import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { packageAnchor, packagesCopy, packagesFor, priceFor, whatsappHref } from "@/lib/packages";
import { PACKAGE_PRICES } from "@/lib/pricing";
import { site } from "@/lib/site";

const root = join(__dirname, "..", "..");
const source = (p: string) => readFileSync(join(root, p), "utf8");

describe("packages", () => {
  it("publishes Esteban's four packages in both languages, in the same order", () => {
    const es = packagesFor("es").map((p) => p.id);
    const en = packagesFor("en").map((p) => p.id);
    expect(es).toEqual(["arranque", "crecimiento", "presencia-local", "todo-incluido"]);
    expect(en).toEqual(es);
  });

  it("keeps Esteban's own starting prices, and only in lib/pricing.ts", () => {
    expect(PACKAGE_PRICES.arranque).toEqual({ kind: "from", amount: 200, unit: "project" });
    expect(PACKAGE_PRICES.crecimiento).toEqual({ kind: "from", amount: 640, unit: "month" });
    expect(PACKAGE_PRICES["presencia-local"]).toEqual({ kind: "from", amount: 800, unit: "production-day" });
    expect(PACKAGE_PRICES["todo-incluido"]).toEqual({ kind: "custom" });
    // No surface may paste a figure: the content and the component read the SSOT.
    for (const file of ["lib/packages.ts", "components/packages-section.tsx"]) {
      expect(source(file)).not.toMatch(/\$\s?\d{3}/);
      expect(source(file)).not.toMatch(/\b(200|640|800)\b/);
    }
  });

  it("resolves a price for every package", () => {
    for (const pkg of packagesFor("es")) expect(priceFor(pkg.id)).toBeDefined();
  });

  it("opens WhatsApp on Esteban's own number with the package already named", () => {
    const href = whatsappHref(site.phone.e164, "Hola Esteban, me interesa el paquete Arranque.");
    expect(href.startsWith("https://wa.me/13054974478?text=")).toBe(true);
    expect(decodeURIComponent(href.split("text=")[1])).toContain("Arranque");
  });

  it("gives every package card its own anchor id", () => {
    const anchors = packagesFor("es").map((p) => packageAnchor(p.id));
    expect(new Set(anchors).size).toBe(4);
    // The assertion used to be the literal string `id={packageAnchor(pkg.id)}`,
    // which broke the moment the value was hoisted to a const — a source-text
    // test failing on a rename while the behaviour it guards was untouched.
    // What has to stay true is that each card carries an id derived from
    // packageAnchor, and that the section still owns the four anchors.
    const src = source("components/packages-section.tsx");
    expect(src).toMatch(/const anchor = packageAnchor\(pkg\.id\)/);
    expect(src).toMatch(/id=\{anchor\}/);
    expect(src).toMatch(/aria-controls=\{`\$\{anchor\}-body`\}/);
  });

  it("only links a la carte items to routes that exist", () => {
    for (const locale of ["es", "en"] as const) {
      for (const item of packagesCopy(locale).aLaCarte.items) {
        if (!item.href) continue;
        const parts = item.href.split("/").filter(Boolean);
        const slug = parts[parts.length - 1];
        const exists =
          source("lib/growth-systems.ts").includes(`"${slug}"`) ||
          source("lib/spanish-site.ts").includes(`"${slug}"`) ||
          (() => {
            try {
              readFileSync(join(root, "app", locale === "es" ? "(spanish)" : "(english)", ...parts, "page.tsx"));
              return true;
            } catch {
              return false;
            }
          })();
        expect(exists, item.href).toBe(true);
      }
    }
  });

  it("carries no emoji in any package copy", () => {
    const text = JSON.stringify([packagesFor("es"), packagesFor("en"), packagesCopy("es").aLaCarte, packagesCopy("en").aLaCarte]);
    expect(text).not.toMatch(/\p{Extended_Pictographic}/u);
  });

  it("does not invent a Palm Beach promise the owner restricted", () => {
    expect(JSON.stringify(packagesFor("es"))).not.toMatch(/Palm Beach/);
    expect(JSON.stringify(packagesFor("en"))).not.toMatch(/Palm Beach/);
  });
});
