"use client";

import type { ReactNode } from "react";

export type RailPackProps = {
  /** El dibujo del sobre: una ilustracion, una foto del envoltorio. */
  art: ReactNode;
  /** Como se llama, impreso abajo. */
  name: string;
  /** Una linea bajo el nombre: "5 cartas", "Edicion de otono". */
  hint?: string;
  /** El sello o la marca de la esquina. Decorativo. */
  seal?: ReactNode;
  /**
   * El brillo del envoltorio. Va apagado por defecto: un sobre que brilla sin
   * que nadie lo toque es un adorno que corre siempre, y el kit ya paga esa
   * factura una vez con el spotlight.
   */
  foil?: boolean;
  /** Lo que dice el boton, p. ej. "Abrir". Obligatorio: "Open" no es universal. */
  openLabel: string;
  /** Marca el sobre ya abierto: se puede ver, no se puede volver a abrir. */
  opened?: boolean;
  /** Las palabras para el estado abierto. */
  openedLabel?: string;
  onOpen?: (info: { source: string }) => void;
  source: string;
  className?: string;
};

/**
 * El sobre sin abrir.
 *
 * El CSS de esta pieza llevaba en el kit desde el #37 sin componente que lo
 * pintara: veintiocho reglas y veinticuatro tokens que nadie podia usar. Esto
 * los adopta en vez de escribir un segundo sobre al lado, que es exactamente el
 * habito que este kit existe para parar.
 *
 * Abrirlo es una accion, no un enlace: cambia el estado de algo tuyo. Un sobre
 * ya abierto no se esconde ni se deshabilita —sigue siendo el recuerdo de lo
 * que te toco— pero deja de ofrecer la accion, y lo dice con palabras.
 */
export default function RailPack({
  art,
  name,
  hint,
  seal,
  foil = false,
  openLabel,
  opened = false,
  openedLabel,
  onOpen,
  source,
  className,
}: RailPackProps) {
  return (
    <div
      className={["rail-pack", className].filter(Boolean).join(" ")}
      data-rail-pack={source}
      data-opened={opened ? "" : undefined}
    >
      <span className="rail-pack__art">{art}</span>
      {foil && <span className="rail-pack__foil" aria-hidden="true" />}
      {seal && (
        <span className="rail-pack__seal" aria-hidden="true">
          {seal}
        </span>
      )}
      {/* `__name` esta posicionado abajo por el CSS que trajo el #37, asi que
          la pista y la accion van DESPUES del arte, no antes: en el primer
          intento salieron pisando la cabecera del sobre. */}
      <span className="rail-pack__name">
        {name}
        {hint && <span className="rail-pack__hint">{hint}</span>}
      </span>
      {opened ? (
        openedLabel && <span className="rail-pack__hint">{openedLabel}</span>
      ) : (
        <button
          type="button"
          className="rail-card__cta rail-card__cta--primary"
          onClick={() => onOpen?.({ source })}
        >
          <span className="rail-card__cta-label">{openLabel}</span>
        </button>
      )}
    </div>
  );
}
