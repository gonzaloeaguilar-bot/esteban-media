import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CinemaHeroMotion } from "@/components/cinema-hero-motion";

/**
 * The pricing hub needs the same first-screen clarity as the guides, but its
 * job is to start a buying decision. This keeps the home's real on-set media
 * while making the next two actions explicit: see prices or estimate a job.
 */
export function PricingCinematicHero({ locale }: { locale: "en" | "es" }) {
  const es = locale === "es";
  const targetId = `pricing-hero-${locale}`;

  return (
    <section id={targetId} className="em-cine em-cine--pricing" aria-labelledby="pricing-hero-heading" data-section="pricing-cinematic-hero">
      <div className="em-cine__stage">
        <div className="em-cine__frame">
          <Image
            src="/about/esteban-on-set-frame.jpg"
            alt={es ? "Esteban Moreno revisando una toma durante una producción" : "Esteban Moreno checking a shot during a production"}
            fill
            priority
            sizes="100vw"
            className="em-cine__poster"
          />
          <video className="em-cine__video" autoPlay muted loop playsInline preload="metadata" poster="/about/esteban-on-set-frame.jpg" aria-hidden="true" tabIndex={-1}>
            <source src="/about/esteban-on-set.mp4" type="video/mp4" />
          </video>
          <div className="em-cine__hud" aria-hidden="true">
            <span className="em-cine__corner em-cine__corner--tl" /><span className="em-cine__corner em-cine__corner--tr" />
            <span className="em-cine__corner em-cine__corner--bl" /><span className="em-cine__corner em-cine__corner--br" />
            <span className="em-cine__rec"><span className="em-cine__rec-dot" />REC</span>
            <CinemaHeroMotion targetId={targetId} />
          </div>
        </div>
        <span className="em-cine__bar em-cine__bar--top" aria-hidden="true" /><span className="em-cine__bar em-cine__bar--bottom" aria-hidden="true" />
        <div className="em-cine__credit">
          <p className="em-cine__eyebrow">Esteban Moreno Media · {es ? "Precios" : "Pricing"}</p>
          <h1 id="pricing-hero-heading" className="em-cine__title em-cine__title--guide">
            <span className="em-cine__guide-title">{es ? "Encuentra el formato y el precio que necesitas." : "Find the format and price you need."}</span>
          </h1>
          <p className="em-cine__answer">
            {es ? "Edición remota, producción en tu negocio y planes mensuales con precios de partida claros." : "Remote editing, production at your business, and monthly plans with clear starting prices."}
          </p>
          <div className="em-cine__actions" data-section="pricing-hero">
            <Link href="#packages" data-cta="pricing_hero_view_packages" className="em-cine__cta em-cine__cta--primary">
              {es ? "Ver precios de partida" : "See starting prices"}<ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href={es ? "/es/calculadora" : "/calculator"} data-cta="pricing_hero_calculator" className="em-cine__cta em-cine__cta--ghost">
              {es ? "Calcular mi proyecto" : "Estimate my project"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
