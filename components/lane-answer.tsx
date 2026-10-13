"use client";

import { Camera, Plus } from "lucide-react";
import RailDisclosure from "@/vendor/rail-kit/RailDisclosure";
import type { AudienceLocale } from "@/lib/audience-lanes";

/**
 * The business lane shows a video instead of IllustratedScene's artwork, so
 * it had NO price/TLDR disclosure at all. This is the same `+` answer
 * (price first, then the TLDR facts, then a demoted "full details" link)
 * as `IllustratedScene`, split out so both can use it without duplicating
 * the markup or the filmed-motion CSS hooks.
 *
 * Open by default (review item 6, 2026-10-13): placed inside the card's
 * right-hand info column at desktop, next to the filled CTA, this answer
 * fills the column instead of leaving the 395px of empty cream a CLOSED
 * accordion left below the button. The price/TLDR was always in the
 * server-rendered HTML either way — `defaultOpen` only changes the initial
 * `hidden` attribute, never what AI crawlers or curl can read.
 */
export function LaneAnswer({
  source,
  locale,
  label,
  price,
  facts,
  detailsHref,
  detailsLabel,
}: {
  source: string;
  locale: AudienceLocale;
  label: string;
  price: string;
  facts: string[];
  detailsHref: string;
  detailsLabel?: string;
}) {
  return (
    <RailDisclosure
      source={`lane-answer-${source}`}
      className="em-art-disclosure em-lane-answer"
      defaultOpen
      summary={
        <span className="em-art-invitation">
          {/* The other two lanes carry a Camera/Clapperboard icon in this
              same row (components/illustrated-scene.tsx) — this lane had
              none, so its summary row was visibly shorter and the three
              panels never matched height (review item 5). */}
          <Camera size={17} aria-hidden="true" />
          <span>{label}</span>
          <Plus size={18} aria-hidden="true" className="em-art-plus" />
        </span>
      }
    >
      <div className="em-art-result">
        <span className="em-art-price">
          <span className="em-art-price-label">{locale === "es" ? "Precio de referencia" : "Starting price"}</span>
          <span className="em-art-price-num">{price}</span>
        </span>
        <span className="em-art-result-label">{locale === "es" ? "Tu contenido" : "Your content"}</span>
        <ul>
          {facts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <a href={detailsHref} className="em-art-details-link" data-cta={`lane_answer_${source}_details`}>
          {detailsLabel ?? (locale === "es" ? "Ver los detalles completos" : "Read the full details")}
        </a>
      </div>
    </RailDisclosure>
  );
}
