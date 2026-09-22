"use client";

import { useId, useState, type ReactNode } from "react";

export type RailPostProps = {
  /**
   * Quien lo escribe. Normalmente un `RailByline`, que ya sabe pintar cara,
   * nombre, verificado y meta — no se reconstruye aqui.
   */
  byline: ReactNode;
  /** El cuerpo. Texto plano o nodos; se recorta a `clamp` lineas. */
  children: ReactNode;
  /**
   * Cuantas lineas se ven antes de "ver mas". Cero lo desactiva.
   *
   * Tres es el defecto porque es donde un feed deja de ser un feed: con seis,
   * un post largo empuja al siguiente fuera de la pantalla y el que scrollea
   * deja de tener eleccion.
   */
  clamp?: number;
  moreLabel?: string;
  lessLabel?: string;
  /**
   * Lo que va incrustado debajo del texto: una operacion, una imagen, una
   * encuesta, una tarjeta de producto. Es una ranura y no un tipo cerrado a
   * proposito — el kit no sabe que incrusta cada marca, y adivinarlo produce
   * un componente que sirve para una sola.
   */
  attachment?: ReactNode;
  /** La fila de abajo: reacciones, respuestas, compartir. */
  footer?: ReactNode;
  /** El menu de la esquina. */
  overflow?: ReactNode;
  source: string;
  onSelect?: (info: { source: string; action: "expand" | "collapse" }) => void;
  className?: string;
};

/**
 * Un post de un feed: quien, que dijo, que adjunto y que hizo la sala.
 *
 * El recorte es un `<button>` de verdad con `aria-expanded`, no un gradiente
 * con un "ver mas" pintado encima. Medido en la app que dio origen a esto: el
 * texto recortado SIGUE en el DOM, asi que un lector de pantalla ya lo leia
 * entero mientras el boton decia que habia mas — la promesa y el contenido no
 * coincidian. Aqui el boton gobierna una clase, y el estado lo dice el ARIA.
 *
 * Nada aqui pinta la operacion incrustada. Un recibo de bolsa no es una pieza
 * de marca blanca: vive en `attachment`, donde cada consumidor pone la suya.
 *
 * No es `RailThreadList`, que es la bandeja — muchas conversaciones, una linea
 * cada una. Esto es UNA cosa dicha, entera.
 */
export default function RailPost({
  byline,
  children,
  clamp = 3,
  moreLabel = "Ver mas",
  lessLabel = "Ver menos",
  attachment,
  footer,
  overflow,
  source,
  onSelect,
  className,
}: RailPostProps) {
  const [abierto, setAbierto] = useState(false);
  const id = useId();
  const recorta = clamp > 0;

  return (
    <article
      className={["rail-post", className].filter(Boolean).join(" ")}
      data-rail-post={source}
    >
      <header className="rail-post__head">
        {byline}
        {overflow && <div className="rail-post__overflow">{overflow}</div>}
      </header>

      <div
        className="rail-post__body"
        id={id}
        data-clamped={recorta && !abierto ? "" : undefined}
        style={recorta ? ({ "--rail-post-clamp": clamp } as React.CSSProperties) : undefined}
      >
        {children}
      </div>

      {recorta && (
        <button
          type="button"
          className="rail-post__more"
          aria-expanded={abierto}
          aria-controls={id}
          onClick={() => {
            const siguiente = !abierto;
            setAbierto(siguiente);
            onSelect?.({ source, action: siguiente ? "expand" : "collapse" });
          }}
        >
          {abierto ? lessLabel : moreLabel}
        </button>
      )}

      {attachment && <div className="rail-post__attachment">{attachment}</div>}
      {footer && <footer className="rail-post__foot">{footer}</footer>}
    </article>
  );
}
