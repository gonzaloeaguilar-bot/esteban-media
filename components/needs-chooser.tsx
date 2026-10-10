"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, Plus } from "lucide-react";

import { Container } from "@/components/ui/container";
import { arranqueWeeklyComparisonLine, arranqueWeeklyHref, arranqueWeeklyWhatsapp } from "@/lib/arranque-weekly";
import { chooserCopy, doorAnchor, doorsFor, realEstateChips, weeklyChips, type DoorId } from "@/lib/needs-doors";
import { packageAnchor, packagesCopy, packagesFor, priceFor, whatsappHref, type Locale } from "@/lib/packages";
import { packageRoutes } from "@/lib/package-routes";
import { ARRANQUE_WEEKLY_OPTIONS, REAL_ESTATE_PLAN_TERMS, usd, type PackageId } from "@/lib/pricing";
import { REAL_ESTATE_PLAN_VISUALS } from "@/lib/real-estate-plan-visuals";
import { realEstatePlanName, realEstatePlans, realEstatePlansCopy, realEstateTerms } from "@/lib/real-estate-plans";
import { site } from "@/lib/site";

/**
 * One question, four doors. Owner direction 2026-10-08: real estate is the
 * first, highlighted door (it is the work Esteban most likes), and the other
 * three keep the site open to businesses, people starting on social, and
 * people who only need editing.
 *
 * Every door's price is in the server HTML from the first byte; a closed door
 * only hides it visually. Collapsed is not removed — AI crawlers run no JS.
 */
export function NeedsChooser({ locale }: { locale: Locale }) {
  const c = chooserCopy(locale);
  const doors = doorsFor(locale);
  const [open, setOpen] = useState<DoorId | null>(null);

  const reveal = (id: DoorId) => {
    window.requestAnimationFrame(() => {
      // Measure the door's face, not the <li>: on wide screens the <li> is
      // display:contents and has no box of its own.
      const el = document.getElementById(doorAnchor(id))?.querySelector(".em-nd-door__face");
      if (!el) return;
      const header = document.querySelector("header");
      const top = window.scrollY + el.getBoundingClientRect().top - (header?.getBoundingClientRect().height ?? 64) - 12;
      const reduced = !document.documentElement.classList.contains("rail-anim");
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    });
  };

  const choose = (id: DoorId) => {
    const next = open === id ? null : id;
    setOpen(next);
    if (next) reveal(next);
  };

  // An old link such as /pricing#paquete-arranque or #real-estate-plans still
  // lands: the id lives on the card inside a door, so open that door.
  useEffect(() => {
    const land = () => {
      const target = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
      const door = target?.closest<HTMLElement>("[data-door]")?.dataset.door as DoorId | undefined;
      if (!door) return;
      setOpen(door);
      window.requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));
    };
    land();
    window.addEventListener("hashchange", land);
    return () => window.removeEventListener("hashchange", land);
  }, []);

  return (
    <section
      // #paquetes / #packages: the hero's primary call to action points here.
      id={locale === "es" ? "paquetes" : "packages"}
      className="em-nd"
      aria-labelledby="em-nd-title"
      data-section="packages"
    >
      <Container size="xl">
        <p className="em-nd__eyebrow">{c.eyebrow}</p>
        <h2 id="em-nd-title" className="em-nd__title">
          {c.title}
        </h2>
        <p className="em-nd__lead">{c.lead}</p>

        <ol className="em-nd-doors" role="list" data-open={open ?? "none"}>
          {doors.map((door, index) => {
            const isOpen = open === door.id;
            const anchor = doorAnchor(door.id);
            return (
              <li
                key={door.id}
                id={anchor}
                className="em-nd-door"
                data-door={door.id}
                data-state={isOpen ? "open" : "closed"}
                data-specialty={index === 0 ? "true" : undefined}
              >
                <h3 className="em-nd-door__h">
                  <button
                    type="button"
                    className="em-nd-door__face"
                    aria-expanded={isOpen}
                    aria-controls={`${anchor}-panel`}
                    aria-label={`${door.title}, ${c.from} ${usd(door.from.amount)} ${door.from.unit.replace("/ ", "")}`}
                    onClick={() => choose(door.id)}
                    data-cta={`door_open_${door.id}`}
                  >
                    <span className="em-nd-door__art">
                      <Image
                        src={door.image.src}
                        alt=""
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 300px, 40vw"
                      />
                    </span>
                    <span className="em-nd-door__text">
                      {index === 0 && <span className="em-nd-door__tag">{c.specialty}</span>}
                      <span className="em-nd-door__title">{door.title}</span>
                      <span className="em-nd-door__line">{door.line}</span>
                      <span className="em-nd-door__price">
                        <span className="em-nd-door__from">{c.from}</span>
                        <span className="em-nd-door__num">{usd(door.from.amount)}</span>
                        <span className="em-nd-door__unit">{door.from.unit}</span>
                      </span>
                    </span>
                    <span className="em-nd-door__toggle" aria-hidden="true">
                      <Plus className="size-5" />
                    </span>
                  </button>
                </h3>

                <div className="em-nd-panel" id={`${anchor}-panel`} role="region" aria-label={door.title}>
                  {door.id === "real-estate" && <RealEstatePanel locale={locale} />}
                  {door.id === "business" && <BusinessPanel locale={locale} />}
                  {door.id === "start-social" && <WeeklyPanel locale={locale} />}
                  {door.id === "editing" && (
                    <EditingPanel
                      locale={locale}
                      onWeekly={() => {
                        setOpen("start-social");
                        reveal("start-social");
                      }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/** The proposal's price line: a big serif number, the unit small beside it. */
function Price({ amount, unit, custom }: { amount?: number; unit?: string; custom?: string }) {
  return (
    <p className="em-nd-plan__price">
      {custom ? (
        <span className="em-nd-plan__num em-nd-plan__num--custom">{custom}</span>
      ) : (
        <>
          <span className="em-nd-plan__num">{usd(amount ?? 0)}</span>
          <span className="em-nd-plan__unit">{unit}</span>
        </>
      )}
    </p>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="em-nd-plan__chips" role="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Whatsapp({ text, label, cta }: { text: string; label: string; cta: string }) {
  return (
    <a
      href={whatsappHref(site.phone.e164, text)}
      className="em-nd-plan__cta"
      target="_blank"
      rel="noopener noreferrer"
      data-cta={cta}
    >
      <MessageCircle className="size-4" aria-hidden="true" />
      {label}
    </a>
  );
}

function RealEstatePanel({ locale }: { locale: Locale }) {
  const c = chooserCopy(locale);
  const re = realEstatePlansCopy(locale);
  const es = locale === "es";
  return (
    // The old section ids live here, so links to #real-estate-plans still land.
    <div id={es ? "real-estate" : "real-estate-plans"} data-section="real_estate_plans">
      <div className="em-nd-plans em-nd-plans--three">
        {realEstatePlans().map((plan) => {
          const name = realEstatePlanName(plan.id);
          const visual = REAL_ESTATE_PLAN_VISUALS[plan.id];
          return (
            <article key={plan.id} className="em-nd-plan em-nd-plan--art" data-plan={plan.id} aria-label={name}>
              <span className="em-nd-plan__art">
                <Image src={visual.image} alt={visual[locale].alt} fill sizes="(min-width: 1024px) 360px, 92vw" />
              </span>
              <div className="em-nd-plan__body">
                <h4 className="em-nd-plan__name">{name}</h4>
                <Price amount={plan.price} unit={c.realEstate.perMonth} />
                <Chips items={realEstateChips(plan, locale)} />
                <Whatsapp text={re.whatsapp(name)} label={c.quote} cta={`real_estate_plan_${plan.id}_whatsapp`} />
              </div>
            </article>
          );
        })}
      </div>
      <p className="em-nd-panel__fine">
        {c.realEstate.terms(REAL_ESTATE_PLAN_TERMS.minimumMonths, REAL_ESTATE_PLAN_TERMS.cancelNoticeDays)}
      </p>
      <details className="em-nd-panel__more">
        <summary>{c.realEstate.everything}</summary>
        <ul>
          {[...re.everyPlan.items, ...realEstateTerms(locale)].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </details>
      <Link
        href={es ? "/es/precios/inmobiliaria" : "/pricing/real-estate"}
        className="em-nd-panel__link"
        data-cta="real_estate_plans_per_shoot"
      >
        {c.realEstate.more}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

function BusinessPanel({ locale }: { locale: Locale }) {
  const c = chooserCopy(locale);
  const units = packagesCopy(locale).price.units;
  const ids: Array<"crecimiento" | "presencia-local" | "todo-incluido"> = ["crecimiento", "presencia-local", "todo-incluido"];
  return (
    <div className="em-nd-plans em-nd-plans--three">
      {ids.map((id) => {
        const price = priceFor(id);
        const name = packagesFor(locale).find((p) => p.id === id)?.name ?? id;
        return (
          <article key={id} id={packageAnchor(id)} className="em-nd-plan" data-plan={id} aria-label={name}>
            <div className="em-nd-plan__body">
              <h4 className="em-nd-plan__name">{name}</h4>
              <p className="em-nd-plan__line">{c.business.lines[id]}</p>
              {price.kind === "from" ? (
                <Price amount={price.amount} unit={`/ ${units[price.unit].replace(/^(al|por|per) /, "")}`} />
              ) : (
                <Price custom={c.business.custom} />
              )}
              <Chips items={c.business.chips[id]} />
              <Whatsapp text={quoteText(locale, name)} label={c.quote} cta={`package_${id}_whatsapp`} />
              <DetailsLink locale={locale} id={id} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function WeeklyPanel({ locale }: { locale: Locale }) {
  const c = chooserCopy(locale);
  return (
    <div>
      <div className="em-nd-plans em-nd-plans--two">
        {ARRANQUE_WEEKLY_OPTIONS.map((opt, i) => (
          <article key={opt.id} className="em-nd-plan" data-plan={opt.id} aria-label={c.weekly.videos(opt.videosPerWeek)}>
            <div className="em-nd-plan__body">
              <h4 className="em-nd-plan__name">{c.weekly.videos(opt.videosPerWeek)}</h4>
              <Price amount={opt.pricePerWeek} unit={c.weekly.perWeek} />
              <p className="em-nd-plan__pill">{c.weekly.paidWeekly}</p>
              <Chips items={weeklyChips(opt, locale)} />
              <a
                href={arranqueWeeklyWhatsapp(site.phone.e164, opt, locale)}
                className="em-nd-plan__cta"
                target="_blank"
                rel="noopener noreferrer"
                data-cta={i === 0 ? "package_arranque_weekly_whatsapp" : "package_arranque_weekly_2_whatsapp"}
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {c.start}
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="em-nd-panel__fine">{arranqueWeeklyComparisonLine(locale)}</p>
      <a href={arranqueWeeklyHref(locale)} className="em-nd-panel__link" data-cta="package_arranque_weekly_plan">
        {c.weekly.how}
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function EditingPanel({ locale, onWeekly }: { locale: Locale; onWeekly: () => void }) {
  const c = chooserCopy(locale);
  const price = priceFor("arranque");
  const es = locale === "es";
  const onceText = price.kind === "from" ? `${usd(price.amount)} ${packagesCopy(locale).price.units[price.unit]}` : "";
  const lowest = ARRANQUE_WEEKLY_OPTIONS[0];
  return (
    <div className="em-nd-plans em-nd-plans--one">
      <article id={packageAnchor("arranque")} className="em-nd-plan" data-plan="arranque" aria-label={c.editing.name}>
        <div className="em-nd-plan__body">
          <h4 className="em-nd-plan__name">{c.editing.name}</h4>
          {price.kind === "from" ? <Price amount={price.amount} unit={c.editing.perVideo} /> : <Price custom={c.business.custom} />}
          <Chips items={c.editing.chips} />
          <Whatsapp
            text={
              es
                ? `Hola Esteban, me interesa el Arranque, una sola vez (${onceText}).`
                : `Hi Esteban, I'm interested in Starter, just once (${onceText}).`
            }
            label={c.quote}
            cta="package_arranque_project_whatsapp"
          />
          <DetailsLink locale={locale} id="arranque" />
        </div>
      </article>
      <p className="em-nd-panel__hint">
        {c.editing.weeklyHint}{" "}
        <button type="button" className="em-nd-panel__switch" onClick={onWeekly} data-cta="door_switch_start-social">
          {usd(lowest.pricePerWeek)} {c.weekly.perWeek}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </p>
    </div>
  );
}

function DetailsLink({ locale, id }: { locale: Locale; id: PackageId }) {
  return (
    <a href={packageRoutes[id][locale]} className="em-nd-plan__details" data-cta={`package_${id}_details`}>
      {chooserCopy(locale).details}
    </a>
  );
}

function quoteText(locale: Locale, name: string) {
  return locale === "es"
    ? `Hola Esteban, vi tu página y me interesa el paquete ${name}.`
    : `Hi Esteban, I saw your site and I'm interested in the ${name} package.`;
}
