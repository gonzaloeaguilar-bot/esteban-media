"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import RailCard from "./RailCard";
import type { RailAction, RailProps } from "./types";

const DISMISS_PREFIX = "rail-kit.dismissed.";

/** Dismissals are a visitor preference; they live in the visitor's browser. */
function readDismissed(key: string): boolean {
  try {
    return window.localStorage.getItem(DISMISS_PREFIX + key) === "1";
  } catch {
    return false;
  }
}

function writeDismissed(key: string) {
  try {
    window.localStorage.setItem(DISMISS_PREFIX + key, "1");
  } catch {
    /* storage unavailable — the dismissal holds for this page view only */
  }
}

/**
 * A horizontal, snapping rail of cards. Brand-agnostic by construction: every
 * colour, radius, font and shadow comes from CSS custom properties defined by
 * the consuming site (see README), and the only copy the rail owns is its
 * arrow labels.
 */
export default function Rail({
  items,
  source,
  heading,
  subheading,
  eyebrow,
  size = "md",
  variant = "editorial",
  cta = "primary",
  descriptionLines,
  dismissible = false,
  dismissKey,
  dismissLabel = "Dismiss",
  onDismiss,
  highlightId,
  headerAction,
  progressSlot,
  tailSlot,
  showControls = false,
  ariaLabel,
  titleAs = "span",
  labels,
  className,
  onImpression,
  onCardView,
  onSelect,
}: RailProps) {
  const railRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [viewed, setViewed] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [dismissedCards, setDismissedCards] = useState<string[]>([]);
  const impressionSent = useRef(false);
  const headingId = `rail-${source}`;

  // Rail impression — once, and only when it is actually on screen.
  useEffect(() => {
    const el = railRef.current;
    if (!el || !onImpression || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || impressionSent.current) continue;
          impressionSent.current = true;
          onImpression({ source, itemCount: items.length });
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [items.length, onImpression, source]);

  // Per-card views — how far into the rail people actually travel.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const id = el.dataset.railCard;
          const index = Number(el.dataset.railIndex ?? "0");
          if (!id) continue;
          setViewed((prev) => {
            if (prev.includes(id)) return prev;
            onCardView?.({ source, id, index });
            return [...prev, id];
          });
        }
      },
      { root: scroller, threshold: 0.6 },
    );

    scroller
      .querySelectorAll<HTMLElement>("[data-rail-card]")
      .forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, [onCardView, source]);

  /**
   * Which cards are on screen right now, as numbers. Dots cannot say
   * "3 of 10"; on a long rail that range is the only orientation a visitor
   * gets, and a screen reader gets it too through aria-live.
   */
  const [rango, setRango] = useState<[number, number]>([1, 1]);
  /**
   * Los extremos y el desbordamiento. Una flecha que sigue encendida en el
   * final miente, y un par de flechas sobre una fila que cabe entera en
   * pantalla son controles que no hacen nada.
   */
  const [puedeAtras, setPuedeAtras] = useState(false);
  const [puedeAdelante, setPuedeAdelante] = useState(false);
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const recalcular = () => {
      if (!labels?.position) return;
      const cards = Array.from(
        scroller.querySelectorAll<HTMLElement>("[data-rail-card]"),
      );
      if (cards.length === 0) return;
      const izquierda = scroller.scrollLeft;
      const derecha = izquierda + scroller.clientWidth;
      let primera = cards.length;
      let ultima = 1;
      cards.forEach((card, i) => {
        const inicio = card.offsetLeft;
        const fin = inicio + card.offsetWidth;
        // Cuenta como visible si se ve al menos la mitad de la tarjeta.
        if (fin - 4 > izquierda + card.offsetWidth / 2 && inicio + card.offsetWidth / 2 < derecha + 4) {
          primera = Math.min(primera, i + 1);
          ultima = Math.max(ultima, i + 1);
        }
      });
      setRango([Math.min(primera, ultima), ultima]);
    };
    const recalcularExtremos = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      setPuedeAtras(scroller.scrollLeft > 4);
      setPuedeAdelante(max > 8 && scroller.scrollLeft < max - 4);
    };
    const alMover = () => {
      recalcular();
      recalcularExtremos();
    };
    alMover();
    scroller.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      scroller.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, [labels, items.length]);

  const posicion = labels?.position
    ? labels.position(rango[0], rango[1], items.length)
    : "";

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>("[data-rail-card]");
    const gap = 20;
    const step = card ? card.offsetWidth + gap : scroller.clientWidth * 0.8;
    scroller.scrollBy({ left: step * direction, behavior: "smooth" });
  }, []);

  // A remembered dismissal is read after mount so the server and the client
  // render the same markup.
  const remembered = useSyncExternalStore(
    () => () => {},
    () => (dismissKey ? readDismissed(dismissKey) : false),
    () => false,
  );

  const visibleItems = items.filter((item) => !dismissedCards.includes(item.id));

  if (visibleItems.length === 0 || dismissed || remembered) return null;

  return (
    <section
      ref={railRef}
      className={["rail", className].filter(Boolean).join(" ")}
      data-rail={source}
      data-rail-size={size}
      data-rail-variant={variant}
      data-rail-clamp={descriptionLines ? "" : undefined}
      style={
        descriptionLines
          ? ({ ["--rail-description-lines" as string]: String(descriptionLines) })
          : undefined
      }
      aria-labelledby={heading ? headingId : undefined}
      aria-label={heading ? undefined : (ariaLabel ?? `Options — ${source}`)}
    >
      {(heading || eyebrow || subheading || showControls) && (
        <header className="rail__header">
          <div>
            {eyebrow && <p className="rail__eyebrow">{eyebrow}</p>}
            {heading && (
              <h2 id={headingId} className="rail__heading">
                {heading}
              </h2>
            )}
            {subheading && <p className="rail__subheading">{subheading}</p>}
          </div>
          {posicion && (
            /* Where you are, in numbers. Dots cannot say "3 of 10", and on a
               rail of ten cards that is the only thing a visitor wants to
               know. It sits OUTSIDE the arrows on purpose: the arrows hide on
               a phone, and that is exactly where the counter matters most. */
            <p className="rail__position" aria-live="polite">
              {posicion}
            </p>
          )}
          <div className="rail__arrows" data-rail-scrollable={puedeAtras || puedeAdelante ? "true" : "false"}>
            {headerAction && (
              <a className="rail__header-action" href={headerAction.href}>
                {headerAction.label} <span aria-hidden="true">›</span>
              </a>
            )}
            {dismissible && (
              <button
                type="button"
                className="rail__arrow rail__dismiss"
                onClick={() => {
                  setDismissed(true);
                  if (dismissKey) writeDismissed(dismissKey);
                  onDismiss?.({ source, scope: "rail" });
                }}
              >
                <span aria-hidden="true">×</span>
                <span className="rail-sr-only">
                  {heading ? `${dismissLabel}: ${heading}` : dismissLabel}
                </span>
              </button>
            )}
            <button
              type="button"
              className="rail__arrow rail__arrow--move"
              onClick={() => scrollByCard(-1)}
              disabled={!puedeAtras}
              aria-label={labels?.back ?? "Scroll back"}
            >
              ←
            </button>
            <button
              type="button"
              className="rail__arrow rail__arrow--move"
              onClick={() => scrollByCard(1)}
              disabled={!puedeAdelante}
              aria-label={labels?.forward ?? "Scroll forward"}
            >
              →
            </button>
          </div>
        </header>
      )}

      {progressSlot}

      <div
        ref={scrollerRef}
        className="rail__scroller"
        role="group"
        tabIndex={0}
        aria-label={heading ? `${heading} — ${items.length} cards` : undefined}
      >
        {visibleItems.map((item, index) => (
          <RailCard
            key={item.id}
            item={item}
            index={index}
            highlighted={item.id === highlightId}
            variant={variant}
            cta={cta}
            titleAs={titleAs}
            dismissLabel={dismissLabel}
            onActionSelect={(action: RailAction, actionIndex: number) =>
              onSelect?.({
                source,
                id: item.id,
                index,
                cardsViewed: viewed.length,
                actionId: action.id ?? action.label,
                actionIndex,
              })
            }
            onDismiss={
              item.dismissible
                ? () => {
                    setDismissedCards((prev) => [...prev, item.id]);
                    onDismiss?.({ source, scope: "card", id: item.id });
                  }
                : undefined
            }
            onSelect={() =>
              onSelect?.({
                source,
                id: item.id,
                index,
                cardsViewed: viewed.length,
              })
            }
          />
        ))}
        {tailSlot}
      </div>
    </section>
  );
}
