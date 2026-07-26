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

describe("guide routes", () => {
  it("pre-renders eight localized detail routes in each language", async () => {
    const enParams = await generateEnglishParams();
    const esParams = await generateSpanishParams();

    expect(enParams).toEqual([
      { slug: "prepare-footage-for-video-editing" },
      { slug: "write-a-useful-video-brief" },
      { slug: "vertical-horizontal-video-exports-and-safe-zones" },
      { slug: "remote-video-editing-handoff" },
      { slug: "how-to-use-instagram-reels-for-business" },
      { slug: "video-content-ideas-for-restaurants" },
      { slug: "instagram-reels-ideas-for-real-estate" },
      { slug: "how-to-use-ai-for-product-photography" },
      { slug: "how-much-does-product-photography-cost" },
      { slug: "ai-product-photography-vs-traditional-studio" },
      { slug: "video-editor-vs-videographer" },
      { slug: "remote-vs-local-video-editing" },
      { slug: "corporate-video-production-cost-miami" },
      { slug: "record-video-with-iphone-for-professional-editing" },
      { slug: "reels-vs-tiktok-vs-shorts-for-local-business" },
      { slug: "ai-video-editing-vs-human-editor" },
      { slug: "how-to-choose-a-video-editor-in-miami" },
    ]);
    expect(esParams.map(({ slug }) => slug)).toEqual([
      "preparar-material-para-edicion-de-video",
      "como-escribir-un-brief-util-de-video",
      "video-vertical-horizontal-y-zonas-seguras",
      "entrega-para-edicion-remota-de-video",
      "como-usar-instagram-reels-para-tu-negocio",
      "ideas-de-contenido-de-video-para-restaurantes",
      "ideas-de-reels-para-agentes-de-bienes-raices",
      "como-usar-inteligencia-artificial-para-fotografia-de-producto",
      "cuanto-cuesta-la-fotografia-de-producto",
      "fotografia-de-producto-con-ia-vs-estudio-tradicional",
      "editor-de-video-vs-videografo",
      "edicion-remota-vs-estudio-local",
      "cuanto-cuesta-la-produccion-de-video-corporativo-miami",
      "grabar-video-con-iphone-para-edicion-profesional",
      "reels-vs-tiktok-vs-shorts-para-negocios-locales",
      "edicion-de-video-con-ia-vs-editor-profesional",
      "como-elegir-un-editor-de-video-en-miami",
    ]);
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
});
