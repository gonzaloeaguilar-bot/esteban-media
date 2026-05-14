import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { SERVICES } from "@/lib/services";

/**
 * Five-up strip rendered on the homepage. Data lives in `lib/services.ts` so
 * the overview page and detail routes stay in sync with whatever copy/icon
 * tweaks land here. Names + blurbs are pulled from `messages/{locale}.json`
 * under `Services.items.<slug>`.
 */
export function ServicesStrip() {
  const t = useTranslations("Services");

  return (
    <section
      aria-labelledby="services-heading"
      className="border-y border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            {t("eyebrowStrip")}
          </p>
          <h2
            id="services-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("headlineStrip")}
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SERVICES.map(({ slug, Icon }) => (
            <li key={slug}>
              <Link
                href={`/services/${slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Icon
                  className="size-7 text-foreground/80 transition group-hover:text-foreground"
                  aria-hidden
                />
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {t(`items.${slug}.name`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`items.${slug}.blurb`)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
