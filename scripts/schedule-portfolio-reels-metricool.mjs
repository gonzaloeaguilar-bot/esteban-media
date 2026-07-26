/**
 * Portfolio Reels & Shorts Metricool API Automation Script
 * Schedules Esteban's 8 verified portfolio projects as dedicated Reels & Shorts
 * across LinkedIn and YouTube Shorts on Metricool.
 */

const TOKEN = "AFUYQHCZBWELRKQWLRGFJAPPRWLZOPNKVZIIRPPVIXOXAOXFKOZIUZQWDQLPWCAW";
const BLOG_ID = "6619766";
const API_URL = `https://app.metricool.com/api/v2/scheduler/posts?blogId=${BLOG_ID}&userToken=${TOKEN}`;

const portfolioReelPosts = [
  {
    date: "2026-08-02",
    time: "14:00:00",
    title: "Bar Door Monkey Miami — Nightlife & Hospitality Reel Breakdown",
    text: "🍸 [PORTFOLIO SHOWCASE] Bar Door Monkey Miami — High-pacing nightlife video promo edited for maximum atmosphere and social engagement.\n\n🎬 Watch the full project breakdown & scope similar projects:\nhttps://estebanmorenomedia.com/portfolio/bar-door-monkey\n\n#NightlifeVideo #MiamiHospitality #VideoEditing #Miami #Reels",
  },
  {
    date: "2026-08-04",
    time: "14:00:00",
    title: "Healthy Smile Miami — Dental & Cosmetic Video Commercial",
    text: "🦷 [PORTFOLIO SHOWCASE] Healthy Smile Miami — Clean color grading, dialogue audio mastering (-14 LUFS), and motion graphics for aesthetic dental practice.\n\n🎬 View the project page & request custom scoping:\nhttps://estebanmorenomedia.com/portfolio/healthy-smile\n\n#MedSpaMarketing #DentalVideo #MiamiBusiness #VideoProduction",
  },
  {
    date: "2026-08-06",
    time: "14:00:00",
    title: "Diana & Jack — Luxury Event & Storytelling Video Showcase",
    text: "✨ [PORTFOLIO SHOWCASE] Diana & Jack — Cinematic event editing capturing soundscapes, speeches, and highlight moments in South Florida.\n\n🎬 Explore project credits & video details:\nhttps://estebanmorenomedia.com/portfolio/diana-jack\n\n#EventVideographer #SouthFlorida #VideoEditor #CinematicReel",
  },
  {
    date: "2026-08-08",
    time: "14:00:00",
    title: "My D'ler — Motion Animation & Explainer Commercial",
    text: "🚀 [PORTFOLIO SHOWCASE] My D'ler — 2D/3D kinetic typography and motion graphics designed to explain complex SaaS services in 11 seconds.\n\n🎬 Watch full animation & scope similar project:\nhttps://estebanmorenomedia.com/portfolio/my-dler\n\n#MotionGraphics #AnimationExplainer #VideoEditing #MiamiAgency",
  },
  {
    date: "2026-08-10",
    time: "14:00:00",
    title: "La Huelga — Narrative Short Film Pacing & Color Grading",
    text: "📽️ [PORTFOLIO SHOWCASE] La Huelga — Narrative storytelling, atmospheric sound design, and cinematic color grading.\n\n🎬 View the narrative project breakdown:\nhttps://estebanmorenomedia.com/portfolio/la-huelga\n\n#NarrativeFilm #Filmmaking #VideoEditor #CinemaGrade",
  },
  {
    date: "2026-08-12",
    time: "14:00:00",
    title: "Banacol — Corporate Brand Storytelling Video Commercial",
    text: "🏢 [PORTFOLIO SHOWCASE] Banacol — Corporate brand video editing balancing dialogue, b-roll footage, and corporate brand consistency.\n\n🎬 View full case study & details:\nhttps://estebanmorenomedia.com/portfolio/banacol\n\n#CorporateVideo #BrandStorytelling #VideoEditing #SouthFlorida",
  },
  {
    date: "2026-08-14",
    time: "14:00:00",
    title: "Homeowners — Real Estate Video Commercial Editing",
    text: "🏠 [PORTFOLIO SHOWCASE] Homeowners — Highlighting property interiors, natural lighting adjustments, and smooth transition cuts for real estate marketing.\n\n🎬 Explore property video scope:\nhttps://estebanmorenomedia.com/portfolio/homeowners\n\n#RealEstateVideo #PropertyTour #MiamiRealEstate #VideoEditor",
  },
  {
    date: "2026-08-16",
    time: "14:00:00",
    title: "ML Colombia — Fast-Paced Social Content Reel",
    text: "📱 [PORTFOLIO SHOWCASE] ML Colombia — High-converting social media edit optimized for vertical viewing with active captions and sound effects.\n\n🎬 View full reel breakdown:\nhttps://estebanmorenomedia.com/portfolio/ml-colombia\n\n#SocialMediaReels #ShortFormVideo #TikTokAds #VideoEditing",
  },
];

async function dispatchPortfolioReels() {
  console.log(`Starting live Portfolio Reels & Shorts dispatch to Metricool (Blog ID: ${BLOG_ID})...\n`);
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
        console.log(`✅ [Reel ${index + 1}/${portfolioReelPosts.length}] Scheduled for ${p.date} @ ${p.time} (Metricool ID: ${json.data?.id})`);
      } else {
        const errText = await res.text();
        console.error(`❌ [Reel ${index + 1}/${portfolioReelPosts.length}] Error (${res.status}): ${errText}`);
      }
    } catch (err) {
      console.error(`❌ [Reel ${index + 1}/${portfolioReelPosts.length}] Network Error:`, err);
    }
  }

  console.log(`\n🎉 Successfully scheduled ${count}/${portfolioReelPosts.length} Portfolio Reel campaigns to Metricool!`);
}

dispatchPortfolioReels();
