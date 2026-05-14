import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import {
  SERVICE_SLUGS,
  getRelatedServices,
  getService,
} from "@/lib/services";

type Params = { slug: string };

type PageProps = {
  params: Promise<Params>;
};

/**
 * Per-service detail page. Same layout for all 5 services, parameterized from
 * `lib/services.ts`. Add a new entry there → a new route appears here.
 *
 * Sections (top → bottom):
 *  1. Hero       — name + tagline + placeholder hero image
 *  2. Included   — "what's included" bulleted deliverables list
 *  3. Gallery    — 6 placeholder sample-work tiles (TODO real assets)
 *  4. CTA        — slug-scoped inquiry button → /contact?service={slug}
 *  5. Related    — rail of the other 4 services
 *
 * Unknown slugs 404 (`dynamicParams = false`). All 5 known slugs prerender at
 * build time via `generateStaticParams`.
 */

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.longBlurb,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { name, tagline, longBlurb, heroImage, included, gallerySlots, Icon } =
    service;
  const related = getRelatedServices(slug);
  // Slug-scoped inquiry CTA so the contact form can prefill "project type".
  const inquiryHref = `/contact?service=${encodeURIComponent(slug)}`;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ----------------------------------------------------------------- */}
      {/* 1. HERO                                                            */}
      {/* ----------------------------------------------------------------- */}
      <section
        aria-labelledby="service-heading"
        className="border-b border-border bg-background py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All services
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <div className="flex items-center gap-4">
                <span className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-card">
                  <Icon className="size-6 text-foreground/80" aria-hidden />
                </span>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
                  Service
                </p>
              </div>

              <h1
                id="service-heading"
                className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
              >
                {name}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                {tagline}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {longBlurb}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={inquiryHref}
                  className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
                >
                  Start a {name.toLowerCase()} project
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
                >
                  See other services
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-muted/40 shadow-sm">
              {/* TODO: real asset from Esteban — replace placeholder hero
                  with a real reel still / hero frame. Keep 16:10 crop. */}
              <Image
                src={heroImage}
                alt={`${name} — placeholder hero image (real asset pending from Esteban)`}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 2. WHAT'S INCLUDED                                                 */}
      {/* ----------------------------------------------------------------- */}
      <section
        aria-labelledby="included-heading"
        className="border-b border-border bg-muted/20 py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              What&apos;s included
            </p>
            <h2
              id="included-heading"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Every {name.toLowerCase()} engagement ships with:
            </h2>
          </div>

          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-foreground"
                >
                  <Check className="size-4" />
                </span>
                <p className="text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 3. SAMPLE WORK GALLERY (placeholders)                              */}
      {/* ----------------------------------------------------------------- */}
      <section
        aria-labelledby="gallery-heading"
        className="border-b border-border bg-background py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
                Sample work
              </p>
              <h2
                id="gallery-heading"
                className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Recent {name.toLowerCase()}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Real frames from Esteban land here once delivered. The tiles
                below are placeholders.
              </p>
            </div>
            <p
              role="note"
              className="rounded-full border border-dashed border-border bg-muted/30 px-3 py-1 text-xs text-muted-foreground"
            >
              Awaiting real assets
            </p>
          </div>

          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {Array.from({ length: gallerySlots }).map((_, i) => (
              // TODO: real asset from Esteban — swap each tile for a real
              // image/clip thumbnail. Keep aspect ratio 4:3 for grid rhythm.
              <li
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-dashed border-border bg-muted/40"
                aria-label={`${name} sample ${i + 1} (placeholder)`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    Placeholder · {i + 1}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 4. INQUIRY CTA                                                     */}
      {/* ----------------------------------------------------------------- */}
      <section
        aria-labelledby="inquiry-heading"
        className="border-b border-border bg-foreground text-background py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-background/60 sm:text-sm">
            Ready when you are
          </p>
          <h2
            id="inquiry-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            Let&apos;s scope your {name.toLowerCase()} project.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-background/70 sm:text-base">
            Tell us about your timeline, location, and what you&apos;re trying
            to make. We&apos;ll come back within one business day.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={inquiryHref}
              className="inline-flex items-center gap-2 rounded-lg bg-background px-5 py-3 text-sm font-medium text-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base"
            >
              Send an inquiry
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* 5. RELATED SERVICES RAIL                                           */}
      {/* ----------------------------------------------------------------- */}
      <section
        aria-labelledby="related-heading"
        className="bg-background py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              Also in the toolkit
            </p>
            <h2
              id="related-heading"
              className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Other services
            </h2>
          </div>

          <ul
            role="list"
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <r.Icon
                    className="size-6 text-foreground/80 transition group-hover:text-foreground"
                    aria-hidden
                  />
                  <h3 className="mt-5 text-base font-semibold tracking-tight">
                    {r.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {r.blurb}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    Learn more
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
