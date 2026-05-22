import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  LOCAL_SEO_PAGE_SLUGS,
  getLocalSeoPage,
} from "@/lib/local-seo-pages";
import { buildPageMetadata } from "@/lib/seo/metadata";

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

  return (
    <main className="min-h-screen bg-background text-foreground">
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
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
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
                  className="flex items-center gap-2 rounded-xl border border-border bg-background p-4 text-sm font-medium text-muted-foreground"
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
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
            {isSpanish ? "Enfoque local" : "Local SEO angle"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {page.proofHeading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {page.proof}
          </p>
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
        </div>
      </section>
    </main>
  );
}
