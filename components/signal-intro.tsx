"use client";

import { useEffect } from "react";

type MountMoment = (options: {
  name: string;
  html: string;
  runMs: number;
  skipLabel?: string;
}) => void;

const ATTR = "data-brand-moment";

/**
 * The opening: no signal, then the signal locks.
 *
 * It replaces a 3D cinema camera the owner rejected. A camera is the TOOL, and
 * everyone has one; this is a television finding its picture, which is what a
 * visitor about to watch someone's work should feel. Test bars, snow, a card
 * carrying the station ident, one roll, and the picture snaps shut into a line
 * the way a CRT did — and behind it is the site.
 *
 * The word on the card swaps CARGANDO <-> LOADING through a glitch, and the
 * card offers the two languages as real links. For a Spanish-first business
 * with English available, the door is the honest place to say so — and the
 * choice costs a tap instead of a hunt through the header.
 *
 * It is DOM and CSS only: nothing downloads before it can start and there is
 * no capability gate. The 3D opening could not begin until 2.1MB of model,
 * textures and HDRI had arrived.
 *
 * Deliberately short. An opening is a doorway, not a programme: 1.5s, and the
 * kit's skip is there from the first frame.
 *
 * Mounting, skip, dismissal, analytics (brand_moment_shown /
 * brand_moment_complete) and removal stay the kit's (public/web-kit/mount.js).
 * If anything here fails, the veil simply lifts.
 */
export function SignalIntro({ locale }: { locale: "es" | "en" }) {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute(ATTR)) return;

    let cancelled = false;
    const giveUp = () => root.removeAttribute(ATTR);

    const waitForKit = () =>
      new Promise<MountMoment | null>((resolve) => {
        const t0 = performance.now();
        const poll = () => {
          const fn = (window as unknown as { wkMountMoment?: MountMoment }).wkMountMoment;
          if (fn) return resolve(fn);
          if (performance.now() - t0 > 2500) return resolve(null);
          setTimeout(poll, 40);
        };
        poll();
      });

    (async () => {
      const mount = await waitForKit();
      if (cancelled || !mount || !root.hasAttribute(ATTR)) return giveUp();

      const es = locale === "es";

      mount({
        name: "signal_opening",
        // The ceiling, not the plan: the opening locks itself at 2.4s (below),
        // and only a visitor reaching for the language choice gets the rest.
        // The kit's own timer is what actually removes the element, so it has
        // to be the LONGER of the two or the choice disappears mid-reach —
        // measured: at runMs 3200 the card was gone at 3.2s no matter what.
        runMs: 6000,
        skipLabel: es ? "Saltar" : "Skip",
        html:
          '<div class="em-signal">' +
          '<div class="em-signal__bars" aria-hidden="true"></div>' +
          '<div class="em-signal__snow" aria-hidden="true"></div>' +
          '<div class="em-signal__card">' +
          // One word in two languages, swapping through a glitch: the site is
          // bilingual, and this says so before a word of copy is read.
          '<p class="em-signal__word">' +
          '<span class="em-signal__w em-signal__w--es" data-text="CARGANDO">CARGANDO</span>' +
          '<span class="em-signal__w em-signal__w--en" data-text="LOADING">LOADING</span>' +
          "</p>" +
          '<p class="em-signal__ident">Esteban Moreno Media</p>' +
          '<div class="em-signal__lang">' +
          '<a class="em-signal__pick" href="/es" data-cta="intro_lang_es" hreflang="es">Español</a>' +
          '<a class="em-signal__pick" href="/" data-cta="intro_lang_en" hreflang="en">English</a>' +
          "</div>" +
          "</div>" +
          '<div class="em-signal__roll" aria-hidden="true"></div>' +
          "</div>",
      });

      const moment = document.querySelector<HTMLElement>(".wk-moment");
      if (!moment) return giveUp();

      // The picture locks and the site is what was behind it.
      const lock = () => {
        moment.classList.add("is-through");
        root.removeAttribute(ATTR);
      };
      let through = window.setTimeout(lock, 2400);

      // Reaching for the language buttons must not race the clock: a visitor
      // whose finger is already on the card gets to finish. Any pointer over
      // the card cancels the auto-dismiss; the skip button still ends it, and
      // so does picking a language (those are real links).
      const hold = () => {
        window.clearTimeout(through);
        through = 0 as unknown as number;
      };
      const card = moment.querySelector(".em-signal__card");
      card?.addEventListener("pointerenter", hold, { once: true });

      // The kit ends the moment on ANY pointerdown (mount.js: finish("tap")),
      // which on a phone meant the tap aimed at "Español" removed the overlay
      // before the link could resolve — the choice did nothing. Measured, not
      // assumed. These two stay in their own bubble.
      for (const pick of moment.querySelectorAll(".em-signal__pick")) {
        pick.addEventListener("pointerdown", (event) => {
          event.stopPropagation();
          hold();
        });
        pick.addEventListener("click", (event) => event.stopPropagation());
      }

      const mo = new MutationObserver(() => {
        if (moment.isConnected) return;
        mo.disconnect();
        if (through) window.clearTimeout(through);
      });
      mo.observe(document.body, { childList: true });
    })();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return null;
}
