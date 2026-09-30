import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  FileText,
  Film,
  Gauge,
  HelpCircle,
  Layers,
  Mail,
  Play,
  Repeat,
  Sliders,
  Smartphone,
  Sparkles,
  Stethoscope,
  Upload,
  Video,
  Wrench,
} from "lucide-react";

import {
  getLiveYouTubePortfolioItems,
  PortfolioGrid,
  resolvePortfolioItemCopy,
} from "@/components/portfolio-grid";
import { KeepReading } from "@/components/keep-reading";
import { PortfolioFilmstrip } from "@/components/portfolio-filmstrip";
import { Container } from "@/components/ui/container";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";
import { buildPortfolioCollectionSchema } from "@/lib/portfolio-schema";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const title = "Miami Video Editing Portfolio | Real Work";
const description =
  "See real restaurant, real estate, brand, social, event, and animation video work from Esteban Moreno Media in Miami and Fort Lauderdale, with project details.";
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
  {
    question:
      "How are revisions and feedback handled during video post-production?",
    answer:
      "Draft cuts are shared through private, timestamped review links. You can pause at exact seconds to leave pinpoint feedback, request pacing adjustments, text alterations, or audio tweaks. Revisions are addressed systematically to keep production timelines predictable.",
  },
  {
    question:
      "What technical specs should client-supplied raw footage meet?",
    answer:
      "Footage captured in 1080p, 4K, or higher at standard framerates (24fps, 30fps, 60fps, or 120fps) in standard codecs like H.264, HEVC/H.265, or ProRes is supported. Esteban handles color space conversion (including Log and flat profiles), frame rate interpretation, and audio cleanup during ingest.",
  },
  {
    question:
      "Are audio tracks and background music legally cleared for commercial use?",
    answer:
      "Yes. All music beds, background tracks, and sound effects incorporated into final client deliverables use fully licensed, royalty-free commercial libraries. This prevents automated copyright strikes or takedowns across YouTube, Instagram, TikTok, and web hosting.",
  },
  {
    question:
      "Can footage captured across multiple cameras and smartphones be matched?",
    answer:
      "Yes. Multicam shoots and mixed-device footage (such as iPhones, mirrorless cameras, and drone clips) are color-balanced, normalized to a unified visual palette, and time-aligned with master audio tracks during the editorial cut.",
  },
  {
    question:
      "How do you handle content repurposing from long-form video into vertical reels?",
    answer:
      "Long-form recordings such as interviews, presentations, or horizontal brand videos can be repurposed into multiple vertical 9:16 clips. Esteban identifies key talking points, trims filler, reformats framing for vertical viewing, and adds synchronized on-screen captions.",
  },
  {
    question:
      "What is the process for submitting revision notes on draft cuts?",
    answer:
      "Drafts are shared through a private review link where you can leave timestamped notes directly on the video timeline. You can request specific adjustments to pacing, audio balancing, text styling, or color balance, and updated cuts are delivered systematically.",
  },
  {
    question:
      "Can you work with mixed framerates and multi-camera footage?",
    answer:
      "Yes. Projects containing mixed frame rates (such as 24fps dialogue with 60fps or 120fps slow-motion) and multi-camera angles are conformed to a unified timeline with proper shutter angle interpretation and frame rate conversions.",
  },
  {
    question:
      "How are final video masters formatted and organized for delivery?",
    answer:
      "Deliverables include full-resolution master files exported in your specified aspect ratios (9:16, 16:9, 1:1), accompanied by clean versions (without text/captions) and versions with styled captions, along with standalone .SRT subtitle files.",
  },
  {
    question:
      "How does batch editing work for social media content campaigns?",
    answer:
      "If you record multiple clips or long-form video in a single session, Esteban can batch-edit the material into a series of cohesive short-form reels, TikToks, and Shorts. This includes consistent intro hooks, uniform branding, color grading, and scheduled drop-ready files.",
  },
  {
    question: "What camera color profiles and Log footage formats are supported?",
    answer:
      "Ingest workflows support standard Log and flat color profiles including Apple Log, Sony S-Log3, Canon C-Log, Panasonic V-Log, and DJI D-Log M. Footage is transformed into normalized Rec.709 color space with custom tone curve adjustments for balanced saturation and skin tone clarity.",
  },
  {
    question:
      "How are on-screen subtitles and safe zones formatted for vertical video?",
    answer:
      "Vertical 9:16 videos are formatted within safe-zone boundaries that prevent text, lower thirds, and important visual elements from being obscured by Instagram Reels, TikTok, or YouTube Shorts interface overlays (like captions, like buttons, and profile headers).",
  },
  {
    question:
      "Can existing long-form videos or podcasts be repurposed into short-form clips?",
    answer:
      "Yes. Raw podcast recordings, webinars, or long-form YouTube videos can be analyzed for high-impact insights and edited into standalone short-form clips complete with engaging hooks, motion graphics, and synchronized subtitles.",
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
              <h1 className="mt-4 max-w-4xl font-serif em-display em-display--xl">
                Real projects, shown exactly as they were delivered.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[#d8d0c7] sm:text-lg sm:leading-8">
                Browse real video editing work from Esteban Moreno Media,
                including restaurant, real estate, brand, social, event,
                animation, and narrative projects. Each published card shows
                the available project description and credits, and says plainly
                when an individual role was not specified.
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
                Esteban&apos;s core service is{" "}
                <Link href="/services#editing">post-production</Link>. You send
                the
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

      {/* Primero se ve, luego se lee: la tira antes de la cuadrícula. */}
      <PortfolioFilmstrip locale="en" heading="The work, frame by frame" />

      <section className="py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <PortfolioGrid items={PORTFOLIO_ITEMS} locale="en" />
        </Container>
      </section>

      {/* Measured on production 2026-09-30: /portfolio was 29,360px on a phone,
          the longest page on the site. The work itself is not what made it long
          — the strip and the grid are about 6,500px between them. These seven
          sections are: post-production standards, technical specifications,
          creative disciplines, delivery formats. About 8,000px of essay on a
          page somebody opened to LOOK at work.

          So the work stays visible and the reading folds. Collapsed is not
          removed: every word stays in the DOM, which is the whole reason these
          sections exist. The FAQ is deliberately left OUTSIDE and below — the
          kit's split rule puts it at the tail of the decision path, not inside
          the fold. */}
      <KeepReading
        id="portfolio-standards"
        title="How this work gets made"
        destinations="Post-production standards, technical specifications, delivery formats and the disciplines behind each project."
      >
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

      {/* Technical Delivery Standards & Specifications */}
      <section
        className="border-t border-[#d6ccc0] bg-[#efe7db] py-14 sm:py-16"
        aria-labelledby="technical-standards-heading"
      >
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
              Delivery standards
            </p>
            <h2
              id="technical-standards-heading"
              className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
            >
              Technical specifications and delivery standards for every edit.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#3f4548] sm:text-lg sm:leading-8">
              Every project is mastered to meet the technical standards,
              framing rules, and loudness targets required by modern social
              platforms, web players, and commercial broadcast.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Smartphone className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Multi-Platform Aspect Ratios
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Tailored framing for 9:16 vertical (Instagram Reels, TikTok,
                  Shorts), 16:9 widescreen (YouTube, web, TV), and 1:1 square
                  feeds with platform-safe margin compliance.
                </p>
              </div>
              <Link
                href="/guides/vertical-horizontal-video-exports-and-safe-zones"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Safe-zone & export guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Sliders className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Audio Mastering & Loudness
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Dialogue de-noising, spectral cleanup, vocal compression, and
                  loudness targeting (-14 LUFS for YouTube, -16 LUFS for social)
                  to eliminate distortion across phone speakers.
                </p>
              </div>
              <Link
                href="/guides/how-to-mix-audio-for-social-video"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Social audio mixing guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Sparkles className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Color Pipeline & Grading
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Log-to-Rec.709 color conversion, shot-to-shot white balance
                  matching, natural skin tone preservation, and stylized
                  creative grades across mixed-camera shoots.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5 text-xs text-[#5a6066]">
                <span className="rounded bg-[#efe7db] px-2 py-0.5">Rec.709</span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">Log normalization</span>
                <span className="rounded bg-[#efe7db] px-2 py-0.5">Skin tone fidelity</span>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Upload className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Master Delivery Codecs
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Web-optimized high-bitrate MP4/H.264 deliverables alongside
                  Apple ProRes 422 archive masters, delivered with sidecar
                  .SRT subtitle tracks or burnt-in styled captions.
                </p>
              </div>
              <Link
                href="/guides/fastest-way-to-send-large-video-files-to-editor"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Footage handoff guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Industry-Tailored Post-Production Applications */}
      <section
        className="border-t border-[#d6ccc0] bg-[#efe7db] py-14 sm:py-16"
        aria-labelledby="industries-heading"
      >
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
              Industry focus
            </p>
            <h2
              id="industries-heading"
              className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
            >
              Tailored post-production for specialized business sectors.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#3f4548] sm:text-lg sm:leading-8">
              Different commercial sectors require different editorial rhythms,
              visual treatments, and narrative priorities to connect with their
              prospective clients in South Florida.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Building2 className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Real Estate & Architecture
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Smooth spatial transitions, interior-to-exterior exposure
                  balancing, and vertical walkthroughs formatted for luxury property
                  showcases.
                </p>
              </div>
              <Link
                href="/services/real-estate-video-aventura-miami"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Real estate video service
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Stethoscope className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Medical & Dental Practices
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  High-trust educational explainers, procedure overviews, and
                  natural skin tone color grading that emphasize clinical
                  professionalism.
                </p>
              </div>
              <Link
                href="/services/cosmetic-dentistry-video-marketing-miami"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Dental marketing service
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Wrench className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Contractors & Home Trades
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Transformation reels, on-site time-lapses, and project
                  milestone edits demonstrating craftsmanship for South Florida
                  homeowners.
                </p>
              </div>
              <Link
                href="/services/contractor-video-marketing-south-florida"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Contractor video service
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <FileText className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Corporate & Interview Series
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Multi-mic speech leveling, ambient noise removal, professional
                  speaker titles, and focused executive soundbites for company
                  communications.
                </p>
              </div>
              <Link
                href="/services/interview-video-editing-service"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Interview editing service
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Commercial Video Formats & Project Types */}
      <section className="py-14 sm:py-18" aria-labelledby="formats-heading">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Project structures
              </p>
              <h2
                id="formats-heading"
                className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl"
              >
                Commercial video formats crafted for South Florida businesses.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#3f4548]">
                Every business category requires a distinct visual rhythm.
                Esteban tailors pacing, narrative hooks, graphics, and music
                selection to match the exact buying context of your target
                audience.
              </p>
              <div className="mt-6 space-y-3 text-sm text-[#3f4548]">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                    aria-hidden="true"
                  />
                  <span>
                    Restaurant and hospitality spotlights that showcase atmosphere
                    and culinary craft.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                    aria-hidden="true"
                  />
                  <span>
                    Short-form social reels engineered to maximize 3-second hook
                    rate and watch time.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                    aria-hidden="true"
                  />
                  <span>
                    High-converting responsive web systems backed by automated AI
                    chatbots.
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl leading-tight">
                    Restaurant & Hospitality
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#3f4548]">
                    Appetizing dish sequences, bar highlights, ambient venue
                    pacing, and localized South Florida dining promos.
                  </p>
                </div>
                <Link
                  href="/services/restaurant-promo-video-editing-miami"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
                >
                  Restaurant video service
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl leading-tight">
                    Social Reels & TikToks
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#3f4548]">
                    Vertical video edits with punchy pacing, on-screen dynamic
                    captions, and sound design tailored for algorithmic reach.
                  </p>
                </div>
                <Link
                  href="/services/short-form-video-editor-miami"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
                >
                  Short-form editing service
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl leading-tight">
                    Brand & Founder Stories
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#3f4548]">
                    Authentic client case studies, founder profiles, and service
                    overviews that build credibility with high-ticket prospects.
                  </p>
                </div>
                <Link
                  href="/services/brand-video-production-miami"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
                >
                  Brand video service
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-6">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl leading-tight">
                    Web Systems & AI Bots
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#3f4548]">
                    Custom digital touchpoints and 24/7 lead qualification
                    chatbots that turn viewers into qualified booked inquiries.
                  </p>
                </div>
                <Link
                  href="/services/website-design-fort-lauderdale"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
                >
                  Web & AI chatbot service
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Post-Production Quality Assurance & Review Protocol */}
      <section
        className="border-t border-[#d6ccc0] bg-[#efe7db] py-14 sm:py-16"
        aria-labelledby="quality-protocol-heading"
      >
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Quality assurance
              </p>
              <h2
                id="quality-protocol-heading"
                className="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl"
              >
                Rigorous post-production standards before final delivery.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#3f4548]">
                Every edit undergoes a four-point verification protocol to
                guarantee audio clarity, color accuracy, mobile safe-zone
                compliance, and clean master file encoding.
              </p>
              <div className="mt-6 space-y-3 text-sm text-[#3f4548]">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                    aria-hidden="true"
                  />
                  <span>
                    Zero audio clipping with balanced dialogue and normalized music tracks.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                    aria-hidden="true"
                  />
                  <span>
                    Safe-zone protection ensuring captions and logos remain unobstructed by app UI.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                    aria-hidden="true"
                  />
                  <span>
                    Clean, master exports paired with captioned social cuts and standalone subtitle files.
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "Audio Isolation & Loudness Verification",
                  description:
                    "Dialogue is treated with spectral de-noising, room resonance removal, and multiband compression. Loudness is measured to hit -14 LUFS (YouTube/web) or -16 LUFS (Instagram/TikTok).",
                },
                {
                  number: "02",
                  title: "Color Calibration & Exposure Balancing",
                  description:
                    "Clips from multiple cameras are matched against skin tone reference charts. Highlights and shadows are conformed to standard Rec.709 color gamut to prevent digital banding.",
                },
                {
                  number: "03",
                  title: "Mobile Safe-Zone & Caption Formatting",
                  description:
                    "On-screen graphics, animated titles, and subtitles are positioned away from native platform buttons, comment drawers, and profile icons on iOS and Android devices.",
                },
                {
                  number: "04",
                  title: "Master Codec & Metadata Packaging",
                  description:
                    "Final renders are produced in high-bitrate H.264/MP4 and Apple ProRes formats with clean descriptive file names, frame-rate synchronization, and UTF-8 encoded .SRT tracks.",
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

      {/* Post-Production Engineering & Retention Pipeline */}
      <section
        className="border-t border-[#d6ccc0] bg-[#efe7db] py-14 sm:py-16"
        aria-labelledby="engineering-heading"
      >
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
              Post-production pipeline
            </p>
            <h2
              id="engineering-heading"
              className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
            >
              Editorial engineering built for viewer retention and asset longevity.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#3f4548] sm:text-lg sm:leading-8">
              Post-production extends beyond basic cuts. Every edit incorporates
              structured pacing rules, color-space management, sonic balancing,
              and cross-channel asset repurposing to maximize the lifespan of your footage.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Camera className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Log & Raw Format Ingest
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Native ingest for Apple Log, Sony S-Log3, Canon C-Log, and DJI
                  D-Log footage with tailored LUT transforms and wide dynamic range
                  preservation.
                </p>
              </div>
              <Link
                href="/guides/raw-video-file-formats-explained"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Log & raw format guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Gauge className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Retention & Hook Pacing
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Hook architecture in the first 3 seconds, pattern interrupts,
                  visual velocity changes, and dynamic cuts structured to
                  elevate watch duration and completion rates.
                </p>
              </div>
              <Link
                href="/guides/how-to-improve-video-retention-rate"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Audience retention guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Sliders className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Kinetic Captions & Safe Zones
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  High-contrast dynamic subtitles with keyword emphasis, centered
                  strictly within platform UI safe zones for full readability across
                  Reels, TikTok, and Shorts.
                </p>
              </div>
              <Link
                href="/guides/best-caption-styles-for-instagram-reels"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Reels caption style guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col justify-between rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <div>
                <span className="grid size-10 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                  <Repeat className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-serif text-2xl leading-tight">
                  Content Repurposing & Batching
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  Transforming long-form interviews, webinars, and event shoots into
                  high-impact episodic social reels, audiograms, and multi-channel
                  campaign cutdowns.
                </p>
              </div>
              <Link
                href="/services/content-repurposing-service-miami"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
              >
                Repurposing service
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      </KeepReading>
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
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white transition hover:bg-[var(--em-accent-ink-hover)]"
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
