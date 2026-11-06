import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PriorityLinks } from "@/components/priority-links";

describe("Fort Lauderdale Reels intent routing in Spanish short-form hub", () => {
  it("exposes the dedicated Fort Lauderdale Reels destination from Spanish short-form video editor page", () => {
    const html = renderToStaticMarkup(
      React.createElement(PriorityLinks, {
        path: "/es/editor-de-video-corto-para-redes-miami",
        locale: "es",
      }),
    );

    expect(html).toContain('href="/es/editor-de-reels-fort-lauderdale"');
    expect(html).toContain("Editor de Reels en Fort Lauderdale");
    expect(html).toContain("Edición remota de Reels para negocios de Broward a partir de clips propios.");
  });
});
