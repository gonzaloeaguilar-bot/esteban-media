import { MessageCircle } from "lucide-react";

import { arranqueWeeklyComparisonLine, arranqueWeeklyHref, arranqueWeeklyTermsLine, arranqueWeeklyWhatsapp } from "@/lib/arranque-weekly";
import { packagesCopy, priceFor, whatsappHref, type Locale } from "@/lib/packages";
import { ARRANQUE_WEEKLY_OPTIONS, usd } from "@/lib/pricing";
import { site } from "@/lib/site";

/**
 * The ONE Starter / Arranque offer, framed by how often you need videos:
 * "Una sola vez" ($100 per video) or "Cada semana" ($85 / $160 a week).
 *
 * Rendered inside the open Starter card on /pricing, /es/precios and the home
 * pages, and on the four creator pages, so the site never shows two Starters.
 * Owner copy direction, 2026-10-08: frame by frequency, not by price,
 * with few words and big numbers. Prices come from lib/pricing.ts.
 * No "use client": it renders the same on the server and inside the client card.
 */
export function StarterOptions({ locale, showTermsLink = true }: { locale: Locale; showTermsLink?: boolean }) {
  const es = locale === "es";
  const copy = packagesCopy(locale);
  const price = priceFor("arranque");
  const once = price.kind === "from" ? price.amount : null;
  const unit = price.kind === "from" ? copy.price.units[price.unit] : "";
  const onceText = once === null ? copy.price.custom : `${usd(once)} ${unit}`;

  return (
    // No data-section of its own: clicks stay attributed to the section that
    // hosts it ("packages" on pricing, "arranque_weekly" on creator pages).
    <div className="em-pk-starter">
      <p className="em-pk-starter__ask">{es ? "¿Cada cuánto necesitas videos?" : "How often do you need videos?"}</p>
      <div className="em-pk-starter-options">
        <div className="em-pk-starter-tile" data-plan="once">
          <p className="em-pk-starter-tile__name">{es ? "Una sola vez" : "Just once"}</p>
          <div className="em-pk-starter-tile__price">
            <span className="em-pk-starter-tile__num">{once === null ? copy.price.custom : usd(once)}</span>
            <span className="em-pk-starter-tile__unit">{unit}</span>
          </div>
          <a
            href={whatsappHref(
              site.phone.e164,
              es
                ? `Hola Esteban, me interesa el Arranque, una sola vez (${onceText}).`
                : `Hi Esteban, I'm interested in Starter, just once (${onceText}).`,
            )}
            className="em-pkcard__cta"
            target="_blank"
            rel="noopener noreferrer"
            data-cta="package_arranque_project_whatsapp"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {es ? "Cotizar por WhatsApp" : "Quote on WhatsApp"}
          </a>
        </div>

        <div className="em-pk-starter-tile em-pk-starter-tile--weekly" data-plan="weekly">
          <p className="em-pk-starter-tile__name">{es ? "Cada semana" : "Every week"}</p>
          <div className="em-pk-starter-tile__rows">
            {ARRANQUE_WEEKLY_OPTIONS.map((opt) => (
              <div key={opt.id} className="em-pk-starter-tile__row">
                <span className="em-pk-starter-tile__num">{usd(opt.pricePerWeek)}</span>
                <span className="em-pk-starter-tile__unit">
                  {es ? "/semana" : "/week"} · {opt.videosPerWeek} {opt.videosPerWeek === 1 ? "video" : "videos"}
                </span>
              </div>
            ))}
          </div>
          <p className="em-pk-starter-tile__compare">{arranqueWeeklyComparisonLine(locale)}</p>
          <div className="em-pk-starter-tile__chips">
            <span className="em-pk-starter-pill">{arranqueWeeklyTermsLine(locale)}</span>
          </div>
          <a
            href={arranqueWeeklyWhatsapp(site.phone.e164, ARRANQUE_WEEKLY_OPTIONS[0], locale)}
            className="em-pkcard__cta"
            target="_blank"
            rel="noopener noreferrer"
            data-cta="package_arranque_weekly_whatsapp"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {es ? "Empezar por WhatsApp" : "Start on WhatsApp"}
          </a>
          {showTermsLink ? (
            <p className="em-pkcard__weekly">
              <a href={arranqueWeeklyHref(locale)} data-cta="package_arranque_weekly_plan">
                {es ? "Cómo funciona el pago semanal" : "How paying weekly works"}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
