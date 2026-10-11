"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, MessageCircle, X } from "lucide-react";

import { SiteSearch } from "@/components/site-search";

import { getPairedLanguageRoute } from "@/lib/language-routes";
import { whatsappHref } from "@/lib/packages";
import { quoteCtaLabel } from "@/lib/quote-cta";
import { site } from "@/lib/site";

export const englishNav = [
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/areas", label: "Areas" },
  { href: "/about", label: "About" },
];

export const spanishNav = [
  { href: "/es/servicios", label: "Servicios" },
  { href: "/es/portafolio", label: "Portafolio" },
  { href: "/es/casos-de-estudio", label: "Casos de estudio" },
  { href: "/es/areas", label: "Áreas" },
  { href: "/es/sobre-esteban", label: "Sobre Esteban" },
];

export function SiteHeaderClient({ shortName }: { shortName: string }) {
  const pathname = usePathname();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const languageHref = getPairedLanguageRoute(pathname);
  const nav = isSpanish ? spanishNav : englishNav;

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
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-8">
        <Link href={isSpanish ? "/es" : "/"} className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[var(--em-accent-ink)] font-serif text-lg italic text-white">
            e
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg">{shortName}</span>
            <span className="hidden text-xs uppercase text-[#5a6066] sm:block">
              {isSpanish ? "Edición / Web & IA / Redes" : "Editing / Web & AI / Social"}
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
          <SiteSearch />
          <a
            href={languageHref}
            hrefLang={isSpanish ? "en" : "es"}
            aria-label={isSpanish ? "English" : "Español"}
            data-cta="header_language"
            data-section="header"
            className="em-language-control"
            onClick={() => {
              document.cookie = `em_lang=${isSpanish ? "en" : "es"}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
            }}
          >
            <Globe className="size-4" aria-hidden="true" />
            <span className="em-language-word">{isSpanish ? "English" : "Español"}</span>
            <span className="em-language-short" aria-hidden="true">{isSpanish ? "EN" : "ES"}</span>
          </a>
          {/* The site's one primary action, worded the same everywhere (see
              lib/quote-cta.ts). The greeting is the phone app bar's, so the
              two entry points open the same conversation. /contact stays in
              the footer for visitors who prefer the form. */}
          <a
            href={whatsappHref(
              site.phone.e164,
              isSpanish ? "Hola Esteban, vi tu página." : "Hi Esteban, I saw your site.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="header_whatsapp"
            data-section="header"
            className="hidden items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--em-accent-ink-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c84a2c] sm:inline-flex"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {quoteCtaLabel(isSpanish ? "es" : "en")}
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="em-header-menu inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full border border-[#b9aa9a] px-3 text-sm font-medium text-[#252a2d] hover:border-[#e85d3e] lg:hidden sm:px-4"
          >
            {isMenuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
            <span className="em-menu-label">{isSpanish ? "Menú" : "Menu"}</span>
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
            <a
              href={whatsappHref(
                site.phone.e164,
                isSpanish ? "Hola Esteban, vi tu página." : "Hi Esteban, I saw your site.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              data-cta="header_menu_whatsapp"
              data-section="header"
              className="mt-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--em-accent-ink)] px-5 text-sm font-medium text-white hover:bg-[var(--em-accent-ink-hover)] sm:col-span-2"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {quoteCtaLabel(isSpanish ? "es" : "en")}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
