import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { SERVICE_SLUGS, getService } from "@/lib/services";

type Params = { locale: string; slug: string };

type PageProps = {
  params: Promise<Params>;
};

/**
 * Pre-render every (locale, slug) pair. Unknown combinations 404 because
 * `dynamicParams = false`. The static set is the cross-product of locales
 * and service slugs — five services × two locales = ten paths.
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
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    return {};
  }
  const service = getService(slug);
  if (!service) return {};

  const t = await getTranslations({
    locale,
    namespace: `Services.items.${service.slug}`,
  });
  return {
    title: t("name"),
    description: t("longBlurb"),
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getService(slug);
  if (!service) notFound();

  const { Icon } = service;
  const tItem = await getTranslations({
    locale,
    namespace: `Services.items.${service.slug}`,
  });
  const tDetail = await getTranslations({
    locale,
    namespace: "Services.detail",
  });
  const name = tItem("name");
  const longBlurb = tItem("longBlurb");

  return (
    <main className="min-h-screen bg-background text-foreground">
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
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {longBlurb}
          </p>

          {/* Placeholder body. Real content (gallery, what's-included list,
              inquiry CTA) ships with backlog P1 #1 "Build individual service
              pages". */}
          <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/30 p-8 sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              {tDetail("comingSoonEyebrow")}
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {/* TODO: real asset from Esteban — sample work gallery, "what's
                  included" list, and pricing tiers for the service. */}
              {tDetail("comingSoonBody", { name: name.toLowerCase() })}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
              >
                {tDetail("ctaPrimary")}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
              >
                {tDetail("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
