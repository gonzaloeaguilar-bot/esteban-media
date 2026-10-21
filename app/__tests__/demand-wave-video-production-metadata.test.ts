import { describe, expect, it } from "vitest";

import { metadata as englishMetadata } from "../(english)/services/video-production-fort-lauderdale/page";
import { metadata as spanishMetadata } from "../(spanish)/es/produccion-de-video-fort-lauderdale/page";

function titleText(title: typeof englishMetadata.title): string {
  return typeof title === "string" ? title : (title as { absolute: string }).absolute;
}

describe("demand-wave Fort Lauderdale video production metadata", () => {
  it("keeps the evidence-backed EN/ES service pair specific, reciprocal, and snippet-sized", () => {
    expect(titleText(englishMetadata.title)).toBe(
      "Fort Lauderdale Video Production & Editing for Businesses",
    );
    expect(englishMetadata.description).toBe(
      "Fort Lauderdale video production and editing for businesses that need website video, social clips, or a scoped local shoot. Send your goal and existing footage.",
    );
    expect(englishMetadata.alternates?.languages).toMatchObject({
      "en-US": "/services/video-production-fort-lauderdale",
      "es-US": "/es/produccion-de-video-fort-lauderdale",
    });

    expect(titleText(spanishMetadata.title)).toBe(
      "Producción de Video Fort Lauderdale",
    );
    expect(spanishMetadata.description).toBe(
      "Producción y edición de video para negocios de Fort Lauderdale y Broward: grabación local o edición remota, con alcance definido por proyecto.",
    );
    expect(spanishMetadata.alternates?.languages).toMatchObject({
      "en-US": "/services/video-production-fort-lauderdale",
      "es-US": "/es/produccion-de-video-fort-lauderdale",
    });

    expect(titleText(englishMetadata.title).length).toBeGreaterThanOrEqual(50);
    expect(titleText(englishMetadata.title).length).toBeLessThanOrEqual(60);
    expect(`${titleText(spanishMetadata.title)} | Esteban Moreno Media`.length).toBeLessThanOrEqual(60);

    for (const metadata of [englishMetadata, spanishMetadata]) {
      expect(metadata.description?.length).toBeGreaterThanOrEqual(120);
      expect(metadata.description?.length).toBeLessThanOrEqual(160);
    }
  });
});
