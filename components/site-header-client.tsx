"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";

const englishNav = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/areas", label: "Areas" },
  { href: "/about", label: "About" },
];

const spanishNav = [
  { href: "/es/servicios", label: "Servicios" },
  { href: "/es/portafolio", label: "Portafolio" },
  { href: "/es/areas", label: "Áreas" },
  { href: "/es/sobre-esteban", label: "Sobre Esteban" },
];

const pairedLanguageRoutes: Record<string, string> = {
  "/": "/es",
  "/services": "/es/servicios",
  "/portfolio": "/es/portafolio",
  "/areas": "/es/areas",
  "/areas/palm-beach-county": "/es/areas/palm-beach-county",
  "/about": "/es/sobre-esteban",
  "/contact": "/es/contacto",
  "/es": "/",
  "/es/servicios": "/services",
  "/es/portafolio": "/portfolio",
  "/es/areas": "/areas",
  "/es/areas/palm-beach-county": "/areas/palm-beach-county",
  "/es/sobre-esteban": "/about",
  "/es/contacto": "/contact",
};

export function SiteHeaderClient({ shortName }: { shortName: string }) {
  const pathname = usePathname();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const languageHref =
    pairedLanguageRoutes[pathname] ?? (isSpanish ? "/" : "/es");
  const nav = [
    ...(isSpanish ? spanishNav : englishNav),
    { href: languageHref, label: isSpanish ? "English" : "Español" },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

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
          className="hidden items-center gap-1 lg:flex"
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

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={isSpanish ? "/es/contacto" : "/contact"}
            className="hidden items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#c84a2c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e85d3e] sm:inline-flex"
          >
            {isSpanish ? "Empezar" : "Start"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#b9aa9a] px-4 text-sm font-medium text-[#252a2d] hover:border-[#e85d3e] lg:hidden"
          >
            {isMenuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
            {isSpanish ? "Menú" : "Menu"}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-primary-navigation"
          className="border-t border-[#ddd4c8] bg-[#f6f1ea] lg:hidden"
          aria-label={isSpanish ? "Navegación móvil" : "Mobile navigation"}
        >
          <div className="mx-auto grid w-full max-w-7xl gap-1 px-4 py-4 sm:grid-cols-2 sm:px-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-[#252a2d] hover:bg-[#ece5da]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={isSpanish ? "/es/contacto" : "/contact"}
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#e85d3e] px-5 text-sm font-medium text-white sm:col-span-2"
            >
              {isSpanish ? "Cotizar un proyecto" : "Start a project"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
