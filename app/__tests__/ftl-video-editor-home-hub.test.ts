import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HomeClosingLinks } from "@/components/home-closing-links";

describe("Fort Lauderdale video editor intent routing from Spanish home closing hubs", () => {
  it("exposes the dedicated Fort Lauderdale video production destination with exact Spanish query wording", () => {
    const html = renderToStaticMarkup(
      React.createElement(HomeClosingLinks, {
        locale: "es",
      }),
    );

    expect(html).toContain('href="/es/produccion-de-video-fort-lauderdale"');
    expect(html).toContain("editor de video Fort Lauderdale");
  });
});
