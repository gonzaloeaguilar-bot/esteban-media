/**
 * Telemetry, white-label and out of the box.
 *
 * WHY THIS IS NOT A REACT PROP. The kit already offered per-component
 * callbacks, and the count said what that was worth: of 51 components, ONE
 * carried the shared `RailTelemetry` contract, 36 had their own differently
 * named callbacks, and 12 emitted nothing at all -- including every mechanic a
 * brand would actually want measured (poll, progress, rating, milestone,
 * presence, live). A contract each consumer has to wire by hand, component by
 * component, is a contract nobody finishes wiring.
 *
 * It also could not work at all for half the consumers. `rail.css` is
 * consumable with NO React -- danielzea and gonzaloaguilar.tech are static
 * HTML -- and a React prop is unreachable from a generated page.
 *
 * So the contract lives in the DOM, where both kinds of consumer already are.
 * Every component root already paints its surface into `data-rail-<name>`:
 * measured, 45 of 51 did it before this file existed, and the remaining six
 * were brought in line rather than given an exception. That attribute is the
 * whole integration.
 *
 * WHITE-LABEL means no vendor appears here. There is no gtag, no dataLayer, no
 * window.va, no fetch. The consumer passes `emit` and decides where events go;
 * the kit only decides WHAT an event is and WHEN it happens, which is the part
 * every brand would otherwise reinvent inconsistently.
 *
 *     import { mountRailTelemetry } from "rail-kit";
 *
 *     mountRailTelemetry({
 *       emit: (name, props) => window.va?.("event", { name, ...props }),
 *     });
 *
 * One call. Every component on the page reports from that moment, including
 * ones mounted later.
 */

/** The four things any surface can report. Deliberately few. */
export type RailEventName =
  | "rail_impression"
  | "rail_view"
  | "rail_select"
  | "rail_state";

export type RailEventProps = {
  /** Component that produced it, e.g. "RailPoll". */
  component: string;
  /** The consumer's own label for this instance -- its `source` prop. */
  surface: string;
  /** Item id, when the event is about one item inside the surface. */
  id?: string;
  /** Item position inside the surface, 0-based. */
  index?: number;
  /** For rail_state: which attribute changed and to what. */
  state?: string;
  value?: string;
};

export type MountRailTelemetryOptions = {
  /** Where events go. The kit never chooses this. */
  emit: (name: RailEventName, props: RailEventProps) => void;
  /** Defaults to `document`. Pass a root for tests or for one region. */
  root?: Document | HTMLElement;
  /** Fraction of a surface that must be on screen to count as seen. */
  threshold?: number;
};

/** Components whose root attribute does not follow `data-rail-<name>`. */
const ALIASES: Record<string, string> = { options: "RailOption" };

const ATTR = /^data-rail-([a-z][a-z-]*)$/;

/**
 * Attributes that describe layout or state rather than naming a component.
 * Without this list a card would report itself as four different components.
 */
const NOT_A_COMPONENT = new Set([
  // `data-rail-card` is the ITEM inside a Rail -- it carries the item's id,
  // not a surface label. Reading it as a component would report every card as
  // a component named after its own id.
  "card",
  "action-count", "art", "block", "chosen", "claimed", "clamp", "columns",
  "extended", "flip", "highlighted", "index", "kind", "layout", "loaded",
  "mine", "numeric", "on", "open", "overlay", "primary", "reached", "scroll",
  "scrollable", "seen", "side", "size", "stacked", "state", "still", "surface",
  "tone", "unavailable", "variant", "visible", "wrap", "playing",
]);

/** State attributes worth a `rail_state` event when they flip. */
const STATEFUL = ["open", "playing", "chosen", "claimed", "reached", "on"];

function nombreDe(el: Element): { component: string; surface: string } | null {
  for (const a of Array.from(el.attributes)) {
    const m = ATTR.exec(a.name);
    if (!m) continue;
    const slug = m[1];
    if (NOT_A_COMPONENT.has(slug)) continue;
    const component =
      ALIASES[slug] ??
      "Rail" + slug.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
    return { component, surface: a.value };
  }
  return null;
}

function raiz(el: Element | null): Element | null {
  let n: Element | null = el;
  while (n) {
    if (nombreDe(n)) return n;
    n = n.parentElement;
  }
  return null;
}

/**
 * Starts reporting. Returns a function that stops it and releases every
 * observer -- a mount with no way out is a leak in a single-page app.
 */
export function mountRailTelemetry({
  emit,
  root,
  threshold = 0.5,
}: MountRailTelemetryOptions): () => void {
  if (typeof document === "undefined") return () => {};
  const scope: Document | HTMLElement = root ?? document;
  const doc: Document =
    scope instanceof Document ? scope : scope.ownerDocument ?? document;
  const vistas = new WeakSet<Element>();

  const io =
    typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver(
          (entradas) => {
            for (const e of entradas) {
              if (!e.isIntersecting || vistas.has(e.target)) continue;
              vistas.add(e.target);
              const id = nombreDe(e.target);
              if (id) emit("rail_impression", id);
              io?.unobserve(e.target);
            }
          },
          { threshold },
        );

  const mo =
    typeof MutationObserver === "undefined"
      ? null
      : new MutationObserver((muts) => {
          for (const m of muts) {
            if (m.type === "attributes") {
              const el = m.target as Element;
              const id = nombreDe(el);
              const attr = m.attributeName ?? "";
              const slug = ATTR.exec(attr)?.[1];
              if (id && slug && STATEFUL.includes(slug)) {
                emit("rail_state", {
                  ...id,
                  state: slug,
                  value: el.getAttribute(attr) ?? "",
                });
              }
              continue;
            }
            m.addedNodes.forEach((n) => {
              if (n.nodeType === 1) observar(n as Element);
            });
          }
        });

  function observar(el: Element) {
    if (nombreDe(el)) io?.observe(el);
    el.querySelectorAll?.("*").forEach((h) => {
      if (nombreDe(h)) io?.observe(h);
    });
  }
  observar(scope instanceof Document ? scope.documentElement : scope);

  function alPulsar(ev: Event) {
    const t = ev.target as Element | null;
    if (!t) return;
    const r = raiz(t.closest?.("*") ?? t);
    if (!r) return;
    const id = nombreDe(r);
    if (!id) return;
    const item = t.closest?.(
      "[data-rail-index],[data-rail-id],[data-rail-card]",
    ) as HTMLElement | null;
    const index = item?.getAttribute("data-rail-index");
    const itemId =
      item?.getAttribute("data-rail-id") ?? item?.getAttribute("data-rail-card");
    emit("rail_select", {
      ...id,
      ...(itemId ? { id: itemId } : {}),
      ...(index != null ? { index: Number(index) } : {}),
    });
  }

  doc.addEventListener("click", alPulsar, true);
  mo?.observe(scope, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: STATEFUL.map((s) => `data-rail-${s}`),
  });

  return () => {
    doc.removeEventListener("click", alPulsar, true);
    io?.disconnect();
    mo?.disconnect();
  };
}
