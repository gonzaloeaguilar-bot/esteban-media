import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { services } from "@/lib/site";

export function ServicesStrip() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-b border-[#ddd4c8] bg-[#f6f1ea] py-14 sm:py-20"
    >
      <Container size="xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wide text-[#5a6066]">
              What Esteban does
            </p>
            <h2
              id="services-heading"
              className="mt-3 font-serif text-4xl leading-tight sm:text-5xl"
            >
              Editing first. Strategy connected. Production when needed.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-[#101214] underline decoration-[#e85d3e] decoration-2 underline-offset-4 hover:text-[#e85d3e] sm:self-end"
          >
            View all services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <ul
          role="list"
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.id}>
                <article
                  className="flex h-full flex-col rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 transition hover:-translate-y-0.5 hover:border-[#e85d3e] hover:shadow-sm"
                >
                  <Icon
                    className="size-7 text-[#e85d3e]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-serif text-xl leading-tight">
                    {service.shortName}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#252a2d]">
                    {service.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
