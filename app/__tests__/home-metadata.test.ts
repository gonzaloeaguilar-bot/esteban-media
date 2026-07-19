import { describe, expect, it } from "vitest";

import { metadata as spanishHomeMetadata } from "../(spanish)/es/page";
import {
  englishRootMetadata,
  spanishRootMetadata,
} from "../../lib/site-metadata";
import { site, socialImage } from "../../lib/site";

describe("localized home metadata", () => {
  it("publishes concise English and Spanish root metadata", () => {
    expect(englishRootMetadata).toMatchObject({
      title: {
        default: `Video Editor in Fort Lauderdale | ${site.name}`,
        template: `%s | ${site.name}`,
      },
      description: site.description,
      openGraph: {
        locale: "en_US",
        images: [socialImage],
      },
      twitter: {
        images: [socialImage.url],
      },
    });
    expect(spanishRootMetadata).toMatchObject({
      title: {
        default: `Edición de Video en Fort Lauderdale | ${site.name}`,
        template: `%s | ${site.name}`,
      },
      openGraph: {
        locale: "es_US",
        images: [socialImage],
      },
    });
    expect(spanishHomeMetadata).toMatchObject({
      title: "Edición de Video en Fort Lauderdale",
      openGraph: {
        title: `Edición de Video en Fort Lauderdale | ${site.name}`,
        images: [socialImage],
      },
    });
  });
});
