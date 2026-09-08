import { describe, expect, it } from "vitest";

import { metadata as englishMetadata } from "../(english)/portfolio/page";
import { metadata as spanishMetadata } from "../(spanish)/es/portafolio/page";

describe("portfolio social metadata", () => {
  it("publishes localized canonical and Twitter metadata", () => {
    expect(englishMetadata.alternates?.canonical).toBe("/portfolio");
    expect(spanishMetadata.alternates?.canonical).toBe("/es/portafolio");
    expect(englishMetadata.twitter).toMatchObject({
      card: "summary_large_image",
      description: expect.stringContaining("real restaurant"),
    });
    expect(spanishMetadata.twitter).toMatchObject({
      card: "summary_large_image",
      description: expect.stringContaining("seleccionados"),
    });
    expect(englishMetadata.openGraph).toMatchObject({
      images: [
        expect.objectContaining({
          width: 1280,
          height: 720,
          alt: "Selected work by Esteban Moreno Media",
        }),
      ],
    });
    expect(spanishMetadata.openGraph).toMatchObject({
      images: [
        expect.objectContaining({
          width: 1280,
          height: 720,
          alt: "Trabajos seleccionados de Esteban Moreno Media",
        }),
      ],
    });
  });
});
