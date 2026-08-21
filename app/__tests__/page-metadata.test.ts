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

  it("verifies restaurant promo video editing metadata and snippet CTR criteria", async () => {
    const { metadata } = await import(
      "../(english)/services/restaurant-promo-video-editing-miami/page"
    );

    expect(metadata.title).toBe("Restaurant Promo Video Editing Miami");
    expect(metadata.description).toBe(
      "Professional restaurant promo video editing in Miami. High-retention food reels, dish spotlight cuts & social promo videos tailored for South Florida dining.",
    );
    expect(metadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(metadata.description?.length).toBeLessThanOrEqual(160);
    expect(metadata.description?.toLowerCase()).toContain(
      "restaurant promo video editing in miami",
    );
    expect(metadata.alternates?.canonical).toBe(
      "/services/restaurant-promo-video-editing-miami",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      "en-US": "/services/restaurant-promo-video-editing-miami",
      "es-US": "/es/edicion-de-video-promocional-para-restaurantes-miami",
      "x-default": "/services/restaurant-promo-video-editing-miami",
    });
  });

  it("verifies TikTok ad video editor metadata and snippet CTR criteria", async () => {
    const { metadata } = await import(
      "../(english)/services/tiktok-ad-video-editor-miami/page"
    );

    expect(metadata.title).toBe("TikTok Ad Video Editor Miami");
    expect(metadata.description).toBe(
      "Professional TikTok ad video editor in Miami. High-converting direct-response edits, 3-second hooks, dynamic captions & paid social video ads for brands.",
    );
    expect(metadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(metadata.description?.length).toBeLessThanOrEqual(160);
    expect(metadata.description?.toLowerCase()).toContain(
      "tiktok ad video editor in miami",
    );
    expect(metadata.alternates?.canonical).toBe(
      "/services/tiktok-ad-video-editor-miami",
    );
    expect(metadata.alternates?.languages).toMatchObject({
      "en-US": "/services/tiktok-ad-video-editor-miami",
      "es-US": "/es/editor-de-video-para-anuncios-de-tiktok-miami",
      "x-default": "/services/tiktok-ad-video-editor-miami",
    });
  });

  it("verifies yacht and hospitality video Fort Lauderdale metadata and snippet CTR criteria", async () => {
    const spanishMetadata = buildSpanishNicheMetadata(
      "video-para-yates-y-hospitalidad-fort-lauderdale",
    );

    expect(spanishMetadata.title).toBe(
      "Video Yates Hospitalidad Lauderdale",
    );
    expect(spanishMetadata.description).toBe(
      "Edición y producción de video para yates y hospitalidad en Fort Lauderdale. Videos promocionales para chárters, marcas marinas y venues frente al agua.",
    );
    expect(spanishMetadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(spanishMetadata.description?.length).toBeLessThanOrEqual(160);
    expect(spanishMetadata.description?.toLowerCase()).toContain(
      "video para yates y hospitalidad en fort lauderdale",
    );
    expect(spanishMetadata.alternates?.canonical).toBe(
      "/es/video-para-yates-y-hospitalidad-fort-lauderdale",
    );
    expect(spanishMetadata.alternates?.languages).toMatchObject({
      "en-US": "/services/yacht-hospitality-video-fort-lauderdale",
      "es-US": "/es/video-para-yates-y-hospitalidad-fort-lauderdale",
      "x-default": "/services/yacht-hospitality-video-fort-lauderdale",
    });

    const { metadata: englishMetadata } = await import(
      "../(english)/services/yacht-hospitality-video-fort-lauderdale/page"
    );

    expect(englishMetadata.title).toBe(
      "Yacht Hospitality Video Fort Lauderdale",
    );
    expect(englishMetadata.description).toBe(
      "Professional yacht and hospitality video production in Fort Lauderdale. Promotional video editing for charter companies, marine brands & waterfront venues.",
    );
    expect(englishMetadata.description?.length).toBeGreaterThanOrEqual(120);
    expect(englishMetadata.description?.length).toBeLessThanOrEqual(160);
    expect(englishMetadata.description?.toLowerCase()).toContain(
      "yacht and hospitality video production in fort lauderdale",
    );
    expect(englishMetadata.alternates?.canonical).toBe(
      "/services/yacht-hospitality-video-fort-lauderdale",
    );
    expect(englishMetadata.alternates?.languages).toMatchObject({
      "en-US": "/services/yacht-hospitality-video-fort-lauderdale",
      "es-US": "/es/video-para-yates-y-hospitalidad-fort-lauderdale",
      "x-default": "/services/yacht-hospitality-video-fort-lauderdale",
    });
  });
});
