import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { EventContentPage, EventsHubPage } from "@/components/event-content-page";
import { EVENTS } from "@/lib/events";
import { RAW_FILMING_RATES, SHORT_FORM, usd } from "@/lib/pricing";

describe("events restructure & dual-audience collapsible depth", () => {
  it("renders native <details> elements on both event pages and hubs", () => {
    const eventEn = renderToStaticMarkup(React.createElement(EventContentPage, { id: "art-basel", locale: "en" }));
    const eventEs = renderToStaticMarkup(React.createElement(EventContentPage, { id: "art-basel", locale: "es" }));
    const hubEn = renderToStaticMarkup(React.createElement(EventsHubPage, { locale: "en" }));
    const hubEs = renderToStaticMarkup(React.createElement(EventsHubPage, { locale: "es" }));

    // At least the details depth container and collapsible FAQs
    expect((eventEn.match(/<details/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect((eventEs.match(/<details/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect((hubEn.match(/<details/g) ?? []).length).toBeGreaterThanOrEqual(2);
    expect((hubEs.match(/<details/g) ?? []).length).toBeGreaterThanOrEqual(2);
  });

  it("labels listed edition dates with 'confirm dates with organizer'", () => {
    // Art Basel's dates were read on the organizer's site on 2026-11-26 and now
    // carry the "official dates" label; a guide-listed event keeps this one.
    const eventEn = renderToStaticMarkup(React.createElement(EventContentPage, { id: "sobewff", locale: "en" }));
    const eventEs = renderToStaticMarkup(React.createElement(EventContentPage, { id: "sobewff", locale: "es" }));
    const officialEn = renderToStaticMarkup(React.createElement(EventContentPage, { id: "art-basel", locale: "en" }));
    const officialEs = renderToStaticMarkup(React.createElement(EventContentPage, { id: "art-basel", locale: "es" }));
    expect(officialEn).toContain("Official dates for 2026 (from the organizer&#x27;s site)");
    expect(officialEs).toContain("Fechas oficiales para 2026 (del sitio del organizador)");
    const hubEn = renderToStaticMarkup(React.createElement(EventsHubPage, { locale: "en" }));
    const hubEs = renderToStaticMarkup(React.createElement(EventsHubPage, { locale: "es" }));

    expect(eventEn).toContain("confirm dates with organizer");
    expect(hubEn).toContain("confirm dates with organizer");
    expect(eventEs).toContain("confirmar fechas con el organizador");
    expect(hubEs).toContain("confirmar fechas con el organizador");
  });

  it("top screen of Art Basel event page includes answer, what Esteban films, pricing and contact", () => {
    const eventEn = renderToStaticMarkup(React.createElement(EventContentPage, { id: "art-basel", locale: "en" }));
    const topScreen = eventEn.split("<details")[0];

    // Answer-first
    expect(topScreen).toContain("How can a gallery or pop-up get Art Week content without a production crew?");
    // What Esteban films & prices from lib/pricing.ts
    expect(topScreen).toContain(usd(RAW_FILMING_RATES.halfDay));
    expect(topScreen).toContain(usd(RAW_FILMING_RATES.fullDay));
    expect(topScreen).toContain(usd(SHORT_FORM.perVideoFrom));
    // Contact actions
    expect(topScreen).toContain("data-cta=\"event_art_basel_hero_whatsapp\"");
    expect(topScreen).toContain("data-cta=\"event_art_basel_hero_quote\"");
  });

  it("events hub features an answer-first intro and a scannable event list", () => {
    const hubEn = renderToStaticMarkup(React.createElement(EventsHubPage, { locale: "en" }));
    const topBeforeSeasons = hubEn.split("events_hub_calendar_depth")[0];

    expect(topBeforeSeasons).toContain("How should a small business plan content around a South Florida event?");
    expect(topBeforeSeasons).toContain("data-section=\"events_hub_scannable_list\"");

    for (const event of EVENTS) {
      const escapedName = event.name.replace(/&/g, "&amp;");
      expect(topBeforeSeasons).toContain(escapedName);
    }
  });

  it("reduces word count of visible-by-default text on Art Basel page", () => {
    const eventEn = renderToStaticMarkup(React.createElement(EventContentPage, { id: "art-basel", locale: "en" }));

    // Total content inside server markup (excluding script tag)
    const contentWithoutScript = eventEn.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, " ");
    const totalWords = contentWithoutScript.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;

    // Visible-by-default text (outside <details> and <script>)
    const outsideDetails = contentWithoutScript
      .replace(/<details\b[\s\S]*?<\/details>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const visibleWords = outsideDetails.split(" ").length;

    expect(visibleWords).toBeLessThan(totalWords);
    expect(visibleWords).toBeLessThan(750);
  });
});
