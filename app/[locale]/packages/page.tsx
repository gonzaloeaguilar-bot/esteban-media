import type { Metadata } from "next";
import { ArrowRight, Check, Info, Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  formatPriceRange,
  PACKAGES,
  type Package,
} from "@/lib/packages";
import {
  LOCAL_SEO_PAGES,
} from "@/lib/local-seo-pages";
import { SERVICES } from "@/lib/services";
import { SITE_URL } from "@/lib/seo/business-info";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildGenericFaqSchema,
  buildPackageSchema,
  buildPackagesGraph,
  type JsonLdNode,
} from "@/lib/seo/schema";

type PageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generates the bilingual `/packages` index. This route ships as the launch
 * monetization surface — three offer cards anchored by starting-at prices,
 * deliverables, honest caveats, related services, related local pages,
 * a package-level FAQ block, and an end-of-page CTA.
 *
 * SEO + GEO posture:
 *  - One `Service` node per package emitted via `@graph` so a single
 *    `<script type="application/ld+json">` declares everything Google needs
 *    (offers, price range, audience, area served).
 *  - One `FAQPage` node aggregating every package FAQ — Google's rich-result
 *    handler prefers a single FAQ container per page.
 *  - Per-package `id` attributes on each section so the homepage / service
 *    / local-page strips can deep-link via `/packages#edit-only-starter`.
 *
 * Bilingual posture:
 *  - All copy comes from `messages/{locale}.json` under `Packages.*`.
 *  - ES strings are flagged with `_review` markers per CLAUDE.md.
 *  - Price formatting (`formatPriceRange`) toggles `/ mes` vs `/ month`.
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata.packages" });
  return buildPageMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/packages",
  });
}

export default async function PackagesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Packages" });
  const tServices = await getTranslations({ locale, namespace: "Services" });

  // Build typed view models once so the render loop has stable shapes for
  // bullets and FAQs without re-resolving message keys per iteration.
  type PackageView = {
    pkg: Package;
    name: string;
    tagline: string;
    blurb: string;
    audience: string;
    deliverables: readonly string[];
    caveats: readonly string[];
    faqs: readonly { question: string; answer: string }[];
  };

  const views: readonly PackageView[] = PACKAGES.map((pkg): PackageView => {
    const name = t(`items.${pkg.slug}.name`);
    const tagline = t(`items.${pkg.slug}.tagline`);
    const blurb = t(`items.${pkg.slug}.blurb`);
    const audience = t(`items.${pkg.slug}.audience`);
    // Loop the declared counts so missing message keys throw at static-gen
    // time rather than rendering a silent empty list.
    const deliverables = Array.from({ length: pkg.deliverableCount }, (_, i) =>
      t(`items.${pkg.slug}.deliverables.${i}`),
    );
    const caveats = Array.from({ length: pkg.caveatCount }, (_, i) =>
      t(`items.${pkg.slug}.caveats.${i}`),
    );
    const faqs = Array.from({ length: pkg.faqCount }, (_, i) => ({
      question: t(`items.${pkg.slug}.faqs.${i}.question`),
      answer: t(`items.${pkg.slug}.faqs.${i}.answer`),
    }));
    return { pkg, name, tagline, blurb, audience, deliverables, caveats, faqs };
  });

  // Compose JSON-LD: one Service node per package, one FAQPage that
  // aggregates every package FAQ. Both ship inside a single @graph so
  // crawlers resolve the cross-references on the same fetch.
  const packageSchemas: readonly JsonLdNode[] = views.map((v) =>
    buildPackageSchema({
      pkg: v.pkg,
      name: v.name,
      description: v.tagline,
      audienceDescription: v.audience,
      locale,
    }),
  );
  const allFaqs = views.flatMap((v) =>
    v.faqs.map((faq) => ({
      // Prefix the question with the package name so the FAQ rich result
      // disambiguates a generic question across packages.
      question: `${v.name}: ${faq.question}`,
      answer: faq.answer,
    })),
  );
  const faqSchema = buildGenericFaqSchema({
    id: `${SITE_URL}/${locale}/packages#faq`,
    faqs: allFaqs,
  });
  const graph = buildPackagesGraph({
    locale,
    packageSchemas,
    faqSchema,
  });

  // Map service slug → localised display name for the related-services pills.
  const serviceNameBySlug = Object.fromEntries(
    SERVICES.map((s) => [s.slug, tServices(`items.${s.slug}.name`)]),
  );

  // Map local SEO slug → the localised page title for related-local links.
  // Pulled from the typed `LOCAL_SEO_PAGES[locale]` so a rename is a compile
  // error, not a 404.
  const localPageTitleBySlug = Object.fromEntries(
    Object.entries(LOCAL_SEO_PAGES[locale as Locale]).map(([slug, page]) => [
      slug,
      page.title,
    ]),
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd id="packages-graph" data={graph} />

      {/* ─────────────────── 1. Hero ─────────────────── */}
      <section
        aria-labelledby="packages-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {t("eyebrow")}
            </p>
            <h1
              id="packages-heading"
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

      {/* ───────────── 2. Index / quick-pick cards ───────────── */}
      <section
        aria-labelledby="packages-index-heading"
        className="border-b border-border bg-muted/20 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {t("indexEyebrow")}
            </p>
            <h2
              id="packages-index-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t("indexHeading")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t("indexBody")}
            </p>
          </div>

          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3"
          >
            {views.map(({ pkg, name, tagline }) => {
              const { Icon, priceRangeUsd, accent } = pkg;
              return (
                <li key={pkg.slug}>
                  <a
                    href={`#${pkg.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <span
                      className={`inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent.gradient}`}
                      aria-hidden
                    >
                      <Icon className="size-6 text-foreground/80" />
                    </span>
                    <h3 className="mt-5 text-xl font-semibold tracking-tight">
                      {name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {tagline}
                    </p>
                    <p className="mt-5 text-sm font-medium text-foreground">
                      <span className="text-muted-foreground">
                        {t("startingAt")}{" "}
                      </span>
                      {formatPriceRange(priceRangeUsd, locale as Locale)}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                      {t("cardCta")}
                      <ArrowRight
                        className="size-4 transition group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────────── 3. Per-package detail sections ───────────── */}
      {views.map(({ pkg, name, tagline, blurb, audience, deliverables, caveats }, idx) => {
        const { Icon, priceRangeUsd, relatedServiceSlugs, relatedLocalSlugs } = pkg;
        // Alternate band background so adjacent package sections read as
        // distinct cards without dropping into a single muted slab.
        const bandClass =
          idx % 2 === 0
            ? "border-b border-border bg-background py-20 sm:py-24"
            : "border-b border-border bg-muted/20 py-20 sm:py-24";

        return (
          <section
            key={pkg.slug}
            id={pkg.slug}
            aria-labelledby={`package-${pkg.slug}-heading`}
            className={bandClass}
          >
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
                {/* Left column — hero copy, price anchor, CTAs */}
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-card">
                      <Icon
                        className="size-6 text-foreground/80"
                        aria-hidden
                      />
                    </span>
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
                      {t("eyebrow")}
                    </p>
                  </div>

                  <h2
                    id={`package-${pkg.slug}-heading`}
                    className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl"
                  >
                    {name}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-foreground/80">
                    {tagline}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {blurb}
                  </p>

                  <div className="mt-8 inline-flex flex-col rounded-2xl border border-border bg-card p-5">
                    <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      {t("startingAt")}
                    </span>
                    <span className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                      {formatPriceRange(priceRangeUsd, locale as Locale)}
                    </span>
                    {priceRangeUsd.cadence === "project" && (
                      <span className="mt-1 text-sm text-muted-foreground">
                        {t("perProject")}
                      </span>
                    )}
                  </div>

                  <p className="mt-6 text-sm text-muted-foreground">
                    {audience}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/contact?package=${pkg.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
                    >
                      {t("ctaPrimary")}
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
                    >
                      {t("ctaSecondary")}
                    </Link>
                  </div>
                </div>

                {/* Right column — deliverables + caveats + related */}
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {t("deliverablesHeading")}
                    </h3>
                    <ul
                      role="list"
                      className="mt-4 grid gap-3"
                    >
                      {deliverables.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                        >
                          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                            <Check
                              className="size-3.5 text-foreground/70"
                              aria-hidden
                            />
                          </span>
                          <p className="text-sm leading-relaxed text-foreground/90">
                            {bullet}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      {t("caveatsEyebrow")}
                    </p>
                    <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground">
                      {t("caveatsHeading")}
                    </h3>
                    <ul
                      role="list"
                      className="mt-4 grid gap-3"
                    >
                      {caveats.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 rounded-xl border border-dashed border-border bg-muted/30 p-4"
                        >
                          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                            <Info
                              className="size-3.5 text-foreground/70"
                              aria-hidden
                            />
                          </span>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {bullet}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        {t("relatedServicesHeading")}
                      </h3>
                      <ul
                        role="list"
                        className="mt-4 flex flex-wrap gap-2"
                      >
                        {relatedServiceSlugs.map((serviceSlug) => (
                          <li key={serviceSlug}>
                            <Link
                              href={`/services/${serviceSlug}`}
                              className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
                            >
                              {serviceNameBySlug[serviceSlug] ?? serviceSlug}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                        {t("relatedLocalHeading")}
                      </h3>
                      <ul
                        role="list"
                        className="mt-4 flex flex-wrap gap-2"
                      >
                        {relatedLocalSlugs.map((localSlug) => (
                          <li key={localSlug}>
                            <Link
                              href={`/${localSlug}`}
                              className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
                            >
                              {localPageTitleBySlug[localSlug] ?? localSlug}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ───────────── 4. FAQ ───────────── */}
      <section
        id="faq"
        aria-labelledby="packages-faq-heading"
        className="border-b border-border bg-background py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            {t("faqEyebrow")}
          </p>
          <h2
            id="packages-faq-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t("faqHeading")}
          </h2>

          <div className="mt-8 space-y-10">
            {views.map(({ pkg, name, faqs }) => (
              <div key={pkg.slug}>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  {name}
                </h3>
                <div className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
                  {faqs.map((faq) => (
                    <article key={faq.question} className="p-5 sm:p-6">
                      <h4 className="text-base font-semibold tracking-tight">
                        {faq.question}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {faq.answer}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 5. CTA ───────────── */}
      <section className="bg-foreground py-20 text-background sm:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("ctaHeading")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-background/70 sm:text-lg">
            {t("ctaBody")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base"
            >
              {t("ctaPrimary")}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="mailto:gagui010@icloud.com"
              className="inline-flex items-center gap-2 rounded-lg border border-background/30 px-5 py-3 text-sm font-medium text-background transition hover:border-background/60 hover:bg-background/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base"
            >
              <Mail className="size-4" aria-hidden />
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
