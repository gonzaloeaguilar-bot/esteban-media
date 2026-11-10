import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { PriorityLinks } from "@/components/priority-links";
import { priorityLinksFor } from "@/lib/priority-links";

describe("graph-qualified existing route repairs", () => {
  it("gives the Miami Reels route a server-rendered decision path", () => {
    const links = priorityLinksFor("/services/reels-editor-miami");
    expect(links.map((link) => link.href)).toEqual([
      "/reels-editing-cost-calculator",
      "/pricing",
      "/services/content-repurposing-service-miami",
      "/services/ugc-video-editor-ecommerce",
      "/services/personal-brand-video-editor-founders-miami",
    ]);
  });

  it.each([
    "/es/editor-de-reels-miami",
    "/es/edicion-de-variaciones-de-anuncios-ugc",
  ])("gives %s Spanish next steps without changing the city claim", (path) => {
    const links = priorityLinksFor(path);
    expect(links).toHaveLength(4);
    expect(links.every((link) => link.href.startsWith("/es/"))).toBe(true);
  });

  it("keeps the new paths in the initial HTML for crawlers and people without JavaScript", () => {
    const html = renderToStaticMarkup(
      React.createElement(PriorityLinks, {
        path: "/services/reels-editor-miami",
        locale: "en",
      }),
    );

    expect(html).toContain('href="/reels-editing-cost-calculator"');
    expect(html).toContain('href="/services/content-repurposing-service-miami"');
    expect(html).toContain('data-section="priority_links"');
  });
});
