import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { WHITE_LABEL_DEPTH } from "@/lib/service-depth-content";
import { WHITE_LABEL_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const path = "/services/white-label-video-editing-for-agencies";

export const metadata = buildPageMetadata({
  title: "White Label Video Editing for Agencies",
  description:
    "Unbranded video editing for marketing agencies and photographers who sell the shoot and subcontract post-production. Your client, your delivery, your name.",
  path,
  locale: "en",
});

export default function WhiteLabelVideoEditingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), WHITE_LABEL_DEPTH.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "White Label Video Editing for Agencies",
        description:
          "Unbranded, subcontracted video post-production for marketing agencies, photographers, and production studios, delivered under the studio's own name.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "South Florida / Remote",
        serviceType: "White label video post-production",
      },
      {
        "@type": "BreadcrumbList",
        "@id": absoluteUrl(`${path}#breadcrumbs`),
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          {
            "@type": "ListItem",
            position: 3,
            name: "White Label Video Editing",
            item: absoluteUrl(path),
          },
        ],
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
                White Label Video Editing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Agencies / Photographers / Studios
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                White label editing for agencies and photographers.
              </h1>
              {/* Answer first: what this is, and what to do next. */}
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                You sold the shoot and you keep the client. Esteban cuts the
                footage and returns unbranded files named your way, with no
                watermark, no credit and no contact with the end client. Send the
                camera files, the brand assets and a one-page brief, and the
                delivery slots into the workflow you already have.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  data-cta="white_label_hero_contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Send a project to quote
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/services/hire-remote-video-editor"
                  data-cta="white_label_hero_remote"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  How remote editing works
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Handshake className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">The arrangement</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                One point of contact on your side. Notes consolidated per round
                with timecodes. Files unbranded and named to your convention. No
                public reference to the work unless you say so.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Esteban works in Spanish, with intermediate English also
                available for written notes and briefs.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={WHITE_LABEL_DEPTH.craftHeading}
        cards={WHITE_LABEL_DEPTH.craft}
        sectionId="white-label-craft"
      />
      <ServiceDeepDive
        id={WHITE_LABEL_DEEP_DIVE.id}
        title={WHITE_LABEL_DEEP_DIVE.title}
        destinations={WHITE_LABEL_DEEP_DIVE.destinations}
        sections={WHITE_LABEL_DEEP_DIVE.sections}
      />
      <ServiceFaqs heading={WHITE_LABEL_DEPTH.faqHeading} faqs={WHITE_LABEL_DEPTH.faqs} />
      <ServiceInquiryRail
        service={{
          serviceId: "white_label_video_editing",
          serviceName: "white label video editing",
          goalPrompt: "deliver an edit to our own client under our name",
          assetPrompt: "original camera files, brand assets, the deliverable list and any approved look",
          proofHref: "/portfolio",
          proofLabel: "Review published work",
        }}
      />
      <ServiceRelated
        heading={WHITE_LABEL_DEPTH.relatedHeading}
        services={WHITE_LABEL_DEPTH.related}
      />
    </main>
  );
}
