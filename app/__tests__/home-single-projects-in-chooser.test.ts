import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HomeProjectPath } from "@/components/home-project-path";
import { packagesCopy } from "@/lib/packages";
import { aLaCarteVisual } from "@/lib/a-la-carte-visuals";

const root = path.resolve(__dirname, "../..");

describe("single projects live inside the chooser, once", () => {
  for (const locale of ["en", "es"] as const) {
    const html = renderToStaticMarkup(React.createElement(HomeProjectPath, { locale }));
    // These four offers now live in the dedicated digital routes, rather than
    // duplicating them in the chooser's individual-service rows.
    const items = packagesCopy(locale).aLaCarte.items.filter((item) => !["ia", "seo", "auditoria", "automatizacion"].includes(item.id));

    it(`${locale}: every a-la-carte title and what-to-send sentence is in the server HTML`, () => {
      for (const item of items) {
        if (item.id === "grabacion") {
          expect(html).toContain(locale === "es" ? "Grabemos tu contenido" : "Film content with me");
          expect(html).toContain(aLaCarteVisual(item.id, locale).preparation.slice(0, 14));
          continue;
        }
        expect(html).toContain(item.title.replace(/&/g, "&amp;"));
        expect(html).toContain(aLaCarteVisual(item.id, locale).preparation.slice(0, 14));
      }
    });

    it(`${locale}: every option shows its price with zero taps, in the server HTML, and the photo floor is the real one`, () => {
      expect(html).toMatch(/em-path-offer-price[^>]*>\$450\/(mo|mes)</);
      expect(html).toMatch(/em-path-offer-price[^>]*>(From|Desde) \$640/);
      expect(html).toMatch(/em-path-offer-price[^>]*>(From|Desde) \$800/);
      expect(html).toMatch(/em-path-offer-name[^>]*>(Growth|Crecimiento)</);
      expect(html).toMatch(/em-path-offer-name[^>]*>(Local Presence|Presencia Local)</);
      // Editing is a buying choice (once, weekly, or scoped project), not a
      // fourth package card named Starter/Arranque.
      expect(html).toMatch(/em-pk-starter-tile__num[^>]*>\$100</);
      expect(html).not.toMatch(/em-path-offer-name[^>]*>(Starter|Arranque)</);
      expect(html).toMatch(/em-path-offer-name[^>]*>Essential</);
      expect(html).toMatch(/em-single-price[^>]*>(From|Desde) \$280/);
      expect(html).toMatch(/em-path-offer-price[^>]*>(From|Desde) \$1,000/);
      // the lane cards still do not repeat a "Starting price" label
      expect(html).not.toMatch(/em-art-price-label/);
    });

    it(`${locale}: native details, collapsed not removed`, () => {
      const standardRows = html.match(/<details class="em-single-item"/g) ?? [];
      const productionRows = html.match(/<details class="em-path-offer-details group\/offer" name="route-production/g) ?? [];
      const creatorFilmingRows = html.match(/<details class="em-path-offer-details group\/offer" name="route-creator-filming/g) ?? [];
      expect(standardRows.length + productionRows.length + creatorFilmingRows.length).toBe(items.length);
      expect(html).not.toMatch(/<details class="em-single-item"[^>]*open/);
      expect(html).not.toMatch(/<details class="em-path-offer-details group\/offer" name="route-production[^>]*open/);
    });

    it(`${locale}: one general WhatsApp link, no per-service WhatsApp rows`, () => {
      expect((html.match(/home_path_general_quote/g) ?? []).length).toBe(1);
      expect(html).not.toMatch(/a_la_carte_\w+_whatsapp/);
    });
  }

  it("neither home page renders the separate section", () => {
    for (const file of ["app/(english)/page.tsx", "app/(spanish)/es/page.tsx"]) {
      const src = fs.readFileSync(path.join(root, file), "utf8");
      expect(src).toMatch(/showALaCarte=\{false\}/);
    }
  });
});
