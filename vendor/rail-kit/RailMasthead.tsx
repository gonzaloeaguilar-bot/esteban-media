"use client";

import type { ReactNode } from "react";

export type RailMastheadProps = {
  /** Left of the rule. The department: "EL PERFIL", "La pasarela". */
  kicker: string;
  /**
   * Right of the rule, and it is a counterpoint, not a subtitle. A magazine
   * puts a second voice up there — "Más allá de una fotografía" — because two
   * lines saying the same thing is one line with extra steps.
   */
  counter?: string;
  /** The big one. An h2 by default: this is a section inside a page, not the page. */
  title: string;
  /**
   * The element behind the title. `h2` unless told otherwise, because a
   * masthead is normally a section header. Pass `h1` only when the masthead IS
   * the page title — a page whose first thing is this header, with no other
   * h1 — and `h3` when it heads a section nested inside another. Styling does
   * not change with the level.
   */
  titleAs?: "h1" | "h2" | "h3";
  /** One sentence under the title. Two is an introduction, and nobody reads those. */
  lede?: ReactNode;
  /**
   * The rail arrows, when a rail follows. They sit on the title line because
   * that is the only line wide enough to put them on without stealing from
   * the content.
   */
  controls?: ReactNode;
  source: string;
  className?: string;
};

/**
 * The editorial section header — a rule, a department, a counterpoint, a title.
 *
 * NOT RailPageHeader. That one is the top of a screen: an h1, a way back, the
 * actions for the whole page. This is the top of a SECTION inside a page, and
 * a page full of h1s is a page a screen reader cannot give shape to.
 *
 * THE RULE IS ABOVE, NOT BELOW. A line under a heading closes it; a line above
 * it opens a section. That is the whole difference between a magazine spread
 * and a settings screen, and it is one border declaration.
 *
 * THE COUNTER IS NOT A SUBTITLE. It is the second voice on the top line, and
 * it wraps to its own line before it squeezes the department — on a phone the
 * department is the thing that says where you are.
 */
export default function RailMasthead({
  kicker,
  counter,
  title,
  titleAs = "h2",
  lede,
  controls,
  source,
  className,
}: RailMastheadProps) {
  const Titulo = titleAs;
  return (
    <header
      className={["rail-masthead", className].filter(Boolean).join(" ")}
      data-rail-masthead={source}
    >
      <p className="rail-masthead__top">
        <span className="rail-masthead__kicker">{kicker}</span>
        {counter && <span className="rail-masthead__counter">{counter}</span>}
      </p>
      <div className="rail-masthead__title">
        <Titulo>{title}</Titulo>
        {controls && <div className="rail-masthead__controls">{controls}</div>}
      </div>
      {lede && <p className="rail-masthead__lede">{lede}</p>}
    </header>
  );
}
