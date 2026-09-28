"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
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

  // The bar gets out of the way while you read, and comes back the moment you
  // reach for it — the behaviour every phone app has.
  //
  // Measured on the English home at 402x874 before this: walking the page with
  // the bar always visible put it over 52 elements, including the camera
  // playground's own buttons (Viewfinder, Turret, Lens, Reset, Studio, Night)
  // and three of the four chooser links. A floating bar cannot avoid crossing
  // content — so it leaves while the content is moving.
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".em-appnav");
    if (!nav) return;
    const reduced = !document.documentElement.classList.contains("rail-anim");
    let lastY = window.scrollY;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const y = window.scrollY;
      const dy = y - lastY;
      // A closing section still wins: it owns the bar outright.
      if (nav.dataset.pinnedHidden === "1") { lastY = y; return; }
      if (Math.abs(dy) < 6) return;
      // Never hide at the very top or the very bottom of the page.
      const atTop = y < 120;
      const atEnd = y + window.innerHeight > document.body.scrollHeight - 160;
      if (dy > 0 && !atTop && !atEnd) nav.setAttribute("data-hidden", "");
      else nav.removeAttribute("data-hidden");
      lastY = y;
    };

    const onScroll = () => {
      if (reduced) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // The closing section offers the same three actions the bar does, and on a
  // phone the floating bar sat over the package price. `data-em-hides-sticky`
  // was already in the markup and nothing read it, so the bar never moved.
  useEffect(() => {
    const targets = document.querySelectorAll("[data-em-hides-sticky]");
    const nav = document.querySelector<HTMLElement>(".em-appnav");
    if (!nav || targets.length === 0 || typeof IntersectionObserver !== "function") return;
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        if (visible.size > 0) {
          nav.dataset.pinnedHidden = "1";
          nav.setAttribute("data-hidden", "");
        } else {
          delete nav.dataset.pinnedHidden;
          nav.removeAttribute("data-hidden");
        }
      },
      { threshold: 0.2 },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);
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

  // The bar reports itself with STABLE ids.
  //
  // Measured on production 2026-09-28: a tap did emit cta_click — but with
  // cta_id "trabajo" on /es and "work" on /, because the shared layer falls
  // back to the visible label when there is no data-cta. The same tab was two
  // different ids, so no cross-locale funnel could group it, and cta_position
  // came back as "page" rather than the bar.
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".em-appnav");
    if (!nav) return;
    nav.setAttribute("data-section", "app_nav");
    const links = nav.querySelectorAll<HTMLElement>(".rail-bottomnav__link");
    links.forEach((link, i) => {
      const id = items[i]?.id;
      if (id) link.setAttribute("data-cta", `app_nav_${id}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


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
