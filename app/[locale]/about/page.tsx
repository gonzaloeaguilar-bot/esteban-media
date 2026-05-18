import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { EQUIPMENT_GROUPS } from "@/lib/about";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.about" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ─────────────────────────────────────────────────────────────
          Hero + portrait
          ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-hero-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16 lg:px-8">
          {/* Portrait placeholder — no AI-generated photos. Replace with
              Esteban's real headshot when delivered. */}
          {/* TODO: real asset from Esteban — professional headshot, 4:5 ratio. */}
          <figure className="md:order-2">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500/80 dark:text-zinc-400/80">
                  {t("portrait.placeholder")}
                </span>
              </div>
            </div>
            <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t("portrait.caption")}
            </figcaption>
          </figure>

          <div className="md:order-1">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {t("hero.eyebrow")}
            </p>
            <h1
              id="about-hero-heading"
              className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              {t("hero.title")}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          Bio
          ───────────────────────────────────────────────────────────── */}
      {/* TODO: real bio from Esteban — keep cinematic, calm, confident.
          No corporate jargon, no superlatives without proof. */}
      <section
        aria-labelledby="about-bio-heading"
        className="border-b border-border bg-background py-20 sm:py-24"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:px-8">
          <div>
            <h2
              id="about-bio-heading"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t("bio.heading")}
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>{t("bio.paragraph1")}</p>
            <p>{t("bio.paragraph2")}</p>
            <p>{t("bio.paragraph3")}</p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          Brand statement
          ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-brand-heading"
        className="border-b border-border bg-muted/30 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2
            id="about-brand-heading"
            className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground"
          >
            {t("brand.heading")}
          </h2>
          <p className="mt-6 text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
            {t("brand.body")}
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          Equipment
          ───────────────────────────────────────────────────────────── */}
      {/* TODO: real gear list from Esteban — every item is a placeholder. */}
      <section
        aria-labelledby="about-equipment-heading"
        className="border-b border-border bg-background py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2
              id="about-equipment-heading"
              className="text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t("equipment.heading")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("equipment.lede")}
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EQUIPMENT_GROUPS.map(({ key, Icon, itemCount }) => (
              <li key={key} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between gap-3">
                    <Icon
                      className="size-7 text-foreground/80"
                      aria-hidden
                    />
                    <span className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      {t("equipment.placeholderBadge")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {t(`equipment.groups.${key}.label`)}
                  </h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {Array.from({ length: itemCount }).map((_, i) => (
                      <li key={i} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground/60"
                        />
                        <span>{t(`equipment.groups.${key}.items.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          Closing CTA
          ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-cta-heading"
        className="bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="about-cta-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            {t("cta.heading")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("cta.body")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t("cta.ctaPrimary")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t("cta.ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
