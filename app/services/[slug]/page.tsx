import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { SERVICE_SLUGS, getService } from "@/lib/services";

type Params = { slug: string };

type PageProps = {
  params: Promise<Params>;
};

/**
 * Pre-render every known service slug. Unknown slugs 404 (dynamicParams = false).
 * Real per-service content lands with P1 #1 "Build individual service pages".
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

  const { name, longBlurb, Icon } = service;

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
              Coming soon
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {/* TODO: real asset from Esteban — sample work gallery, "what's
                  included" list, and pricing tiers for {name}. */}
              The full {name.toLowerCase()} page — sample work, deliverables,
              and pricing tiers — lands once Esteban delivers reference assets.
              In the meantime, get in touch and we&apos;ll walk you through it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-base"
              >
                Start a project
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
