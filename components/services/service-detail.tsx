import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { ServiceGalleryPlaceholder } from "@/components/services/service-gallery-placeholder";
import { ServiceIncludedList } from "@/components/services/service-included-list";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getRelatedServices, type Service } from "@/lib/services";

/**
 * Shared template for every `/services/<slug>` detail page.
 *
 * Each of the 5 literal routes (app/services/aerial, /photography, /videography,
 * /video-editing, /photo-editing) is a thin page.tsx that imports this component
 * and passes the matching record from lib/services.ts. That keeps the URL
 * structure literal (per backlog spec) while staying DRY.
 */
export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;
  const related = getRelatedServices(service.slug);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section aria-labelledby="service-heading">
        <Container className="pt-14 pb-12 sm:pt-20 sm:pb-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All services
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-16">
            <div className="flex flex-col gap-5">
              <Icon
                className="size-9 text-foreground/70"
                aria-hidden="true"
              />
              <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                Service
              </p>
              <h1
                id="service-heading"
                className="text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                {service.title}
              </h1>
              <p className="text-base text-foreground/80 sm:text-lg">
                {service.tagline}
              </p>
              <p className="text-base leading-relaxed text-foreground/75 sm:text-lg">
                {service.longBlurb}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className={buttonVariants({ size: "lg" })}
                >
                  Start a project
                </Link>
                <Link
                  href="/services"
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  See all services
                </Link>
              </div>
            </div>

            <aside
              aria-label="At a glance"
              className="rounded-2xl border border-foreground/10 bg-muted/30 p-6 sm:p-8"
            >
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                At a glance
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-foreground/10 pb-3">
                  <dt className="text-muted-foreground">Discipline</dt>
                  <dd className="text-right font-medium">{service.title}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-foreground/10 pb-3">
                  <dt className="text-muted-foreground">Coverage</dt>
                  <dd className="text-right font-medium">South Florida</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-foreground/10 pb-3">
                  <dt className="text-muted-foreground">Deliverables</dt>
                  <dd className="text-right font-medium">
                    {service.included.length}+ in scope
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Quote</dt>
                  <dd className="text-right font-medium">Same day</dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <div
        aria-hidden="true"
        className="mx-auto h-px max-w-5xl bg-foreground/10"
      />

      {/* WHAT'S INCLUDED */}
      <section aria-labelledby="included-heading">
        <Container className="py-16 sm:py-24">
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              What&apos;s included
            </p>
            <h2
              id="included-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Scoped to the shoot, written before we start.
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Every engagement ships with a written brief so we agree on the
              deliverables before a single shutter clicks.
            </p>
          </div>

          <ServiceIncludedList items={service.included} className="mt-10" />
        </Container>
      </section>

      <div
        aria-hidden="true"
        className="mx-auto h-px max-w-5xl bg-foreground/10"
      />

      {/* SAMPLE WORK GALLERY */}
      <section aria-labelledby="sample-work-heading">
        <Container className="py-16 sm:py-24">
          <div className="flex max-w-3xl flex-col gap-3">
            <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Sample work
            </p>
            <h2
              id="sample-work-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Selects from recent {service.title.toLowerCase()} projects.
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              {/* TODO: real asset from Esteban — swap placeholder tiles with real selects */}
              Placeholder selects below — the real reel drops in once Esteban
              hands off the next batch.
            </p>
          </div>

          <ServiceGalleryPlaceholder
            slots={service.gallerySlots}
            accentGradient={service.accentGradient}
            serviceTitle={service.title}
            className="mt-10"
          />
        </Container>
      </section>

      <div
        aria-hidden="true"
        className="mx-auto h-px max-w-5xl bg-foreground/10"
      />

      {/* INQUIRY CTA */}
      <section aria-labelledby="inquiry-heading">
        <Container className="py-16 sm:py-24">
          <div className="rounded-2xl bg-foreground px-6 py-10 text-background sm:px-12 sm:py-14">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2
                  id="inquiry-heading"
                  className="text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  Ready to scope your {service.title.toLowerCase()} project?
                </h2>
                <p className="mt-3 text-sm text-background/75 sm:text-base">
                  Tell us the date, the location, and the shape of what you
                  want — we&apos;ll send a written scope and a quote within 24
                  hours.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href={`/contact?service=${service.slug}`}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                  })}
                >
                  Start a project
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* RELATED SERVICES */}
      <section
        aria-labelledby="related-heading"
        className="border-t border-foreground/10"
      >
        <Container className="py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <h2
              id="related-heading"
              className="text-xl font-semibold tracking-tight sm:text-2xl"
            >
              Other services
            </h2>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All services
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {related.map((s) => {
              const RelatedIcon = s.icon;
              return (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-xl border border-foreground/10 bg-card p-5 transition-all hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  >
                    <RelatedIcon
                      className="size-5 text-muted-foreground transition-colors group-hover:text-foreground"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium">{s.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.tagline}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-foreground/70 transition-colors group-hover:text-foreground">
                      Learn more
                      <ArrowRight
                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>
    </main>
  );
}
