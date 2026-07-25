import Link from "next/link";
import { ArrowRight, Film, Mail, Play, Upload } from "lucide-react";

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

      {/*
        Anchor-service band — the remote-editing case for the portfolio.
        All copy here is limited to CONFIRMED facts (offer note 2026-07-25 +
        the real editing-only "Homeowners" project). No prices, turnaround,
        revision counts, testimonials, or metrics — those stay gated behind
        Esteban's confirmation.
        [PLACEHOLDER — Esteban to supply] a full client case study
        (brief -> deliverable -> measurable outcome -> quotable testimonial)
        can drop in below the proof callout once he confirms real material.
      */}
      <section
        className="border-b border-[#d6ccc0] bg-[#efe7db] py-14 sm:py-16"
        aria-labelledby="anchor-service-heading"
      >
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Anchor service
              </p>
              <h2
                id="anchor-service-heading"
                className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl"
              >
                Remote editing, from the footage you already have.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#3f4548]">
                Esteban&apos;s core service is post-production. You send the
                footage you&apos;ve already captured &mdash; phone clips, event
                coverage, product shots, or footage from a shoot &mdash; and he
                shapes it into a finished, publish-ready video. The work is
                remote-first, so you don&apos;t need to be in South Florida to
                work together.
              </p>
              <Link
                href="/services#editing"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                See how editing works
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div>
              <ol className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    Icon: Upload,
                    step: "Step 1",
                    title: "You send the footage",
                    detail:
                      "Share what you already have: raw clips, an event, a shoot, or a folder of assets.",
                  },
                  {
                    Icon: Film,
                    step: "Step 2",
                    title: "Esteban edits it",
                    detail:
                      "Post-production shaped around your goal and where the video will be published.",
                  },
                  {
                    Icon: Play,
                    step: "Step 3",
                    title: "You get a publish-ready cut",
                    detail:
                      "A finished video, edited for the platform and story you have in mind.",
                  },
                ].map(({ Icon, step, title: stepTitle, detail }) => (
                  <li
                    key={stepTitle}
                    className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                  >
                    <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.12em] text-[#9f3c27]">
                      {step}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight">
                      {stepTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#3f4548]">
                      {detail}
                    </p>
                  </li>
                ))}
              </ol>

              <Link
                href="/portfolio/homeowners"
                className="group mt-4 block rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 transition hover:border-[#e85d3e]"
              >
                <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#5a6066]">
                  Editing-only proof
                </span>
                <span className="mt-2 flex items-center justify-between gap-3 font-serif text-2xl leading-tight">
                  Homeowners
                  <ArrowRight
                    className="size-5 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 block text-sm leading-6 text-[#5a6066]">
                  A social video Esteban edited entirely from footage supplied
                  by the agency 300 Bees &mdash; the anchor service in action.
                </span>
              </Link>
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
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white transition hover:bg-[#a93e29]"
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
