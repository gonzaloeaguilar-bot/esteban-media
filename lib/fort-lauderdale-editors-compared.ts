import { PACKAGE_PRICES, SHORT_FORM, usd } from "@/lib/pricing";

export type FortLauderdaleEditorRow = {
  name: string;
  city: string;
  specialty: {
    en: string;
    es: string;
  };
  startingPrice: {
    en: string;
    es: string;
  };
  sourceUrl: string;
  checkDate: string;
};

export const CHECKED_DATE = "2026-11-04";

const starterPrice = usd(PACKAGE_PRICES.arranque.kind === "from" ? PACKAGE_PRICES.arranque.amount : SHORT_FORM.perVideoFrom);

export const FORT_LAUDERDALE_EDITORS_COMPARED: readonly FortLauderdaleEditorRow[] = [
  {
    name: "Mark Studios",
    city: "Fort Lauderdale",
    specialty: {
      en: "Video editing, motion design, and growth strategy for creators and brands",
      es: "Edición de video, diseño de movimiento y estrategia de crecimiento para marcas",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://markstudios.com",
    checkDate: CHECKED_DATE,
  },
  {
    name: "Zip In Media",
    city: "Fort Lauderdale",
    specialty: {
      en: "Corporate video, event coverage, live stream, and video production",
      es: "Video corporativo, cobertura de eventos, transmisión en vivo y producción",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://zipinmedia.com",
    checkDate: CHECKED_DATE,
  },
  {
    name: "Digital Cut",
    city: "Fort Lauderdale",
    specialty: {
      en: "Commercial and corporate video production with 20+ years in South Florida",
      es: "Producción de video comercial y corporativo con más de 20 años en South Florida",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://digitalcut.biz",
    checkDate: CHECKED_DATE,
  },
  {
    name: "1 Oak Studios",
    city: "Miami / Fort Lauderdale",
    specialty: {
      en: "Luxury real estate media, creative agency services, and commercial video",
      es: "Medios para bienes raíces de lujo, servicios de agencia creativa y video comercial",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://1oakstudios.com",
    checkDate: CHECKED_DATE,
  },
  {
    name: "C&I Studios",
    city: "Fort Lauderdale",
    specialty: {
      en: "Global creative studio for video production, photography, and brand design",
      es: "Estudio creativo global para producción de video, fotografía y diseño de marca",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://c-istudios.com",
    checkDate: CHECKED_DATE,
  },
  {
    name: "Team Unity Media",
    city: "Fort Lauderdale",
    specialty: {
      en: "Brand storytelling, commercial cinematography, and video production",
      es: "Narrativa de marca, cinematografía comercial y producción de video",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://teamunitymedia.com",
    checkDate: CHECKED_DATE,
  },
  {
    name: "Shout Creative",
    city: "Fort Lauderdale",
    specialty: {
      en: "Corporate video production and commercial videography in Fort Lauderdale",
      es: "Producción de video corporativo y videografía comercial en Fort Lauderdale",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://shoutcreative.tv",
    checkDate: CHECKED_DATE,
  },
  {
    name: "Optic Vault Marketing",
    city: "Miami / Fort Lauderdale",
    specialty: {
      en: "Contractor marketing agency, Meta and Google advertising, and video",
      es: "Marketing para contratistas, anuncios en Meta y Google y video comercial",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://opticvaultmarketing.com",
    checkDate: CHECKED_DATE,
  },
  {
    name: "Mile 1 Media",
    city: "Fort Lauderdale",
    specialty: {
      en: "Commercial video production, branded content, and corporate films",
      es: "Producción de video comercial, contenido de marca y películas corporativas",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://mile1media.com",
    checkDate: CHECKED_DATE,
  },
  {
    name: "Ball Media Innovations",
    city: "Fort Lauderdale / Miami",
    specialty: {
      en: "Corporate, event, and medical video production and editing",
      es: "Producción y edición de video corporativo, médico y de eventos",
    },
    startingPrice: {
      en: "From $250 (editing from $250; video from $1,200)",
      es: "Desde $250 (edición desde $250; video desde $1,200)",
    },
    sourceUrl: "https://ballmediainnovations.com/our-pricing/",
    checkDate: CHECKED_DATE,
  },
  {
    name: "Sandy Algeciras",
    city: "Palm Beach Gardens / South Florida",
    specialty: {
      en: "Cinematic real estate marketing, property walkthroughs, and listing visuals",
      es: "Marketing inmobiliario cinematográfico, recorridos de propiedades y video",
    },
    startingPrice: {
      en: "not published",
      es: "no publicado",
    },
    sourceUrl: "https://twine.net/SAlgeciras",
    checkDate: CHECKED_DATE,
  },
  {
    name: "Esteban Moreno Media",
    city: "Fort Lauderdale",
    specialty: {
      en: "Short-form video editing (Reels, TikTok, Shorts) from supplied clips",
      es: "Edición de video corto (Reels, TikTok, Shorts) con material propio",
    },
    startingPrice: {
      en: `From ${starterPrice} per video`,
      es: `Desde ${starterPrice} por video`,
    },
    sourceUrl: "https://estebanmorenomedia.com/pricing",
    checkDate: CHECKED_DATE,
  },
];
