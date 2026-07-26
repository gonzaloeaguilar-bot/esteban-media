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
  it("pre-renders seven localized detail routes in each language", () => {
    expect(generateEnglishParams()).toEqual([
      { slug: "prepare-footage-for-video-editing" },
      { slug: "write-a-useful-video-brief" },
      { slug: "vertical-horizontal-video-exports-and-safe-zones" },
      { slug: "remote-video-editing-handoff" },
      { slug: "how-to-use-instagram-reels-for-business" },
      { slug: "video-content-ideas-for-restaurants" },
      { slug: "instagram-reels-ideas-for-real-estate" },
    ]);
    expect(generateSpanishParams()).toEqual([
      { slug: "preparar-material-para-edicion-de-video" },
      { slug: "como-escribir-un-brief-util-de-video" },
      { slug: "video-vertical-horizontal-y-zonas-seguras" },
      { slug: "entrega-para-edicion-remota-de-video" },
      { slug: "como-usar-instagram-reels-para-tu-negocio" },
      { slug: "ideas-de-contenido-de-video-para-restaurantes" },
      { slug: "ideas-de-reels-para-agentes-de-bienes-raices" },
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
