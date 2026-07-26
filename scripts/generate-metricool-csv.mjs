import fs from "fs";
import path from "path";

/**
 * Metricool Bulk CSV Post Generator for Esteban Moreno Media.
 * Produces a CSV file ready for import into Metricool for LinkedIn & YouTube Shorts.
 */

const outputDir = path.join(process.cwd(), "public", "social");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const csvPath = path.join(outputDir, "metricool_batch_posts.csv");

const posts = [
  {
    date: "2026-08-01",
    time: "10:00",
    text: "🚀 Are you wasting 10+ hours a week trying to edit your own business videos? Here is the exact framework South Florida brands use to delegate remote video editing cleanly.\n\n👉 Calculate your budget & scope in 30 seconds:\nhttps://estebanmorenomedia.com/calculator\n\n#VideoEditing #SouthFlorida #MiamiBusiness #VideoMarketing",
  },
  {
    date: "2026-08-03",
    time: "14:00",
    text: "📱 ¿Sabías que el 80% de los videos en Instagram y TikTok se ven SIN sonido? Si tus Reels no tienen subtítulos animados y audio masterizado, estás perdiendo clientes.\n\nObtén nuestro Kit de Guiones 9:16 gratis:\nhttps://estebanmorenomedia.com/es/recursos/kit-video-social\n\n#EdicionDeVideo #Miami #ReelsParaNegocios #MarketingDigital",
  },
  {
    date: "2026-08-05",
    time: "10:00",
    text: "⚖️ Law firms in Miami & Fort Lauderdale: Video content is your highest-converting trust asset. Here are 3 client testimonial video frameworks that get results without sounding corporate.\n\nAudit your video strategy score:\nhttps://estebanmorenomedia.com/assessment\n\n#LawFirmMarketing #MiamiAttorneys #VideoProduction #FortLauderdale",
  },
  {
    date: "2026-08-07",
    time: "16:00",
    text: "🎬 ¿Tienes horas de material grabado en tu celular o cámara 4K y no sabes cómo organizarlo para enviar a tu editor? He creado una guía paso a paso y plantilla de carpetas.\n\nDescarga la lista de chequeo aquí:\nhttps://estebanmorenomedia.com/es/guias/entrega-de-material-remoto\n\n#EdicionRemota #CreadoresDeContenido #ProduccionDeVideo #SouthFlorida",
  },
  {
    date: "2026-08-09",
    time: "11:00",
    text: "💡 9:16 Vertical Video vs 16:9 Widescreen: Which format should your business invest in for 2026? Read our breakdown of safe-zone margins and multi-export workflows.\n\nRead the full guide:\nhttps://estebanmorenomedia.com/guides/vertical-horizontal-video-exports-and-safe-zones\n\n#ContentCreation #VideoEditor #SocialMediaStrategy #YouTubeShorts",
  },
  {
    date: "2026-08-11",
    time: "10:00",
    text: "🏥 Med Spas & Cosmetic Clinics in South Florida: Patient testimonial videos need high-end color grading and crisp dialogue. See how we turn raw footage into high-converting ads.\n\nCalculate your video scope:\nhttps://estebanmorenomedia.com/calculator\n\n#MedSpaMarketing #MiamiMedSpa #VideoEditing #Aesthetics",
  },
  {
    date: "2026-08-13",
    time: "15:00",
    text: "✨ ¿Quieres saber si tu marca tiene una estrategia de video bilingüe optimizada? Realiza nuestro diagnóstico gratuito en 5 preguntas.\n\nEvalúa tu estrategia aquí:\nhttps://estebanmorenomedia.com/es/evaluacion\n\n#MarketingBilingue #MiamiBusiness #EstrategiaDigital #SouthFlorida",
  },
  {
    date: "2026-08-15",
    time: "10:00",
    text: "🏢 Real Estate Agents in Brickell & Coral Gables: 4K aerial drone walkthroughs get 4x more engagement on LinkedIn than static photos. Here is how we edit luxury property videos.\n\nView portfolio & get custom quote:\nhttps://estebanmorenomedia.com/portfolio\n\n#RealEstateMiami #LuxuryRealEstate #VideoProduction #Brickell",
  },
  {
    date: "2026-08-17",
    time: "14:00",
    text: "📦 D2C E-Commerce Brands: UGC (User-Generated Content) video ads are outperforming polished studio ads. Get our 5 direct-response script frameworks for TikTok & Reels.\n\nGet the ad script kit:\nhttps://estebanmorenomedia.com/resources/social-video-kit\n\n#EcommerceMarketing #TikTokAds #VideoEditing #UGCVideo",
  },
  {
    date: "2026-08-19",
    time: "10:00",
    text: "🎙️ How to turn 1 podcast recording into 15 high-converting vertical clips for YouTube Shorts and LinkedIn. Learn the batching workflow used by South Florida leaders.\n\nExplore our video editing services:\nhttps://estebanmorenomedia.com/services/video-podcast-editing-service-miami\n\n#VideoPodcast #ContentRepurposing #LinkedInVideo #Shorts",
  },
];

function generateCSV() {
  const headers = ["Date", "Time", "Text"];
  const rows = posts.map((post) => {
    const escapedText = `"${post.text.replace(/"/g, '""')}"`;
    return `${post.date},${post.time},${escapedText}`;
  });

  const csvContent = [headers.join(","), ...rows].join("\n");
  fs.writeFileSync(csvPath, csvContent, "utf8");

  console.log(`[METRICOOL CSV GENERATED] File saved to: ${csvPath}`);
  console.log(`Total scheduled posts: ${posts.length}`);
}

generateCSV();
