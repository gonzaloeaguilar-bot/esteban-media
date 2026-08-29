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
              Content, profiles, websites, and automation—connected around the customer journey.
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 self-start text-sm font-medium text-[#101214] underline decoration-[#e85d3e] decoration-2 underline-offset-4 hover:text-[#7f2f20] sm:self-end"
          >
            View all services
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <ul
          role="list"
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const href =
              service.id === "website-design"
                ? "/services/website-design-fort-lauderdale"
                : `/services#${service.id}`;
            return (
              <li key={service.id} className="h-full">
                <Link
                  href={href}
                  className="group flex h-full flex-col rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5 transition hover:-translate-y-0.5 hover:border-[#e85d3e] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e85d3e]"
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
                  {service.startingPrice ? (
                    <p className="mt-2 text-sm font-medium text-[#9f3c27]">
                      {service.startingPrice}
                    </p>
                  ) : null}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]">
                    Explore this service
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/services/website-design-fort-lauderdale#digital-systems-heading"
          className="group mt-6 flex items-center justify-between gap-4 rounded-lg border border-[#c84a2c] bg-[#fbf6ef] p-5 transition hover:bg-[#fff9f2]"
        >
          <span>
            <span className="block text-xs font-medium uppercase tracking-wide text-[#9f3c27]">Digital systems</span>
            <span className="mt-1 block font-serif text-2xl">Business profiles, marketplaces, DM funnels, CRM-ready automations, reporting, and search readiness.</span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
