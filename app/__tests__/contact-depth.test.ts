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
      absolute: "Video Editing & South Florida Shoots | Esteban Moreno Media",
    });
    const enTitleText = (enMetadata.title as { absolute: string }).absolute;
    expect(enTitleText.length).toBeGreaterThanOrEqual(50);
    expect(enTitleText.length).toBeLessThanOrEqual(60);
    expect(enMetadata.description).toBe(
      "Start a video editing project or request a South Florida shoot. Send footage or filming needs, goal, deadline, and finished formats to Esteban Moreno Media.",
    );
    expect(enMetadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(enMetadata.description?.length).toBeLessThanOrEqual(160);

    const markup = renderToStaticMarkup(React.createElement(ContactPage));
    expect(wordCount(markup)).toBeGreaterThanOrEqual(450);
    expect(markup).toContain("Start your video editing project or South Florida shoot.");
    expect(markup).toContain("For video editing, send the footage you have, your goal, deadline, and the formats you need to publish.");

    // Internal guide & tool links
    expect(markup).toContain('href="/guides/write-a-useful-video-brief"');
    expect(markup).toContain('href="/guides/prepare-footage-for-video-editing"');
    expect(markup).toContain('href="/guides/remote-video-editing-handoff"');
    expect(markup).toContain('href="/calculator"');
    expect(markup).toContain('href="/areas"');
    expect(markup).toContain('data-cta="contact_service_areas"');
    expect(markup).toContain("Esteban is based in Fort Lauderdale and reviews on-location requests in Broward and Miami-Dade project by project.");
    expect(markup).toContain("include the city, preferred date, and what you need filmed");
    expect(markup).toContain("Copy an exhibitor or event brief");
    expect(markup).toContain("I am exhibiting at [event] in [city] on [date].");
    expect(markup).toContain("Si prefieres escribir en español");

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

    // Synchronous and argument-free: reading searchParams on the server made
    // /es/contacto render on demand (SEO/GEO audit 2026-10-10, fix 14).
    expect(SpanishContactPage.length).toBe(0);
    const resolvedPage = SpanishContactPage();
    expect(resolvedPage).not.toBeInstanceOf(Promise);
    const markup = renderToStaticMarkup(resolvedPage);
    // The allowlisted ?source= attribution survives, now resolved client-side.
    const { readFileSync } = await import("node:fs");
    expect(readFileSync("app/(spanish)/es/contacto/page.tsx", "utf8")).toContain(
      "querySources={[PEMBROKE_PINES_SOURCE, CAPTION_SAFE_ZONE_SOURCE, FOOTAGE_HANDOFF_SOURCE, \"reels-editor-fort-lauderdale\", \"short-form-editor-miami\", \"event-attendee-interview\", \"caption-guide\", \"real-estate-monthly-plan\", \"case-study\", ...CENTRAL_FLORIDA_CAPTURE_SOURCES]}",
    );
    expect(wordCount(markup)).toBeGreaterThanOrEqual(450);

    // Internal guide & tool links
    expect(markup).toContain('href="/es/guias/como-escribir-un-brief-util-de-video"');
    expect(markup).toContain('href="/es/guias/preparar-material-para-edicion-de-video"');
    expect(markup).toContain('href="/es/guias/entrega-para-edicion-remota-de-video"');
    expect(markup).toContain('href="/es/calculadora"');
    expect(markup).toContain('href="/es/areas"');
    expect(markup).toContain('data-cta="contact_service_areas"');
    expect(markup).toContain("Esteban trabaja desde Fort Lauderdale y evalúa cada grabación en Broward y Miami-Dade según el proyecto.");
    expect(markup).toContain("incluye la ciudad, la fecha deseada y qué necesitas grabar");
    expect(markup).toContain("Copiar un brief para expositor o evento");
    expect(markup).toContain("voy a exponer en [evento] en [ciudad] el [fecha]");
    expect(markup).toContain("If you prefer English");

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
