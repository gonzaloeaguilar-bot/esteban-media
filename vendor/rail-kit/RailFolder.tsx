"use client";

import { useId, useState, type ReactNode } from "react";

export type RailFolderItem = {
  /** Stable id. Used for the panel's id and for `onOpen`. */
  id: string;
  /** The word on the tab. Two or three, not a sentence: a tab is a label. */
  label: ReactNode;
  /** A count or a mark beside the label — "12", "NEW". */
  badge?: ReactNode;
  children: ReactNode;
};

export type RailFolderProps = {
  folders: RailFolderItem[];
  /** Which one starts open. Defaults to the first. */
  defaultId?: string;
  /**
   * How far each tab steps across. The tabs are staggered like the tabs of
   * real folders so the row reads as a drawer rather than a segmented
   * control; with more than about five, let them wrap instead.
   */
  tone?: "drawer" | "stack";
  source: string;
  onOpen?: (info: { source: string; id: string }) => void;
  className?: string;
};

/**
 * Folders in a drawer: staggered tabs along the top, one open below them.
 *
 * WHEN THIS IS THE RIGHT COMPONENT, and it is a narrower case than it looks.
 * A folder says "filed material about X" — a case, a client, a season, a
 * sector. If the contents are not material that someone would plausibly FILE,
 * the metaphor is decoration and RailTabs says the same thing with less
 * drawing. Five aphorisms are not a filing cabinet.
 *
 * IT IS TABS UNDERNEATH, and that is deliberate. Visually it is a drawer;
 * semantically it is `tablist` / `tab` / `tabpanel`, so a screen reader
 * announces "tab 2 of 5" instead of describing furniture, and the arrow keys
 * work the way every other tab strip works. A metaphor is worth exactly
 * nothing to somebody who cannot see it.
 *
 * ONE PANEL, NOT A STACK OF OPEN ONES. A drawer where every folder is open at
 * once is a list, and a list should be written as a list. If several need to
 * be open together, that is RailDisclosure, once per section.
 *
 * The tab keeps its label visible while its folder is open — it is the spine
 * of the thing you are reading, and losing it is how people forget which
 * folder they opened.
 */
export default function RailFolder({
  folders,
  defaultId,
  tone = "drawer",
  source,
  onOpen,
  className,
}: RailFolderProps) {
  const uid = useId();
  const [open, setOpen] = useState(defaultId ?? folders[0]?.id);

  if (!folders.length) return null;
  const actual = folders.some((f) => f.id === open) ? open : folders[0].id;

  function abrir(id: string) {
    setOpen(id);
    onOpen?.({ source, id });
    /* THE STRIP SCROLLS SO YOU CAN SEE THE TAB YOU JUST OPENED. With more
       tabs than fit — five sectors on a 393px phone — the one you tapped is
       routinely half off the right edge, and then the drawer looks like it
       ignored you: the sheet changed but nothing appears selected.
       The STRIP is scrolled, not the document. `scrollIntoView` would scroll
       every ancestor, and on a long page that yanks the reader somewhere
       else to fix a 40px problem. */
    const tab = document.getElementById(`${uid}-t-${id}`);
    const tira = tab?.parentElement;
    if (!tira || !tab) return;
    /* Measured with rects, not `offsetLeft`. `offsetLeft` is relative to the
       nearest POSITIONED ancestor, so subtracting the strip's own offsetLeft
       only lines up when both hang off the same one — and when they do not,
       this silently does nothing. It did: the tab stayed half off the edge
       and the drawer still looked like it had ignored the tap. */
    const rt = tab.getBoundingClientRect();
    const rs = tira.getBoundingClientRect();
    if (rt.left < rs.left) tira.scrollLeft -= rs.left - rt.left + 10;
    else if (rt.right > rs.right) tira.scrollLeft += rt.right - rs.right + 10;
  }

  /* The arrow keys move between tabs, which is what a tab strip owes anyone
     who does not use a pointer. Home and End jump to the ends: with a drawer
     of twelve sectors, stepping through all of them to reach the last is the
     kind of small tax that makes a keyboard user stop using the component. */
  function teclas(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    const paso =
      e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : e.key === "Home" ? -i : e.key === "End" ? folders.length - 1 - i : 0;
    if (!paso) return;
    e.preventDefault();
    const n = Math.max(0, Math.min(folders.length - 1, i + paso));
    abrir(folders[n].id);
    const el = document.getElementById(`${uid}-t-${folders[n].id}`);
    el?.focus();
  }

  return (
    <div
      className={["rail-folder", className].filter(Boolean).join(" ")}
      data-rail-folder={source}
      data-rail-tone={tone}
    >
      <div className="rail-folder__tabs" role="tablist" aria-orientation="horizontal">
        {folders.map((f, i) => (
          <button
            key={f.id}
            id={`${uid}-t-${f.id}`}
            className="rail-folder__tab"
            style={{ "--rail-folder-i": i } as React.CSSProperties}
            role="tab"
            type="button"
            aria-selected={f.id === actual}
            aria-controls={`${uid}-p-${f.id}`}
            tabIndex={f.id === actual ? 0 : -1}
            onClick={() => abrir(f.id)}
            onKeyDown={(e) => teclas(e, i)}
          >
            <span className="rail-folder__label">{f.label}</span>
            {f.badge != null && <span className="rail-folder__badge">{f.badge}</span>}
          </button>
        ))}
      </div>

      {folders.map((f) => (
        <div
          key={f.id}
          id={`${uid}-p-${f.id}`}
          className="rail-folder__sheet"
          role="tabpanel"
          aria-labelledby={`${uid}-t-${f.id}`}
          hidden={f.id !== actual}
          tabIndex={0}
        >
          {f.children}
        </div>
      ))}
    </div>
  );
}
