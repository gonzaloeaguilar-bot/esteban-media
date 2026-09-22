"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
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
  headingMark,
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
  const viewedRef = useRef<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState(false);
  const [dismissedCards, setDismissedCards] = useState<string[]>([]);
  const impressionSent = useRef(false);
  const dragRef = useRef({ pointerId: -1, startX: 0, startScrollLeft: 0, moved: false });
  const [dragging, setDragging] = useState(false);
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
          if (viewedRef.current.has(id)) continue;
          viewedRef.current.add(id);
          setViewed((prev) => [...prev, id]);
          onCardView?.({ source, id, index });
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
   * Cards scrolled out of view stay in the DOM, so without this a keyboard
   * user tabbing through the page walks every link and button on every card
   * they cannot see — the most-reported carousel defect there is (Embla #506
   * and #1192, Swiper #4006). `inert` removes a subtree from the tab order,
   * from the accessibility tree and from hit testing in one attribute.
   *
   * It is applied by observation rather than by index arithmetic because the
   * rail does not know how many cards fit: that depends on the card width the
   * brand chose, the viewport and the zoom level. The observer already knows.
   *
   * The threshold is deliberately low. A card half on screen is a card
   * somebody can see and may want to reach; only what is genuinely off the
   * end goes inert.
   */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          // Never inert the element that currently holds focus: taking the
          // focused node out of the tree drops focus to <body> and loses the
          // visitor's place mid-scroll.
          if (el.contains(document.activeElement)) {
            el.removeAttribute("inert");
            continue;
          }
          if (entry.isIntersecting) el.removeAttribute("inert");
          else el.setAttribute("inert", "");
        }
      },
      { root: scroller, threshold: 0.1 },
    );

    scroller
      .querySelectorAll<HTMLElement>("[data-rail-card]")
      .forEach((card) => io.observe(card));
    return () => {
      io.disconnect();
      scroller
        .querySelectorAll<HTMLElement>("[data-rail-card]")
        .forEach((card) => card.removeAttribute("inert"));
    };
  }, [items.length]);

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
    // Read the preference at call time rather than at mount: someone can
    // change it in the OS while the page is open, and the CSS rule beside this
    // one is already gated the same way.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollBy({
      left: step * direction,
      behavior: reduce ? "auto" : "smooth",
    });
  }, []);

  const startDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const scroller = scrollerRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: scroller.scrollLeft,
      moved: false,
    };
  }, []);

  const moveDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    const drag = dragRef.current;
    if (!scroller || drag.pointerId !== event.pointerId) return;
    if (event.buttons !== 1) {
      drag.pointerId = -1;
      drag.moved = false;
      setDragging(false);
      return;
    }
    const distance = event.clientX - drag.startX;
    if (!drag.moved && Math.abs(distance) < 6) return;
    if (!drag.moved) {
      drag.moved = true;
      scroller.setPointerCapture(event.pointerId);
    }
    setDragging(true);
    scroller.scrollLeft = drag.startScrollLeft - distance;
    event.preventDefault();
  }, []);

  useEffect(() => {
    const clearReleasedPointer = (event: PointerEvent) => {
      if (dragRef.current.pointerId !== event.pointerId) return;
      dragRef.current.pointerId = -1;
      dragRef.current.moved = false;
      setDragging(false);
    };
    window.addEventListener("pointerup", clearReleasedPointer);
    window.addEventListener("pointercancel", clearReleasedPointer);
    return () => {
      window.removeEventListener("pointerup", clearReleasedPointer);
      window.removeEventListener("pointercancel", clearReleasedPointer);
    };
  }, []);

  const stopDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || dragRef.current.pointerId !== event.pointerId) return;
    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }
    dragRef.current.pointerId = -1;
    setDragging(false);
    window.setTimeout(() => {
      dragRef.current.moved = false;
    }, 0);
  }, []);

  const suppressDraggedClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.moved = false;
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
      /* The surface label, in the DOM. Every other component already did
         this; the rail -- the one with the React callbacks -- was the one
         that did not, so a page could report every poll and every table and
         stay silent about the carousel they all sat in. */
      data-rail-rail={source}
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
                {headingMark && (
                  /* Decorativo: el titulo ya dice de que seccion se trata, y
                     repetirlo en un alt es ruido para quien lo escucha. */
                  <span className="rail__heading-mark" aria-hidden="true">
                    {headingMark}
                  </span>
                )}
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
        data-dragging={dragging ? "true" : "false"}
        role="group"
        tabIndex={0}
        aria-label={heading ? `${heading} — ${items.length} cards` : undefined}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={stopDrag}
        onClickCapture={suppressDraggedClick}
        onDragStart={(event) => event.preventDefault()}
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
