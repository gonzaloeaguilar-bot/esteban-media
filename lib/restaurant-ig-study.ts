/**
 * "What Miami restaurants post on Instagram (2026)" — copy for the EN/ES
 * study pages. Every number is read from the aggregate file the collector
 * writes (scripts/ig-restaurant-study.mjs analyze), so the prose, the chart,
 * the table and the Dataset JSON-LD cannot drift apart.
 *
 * The aggregate file holds no restaurant names or handles; the per-account
 * table and the prospect list stay outside this repo.
 */
import study from "@/data/studies/miami-restaurant-instagram-2026.json";
import { ARRANQUE_WEEKLY_FROM } from "@/lib/pricing";

export type StudyLocale = "en" | "es";

export const restaurantIgStudy = study;

export const restaurantIgStudyPaths = {
  en: "/guides/miami-restaurant-instagram-study",
  es: "/es/guias/estudio-instagram-restaurantes-miami",
} as const;

export const restaurantIgStudyAlternates = {
  "en-US": restaurantIgStudyPaths.en,
  "es-US": restaurantIgStudyPaths.es,
  "x-default": restaurantIgStudyPaths.en,
} as const;

const s = study;
const f = s.formats;
const fr = s.frequency;
const r = s.reels;
const lang = s.language;
const cap = s.captions;
const big = s.followers.byBucket.find((b) => b.bucket === "100k+")!;
const mid = s.followers.byBucket.find((b) => b.bucket === "20k-100k")!;
const small = s.followers.byBucket.find((b) => b.bucket === "1k-5k")!;
const spanishPosts = lang.posts.es + lang.posts.both;
const spanishPostsPct = Math.round((spanishPosts / s.postsAnalyzed) * 1000) / 10;
const bilingualAccounts = (lang.accounts.both ?? 0) + (lang.accounts.es ?? 0);
const hood = (name: string) => s.neighborhoods.find((n) => n.neighborhood === name)!;
const under30 = Math.round((r.under15sPct + r.from15to30sPct) * 10) / 10;

function num(n: number, locale: StudyLocale) {
  return n.toLocaleString(locale === "es" ? "es-US" : "en-US");
}
function dec(n: number, locale: StudyLocale) {
  return locale === "es" ? String(n).replace(".", ",") : String(n);
}
function pct(n: number, locale: StudyLocale) {
  return `${dec(n, locale)}%`;
}

const collected = new Date(`${s.collectedOn}T12:00:00Z`);
export const studyDateLabel = {
  en: collected.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }),
  es: collected.toLocaleDateString("es-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }),
};

export type StudySection = { id: string; question: string; paragraphs: string[] };

type StudyCopy = {
  metadataTitle: string;
  description: string;
  eyebrow: string;
  h1: string;
  answer: string;
  updated: string;
  stats: { id: string; value: string; label: string }[];
  findingsHeading: string;
  findings: StudySection[];
  chart: {
    question: string;
    intro: string;
    formatsTitle: string;
    formatLabels: { reel: string; carousel: string; photo: string };
    lengthTitle: string;
    lengthLabels: [string, string, string, string];
    tableLabel: string;
    tableHeading: string;
    columns: { accounts: string; reels: string; spanish: string };
    note: string;
  };
  method: StudySection & { detailsSummary: string; details: string[] };
  next: StudySection & {
    links: { href: string; label: string; detail: string; cta: string }[];
  };
  measuredLabel: string;
  datasetName: string;
  datasetDescription: string;
  variables: string[];
};

const en: StudyCopy = {
  metadataTitle: "What Miami Restaurants Post on Instagram (2026 Study)",
  description: `We read the latest posts of ${s.sample} Miami restaurant Instagram accounts: ${pct(f.reelPct, "en")} of posts are Reels, the median Reel runs ${dec(r.medianSeconds, "en")} seconds, and ${pct(fr.accountsUnderOneReelPerWeekPct, "en")} post under one Reel a week.`,
  eyebrow: "Original data · Miami restaurants",
  h1: "What Miami restaurants post on Instagram (2026)",
  answer: `We read the latest posts of ${s.sample} Miami restaurant Instagram accounts across Brickell, Wynwood, Little Havana, Miami Beach and Doral. Reels are now the main format, at ${pct(f.reelPct, "en")} of ${num(s.postsAnalyzed, "en")} posts. The median Reel runs ${dec(r.medianSeconds, "en")} seconds. And ${fr.accountsUnderOneReelPerWeek} of the ${s.sample} restaurants still post fewer than one Reel a week.`,
  updated: `Data collected ${studyDateLabel.en}. Updated ${studyDateLabel.en}.`,
  stats: [
    { id: "accounts", value: num(s.sample, "en"), label: "restaurant accounts" },
    { id: "posts", value: num(s.postsAnalyzed, "en"), label: "posts read" },
    { id: "reels", value: pct(f.reelPct, "en"), label: "of posts are Reels" },
    { id: "length", value: `${dec(r.medianSeconds, "en")} s`, label: "median Reel length" },
  ],
  findingsHeading: "Seven findings",
  findings: [
    {
      id: "reel-share",
      question: "How much of a Miami restaurant's Instagram is Reels?",
      paragraphs: [
        `More than half. Of the ${num(s.postsAnalyzed, "en")} recent posts we read, ${pct(f.reelPct, "en")} were Reels, ${pct(f.carouselPct, "en")} were carousels and only ${pct(f.photoPct, "en")} were single photos. The single photo, which used to be the default restaurant post, is now the smallest format of the three.`,
        `Counted per restaurant, the median account gives ${pct(f.medianAccountReelSharePct, "en")} of its grid to Reels, and ${f.accountsReelMajority} of ${s.sample} accounts (${pct(f.accountsReelMajorityPct, "en")}) post Reels more than anything else. At the other end, ${f.accountsUnderQuarterReels} accounts keep Reels under a quarter of their posts and ${f.accountsZeroReels} posted no Reel at all in the posts we read. Pinned posts were left out, because a post pinned in spring says nothing about what a restaurant publishes now.`,
      ],
    },
    {
      id: "reel-length",
      question: "How long are Miami restaurant Reels?",
      paragraphs: [
        `Short. We read the length of ${num(r.reelsMeasured, "en")} of the ${num(r.totalReels, "en")} Reels in the sample straight from each public video file. The median is ${dec(r.medianSeconds, "en")} seconds.`,
        `${pct(r.under15sPct, "en")} run under 15 seconds and another ${pct(r.from15to30sPct, "en")} land between 15 and 30, so ${pct(under30, "en")} of restaurant Reels are over in half a minute. Only ${pct(r.from30to60sPct, "en")} run 30 to 60 seconds, and ${pct(r.over60sPct, "en")} pass the one-minute mark. In practice that is a dish, a pour or a room, cut to a few beats. It is a format that rewards a tight edit more than a long shoot: a restaurant does not need more footage to post more Reels, it needs the footage it has cut into short pieces.`,
      ],
    },
    {
      id: "frequency",
      question: "How often do Miami restaurants post on Instagram?",
      paragraphs: [
        `The median account in the sample posts ${dec(fr.medianPostsPerWeek, "en")} times a week, measured across the span of its recent posts. That number hides a wide spread.`,
        `${fr.accountsThreePlusPerWeek} of ${s.sample} restaurants post three or more times a week, usually mixing Reels with carousels of the menu, events and the room. ${fr.accountsUnderOnePerWeek} accounts (${pct(fr.accountsUnderOnePerWeekPct, "en")}) post less than once a week, even though every account in the sample had posted within the 30 days before we read it. The typical account had posted ${dec(fr.medianDaysSinceLastPost, "en")} days before collection, so these are active accounts, not abandoned ones. Inactive accounts were excluded on purpose: the question is what working restaurants publish, not how many gave up.`,
      ],
    },
    {
      id: "reel-cadence",
      question: "How many restaurants post fewer than one Reel a week?",
      paragraphs: [
        `${fr.accountsUnderOneReelPerWeek} of ${s.sample}, or ${pct(fr.accountsUnderOneReelPerWeekPct, "en")}. The median restaurant publishes ${dec(fr.medianReelsPerWeek, "en")} Reels a week, but almost half of the sample sits below one.`,
        `This is the gap between the format restaurants lean on and the rhythm they keep. Reels are the majority of what the sample posts, yet nearly half of the accounts go more than a week between them. The two numbers are not in conflict: an account that posts twice a month can still be mostly Reels. What it shows is that the constraint for many restaurants is cadence, not format. They already know Reels are the post that matters; what is missing is a steady weekly supply of finished, short edits.`,
      ],
    },
    {
      id: "language",
      question: "Do Miami restaurants caption in Spanish or English?",
      paragraphs: [
        `Mostly English, even in Spanish-speaking neighborhoods. ${lang.accounts.en} of ${s.sample} accounts (${pct(lang.accountsPct.en, "en")}) caption mainly in English, ${lang.accounts.both ?? 0} (${pct(lang.accountsPct.both ?? 0, "en")}) mix both languages and ${lang.accounts.es ?? 0} (${pct(lang.accountsPct.es ?? 0, "en")}) write mainly in Spanish.`,
        `Counted post by post, Spanish appears in ${num(spanishPosts, "en")} of ${num(s.postsAnalyzed, "en")} captions (${pct(spanishPostsPct, "en")}). The Spanish and bilingual accounts cluster where you would expect: ${hood("Doral").spanishOrBilingualAccounts} in Doral and ${hood("Little Havana").spanishOrBilingualAccounts} in Little Havana, against ${hood("Brickell").spanishOrBilingualAccounts} in Brickell. Language was classified by counting common Spanish and English words in each caption, with no AI model, so a caption of only emoji or hashtags counts as neither. A restaurant can of course speak Spanish at the table and still write its feed in English for tourists and newcomers.`,
      ],
    },
    {
      id: "captions",
      question: "Do restaurants write captions and use hashtags?",
      paragraphs: [
        `Almost always a caption, about half the time a hashtag. ${pct(cap.captionedPct, "en")} of the posts we read carry a caption, and the median account writes about ${cap.medianCaptionWords} words per post: enough for a dish name, an offer, hours or a reservation line.`,
        `Hashtags are fading. Only ${pct(cap.hashtagPostPct, "en")} of posts use even one. On-screen text and burned-in subtitles inside the videos are a different question, and we did not measure them: the post data Instagram exposes publicly does not say whether a Reel has text on screen, and guessing from thumbnails would be a guess. If you read a statistic about subtitles on restaurant Reels, check how it was measured before you repeat it.`,
      ],
    },
    {
      id: "account-size",
      question: "Do bigger restaurant accounts post more Reels?",
      paragraphs: [
        `The largest ones do. The ${big.accounts} accounts with more than 100,000 followers give a median ${pct(big.medianReelSharePct ?? 0, "en")} of their posts to Reels. The ${mid.accounts} accounts between 20,000 and 100,000 sit at ${pct(mid.medianReelSharePct ?? 0, "en")}, and the ${small.accounts} smallest accounts, 1,000 to 5,000 followers, at ${pct(small.medianReelSharePct ?? 0, "en")}.`,
        `The median account has ${num(s.followers.median, "en")} followers. This is a correlation in a small sample, not proof that Reels grew those accounts: large accounts often have a team or an agency, and that alone changes what they post. What it does show is the house style of Miami's most-followed restaurants, which is mostly short video. Each group is small, so read these medians as a direction, not a rule.`,
      ],
    },
  ],
  chart: {
    question: "What do the posts look like, by format and Reel length?",
    intro: `Share of ${num(s.postsAnalyzed, "en")} posts by format, and how long the ${num(r.reelsMeasured, "en")} measured Reels run. The table breaks the sample down by neighborhood.`,
    formatsTitle: "Post format",
    formatLabels: { reel: "Reels", carousel: "Carousels", photo: "Photos" },
    lengthTitle: "Reel length",
    lengthLabels: ["Under 15 s", "15 to 30 s", "30 to 60 s", "Over 60 s"],
    tableLabel: "Accounts by neighborhood",
    tableHeading: "Accounts by neighborhood",
    columns: { accounts: "Accounts", reels: "Reels (median)", spanish: "Spanish or mixed" },
    note: "Neighborhood groups hold 7 to 11 accounts each. Small groups move a lot with one account, so compare them loosely.",
  },
  method: {
    id: "method",
    question: "How was this study measured?",
    paragraphs: [
      `We started from Google Maps: the top ${s.funnel.placesFromMaps / 5} results for "restaurants in" each of Brickell, Wynwood, Little Havana, Miami Beach and Doral, ${s.funnel.placesFromMaps} places in all. Each restaurant's Instagram account was taken from the link on its own website, never guessed from its name. ${s.funnel.websiteLinksInstagram} sites linked an account, which came to ${s.funnel.uniqueHandles} distinct accounts once shared accounts were merged.`,
      `We read each public profile and its latest 12 posts once, on ${studyDateLabel.en}, and skipped pinned posts. An account stayed in the sample if it was public, returned at least six unpinned posts and had posted in the previous 30 days. ${s.sample} accounts and ${num(s.postsAnalyzed, "en")} posts passed. Nothing was followed, liked, messaged or commented on, and no restaurant is named here.`,
    ],
    detailsSummary: "Exclusions, definitions and limits",
    details: [
      `Excluded: ${s.funnel.excluded.no_post_in_30_days ?? 0} accounts with no post in 30 days and ${s.funnel.excluded.fewer_than_6_posts ?? 0} with fewer than six unpinned posts. Restaurants whose site linked no Instagram, blocked automated visits or had no website were not counted (${s.funnel.placesFromMaps - s.funnel.websiteLinksInstagram} places).`,
      `Posts per week = posts in the window minus one, divided by the days between the oldest and newest post, times seven. Reels per week = posts per week times the account's Reel share. ${fr.pinnedPostsSkipped} pinned posts were skipped across the sample.`,
      "Reel length was read from the header of each Reel's public video file. Caption language was assigned from common Spanish and English words; a caption with too few words counts as neither.",
      "Limits: one reading on one day, 12 posts per account, and restaurants that rank on Google Maps and link their Instagram, which leans toward established places. Not measured: on-screen text, subtitles, Stories, ads or engagement.",
    ],
  },
  next: {
    id: "next",
    question: "What does this mean if you run a restaurant in Miami?",
    paragraphs: [
      `The sample says the format question is settled: short Reels, mostly under 30 seconds, are what Miami restaurants post most. The open question for ${pct(fr.accountsUnderOneReelPerWeekPct, "en")} of them is rhythm. A Reel a week, cut from footage the restaurant already shoots on a phone, is enough to leave that group; matching the median account means about ${dec(fr.medianReelsPerWeek, "en")} a week.`,
      "Esteban Moreno Media edits restaurant and food video remotely from Miami. If you want to see how that works, these pages explain the restaurant work and the weekly editing plan, with prices on the page.",
    ],
    links: [
      { href: "/services/restaurant-promo-video-editing-miami", label: "Restaurant video editing in Miami", detail: "Promo videos and Reels for restaurants, cut from your footage.", cta: "study_restaurant_ig_restaurant_page" },
      { href: "/services/food-and-places-creator-video-editing-miami#weekly-starter", label: `Weekly editing plan from $${ARRANQUE_WEEKLY_FROM.perWeek}/week`, detail: "One or two short videos edited every week.", cta: "study_restaurant_ig_weekly_plan" },
      { href: "/guides/how-many-reels-should-a-restaurant-post-per-week", label: "How many Reels should a restaurant post?", detail: "What a 2.1-million-post study says about frequency.", cta: "study_restaurant_ig_reels_per_week_guide" },
    ],
  },
  measuredLabel: "Measured:",
  datasetName: "What Miami restaurants post on Instagram (2026)",
  datasetDescription: `Aggregate measurements of the latest public Instagram posts of ${s.sample} Miami restaurant accounts (${s.postsAnalyzed} posts) in Brickell, Wynwood, Little Havana, Miami Beach and Doral, collected ${s.collectedOn}: format share, posting frequency, Reel length, caption language, captions, hashtags and follower size.`,
  variables: ["Post format share (Reel, carousel, photo)", "Posts per week", "Reels per week", "Reel length in seconds", "Caption language", "Caption presence and length", "Hashtag use", "Follower range"],
};

const es: StudyCopy = {
  metadataTitle: "Qué publican los restaurantes de Miami en Instagram (2026)",
  description: `Leímos las publicaciones recientes de ${s.sample} cuentas de restaurantes de Miami: el ${pct(f.reelPct, "es")} son Reels, el Reel mediano dura ${dec(r.medianSeconds, "es")} segundos y el ${pct(fr.accountsUnderOneReelPerWeekPct, "es")} publica menos de un Reel por semana.`,
  eyebrow: "Datos propios · Restaurantes de Miami",
  h1: "Qué publican los restaurantes de Miami en Instagram (2026)",
  answer: `Leímos las publicaciones recientes de ${s.sample} cuentas de Instagram de restaurantes en Brickell, Wynwood, La Pequeña Habana, Miami Beach y Doral. Los Reels ya son el formato principal: el ${pct(f.reelPct, "es")} de ${num(s.postsAnalyzed, "es")} publicaciones. El Reel mediano dura ${dec(r.medianSeconds, "es")} segundos. Y ${fr.accountsUnderOneReelPerWeek} de los ${s.sample} restaurantes todavía publican menos de un Reel por semana.`,
  updated: `Datos recogidos el ${studyDateLabel.es}. Actualizado el ${studyDateLabel.es}.`,
  stats: [
    { id: "accounts", value: num(s.sample, "es"), label: "cuentas de restaurantes" },
    { id: "posts", value: num(s.postsAnalyzed, "es"), label: "publicaciones leídas" },
    { id: "reels", value: pct(f.reelPct, "es"), label: "de las publicaciones son Reels" },
    { id: "length", value: `${dec(r.medianSeconds, "es")} s`, label: "duración mediana del Reel" },
  ],
  findingsHeading: "Siete hallazgos",
  findings: [
    {
      id: "reel-share",
      question: "¿Qué parte del Instagram de un restaurante de Miami son Reels?",
      paragraphs: [
        `Más de la mitad. De las ${num(s.postsAnalyzed, "es")} publicaciones recientes que leímos, el ${pct(f.reelPct, "es")} fueron Reels, el ${pct(f.carouselPct, "es")} carruseles y solo el ${pct(f.photoPct, "es")} fotos sueltas. La foto única, que antes era la publicación típica de un restaurante, hoy es el formato más pequeño de los tres.`,
        `Contado por restaurante, la cuenta mediana dedica el ${pct(f.medianAccountReelSharePct, "es")} de su perfil a Reels, y ${f.accountsReelMajority} de ${s.sample} cuentas (${pct(f.accountsReelMajorityPct, "es")}) publican más Reels que cualquier otra cosa. En el otro extremo, ${f.accountsUnderQuarterReels} cuentas dejan los Reels por debajo de una cuarta parte y ${f.accountsZeroReels} no publicaron ningún Reel en lo que leímos. Las publicaciones fijadas quedaron fuera, porque una publicación fijada en primavera no dice nada de lo que el restaurante publica hoy.`,
      ],
    },
    {
      id: "reel-length",
      question: "¿Cuánto duran los Reels de los restaurantes de Miami?",
      paragraphs: [
        `Poco. Leímos la duración de ${num(r.reelsMeasured, "es")} de los ${num(r.totalReels, "es")} Reels de la muestra directamente de cada archivo de video público. La mediana es de ${dec(r.medianSeconds, "es")} segundos.`,
        `El ${pct(r.under15sPct, "es")} dura menos de 15 segundos y otro ${pct(r.from15to30sPct, "es")} queda entre 15 y 30, así que el ${pct(under30, "es")} de los Reels de restaurantes termina en medio minuto. Solo el ${pct(r.from30to60sPct, "es")} dura entre 30 y 60 segundos, y el ${pct(r.over60sPct, "es")} pasa del minuto. En la práctica es un plato, un trago o un salón, cortado en pocos tiempos. Es un formato que premia una edición ajustada más que una grabación larga: un restaurante no necesita más material para publicar más Reels, necesita que el material que ya tiene esté cortado en piezas cortas.`,
      ],
    },
    {
      id: "frequency",
      question: "¿Con qué frecuencia publican los restaurantes de Miami en Instagram?",
      paragraphs: [
        `La cuenta mediana de la muestra publica ${dec(fr.medianPostsPerWeek, "es")} veces por semana, medido sobre el periodo de sus publicaciones recientes. Ese número esconde mucha diferencia.`,
        `${fr.accountsThreePlusPerWeek} de ${s.sample} restaurantes publican tres o más veces por semana, normalmente mezclando Reels con carruseles del menú, eventos y el local. ${fr.accountsUnderOnePerWeek} cuentas (${pct(fr.accountsUnderOnePerWeekPct, "es")}) publican menos de una vez por semana, aunque todas las cuentas de la muestra habían publicado en los 30 días anteriores a la lectura. La cuenta típica había publicado ${dec(fr.medianDaysSinceLastPost, "es")} días antes, así que son cuentas activas, no abandonadas. Las cuentas inactivas se excluyeron a propósito: la pregunta es qué publican los restaurantes que trabajan su Instagram, no cuántos lo dejaron.`,
      ],
    },
    {
      id: "reel-cadence",
      question: "¿Cuántos restaurantes publican menos de un Reel por semana?",
      paragraphs: [
        `${fr.accountsUnderOneReelPerWeek} de ${s.sample}, es decir, el ${pct(fr.accountsUnderOneReelPerWeekPct, "es")}. El restaurante mediano publica ${dec(fr.medianReelsPerWeek, "es")} Reels por semana, pero casi la mitad de la muestra está por debajo de uno.`,
        `Esta es la brecha entre el formato en el que los restaurantes se apoyan y el ritmo que mantienen. Los Reels son la mayoría de lo que publica la muestra, pero casi la mitad de las cuentas pasa más de una semana entre uno y otro. Los dos números no se contradicen: una cuenta que publica dos veces al mes puede ser casi toda Reels. Lo que muestran es que, para muchos restaurantes, el límite es el ritmo y no el formato. Ya saben que el Reel es la publicación que importa; lo que falta es un suministro semanal y constante de ediciones cortas terminadas.`,
      ],
    },
    {
      id: "language",
      question: "¿Los restaurantes de Miami escriben en español o en inglés?",
      paragraphs: [
        `Sobre todo en inglés, incluso en barrios hispanohablantes. ${lang.accounts.en} de ${s.sample} cuentas (${pct(lang.accountsPct.en, "es")}) escriben principalmente en inglés, ${lang.accounts.both ?? 0} (${pct(lang.accountsPct.both ?? 0, "es")}) mezclan los dos idiomas y ${lang.accounts.es ?? 0} (${pct(lang.accountsPct.es ?? 0, "es")}) escriben sobre todo en español.`,
        `Contado publicación por publicación, el español aparece en ${num(spanishPosts, "es")} de ${num(s.postsAnalyzed, "es")} textos (${pct(spanishPostsPct, "es")}). Las cuentas en español o bilingües se concentran donde uno esperaría: ${hood("Doral").spanishOrBilingualAccounts} en Doral y ${hood("Little Havana").spanishOrBilingualAccounts} en La Pequeña Habana, frente a ${hood("Brickell").spanishOrBilingualAccounts} en Brickell. El idioma se clasificó contando palabras comunes del español y del inglés en cada texto, sin ningún modelo de IA, así que un texto de solo emojis o hashtags no cuenta para ninguno.`,
      ],
    },
    {
      id: "captions",
      question: "¿Los restaurantes escriben texto y usan hashtags?",
      paragraphs: [
        `Texto casi siempre, hashtags la mitad de las veces. El ${pct(cap.captionedPct, "es")} de las publicaciones que leímos lleva texto, y la cuenta mediana escribe unas ${cap.medianCaptionWords} palabras por publicación: lo justo para el nombre de un plato, una oferta, el horario o una línea para reservar.`,
        `Los hashtags van perdiendo peso. Solo el ${pct(cap.hashtagPostPct, "es")} de las publicaciones usa al menos uno. El texto en pantalla y los subtítulos dentro de los videos son otra pregunta, y no los medimos: los datos públicos de cada publicación no dicen si un Reel tiene texto en pantalla, y adivinarlo por la miniatura sería eso, adivinar. Si lees una cifra sobre subtítulos en Reels de restaurantes, revisa cómo se midió antes de repetirla.`,
      ],
    },
    {
      id: "account-size",
      question: "¿Las cuentas de restaurantes más grandes publican más Reels?",
      paragraphs: [
        `Las más grandes, sí. Las ${big.accounts} cuentas con más de 100.000 seguidores dedican una mediana del ${pct(big.medianReelSharePct ?? 0, "es")} de sus publicaciones a Reels. Las ${mid.accounts} cuentas de 20.000 a 100.000 se quedan en el ${pct(mid.medianReelSharePct ?? 0, "es")}, y las ${small.accounts} más pequeñas, de 1.000 a 5.000 seguidores, en el ${pct(small.medianReelSharePct ?? 0, "es")}.`,
        `La cuenta mediana tiene ${num(s.followers.median, "es")} seguidores. Es una correlación en una muestra pequeña, no una prueba de que los Reels hicieron crecer esas cuentas: las cuentas grandes suelen tener un equipo o una agencia, y eso por sí solo cambia lo que publican. Lo que sí muestra es el estilo de los restaurantes más seguidos de Miami, que es sobre todo video corto. Cada grupo es pequeño, así que lee estas medianas como una dirección, no como una regla.`,
      ],
    },
  ],
  chart: {
    question: "¿Cómo se ven las publicaciones por formato y duración del Reel?",
    intro: `Reparto de ${num(s.postsAnalyzed, "es")} publicaciones por formato y duración de los ${num(r.reelsMeasured, "es")} Reels medidos. La tabla separa la muestra por barrio.`,
    formatsTitle: "Formato de la publicación",
    formatLabels: { reel: "Reels", carousel: "Carruseles", photo: "Fotos" },
    lengthTitle: "Duración del Reel",
    lengthLabels: ["Menos de 15 s", "15 a 30 s", "30 a 60 s", "Más de 60 s"],
    tableLabel: "Cuentas por barrio",
    tableHeading: "Cuentas por barrio",
    columns: { accounts: "Cuentas", reels: "Reels (mediana)", spanish: "Español o mixto" },
    note: "Cada barrio tiene entre 7 y 11 cuentas. En grupos pequeños una sola cuenta mueve mucho la cifra, así que compáralos con cautela.",
  },
  method: {
    id: "metodo",
    question: "¿Cómo se midió este estudio?",
    paragraphs: [
      `Partimos de Google Maps: los primeros ${s.funnel.placesFromMaps / 5} resultados de "restaurants in" en Brickell, Wynwood, La Pequeña Habana, Miami Beach y Doral, ${s.funnel.placesFromMaps} lugares en total. La cuenta de Instagram de cada restaurante se tomó del enlace de su propia web, nunca se adivinó por el nombre. ${s.funnel.websiteLinksInstagram} webs enlazaban una cuenta, que quedaron en ${s.funnel.uniqueHandles} cuentas distintas al unir las compartidas.`,
      `Leímos cada perfil público y sus últimas 12 publicaciones una sola vez, el ${studyDateLabel.es}, sin contar las fijadas. Una cuenta quedó en la muestra si era pública, tenía al menos seis publicaciones no fijadas y había publicado en los 30 días anteriores. Pasaron ${s.sample} cuentas y ${num(s.postsAnalyzed, "es")} publicaciones. No seguimos, ni dimos me gusta, ni escribimos, ni comentamos nada, y aquí no se nombra a ningún restaurante.`,
    ],
    detailsSummary: "Exclusiones, definiciones y límites",
    details: [
      `Excluidas: ${s.funnel.excluded.no_post_in_30_days ?? 0} cuentas sin publicaciones en 30 días y ${s.funnel.excluded.fewer_than_6_posts ?? 0} con menos de seis publicaciones no fijadas. No se contaron los restaurantes cuya web no enlazaba Instagram, bloqueaba visitas automáticas o no tenía web (${s.funnel.placesFromMaps - s.funnel.websiteLinksInstagram} lugares).`,
      `Publicaciones por semana = publicaciones del periodo menos una, divididas entre los días entre la más antigua y la más reciente, por siete. Reels por semana = publicaciones por semana por la parte de Reels de la cuenta. Se omitieron ${fr.pinnedPostsSkipped} publicaciones fijadas en toda la muestra.`,
      "La duración del Reel se leyó de la cabecera del archivo de video público de cada Reel. El idioma del texto se asignó por palabras comunes del español y del inglés; un texto con muy pocas palabras no cuenta para ninguno.",
      "Límites: una sola lectura en un solo día, las últimas 12 publicaciones por cuenta y restaurantes que aparecen en Google Maps y enlazan su Instagram, lo que inclina la muestra hacia lugares establecidos. No se midió: texto en pantalla, subtítulos, Stories, anuncios pagados ni tasas de interacción.",
    ],
  },
  next: {
    id: "que-significa",
    question: "¿Qué significa esto si tienes un restaurante en Miami?",
    paragraphs: [
      `La muestra dice que la pregunta del formato ya está resuelta: Reels cortos, casi siempre de menos de 30 segundos, son lo que más publican los restaurantes de Miami. La pregunta abierta para el ${pct(fr.accountsUnderOneReelPerWeekPct, "es")} de ellos es el ritmo. Un Reel por semana, cortado del material que el restaurante ya graba con el teléfono, basta para salir de ese grupo; igualar a la cuenta mediana supone unos ${dec(fr.medianReelsPerWeek, "es")} por semana.`,
      "Esteban Moreno Media edita en remoto, desde Miami, video de restaurantes y comida. Estas páginas explican ese trabajo y el plan semanal, con precios.",
    ],
    links: [
      { href: "/es/edicion-de-video-promocional-para-restaurantes-miami", label: "Edición de video para restaurantes en Miami", detail: "Videos promocionales y Reels para restaurantes, cortados de tu material.", cta: "study_restaurant_ig_restaurant_page" },
      { href: "/es/edicion-de-video-para-creadores-de-comida-y-lugares-miami#arranque-semanal", label: `Plan semanal de edición desde $${ARRANQUE_WEEKLY_FROM.perWeek}/semana`, detail: "Uno o dos videos cortos editados cada semana.", cta: "study_restaurant_ig_weekly_plan" },
      { href: "/es/guias/cuantos-reels-debe-publicar-un-restaurante-por-semana", label: "¿Cuántos Reels debe publicar un restaurante?", detail: "Lo que dice un estudio de 2,1 millones de publicaciones.", cta: "study_restaurant_ig_reels_per_week_guide" },
    ],
  },
  measuredLabel: "Medido:",
  datasetName: "Qué publican los restaurantes de Miami en Instagram (2026)",
  datasetDescription: `Mediciones agregadas de las publicaciones públicas recientes de ${s.sample} cuentas de Instagram de restaurantes de Miami (${s.postsAnalyzed} publicaciones) en Brickell, Wynwood, La Pequeña Habana, Miami Beach y Doral, recogidas el ${s.collectedOn}: formato, frecuencia, duración del Reel, idioma del texto, uso de texto y hashtags, y tamaño de la cuenta.`,
  variables: ["Reparto por formato (Reel, carrusel, foto)", "Publicaciones por semana", "Reels por semana", "Duración del Reel en segundos", "Idioma del texto", "Presencia y largo del texto", "Uso de hashtags", "Rango de seguidores"],
};

export const restaurantIgStudyCopy: Record<StudyLocale, StudyCopy> = { en, es };

export const neighborhoodLabels: Record<StudyLocale, Record<string, string>> = {
  en: { Brickell: "Brickell", Wynwood: "Wynwood", "Little Havana": "Little Havana", "Miami Beach": "Miami Beach", Doral: "Doral" },
  es: { Brickell: "Brickell", Wynwood: "Wynwood", "Little Havana": "La Pequeña Habana", "Miami Beach": "Miami Beach", Doral: "Doral" },
};

export function formatPercent(n: number | null, locale: StudyLocale) {
  return n == null ? "–" : pct(n, locale);
}
