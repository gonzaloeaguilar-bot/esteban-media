import Link from "next/link";
import { ArrowRight, MessageCircle, Star } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  ServiceDeepDive,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { WebsiteProjectIntake } from "@/components/website-project-intake";
import { googleReviews, reviewSourceLabel, reviewSourceUrl } from "@/lib/client-reviews";
import { whatsappHref } from "@/lib/packages";
import { CHATBOT_PRICE, LANDING_PAGE_PRICE, chatbotPriceText, landingPagePriceText } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";
import { buildPageMetadata } from "@/lib/site-metadata";
import { getWebAiPage, type WebAiPageId, type WebAiLocale, type WebAiServicePage } from "@/lib/web-ai-services";

/**
 * Chatbot and landing-page service pages (EN + ES). Content and fact rules live
 * in lib/web-ai-services.ts; this file only lays it out.
 *
 * Dual-audience shape: the answer is the first paragraph under the H1; each
 * question section is 100-180 words with one real fact; the depth sits in a
 * native <details> (ServiceDeepDive) that is in the server HTML either way.
 * The FAQPage node is built from the SAME `sections` the page renders, so the
 * schema can never claim a question the page does not show.
 */


export function sectionFaqs(page: WebAiServicePage) {
  return page.sections.map((section) => ({
    question: section.question,
    answer: section.paragraphs.join(" "),
  }));
}

export function buildWebAiMetadata(id: WebAiPageId, locale: WebAiLocale) {
  const page = getWebAiPage(id, locale);
  return buildPageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    locale,
  });
}

/**
 * WebPage + BreadcrumbList for the page. English pages pass the shared
 * buildServicePageNodes() output (the same nodes every English service page
 * emits); Spanish pages get the equivalent with inLanguage es-US.
 */
export function WebAiServicePageView({
  id,
  locale,
  pageNodes,
}: {
  id: WebAiPageId;
  locale: WebAiLocale;
  pageNodes?: readonly object[];
}) {
  const page = getWebAiPage(id, locale);
  const es = locale === "es";
  const homeHref = es ? "/es" : "/";
  const review = googleReviews.find((r) => r.portfolioId === "flas-concierge");
  const prefix = `webai-${id}`;
  const intakeId = `${prefix}-intake`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl(`${page.path}#service`),
        name: page.service.name,
        description: page.service.description,
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Fort Lauderdale / Broward County / Miami-Dade / Remote",
        availableLanguage: ["Spanish", "English"],
        serviceType: page.service.serviceType,
        url: absoluteUrl(page.path),
        // Landing pages only: the owner price in lib/pricing.ts, shown in the
        // visible cost answer. Chatbots have no published price, so no Offer.
        // Both prices come from lib/pricing.ts and match the visible cost
        // answer. The chatbot monthly fee has no published amount, so the
        // Offer carries only the setup minimum and says so in its description.
        offers: {
          "@type": "Offer",
          priceCurrency: (id === "landing" ? LANDING_PAGE_PRICE : CHATBOT_PRICE).currency,
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: (id === "landing" ? LANDING_PAGE_PRICE : CHATBOT_PRICE).from,
            priceCurrency: (id === "landing" ? LANDING_PAGE_PRICE : CHATBOT_PRICE).currency,
          },
          description: id === "landing" ? landingPagePriceText(locale) : chatbotPriceText(locale),
        },
      },
      buildServiceFaqSchema(absoluteUrl(page.path), sectionFaqs(page)),
      ...(pageNodes ?? [
        {
          "@type": "WebPage",
          "@id": absoluteUrl(`${page.path}#webpage`),
          url: absoluteUrl(page.path),
          name: page.metaTitle,
          description: page.metaDescription,
          inLanguage: es ? "es-US" : "en-US",
          isPartOf: { "@id": absoluteUrl("/#website") },
          breadcrumb: { "@id": absoluteUrl(`${page.path}#breadcrumbs`) },
          mainEntity: { "@id": absoluteUrl(`${page.path}#service`) },
        },
        {
          "@type": "BreadcrumbList",
          "@id": absoluteUrl(`${page.path}#breadcrumbs`),
          itemListElement: [
            { "@type": "ListItem", position: 1, name: es ? "Inicio" : "Home", item: absoluteUrl(homeHref) },
            { "@type": "ListItem", position: 2, name: page.servicesLabel, item: absoluteUrl(page.servicesHref) },
            { "@type": "ListItem", position: 3, name: page.crumb, item: absoluteUrl(page.path) },
          ],
        },
      ]),
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]" lang={es ? "es" : "en"}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20" data-section={`${prefix}-hero`}>
        <Container size="xl">
          <nav aria-label={es ? "Ruta de navegación" : "Breadcrumbs"} className="em-crumbs mb-8 text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href={homeHref} className="hover:text-[#9f3c27]">{es ? "Inicio" : "Home"}</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={page.servicesHref} className="hover:text-[#9f3c27]">{page.servicesLabel}</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#252a2d]">{page.crumb}</li>
            </ol>
          </nav>
          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase text-[#5a6066]">{page.eyebrow}</p>
            <h1 className="mt-4 font-serif em-display">{page.h1}</h1>
            <div className="mt-6 flex flex-wrap gap-3" data-em-hero-actions>
              <a
                href={whatsappHref(site.phone.e164, page.inquiry.serviceName ? (es ? `Hola Esteban, quiero una cotización para ${page.inquiry.serviceName}.` : `Hi Esteban, I'd like a quote for ${page.inquiry.serviceName}.`) : "")}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`${prefix}_hero_whatsapp`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {page.primaryCta}
              </a>
              <Link
                href={`#${prefix}-projects`}
                data-cta={`${prefix}_hero_projects`}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#101214] px-6 text-sm font-medium hover:bg-[#101214] hover:text-[#f6f1ea]"
              >
                {page.secondaryCta}
              </Link>
            </div>
            <p className="mt-6 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8 text-[#252a2d]" data-answer-first>{page.answer}</p>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">{page.heroNote}</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16" data-section={`${prefix}-answers`} aria-labelledby={`${prefix}-answers-heading`}>
        <Container size="xl">
          <p id={`${prefix}-answers-heading`} className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{page.sectionsEyebrow}</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            {page.sections.map((section) => (
              <article key={section.id} id={section.id} className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6" data-section={`${prefix}-${section.id}`}>
                <h2 className="font-serif text-3xl leading-tight">{section.question}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-4 text-base leading-7 text-[#252a2d]">{paragraph}</p>
                ))}
                {section.links?.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cta={`${prefix}_${section.id}_link`}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
                  >
                    {link.label}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                ))}
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id={`${prefix}-projects`} className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16" data-section={`${prefix}-projects`} aria-labelledby={`${prefix}-projects-heading`}>
        <Container size="xl">
          <h2 id={`${prefix}-projects-heading`} className="font-serif text-4xl leading-tight">{page.projectsHeading}</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#5a6066]">{page.projectsLead}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.projects.map((project) => (
              <li key={project.href}>
                <Link
                  href={project.href}
                  data-cta={`${prefix}_project_${project.href.split("/").pop()}`}
                  className="flex h-full flex-col rounded-lg border border-[#ddd4c8] bg-[#f6f1ea] p-5 hover:border-[#9f3c27]"
                >
                  <span className="font-serif text-xl leading-snug">{project.title}</span>
                  <span className="mt-2 text-sm leading-6 text-[#252a2d]">{project.fact}</span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-[#9f3c27]">
                    {es ? "Ver el proyecto" : "View the project"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {review ? (
            <figure className="mt-10 max-w-3xl rounded-lg border border-[#ddd4c8] bg-[#f6f1ea] p-6" data-section={`${prefix}-review`}>
              <p className="flex items-center gap-1 text-[#9f3c27]" aria-label={es ? `${review.rating} de 5 estrellas` : `${review.rating} out of 5 stars`}>
                {Array.from({ length: review.rating }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </p>
              <blockquote className="mt-3 font-serif text-2xl leading-snug" lang="en">&ldquo;{review.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm leading-6 text-[#5a6066]">
                {page.reviewLabel}: {review.author}.{" "}
                <a href={reviewSourceUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-[#9f3c27] underline underline-offset-4">
                  {reviewSourceLabel[locale]}
                </a>
              </figcaption>
            </figure>
          ) : null}
        </Container>
      </section>

      <ServiceDeepDive id={page.deepDive.id} title={page.deepDive.title} destinations={page.deepDive.destinations} sections={page.deepDive.sections} />

      <section id={intakeId} className="border-b border-[#ddd4c8] py-12 sm:py-16" data-section={intakeId} aria-labelledby={`${intakeId}-heading`}>
        <Container size="default">
          <h2 id={`${intakeId}-heading`} className="font-serif text-4xl leading-tight">{page.intakeHeading}</h2>
          <p className="mt-3 text-base leading-7 text-[#252a2d]">{page.intakeLead}</p>
          <WebsiteProjectIntake locale={locale} source={id === "chatbot" ? "chatbot-intake" : "landing-page-intake"} />
        </Container>
      </section>

      <ServiceInquiryRail service={page.inquiry} sectionId={`${prefix}-inquiry`} locale={locale} relationship="digital" accentedSpanish trackInterest />
      <ServiceRelated heading={page.relatedHeading} services={page.related} sectionId={`${prefix}-related`} />
    </main>
  );
}
