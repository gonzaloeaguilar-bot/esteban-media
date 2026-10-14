import { readdirSync, readFileSync } from "node:fs";

import { buildCaseStudyStructuredData, getCaseStudies } from "@/lib/case-studies";
import { buildGuideStructuredData, getGuides } from "@/lib/guides";
import { isConsolidatedPath } from "@/lib/consolidation";
import * as depthContent from "@/lib/service-depth-content";
import { ServiceLandingDirectory } from "@/components/service-landing-directory";
import { ServiceAnswerFirst, ServiceRelated, linkableRelated } from "@/components/service-depth";
import { spanishNichePages } from "@/lib/spanish-site";
import { getPortfolioWatchItems } from "@/lib/portfolio-watch";
import { buildPageMetadata, shouldDropBrandSuffix } from "@/lib/site-metadata";
import { generateMetadata as enWatchMetadata } from "../(english)/portfolio/[id]/page";
import { generateMetadata as esWatchMetadata } from "../(spanish)/es/portafolio/[id]/page";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import EnCalculator from "../(english)/calculator/page";
import EnAssessment from "../(english)/assessment/page";
import EnSocialKit from "../(english)/resources/social-video-kit/page";
import EsCalculadora from "../(spanish)/es/calculadora/page";
import EsEvaluacion from "../(spanish)/es/evaluacion/page";
import EsKit from "../(spanish)/es/recursos/kit-video-social/page";
import ReelsMiami from "../(english)/services/reels-editor-miami/page";
import ReelsFtl from "../(english)/services/reels-editor-fort-lauderdale/page";
import JewelryPhoto from "../(english)/services/jewelry-product-photography-miami/page";
import AIFoodPhoto from "../(english)/services/ai-food-photography-restaurants/page";

// Mechanical fixes from .ai/seo-geo-code-audit-2026-10-10.md.

function headings(markup: string, level: number): string[] {
  return [...markup.matchAll(new RegExp(`<h${level}[^>]*>([\\s\\S]*?)</h${level}>`, "g"))].map(
    (match) => match[1].replace(/<[^>]+>/g, "").trim(),
  );
}

describe("tool pages server-render one H1 (fix 11)", () => {
  it.each([
    ["/calculator", EnCalculator, "Video Production &amp; Editing Budget Calculator"],
    ["/assessment", EnAssessment, "South Florida Video Strategy Diagnostic"],
    ["/resources/social-video-kit", EnSocialKit, "Social Video Ad Script &amp; Safe-Zone Kit"],
    ["/es/calculadora", EsCalculadora, "Calculadora de Presupuesto de Video"],
    ["/es/evaluacion", EsEvaluacion, "Diagnóstico de Estrategia de Video"],
    ["/es/recursos/kit-video-social", EsKit, "Kit de Guiones y Zonas Seguras de Video"],
  ])("%s", (_path, Page, h1) => {
    const found = headings(renderToStaticMarkup(Page()), 1);
    expect(found).toEqual([h1]);
  });
});

describe("Reels pages have no duplicate H2 (fix 10)", () => {
  it.each([
    ["/services/reels-editor-miami", ReelsMiami],
    ["/services/reels-editor-fort-lauderdale", ReelsFtl],
  ])("%s", (_path, Page) => {
    const h2s = headings(renderToStaticMarkup(Page()), 2);
    expect(h2s.length).toBeGreaterThan(2);
    expect(new Set(h2s).size).toBe(h2s.length);
  });
});

describe("entity hygiene (fix 7)", () => {
  const business = { "@id": "https://estebanmorenomedia.com/#business" };
  const person = { "@id": "https://estebanmorenomedia.com/#esteban" };

  function articleOf(graph: { "@graph": Array<Record<string, unknown>> }) {
    return graph["@graph"].find((node) => node["@type"] === "Article")!;
  }

  it("guides reference #business (no visible byline) and carry an image", () => {
    for (const locale of ["en", "es"] as const) {
      for (const guide of getGuides(locale)) {
        const article = articleOf(buildGuideStructuredData(guide));
        expect(article.author).toEqual(business);
        expect(article.publisher).toEqual(business);
        expect(article.image).toBe("https://estebanmorenomedia.com/social-card");
      }
    }
  });

  it("case studies reference #esteban (named in the body) and #business", () => {
    for (const locale of ["en", "es"] as const) {
      for (const study of getCaseStudies(locale)) {
        const article = articleOf(buildCaseStudyStructuredData(study));
        expect(article.author).toEqual(person);
        expect(article.publisher).toEqual(business);
      }
    }
  });

  it("no page source re-declares the business as an inline LocalBusiness stub", () => {
    const offenders = ["app", "components", "lib"]
      .flatMap((dir) =>
        readdirSync(dir, { recursive: true, encoding: "utf8" }).map((file) => `${dir}/${file}`),
      )
      .filter((file) => /\.tsx?$/.test(file))
      .filter((file) => !file.includes("__tests__"))
      // The sitewide entity itself, and files owned by another branch.
      .filter((file) => !["lib/entity-schema.ts", "lib/real-estate-reels.ts"].includes(file))
      .filter((file) => readFileSync(file, "utf8").includes('"@type": "LocalBusiness"'));
    expect(offenders).toEqual([]);
  });
});

describe("English hubs and related cards never link a consolidated page (fix 5)", () => {
  function linkedPaths(markup: string): string[] {
    return [...markup.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1].replace(/\/$/, "") || "/");
  }

  it("the services/areas directory skips noindexed and merged pages", () => {
    const paths = linkedPaths(renderToStaticMarkup(ServiceLandingDirectory()));
    expect(paths.length).toBeGreaterThan(40);
    expect(paths.filter(isConsolidatedPath)).toEqual([]);
  });

  it("no rendered related card points at a consolidated page", () => {
    // ServiceRelated drops consolidated hrefs itself (linkableRelated), so a
    // depth object written later cannot reintroduce a link into a noindexed
    // page. Checked on the rendered markup of every depth object's cards.
    const depths = Object.entries(depthContent).filter(
      ([, value]) => value && typeof value === "object" && "related" in value,
    ) as unknown as [string, { related: { title: string; detail: string; href: string }[] }][];
    expect(depths.length).toBeGreaterThan(10);
    for (const [name, depth] of depths) {
      const markup = renderToStaticMarkup(ServiceRelated({ heading: "h", services: depth.related }));
      expect(linkedPaths(markup).filter(isConsolidatedPath), name).toEqual([]);
    }
    expect(
      linkableRelated([{ title: "t", detail: "d", href: "/services/law-firm-video-production-miami" }]),
    ).toEqual([]);
  });
});

describe("title and description length (fix 12)", () => {
  it("drops the brand suffix only when the branded title would pass 60 characters", () => {
    const short = buildPageMetadata({ title: "Short title", description: "d", path: "/x", locale: "en" });
    expect(short.title).toBe("Short title");

    const long = "A title that is long enough to overflow";
    const built = buildPageMetadata({ title: long, description: "d", path: "/x", locale: "en" });
    expect(built.title).toEqual({ absolute: long });
    expect((built.openGraph as { title: string }).title).toBe(long);
  });

  it("applies the same title budget to top-level Spanish routes", () => {
    const long = "Un título bastante largo para pasar el límite";
    expect(shouldDropBrandSuffix(long)).toBe(true);
  });

  it("localises Spanish portfolio titles and trims watch-page descriptions to 155", async () => {
    for (const item of getPortfolioWatchItems()) {
      const es = await esWatchMetadata({ params: Promise.resolve({ id: item.id }) });
      const en = await enWatchMetadata({ params: Promise.resolve({ id: item.id }) });
      const esTitle = typeof es.title === "string" ? es.title : (es.title as { absolute: string }).absolute;
      // The prefix stays unless it would push the title past ~60 characters
      // (loop round 3, row 31: two titles ran 66 and 68).
      expect(esTitle.length).toBeLessThanOrEqual(60);
      const bare = esTitle.replace(/^Portafolio: /, "");
      if (`Portafolio: ${bare}`.length <= 60) expect(esTitle).toBe(`Portafolio: ${bare}`);
      expect(es.title).not.toEqual(en.title);
      expect(es.description!.length).toBeLessThanOrEqual(155);
      expect(en.description!.length).toBeLessThanOrEqual(155);
    }
  });
});

describe("AI user-initiated fetchers skip the language redirect (fix 15)", () => {
  it("names the three fetchers in the middleware crawler pattern", () => {
    const middleware = readFileSync(join(process.cwd(), "middleware.ts"), "utf8");
    for (const agent of ["chatgpt-user", "claude-user", "perplexity-user"]) {
      expect(middleware).toContain(agent);
    }
  });
});

describe("every English service page has WebPage + BreadcrumbList (fix 3)", () => {
  const dir = "app/(english)/services";
  const pages = readdirSync(dir).filter((name) => !name.startsWith("[") && !name.includes("."));

  it.each(pages)("%s", (name) => {
    const source = readFileSync(`${dir}/${name}/page.tsx`, "utf8");
    const shared = source.includes("buildServicePageNodes") || source.includes("GeoServicePage");
    expect(shared || source.includes('"@type": "BreadcrumbList"')).toBe(true);

    // The schema crumb must be the label the visible trail shows.
    const crumb = source.match(/crumb: "([^"]+)"/)?.[1];
    if (crumb) {
      const visible = source.match(/aria-current="page"[^>]*>\s*([^<]+?)\s*</)?.[1];
      expect(visible?.replace(/&amp;/g, "&")).toBe(crumb);
    }
  });
});

describe("ported FAQs on hand-written English service pages (owner decision)", () => {
  const entries = Object.entries(depthContent.PORTED_SERVICE_FAQS);

  it("covers 37 pages and skips only the two with no factual source", () => {
    expect(entries).toHaveLength(37);
    for (const skipped of depthContent.FAQ_SKIPPED_NO_FACTUAL_SOURCE) {
      expect(depthContent.PORTED_SERVICE_FAQS[skipped]).toBeUndefined();
    }
  });

  it.each(entries)("%s shows every FAQ and emits the same FAQPage", async (path, faqs) => {
    const { default: Page } = await import(
      /* @vite-ignore */ join(process.cwd(), "app/(english)", path, "page.tsx")
    );
    const markup = renderToStaticMarkup(Page());
    const ld = [...markup.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map((m) => JSON.parse(m[1]) as { "@graph"?: Array<Record<string, unknown>> })
      .flatMap((blob) => blob["@graph"] ?? []);
    const faqPage = ld.find((node) => node["@type"] === "FAQPage") as
      | { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }
      | undefined;
    expect(faqPage?.mainEntity.map((q) => q.name)).toEqual(faqs.map((faq) => faq.question));
    const text = markup.replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
    for (const faq of faqs) {
      expect(text).toContain(faq.question);
      expect(text).toContain(faq.answer);
    }
    // No price or turnaround figure enters through a ported answer.
    expect(faqs.map((faq) => faq.answer).join(" ")).not.toMatch(/\$\d|\b\d+\s*(hours?|days?|weeks?)\b/i);
  });
});

describe("answer-first block (fix 9)", () => {
  it.each(["en", "es"] as const)("%s answer is 60-120 words and quotes PACKAGE_PRICES", (locale) => {
    const markup = renderToStaticMarkup(ServiceAnswerFirst({ service: "Video editing", locale }));
    const answer = markup.match(/<p class="mt-4[^"]*">([\s\S]*?)<\/p>/)![1];
    const words = answer.split(/\s+/).filter(Boolean).length;
    expect(words).toBeGreaterThanOrEqual(60);
    expect(words).toBeLessThanOrEqual(120);
    expect(answer).toContain("$100");
    expect(answer).toContain("$800");
    expect(headings(markup, 2)[0]).toMatch(locale === "es" ? /^¿.*\?$/ : /\?$/);
  });

  it.each([
    ["jewelry product photography", "en"],
    ["headshot photography", "en"],
    ["AI food photography", "en"],
    ["fotografía de producto", "es"],
    ["fotógrafo de retratos y headshots", "es"],
    ["fotos con IA", "es"],
  ] as const)("%s in %s describes photography without quoting video rates", (service, locale) => {
    const markup = renderToStaticMarkup(ServiceAnswerFirst({ service, locale }));
    expect(markup).not.toContain("$100");
    expect(markup).not.toContain("$800");
    expect(markup).toMatch(locale === "es" ? /cotizaci[oó]n por escrito/ : /written quote/);
  });
});

describe("photography offer proof", () => {
  it("distinguishes a real jewelry shoot from AI-assisted backgrounds and labels the related portfolio accurately", () => {
    const markup = renderToStaticMarkup(JewelryPhoto());
    expect(markup).toContain("subject to scope and availability");
    expect(markup).toContain("For a real shoot");
    expect(markup).toContain("For AI-assisted backgrounds");
    expect(markup).toContain("not presented as a jewelry photo shoot");
    expect(markup).not.toContain("$100");
  });

  it("describes Bar Door Monkey as restaurant video work, not food photography proof", () => {
    const markup = renderToStaticMarkup(AIFoodPhoto());
    expect(markup).toContain("on-location restaurant promo video");
    expect(markup).toContain("not a food photography sample");
    expect(markup).not.toContain("food post-production");
  });
});

describe("sibling clusters for hub-only pages (fix 6)", () => {
  it("only link indexable pages, never Palm Beach County pages, and give each member 3 inbound links", () => {
    for (const cluster of depthContent.SERVICE_SIBLING_CLUSTERS) {
      for (const path of cluster) {
        expect(isConsolidatedPath(path), path).toBe(false);
        expect(path).not.toMatch(/palm-beach|delray|jupiter/);
        expect(depthContent.serviceSiblings(path).every((card) => card.title && card.detail)).toBe(true);
        const inbound = cluster.filter((other) =>
          depthContent.ringSiblings(depthContent.SERVICE_SIBLING_CLUSTERS, other).includes(path),
        );
        expect(inbound.length).toBe(Math.min(3, cluster.length - 1));
      }
    }
    for (const cluster of depthContent.SPANISH_SIBLING_CLUSTERS) {
      for (const slug of cluster) {
        const page = spanishNichePages.find((candidate) => candidate.slug === slug);
        expect(page, slug).toBeDefined();
        expect(page!.availability).toBe("confirmed");
        expect(isConsolidatedPath(`/es/${slug}`), slug).toBe(false);
        expect(slug).not.toMatch(/palm-beach|delray|jupiter/);
      }
    }
  });
});

describe("case studies that embed YouTube carry a VideoObject (fix 8, partial)", () => {
  it("reuses the portfolio item's video data on all 8 embedding pages", () => {
    let withVideo = 0;
    for (const locale of ["en", "es"] as const) {
      for (const study of getCaseStudies(locale)) {
        const graph = buildCaseStudyStructuredData(study)["@graph"] as Array<Record<string, unknown>>;
        const video = graph.find((node) => node["@type"] === "VideoObject");
        const article = graph.find((node) => node["@type"] === "Article")!;
        if (!video) continue;
        withVideo += 1;
        expect(video.uploadDate).toMatch(/^\d{4}-\d{2}-\d{2}/);
        expect(video.duration).toMatch(/^PT/);
        expect(String(video.embedUrl)).toContain("youtube-nocookie.com/embed/");
        expect(article.video).toEqual({ "@id": video["@id"] });
      }
    }
    expect(withVideo).toBe(8);
  });
});
