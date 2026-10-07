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
  {
    id: "youtube-editor-handoff",
    sourceUrl:
      "https://www.reddit.com/r/youtubers/comments/17mk6e5/how_do_i_find_a_video_editor/",
    sourceLabel: "r/youtubers: finding an editor",
    audienceQuestion: {
      en: "What should I send before hiring a YouTube video editor?",
      es: "Que debo enviar antes de contratar un editor de video para YouTube?",
    },
    searchIntent: {
      en: "YouTube editor, remote editing, long-form video, examples, revision workflow",
      es: "editor de YouTube, edicion remota, video largo, ejemplos, flujo de revisiones",
    },
    contentAngle: {
      en: "Answer with a practical handoff: the goal of the channel, one sample finished video, raw footage, audio notes, must-keep moments, thumbnail direction, and how feedback will be collected.",
      es: "Responder con una entrega practica: meta del canal, un video final de referencia, material bruto, notas de audio, momentos obligatorios, direccion de miniatura y forma de consolidar comentarios.",
    },
    keywordTargets: [
      {
        en: "hire a remote YouTube video editor",
        es: "contratar editor remoto de video para YouTube",
      },
      {
        en: "YouTube video editing service Miami",
        es: "servicio de edicion de video para YouTube Miami",
      },
      {
        en: "video project brief template",
        es: "plantilla de brief para video",
      },
    ],
    internalLinks: [
      {
        en: "/services/youtube-video-editing-service-miami",
        es: "/es/servicio-de-edicion-de-video-para-youtube-miami",
      },
      {
        en: "/services/hire-remote-video-editor",
        es: "/es/contacto",
      },
      {
        en: "/resources/video-project-brief-template",
        es: "/es/guias/como-escribir-un-brief-util-de-video",
      },
    ],
  },
  {
    id: "ugc-product-ad-editing",
    sourceUrl:
      "https://www.reddit.com/r/PPC/comments/18f63bd/how_do_you_make_good_ugc_ads/",
    sourceLabel: "r/PPC: UGC ad structure",
    audienceQuestion: {
      en: "What makes a UGC product video usable as an ad?",
      es: "Que hace que un video UGC de producto funcione como anuncio?",
    },
    searchIntent: {
      en: "UGC video editor, ecommerce ad editing, product hooks, direct response creative",
      es: "editor de video UGC, edicion de anuncios ecommerce, ganchos de producto, creativo direct response",
    },
    contentAngle: {
      en: "Focus on the edit structure: first-frame hook, visible product, problem, proof or use moment, offer, captions, safe zones, and separate versions for tests instead of one overstuffed ad.",
      es: "Enfocarse en estructura de edicion: gancho inicial, producto visible, problema, prueba o momento de uso, oferta, subtitulos, zonas seguras y versiones separadas para pruebas.",
    },
    keywordTargets: [
      {
        en: "UGC video editor for ecommerce",
        es: "editor de video UGC para ecommerce",
      },
      {
        en: "product video ad editor",
        es: "editor de anuncios de video de producto",
      },
      {
        en: "TikTok ad video editor Miami",
        es: "editor de video para anuncios de TikTok Miami",
      },
    ],
    internalLinks: [
      {
        en: "/services/ugc-video-editor-ecommerce",
        es: "/es/editor-de-video-ugc-para-ecommerce",
      },
      {
        en: "/services/ecommerce-product-video-editor-miami",
        es: "/es/editor-de-video-de-productos-para-ecommerce",
      },
      {
        en: "/resources/social-video-kit",
        es: "/es/recursos/kit-video-social",
      },
    ],
  },
  {
    id: "restaurant-reels-practicality",
    sourceUrl:
      "https://www.reddit.com/r/restaurateur/comments/1bmg2h4/how_are_you_making_social_media_content/",
    sourceLabel: "r/restaurateur: social content operations",
    audienceQuestion: {
      en: "What restaurant footage is worth sending to an editor?",
      es: "Que material de restaurante vale la pena enviar a un editor?",
    },
    searchIntent: {
      en: "restaurant promo video editing, food reels, local restaurant social media",
      es: "edicion de video promocional para restaurantes, reels de comida, redes para restaurantes locales",
    },
    contentAngle: {
      en: "Teach owners to capture the food coming out, hands plating, the room, menu items, staff moments, and one clear offer, then package it into reels instead of trying to film a full commercial every week.",
      es: "Ensenar a dueños a capturar comida saliendo, manos emplatando, el local, items del menu, equipo y una oferta clara, para convertirlo en reels sin filmar un comercial completo cada semana.",
    },
    keywordTargets: [
      {
        en: "restaurant promo video editing Miami",
        es: "edicion de video promocional para restaurantes Miami",
      },
      {
        en: "food reels editor",
        es: "editor de reels de comida",
      },
      {
        en: "restaurant social video package",
        es: "paquete de video social para restaurantes",
      },
    ],
    internalLinks: [
      {
        en: "/services/restaurant-promo-video-editing-miami",
        es: "/es/edicion-de-video-promocional-para-restaurantes-miami",
      },
      {
        en: "/guides/video-content-ideas-for-restaurants",
        es: "/es/guias/ideas-de-contenido-de-video-para-restaurantes",
      },
      {
        en: "/portfolio/bar-door-monkey",
        es: "/es/portafolio/bar-door-monkey",
      },
    ],
  },
  {
    id: "bilingual-remote-service",
    sourceUrl:
      "https://www.reddit.com/r/smallbusiness/comments/1cthrlm/how_do_you_find_reliable_freelancers/",
    sourceLabel: "r/smallbusiness: hiring freelancers",
    audienceQuestion: {
      en: "Can a business outside Florida hire Esteban for remote editing?",
      es: "Puede un negocio fuera de Florida contratar a Esteban para edicion remota?",
    },
    searchIntent: {
      en: "remote bilingual video editor, Spanish English video editing, hire editor out of state",
      es: "editor de video remoto bilingue, edicion de video espanol ingles, contratar editor fuera del estado",
    },
    contentAngle: {
      en: "Make the remote boundary clear: supplied footage, files, references, one approval owner, and direct contact work from anywhere; on-location capture remains scoped around South Florida availability.",
      es: "Aclarar el limite remoto: material entregado, archivos, referencias, un responsable de aprobacion y contacto directo funcionan desde cualquier lugar; grabacion local depende de disponibilidad en South Florida.",
    },
    keywordTargets: [
      {
        en: "remote bilingual video editor",
        es: "editor de video remoto bilingue",
      },
      {
        en: "Spanish English video editing service",
        es: "servicio de edicion de video en espanol e ingles",
      },
      {
        en: "hire a remote video editor",
        es: "contratar editor de video remoto",
      },
    ],
    internalLinks: [
      {
        en: "/services/hire-remote-video-editor",
        es: "/es/contacto",
      },
      {
        en: "/guides/bilingual-video-marketing-strategy-south-florida",
        es: "/es/guias/estrategia-de-video-bilingue-south-florida",
      },
      {
        en: "/resources/remote-editing-handoff-checklist",
        es: "/es/guias/entrega-para-edicion-remota-de-video",
      },
    ],
  },
];
