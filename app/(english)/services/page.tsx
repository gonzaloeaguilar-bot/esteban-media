import Link from "next/link";
import { ArrowRight, CheckCircle2, Laptop, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { entityIds } from "@/lib/entity-schema";
import { buildPageMetadata } from "@/lib/site-metadata";
import {
  absoluteUrl,
  scopingQuestions,
  serviceAreas,
  services,
} from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Video Editing & Content Services",
  description:
    "Video editing, AI-assisted content, social media planning, and scoped production from Fort Lauderdale for remote clients and South Florida businesses.",
  path: "/services",
  locale: "en",
});

const serviceProof: Record<
  string,
  { href: string; label: string; detail: string }
> = {
  editing: {
    href: "/portfolio/homeowners",
    label: "Homeowners",
    detail: "Published script and video-editing work.",
  },
  "ai-content": {
    href: "/portfolio/my-dler",
    label: "My D'ler",
    detail: "Related brand visuals, social designs, 3D video, and product mockups.",
  },
  "social-planning": {
    href: "/portfolio/ml-colombia",
    label: "ML Colombia",
    detail: "A published social-media video from Esteban's portfolio.",
  },
  "on-location": {
    href: "/portfolio/bar-door-monkey",
    label: "Bar Door Monkey Miami",
    detail: "Pre-production, location, videography, and editing in one project.",
  },
};

export default function ServicesPage() {
  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": absoluteUrl("/services#services"),
    name: "Creative production services",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.description,
        url: absoluteUrl(`/services#${service.id}`),
        provider: {
          "@id": entityIds.business,
        },
        areaServed: serviceAreas.map((area) => area.name),
      },
    })),
  };

  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Services
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-6xl">
            Editing, AI-assisted creative, social planning, and scoped production.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Start with the outcome and where the content will be used. Esteban
            can work remotely with footage you already have or plan a focused
            South Florida capture after the location and project needs are known.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              const proof = serviceProof[service.id];
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="scroll-mt-24 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#101214] text-[#e85d3e]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-serif text-3xl leading-tight">
                        {service.name}
                      </h2>
                      <p className="mt-3 leading-7 text-[#252a2d]">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3 text-sm text-[#252a2d]">
                    <li className="flex gap-3">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-[#1a9fa3]"
                        aria-hidden="true"
                      />
                      <span>{service.detail}</span>
                    </li>
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#ddd4c8] px-3 py-1 text-xs uppercase text-[#5a6066]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {proof ? (
                    <Link
                      href={proof.href}
                      className="group mt-6 block rounded-md border border-[#ddd4c8] bg-white/50 p-4 hover:border-[#e85d3e]"
                    >
                      <span className="text-xs font-medium uppercase text-[#5a6066]">
                        Related published work
                      </span>
                      <span className="mt-2 flex items-center justify-between gap-3 font-serif text-xl">
                        {proof.label}
                        <ArrowRight
                          className="size-4 shrink-0 text-[#9f3c27] transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-[#5a6066]">
                        {proof.detail}
                      </span>
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>

          <section className="mt-14" aria-labelledby="delivery-model-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Remote or on location
            </p>
            <h2
              id="delivery-model-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Compare remote work with selectively scoped local production.
            </h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <Laptop className="size-7 text-[#1a9fa3]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">Remote-first work</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  Editing, AI-assisted creative, and social planning can begin
                  with existing footage, references, and the publishing goal.
                  The client does not need to be in South Florida for those
                  services.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#editing">
                    Video editing
                  </Link>
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#ai-content">
                    AI-assisted content
                  </Link>
                  <Link className="text-[#9f3c27] underline underline-offset-4" href="#social-planning">
                    Social planning
                  </Link>
                </div>
              </article>
              <article className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6">
                <MapPin className="size-7 text-[#e85d3e]" aria-hidden="true" />
                <h3 className="mt-4 font-serif text-3xl">South Florida capture</h3>
                <p className="mt-3 leading-7 text-[#252a2d]">
                  Fort Lauderdale and Broward are the local base. Selected
                  Miami-Dade projects are available, while Palm Beach County
                  remains an expansion area considered by project.
                </p>
                <Link
                  href="/areas"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#9f3c27]"
                >
                  Compare service areas
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="process-heading">
            <p className="text-xs font-medium uppercase text-[#5a6066]">
              Scoping questions
            </p>
            <h2
              id="process-heading"
              className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
            >
              Questions that help define an individual project.
            </h2>
            <ul className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {scopingQuestions.map((question, index) => (
                <li
                  key={question.name}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-5"
                >
                  <span className="text-xs font-medium uppercase text-[#9f3c27]">
                    Question {index + 1}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl">{question.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#252a2d]">
                    {question.detail}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-14 rounded-lg bg-[#101214] p-6 text-[#f6f1ea] sm:p-8">
            <h2 className="font-serif text-4xl">Not sure which service fits?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#d8d0c7]">
              Send the project goal, location, date, and where the final asset
              will be used. Esteban can shape the scope from there.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#c84a2c] px-6 text-sm font-medium text-white hover:bg-[#a93e29]"
              >
                Start a project
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                View published work
              </Link>
              <Link
                href="/guides"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 text-sm font-medium text-white hover:bg-white hover:text-[#101214]"
              >
                Read practical video guides
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
