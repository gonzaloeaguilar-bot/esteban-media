import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HeadshotPlaceholder } from "@/components/about/HeadshotPlaceholder";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { EQUIPMENT_GROUPS } from "@/content/about";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * About-page metadata. Uses `Metadata.about` namespace from the messages
 * file so the title/description stay editorial-controlled in copy land, not
 * hard-coded into the route. The `path` ("/about") is what the
 * `buildPageMetadata` helper uses to emit canonical + hreflang alternates.
 */
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
  // Required for static rendering — see app/[locale]/layout.tsx note.
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/*
        Intro section — bio + headshot side-by-side at md+.

        TODO: real bio from Esteban — keep cinematic, calm, confident; no
        corporate jargon, no superlatives without proof. ES copy in
        messages/es.json is flagged TRANSLATION REVIEW NEEDED until a native
        speaker (Gonzalo) signs off.
      */}
      <section
        aria-labelledby="about-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-[1fr_1.1fr] md:items-start md:gap-16 lg:px-8">
          <div className="md:order-1">
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
              {t("bio.paragraph1")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("bio.paragraph2")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("bio.paragraph3")}
            </p>
          </div>

          <div className="md:order-2">
            <HeadshotPlaceholder />
          </div>
        </div>
      </section>

      {/* Brand statement — pulled out as its own section for emphasis. */}
      <section
        aria-labelledby="brand-statement-heading"
        className="border-b border-border bg-muted/30 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            {t("brandStatement.eyebrow")}
          </p>
          <h2
            id="brand-statement-heading"
            className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
          >
            {t("brandStatement.statement")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("brandStatement.support")}
          </p>
        </div>
      </section>

      {/*
        Equipment list — grouped by capability. Structural data (which groups,
        which item slugs, in what order) lives in `content/about.ts`. Labels
        come from messages/{locale}.json under `About.equipment.*`. If a key
        is missing the page fails the build loudly via next-intl
        MISSING_MESSAGE — that's by design.
      */}
      <section
        aria-labelledby="equipment-heading"
        className="border-b border-border bg-background py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {t("equipment.eyebrow")}
            </p>
            <h2
              id="equipment-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t("equipment.headline")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("equipment.lede")}
            </p>
          </div>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {EQUIPMENT_GROUPS.map((group) => (
              <div key={group.id} className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
                  {t(`equipment.groups.${group.id}.label`)}
                </h3>
                <ul
                  role="list"
                  className="space-y-2 text-sm text-muted-foreground sm:text-base"
                >
                  {group.items.map((item) => (
                    <li
                      key={item.id}
                      className="border-l border-border/60 pl-3"
                    >
                      {t(`equipment.items.${item.id}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* TODO: real equipment list from Esteban — confirm bodies + glass + drones. */}
          <p className="mt-10 text-xs text-muted-foreground">
            {t("equipment.footnote")}
          </p>
        </div>
      </section>

      {/* Closing CTA — keep the funnel moving toward /contact. */}
      <section
        aria-labelledby="about-cta-heading"
        className="bg-background py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2
            id="about-cta-heading"
            className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("cta.headline")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("cta.body")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-6 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t("cta.primary")}
            </Link>
            <Link
              href="/services"
              className="inline-flex h-11 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {t("cta.secondary")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
