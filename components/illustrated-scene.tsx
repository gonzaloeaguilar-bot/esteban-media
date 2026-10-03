"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, Clapperboard, Plus } from "lucide-react";
import RailDisclosure from "@/vendor/rail-kit/RailDisclosure";
import type { AudienceLocale } from "@/lib/audience-lanes";

/** Esteban's artwork composition, using the shared disclosure and tilt surface. */
export function IllustratedScene({ image, alt, kind = "photo", label, facts, source, locale }: {
  image: string; alt: string; kind?: "photo" | "edit" | "aerial";
  label: string; facts: string[]; source: string; locale: AudienceLocale;
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
    <RailDisclosure source={`illustration-${source}`} className="em-art-disclosure" summary={<>
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
        <span className="em-art-result-label">{locale === "es" ? "Tu contenido" : "Your content"}</span>
        <ul>{facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
      </div>
    </RailDisclosure>
  </div>;
}
