import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, MapPin } from "lucide-react";

import { PriceSheet } from "@/components/price-sheet";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceAnswerFirst,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
  buildServicePageNodes,
  type CraftCard,
  type RelatedService,
  type ServiceFaq,
  type ServiceInquiry,
} from "@/components/service-depth";
import { Container } from "@/components/ui/container";
import { absoluteUrl } from "@/lib/site";
import { PACKAGE_PRICES, REAL_ESTATE_PLANS, usd } from "@/lib/pricing";
import { NicheAnswers } from "@/components/niche-answers";
import { OwnerFactAnswers } from "@/components/owner-fact-answers";
import { PriorityLinks } from "@/components/priority-links";
import { PublishedProjectProof, resolvePublishedProjectProof } from "@/components/published-project-proof";
import { withNicheService } from "@/lib/niche-answers";

export type GeoServicePageContent = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  locationLabel: string;
  proofTitle: string;
  proofText: string;
  proofHref: string;
  proofLabel: string;
  primaryCta: string;
  secondaryHref: string;
  secondaryLabel: string;
  serviceName: string;
  serviceDescription: string;
  serviceType: string;
  areaServed: string;
  craftHeading: string;
  /** H2 over the depth section; must differ from craftHeading (no duplicate H2s). */
  depthHeading?: string;
  /** Noun phrase for the answer-first question; defaults to serviceType. */
  answerService?: string;
  /**
   * H2 over the price sheet. Round 6 (2026-10-14): the old default lower-cased
   * the SEO name into "How much does reels editor fort lauderdale cost?" on all
   * five pages, the flagship included. Write the buyer's sentence instead.
   */
  pricingQuestion: string;
  craft: readonly CraftCard[];
  /**
   * Citable depth: 100-180 words under a question-shaped heading.
   *
   * The craft cards above are ~50 words each, which reads fine and is too thin
   * to be a citable unit — measured 2026-10-06 with scripts/dual-audience-gate.mjs,
   * every English service page scored ZERO sections in the 100-180 band while
   * the Spanish equivalents scored three. Optional, so a page without published
   * source material stays honest rather than padded.
   */
  depth?: readonly { question: string; body: string }[];
  faqHeading: string;
  faqs: readonly ServiceFaq[];
  relatedHeading: string;
  related: readonly RelatedService[];
  inquiry: ServiceInquiry;
};

export function buildGeoServiceSchema(content: GeoServicePageContent) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildServiceFaqSchema(absoluteUrl(content.path), content.faqs),
      ...buildServicePageNodes({
        path: content.path,
        name: content.serviceName,
        description: content.serviceDescription,
        crumb: content.serviceName,
      }),
      {
        "@type": "Service",
        "@id": absoluteUrl(`${content.path}#service`),
        name: content.serviceName,
        description: content.serviceDescription,
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: content.areaServed,
        serviceType: content.serviceType,
      },
    ],
  };
}

export function GeoServicePage({
  content,
  showcase,
}: {
  content: GeoServicePageContent;
  /**
   * Optional proof strip rendered under the scope section, above the FAQ.
   *
   * Additive and opt-in: a page that does not pass a showcase renders exactly
   * what it rendered before. Used here for the real-estate reel shelf, which
   * belongs beside the craft copy it demonstrates rather than as a bolt-on
   * after the page has already asked the visitor to leave.
   */
  showcase?: ReactNode;
}) {
  const isRealEstate = content.path.includes("real-estate");
  const video = PACKAGE_PRICES.arranque;
  const startingVideo = video.kind === "from" ? video.amount : 0;
  const startingPlan = Math.min(...REAL_ESTATE_PLANS.map((plan) => plan.price));
  const jsonLd = withNicheService(content.path, buildGeoServiceSchema(content), content.serviceName);
  const publishedProof = resolvePublishedProjectProof({
    href: content.proofHref,
    title: content.proofTitle,
    description: content.proofText,
    eyebrow: "Published project",
    linkLabel: content.proofLabel,
  });

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-[#ddd4c8] py-8 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label="Breadcrumbs" className="mb-5 sm:mb-8 text-sm text-[#5a6066]">
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
                {content.serviceName}
              </li>
            </ol>
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1fr_.76fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                {content.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                {content.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
                {content.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  data-cta={`geo_service_contact_${content.path.split("/").pop()}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
                >
                  {content.primaryCta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href={content.secondaryHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
                >
                  {content.secondaryLabel}
                </Link>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#252a2d]" data-section="service-price-line">
                <span className="font-medium">
                  From {usd(startingVideo)} per video
                  {isRealEstate ? `, monthly plans from ${usd(startingPlan)}` : ""}.
                </span>{" "}
                <a
                  href="#service-pricing"
                  className="inline-flex min-h-11 items-center font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
                >
                  All starting prices
                </a>
              </p>
            </div>

            {publishedProof ? (
              <PublishedProjectProof proof={publishedProof} />
            ) : (
              <aside className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <MapPin className="size-8 text-[#e85d3e]" aria-hidden="true" />
                <h2 className="mt-5 font-serif text-3xl">{content.proofTitle}</h2>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {content.proofText}
                </p>
                <Link
                  href={content.proofHref}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[var(--em-accent-ink)]"
                >
                  {content.proofLabel}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </aside>
            )}
          </div>
        </Container>
      </section>

      <section className="scroll-mt-24 border-b border-[#ddd4c8] py-8" id="service-pricing" data-section="service-pricing">
        <Container size="xl">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-serif text-2xl sm:text-3xl">
              {content.pricingQuestion}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#252a2d]">
              Starting prices for every package, read from the same figures
              published on the pricing page. Final cost is always a scoped
              quote.
            </p>
            <div className="mt-4">
              <PriceSheet
                locale="en"
                showPlans={content.path.includes("real-estate")}
                section="geo_service_page"
              />
            </div>
          </div>
        </Container>
      </section>

      <ServiceAnswerFirst service={content.answerService ?? content.serviceType} />
      <OwnerFactAnswers path={content.path} />

      <ServiceCraft
        heading={content.craftHeading}
        cards={content.craft}
        sectionId={`${content.path.split("/").pop()}-craft`}
      />
      {content.depth && content.depth.length > 0 ? (
        <section
          className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20"
          data-section="service-depth"
        >
          <Container size="xl">
            <div className="mx-auto max-w-4xl space-y-10">
              <div className="border-b border-[#ddd4c8] pb-6">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                  Scope and technical criteria
                </p>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                  {content.depthHeading ?? `${content.serviceName}: questions to settle first.`}
                </h2>
              </div>
              {content.depth.map((entry) => (
                <article key={entry.question} className="space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl">{entry.question}</h3>
                  <p className="text-base leading-8 text-[#252a2d]">{entry.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {showcase}

      <ServiceFaqs heading={content.faqHeading} faqs={content.faqs} />
      <ServiceInquiryRail service={content.inquiry} />
      <ServiceRelated heading={content.relatedHeading} services={content.related} />
      <NicheAnswers path={content.path} fact={content.description} />
      <PriorityLinks path={content.path} locale="en" />
    </main>
  );
}
