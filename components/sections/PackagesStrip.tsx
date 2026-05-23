import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPriceRange, type Package, PACKAGES } from "@/lib/packages";

/**
 * Compact "packages" rail used on:
 *  - homepage (between LocalMarketStrip and AboutTeaser)
 *  - service detail pages (above the Inquiry CTA)
 *  - local SEO landing pages (between proof and FAQ)
 *
 * Why this exists: the `/packages` index sells the offers in depth, but the
 * highest-converting placement is on the page the buyer landed on. The strip
 * is intentionally short — three cards, one price anchor each, one CTA to the
 * full page. Anything richer belongs on `/packages`.
 *
 * Async server component so we can `getTranslations` (preserves zero-JS
 * delivery for what is otherwise static marketing content).
 */
type PackagesStripProps = {
  locale: Locale;
  /**
   * Optional subset of packages to show. Pass when calling from a page where
   * not every package is a fit (e.g. the Edit-Only Starter is irrelevant on
   * the drone landing page). Defaults to the full canonical list.
   */
  packages?: readonly Package[];
  /**
   * Visual variant. `"default"` matches LocalMarketStrip's muted background;
   * `"inverted"` flips to the dark `bg-foreground` band used by ContactCTA so
   * the strip can break up the visual rhythm when stacked next to a similar
   * muted section.
   */
  variant?: "default" | "inverted";
  /**
   * Optional override for the section heading. Useful on service/local pages
   * where the strip is contextual ("Packages for {service}") rather than a
   * generic "Anchored offers" rail.
   */
  headingOverride?: string;
};

export async function PackagesStrip({
  locale,
  packages = PACKAGES,
  variant = "default",
  headingOverride,
}: PackagesStripProps) {
  const t = await getTranslations({ locale, namespace: "Packages" });

  const isInverted = variant === "inverted";
  const sectionClass = isInverted
    ? "bg-foreground py-20 text-background sm:py-24"
    : "border-b border-border bg-muted/20 py-20 sm:py-24";
  const eyebrowClass = isInverted
    ? "text-xs font-medium uppercase tracking-[0.25em] text-background/60 sm:text-sm"
    : "text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm";
  const headingClass = isInverted
    ? "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
    : "mt-3 text-3xl font-semibold tracking-tight sm:text-4xl";
  const bodyClass = isInverted
    ? "mt-4 max-w-3xl text-base leading-relaxed text-background/70 sm:text-lg"
    : "mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg";
  const cardClass = isInverted
    ? "group flex h-full flex-col rounded-2xl border border-background/20 bg-background/5 p-6 transition hover:-translate-y-0.5 hover:border-background/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
    : "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  return (
    <section
      aria-labelledby="packages-strip-heading"
      className={sectionClass}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className={eyebrowClass}>{t("stripEyebrow")}</p>
            <h2 id="packages-strip-heading" className={headingClass}>
              {headingOverride ?? t("stripHeading")}
            </h2>
            <p className={bodyClass}>{t("stripBody")}</p>
          </div>
          <Link
            href="/packages"
            className={
              isInverted
                ? "inline-flex items-center gap-2 self-start rounded-lg border border-background/30 px-5 py-3 text-sm font-medium text-background transition hover:border-background/60 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base md:self-end"
                : "inline-flex items-center gap-2 self-start rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base md:self-end"
            }
          >
            {t("stripCta")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul
          role="list"
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {packages.map(({ slug, Icon, priceRangeUsd }) => (
            <li key={slug}>
              <Link href={`/packages#${slug}`} className={cardClass}>
                <Icon
                  className={
                    isInverted
                      ? "size-7 text-background/80 transition group-hover:text-background"
                      : "size-7 text-foreground/80 transition group-hover:text-foreground"
                  }
                  aria-hidden
                />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {t(`items.${slug}.name`)}
                </h3>
                <p
                  className={
                    isInverted
                      ? "mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-background/70"
                      : "mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground"
                  }
                >
                  {t(`items.${slug}.tagline`)}
                </p>
                <p
                  className={
                    isInverted
                      ? "mt-5 text-sm font-medium text-background"
                      : "mt-5 text-sm font-medium text-foreground"
                  }
                >
                  <span className="opacity-70">{t("startingAt")} </span>
                  {formatPriceRange(priceRangeUsd, locale)}
                </p>
                <span
                  className={
                    isInverted
                      ? "mt-5 inline-flex items-center gap-2 text-sm font-medium text-background"
                      : "mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  }
                >
                  {t("cardCta")}
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
