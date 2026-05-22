import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin, Users } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  LOCAL_SEO_PAGE_SLUGS,
  getLocalSeoPage,
} from "@/lib/local-seo-pages";
import { SITE_URL } from "@/lib/seo/business-info";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  buildFaqSchema,
  buildLocalSeoServiceSchema,
} from "@/lib/seo/schema";

type Params = { locale: string; localSlug: string };

type PageProps = {
  params: Promise<Params>;
};

export const dynamicParams = false;

export function generateStaticParams(): Omit<Params, "locale">[] {
  return LOCAL_SEO_PAGE_SLUGS.map((localSlug) => ({ localSlug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, localSlug } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};

  const page = getLocalSeoPage(locale as Locale, localSlug);
  if (!page) return {};

  return buildPageMetadata({
    locale: locale as Locale,
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
  });
}

export default async function LocalSeoPage({ params }: PageProps) {
  const { locale, localSlug } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const page = getLocalSeoPage(locale as Locale, localSlug);
  if (!page) notFound();
  const isSpanish = locale === "es";
  const localServiceSchema = buildLocalSeoServiceSchema({ page, locale });
  const faqSchema = buildFaqSchema({
    id: `${SITE_URL}/${locale}/${page.slug}#faq`,
    faqs: page.faqs,
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd id={`local-service-schema-${page.slug}`} data={localServiceSchema} />
      <JsonLd id={`local-faq-schema-${page.slug}`} data={faqSchema} />
      <section
        aria-labelledby="local-heading"
        className="border-b border-border bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {page.eyebrow}
            </p>
            <h1
              id="local-heading"
              className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
            >
              {page.headline}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {page.lede}
            </p>
            <ul
              aria-label={isSpanish ? "Audiencias principales" : "Primary audiences"}
              className="mt-7 flex flex-wrap gap-2"
            >
              {page.audienceSegments.map((segment) => (
                <li
                  key={segment}
                  className="rounded-full border border-border bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground sm:text-sm"
                >
                  {segment}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
              >
                {isSpanish ? "Iniciar proyecto de video" : "Start a video project"}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/services/video-editing"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
              >
                {isSpanish ? "Edición de video" : "Video editing"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20 py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {isSpanish ? "Servicios" : "Services"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {page.servicesHeading}
            </h2>
            <ul role="list" className="mt-8 grid gap-3">
              {page.services.map((service) => (
                <li
                  key={service}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-foreground/70"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {isSpanish ? "Zona de servicio" : "Service area"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {page.areasHeading}
            </h2>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {page.areas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background p-4 text-sm font-medium text-muted-foreground"
                >
                  <MapPin className="size-4 shrink-0" aria-hidden />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-20 sm:py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {isSpanish ? "Enfoque local" : "Local focus"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {page.proofHeading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {page.proof}
            </p>
          </div>
          <aside className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-background">
                <Users className="size-5 text-foreground/70" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                {isSpanish ? "Mejor fit" : "Best fit"}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {page.searchIntent}
            </p>
            <ul role="list" className="mt-5 flex flex-wrap gap-2">
              {page.relatedLinks.map((link) => (
                <li
                  key={`${page.slug}-${link.href}`}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {link.label}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section
        id="faq"
        aria-labelledby="local-faq-heading"
        className="border-b border-border bg-muted/20 py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            {isSpanish ? "Preguntas" : "Questions"}
          </p>
          <h2
            id="local-faq-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {page.faqHeading}
          </h2>
          <div className="mt-8 divide-y divide-border rounded-lg border border-border bg-card">
            {page.faqs.map((faq) => (
              <article key={faq.question} className="p-5 sm:p-6">
                <h3 className="text-base font-semibold tracking-tight">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-24">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {page.ctaHeading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {page.ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
            >
              {isSpanish ? "Contactar a Esteban" : "Contact Esteban"}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href="https://www.instagram.com/steeban1/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
            >
              @steeban1
            </a>
          </div>
          <nav
            aria-label={isSpanish ? "Servicios relacionados" : "Related services"}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {page.relatedLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
