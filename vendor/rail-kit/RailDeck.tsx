"use client";

import { useRef, useState } from "react";

export type RailDeckCard = {
  id: string;
  title: string;
  /** One line of context. Long enough to decide on, short enough to read once. */
  note?: string;
  image?: { src: string; alt: string };
  /** A label over the image — where it came from, when it was. */
  tag?: string;
  /** Where this card actually leads. Absent is allowed and is not a broken card. */
  href?: string;
};

export type RailDeckProps = {
  cards: RailDeckCard[];
  /** Both directions, named by the brand: "Me interesa" / "Paso". */
  keepLabel: string;
  passLabel: string;
  /** Stamped across the card as it leaves. Short — two words at most. */
  keepStamp?: string;
  passStamp?: string;
  /** Read by a screen reader on the card itself, before the keys are any use. */
  instructions: string;
  /** `of` and `kept` are both printed. A counter with one number is a mood. */
  progressLabel: (of: { index: number; total: number; kept: number }) => string;
  /** Called once, when the last card has been decided. */
  onFinish?: (kept: RailDeckCard[]) => void;
  /**
   * Called on EVERY decision, the moment it is made. `onFinish` alone only
   * reports people who reach the end, so a visitor who keeps two cards and
   * leaves tells you nothing about which cards they wanted — the one question
   * a keep/pass deck exists to answer.
   */
  onDecide?: (info: {
    source: string;
    id: string;
    index: number;
    keep: boolean;
    via: "button" | "drag" | "key";
  }) => void;
  /** What the deck becomes once it is done. Renders in the card's place. */
  result?: (kept: RailDeckCard[], restart: () => void) => React.ReactNode;
  source: string;
  className?: string;
};

/** Below this, a drag is a tap that wobbled. */
const COMMIT_PX = 40;
/** Below this, we have not decided the gesture is horizontal yet. */
const INTENT_PX = 12;

/**
 * A deck of cards you keep or pass, and the thing a visitor remembers.
 *
 * TWO EXITS, AND THEY ARE NOT INTERCHANGEABLE. A button press starts at rest,
 * so its exit holds still for a beat first — that hold is what lets the stamp
 * register and tells you which way you chose. A drag has already travelled, so
 * its exit continues from the live offset. Shipping the button exit on the drag
 * path means the card teleports back under the finger that just moved it,
 * waits, and only then leaves. That shipped once; it read as a bug, because it
 * was one. `motion.css` owns both, keyed by `.from-drag`.
 *
 * THE DRAG OFFSET IS NOT CLEARED BEFORE THE EXIT CLASS IS ADDED. The animation
 * reads `--rail-drag-x` on its first frame. Clearing first is the whole defect.
 *
 * THE GESTURE IS NOT THE ONLY WAY IN. Buttons and arrow keys do the same thing,
 * because a swipe-only mechanic excludes a keyboard and most assistive input.
 *
 * `touch-action: pan-y` on the card: horizontal is ours, vertical stays the
 * page's. A deck that eats the scroll is a deck people cannot get past.
 */
export default function RailDeck({
  cards,
  keepLabel,
  passLabel,
  keepStamp,
  passStamp,
  instructions,
  progressLabel,
  onFinish,
  onDecide,
  result,
  source,
  className,
}: RailDeckProps) {
  const card = useRef<HTMLElement>(null);
  const pointer = useRef<{ x: number; id: number; horizontal: boolean } | null>(null);
  const [index, setIndex] = useState(0);
  const [kept, setKept] = useState<RailDeckCard[]>([]);
  const [busy, setBusy] = useState(false);

  const done = index >= cards.length;
  const current = cards[index];

  const clearDrag = () => {
    const el = card.current;
    if (!el) return;
    el.classList.remove("is-dragging");
    el.style.removeProperty("--rail-drag-x");
    el.style.removeProperty("--rail-drag-angle");
  };

  const decide = (keep: boolean, fromDrag: boolean, via: "button" | "drag" | "key" = fromDrag ? "drag" : "button") => {
    const el = card.current;
    if (busy || done || !el) return;
    setBusy(true);
    onDecide?.({ source, id: current.id, index, keep, via });
    const nextKept = keep ? [...kept, current] : kept;
    if (keep) setKept(nextKept);

    // NOT clearDrag() here: the drag exit reads the offset on its first frame.
    el.classList.remove("is-dragging");
    if (fromDrag) el.classList.add("from-drag");
    el.classList.add(keep ? "is-keeping" : "is-passing");

    window.setTimeout(() => {
      el.classList.remove("is-keeping", "is-passing", "from-drag");
      clearDrag();
      const next = index + 1;
      setIndex(next);
      setBusy(false);
      if (next >= cards.length) onFinish?.(nextKept);
    }, fromDrag ? 460 : 950);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (busy || !e.isPrimary || e.button !== 0) return;
    if ((e.target as HTMLElement).closest("a,button")) return;
    pointer.current = { x: e.clientX, id: e.pointerId, horizontal: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = pointer.current;
    const el = card.current;
    if (!p || !el || e.pointerId !== p.id) return;
    const dx = e.clientX - p.x;
    if (!p.horizontal) {
      if (Math.abs(dx) < INTENT_PX) return;
      p.horizontal = true;
      el.setPointerCapture(e.pointerId);
    }
    el.classList.add("is-dragging");
    el.style.setProperty("--rail-drag-x", `${dx}px`);
    el.style.setProperty("--rail-drag-angle", `${dx / 18}deg`);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const p = pointer.current;
    if (!p || e.pointerId !== p.id) return;
    const dx = e.clientX - p.x;
    const committed = p.horizontal && Math.abs(dx) > COMMIT_PX;
    pointer.current = null;
    if (committed) decide(dx > 0, true);
    else clearDrag();
  };

  const restart = () => {
    if (busy) return;
    setIndex(0);
    setKept([]);
  };

  return (
    <div className={["rail-deck", className].filter(Boolean).join(" ")} data-rail-deck={source}>
      <p className="rail-deck__progress" aria-live="polite">
        {progressLabel({ index, total: cards.length, kept: kept.length })}
      </p>

      {done ? (
        <div className="rail-deck__result">{result?.(kept, restart)}</div>
      ) : (
        <>
          <article
            ref={card}
            className="rail-deck__card rail-decide"
            tabIndex={0}
            aria-label={instructions}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={clearDrag}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              decide(e.key === "ArrowRight", false, "key");
            }}
          >
            {current.image && (
              <span className="rail-deck__media">
                <img src={current.image.src} alt={current.image.alt} draggable={false} />
                {current.tag && <span className="rail-deck__tag">{current.tag}</span>}
                {keepStamp && (
                  <span className="rail-deck__stamp rail-deck__stamp--keep" aria-hidden="true">
                    {keepStamp}
                  </span>
                )}
                {passStamp && (
                  <span className="rail-deck__stamp rail-deck__stamp--pass" aria-hidden="true">
                    {passStamp}
                  </span>
                )}
              </span>
            )}
            <span className="rail-deck__body">
              <strong>{current.title}</strong>
              {current.note && <small>{current.note}</small>}
              {current.href && (
                <a href={current.href} target="_blank" rel="noopener noreferrer">
                  {current.title}
                </a>
              )}
            </span>
          </article>

          <div className="rail-deck__actions">
            <button type="button" onClick={() => decide(false, false)}>
              {passLabel}
            </button>
            <button type="button" onClick={() => decide(true, false)}>
              {keepLabel}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
