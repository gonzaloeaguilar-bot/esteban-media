/**
 * Metricool Live API Post Dispatcher - ACCELERATED 10-DAY VELOCITY
 * Schedules 10 bilingual commercial posts across LinkedIn and YouTube Shorts starting TODAY/TOMORROW.
 */

const TOKEN = "AFUYQHCZBWELRKQWLRGFJAPPRWLZOPNKVZIIRPPVIXOXAOXFKOZIUZQWDQLPWCAW";
const BLOG_ID = "6619766";
const API_URL = `https://app.metricool.com/api/v2/scheduler/posts?blogId=${BLOG_ID}&userToken=${TOKEN}`;

const posts = [
  {
    date: "2026-07-27",
    time: "13:30:00",
    title: "5 High-Converting Video Ad Hooks for 2026 #Shorts",
    text: "🔥 80% of viewers scroll past video ads in under 3 seconds. The secret? Pattern interrupt hooks.\n\nHere are 5 direct-response video script frameworks used by top South Florida brands, plus our 9:16 safe-zone overlay kit.\n\n👉 Download the free kit:\nhttps://estebanmorenomedia.com/resources/social-video-kit\n\n#VideoMarketing #ContentCreation #Reels #Shorts #MiamiBusiness",
  },
  {
    date: "2026-07-28",
    time: "10:00:00",
    title: "El Error Nº1 en Reels de Negocios en Miami #Shorts",
    text: "📱 El 85% del video en redes se consume SIN sonido. Si tus Reels no usan subtítulos animados dinámicos y mezcla a -14 LUFS, estás regalando tus clientes a la competencia.\n\n👉 Descarga gratis el Kit de Guiones 9:16:\nhttps://estebanmorenomedia.com/es/recursos/kit-video-social\n\n#EdicionDeVideo #Miami #ReelsParaNegocios #MarketingDigital",
  },
  {
    date: "2026-07-29",
    time: "10:00:00",
    title: "3 Attorney Video Ads That ACTUALLY Convert #Shorts",
    text: "⚖️ Corporate law firm videos are usually boring. Here is how top South Florida attorneys edit client case studies to build instant authority and inbound inquiries.\n\n👉 Audit your video strategy score:\nhttps://estebanmorenomedia.com/assessment\n\n#LawFirmMarketing #MiamiAttorneys #VideoProduction #FortLauderdale",
  },
  {
    date: "2026-07-30",
    time: "10:00:00",
    title: "Cómo Entregar Archivos 4K a tu Editor Remoto #Shorts",
    text: "🎬 ¿Tienes gigabytes de tomas 4K en tu cámara o iPhone y no sabes cómo enviarlas limpiamente? Diseñé la estructura de carpetas exacta que usan las agencias de contenido.\n\n👉 Descarga gratis la lista de chequeo:\nhttps://estebanmorenomedia.com/es/guias/entrega-de-material-remoto\n\n#EdicionRemota #CreadoresDeContenido #ProduccionDeVideo #SouthFlorida",
  },
  {
    date: "2026-07-31",
    time: "10:00:00",
    title: "9:16 Vertical vs 16:9 Export Safe-Zone Rules #Shorts",
    text: "💡 Why do your Reels get text cut off by Instagram UI buttons? You are ignoring 9:16 vertical safe margins.\n\nHere is our complete breakdown of multi-format export workflows:\nhttps://estebanmorenomedia.com/guides/vertical-horizontal-video-exports-and-safe-zones\n\n#ContentCreation #VideoEditor #SocialMediaStrategy #YouTubeShorts",
  },
  {
    date: "2026-08-01",
    time: "10:00:00",
    title: "Med Spa Patient Video Ad Breakdown #Shorts",
    text: "🏥 Before & after photo ads are being banned on social feeds. Patient transformation video stories with high-end color grading are taking over.\n\n👉 Estimate your video project scope in 30s:\nhttps://estebanmorenomedia.com/calculator\n\n#MedSpaMarketing #MiamiMedSpa #VideoEditing #Aesthetics",
  },
  {
    date: "2026-08-02",
    time: "10:00:00",
    title: "Diagnóstico de Estrategia de Video Bilingüe #Shorts",
    text: "✨ En South Florida, el contenido bilingüe (Inglés + Español) genera el doble de alcance orgánico. ¿Tu marca lo está ejecutando bien?\n\n👉 Realiza el test de 5 preguntas:\nhttps://estebanmorenomedia.com/es/evaluacion\n\n#MarketingBilingue #MiamiBusiness #EstrategiaDigital #SouthFlorida",
  },
  {
    date: "2026-08-03",
    time: "10:00:00",
    title: "Luxury Real Estate 4K Drone Editing Breakdown #Shorts",
    text: "🏢 4K aerial drone walkthroughs get 4x more inquiries than flat MLS photos. See how we edit luxury property videos for Brickell & Coral Gables agents.\n\n👉 View portfolio & scope project:\nhttps://estebanmorenomedia.com/portfolio\n\n#RealEstateMiami #LuxuryRealEstate #VideoProduction #Brickell",
  },
  {
    date: "2026-08-04",
    time: "10:00:00",
    title: "5 UGC Video Ad Scripts Outperforming Studio Ads #Shorts",
    text: "📦 Polished studio ads are failing on TikTok & Reels. User-Generated Content (UGC) with raw hooks is winning.\n\n👉 Access our 5 direct-response UGC ad scripts:\nhttps://estebanmorenomedia.com/resources/social-video-kit\n\n#EcommerceMarketing #TikTokAds #VideoEditing #UGCVideo",
  },
  {
    date: "2026-08-05",
    time: "10:00:00",
    title: "Turn 1 Podcast Episode into 15 Viral Shorts #Shorts",
    text: "🎙️ Stop letting your long-form podcasts sit unviewed. Here is the exact batching system we use to turn 1 hour of video into 15 high-converting vertical Shorts.\n\n👉 Explore podcast editing service:\nhttps://estebanmorenomedia.com/services/video-podcast-editing-service-miami\n\n#VideoPodcast #ContentRepurposing #LinkedInVideo #Shorts",
  },
];

async function dispatchAll() {
  console.log(`Starting ACCELERATED post scheduling to Metricool (Blog ID: ${BLOG_ID})...\n`);
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
        console.log(`✅ [Accelerated Post ${index + 1}/${posts.length}] Scheduled for ${p.date} @ ${p.time} (Metricool ID: ${json.data?.id})`);
      } else {
        const errText = await res.text();
        console.error(`❌ [Accelerated Post ${index + 1}/${posts.length}] Error (${res.status}): ${errText}`);
      }
    } catch (err) {
      console.error(`❌ [Accelerated Post ${index + 1}/${posts.length}] Network Exception:`, err);
    }
  }

  console.log(`\n🎉 Successfully scheduled ${successCount}/${posts.length} accelerated posts to Metricool!`);
}

dispatchAll();
