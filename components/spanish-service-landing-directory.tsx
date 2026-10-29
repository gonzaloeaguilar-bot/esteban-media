import Link from "next/link";
import React from "react";

import { spanishNichePages } from "@/lib/spanish-site";
import { isConsolidatedPath } from "@/lib/consolidation";
import {
  DIRECTORY_GROUP_LABELS,
  groupDirectoryItems,
} from "@/lib/service-directory-groups";

// Grouped under h3 headings so no block of links runs past 250 words
// (dual-audience gate, 2026-10-24). The uppercase location line was dropped:
// every title already names its city, and the repeat doubled the word count.
const groups = groupDirectoryItems(
  spanishNichePages.filter((page) => !isConsolidatedPath(`/es/${page.slug}`)),
  (page) => page.slug,
);

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
      {groups.map((group) => (
        <div key={group.key} className="mt-8">
          <h3 className="font-serif text-2xl leading-tight">
            {DIRECTORY_GROUP_LABELS.es[group.key]}
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/es/${page.slug}`}
                  className="block min-h-16 rounded-lg border border-[#ddd4c8] bg-[#fbf6ef] p-4 font-serif text-base leading-6 text-[#101214] hover:border-[#e85d3e] hover:text-[#9f3c27]"
                >
                  {page.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
