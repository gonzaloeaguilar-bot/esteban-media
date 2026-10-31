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
 * To change a price, change it in lib/pricing.ts (the single source of truth,
 * 2026-10-28). This file only arranges those figures into published line items.
 */

import {
  COMMERCIAL_VIDEO_TIERS,
  CREW_RECORDING_RATES,
  ON_SITE_ADD_ONS,
  REAL_ESTATE_DRONE_PHOTO_ADD_ON,
  REAL_ESTATE_MEDIA_PRICES,
  TURNKEY_PRODUCTION_BUNDLES,
  YACHT_PRODUCTION,
} from "@/lib/pricing";

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
    { minSf: 0, maxSf: 1500, amount: REAL_ESTATE_MEDIA_PRICES.photoTiers[0], label: { en: "Up to 1,500 SF", es: "Hasta 1,500 SF" } },
    { minSf: 1501, maxSf: 3000, amount: REAL_ESTATE_MEDIA_PRICES.photoTiers[1], label: { en: "1,501 – 3,000 SF", es: "1,501 – 3,000 SF" } },
    { minSf: 3001, maxSf: 4500, amount: REAL_ESTATE_MEDIA_PRICES.photoTiers[2], label: { en: "3,001 – 4,500 SF", es: "3,001 – 4,500 SF" } },
    { minSf: 4501, maxSf: 6000, amount: REAL_ESTATE_MEDIA_PRICES.photoTiers[3], label: { en: "4,501 – 6,000 SF", es: "4,501 – 6,000 SF" } },
    { minSf: 6001, maxSf: 8000, amount: REAL_ESTATE_MEDIA_PRICES.photoTiers[4], label: { en: "6,001 – 8,000 SF", es: "6,001 – 8,000 SF" } },
    // Deliberately `null`: the card says "Call to discuss". Putting a figure
    // here would invent a price Esteban does not quote.
    { minSf: 8001, maxSf: null, amount: null, label: { en: "8,000+ SF", es: "8,000+ SF" } },
  ] satisfies SizeTier[],

  addOns: [
    {
      id: "drone-photography",
      name: { en: "Drone photography", es: "Fotografía con dron" },
      amount: REAL_ESTATE_DRONE_PHOTO_ADD_ON,
      note: {
        en: "Typically 8–10 images, depending on the listing's features.",
        es: "Normalmente 8–10 imágenes, según las características de la propiedad.",
      },
    },
    {
      id: "zillow-3d-tour",
      name: { en: "Zillow 3D tour", es: "Recorrido 3D de Zillow" },
      amount: REAL_ESTATE_MEDIA_PRICES.zillow3dTourFrom,
      from: true,
      note: { en: "Price varies with home size.", es: "El precio varía según el tamaño." },
    },
    {
      id: "premium-listing-video",
      name: { en: "Premium listing video", es: "Video premium de la propiedad" },
      amount: REAL_ESTATE_MEDIA_PRICES.premiumListingVideoPerMinute,
      unit: "per-minute",
    },
  ] satisfies LineItem[],

  fees: [
    {
      id: "out-of-area",
      name: { en: "Out of area", es: "Fuera del área" },
      amount: REAL_ESTATE_MEDIA_PRICES.outOfAreaFee,
      note: {
        en: "North of West Palm Beach or south of Hollywood.",
        es: "Al norte de West Palm Beach o al sur de Hollywood.",
      },
    },
    {
      id: "reshoot",
      name: { en: "Reshoot", es: "Repetición de sesión" },
      amount: REAL_ESTATE_MEDIA_PRICES.reshootFee,
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

/**
 * On-site recording, multi-camera, yacht charter and turnkey production rate card.
 * Single source of truth for commercial event, corporate, and marine shoots.
 */
export const ON_SITE_PRODUCTION_RATES = {
  id: "on-site-production-rates",
  currency: "USD" as Currency,
  tiers: [
    {
      id: "solo-videographer",
      name: { en: "Solo Videographer (1 Camera)", es: "Videógrafo individual (1 Cámara)" },
      hourly: CREW_RECORDING_RATES.solo.hourly,
      minimumHours: CREW_RECORDING_RATES.solo.minimumHours,
      halfDay: CREW_RECORDING_RATES.solo.halfDay,
      fullDay: CREW_RECORDING_RATES.solo.fullDay,
      turnkeyHalfDay: TURNKEY_PRODUCTION_BUNDLES.soloHalfDay,
      turnkeyFullDay: TURNKEY_PRODUCTION_BUNDLES.soloFullDay,
      gear: { en: "Sony Alpha 7 IV 4K + handheld gimbal + wireless mic kit", es: "Sony Alpha 7 IV 4K + gimbal de mano + microfonía inalámbrica" },
    },
    {
      id: "two-person-event-crew",
      name: { en: "Two-Person Event Crew (Lead DP + Mobile Content Creator)", es: "Equipo de 2 personas para eventos (DP principal + Creador de contenido móvil)" },
      hourly: CREW_RECORDING_RATES.twoPerson.hourly,
      minimumHours: CREW_RECORDING_RATES.twoPerson.minimumHours,
      halfDay: CREW_RECORDING_RATES.twoPerson.halfDay,
      fullDay: CREW_RECORDING_RATES.twoPerson.fullDay,
      turnkeyHalfDay: TURNKEY_PRODUCTION_BUNDLES.twoPersonHalfDay,
      turnkeyFullDay: TURNKEY_PRODUCTION_BUNDLES.twoPersonFullDay,
      gear: { en: "1 4K Cinema Camera + 2 iPhones on gimbals for instant vertical Reels/BTS", es: "1 Cámara 4K + 2 iPhones en gimbals para Reels verticales y BTS instantáneos" },
    },
    {
      id: "multi-camera-stage",
      name: { en: "Multi-Camera Production (2–3 Cameras + Audio Board)", es: "Producción multicámara (2–3 Cámaras + Audio de consola)" },
      hourly: CREW_RECORDING_RATES.multiCamera.hourly,
      minimumHours: CREW_RECORDING_RATES.multiCamera.minimumHours,
      halfDay: CREW_RECORDING_RATES.multiCamera.halfDay,
      fullDay: CREW_RECORDING_RATES.multiCamera.fullDay,
      turnkeyHalfDay: TURNKEY_PRODUCTION_BUNDLES.multiCamHalfDay,
      turnkeyFullDay: TURNKEY_PRODUCTION_BUNDLES.multiCamFullDay,
      gear: { en: "2–3 4K cameras + direct XLR soundboard feed + multi-track wireless lavaliers", es: "2–3 cámaras 4K + audio directo de consola XLR + micrófonos de solapa multicanal" },
    },
    {
      id: "yacht-marine-production",
      name: { en: "Yacht & Marine Production (Charter Shoots)", es: "Producción en yates y marina (Sesiones en chárter)" },
      halfDay: YACHT_PRODUCTION.halfDaySolo,
      fullDay: YACHT_PRODUCTION.fullDaySolo,
      turnkeyHalfDay: TURNKEY_PRODUCTION_BUNDLES.yachtHalfDay,
      turnkeyFullDay: TURNKEY_PRODUCTION_BUNDLES.yachtFullDay,
      note: { en: "Requires half-day or full-day booking. Active gimbal stabilization, marine deck care.", es: "Requiere media jornada o jornada completa. Estabilización activa con gimbal, cuidado de cubierta." },
    },
    {
      id: "commercial-product-demo-basic",
      name: { en: "Basic Product Demo / Kickstarter (Founder-Led)", es: "Demo comercial básico / Kickstarter (Fundador)" },
      turnkey: COMMERCIAL_VIDEO_TIERS.basic.from,
      note: { en: "Founder interview + macro product demo, 3.5-hr on-location shoot + 60-90s edit", es: "Entrevista al fundador + demo macro de producto en locación, 3.5h de rodaje + edición de 60-90 seg" },
    },
    {
      id: "commercial-brand-narrative-premium",
      name: { en: "Premium Brand Film / Narrative Commercial", es: "Brand film narrativo / Comercial premium" },
      turnkey: COMMERCIAL_VIDEO_TIERS.brandNarrative.from,
      note: { en: "Full-day shoot with 2-person crew, cinematic lighting, 60-120s hero video + 3 social ad hooks", es: "Jornada completa con crew de 2 personas, iluminación de cine, video de 60-120 seg + 3 ganchos para pauta" },
    },
    {
      id: "commercial-actors-studio-full",
      name: { en: "Commercial Production with Professional Actors & Studio", es: "Comercial publicitario con actores profesionales y estudio" },
      turnkeyMin: COMMERCIAL_VIDEO_TIERS.actorsAndStudio.fromMin,
      turnkeyMax: COMMERCIAL_VIDEO_TIERS.actorsAndStudio.fromMax,
      note: { en: "Soundstage/cyc studio rental, professional actor casting (1-2 talent with commercial buyout), HMUA, 3-4 person crew, custom sound mix", es: "Renta de estudio/ciclorama, casting de actores profesionales (1-2 con derechos comerciales), estilismo, crew de 3-4 personas y masterización multiformato" },
    },
  ],
  addOns: [
    { id: "soundboard-audio", name: { en: "Soundboard Direct XLR Audio Feed", es: "Toma directa de audio de consola XLR" }, amount: ON_SITE_ADD_ONS.soundboardAudio },
    { id: "marine-drone", name: { en: "Licensed Marine Drone Aerials (Over-Water)", es: "Tomas aéreas con dron en agua (Licencia FAA)" }, amount: ON_SITE_ADD_ONS.marineDrone },
    { id: "mobile-teleprompter", name: { en: "Mobile Teleprompter Kit", es: "Kit de teleprompter móvil" }, amount: ON_SITE_ADD_ONS.mobileTeleprompter },
    { id: "rapid-ssd-wrap", name: { en: "On-Site Fast NVMe SSD Footage Delivery", es: "Entrega inmediata de material en SSD NVMe rápido" }, amount: ON_SITE_ADD_ONS.rapidSsdDelivery },
  ],
} as const;
