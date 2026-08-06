import { describe, expect, it } from "vitest";

import { buildSpanishNicheMetadata } from "../../components/spanish-niche-page";
import { buildPageMetadata } from "../../lib/site-metadata";
import { site, socialImage } from "../../lib/site";

describe("complete page metadata", () => {
  it("keeps canonical, Open Graph, and Twitter fields page-specific", () => {
    const metadata = buildPageMetadata({
      title: "Service Areas",
      description: "A focused description.",
      path: "/areas",
      locale: "en",
    });

    expect(metadata).toMatchObject({
      title: "Service Areas",
      description: "A focused description.",
      alternates: {
        canonical: "/areas",
      },
      openGraph: {
        title: `Service Areas | ${site.name}`,
        description: "A focused description.",
        url: "https://estebanmorenomedia.com/areas",
        locale: "en_US",
        images: [socialImage],
      },
      twitter: {
        title: `Service Areas | ${site.name}`,
        description: "A focused description.",
        images: [socialImage.url],
      },
    });
  });

  it("gives Spanish niche pages matching Open Graph and Twitter metadata", () => {
    const metadata = buildSpanishNicheMetadata("videografo-en-miami");

    expect(metadata).toMatchObject({
      title: "Videógrafo en Miami",
      alternates: {
        canonical: "/es/videografo-en-miami",
        languages: {
          "es-US": "/es/videografo-en-miami",
        },
      },
      openGraph: {
        title: `Videógrafo en Miami | ${site.name}`,
        url: "https://estebanmorenomedia.com/es/videografo-en-miami",
      },
      twitter: {
        title: `Videógrafo en Miami | ${site.name}`,
      },
    });
  });

  it("pairs the Pembroke Pines small-business pages with reciprocal hreflang", () => {
    const metadata = buildSpanishNicheMetadata(
      "video-para-pequenos-negocios-pembroke-pines",
    );

    expect(metadata.alternates).toMatchObject({
      canonical: "/es/video-para-pequenos-negocios-pembroke-pines",
      languages: {
        "en-US": "/services/small-business-video-pembroke-pines",
        "es-US": "/es/video-para-pequenos-negocios-pembroke-pines",
        "x-default": "/services/small-business-video-pembroke-pines",
      },
    });
  });
});
