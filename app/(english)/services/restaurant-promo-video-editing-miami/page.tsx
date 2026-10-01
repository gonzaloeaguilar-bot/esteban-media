import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Compass,
  FileText,
  Mail,
  Phone,
  Scissors,
  Sparkles,
  UtensilsCrossed,
  Video,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { ServiceInquiryRail } from "@/components/service-depth";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const faqs = [
  {
    question: "What footage can a restaurant provide for promo video editing?",
    answer:
      "Restaurant owners can provide client-supplied footage from a phone or camera: dish preparation, plating, beverage pours, dining-room atmosphere, staff moments, menu details, or a chef speaking to camera. A short note about the featured dish, promotion, audience, and where the video will appear gives the edit useful context.",
  },
  {
    question: "How are restaurant reels structured for short-form viewing?",
    answer:
      "A short restaurant reel can open on the most visually immediate moment, then move through preparation, texture, plating, or the room before ending with a clear menu, location, reservation, or ordering prompt supplied by the restaurant. The sequence depends on the available footage and the restaurant's message.",
  },
  {
    question: "Can restaurant videos be prepared in vertical and square formats?",
    answer:
      "Yes. A project can be scoped for 9:16 vertical versions for Instagram Reels and TikTok, plus 1:1 square versions where that placement is useful. Framing, text placement, and crops are reviewed for each requested format so important food details and on-screen information remain visible.",
  },
  {
    question: "Are captions included for sound-off restaurant video viewing?",
    answer:
      "Captions or subtitles can be added for spoken lines, menu context, or calls to action supplied by the restaurant. This helps a viewer follow the message when audio is muted, while keeping text clear of platform interface areas and the featured dish.",
  },
  {
    question: "How does feedback and revision work on a restaurant video edit?",
    answer:
      "After a draft is shared, the restaurant can consolidate time-stamped feedback on pacing, selected shots, text, and supplied calls to action. Revision scope is discussed with the project so feedback can be handled in an organized review cycle without assuming a fixed number of rounds.",
  },
] as const;

export const metadata = buildPageMetadata({
  title: "Restaurant Promo Video Editing Miami | From $240",
  description:
    "Restaurant promo video editing in Miami from $240. Food reels, dish spotlight cuts, captions, and social promo edits for South Florida restaurants.",
  path: "/services/restaurant-promo-video-editing-miami",
  locale: "en",
});

export default function RestaurantPromoVideoEditingMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/restaurant-promo-video-editing-miami#service"),
        name: "Restaurant Promo Video Editing Miami",
        description:
          "Restaurant promo video editing in Miami for food reels, dish spotlight cuts, captions, and social promo edits tailored to South Florida dining.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami / Wynwood",
        serviceType: "Restaurant video marketing",
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/services/restaurant-promo-video-editing-miami#faq"),
        inLanguage: "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                Restaurant Promo Video
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Culinary & Hospitality
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Restaurant Promo Video Editing in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Food-focused video edits, dish spotlight cuts, captioned restaurant reels, and social promo versions for Instagram, TikTok, digital menus, and web pages.
              </p>
              <p className="mt-4 text-base font-medium text-[#9f3c27]">
                Restaurant promo edits start at $240 — every project gets a
                scoped quote.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Edit Restaurant Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/bar-door-monkey"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Restaurant Proof
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  Calculate Project Budget
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Video className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Restaurant video proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our{" "}
                <Link
                  href="/portfolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  portfolio
                </Link>{" "}
                project <strong>Bar Door Monkey Miami</strong> proves published promotional hospitality videography and editing.
              </p>
              <div className="mt-5 border-t border-[#ddd4c8] pt-4">
                <Link
                  href="/portfolio/bar-door-monkey"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:text-[var(--em-accent-ink)]"
                >
                  Explore Bar Door Monkey Case Study
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Editing approach</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Build a food reel around the moments people can see.
            </h2>
            <div className="mt-8 space-y-6 text-base leading-8 text-[#252a2d]">
              <p>
                A useful restaurant promo starts with a clear subject: a signature dish, a new menu item, a beverage ritual, a dining moment, or a short message from the team. For short-form viewing, the edit can lead with the most immediate visual detail—steam, a pour, a cut, a finish, or a plated reveal—then give the viewer enough context to understand what is being served and what the restaurant wants them to do next.
              </p>
              <p>
                Pacing is shaped by the footage rather than a fixed formula. Close shots of hands, ingredients, texture, and service can sit beside wider shots that establish the room. The result can move quickly without making the food hard to read: each clip earns its place by showing preparation, atmosphere, or the menu message. For ideas that help plan those shots before filming, see the <Link href="/guides/video-content-ideas-for-restaurants" className="underline underline-offset-4 hover:text-[#9f3c27]">restaurant video content guide</Link>.
              </p>
              <p>
                Food color treatment should support appetite and natural texture, not turn a dish into an artificial color claim. Exposure, white balance, contrast, and saturation are reviewed across supplied clips so skin tones, table light, sauces, and ingredients feel consistent within the edit. The available source material sets the boundary: this service edits <strong>client-supplied footage</strong>, and any capture needs are scoped separately rather than assumed.
              </p>
              <p>
                For Miami restaurants, the most useful brief usually names the local setting, dish, offer, and channel before the edit begins. A bar promo, a lunch special, and a dining-room reel may all need different pacing, captions, and opening shots. The edit can keep that local intent clear without claiming a guaranteed reservation result.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Platform-ready delivery</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              Plan crops, captions, and handoff for the placements you use.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <article className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
                <h3 className="font-serif text-2xl">9:16 and 1:1</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">Vertical 9:16 versions can be prepared for Reels and TikTok; 1:1 square versions can be requested for feeds or other placements. Each version is framed for its intended crop.</p>
              </article>
              <article className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
                <h3 className="font-serif text-2xl">Sound-off clarity</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">Captions and subtitles can carry spoken context, menu details, or a supplied call to action when viewers are watching without sound. Text is placed to avoid obscuring the food and common interface areas.</p>
              </article>
              <article className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
                <h3 className="font-serif text-2xl">Organized feedback</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">Share footage with the dish names, brand assets, preferred message, and intended placements. A draft gives the restaurant a point to provide consolidated, time-stamped notes for the agreed revision scope.</p>
              </article>
            </div>
            <p className="mt-8 text-base leading-8 text-[#252a2d]">
              The handoff is simpler when folders identify the dish, date, camera orientation, and any must-use clips. Include menu spelling, logo files, and approved wording with the <strong>client-supplied footage</strong>. The <Link href="/guides/remote-video-editing-handoff" className="underline underline-offset-4 hover:text-[#9f3c27]">remote editing handoff guide</Link> explains a practical way to organize that material before it is shared.
            </p>
          </div>
        </Container>
      </section>

      <ServiceInquiryRail
        service={{
          serviceId: "restaurant_promo_video",
          serviceName: "restaurant promo video editing",
          goalPrompt: "turn food, dining-room, or staff footage into a promo reel",
          assetPrompt: "dish names, raw clips, menu wording, logo files, and the offer or booking action",
          proofHref: "/portfolio/bar-door-monkey",
          proofLabel: "Review restaurant video proof",
        }}
      />

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Connected Services & Solutions
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Complete visual production for hospitality & dining.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/services/ai-food-photography-restaurants"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <UtensilsCrossed className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">AI Food Photography</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                AI-assisted dish rendering and dining atmosphere staging for digital menus and delivery platforms.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore AI Food Photos
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/services/short-form-video-editor-miami"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <Scissors className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">Short-Form Video Editing</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                High-retention 9:16 vertical reels with sound design and animated captions for Instagram and TikTok.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore Short-Form Editing
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/services/creative-video-production-wynwood"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <Sparkles className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">Wynwood Creative Video</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Energetic venue and nightlife video production capturing Wynwood dining and cocktail culture.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore Wynwood Video
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">Frequently asked questions</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">Practical details before you share restaurant footage.</h2>
            </div>
            <div className="grid gap-3">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                  <h3 className="font-serif text-2xl">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Practical Production Guidance
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Guides to plan and scale your restaurant video content.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Link
              href="/guides/video-content-ideas-for-restaurants"
              className="group rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 transition hover:border-[#e85d3e]"
            >
              <FileText className="size-6 text-[#1a9fa3]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">
                Video Content Ideas That Bring Customers to Your Restaurant
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Simple, high-impact video concepts for restaurants and bars to showcase signature dishes, kitchen action, and dining energy.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Read Restaurant Video Guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/guides/how-to-use-instagram-reels-for-business"
              className="group rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 transition hover:border-[#e85d3e]"
            >
              <Compass className="size-6 text-[#1a9fa3]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">
                How to Use Instagram Reels for Business
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                A practical guide to structuring 15-to-30 second reels with strong opening hooks and direct calls to action.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Read Reels Strategy Guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16 pt-12">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Promoting a restaurant or bar in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send raw food footage or kitchen clips to start post-production, or calculate your custom project scope online.
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
    </main>
  );
}
