"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * The site half of the motion system.
 *
 * The vendored kit ships the STATES — `.rail-reveal` / `.is-in`, `html.rail-veil`,
 * `[data-rail-shimmer]` — all already behind `prefers-reduced-motion`. It does
 * not ship WHEN those states turn on, because that is routing, hydration and
 * observer work the consuming site owns. This is that half.
 *
 * THE RULE THAT DOES NOT BEND: content never starts invisible waiting for
 * JavaScript. Everything here hangs off `rail-anim`, a class only a script
 * adds, and only when JS runs AND the visitor has not asked for less motion.
 * Without that class nothing is hidden and nothing is covered — a page whose
 * script dies reads completely. That is the correct failure; a blank page is
 * not.
 */

/**
 * Runs before paint, from the document head.
 *
 * It must be inline and synchronous: adding `rail-anim` after first paint
 * would let a block render visible and then snap to opacity 0, which is worse
 * than no animation at all.
 *
 * It no longer touches the veil. That moved to RouteVeil below once measurement
 * showed Next navigates on the client and this script never runs a second time.
 */
export const MOTION_GATE_SCRIPT = `(function(){try{
var d=document.documentElement;
if(!window.matchMedia||!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('rail-anim');}
if(sessionStorage.getItem('em-seen')==='1'){d.classList.add('em-returning');}
}catch(e){}})();`;

export function SiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("rail-anim")) return;

    // ---- reveal on scroll -------------------------------------------------
    // The kit owns the two states; the threshold and the one-shot behaviour
    // are ours. `once` matters: a block that re-hides when it leaves the
    // viewport turns a scroll back up into a flicker.
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-em-reveal]"),
    );
    for (const el of targets) el.classList.add("rail-reveal");

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-in");
            observer?.unobserve(entry.target);
          }
        },
        // A little before the edge, so a block is already arriving rather than
        // visibly popping once it is fully on screen.
        { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
      );
      for (const el of targets) observer.observe(el);
    } else {
      // No observer: show everything rather than hide it.
      for (const el of targets) el.classList.add("is-in");
    }

    return () => {
      observer?.disconnect();
    };
  }, []);

  return null;
}

/**
 * The veil between pages, driven by the ROUTER.
 *
 * The first version of this was a port of the reference build's veil: a
 * sessionStorage marker set on click, read by a script in the next document's
 * head, which adds the class before the first frame. That is exactly right for
 * a static site, and it is IMPOSSIBLE here — measured, not assumed:
 *
 *     documentLoadsDuringNav: 0
 *     navType: 1               (still the original navigation entry)
 *     html class after nav:    "rail-anim"   (no veil)
 *
 * Next's <Link> navigates on the client. There is no second document, so there
 * is no head for a script to run in, and the marker sits unread forever. The
 * veil shipped as dead code and every synthetic check passed: the CSS was
 * correct, the class worked when set by hand, the build was clean, 449 tests
 * green. Only driving a real browser through a real navigation showed it doing
 * nothing.
 *
 * The same soft navigation also removes the problem the reference build spent
 * the most effort on. Its 280ms of frozen screen was the browser fetching and
 * parsing the next DOCUMENT; there is no such fetch here, so the prefetching
 * that fixed it there is not needed and has been dropped rather than carried
 * along as cargo.
 *
 * So: the route changes, the new tree commits, and the plane dissolves off it.
 * Same gesture, same 0.8s, same held beat — a different trigger.
 */
export function RouteVeil() {
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    // No veil on the first paint. Arriving cold from a search result should
    // show the page, not a curtain over it.
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const root = document.documentElement;
    if (!root.classList.contains("rail-anim")) return;

    // Re-adding a class that is already there does not restart a CSS
    // animation. Remove, force a reflow to flush the removal, then add.
    root.classList.remove("rail-veil");
    void root.offsetWidth;
    root.classList.add("rail-veil");

    // The animation removes the plane itself (`forwards` ends at opacity 0 and
    // visibility hidden). This only takes the class back off so the next
    // navigation can re-trigger it.
    const t = window.setTimeout(() => root.classList.remove("rail-veil"), 950);
    return () => {
      window.clearTimeout(t);
      root.classList.remove("rail-veil");
    };
  }, [pathname]);

  return null;
}
