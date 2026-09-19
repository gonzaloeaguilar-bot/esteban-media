import Link from "next/link";
import { ArrowRight, Languages, Layers, Mail } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  buildCaseStudiesIndexStructuredData,
  caseStudiesIndexCopy,
  getCaseStudies,
  getCaseStudiesByDiscipline,
  getCaseStudyPath,
  type CaseStudyLocale,
} from "@/lib/case-studies";

function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function CaseStudiesIndexPage({ locale }: { locale: CaseStudyLocale }) {
  const copy = caseStudiesIndexCopy[locale];
  const groups = getCaseStudiesByDiscipline(locale);
  const total = getCaseStudies(locale).length;
  const homePath = locale === "es" ? "/es" : "/";
  const companionPath =
    locale === "es" ? caseStudiesIndexCopy.en.path : caseStudiesIndexCopy.es.path;
  const portfolioPath = locale === "es" ? "/es/portafolio" : "/portfolio";
  const servicesPath = locale === "es" ? "/es/servicios" : "/services";
  const contactPath = locale === "es" ? "/es/contacto" : "/contact";

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <StructuredData data={buildCaseStudiesIndexStructuredData(locale)} />

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
                {copy.intro}
              </p>
            </div>

            <div className="rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-6">
              <Layers className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <p className="mt-5 font-serif text-5xl text-[#9f3c27]">
                {total.toString().padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm leading-6 text-[#5a6066]">
                {copy.countLabel}
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

      {groups.map((group) => (
        <section
          key={group.discipline}
          className="border-b border-[#e2d9cd] py-12 sm:py-16"
          aria-labelledby={`case-studies-${group.discipline}`}
        >
          <Container size="xl">
            <h2
              id={`case-studies-${group.discipline}`}
              className="font-serif text-3xl leading-tight sm:text-4xl"
            >
              {copy.disciplineHeadings[group.discipline]}
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-[#3f4548]">
              {copy.disciplineIntros[group.discipline]}
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {group.studies.map((study) => (
                <article
                  key={study.id}
                  className="flex flex-col rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] p-6 sm:p-8"
                >
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#5a6066]">
                    {study.eyebrow}
                  </p>
                  <h3 className="mt-5 max-w-xl font-serif text-2xl leading-tight sm:text-3xl">
                    <Link
                      href={getCaseStudyPath(study)}
                      className="underline decoration-[#e0d5c6] underline-offset-4 hover:decoration-[#e85d3e]"
                    >
                      {study.title}
                    </Link>
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[#3f4548] sm:text-base">
                    {study.summary}
                  </p>

                  <dl className="mt-6 grid gap-3 text-sm leading-6">
                    <div>
                      <dt className="font-medium text-[#5a6066]">
                        {copy.roleLabel}
                      </dt>
                      <dd className="text-[#3f4548]">{study.role}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-[#5a6066]">
                        {copy.deliverablesLabel}
                      </dt>
                      <dd className="text-[#3f4548]">{study.deliverables}</dd>
                    </div>
                  </dl>

                  <Link
                    href={getCaseStudyPath(study)}
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
      ))}

      <section className="bg-[#e7ded2] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
            {copy.relatedEyebrow}
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
            {copy.relatedTitle}
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
            <Link
              href={servicesPath}
              className="inline-flex min-h-11 items-center gap-2 font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
            >
              {locale === "es" ? "Ver servicios" : "View services"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={portfolioPath}
              className="inline-flex min-h-11 items-center gap-2 font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
            >
              {locale === "es" ? "Ver el portafolio" : "View the portfolio"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href={contactPath}
              className="inline-flex min-h-11 items-center gap-2 font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4"
            >
              <Mail className="size-4" aria-hidden="true" />
              {locale === "es" ? "Plantear un proyecto" : "Plan a project"}
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
