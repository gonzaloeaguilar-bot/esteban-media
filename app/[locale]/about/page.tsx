import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Equipment category descriptor.
 *
 * `key` maps into `About.equipment.categories.<key>` in the messages bundle.
 * `count` is the number of items declared in the `items.<n>` block. We loop
 * by a fixed count so any missing message key throws at build time instead of
 * silently dropping a bullet — same pattern used by the service-detail page.
 */
type EquipmentCategory = {
  key: "cameras" | "lenses" | "drone" | "audio" | "lighting" | "post";
  count: number;
};

const EQUIPMENT_CATEGORIES: readonly EquipmentCategory[] = [
  { key: "cameras", count: 3 },
  { key: "lenses", count: 5 },
  { key: "drone", count: 3 },
  { key: "audio", count: 3 },
  { key: "lighting", count: 3 },
  { key: "post", count: 3 },
] as const;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata.about" });
  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/about",
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ─────────────── Hero ─────────────── */}
      <section
        aria-labelledby="about-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {t("eyebrow")}
            </p>
            <h1
              id="about-heading"
              className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              {t("headline")}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("lede")}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── Bio + Portrait ─────────────── */}
      <section
        aria-labelledby="about-bio-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 px-4 sm:px-6 md:grid-cols-[1fr_1.2fr] md:gap-16 lg:px-8">
          {/* Portrait placeholder — no AI-generated photos. Replace with
              Esteban's real professional headshot when delivered. 4:5 ratio
              keeps it portrait-oriented and matches the AboutTeaser block on
              the homepage. */}
          <figure className="md:sticky md:top-24">
            <div
              aria-label={t("portrait.ariaLabel")}
              role="img"
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900"
            >
              {/* TODO: real asset from Esteban — professional headshot, 4:5 ratio. */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500/80 dark:text-zinc-400/80">
                  {t("portrait.placeholder")}
                </span>
              </div>
            </div>
            <figcaption className="mt-3 text-xs text-muted-foreground">
              {t("portrait.caption")}
            </figcaption>
          </figure>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {t("bio.eyebrow")}
            </p>
            <h2
              id="about-bio-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t("bio.heading")}
            </h2>
            {/* TODO: real bio from Esteban — keep cinematic, calm, confident.
                No corporate jargon, no superlatives without proof. Replace
                paragraph1/2/3 in messages/en.json + messages/es.json. */}
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("bio.paragraph1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("bio.paragraph2")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("bio.paragraph3")}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────── Brand statement ─────────────── */}
      <section
        aria-labelledby="about-brand-heading"
        className="border-b border-border bg-muted/40 py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            {t("brand.eyebrow")}
          </p>
          <h2
            id="about-brand-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            {t("brand.heading")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("brand.body")}
          </p>
        </div>
      </section>

      {/* ─────────────── Equipment ─────────────── */}
      <section
        aria-labelledby="about-equipment-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {t("equipment.eyebrow")}
            </p>
            <h2
              id="about-equipment-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t("equipment.heading")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("equipment.body")}
            </p>
          </div>

          {/* TODO: real kit list from Esteban — bodies, glass, drone model,
              audio chain, lighting kit, post workflow. Placeholder gear is
              accurate enough for SEO/structure but should be replaced before
              this page goes live on a real domain. */}
          <dl className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {EQUIPMENT_CATEGORIES.map(({ key, count }) => {
              const items = Array.from({ length: count }, (_, idx) =>
                t(`equipment.categories.${key}.items.${idx}`),
              );
              return (
                <div
                  key={key}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-7"
                >
                  <dt className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                    {t(`equipment.categories.${key}.label`)}
                  </dt>
                  <dd className="mt-4">
                    <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              );
            })}
          </dl>

          <p className="mt-10 text-xs italic text-muted-foreground">
            {t("equipment.footnote")}
          </p>
        </div>
      </section>

      {/* ─────────────── Contact CTA ───────────────
          Mirrors the ContactCTA component pattern but reads from About.cta so
          the page can introduce its own framing ("Work with Esteban") without
          duplicating the homepage CTA copy. */}
      <section
        aria-labelledby="about-cta-heading"
        className="bg-foreground py-20 text-background sm:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-background/60 sm:text-sm">
                {t("cta.eyebrow")}
              </p>
              <h2
                id="about-cta-heading"
                className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
              >
                {t("cta.heading")}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-background/70 sm:text-lg">
                {t("cta.body")}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base"
              >
                {t("cta.primary")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-background/30 px-5 py-3 text-sm font-medium text-background transition hover:border-background/60 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base"
              >
                {t("cta.secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
