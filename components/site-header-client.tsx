"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

const englishNav = [
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/es", label: "Español" },
  { href: "/contact", label: "Contact" },
];

const spanishNav = [
  { href: "/es/servicios", label: "Servicios" },
  { href: "/es/areas", label: "Áreas" },
  { href: "/es/sobre-esteban", label: "Sobre Esteban" },
  { href: "/", label: "English" },
  { href: "/es/contacto", label: "Contacto" },
];

export function SiteHeaderClient({ shortName }: { shortName: string }) {
  const pathname = usePathname();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const nav = isSpanish ? spanishNav : englishNav;

  useEffect(() => {
    document.documentElement.lang = isSpanish ? "es-US" : "en-US";
  }, [isSpanish]);

  return (
    <header className="sticky top-0 z-40 border-b border-[#ddd4c8] bg-[#f6f1ea]/92 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href={isSpanish ? "/es" : "/"} className="flex min-w-0 items-center gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[#e85d3e] font-serif text-lg italic text-white">
            e
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg">{shortName}</span>
            <span className="hidden text-xs uppercase text-[#5a6066] sm:block">
              {isSpanish ? "Edición / IA / Redes" : "Editing / AI / Social"}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={isSpanish ? "Navegación principal" : "Primary navigation"}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-[#252a2d] transition-colors hover:bg-[#ece5da] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e85d3e]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={isSpanish ? "/es/contacto" : "/contact"}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c84a2c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e85d3e]"
        >
          {isSpanish ? "Empezar" : "Start"}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
