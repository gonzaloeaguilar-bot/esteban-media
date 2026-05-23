import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { languageAlternates, spanishAreas } from "@/lib/spanish-site";

export const metadata: Metadata = {
  title: "Áreas de Servicio en Español",
  description:
    "Fotografía, video, drone y reels en Fort Lauderdale, Broward County y Miami-Dade para negocios y creadores que prefieren trabajar en español.",
  alternates: {
    canonical: "/es/areas",
    languages: languageAlternates["/es/areas"],
  },
};

export default function SpanishAreasPage() {
  return (
    <main className="bg-[#f6f1ea] text-[#101214]">
      <section className="py-12 sm:py-16">
        <Container size="xl">
          <p className="text-xs font-medium uppercase text-[#5a6066]">
            Áreas de servicio
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-none sm:text-6xl">
            Fort Lauderdale como base, Miami y Broward como mercado.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#252a2d]">
            Esteban cubre proyectos seleccionados en South Florida para clientes
            que necesitan una comunicación clara en español o inglés.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {spanishAreas.map((area) => (
              <article
                key={area.name}
                className="rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-6"
              >
                <MapPin className="size-6 text-[#e85d3e]" aria-hidden="true" />
                <h2 className="mt-5 font-serif text-3xl">{area.name}</h2>
                <p className="mt-2 text-xs uppercase text-[#5a6066]">
                  {area.county}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#252a2d]">
                  {area.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {area.neighborhoods.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-[#ddd4c8] px-3 py-1 text-xs uppercase text-[#5a6066]"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <Link
            href="/es/contacto"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-6 text-sm font-medium text-white hover:bg-[#c84a2c]"
          >
            Preguntar por mi ciudad
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </main>
  );
}
