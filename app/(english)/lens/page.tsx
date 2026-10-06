import Link from "next/link";

import { LensTelemetry } from "@/components/lens/lens-telemetry";
import { LensStage } from "@/components/lens/lens-stage";
import type { LensFrame } from "@/components/lens/rack-focus-stage";
import { buildPageMetadata } from "@/lib/site-metadata";

const description =
  "A scroll-driven look at how Esteban Moreno Media builds a video: the lens opens one stop at a time, and each stop is a decision made before anyone presses record.";

export const metadata = buildPageMetadata({
  title: "The Lens | How a Video Gets Made",
  description,
  path: "/lens",
  locale: "en",
});

/**
 * Real posters from the published portfolio. Never stock, never a render — the
 * page argues that the work is real, so the frames behind the glass have to be.
 */
const frames: readonly LensFrame[] = [
  { src: "/portfolio/banacol.jpg", alt: "Frame from the Banacol business promo" },
  { src: "/portfolio/diana-jack.jpg", alt: "Frame from the Diana and Jack event film" },
  { src: "/portfolio/bar-door-monkey.jpg", alt: "Frame from the Bar Door Monkey social content" },
  { src: "/about/esteban-on-set.jpg", alt: "Esteban Moreno on location in South Florida" },
];

/**
 * One stop on the focus ring = one decision. Each carries a fact that is true of
 * how the studio actually works; none carries a performance claim, because we
 * have not measured one and the site's standing rule is real proof only.
 */
const stops = [
  {
    id: "shut",
    eyebrow: "f/22 — closed",
    heading: "What are we actually selling in this video?",
    lead:
      "Most briefs start with a shot list. This one starts with the sentence the viewer should repeat afterwards. No sentence, no camera.",
    detailSummary: "Why the brief comes before the shot list",
    detail:
      "A shot list written before the message produces footage that is pleasant and unusable — a set of beautiful fragments with no spine to cut along. Working the other way, the message decides the location, the length, the language and the number of setups, which is also what keeps a project inside the quoted scope instead of drifting. Spanish-first is part of this decision, not a translation step added at the end: the phrasing that lands with a Hialeah audience is written in Spanish and stays in Spanish.",
  },
  {
    id: "opening",
    eyebrow: "f/8 — opening",
    heading: "Who is in the frame, and do they trust the room?",
    lead:
      "On location across Broward, Miami-Dade and Palm Beach. One person, one camera — a four-person crew makes an owner behave like someone being filmed.",
    detailSummary: "What a small crew actually buys you",
    detail:
      "A compact setup is not a budget compromise, it is a performance decision. The first ten minutes of any shoot are spent getting a business owner to stop performing, and every extra person in the room extends that. Working light also means the day can move: a second location, a different hour of light, a shot nobody planned because it presented itself. The trade is honest — no large lighting builds, no simultaneous multi-camera coverage of a live event without it being scoped and quoted as such.",
  },
  {
    id: "focus",
    eyebrow: "f/2.8 — focus",
    heading: "What gets cut, and what earns its seconds?",
    lead:
      "Editing is the service. The cut is where thirty seconds stops being a highlight reel and starts being an argument.",
    detailSummary: "How AI is used here, and where it is not",
    detail:
      "AI-assisted content means the repetitive passes: transcription, rough selects, caption drafts, versioning one piece into the aspect ratios each platform wants. It does not mean generated footage, generated voices, or a generated person standing in for a real client. The rule is that everything a viewer sees was photographed, and everything a viewer reads was written or approved by a human who can be named. That line is the reason the work can be shown to a client's own customers without a disclosure.",
  },
  {
    id: "wide",
    eyebrow: "f/1.4 — wide open",
    heading: "Where does this run, and how often?",
    lead:
      "One excellent video posted once is a worse outcome than a planned month. The cut is the beginning, not the delivery.",
    detailSummary: "What a planned month includes",
    detail:
      "A month is built backwards from what the business needs to say and when it needs to say it, then filled with what the footage can actually support — full pieces, vertical cutdowns, stills pulled from the video, captions in the language the audience reads. Scope, deliverable counts and revision rounds are agreed in writing before the first edit, so the month does not quietly become a subscription to unlimited requests. Website design and AI chatbots sit alongside this when the video is pointing at a page that has to convert.",
  },
] as const;

export default function LensPage() {
  return (
    <main className="bg-[#101214] text-[#f6f1ea]">
      <LensTelemetry locale="en" />

      {/*
        The scroll track. The stage pins inside it; the stops scroll over it.
        Every word below is server-rendered and sits in the raw HTML — AI
        crawlers execute no JavaScript, and collapsed is not removed.
      */}
      <div data-lens-track className="relative">
        <LensStage frames={frames} />

        <div className="relative -mt-[100svh]">
          {/* First screen. The promise, and one obvious action. */}
          <section className="flex min-h-[100svh] flex-col justify-start px-6 pb-36 pt-[40svh] sm:justify-end sm:px-10 sm:pb-40 sm:pt-0 lg:px-16">
            <div className="max-w-xl sm:max-w-[40vw]">
              <p className="text-xs uppercase tracking-[0.2em] text-[#f0b384]">
                Esteban Moreno Media — Fort Lauderdale
              </p>
              <h1 className="mt-4 text-3xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                Start with the lens.
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#ddd4c8] sm:text-lg">
                Scroll. The aperture opens one stop at a time, and every stop is
                a decision made before anyone presses record.
              </p>
              <Link
                href="/contact"
                data-cta="lens-hero-contact"
                className="mt-6 inline-flex items-center rounded-full bg-[#c84a2c] px-7 py-3.5 text-sm font-medium text-[#f6f1ea] transition-colors hover:bg-[#e85d3e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0b384]"
              >
                Start a project
              </Link>
            </div>
          </section>

          {stops.map((stop) => (
            <section
              key={stop.id}
              data-lens-stop={stop.id}
              className="flex min-h-[100svh] flex-col justify-start px-6 pb-36 pt-[40svh] sm:justify-end sm:px-10 sm:pb-40 sm:pt-0 lg:px-16"
            >
              <div data-lens-card
                className="max-w-xl sm:max-w-[40vw] rounded-2xl bg-[#101214]/92 p-5 backdrop-blur-md transition-opacity duration-200 sm:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-[#f0b384]">
                  {stop.eyebrow}
                </p>
                <h2 className="mt-2.5 text-xl font-semibold leading-tight sm:text-3xl">
                  {stop.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#ddd4c8] sm:text-base">
                  {stop.lead}
                </p>
                <details className="group mt-5 border-t border-[#3f4548] pt-4">
                  <summary className="cursor-pointer list-none text-sm font-medium text-[#f0b384] marker:content-none">
                    {stop.detailSummary}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#9aa1a6]">
                    {stop.detail}
                  </p>
                </details>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Past the track, the lens releases and the page hands over. */}
      <section className="border-t border-[#252a2d] px-6 py-20 sm:px-10 lg:px-16">
        <div className="max-w-xl sm:max-w-[40vw]">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            That is the whole method.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#ddd4c8]">
            Tell me what the business needs people to understand, and I will tell
            you what it takes to film it, what it costs, and what you get.
            Spanish-first, with intermediate English available.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              data-cta="lens-footer-contact"
              className="inline-flex items-center rounded-full bg-[#c84a2c] px-7 py-3.5 text-sm font-medium text-[#f6f1ea] transition-colors hover:bg-[#e85d3e]"
            >
              Start a project
            </Link>
            <Link
              href="/portfolio"
              data-cta="lens-footer-portfolio"
              className="inline-flex items-center rounded-full border border-[#5a6066] px-7 py-3.5 text-sm font-medium text-[#ddd4c8] transition-colors hover:border-[#f0b384] hover:text-[#f6f1ea]"
            >
              See the work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
