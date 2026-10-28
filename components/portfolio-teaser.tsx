
import { PORTFOLIO_ITEMS, type PortfolioItem } from "@/lib/portfolio";
import { REELS_IN_DISPLAY_ORDER, realEstateReelsPath } from "@/lib/real-estate-reels";
import { HomePortfolioRail } from "@/components/home-portfolio-rail";

type PortfolioTeaserProps = {
  locale: "en" | "es";
  /** The rail is reusable beneath long-form guides; keep its events attributable. */
  source?: string;
};

// The homepage shelf is a deliberately edited first look, not the complete
// portfolio. Keep both cases public at their own URLs, but do not let Banacol
// or ML Colombia re-enter this particular shelf. The owner selected the Great
// Reviewer iPhone reel as the lead piece; the current property Reels follow.
const HOMEPAGE_RAIL_EXCLUDED_IDS = new Set(["la-huelga", "banacol", "ml-colombia"]);
const HOMEPAGE_RAIL_FEATURED_ID = "great-reviewer-iphone-18";

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

export function PortfolioTeaser({ locale, source = "home_portfolio" }: PortfolioTeaserProps) {
  // The rail used to carry three cards. Owner request, 2026-10-12: "i need more
  // content... prioritize the latest real estate ones and should just scroll
  // all of them as i go to the right".
  //
  // Great Reviewer leads by explicit editorial choice; the current property
  // Reels follow in their maintained shelf order. There is deliberately no
  // invented per-clip date in the Reel schema.
  //
  // Web-design projects are excluded: this section is "first, the work" for a
  // video buyer, and a website screenshot in a video rail is a different
  // promise.
  const items = PORTFOLIO_ITEMS.filter(
    (item): item is PortfolioItem =>
      item.status === "live" &&
      item.category !== "web-design" &&
      !HOMEPAGE_RAIL_EXCLUDED_IDS.has(item.id) &&
      item.id !== HOMEPAGE_RAIL_FEATURED_ID,
  );
  const featuredItem = PORTFOLIO_ITEMS.find(
    (item): item is PortfolioItem =>
      item.id === HOMEPAGE_RAIL_FEATURED_ID && item.status === "live",
  );
  const isSpanish = locale === "es";
  const href = isSpanish ? "/es/portafolio" : "/portfolio";
  const reelHref = realEstateReelsPath(locale);
  const unboxingHref = isSpanish
    ? "/es/video-de-unboxing-y-demostracion-de-producto-south-florida"
    : "/services/product-unboxing-demo-video-south-florida";

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
                ? `Primero, el Reel de The Great Reviewer. Después, ${REELS_IN_DISPLAY_ORDER.length} Reels inmobiliarios y más trabajo de contenido, eventos, edición, narrativa y animación. Desliza para verlo todo.`
                : `First: The Great Reviewer reel. Then ${REELS_IN_DISPLAY_ORDER.length} property Reels and more content, events, editing, narrative and animation. Swipe to see all of it.`}
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
            source={source}
            items={[...(featuredItem ? [featuredItem] : []).map((item) => {
              const poster = getPoster(item);
              return {
                id: item.id,
                href: `${href}/${item.id}`,
                title: item.title,
                eyebrow: categoryLabels[locale][item.category],
                location: item.location,
                poster,
                posterAlt: isSpanish ? `Fotograma del video ${item.title}` : `Frame from the video ${item.title}`,
                // This is the owner-selected iPhone Reel lead. It uses the
                // device shell even though it is not in the property-Reel
                // playlist, whose `isReel` flag also controls in-place MP4
                // playback.
                phoneFrame: true,
                videoSurface: true,
                videoSurfaceLabel: "The Great Reviewer",
                // It is published on YouTube, not mirrored as a local MP4.
                // Selecting it still opens the same in-place player sheet and
                // starts the video immediately instead of navigating away.
                embedUrl: "https://www.youtube-nocookie.com/embed/BDRru8eXaj4?autoplay=1&mute=1&playsinline=1&rel=0",
                // The card is deliberately an iPhone-shaped editorial tile,
                // while the published review itself is a widescreen film.
                playerAspect: "landscape" as const,
              };
            }), {
              id: "sony-alpha-7-iv-unboxing",
              href: unboxingHref,
              title: isSpanish ? "Unboxing Sony Alpha 7 IV" : "Sony Alpha 7 IV unboxing",
              eyebrow: isSpanish ? "Unboxing de producto" : "Product unboxing",
              poster: "/portfolio/sony-a7iv-unboxing.png",
              posterAlt: isSpanish ? "Unboxing de una Sony Alpha 7 IV" : "Sony Alpha 7 IV unboxing",
              phoneFrame: true,
            }, ...REELS_IN_DISPLAY_ORDER.map((reel) => ({
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
              const isVideoWork = item.category === "social-content" &&
                (item.media.kind === "youtube" || item.media.kind === "instagram");
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
                // Landscape video stays whole in a small player surface. This
                // preserves people in the thumbnail instead of cropping a
                // 16:9 film into a vertical Reel.
                phoneFrame: isVideoWork,
                videoSurface: isVideoWork,
                videoSurfaceLabel: isSpanish ? "Video de Esteban Moreno" : "Esteban Moreno video",
              };
            })]}
          />
        </div>
      </div>
    </section>
  );
}
