import Link from "next/link";
import { ServiceInquiryLink } from "@/components/service-inquiry-link";
import RailFaq from "@/vendor/rail-kit/RailFaq";
import { renderFormattedText } from "@/components/formatted-text";
import { ArrowRight, CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { KeepReading } from "@/components/keep-reading";
import { whatsappHref } from "@/lib/packages";
import { PACKAGE_PRICES, usd } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";
import { isConsolidatedPath } from "@/lib/consolidation";

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
  /**
   * The same Spanish copy with its accents. The unaccented "es" strings above
   * are pinned by the text-parity baseline on the routes that already render
   * them, so new pages opt in here and the existing routes migrate in their
   * own change.
   */
  esAccented: {
    eyebrow: "Pedir cotización",
    heading: "Envía el proyecto en un solo mensaje útil.",
    lead:
      "Incluye el servicio, la meta, los archivos disponibles, la fecha y dónde se va a publicar. Así Esteban puede responder con un siguiente paso claro sin alargar la conversación.",
    copyLabel: "Copia esto",
    message: (service: ServiceInquiry) =>
      `Hola Esteban, necesito ayuda con ${service.serviceName}. Meta: ${service.goalPrompt}. Tengo ${service.assetPrompt}. ¿Me puedes cotizar esto?`,
    mailSubject: (service: ServiceInquiry) => `Cotización para ${service.serviceName}`,
    mailBodySuffix: "Nombre:\nNegocio:\nFecha:\nMejor número para llamar:",
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
 * WebPage + BreadcrumbList nodes for an English /services/* page.
 *
 * 49 sitemapped service pages showed a visible "Home / Services / <page>"
 * trail with no BreadcrumbList and no WebPage node (SEO/GEO audit 2026-10-10,
 * fix 3). `crumb` must be the label the visible trail shows, so the schema
 * mirrors the page rather than restating it.
 */
export function buildServicePageNodes({
  path,
  name,
  description,
  crumb,
}: {
  path: string;
  name: string;
  description: string;
  crumb: string;
}) {
  const pageUrl = absoluteUrl(path);
  return [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name,
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": absoluteUrl("/#website") },
      breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
      mainEntity: { "@id": `${pageUrl}#service` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
        { "@type": "ListItem", position: 3, name: crumb, item: pageUrl },
      ],
    },
  ] as const;
}

function packageFrom(id: "arranque" | "presencia-local"): string {
  const price = PACKAGE_PRICES[id];
  return price.kind === "from" ? usd(price.amount) : "";
}

const answerFirstCopy = {
  en: {
    eyebrow: "In short",
    question: (service: string) => `How does ${service} with Esteban Moreno Media work?`,
    answer: (service: string) => isPhotographyService(service)
      ? `Esteban Moreno Media is based in Fort Lauderdale and serves businesses across Broward and Miami-Dade. For a real photo shoot, describe the products or people, location, number of images and intended use; Esteban scopes the photography and sends a written quote. For AI-assisted images, send accurate original photos and identify which backgrounds or settings may change. The two services have different deliverables, and any on-location photography is scoped per project. Communication is Spanish-first, with intermediate English available.`
      :
      `Esteban Moreno Media is a Fort Lauderdale-based service-area business run by Esteban Moreno, working with businesses across Broward and Miami-Dade. Projects can start remotely: you share footage, photos or references online and Esteban edits them, with no visit needed. On-location filming or photography is available as a paid service, scoped and quoted per project. Communication is Spanish-first, with intermediate English available. Remote editing starts from ${packageFrom("arranque")} per video (Starter package) and on-location production days start from ${packageFrom("presencia-local")} (Local Presence package); every project gets a written quote.`,
  },
  es: {
    eyebrow: "En corto",
    question: (service: string) => `¿Cómo funciona el servicio de ${service} con Esteban Moreno Media?`,
    answer: (service: string) => isPhotographyService(service)
      ? `Esteban Moreno Media tiene base en Fort Lauderdale y atiende negocios en Broward y Miami-Dade. Para una sesión de fotos reales, indica los productos o personas, la ubicación, la cantidad de imágenes y su uso; Esteban define el alcance y envía una cotización por escrito. Para imágenes asistidas con IA, comparte fotos originales fieles al producto e indica qué fondos o ambientes pueden cambiar. Son servicios con entregables distintos, y la fotografía en locación se cotiza por proyecto. La atención es en español primero, con inglés intermedio disponible.`
      :
      `Esteban Moreno Media es un negocio de servicio con base en Fort Lauderdale, dirigido por Esteban Moreno, que trabaja con negocios en Broward y Miami-Dade. Los proyectos pueden empezar en remoto: compartes el material, las fotos o las referencias en línea y Esteban los edita, sin necesidad de visita. La grabación o la fotografía en locación está disponible como servicio pagado, con alcance y cotización por proyecto. La atención es en español primero, con inglés intermedio disponible. La edición remota parte desde ${packageFrom("arranque")} por video (paquete Arranque) y los días de producción en locación desde ${packageFrom("presencia-local")} (paquete Presencia Local); cada proyecto recibe una cotización por escrito.`,
  },
} as const;

function isPhotographyService(service: string): boolean {
  return /photograph|headshot|portrait|fotograf|fotógraf|retrato|fotos? con ia|imágenes? con ia/i.test(service);
}

/**
 * The answer-first question is built from the page's SEO keyword, which read
 * as keyword soup in a sentence (loop round 6, 2026-10-14, live crawl of 362
 * pages): "¿Cómo funciona el servicio de editor de reels Fort Lauderdale…?",
 * "servicio de servicio de edición de video con dron", "How does content
 * repurposing service with…". These turn the keyword into the noun phrase a
 * person would say. Only the visible question changes; the keyword, the answer
 * and the photography check still read the original string.
 */
const ES_TRAILING_CITY = /\s+(Fort Lauderdale|Miami|Boca Raton)$/;

export function esServicePhrase(keyword: string): string {
  let phrase = keyword.trim().replace(/^servicio de\s+/i, "");
  phrase = phrase.replace(/^editor de (video|reels)\b/i, (_, what: string) => `edición de ${what}`);
  phrase = phrase.replace(/\breels\b/g, "Reels");
  if (!/\ben\b/.test(phrase)) phrase = phrase.replace(ES_TRAILING_CITY, " en $1");
  return phrase;
}

export function enServicePhrase(service: string): string {
  return service.trim().replace(/\s+service$/i, "");
}

/** Lower-case the first letter unless the word is an acronym or brand (TikTok, UGC). */
function inSentence(phrase: string): string {
  return /^[A-Z][a-z]/.test(phrase) && !/^(TikTok|YouTube|Reels|Instagram)\b/.test(phrase)
    ? phrase.charAt(0).toLowerCase() + phrase.slice(1)
    : phrase;
}

/**
 * Answer-first block: one question H2 and a 60-120-word answer near the top.
 *
 * SEO/GEO audit 2026-10-10, fix 9: most service pages opened without a direct
 * answer, so an answer engine had to assemble who/what/where/price from the
 * whole page. Every sentence here is an already-published fact (base, markets,
 * languages, the remote/on-location split the owner confirmed on 2026-10-10)
 * and video prices come from PACKAGE_PRICES. Photography has its own scoped
 * answer so video package prices are never presented as photo rates.
 */
export function ServiceAnswerFirst({
  service,
  locale = "en",
  sectionId = "answer-first",
}: {
  service: string;
  locale?: "en" | "es";
  sectionId?: string;
}) {
  const copy = answerFirstCopy[locale];
  return (
    <section
      className="border-b border-[#ddd4c8] py-10 sm:py-12"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{copy.eyebrow}</p>
        <h2 id={`${sectionId}-heading`} className="mt-3 max-w-3xl font-serif text-3xl sm:text-4xl">
          {copy.question(locale === "es" ? esServicePhrase(inSentence(service)) : enServicePhrase(inSentence(service)))}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">{copy.answer(service)}</p>
      </Container>
    </section>
  );
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

/**
 * Related cards minus any that point at a consolidated (noindexed or merged)
 * page: an indexable page never links into one (SEO/GEO audit 2026-10-10,
 * fix 5). Applied inside ServiceRelated so new pages inherit it.
 */
export function linkableRelated(services: readonly RelatedService[]): RelatedService[] {
  return services.filter(
    (service) => !isConsolidatedPath(service.href.replace(/[#?].*$/, "").replace(/\/$/, "")),
  );
}

/** Sibling services, so a page that does not fit the visitor still leads somewhere. */
export function ServiceRelated({
  heading,
  services,
  sectionId = "related-services",
  linkLabel = "Read more",
}: {
  heading: string;
  services: readonly RelatedService[];
  sectionId?: string;
  /** Card call to action; Spanish pages pass their own. */
  linkLabel?: string;
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
          {linkableRelated(services).map((service) => (
            <Link
              key={service.href}
              href={service.href}
              data-cta={`related-service-${service.href.split("/").pop()}`}
              className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6 hover:border-[#101214]"
            >
              <h3 className="font-serif text-2xl">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#252a2d]">{service.detail}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">
                {linkLabel}
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
  eyebrow = "Before you send footage",
}: {
  heading: string;
  faqs: readonly ServiceFaq[];
  sectionId?: string;
  collapsible?: boolean;
  /** Small label above the heading; Spanish pages pass their own. */
  eyebrow?: string;
}) {
  return (
    <section
      className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16"
      aria-labelledby={`${sectionId}-heading`}
      data-section={sectionId}
    >
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
          {eyebrow}
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
  // Accented Spanish everywhere since loop round 3: 25 routes still printed
  // "Envia el proyecto en un mensaje util." without its accents.
  accentedSpanish = true,
}: {
  service: ServiceInquiry;
  sectionId?: string;
  locale?: ServiceInquiryLocale;
  trackInterest?: boolean;
  /** Spanish copy with accents; see inquiryCopy.esAccented. */
  accentedSpanish?: boolean;
}) {
  const t = locale === "es" && accentedSpanish ? inquiryCopy.esAccented : inquiryCopy[locale];
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
