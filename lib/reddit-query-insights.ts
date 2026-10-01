export type RedditQueryInsight = {
  id: string;
  sourceUrl: string;
  sourceLabel: string;
  audienceQuestion: {
    en: string;
    es: string;
  };
  searchIntent: {
    en: string;
    es: string;
  };
  contentAngle: {
    en: string;
    es: string;
  };
  keywordTargets: readonly {
    en: string;
    es: string;
  }[];
  internalLinks: readonly {
    en: string;
    es: string;
  }[];
};

export const redditQueryInsights: readonly RedditQueryInsight[] = [
  {
    id: "reels-pricing-scope",
    sourceUrl:
      "https://www.reddit.com/r/videography/comments/1dmw8zl/how_much_to_charge_for_editing_30_reels_a_month/",
    sourceLabel: "r/videography: monthly reels pricing",
    audienceQuestion: {
      en: "How much should a business budget for a month of edited reels?",
      es: "Cuánto debe presupuestar un negocio para un mes de reels editados?",
    },
    searchIntent: {
      en: "pricing, monthly reels, revisions, cutdowns, remote editing",
      es: "precios, reels mensuales, revisiones, versiones cortas, edicion remota",
    },
    contentAngle: {
      en: "Explain that the useful quote starts with scope: number of finished videos, raw footage volume, captions, music, revision rounds, turnaround, and whether the project is remote editing or local capture.",
      es: "Explicar que una cotizacion util empieza por alcance: cantidad de videos finales, volumen de material, subtitulos, musica, rondas de revision, plazo y si el proyecto es edicion remota o grabacion local.",
    },
    keywordTargets: [
      {
        en: "monthly reels editing package",
        es: "paquete mensual de edicion de reels",
      },
      {
        en: "remote video editor for social media",
        es: "editor de video remoto para redes sociales",
      },
      {
        en: "how much does video editing cost",
        es: "cuanto cuesta editar un video",
      },
    ],
    internalLinks: [
      {
        en: "/pricing",
        es: "/es/precios",
      },
      {
        en: "/guides/video-production-cost-fort-lauderdale",
        es: "/es/guias/cuanto-cuesta-la-produccion-de-video-en-fort-lauderdale",
      },
      {
        en: "/guides/how-to-repurpose-long-form-video-into-reels",
        es: "/es/guias/como-reutilizar-video-largo-en-reels",
      },
    ],
  },
  {
    id: "remote-file-handoff",
    sourceUrl:
      "https://www.reddit.com/r/videography/comments/1tqd338/how_do_i_charge/",
    sourceLabel: "r/videography: first client scope",
    audienceQuestion: {
      en: "What does a remote editor need before quoting a video project?",
      es: "Que necesita un editor remoto antes de cotizar un proyecto de video?",
    },
    searchIntent: {
      en: "brief, footage handoff, project-based quote, revision limit",
      es: "brief, entrega de material, cotizacion por proyecto, limite de revisiones",
    },
    contentAngle: {
      en: "Teach business owners to send the goal, platform, raw footage, must-use clips, brand assets, due date, and revision expectations before asking for a fixed project quote.",
      es: "Ensenar a los negocios a enviar objetivo, plataforma, material bruto, clips obligatorios, assets de marca, fecha limite y expectativas de revision antes de pedir una cotizacion fija.",
    },
    keywordTargets: [
      {
        en: "video editing brief",
        es: "brief de edicion de video",
      },
      {
        en: "send files to video editor",
        es: "enviar archivos a editor de video",
      },
      {
        en: "remote video editing handoff",
        es: "entrega para edicion remota de video",
      },
    ],
    internalLinks: [
      {
        en: "/guides/write-a-useful-video-brief",
        es: "/es/guias/como-escribir-un-brief-util-de-video",
      },
      {
        en: "/guides/remote-video-editing-handoff",
        es: "/es/guias/entrega-para-edicion-remota-de-video",
      },
      {
        en: "/contact",
        es: "/es/contacto",
      },
    ],
  },
  {
    id: "ai-product-photo-trust",
    sourceUrl:
      "https://www.reddit.com/r/ecommerce/comments/1togsfu/best_ai_product_image_generator_for_lifestyle/",
    sourceLabel: "r/ecommerce: AI product lifestyle images",
    audienceQuestion: {
      en: "When should a store use AI product images instead of a photo shoot?",
      es: "Cuando conviene usar imagenes de producto con IA en vez de una sesion de fotos?",
    },
    searchIntent: {
      en: "AI product photography, lifestyle images, ecommerce ads, color accuracy",
      es: "fotografia de producto con IA, imagenes lifestyle, anuncios ecommerce, color real",
    },
    contentAngle: {
      en: "Separate safe AI uses, like ad concepts and simple lifestyle backgrounds, from risky uses where packaging text, colors, reflective surfaces, or exact product dimensions must stay truthful.",
      es: "Separar usos seguros de IA, como conceptos para anuncios y fondos lifestyle simples, de usos riesgosos donde texto de empaque, colores, reflejos o dimensiones exactas deben mantenerse fieles.",
    },
    keywordTargets: [
      {
        en: "AI product photography for ecommerce",
        es: "fotografia de producto con IA para ecommerce",
      },
      {
        en: "AI lifestyle product images",
        es: "imagenes lifestyle de producto con IA",
      },
      {
        en: "product photo editing Miami",
        es: "edicion de fotos de producto Miami",
      },
    ],
    internalLinks: [
      {
        en: "/services/ai-product-photography-miami",
        es: "/es/fotografia-de-producto-con-ia-miami",
      },
      {
        en: "/guides/how-to-use-ai-for-product-photography",
        es: "/es/guias/como-usar-inteligencia-artificial-para-fotografia-de-producto",
      },
      {
        en: "/guides/ai-product-photography-vs-traditional-studio",
        es: "/es/guias/fotografia-de-producto-con-ia-vs-estudio-tradicional",
      },
    ],
  },
  {
    id: "real-estate-ai-honesty",
    sourceUrl:
      "https://www.reddit.com/r/RealEstatePhotography/comments/1wi9lxw/my_first_shoot_horrible_ai_editing/",
    sourceLabel: "r/RealEstatePhotography: AI editing concerns",
    audienceQuestion: {
      en: "How can real estate photos use AI without making a property look fake?",
      es: "Como usar IA en fotos inmobiliarias sin que la propiedad se vea falsa?",
    },
    searchIntent: {
      en: "real estate photo enhancement, AI editing, accurate colors, window pulls",
      es: "mejora de fotos inmobiliarias, edicion con IA, colores precisos, ventanas",
    },
    contentAngle: {
      en: "Answer with a truth-first checklist: preserve room layout, window views, fixtures, colors, floors, ceilings, and anything a buyer could inspect in person.",
      es: "Responder con una lista de fidelidad: conservar distribucion, vistas por ventanas, acabados, colores, pisos, techos y cualquier detalle que el comprador pueda ver en persona.",
    },
    keywordTargets: [
      {
        en: "AI real estate photo enhancement",
        es: "mejora de fotos inmobiliarias con IA",
      },
      {
        en: "real estate photo editing Florida",
        es: "edicion de fotos inmobiliarias Florida",
      },
      {
        en: "real estate media editing remote",
        es: "edicion remota de media inmobiliaria",
      },
    ],
    internalLinks: [
      {
        en: "/services/ai-real-estate-photo-enhancement",
        es: "/es/fotos-con-ia-para-bienes-raices-miami",
      },
      {
        en: "/pricing/real-estate",
        es: "/es/precios/inmobiliaria",
      },
      {
        en: "/guides/drone-video-editing-guidelines-florida",
        es: "/es/guias/guias-de-edicion-de-video-con-dron-florida",
      },
    ],
  },
];
