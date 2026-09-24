import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import ContactPage, { metadata as enMetadata } from "../(english)/contact/page";
import SpanishContactPage, { metadata as esMetadata } from "../(spanish)/es/contacto/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

function wordCount(markup: string) {
  return markup.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

describe("Contact page depth, guides integration, and FAQPage schema", () => {
  it("renders substantive English contact page with guidance, links, and FAQPage JSON-LD", () => {
    // Metadata check
    // The page's own title already names the brand, so buildPageMetadata
    // wraps it in `{ absolute }` to stop the root layout's title template
    // from appending the brand a second time (fixed 2026-09-24).
    expect(enMetadata.title).toEqual({
      absolute: "Contact Esteban Moreno Media | Video Editing & Production",
    });
    const enTitleText = (enMetadata.title as { absolute: string }).absolute;
    expect(enTitleText.length).toBeGreaterThanOrEqual(50);
    expect(enTitleText.length).toBeLessThanOrEqual(60);
    expect(enMetadata.description).toBe(
      "Contact Esteban Moreno Media for video editing, AI content creation, social planning, and scoped South Florida production. Send your brief or project details.",
    );
    expect(enMetadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(enMetadata.description?.length).toBeLessThanOrEqual(160);

    const markup = renderToStaticMarkup(React.createElement(ContactPage));
    expect(wordCount(markup)).toBeGreaterThanOrEqual(450);

    // Internal guide & tool links
    expect(markup).toContain('href="/guides/write-a-useful-video-brief"');
    expect(markup).toContain('href="/guides/prepare-footage-for-video-editing"');
    expect(markup).toContain('href="/guides/remote-video-editing-handoff"');
    expect(markup).toContain('href="/calculator"');
    expect(markup).toContain('href="/areas"');

    // Schema checks
    expect(markup).toContain('"@type":"ContactPage"');
    expect(markup).toContain('"@type":"FAQPage"');
    expect(markup).toContain("What information should I include in my initial project brief?");
    expect(markup).toContain("How does remote video post-production work with client-supplied footage?");
    expect(markup).toContain("In which languages can we communicate during the project?");
    expect(markup).toContain("Is on-location videography available in Miami, Broward, and Palm Beach?");
    expect(markup).toContain("How are project quotes and pricing estimates determined?");
  });

  it("renders substantive Spanish contact page with guidance, links, and FAQPage JSON-LD", async () => {
    // Metadata check
    expect(esMetadata.title).toEqual({
      absolute: "Contacto en Español | Esteban Moreno Media Fort Lauderdale",
    });
    const esTitleText = (esMetadata.title as { absolute: string }).absolute;
    expect(esTitleText.length).toBeGreaterThanOrEqual(50);
    expect(esTitleText.length).toBeLessThanOrEqual(60);
    expect(esMetadata.description).toBe(
      "Contacta a Esteban Moreno Media en español para edición de video, contenido con IA y producción en South Florida. Envía tu brief o detalles del proyecto.",
    );
    expect(esMetadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(esMetadata.description?.length).toBeLessThanOrEqual(160);

    const resolvedPage = await SpanishContactPage({
      searchParams: Promise.resolve({}),
    });
    const markup = renderToStaticMarkup(resolvedPage);
    expect(wordCount(markup)).toBeGreaterThanOrEqual(450);

    // Internal guide & tool links
    expect(markup).toContain('href="/es/guias/como-escribir-un-brief-util-de-video"');
    expect(markup).toContain('href="/es/guias/preparar-material-para-edicion-de-video"');
    expect(markup).toContain('href="/es/guias/entrega-para-edicion-remota-de-video"');
    expect(markup).toContain('href="/es/calculadora"');
    expect(markup).toContain('href="/es/areas"');

    // Schema checks
    expect(markup).toContain('"@type":"ContactPage"');
    expect(markup).toContain('"@type":"FAQPage"');
    expect(markup).toContain("¿Qué información conviene incluir al enviar el brief inicial?");
    expect(markup).toContain("¿Cómo funciona el flujo de edición remota con material suministrado por el cliente?");
    expect(markup).toContain("¿En qué idioma se coordinan las consultas y revisiones del proyecto?");
    expect(markup).toContain("¿Se ofrece grabación en locación dentro de Miami-Dade, Broward y Palm Beach?");
    expect(markup).toContain("¿Cómo se calculan las cotizaciones y presupuestos de cada proyecto?");
  });
});
