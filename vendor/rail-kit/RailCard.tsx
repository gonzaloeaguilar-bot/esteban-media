"use client";

import { RAIL_ICONS, type RailIconName } from "./icons";
import type { CtaVariant, RailAction, RailItem, RailVariant } from "./types";

/** More than three actions is not a card, it is a menu. */
const MAX_ACTIONS = 3;

function renderIcon(icon: RailItem["icon"]) {
  if (!icon) return null;
  const node =
    typeof icon === "string" && icon in RAIL_ICONS ? (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        {RAIL_ICONS[icon as RailIconName]}
      </svg>
    ) : (
      icon
    );
  return (
    <span className="rail-card__icon" aria-hidden="true">
      {node}
    </span>
  );
}

/** Normalises `cta` shorthand and `actions` into one list, capped at three. */
function resolveActions(item: RailItem, fallbackCta: CtaVariant): RailAction[] {
  if (item.kind !== "stat" && item.actions?.length) {
    return item.actions.slice(0, MAX_ACTIONS).map((action, index) => ({
      ...action,
      variant: action.variant ?? (index === 0 ? "primary" : "secondary"),
    }));
  }
  if (item.kind === "stat" && item.actions?.length) {
    return item.actions.slice(0, MAX_ACTIONS).map((action, index) => ({
      ...action,
      variant: action.variant ?? (index === 0 ? "primary" : "secondary"),
    }));
  }
  if (item.kind !== "stat" && item.cta && fallbackCta !== "none") {
    return [{ label: item.cta, href: item.href, variant: fallbackCta }];
  }
  return [];
}

type Props = {
  item: RailItem;
  index: number;
  /** Element for the headline; see RailProps.titleAs. */
  titleAs?: "h2" | "h3" | "h4" | "span";
  highlighted: boolean;
  /** The rail's variant; an item's own `variant` wins over it. */
  variant?: RailVariant;
  cta: CtaVariant;
  dismissLabel: string;
  onSelect: () => void;
  onActionSelect: (action: RailAction, actionIndex: number) => void;
  onDismiss?: () => void;
};

export default function RailCard({
  item,
  index,
  titleAs = "span",
  highlighted,
  variant,
  cta,
  dismissLabel,
  onSelect,
  onActionSelect,
  onDismiss,
}: Props) {
  const actions = resolveActions(item, cta);
  const Titulo = titleAs;
  const cardHref = item.kind === "stat" ? item.href : item.href;

  /**
   * A card is a single link only when nothing inside it competes for the
   * click. With more than one action — or an action pointing somewhere else —
   * nesting anchors would be invalid HTML and unusable with a screen reader,
   * so the card becomes a plain container and the title carries the link.
   */
  const actionsCompete =
    actions.length > 1 || actions.some((a) => a.href !== cardHref);
  const wholeCardIsLink = Boolean(cardHref) && !actionsCompete && !item.dismissible;

  const image = item.image;
  /**
   * The figure box exists for pictures and for a numbered sequence. An icon
   * alone does NOT earn one: a small mark floating in a large empty panel
   * reads as a picture that failed to load. Icon-only cards render the mark
   * as a chip in the body instead.
   */
  const showFigure =
    Boolean(item.media) || Boolean(image) || (item.kind !== "stat" && item.glyph != null);

  const overlay = item.kind === "media" && item.titleOverlay && Boolean(image);

  const figure = showFigure ? (
    <span className="rail-card__figure" data-rail-overlay={overlay ? "" : undefined}>
      {item.media ? (
        item.media
      ) : image ? (
        // The consumer owns image optimisation; the rail only reserves the box
        // so the layout cannot jump when the file arrives.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="rail-card__image"
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
        />
      ) : item.icon ? (
        renderIcon(item.icon)
      ) : (
        <span className="rail-card__glyph" aria-hidden="true">
          {(item.kind !== "stat" && item.glyph) || String(index + 1).padStart(2, "0")}
        </span>
      )}
      {item.badge && <span className="rail-card__badge">{item.badge}</span>}
      {item.footerBadge && !overlay && (
        <span className="rail-card__badge rail-card__badge--footer">{item.footerBadge}</span>
      )}
      {overlay && item.kind === "media" && (
        <span className="rail-card__overlay">
          {item.footerBadge && (
            <span className="rail-card__badge rail-card__badge--inline">
              {item.footerBadge}
            </span>
          )}
          <span className="rail-card__title">{item.title}</span>
          {item.meta && <span className="rail-card__meta">{item.meta}</span>}
        </span>
      )}
    </span>
  ) : null;

  const title =
    item.kind === "stat" ? (
      <>
        <span className="rail-card__stat-value">{item.value}</span>
        <span className="rail-card__stat-label">{item.label}</span>
      </>
    ) : wholeCardIsLink || !cardHref ? (
      <Titulo className="rail-card__title">{item.title}</Titulo>
    ) : (
      // The title is the card's link when the actions have taken the click.
      <Titulo className="rail-card__title">
        <a className="rail-card__title-link" href={cardHref} onClick={onSelect}>
          {item.title}
        </a>
      </Titulo>
    );

  /**
   * A price beside the title is a detail; a price under the copy at its own
   * size is the decision. Pricing cards need the second, so the value moves
   * below the description and takes the subtitle with it as its note.
   */
  const metaAsBlock =
    item.kind !== "stat" && item.metaPlacement === "block" && Boolean(item.meta);

  const body = (
    <span className="rail-card__body">
      {!showFigure && (item.icon || item.badge) && (
        <span className="rail-card__mark-row">
          {item.icon && renderIcon(item.icon)}
          {item.badge && (
            <span className="rail-card__badge rail-card__badge--inline">{item.badge}</span>
          )}
        </span>
      )}
      <span className="rail-card__head">
        {!overlay && title}
        {!overlay && item.kind !== "stat" && item.meta && !metaAsBlock && (
          <span className="rail-card__meta">{item.meta}</span>
        )}
      </span>
      {item.kind !== "stat" && item.subtitle && !metaAsBlock && (
        <span className="rail-card__subtitle">{item.subtitle}</span>
      )}
      {item.description && <p className="rail-card__description">{item.description}</p>}
      {metaAsBlock && !overlay && (
        <span className="rail-card__value">
          <span className="rail-card__meta rail-card__meta--block">{item.meta}</span>
          {item.subtitle && (
            <span className="rail-card__value-note">{item.subtitle}</span>
          )}
        </span>
      )}
      {item.kind !== "stat" && item.bullets && item.bullets.length > 0 && (
        <ul className="rail-card__bullets">
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      {actions.length > 0 && (
        <span className="rail-card__actions" data-rail-action-count={actions.length}>
          {actions.map((action, actionIndex) =>
            wholeCardIsLink ? (
              // Inside a link-card the action is emphasis, not a second link.
              <span
                key={action.id ?? action.label}
                className={`rail-card__cta rail-card__cta--${action.variant}`}
                data-rail-cta={action.variant}
              >
                <span className="rail-card__cta-label">{action.label}</span>
                <span aria-hidden="true">→</span>
              </span>
            ) : (
              <a
                key={action.id ?? action.label}
                className={`rail-card__cta rail-card__cta--${action.variant}`}
                data-rail-cta={action.variant}
                href={action.href}
                onClick={(event) => {
                  event.stopPropagation();
                  onActionSelect(action, actionIndex);
                }}
              >
                <span className="rail-card__cta-label">{action.label}</span>
                <span aria-hidden="true">→</span>
              </a>
            ),
          )}
        </span>
      )}
    </span>
  );

  const dismiss = item.dismissible && onDismiss ? (
    <button
      type="button"
      className="rail-card__dismiss"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onDismiss();
      }}
    >
      <span aria-hidden="true">×</span>
      <span className="rail-sr-only">{`${dismissLabel}: ${item.kind === "stat" ? item.label : item.title}`}</span>
    </button>
  ) : null;

  const common = {
    "data-rail-card": item.id,
    "data-rail-index": index,
    "data-rail-kind": item.kind,
    "data-rail-variant": item.variant ?? variant,
    "data-rail-highlighted": highlighted ? "true" : undefined,
    className: "rail-card",
  } as const;

  if (wholeCardIsLink && cardHref) {
    return (
      <a href={cardHref} {...common} onClick={onSelect}>
        {figure}
        {body}
      </a>
    );
  }

  return (
    <div {...common}>
      {dismiss}
      {figure}
      {body}
    </div>
  );
}
