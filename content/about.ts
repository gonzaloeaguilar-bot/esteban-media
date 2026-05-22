/**
 * About-page structural content for Esteban Moreno Media.
 *
 * Why this file exists:
 *  - The About page mixes typed structured data (equipment list grouped by
 *    category) with translated visible strings. Names, taglines, and bio prose
 *    live in `messages/{locale}.json` under the `About` namespace. The
 *    structural skeleton — which groups exist, in what order, and how many
 *    items each contains — lives here.
 *  - Same pattern as `lib/services.ts`: the page loops over these IDs and
 *    pulls translated copy via `useTranslations`/`getTranslations`. If a
 *    message key is missing the page throws a loud `MISSING_MESSAGE` at
 *    static-generation time — that's a feature, not a bug.
 *
 * TODO: real equipment list from Esteban. The kit below is a representative
 * placeholder — modern pro hybrid + drone + audio + glass. Swap with
 * Esteban's actual gear once he confirms.
 */

/** A single equipment line item. Translation key: `About.equipment.items.<id>`. */
export type EquipmentItem = {
  /** Stable slug used as i18n key + React key. Snake/kebab safe ASCII. */
  id: string;
};

/** A category of equipment (cameras, lenses, drones, audio, post). */
export type EquipmentGroup = {
  /** Stable slug. Translated label key: `About.equipment.groups.<id>.label`. */
  id: string;
  /** Items in canonical display order. */
  items: readonly EquipmentItem[];
};

/**
 * Equipment grouped by capability. Order intentional: capture (cameras →
 * lenses → drones) → audio → post. Reads top-down as "what touches the
 * story from first photon to final cut."
 *
 * Counts kept small (3–5 per group) so the list reads as confident rather
 * than padded. Real list from Esteban will likely trim or expand individual
 * groups — the page renders whatever ships here.
 */
export const EQUIPMENT_GROUPS: readonly EquipmentGroup[] = [
  {
    id: "cameras",
    items: [
      { id: "primary-hybrid" },
      { id: "secondary-hybrid" },
      { id: "backup-mirrorless" },
    ],
  },
  {
    id: "lenses",
    items: [
      { id: "wide-zoom" },
      { id: "standard-zoom" },
      { id: "telephoto-zoom" },
      { id: "portrait-prime" },
      { id: "macro-prime" },
    ],
  },
  {
    id: "drones",
    items: [
      { id: "cinema-drone" },
      { id: "compact-drone" },
    ],
  },
  {
    id: "audio-lighting",
    items: [
      { id: "shotgun-mic" },
      { id: "wireless-lav" },
      { id: "field-recorder" },
      { id: "led-panels" },
    ],
  },
  {
    id: "post",
    items: [
      { id: "color-grading-suite" },
      { id: "edit-workstation" },
      { id: "calibrated-display" },
    ],
  },
] as const;

/** All group IDs in canonical order — handy for type narrowing. */
export const EQUIPMENT_GROUP_IDS = EQUIPMENT_GROUPS.map((g) => g.id);
