import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PriorityLinks } from "@/components/priority-links";

describe("Miami Reels intent consolidation", () => {
  it.each([
    [
      "en",
      "/services/restaurant-promo-video-editing-miami",
      "/services/reels-editor-miami",
      "Reels editor in Miami",
    ],
    [
      "es",
      "/es/edicion-de-video-promocional-para-restaurantes-miami",
      "/es/editor-de-reels-miami",
      "Editor de Reels en Miami",
    ],
  ] as const)("%s restaurant promotion pages distinguish the general Reels destination", (locale, source, href, label) => {
    const html = renderToStaticMarkup(
      React.createElement(PriorityLinks, { path: source, locale }),
    );

    expect(html).toContain(`href="${href}"`);
    expect(html).toContain(label);
  });
});
