import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ABOUT_COPY, type AboutCopy } from "@/lib/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Esteban — South-Florida-based visual storyteller across aerial, photography, videography, and post-production. Bilingual EN/ES.",
};

/**
 * /about — static server-rendered bio + brand statement + equipment list.
 *
 * Bilingual EN/ES is rendered side-by-side from a co-located copy dictionary
 * (`lib/content/about.ts`) so the eventual next-intl wiring (P1 backlog
 * "Wire next-intl bilingual EN/ES") is a 1:1 lift — same strings, same
 * structure, just routed under `/en/about` and `/es/about`.
 *
 * Every ES block is wrapped with `{/* TRANSLATION REVIEW NEEDED *\/}` so
 * a native-speaker pass can grep them out in one shot before launch.
 */
export default function AboutPage() {
  const en = ABOUT_COPY.en;
  const es = ABOUT_COPY.es;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection en={en} es={es} />
      <BioSection en={en} es={es} />
      <BrandStatementSection en={en} es={es} />
      <EquipmentSection en={en} es={es} />
      <CtaSection en={en} es={es} />
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/*  Sections                                                                  */
/* -------------------------------------------------------------------------- */

type BilingualProps = { en: AboutCopy; es: AboutCopy };

function HeroSection({ en, es }: BilingualProps) {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="border-b border-border py-20 sm:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 px-4 sm:px-6 md:grid-cols-[1fr_minmax(0,360px)] md:gap-16 lg:px-8">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            {en.eyebrow}
          </p>
          <h1
            id="about-hero-heading"
            className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            {en.heading}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {en.intro}
          </p>

          {/* TRANSLATION REVIEW NEEDED */}
          <div lang="es" className="mt-8 border-l-2 border-border pl-5">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {es.eyebrow}
            </p>
            <p className="mt-3 text-xl font-medium tracking-tight sm:text-2xl">
              {es.heading}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {es.intro}
            </p>
          </div>
        </div>

        <PortraitPlaceholder enAlt={en.portraitAlt} esAlt={es.portraitAlt} />
      </div>
    </section>
  );
}

function BioSection({ en, es }: BilingualProps) {
  return (
    <section
      aria-labelledby="about-bio-heading"
      className="border-b border-border py-16 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-4 sm:px-6 md:grid-cols-2 md:gap-16 lg:px-8">
        <div>
          <h2
            id="about-bio-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {en.bio.heading}
          </h2>
          {/* TODO: real bio from Esteban */}
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {en.bio.paragraphs.map((p, i) => (
              <p key={`bio-en-${i}`}>{p}</p>
            ))}
          </div>
        </div>

        {/* TRANSLATION REVIEW NEEDED */}
        <div lang="es">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {es.bio.heading}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {es.bio.paragraphs.map((p, i) => (
              <p key={`bio-es-${i}`}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandStatementSection({ en, es }: BilingualProps) {
  return (
    <section
      aria-labelledby="about-brand-heading"
      className="border-b border-border bg-muted/30 py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="about-brand-heading"
          className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm"
        >
          {en.brandStatement.heading}
        </h2>
        <blockquote className="mt-6 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          “{en.brandStatement.quote}”
        </blockquote>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {en.brandStatement.detail}
        </p>

        {/* TRANSLATION REVIEW NEEDED */}
        <div lang="es" className="mx-auto mt-10 max-w-2xl border-t border-border pt-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            {es.brandStatement.heading}
          </p>
          <p className="mt-4 text-xl font-medium tracking-tight sm:text-2xl">
            “{es.brandStatement.quote}”
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {es.brandStatement.detail}
          </p>
        </div>
      </div>
    </section>
  );
}

function EquipmentSection({ en, es }: BilingualProps) {
  return (
    <section
      aria-labelledby="about-equipment-heading"
      className="border-b border-border py-16 sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2
            id="about-equipment-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {en.equipment.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {en.equipment.intro}
          </p>
          {/* TODO: real equipment list from Esteban */}
          <p className="mt-3 text-xs italic text-muted-foreground">
            {en.equipment.disclaimer}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {en.equipment.categories.map((category, idx) => {
            const esCategory = es.equipment.categories[idx];
            return (
              <li
                key={category.id}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="text-base font-semibold tracking-tight">
                  {category.label}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {category.items.map((item, i) => (
                    <li key={`${category.id}-en-${i}`} className="flex gap-2">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {esCategory ? (
                  <>
                    {/* TRANSLATION REVIEW NEEDED */}
                    <div lang="es" className="mt-5 border-t border-border pt-4">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {esCategory.label}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                        {esCategory.items.map((item, i) => (
                          <li
                            key={`${category.id}-es-${i}`}
                            className="flex gap-2"
                          >
                            <span
                              aria-hidden
                              className="mt-2 size-1 shrink-0 rounded-full bg-foreground/30"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function CtaSection({ en, es }: BilingualProps) {
  return (
    <section
      aria-labelledby="about-cta-heading"
      className="py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2
          id="about-cta-heading"
          className="text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {en.cta.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {en.cta.body}
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
        >
          {en.cta.button}
          <ArrowRight className="size-4" aria-hidden />
        </Link>

        {/* TRANSLATION REVIEW NEEDED */}
        <div lang="es" className="mt-10 border-t border-border pt-8">
          <p className="text-xl font-medium tracking-tight sm:text-2xl">
            {es.cta.heading}
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {es.cta.body}
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Portrait placeholder                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Headshot stand-in. No AI-generated photos per project rules — this is a
 * gradient block with a label until Esteban delivers the real portrait
 * (4:5 ratio, professional, brand-aligned).
 */
function PortraitPlaceholder({
  enAlt,
  esAlt,
}: {
  enAlt: string;
  esAlt: string;
}) {
  return (
    <figure
      // Combined alt-text on the figure itself so screen readers get both
      // languages without us shipping two img tags.
      aria-label={`${enAlt} ${esAlt}`}
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-900"
    >
      {/* TODO: real asset from Esteban — professional portrait, 4:5 ratio. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-500/80 dark:text-zinc-400/80">
          Portrait placeholder
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.2em] text-zinc-500/60 dark:text-zinc-400/60"
          lang="es"
        >
          Retrato provisional
        </span>
      </div>
    </figure>
  );
}
