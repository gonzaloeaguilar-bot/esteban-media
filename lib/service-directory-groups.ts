/**
 * Groups for the two service-landing directories (/services, /areas and the
 * Spanish mirrors).
 *
 * Why this exists (2026-10-24): the directory rendered 166 English links
 * (835 words) and 161 Spanish links (2,160 words) under ONE <h2>. The
 * dual-audience gate (scripts/dual-audience-gate.mjs) reads a heading plus
 * everything until the next h2/h3 as one section, so both /areas pages failed
 * on "1 section over 250 words" no matter what the prose above it did.
 * Splitting the directory into h3 groups gives a reader a way to find ONE guide
 * and gives the gate sections it can measure. Classification is by slug, so a
 * new page lands in a group without touching this file; anything unmatched
 * falls into the last group.
 *
 * Group sizes are pinned by app/__tests__/areas-routing.test.ts: every group
 * must stay under 250 words in both languages.
 */

export type DirectoryGroupKey =
  | "fort-lauderdale-broward"
  | "palm-beach"
  | "real-estate"
  | "food-hospitality"
  | "events"
  | "professional"
  | "corporate"
  | "products"
  | "longform"
  | "creators";

const RULES: ReadonlyArray<readonly [DirectoryGroupKey, RegExp]> = [
  [
    "fort-lauderdale-broward",
    /fort-lauderdale|broward|weston|hollywood|pembroke|plantation|davie|coral-springs|pompano|deerfield|hallandale|miramar|sunrise/,
  ],
  ["palm-beach", /palm-beach|boca-raton|delray|jupiter|wellington/],
  [
    "real-estate",
    /real-estate|realtor|property|condo|inmobiliari|propiedad|arquitectur|architect|airbnb|vacation|alquiler|preventa|penthouse|home-tour|interior|listing|leasing|pool-builder|piscina|bienes-raices|construccion|construction/,
  ],
  [
    "food-hospitality",
    /restaurant|food|comida|cafe|bakery|panader|hotel|yacht|yate|hospitalit|chef|catering|brewer|cervecer|destiler|cocina|cocktail|mixolog|coctel|sportfishing|pesca|aviation|aviacion|nightlife|vida-nocturna|exotic-car|carros-exoticos/,
  ],
  [
    "events",
    /event|evento|wedding|boda|quince|rehearsal|cena-de-ensayo|networking|mastermind|retreat|activation|activacion|art-basel|conference|gala|festival|celebra|mitzvah|proposal|propuesta/,
  ],
  [
    "professional",
    /law|legal|abogad|attorney|dent|medic|clinic|clinica|doctor|health|salud|insurance|segur|mortgage|hipotec|financ|wealth|accountant|contad|church|iglesia|school|academ|escuela|colegio|fitness|gym|gimnasio|entrenador|spa|wellness|bienestar|salon|beauty|estetic|barber|nonprofit|chiropract|quiropract|surgery|cirug|hair-restoration|restauracion-capilar|veterinar|pet-|mascota|pharma|therap|terap|coach|consult|contractor|contratista|hvac|roof|plumb|solar|auto|dealership|concesionario|detallado|detailing|logist|manufactur|remodel|cleaning|limpieza|landscap|moving|mudanza|security|seguridad|senior|funeral|tutor|daycare|guarder/,
  ],
  [
    "corporate",
    /corporat|b2b|saas|tech|startup|executive|ejecutiv|linkedin|bio|speaker|conferencista|sizzle|brand-video|video-de-marca|small-business|pequen|training|recruit|hr-|internal|testimonial|explainer|crowdfunding|office|empresa|company|chatbot|landing-page|diseno-web|web-design|website|institutional|institucional/,
  ],
  [
    "products",
    /product|producto|ecommerce|e-commerce|amazon|unboxing|jewelry|joyer|watch|reloj|cosmetic|fashion|moda|lookbook|photograph|fotograf|headshot|foto|imagen|ugc|ad-variation|anuncios/,
  ],
  [
    "longform",
    /podcast|course|curso|interview|entrevista|webinar|multicam|panel|youtube|documentary|documental|music|musica|film|cine|video-essay|audiobook|sermon|predica|lecture|charla|vsl|carta/,
  ],
];

export const DIRECTORY_GROUP_ORDER: readonly DirectoryGroupKey[] = [
  ...RULES.map(([key]) => key),
  "creators",
];

export const DIRECTORY_GROUP_LABELS: Record<"en" | "es", Record<DirectoryGroupKey, string>> = {
  en: {
    "fort-lauderdale-broward": "Fort Lauderdale and Broward guides",
    "palm-beach": "Palm Beach County guides",
    "real-estate": "Real estate, property and architecture",
    "food-hospitality": "Restaurants, food, yachts and hospitality",
    events: "Events, weddings and celebrations",
    professional: "Health, legal, finance and local services",
    corporate: "Corporate, executive and brand video",
    products: "Products, e-commerce and photography",
    longform: "Podcasts, courses and long-form video",
    creators: "Creators, Reels and remote editing",
  },
  es: {
    "fort-lauderdale-broward": "Guías para Fort Lauderdale y Broward",
    "palm-beach": "Guías para Palm Beach County",
    "real-estate": "Real estate, propiedades y arquitectura",
    "food-hospitality": "Restaurantes, comida, yates y hospitalidad",
    events: "Eventos, bodas y celebraciones",
    professional: "Salud, legal, finanzas y servicios locales",
    corporate: "Video corporativo, ejecutivo y de marca",
    products: "Productos, e-commerce y fotografía",
    longform: "Podcasts, cursos y video largo",
    creators: "Creadores, Reels y edición remota",
  },
};

export function directoryGroupFor(slugOrPath: string): DirectoryGroupKey {
  const key = slugOrPath.toLowerCase();
  for (const [group, pattern] of RULES) {
    if (pattern.test(key)) return group;
  }
  return "creators";
}

export function groupDirectoryItems<T>(
  items: readonly T[],
  keyOf: (item: T) => string,
): Array<{ key: DirectoryGroupKey; items: T[] }> {
  const buckets = new Map<DirectoryGroupKey, T[]>();
  for (const item of items) {
    const group = directoryGroupFor(keyOf(item));
    const bucket = buckets.get(group) ?? [];
    bucket.push(item);
    buckets.set(group, bucket);
  }
  return DIRECTORY_GROUP_ORDER.filter((key) => buckets.has(key)).map((key) => ({
    key,
    items: buckets.get(key)!,
  }));
}
