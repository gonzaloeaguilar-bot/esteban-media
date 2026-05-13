import Link from "next/link";

import { ServiceIcon } from "@/components/site/service-icon";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { services } from "@/content/services";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-br from-[#101013] via-[#0b0b0c] to-[#1a1410]"
        />
        <Container className="py-24 sm:py-32 lg:py-40">
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Visual storyteller · South Florida
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            We make things feel like a film.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-fg-muted)] sm:text-xl">
            Aerial, photography, videography, and post — for brands, weddings,
            and small teams who care about how their story looks back at them.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/services" className={buttonVariants({ size: "lg" })}>
              See the work
            </Link>
            <Link
              href="/contact"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Start a project
            </Link>
          </div>
        </Container>
      </section>

      <section aria-labelledby="services-strip" className="py-16 sm:py-24">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2
                id="services-strip"
                className="text-2xl font-semibold sm:text-3xl"
              >
                What we do
              </h2>
              <p className="mt-2 text-[var(--color-fg-muted)]">
                Five capabilities. One story per project.
              </p>
            </div>
            <Link
              href="/services"
              className="hidden text-sm text-[var(--color-accent)] hover:underline sm:inline"
            >
              All services →
            </Link>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-5 transition-colors hover:border-[var(--color-accent)]"
                >
                  <ServiceIcon
                    icon={service.icon}
                    className="h-6 w-6 text-[var(--color-accent)]"
                  />
                  <h3 className="mt-4 text-base font-semibold">
                    {service.name.en}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                    {service.tagline.en}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-8 sm:p-12">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Have a project in mind?
            </h2>
            <p className="mt-3 max-w-xl text-[var(--color-fg-muted)]">
              Tell us what you&apos;re making. We&apos;ll write back within a
              day with options and a rough number.
            </p>
            <div className="mt-6">
              <Link href="/contact" className={buttonVariants({ size: "lg" })}>
                Start the conversation
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
