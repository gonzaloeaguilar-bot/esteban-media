import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Languages,
  MapPin,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { PageUpdated } from "@/components/page-updated";
import { OwnerFactAnswers } from "@/components/owner-fact-answers";
import { YouTubeFacade } from "@/components/youtube-facade";
import { spanishServices } from "@/lib/spanish-site";
import { services } from "@/lib/site";
import { buildPortfolioWatchSchema } from "@/lib/portfolio-schema";
import { googleReviews, reviewSourceUrl } from "@/lib/client-reviews";
import { portfolioServiceLink } from "@/lib/portfolio-service-links";
import {
  CASE_STUDY_IDS,
  getCaseStudyPath,
  type CaseStudyId,
} from "@/lib/case-studies";
import { getPoster, isInstagramSource, isYouTubeSource, type PortfolioItem } from "@/lib/portfolio";
import {
  getPortfolioCategoryPath,
  getPortfolioCollectionPath,
  getPortfolioWatchCopy,
  getPortfolioWatchPath,
  getRelevantServiceId,
  isoDurationToSeconds,
  type PortfolioWatchLocale,
} from "@/lib/portfolio-watch";

/** "August 2026" / "agosto de 2026" from a Places API publish time. */
function reviewMonth(iso: string, locale: "en" | "es"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", { month: "long", year: "numeric", timeZone: "America/New_York" }).format(date);
}

type PortfolioWatchPageProps = {
  item: PortfolioItem;
  locale: PortfolioWatchLocale;
};

type PortfolioWatchLabels = {
  home: string;
  portfolio: string;
  breadcrumb: string;
  eyebrow: string;
  credits: string;
  year: string;
  location: string;
  uploadDate: string;
  duration: string;
  watch: string;
  source: string;
  language: string;
  projectDetails: string;
  projectDetailsLead: string;
  relatedService: string;
  relatedWork: string;
  relatedWorkLead: string;
  discuss: string;
  discussLead: string;
  contact: string;
  iframe: (title: string) => string;
};

const labels = {
  en: {
    home: "Home",
    portfolio: "Portfolio",
    breadcrumb: "Breadcrumb",
    eyebrow: "Selected project",
    credits: "Credits",
    year: "Year",
    location: "Location",
    uploadDate: "Public YouTube upload",
    duration: "Duration",
    watch: "Watch on YouTube",
    source: "Open original post",
    language: "Ver en español",
    projectDetails: "Available project details",
    projectDetailsLead:
      "These are the details preserved in Esteban’s approved portfolio.",
    relatedService: "Related service",
    relatedWork: "More selected work",
    relatedWorkLead: "Browse other projects in",
    discuss: "Discuss a related project",
    discussLead:
      "Share the goal, deadline, location, and material that already exists so Esteban can ask the right scoping questions.",
    contact: "Start a project",
    iframe: (title: string) => `${title} video player`,
  },
  es: {
    home: "Inicio",
    portfolio: "Portafolio",
    breadcrumb: "Migas de pan",
    eyebrow: "Proyecto seleccionado",
    credits: "Créditos",
    year: "Año",
    location: "Ubicación",
    uploadDate: "Publicación pública en YouTube",
    duration: "Duración",
    watch: "Ver en YouTube",
    source: "Abrir publicación original",
    language: "View in English",
    projectDetails: "Detalles disponibles del proyecto",
    projectDetailsLead:
      "Estos son los detalles conservados en el portafolio aprobado de Esteban.",
    relatedService: "Servicio relacionado",
    relatedWork: "Más trabajos seleccionados",
    relatedWorkLead: "Explora otros proyectos en",
    discuss: "Conversemos sobre un proyecto relacionado",
    discussLead:
      "Comparte la meta, fecha, ubicación y el material que ya existe para que Esteban pueda hacer las preguntas necesarias sobre el alcance.",
    contact: "Consultar un proyecto",
    iframe: (title: string) => `Reproductor de video: ${title}`,
  },
} satisfies Record<PortfolioWatchLocale, PortfolioWatchLabels>;

function formatUploadDate(uploadDate: string, locale: PortfolioWatchLocale) {
  const date = uploadDate.slice(0, 10);

  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function formatDuration(duration: string) {
  const totalSeconds = isoDurationToSeconds(duration);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return hours > 0
    ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    : `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function PortfolioWatchPage({ item, locale }: PortfolioWatchPageProps) {
  const copy = getPortfolioWatchCopy(item, locale);
  const text = labels[locale];
  const path = getPortfolioWatchPath(item.id, locale);
  const portfolioPath = getPortfolioCollectionPath(locale);
  const categoryPath = getPortfolioCategoryPath(item.category, locale);
  const otherLocale: PortfolioWatchLocale = locale === "es" ? "en" : "es";
  const languagePath = getPortfolioWatchPath(item.id, otherLocale);
  const serviceId = getRelevantServiceId(item.category, locale);
  const service =
    locale === "es"
      ? spanishServices.find((candidate) => candidate.id === serviceId)
      : services.find((candidate) => candidate.id === serviceId);

  if (!service) {
    throw new Error(`Missing ${locale} service mapping for ${item.id}`);
  }

  const isVideo = isYouTubeSource(item.media) || isInstagramSource(item.media);
  const poster = getPoster(item) ?? "";
  const mediaUrl = isYouTubeSource(item.media) || isInstagramSource(item.media)
    ? item.media.url
    : locale === "es"
    ? "/es/diseno-web-fort-lauderdale"
    : "/services/website-design-fort-lauderdale";

  // A dedicated service page (wedding, web and chatbot work) wins over the
  // generic services-index anchor.
  const serviceLink = portfolioServiceLink(item.id, locale);
  const servicePath =
    serviceLink?.href ??
    (locale === "es"
      ? `/es/servicios#${service.id}`
      : `/services#${service.id}`);
  const serviceTitle = serviceLink?.title ?? service.name;
  const serviceDetail = serviceLink?.detail ?? service.description;
  // Google reviews whose reviewer is this project's client (data/google-reviews.json
  // portfolioId). Quoted verbatim and attributed; never emitted as Review markup.
  const projectReviews = googleReviews.filter((review) => review.portfolioId === item.id);
  const homePath = locale === "es" ? "/es" : "/";
  const contactPath = locale === "es" ? "/es/contacto" : "/contact";
  const structuredData = buildPortfolioWatchSchema({
    path,
    locale: locale === "es" ? "es-US" : "en-US",
    title: copy.title,
    summary: copy.summary,
    credits: copy.credits,
    url: mediaUrl,
    poster: poster,
    video: isYouTubeSource(item.media)
      ? {
          videoId: item.media.videoId,
          uploadDate: item.media.uploadDate,
          duration: item.media.duration,
        }
      : undefined,
    companionVideos: item.companionVideos?.map((video) => ({ videoId: video.videoId, uploadDate: video.uploadDate, duration: video.duration, title: video.title ?? copy.title, summary: `Public YouTube upload: ${video.title ?? copy.title}.`, url: video.url, poster: video.poster })),
    location: item.location,
    breadcrumbs: [
      { name: text.home, path: homePath },
      { name: text.portfolio, path: portfolioPath },
      { name: copy.title, path },
    ],
  });
  const ServiceIcon = service.icon;

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="overflow-hidden bg-[#101214] py-10 text-[#f6f1ea] sm:py-14 lg:py-18">
        <Container size="xl">
          <nav
            aria-label={text.breadcrumb}
            className="flex flex-wrap items-center gap-2 text-sm text-[#b9b2aa]"
          >
            <Link href={homePath} className="hover:text-white">
              {text.home}
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={portfolioPath} className="hover:text-white">
              {text.portfolio}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-white">
              {copy.title}
            </span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,.55fr)] lg:items-center lg:gap-12">
            <div className="relative aspect-video overflow-hidden rounded-xl border border-white/15 bg-[#292b2d] shadow-2xl">
              <Image
                src={poster}
                alt={copy.title}
                fill
                priority
                sizes="(min-width: 1280px) 68vw, (min-width: 1024px) 62vw, 100vw"
                className="object-cover"
              />
              {isYouTubeSource(item.media) ? (
                <YouTubeFacade
                  videoId={item.media.videoId}
                  title={text.iframe(copy.title)}
                  playLabel={locale === "es" ? `Reproducir video: ${copy.title}` : `Play video: ${copy.title}`}
                  source={`portfolio_play_${item.id}`}
                />
              ) : isInstagramSource(item.media) ? (
                <a href={item.media.url} target="_blank" rel="noopener noreferrer" className="group absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white sm:p-8">
                  <span className="rounded-full bg-[var(--em-accent-ink)] px-4 py-2 text-sm font-medium">{text.source}</span>
                </a>
              ) : item.websiteUrl ? (
                <a
                  href={item.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 text-white sm:p-8"
                >
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--em-accent-ink)] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition group-hover:bg-[var(--em-accent-ink-hover)]">
                    {locale === "es" ? "Sitio Web En Vivo ↗" : "Live Website ↗"}
                  </span>
                  <p className="mt-2 font-serif text-2xl text-[#f6f1ea] group-hover:text-white group-hover:underline">
                    {copy.title}
                  </p>
                </a>
              ) : (
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white sm:p-8">
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--em-accent-ink)] px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {locale === "es" ? "Sistema web con IA" : "Web App & AI System"}
                  </span>
                  <p className="mt-2 font-serif text-2xl text-[#f6f1ea]">
                    {copy.title}
                  </p>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#f0b384]">
                {text.eyebrow} · {copy.categoryTitle}
              </p>
              <h1 className="mt-4 font-serif em-display">
                {copy.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-[#d8d0c7] sm:text-lg sm:leading-8">
                {copy.summary}
              </p>
              <PageUpdated path={path} locale={locale} className="mt-4 text-xs text-[#b9b2aa]" />
              <div className="mt-7 flex flex-wrap gap-3">
                {CASE_STUDY_IDS.includes(item.id as CaseStudyId) ? (
                  <Link
                    href={getCaseStudyPath(item.id as CaseStudyId, locale)}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white shadow-sm hover:bg-[var(--em-accent-ink-hover)]"
                  >
                    {locale === "es" ? "Ver Caso de Estudio Completo" : "Read Full Case Study"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                ) : null}
                {item.websiteUrl ? (
                  <a
                    href={item.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white shadow-sm hover:bg-[var(--em-accent-ink-hover)]"
                  >
                    {locale === "es" ? "Visitar Sitio Web En Vivo" : "Visit Live Website"}
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                ) : null}
                <a
                  href={mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f6f1ea] px-5 text-sm font-medium text-[#101214] hover:bg-white"
                >
                  {isVideo
                    ? (isInstagramSource(item.media) ? text.source : text.watch)
                    : locale === "es"
                    ? "Ver Servicio de Diseño Web & IA"
                    : "View Web & AI Service"}
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
                <Link
                  href={languagePath}
                  hrefLang={otherLocale === "es" ? "es-US" : "en-US"}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-5 text-sm font-medium text-white hover:border-white"
                >
                  <Languages className="size-4" aria-hidden="true" />
                  {text.language}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                {text.projectDetails}
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
                {copy.title}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[#3f4548] sm:text-base sm:leading-7">
                {text.projectDetailsLead}
              </p>
            </div>

            <dl className="grid gap-px overflow-hidden rounded-xl border border-[#d6ccc0] bg-[#d6ccc0] sm:grid-cols-2">
              <div className="bg-[#fbf6ef] p-5 sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6066]">
                  {text.credits}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-[#252a2d]">
                  {copy.credits}
                </dd>
              </div>
              {item.year ? (
                <div className="bg-[#fbf6ef] p-5">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6066]">
                    {text.year}
                  </dt>
                  <dd className="mt-2 font-serif text-2xl">{item.year}</dd>
                </div>
              ) : null}
              {item.location ? (
                <div className="bg-[#fbf6ef] p-5">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6066]">
                    {text.location}
                  </dt>
                  <dd className="mt-2 flex items-center gap-2 font-serif text-2xl">
                    <MapPin className="size-5 text-[#e85d3e]" aria-hidden="true" />
                    {item.location}
                  </dd>
                </div>
              ) : null}
              {isYouTubeSource(item.media) ? (
                <>
                  <div className="bg-[#fbf6ef] p-5">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6066]">
                      {text.uploadDate}
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-[#252a2d]">
                      <time dateTime={item.media.uploadDate}>
                        {formatUploadDate(item.media.uploadDate, locale)}
                      </time>
                    </dd>
                  </div>
                  <div className="bg-[#fbf6ef] p-5">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6066]">
                      {text.duration}
                    </dt>
                    <dd className="mt-2 text-sm leading-6 text-[#252a2d]">
                      <time dateTime={item.media.duration}>
                        {formatDuration(item.media.duration)}
                      </time>
                    </dd>
                  </div>
                </>
              ) : isInstagramSource(item.media) ? (
                <div className="bg-[#fbf6ef] p-5 sm:col-span-2">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6066]">{locale === "es" ? "Fuente pública" : "Public source"}</dt>
                  <dd className="mt-2 text-sm leading-6 text-[#252a2d]"><a href={item.media.url} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--em-accent-ink)] hover:underline">{text.source}</a></dd>
                </div>
              ) : (
                <>
                  <div className="bg-[#fbf6ef] p-5 sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6066]">
                      {locale === "es" ? "Tecnología & Plataforma" : "Tech Stack & Platform"}
                    </dt>
                    <dd className="mt-2 text-sm font-medium leading-6 text-[#252a2d]">
                      Next.js · React · AI Lead Capture Engine · Mobile-First SEO
                    </dd>
                  </div>
                  {item.websiteUrl ? (
                    <div className="bg-[#fbf6ef] p-5 sm:col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5a6066]">
                        {locale === "es" ? "Enlace al Sitio Web En Vivo" : "Live Website Link"}
                      </dt>
                      <dd className="mt-2 text-sm font-medium leading-6 text-[#252a2d]">
                        <a
                          href={item.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-semibold text-[var(--em-accent-ink)] hover:underline"
                        >
                          {item.websiteUrl}
                          <ExternalLink className="size-4" aria-hidden="true" />
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </>
              )}
            </dl>
          </div>
        </Container>
      </section>

      {item.companionVideos?.length ? (
        <section className="border-t border-[#d6ccc0] py-12 sm:py-16">
          <Container size="xl"><h2 className="font-serif text-3xl">{locale === "es" ? "Video adicional" : "Additional video"}</h2>
          {item.companionVideos.map((video) => <div key={video.videoId} className="mt-6 max-w-4xl"><h3 className="mb-3 text-xl font-medium">{video.title ?? copy.title}</h3><div className="aspect-video overflow-hidden rounded-xl"><YouTubeFacade videoId={video.videoId} title={text.iframe(video.title ?? copy.title)} playLabel={locale === "es" ? `Reproducir: ${video.title ?? copy.title}` : `Play: ${video.title ?? copy.title}`} source={`portfolio_play_${item.id}_companion`} /></div></div>)}</Container>
        </section>
      ) : null}

      {copy.results && copy.results.length > 0 ? (
        <section className="border-t border-[#d6ccc0] bg-[#fbf6ef] py-12 sm:py-16">
          <Container size="xl">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                {locale === "es" ? "Datos del proyecto" : "Project facts"}
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
                {locale === "es"
                  ? "¿Qué incluyó este proyecto?"
                  : "What did this project include?"}
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {copy.results.map((result, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-[#ddd4c8] bg-[#f6f1ea] p-6 shadow-sm"
                >
                  <span className="block font-serif text-4xl font-bold text-[var(--em-accent-ink)] sm:text-5xl">
                    {result.metric}
                  </span>
                  <span className="mt-3 block text-sm font-medium leading-relaxed text-[#252a2d]">
                    {result.label}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <OwnerFactAnswers path={path} />

      {projectReviews.length > 0 ? (
        <section
          className="border-t border-[#d6ccc0] py-12 sm:py-16"
          aria-labelledby="project-review-heading"
          data-section="portfolio_project_review"
        >
          <Container size="xl">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                {locale === "es" ? "Reseña de Google" : "Google review"}
              </p>
              <h2 id="project-review-heading" className="mt-3 font-serif text-3xl sm:text-4xl">
                {locale === "es"
                  ? `¿Qué dijo ${projectReviews[0].author} de Esteban Moreno Media?`
                  : `What did ${projectReviews[0].author} say about Esteban Moreno Media?`}
              </h2>
              {projectReviews.map((review) => (
                <figure key={review.publishedAt} className="mt-6">
                  <blockquote className="border-l-4 border-[#e85d3e] pl-5 font-serif text-2xl leading-snug text-[#101214]">
                    <p>&ldquo;{review.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-4 text-sm leading-6 text-[#5a6066]">
                    {review.author},{" "}
                    {locale === "es"
                      ? `reseña de ${review.rating} estrellas en Google, ${reviewMonth(review.publishedAt, "es")}.`
                      : `${review.rating}-star Google review, ${reviewMonth(review.publishedAt, "en")}.`}{" "}
                    <a
                      href={reviewSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="portfolio_review_source"
                      className="font-medium text-[#9f3c27] underline underline-offset-4"
                    >
                      {locale === "es" ? "Ver en Google" : "Read on Google"}
                    </a>
                  </figcaption>
                </figure>
              ))}
              <p className="mt-6 text-sm leading-6 text-[#252a2d]">
                {locale === "es"
                  ? "La reseña está publicada en el perfil de Google de Esteban Moreno Media y se reproduce palabra por palabra. Habla del trabajo de Esteban para el negocio; no describe un resultado medido de este proyecto."
                  : "The review is published on Esteban Moreno Media's Google profile and is reproduced word for word. It speaks about Esteban's work for the business; it does not describe a measured result of this project."}
              </p>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-y border-[#d6ccc0] bg-[#e7ded2] py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-5 lg:grid-cols-2">
            <Link
              href={servicePath}
              className="group rounded-xl border border-[#cfc4b7] bg-[#fbf6ef] p-6 transition hover:border-[#e85d3e] sm:p-7"
            >
              <ServiceIcon className="size-6 text-[#e85d3e]" aria-hidden="true" />
              <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                {text.relatedService}
              </p>
              <h2 className="mt-2 font-serif text-3xl">{serviceTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                {serviceDetail}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27] underline decoration-[#e85d3e]/40 underline-offset-4">
                {serviceTitle}
                <ArrowRight
                  className="size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>

            <Link
              href={categoryPath}
              className="group rounded-xl border border-[#cfc4b7] bg-[#101214] p-6 text-[#f6f1ea] transition hover:border-[#e85d3e] sm:p-7"
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#f0b384]">
                {text.relatedWork}
              </p>
              <h2 className="mt-3 font-serif text-3xl">{copy.categoryTitle}</h2>
              <p className="mt-3 text-sm leading-6 text-[#c9c1b8]">
                {text.relatedWorkLead} {copy.categoryTitle}.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white underline decoration-[#e85d3e] underline-offset-4">
                {text.portfolio}
                <ArrowRight
                  className="size-4 transition group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container size="xl">
          <div className="grid gap-8 rounded-2xl bg-[#101214] p-7 text-[#f6f1ea] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#f0b384]">
                {text.discuss}
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
                {copy.categoryTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#c9c1b8] sm:text-base sm:leading-7">
                {text.discussLead}
              </p>
            </div>
            <Link
              href={contactPath}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-6 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)]"
            >
              {text.contact}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
