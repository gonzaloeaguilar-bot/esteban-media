import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { HeroProjectIntake } from "@/components/hero-project-intake";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

describe("homepage technology inquiry shortcuts", () => {
  it.each([
    ["en", ["AI chatbots", "Email and SMS follow-up", "Website design"]],
    ["es", ["Chatbots con IA", "Seguimiento por email y SMS", "Diseño web"]],
  ] as const)("offers the primary services in order for %s without submitting", (locale, labels) => {
    const html = renderToStaticMarkup(React.createElement(HeroProjectIntake, { locale }));
    const buttons = [...html.matchAll(/<button\b([^>]*)>(.*?)<\/button>/g)]
      .filter((match) => match[1].includes('type="button"'));
    expect(buttons.map((match) => match[2])).toEqual([...labels]);
    for (const [, attributes] of buttons) {
      expect(attributes).toContain('aria-pressed="false"');
      expect(attributes).toContain(`aria-controls="hero-project-need-${locale}"`);
    }
    const field = html.match(/<input[^>]*id="hero-project-need-[^"]*"[^>]*>/)?.[0];
    expect(field).toContain('name="projectNeed"');
    expect(field).toContain('required=""');
  });
});
