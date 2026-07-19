import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import {
  getLiveYouTubePortfolioItems,
  PortfolioGrid,
  resolvePortfolioItemCopy,
} from "@/components/portfolio-grid";
import { Container } from "@/components/ui/container";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";
import { buildPortfolioCollectionSchema } from "@/lib/portfolio-schema";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const title = "Selected Video Work";
const description =
  "Explore selected animation, promotional, social, event, editing, and narrative video work from Esteban Moreno Media.";
const liveItems = getLiveYouTubePortfolioItems(PORTFOLIO_ITEMS);
const primaryPoster = liveItems.find((item) =>
  item.media.poster.startsWith("/portfolio/"),
)?.media.poster;

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/portfolio",
  locale: "en",
  ...(primaryPoster
    ? {
        images: [
          {
            url: absoluteUrl(primaryPoster),
            width: 1280,
            height: 720,
            alt: "Selected work by Esteban Moreno Media",
          },
        ],
      }
    : {}),
});

const portfolioSchema = buildPortfolioCollectionSchema({
  path: "/portfolio",
  locale: "en-US",
  title,
  description,
  items: liveItems.map((item) => {
    const copy = resolvePortfolioItemCopy(item, "en");

    return {
      id: item.id,
      ...copy,
      url: item.media.url,
      poster: item.media.poster,
      videoId: item.media.videoId,
      uploadDate: item.media.uploadDate,
      duration: item.media.duration,
      location: item.location,
    };
  }),
});

export default function PortfolioPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      <section className="overflow-hidden bg-[#101214] py-14 text-[#f6f1ea] sm:py-20">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_.46fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#f0b384]">
                Selected work
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.96] sm:text-6xl lg:text-7xl">
                Real projects, presented in their original form.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#d8d0c7] sm:text-lg sm:leading-8">
                A curated collection from Esteban&apos;s approved portfolio. Each
                card shows the available project description and credits; when
                the original portfolio did not specify an individual role, the
                card says so plainly.
              </p>
            </div>
            <div className="border-l border-white/15 pl-6">
              <p className="font-serif text-5xl text-[#f0b384]">
                {liveItems.length.toString().padStart(2, "0")}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-[#b9b2aa]">
                Published projects, grouped by the kind of story or production.
              </p>
              <a
                href="#portfolio-collection"
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white underline decoration-[#e85d3e] underline-offset-4"
              >
                Browse the collection
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <PortfolioGrid items={PORTFOLIO_ITEMS} locale="en" />
        </Container>
      </section>

      <section className="border-t border-[#d6ccc0] py-14 sm:py-18">
        <Container size="xl">
          <div className="grid gap-8 rounded-2xl bg-[#e7ded2] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Your project
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
                Have a story, launch, property, or campaign to put in motion?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#3f4548] sm:text-base sm:leading-7">
                Share the goal, deadline, location, and what material already
                exists. Esteban will follow up with the questions needed to scope
                the work.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white transition hover:bg-[#c84a2c]"
              >
                Start a project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#b9aa9a] px-6 text-sm font-medium text-[#252a2d] transition hover:border-[#e85d3e]"
              >
                <Mail className="size-4" aria-hidden="true" />
                {site.email}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
