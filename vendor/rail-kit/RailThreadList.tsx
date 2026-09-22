"use client";

import type { ReactNode } from "react";

export type RailThread = {
  id: string;
  /** Who the conversation is with, or the group's name. */
  name: string;
  /** The last line: "Sent a reel", "Liked a message", the message itself. */
  preview?: string;
  /**
   * When it happened, already formatted by the caller — "10m", "4h", "Tue".
   * The kit does not format time: only the site knows the reader's locale and
   * timezone, and a wrong "yesterday" is worse than no time at all.
   */
  timestamp?: string;
  avatar?: { src: string; alt: string };
  /** Not yet read. Renders a mark and raises the weight of the name. */
  unread?: boolean;
  /**
   * Who spoke last, when the thread has more than two people — "Ana:". Shown
   * before the preview and never on a one-to-one thread, where it would only
   * repeat the name already at the top of the row.
   */
  sender?: string;
  /**
   * What happened to YOUR last message: sent, delivered, read. Pass
   * `<RailReceipt />`. Absent on threads where the last word was not yours,
   * which is the only honest way to show it — a receipt on someone else's
   * message is a lie about who is waiting.
   */
  receipt?: ReactNode;
  /**
   * Marks at the end of the row: pinned, muted, archived. The brand supplies
   * the glyphs; each should carry its own accessible name.
   */
  marks?: ReactNode;
  /** Notifications off. The mark is a glyph the brand supplies. */
  mutedGlyph?: ReactNode;
  href?: string;
};

export type RailThreadListProps = {
  threads: RailThread[];
  /** What this list is, for a screen reader. */
  label: string;
  source: string;
  /**
   * Lines of preview before it clips. One by default: two lines turns a list
   * you scan into a page you read.
   */
  previewLines?: 1 | 2;
  /**
   * The words a screen reader hears on an unread row. The dot alone is colour
   * and shape only, which is not a status anyone can hear.
   */
  unreadLabel?: string;
  onSelect?: (info: { source: string; id: string; index: number }) => void;
  className?: string;
};

/**
 * The inbox: a face, a name, the last line, when it happened, and whether it
 * has been read.
 *
 * The unread mark carries a word as well as a dot. A coloured dot is the
 * cheapest possible status and the least accessible one — it is invisible to a
 * screen reader and ambiguous to anyone who cannot separate its hue from the
 * background, and "unread" is precisely the thing the row exists to say.
 *
 * The preview is one clipped line. Two lines of preview turns a list you scan
 * into a page you read, which is the difference between finding a conversation
 * and browsing all of them.
 */
function RowLink({
  href,
  onSelect,
  children,
}: {
  href?: string;
  onSelect: () => void;
  children: ReactNode;
}) {
  return href ? (
    <a className="rail-threadlist__link" href={href} onClick={onSelect}>
      {children}
    </a>
  ) : (
    <div className="rail-threadlist__link">{children}</div>
  );
}

export default function RailThreadList({
  threads,
  label,
  source,
  unreadLabel = "Unread",
  previewLines = 1,
  onSelect,
  className,
}: RailThreadListProps) {
  return (
    <ul
      className={["rail-threadlist", className].filter(Boolean).join(" ")}
      aria-label={label}
      data-rail-threadlist={source}
    >
      {threads.map((thread, index) => {
        return (
          <li
            className={[
              "rail-threadlist__item",
              thread.unread && "rail-threadlist__item--unread",
            ]
              .filter(Boolean)
              .join(" ")}
            key={thread.id}
          >
            {/* Rama literal, no `<Tag>`: un ancla dentro de una variable es
                invisible para un comprobador que lee el fuente. */}
            <RowLink href={thread.href} onSelect={() => onSelect?.({ source, id: thread.id, index })}>
              {thread.avatar && (
                <span className="rail-threadlist__avatar">
                  <img
                    className="rail-threadlist__image"
                    src={thread.avatar.src}
                    alt={thread.avatar.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              )}
              <span className="rail-threadlist__body">
                <span className="rail-threadlist__name">{thread.name}</span>
                {thread.preview && (
                  <span
                    className="rail-threadlist__preview"
                    style={{ ["--_lines" as string]: previewLines }}
                  >
                    {thread.receipt && (
                      <span className="rail-threadlist__receipt">{thread.receipt}</span>
                    )}
                    {thread.sender && (
                      <span className="rail-threadlist__sender">{thread.sender}: </span>
                    )}
                    {thread.preview}
                  </span>
                )}
              </span>
              <span className="rail-threadlist__aside">
                {thread.timestamp && (
                  <span className="rail-threadlist__time">{thread.timestamp}</span>
                )}
                <span className="rail-threadlist__marks">
                  {thread.mutedGlyph && (
                    <span className="rail-threadlist__muted">{thread.mutedGlyph}</span>
                  )}
                  {thread.marks}
                  {thread.unread && (
                    <span className="rail-threadlist__unread">
                      <span className="rail-threadlist__dot" aria-hidden="true" />
                      <span className="rail-sr-only">{unreadLabel}</span>
                    </span>
                  )}
                </span>
              </span>
            </RowLink>
          </li>
        );
      })}
    </ul>
  );
}
