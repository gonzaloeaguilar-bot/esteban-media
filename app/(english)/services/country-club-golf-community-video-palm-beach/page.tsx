import Link from "next/link";
import { ArrowRight, Landmark, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { COUNTRY_CLUB_GOLF_COMMUNITY_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Country Club & Golf Community Video Palm Beach",
  description:
    "Country club and golf community video in Palm Beach: championship course layouts, clubhouse dining, racquet sports, and prospective member recruitment films.",
  path: "/services/country-club-golf-community-video-palm-beach",
  locale: "en",
});

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/country-club-golf-community-video-palm-beach"),
        PORTED_SERVICE_FAQS["/services/country-club-golf-community-video-palm-beach"],
      ),
      ...buildServicePageNodes({
        path: "/services/country-club-golf-community-video-palm-beach",
        name: "Country Club & Golf Community Video Palm Beach",
        description:
          "Country club and golf community video in Palm Beach: championship course layouts, clubhouse dining, racquet sports, and prospective member recruitment films.",
        crumb: "Country Club & Golf Video Palm Beach",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/country-club-golf-community-video-palm-beach#service"),
        name: "Country Club & Golf Community Video Palm Beach",
        description:
          "Country club and golf community video in Palm Beach: championship course layouts, clubhouse dining, racquet sports, and prospective member recruitment films.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Palm Beach / Boca Raton / Jupiter",
        serviceType: "Country club and golf community video production",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            withNicheService(
              "/services/country-club-golf-community-video-palm-beach",
              jsonLd,
            ),
          ),
        }}
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
                Country Club &amp; Golf Video Palm Beach
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Palm Beach / Private Golf &amp; Country Club Video
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Country Club &amp; Golf Community Video Production.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Cinematic video marketing for private golf clubs and gated communities in Palm Beach: championship fairway flyovers, clubhouse dining, and membership recruitment.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Schedule Consultation
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Landmark className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What luxury lifestyle proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review our verified production work and cinematography pacing. Watch our published <Link href="/portfolio/diana-jack" className="underline decoration-[#e85d3e] underline-offset-4">Watch Published Luxury Event & Lifestyle Cinematography</Link>.
              </p>
              <Link
                href="/portfolio/diana-jack"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Luxury Event & Lifestyle Cinematography
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service="country club and golf community video marketing" />

      <ServiceDeepDive
        id={COUNTRY_CLUB_GOLF_COMMUNITY_DEEP_DIVE.id}
        title={COUNTRY_CLUB_GOLF_COMMUNITY_DEEP_DIVE.title}
        destinations={COUNTRY_CLUB_GOLF_COMMUNITY_DEEP_DIVE.destinations}
        sections={COUNTRY_CLUB_GOLF_COMMUNITY_DEEP_DIVE.sections}
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
                  Directing membership recruitment or golf operations in Palm Beach County?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your club amenities, course renovation timeline, event schedule, and prospective member campaign goals for a dedicated quote.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
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

      <ServiceFaqs
        heading="Common questions before you start."
        faqs={PORTED_SERVICE_FAQS["/services/country-club-golf-community-video-palm-beach"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/country-club-golf-community-video-palm-beach" />
      <NicheAnswers path="/services/country-club-golf-community-video-palm-beach" fact={String(metadata.description ?? "")} />
    </main>
  );
}
