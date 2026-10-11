import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";

import { NumberedList } from "@/components/em-surface";
import { renderFormattedText } from "@/components/formatted-text";
import {
  ServiceCraft,
  ServiceFaqs,
  ServiceInquiryRail,
  ServiceRelated,
  buildServiceFaqSchema,
} from "@/components/service-depth";
import { Container } from "@/components/ui/container";
import { EVENTS_HUB_COPY, eventScopeSection, getEventPageCopy } from "@/lib/event-content";
import {
  EVENTS,
  EVENTS_HUB_PATHS,
  EVENT_CROSSLINKS,
  EVENT_SEASON_ORDER,
  affiliationLabel,
  displayEdition,
  formatDateRange,
  formatIsoDate,
  getEvent,
  type AnnualEvent,
  type EventId,
  type EventLocale,
} from "@/lib/events";
import { whatsappHref } from "@/lib/packages";
import { buildPageMetadata } from "@/lib/site-metadata";
import { absoluteUrl, site } from "@/lib/site";

/**
 * The shared renderer for the annual-events section: one hub and one page per
 * event, in both languages. Copy lives in lib/event-content.ts, dates in
 * lib/events.ts; the page files under app/ are thin wrappers.
 *
 * Schema: WebPage + Service + FAQPage + BreadcrumbList. Never `Event` — these
 * events are organized by other people, and marking a page up as an event it
 * does not run would misrepresent it.
 */

const UI = {
  en: {
    home: "Home",
    typical: "Typical window",
    listedYear: (year: string) => `Listed dates for ${year} (check the official site)`,
    noNext: "The next edition has not been listed yet. Check the official site.",
    listed: (checked: string) => `Dates last checked ${checked}. Confirm current dates on the official site before you plan around them.`,
    official: "Official event site",
    notAffiliated: (name: string) =>
      `Esteban Moreno Media is not affiliated with or endorsed by ${name}, or by the organizers. The event name is used only to describe timing; no event logos are used.`,
    hubNotAffiliated:
      "Esteban Moreno Media is not affiliated with or endorsed by any event listed here. Event names describe timing only; no event logos are used.",
    whatsapp: "Message on WhatsApp",
    quote: "Ask for a quote",
    whatsappText: (name: string) => `Hi Esteban, I want to plan social content around ${name}.`,
    proofHeading: "What published work can you see?",
    faqEyebrow: "Before the event",
    faqHeading: "Questions before you plan event content.",
    relatedHeading: "Related services and events.",
    linkLabel: "Read more",
    otherEvents: "Other annual events",
  },
  es: {
    home: "Inicio",
    typical: "Temporada habitual",
    listedYear: (year: string) => `Fechas publicadas para ${year} (confírmalas en el sitio oficial)`,
    noNext: "La próxima edición todavía no se ha publicado. Revisa el sitio oficial.",
    listed: (checked: string) => `Fechas revisadas el ${checked}. Confirma las fechas vigentes en el sitio oficial antes de planear alrededor de ellas.`,
    official: "Sitio oficial del evento",
    notAffiliated: (name: string) =>
      `Esteban Moreno Media no está afiliado a ${name} ni a sus organizadores, y no cuenta con su respaldo. El nombre del evento se usa solo para describir las fechas; no se usan logos del evento.`,
    hubNotAffiliated:
      "Esteban Moreno Media no está afiliado a ningún evento de esta lista ni cuenta con su respaldo. Los nombres solo describen las fechas; no se usan logos de los eventos.",
    whatsapp: "Escribir por WhatsApp",
    quote: "Pedir cotización",
    whatsappText: (name: string) => `Hola Esteban, quiero planificar contenido para redes alrededor de ${name}.`,
    proofHeading: "¿Qué trabajo publicado puedes ver?",
    faqEyebrow: "Antes del evento",
    faqHeading: "Preguntas antes de planificar contenido para un evento.",
    relatedHeading: "Servicios y eventos relacionados.",
    linkLabel: "Leer más",
    otherEvents: "Otros eventos del año",
  },
} as const;

const ctaId = (id: string) => id.replace(/-/g, "_");
/** A date range shown on its own line starts with a capital ("Del 28 de octubre…"). */
const shownRange = (start: string, end: string, locale: EventLocale) => {
  const range = formatDateRange(start, end, locale);
  return range.charAt(0).toUpperCase() + range.slice(1);
};

export function buildEventPageMetadata(id: EventId, locale: EventLocale) {
  const copy = getEventPageCopy(id, locale);
  return buildPageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: getEvent(id).paths[locale],
    locale,
  });
}

export function buildEventsHubMetadata(locale: EventLocale) {
  const copy = EVENTS_HUB_COPY[locale];
  return buildPageMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    path: EVENTS_HUB_PATHS[locale],
    locale,
  });
}

function breadcrumbSchema(path: string, locale: EventLocale, trail: { name: string; path: string }[]) {
  const home = locale === "es" ? "/es" : "/";
  return {
    "@type": "BreadcrumbList",
    "@id": absoluteUrl(`${path}#breadcrumbs`),
    itemListElement: [{ name: UI[locale].home, path: home }, ...trail].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function Crumbs({ locale, current }: { locale: EventLocale; current?: string }) {
  const hub = EVENTS_HUB_COPY[locale].breadcrumb;
  return (
    <nav aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"} className="em-crumbs mb-6 text-sm text-[#5a6066]">
      <Link href={locale === "es" ? "/es" : "/"}>{UI[locale].home}</Link> /{" "}
      {current ? (
        <>
          <Link href={EVENTS_HUB_PATHS[locale]}>{hub}</Link> / <span aria-current="page">{current}</span>
        </>
      ) : (
        <span aria-current="page">{hub}</span>
      )}
    </nav>
  );
}

function EventDates({ event, locale }: { event: AnnualEvent; locale: EventLocale }) {
  const t = UI[locale];
  const edition = displayEdition(event);
  return (
    <div className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6" data-section={`event-${event.id}-dates`}>
      <CalendarDays className="size-7 text-[#e85d3e]" aria-hidden="true" />
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[#9f3c27]">{t.typical}</p>
      <p className="mt-2 font-serif text-3xl leading-tight">{event.typicalWindow[locale]}</p>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-[#5a6066]">{edition ? t.listedYear(edition.start.slice(0, 4)) : t.noNext}</p>
      {edition ? (
        <>
          <p className="mt-2 text-base font-medium leading-7">
            {shownRange(edition.start, edition.end, locale)}
          </p>
          {edition.windows?.length ? (
            <ul className="mt-2 space-y-1 text-sm leading-6 text-[#252a2d]">
              {edition.windows.map((window) => (
                <li key={window.label.en}>
                  {window.label[locale]}: {formatDateRange(window.start, window.end, locale)}
                </li>
              ))}
            </ul>
          ) : null}
          {edition.where ? <p className="mt-2 text-sm leading-6 text-[#252a2d]">{edition.where[locale]}</p> : null}
          <p className="mt-3 text-xs leading-5 text-[#5a6066]">{t.listed(formatIsoDate(edition.lastChecked, locale))}</p>
        </>
      ) : null}
      <a
        href={event.officialSite}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={`event_${ctaId(event.id)}_official_site`}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline underline-offset-4"
      >
        {t.official}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function HeroActions({ locale, prefix, eventLabel, inquiryId }: { locale: EventLocale; prefix: string; eventLabel: string; inquiryId: string }) {
  const t = UI[locale];
  return (
    <div className="mt-6 flex flex-wrap gap-3" data-em-hero-actions>
      <a
        href={whatsappHref(site.phone.e164, t.whatsappText(eventLabel))}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={`${prefix}_hero_whatsapp`}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        {t.whatsapp}
      </a>
      <Link
        href={`#${inquiryId}`}
        data-cta={`${prefix}_hero_quote`}
        className="inline-flex min-h-12 items-center rounded-full border border-[#101214] px-6 text-sm font-medium"
      >
        {t.quote}
      </Link>
    </div>
  );
}

function ProseSection({
  id,
  heading,
  paragraphs,
  tone = "plain",
  children,
}: {
  id: string;
  heading: string;
  paragraphs: readonly string[];
  tone?: "plain" | "paper";
  children?: ReactNode;
}) {
  return (
    <section
      className={`border-b border-[#ddd4c8] py-12 sm:py-16 ${tone === "paper" ? "bg-[#fbf6ef]" : ""}`}
      aria-labelledby={`${id}-heading`}
      data-section={id}
    >
      <Container size="lg">
        <h2 id={`${id}-heading`} className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">
          {heading}
        </h2>
        <div className="mt-6 max-w-3xl space-y-4">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-[#252a2d]">
              {renderFormattedText(paragraph)}
            </p>
          ))}
        </div>
        {children}
      </Container>
    </section>
  );
}

export function EventContentPage({ id, locale }: { id: EventId; locale: EventLocale }) {
  const event = getEvent(id);
  const copy = getEventPageCopy(id, locale);
  const t = UI[locale];
  const path = event.paths[locale];
  const prefix = `event_${ctaId(id)}`;
  const inquiryId = `${prefix}-inquiry`.replace(/_/g, "-");
  const scope = eventScopeSection(locale);
  const others = EVENTS.filter((other) => other.id !== id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": absoluteUrl(`${path}#webpage`),
        url: absoluteUrl(path),
        name: copy.h1,
        description: copy.lead,
        inLanguage: locale === "es" ? "es-US" : "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        breadcrumb: { "@id": absoluteUrl(`${path}#breadcrumbs`) },
      },
      {
        "@type": "Service",
        "@id": absoluteUrl(`${path}#service`),
        name: copy.serviceName,
        description: copy.lead,
        provider: { "@id": absoluteUrl("/#business") },
        areaServed: "Broward / Miami-Dade",
        serviceType: locale === "es" ? "Planificación y edición de contenido para redes" : "Social content planning and editing",
      },
      buildServiceFaqSchema(absoluteUrl(path), copy.faqs),
      breadcrumbSchema(path, locale, [
        { name: EVENTS_HUB_COPY[locale].breadcrumb, path: EVENTS_HUB_PATHS[locale] },
        { name: copy.breadcrumb, path },
      ]),
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-8 sm:py-16" data-section={`${prefix}_hero`}>
        <Container size="xl">
          <Crumbs locale={locale} current={copy.breadcrumb} />
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#5a6066]">{copy.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">{copy.h1}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-7">{copy.lead}</p>
              <HeroActions locale={locale} prefix={prefix} eventLabel={event.name} inquiryId={inquiryId} />
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">{t.notAffiliated(affiliationLabel(event, locale))}</p>
            </div>
            <EventDates event={event} locale={locale} />
          </div>
        </Container>
      </section>

      <ProseSection id={`${prefix}_answer`} heading={copy.answer.question} paragraphs={copy.answer.paragraphs} />

      <ProseSection id={`${prefix}_audience`} heading={copy.audience.heading} paragraphs={[copy.audience.intro]} tone="paper">
        <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-base leading-7 text-[#252a2d]">
          {copy.audience.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#252a2d]">{copy.audience.closing}</p>
      </ProseSection>

      <ServiceCraft heading={copy.plan.heading} cards={copy.plan.cards} sectionId={`${prefix}_plan`} />

      <ProseSection id={`${prefix}_send`} heading={copy.send.heading} paragraphs={[copy.send.intro]}>
        <NumberedList items={copy.send.items} className="max-w-3xl" />
      </ProseSection>

      <ProseSection id={`${prefix}_scope`} heading={scope.heading} paragraphs={scope.paragraphs} tone="paper" />

      <ProseSection id={`${prefix}_proof`} heading={t.proofHeading} paragraphs={[copy.proof.text]}>
        <Link
          href={copy.proof.href}
          data-cta={`${prefix}_proof`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline underline-offset-4"
        >
          {copy.proof.label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </ProseSection>

      <ServiceInquiryRail
        sectionId={inquiryId}
        locale={locale}
        accentedSpanish
        service={{
          serviceId: prefix,
          serviceName: copy.inquiry.serviceName,
          goalPrompt: copy.inquiry.goalPrompt,
          assetPrompt: copy.inquiry.assetPrompt,
          proofHref: copy.proof.href,
          proofLabel: copy.proof.label,
        }}
      />

      <ServiceFaqs
        heading={t.faqHeading}
        faqs={copy.faqs}
        sectionId={`${prefix}_faq`}
        eyebrow={t.faqEyebrow}
      />

      <ServiceRelated
        heading={t.relatedHeading}
        services={copy.related}
        sectionId={`${prefix}_related`}
        linkLabel={t.linkLabel}
      />

      {others.length ? (
        <section className="py-10" data-section={`${prefix}_other_events`} aria-label={t.otherEvents}>
          <Container size="xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#5a6066]">{t.otherEvents}</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {others.map((other) => (
                <li key={other.id}>
                  <Link
                    href={other.paths[locale]}
                    data-cta={`${prefix}_other_${ctaId(other.id)}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-[#ddd4c8] px-4 text-sm hover:border-[#101214]"
                  >
                    {other.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </main>
  );
}

export function EventsHubPage({ locale }: { locale: EventLocale }) {
  const copy = EVENTS_HUB_COPY[locale];
  const t = UI[locale];
  const path = EVENTS_HUB_PATHS[locale];
  const prefix = "events_hub";
  const inquiryId = "events-hub-inquiry";
  const scope = eventScopeSection(locale);
  const seasons = EVENT_SEASON_ORDER.map((season) => ({
    season,
    events: EVENTS.filter((event) => event.season === season).sort((a, b) => a.typicalMonth - b.typicalMonth),
  })).filter((group) => group.events.length > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": absoluteUrl(`${path}#webpage`),
        url: absoluteUrl(path),
        name: copy.h1,
        description: copy.lead,
        inLanguage: locale === "es" ? "es-US" : "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        breadcrumb: { "@id": absoluteUrl(`${path}#breadcrumbs`) },
        hasPart: EVENTS.map((event) => ({ "@type": "WebPage", "@id": absoluteUrl(`${event.paths[locale]}#webpage`), url: absoluteUrl(event.paths[locale]) })),
      },
      buildServiceFaqSchema(absoluteUrl(path), copy.faqs),
      breadcrumbSchema(path, locale, [{ name: copy.breadcrumb, path }]),
    ],
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="border-b border-[#ddd4c8] py-8 sm:py-16" data-section={`${prefix}_hero`}>
        <Container size="xl">
          <Crumbs locale={locale} />
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#5a6066]">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-serif em-display">{copy.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-7">{copy.lead}</p>
          <HeroActions
            locale={locale}
            prefix={prefix}
            eventLabel={locale === "es" ? "un evento del sur de Florida" : "a South Florida event"}
            inquiryId={inquiryId}
          />
          <p className="mt-5 max-w-2xl text-sm leading-6 text-[#5a6066]">{t.hubNotAffiliated}</p>
        </Container>
      </section>

      <ProseSection id={`${prefix}_answer`} heading={copy.answer.question} paragraphs={copy.answer.paragraphs} />

      {seasons.map(({ season, events }) => (
        <section
          key={season}
          className="border-b border-[#ddd4c8] py-12 sm:py-16"
          aria-labelledby={`${prefix}-${season}-heading`}
          data-section={`${prefix}_${season}`}
        >
          <Container size="xl">
            <h2 id={`${prefix}-${season}-heading`} className="font-serif text-3xl sm:text-4xl">
              {copy.seasons[season]}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => {
                const edition = displayEdition(event);
                return (
                  <article key={event.id} className="flex flex-col rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                    <h3 className="font-serif text-2xl">{event.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                      <strong>{t.typical}:</strong> {event.typicalWindow[locale]}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#252a2d]">
                      {edition ? (
                        <><strong>{t.listedYear(edition.start.slice(0, 4))}:</strong>{" "}{shownRange(edition.start, edition.end, locale)}</>
                      ) : t.noNext}
                    </p>
                    <Link
                      href={event.paths[locale]}
                      data-cta={`${prefix}_${ctaId(event.id)}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                    >
                      {copy.cardCta}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>
      ))}

      <ProseSection id={`${prefix}_scope`} heading={scope.heading} paragraphs={scope.paragraphs} tone="paper" />

      <ServiceInquiryRail
        sectionId={inquiryId}
        locale={locale}
        accentedSpanish
        service={{
          serviceId: prefix,
          serviceName: copy.inquiry.serviceName,
          goalPrompt: copy.inquiry.goalPrompt,
          assetPrompt: copy.inquiry.assetPrompt,
          proofHref: locale === "es" ? "/es/portafolio" : "/portfolio",
          proofLabel: locale === "es" ? "Ver el portafolio publicado" : "See the published portfolio",
        }}
      />

      <ServiceFaqs heading={copy.faqHeading} faqs={copy.faqs} sectionId={`${prefix}_faq`} eyebrow={t.faqEyebrow} />

      <ServiceRelated heading={t.relatedHeading} services={copy.related} sectionId={`${prefix}_related`} linkLabel={t.linkLabel} />
    </main>
  );
}

/**
 * The additive link that existing service pages carry into this section.
 * Its own question heading keeps it a separate, small section, so it never
 * inflates the page section it follows.
 */
export function EventSeasonLinks({ locale, path }: { locale: EventLocale; path: string }) {
  const listed = (EVENT_CROSSLINKS[path] ?? []).filter((id) => EVENTS.some((event) => event.id === id)).map(getEvent);
  if (!EVENT_CROSSLINKS[path]) return null;
  const heading = locale === "es" ? "¿Vas a participar en un evento del sur de Florida?" : "Taking part in a South Florida event this season?";
  const lead =
    locale === "es"
      ? "Planes de contenido para antes, durante y después de los eventos del año, para negocios que exponen o venden alrededor de ellos:"
      : "Before, during and after content plans for the region's annual events, for businesses that exhibit at or sell around them:";
  return (
    <section className="border-b border-[#ddd4c8] py-10" aria-labelledby="event-season-links-heading" data-section="event_season_links">
      <Container size="xl">
        <h2 id="event-season-links-heading" className="font-serif text-2xl sm:text-3xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#252a2d]">{lead}</p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {listed.map((event) => (
            <li key={event.id}>
              <Link
                href={event.paths[locale]}
                data-cta={`events_crosslink_${ctaId(event.id)}`}
                className="inline-flex min-h-11 items-center rounded-full border border-[#101214] px-4 text-sm font-medium"
              >
                {event.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={EVENTS_HUB_PATHS[locale]}
              data-cta="events_crosslink_hub"
              className="inline-flex min-h-11 items-center rounded-full bg-[var(--em-accent-ink)] px-4 text-sm font-medium text-white"
            >
              {locale === "es" ? "Todos los eventos del año" : "All annual events"}
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  );
}
