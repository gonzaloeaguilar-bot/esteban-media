import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";

import {
  ServiceCraft,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
  type CraftCard,
  type RelatedService,
  type ServiceFaq,
  type ServiceInquiry,
} from "@/components/service-depth";
import { Container } from "@/components/ui/container";
import { absoluteUrl, site } from "@/lib/site";

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
      {
        "@type": "Service",
        "@id": absoluteUrl(`${content.path}#service`),
        name: content.serviceName,
        description: content.serviceDescription,
        provider: {
          "@type": "LocalBusiness",
          "@id": absoluteUrl("/#business"),
          name: site.name,
          url: absoluteUrl("/"),
          telephone: site.phone.e164,
        },
        areaServed: content.areaServed,
        serviceType: content.serviceType,
      },
    ],
  };
}

export function GeoServicePage({ content }: { content: GeoServicePageContent }) {
  const jsonLd = buildGeoServiceSchema(content);

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
            </div>

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
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-10">
        <Container size="xl">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "You can see the service, city, and next step without hunting.",
              "Common questions are answered on the page before you reach out.",
              "The quote message asks for the details Esteban needs to respond clearly.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#e85d3e]" aria-hidden="true" />
                <p className="text-sm leading-6 text-[#252a2d]">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

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
                  {content.craftHeading}
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

      <ServiceFaqs heading={content.faqHeading} faqs={content.faqs} />
      <ServiceInquiryRail service={content.inquiry} />
      <ServiceRelated heading={content.relatedHeading} services={content.related} />
    </main>
  );
}
