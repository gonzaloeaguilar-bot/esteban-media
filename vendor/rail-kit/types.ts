import type { ReactNode } from "react";
import type { RailIconName } from "./icons";

/**
 * The rail is brand-agnostic on purpose: it takes items, renders cards, and
 * reports what a visitor did. Anything brand-specific — colour, radius, type,
 * imagery, copy — arrives as CSS custom properties or as the item itself.
 */

/**
 * One call to action on a card. A card may carry up to three; more than that
 * is not a card, it is a menu.
 */
export type RailAction = {
  label: string;
  href: string;
  /** Defaults to "primary" for the first action, "secondary" for the rest. */
  variant?: Exclude<CtaVariant, "none">;
  /** Optional per-action id for telemetry; defaults to the label. */
  id?: string;
};

/** What every card shape can carry, whatever its kind. */
type CardCommon = {
  id: string;
  description?: string;
  /** Small pill in the top corner, e.g. "$500 down", "Most hands-on". */
  badge?: string;
  /**
   * A mark for cards with no photo. Either a name from the kit's generic set
   * or the brand's own node — an inline SVG, a logo, an emoji. Rendered in
   * `currentColor`, so it inherits --rail-accent.
   */
  icon?: RailIconName | ReactNode;
  /** One to three actions. Overrides `cta` when present. */
  actions?: RailAction[];
  /** Shows a dismiss control on this card. */
  dismissible?: boolean;
  /**
   * A second label, drawn over the bottom of the picture — Netflix's "New
   * Season" / "Leaving Soon". Only ever state something verifiable: a real
   * date, a real status. Never a countdown we cannot prove.
   */
  footerBadge?: string;
  /**
   * The consumer's own media in the figure box — an embed, a video, a
   * framework's optimised image. Wins over `image`, which stays the simple
   * path. The rail only reserves the box; what goes in it is the site's
   * business.
   */
  media?: ReactNode;
  /**
   * Two-or-three character mark rendered where the image would be. Pass
   * `null` to drop the figure entirely — right for cards that are not a
   * sequence, where a number would be noise.
   */
  glyph?: string | null;
  /** Overrides the rail's own `variant` for this one card. */
  variant?: RailVariant;
};

/** A card with a picture: inventory, listings, products, coaching packages. */
export type MediaCardItem = CardCommon & {
  kind: "media";
  href: string;
  title: string;
  /**
   * Short line under the title. Keep it to one clause. With
   * `metaPlacement: "block"` it becomes the note under the value — what the
   * price buys, e.g. "17 salidas al mes".
   */
  subtitle?: string;
  image: { src: string; alt: string };
  /**
   * Draws the title and meta over the picture with a gradient scrim, the way
   * a poster carries its own lockup. Needs an image; ignored without one.
   */
  titleOverlay?: boolean;
  /**
   * The card's value: a price, a distance, a duration. A node, so a brand can
   * render "$450" big with a small "/mes" beside it.
   */
  meta?: ReactNode;
  /**
   * Where the value sits.
   *
   * - `inline` (default) beside the title, small — right for a rail you scan
   * - `block` under the copy and above the list, at its own size — right when
   *   the price IS the decision, as on a pricing card
   */
  metaPlacement?: "inline" | "block";
  bullets?: string[];
  /** Shorthand for a single action that reuses the card's own href. */
  cta?: string;
  /** Overrides the rail's `cta` setting for this one card. */
  ctaVariant?: CtaVariant;
};

/** A card with no picture — BRAZ-style, where the words are the product. */
export type TextCardItem = Omit<MediaCardItem, "kind" | "image"> & {
  kind: "text";
  /** Optional — a text card may still carry a picture. */
  image?: { src: string; alt: string };
};

/** A card whose point is one number: results, stats, proof. */
export type StatCardItem = CardCommon & {
  kind: "stat";
  href?: string;
  /** The number itself, already formatted by the brand. */
  value: string;
  label: string;
  /** Optional — a number can sit over a picture too. */
  image?: { src: string; alt: string };
};

/**
 * How the card's call to action is drawn:
 *
 * - `primary`   filled button, full width on a phone — the default, because a
 *               card people are meant to act on should look like it
 * - `secondary` outlined button, same size, less shout
 * - `link`      quiet text-and-arrow
 * - `none`      hidden; the whole card is already a link, so the CTA is
 *               emphasis, never the only way in
 */
export type CtaVariant = "primary" | "secondary" | "link" | "none";

export type RailItem = MediaCardItem | TextCardItem | StatCardItem;

export type RailTelemetry = {
  /** The rail scrolled into view, once per mount. */
  onImpression?: (info: { source: string; itemCount: number }) => void;
  /** A card came into view inside the scroller, once per card. */
  onCardView?: (info: { source: string; id: string; index: number }) => void;
  /** A card was clicked. */
  onSelect?: (info: {
    source: string;
    id: string;
    index: number;
    cardsViewed: number;
    /** Present when the click came from a named action, not the card. */
    actionId?: string;
    actionIndex?: number;
  }) => void;
};

/** See RailProps.variant. */
export type RailVariant = "editorial" | "poster" | "tile";

export type RailProps = RailTelemetry & {
  items: RailItem[];
  /** Surface label — rides along on every telemetry call. */
  source: string;
  heading?: string;
  subheading?: string;
  eyebrow?: string;
  /** Card width preset. Brands override with --rail-card-width if needed. */
  size?: "sm" | "md" | "lg";
  /**
   * The card's language. `editorial` (the default) is text first, a hairline
   * above it, the picture beneath — a magazine. `poster` is the catalogue
   * language of a streaming service: the picture is the product, it leads,
   * and the copy sits on the panel below it.
   *
   * `tile` is art only: a library of things recognised by their cover —
   * games, albums, films. The title lives in the artwork, so the card draws
   * none and keeps it for screen readers.
   *
   * Which one is right is a question about the subject, not about taste. A
   * piece of writing is served by editorial; a thing you look at — a car, a
   * listing, a night — is served by poster; a wall of covers is served by
   * tile.
   */
  variant?: RailVariant;
  /**
   * Clamps every description to N lines so cards of different text length
   * stop leaving a hole above the button. Off by default — truncation is a
   * choice, not a default.
   */
  descriptionLines?: number;
  /** Card CTA style. Defaults to "primary" — a visible button on every card. */
  cta?: CtaVariant;
  /** Highlights one card as the suggested next action. */
  highlightId?: string;
  /**
   * One action beside the rail heading — "See all ›". The rail itself is
   * never the only way to the full list.
   */
  headerAction?: { label: string; href: string };
  /**
   * Draws the arrows (and the position counter) even when the rail has no
   * heading of its own — for a rail that sits under the page's own title.
   */
  showControls?: boolean;
  /**
   * The HTML element for each card's headline. `span` by default — a rail of
   * posters is not an outline. On a page where the cards ARE the content (a
   * pricing page, a catalogue), pass the heading level that fits under the
   * page's own, so a screen reader can still jump card to card.
   */
  titleAs?: "h2" | "h3" | "h4" | "span";
  /**
   * Every word the rail owns. Defaults are English; a site in another
   * language sets these once, wherever it wraps the rail.
   */
  labels?: {
    back?: string;
    forward?: string;
    /** e.g. (1, 3, 10) => "1–3 de 10". Return "" to hide the counter. */
    position?: (from: number, to: number, total: number) => string;
  };
  /** Rendered between the header and the scroller, e.g. a progress bar. */
  progressSlot?: React.ReactNode;
  /** Appended after the last card, e.g. a "see everything" card. */
  tailSlot?: React.ReactNode;
  /** Shows a dismiss control on the whole rail. */
  dismissible?: boolean;
  /**
   * Remembers a dismissal under this key in localStorage. Omit and the rail
   * comes back on the next page load — dismissal is a preference, and a
   * preference the visitor cannot undo is a trap.
   */
  dismissKey?: string;
  onDismiss?: (info: { source: string; scope: "rail" | "card"; id?: string }) => void;
  /** Label for the dismiss control. Default: "Dismiss". */
  dismissLabel?: string;
  className?: string;
};
