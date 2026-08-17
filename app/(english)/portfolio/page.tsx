import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Film,
  HelpCircle,
  Layers,
  Mail,
  Play,
  Sparkles,
  Upload,
  Video,
} from "lucide-react";

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

const portfolioFaqItems = [
  {
    question:
      "What types of video projects can be edited from client-provided footage?",
    answer:
      "Esteban edits client-supplied raw video into polished promotional videos, social media reels, YouTube content, event recaps, and case studies. Whether you have 4K camera footage, drone clips, or smartphone recordings, post-production covers pacing, audio enhancement, color grading, and platform-tailored framing.",
  },
  {
    question:
      "How does remote editing collaboration work if I am outside South Florida?",
    answer:
      "Remote post-production is a primary delivery model. Clients upload footage and brief details digitally via Google Drive, Dropbox, or Frame.io. Draft cuts are shared through private review links where timecoded comments and revision notes can be exchanged efficiently.",
  },
  {
    question: "Can I send footage captured on a smartphone or GoPro?",
    answer:
      "Yes. Modern smartphones record high-resolution video that can be professionally graded, sound-designed, and edited into high-retention social content or marketing videos. Clean lighting and steady framing during capture make a substantial difference in the final edit.",
  },
  {
    question:
      "What export formats and aspect ratios are delivered for campaigns?",
    answer:
      "Deliverables are tailored to your publishing channels: 9:16 vertical video for Instagram Reels, TikTok, and YouTube Shorts; 16:9 widescreen for YouTube, websites, and presentations; or 1:1 / 4:5 square crops for social feeds. Subtitle files (.srt) or burnt-in styled captions are provided as needed.",
  },
  {
    question:
      "Does Esteban Moreno Media handle bilingual English and Spanish content?",
    answer:
      "Yes. Esteban Moreno Media is a bilingual production practice based in Fort Lauderdale. Video projects can be edited, scripted, titled, and subtitled in Spanish, English, or both to engage South Florida audiences and broader regional markets.",
  },
  {
    question: "Are on-location filming sessions available in South Florida?",
    answer:
      "Select on-location videography and capture can be scoped for businesses and projects across Fort Lauderdale, Broward County, and Miami-Dade. Palm Beach County projects are considered by individual scope.",
  },
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    portfolioSchema,
    {
      "@type": "FAQPage",
      "@id": absoluteUrl("/portfolio#faq"),
      mainEntity: portfolioFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function PortfolioPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
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

      {/* Production Disciplines & Capabilities */}
      <section
        className="border-t border-[#d6ccc0] bg-[#efe7db] py-14 sm:py-16"
        aria-labelledby="disciplines-heading"
      >
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
              Production disciplines
            </p>
            <h2
              id="disciplines-heading"
              className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
            >
              Creative disciplines represented in this collection.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#3f4548] sm:text-lg sm:leading-8">
              Every project in this portfolio reflects a specific creative focus
              &mdash; from remote post-production and short-form social editing to
              brand promotional films, animation, and custom web systems.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                <Film className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-tight">
                Video Editing & Post-Production
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                Assembly cutting, pacing, dialogue cleanup, audio leveling,
                dynamic captions, and color correction from footage you already have.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 text-xs text-[#5a6066]">
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  Rhythm cutting
                </span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  Audio mixing
                </span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  Color grade
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                <Video className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-tight">
                Business & Brand Promos
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                Spotlight reels, hospitality highlights, and promotional
                narratives designed to introduce services, spaces, and customer
                experiences.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 text-xs text-[#5a6066]">
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  Hospitality
                </span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  Brand story
                </span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  Product reels
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-tight">
                Animation & Visual Assets
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                Motion graphics, animated sequences, 3D visual treatments, and
                AI-assisted creative assets integrated into polished video
                stories.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 text-xs text-[#5a6066]">
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  Motion design
                </span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  3D graphics
                </span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  AI visuals
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                <Layers className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-2xl leading-tight">
                Web Systems & AI Bots
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                High-converting responsive web architectures paired with
                intelligent 24/7 conversational lead qualification chatbots.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5 text-xs text-[#5a6066]">
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  Custom web
                </span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  Lead capture
                </span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">
                  AI chatbots
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Workflow & Media Collaboration */}
      <section className="py-14 sm:py-18" aria-labelledby="workflow-heading">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Project workflow
              </p>
              <h2
                id="workflow-heading"
                className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl"
              >
                How projects move from raw footage to final delivery.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#3f4548]">
                Whether you have phone recordings, drone files, professional
                camera footage, or brand assets, Esteban provides a structured,
                frictionless editing process designed for fast feedback and
                precision finishing.
              </p>
              <div className="mt-6 space-y-3 text-sm text-[#3f4548]">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                    aria-hidden="true"
                  />
                  <span>
                    Remote-first media intake via Google Drive, Dropbox, or
                    Frame.io.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                    aria-hidden="true"
                  />
                  <span>
                    Exports tailored for Instagram Reels, TikTok, YouTube, and
                    web displays.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                    aria-hidden="true"
                  />
                  <span>
                    Bilingual Spanish and English editing, subtitling, and
                    localized messaging.
                  </span>
                </div>
              </div>
              <Link
                href="/guides/prepare-footage-for-video-editing"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Read the guide on preparing footage for editing
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "Media Intake & Asset Review",
                  description:
                    "You share your raw video clips, audio tracks, brand guidelines, and reference styles. Esteban reviews the material to assess resolution, audio clarity, and narrative potential.",
                },
                {
                  number: "02",
                  title: "Story Arc & Editorial Cut",
                  description:
                    "The strongest takes are selected and structured with intentional pacing, engaging hooks in the first 3 seconds, and smooth transitions tailored to your target platform.",
                },
                {
                  number: "03",
                  title: "Audio Mixing, Color & Captions",
                  description:
                    "Dialogue is cleaned and balanced against background music, clips are color-graded for consistent visual warmth, and styled subtitles are applied for silent mobile viewing.",
                },
                {
                  number: "04",
                  title: "Review & Master Export",
                  description:
                    "You review the cut through a direct link, provide timecoded notes, and receive final high-bitrate master files formatted in your required aspect ratios (9:16 vertical, 16:9 widescreen, or 1:1 square).",
                },
              ].map(({ number, title: stepTitle, description: stepDesc }) => (
                <div
                  key={number}
                  className="flex gap-5 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-6"
                >
                  <span className="font-serif text-3xl font-light text-[#9f3c27]/60">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl leading-tight">
                      {stepTitle}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#3f4548]">
                      {stepDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio & Editing FAQ */}
      <section
        className="border-t border-[#d6ccc0] bg-[#efe7db] py-14 sm:py-16"
        aria-labelledby="faq-heading"
      >
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
              Common questions
            </p>
            <h2
              id="faq-heading"
              className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
            >
              Frequently asked questions about the portfolio.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#3f4548] sm:text-lg sm:leading-8">
              Practical details on editing capabilities, footage requirements,
              format options, and collaboration.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {portfolioFaqItems.map(({ question, answer }) => (
              <article
                key={question}
                className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle
                    className="mt-1 size-5 shrink-0 text-[#9f3c27]"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-xl sm:text-2xl leading-tight">
                    {question}
                  </h3>
                </div>
                <p className="mt-3 pl-8 text-sm leading-6 text-[#3f4548]">
                  {answer}
                </p>
              </article>
            ))}
          </div>
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
