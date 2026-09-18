"use client";

import { useEffect, useRef } from "react";

/**
 * The entrance.
 *
 * WHAT THIS IS NOT, and the reason matters more than the code.
 *
 * The reference build's entrance is the client's own SIGNATURE, written left
 * to right in a hand script, under a line he actually said. That works because
 * both are real: a signature he owns and a sentence pulled from his own
 * conversations, verified against the source transcript.
 *
 * Neither exists for Esteban. There is no signature asset, and there is no
 * verified quotation — AGENTS.md is explicit that clients, results, reviews
 * and claims are never invented. Writing "Esteban Moreno" in a handwriting
 * font would be forging a signature he never gave, and putting words under it
 * would be worse. So this entrance uses only what the site already publishes
 * under its own name: the wordmark, a rule, and the tagline that is already
 * rendered on the homepage.
 *
 * It is deliberately small. From the same build's notes: "lo bonito del intro
 * loader es que no es muy complicado" — every piece added takes away from the
 * one thing worth looking at.
 *
 * SAFETY, in the order the failures actually happen:
 *  1. Rendered `hidden` and only revealed under `html.rail-anim`, so no-JS and
 *     reduced-motion never see it and nothing covers the page.
 *  2. It lifts itself with a CSS animation. If every line of JS below dies,
 *     the curtain still leaves.
 *  3. Any key, a click, a wheel or a touch dismisses it immediately.
 *  4. It runs once per session. A curtain on every page view is a toll.
 */

export const INTRO_SESSION_KEY = "em-seen";

export function SiteIntro({ tagline }: { tagline: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;

    // Returning within the session, or motion turned down: never show.
    if (!root.classList.contains("rail-anim") || root.classList.contains("em-returning")) {
      el.remove();
      return;
    }

    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      /* private mode: the curtain simply shows again next time */
    }

    const dismiss = () => {
      el.dataset.done = "true";
      // Let the exit transition finish, then take it out of the DOM entirely.
      // Removing beats hiding: an element that is gone cannot come back over
      // the page on a restore, and a hidden one demonstrably can.
      window.setTimeout(() => el.remove(), 600);
      detach();
    };

    const onKey = (e: KeyboardEvent) => {
      // Tab is how a keyboard visitor reaches the skip button; everything else
      // means "get on with it".
      if (e.key === "Tab") return;
      dismiss();
    };

    const detach = () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
      el.removeEventListener("click", dismiss);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", dismiss, { passive: true });
    window.addEventListener("touchstart", dismiss, { passive: true });
    el.addEventListener("click", dismiss);

    // Final net: whatever happens above, the curtain is gone by then.
    const gone = window.setTimeout(() => el.remove(), 5200);

    return () => {
      detach();
      window.clearTimeout(gone);
    };
  }, []);

  return (
    <div ref={ref} id="em-intro" hidden aria-hidden="true">
      <div className="em-intro__inner">
        <p className="em-intro__mark">Esteban Moreno</p>
        <span className="em-intro__rule" />
        <p className="em-intro__line">{tagline}</p>
      </div>
      <button type="button" className="em-intro__skip">
        Entrar
      </button>
    </div>
  );
}
