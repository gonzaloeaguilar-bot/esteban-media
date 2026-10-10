import React from "react";
import { GuideIllustration } from "@/components/guide-illustration";
import { KeepReading } from "@/components/keep-reading";
import RailFaq from "@/vendor/rail-kit/RailFaq";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Languages,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { VideoBudgetEstimator } from "@/components/video-budget-estimator";
import { ScriptAndOverlayKit } from "@/components/script-and-overlay-kit";
import { VideoStrategyAssessment } from "@/components/video-strategy-assessment";
import { FootageHandoffChecklist } from "@/components/footage-handoff-checklist";
import {
  buildGuideStructuredData,
  buildGuidesIndexStructuredData,
  getGuideCompanion,
  getGuidePath,
  getGuides,
  getGuideSupportLinks,
  guidePolicyNotes,
  guidesIndexCopy,
  type Guide,
  type GuideLocale,
} from "@/lib/guides";
import { redditQueryInsights } from "@/lib/reddit-query-insights";


const RELATED_GUIDE_COUNT = 6;
const detailCopy = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbLabel: "Breadcrumb",
    answerLabel: "Quick answer:",
    contentsLabel: "In this guide",
    languageLabel: "Leer en español",
    relatedEyebrow: "Continue preparing",
    relatedTitle: "Which related guides should you read next?",
    relatedFoldSummary: "More guides on this",
    relatedFoldHint: "Formats, pricing, audio, delivery and the rest of the practical guides.",
    relatedLinkLabel: "Read guide",
    supportEyebrow: "Put the guide to work",
    supportTitle: "Which services and published project connect to this guide?",
    proofEyebrow: "Related published example",
    proofLinkLabel: "View the project page",
    faqEyebrow: "Questions before requesting a quote",
    faqTitle: "What do people ask about this before a quote?",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbGuides: "Guías",
    breadcrumbLabel: "Migas de pan",
    answerLabel: "Respuesta rápida:",
    contentsLabel: "En esta guía",
    languageLabel: "Read in English",
    relatedEyebrow: "Sigue preparando",
    relatedTitle: "¿Qué guías relacionadas conviene leer después?",
    relatedFoldSummary: "Más guías sobre esto",
    relatedFoldHint: "Formatos, precios, audio, entrega y el resto de las guías prácticas.",
    relatedLinkLabel: "Leer la guía",
    supportEyebrow: "Usa la guía en tu proyecto",
    supportTitle: "¿Qué servicios y proyecto publicado se conectan con esta guía?",
    proofEyebrow: "Ejemplo publicado relacionado",
    proofLinkLabel: "Ver la página del proyecto",
    faqEyebrow: "Preguntas antes de pedir cotización",
    faqTitle: "¿Qué se pregunta sobre esto antes de cotizar?",
  },
} as const;

const queryInsightCopy = {
  en: {
    eyebrow: "Search questions",
    title: "Core topics people ask before they hire help.",
    intro:
      "These themes come from public Reddit discussions about video editing, reels, AI product images, and real estate photo editing. They are used here as topic research, not as testimonials.",
    sourceLabel: "Source discussion",
    linksLabel: "Related page",
    keywordsLabel: "Keyword targets",
  },
  es: {
    eyebrow: "Preguntas de busqueda",
    title: "Temas clave que la gente pregunta antes de contratar ayuda.",
    intro:
      "Estos temas salen de conversaciones publicas en Reddit sobre edicion de video, reels, imagenes de producto con IA y edicion de fotos inmobiliarias. Se usan como investigacion de temas, no como testimonios.",
    sourceLabel: "Conversacion fuente",
    linksLabel: "Pagina relacionada",
    keywordsLabel: "Palabras clave",
  },
} as const;

const quoteIntentCopy = {
  en: {
    eyebrow: "Quote questions",
    title: "Questions buyers ask right before they contact a video editor.",
    intro:
      "Use these if you are comparing cost, remote handoff, or AI visual services before asking for a quote.",
    cards: [
      {
        question: "How much does a video editor cost in Miami or Fort Lauderdale?",
        answer:
          "Start with the pricing guide, then send the project type, source footage, formats, and deadline so the estimate can be scoped.",
        href: "/guides/video-production-cost-fort-lauderdale",
        cta: "Read cost guide",
      },
      {
        question: "Can I hire a remote video editor for reels or YouTube?",
        answer:
          "Yes. Remote editing usually starts with original files, brand assets, references, and one message that explains the publishing goal.",
        href: "/guides/remote-video-editing-handoff",
        cta: "Plan remote handoff",
      },
      {
        question: "Can AI product photos be used for ecommerce?",
        answer:
          "They can help when product references are accurate and the final image does not misrepresent labels, materials, size, or included items.",
        href: "/guides/how-to-use-ai-for-product-photography",
        cta: "Read AI photo guide",
      },
    ],
  },
  es: {
    eyebrow: "Preguntas antes de cotizar",
    title: "Preguntas que hacen los compradores justo antes de contactar a un editor.",
    intro:
      "Úsalas si estás comparando costo, entrega remota o imágenes con IA antes de pedir una cotización.",
    cards: [
      {
        question: "¿Cuánto cuesta contratar un editor de video en Miami o Fort Lauderdale?",
        answer:
          "Empieza con la guía de precios y luego envía el tipo de proyecto, material disponible, formatos y fecha para definir el alcance.",
        href: "/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale",
        cta: "Leer guía de costo",
      },
      {
        question: "¿Puedo contratar edición remota para reels o YouTube?",
        answer:
          "Sí. La edición remota funciona mejor con archivos originales, elementos de marca, referencias y un mensaje que explique la meta de publicación.",
        href: "/es/guias/entrega-para-edicion-remota-de-video",
        cta: "Preparar entrega remota",
      },
      {
        question: "¿Se pueden usar fotos de producto con IA para ecommerce?",
        answer:
          "Pueden ayudar cuando las referencias del producto son precisas y la imagen final no cambia etiquetas, materiales, tamaño o elementos incluidos.",
        href: "/es/guias/como-usar-inteligencia-artificial-para-fotografia-de-producto",
        cta: "Leer guía de fotos con IA",
      },
    ],
  },
} as const;

function renderFormattedText(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const href = match[2];
    const isExternal = href.startsWith("http");

    if (isExternal) {
      parts.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[var(--em-accent-ink)]"
        >
          {label}
        </a>,
      );
    } else {
      parts.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[var(--em-accent-ink)]"
        >
          {label}
        </Link>,
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function SupportLinks({ locale }: { locale: GuideLocale }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {getGuideSupportLinks(locale).map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group flex min-h-44 flex-col justify-between rounded-xl border border-[#b9aa9a] bg-[#fbf6ef] p-5 transition hover:border-[#e85d3e]"
        >
          <span className="text-sm leading-6 text-[#3f4548]">
            {link.description}
          </span>
          <span className="mt-6 inline-flex items-center gap-2 font-medium text-[#9f3c27]">
            {link.label}
            <ArrowRight
              className="size-4 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}

function QueryInsights({ locale }: { locale: GuideLocale }) {
  const copy = queryInsightCopy[locale];

  return (
    <section className="border-b border-[#ddd4c8] bg-[#fbf6ef] py-12 sm:py-16">
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
          {copy.eyebrow}
        </p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <h2 className="max-w-3xl font-serif text-3xl leading-tight text-[#101214] sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#3f4548] sm:text-base">
              {copy.intro}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {redditQueryInsights.map((insight) => (
              <article
                key={insight.id}
                className="rounded-xl border border-[#ddd4c8] bg-white p-5"
              >
                <h3 className="text-base font-semibold leading-6 text-[#101214]">
                  {insight.audienceQuestion[locale]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#41474d]">
                  {insight.contentAngle[locale]}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#5a6066]">
                  {copy.keywordsLabel}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {insight.keywordTargets.map((target) => (
                    <li
                      key={target[locale]}
                      className="rounded-full border border-[#ddd4c8] px-2.5 py-1 text-xs text-[#41474d]"
                    >
                      {target[locale]}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <a
                    href={insight.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
                  >
                    {copy.sourceLabel}
                  </a>
                  {insight.internalLinks.slice(0, 2).map((link) => (
                    <Link
                      key={link[locale]}
                      href={link[locale]}
                      className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
                    >
                      {copy.linksLabel}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function QuoteIntentQuestions({ locale }: { locale: GuideLocale }) {
  const copy = quoteIntentCopy[locale];

  return (
    <section className="border-b border-[#ddd4c8] py-12 sm:py-16" data-section="quote-intent-questions">
      <Container size="xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
          {copy.eyebrow}
        </p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <p className="max-w-3xl font-serif text-3xl leading-tight text-[#101214] sm:text-4xl">
              {copy.title}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#3f4548] sm:text-base">
              {copy.intro}
            </p>
          </div>
          <div className="grid gap-4">
            {copy.cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                data-cta={`quote_intent_${card.href.split("/").pop()}`}
                className="group rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-5 hover:border-[#e85d3e]"
              >
                <p className="font-serif text-2xl leading-tight">{card.question}</p>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">{card.answer}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">
                  {card.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export function GuidesIndexPage({ locale }: { locale: GuideLocale }) {
  const copy = guidesIndexCopy[locale];
  const guides = getGuides(locale);
  // Eight is what fits a phone before a directory stops reading as a list of
  // choices and starts reading as a wall. The rest is one click away and never
  // leaves the DOM.
  const shown = guides.slice(0, 8);
  const folded = guides.slice(8);
  const homePath = locale === "es" ? "/es" : "/";
  const companionPath =
    locale === "es" ? guidesIndexCopy.en.path : guidesIndexCopy.es.path;

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <StructuredData data={buildGuidesIndexStructuredData(locale)} />

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label={copy.breadcrumbLabel} className="text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={homePath} className="hover:text-[#9f3c27]">
                  {copy.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{copy.breadcrumbCurrent}</li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.72fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                {copy.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#252a2d]">
                <strong>{copy.answerLabel}</strong> {copy.answer}
              </p>
              <p className="mt-4 max-w-3xl leading-7 text-[#3f4548]">
                {renderFormattedText(copy.intro)}
              </p>
            </div>

            <div className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <BookOpenText className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <p className="mt-5 font-serif text-5xl text-[#9f3c27]">
                {guides.length.toString().padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                {locale === "es"
                  ? "Temas concretos para preparar, definir y revisar una edición."
                  : "Focused topics for preparing, defining, and reviewing an edit."}
              </p>
              <Link
                href={companionPath}
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
              >
                <Languages className="size-4" aria-hidden="true" />
                {copy.languageLabel}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <QueryInsights locale={locale} />
      <QuoteIntentQuestions locale={locale} />

      <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="guide-list-heading">
        <Container size="xl">
          <h2 id="guide-list-heading" className="sr-only">
            {copy.breadcrumbCurrent}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {shown.map((guide, index) => (
              <article
                key={guide.id}
                className="flex min-h-80 flex-col rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] p-6 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-serif text-4xl text-[#9f3c27]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#5a6066]">
                    {guide.eyebrow}
                  </span>
                </div>
                <h3 className="mt-8 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
                  {guide.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#3f4548] sm:text-base">
                  {guide.answer}
                </p>
                <Link
                  href={getGuidePath(guide)}
                  className="mt-auto inline-flex min-h-12 items-end gap-2 pt-8 font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
                >
                  {copy.readLabel}
                  <ArrowRight className="mb-1 size-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          {/* THE DIRECTORY IS NOT THE ARTICLE (2026-09-30).
              Measured on production: /guides was 21,326px on a phone, the
              second-longest page on the site — and 39 identical 320px cards
              were essentially all of it. Somebody opening a directory is
              looking for ONE guide, and thirty-one cards past the eighth are
              not helping them find it.

              The first eight stay as cards. The other thirty-one sit inside
              one fold-out whose summary names where it leads. Collapsed is NOT
              removed: all 39 links, titles and answers stay in the served
              HTML, so the internal linking a crawler follows and everything an
              answer engine reads is byte-for-byte what it was. Only the
              scrolling changed. */}
          {folded.length > 0 ? (
            <KeepReading
              id="all-guides"
              title={copy.listFoldSummary}
              destinations={copy.listFoldHint.replace(
                "{count}",
                folded.length.toString(),
              )}
            >
              <div className="grid gap-5 pb-4 md:grid-cols-2">
                {folded.map((guide, offset) => {
                  const index = shown.length + offset;
                  return (
                    <article
                      key={guide.id}
                      className="flex min-h-80 flex-col rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] p-6 sm:p-8"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-serif text-4xl text-[#9f3c27]">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#5a6066]">
                          {guide.eyebrow}
                        </span>
                      </div>
                      <h3 className="mt-8 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
                        {guide.title}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-[#3f4548] sm:text-base">
                        {guide.answer}
                      </p>
                      <Link
                        href={getGuidePath(guide)}
                        className="mt-auto inline-flex min-h-12 items-end gap-2 pt-8 font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
                      >
                        {copy.readLabel}
                        <ArrowRight className="mb-1 size-4" aria-hidden="true" />
                      </Link>
                    </article>
                  );
                })}
              </div>
            </KeepReading>
          ) : null}
        </Container>
      </section>

      <section className="border-t border-[#d6ccc0] bg-[#e7ded2] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            {copy.relatedEyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            {copy.relatedTitle}
          </h2>
          <SupportLinks locale={locale} />
        </Container>
      </section>
    </main>
  );
}

export function GuideDetailPage({ guide }: { guide: Guide }) {
  const locale = guide.locale;
  const copy = detailCopy[locale];
  const indexCopy = guidesIndexCopy[locale];
  const homePath = locale === "es" ? "/es" : "/";
  const companion = getGuideCompanion(guide);
  // Six neighbours, rotating through the list, instead of every other guide.
  // Listing all 40 made a wall of cards for readers and, with no heading per
  // card, one ~600-word "section" that failed the dual-audience gate on every
  // guide. Rotation keeps inbound links spread evenly: each guide is linked from
  // the six guides before it, and the /guides index still lists them all.
  const allGuides = getGuides(locale);
  const guideIndex = allGuides.findIndex((candidate) => candidate.id === guide.id);
  const relatedGuides = Array.from(
    { length: Math.min(RELATED_GUIDE_COUNT, allGuides.length - 1) },
    (_, offset) => allGuides[(guideIndex + 1 + offset) % allGuides.length],
  );

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <StructuredData data={buildGuideStructuredData(guide)} />

      <section className="border-b border-[#ddd4c8] py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <nav aria-label={copy.breadcrumbLabel} className="text-sm text-[#5a6066]">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={homePath} className="hover:text-[#9f3c27]">
                  {copy.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={indexCopy.path} className="hover:text-[#9f3c27]">
                  {copy.breadcrumbGuides}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="max-w-72 truncate sm:max-w-none">
                {guide.title}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_.56fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                {guide.eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-serif em-display em-display--xl">
                {guide.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#252a2d]">
                <strong>{copy.answerLabel}</strong> {guide.answer}
              </p>
              {/* A drawing for the guide's theme. The photo library is 13
                  project frames and none of them is about editing workflow, so
                  a still here would be decoration. */}
              <GuideIllustration slug={guide.slug} className="mt-8 h-40 w-full max-w-md rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-3" />
              <p className="mt-5 max-w-3xl border-l-2 border-[#c84a2c] pl-4 text-sm leading-6 text-[#3f4548]">
                {guidePolicyNotes[locale]}
              </p>
              {companion ? (
                <Link
                  href={getGuidePath(companion)}
                  className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
                >
                  <Languages className="size-4" aria-hidden="true" />
                  {copy.languageLabel}
                </Link>
              ) : null}
            </div>

            <nav
              aria-label={copy.contentsLabel}
              className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6"
            >
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#5a6066]">
                {copy.contentsLabel}
              </p>
              <ol className="mt-5 space-y-4">
                {guide.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#section-${index + 1}`}
                      className="group flex gap-3 leading-6 hover:text-[#9f3c27]"
                    >
                      <span className="font-serif text-[#9f3c27]">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                      <span className="underline decoration-[#d6ccc0] underline-offset-4 group-hover:decoration-[#e85d3e]">
                        {section.heading}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </Container>
      </section>

      <article className="py-12 sm:py-16 lg:py-20">
        <Container size="lg">
          <div className="mx-auto max-w-3xl space-y-14">
            {guide.sections.map((section, index) => (
              <section
                key={section.heading}
                id={`section-${index + 1}`}
                aria-labelledby={`section-${index + 1}-heading`}
                className="scroll-mt-24"
              >
                <p className="font-serif text-2xl text-[#9f3c27]">
                  {(index + 1).toString().padStart(2, "0")}
                </p>
                <h2
                  id={`section-${index + 1}-heading`}
                  className="mt-3 font-serif text-4xl leading-tight sm:text-5xl"
                >
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-8 text-[#252a2d] sm:text-lg">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{renderFormattedText(paragraph)}</p>
                  ))}
                </div>
                {section.bullets ? (
                  <ul className="mt-6 space-y-3 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-6">
                    {section.bullets.map((item) => (
                      <li key={item} className="flex gap-3 leading-7 text-[#252a2d]">
                        <CheckCircle2
                          className="mt-1 size-4 shrink-0 text-[#1a7f82]"
                          aria-hidden="true"
                        />
                        <span>{renderFormattedText(item)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {guide.faqs?.length ? (
              <section id="faq" className="scroll-mt-24" aria-labelledby="faq-heading">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">{copy.faqEyebrow}</p>
                <h2 id="faq-heading" className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{copy.faqTitle}</h2>
                {/* `RailFaq` del kit, no un acordeon propio.
                    El que habia aqui era `<details>` + `<summary>` con clases
                    sueltas: funcionaba, pero cada sitio que lo reescribe se
                    queda sin lo que el kit ya trae —el marcador que gira, el
                    foco visible, el objetivo tactil de 24 px y el respeto a
                    `prefers-reduced-motion`— y sin los arreglos que lleguen
                    despues.

                    EL ASPECTO NO CAMBIA, y esta medido: fondo #fbf6ef, borde
                    #ddd4c8 de 1px y radio de 12px, los mismos que tenian las
                    clases de aqui. Salen de los tokens de `globals.css` — y
                    los mandos que hacian falta para eso no existian en el kit
                    hasta que se intento este cambio. */}
                <div className="mt-6">
                  <RailFaq
                    source="guide-faq"
                    items={guide.faqs.map((faq) => ({
                      id: faq.question,
                      question: faq.question,
                      answer: renderFormattedText(faq.answer),
                    }))}
                  />
                </div>
              </section>
            ) : null}

            {/* INTERACTIVE LEAD MAGNET EMBEDS BASED ON GUIDE SUBJECT */}
            {guide.id === "remote-editing-handoff" && (
              <div className="my-10">
                <FootageHandoffChecklist locale={locale} />
              </div>
            )}

            {(guide.id === "fort-lauderdale-video-cost-guide" || guide.id.includes("cost") || guide.id.includes("cuesta")) && (
              <div className="my-10">
                <VideoBudgetEstimator locale={locale} />
              </div>
            )}

            {(guide.id === "formats-and-safe-zones" || guide.id.includes("vertical")) && (
              <div className="my-10">
                <ScriptAndOverlayKit locale={locale} />
              </div>
            )}

            {(guide.id === "bilingual-video-strategy-guide" || guide.id.includes("bilingue")) && (
              <div className="my-10">
                <VideoStrategyAssessment locale={locale} />
              </div>
            )}
          </div>
        </Container>
      </article>

      <section className="border-y border-[#d6ccc0] bg-[#e7ded2] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            {copy.supportEyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            {copy.supportTitle}
          </h2>
          <Link
            href={guide.proof.href}
            className="group mt-8 grid gap-4 rounded-xl border border-[#b9aa9a] bg-[#fbf6ef] p-6 transition hover:border-[#c84a2c] sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
          >
            <span>
              <span className="block text-xs font-medium uppercase tracking-[0.14em] text-[#5a6066]">
                {copy.proofEyebrow}
              </span>
              <span className="mt-3 block font-serif text-3xl leading-tight">
                {guide.proof.title}
              </span>
              <span className="mt-3 block max-w-3xl text-sm leading-6 text-[#3f4548]">
                {guide.proof.description}
              </span>
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-[#9f3c27]">
              {copy.proofLinkLabel}
              <ArrowRight
                className="size-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
          <SupportLinks locale={locale} />
        </Container>
      </section>

      {/* 8,810px of the 24,217px this page measured on a phone — more than a
          third of it, and every pixel of it is NAVIGATION, not the article
          somebody came to read. The kit's own rule for the split puts exactly
          this inside: "photo galleries, explainers, service lists, regional
          pages". Collapsed is not removed: every link stays in the DOM, so the
          internal linking a crawler follows is untouched. */}
      <KeepReading
        id="related-guides"
        className="em-fold"
        title={copy.relatedFoldSummary}
        destinations={copy.relatedFoldHint}
      >
      <section className="py-12 sm:py-16" aria-labelledby="related-guides-heading">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            {copy.relatedEyebrow}
          </p>
          <h2
            id="related-guides-heading"
            className="mt-4 font-serif text-4xl leading-tight sm:text-5xl"
          >
            {copy.relatedTitle}
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {relatedGuides.map((relatedGuide) => (
              <Link
                key={relatedGuide.id}
                href={getGuidePath(relatedGuide)}
                className="group flex min-h-52 flex-col rounded-xl border border-[#d6ccc0] bg-[#fbf6ef] p-5 transition hover:border-[#e85d3e]"
              >
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#5a6066]">
                  {relatedGuide.eyebrow}
                </span>
                {/* A real heading per card, not a span: without one, the dual-audience
                    gate (and any passage splitter) reads the whole related-guides grid as
                    a single ~600-word section, which failed every guide page. */}
                <h3 className="mt-4 font-serif text-2xl font-normal leading-tight">
                  {relatedGuide.title}
                </h3>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 font-medium text-[#9f3c27]">
                  {copy.relatedLinkLabel}
                  <ArrowRight
                    className="size-4 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      </KeepReading>
    </main>
  );
}
