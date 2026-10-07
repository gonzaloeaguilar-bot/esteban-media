import Link from "next/link";
import { ServiceInquiryLink } from "@/components/service-inquiry-link";
import RailFaq from "@/vendor/rail-kit/RailFaq";
import { renderFormattedText } from "@/components/formatted-text";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { KeepReading } from "@/components/keep-reading";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

/**
 * The depth a service page needs to earn anything — as shared components.
 *
 * MEASURED, 2026-09-30. Of 50 sitemapped /services pages, 7 earn impressions and
 * 43 earn zero. Stripping the site chrome (the shingles /contact, /about and
 * /pricing all share, so a shared header cannot be mistaken for shared content)
 * and comparing BODIES:
 *
 *   group          median unique body   body-only overlap
 *   7 earning              3,210             13.1%
 *   33 niche-dead          1,094             38.4%
 *   10 geo-dead            2,193             58.9%
 *
 * The earners are not "less duplicated" — they carry THREE TIMES the unique body
 * content. The dead niche pages are thin, not merely templated, so the fix is to
 * ADD vertical-specific substance rather than to fold or delete anything.
 *
 * (A first pass measured 61% vs 85% on whole pages and read it as
 * differentiation. Two UNRELATED pages — /contact and /about — overlap 62.3% on
 * chrome alone, so that comparison was measuring the navigation. Strip the chrome
 * or the number means nothing.)
 *
 * Comparing the structures, the earning pages have three things the dead ones do
 * not: vertical-specific craft cards, links to sibling services, and a FAQ whose
 * headings are questions. That is also exactly what the dual-audience rule asks
 * for — 100-180-word sections under a question-shaped heading, each carrying one
 * real fact, in the server-rendered HTML.
 *
 * Those pages hand-roll all of it, ~400 lines each. This is the same shape as
 * shared components, so the next page gets the depth without another 200 lines of
 * copy-pasted markup.
 *
 * Every section carries `data-section`, so `public/track.js` attributes
 * `section_view` and any `cta_click` inside it without a hand-written event.
 */

export type ServiceFaq = { question: string; answer: string };
export type CraftCard = { title: string; detail: string };
export type RelatedService = { title: string; detail: string; href: string };
export type ServiceInquiry = {
  serviceId: string;
  serviceName: string;
  goalPrompt: string;
  assetPrompt: string;
  proofHref: string;
  proofLabel: string;
};

type ServiceInquiryLocale = "en" | "es";

const inquiryCopy = {
  en: {
    eyebrow: "Ask for a quote",
    heading: "Send the project in one useful message.",
    lead:
      "Start with the service, goal, assets, deadline, and where the work will be published. That gives Esteban enough context to answer with a useful next step instead of a long back-and-forth.",
    copyLabel: "Copy this",
    message: (service: ServiceInquiry) =>
      `Hi Esteban, I need help with ${service.serviceName}. Goal: ${service.goalPrompt}. I have ${service.assetPrompt}. Can you quote this?`,
    mailSubject: (service: ServiceInquiry) => `${service.serviceName} project inquiry`,
    mailBodySuffix: "Name:\nBusiness:\nDeadline:\nBest callback number:",
    phoneLabel: "Call",
  },
  es: {
    eyebrow: "Pedir cotizacion",
    heading: "Envia el proyecto en un mensaje util.",
    lead:
      "Incluye el servicio, la meta, los archivos disponibles, la fecha y donde se va a publicar. Asi Esteban puede responder con un siguiente paso claro sin alargar la ida y vuelta.",
    copyLabel: "Copia esto",
    message: (service: ServiceInquiry) =>
      `Hola Esteban, necesito ayuda con ${service.serviceName}. Meta: ${service.goalPrompt}. Tengo ${service.assetPrompt}. Me puedes cotizar esto?`,
    mailSubject: (service: ServiceInquiry) => `Cotizacion para ${service.serviceName}`,
    mailBodySuffix: "Nombre:\nNegocio:\nFecha:\nMejor numero para llamar:",
    phoneLabel: "Llamar",
  },
} as const;

/**
 * Build the FAQPage node for a page's JSON-LD `@graph`.
 *
 * Kept next to the component that renders the questions so the two cannot drift:
 * a FAQPage claiming questions the page does not show is structured data that
 * misrepresents the page.
 */
export function buildServiceFaqSchema(pageUrl: string, faqs: readonly ServiceFaq[]) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/**
 * Three craft specifics. What this vertical's footage actually demands.
 *
 * Three, not a long list: the earning pages all use three, and a card that says
 * something true about THIS vertical is the unit of differentiation being added.
 */
export function ServiceCraft({
  heading,
  cards,
  sectionId,
}: {
  heading: string;
  cards: readonly CraftCard[];
  sectionId: string;
}) {
  return (
    <section
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <h2 id={`${sectionId}-heading`} className="max-w-3xl font-serif text-3xl sm:text-4xl">
          {heading}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6">
              <CheckCircle2 className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-2xl">{card.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">{card.detail}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Sibling services, so a page that does not fit the visitor still leads somewhere. */
export function ServiceRelated({
  heading,
  services,
  sectionId = "related-services",
}: {
  heading: string;
  services: readonly RelatedService[];
  sectionId?: string;
}) {
  return (
    <section
      className="border-b border-[#ddd4c8] py-12 sm:py-16"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <h2 id={`${sectionId}-heading`} className="max-w-3xl font-serif text-3xl sm:text-4xl">
          {heading}
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              data-cta={`related-service-${service.href.split("/").pop()}`}
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 hover:border-[#101214]"
            >
              <h3 className="font-serif text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">{service.detail}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">
                Read more
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/**
 * The questions, with their answers in the served HTML.
 *
 * NOT a `<details>` fold here. The reading-path fold-out is for depth that only
 * supports reading on a page that is already too long; these pages are the
 * opposite problem — 1,094 unique shingles against the earners' 3,210. Hiding the
 * new depth behind a click on a thin page would be adding words to the DOM while
 * still showing the visitor nothing.
 */
export function ServiceFaqs({
  heading,
  faqs,
  sectionId = "service-faq",
  collapsible = false,
}: {
  heading: string;
  faqs: readonly ServiceFaq[];
  sectionId?: string;
  collapsible?: boolean;
}) {
  return (
    <section
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
          Before you send footage
        </p>
        <h2 id={`${sectionId}-heading`} className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
          {heading}
        </h2>
        {collapsible ? (
          <RailFaq
            className="mt-8"
            source={sectionId}
            items={faqs.map((faq, index) => ({ id: `${sectionId}-${index}`, ...faq }))}
          />
        ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <article key={faq.question} className="rounded-lg border border-[#ddd4c8] bg-[#f6f1ea] p-5">
              <h3 className="font-serif text-2xl">{faq.question}</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">{faq.answer}</p>
            </article>
          ))}
        </div>
        )}
      </Container>
    </section>
  );
}

/**
 * A service-page inquiry block with analytics out of the box.
 *
 * The shared click layer already records `mailto:`, `tel:`, and every
 * `data-cta`. This component gives future service pages a consistent way to
 * pass service context into WhatsApp/email links without duplicating tracking
 * code or asking a prospect to invent the first message from scratch.
 */
export function ServiceInquiryRail({
  service,
  sectionId = "service-inquiry",
  trackInterest = false,
  locale = "en",
}: {
  service: ServiceInquiry;
  sectionId?: string;
  locale?: ServiceInquiryLocale;
  trackInterest?: boolean;
}) {
  const t = inquiryCopy[locale];
  const message = t.message(service);
  const mailSubject = t.mailSubject(service);
  const mailBody = `${message}\n\n${t.mailBodySuffix}`;

  return (
    <section
      id={sectionId}
      className="border-b border-[#ddd4c8] bg-[#101214] py-12 text-[#f6f1ea] sm:py-16"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <div className="grid gap-8 lg:grid-cols-[1fr_.92fr] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#f0b384]">
              {t.eyebrow}
            </p>
            <h2 id={`${sectionId}-heading`} className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
              {t.heading}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#eadfd3]">
              {t.lead}
            </p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#f0b384]">
              {t.copyLabel}
            </p>
            <p className="mt-4 rounded-lg border border-white/12 bg-black/20 p-4 text-sm leading-6 text-white">
              {message}
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <ServiceInquiryLink
                serviceId={trackInterest ? service.serviceId : undefined}
                locale={locale}
                href={whatsappHref(site.phone.e164, message)}
                target="_blank"
                rel="noopener noreferrer"
                data-cta={`service_${service.serviceId}_whatsapp`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f6f1ea] px-4 text-sm font-medium text-[#101214] hover:bg-white"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp
              </ServiceInquiryLink>
              <ServiceInquiryLink
                serviceId={trackInterest ? service.serviceId : undefined}
                locale={locale}
                href={`mailto:${site.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`}
                data-cta={`service_${service.serviceId}_email`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-4 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email
              </ServiceInquiryLink>
              <ServiceInquiryLink
                serviceId={trackInterest ? service.serviceId : undefined}
                locale={locale}
                href={site.phone.href}
                data-cta={`service_${service.serviceId}_phone`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-4 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                <Phone className="size-4" aria-hidden="true" />
                {t.phoneLabel}
              </ServiceInquiryLink>
            </div>
            <Link
              href={service.proofHref}
              data-cta={`service_${service.serviceId}_proof`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#f0b384] underline decoration-[#f0b384]/60 underline-offset-4"
            >
              {service.proofLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export type DeepDiveSection = {
  /** Question-shaped, because that is the unit an answer engine quotes. */
  heading: string;
  paragraphs: readonly string[];
};

/**
 * The depth that only supports READING, behind one native <details>.
 *
 * Why a fold here and not around the craft/FAQ sections above: everything a
 * visitor needs in order to ACT stays visible, and this block is the second
 * reading — the preparation detail somebody wants once they have already decided
 * the page is about them.
 *
 * Why <details> and not a conditional render: COLLAPSED IS NOT REMOVED. The
 * paragraphs are in the server-rendered HTML either way, which is the only
 * reason this is allowed to be a fold at all — GPTBot, ClaudeBot and
 * PerplexityBot run no JavaScript, so a client-mounted panel does not exist for
 * them, while Google gives collapsed HTML full weight.
 */
export function ServiceDeepDive({
  id,
  title,
  destinations,
  sections,
}: {
  id: string;
  title: string;
  destinations: string;
  sections: readonly DeepDiveSection[];
}) {
  return (
    <section className="border-b border-[#ddd4c8] py-12 sm:py-16" data-section={`${id}-wrap`}>
      <Container size="xl">
        <KeepReading className="em-reading-paper" id={id} title={title} destinations={destinations}>
          <div className="mx-auto mt-8 max-w-3xl space-y-10">
            {sections.map((section) => (
              <article key={section.heading} className="space-y-4">
                <h3 className="font-serif text-2xl sm:text-3xl">{section.heading}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-[#252a2d]">
                    {renderFormattedText(paragraph)}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </KeepReading>
      </Container>
    </section>
  );
}
