"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RailCoverflowItem = {
  id: string;
  /** Lo que se ve: un sobre, una portada, una caja. */
  art: ReactNode;
  /** Como se llama. Obligatorio: la pieza puede ser una imagen sin texto. */
  label: string;
  href?: string;
};

export type RailCoverflowProps = {
  items: RailCoverflowItem[];
  /** Que es esta fila, para un lector de pantalla. */
  label: string;
  /** Cual esta en el centro al empezar. */
  defaultId?: string;
  /**
   * Cuantos vecinos se dibujan a cada lado. El resto existe en el DOM pero no
   * se pinta en 3D: veinte sobres girando a la vez es trabajo que el telefono
   * paga y nadie ve, porque solo caben tres en pantalla.
   */
  neighbours?: number;
  /**
   * El reflejo del suelo. Es DECORACION —va `aria-hidden`— y por eso no puede
   * llevar nada que haya que leer: duplicaria cada titulo en el arbol de
   * accesibilidad.
   */
  reflection?: boolean;
  onSelect?: (info: { source: string; id: string }) => void;
  source: string;
  className?: string;
};

/**
 * La fila en perspectiva: lo elegido de frente y lo demas girando hacia dentro.
 *
 * Cada pieza es un boton de verdad, asi que se llega a todas con el tabulador y
 * las flechas mueven la seleccion. Eso importa mas aqui que en una fila plana:
 * en perspectiva, lo que esta a los lados se lee como "lejos", y si ademas no
 * se puede enfocar, deja de existir para quien no usa raton.
 *
 * Con motion reducido se cae a una fila plana que se desliza. No a un 3D
 * congelado: una perspectiva sin movimiento es un monton de rectangulos
 * torcidos, y el sentido —"hay mas a los lados"— se pierde justo para quien
 * pidio menos movimiento.
 */
export default function RailCoverflow({
  items,
  label,
  defaultId,
  neighbours = 2,
  reflection = true,
  onSelect,
  source,
  className,
}: RailCoverflowProps) {
  const first = defaultId ? items.findIndex((i) => i.id === defaultId) : 0;
  const [at, setAt] = useState(first < 0 ? 0 : first);
  const box = useRef<HTMLDivElement>(null);
  const mirrors = useRef<(HTMLElement | null)[]>([]);

  // El reflejo es un duplicado del MISMO nodo, asi que trae dentro lo que la
  // pieza traiga: si es un sobre con boton, hay un boton mas ahi abajo, boca
  // abajo y desvanecido. `aria-hidden` lo saca del arbol de accesibilidad pero
  // NO del orden de foco, asi que el tabulador aterrizaba en el fantasma.
  // Medido: 5 botones dentro de los reflejos, y tabular caia en ellos 1 de
  // cada 2 veces. `inert` va por referencia porque React no lo pinta de forma
  // fiable como prop.
  useEffect(() => {
    for (const el of mirrors.current) el?.setAttribute("inert", "");
  });
  const [still, setStill] = useState(false);

  useEffect(() => {
    if (typeof matchMedia !== "function") return;
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setStill(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, next));
    setAt(clamped);
    const item = items[clamped];
    if (item) onSelect?.({ source, id: item.id });
  };

  // SIN PIEZAS NO HAY VITRINA. Con la lista vacia esto reservaba 310x336 —un
  // tercio de una pantalla de telefono— de nada: ni contenido, ni borde, ni
  // mensaje. Un hueco asi no se lee como «no hay nada», se lee como que algo
  // no ha cargado. Que poner en su lugar lo decide la marca; el kit no se
  // inventa un texto vacio en un idioma que no conoce.
  //
  // El guard va DESPUES de los hooks: salir antes de un `useState` cambia el
  // numero de hooks entre renders y React lo rompe.
  if (items.length === 0) return null;

  return (
    <div
      ref={box}
      className={["rail-coverflow", still && "rail-coverflow--still", className]
        .filter(Boolean)
        .join(" ")}
      data-rail-coverflow={source}
      // NO es un listbox.
      //
      // Lo fue, con role="option" por pieza, y axe lo tumbo dos veces: una
      // `option` no puede contener nada enfocable, y aqui la pieza trae sus
      // propios controles —un sobre con su boton "Abrir"—. Forzar el patron
      // habria significado quitarle los controles a la pieza, que es al reves
      // de para lo que existe. Un carrusel de piezas ricas es un GRUPO; las
      // flechas mueven el foco de atencion y cada pieza conserva lo suyo.
      role="group"
      aria-label={label}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(at + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(at - 1); }
        if (e.key === "Home") { e.preventDefault(); go(0); }
        if (e.key === "End") { e.preventDefault(); go(items.length - 1); }
      }}
    >
      <div className="rail-coverflow__stage">
        {items.map((item, index) => {
          const offset = index - at;
          const far = Math.abs(offset) > neighbours;
          const current = index === at;
          return (
            <div
              className="rail-coverflow__slot"
              key={item.id}
              data-current={current ? "" : undefined}
              aria-current={current ? "true" : undefined}
              // Lejos: fuera de la escena 3D, pero SIGUE en el DOM y enfocable.
              hidden={far || undefined}
              style={{ ["--_i" as string]: offset }}
            >
              {/* La opcion NO es un <button>.
                  Lo fue, y axe lo caza al momento: la pieza puede contener algo
                  interactivo —un sobre trae su propio "Abrir"— y un boton dentro
                  de otro boton es HTML invalido y un nido que ningun lector de
                  pantalla anuncia bien. En un listbox las opciones son
                  opciones; lo de dentro conserva sus propios controles. */}
              <div className="rail-coverflow__piece" onClick={() => go(index)}>
                <span className="rail-coverflow__art">{item.art}</span>
                <span className="rail-sr-only">{item.label}</span>
              </div>
              {reflection && !still && (
                <span
                  className="rail-coverflow__mirror"
                  aria-hidden="true"
                  ref={(el) => {
                    mirrors.current[index] = el;
                  }}
                >
                  {item.art}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
