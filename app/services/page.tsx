import type { Metadata } from "next";
import Link from "next/link";

import { ServiceIcon } from "@/components/site/service-icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Aerial, photography, videography, video editing, and photo editing — five capabilities, one story per project.",
};

export default function ServicesOverviewPage() {
  return (
    <>
      <section className="py-16 sm:py-24">
        <Container>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">
            Services
          </p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            What we make.
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-[var(--color-fg-muted)]">
            Five capabilities, one consistent eye behind them. Pick a service to
            see how we work and what you get.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] rounded-lg"
                >
                  <Card className="h-full transition-colors hover:border-[var(--color-accent)]">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-bg)] text-[var(--color-accent)]">
                          <ServiceIcon icon={service.icon} className="h-5 w-5" />
                        </span>
                        <CardTitle>{service.name.en}</CardTitle>
                      </div>
                      <CardDescription className="mt-2">
                        {service.tagline.en}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[var(--color-fg-muted)]">
                        {service.description.en}
                      </p>
                      <p className="mt-6 text-sm font-medium text-[var(--color-accent)]">
                        Learn more →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
