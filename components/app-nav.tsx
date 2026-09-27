"use client";

import { usePathname } from "next/navigation";
import { Clapperboard, Home, MessageCircle, Package, Search } from "lucide-react";

import RailBottomNav from "@/vendor/rail-kit/RailBottomNav";
import { whatsappHref } from "@/lib/packages";
import { site } from "@/lib/site";

/**
 * The app bar on phones: five destinations under the thumb, from the kit.
 *
 * It replaces the old single sticky "Consultar" button. That bar offered one
 * action; this offers the four places people actually go (home, packages,
 * work, talk) plus search, which opens the site finder in the header. Phones
 * only — a desktop has the header within reach (see app/cinema.css).
 */
export function AppNav() {
  const pathname = usePathname();
  const es = pathname === "/es" || pathname.startsWith("/es/");
  const home = es ? "/es" : "/";

  const items = [
    { id: "home", label: es ? "Inicio" : "Home", href: home, icon: <Home /> },
    { id: "packages", label: es ? "Paquetes" : "Packages", href: es ? "/es/precios" : "/pricing", icon: <Package /> },
    { id: "search", label: es ? "Buscar" : "Search", href: "#buscar", icon: <Search /> },
    { id: "work", label: es ? "Trabajo" : "Work", href: es ? "/es/portafolio" : "/portfolio", icon: <Clapperboard /> },
    {
      id: "talk",
      label: es ? "Hablar" : "Talk",
      href: whatsappHref(site.phone.e164, es ? "Hola Esteban, vi tu página." : "Hi Esteban, I saw your site."),
      icon: <MessageCircle />,
    },
  ];

  const activeId =
    pathname === home ? "home" : pathname.includes("portaf") || pathname.includes("portfolio") ? "work" : undefined;

  return (
    <RailBottomNav
      className="em-appnav"
      floating
      items={items}
      activeId={activeId}
      label={es ? "Atajos" : "Shortcuts"}
      source="app_nav"
      onSelect={({ id }) => {
        if (id === "home" && pathname === home) {
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          });
          return;
        }
        if (id !== "search") return;
        // One finder on the page (in the header); the tab opens it.
        document.querySelector<HTMLButtonElement>('button[data-rail-finder="site_search"]')?.click();
        history.replaceState(null, "", location.pathname + location.search);
      }}
    />
  );
}
