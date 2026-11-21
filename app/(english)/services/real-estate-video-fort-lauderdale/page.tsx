import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CalendarDays,
  Camera,
  Smartphone,
  Mail,
  Phone,
  Video,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { REAL_ESTATE_VIDEO_FORT_LAUDERDALE_DEPTH } from "@/lib/service-depth-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  FILMING_HOURLY,
  ON_LOCATION_CAPTURE,
  REAL_ESTATE_DRONE_PHOTO_ADD_ON,
  REAL_ESTATE_MEDIA_PRICES,
  REAL_ESTATE_PLANS,
  REAL_ESTATE_PLAN_TERMS,
  SHORT_FORM,
  filmingHourlyText,
  usd,
} from "@/lib/pricing";
import { REAL_ESTATE_MEDIA } from "@/lib/services-config";
import { absoluteUrl, site } from "@/lib/site";
import { RealEstateReels } from "@/components/real-estate-reels";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Real Estate Video Editor in Fort Lauderdale",
  description:
    `Real estate video editor in Fort Lauderdale: listing films, walkthroughs, drone, and Reels from ${usd(SHORT_FORM.perVideoFrom)} per video, monthly plans from ${usd(REAL_ESTATE_PLANS[0].price)}, and photography from ${usd(REAL_ESTATE_MEDIA_PRICES.photoTiers[0])} for Fort Lauderdale agents.`,
  path: "/services/real-estate-video-fort-lauderdale",
  locale: "en",
});

export default function RealEstateVideoFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...buildServicePageNodes({
        path: "/services/real-estate-video-fort-lauderdale",
        name: "Real Estate Video Editor in Fort Lauderdale",
        description:
          `Real estate video editor in Fort Lauderdale: listing films, walkthroughs, drone, and Reels from ${usd(SHORT_FORM.perVideoFrom)} per video, monthly plans from ${usd(REAL_ESTATE_PLANS[0].price)}, and photography from ${usd(REAL_ESTATE_MEDIA_PRICES.photoTiers[0])} for Fort Lauderdale agents.`,
        crumb: "Fort Lauderdale Real Estate Video",
      }),
      buildServiceFaqSchema(
        absoluteUrl("/services/real-estate-video-fort-lauderdale"),
        REAL_ESTATE_VIDEO_FORT_LAUDERDALE_DEPTH.faqs,
      ),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/real-estate-video-fort-lauderdale#service"),
        name: "Real Estate Video Editor in Fort Lauderdale",
        description:
          "Real estate video editing in Fort Lauderdale: listing films, property walkthroughs, drone, photography, Zillow 3D tours, and short listing Reels for agents and teams in Fort Lauderdale, Miami, and Palm Beach.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Fort Lauderdale / Broward / Miami-Dade / Palm Beach",
        serviceType: "Real estate video editing",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/real-estate-video-fort-lauderdale", jsonLd)) }}
      />
      {/* Hero: subtitles-page tight intro + homepage price anchor. */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#9f3c27]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="hover:text-[#9f3c27]">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">
                Fort Lauderdale Real Estate Video
              </li>
            </ol>
          </nav>
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Fort Lauderdale / Real Estate Video
          </p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">
            Real Estate Video Editor in Fort Lauderdale.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Listing films, walkthroughs, drone, photography, Zillow 3D tours, and Reels for Fort Lauderdale agents and teams, edited in Fort Lauderdale by Esteban Moreno Media. From {usd(SHORT_FORM.perVideoFrom)} a video · Monthly plans from {usd(REAL_ESTATE_PLANS[0].price)} · Fort Lauderdale &amp; Miami · WhatsApp
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
            >
              Start a Listing Video
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="#work"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
            >
              See the Finished Work
            </Link>
            <Link
              href="/calculator"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
            >
              Calculate Project Budget
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#5a6066]">
            ¿Prefieres español? Lee la versión en español:{" "}
            <Link href="/es/editor-de-video-real-estate-miami" className="underline decoration-[#e85d3e] underline-offset-4 hover:text-[#9f3c27]">
              editor de video real estate en Miami
            </Link>
            .
          </p>
        </Container>
      </section>

      {/* How it works: homepage three steps, for an agent. */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            How it works
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div>
              <p className="font-serif text-2xl">1. Tell me what you need</p>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Send the footage you have, or tell me what you want filmed. A walkthrough, drone clips, exteriors, or a full shoot day in Fort Lauderdale.
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl">2. Choose your starting point</p>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                One video from {usd(SHORT_FORM.perVideoFrom)}, a monthly plan from {usd(REAL_ESTATE_PLANS[0].price)}, or a shoot scoped to the listing.
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl">3. Get a clear plan</p>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                You will receive the price, timeline, and what you will receive in writing before we begin.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-[#5a6066]">
            I film across Fort Lauderdale, Broward, and Miami-Dade. If you already have footage, I can edit it remotely from anywhere.
          </p>
        </Container>
      </section>

      {/* Work first: the finished property videos, before the offer. */}
      <section id="work" className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            First, the work
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            See the finished work.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
            7 finished property videos. Tap any poster to watch.
          </p>
        </Container>
        <RealEstateReels locale="en" />
      </section>

      {/* Purpose / Craft / Action: the homepage three-beat. */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            One project, one creative partner
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Start with the purpose. Choose the craft that helps.
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Scene 01 // Focus</p>
              <p className="mt-3 font-serif text-2xl">Purpose</p>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Begin with the listing: the buyer it has to reach, the showing it has to earn, and where the video needs to live.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Take 02 // Craft</p>
              <p className="mt-3 font-serif text-2xl">Craft</p>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Choose the right craft: a listing film, a walkthrough cut, drone and photos, or Reels cut from the same shoot.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Cut 03 // Action</p>
              <p className="mt-3 font-serif text-2xl">Next step</p>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Leave with a practical next step: send the footage and get a written quote and timing before any work begins.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* What do you need made? Homepage situation picker, as cards. */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            Choose a project path
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            What do you need made?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
            Tap the situation that matches your listing. Each one opens with everything included.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-2xl">A listing film</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                A walkthrough cut in the order a buyer would walk the home, with drone and exterior passes and the agent guiding the tour instead of starring in it. Editing from {usd(SHORT_FORM.perVideoFrom)} per video. On-location filming is {filmingHourlyText("en")} with a {FILMING_HOURLY.minimumHours}-hour minimum, and a half-day content shoot starts at {usd(ON_LOCATION_CAPTURE.from)}.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <span className="font-semibold">What to send.</span> The walkthrough as filmed, any drone clips, the must-show features, the listing-safe facts, and the date you need it.
              </p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Smartphone className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-2xl">Listing Reels</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Vertical cuts for Instagram and TikTok that open on the strongest shot and protect the features that sell the home. Reels are one format inside the listing video, not the whole job: the same shoot also covers the walkthrough and the portal film. From {usd(SHORT_FORM.perVideoFrom)} per video, with timing confirmed in writing with your quote.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <span className="font-semibold">What to send.</span> The original clips, the listing-safe facts, agent branding, and the call to action for the end card.
              </p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Camera className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-2xl">Drone and photos</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                Listing photography priced by home size, drone passes for water, lot, and neighborhood, a Zillow 3D tour, and a premium listing video when the home calls for it.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#252a2d]">
                {REAL_ESTATE_MEDIA.photography.map((tier) => (
                  <li key={tier.label.en} className="flex items-baseline justify-between gap-4 border-b border-[#ddd4c8] pb-2">
                    <span>{tier.label.en}</span>
                    <span className="font-semibold">
                      {tier.amount === null ? "Call to discuss" : usd(tier.amount)}
                    </span>
                  </li>
                ))}
                <li className="flex items-baseline justify-between gap-4 border-b border-[#ddd4c8] pb-2">
                  <span>Drone photography</span>
                  <span className="font-semibold">{usd(REAL_ESTATE_DRONE_PHOTO_ADD_ON)}</span>
                </li>
                <li className="flex items-baseline justify-between gap-4 border-b border-[#ddd4c8] pb-2">
                  <span>Zillow 3D tour</span>
                  <span className="font-semibold">Starting at {usd(REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom)}</span>
                </li>
                <li className="flex items-baseline justify-between gap-4">
                  <span>Premium listing video</span>
                  <span className="font-semibold">{usd(REAL_ESTATE_MEDIA_PRICES.premiumListingVideoPerMinute)} / min</span>
                </li>
              </ul>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <span className="font-semibold">What to send.</span> The square footage and the address, and the features the photos have to show.
              </p>
            </div>
            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <CalendarDays className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-2xl">A monthly plan for several listings</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                For agents and teams with a steady flow of listings in Fort Lauderdale. One plan covers the shoot days, the photos, and the Reels every week, so a new listing does not start from zero.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#252a2d]">
                <li className="flex items-baseline justify-between gap-4 border-b border-[#ddd4c8] pb-2">
                  <span>Essential — 1 property a month</span>
                  <span className="font-semibold">{usd(REAL_ESTATE_PLANS[0].price)}/mo</span>
                </li>
                <li className="flex items-baseline justify-between gap-4 border-b border-[#ddd4c8] pb-2">
                  <span>Plus — 2 properties a month</span>
                  <span className="font-semibold">{usd(REAL_ESTATE_PLANS[1].price)}/mo</span>
                </li>
                <li className="flex items-baseline justify-between gap-4">
                  <span>Premium — 3 properties a month, drone included</span>
                  <span className="font-semibold">{usd(REAL_ESTATE_PLANS[2].price)}/mo</span>
                </li>
              </ul>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <span className="font-semibold">What to send.</span> How many listings a month you expect, and the first property&apos;s address and date.
              </p>
              <p className="mt-3 text-xs leading-5 text-[#5a6066]">
                Monthly real estate plan terms: {REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum. Extra properties or homes over 3,000 SF are quoted separately.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-[#5a6066]">
            Every price is a starting point: the final quote follows your scope, and we can always talk it through.
          </p>
        </Container>
      </section>

      {/* In short: subtitles-page explainer, one plain paragraph. */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
              In short
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              How does real estate video editing with Esteban Moreno Media work?
            </h2>
            <p className="mt-6 text-base leading-8 text-[#252a2d]">
              A real estate video editor in Fort Lauderdale takes the footage an agent already has, a walkthrough, drone clips, exteriors, and short agent pieces to camera, and turns it into listing videos a buyer can actually inspect: rooms in the order a person would walk them, vertical crops that protect the features that sell, and the agent guiding the tour instead of starring in it. Esteban Moreno Media edits remotely from Fort Lauderdale for agents and teams across Fort Lauderdale, Miami, and Palm Beach, in Spanish first with intermediate English available. Send the original clips, the listing-safe facts, and the must-show features; per-video rates are published, and every project gets a written quote before editing starts.
            </p>
          </div>
        </Container>
      </section>

      {/*
        Citable depth. The three articles below name the criteria; they carry
        the argument at citable weight without restating the FAQ answers,
        which already cover footage, remote editing, coverage, and pricing.
      */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section="real-estate-video-depth">
        <Container size="xl">
          <div className="mx-auto max-w-4xl space-y-10">
            <div className="border-b border-[#ddd4c8] pb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                Scope and technical criteria
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                What the video has to prove before the showing
              </h2>
            </div>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">What a buyer needs to see before booking a showing</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                A listing video has one job before anything else: let a buyer decide whether the home is worth a showing. That means the rooms in the order a person would walk them, the features that set this Fort Lauderdale property apart, and enough context to judge size, light, and condition. A montage of attractive shots does not do that work; it leaves the buyer guessing about layout and flow, and guessing is what kills a showing. The edit should make the property inspectable: entrance, main living space, kitchen, bedrooms, outdoor areas, and the water or view that justifies the price. When a room is skipped or a feature is hidden by a careless crop, the buyer notices the gap more than the polish. A clear sequence, honest framing, and the agent guiding the tour instead of starring in it are what turn a short video into a reason to visit.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">One shoot, every format the listing needs</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                A listing rarely needs one video. The brokerage portal wants a calm 16:9 tour, Instagram and TikTok want a vertical Reel that opens on the strongest shot, and the agent&apos;s own feed wants a short cutdown with a clear call to action. Planning those formats before the shoot means one session covers them all: the walkthrough is filmed with safe zones for vertical crops, the drone pass is captured for both the tour and the Reel opener, and the agent&apos;s pieces to camera are kept short enough to cut three ways. The same shoot also covers the stills the listing needs: photography priced by home size, a Zillow 3D tour, and a premium listing video when the home calls for it. The alternative is three separate edits that each cost a day. One planned shoot, delivered in the formats the listing actually uses, is what a monthly plan is for. See the <Link href="/pricing/real-estate" className="underline decoration-[#e85d3e] underline-offset-4 hover:text-[#9f3c27]">published real estate rates</Link> for the full list.
              </p>
            </article>

            <article className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl">An editor in Fort Lauderdale, not a production company</h3>
              <p className="text-base leading-8 text-[#252a2d]">
                The companies usually listed for this search are production companies: crews, shoot days, and a quote that starts with the crew. Esteban works the other way. He is a bilingual editor based in Fort Lauderdale who starts from the footage the agent already has, so a listing that is already filmed needs an edit, not a crew. Spanish is his first language and his English is intermediate, so a brief can arrive in either language and the captions come back in both. Editing starts at {usd(SHORT_FORM.perVideoFrom)} per video, and monthly plans start at {usd(REAL_ESTATE_PLANS[0].price)} for agents with a steady flow of listings. The work is rated 5.0 on Google across 19 public reviews, and the 7 finished property videos above show what those reviews describe. For the full offer, see the <Link href="/services/real-estate-reels-video-editor-south-florida" className="underline decoration-[#e85d3e] underline-offset-4 hover:text-[#9f3c27]">real estate Reels page</Link>.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={REAL_ESTATE_VIDEO_FORT_LAUDERDALE_DEPTH.craftHeading}
        cards={REAL_ESTATE_VIDEO_FORT_LAUDERDALE_DEPTH.craft}
        sectionId="real-estate-video-craft"
      />

      {/* Get Started: subtitles-page brief prompt + inquiry rail. */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
              Get Started
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Need a real estate video editor in Fort Lauderdale?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
              Share the listing, the footage you have, and the date you need it.
            </p>
          </div>
        </Container>
        <ServiceInquiryRail
          service={{
            serviceId: "real_estate_video_fort_lauderdale",
            serviceName: "real estate video editing in Fort Lauderdale",
            goalPrompt: "turn listing, walkthrough, or drone footage into a video a buyer can inspect",
            assetPrompt: "original property clips, listing-safe facts, agent branding, must-show features, and a deadline",
            proofHref: "/pricing/real-estate",
            proofLabel: "Review real estate service rates",
          }}
        />
      </section>

      {/* Reviews: homepage reviews section, real estate proof first. */}
      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            Client reviews
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Real client feedback, verified on Google.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#252a2d]">
            5.0 rating · 19 public reviews on Google
          </p>
          <blockquote className="mt-8 max-w-3xl border-l-2 border-[#e85d3e] pl-6">
            <p className="text-base leading-8 text-[#252a2d]">
              &ldquo;I&apos;ve had an amazing experience working with this media company for my real estate photography and videography needs! The quality of the photos and videos was exceptional, Esteban really knows how to showcase a property in a way that makes it stand out.&rdquo;
            </p>
            <p className="mt-3 text-base leading-8 text-[#252a2d]">
              &ldquo;Professional, creative, responsive, and easy to work with from start to finish. The final content exceeded my expectations and made my listings look absolutely incredible.&rdquo;
            </p>
            <p className="mt-3 text-base leading-8 text-[#252a2d]">
              &ldquo;I highly recommend them to any real estate professional looking for high-quality photography and videography services. I&apos;ll definitely be using them again!&rdquo;
            </p>
            <footer className="mt-4 text-sm font-semibold text-[#252a2d]">Caro Suarez</footer>
          </blockquote>
          <div className="mt-6">
            <a
              href={site.googleBusinessProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:text-[var(--em-accent-ink)]"
            >
              See all reviews on Google
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      </section>

      <ServiceFaqs
        heading={REAL_ESTATE_VIDEO_FORT_LAUDERDALE_DEPTH.faqHeading}
        faqs={REAL_ESTATE_VIDEO_FORT_LAUDERDALE_DEPTH.faqs}
      />
      <ServiceRelated
        heading={REAL_ESTATE_VIDEO_FORT_LAUDERDALE_DEPTH.relatedHeading}
        services={REAL_ESTATE_VIDEO_FORT_LAUDERDALE_DEPTH.related}
      />

      <section className="pb-12 sm:pb-16 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Marketing a listing in Fort Lauderdale?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send your walkthrough or drone footage for editing, or calculate your custom project scope online.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/calculator"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Calculator className="size-4" aria-hidden="true" />
                  Budget Calculator
                </Link>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Email
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#101214] px-5 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <EventSeasonLinks locale="en" path="/services/real-estate-video-fort-lauderdale" />
      <NicheAnswers path="/services/real-estate-video-fort-lauderdale" fact={String(metadata.description ?? "")} />
    </main>
  );
}
