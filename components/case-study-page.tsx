import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Languages,
  MapPin,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  buildCaseStudyStructuredData,
  getCaseStudyAlternates,
  type CaseStudy,
} from "@/lib/case-studies";
import { isYouTubeSource, getPortfolioItemById } from "@/lib/portfolio";

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
          className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[#c84a2c]"
        >
          {label}
        </a>,
      );
    } else {
      parts.push(
        <Link
          key={`${href}-${match.index}`}
          href={href}
          className="font-medium text-[#9f3c27] underline decoration-[#e85d3e] underline-offset-4 hover:text-[#c84a2c]"
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

interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const isSpanish = caseStudy.locale === "es";
  const alternates = getCaseStudyAlternates(caseStudy);
  const alternatePath = alternates[isSpanish ? "en-US" : "es-US"];
  const structuredData = buildCaseStudyStructuredData(caseStudy);

  const homePath = isSpanish ? "/es" : "/";
  const portfolioPath = isSpanish ? "/es/portafolio" : "/portfolio";
  const portfolioItem = getPortfolioItemById(caseStudy.id);

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="overflow-hidden bg-[#101214] py-10 text-[#f6f1ea] sm:py-14 lg:py-18">
        <Container size="xl">
          <nav
            aria-label={isSpanish ? "Migas de pan" : "Breadcrumb"}
            className="flex flex-wrap items-center gap-2 text-sm text-[#b9b2aa]"
          >
            <Link href={homePath} className="hover:text-white">
              {isSpanish ? "Inicio" : "Home"}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={portfolioPath} className="hover:text-white">
              {isSpanish ? "Portafolio" : "Portfolio"}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#d8d0c7]">
              {isSpanish ? "Casos de Estudio" : "Case Studies"}
            </span>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-white">
              {caseStudy.client}
            </span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:items-center lg:gap-12">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/15 bg-[#292b2d] shadow-2xl">
              <Image
                src={caseStudy.posterUrl}
                alt={caseStudy.title}
                fill
                priority
                sizes="(min-width: 1280px) 65vw, (min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
              {portfolioItem && isYouTubeSource(portfolioItem.media) ? (
                <iframe
                  className="absolute inset-0 size-full border-0"
                  src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                    portfolioItem.media.videoId,
                  )}?playsinline=1&rel=0`}
                  title={`${caseStudy.title} video`}
                  loading="eager"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : caseStudy.websiteUrl ? (
                <a
                  href={caseStudy.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white sm:p-8"
                >
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#c84a2c] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition group-hover:bg-[#a93e29]">
                    {isSpanish ? "Ver Sitio Web en Vivo ↗" : "View Live Website ↗"}
                  </span>
                  <p className="mt-2 font-serif text-2xl text-[#f6f1ea] group-hover:text-white group-hover:underline">
                    {caseStudy.title}
                  </p>
                </a>
              ) : (
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white sm:p-8">
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#c84a2c] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {isSpanish ? "Caso de Estudio Publicado" : "Published Case Study"}
                  </span>
                  <p className="mt-2 font-serif text-2xl text-[#f6f1ea]">
                    {caseStudy.title}
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#f0b384]">
                {caseStudy.eyebrow}
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-5xl">
                {caseStudy.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-[#d8d0c7] sm:text-lg sm:leading-8">
                {caseStudy.summary}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={caseStudy.serviceLink.href}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[#a93e29]"
                >
                  {caseStudy.serviceLink.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href={alternatePath}
                  hrefLang={isSpanish ? "en-US" : "es-US"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-sm font-medium text-white transition hover:border-white"
                >
                  <Languages className="size-4" aria-hidden="true" />
                  {isSpanish ? "View in English" : "Ver en español"}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Facts & Specifications Bar */}
      <section className="border-b border-[#d6ccc0] bg-[#efe7db] py-8 sm:py-10">
        <Container size="xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {caseStudy.keyFacts.map((fact, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 shadow-sm"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9f3c27]">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm leading-snug font-medium text-[#252a2d]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Main Narrative & Analysis Content */}
      <section className="py-12 sm:py-16 lg:py-20">
        <Container size="xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.38fr)] lg:items-start lg:gap-16">
            <article className="space-y-12 sm:space-y-16">
              {caseStudy.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="font-serif text-3xl leading-tight text-[#101214] sm:text-4xl">
                    {section.heading}
                  </h2>
                  {section.subheading ? (
                    <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#9f3c27]">
                      {section.subheading}
                    </p>
                  ) : null}

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base leading-7 text-[#3f4548] sm:text-lg sm:leading-8"
                    >
                      {renderFormattedText(p)}
                    </p>
                  ))}

                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="mt-4 space-y-2.5 rounded-xl border border-[#ddd4c8] bg-[#fbf6ef] p-5 sm:p-6">
                      {section.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-sm leading-6 text-[#252a2d] sm:text-base"
                        >
                          <CheckCircle2
                            className="mt-1 size-4 shrink-0 text-[#c84a2c]"
                            aria-hidden="true"
                          />
                          <span>{renderFormattedText(bullet)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.callout ? (
                    <div className="mt-6 rounded-xl border-l-4 border-[#c84a2c] bg-[#efe7db] p-5 sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9f3c27]">
                        {section.callout.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#252a2d] sm:text-base">
                        {section.callout.text}
                      </p>
                    </div>
                  ) : null}
                </div>
              ))}

              {/* Scoping Questions Section */}
              <div className="rounded-2xl border border-[#d6ccc0] bg-[#efe7db] p-6 sm:p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9f3c27]">
                  <HelpCircle className="size-4 text-[#c84a2c]" aria-hidden="true" />
                  <span>
                    {isSpanish
                      ? "Preguntas de Alcance para Proyectos Similares"
                      : "Scoping Questions for Comparable Projects"}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-[#101214]">
                  {isSpanish
                    ? "¿Cómo evaluar y planificar un proyecto con requerimientos afines?"
                    : "How to evaluate and scope a project with comparable needs?"}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                  {isSpanish
                    ? "Cada producción o desarrollo web parte de preguntas claras sobre el material existente, los objetivos del negocio y los entregables requeridos. No se establecen precios fijos antes de evaluar estas variables:"
                    : "Every video production or web development project begins with clear scoping questions regarding available assets, business objectives, and required deliverables. No fixed pricing is quoted before evaluating these factors:"}
                </p>
                <ul className="mt-5 space-y-3">
                  {caseStudy.scopingQuestions.map((q, qIdx) => (
                    <li
                      key={qIdx}
                      className="flex items-start gap-3 text-sm leading-6 text-[#252a2d] sm:text-base"
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#101214] text-xs font-bold text-white">
                        {qIdx + 1}
                      </span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Sidebar Summary & Bridges */}
            <aside className="sticky top-8 space-y-6">
              <div className="rounded-xl border border-[#d6ccc0] bg-[#fbf6ef] p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9f3c27]">
                  {isSpanish ? "Ficha Técnica" : "Project Summary"}
                </p>
                <dl className="mt-4 space-y-3 divide-y divide-[#e8ded2] text-sm">
                  <div className="pt-2">
                    <dt className="text-xs text-[#5a6066]">
                      {isSpanish ? "Cliente / Entidad" : "Client / Entity"}
                    </dt>
                    <dd className="mt-0.5 font-medium text-[#101214]">
                      {caseStudy.client}
                    </dd>
                  </div>
                  <div className="pt-3">
                    <dt className="text-xs text-[#5a6066]">
                      {isSpanish ? "Rol de Esteban" : "Esteban's Role"}
                    </dt>
                    <dd className="mt-0.5 font-medium text-[#101214]">
                      {caseStudy.role}
                    </dd>
                  </div>
                  {caseStudy.year ? (
                    <div className="pt-3">
                      <dt className="text-xs text-[#5a6066]">
                        {isSpanish ? "Año" : "Year"}
                      </dt>
                      <dd className="mt-0.5 font-medium text-[#101214]">
                        {caseStudy.year}
                      </dd>
                    </div>
                  ) : null}
                  {caseStudy.location ? (
                    <div className="pt-3">
                      <dt className="text-xs text-[#5a6066]">
                        {isSpanish ? "Ubicación" : "Location"}
                      </dt>
                      <dd className="mt-0.5 flex items-center gap-1.5 font-medium text-[#101214]">
                        <MapPin className="size-3.5 text-[#c84a2c]" aria-hidden="true" />
                        {caseStudy.location}
                      </dd>
                    </div>
                  ) : null}
                  <div className="pt-3">
                    <dt className="text-xs text-[#5a6066]">
                      {isSpanish ? "Entregables" : "Deliverables"}
                    </dt>
                    <dd className="mt-0.5 font-medium text-[#101214]">
                      {caseStudy.deliverables}
                    </dd>
                  </div>
                  {caseStudy.agencyContext ? (
                    <div className="pt-3">
                      <dt className="text-xs text-[#5a6066]">
                        {isSpanish ? "Contexto de Agencia" : "Agency Context"}
                      </dt>
                      <dd className="mt-0.5 font-medium text-[#101214]">
                        {caseStudy.agencyContext}
                      </dd>
                    </div>
                  ) : null}
                  {caseStudy.reviewNote ? (
                    <div className="pt-3">
                      <dt className="text-xs text-[#5a6066]">
                        {isSpanish ? "Validación Pública" : "Public Verification"}
                      </dt>
                      <dd className="mt-0.5 text-xs text-[#3f4548]">
                        {caseStudy.reviewNote}
                        {caseStudy.reviewUrl ? (
                          <a
                            href={caseStudy.reviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1.5 inline-flex items-center gap-1 font-semibold text-[#c84a2c] hover:underline"
                          >
                            {isSpanish ? "Ver Perfil en Google Maps" : "View Google Maps Profile"}
                            <ExternalLink className="size-3" aria-hidden="true" />
                          </a>
                        ) : null}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              {/* Service Link Bridge Card */}
              <div className="rounded-xl border border-[#d6ccc0] bg-[#101214] p-6 text-[#f6f1ea]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#f0b384]">
                  <Sparkles className="size-4 text-[#e85d3e]" aria-hidden="true" />
                  <span>{isSpanish ? "Servicio Relacionado" : "Related Service"}</span>
                </div>
                <h4 className="mt-2 font-serif text-2xl">
                  {caseStudy.serviceLink.label}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[#c9c1b8]">
                  {caseStudy.serviceLink.description}
                </p>
                <Link
                  href={caseStudy.serviceLink.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f0b384] hover:text-white"
                >
                  {isSpanish ? "Explorar este servicio" : "Explore this service"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Portfolio Link Bridge Card */}
              <div className="rounded-xl border border-[#d6ccc0] bg-[#fbf6ef] p-5 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6066]">
                  {isSpanish ? "Portafolio Principal" : "Portfolio Source"}
                </p>
                <Link
                  href={caseStudy.portfolioLink.href}
                  className="mt-2 inline-flex items-center gap-1.5 font-medium text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 hover:text-[#7f2f20]"
                >
                  {caseStudy.portfolioLink.label}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Bottom Contact CTA Strip */}
      <section className="border-t border-[#d6ccc0] bg-[#e7ded2] py-14 sm:py-18">
        <Container size="xl">
          <div className="grid gap-8 rounded-2xl bg-[#101214] p-7 text-[#f6f1ea] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#f0b384]">
                {isSpanish ? "Iniciar Consulta" : "Start a Project"}
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                {isSpanish
                  ? "¿Tienes un proyecto similar en mente?"
                  : "Have a comparable project in mind?"}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#c9c1b8] sm:text-base sm:leading-7">
                {isSpanish
                  ? "Comparte la meta, la locación, el material que ya existe y el plazo estimado. Esteban dará seguimiento con las preguntas clave de alcance."
                  : "Share the goal, location, existing source material, and timeline. Esteban will follow up with the essential scoping questions."}
              </p>
            </div>
            <Link
              href={caseStudy.contactLink.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white transition hover:bg-[#a93e29]"
            >
              {caseStudy.contactLink.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
