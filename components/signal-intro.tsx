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
 * The word on the card swaps CARGANDO <-> LOADING through a glitch: a bilingual
 * business says so before a word of copy is read.
 *
 * The card used to ALSO offer the two languages as real links, because the
 * header hid the switch inside the hamburger on a phone. The header now carries
 * a permanent one-tap language control, so the door no longer has to be the
 * place that choice is made — and the opening no longer has to wait for it.
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
        // The ceiling, not the plan: the opening locks itself at 2.4s (below).
        // The kit's own timer is what actually removes the element, so it stays
        // the LONGER of the two — but only just. It used to be 6000 so that a
        // visitor reaching for the language choice INSIDE this card could not be
        // beaten by the clock; that choice now lives permanently in the header,
        // so nothing here needs three extra seconds. Measured before: a pointer
        // over the card cancelled the 2.4s dismiss and stranded the visitor
        // behind the overlay until this ceiling — 6.4s on a marketing home whose
        // biggest word was LOADING.
        runMs: 2800,
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
      const through = window.setTimeout(lock, 2400);

      // No pointer hold any more. It existed so a finger already on the card
      // could reach the language links without the 2.4s dismiss beating it —
      // and its cost was that ANY pointer over the card (a scroll gesture on a
      // phone starts as one) cancelled the dismiss outright and held the
      // visitor behind the overlay until the kit's ceiling. With the language
      // choice in the header, the opening is now just an opening: it ends on
      // its own clock, on the skip button, or on a tap.

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
