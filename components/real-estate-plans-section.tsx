"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, House, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { whatsappHref, type Locale } from "@/lib/packages";
import { REAL_ESTATE_PLAN_TERMS } from "@/lib/pricing";
import { realEstatePlanName, realEstatePlans, realEstatePlansCopy, realEstateTerms } from "@/lib/real-estate-plans";
import RailPrice from "@/vendor/rail-kit/RailPrice";
import RailSegmented from "@/vendor/rail-kit/RailSegmented";
import { site } from "@/lib/site";
import { REAL_ESTATE_PLAN_VISUALS } from "@/lib/real-estate-plan-visuals";
import { IllustratedScene } from "@/components/illustrated-scene";

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
        <p className="em-property-category"><House size={20} aria-hidden="true" />{es ? "Solo para bienes raíces" : "Real estate only"}</p>
        <h2 id="em-re-title" className="em-visual-heading">{es ? "Planes mensuales de bienes raíces." : "Monthly real estate plans."}</h2>
        <p className="em-visual-intro">{es ? "Para agentes e inmobiliarias: fotografía de propiedades y contenido para Instagram y TikTok." : "For agents and brokerages: property photography and content for Instagram and TikTok."}</p>
        <div className="em-plan-choice" hidden={!enhanced}>
          <p>{es ? "¿Cuántas propiedades al mes?" : "How many properties per month?"}</p>
          <RailSegmented segments={plans.map(p => ({ id: p.id, label: `${realEstatePlanName(p.id)}\n${p.properties} ${es ? (p.properties === 1 ? "propiedad" : "propiedades") : (p.properties === 1 ? "property" : "properties")}` }))}
            activeId={active} label={es ? "Plan y propiedades al mes" : "Plan and properties per month"}
            source="real-estate-plans" onSelect={({ id }) => setActive(id)} />
        </div>
        {plans.map(plan => {
          const name = realEstatePlanName(plan.id);
          const visual = REAL_ESTATE_PLAN_VISUALS[plan.id];
          return <article key={plan.id} hidden={enhanced && active !== plan.id} className="em-visual-plan" aria-label={name} data-plan={plan.id}>
            <div className="em-plan-art">
              <IllustratedScene image={visual.image} alt={visual[locale].alt} kind={plan.drone === "included" ? "aerial" : "photo"} locale={locale} source={`plan-${plan.id}`}
                label={es ? `Explora ${name}` : `Explore ${name}`}
                facts={[
                  `${plan.properties} ${es ? (plan.properties === 1 ? "propiedad al mes" : "propiedades al mes") : (plan.properties === 1 ? "property per month" : "properties per month")}`,
                  `${plan.postsPerWeek} ${es ? "posts o Reels por semana" : "posts or Reels per week"}`,
                  `${c.rows.drone}: ${plan.drone === "included" ? c.values.included : c.values.addOn}`,
                ]} />
              <p>{es ? "Ilustración conceptual · media para propiedades" : "Concept illustration · property media"}</p>
            </div>
            <div className="em-plan-overview">
              <div className="em-plan-name"><h3>{name}</h3><span>{plan.properties} {es ? (plan.properties === 1 ? "propiedad / mes" : "propiedades / mes") : (plan.properties === 1 ? "property / month" : "properties / month")}</span></div>
              <RailPrice now={plan.price.toLocaleString("en-US")} unit={c.perMonth} size="lg" source={`real_estate_plan_${plan.id}`} />
              <p className="em-plan-promise">{visual[locale].line}</p>
            </div>
            <div className="em-plan-content">
              <dl className="em-plan-highlights">
                <div><dt>{c.rows.productionDays}</dt><dd>{plan.productionDays}</dd></div>
                <div><dt>{c.rows.posts}</dt><dd>{plan.postsPerWeek}</dd></div>
              </dl>
              <p className="em-plan-drone">{c.rows.drone}: <strong>{plan.drone === "included" ? c.values.included : c.values.addOn}</strong></p>
              <p className="em-plan-terms">{es
                ? `Mínimo de ${REAL_ESTATE_PLAN_TERMS.minimumMonths} meses. Hasta 3,000 SF por propiedad. Aviso de ${REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} días para cancelar. Cargos por zona aparte.`
                : `${REAL_ESTATE_PLAN_TERMS.minimumMonths}-month minimum. Up to 3,000 SF per property. ${REAL_ESTATE_PLAN_TERMS.cancelNoticeDays} days’ notice to cancel. Out-of-area fees extra.`}</p>
              <a href={whatsappHref(site.phone.e164, c.whatsapp(name))} className="em-plan-quote" target="_blank" rel="noopener noreferrer" data-cta={`real_estate_plan_${plan.id}_whatsapp`}>
                <MessageCircle size={18} aria-hidden="true" />{c.quote(name)}<ArrowRight size={18} aria-hidden="true" />
              </a>
              <details className="em-plan-details">
                <summary>{es ? "Ver todo lo incluido" : "See everything included"}</summary>
                <p>{c.lead}</p>
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
