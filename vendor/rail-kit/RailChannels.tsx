"use client";

import type { ReactNode } from "react";

export type RailChannel = {
  id: string;
  /** The channel's name, without the mark: "start-here". */
  name: string;
  href: string;
  /** The mark before it — "#", a speaker, a lock, an emoji. */
  glyph?: ReactNode;
  /**
   * Something happened here that this person has not seen. Drawn as a mark
   * AND said in words, because a dot is not a word.
   */
  unread?: boolean;
  /** How many, when the count is known: 3 mentions, not just "something". */
  count?: number;
};

export type RailChannelGroup = {
  id: string;
  /** The category: "START HERE", "CASH READY". */
  title: string;
  channels: RailChannel[];
  /** Folded at first paint. The state is the site's after that. */
  collapsed?: boolean;
};

export type RailChannelsProps = {
  groups: RailChannelGroup[];
  /** Which channel is open. */
  activeId?: string;
  /** What the whole thing is: "Channels". */
  label: string;
  /** The word for an unread channel, for a screen reader: "unread". */
  unreadLabel: string;
  /** The words on the fold toggle: "Collapse" / "Expand". */
  foldLabels: { collapse: string; expand: string };
  /**
   * The locale the counts are written in. A badge is a number, and a number
   * is not the same glyphs everywhere: 1,200 is 1.200 in half of Europe and
   * ١٢٠٠ in Arabic.
   */
  locale?: string;
  source: string;
  onSelect?: (info: { source: string; id: string }) => void;
  onFold?: (info: { source: string; id: string; collapsed: boolean }) => void;
  className?: string;
};

/**
 * The sidebar: channels, grouped, one of them open.
 *
 * A DOT IS NOT A WORD. Every sidebar in this shape marks unread channels with
 * a bullet and nothing else, which means a screen reader hears the same list
 * whether or not anything happened. Here the mark is drawn AND the state is
 * announced — "unread", or the count when there is one — so the sidebar says
 * the same thing to everybody.
 *
 * THE FOLD IS A BUTTON WITH THE GROUP'S NAME IN IT, not a chevron beside a
 * heading. "Collapse CASH READY" is a control; a lone chevron in a list of
 * eight identical chevrons is a guess.
 *
 * COLLAPSED GROUPS STILL RENDER THEIR UNREAD CHANNELS — that is what every
 * one of these does, and it is right: folding a category is a tidying
 * gesture, not an instruction to hide news. The group's own header keeps its
 * count too, so nothing disappears silently.
 *
 * The fold state is the SITE'S, reported and never held here: a sidebar that
 * remembers its own folds disagrees with the next device the person opens.
 */
export default function RailChannels({
  groups,
  activeId,
  label,
  unreadLabel,
  foldLabels,
  locale,
  source,
  onSelect,
  onFold,
  className,
}: RailChannelsProps) {
  if (groups.length === 0) return null;
  const nf = new Intl.NumberFormat(locale);

  return (
    <nav
      className={["rail-channels", className].filter(Boolean).join(" ")}
      data-rail-channels={source}
      aria-label={label}
    >
      {groups.map((group) => {
        const unread = group.channels.filter((channel) => channel.unread);
        const shown = group.collapsed
          ? group.channels.filter(
              (channel) => channel.unread || channel.id === activeId,
            )
          : group.channels;

        return (
          <section className="rail-channels__group" key={group.id}>
            <h3 className="rail-channels__head">
              <button
                type="button"
                className="rail-channels__fold"
                aria-expanded={!group.collapsed}
                onClick={() =>
                  onFold?.({
                    source,
                    id: group.id,
                    collapsed: !group.collapsed,
                  })
                }
              >
                <span className="rail-channels__chevron" aria-hidden="true" />
                <span className="rail-channels__title">{group.title}</span>
                <span className="rail-sr-only">
                  {group.collapsed ? foldLabels.expand : foldLabels.collapse}
                </span>
              </button>
              {group.collapsed && unread.length > 0 && (
                <span className="rail-channels__group-count">
                  {nf.format(unread.length)}
                </span>
              )}
            </h3>

            {shown.length > 0 && (
              <ul className="rail-channels__list">
                {shown.map((channel) => (
                  <li key={channel.id}>
                    <a
                      className="rail-channels__channel"
                      href={channel.href}
                      data-rail-unread={channel.unread ? "" : undefined}
                      aria-current={
                        channel.id === activeId ? "page" : undefined
                      }
                      onClick={() => onSelect?.({ source, id: channel.id })}
                    >
                      {channel.glyph && (
                        <span
                          className="rail-channels__glyph"
                          aria-hidden="true"
                        >
                          {channel.glyph}
                        </span>
                      )}
                      <span className="rail-channels__name">
                        {channel.name}
                      </span>
                      {channel.unread && (
                        <>
                          <span
                            className="rail-channels__dot"
                            aria-hidden="true"
                          />
                          <span className="rail-sr-only">
                            {typeof channel.count === "number"
                              ? `${nf.format(channel.count)} ${unreadLabel}`
                              : unreadLabel}
                          </span>
                        </>
                      )}
                      {typeof channel.count === "number" && (
                        <span className="rail-channels__count" aria-hidden="true">
                          {nf.format(channel.count)}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </nav>
  );
}
