import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import YachtHospitalityPage, {
  metadata as enMetadata,
} from "../(english)/services/yacht-hospitality-video-fort-lauderdale/page";
import SpanishYachtHospitalityPage, {
  metadata as esMetadata,
} from "../(spanish)/es/video-para-yates-y-hospitalidad-fort-lauderdale/page";

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

function wordCount(markup: string) {
  return markup.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
}

describe("Yacht Hospitality Video Fort Lauderdale depth, guide links, and FAQPage schema", () => {
  it("renders substantive English yacht hospitality video page with guidance, links, and FAQPage JSON-LD", () => {
    // Metadata check
    expect(enMetadata.title).toBe(
      "Yacht Hospitality Video Fort Lauderdale | Marine Editing",
    );
    expect(enMetadata.title?.toString().length).toBeGreaterThanOrEqual(50);
    expect(enMetadata.title?.toString().length).toBeLessThanOrEqual(60);
    expect(enMetadata.description).toBe(
      "Fort Lauderdale yacht video editing and promotional marine post-production. Turn charter, broker, and waterfront hospitality footage into engaging video.",
    );
    expect(enMetadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(enMetadata.description?.length).toBeLessThanOrEqual(160);

    const markup = renderToStaticMarkup(React.createElement(YachtHospitalityPage));
    expect(wordCount(markup)).toBeGreaterThanOrEqual(400);

    // Internal guide & proof & tool links
    expect(markup).toContain('href="/portfolio/banacol"');
    expect(markup).toContain('href="/guides/drone-video-editing-guidelines-florida"');
    expect(markup).toContain('href="/guides/remote-video-editing-handoff"');
    expect(markup).toContain('href="/services/drone-video-editing-service-miami"');
    expect(markup).toContain('href="/services/short-form-video-editor-miami"');
    expect(markup).toContain('href="/services/restaurant-promo-video-editing-miami"');
    expect(markup).toContain('href="/calculator"');
    expect(markup).toContain('href="/contact"');

    // Schema checks
    expect(markup).toContain('"@type":"Service"');
    expect(markup).toContain('"@type":"FAQPage"');
    expect(markup).toContain(
      "What footage can a yacht charter or marine broker provide for video editing?",
    );
    expect(markup).toContain(
      "How do you manage wind noise, water splash, and engine roar in marine footage?",
    );
    expect(markup).toContain(
      "Can drone aerial footage be color graded and stabilized for yacht promos?",
    );
    expect(markup).toContain(
      "Do you deliver multi-format cuts for social media and website listings?",
    );
    expect(markup).toContain(
      "How does the file transfer and revision workflow work for marine video projects?",
    );
  });

  it("renders substantive Spanish yacht hospitality video page with guidance, links, and FAQPage JSON-LD", () => {
    // Metadata check
    const title =
      typeof esMetadata.title === "object" && esMetadata.title !== null && "absolute" in esMetadata.title
        ? esMetadata.title.absolute
        : String(esMetadata.title);
    expect(title).toBe(
      "Video para Yates y Hospitalidad en Fort Lauderdale",
    );
    expect(title.length).toBeGreaterThanOrEqual(50);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(esMetadata.description).toBe(
      "Video para yates y hospitalidad en Fort Lauderdale. Edición promocional para chárteres náuticos, brokers marinos y turismo con material del cliente.",
    );
    expect(esMetadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(esMetadata.description?.length).toBeLessThanOrEqual(160);

    const markup = renderToStaticMarkup(React.createElement(SpanishYachtHospitalityPage));
    expect(wordCount(markup)).toBeGreaterThanOrEqual(350);

    // Internal guide & proof links
    expect(markup).toContain('href="/es/portafolio/banacol"');
    expect(markup).toContain('href="/es/guias/guias-de-edicion-de-video-con-dron-florida"');
    expect(markup).toContain('href="/es/guias/entrega-para-edicion-remota-de-video"');

    // Schema checks
    expect(markup).toContain('"@type":"Service"');
    expect(markup).toContain('"@type":"FAQPage"');
    expect(markup).toContain(
      "¿Qué tipo de material puede suministrar una empresa de chárter o corretaje náutico?",
    );
    expect(markup).toContain(
      "¿Cómo optimizan el audio con ruido de viento, oleaje y motores marinos?",
    );
    expect(markup).toContain(
      "¿Pueden editar y estabilizar tomas aéreas capturadas desde embarcaciones?",
    );
    expect(markup).toContain(
      "¿Se entregan versiones para redes sociales y páginas web de corretaje?",
    );
    expect(markup).toContain(
      "¿Cómo funciona el proceso de envío de archivos y revisiones?",
    );
  });
});
