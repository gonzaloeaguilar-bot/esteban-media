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
    const items = packagesCopy(locale).aLaCarte.items;

    it(`${locale}: every a-la-carte title, note and what-to-send sentence is in the server HTML`, () => {
      for (const item of items) {
        expect(html).toContain(item.title.replace(/&/g, "&amp;"));
        if (item.note) expect(html).toContain(item.note);
        expect(html).toContain(aLaCarteVisual(item.id, locale).preparation.slice(0, 14));
      }
    });

    it(`${locale}: every option shows its price with zero taps, in the server HTML, and the photo floor is the real one`, () => {
      expect(html).toMatch(/em-camera-chooser__stop[^>]*>[\s\S]*?(From|Desde) \$450/);
      // Business shows its monthly plan on the camera stop (one short line that never
      // wraps) and BOTH of its prices, named as /pricing names them, on the card.
      expect(html).toMatch(/em-camera-chooser__stop[^>]*>[\s\S]*?(From|Desde) \$640/);
      expect(html).toMatch(/em-camera-chooser__stop[^>]*>[\s\S]*?(From|Desde) \$100/);
      expect(html).toMatch(/em-path-offer-price[^>]*>(From|Desde) \$640/);
      expect(html).toMatch(/em-path-offer-price[^>]*>(From|Desde) \$800/);
      expect(html).toMatch(/em-path-offer-name[^>]*>(Growth|Crecimiento)</);
      expect(html).toMatch(/em-path-offer-name[^>]*>(Local Presence|Presencia Local)</);
      expect(html).toMatch(/em-path-offer-name[^>]*>(Starter|Arranque)</);
      expect(html).toMatch(/em-path-offer-name[^>]*>Essential</);
      expect(html).toMatch(/em-single-price[^>]*>(From|Desde) \$280/);
      expect(html).toMatch(/em-single-price[^>]*>(From|Desde) \$400/);
      // the lane cards still do not repeat a "Starting price" label
      expect(html).not.toMatch(/em-art-price-label/);
    });

    it(`${locale}: native details, collapsed not removed`, () => {
      const rows = html.match(/<details class="em-single-item"/g) ?? [];
      expect(rows).toHaveLength(items.length);
      expect(html).not.toMatch(/<details class="em-single-item"[^>]*open/);
    });

    it(`${locale}: one WhatsApp link in the single-project lane, no per-card WhatsApp rows`, () => {
      expect((html.match(/home_path_single_whatsapp/g) ?? []).length).toBe(1);
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
