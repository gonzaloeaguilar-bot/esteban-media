"use client";

export type RailReceiptState = "sending" | "sent" | "delivered" | "read" | "failed";

export type RailReceiptProps = {
  /** What happened to the message. */
  state: RailReceiptState;
  /**
   * The word for each state, in the site's language. Required: one tick and
   * two ticks differ by a few pixels, and read versus delivered is often only
   * a colour — neither reaches a screen reader, and neither survives being
   * colour-blind. If the state is worth showing, it is worth saying.
   */
  labels: Record<RailReceiptState, string>;
  source?: string;
  className?: string;
};

/**
 * What happened to a message you sent: sending, sent, delivered, read, failed.
 *
 * Deliberately not a guess about time — a receipt says what the system knows,
 * and "read" is the strongest claim a messenger makes about another person. A
 * component that showed "read" because a request succeeded would be inventing
 * it, so the state is always the caller's to supply.
 */
export default function RailReceipt({ state, labels, source, className }: RailReceiptProps) {
  const ticks = state === "delivered" || state === "read";

  return (
    <span
      className={["rail-receipt", `rail-receipt--${state}`, className]
        .filter(Boolean)
        .join(" ")}
      data-rail-receipt={source}
    >
      <span className="rail-sr-only">{labels[state]}</span>
      {state === "failed" ? (
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 4.6v4.2M8 11.1v.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ) : state === "sending" ? (
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8 4.4V8l2.4 1.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 20 16" width="18" height="14" aria-hidden="true" focusable="false">
          <path d="M1.8 8.6 5 11.8l6.2-7.6" fill="none" stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
          {ticks && (
            <path d="M8.4 11.6 9.1 12.4l6.9-8.2" fill="none" stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      )}
    </span>
  );
}
