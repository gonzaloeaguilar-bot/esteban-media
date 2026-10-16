import React from "react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AboutTeaser } from "@/components/about-teaser";
import { ContactCta } from "@/components/contact-cta";

const source = (path: string) => readFileSync(join(process.cwd(), path), "utf8");

describe("homepage funnel polish", () => {
  it("keeps the English homepage and About page in the English service-area route", () => {
    const teaser = renderToStaticMarkup(React.createElement(AboutTeaser));
    const about = source("app/(english)/about/page.tsx");

    expect(teaser).toContain('href="/areas"');
    expect(teaser).toContain("service areas");
    expect(teaser).not.toContain('href="/es/areas"');
    expect(about).toContain('href="/areas"');
    expect(about).toContain("service areas");
    expect(about).not.toContain('href="/es/areas"');
  });

  it.each([
    ["en", "Best when you want a complete written quote with the project details in one message."],
    ["es", "Ideal si quieres una cotización escrita completa con los detalles del proyecto en un solo mensaje."],
  ] as const)("explains the optional detailed brief in %s without moving direct contact behind it", (locale, hint) => {
    const html = renderToStaticMarkup(React.createElement(ContactCta, { locale }));
    const detailsAt = html.indexOf("<details");

    expect(detailsAt).toBeGreaterThan(-1);
    expect(html).toContain(hint);
    expect(html.indexOf(hint)).toBeGreaterThan(detailsAt);
    expect(html.indexOf('data-cta="home_contact_whatsapp"')).toBeLessThan(detailsAt);
    expect(html.indexOf('data-cta="home_contact_email"')).toBeLessThan(detailsAt);
    expect(html.indexOf('data-cta="home_contact_phone"')).toBeLessThan(detailsAt);
  });
});
