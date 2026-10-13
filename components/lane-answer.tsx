"use client";

import { Plus } from "lucide-react";
import RailDisclosure from "@/vendor/rail-kit/RailDisclosure";
import type { AudienceLocale } from "@/lib/audience-lanes";

/**
 * The business lane shows a video instead of IllustratedScene's artwork, so
 * it had NO price/TLDR disclosure at all. This is the same `+` answer
 * (price first, then the TLDR facts, then a demoted "full details" link)
 * as `IllustratedScene`, split out so both can use it without duplicating
 * the markup or the filmed-motion CSS hooks.
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
      summary={
        <span className="em-art-invitation">
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
