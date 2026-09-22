"use client";

export type RailSkeletonLine = {
  /** Ancho de la barra: "100%", "7ch", "60%". El defecto es todo el ancho. */
  width?: string;
  /** Alto de la barra. El defecto es una linea de texto. */
  height?: string;
};

export type RailSkeletonProps = {
  /**
   * La forma que va a tener el contenido cuando llegue. Una barra por linea.
   *
   * Obligatorio, y es la razon de existir del componente: un bloque gris
   * generico no es un esqueleto, es un hueco. Cuando llega el contenido, el
   * hueco cambia de tamano y la pagina salta — o sea, el esqueleto MUEVE la
   * pagina dos veces en vez de ninguna.
   */
  lines: RailSkeletonLine[];
  /**
   * Que se esta cargando, en palabras: "Cargando tus posiciones".
   *
   * Obligatorio. Sin esto, quien usa lector de pantalla oye silencio mientras
   * la pantalla se llena de rectangulos, y no sabe si esperar o si se rompio.
   */
  label: string;
  /** Repite el patron de lineas n veces — una lista de filas iguales. */
  repeat?: number;
  /** Separacion entre repeticiones, si son filas y no lineas sueltas. */
  gap?: "sm" | "md";
  source: string;
  className?: string;
};

/**
 * El hueco que ocupa el contenido antes de existir, con SU forma.
 *
 * Va con `aria-busy` y `aria-live="polite"` sobre un texto que solo oye el
 * lector: las barras van `aria-hidden`, porque anunciar doce rectangulos no es
 * accesibilidad, es ruido.
 *
 * No es `RailEmpty`. `RailEmpty` dice "aqui no hay nada" y es un estado final;
 * esto dice "aqui va a haber algo" y dura segundos. Confundirlos deja al
 * visitante mirando un vacio que no se va a llenar, o esperando uno que si.
 *
 * El brillo que lo recorre es `data-rail-shimmer` de `motion.css`, que ya
 * respeta `prefers-reduced-motion`. Si el consumidor no carga `motion.css`,
 * las barras se quedan quietas y siguen haciendo su trabajo, que es el de
 * reservar el sitio.
 */
export default function RailSkeleton({
  lines,
  label,
  repeat = 1,
  gap = "md",
  source,
  className,
}: RailSkeletonProps) {
  if (lines.length === 0) return null;
  const veces = Math.max(1, repeat);

  return (
    <div
      className={["rail-skeleton", className].filter(Boolean).join(" ")}
      data-rail-skeleton={source}
      data-gap={gap}
      aria-busy="true"
    >
      <p className="rail-sr-only" aria-live="polite">
        {label}
      </p>
      {Array.from({ length: veces }, (_, fila) => (
        <div className="rail-skeleton__group" key={fila} aria-hidden="true">
          {lines.map((l, i) => (
            <span
              className="rail-skeleton__bar"
              data-rail-shimmer=""
              key={i}
              style={{
                width: l.width ?? "100%",
                height: l.height ?? "var(--rail-skeleton-line, 1em)",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
