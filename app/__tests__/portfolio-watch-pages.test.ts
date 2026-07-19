import * as React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { PortfolioWatchPage } from "@/components/portfolio-watch-page";
import {
  getPortfolioWatchCopy,
  getPortfolioWatchItems,
  getPortfolioWatchLanguages,
  getPortfolioWatchPath,
  type PortfolioWatchLocale,
} from "@/lib/portfolio-watch";

import EnglishPage, {
  generateMetadata as generateEnglishMetadata,
  generateStaticParams as generateEnglishStaticParams,
} from "../(english)/portfolio/[id]/page";
import SpanishPage, {
  generateMetadata as generateSpanishMetadata,
  generateStaticParams as generateSpanishStaticParams,
} from "../(spanish)/es/portafolio/[id]/page";

const locales: readonly PortfolioWatchLocale[] = ["en", "es"];
type ReactElement = React.ReactElement;
type ReactNode = React.ReactNode;

beforeAll(() => vi.stubGlobal("React", React));
afterAll(() => vi.unstubAllGlobals());

function collectElements(node: ReactNode, elements: ReactElement[] = []) {
  if (Array.isArray(node)) {
    for (const child of node) collectElements(child, elements);
    return elements;
  }

  if (!React.isValidElement(node)) {
    return elements;
  }

  elements.push(node);
  collectElements(
    (node.props as { children?: ReactNode }).children,
    elements,
  );
  return elements;
}

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textContent).join(" ");
  }
  if (!React.isValidElement(node)) {
    return "";
  }
  return textContent((node.props as { children?: ReactNode }).children);
}

describe("portfolio watch routes", () => {
  it("pre-renders all eight ids in each language", () => {
    const ids = getPortfolioWatchItems().map((item) => ({ id: item.id }));

    expect(generateEnglishStaticParams()).toEqual(ids);
    expect(generateSpanishStaticParams()).toEqual(ids);
  });

  it("publishes unique localized metadata, canonicals, and reciprocal hreflang", async () => {
    const englishDescriptions = new Set<string>();
    const spanishDescriptions = new Set<string>();

    for (const item of getPortfolioWatchItems()) {
      const english = await generateEnglishMetadata({
        params: Promise.resolve({ id: item.id }),
      });
      const spanish = await generateSpanishMetadata({
        params: Promise.resolve({ id: item.id }),
      });
      const languages = getPortfolioWatchLanguages(item.id);

      expect(english.alternates).toMatchObject({
        canonical: getPortfolioWatchPath(item.id, "en"),
        languages,
      });
      expect(spanish.alternates).toMatchObject({
        canonical: getPortfolioWatchPath(item.id, "es"),
        languages,
      });
      expect(english.openGraph).toMatchObject({
        url: `https://estebanmorenomedia.com/portfolio/${item.id}`,
        locale: "en_US",
        images: [expect.objectContaining({ url: expect.stringContaining(item.media.poster) })],
      });
      expect(spanish.openGraph).toMatchObject({
        url: `https://estebanmorenomedia.com/es/portafolio/${item.id}`,
        locale: "es_US",
        images: [expect.objectContaining({ url: expect.stringContaining(item.media.poster) })],
      });

      englishDescriptions.add(String(english.description));
      spanishDescriptions.add(String(spanish.description));
    }

    expect(englishDescriptions.size).toBe(8);
    expect(spanishDescriptions.size).toBe(8);
  });

  it("keeps the real 4:3 La Huelga poster dimensions in social metadata", async () => {
    const metadata = await generateEnglishMetadata({
      params: Promise.resolve({ id: "la-huelga" }),
    });

    expect(metadata.openGraph).toMatchObject({
      images: [expect.objectContaining({ width: 480, height: 360 })],
    });
  });

  it("returns the shared localized page from both route modules", async () => {
    const english = await EnglishPage({
      params: Promise.resolve({ id: "my-dler" }),
    });
    const spanish = await SpanishPage({
      params: Promise.resolve({ id: "my-dler" }),
    });

    expect(english.type).toBe(PortfolioWatchPage);
    expect(english.props).toMatchObject({ locale: "en" });
    expect(spanish.type).toBe(PortfolioWatchPage);
    expect(spanish.props).toMatchObject({ locale: "es" });
  });
});

describe("rendered portfolio watch-page evidence", () => {
  it("renders a discoverable iframe, local poster, facts, breadcrumbs, schema, and links for every page", () => {
    for (const item of getPortfolioWatchItems()) {
      for (const locale of locales) {
        const copy = getPortfolioWatchCopy(item, locale);
        const page = PortfolioWatchPage({ item, locale });
        const elements = collectElements(page);
        const iframe = elements.find((element) => element.type === "iframe");
        const localPoster = elements.find(
          (element) =>
            (element.props as { src?: string }).src === item.media.poster,
        );
        const hrefs = elements
          .map((element) => (element.props as { href?: string }).href)
          .filter((href): href is string => typeof href === "string");
        const jsonLd = elements.find(
          (element) =>
            element.type === "script" &&
            (element.props as { type?: string }).type === "application/ld+json",
        );
        const visibleText = textContent(page);

        expect(iframe?.props).toMatchObject({
          src: `https://www.youtube-nocookie.com/embed/${item.media.videoId}?playsinline=1&rel=0`,
          loading: "eager",
          allowFullScreen: true,
        });
        expect(localPoster).toBeDefined();
        expect(
          (localPoster?.props as { alt?: string } | undefined)?.alt,
        ).toBe("");
        expect(hrefs).toContain(item.media.url);
        expect(hrefs).toContain(
          locale === "es" ? "/es/portafolio" : "/portfolio",
        );
        expect(hrefs).toContain(
          getPortfolioWatchPath(item.id, locale === "es" ? "en" : "es"),
        );
        expect(hrefs.some((href) => href.includes("/servicios#") || href.includes("/services#"))).toBe(true);
        expect(hrefs.some((href) => href.includes("#portfolio-"))).toBe(true);
        expect(visibleText).toContain(copy.title);
        expect(visibleText).toContain(copy.summary);
        expect(visibleText).toContain(copy.credits);
        if (item.year) expect(visibleText).toContain(String(item.year));
        if (item.location) expect(visibleText).toContain(item.location);

        const schemaHtml = (
          jsonLd?.props as {
            dangerouslySetInnerHTML?: { __html: string };
          }
        ).dangerouslySetInnerHTML?.__html;
        const schema = JSON.parse(schemaHtml ?? "{}");
        expect(schema["@graph"]?.map((node: { "@type": string }) => node["@type"])).toEqual([
          "WebPage",
          "VideoObject",
          "BreadcrumbList",
        ]);
      }
    }
  });
});
