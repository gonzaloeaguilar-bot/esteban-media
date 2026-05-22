import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPublishedLocalSeoPages } from "@/lib/local-seo-pages";

type LocalMarketStripProps = {
  locale: Locale;
};

export function LocalMarketStrip({ locale }: LocalMarketStripProps) {
  const pages = getPublishedLocalSeoPages(locale);
  const isSpanish = locale === "es";

  return (
    <section
      aria-labelledby="local-markets-heading"
      className="border-b border-border bg-muted/20 py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            {isSpanish ? "Mercados locales" : "Local markets"}
          </p>
          <h2
            id="local-markets-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {isSpanish
              ? "Páginas enfocadas en Fort Lauderdale, Broward y Miami."
              : "Focused pages for Fort Lauderdale, Broward, and Miami."}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {isSpanish
              ? "Estas páginas atacan búsquedas locales de video primero, sin depender de una página genérica de fotografía."
              : "These pages target video-first local searches instead of leaning on a generic photography page."}
          </p>
        </div>

        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {pages.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/${page.slug}`}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {page.cityLabel}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  {page.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {page.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {isSpanish ? "Ver página local" : "View local page"}
                  <ArrowRight
                    className="size-4 transition group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
