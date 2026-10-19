import Link from "next/link";
import { ArrowRight, Building2, Mail, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { PORTED_SERVICE_FAQS, serviceSiblings } from "@/lib/service-depth-content";
import {
  ServiceAnswerFirst,
  ServiceFaqs,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
} from "@/components/service-depth";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";
import { NicheAnswers } from "@/components/niche-answers";
import { withNicheService } from "@/lib/niche-answers";

export const metadata = buildPageMetadata({
  title: "Corporate Video Production Brickell Miami",
  description:
    "Corporate video editing, executive testimonials, and company overview videos for financial firms and tech startups in Brickell, Miami.",
  path: "/services/corporate-video-production-brickell",
  locale: "en",
});

export default function CorporateVideoProductionBrickellPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl("/services/corporate-video-production-brickell"), PORTED_SERVICE_FAQS["/services/corporate-video-production-brickell"]),
      ...buildServicePageNodes({
        path: "/services/corporate-video-production-brickell",
        name: "Corporate Video Production Brickell Miami",
        description:
          "Corporate video editing, executive testimonials, and company overview videos for financial firms and tech startups in Brickell, Miami.",
        crumb: "Brickell Corporate Video",
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl("/services/corporate-video-production-brickell#service"),
        name: "Corporate Video Production Brickell Miami",
        description:
          "Corporate video production, executive interview editing, and company videos for Brickell financial firms.",
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Brickell / Downtown Miami",
        serviceType: "Corporate video production",
      },
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withNicheService("/services/corporate-video-production-brickell", jsonLd)) }}
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
                Brickell Corporate Video
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase text-[#5a6066]">
                Brickell / Corporate Finance
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                Corporate Video Production in Brickell, Miami.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                Professional video editing and bilingual corporate storytelling for financial institutions, law practices, and tech startups in Brickell.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  Start a Corporate Video
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Building2 className="size-8 text-[#e85d3e]" aria-hidden="true" />
              <h2 className="mt-5 font-serif text-3xl">Published production proof</h2>
              <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                The published <strong>Healthy Smile Miami</strong> case records an on-location Miami assignment where Esteban handled camera, direct sound, and editing for an 18-second promotional master. It is a documented project scope, not a promise that another project will use the same plan.
              </p>
              <Link href="/case-studies/healthy-smile" className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">
                Review the Healthy Smile case study
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <ServiceAnswerFirst service="Corporate video production" />

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">Before a proposal</p>
            <h2 className="mt-3 font-serif text-4xl">What should a corporate video brief decide first?</h2>
            <p className="mt-4 text-base leading-7 text-[#252a2d]">Name the audience, business decision, required final files, approval owner, known locations, and fixed dates. Use the same brief when comparing proposals so scope, exclusions, and open questions can be reviewed side by side.</p>
            <Link href="/guides/video-production-rfp-template-miami" className="mt-5 inline-flex text-sm font-medium text-[#9f3c27] underline underline-offset-4 hover:text-[#6f2417]">Use the video-production RFP template</Link>
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container size="xl">
          <div className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-medium uppercase text-[#5a6066]">
                  Get Started
                </p>
                <h2 className="mt-3 font-serif text-4xl">
                  Need executive video content in Brickell?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#252a2d]">
                  Email or call to outline your corporate scope.
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
        faqs={PORTED_SERVICE_FAQS["/services/corporate-video-production-brickell"]}
        sectionId="ported-faq"
      />
      <ServiceRelated
        heading="Related services nearby."
        services={serviceSiblings("/services/corporate-video-production-brickell")}
        sectionId="sibling-services"
      />
      <NicheAnswers path="/services/corporate-video-production-brickell" fact={String(metadata.description ?? "")} />
    </main>
  );
}
