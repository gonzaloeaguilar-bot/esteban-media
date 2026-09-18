"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

/**
 * The action that follows you down the page.
 *
 * The hero call to action was moved above the fold, which fixes the FIRST
 * screen and nothing after it. Measured on a 375px phone: a niche page is
 * eleven screens, a service page twenty-two, the Spanish home forty-four. For
 * all but the first there was no way to act without scrolling back up. This is
 * that way.
 *
 * It lives in the site chrome rather than in a template, because a visitor does
 * not care which template they are on. A page opts in simply by marking its
 * hero actions with `data-em-hero-actions`; a page with no such marker has no
 * primary action to shadow, and the bar never renders there.
 *
 * It is the kit's `rail-stickybar`, which ships hidden (`translateY(100%)`)
 * until something sets `data-rail-visible`. The kit owns the state; WHEN it
 * turns on is this site's decision, and the decision is: only once the hero
 * action has genuinely left the screen. A bar that appears while the button it
 * duplicates is still on screen is two of the same button, which is noise —
 * and it was covering the secondary actions when tested that way.
 *
 * Phone only. A desktop reading of the same page is a handful of screens with
 * the header still in reach, so a fixed bar there would cover content to solve
 * a problem that viewport does not have.
 */
export function StickyCta() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [armed, setArmed] = useState(false);

  const spanish = pathname === "/es" || pathname.startsWith("/es/");
  const href = spanish ? "/es/contacto" : "/contact";
  const label = spanish ? "Consultar" : "Enquire";

  // A bar offering the contact page while you are ON the contact page is a
  // button that goes where you already are. Caught by walking every page type
  // rather than only the templates this work touched.
  const onDestination = pathname === href;

  useEffect(() => {
    setVisible(false);
    if (onDestination) {
      setArmed(false);
      return;
    }
    // The hero actions if the page has any; otherwise the headline. A page
    // whose first action is a thousand pixels down — /es/sobre-esteban has no
    // hero action at all, measured — is precisely the page that needs a bar
    // following it, so falling back to the h1 arms it there rather than
    // skipping it. The rule is the same either way: show the bar once the top
    // of the page is behind you.
    const anchor =
      document.querySelector("[data-em-hero-actions]") ??
      document.querySelector("main h1");
    if (!anchor) {
      setArmed(false);
      return;
    }
    setArmed(true);
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [pathname, onDestination]);

  if (!armed) return null;

  return (
    <div
      className="em-stickybar rail-stickybar"
      data-rail-visible={visible ? "true" : "false"}
      // Hidden from assistive tech while it is off screen, so a screen reader
      // does not meet a button that is not there. The hero action is the one in
      // the reading order until this replaces it.
      aria-hidden={visible ? undefined : "true"}
    >
      <div className="rail-stickybar__in">
        <Link
          href={href}
          className="rail-stickybar__action em-stickybar__action"
          tabIndex={visible ? undefined : -1}
        >
          {label}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
