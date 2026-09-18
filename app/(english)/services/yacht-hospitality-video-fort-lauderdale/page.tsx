import React from "react";
import Link from "next/link";
import {
  Anchor,
  ArrowRight,
  Calculator,
  Compass,
  FileText,
  Mail,
  Phone,
  Scissors,
  Sparkles,
  Waves,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const faqs = [
  {
    question: "What footage can a yacht charter or marine broker provide for video editing?",
    answer:
      "Marine businesses and charter operators provide client-supplied footage: drone sweeps, cabin interior walkthroughs, cruising footage, wakeboarding or water sports, guest hospitality moments, dockside lifestyle, or captain commentary. Supplying vessel specs, brand logos, and specific reservation calls to action helps shape the edit.",
  },
  {
    question: "How do you manage wind noise, water splash, and engine roar in marine footage?",
    answer:
      "Marine recordings often contain heavy background wind and engine rumble. We apply specialized noise reduction and frequency balancing to isolate spoken dialogue, blend realistic ocean ambient soundscapes, and layer commercially licensed background music that elevates the lifestyle feel.",
  },
  {
    question: "Can drone aerial footage be color graded and stabilized for yacht promos?",
    answer:
      "Yes. Client-supplied aerial drone clips are stabilized and color graded to balance intense maritime sunlight, ocean surface reflections, deep blue water tones, and teak deck finishes so the entire video maintains visual elegance.",
  },
  {
    question: "Do you deliver multi-format cuts for social media and website listings?",
    answer:
      "Yes. Projects are formatted in 16:9 widescreen for websites, broker portals, and YouTube, alongside 9:16 vertical versions optimized for Instagram Reels, TikTok, and mobile ad placements. Safe zones are preserved to keep vessel names and booking details unobscured.",
  },
  {
    question: "How does the file transfer and revision workflow work for marine video projects?",
    answer:
      "Large camera files and drone footage can be uploaded via secure cloud transfer. Once an initial cut is delivered, you can provide consolidated, time-stamped feedback covering pacing, music sync, titles, and calls to action to finalize the master deliverable.",
  },
] as const;

export const metadata = buildPageMetadata({
  title: "Yacht Hospitality Video Fort Lauderdale | Marine Editing",
  description:
    "Fort Lauderdale yacht video editing and promotional marine post-production. Turn charter, broker, and waterfront hospitality footage into engaging video.",
  path: "/services/yacht-hospitality-video-fort-lauderdale",
  locale: "en",
});

export default function YachtHospitalityVideoFortLauderdalePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/yacht-hospitality-video-fort-lauderdale#service"),
        name: "Yacht Hospitality Video Fort Lauderdale",
        description:
          "Fort Lauderdale yacht video editing, marine drone footage formatting, and luxury charter promotional video post-production.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Fort Lauderdale / Broward",
        serviceType: "Marine video production",
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl("/services/yacht-hospitality-video-fort-lauderdale#faq"),
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
                Fort Lauderdale Yacht Video
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Fort Lauderdale / Yachting & Marine
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Yacht & Marine Video Editing in Fort Lauderdale.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Promotional video post-production for yacht charter companies, marine brokers, and waterfront hospitality venues in South Florida.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
                >
                  Start a Yacht Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/banacol"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  View Marine Proof
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
              <Anchor className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Marine & aerial proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Our{" "}
                <Link
                  href="/portfolio"
                  className="underline underline-offset-4 hover:text-[#9f3c27]"
                >
                  portfolio
                </Link>{" "}
                project <strong>Banacol</strong> proves published aerial drone cinematography filmed on assignment from boats at sea.
              </p>
              <div className="mt-5 border-t border-[#ddd4c8] pt-4">
                <Link
                  href="/portfolio/banacol"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#9f3c27] hover:text-[#c84a2c]"
                >
                  Review Banacol Marine & Aerial Drone Proof
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
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
              Showcase luxury, speed, and open-water hospitality.
            </h2>
            <div className="mt-8 space-y-6 text-base leading-8 text-[#252a2d]">
              <p>
                A high-converting marine promo video balances dynamic cruising motion with the serene comfort of onboard hospitality. Whether editing footage for a luxury day charter in the Intracoastal, a yacht brokerage listing, or a marina resort, the edit must convey craftsmanship, space, and the exclusivity of the maritime lifestyle.
              </p>
              <p>
                Pacing adapts to the footage and campaign goal. Dynamic cuts capture bow spray, engine acceleration, wake sports, and aerial coastlines, while smooth transitions highlight spacious salon interiors, master staterooms, sun decks, and gourmet catering. For guidance on capturing and selecting aerial footage, explore our <Link href="/guides/drone-video-editing-guidelines-florida" className="underline underline-offset-4 hover:text-[#9f3c27]">drone video editing guidelines for Florida</Link>.
              </p>
              <p>
                Color grading for open water requires precision. We balance high-contrast tropical sun, water surface glares, and deep ocean blues while preserving natural wood finishes, upholstery, and flattering skin tones on deck. This service edits <strong>client-supplied footage</strong>, allowing marine businesses to turn existing vessel libraries into polished promotional assets.
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
              Engineered for luxury buyer portals and high-reach social feeds.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <article className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
                <h3 className="font-serif text-2xl">16:9 & 9:16 Cuts</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  High-resolution 16:9 master edits for website landing pages and broker portals, paired with 9:16 vertical cuts framed specifically for Instagram Reels and TikTok charter promotions.
                </p>
              </article>
              <article className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
                <h3 className="font-serif text-2xl">Marine Audio Design</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  Noise suppression cleans intense wind and motor rumble, complemented by ambient wave sound design and commercially licensed music tracks tailored to luxury lifestyle branding.
                </p>
              </article>
              <article className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
                <h3 className="font-serif text-2xl">Vessel Specifications</h3>
                <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                  On-screen kinetic typography highlights length, passenger capacity, cruising speed, and booking contact details clearly without cluttering the visual beauty of the vessel.
                </p>
              </article>
            </div>
            <p className="mt-8 text-base leading-8 text-[#252a2d]">
              To prepare your yacht or boat clips efficiently for post-production, review our <Link href="/guides/remote-video-editing-handoff" className="underline underline-offset-4 hover:text-[#9f3c27]">remote video editing handoff guide</Link> for recommended file organization and cloud transfer practices.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Connected Services & Solutions
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Complete visual production for South Florida luxury brands.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/services/drone-video-editing-service-miami"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <Waves className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">Drone Video Editing</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Stabilization, color grading, and speed-ramping for aerial footage captured across South Florida coastal waters.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore Drone Editing
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
                Engaging vertical reels with sound design and animated captions designed to drive direct charter inquiries.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore Short-Form Editing
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/services/restaurant-promo-video-editing-miami"
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e]"
            >
              <Sparkles className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">Hospitality & Dining Video</h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Atmospheric video editing for waterfront dining venues, beach clubs, and luxury hospitality destinations.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Explore Hospitality Video
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
              <h2 className="mt-4 font-serif text-4xl leading-tight">Key answers before submitting your yacht video footage.</h2>
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
            Technical guides for marine and coastal video production.
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Link
              href="/guides/drone-video-editing-guidelines-florida"
              className="group rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 transition hover:border-[#e85d3e]"
            >
              <FileText className="size-6 text-[#1a9fa3]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">
                Drone Video Editing Guidelines for Florida Projects
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                Techniques for stabilizing aerial motion, balancing coastal sunlight, and structuring compelling over-water establishing shots.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Read Drone Editing Guide
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>

            <Link
              href="/guides/remote-video-editing-handoff"
              className="group rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 transition hover:border-[#e85d3e]"
            >
              <Compass className="size-6 text-[#1a9fa3]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">
                Remote Video Editing Handoff & Footage Preparation
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                How to organize camera files, drone footage, and audio tracks to streamline the post-production editing process.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-[#9f3c27] group-hover:underline">
                Read Handoff Guide
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
                  Promoting a yacht charter or marine service in Fort Lauderdale?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Send your vessel clips or drone footage for editing, or calculate your custom project scope online.
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
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white hover:bg-[#a93e29]"
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
