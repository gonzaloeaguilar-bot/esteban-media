import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";
import Link from "next/link";
import Image from "next/image";
import {
  CASE_STUDY_IDS,
  getCaseStudiesIndexPath,
  getCaseStudyPath,
  type CaseStudyId,
} from "@/lib/case-studies";
import {
  getPortfolioCategories,
  getPoster,
  mediaOrientation,
  type PortfolioItem,
  type YouTubeSource,
} from "@/lib/portfolio";

import { PortfolioVideo } from "@/components/portfolio-video";

export type PortfolioLocale = "en" | "es";

interface PortfolioItemTranslation {
  title: string;
  summary: string;
  credits: string;
}

interface PortfolioCatalog {
  Portfolio: {
    categories: Record<string, { title: string; shortLabel?: string }>;
    items: Record<string, PortfolioItemTranslation>;
  };
}

const catalogs = {
  en: enMessages as PortfolioCatalog,
  es: esMessages as PortfolioCatalog,
} satisfies Record<PortfolioLocale, PortfolioCatalog>;

export type ResolvedPortfolioItemCopy = PortfolioItemTranslation;

export function resolvePortfolioItemCopy(
  item: PortfolioItem,
  locale: PortfolioLocale,
): ResolvedPortfolioItemCopy {
  const catalog = catalogs[locale].Portfolio.items;
  const title = catalog[item.titleI18nKey ?? ""]?.title ?? item.title;
  const summary = catalog[item.descriptionI18nKey ?? ""]?.summary ?? "";
  const credits = catalog[item.creditsI18nKey ?? ""]?.credits ?? "";

  return { title, summary, credits };
}

export function getLiveYouTubePortfolioItems(
  items: readonly PortfolioItem[],
): readonly (PortfolioItem & { media: YouTubeSource })[] {
  return items.filter(
    (item): item is PortfolioItem & { media: YouTubeSource } =>
      item.status === "live" && item.media.kind === "youtube",
  );
}

function formatDuration(duration?: string): string | null {
  if (!duration) return null;
  const match = duration.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return null;
  const m = match[1] ?? "0";
  const s = (match[2] ?? "0").padStart(2, "0");
  return `${m}:${s} min`;
}

interface PortfolioGridProps {
  items: readonly PortfolioItem[];
  locale: PortfolioLocale;
}

export function PortfolioGrid({ items, locale }: PortfolioGridProps) {
  const liveItems = items.filter(
    (item) => item.status === "live" && item.media.kind !== "placeholder",
  );
  const categories = getPortfolioCategories().filter((category) =>
    liveItems.some((item) => item.category === category.id),
  );
  const labels = catalogs[locale].Portfolio.categories;

  if (liveItems.length === 0) {
    return null;
  }

  const caseStudiesLabel =
    locale === "es" ? "Ver casos de estudio →" : "View case studies →";

  return (
    <div id="portfolio-collection" className="space-y-12 sm:space-y-16">
      {/* Category anchor bar with responsive horizontal touch scrolling */}
      <nav
        aria-label={
          locale === "es"
            ? "Categorías del portafolio"
            : "Portfolio categories"
        }
        className="flex flex-col gap-4 border-y border-[#d6ccc0] py-5 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0 scrollbar-none">
          {categories.map((category) => {
            const count = liveItems.filter(
              (i) => i.category === category.id,
            ).length;
            const categoryTitle =
              labels[category.id]?.shortLabel ??
              labels[category.id]?.title ??
              category.id;

            return (
              <a
                key={category.id}
                href={`#portfolio-${category.slug}`}
                className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-[#cfc4b7] bg-[#fbf6ef] px-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#252a2d] transition hover:border-[#9f3c27] hover:bg-[#101214] hover:text-white"
              >
                {categoryTitle} ({count})
              </a>
            );
          })}
        </div>
        <Link
          href={getCaseStudiesIndexPath(locale)}
          className="inline-flex min-h-10 shrink-0 items-center gap-1.5 self-start rounded-full border border-[#cfc4b7] bg-[#fbf6ef] px-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#252a2d] transition hover:border-[#e85d3e] hover:text-[#9f3c27] sm:self-auto"
        >
          {caseStudiesLabel}
        </Link>
      </nav>

      {/* Categories with clean cards */}
      <div className="space-y-14 sm:space-y-18">
        {categories.map((category) => {
          const categoryItems = liveItems.filter(
            (item) => item.category === category.id,
          );
          const categoryTitle = labels[category.id]?.title ?? category.id;

          return (
            <section
              key={category.id}
              id={`portfolio-${category.slug}`}
              aria-labelledby={`portfolio-${category.slug}-heading`}
              className="scroll-mt-24"
            >
              <div className="mb-6 flex items-end justify-between gap-6 border-b border-[#d6ccc0] pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f3c27]">
                    {locale === "es" ? "Categoría" : "Category"}
                  </p>
                  <h2
                    id={`portfolio-${category.slug}-heading`}
                    className="mt-1 font-serif text-2xl sm:text-3xl text-[#101214]"
                  >
                    {categoryTitle}
                  </h2>
                </div>
                <p className="shrink-0 font-mono text-xs tabular-nums text-[#5a6066]">
                  {categoryItems.length.toString().padStart(2, "0")} {locale === "es" ? "proyectos" : "projects"}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {categoryItems.map((item) => {
                  const copy = resolvePortfolioItemCopy(item, locale);
                  const projectPath =
                    locale === "es"
                      ? `/es/portafolio/${item.id}`
                      : `/portfolio/${item.id}`;
                  const isYouTube = item.media.kind === "youtube";
                  const duration =
                    item.media.kind === "youtube"
                      ? formatDuration(item.media.duration)
                      : null;

                  return (
                    <article
                      key={item.id}
                      id={item.id}
                      className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#d6ccc0] bg-[#fbf6ef] shadow-[0_12px_32px_rgba(52,42,33,0.06)] transition hover:shadow-[0_18px_44px_rgba(52,42,33,0.1)] flex flex-col justify-between"
                    >
                      <div>
                        {item.media.kind === "youtube" ? (
                          <PortfolioVideo
                            videoId={item.media.videoId}
                            url={item.media.url}
                            poster={item.media.poster}
                            title={copy.title}
                            locale={locale}
                            orientation={mediaOrientation(item.media)}
                            hideExtraLinks
                          />
                        ) : (
                          <Link
                            href={projectPath}
                            className="relative block aspect-video overflow-hidden bg-[#101214] group"
                          >
                            <Image
                              src={getPoster(item) ?? "/portfolio/exatlon.jpg"}
                              alt={copy.title}
                              fill
                              sizes="(min-width: 1024px) 50vw, 100vw"
                              className="object-cover transition duration-500 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition group-hover:opacity-60" />
                            <span className="absolute bottom-3 left-3 rounded-full bg-black/75 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                              {item.websiteUrl
                                ? locale === "es"
                                  ? "Sitio web interactivo"
                                  : "Interactive website"
                                : locale === "es"
                                  ? "Campaña de video"
                                  : "Video campaign"}
                            </span>
                          </Link>
                        )}

                        <div className="px-5 pt-5 sm:px-6">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#9f3c27]">
                            {item.year ? (
                              <span>{item.year}</span>
                            ) : null}
                            {duration ? (
                              <>
                                <span aria-hidden="true" className="text-[#cfc4b7]">·</span>
                                <span className="font-mono text-[#5a6066]">{duration}</span>
                              </>
                            ) : null}
                            {item.location ? (
                              <>
                                <span aria-hidden="true" className="text-[#cfc4b7]">·</span>
                                <span className="text-[#5a6066]">{item.location}</span>
                              </>
                            ) : null}
                          </div>

                          <h3 className="mt-2 font-serif text-2xl leading-snug text-[#101214]">
                            {copy.title}
                          </h3>

                          {copy.summary ? (
                            <p className="mt-2 text-sm leading-6 text-[#3f4548]">
                              {copy.summary}
                            </p>
                          ) : null}

                          {copy.credits ? (
                            <p className="mt-4 border-t border-[#e8dfd3] pt-3 text-xs leading-5 text-[#6c7278]">
                              <span className="font-semibold uppercase tracking-[0.1em] text-[#252a2d]">
                                {locale === "es" ? "Créditos" : "Credits"}
                              </span>{" "}
                              · {copy.credits}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#e8dfd3] px-5 py-4 sm:px-6 bg-[#f7f2ea]">
                        <Link
                          href={projectPath}
                          className="inline-flex min-h-10 items-center text-sm font-semibold text-[#9f3c27] underline decoration-[#c84a2c]/40 underline-offset-4 transition hover:text-[#7f2f20]"
                        >
                          {locale === "es"
                            ? `Ver detalles de ${copy.title} →`
                            : `View ${copy.title} details →`}
                        </Link>
                        {CASE_STUDY_IDS.includes(item.id as CaseStudyId) ? (
                          <Link
                            href={getCaseStudyPath(item.id as CaseStudyId, locale)}
                            className="inline-flex min-h-10 items-center rounded-full bg-[#101214] px-4 py-1 text-xs font-semibold text-white transition hover:bg-[var(--em-accent-ink)]"
                          >
                            {locale === "es" ? "Caso de estudio →" : "Case study →"}
                          </Link>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
