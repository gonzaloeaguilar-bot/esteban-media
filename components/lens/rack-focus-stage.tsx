"use client";

/**
 * Rack Focus — the scroll-driven lens stage.
 *
 * The visitor does not get shown the finished work. They watch a lens assemble,
 * and the frame behind it comes into focus as the aperture opens.
 *
 * Deliberate constraints, each one paid for by a defect we already shipped:
 *
 * - No WebGL. The lens is inline SVG with real iris geometry. A heavy scene has
 *   previously starved the first analytics hit on this fleet, and a landscape
 *   3D render cannot fill a portrait phone — `cover` crops the sides, never the
 *   sky. SVG is resolution-free and composes portrait-first.
 * - This component renders the SCENE only. Every word on the page lives in the
 *   server-rendered HTML of the parent, outside this file, because GPTBot and
 *   ClaudeBot execute no JavaScript. Motion never gates the words.
 * - prefers-reduced-motion is not a degraded path: the aperture renders fully
 *   open, the frames are visible, and no scroll listener is ever attached.
 */

import { useEffect, useRef, useState } from "react";

export interface LensFrame {
  /** Local poster from the real portfolio. Never a stock image. */
  src: string;
  alt: string;
}

interface RackFocusStageProps {
  frames: readonly LensFrame[];
  /** Rendered as the fallback layer inside LensStage rather than on its own. */
  embedded?: boolean;
}

/** Iris blade count. Six reads as a camera; more reads as a circle. */
const BLADES = 6;

/** Geometry is authored in a square viewBox and scaled by CSS. */
const VIEW = 320;
const CENTER = VIEW / 2;

/** Barrel outer radius. The aperture opens inside this. */
const BARREL = 126;

/**
 * Builds the iris cover as a single evenodd path: the barrel disc with an
 * N-sided hole punched out of it. The hole's edges bow inward on an arc, which
 * is what makes it read as overlapping blades rather than a polygon.
 *
 * `open` runs 0 (shut) to 1 (wide). The hole also rotates as it opens, because
 * a real iris rotates its blades to open them.
 */
/**
 * The aperture opening: an N-sided hole whose edges bow on an arc, which is what
 * makes it read as overlapping blades instead of a polygon.
 *
 * `open` runs 0 (shut) to 1 (wide). The hole rotates as it opens, because a real
 * iris rotates its blades to open them.
 *
 * Sweep flag 1, not 0. With 0 the edges bulge outward and the shape renders as a
 * shield — it was shipped that way once and the lens stopped reading as a lens.
 */
export function holePath(open: number): string {
  const radius = 7 + open * (BARREL - 24);
  const spin = (1 - open) * ((Math.PI * 2) / BLADES) * 0.55;
  const bow = radius * 1.9;

  const points = Array.from({ length: BLADES }, (_, i) => {
    const angle = spin + (i * Math.PI * 2) / BLADES - Math.PI / 2;
    return [
      CENTER + radius * Math.cos(angle),
      CENTER + radius * Math.sin(angle),
    ] as const;
  });

  const arcs = points
    .slice(1)
    .map(([x, y]) => `A ${bow.toFixed(2)} ${bow.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
  const [sx, sy] = points[0];

  return (
    `M ${sx.toFixed(2)} ${sy.toFixed(2)} ${arcs} ` +
    `A ${bow.toFixed(2)} ${bow.toFixed(2)} 0 0 1 ${sx.toFixed(2)} ${sy.toFixed(2)} Z`
  );
}

/** The blade cover: the barrel disc with the opening punched out of it. */
function irisPath(open: number): string {
  const disc =
    `M ${CENTER - BARREL} ${CENTER} ` +
    `A ${BARREL} ${BARREL} 0 1 0 ${CENTER + BARREL} ${CENTER} ` +
    `A ${BARREL} ${BARREL} 0 1 0 ${CENTER - BARREL} ${CENTER} Z`;
  return `${disc} ${holePath(open)}`;
}

/** Seam lines between blades, so the cover reads as mechanical, not painted. */
function seams(open: number): readonly (readonly [number, number, number, number])[] {
  const radius = 7 + open * (BARREL - 24);
  const spin = (1 - open) * ((Math.PI * 2) / BLADES) * 0.55;
  return Array.from({ length: BLADES }, (_, i) => {
    const angle = spin + (i * Math.PI * 2) / BLADES - Math.PI / 2;
    return [
      CENTER + radius * Math.cos(angle),
      CENTER + radius * Math.sin(angle),
      CENTER + BARREL * Math.cos(angle),
      CENTER + BARREL * Math.sin(angle),
    ] as const;
  });
}

export function RackFocusStage({ frames, embedded = false }: RackFocusStageProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  /** 0 at the top of the scroll track, 1 at the bottom. */
  const [progress, setProgress] = useState(0);
  /**
   * Reduced motion starts true so the FIRST paint is the readable one. If we
   * started false we would flash a shut aperture at a visitor who asked for no
   * motion, which is the defect the setting exists to prevent.
   */
  const [reduced, setReduced] = useState(true);
  /** Touch/pointer nudge, so the lens answers a finger and not only a scroll. */
  const [nudge, setNudge] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const host = hostRef.current;
    if (!host) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const track = host.closest("[data-lens-track]");
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return setProgress(1);
      setProgress(Math.min(1, Math.max(0, -rect.top / travel)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced]);

  /**
   * The aperture is shut for the first beat, then opens over the rest of the
   * travel. Withholding it is the whole idea: the visitor watches it arrive.
   */
  const eased = reduced ? 1 : Math.min(1, Math.max(0, (progress - 0.06) / 0.5));
  const open = Math.min(1, eased * eased * (3 - 2 * eased) + nudge);

  /** Which portfolio frame sits behind the glass right now. */
  const index = Math.min(
    frames.length - 1,
    Math.floor((reduced ? 0 : progress) * frames.length),
  );

  /** Focus resolves as the aperture opens — the rack focus itself. */
  const blur = (1 - open) * 14;
  const barrelScale = 0.92 + open * 0.08;

  return (
    <div
      ref={hostRef}
      {...(embedded ? {} : { "data-lens-stage": "", "data-lens-open": open.toFixed(2) })}
      className={
        (embedded ? "absolute inset-0 " : "sticky top-0 ") +
        "flex h-[100svh] w-full items-start justify-center overflow-hidden bg-[#101214] pt-[6svh] sm:items-center sm:justify-end sm:pr-[7vw] sm:pt-0"
      }
      onPointerDown={() => setNudge(0.12)}
      onPointerUp={() => setNudge(0)}
      onPointerCancel={() => setNudge(0)}
    >
      {/* A near-black room. The work is not on the walls; it is in the glass. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,#1b1f22_0%,#101214_62%)]" />

      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        role="img"
        aria-label={frames[index]?.alt ?? "Camera lens"}
        className="relative h-[min(52vw,25svh)] w-[min(52vw,25svh)] sm:h-[min(44vw,52svh)] sm:w-[min(44vw,52svh)]"
        style={{ transform: `scale(${barrelScale})` }}
      >
        <defs>
          <clipPath id="lens-aperture">
            <path d={holePath(open)} />
          </clipPath>
          <radialGradient id="lens-glass" cx="42%" cy="36%" r="70%">
            <stop offset="0%" stopColor="#f0b384" stopOpacity="0.22" />
            <stop offset="55%" stopColor="#e85d3e" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#101214" stopOpacity="0.45" />
          </radialGradient>
          <linearGradient id="lens-barrel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3f4548" />
            <stop offset="48%" stopColor="#1b1f22" />
            <stop offset="100%" stopColor="#2a2f33" />
          </linearGradient>
        </defs>

        {/* What the aperture reveals: one real frame, clipped to the opening and
            resolving out of defocus as the blades travel. */}
        <g clipPath="url(#lens-aperture)">
          <rect x="0" y="0" width={VIEW} height={VIEW} fill="#15191c" />
          {frames.map((frame, i) => (
            <image
              key={frame.src}
              href={frame.src}
              x="0"
              y="0"
              width={VIEW}
              height={VIEW}
              preserveAspectRatio="xMidYMid slice"
              opacity={i === index ? 1 : 0}
              style={{
                filter: `blur(${blur.toFixed(1)}px)`,
                transition: "opacity 700ms ease",
              }}
            />
          ))}
          <circle cx={CENTER} cy={CENTER} r={BARREL} fill="url(#lens-glass)" />
        </g>

        {/* The iris itself. */}
        <path d={irisPath(open)} fillRule="evenodd" fill="url(#lens-barrel)" />
        {seams(open).map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#101214"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
        ))}

        {/* Barrel rings. These assemble: each one arrives on its own beat. */}
        {[0, 1, 2].map((ring) => {
          const arrival = Math.min(1, Math.max(0, (progress - ring * 0.04) / 0.12));
          const r = BARREL + 10 + ring * 16;
          return (
            <circle
              key={ring}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="#5a6066"
              strokeOpacity={(reduced ? 1 : arrival) * (0.5 - ring * 0.12)}
              strokeWidth={ring === 0 ? 3 : 1}
              strokeDasharray={ring === 2 ? "2 7" : undefined}
            />
          );
        })}

        {/* Focus-ring index mark: the physical tell that this thing has stops. */}
        <g
          style={{
            transform: `rotate(${(reduced ? 0.4 : progress) * 120}deg)`,
            transformOrigin: `${CENTER}px ${CENTER}px`,
          }}
        >
          <line
            x1={CENTER}
            y1={CENTER - BARREL - 22}
            x2={CENTER}
            y2={CENTER - BARREL - 6}
            stroke="#e85d3e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
