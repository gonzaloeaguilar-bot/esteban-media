import type { DeepDive } from "@/lib/service-deep-dive-content";
import type { ServiceFaq, RelatedService } from "@/components/service-depth";
import {
  SHORT_FORM,
  RAW_FILMING_RATES,
  ARRANQUE_WEEKLY_OPTIONS,
  usd,
} from "@/lib/pricing";

const starterPrice = usd(SHORT_FORM.perVideoFrom);
const oneWeekly = usd(ARRANQUE_WEEKLY_OPTIONS[0].pricePerWeek);
const twoWeekly = usd(ARRANQUE_WEEKLY_OPTIONS[1].pricePerWeek);
const halfDayFilming = usd(RAW_FILMING_RATES.halfDay);
const fullDayFilming = usd(RAW_FILMING_RATES.fullDay);

export const TALKING_HEAD_DEEP_DIVE: DeepDive = {
  id: "talking-head-guide",
  title: "How does remote talking-head video editing work?",
  destinations: "From your Google Drive recording to clean social clips, long-form episodes, and clear decision boundaries.",
  sections: [
    {
      heading: "How should you record and send talking-head footage?",
      paragraphs: [
        "You do not need an elaborate commercial production studio to produce credible talking-head authority. Place your phone or mirrorless camera on a stable tripod at eye level, face natural window light or a soft diffused key light, and clip an inexpensive wireless lavalier microphone close to your collar. Speak naturally through your talking points or script, allowing natural pauses between separate ideas.",
        "Upload your raw uncompressed video files directly to Google Drive, Dropbox, or OneDrive. Share the folder link with editing permissions. There is no requirement to trim your bad takes, scrub audio hiss, or synchronize multi-takes before sending; post-production cuts false starts, tightens breath gaps, and extracts your clearest arguments into punchy delivery.",
      ],
    },
    {
      heading: "When should you send raw phone footage versus booking on-location filming?",
      paragraphs: [
        `The decision boundary depends strictly on format and commercial intent. When you share educational explainers, founder commentary, industry reaction, or regular social updates, your smartphone camera recording edited for ${starterPrice} per video delivers immediate return with zero production downtime.`,
        `Conversely, when your project requires multi-angle lighting, environmental corporate backdrop, product interaction, or customer interviews on-site, scheduling on-location capture at ${halfDayFilming} for a half-day or ${fullDayFilming} for a full day provides dedicated camera operation and pristine dialogue recording across South Florida.`,
      ],
    },
    {
      heading: "What technical polish goes into every finished talking-head edit?",
      paragraphs: [
        "Raw footage undergoes precise audio remastering to eliminate ambient air-conditioning hum, room reverberation, and sudden volume spikes. Pacing adjustments trim dead air, verbal filler words, and awkward hesitations while maintaining the natural cadence and cadence of your voice.",
        "Depending on your publishing distribution, edits are exported in high-bitrate 9:16 vertical orientation with dynamic burned-in animated subtitles for Instagram Reels, TikTok, and YouTube Shorts, alongside standard 16:9 widescreen masters with custom title cards and chapter markers for YouTube and website embedding.",
      ],
    },
  ],
};

export const TALKING_HEAD_FAQS: ServiceFaq[] = [
  {
    question: "What files do I need to supply to begin talking-head editing?",
    answer:
      "Share a Google Drive, Dropbox, or OneDrive link containing your raw unedited recordings, your brand logo, font preferences or brand colors, and any specific notes or timestamps you want prioritized. We handle audio mastering, pause trimming, framing adjustments, and caption styling.",
  },
  {
    question: "How much does talking-head video editing cost?",
    answer:
      `Single talking-head video edits start at ${starterPrice} per video under our Starter package. For consistent creators publishing weekly, our recurring editing plans start at ${oneWeekly} per week for one video or ${twoWeekly} per week for two videos. Dedicated on-location filming is available across Miami-Dade and Broward at ${halfDayFilming} for a half-day or ${fullDayFilming} for a full day.`,
  },
  {
    question: "Can you create both 16:9 YouTube videos and 9:16 vertical Shorts from the same take?",
    answer:
      "Yes. A single horizontal or vertical talking-head recording can be edited into a full-length 16:9 YouTube video and selectively repurposed into punchy 9:16 vertical clips with dynamic captions for Instagram Reels, TikTok, and YouTube Shorts.",
  },
  {
    question: "What languages do you edit talking-head videos in?",
    answer:
      "We provide native bilingual post-production in English, Spanish, or dual-language formats with accurate localized captions, correct terminology, and cultural nuance suited for South Florida and international audiences.",
  },
];

export const TALKING_HEAD_RELATED: RelatedService[] = [
  { title: "Short-Form Video Editor Miami", detail: "Vertical edits with dynamic captions for Reels, TikTok and Shorts.", href: "/services/short-form-video-editor-miami" },
  { title: "YouTube Long-Form Video Editing", detail: "Multi-chapter long-form video editing and audio mastering.", href: "/services/youtube-long-form-video-editing" },
  { title: "Personal Brand Video Editor Founders Miami", detail: "Executive and founder personal brand content series.", href: "/services/personal-brand-video-editor-founders-miami" },
  { title: "Bilingual Video Subtitling Service", detail: "Accurate Spanish and English subtitling and localization.", href: "/services/bilingual-video-subtitling-service" },
];

export const CHRISTIAN_YOUTUBE_DEEP_DIVE: DeepDive = {
  id: "christian-youtube-guide",
  title: "How does YouTube video editing work for Christian and devotional channels?",
  destinations: "Editing sermons, Bible studies, and home devotionals into engaging YouTube videos and vertical clips.",
  sections: [
    {
      heading: "How should Christian creators and ministries structure YouTube recordings?",
      paragraphs: [
        "Home devotionals, pastoral teachings, and theological studies connect best when opening with a clear spiritual takeaway or practical life question in the first fifteen seconds. State the scripture passage and theme immediately before transitioning into your personal teaching, biblical reflection, or devotional commentary.",
        "Keep scripture citations visible on screen through clean, respectful lower-third graphics rather than distracting motion animations. When referencing biblical commentary, original language definitions, or contextual background, concise on-screen text anchors viewer comprehension and encourages notebook study.",
      ],
    },
    {
      heading: "When to choose remote home footage editing versus booking a half-day filming session?",
      paragraphs: [
        `Home devotional creators, solo pastors recording weekly studies, and ministry educators achieve consistent channel growth by recording from home with their phone or camera and uploading raw takes for remote post-production at ${starterPrice} per video under our Starter package.`,
        `When planning a formal multi-part Bible curriculum, an annual ministry conference, or a church anniversary documentary, scheduling professional on-location filming at ${halfDayFilming} for a half-day or ${fullDayFilming} for a full day provides dedicated lighting, multi-microphone audio capture, and professional camera operation across Broward and Miami-Dade.`,
      ],
    },
    {
      heading: "How do long devotional teachings get repurposed into weekly short-form clips?",
      paragraphs: [
        "A twenty-minute Sunday message or home Bible study contains multiple self-contained devotional insights. During the long-form edit, key one-minute reflections, prayer points, and scripture explanations are identified and exported into vertical 9:16 clips with burned-in subtitles.",
        "These vertical excerpts are scheduled across YouTube Shorts, Instagram Reels, and TikTok throughout the week, directing organic viewers back to the full study while keeping church members and subscribers spiritually encouraged between weekend services.",
      ],
    },
  ],
};

export const CHRISTIAN_YOUTUBE_FAQS: ServiceFaq[] = [
  {
    question: "What files does a ministry or Christian creator need to send?",
    answer:
      "Send your raw camera or phone recordings via Google Drive, Dropbox, or OneDrive, along with your sermon outline, Bible references (specifying translation), and any preferred graphic assets. We edit false starts, enhance audio, overlay scripture graphics, and master volume levels.",
  },
  {
    question: "How much does Christian YouTube video editing cost?",
    answer:
      `Editing starts at ${starterPrice} per video under our Starter package. For channels publishing weekly devotionals or sermons, editing plans start at ${oneWeekly} per week for one video or ${twoWeekly} per week for two videos. Scoped on-location filming is available across South Florida at ${halfDayFilming} for a half-day or ${fullDayFilming} for a full day.`,
  },
  {
    question: "How do you handle copyrighted worship music in YouTube edits?",
    answer:
      "To avoid copyright strikes and demonetization, edits utilize licensed, royalty-free background pads or quiet acoustic tracks unless your ministry holds documented commercial sync and broadcast licensing for specific worship songs.",
  },
  {
    question: "Can you provide devotional editing in Spanish and English?",
    answer:
      "Yes. We specialize in bilingual Hispanic ministries and dual-language creators, delivering accurate biblical terminology, correct scriptural citations, and natural Spanish, English, or dual-subtitled exports.",
  },
];

export const CHRISTIAN_YOUTUBE_RELATED: RelatedService[] = [
  { title: "Church Sermon Clip Editing Miami", detail: "Sunday sermon recordings edited into captioned vertical social clips.", href: "/services/church-sermon-clip-editing-miami" },
  { title: "YouTube Long-Form Video Editing", detail: "Full-length episodic video editing with chapter markers and graphics.", href: "/services/youtube-long-form-video-editing" },
  { title: "Talking-Head Video Editing", detail: "Remote supplied-footage editing for home speakers and educators.", href: "/services/talking-head-video-editing" },
  { title: "Content Repurposing Service Miami", detail: "Turn long recordings into a full week of multi-platform social clips.", href: "/services/content-repurposing-service-miami" },
];
