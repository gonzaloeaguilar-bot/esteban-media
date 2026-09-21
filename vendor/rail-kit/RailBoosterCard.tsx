"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import RailConfetti from "./RailConfetti";

export type RailBoosterCardProps = {
  /** The face that shows first: the photograph, the figure, the name. */
  front: ReactNode;
  /** What is behind it: the brand mark, the watermark, one line of provenance. */
  back: ReactNode;
  /**
   * How rare it is — "IMMORTAL", "1 de 12". A word the site decides; the kit
   * has no tiers of its own and will not invent a hierarchy for your brand.
   */
  rarity?: string;
  /** Which one of how many: "1 / 1997". Already formatted by the caller. */
  serial?: string;
  /** Accessible name of the whole card. */
  label: string;
  /** What the button says while the front shows, e.g. "Ver el dorso". */
  flipLabel: string;
  /** What it says while the back shows, e.g. "Ver el frente". */
  flipBackLabel: string;
  /** Aspect of the card. Trading-card default. */
  ratio?: string;
  /**
   * La letra pequena del pie: una fecha, un marcador, un sello. Es la fila que
   * convierte una imagen bonita en un objeto con procedencia, y por eso tiene
   * sitio propio en vez de quedar suelta dentro de `front`.
   */
  footnote?: ReactNode;
  /**
   * El acabado iridiscente: el canto deja de ser una linea y pasa a ser un
   * degradado conico que gira con la carta.
   *
   * Se pinta con dos fondos y `background-clip`, no con un pseudo-elemento:
   * `::before` y `::after` ya tienen dueno en este kit, y un tercer inquilino
   * no gana "a medias" — se mezclan propiedad por propiedad.
   *
   * PIDE UN PAPEL OPACO. La capa de dentro tiene que tapar el degradado, o el
   * conico deja de ser canto y se ve a traves de toda la cara. El defecto del
   * kit es un gris casi negro; una marca pone el suyo en
   * `--rail-boostercard-paper`.
   */
  holo?: boolean;
  /**
   * Un halo alrededor. `"pulse"` respira. Es enfasis, nunca el dato: la carta
   * dice lo mismo con el halo apagado.
   */
  glow?: "soft" | true | "strong" | "pulse";
  /** Una rafaga finita de papel al aparecer. Decoracion, nunca la noticia. */
  celebrate?: boolean;
  /**
   * La lamina iridiscente que barre la cara y cambia con el angulo.
   *
   * Su CSS llego en el #41 sin componente que lo pintara —la tercera vez hoy
   * que este kit recibe estilos huerfanos—, asi que esto lo adopta en vez de
   * escribir un segundo foil al lado.
   *
   * Sigue al puntero por `--hx`/`--hy`, y se apaga entero con motion reducido:
   * una lamina que persigue el dedo es movimiento, no decoracion.
   */
  foil?: boolean;
  /**
   * Lets a finger tilt it, not only a pointer.
   *
   * Off by default, and that default is a rule the kit already carries: on a
   * small card a finger COVERS the thing it is tilting, so the effect is
   * battery nobody sees. A booster card is the exception worth having a switch
   * for — it fills the screen, and the thumb is at its edge.
   */
  tiltOnTouch?: boolean;
  onFlip?: (info: { source: string; facing: "front" | "back" }) => void;
  source: string;
  className?: string;
};

/**
 * The collectible: a card with two faces that turns over in three dimensions.
 *
 * **The hidden face is hidden from everyone, not just from eyes.**
 * `backface-visibility` stops a face being painted; it does nothing to a screen
 * reader, which happily reads both sides at once and announces a card that says
 * two contradictory things. The face that is not showing gets `inert` and
 * `aria-hidden`, so the card reads as one object with one current side.
 *
 * **Under reduced motion it still turns over.** It swaps instantly instead of
 * rotating. Motion off cannot mean a face becomes unreachable — the back holds
 * the provenance line, and that is content.
 *
 * The lean comes from the kit's own `data-rail-tilt`, so the sheen and the
 * forward lift of `[data-rail-tilt-lift]` children work here exactly as they do
 * on a rail card.
 */
export default function RailBoosterCard({
  front,
  back,
  rarity,
  serial,
  label,
  flipLabel,
  flipBackLabel,
  ratio = "5 / 7",
  footnote,
  holo = false,
  foil = false,
  glow,
  celebrate = false,
  tiltOnTouch = false,
  onFlip,
  source,
  className,
}: RailBoosterCardProps) {
  const [facing, setFacing] = useState<"front" | "back">("front");
  const box = useRef<HTMLDivElement>(null);

  // La inclinacion escribe las mismas variables que la capa de movimiento del
  // kit, para no tener una segunda idea de lo que es inclinarse.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;

    const lean = (event: PointerEvent) => {
      if (event.pointerType === "touch" && !tiltOnTouch) return;
      const r = el.getBoundingClientRect();
      const x = (event.clientX - r.left) / r.width - 0.5;
      const y = (event.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rail-tilt-y", `${x * 18}deg`);
      el.style.setProperty("--rail-tilt-x", `${-y * 18}deg`);
      el.style.setProperty("--rail-tilt-sheen-x", `${(x + 0.5) * 100}%`);
      // El foil del #41 lee --hx/--hy. Se escriben aqui porque este efecto ya
      // escucha el puntero: un segundo listener para lo mismo seria pagar dos
      // veces el mismo movimiento.
      el.style.setProperty("--hx", `${(x + 0.5) * 100}%`);
      el.style.setProperty("--hy", `${(y + 0.5) * 100}%`);
    };
    const flat = () => {
      el.style.setProperty("--rail-tilt-y", "0deg");
      el.style.setProperty("--rail-tilt-x", "0deg");
    };

    el.addEventListener("pointermove", lean);
    el.addEventListener("pointerleave", flat);
    el.addEventListener("pointercancel", flat);
    return () => {
      el.removeEventListener("pointermove", lean);
      el.removeEventListener("pointerleave", flat);
      el.removeEventListener("pointercancel", flat);
    };
  }, [tiltOnTouch]);

  const turn = () => {
    const next = facing === "front" ? "back" : "front";
    setFacing(next);
    onFlip?.({ source, facing: next });
  };

  // `inert` se pone por referencia, no como prop. React no pinta `inert=""` de
  // forma fiable segun version, y aqui eso no es cosmetico: sin `inert` la cara
  // de atras sigue siendo TABULABLE aunque `backface-visibility` la esconda —
  // tabulas y el foco se va a un boton que nadie ve. `aria-hidden` la saca del
  // arbol de accesibilidad pero NO del orden de foco; hacen falta las dos.
  // Medido: con la prop, inert salia false en las dos caras.
  const faces = useRef<Record<string, HTMLDivElement | null>>({});
  useEffect(() => {
    for (const side of ["front", "back"] as const) {
      const el = faces.current[side];
      if (!el) continue;
      if (facing === side) el.removeAttribute("inert");
      else el.setAttribute("inert", "");
    }
  }, [facing]);

  const face = (side: "front" | "back", content: ReactNode) => {
    const hidden = facing !== side;
    return (
      <div
        ref={(el) => {
          faces.current[side] = el;
        }}
        className={`rail-boostercard__face rail-boostercard__face--${side}`}
        aria-hidden={hidden || undefined}
      >
        {content}
      </div>
    );
  };

  return (
    <div
      className={["rail-boostercard", holo && "rail-boostercard--holo", className]
        .filter(Boolean)
        .join(" ")}
      data-rail-boostercard={source}
      data-facing={facing}
      // El halo va en el ENVOLTORIO: un box-shadow exterior muere dentro del
      // overflow:hidden de la propia cara.
      {...(glow ? { "data-rail-glow": glow === true ? "" : glow } : {})}
    >
      {celebrate && <RailConfetti source={source} />}
      <div
        ref={box}
        className="rail-boostercard__box"
        style={{ aspectRatio: ratio }}
        data-rail-tilt=""
      >
        <div className="rail-boostercard__turner">
          {face("front", (
            <>
              {(rarity || serial) && (
                <div className="rail-boostercard__head" data-rail-tilt-lift="">
                  {rarity && <span className="rail-boostercard__rarity">{rarity}</span>}
                  {serial && <span className="rail-boostercard__serial">{serial}</span>}
                </div>
              )}
              <div className="rail-boostercard__art">{front}</div>
              {foil && <span className="rail-boostercard__foil" aria-hidden="true" />}
              {footnote && (
                <div className="rail-boostercard__footnote" data-rail-tilt-lift="">
                  {footnote}
                </div>
              )}
            </>
          ))}
          {face("back", <div className="rail-boostercard__art">{back}</div>)}
        </div>
      </div>

      <button
        type="button"
        className="rail-boostercard__flip"
        aria-label={`${label} — ${facing === "front" ? flipLabel : flipBackLabel}`}
        aria-pressed={facing === "back"}
        onClick={turn}
      >
        {facing === "front" ? flipLabel : flipBackLabel}
      </button>
    </div>
  );
}
