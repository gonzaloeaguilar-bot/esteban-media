// The words for the needs-first package chooser: one question, four doors.
//
// Owner direction, 2026-10-08 (Esteban by voice, decided with the site operator):
//   - Real estate is the first and highlighted door, because it is the work
//     Esteban most likes doing.
//   - The site stays generalist: the other three doors carry the businesses,
//     the people starting on social, and the people who only need editing.
//   - Prices read like the client proposal he liked (~/code/esteban-propuesta):
//     a big serif number, the unit small beside it, short chips, little text.
//
// NO FIGURES HERE. Every number comes from lib/pricing.ts so one edit there
// changes the chooser, the package pages and the structured data together.

import {
  ARRANQUE_WEEKLY_OPTIONS,
  PACKAGE_PRICES,
  REAL_ESTATE_PLANS,
  type ArranqueWeeklyOption,
  type PackageId,
  type RealEstatePlan,
} from "@/lib/pricing";
import type { Locale } from "@/lib/packages";

export type DoorId = "real-estate" | "business" | "start-social" | "editing";

export type Door = {
  id: DoorId;
  /** The visitor's own sentence: what they would say about themselves. */
  title: string;
  /** Who this door is for, in three or four words. */
  line: string;
  image: { src: string; alt: string };
  /** The "from" figure shown on the closed door, read from lib/pricing.ts. */
  from: { amount: number; unit: string };
  /** The packages this door opens onto, in the order they are shown. */
  packages: PackageId[];
};

/** The order is the owner's: real estate first, then business, social, editing. */
export const DOOR_ORDER: DoorId[] = ["real-estate", "business", "start-social", "editing"];

const lowestRealEstate = Math.min(...REAL_ESTATE_PLANS.map((p) => p.price));
const lowestWeekly = Math.min(...ARRANQUE_WEEKLY_OPTIONS.map((o) => o.pricePerWeek));
const amountOf = (id: PackageId) => {
  const p = PACKAGE_PRICES[id];
  return p.kind === "from" ? p.amount : 0;
};

type ChooserCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  specialty: string;
  from: string;
  open: string;
  close: string;
  doors: Record<DoorId, Omit<Door, "id" | "from" | "packages"> & { unit: string }>;
  realEstate: {
    perMonth: string;
    properties: (n: number) => string;
    posts: (range: string) => string;
    days: (n: number) => string;
    drone: (included: boolean) => string;
    terms: (minimumMonths: number, noticeDays: number) => string;
    more: string;
    everything: string;
  };
  business: {
    lines: Record<"crecimiento" | "presencia-local" | "todo-incluido", string>;
    chips: Record<"crecimiento" | "presencia-local" | "todo-incluido", string[]>;
    custom: string;
  };
  weekly: {
    perWeek: string;
    videos: (n: number) => string;
    chips: { shared: string[]; byOption: Record<ArranqueWeeklyOption["id"], string[]> };
    changes: (n: number) => string;
    paidWeekly: string;
    how: string;
  };
  editing: {
    name: string;
    perVideo: string;
    chips: string[];
    weeklyHint: string;
  };
  quote: string;
  start: string;
  details: string;
};

const COPY: Record<Locale, ChooserCopy> = {
  es: {
    eyebrow: "Paquetes y precios",
    title: "¿Qué necesitas?",
    lead: "Elige lo que más se parece a ti y abre para ver los planes.",
    specialty: "Especialidad",
    from: "desde",
    open: "Ver precios",
    close: "Cerrar",
    doors: {
      "real-estate": {
        title: "Vendo o alquilo propiedades",
        line: "Agentes, inmobiliarias y rentas",
        image: { src: "/illustrations/property.webp", alt: "Ilustración: una casa con cámara y fotos de la propiedad" },
        unit: "/ mes",
      },
      business: {
        title: "Tengo un negocio",
        line: "Restaurante, hotel, salón, tienda",
        image: { src: "/illustrations/business.webp", alt: "Ilustración: un café grabado con un celular en trípode" },
        unit: "/ mes",
      },
      "start-social": {
        title: "Quiero empezar a publicar en redes",
        line: "Tú grabas con tu celular, yo edito",
        image: { src: "/illustrations/carte-ai-content.webp", alt: "Ilustración: claqueta, cámara y fotos para redes" },
        unit: "/ semana",
      },
      editing: {
        title: "Ya tengo videos, solo necesito edición",
        line: "Un video, cuando lo necesites",
        image: { src: "/illustrations/editing.webp", alt: "Ilustración: una pantalla de edición con película y audífonos" },
        unit: "/ video",
      },
    },
    realEstate: {
      perMonth: "/ mes",
      properties: (n) => `${n} ${n === 1 ? "propiedad" : "propiedades"} al mes`,
      posts: (range) => `${range} posts por semana`,
      days: (n) => `${n} días de producción`,
      drone: (included) => (included ? "Dron incluido" : "Dron adicional"),
      terms: (m, d) => `Mínimo ${m} meses · hasta 3,000 SF por propiedad · aviso de ${d} días para cancelar · cargos por zona aparte.`,
      more: "Ver todo lo incluido y precios por sesión",
      everything: "Todos los planes incluyen",
    },
    business: {
      lines: {
        crecimiento: "Redes con plan y ritmo",
        "presencia-local": "Voy a tu negocio y grabo",
        "todo-incluido": "Web, contenido, IA y Google",
      },
      chips: {
        crecimiento: ["Plan de contenido", "Calendario", "Edición incluida", "Reporte mensual"],
        "presencia-local": ["Grabación en tu local", "Edición", "Formatos para redes y web"],
        "todo-incluido": ["Sitio web", "Chatbot con IA", "Google Business", "Contenido"],
      },
      custom: "A medida",
    },
    weekly: {
      perWeek: "/ semana",
      videos: (n) => `${n} ${n === 1 ? "video" : "videos"} por semana`,
      chips: {
        shared: ["Edición + subtítulos", "Música en tendencia"],
        byOption: { "one-per-week": ["Guía de ideas"], "two-per-week": ["Calendario de contenido", "Llamada de estrategia"] },
      },
      changes: (n) => `${n} ${n === 1 ? "cambio" : "cambios"} por video`,
      paidWeekly: "Pago semanal",
      how: "Cómo funciona el pago semanal",
    },
    editing: {
      name: "Un video suelto",
      perVideo: "/ video",
      chips: ["Edición remota", "Reels, TikTok, YouTube o web", "1 ronda de cambios"],
      weeklyHint: "¿Vas a publicar cada semana? Sale más barato por video:",
    },
    quote: "Cotizar por WhatsApp",
    start: "Empezar por WhatsApp",
    details: "Ver detalles",
  },
  en: {
    eyebrow: "Packages and prices",
    title: "What do you need?",
    lead: "Pick the one that sounds like you and open it to see the plans.",
    specialty: "Specialty",
    from: "from",
    open: "See prices",
    close: "Close",
    doors: {
      "real-estate": {
        title: "I sell or rent property",
        line: "Agents, brokerages and rentals",
        image: { src: "/illustrations/property.webp", alt: "Illustration: a house with a camera and listing photos" },
        unit: "/ month",
      },
      business: {
        title: "I have a business",
        line: "Restaurant, hotel, salon, shop",
        image: { src: "/illustrations/business.webp", alt: "Illustration: a café filmed with a phone on a tripod" },
        unit: "/ month",
      },
      "start-social": {
        title: "I want to start posting on social",
        line: "You film on your phone, I edit",
        image: { src: "/illustrations/carte-ai-content.webp", alt: "Illustration: a clapperboard, camera and photos for social" },
        unit: "/ week",
      },
      editing: {
        title: "I already have videos, I just need editing",
        line: "One video, whenever you need it",
        image: { src: "/illustrations/editing.webp", alt: "Illustration: an editing screen with film and headphones" },
        unit: "/ video",
      },
    },
    realEstate: {
      perMonth: "/ month",
      properties: (n) => `${n} ${n === 1 ? "property" : "properties"} a month`,
      posts: (range) => `${range} posts a week`,
      days: (n) => `${n} production days`,
      drone: (included) => (included ? "Drone included" : "Drone add-on"),
      terms: (m, d) => `${m}-month minimum · up to 3,000 SF per property · ${d} days’ notice to cancel · out-of-area fees extra.`,
      more: "See everything included and per-shoot prices",
      everything: "Every plan includes",
    },
    business: {
      lines: {
        crecimiento: "Social with a plan and a rhythm",
        "presencia-local": "I come to your business and film",
        "todo-incluido": "Website, content, AI and Google",
      },
      chips: {
        crecimiento: ["Content plan", "Calendar", "Editing included", "Monthly report"],
        "presencia-local": ["Filmed at your place", "Editing", "Formats for social and web"],
        "todo-incluido": ["Website", "AI chatbot", "Google Business", "Content"],
      },
      custom: "Custom",
    },
    weekly: {
      perWeek: "/ week",
      videos: (n) => `${n} ${n === 1 ? "video" : "videos"} a week`,
      chips: {
        shared: ["Edit + subtitles", "Trending music"],
        byOption: { "one-per-week": ["Ideas guide"], "two-per-week": ["Content calendar", "Strategy call"] },
      },
      changes: (n) => `${n} ${n === 1 ? "change" : "changes"} per video`,
      paidWeekly: "Paid weekly",
      how: "How paying weekly works",
    },
    editing: {
      name: "A single video",
      perVideo: "/ video",
      chips: ["Remote editing", "Reels, TikTok, YouTube or web", "1 revision round"],
      weeklyHint: "Posting every week? It costs less per video:",
    },
    quote: "Quote on WhatsApp",
    start: "Start on WhatsApp",
    details: "Details",
  },
};

export function chooserCopy(locale: Locale): ChooserCopy {
  return COPY[locale];
}

/** The four doors, in the owner's order, with their "from" figures from lib/pricing.ts. */
export function doorsFor(locale: Locale): Door[] {
  const c = COPY[locale].doors;
  const from: Record<DoorId, number> = {
    "real-estate": lowestRealEstate,
    business: amountOf("crecimiento"),
    "start-social": lowestWeekly,
    editing: amountOf("arranque"),
  };
  const packages: Record<DoorId, PackageId[]> = {
    "real-estate": [],
    business: ["crecimiento", "presencia-local", "todo-incluido"],
    "start-social": ["arranque"],
    editing: ["arranque"],
  };
  return DOOR_ORDER.map((id) => ({
    id,
    title: c[id].title,
    line: c[id].line,
    image: c[id].image,
    from: { amount: from[id], unit: c[id].unit },
    packages: packages[id],
  }));
}

/** Short chips for one weekly Starter option: the proposal's own wording. */
export function weeklyChips(option: ArranqueWeeklyOption, locale: Locale): string[] {
  const w = COPY[locale].weekly;
  return [...w.chips.shared, ...w.chips.byOption[option.id], w.changes(option.changesPerVideo)];
}

/** Short chips for one real estate plan. */
export function realEstateChips(plan: RealEstatePlan, locale: Locale): string[] {
  const r = COPY[locale].realEstate;
  return [r.properties(plan.properties), r.posts(plan.postsPerWeek), r.days(plan.productionDays), r.drone(plan.drone === "included")];
}

/** The anchor each door answers to. Old package and real-estate anchors stay on the cards inside. */
export function doorAnchor(id: DoorId): string {
  return `necesidad-${id}`;
}
