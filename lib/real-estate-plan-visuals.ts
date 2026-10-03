import type { RealEstatePlan } from "@/lib/pricing";

/** Concept scenes describe plan volume, not actual properties or promised results. */
export const REAL_ESTATE_PLAN_VISUALS: Record<RealEstatePlan["id"], {
  image: string; illustratedProperties: number; includedDrone: boolean;
  en: { line: string; alt: string }; es: { line: string; alt: string };
}> = {
  essential: {
    image: "/illustrations/property.webp", illustratedProperties: 1, includedDrone: false,
    en: { line: "One listing. A steady start.", alt: "Concept illustration of one property with a camera and listing photographs" },
    es: { line: "Una propiedad. Un buen comienzo.", alt: "Ilustración conceptual de una propiedad con cámara y fotografías del inmueble" },
  },
  plus: {
    image: "/illustrations/property-plus.webp", illustratedProperties: 2, includedDrone: false,
    en: { line: "Two listings. More to share.", alt: "Concept illustration of two properties and a phone filming real estate content" },
    es: { line: "Dos propiedades. Más para compartir.", alt: "Ilustración conceptual de dos propiedades y un celular grabando contenido inmobiliario" },
  },
  premium: {
    image: "/illustrations/property-premium.webp", illustratedProperties: 3, includedDrone: true,
    en: { line: "Three listings. Drone included.", alt: "Concept illustration of three properties with a drone for aerial photography" },
    es: { line: "Tres propiedades. Dron incluido.", alt: "Ilustración conceptual de tres propiedades con un dron para fotografía aérea" },
  },
};
