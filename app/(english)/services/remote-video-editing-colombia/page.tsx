import Link from "next/link";
import { ArrowRight, Camera, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceDeepDive,
  ServiceFaqs,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { REMOTE_EDITING_COLOMBIA_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { EventSeasonLinks } from "@/components/event-content-page";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";
import { SHORT_FORM, usd } from "@/lib/pricing";

export const metadata = buildPageMetadata({
  title: "Remote Video Editing for Supplied Footage | Spanish & English",
  description: `Remote video editing for teams that already have footage: Spanish-first collaboration, English for bilingual projects, and a written scope from ${usd(SHORT_FORM.perVideoFrom)}.`,
  path: "/services/remote-video-editing-colombia",
  locale: "en",
});

export default function RemoteVideoEditingColombiaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(
        absoluteUrl("/services/remote-video-editing-colombia"),
        PORTED_SERVICE_FAQS["/services/remote-video-editing-colombia"],
      ),
      ...buildServicePageNodes({
        path: "/services/remote-video-editing-colombia",
        name: "Remote Video Editing Colombia",
        description:
          "Cloud-based video editing, social video post-production, and commercial video formatting for teams that supply footage, including Colombia and remote Latin American projects.",
        crumb: "Remote Video Editing Colombia",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/remote-video-editing-colombia#service"),
        name: "Remote Video Editing Colombia",
        description:
          "Professional remote video post-production, YouTube editing, and social-media video repurposing for client-supplied footage, including Colombian businesses and remote projects.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Colombia / Remote / Latin America",
        serviceType: "Video editing",
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
              "/services/remote-video-editing-colombia",
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
                Remote Video Editing Colombia
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Colombia &amp; LATAM / Remote Video Editing
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Remote Video Editing for the Footage You Already Have.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Send original clips, a clear goal, and a reference. Esteban edits remotely in Spanish first, with English for bilingual projects, so the work can begin without an on-location shoot. Colombian and other remote teams receive a written scope before editing starts.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start Remote Editing
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Camera className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">What editing proof is available?</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Review verified commercial post-production, corporate event edits, and bilingual campaigns produced by Esteban Moreno. Explore our published <Link href="/portfolio/diana-jack" className="underline decoration-[#e85d3e] underline-offset-4">portfolio work</Link>.
              </p>
              <Link
                href="/portfolio/diana-jack"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
              >
                Watch Published Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst
        service="remote video editing for supplied footage"
        answerOverride={`Remote video editing lets a team send the original footage it already filmed instead of booking a new shoot. Esteban Moreno Media works from a short brief: the audience, publishing platform, key message, reference links, brand assets, and the files that must be used. The editing can produce a finished social video, a set of short clips, bilingual captions, or a longer interview cut. Esteban is based in Fort Lauderdale and works remotely in Spanish first, with English available for bilingual projects. A written scope confirms deliverables, revisions, timeline, and the final cost before work begins.`}
      />

      <ServiceDeepDive
        id={REMOTE_EDITING_COLOMBIA_DEEP_DIVE.id}
        title={REMOTE_EDITING_COLOMBIA_DEEP_DIVE.title}
        destinations={REMOTE_EDITING_COLOMBIA_DEEP_DIVE.destinations}
        sections={REMOTE_EDITING_COLOMBIA_DEEP_DIVE.sections}
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
                  Need remote video editing for your Colombian brand?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Share your footage volume, monthly publishing schedule, and sample reference links to receive a tailored proposal.
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
        faqs={PORTED_SERVICE_FAQS["/services/remote-video-editing-colombia"]}
        sectionId="ported-faq"
      />
      <EventSeasonLinks locale="en" path="/services/remote-video-editing-colombia" />
      <NicheAnswers path="/services/remote-video-editing-colombia" fact={String(metadata.description ?? "")} />
    </main>
  );
}
