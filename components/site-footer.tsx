import Link from "next/link";
import { Mail, Send } from "lucide-react";

import { serviceAreas, services, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#101214] text-[#f6f1ea]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="max-w-sm font-serif text-4xl leading-none">
            Local stories, cut with a calm hand.
          </p>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#c9c1b8]">
            {site.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#f6f1ea]/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              <Mail className="size-4" aria-hidden="true" />
              Email
            </a>
            <a
              href={site.instagram}
              className="inline-flex items-center gap-2 rounded-full border border-[#f6f1ea]/20 px-4 py-2 text-sm hover:bg-white/10"
            >
              <Send className="size-4" aria-hidden="true" />
              Instagram
            </a>
          </div>
        </div>

        <FooterList
          title="Services"
          items={services.map((service) => ({
            href: `/services#${service.id}`,
            label: service.shortName,
          }))}
        />
        <FooterList
          title="Areas"
          items={serviceAreas.map((area) => ({
            href: "/areas",
            label: area.name,
          }))}
        />
        <FooterList
          title="Site"
          items={[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "/areas", label: "Areas" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
            { href: "/es", label: "Español" },
            { href: "/es/sobre-esteban", label: "Sobre Esteban" },
          ]}
        />
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-xs text-[#c9c1b8] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3">
          <span>© 2026 {site.name}. {site.location}.</span>
          <span>{site.domain}</span>
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
