"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { whatsappHref, type Locale } from "@/lib/packages";
import { REAL_ESTATE_PLAN_TERMS } from "@/lib/pricing";
import { realEstatePlanName, realEstatePlans, realEstatePlansCopy, realEstateTerms } from "@/lib/real-estate-plans";
import RailPrice from "@/vendor/rail-kit/RailPrice";
import RailSegmented from "@/vendor/rail-kit/RailSegmented";
import { site } from "@/lib/site";

export function RealEstatePlansSection({ locale }: { locale: Locale }) {
  const c = realEstatePlansCopy(locale);
  const plans = realEstatePlans();
  const [active, setActive] = useState<string>(plans[0].id);
  const es = locale === "es";
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(true), []);
  return (
    <section id={es ? "real-estate" : "real-estate-plans"} className="em-visual-plans" aria-labelledby="em-re-title" data-section="real_estate_plans">
      <Container size="xl">
        <p className="em-visual-eyebrow">{es ? "Para agentes inmobiliarios" : "For real estate agents"}</p>
        <h2 id="em-re-title" className="em-visual-heading">{es ? "Tu próxima propiedad, lista para mostrar." : "Your next listing, ready to show."}</h2>
        <p className="em-visual-intro">{c.lead}</p>
        <div className="em-plan-choice" hidden={!enhanced}>
          <p>{es ? "¿Cuántas propiedades al mes?" : "How many properties per month?"}</p>
          <RailSegmented segments={plans.map(p => ({ id: p.id, label: `${p.properties} · $${p.price.toLocaleString("en-US")}` }))}
            activeId={active} label={es ? "Propiedades y precio mensual" : "Properties and monthly price"}
            source="real-estate-plans" onSelect={({ id }) => setActive(id)} />
        </div>
        {plans.map(plan => {
          const name = realEstatePlanName(plan.id);
          return <article key={plan.id} hidden={enhanced && active !== plan.id} className="em-visual-plan" aria-label={name} data-plan={plan.id}>
            <div className="em-plan-art">
              <Image src="/illustrations/property.webp" alt={es ? "Ilustración conceptual de una casa, una cámara y fotografías de la propiedad" : "Concept illustration of a home, camera and property photographs"} width={1536} height={1024} sizes="(max-width: 850px) 90vw, 50vw" />
              <p>{es ? "Ilustración conceptual · media para propiedades" : "Concept illustration · property media"}</p>
            </div>
            <div className="em-plan-content">
              <div className="em-plan-name"><h3>{name}</h3><span>{plan.properties} {es ? (plan.properties === 1 ? "propiedad / mes" : "propiedades / mes") : (plan.properties === 1 ? "property / month" : "properties / month")}</span></div>
              <RailPrice now={plan.price.toLocaleString("en-US")} unit={c.perMonth} size="lg" source={`real_estate_plan_${plan.id}`} />
              <p className="em-plan-promise">{es ? "De la visita a la propiedad al contenido en tus redes." : "From the property shoot to your social feed."}</p>
              <dl className="em-plan-highlights">
                <div><dt>{c.rows.productionDays}</dt><dd>{plan.productionDays}</dd></div>
                <div><dt>{c.rows.posts}</dt><dd>{plan.postsPerWeek}</dd></div>
              </dl>
              <p className="em-plan-terms">{es
                ? `Mínimo de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses. Hasta 3,000 SF por propiedad. Aviso de ${REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} días para cancelar. Cargos por zona aparte.`
                : `${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum. Up to 3,000 SF per property. ${REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} days’ notice to cancel. Out-of-area fees extra.`}</p>
              <a href={whatsappHref(site.phone.e164, c.whatsapp(name))} className="em-plan-quote" target="_blank" rel="noopener noreferrer" data-cta={`real_estate_plan_${plan.id}_whatsapp`}>
                <MessageCircle size={18} aria-hidden="true" />{c.quote(name)}<ArrowRight size={18} aria-hidden="true" />
              </a>
              <details className="em-plan-details">
                <summary>{es ? "Ver todo lo incluido" : "See everything included"}</summary>
                <dl className="em-plan-full-rows">
                  <div><dt>{c.rows.properties}</dt><dd>{plan.properties}</dd></div>
                  <div><dt>{c.rows.drone}</dt><dd>{plan.drone === "included" ? c.values.included : c.values.addOn}</dd></div>
                  <div><dt>{c.rows.social}</dt><dd>{c.values.yes}</dd></div>
                  <div><dt>{c.rows.report}</dt><dd>{c.values.everyTwoWeeks}</dd></div>
                </dl>
                <h4>{c.everyPlan.title}</h4>
                <ul>{c.everyPlan.items.map(item => <li key={item}>{item}</li>)}</ul>
                <ul>{realEstateTerms(locale).map(line => <li key={line}>{line}</li>)}</ul>
              </details>
            </div>
          </article>;
        })}
        <Link href={es ? "/es/precios/inmobiliaria" : "/pricing/real-estate"} className="em-package-detail-link" data-cta="real_estate_plans_per_shoot">{c.perShoot}<ArrowRight className="size-4" aria-hidden="true" /></Link>
      </Container>
    </section>
  );
}
