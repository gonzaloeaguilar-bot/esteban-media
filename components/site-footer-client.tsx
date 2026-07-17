"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, Send } from "lucide-react";

type FooterProps = {
  description: string;
  spanishDescription: string;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  instagram: string;
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
      { href: "/services#product-aerial", label: "Photo + aerial" },
    ],
  },
  {
    title: "Areas",
    items: [
      { href: "/areas", label: "Fort Lauderdale" },
      { href: "/areas", label: "Broward County" },
      { href: "/areas", label: "Miami-Dade" },
      { href: "/areas/palm-beach-county", label: "Palm Beach County" },
    ],
  },
  {
    title: "Site",
    items: [
      { href: "/", label: "Home" },
      { href: "/services", label: "Services" },
      { href: "/areas", label: "Areas" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
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
      { href: "/es/servicios#fotografia", label: "Foto + aéreo" },
    ],
  },
  {
    title: "Áreas",
    items: [
      { href: "/es/areas", label: "Fort Lauderdale" },
      { href: "/es/areas", label: "Broward County" },
      { href: "/es/areas", label: "Miami-Dade" },
      { href: "/es/areas/palm-beach-county", label: "Palm Beach County" },
    ],
  },
  {
    title: "Sitio",
    items: [
      { href: "/es", label: "Inicio" },
      { href: "/es/servicios", label: "Servicios" },
      { href: "/es/areas", label: "Áreas" },
      { href: "/es/sobre-esteban", label: "Sobre Esteban" },
      { href: "/es/contacto", label: "Contacto" },
      { href: "/", label: "English" },
    ],
  },
];

export function SiteFooterClient(props: FooterProps) {
  const pathname = usePathname();
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const groups = isSpanish ? spanishGroups : englishGroups;

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
              className="inline-flex items-center gap-2 rounded-full border border-[#f6f1ea]/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              <Send className="size-4" aria-hidden="true" />
              Instagram
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
