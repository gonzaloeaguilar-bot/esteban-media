"use client";

/**
 * The stage: a real-time 3D lens, with the flat SVG lens kept as the fallback.
 *
 * Why 3D after all. The first build drew this in SVG on two objections — that a
 * heavy scene starves the first analytics hit, and that a landscape render
 * cannot fill a portrait phone. The second objection was simply wrong for
 * real-time 3D: the camera is reframed per aspect in `resize`, which a baked
 * render can never do. The first is real, and is handled by ORDERING: the scene
 * is only imported after the window load event, so the measurement beacon and
 * first paint are already done before any WebGL work begins.
 *
 * The SVG path is still what a reduced-motion visitor and a machine without
 * WebGL get, and it is still what every crawler sees around.
 */

import { useEffect, useRef, useState } from "react";

import { RackFocusStage, type LensFrame } from "@/components/lens/rack-focus-stage";
import type { LensScene } from "@/components/lens/lens-scene";

interface LensStageProps {
  frames: readonly LensFrame[];
}

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function LensStage({ frames }: LensStageProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<LensScene | null>(null);
  /**
   * Starts false so the first paint is the fallback, never a blank canvas. It
   * only flips once a scene is actually on screen.
   */
  const [live, setLive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !webglAvailable()) return;

    let disposed = false;
    let raf = 0;
    let scene: LensScene | null = null;
    let index = -1;
    const tilt = { x: 0, y: 0 };

    const start = async () => {
      const canvas = canvasRef.current;
      const host = hostRef.current;
      if (!canvas || !host || disposed) return;

      const { createLensScene } = await import("@/components/lens/lens-scene");
      if (disposed) return;
      scene = createLensScene(canvas);
      sceneRef.current = scene;

      const fit = () => {
        // Measure the CANVAS, not the stage. They are different boxes on a
        // phone, and sizing the drawing buffer to the stage stretches the scene.
        const r = canvas.getBoundingClientRect();
        scene?.resize(Math.max(1, r.width), Math.max(1, r.height));
      };
      fit();

      const track = host.closest("[data-lens-track]") as HTMLElement | null;
      const progressNow = () => {
        if (!track) return 0;
        const r = track.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        if (travel <= 0) return 1;
        return Math.min(1, Math.max(0, -r.top / travel));
      };

      const tick = () => {
        if (disposed || !scene) return;
        const p = progressNow();
        const eased = Math.min(1, Math.max(0, (p - 0.06) / 0.5));
        const open = eased * eased * (3 - 2 * eased);
        scene.setAperture(open);
        scene.setProgress(p);
        scene.setTilt(tilt.x, tilt.y);

        const next = Math.min(frames.length - 1, Math.floor(p * frames.length));
        if (next !== index) {
          index = next;
          scene.setFrame(frames[next].src);
        }
        host.dataset.lensOpen = open.toFixed(2);
        scene.render();
        raf = window.requestAnimationFrame(tick);
      };

      const onPointer = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        // Works for a finger as well as a cursor: the brief requires the lens to
        // answer touch, not only hover.
        tilt.x = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
        tilt.y = ((e.clientY - r.top) / r.height - 0.5) * 0.3;
      };
      const onLeave = () => {
        tilt.x = 0;
        tilt.y = 0;
      };

      host.addEventListener("pointermove", onPointer);
      host.addEventListener("pointerleave", onLeave);
      window.addEventListener("resize", fit);
      setLive(true);
      tick();

      cleanup = () => {
        host.removeEventListener("pointermove", onPointer);
        host.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("resize", fit);
      };
    };

    let cleanup = () => {};
    // Ordering, not omission: nothing WebGL happens until load has fired, so the
    // analytics beacon and first paint are already out the door.
    const kick = () => window.setTimeout(start, 0);
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener("load", kick);
      if (raf) window.cancelAnimationFrame(raf);
      cleanup();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, [frames]);

  return (
    <div
      ref={hostRef}
      data-lens-stage
      data-lens-open="0.00"
      className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#101214]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[46svh] w-full transition-opacity duration-500 sm:h-full"
        style={{ opacity: live ? 1 : 0 }}
      />
      {/* The fallback stays mounted until the scene is actually drawing. */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: live ? 0 : 1, pointerEvents: live ? "none" : undefined }}
      >
        <RackFocusStage frames={frames} embedded />
      </div>
    </div>
  );
}
