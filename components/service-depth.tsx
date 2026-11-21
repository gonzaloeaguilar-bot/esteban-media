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
      `Esteban Moreno Media is a Fort Lauderdale-based service-area business run by Esteban Moreno, working with businesses across Broward and Miami-Dade. Projects can start remotely: you share footage, photos or references online and Esteban edits them, with no visit needed. On-location filming or photography is available as a paid service, scoped and quoted per project. Communication is Spanish-first, with intermediate English available. Remote editing starts from ${packageFrom("arranque")} per video (Starter package) and the monthly Local Presence plan for on-location production starts from ${packageFrom("presencia-local")} per month; every project gets a written quote.`,
  },
  es: {
    eyebrow: "En corto",
    question: (service: string) => `¿Cómo funciona el servicio de ${service} con Esteban Moreno Media?`,
    answer: (service: string) => isPhotographyService(service)
      ? `Esteban Moreno Media tiene base en Fort Lauderdale y atiende negocios en Broward y Miami-Dade. Para una sesión de fotos reales, indica los productos o personas, la ubicación, la cantidad de imágenes y su uso; Esteban define el alcance y envía una cotización por escrito. Para imágenes asistidas con IA, comparte fotos originales fieles al producto e indica qué fondos o ambientes pueden cambiar. Son servicios con entregables distintos, y la fotografía en locación se cotiza por proyecto. La atención es en español primero, con inglés intermedio disponible.`
      :
      `Esteban Moreno Media es un negocio de servicio con base en Fort Lauderdale, dirigido por Esteban Moreno, que trabaja con negocios en Broward y Miami-Dade. Los proyectos pueden empezar en remoto: compartes el material, las fotos o las referencias en línea y Esteban los edita, sin necesidad de visita. La grabación o la fotografía en locación está disponible como servicio pagado, con alcance y cotización por proyecto. La atención es en español primero, con inglés intermedio disponible. La edición remota parte desde ${packageFrom("arranque")} por video (paquete Arranque) y el plan mensual Presencia Local para producción en locación desde ${packageFrom("presencia-local")} al mes (paquete Presencia Local); cada proyecto recibe una cotización por escrito.`,
  },
} as const;

function isPhotographyService(service: string): boolean {
  return /photograph|headshot|portrait|fotograf|fotógraf|retrato|fotos? con ia|imágenes? con ia/i.test(service);
}










const ES_TRAILING_CITY = /\s+(Fort Lauderdale|Miami|Boca Raton)$/;

export function esServicePhrase(keyword: string): string {
  let phrase = keyword.trim().replace(/^servicio de\s+/i, "");


  phrase = phrase.replace(/^contratar\s+(un\s+|una\s+)?/i, "");
  phrase = phrase.replace(/^editor de (video|reels)\b/i, (_, what: string) => `edición de ${what}`);
  phrase = phrase.replace(/^edición de video remoto$/i, "edición de video remota");
  phrase = phrase.replace(/\breels\b/g, "Reels");
  if (!/\ben\b/.test(phrase)) phrase = phrase.replace(ES_TRAILING_CITY, " en $1");
  return phrase;
}

export function enServicePhrase(service: string): string {
  return service.trim().replace(/\s+service$/i, "");
}


function inSentence(phrase: string): string {
  return /^[A-Z][a-z]/.test(phrase) && !/^(TikTok|YouTube|Reels|Instagram)\b/.test(phrase)
    ? phrase.charAt(0).toLowerCase() + phrase.slice(1)
    : phrase;
}











export function ServiceAnswerFirst({
  service,
  locale = "en",
  sectionId = "answer-first",
  answerOverride,
}: {
  service: string;
  locale?: "en" | "es";
  sectionId?: string;





  answerOverride?: string;
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
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#252a2d]">{answerOverride ?? copy.answer(service)}</p>
      </Container>
    </section>
  );
}







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






export function linkableRelated(services: readonly RelatedService[]): RelatedService[] {
  return services.filter(
    (service) => !isConsolidatedPath(service.href.replace(/[#?].*$/, "").replace(/\/$/, "")),
  );
}


export function ServiceRelated({
  heading,
  services,
  sectionId = "related-services",
  linkLabel = "Read more",
}: {
  heading: string;
  services: readonly RelatedService[];
  sectionId?: string;

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









export function ServiceInquiryRail({
  service,
  sectionId = "service-inquiry",
  trackInterest = false,
  locale = "en",
  relationship = "service",


  accentedSpanish = true,
}: {
  service: ServiceInquiry;
  sectionId?: string;
  locale?: ServiceInquiryLocale;
  trackInterest?: boolean;

  relationship?: "service" | "event" | "digital";

  accentedSpanish?: boolean;
}) {
  const t = locale === "es" && accentedSpanish ? inquiryCopy.esAccented : inquiryCopy[locale];
  const relationshipCopy = {
    en: {
      service: "You work directly with Esteban to define the useful starting point: the goal, the material you have, and where the finished work needs to live.",
      event: "You work directly with Esteban to decide which moments matter, what coverage fits the occasion, and where the finished story will be shared.",
      digital: "You work directly with Esteban to clarify the customer question first, then decide whether video, a website, social content, or a combination is the useful next move.",
    },
    es: {
      service: "Trabajas directamente con Esteban para definir el mejor punto de partida: la meta, el material que ya tienes y dónde necesita vivir el trabajo final.",
      event: "Trabajas directamente con Esteban para decidir qué momentos importan, qué cobertura le sirve a la ocasión y dónde se compartirá la historia final.",
      digital: "Trabajas directamente con Esteban para aclarar primero la pregunta del cliente y después decidir si lo que ayuda es video, sitio web, contenido para redes o una combinación.",
    },
  }[locale][relationship];
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
            <p className="mt-4 max-w-2xl border-l-2 border-[#f0b384] pl-4 text-sm leading-6 text-[#eadfd3]" data-personal-partner={relationship}>
              {relationshipCopy}
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

  heading: string;
  paragraphs: readonly string[];
};















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
