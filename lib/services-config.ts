/**
 * The configurable price and service list.
 *
 * Source: Esteban's own rate cards, September 2026. One of the three documents
 * he sent is the PUBLIC card; the other two are a specific client's negotiated
 * terms. Only the public one is in this file, and the reason is not style:
 * **this repository became public on 2026-09-29**, so a client's negotiated rate
 * committed here would publish their commercial terms to anyone who looks. The
 * client-specific cards live in the private vault at
 * `~/obsidian-wiki/client-esteban-media/`, and `app/__tests__/services-config.test.ts`
 * fails if one of those figures ever appears in the repo.
 *
 * Everything here is a PUBLISHED rate, not an estimate: unlike the package
 * floors in `lib/pricing.ts`, which are starting points that always end in a
 * scoped quote, these are the prices Esteban charges for a listing shoot of a
 * known size. That is why they carry an exact figure and not a "from".
 *
 * To change a price, change it here. Nothing else should hold a figure.
 */

export type Currency = "USD";

export type SizeTier = {
  /** Square feet, inclusive. `maxSf: null` means "and above". */
  minSf: number;
  maxSf: number | null;
  /** `null` = quoted individually, never invent a number for it. */
  amount: number | null;
  label: { en: string; es: string };
};

export type LineItem = {
  id: string;
  name: { en: string; es: string };
  /** `null` when the price depends on scope and is quoted. */
  amount: number | null;
  /** How the amount is charged. `flat` unless stated. */
  unit?: "flat" | "per-minute" | "per-month";
  /** Shown as "starting at" rather than a fixed price. */
  from?: boolean;
  note?: { en: string; es: string };
};

/**
 * Real-estate listing media — photo, drone and video for South Florida
 * listings. A service line the site does not sell yet, priced by home size.
 */
export const REAL_ESTATE_MEDIA = {
  id: "real-estate-listing-media",
  name: {
    en: "Real estate listing media",
    es: "Media para propiedades en venta",
  },
  summary: {
    en: "Photo, drone and video for South Florida listings, priced by home size.",
    es: "Foto, dron y video para propiedades del sur de Florida, con precio por tamaño.",
  },
  currency: "USD" as Currency,

  /** Listing photography, by home size. */
  photography: [
    { minSf: 0, maxSf: 1500, amount: 199, label: { en: "Up to 1,500 SF", es: "Hasta 1,500 SF" } },
    { minSf: 1501, maxSf: 3000, amount: 249, label: { en: "1,501 – 3,000 SF", es: "1,501 – 3,000 SF" } },
    { minSf: 3001, maxSf: 4500, amount: 299, label: { en: "3,001 – 4,500 SF", es: "3,001 – 4,500 SF" } },
    { minSf: 4501, maxSf: 6000, amount: 399, label: { en: "4,501 – 6,000 SF", es: "4,501 – 6,000 SF" } },
    { minSf: 6001, maxSf: 8000, amount: 499, label: { en: "6,001 – 8,000 SF", es: "6,001 – 8,000 SF" } },
    // Deliberately `null`: the card says "Call to discuss". Putting a figure
    // here would invent a price Esteban does not quote.
    { minSf: 8001, maxSf: null, amount: null, label: { en: "8,000+ SF", es: "8,000+ SF" } },
  ] satisfies SizeTier[],

  addOns: [
    {
      id: "drone-photography",
      name: { en: "Drone photography", es: "Fotografía con dron" },
      amount: 99,
      note: {
        en: "Typically 8–10 images, depending on the listing's features.",
        es: "Normalmente 8–10 imágenes, según las características de la propiedad.",
      },
    },
    {
      id: "zillow-3d-tour",
      name: { en: "Zillow 3D tour", es: "Recorrido 3D de Zillow" },
      amount: 149,
      from: true,
      note: { en: "Price varies with home size.", es: "El precio varía según el tamaño." },
    },
    {
      id: "premium-listing-video",
      name: { en: "Premium listing video", es: "Video premium de la propiedad" },
      amount: 200,
      unit: "per-minute",
    },
  ] satisfies LineItem[],

  fees: [
    {
      id: "out-of-area",
      name: { en: "Out of area", es: "Fuera del área" },
      amount: 75,
      note: {
        en: "North of West Palm Beach or south of Hollywood.",
        es: "Al norte de West Palm Beach o al sur de Hollywood.",
      },
    },
    {
      id: "reshoot",
      name: { en: "Reshoot", es: "Repetición de sesión" },
      amount: 100,
      note: {
        en: "For any reason other than photographer error, including weather. 10 photo maximum.",
        es: "Por cualquier motivo que no sea un error del fotógrafo, incluido el clima. Máximo 10 fotos.",
      },
    },
  ] satisfies LineItem[],

  /** Conditions Esteban prints on the card. Publish them WITH the prices. */
  terms: {
    en: "All sales are final. Difficult circumstances are accommodated where possible, but no refunds are given.",
    es: "Todas las ventas son definitivas. Se atiende cualquier circunstancia difícil en lo posible, pero no se hacen reembolsos.",
  },

  referral: {
    en: "Refer a friend and get free aerial photos on your next shoot.",
    es: "Recomienda a alguien y recibe fotos aéreas gratis en tu próxima sesión.",
  },
} as const;

/** The exact price for a listing of a given size, or null when it is quoted. */
export function listingPhotographyPrice(squareFeet: number): number | null {
  const tier = REAL_ESTATE_MEDIA.photography.find(
    (t) => squareFeet >= t.minSf && (t.maxSf === null || squareFeet <= t.maxSf),
  );
  // An unmatched size is a gap in the table, not a free shoot.
  if (!tier) throw new Error(`no listing photography tier covers ${squareFeet} SF`);
  return tier.amount;
}
