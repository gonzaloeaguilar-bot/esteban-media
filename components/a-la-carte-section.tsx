"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Plus } from "lucide-react";
import RailDisclosure from "@/vendor/rail-kit/RailDisclosure";
import { Container } from "@/components/ui/container";
import { packagesCopy, type Locale } from "@/lib/packages";
import { aLaCarteVisual } from "@/lib/a-la-carte-visuals";

/** Brand-specific art direction over the pinned shared disclosure behavior. */
export function ALaCarteSection({ locale }: { locale: Locale }) {
  const copy = packagesCopy(locale).aLaCarte;
  const root = useRef<HTMLElement>(null);
  const es = locale === "es";
  useEffect(() => {
    const cards = root.current?.querySelectorAll<HTMLElement>(".em-carte-card");
    if (!cards) return;
    // Attach to the actual shared control so delegated site tracking sees the tap.
    cards.forEach(card => {
      const button = card.querySelector("button");
      if (button) {
        button.dataset.cta = `a_la_carte_preview_${card.dataset.service}`;
        button.setAttribute("aria-labelledby", `carte-${card.dataset.service}-title carte-${card.dataset.service}-hint`);
      }
    });
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.arrived = "true";
        observer.unobserve(entry.target); // One brief arrival, never an endless loop.
      }
    }), { threshold: .25 });
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return <section ref={root} id={es ? "a-la-carta" : "a-la-carte"} className="em-carte" aria-labelledby="em-pk-carte-title" data-section="a_la_carte">
    <Container size="xl">
      <div className="em-carte-intro">
        <p className="em-pk-eyebrow">{copy.eyebrow}</p>
        <h2 id="em-pk-carte-title" className="em-pk-title">{copy.title}</h2>
        <p className="em-pk-lead">{copy.lead} {es ? "Toca una ilustración para saber qué enviarme." : "Tap an illustration to see what to send me."}</p>
      </div>
      <ul className="em-carte-grid" role="list">
        {copy.items.map(item => {
          const scene = aLaCarteVisual(item.id, locale);
          const href = item.href ?? (es ? "/es/contacto" : "/contact");
          return <li key={item.id} className="em-carte-card" data-service={item.id} data-kind={scene.kind}>
            <h3 id={`carte-${item.id}-title`} className="sr-only">{item.title}</h3>
            <RailDisclosure source={`carte-${item.id}`} className="em-carte-disclosure" summary={<>
              <span className="em-carte-art" aria-hidden="true">
                <Image src={scene.image} alt="" width={1536} height={1024} sizes="(min-width: 1024px) 400px, (min-width: 600px) 50vw, 44vw" />
                <span className="em-carte-effect"><i /><i /><i /></span>
              </span>
              <span className="em-carte-copy">
                <span className="em-carte-title">{item.title}</span>
                {item.note && <span className="em-carte-note">{item.note}</span>}
                <span className="em-carte-hint" id={`carte-${item.id}-hint`}><span>{es ? "Qué enviarme" : "What to send"}</span><Plus size={17} aria-hidden="true" /></span>
              </span>
            </>}>
              <div className="em-carte-preparation"><p>{scene.preparation}</p></div>
            </RailDisclosure>
            <Link href={href} className="em-carte-link" data-cta={`a_la_carte_${item.id}`} aria-label={`${item.href ? (es ? "Ver servicio" : "Explore service") : (es ? "Consultar proyecto" : "Ask about a project")}: ${item.title}`}>
              {item.href ? (es ? "Ver servicio" : "Explore service") : (es ? "Consultar proyecto" : "Ask about a project")}<ArrowRight size={18} aria-hidden="true" />
            </Link>
          </li>;
        })}
      </ul>
      <p className="em-carte-credit">{es ? "Ilustraciones conceptuales creadas con IA." : "Concept illustrations created with AI."} <time dateTime="2026-10-03">{es ? "Actualizado: 3 de octubre de 2026." : "Updated October 3, 2026."}</time></p>
    </Container>
    <noscript><style>{`@layer base{.em-carte .rail-disclosure__panel[hidden]{display:block!important}}.em-carte-hint{display:none!important}.em-carte .rail-disclosure__toggle{pointer-events:none;cursor:default}`}</style></noscript>
  </section>;
}
