"use client";

/**
 * Measurement for the Rack Focus page.
 *
 * Contract vocabulary only (`section_view`, `cta_click`) through the site's one
 * writer, `window.__estebanTrack`, which attaches the shared block. Calling
 * gtag directly here would ship events without brand/page_type/locale/variant
 * and quietly leave this page out of every cross-brand funnel question.
 *
 * A page with no measurement is not finished.
 */

import { useEffect } from "react";

type SiteTrack = (name: string, params?: Record<string, unknown>) => void;

function track(name: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const send = (window as unknown as { __estebanTrack?: SiteTrack }).__estebanTrack;
  if (typeof send !== "function") return;
  send(name, params);
}

export function LensTelemetry({ locale }: { locale: string }) {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-lens-stop]"),
    );
    if (sections.length === 0) return;

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("data-lens-stop");
          if (!id || seen.has(id)) continue;
          seen.add(id);
          track("section_view", { section_id: id, page_type: "experience", locale });
        }
      },
      { threshold: 0.5 },
    );
    sections.forEach((section) => observer.observe(section));

    const onClick = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest("[data-cta]");
      if (!target) return;
      track("cta_click", {
        cta_id: target.getAttribute("data-cta") ?? "unknown",
        cta_text: target.textContent?.trim().slice(0, 80) || "unknown",
        cta_position: target.getAttribute("data-cta-position") ?? "inline",
        page_type: "experience",
        locale,
      });
    };
    document.addEventListener("click", onClick);

    /**
     * A card that scrolls up past the lower band fades out, so a card on its way
     * off screen never sweeps across the glass — measured at 92-100% occlusion
     * before this existed. The words stay in the served HTML either way; this
     * only changes what a human sees mid-scroll.
     *
     * Visitors who asked for reduced motion keep every card fully opaque.
     */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-lens-card]"));
    let raf = 0;
    const paint = () => {
      raf = 0;
      const band = window.innerHeight * 0.44;
      for (const card of cards) {
        const top = card.getBoundingClientRect().top;
        // Fully visible inside the band; gone one card-height above it.
        const rise = Math.min(1, Math.max(0, (top - band * 0.35) / (band * 0.5)));
        const arrive = Math.min(1, Math.max(0, (window.innerHeight * 0.98 - top) / (band * 0.4)));
        const fade = Math.min(rise, arrive);
        card.style.opacity = String(fade);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(paint);
    };
    if (!reduced && cards.length > 0) {
      paint();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [locale]);

  return null;
}
