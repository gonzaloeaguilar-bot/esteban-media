"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, PlaySquare, Send } from "lucide-react";

import { getPairedLanguageRoute } from "@/lib/language-routes";

type FooterProps = {
  description: string;
  spanishDescription: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  instagram: string;
  youtube: string;
  domain: string;
  location: string;
  name: string;
};

const englishGroups = [
  {
    title: "Services",
    items: [
      { href: "/services#editing", label: "Video editing" },
      { href: "/services#ai-content", label: "AI content" },
      { href: "/services#social-planning", label: "Social planning" },
      { href: "/services#on-location", label: "Local capture" },
    ],
  },
  {
    title: "Areas",
    items: [
      { href: "/areas#fort-lauderdale", label: "Fort Lauderdale" },
      { href: "/areas#broward-county", label: "Broward County" },
      { href: "/areas#miami-dade", label: "Miami-Dade" },
      { href: "/areas/palm-beach-county", label: "Palm Beach County" },
    ],
  },
  {
    title: "Plan a project",
    items: [
      { href: "/calculator", label: "Budget calculator" },
      { href: "/assessment", label: "Video strategy diagnostic" },
      { href: "/resources/social-video-kit", label: "Script & safe-zone kit" },
    ],
  },
  {
    title: "Site",
    items: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/portfolio/homeowners", label: "Homeowners edit" },
      { href: "/guides", label: "Video guides" },
      { href: "/daily-publish-prompt", label: "Daily publishing prompt" },
      { href: "/daily-hook-planner", label: "Daily video hook planner" },
      { href: "/areas", label: "Areas" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/es", label: "Español" },
    ],
  },
];

const spanishGroups = [
  {
    title: "Servicios",
    items: [
      { href: "/es/servicios#edicion", label: "Edición" },
      { href: "/es/servicios#contenido-ia", label: "Contenido IA" },
      { href: "/es/servicios#planificacion-social", label: "Plan social" },
      { href: "/es/servicios#videografia", label: "Video" },
    ],
  },
  {
    title: "Áreas",
    items: [
      { href: "/es/areas#fort-lauderdale", label: "Fort Lauderdale" },
      { href: "/es/areas#broward-county", label: "Broward County" },
      { href: "/es/areas#miami-dade", label: "Miami-Dade" },
      { href: "/es/areas/palm-beach-county", label: "Palm Beach County" },
    ],
  },
  {
    title: "Planea tu proyecto",
    items: [
      { href: "/es/calculadora", label: "Calculadora de presupuesto" },
      { href: "/es/evaluacion", label: "Diagnóstico de estrategia" },
      { href: "/es/recursos/kit-video-social", label: "Kit de guiones y zonas seguras" },
    ],
  },
  {
    title: "Sitio",
    items: [
      { href: "/es", label: "Inicio" },
      { href: "/es/servicios", label: "Servicios" },
      { href: "/es/portafolio", label: "Portafolio" },
      { href: "/es/portafolio/homeowners", label: "Edición Homeowners" },
      { href: "/es/guias", label: "Guías de video" },
      { href: "/es/prompt-de-publicacion-diaria", label: "Prompt de publicación diaria" },
      { href: "/es/planificador-de-ganchos-de-video", label: "Planificador de ganchos de video" },
      { href: "/es/areas", label: "Áreas" },
      { href: "/es/sobre-esteban", label: "Sobre Esteban" },
      { href: "/es/contacto", label: "Contacto" },
      { href: "/es/privacidad", label: "Privacidad" },
      { href: "/", label: "English" },
    ],
  },
];

export function SiteFooterClient(props: FooterProps) {
  const pathname = usePathname();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const languageHref = getPairedLanguageRoute(pathname);
  const groups = (isSpanish ? spanishGroups : englishGroups).map((group) => ({
    ...group,
    items: group.items.map((item) =>
      item.label === (isSpanish ? "English" : "Español")
        ? { ...item, href: languageHref }
        : item,
    ),
  }));

  return (
    <footer className="bg-[#101214] text-[#f6f1ea]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="max-w-sm font-serif text-4xl leading-none">
            {isSpanish
              ? "Historias locales, editadas con una mirada tranquila."
              : "Local stories, cut with a calm hand."}
          </p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#c9c1b8]">
            {isSpanish ? props.spanishDescription : props.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${props.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#f6f1ea]/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              <Mail className="size-4" aria-hidden="true" />
              {isSpanish ? "Correo" : "Email"}
            </a>
            <a
              href={props.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-[#f6f1ea]/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              <Phone className="size-4" aria-hidden="true" />
              {props.phoneDisplay}
            </a>
            <a
              href={props.instagram}
              rel="me"
              className="inline-flex items-center gap-2 rounded-full border border-[#f6f1ea]/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              <Send className="size-4" aria-hidden="true" />
              Instagram
            </a>
            <a
              href={props.youtube}
              rel="me"
              className="inline-flex items-center gap-2 rounded-full border border-[#f6f1ea]/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              <PlaySquare className="size-4" aria-hidden="true" />
              YouTube
            </a>
          </div>
        </div>

        {groups.map((group) => (
          <FooterList key={group.title} title={group.title} items={group.items} />
        ))}
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-xs text-[#c9c1b8] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <span>
            © 2026 {props.name}. {props.location}.
          </span>
          <span>{props.domain}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterList({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-xs font-medium uppercase text-[#9f978e]">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link href={item.href} className="text-[#f6f1ea] hover:text-[#ffb49e]">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
