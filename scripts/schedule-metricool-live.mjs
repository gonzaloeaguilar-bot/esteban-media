/**
 * Metricool Live API Post Dispatcher
 * Schedules 10 bilingual commercial posts across LinkedIn and YouTube Shorts.
 */

const TOKEN = "AFUYQHCZBWELRKQWLRGFJAPPRWLZOPNKVZIIRPPVIXOXAOXFKOZIUZQWDQLPWCAW";
const BLOG_ID = "6619766";
const API_URL = `https://app.metricool.com/api/v2/scheduler/posts?blogId=${BLOG_ID}&userToken=${TOKEN}`;

const posts = [
  {
    date: "2026-08-01",
    time: "10:00:00",
    title: "5 Direct-Response Short Video Script Frameworks for 2026",
    text: "📱 How South Florida creators & brands structure short-form video ads for maximum engagement. Get our free 5 direct-response script frameworks and 9:16 safe-zone overlay kit.\n\n👉 Access the kit:\nhttps://estebanmorenomedia.com/resources/social-video-kit\n\n#VideoMarketing #ContentCreation #Reels #Shorts #MiamiBusiness",
  },
  {
    date: "2026-08-03",
    time: "14:00:00",
    title: "Kit de Guiones 9:16 y Zonas Seguras para Reels y TikTok",
    text: "📱 ¿Sabías que el 80% de los videos en Instagram y TikTok se ven SIN sonido? Si tus Reels no tienen subtítulos animados y audio masterizado, estás perdiendo clientes.\n\nObtén nuestro Kit de Guiones 9:16 gratis:\nhttps://estebanmorenomedia.com/es/recursos/kit-video-social\n\n#EdicionDeVideo #Miami #ReelsParaNegocios #MarketingDigital",
  },
  {
    date: "2026-08-05",
    time: "10:00:00",
    title: "3 High-Converting Testimonial Video Frameworks for Law Firms",
    text: "⚖️ Law firms in Miami & Fort Lauderdale: Video content is your highest-converting trust asset. Here are 3 client testimonial video frameworks that get results without sounding corporate.\n\nAudit your video strategy score:\nhttps://estebanmorenomedia.com/assessment\n\n#LawFirmMarketing #MiamiAttorneys #VideoProduction #FortLauderdale",
  },
  {
    date: "2026-08-07",
    time: "16:00:00",
    title: "Guía de Entrega de Material Remoto y Estructura de Carpetas",
    text: "🎬 ¿Tienes horas de material grabado en tu celular o cámara 4K y no sabes cómo organizarlo para enviar a tu editor? He creado una guía paso a paso y plantilla de carpetas.\n\nDescarga la lista de chequeo aquí:\nhttps://estebanmorenomedia.com/es/guias/entrega-de-material-remoto\n\n#EdicionRemota #CreadoresDeContenido #ProduccionDeVideo #SouthFlorida",
  },
  {
    date: "2026-08-09",
    time: "11:00:00",
    title: "9:16 Vertical Video vs 16:9 Widescreen Export Strategy",
    text: "💡 9:16 Vertical Video vs 16:9 Widescreen: Which format should your business invest in for 2026? Read our breakdown of safe-zone margins and multi-export workflows.\n\nRead the full guide:\nhttps://estebanmorenomedia.com/guides/vertical-horizontal-video-exports-and-safe-zones\n\n#ContentCreation #VideoEditor #SocialMediaStrategy #YouTubeShorts",
  },
  {
    date: "2026-08-11",
    time: "10:00:00",
    title: "High-Converting Patient Testimonial Editing for Med Spas",
    text: "🏥 Med Spas & Cosmetic Clinics in South Florida: Patient testimonial videos need high-end color grading and crisp dialogue. See how we turn raw footage into high-converting ads.\n\nCalculate your video scope:\nhttps://estebanmorenomedia.com/calculator\n\n#MedSpaMarketing #MiamiMedSpa #VideoEditing #Aesthetics",
  },
  {
    date: "2026-08-13",
    time: "15:00:00",
    title: "Diagnóstico de Estrategia de Video Bilingüe para South Florida",
    text: "✨ ¿Quieres saber si tu marca tiene una estrategia de video bilingüe optimizada? Realiza nuestro diagnóstico gratuito en 5 preguntas.\n\nEvalúa tu estrategia aquí:\nhttps://estebanmorenomedia.com/es/evaluacion\n\n#MarketingBilingue #MiamiBusiness #EstrategiaDigital #SouthFlorida",
  },
  {
    date: "2026-08-15",
    time: "10:00:00",
    title: "Luxury Real Estate 4K Aerial Video Editing Breakdown",
    text: "🏢 Real Estate Agents in Brickell & Coral Gables: 4K aerial drone walkthroughs get 4x more engagement on LinkedIn than static photos. Here is how we edit luxury property videos.\n\nView portfolio & get custom quote:\nhttps://estebanmorenomedia.com/portfolio\n\n#RealEstateMiami #LuxuryRealEstate #VideoProduction #Brickell",
  },
  {
    date: "2026-08-17",
    time: "14:00:00",
    title: "5 Direct-Response UGC Ad Scripts for E-Commerce Brands",
    text: "📦 D2C E-Commerce Brands: UGC (User-Generated Content) video ads are outperforming polished studio ads. Get our 5 direct-response script frameworks for TikTok & Reels.\n\nGet the ad script kit:\nhttps://estebanmorenomedia.com/resources/social-video-kit\n\n#EcommerceMarketing #TikTokAds #VideoEditing #UGCVideo",
  },
  {
    date: "2026-08-19",
    time: "10:00:00",
    title: "How to Repurpose 1 Podcast Episode into 15 Shorts & LinkedIn Clips",
    text: "🎙️ How to turn 1 podcast recording into 15 high-converting vertical clips for YouTube Shorts and LinkedIn. Learn the batching workflow used by South Florida leaders.\n\nExplore our video editing services:\nhttps://estebanmorenomedia.com/services/video-podcast-editing-service-miami\n\n#VideoPodcast #ContentRepurposing #LinkedInVideo #Shorts",
  },
];

async function dispatchAll() {
  console.log(`Starting live post scheduling to Metricool (Blog ID: ${BLOG_ID})...\n`);
  let successCount = 0;

  for (const [index, p] of posts.entries()) {
    const payload = {
      text: p.text,
      publicationDate: { dateTime: `${p.date}T${p.time}` },
      providers: [{ network: "linkedin" }, { network: "youtube" }],
      youtubeData: { title: p.title },
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "X-Mc-Auth": TOKEN,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        successCount++;
        console.log(`✅ [Post ${index + 1}/${posts.length}] Scheduled for ${p.date} @ ${p.time} (Metricool ID: ${json.data?.id})`);
      } else {
        const errText = await res.text();
        console.error(`❌ [Post ${index + 1}/${posts.length}] Error (${res.status}): ${errText}`);
      }
    } catch (err) {
      console.error(`❌ [Post ${index + 1}/${posts.length}] Network Exception:`, err);
    }
  }

  console.log(`\n🎉 Successfully scheduled ${successCount}/${posts.length} posts to Metricool!`);
}

dispatchAll();
