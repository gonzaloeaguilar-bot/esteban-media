import { describe, expect, it } from "vitest";

import {
  generateMetadata as generateEnglishMetadata,
  generateStaticParams as generateEnglishParams,
} from "../(english)/guides/[slug]/page";
import { metadata as englishIndexMetadata } from "../(english)/guides/page";
import {
  generateMetadata as generateSpanishMetadata,
  generateStaticParams as generateSpanishParams,
} from "../(spanish)/es/guias/[slug]/page";
import { metadata as spanishIndexMetadata } from "../(spanish)/es/guias/page";
import { getGuideSupportLinks } from "@/lib/guides";

describe("guide routes", () => {
  it("pre-renders eight localized detail routes in each language", async () => {
    const enParams = await generateEnglishParams();
    const esParams = await generateSpanishParams();

    expect(enParams).toHaveLength(39);
    expect(esParams).toHaveLength(39);
    expect(enParams.map(({ slug }) => slug)).toContain("video-production-cost-fort-lauderdale");
    expect(esParams.map(({ slug }) => slug)).toContain("cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale");
  });

  it("keeps index and detail canonicals localized", async () => {
    expect(englishIndexMetadata.alternates?.canonical).toBe("/guides");
    expect(spanishIndexMetadata.alternates?.canonical).toBe("/es/guias");

    const englishMetadata = await generateEnglishMetadata({
      params: Promise.resolve({ slug: "write-a-useful-video-brief" }),
    });
    const spanishMetadata = await generateSpanishMetadata({
      params: Promise.resolve({ slug: "como-escribir-un-brief-util-de-video" }),
    });

    expect(englishMetadata).toMatchObject({
      title: "Write a Useful Video Brief",
      alternates: {
        canonical: "/guides/write-a-useful-video-brief",
        languages: {
          "en-US": "/guides/write-a-useful-video-brief",
          "es-US": "/es/guias/como-escribir-un-brief-util-de-video",
        },
      },
    });
    expect(spanishMetadata).toMatchObject({
      title: "Escribir un Brief de Video",
      alternates: {
        canonical: "/es/guias/como-escribir-un-brief-util-de-video",
        languages: {
          "en-US": "/guides/write-a-useful-video-brief",
          "es-US": "/es/guias/como-escribir-un-brief-util-de-video",
        },
      },
    });
  });

  it("keeps guide support links connected to services and pricing paths", () => {
    const enLinks = getGuideSupportLinks("en").map((link) => link.href);
    const esLinks = getGuideSupportLinks("es").map((link) => link.href);

    expect(enLinks).toContain("/services/short-form-video-editor-miami");
    expect(enLinks).toContain("/services/ai-product-photography-miami");
    expect(enLinks).toContain("/pricing");
    expect(esLinks).toContain("/es/editor-de-video-corto-para-redes-miami");
    expect(esLinks).toContain("/es/fotografia-de-producto-con-ia-miami");
    expect(esLinks).toContain("/es/precios");
  });
});
