import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  SERVICE_SLUGS,
  getRelatedServices,
  getService,
} from "@/lib/services";
import { ServiceGalleryPlaceholder } from "@/components/sections/ServiceGalleryPlaceholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { buildServiceSchema } from "@/lib/seo/schema";

type Params = { locale: string; slug: string };

type PageProps = {
  params: Promise<Params>;
};

/**
 * Pre-render every (locale, slug) pair. Unknown combinations 404 because
 * `dynamicParams = false`. The static set is the cross-product of locales
 * and service slugs — five services × two locales = ten paths.
 *
 * Layout (all 5 services share this shape — see backlog P1 #1):
 *   1. Hero            — eyebrow, icon, name, tagline, long blurb
 *   2. What's included — bullet list of deliverables from messages
 *   3. Sample work     — gradient placeholder gallery (no AI photos)
 *   4. Inquiry CTA     — slug-scoped link to /contact?service={slug}
 *   5. Related rail    — the other four services as compact cards
 */
export const dynamicParams = false;

export function generateStaticParams(): Omit<Params, "locale">[] {
  // Next.js merges the `[locale]` segment's static params with these via
  // `generateStaticParams` on the parent layout, so we only need to return
  // the slugs here.
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const service = getService(slug);
  if (!service) return {};

  const t = await getTranslations({
    locale,
    namespace: `Services.items.${service.slug}`,
  });
  return buildPageMetadata({
    locale: locale as Locale,
    title: t("name"),
    description: t("longBlurb"),
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getService(slug);
  if (!service) notFound();

  const { Icon, includedCount, gallerySlots, accent } = service;

  const tItem = await getTranslations({
    locale,
    namespace: `Services.items.${service.slug}`,
  });
  const tDetail = await getTranslations({
    locale,
    namespace: "Services.detail",
  });
  const tServices = await getTranslations({ locale, namespace: "Services" });

  const name = tItem("name");
  const tagline = tItem("tagline");
  const longBlurb = tItem("longBlurb");

  // Loop the declared `includedCount` so missing message keys throw at static
  // generation time rather than silently rendering an empty list.
  const includedBullets = Array.from({ length: includedCount }, (_, idx) =>
    tItem(`included.${idx}`),
  );

  const related = getRelatedServices(service.slug);

  // Slug-scoped contact link. `/contact` doesn't yet read the `service` query
  // param, but emitting it now means the analytics + future autofill work
  // doesn't need a follow-up sweep across these five pages.
  const contactHref = `/contact?service=${service.slug}` as const;

  // Service JSON-LD. `provider.@id` refers back to the LocalBusiness emitted
  // by the root layout's @graph — that link is what tells crawlers "this
  // service is offered by that org" without duplicating the org payload.
  const serviceSchema = buildServiceSchema({
    slug: service.slug,
    name,
    // Hero `tagline` is the cleanest one-liner we have per service; `longBlurb`
    // is paragraph-length and gets noisy when crawlers truncate it for AI
    // surfaces. If/when product copy provides an explicit `seoDescription`,
    // swap this to read that key instead.
    description: tagline,
    locale,
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd id={`service-schema-${service.slug}`} data={serviceSchema} />
      {/* ───────────────────── 1. Hero ───────────────────── */}
      <section
        aria-labelledby="service-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {tDetail("back")}
          </Link>

          <div className="mt-10 flex items-center gap-4">
            <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-card">
              <Icon className="size-6 text-foreground/80" aria-hidden />
            </span>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {tDetail("eyebrow")}
            </p>
          </div>

          <h1
            id="service-heading"
            className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          >
            {name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
            {tagline}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {longBlurb}
          </p>
        </div>
      </section>

      {/* ─────────────── 2. What's included ─────────────── */}
      <section
        aria-labelledby="service-included-heading"
        className="border-b border-border bg-background py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {tDetail("included.eyebrow")}
            </p>
            <h2
              id="service-included-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {tDetail("included.heading", { name })}
            </h2>
          </div>

          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {includedBullets.map((bullet, idx) => (
              <li
                // Bullets are content-defined and stable within a page render,
                // but copy is locale-driven so the only reliable identity is
                // the position. Index keying is appropriate here.
                key={idx}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"
              >
                <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  <Check className="size-3.5 text-foreground/70" aria-hidden />
                </span>
                <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {bullet}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─────────────── 3. Sample work gallery ─────────────── */}
      <section
        aria-labelledby="service-gallery-heading"
        className="border-b border-border bg-muted/20 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {tDetail("gallery.eyebrow")}
            </p>
            <h2
              id="service-gallery-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {tDetail("gallery.heading", { name })}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {tDetail("gallery.note", { name })}
            </p>
          </div>

          <div className="mt-10">
            <ServiceGalleryPlaceholder
              count={gallerySlots}
              Icon={Icon}
              accent={accent}
              tileLabel={tDetail("gallery.tileLabel", { name })}
              ariaLabel={tDetail("gallery.ariaLabel", { name })}
            />
          </div>
        </div>
      </section>

      {/* ─────────────── 4. Inquiry CTA ─────────────── */}
      <section
        aria-labelledby="service-inquiry-heading"
        className="border-b border-border bg-background py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {tDetail("inquiry.eyebrow", { name })}
            </p>
            <h2
              id="service-inquiry-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {tDetail("inquiry.heading", { name })}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {tDetail("inquiry.body")}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={contactHref}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
              >
                {tDetail("inquiry.ctaPrimary")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
              >
                {tDetail("inquiry.ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────── 5. Related services ─────────────── */}
      <section
        aria-labelledby="service-related-heading"
        className="bg-background py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {tDetail("related.eyebrow")}
            </p>
            <h2
              id="service-related-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {tDetail("related.heading")}
            </h2>
          </div>

          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {related.map(({ slug: relatedSlug, Icon: RelatedIcon }) => (
              <li key={relatedSlug}>
                <Link
                  href={`/services/${relatedSlug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <RelatedIcon
                    className="size-6 text-foreground/80 transition group-hover:text-foreground"
                    aria-hidden
                  />
                  <h3 className="mt-5 text-base font-semibold tracking-tight">
                    {tServices(`items.${relatedSlug}.name`)}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {tServices(`items.${relatedSlug}.blurb`)}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    {tServices("cardCta")}
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
    </main>
  );
}
