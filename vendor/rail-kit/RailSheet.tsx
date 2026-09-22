"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { RailAction } from "./types";

export type RailSheetProps = {
  open: boolean;
  /**
   * Called whenever the sheet closes — the button, the backdrop, Escape.
   * Escape is the browser's, not ours, so a controlled `open` that ignores
   * this will fight the user: they press Escape, the dialog closes, and the
   * next render re-opens it.
   */
  onClose: () => void;
  title: string;
  /** Small line above the title — a category, a client, a status. */
  badge?: string;
  /** Small line under the title — a date, a place, a price. */
  meta?: string;
  description?: ReactNode;
  /**
   * The picture, shown whole. Cropping it again here would leave the sheet
   * with no reason to exist.
   */
  image?: { src: string; alt: string };
  /** The consumer's own media — a video, an embed, an optimised image. */
  media?: ReactNode;
  /** Up to three. The first is filled, the rest outlined. */
  actions?: RailAction[];
  /** Anything else for the text column — a spec list, a quote, a form. */
  children?: ReactNode;
  /** The close button's accessible name. A button with no name is not a button. */
  closeLabel?: string;
  source: string;
  onSelect?: (info: {
    source: string;
    actionId: string;
    actionIndex: number;
  }) => void;
  className?: string;
};

/**
 * The card, opened. What a visitor gains by opening one is not hidden text —
 * a good card already shows all of its own — it is ROOM: on a poster card the
 * photograph is cropped to the card's shape and the copy sits in a panel. Open,
 * the picture is whole and the text runs at reading size.
 *
 * It is a real <dialog>, not a div with position:fixed. The native element
 * brings for free everything a hand-rolled overlay gets wrong: Escape closes
 * it, focus is trapped inside, focus returns to whatever opened it, and the
 * rest of the page is inert to a screen reader. A hand-rolled overlay leaves
 * the reader walking around underneath the panel.
 */
export default function RailSheet({
  open,
  onClose,
  title,
  badge,
  meta,
  description,
  image,
  media,
  actions = [],
  children,
  closeLabel = "Close",
  source,
  onSelect,
  className,
}: RailSheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  /**
   * Whether this was driven by a pointer. It matters only ON CLOSE: the
   * browser returns focus to whatever opened the sheet, and on that element a
   * visible ring reads as a stray outline to somebody who never touched the
   * keyboard. For a keyboard user that same ring is the only way to know
   * where they landed, so it stays.
   *
   * It must NOT be used to blur on open. Blurring while the dialog is showing
   * moves focus out of the modal and breaks the focus trap — after which
   * Escape stops closing it, because the key never reaches the dialog. Caught
   * in the workbench: `activeElement` was the page behind the panel.
   */
  const fromPointer = useRef(false);

  // Cual fue la ULTIMA interaccion real, no que aparatos tiene el equipo.
  // Antes esto se decidia con matchMedia("(hover: hover) and (pointer: fine)"),
  // que es una capacidad del dispositivo: en cualquier portatil daba true
  // SIEMPRE, asi que tambien se soltaba el foco despues de abrir y cerrar con
  // el teclado, y quien navega con Tab perdia su sitio en la pagina en cada
  // cierre. Medido en el taller: abrir con Enter, cerrar con Escape, y
  // activeElement quedaba en <body> en vez de volver al disparador.
  const modality = useRef<"pointer" | "key">("pointer");

  useEffect(() => {
    const pointer = () => { modality.current = "pointer"; };
    const key = () => { modality.current = "key"; };
    document.addEventListener("pointerdown", pointer, true);
    document.addEventListener("keydown", key, true);
    return () => {
      document.removeEventListener("pointerdown", pointer, true);
      document.removeEventListener("keydown", key, true);
    };
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    // showModal is absent in jsdom and in very old browsers. Bail rather than
    // throw: a sheet that does not open is recoverable, a crash is not.
    if (!dialog || typeof dialog.showModal !== "function") return;

    if (open && !dialog.open) {
      fromPointer.current = modality.current === "pointer";
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    // Escape is the browser's: it closes the dialog without telling React.
    // Listening to `close` is what keeps the prop honest.
    const handle = () => {
      onClose();
      // Focus is back on the opener now that the dialog has closed, so
      // dropping the ring here is safe — nothing is trapped any more.
      if (fromPointer.current && document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    };
    dialog.addEventListener("close", handle);
    return () => dialog.removeEventListener("close", handle);
  }, [onClose]);

  const resolved = actions.slice(0, 3).map((action, index) => ({
    ...action,
    variant: action.variant ?? (index === 0 ? "primary" : "secondary"),
  }));

  const figure = media ?? (image ? (
    <img
      className="rail-sheet__image"
      src={image.src}
      alt={image.alt}
      decoding="async"
    />
  ) : null);

  return (
    <dialog
      ref={ref}
      className={["rail-sheet", className].filter(Boolean).join(" ")}
      data-rail-sheet={source}
      aria-label={title}
      // The dialog fills only its own box, so a click that lands on the
      // element itself landed on the backdrop around it.
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      {/* The grid lives on a wrapper INSIDE the dialog. See rail.css: giving
          the <dialog> itself a `display` breaks it in two separate ways. */}
      <div className="rail-sheet__in">
        <button
          type="button"
          className="rail-sheet__close"
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
          <span className="rail-sheet__sr">{closeLabel}</span>
        </button>

        {/* Unmounted while closed, which releases the decoded picture. Eight
            large photographs left decoded after one look each is real memory
            on a phone. */}
        {open && figure && <figure className="rail-sheet__figure">{figure}</figure>}

        <div className="rail-sheet__text">
          {badge && <p className="rail-sheet__badge">{badge}</p>}
          <h2 className="rail-sheet__title">{title}</h2>
          {meta && <p className="rail-sheet__meta">{meta}</p>}
          {description && <div className="rail-sheet__body">{description}</div>}
          {children}
          {resolved.length > 0 && (
            <div className="rail-sheet__actions">
              {resolved.map((action, index) => (
                <a
                  key={action.id ?? action.label}
                  className={`rail-card__cta rail-card__cta--${action.variant}`}
                  href={action.href}
                  onClick={() =>
                    onSelect?.({
                      source,
                      actionId: action.id ?? action.label,
                      actionIndex: index,
                    })
                  }
                >
                  <span className="rail-card__cta-label">{action.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
