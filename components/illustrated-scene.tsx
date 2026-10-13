"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, Clapperboard, Plus } from "lucide-react";
import RailDisclosure from "@/vendor/rail-kit/RailDisclosure";
import type { AudienceLocale } from "@/lib/audience-lanes";

/** Esteban's artwork composition, using the shared disclosure and tilt surface. */
export function IllustratedScene({
  image,
  alt,
  kind = "photo",
  label,
  facts,
  source,
  locale,
  price,
  detailsHref,
  detailsLabel,
}: {
  image: string; alt: string; kind?: "photo" | "edit" | "aerial";
  label: string; facts: string[]; source: string; locale: AudienceLocale;
  /**
   * The starting price for THIS lane, already formatted ("From $450/mo"),
   * read by the caller from lib/pricing.ts / lib/packages.ts. Optional so
   * every other IllustratedScene consumer (à la carte, service pages) keeps
   * working unchanged.
   */
  price?: string;
  /**
   * Owner, 2026-10-12: "i also wish i would right there tell me prices and
   * tldr vs going into another page for more info cause that other page is
   * so much text." The disclosure now answers price + what-you-get in
   * place; the full service/guide page becomes an optional link UNDER that
   * answer, not the only way to learn anything.
   */
  detailsHref?: string;
  detailsLabel?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const button = element.querySelector("button");
    if (button) button.dataset.cta = `illustration_${source}`;
    const observer = new IntersectionObserver(entries => {
      element.dataset.visible = String(entries.some(entry => entry.isIntersecting));
    }, { threshold: .15 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [source]);

  return <div ref={root} className="em-illustration" data-kind={kind} data-rail-tilt-scene="" data-cta={`illustration_${source}`}>
    {/* defaultOpen, same as LaneAnswer (components/lane-answer.tsx): the
        price/TLDR answer must be visible on arrival with zero interaction.
        Without it, RailDisclosure's useState(Boolean(defaultOpen)) starts
        closed, so the real-estate and editing lanes' prices sat behind a
        collapsed accordion while only the business lane (LaneAnswer) was
        open -- the headline bug, measured on the real-estate lane which
        loads active by default. */}
    <RailDisclosure source={`illustration-${source}`} className="em-art-disclosure" defaultOpen summary={<>
      <span className="em-art-scene">
        <span className="em-art-depth" data-rail-tilt="">
          <Image src={image} alt={alt} width={1536} height={1024} sizes="(max-width: 850px) 90vw, 50vw" />
          <span className="em-art-viewfinder" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="em-art-record" aria-hidden="true" />
          <span className="em-art-film" aria-hidden="true"><i /><i /><i /><b /></span>
          {kind === "aerial" && <svg className="em-art-flight" viewBox="0 0 600 400" aria-hidden="true"><path d="M65 285 Q90 85 280 175 T540 115" /></svg>}
        </span>
      </span>
      <span className="em-art-invitation">
        {kind === "edit" ? <Clapperboard size={17} aria-hidden="true" /> : <Camera size={17} aria-hidden="true" />}
        <span>{label}</span><Plus size={18} aria-hidden="true" className="em-art-plus" />
      </span>
    </>}>
      <div className="em-art-result">
        {price && (
          <span className="em-art-price">
            <span className="em-art-price-label">{locale === "es" ? "Precio de referencia" : "Starting price"}</span>
            <span className="em-art-price-num">{price}</span>
          </span>
        )}
        <span className="em-art-result-label">{locale === "es" ? "Tu contenido" : "Your content"}</span>
        <ul>{facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
        {detailsHref && (
          <a href={detailsHref} className="em-art-details-link" data-cta={`illustration_${source}_details`}>
            {detailsLabel ?? (locale === "es" ? "Ver los detalles completos" : "Read the full details")}
          </a>
        )}
      </div>
    </RailDisclosure>
  </div>;
}
