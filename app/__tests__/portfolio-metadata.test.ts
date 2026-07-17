import { describe, expect, it } from "vitest";

import { metadata as englishMetadata } from "../portfolio/page";
import { metadata as spanishMetadata } from "../es/portafolio/page";

describe("portfolio social metadata", () => {
  it("publishes localized canonical and Twitter metadata", () => {
    expect(englishMetadata.alternates?.canonical).toBe("/portfolio");
    expect(spanishMetadata.alternates?.canonical).toBe("/es/portafolio");
    expect(englishMetadata.twitter).toMatchObject({
      card: "summary_large_image",
      description: expect.stringContaining("selected"),
    });
    expect(spanishMetadata.twitter).toMatchObject({
      card: "summary_large_image",
      description: expect.stringContaining("seleccionados"),
    });
  });
});
