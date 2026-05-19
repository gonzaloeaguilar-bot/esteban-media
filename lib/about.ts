import {
  Aperture,
  Camera,
  Lightbulb,
  Mic,
  MonitorPlay,
  Plane,
  type LucideIcon,
} from "lucide-react";

/**
 * Structural data for the About page.
 *
 * Single source of truth for the equipment lineup + which icon pairs with
 * which gear category. Translated copy (category labels, item names, bio,
 * brand statement) lives in `messages/{locale}.json` under the `About`
 * namespace — this module keeps the structural keys, the rendering order,
 * and the Lucide icon mapping that callers join in.
 *
 * Consumed by:
 *  - app/[locale]/about/page.tsx
 *
 * Item names are deliberately placeholder until Esteban delivers his real
 * kit list. Marked in the messages file with `_review` flags so the
 * orchestrator doesn't ship invented specs as truth.
 */
export type EquipmentGroupKey =
  | "cameras"
  | "lenses"
  | "drones"
  | "audio"
  | "lighting"
  | "edit";

export type EquipmentGroup = {
  /** Stable key — joins messages and icon lookup. */
  key: EquipmentGroupKey;
  /** Lucide icon paired with the group. */
  Icon: LucideIcon;
  /**
   * Number of item slots rendered. Item strings come from
   * `About.equipment.groups.<key>.items.0..n-1` so translators see every
   * line individually and can flag any placeholder for review.
   */
  itemCount: number;
};

/**
 * Equipment groups in canonical rendering order: capture → optics → aerial →
 * audio → lighting → post. Order is intentional and SEO-stable — don't
 * shuffle without updating the equivalent ordering in the translations file.
 */
export const EQUIPMENT_GROUPS: readonly EquipmentGroup[] = [
  { key: "cameras", Icon: Camera, itemCount: 3 },
  { key: "lenses", Icon: Aperture, itemCount: 4 },
  { key: "drones", Icon: Plane, itemCount: 2 },
  { key: "audio", Icon: Mic, itemCount: 2 },
  { key: "lighting", Icon: Lightbulb, itemCount: 2 },
  { key: "edit", Icon: MonitorPlay, itemCount: 2 },
] as const;
