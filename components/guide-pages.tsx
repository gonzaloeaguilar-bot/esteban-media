import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  Languages,
} from "lucide-react";

import { Container } from "@/components/ui/container";
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

const detailCopy = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbGuides: "Guides",
    breadcrumbLabel: "Breadcrumb",
    answerLabel: "Quick answer:",
    contentsLabel: "In this guide",
    languageLabel: "Leer en español",
    relatedEyebrow: "Continue preparing",
    relatedTitle: "Related practical guides",
    relatedLinkLabel: "Read guide",
    supportEyebrow: "Put the guide to work",
    supportTitle: "Connect the preparation to services and real project proof.",
    proofEyebrow: "Related published example",
    proofLinkLabel: "View the project page",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbGuides: "Guías",
    breadcrumbLabel: "Migas de pan",
    answerLabel: "Respuesta rápida:",
    contentsLabel: "En esta guía",
    languageLabel: "Read in English",
    relatedEyebrow: "Sigue preparando",
    relatedTitle: "Guías prácticas relacionadas",
    relatedLinkLabel: "Leer la guía",
    supportEyebrow: "Usa la guía en tu proyecto",
    supportTitle: "Conecta la preparación con servicios y prueba real publicada.",
    proofEyebrow: "Ejemplo publicado relacionado",
    proofLinkLabel: "Ver la página del proyecto",
  },
} as const;

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

export function GuidesIndexPage({ locale }: { locale: GuideLocale }) {
  const copy = guidesIndexCopy[locale];
  const guides = getGuides(locale);
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
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
                {copy.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#252a2d]">
                <strong>{copy.answerLabel}</strong> {copy.answer}
              </p>
              <p className="mt-4 max-w-3xl leading-7 text-[#3f4548]">
                {copy.intro}
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

      <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="guide-list-heading">
        <Container size="xl">
          <h2 id="guide-list-heading" className="sr-only">
            {copy.breadcrumbCurrent}
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {guides.map((guide, index) => (
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
  const relatedGuides = getGuides(locale).filter(
    (candidate) => candidate.id !== guide.id,
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
              <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl lg:text-7xl">
                {guide.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#252a2d]">
                <strong>{copy.answerLabel}</strong> {guide.answer}
              </p>
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
                    <p key={paragraph}>{paragraph}</p>
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
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
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
                <span className="mt-4 font-serif text-2xl leading-tight">
                  {relatedGuide.title}
                </span>
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
    </main>
  );
}
