"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Circle, Clapperboard, Globe, MapPin, RotateCcw, Smartphone } from "lucide-react";

import RailControls from "@/vendor/rail-kit/RailControls";
import RailSegmented from "@/vendor/rail-kit/RailSegmented";
import { Container } from "@/components/ui/container";
import { packageAnchor, packagesCopy, packagesFor, priceFor, type Locale } from "@/lib/packages";
import type { CameraPart, CameraScene, LightMood } from "@/lib/camera-scene";

/**
 * "Toca la cámara": a 3D camera you turn with a finger, where each part is one
 * way of working with Esteban. Lens = he comes to film (Presencia Local),
 * monitor = he edits your footage (Arranque), REC = content every month
 * (Crecimiento), transmitter = everything connected (Todo Incluido).
 *
 * The hotspots are real <button>s laid over the canvas, so the scene works by
 * touch, mouse, keyboard and screen reader alike, and the shared analytics
 * layer sees every tap through `data-cta` — no hand-written tracking. The
 * answer appears inside the stage, where the visitor is looking.
 *
 * No WebGL, reduced motion, or a failed chunk: the same four buttons and the
 * same answer, over a still photograph. Nothing is lost but the rotation.
 */

const PART_TO_PACKAGE: Record<CameraPart, "presencia-local" | "arranque" | "crecimiento" | "todo-incluido"> = {
  lens: "presencia-local",
  viewfinder: "arranque",
  turret: "crecimiento",
  body: "todo-incluido",
};
const PART_ICON = { lens: MapPin, viewfinder: Clapperboard, turret: Smartphone, body: Globe } as const;
const ORDER: CameraPart[] = ["viewfinder", "turret", "lens", "body"];

const COPY = {
  es: {
    eyebrow: "Detrás de cámara",
    title: "Toca la cámara.",
    lead: "Cada parte es una forma de trabajar juntos.",
    hint: "Arrastra para girar · toca una parte",
    parts: { lens: "Lente", viewfinder: "Visor", turret: "Torreta", body: "Cuerpo" },
    controls: "Controles de la cámara",
    left: "Izquierda",
    right: "Derecha",
    rec: "Grabar",
    reset: "Reiniciar",
    light: "Luz de la escena",
    studio: "Estudio",
    night: "Noche",
    see: "Ver paquete",
    canvas: "Cámara de cine antigua en 3D, ilustrativa. Cada parte abre un paquete.",
  },
  en: {
    eyebrow: "Behind the camera",
    title: "Touch the camera.",
    lead: "Each part is a way to work together.",
    hint: "Drag to turn · tap a part",
    parts: { lens: "Lens", viewfinder: "Viewfinder", turret: "Turret", body: "Body" },
    controls: "Camera controls",
    left: "Left",
    right: "Right",
    rec: "Record",
    reset: "Reset",
    light: "Scene light",
    studio: "Studio",
    night: "Night",
    see: "See package",
    canvas: "Vintage film camera in 3D, illustrative. Each part opens a package.",
  },
} as const;

export function CameraPlayground({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const packages = packagesFor(locale);
  const priceCopy = packagesCopy(locale).price;
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<CameraScene | null>(null);
  const hotRefs = useRef<Partial<Record<CameraPart, HTMLButtonElement | null>>>({});
  const [live, setLive] = useState(false);
  const [part, setPart] = useState<CameraPart | null>(null);
  const [mood, setMood] = useState<LightMood>("studio");
  const [recording, setRecording] = useState(false);

  // Mount the scene only when the stage comes near the screen, and stop
  // rendering whenever it leaves.
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas || !("IntersectionObserver" in window)) return;
    let disposed = false;
    let scene: CameraScene | null = null;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !scene && !disposed) {
          const mod = await import("@/lib/camera-scene").catch(() => null);
          if (!mod || disposed || !mod.canRunScene()) return;
          scene = await mod
            .createCameraScene({
            canvas,
            mode: "explore",
            onPartTap: (p) => hotRefs.current[p]?.click(),
            onAnchors: (anchors) => {
              for (const [k, a] of Object.entries(anchors)) {
                const el = hotRefs.current[k as CameraPart];
                if (!el) continue;
                // Labels sit on the side with room, so none is cut by the edge.
                const left = a.x > canvas.clientWidth * 0.58;
                el.dataset.side = left ? "left" : "right";
                el.dataset.hidden = a.occluded ? "true" : "false";
                el.style.transform = `translate(${a.x.toFixed(1)}px, ${a.y.toFixed(1)}px) translate(${left ? "calc(-100% + 22px)" : "-22px"}, -22px)`;
                el.style.opacity = a.visible ? "" : "0";
              }
            },
          })
            .catch(() => null);
          if (!scene || disposed) {
            scene?.dispose();
            return;
          }
          sceneRef.current = scene;
          setLive(true);
        }
        scene?.setActive(entry.isIntersecting);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(stage);
    return () => {
      disposed = true;
      io.disconnect();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, []);

  const choose = (p: CameraPart) => {
    const next = part === p ? null : p;
    setPart(next);
    sceneRef.current?.focus(next);
    if (p === "turret" && next) {
      setRecording(true);
      sceneRef.current?.setRecording(true);
    }
  };

  const onControl = ({ id }: { id: string }) => {
    const s = sceneRef.current;
    if (id === "left") s?.nudge(-0.7);
    if (id === "right") s?.nudge(0.7);
    if (id === "rec") {
      const on = !recording;
      setRecording(on);
      s?.setRecording(on);
    }
    if (id === "reset") {
      setPart(null);
      setRecording(false);
      setMood("studio");
      s?.reset();
    }
  };

  const chosen = part ? packages.find((p) => p.id === PART_TO_PACKAGE[part]) : null;
  const chosenPrice = chosen ? priceFor(chosen.id) : null;
  const home = locale === "es" ? "/es" : "";

  return (
    <section className="em-play" aria-labelledby="em-play-title" data-section="camera_playground">
      <Container size="xl">
        <p className="em-pk-eyebrow em-pk-eyebrow--light">{t.eyebrow}</p>
        <h2 id="em-play-title" className="em-pk-title em-pk-title--light">
          {t.title}
        </h2>
        <p className="em-play__lead">{t.lead}</p>
      </Container>

      <div ref={stageRef} className="em-play__stage" data-live={live ? "true" : "false"} data-mood={mood}>
        <canvas ref={canvasRef} className="em-play__canvas" role="img" aria-label={t.canvas} />

        <ul className="em-play__hotspots" role="list">
          {ORDER.map((p) => {
            const Icon = PART_ICON[p];
            return (
              <li key={p}>
                <button
                  ref={(el) => {
                    hotRefs.current[p] = el;
                  }}
                  type="button"
                  className="em-play__hot"
                  data-part={p}
                  data-cta={`camera_part_${p}`}
                  aria-pressed={part === p}
                  onClick={() => choose(p)}
                >
                  <span className="em-play__dot" aria-hidden="true" />
                  <span className="em-play__hot-label">
                    <Icon className="size-3.5" aria-hidden="true" />
                    {t.parts[p]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="em-play__hint" aria-hidden="true">
          {t.hint}
        </p>

        {/* The answer, inside the stage. */}
        <div className="em-play__card" data-open={chosen ? "true" : "false"} aria-live="polite">
          {chosen && chosenPrice && (
            <>
              <p className="em-play__card-kicker">
                {chosen.number} · {t.parts[part!]}
              </p>
              <p className="em-play__card-name">{chosen.name}</p>
              <p className="em-play__card-line">{chosen.headline.join(" ")}</p>
              <div className="em-play__card-row">
                <span className="em-play__card-price">
                  {chosenPrice.kind === "from"
                    ? `${priceCopy.from} $${chosenPrice.amount.toLocaleString("en-US")} ${priceCopy.units[chosenPrice.unit]}`
                    : `${priceCopy.customLine} ${priceCopy.custom.toLowerCase()}`}
                </span>
                <a
                  className="em-play__card-go"
                  href={`${home}#${packageAnchor(chosen.id)}`}
                  data-cta={`camera_to_package_${chosen.id}`}
                >
                  {t.see}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      <Container size="xl" className="em-play__bar">
        <RailControls
          label={t.controls}
          source="camera_controls"
          onPress={onControl}
          controls={[
            { id: "left", label: t.left, glyph: <ArrowLeft className="size-4" /> },
            { id: "rec", label: t.rec, glyph: <Circle className="size-4" fill="currentColor" />, pressed: recording },
            { id: "right", label: t.right, glyph: <ArrowRight className="size-4" /> },
            { id: "reset", label: t.reset, glyph: <RotateCcw className="size-4" /> },
          ]}
        />
        <RailSegmented
          label={t.light}
          source="camera_light"
          activeId={mood}
          segments={[
            { id: "studio", label: t.studio },
            { id: "night", label: t.night },
          ]}
          onSelect={({ id }) => {
            const m = id as LightMood;
            setMood(m);
            sceneRef.current?.setMood(m);
          }}
        />
      </Container>
    </section>
  );
}
