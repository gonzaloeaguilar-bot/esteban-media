import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { whatsappHref, type Locale } from "@/lib/packages";
import type { RealEstatePlan } from "@/lib/pricing";
import {
  realEstatePlanName,
  realEstatePlans,
  realEstatePlansCopy,
  realEstateTerms,
} from "@/lib/real-estate-plans";
import RailPrice from "@/vendor/rail-kit/RailPrice";
import { site } from "@/lib/site";

const PER_SHOOT_PATH: Record<Locale, string> = {
  en: "/pricing/real-estate",
  es: "/es/precios/inmobiliaria",
};

function droneValue(plan: RealEstatePlan, c: ReturnType<typeof realEstatePlansCopy>) {
  return plan.drone === "included" ? c.values.included : c.values.addOn;
}

/**
 * The real estate monthly plans, as their own section under the four packages.
 *
 * It is a separate section on purpose: the four packages answer "what do you
 * need", and real estate is a different buyer (an agent with listings) with a
 * plan sized by how many properties they have. Every figure is read from
 * lib/pricing.ts; the words live in lib/real-estate-plans.ts.
 */
export function RealEstatePlansSection({ locale }: { locale: Locale }) {
  const c = realEstatePlansCopy(locale);
  const plans = realEstatePlans();

  return (
    <section
      id={locale === "es" ? "real-estate" : "real-estate-plans"}
      className="em-pk-guide em-re"
      aria-labelledby="em-re-title"
      data-section="real_estate_plans"
    >
      <Container size="xl">
        <p className="em-pk-eyebrow">{c.eyebrow}</p>
        <h2 id="em-re-title" className="em-pk-title">
          {c.title}
        </h2>
        <p className="em-pk-lead">{c.lead}</p>

        <ol className="em-re-plans" role="list">
          {plans.map((plan, i) => {
            const name = realEstatePlanName(plan.id);
            return (
              <li key={plan.id} className="em-pk-card em-re-card" data-em-reveal>
                <h3 className="em-re-card__head">
                  <span className="em-pkcard__number">{String(i + 1).padStart(2, "0")}</span>
                  <span className="em-pkcard__word">Plan</span>
                  <span className="em-pkcard__name">{name}</span>
                </h3>

                <div className="em-re-card__body">
                  <div className="em-pkcard__price">
                    <RailPrice
                      now={plan.price.toLocaleString("en-US")}
                      size="lg"
                      source={`real_estate_plan_${plan.id}`}
                    />
                    <span className="em-pkcard__unit">{c.perMonth}</span>
                  </div>

                  <dl className="em-re-rows">
                    <div>
                      <dt>{c.rows.properties}</dt>
                      <dd>{plan.properties}</dd>
                    </div>
                    <div>
                      <dt>{c.rows.productionDays}</dt>
                      <dd>{plan.productionDays}</dd>
                    </div>
                    <div>
                      <dt>{c.rows.drone}</dt>
                      <dd>{droneValue(plan, c)}</dd>
                    </div>
                    <div>
                      <dt>{c.rows.social}</dt>
                      <dd>{c.values.yes}</dd>
                    </div>
                    <div>
                      <dt>{c.rows.posts}</dt>
                      <dd>{plan.postsPerWeek}</dd>
                    </div>
                    <div>
                      <dt>{c.rows.report}</dt>
                      <dd>{c.values.everyTwoWeeks}</dd>
                    </div>
                  </dl>

                  <a
                    href={whatsappHref(site.phone.e164, c.whatsapp(name))}
                    className="em-pkcard__cta"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta={`real_estate_plan_${plan.id}_whatsapp`}
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    {c.quote(name)}
                  </a>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="em-re-every">
          <h3 className="em-re-every__title">{c.everyPlan.title}</h3>
          <ul role="list">
            {c.everyPlan.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <ul className="em-re-terms" role="list">
          {realEstateTerms(locale).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <Link
          href={PER_SHOOT_PATH[locale]}
          className="em-package-detail-link"
          data-cta="real_estate_plans_per_shoot"
        >
          {c.perShoot}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Container>
    </section>
  );
}
