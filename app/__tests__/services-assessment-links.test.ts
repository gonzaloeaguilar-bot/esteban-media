import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import ServicesPage from "../(english)/services/page";
import SpanishServicesPage from "../(spanish)/es/servicios/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

describe("services hubs route visitors to diagnostic assessment", () => {
  it("links the English services hub to the video strategy diagnostic", () => {
    const markup = renderToStaticMarkup(React.createElement(ServicesPage));

    expect(markup).toContain('href="/assessment"');
    expect(markup).toContain("video strategy diagnostic");
    expect(markup).toContain("Try the diagnostic");
  });

  it("links the Spanish services hub to the video strategy evaluation", () => {
    const markup = renderToStaticMarkup(React.createElement(SpanishServicesPage));

    expect(markup).toContain('href="/es/evaluacion"');
    expect(markup).toContain("evaluación de estrategia de video");
    expect(markup).toContain("Probar la evaluación");
  });
});
