"use client";

import Image from "next/image";
import { Play } from "lucide-react";

import { Rail, type RailItem } from "@/vendor/rail-kit";
import { RAIL_LABELS_EN, RAIL_LABELS_ES } from "@/components/em-rails";

/**
 * The homepage's selected work, as a rail.
 *
 * This is the first thing a visitor sees, and it was a 3-up grid: on a phone
 * that is six stacked cards — roughly four screens of scrolling before the
 * page gets to say anything else. A rail puts the same six in one strip you
 * push sideways, which is how a catalogue of things-you-look-at is meant to
 * behave.
 *
 * Every string the grid rendered is still rendered here: category, title,
 * location, and the same destination for each card. This component chooses
 * layout and never wording.
 */

export type HomePortfolioCard = {
  id: string;
  href: string;
  title: string;
  eyebrow: string;
  /** Verified location context only; absent for items that have none. */
  location?: string;
  /** Local approved still; absent for items with no poster. */
  poster?: string;
};

export function HomePortfolioRail({
  locale,
  items,
}: {
  locale: "en" | "es";
  items: HomePortfolioCard[];
}) {
  const isSpanish = locale === "es";

  const railItems: RailItem[] = items.map((item) => ({
    kind: "media",
    id: item.id,
    href: item.href,
    title: item.title,
    // The category rides in the BODY, not over the picture. Every still in this
    // rail is a website screenshot with headline type in it, so a badge laid on
    // the photograph always covers a word: at the top it sat on "Inspected by a
    // mechanic.", at the foot on "Backed by a warranty." There is no safe
    // corner on a picture that is itself text.
    meta: item.eyebrow,
    metaPlacement: "block",
    // The grid showed the location under the title; keep it there.
    subtitle: item.location,
    // `image` is required by the media shape, but the rail never renders it
    // when `media` is present — next/image owns the box instead, so the
    // homepage keeps its LCP optimisation, its srcset and its lazy loading.
    image: { src: item.poster ?? "", alt: "" },
    media: item.poster ? (
      <>
        {/* A slow warm sweep across the cover. Three passes, then it stops:
            an animation that never ends stops being a highlight and becomes
            wallpaper — and on a rail of six it would be six things moving at
            once. The kit guards it behind prefers-reduced-motion. */}
        <span data-rail-shimmer aria-hidden="true" className="absolute inset-0 z-[1]" />
        {/* The grid this replaces opened each card link with a screen-reader
            -only verb, so the link announced "Watch <title>" rather than just
            the title. Dropping it was a real loss — caught by diffing the
            rendered text against production, which showed six "Watch"/"Ver"
            missing per page. The figure is the first thing inside the card's
            anchor, so putting it back here restores the exact same reading
            order. `rail-sr-only` is the kit's own hidden-text class. */}
        <span className="rail-sr-only">{isSpanish ? "Ver " : "Watch "}</span>
        <Image
          src={item.poster}
          // Decorative: the card's own title names the project immediately
          // after, and the grid this replaces used an empty alt for the same
          // reason. An alt repeating the visible title is noise to a screen
          // reader, not help.
          alt=""
          fill
          sizes="(min-width: 1280px) 332px, (min-width: 768px) 332px, 288px"
          className="object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-[#c84a2c] text-white"
        >
          <Play className="size-4 fill-current" aria-hidden="true" />
        </span>
      </>
    ) : undefined,
  }));

  return (
    <Rail
      items={railItems}
      source={`home_portfolio_${locale}`}
      variant="poster"
      size="lg"
      titleAs="h3"
      cta="none"
      // The whole card is already a link, so a button would be a second way in
      // rather than a new one. `none` keeps the card quiet and clickable.
      ariaLabel={isSpanish ? "Trabajo seleccionado" : "Selected work"}
      labels={isSpanish ? RAIL_LABELS_ES : RAIL_LABELS_EN}
      showControls
    />
  );
}
