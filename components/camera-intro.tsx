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
 * The opening: through the lens.
 *
 * The decision (play or not) was already taken before first paint by the
 * web-kit boot script in the site chrome, and the veil is already black. This
 * only supplies the OBJECT: a 3D cinema camera flies out of the dark, turns
 * its lens to the visitor and the view pushes through the glass as the iris
 * opens — landing on the hero footage, which is what the lens was looking at.
 *
 * Mounting, skip, first-key/tap dismissal, analytics (brand_moment_shown /
 * brand_moment_complete with dismissed_by and elapsed_ms) and removal are the
 * kit's (public/web-kit/mount.js). If the 3D code or WebGL is not there in
 * time, the veil simply lifts: the page never waits on a decoration.
 */
export function CameraIntro({ locale }: { locale: "es" | "en" }) {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute(ATTR)) return;

    let cancelled = false;
    let dispose: (() => void) | null = null;
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

    const deadline = new Promise<null>((r) => setTimeout(() => r(null), 2800));

    (async () => {
      const [mount, mod] = await Promise.all([
        waitForKit(),
        Promise.race([import("@/lib/camera-scene"), deadline]),
      ]);
      if (cancelled) return;
      if (!mount || !mod || !mod.canRunScene() || !root.hasAttribute(ATTR)) return giveUp();

      const title =
        locale === "es"
          ? '<p class="em-lens__kicker">Contenido · Producción · Digital</p>'
          : '<p class="em-lens__kicker">Content · Production · Digital</p>';
      mount({
        name: "lens_opening",
        runMs: 3700,
        skipLabel: locale === "es" ? "Saltar" : "Skip",
        html:
          '<div class="em-lens"><canvas class="em-lens__canvas"></canvas>' +
          '<div class="em-lens__title"><p class="em-lens__brand">Esteban Moreno Media</p>' +
          title +
          "</div></div>",
      });

      const moment = document.querySelector<HTMLElement>(".wk-moment");
      const canvas = moment?.querySelector<HTMLCanvasElement>(".em-lens__canvas");
      if (!moment || !canvas) return giveUp();

      const video = document.querySelector<HTMLVideoElement>(".em-cine__video");
      const scene = mod.createCameraScene({
        canvas,
        mode: "intro",
        video,
        onIntroDone: () => {
          // Through the glass: the veil dissolves onto the hero footage, and the
          // hero's own entrance starts now rather than behind the cover.
          moment.classList.add("is-through");
          root.removeAttribute(ATTR);
        },
      });
      dispose = () => scene.dispose();

      // The kit removes the element when it finishes (timeout, skip, key, tap).
      const mo = new MutationObserver(() => {
        if (!moment.isConnected) {
          mo.disconnect();
          dispose?.();
          dispose = null;
        }
      });
      mo.observe(document.body, { childList: true });
    })();

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [locale]);

  return null;
}
