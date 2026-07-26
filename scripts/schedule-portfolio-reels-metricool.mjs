/**
 * Portfolio Reels & Shorts Metricool API Automation Script - ACCELERATED DAILY CADENCE
 * Schedules Esteban's 8 verified portfolio projects as dedicated Reels & Shorts
 * across LinkedIn and YouTube Shorts on Metricool starting TODAY/TOMORROW.
 */

const TOKEN = "AFUYQHCZBWELRKQWLRGFJAPPRWLZOPNKVZIIRPPVIXOXAOXFKOZIUZQWDQLPWCAW";
const BLOG_ID = "6619766";
const API_URL = `https://app.metricool.com/api/v2/scheduler/posts?blogId=${BLOG_ID}&userToken=${TOKEN}`;

const portfolioReelPosts = [
  {
    date: "2026-07-27",
    time: "15:00:00",
    title: "Bar Door Monkey Miami — High-Energy Nightlife Edit #Shorts",
    text: "🍸 How we edited this high-energy promo for Bar Door Monkey Miami to capture the authentic Wynwood night vibe and drive weekend bookings.\n\n🎬 Watch full project & scope similar work:\nhttps://estebanmorenomedia.com/portfolio/bar-door-monkey\n\n#NightlifeVideo #MiamiHospitality #VideoEditing #Miami #Reels",
  },
  {
    date: "2026-07-28",
    time: "15:00:00",
    title: "Healthy Smile Miami — Aesthetic Dental Promo Edit #Shorts",
    text: "🦷 Clean color grading, dialogue audio mastering (-14 LUFS), and motion graphics for Healthy Smile Miami.\n\n🎬 View the project page & request custom scoping:\nhttps://estebanmorenomedia.com/portfolio/healthy-smile\n\n#MedSpaMarketing #DentalVideo #MiamiBusiness #VideoProduction",
  },
  {
    date: "2026-07-29",
    time: "15:00:00",
    title: "Diana & Jack — Luxury Event & Storytelling Reel #Shorts",
    text: "✨ Cinematic event editing capturing soundscapes, speeches, and highlight moments in South Florida.\n\n🎬 Explore project credits & video details:\nhttps://estebanmorenomedia.com/portfolio/diana-jack\n\n#EventVideographer #SouthFlorida #VideoEditor #CinematicReel",
  },
  {
    date: "2026-07-30",
    time: "15:00:00",
    title: "My D'ler — 11-Second SaaS Motion Animation #Shorts",
    text: "🚀 2D/3D kinetic typography and motion graphics designed to explain complex SaaS services in 11 seconds.\n\n🎬 Watch full animation & scope similar project:\nhttps://estebanmorenomedia.com/portfolio/my-dler\n\n#MotionGraphics #AnimationExplainer #VideoEditing #MiamiAgency",
  },
  {
    date: "2026-07-31",
    time: "15:00:00",
    title: "La Huelga — Award-Winning Short Film Color Grade #Shorts",
    text: "📽️ Narrative storytelling, atmospheric sound design, and cinematic color grading for La Huelga.\n\n🎬 View the narrative project breakdown:\nhttps://estebanmorenomedia.com/portfolio/la-huelga\n\n#NarrativeFilm #Filmmaking #VideoEditor #CinemaGrade",
  },
  {
    date: "2026-08-01",
    time: "15:00:00",
    title: "Banacol — Corporate Brand Video Editing Breakdown #Shorts",
    text: "🏢 Corporate brand video editing balancing dialogue, b-roll footage, and corporate brand consistency.\n\n🎬 View full case study & details:\nhttps://estebanmorenomedia.com/portfolio/banacol\n\n#CorporateVideo #BrandStorytelling #VideoEditing #SouthFlorida",
  },
  {
    date: "2026-08-02",
    time: "15:00:00",
    title: "Homeowners — Property Video Editing Breakdown #Shorts",
    text: "🏠 Highlighting property interiors, natural lighting adjustments, and smooth transition cuts for real estate marketing.\n\n🎬 Explore property video scope:\nhttps://estebanmorenomedia.com/portfolio/homeowners\n\n#RealEstateVideo #PropertyTour #MiamiRealEstate #VideoEditor",
  },
  {
    date: "2026-08-03",
    time: "15:00:00",
    title: "ML Colombia — High-Converting Vertical Social Reel #Shorts",
    text: "📱 High-converting social media edit optimized for vertical viewing with active captions and sound effects.\n\n🎬 View full reel breakdown:\nhttps://estebanmorenomedia.com/portfolio/ml-colombia\n\n#SocialMediaReels #ShortFormVideo #TikTokAds #VideoEditing",
  },
];

async function dispatchPortfolioReels() {
  console.log(`Starting ACCELERATED Portfolio Reels dispatch to Metricool (Blog ID: ${BLOG_ID})...\n`);
  let count = 0;

  for (const [index, p] of portfolioReelPosts.entries()) {
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
        count++;
        console.log(`✅ [Accelerated Reel ${index + 1}/${portfolioReelPosts.length}] Scheduled for ${p.date} @ ${p.time} (Metricool ID: ${json.data?.id})`);
      } else {
        const errText = await res.text();
        console.error(`❌ [Accelerated Reel ${index + 1}/${portfolioReelPosts.length}] Error (${res.status}): ${errText}`);
      }
    } catch (err) {
      console.error(`❌ [Accelerated Reel ${index + 1}/${portfolioReelPosts.length}] Network Error:`, err);
    }
  }

  console.log(`\n🎉 Successfully scheduled ${count}/${portfolioReelPosts.length} accelerated Reel campaigns to Metricool!`);
}

dispatchPortfolioReels();
