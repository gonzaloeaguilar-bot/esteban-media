import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceCraft,
  ServiceDeepDive,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { MEDICAL_PRACTICE_DEPTH } from "@/lib/service-depth-content";
import { MEDICAL_PRACTICE_DEEP_DIVE } from "@/lib/service-deep-dive-content";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

const path = "/services/medical-practice-video-marketing-miami";

export const metadata = buildPageMetadata({
  title: "Medical Practice Video Marketing Miami",
  description:
    "Video editing and selective production for chiropractors, physical therapists, functional medicine clinics, and urgent care in Miami and Broward.",
  path,
  locale: "en",
});

export default function MedicalPracticeVideoMarketingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(path), MEDICAL_PRACTICE_DEPTH.faqs),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: "Medical Practice Video Marketing Miami",
        description:
          "Video editing and selective video production for chiropractic, physical therapy, functional medicine, and walk-in clinics in Miami-Dade and Broward.",
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: "Miami-Dade / Broward",
        serviceType: "Medical practice video marketing",
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
            name: "Medical Practice Video Marketing",
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
                Medical Practice Video Marketing
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Clinics / Chiropractic / Physical Therapy
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Video for medical practices in Miami and Broward.
              </h1>
              {/* Answer first: what this is, and what to do next. */}
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Esteban edits the footage a chiropractic, physical therapy,
                functional medicine or walk-in clinic films in its own rooms, and
                takes on selective on-location days in South Florida. Send the
                clips you already have, say which ones have patient
                authorisation, and you get a usable next step rather than a long
                back-and-forth.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  data-cta="medical_practice_hero_contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Talk about a clinic video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/portfolio/healthy-smile"
                  data-cta="medical_practice_hero_proof"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  See a published clinic project
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Stethoscope className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Where to start</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                A clinician explaining one complaint to camera, a single exercise
                demonstrated wide enough to see the whole body, and a short tour
                of the room a first-time patient is picturing. All three can be
                filmed on a phone between appointments.
              </p>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                Spanish is Esteban&apos;s working language, with intermediate
                English also available.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <ServiceCraft
        heading={MEDICAL_PRACTICE_DEPTH.craftHeading}
        cards={MEDICAL_PRACTICE_DEPTH.craft}
        sectionId="medical-practice-craft"
      />
      <ServiceDeepDive
        id={MEDICAL_PRACTICE_DEEP_DIVE.id}
        title={MEDICAL_PRACTICE_DEEP_DIVE.title}
        destinations={MEDICAL_PRACTICE_DEEP_DIVE.destinations}
        sections={MEDICAL_PRACTICE_DEEP_DIVE.sections}
      />
      <ServiceFaqs
        heading={MEDICAL_PRACTICE_DEPTH.faqHeading}
        faqs={MEDICAL_PRACTICE_DEPTH.faqs}
      />
      <ServiceInquiryRail
        service={{
          serviceId: "medical_practice_video",
          serviceName: "video for a medical practice",
          goalPrompt: "explain one treatment or complaint to prospective patients",
          assetPrompt: "clinic footage, the clips that carry patient authorisation, and our logo",
          proofHref: "/portfolio/healthy-smile",
          proofLabel: "Review the published clinic project",
        }}
      />
      <ServiceRelated
        heading={MEDICAL_PRACTICE_DEPTH.relatedHeading}
        services={MEDICAL_PRACTICE_DEPTH.related}
      />
    </main>
  );
}
