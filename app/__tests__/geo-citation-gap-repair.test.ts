import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import RestaurantPromoPage, { metadata as restaurantMetadata } from "../(english)/services/restaurant-promo-video-editing-miami/page";
import ChatbotPage, { metadata as chatbotMetadata } from "../(english)/services/ai-chatbot-for-small-business/page";
import SpanishChatbotPage, { metadata as spanishChatbotMetadata } from "../(spanish)/es/chatbot-con-ia-para-negocios/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

describe("GEO citation-gap repair", () => {
  it("renders the Miami restaurant-videographer answer in the H1 and its metadata/schema", () => {
    const markup = renderToStaticMarkup(React.createElement(RestaurantPromoPage));
    expect(markup).toContain("Restaurant Videographer &amp; Promo Video Editing in Miami.");
    expect(markup).toContain("A Miami restaurant videographer for promo edits");
    expect(markup).toContain("Miami restaurant videographer and promo video editing");
    expect(restaurantMetadata.description).toContain("Miami restaurant videographer");
  });

  it("renders the Fort Lauderdale chatbot answer in the H1, metadata, and Service schema", () => {
    const markup = renderToStaticMarkup(React.createElement(ChatbotPage));
    expect(markup).toContain("AI chatbot for Fort Lauderdale small businesses.");
    expect(markup).toContain("builds AI chatbots for Fort Lauderdale small businesses");
    expect(markup).toContain("Custom AI chatbots for Fort Lauderdale small businesses");
    expect(chatbotMetadata.description).toContain("Fort Lauderdale small businesses");
  });

  it("renders the Spanish Miami chatbot answer in the H1, metadata, and Service schema", () => {
    const markup = renderToStaticMarkup(React.createElement(SpanishChatbotPage));
    expect(markup).toContain("Chatbot con IA para negocios en Miami.");
    expect(markup).toContain("construye chatbots con IA para negocios en Miami");
    expect(markup).toContain("Chatbots con IA a medida para negocios en Miami");
    expect(spanishChatbotMetadata.description).toContain("negocios en Miami");
  });
});
