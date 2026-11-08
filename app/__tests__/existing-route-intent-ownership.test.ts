import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import MiamiReelsPage from "../(english)/services/reels-editor-miami/page";
import ShortFormMiamiPage from "../(english)/services/short-form-video-editor-miami/page";
import YoutubeEditingPage from "../(english)/services/youtube-video-editing-service-miami/page";
import RestaurantPromoPage from "../(english)/services/restaurant-promo-video-editing-miami/page";

describe("existing-route intent ownership", () => {
  it("keeps the Miami Reels and multi-platform short-form paths distinct and reciprocal", () => {
    const reels = renderToStaticMarkup(React.createElement(MiamiReelsPage));
    const shortForm = renderToStaticMarkup(React.createElement(ShortFormMiamiPage));

    expect(reels).toContain("This page owns the direct Miami Reels question.");
    expect(reels).toContain('href="/services/short-form-video-editor-miami"');
    expect(shortForm).toContain("Miami Reels editing page");
    expect(shortForm).toContain('href="/services/reels-editor-miami"');
  });

  it("sends long-form YouTube and food-creator intent to their existing owners", () => {
    const youtube = renderToStaticMarkup(React.createElement(YoutubeEditingPage));
    const restaurant = renderToStaticMarkup(React.createElement(RestaurantPromoPage));

    expect(youtube).toContain("This page is for a full YouTube episode, not vertical social cuts.");
    expect(youtube).toContain('href="/services/short-form-video-editor-miami"');
    expect(restaurant).toContain("This page is for a restaurant");
    expect(restaurant).toContain("own promotion.");
    expect(restaurant).toContain('href="/services/food-and-places-creator-video-editing-miami"');
  });
});
