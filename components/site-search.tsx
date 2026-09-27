"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import RailFinder from "@/vendor/rail-kit/RailFinder";
import { searchEntries } from "@/lib/site-search";

/**
 * Search the whole site: the kit's finder (a tall sheet, keyboard and screen
 * reader handled, telemetry in the DOM). Its entries are built from the same
 * data as the pages. The bottom navigation's "Buscar" opens this same one.
 *
 * ARMED ON FIRST TAP. The finder renders its full result list inside a closed
 * dialog, so mounting it up front put ~1,800 words (every page title and
 * summary on the site) into the HTML of every page — measured by the
 * text-parity gate on all 91 Spanish routes. Until someone asks to search,
 * this is only the trigger: same classes, same data attribute.
 */
export function SiteSearch() {
  const pathname = usePathname();
  const es = pathname === "/es" || pathname.startsWith("/es/");
  const label = es ? "Buscar" : "Search";
  const [armed, setArmed] = useState(false);
  const entries = useMemo(() => (armed ? searchEntries(es ? "es" : "en") : []), [armed, es]);

  // Once the real finder exists, open it — the tap that armed it asked for that.
  useEffect(() => {
    if (!armed) return;
    document.querySelector<HTMLButtonElement>('button[data-rail-finder="site_search"]')?.click();
  }, [armed]);

  if (!armed) {
    return (
      <button
        type="button"
        className="rail-finder__trigger rail-finder__trigger--icon em-search"
        data-rail-finder="site_search"
        aria-label={label}
        onClick={() => setArmed(true)}
      >
        <span className="rail-finder__glyph">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5 21 21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <RailFinder
      className="em-search"
      entries={entries}
      trigger="icon"
      layout="rows"
      title={es ? "Buscar en el sitio" : "Search the site"}
      label={label}
      placeholder={es ? "Paquetes, servicios, zonas…" : "Packages, services, areas…"}
      noResultsLabel={es ? "No encontré nada con eso. Prueba otra palabra." : "Nothing matches. Try another word."}
      countLabel={(n) => (es ? `${n} resultados` : `${n} results`)}
      closeLabel={es ? "Cerrar" : "Close"}
      source="site_search"
    />
  );
}
