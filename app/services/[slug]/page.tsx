import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ServiceIcon } from "@/components/site/service-icon";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  getAllServiceSlugs,
  getService,
  services,
} from "@/content/services";

/**
 * One layout, five routes — driven by `content/services.ts`. Adding a new
 * service entry creates a new route automatically via `generateStaticParams`.
 */

type Params = { slug: string };

type PageProps = {
  // Next 15 typed routes: params is a Promise.
  params: Promise<Params>;
};

export function generateStaticParams(): Params[] {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name.en,
    description: service.description.en,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${service.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] via-[color-mix(in_srgb,var(--color-bg)_75%,transparent)] to-[var(--color-bg)]"
        />
        <Container className="py-24 sm:py-32">
          <Link
            href="/services"
            className="text-sm text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
          >
            ← All services
          </Link>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-bg-elevated)] text-[var(--color-accent)]">
              <ServiceIcon icon={service.icon} className="h-5 w-5" />
            </span>
            <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {service.name.en}
            </p>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            {service.tagline.en}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)]">
            {service.description.en}
          </p>
          <div className="mt-10">
            <Link
              href={`/contact?service=${service.slug}`}
              className={buttonVariants({ size: "lg" })}
            >
              Request a quote
            </Link>
          </div>
        </Container>
      </section>

      {/* What's included */}
      <section
        aria-labelledby={`included-${service.slug}`}
        className="py-16 sm:py-24"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2
                id={`included-${service.slug}`}
                className="text-2xl font-semibold sm:text-3xl"
              >
                What&apos;s included
              </h2>
              <p className="mt-3 text-[var(--color-fg-muted)]">
                Every {service.name.en.toLowerCase()} engagement covers the
                following by default. Custom add-ons priced per project.
              </p>
            </div>
            <ul className="grid gap-3 lg:col-span-2">
              {service.included.map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--color-accent)]"
                  />
                  <span className="text-[var(--color-fg)]">{item.en}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Sample work gallery */}
      <section
        aria-labelledby={`gallery-${service.slug}`}
        className="py-16 sm:py-24"
      >
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2
              id={`gallery-${service.slug}`}
              className="text-2xl font-semibold sm:text-3xl"
            >
              Sample work
            </h2>
            <p className="text-sm text-[var(--color-fg-muted)]">
              Placeholders — real work coming soon.
            </p>
          </div>
          {/* TODO: real asset from Esteban */}
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {Array.from({ length: service.gallerySlots }).map((_, idx) => (
              <li
                key={idx}
                aria-label={`${service.name.en} sample ${idx + 1} (placeholder)`}
                className="group relative aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
              >
                {/* TODO: real asset from Esteban */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] to-[var(--color-bg-elevated)]"
                />
                <span className="absolute bottom-2 right-2 rounded bg-[var(--color-bg)]/70 px-2 py-1 text-[10px] uppercase tracking-wider text-[var(--color-fg-muted)]">
                  Placeholder · {idx + 1}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Inquiry CTA */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 sm:p-12">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Ready to start?
            </h2>
            <p className="mt-3 max-w-xl text-[var(--color-fg-muted)]">
              Tell us about the project. Dates, location, what you&apos;re
              trying to make. We&apos;ll write back within a day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/contact?service=${service.slug}`}
                className={buttonVariants({ size: "lg" })}
              >
                Inquire about {service.name.en.toLowerCase()}
              </Link>
              <Link
                href="/services"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                See other services
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Related services */}
      <section className="pb-24">
        <Container>
          <h2 className="text-xl font-semibold">Other services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="flex items-center gap-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4 transition-colors hover:border-[var(--color-accent)]"
                  >
                    <ServiceIcon
                      icon={other.icon}
                      className="h-5 w-5 text-[var(--color-accent)]"
                    />
                    <div>
                      <p className="text-sm font-medium">{other.name.en}</p>
                      <p className="text-xs text-[var(--color-fg-muted)]">
                        {other.tagline.en}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
