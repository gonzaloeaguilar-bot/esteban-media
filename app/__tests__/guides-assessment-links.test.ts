import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import EnglishGuidesPage from "../(english)/guides/page";
import SpanishGuidesPage from "../(spanish)/es/guias/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

describe("guides hubs route visitors to diagnostic assessment", () => {
  it("links the English guides hub to the video strategy diagnostic without expanding service claims", () => {
    const markup = renderToStaticMarkup(React.createElement(EnglishGuidesPage));

    expect(markup).toContain('href="/assessment"');
    expect(markup).toContain("video strategy diagnostic");
  });

  it("links the Spanish guides hub to the video strategy evaluation without expanding service claims", () => {
    const markup = renderToStaticMarkup(React.createElement(SpanishGuidesPage));

    expect(markup).toContain('href="/es/evaluacion"');
    expect(markup).toContain("diagnóstico de estrategia de video");
  });
});
