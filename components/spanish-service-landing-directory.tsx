import Link from "next/link";
import React from "react";

import { spanishNichePages } from "@/lib/spanish-site";

export function SpanishServiceLandingDirectory() {
  return (
    <section className="mt-14" aria-labelledby="spanish-service-landing-directory-heading">
      <p className="text-xs font-medium uppercase text-[#5a6066]">
        Guías de servicio y cobertura
      </p>
      <h2
        id="spanish-service-landing-directory-heading"
        className="mt-4 max-w-3xl font-serif text-4xl leading-tight"
      >
        Explora servicios especializados por sector y mercado en South Florida.
      </h2>
      <p className="mt-4 max-w-3xl leading-7 text-[#252a2d]">
        Estas páginas detallan el alcance, la preparación de archivos y el encaje
        técnico para proyectos específicos en Fort Lauderdale, Miami-Dade, Broward
        y Palm Beach County.
      </p>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {spanishNichePages.map((page) => (
          <li key={page.slug}>
            <Link
              href={`/es/${page.slug}`}
              className="block min-h-16 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 text-sm font-medium leading-6 text-[#252a2d] hover:border-[#e85d3e] hover:text-[#9f3c27]"
            >
              <span className="block font-serif text-base text-[#101214]">{page.title}</span>
              <span className="mt-1 block text-xs uppercase tracking-wider text-[#5a6066]">
                {page.location}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
