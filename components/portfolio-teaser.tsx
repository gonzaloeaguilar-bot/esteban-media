
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/portfolio";
import { REELS_IN_DISPLAY_ORDER, realEstateReelsPath } from "@/lib/real-estate-reels";
import { HomePortfolioRail } from "@/components/home-portfolio-rail";

type PortfolioTeaserProps = {
  locale: "en" | "es";
};

const categoryLabels = {
  en: {
    animation: "Animation",
    "business-promos": "Business promos",
    "social-content": "Social content",
    events: "Events",
    editing: "Editing",
    narrative: "Narrative",
    "web-design": "Web Design & AI",
  },
  es: {
    animation: "Animación",
    "business-promos": "Promoción de negocios",
    "social-content": "Contenido social",
    events: "Eventos",
    editing: "Edición",
    narrative: "Narrativa",
    "web-design": "Diseño Web e IA",
  },
} as const;

function getPoster(item: PortfolioItem) {
  if ("poster" in item.media) {
    return item.media.poster;
  }

  if (item.media.kind === "image") {
    return item.media.src;
  }

  return undefined;
}

export function PortfolioTeaser({ locale }: PortfolioTeaserProps) {
  // The rail used to carry three cards. Owner request, 2026-10-12: "i need more
  // content... prioritize the latest real estate ones and should just scroll
  // all of them as i go to the right".
  //
  // LATEST is measured, not assumed: every real-estate reel entered the repo
  // on 2026-10-10 and every other portfolio still on 2026-07-16 (git
  // --diff-filter=A), so the reels are the newest body of work AS A SET. They
  // lead. There is deliberately no per-clip date — lib/real-estate-reels.ts
  // refuses to invent one because the VideoObject schema would then assert it
  // — so within the set we keep the curated shelf order rather than guess.
  //
  // Web-design projects are excluded: this section is "first, the work" for a
  // video buyer, and a website screenshot in a video rail is a different
  // promise.
  const items = PORTFOLIO_ITEMS.filter(
    (item): item is PortfolioItem =>
      item.status === "live" && item.category !== "web-design",
  );
  const isSpanish = locale === "es";
  const href = isSpanish ? "/es/portafolio" : "/portfolio";
  const reelHref = realEstateReelsPath(locale);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="border-y border-[#ddd4c8] bg-[#101214] py-10 text-[#f6f1ea] sm:py-14"
      aria-labelledby={`selected-work-${locale}`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="em-eyebrow em-eyebrow--inverted">
              {isSpanish ? "Primero, el trabajo" : "First, the work"}
            </p>
            <h2
              id={`selected-work-${locale}`}
              className="mt-3 em-h2"
            >
              {/* The rail is no longer three cards, so the heading cannot
                  say three. It names what is actually in the strip. */}
              {isSpanish ? "Mira el trabajo terminado." : "See the finished work."}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#c9c1b8]">
              {isSpanish
                ? "Lo más reciente primero: seis Reels inmobiliarios, y después promociones de negocio, eventos, edición, narrativa y animación. Desliza para verlo todo."
                : "Newest first: six property Reels, then business promos, events, editing, narrative and animation. Swipe to see all of it."}
            </p>
          </div>
          {/* No "View portfolio" button. Owner, 2026-10-12: "we don't need
              this CTA, the portfolio IS the carousel." The rail below carries
              all 14 pieces and every card opens its own project or player, so
              the button sent people to a page showing the same work they were
              already looking at. /portfolio is still reachable from the dock's
              Work tab and from every card, so nothing is orphaned — measured:
              6 links to /portfolio remain on the homepage. */}
        </div>

        {/* The picture IS the product here, so this is the catalogue
            language rather than a static grid: one strip you push sideways,
            the way a streaming service shows a library. Same six items, same
            words, same links — a horizontal rail instead of a 3-up grid that
            already ran out of room at two rows on a phone.

            next/image is preserved through the kit's `media` slot, which
            exists precisely so a consumer keeps its framework's optimised
            image. Swapping to a bare <img> here would have traded LCP on the
            most-visited page of the site for a tidier diff. */}
        <div className="em-on-dark em-cartel mt-8" data-em-reveal>
          <HomePortfolioRail
            locale={locale}
            items={[...REELS_IN_DISPLAY_ORDER.map((reel) => ({
              id: reel.id,
              href: reelHref,
              title: isSpanish ? reel.titleEs : reel.title,
              eyebrow: isSpanish ? "Video inmobiliario" : "Property video",
              poster: reel.poster,
              posterAlt: isSpanish
                ? `Fotograma de un video de propiedad: ${reel.titleEs}`
                : `Frame from a property video: ${reel.title}`,
              isReel: true,
              videoSrc: reel.src,
            })), ...items.map((item) => {
              const poster = getPoster(item);
              const targetHref =
                item.category === "web-design"
                  ? isSpanish
                    ? "/es/diseno-web-fort-lauderdale"
                    : "/services/website-design-fort-lauderdale"
                  : `${href}/${item.id}`;
              return {
                id: item.id,
                href: targetHref,
                title: item.title,
                eyebrow: categoryLabels[locale][item.category],
                location: item.location,
                poster,
                posterAlt: isSpanish ? `Fotograma del video ${item.title}` : `Frame from the video ${item.title}`,
              };
            })]}
          />
        </div>
      </div>
    </section>
  );
}
