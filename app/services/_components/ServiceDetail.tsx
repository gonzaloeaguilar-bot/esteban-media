import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { getServiceDetail, type GalleryPlaceholder } from "@/app/services/_data/services";

type Props = {
  slug: string;
};

const ASPECT_CLASS: Record<GalleryPlaceholder["aspect"], string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

/**
 * Shared template for every /services/<slug> page. Five route files delegate
 * here so structure + styling stay in one place.
 *
 * Sections:
 *  1. Hero — title, tagline, placeholder visual (real asset TODO).
 *  2. What's included — bulleted list with check icons.
 *  3. Sample work — 3–6 placeholder tiles with alt text.
 *  4. Inquiry CTA — deep-link to /contact?service={slug}.
 */
export default function ServiceDetail({ slug }: Props) {
  const service = getServiceDetail(slug);
  if (!service) notFound();

  const {
    title,
    tagline,
    included,
    galleryPlaceholders,
    inquiryCtaLabel,
    Icon,
  } = service;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
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
            All services
          </Link>

          <div className="mt-10 flex items-center gap-4">
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
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {tagline}
          </p>

          {/* Hero visual — placeholder until Esteban delivers a real asset. */}
          {/* TODO: real asset from Esteban — replace with next/image referencing heroImage */}
          <div
            aria-hidden
            className="mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-muted via-muted/60 to-muted/30"
          >
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Hero visual — coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section
        aria-labelledby="included-heading"
        className="border-b border-border bg-background py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              What&apos;s included
            </p>
            <h2
              id="included-heading"
              className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            >
              Every project ships with the essentials.
            </h2>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-background"
                >
                  <Check className="size-3.5 text-foreground" />
                </span>
                <span className="text-sm leading-relaxed text-foreground sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SAMPLE WORK */}
      <section
        aria-labelledby="sample-work-heading"
        className="border-b border-border bg-background py-20 sm:py-24"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              Sample work
            </p>
            <h2
              id="sample-work-heading"
              className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            >
              A look at the kind of work this becomes.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Real selects from Esteban&apos;s portfolio drop in here as soon as
              the gallery is delivered. In the meantime, these placeholders
              represent the shape and pace of a typical set.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
            {galleryPlaceholders.map((tile, i) => (
              <li key={`${tile.alt}-${i}`}>
                {/* TODO: real asset from Esteban — swap this placeholder for next/image */}
                <figure
                  className={`${ASPECT_CLASS[tile.aspect]} group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-muted via-muted/60 to-muted/30`}
                >
                  <div className="absolute inset-0 flex items-end p-4">
                    <figcaption className="text-xs leading-snug text-muted-foreground">
                      {tile.alt}
                    </figcaption>
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* INQUIRY CTA */}
      <section
        aria-labelledby="inquiry-heading"
        className="bg-background py-20 sm:py-28"
      >
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-12">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground sm:text-sm">
              Start a project
            </p>
            <h2
              id="inquiry-heading"
              className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            >
              Tell us what you&apos;re making.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Send a few details — date, location, what you want it to feel
              like — and we&apos;ll come back with a plan, a quote, and a list
              of what we&apos;d need from you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/contact?service=${slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
              >
                {inquiryCtaLabel}
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
        </div>
      </section>
    </main>
  );
}
