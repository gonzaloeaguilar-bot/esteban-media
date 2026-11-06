import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import EnglishReelsPage from "../(english)/services/reels-editor-fort-lauderdale/page";
import EnglishShortFormPage from "../(english)/services/short-form-video-editor-miami/page";
import SpanishReelsPage from "../(spanish)/es/editor-de-reels-fort-lauderdale/page";
import SpanishHomePage from "../(spanish)/es/page";
import SpanishAreasPage from "../(spanish)/es/areas/page";

const pages = [
  ["English Fort Lauderdale Reels", EnglishReelsPage, "en"],
  ["Spanish Fort Lauderdale Reels", SpanishReelsPage, "es"],
  ["English short-form", EnglishShortFormPage, "en"],
] as const;

describe("food creator choice wedge", () => {
  it.each(pages)("%s serves both buyer choices with distinct WhatsApp payloads", (_name, Page, locale) => {
    const html = renderToStaticMarkup(React.createElement(Page));
    const restaurantCta = `food_creator_choice_${locale}_restaurant_whatsapp`;
    const creatorCta = `food_creator_choice_${locale}_creator_whatsapp`;

    expect(html).toContain(`data-cta="${restaurantCta}"`);
    expect(html).toContain(`data-cta="${creatorCta}"`);

    const restaurantHref = html.match(new RegExp(`<a[^>]+data-cta="${restaurantCta}"[^>]+href="([^"]+)"|<a[^>]+href="([^"]+)"[^>]+data-cta="${restaurantCta}"`));
    const creatorHref = html.match(new RegExp(`<a[^>]+data-cta="${creatorCta}"[^>]+href="([^"]+)"|<a[^>]+href="([^"]+)"[^>]+data-cta="${creatorCta}"`));
    const restaurantPayload = restaurantHref?.[1] ?? restaurantHref?.[2];
    const creatorPayload = creatorHref?.[1] ?? creatorHref?.[2];

    expect(restaurantPayload).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(creatorPayload).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(restaurantPayload!)).not.toEqual(decodeURIComponent(creatorPayload!));
    expect(decodeURIComponent(restaurantPayload!)).toMatch(/restaurant|restaurante/i);
    expect(decodeURIComponent(creatorPayload!)).toMatch(/food-and-places|comida y lugares/i);
  });

  it("routes the Spanish home and Fort Lauderdale area hub directly to the Spanish Reels page", () => {
    const home = renderToStaticMarkup(React.createElement(SpanishHomePage));
    const areas = renderToStaticMarkup(React.createElement(SpanishAreasPage));
    const href = "/es/editor-de-reels-fort-lauderdale";

    expect(home).toContain(`href="${href}"`);
    expect(home).toContain("Editor de video y Reels en Fort Lauderdale");
    expect(areas).toContain(`href="${href}"`);
    expect(areas).toContain("editor de Reels en Fort Lauderdale");
  });
});
