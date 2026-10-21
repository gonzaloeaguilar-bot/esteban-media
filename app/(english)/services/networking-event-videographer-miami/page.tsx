import Link from "next/link";
import { ArrowRight, Handshake, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { NETWORKING_EVENT_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";
import { SectorQuotePath } from "@/components/sector-quote-path";

export const metadata = buildPageMetadata({
  title: "Networking Event Videographer Miami",
  description:
    "Networking event videography and attendee soundbite recaps for Miami business mixers, founder meetups, and investor socials, scoped before the date.",
  path: "/services/networking-event-videographer-miami",
  locale: "en",
});

export default function NetworkingEventVideographerMiamiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/networking-event-videographer-miami"),
        PORTED_SERVICE_FAQS["/services/networking-event-videographer-miami"],
      ),
      ...buildServicePageNodes({
        path: "/services/networking-event-videographer-miami",
        name: "Networking Event Videographer Miami",
        description:
          "Video capture, roving attendee interviews, and dynamic recap reels for business networking mixers and corporate socials in Miami.",
        crumb: "Networking Event Videographer Miami",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/networking-event-videographer-miami#service"),
        name: "Networking Event Videographer Miami",
        description:
          "Networking event videography, attendee interviews, and social recap video production in Miami.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Miami / South Florida",
        serviceType: "Event video production",
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
              "/services/networking-event-videographer-miami",
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
                Networking Event Videographer Miami
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Miami / Business Mixers
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Networking Event Videographer in Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                On-location video capture and dynamic social recaps for Miami business networking mixers, investor cocktails, and founder meetups. Roving attendee interviews and mixer energy captured naturally.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Book Mixer Videography
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Handshake className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What published event video proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                <strong>Healthy Smile Miami</strong>: social-media videos for a South Florida clinic. Esteban filmed on location, video and sound, then edited and delivered the finished pieces. For an extended event film, see the <Link href="/portfolio/diana-jack" className="underline decoration-[#e85d3e] underline-offset-4">Diana &amp; Jack</Link> wedding film.
              </p>
              <Link
                href="/portfolio/healthy-smile"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Review Healthy Smile Video Proof
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <ServiceAnswerFirst service="networking event videography in Miami" />
      <SectorQuotePath sector="event" />

      <ServiceDeepDive
        id={NETWORKING_EVENT_DEEP_DIVE.id}
        title={NETWORKING_EVENT_DEEP_DIVE.title}
        destinations={NETWORKING_EVENT_DEEP_DIVE.destinations}
        sections={NETWORKING_EVENT_DEEP_DIVE.sections}
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
                  Hosting an upcoming networking mixer in Miami?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Email or call to reserve video coverage for your business mixer or cocktail.
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
        faqs={PORTED_SERVICE_FAQS["/services/networking-event-videographer-miami"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/networking-event-videographer-miami" />
      <NicheAnswers path="/services/networking-event-videographer-miami" fact={String(metadata.description ?? "")} />
    </main>
  );
}
