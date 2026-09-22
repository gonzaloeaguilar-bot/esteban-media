"use client";

import type { ReactNode } from "react";

export type RailStatusChipProps = {
  /** What the thing is called — a device, an environment, a branch. */
  label: string;
  /** A mark before the label: a laptop, a server, a globe. Decorative. */
  glyph?: ReactNode;
  /**
   * The state, in words. Required whenever a dot is shown.
   *
   * The dot is colour and shape and nothing else: it does not exist for a
   * screen reader and it is ambiguous to anyone who cannot separate green from
   * grey. If the chip is worth showing a state on, the state is worth a word.
   */
  status?: string;
  /**
   * Which state, for colour. The brand owns what each one looks like via
   * `--rail-statuschip-dot-<tone>`.
   */
  tone?: "ok" | "busy" | "warn" | "off";
  /** Shown as text next to the dot instead of only to a screen reader. */
  showStatus?: boolean;
  href?: string;
  source: string;
  onSelect?: (info: { source: string; label: string }) => void;
  className?: string;
};

/**
 * One named thing and whether it is up: a device, a connection, an
 * environment.
 *
 * A pill rather than a row because it is a fact, not a destination — several
 * fit on a line and none of them is the page's subject.
 */
export default function RailStatusChip({
  label,
  glyph,
  status,
  tone = "ok",
  showStatus = false,
  href,
  source,
  onSelect,
  className,
}: RailStatusChipProps) {
  const cls = ["rail-statuschip", `rail-statuschip--${tone}`, className]
    .filter(Boolean)
    .join(" ");

  // Rama literal, no una etiqueta en variable. El componente se comporta igual
  // de las dos formas, pero `<Tag>` esconde el ancla de cualquier comprobador
  // que lea el fuente — y self-audit marcaba BLOCK en teclado por eso.
  const body = (
    <>
      {glyph && (
        <span className="rail-statuschip__glyph" aria-hidden="true">
          {glyph}
        </span>
      )}
      {status && (
        <>
          <span className="rail-statuschip__dot" aria-hidden="true" />
          <span className={showStatus ? "rail-statuschip__status" : "rail-sr-only"}>
            {status}
          </span>
        </>
      )}
      <span className="rail-statuschip__label">{label}</span>
    </>
  );

  return href ? (
    <a className={cls} data-rail-statuschip={source} href={href} onClick={() => onSelect?.({ source, label })}>
      {body}
    </a>
  ) : (
    <span className={cls} data-rail-statuschip={source}>
      {body}
    </span>
  );
}
