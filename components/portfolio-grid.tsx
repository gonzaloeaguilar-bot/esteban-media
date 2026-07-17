import enMessages from "@/messages/en.json";
import esMessages from "@/messages/es.json";
import {
  getPortfolioCategories,
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

interface PortfolioGridProps {
  items: readonly PortfolioItem[];
  locale: PortfolioLocale;
}

export function PortfolioGrid({ items, locale }: PortfolioGridProps) {
  const liveItems = getLiveYouTubePortfolioItems(items);
  const categories = getPortfolioCategories().filter((category) =>
    liveItems.some((item) => item.category === category.id),
  );
  const labels = catalogs[locale].Portfolio.categories;

  if (liveItems.length === 0) {
    return null;
  }

  return (
    <div id="portfolio-collection">
      <nav
        aria-label={locale === "es" ? "Categorías del portafolio" : "Portfolio categories"}
        className="mb-12 flex flex-wrap gap-2 border-y border-[#d6ccc0] py-5"
      >
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#portfolio-${category.slug}`}
            className="inline-flex min-h-10 items-center rounded-full border border-[#cfc4b7] bg-[#fbf6ef] px-4 text-sm font-medium text-[#252a2d] transition hover:border-[#e85d3e] hover:text-[#9f3c27]"
          >
            {labels[category.id]?.shortLabel ?? labels[category.id]?.title ?? category.id}
          </a>
        ))}
      </nav>

      <div className="space-y-16 sm:space-y-20">
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
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#9f3c27]">
                    {locale === "es" ? "Colección" : "Collection"}
                  </p>
                  <h2
                    id={`portfolio-${category.slug}-heading`}
                    className="mt-2 font-serif text-3xl leading-tight sm:text-4xl"
                  >
                    {categoryTitle}
                  </h2>
                </div>
                <p className="shrink-0 text-sm tabular-nums text-[#5a6066]">
                  {categoryItems.length.toString().padStart(2, "0")}
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {categoryItems.map((item) => {
                  const copy = resolvePortfolioItemCopy(item, locale);

                  return (
                    <article
                      key={item.id}
                      id={item.id}
                      className="scroll-mt-24 overflow-hidden rounded-xl border border-[#d6ccc0] bg-[#fbf6ef] shadow-[0_16px_45px_rgba(52,42,33,0.06)]"
                    >
                      <PortfolioVideo
                        videoId={item.media.videoId}
                        url={item.media.url}
                        poster={item.media.poster}
                        title={copy.title}
                        locale={locale}
                      />
                      <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-7">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.12em] text-[#5a6066]">
                          {item.year ? <span>{item.year}</span> : null}
                          {item.year && item.location ? (
                            <span aria-hidden="true">·</span>
                          ) : null}
                          {item.location ? <span>{item.location}</span> : null}
                        </div>
                        <h3 className="mt-3 font-serif text-3xl leading-tight text-[#101214]">
                          {copy.title}
                        </h3>
                        {copy.summary ? (
                          <p className="mt-3 text-sm leading-6 text-[#3f4548]">
                            {copy.summary}
                          </p>
                        ) : null}
                        {copy.credits ? (
                          <p className="mt-5 border-t border-[#e1d8cd] pt-4 text-xs leading-5 text-[#5a6066]">
                            <span className="font-semibold uppercase tracking-[0.12em] text-[#252a2d]">
                              {locale === "es" ? "Créditos" : "Credits"}
                            </span>{" "}
                            · {copy.credits}
                          </p>
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
