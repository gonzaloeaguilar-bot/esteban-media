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
 * The opening: the edit bay.
 *
 * It replaces a 3D cinema camera that the owner rejected, and the reason it
 * replaces it is the whole point of this file: a camera is the TOOL, and
 * everyone has one. What Esteban sells is what happens AFTER the footage
 * exists — which is exactly what his first package says out loud, "Tú grabas.
 * Yo lo convierto en contenido."
 *
 * So the opening is the service: four real frames from his own work drop onto
 * a timeline, the waveform draws under them, the playhead sweeps, and the
 * render resolves into the site. The thing the visitor watches being made is
 * the thing they would be buying.
 *
 * It is DOM and CSS only — no WebGL, no model, no HDRI, so nothing has to
 * download before it can start and there is no capability gate. The kit still
 * owns mounting, skip, dismissal, analytics and removal
 * (public/web-kit/mount.js); if anything here fails the veil simply lifts.
 */
const CLIPS = [
  { src: "/portfolio/bar-door-monkey.jpg", label: "BAR DOOR MONKEY" },
  { src: "/portfolio/ml-colombia.jpg", label: "ML COLOMBIA" },
  { src: "/portfolio/front-line-auto.jpg", label: "FRONT LINE AUTO" },
  { src: "/portfolio/diana-jack.jpg", label: "DIANA & JACK" },
];

/** Drawn once, not an image: a waveform that can animate its own stroke. */
const WAVE = (() => {
  const points: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = (i / 120) * 100;
    const a = Math.sin(i * 0.55) * Math.sin(i * 0.13 + 1.2) * Math.sin(i * 0.07);
    const y = 50 - a * 42;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(" ");
})();

export function EditBayIntro({ locale }: { locale: "es" | "en" }) {
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
      const line = es ? "Tú grabas. Yo lo convierto en contenido." : "You film. I turn it into content.";
      const rendering = es ? "Renderizando" : "Rendering";

      const clips = CLIPS.map(
        (c, i) =>
          `<li class="em-bay__clip" style="--i:${i}">` +
          `<img src="${c.src}" alt="" decoding="async" fetchpriority="high" />` +
          "</li>",
      ).join("");
      // Under the clip, never over it: on the image the label collided with the
      // Front Line Auto screenshot's own type (seen in the 390 frame).
      const labels = CLIPS.map((c, i) => `<li style="--i:${i}">${c.label}</li>`).join("");

      mount({
        name: "edit_bay_opening",
        // 2.6s of edit + 0.5s of resolve. Nothing has to download first, so
        // this length is the whole wait — the 3D opening it replaces could not
        // start until 2.1MB of model, textures and HDRI had arrived.
        runMs: 3400,
        skipLabel: es ? "Saltar" : "Skip",
        html:
          '<div class="em-bay">' +
          '<div class="em-bay__head">' +
          '<span class="em-bay__rec"><i></i>REC</span>' +
          '<span class="em-bay__tc">00:00:00:00</span>' +
          "</div>" +
          '<div class="em-bay__cut">' +
          `<ol class="em-bay__track" role="list">${clips}</ol>` +
          `<ul class="em-bay__labels" role="list">${labels}</ul>` +
          '<svg class="em-bay__wave" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
          `<polyline points="${WAVE}" /></svg>` +
          "</div>" +
          '<div class="em-bay__foot">' +
          `<p class="em-bay__line">${line}</p>` +
          `<p class="em-bay__render"><span>${rendering}</span><b class="em-bay__pct">0%</b></p>` +
          '<div class="em-bay__bar"><i></i></div>' +
          "</div></div>",
      });

      const moment = document.querySelector<HTMLElement>(".wk-moment");
      if (!moment) return giveUp();

      // The two numbers that have to COUNT rather than sit there: the timecode
      // and the render percentage. Both stop the moment the element goes.
      const tc = moment.querySelector<HTMLElement>(".em-bay__tc");
      const pct = moment.querySelector<HTMLElement>(".em-bay__pct");
      const t0 = performance.now();
      let raf = 0;
      const tick = () => {
        if (!moment.isConnected) return;
        const ms = performance.now() - t0;
        if (tc) {
          const f = Math.floor((ms / 1000) * 24);
          const s = Math.floor(f / 24);
          const pad = (n: number) => String(n).padStart(2, "0");
          tc.textContent = `00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(f % 24)}`;
        }
        if (pct) {
          const p = Math.min(100, Math.max(0, Math.round(((ms - 1900) / 700) * 100)));
          pct.textContent = `${p}%`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // Through the render: the bay resolves and the hero is what came out.
      const through = window.setTimeout(() => {
        moment.classList.add("is-through");
        root.removeAttribute(ATTR);
      }, 2600);

      const mo = new MutationObserver(() => {
        if (moment.isConnected) return;
        mo.disconnect();
        cancelAnimationFrame(raf);
        window.clearTimeout(through);
      });
      mo.observe(document.body, { childList: true });
    })();

    return () => {
      cancelled = true;
    };
  }, [locale]);

  return null;
}
