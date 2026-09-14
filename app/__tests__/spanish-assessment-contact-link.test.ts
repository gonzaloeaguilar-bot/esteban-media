import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import SpanishAssessmentPage from "../(spanish)/es/evaluacion/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

describe("Spanish strategy evaluation routes ready visitors to contact", () => {
  it("links the evaluation page to Spanish contact without expanding service claims", () => {
    const markup = renderToStaticMarkup(React.createElement(SpanishAssessmentPage));

    expect(markup).toContain('href="/es/contacto"');
    expect(markup).toContain("contacto en español");
    expect(markup).toContain("sin asumir producción, precios ni disponibilidad");
    expect(markup).toContain('href="/es/areas"');
  });
});
