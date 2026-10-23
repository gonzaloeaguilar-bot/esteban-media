import { MessageCircle } from "lucide-react";

import { arranqueWeeklyTermsLine, arranqueWeeklyWhatsapp } from "@/lib/arranque-weekly";
import { packagesCopy, priceFor, whatsappHref, type Locale } from "@/lib/packages";
import { ARRANQUE_WEEKLY_OPTIONS, usd } from "@/lib/pricing";
import { quoteCtaLabel } from "@/lib/quote-cta";
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
export function StarterOptions({
  locale,
  quiet = false,
}: {
  locale: Locale;
  /**
   * The home page's fold already carries a filled "Get a quote on WhatsApp"
   * button in HeroVideo, HomeContactStrip and ClosingCredits — a visitor who
   * scrolls this far has already seen the same filled button three times.
   * /pricing and /es/precios, where this card is the FIRST whatsapp CTA on
   * the page, keep the filled treatment. Same href, same data-cta, same
   * label — only the visual weight changes.
   */
  quiet?: boolean;
}) {
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
            <span className={`em-pk-starter-tile__num em-price-figure${once === null ? " em-price-figure--words" : ""}`}>{once === null ? copy.price.custom : usd(once)}</span>
            <span className="em-pk-starter-tile__unit">{unit}</span>
          </div>
          <a
            href={whatsappHref(
              site.phone.e164,
              es
                ? `Hola Esteban, me interesa el Arranque, una sola vez (${onceText}).`
                : `Hi Esteban, I'm interested in Starter, just once (${onceText}).`,
            )}
            className={quiet ? "em-pkcard__cta-quiet" : "em-pkcard__cta"}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="package_arranque_project_whatsapp"
            aria-label={`${quoteCtaLabel(locale)}: ${es ? "Una sola vez" : "Just once"}`}
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {quoteCtaLabel(locale)}
          </a>
        </div>

        <div className="em-pk-starter-tile em-pk-starter-tile--weekly" data-plan="weekly">
          <p className="em-pk-starter-tile__name">{es ? "Cada semana" : "Every week"}</p>
          <div className="em-pk-starter-tile__rows">
            {ARRANQUE_WEEKLY_OPTIONS.map((opt) => (
              <a
                key={opt.id}
                href={arranqueWeeklyWhatsapp(site.phone.e164, opt, locale)}
                className="em-pk-starter-tile__row"
                target="_blank"
                rel="noopener noreferrer"
                data-cta={opt.id === "one-per-week" ? "package_arranque_weekly_one_video_whatsapp" : "package_arranque_weekly_two_videos_whatsapp"}
                aria-label={`${quoteCtaLabel(locale)}: ${opt.videosPerWeek} ${opt.videosPerWeek === 1 ? "video" : "videos"} ${es ? "por semana" : "per week"}`}
              >
                <span className="em-pk-starter-tile__num em-price-figure">{usd(opt.pricePerWeek)}</span>
                <span className="em-pk-starter-tile__unit">
                  {es ? "/semana" : "/week"} · {opt.videosPerWeek} {opt.videosPerWeek === 1 ? "video" : "videos"}
                </span>
                <span className="em-pk-starter-tile__select">{es ? "Cotizar este plan" : "Quote this plan"}</span>
              </a>
            ))}
          </div>
          <div className="em-pk-starter-tile__chips">
            <span className="em-pk-starter-pill">{arranqueWeeklyTermsLine(locale)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
