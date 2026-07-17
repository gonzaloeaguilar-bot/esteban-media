import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import {
  languageAlternates,
  spanishNichePages,
  spanishServices,
  spanishSite,
} from "@/lib/spanish-site";

export const metadata: Metadata = {
  title: "Servicios en Español",
  description:
    "Edición de video, contenido con IA, planificación para redes y producción por proyecto en español desde Fort Lauderdale.",
  alternates: {
    canonical: "/es/servicios",
    languages: languageAlternates["/es/servicios"],
  },
};

export default function SpanishServicesPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Servicios en español
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
            Edición, contenido con IA, planificación y producción según el proyecto.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            {spanishSite.description}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {spanishServices.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  id={service.id}
                  key={service.id}
                  className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
                >
                  <Icon className="size-6 text-[#e85d3e]" aria-hidden="true" />
                  <h2 className="mt-5 font-serif text-3xl">{service.name}</h2>
                  <p className="mt-3 leading-7 text-[#252a2d]">
                    {service.description}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[#5a6066]">
                    {service.detail}
                  </p>
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
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-[#ddd4c8] py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Guías por tipo de proyecto
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight">
            Encuentra el servicio y la zona que más se parecen a tu proyecto.
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {spanishNichePages.map((page) => (
              <Link
                key={page.slug}
                href={`/es/${page.slug}`}
                className="flex min-h-24 items-center justify-between gap-4 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 hover:border-[#e85d3e]"
              >
                <span>
                  <span className="block font-serif text-xl">{page.title}</span>
                  <span className="mt-1 block text-xs uppercase text-[#5a6066]">
                    {page.location}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-[#e85d3e]" />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
