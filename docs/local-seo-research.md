# Local SEO Research — Esteban Moreno Media

Date: 2026-05-22

## What The SERP Shows

The broad head terms are crowded. Fort Lauderdale and Miami results are dominated by full-service production companies that lead with "video production company", corporate work, events, commercials, and agency strategy.

For launch, Esteban should not fight the strongest pages only on "video production Miami" or "video production Fort Lauderdale". The better first architecture is:

- City/county core pages: video editor, video editing, videographer.
- Niche service pages: reels editing, real estate/property video, restaurant video, drone/aerial video.
- Proof assets: portfolio thumbnails, GBP photos/videos, reviews, social links, and real examples as soon as available.

## Competitor Signals

| Competitor | Market | What They Rank/Position Around | Opening |
| --- | --- | --- | --- |
| Shine Creative Media | Fort Lauderdale | Video packages, social media, corporate events, case studies, conversion-focused video. | Esteban can lead with smaller edit-first and reels-first offers. |
| Shout Creative | Fort Lauderdale | Full-service production, corporate, social media, convention, animation, documentary, TV. | Avoid agency breadth; go narrower by use case. |
| Digital Cut Productions | Fort Lauderdale | Established corporate/commercial/healthcare production and camera crews. | Do not compete on authority yet; compete on local, practical, fast editing. |
| Driven Films | Broward/Fort Lauderdale | Commercial, event, documentary, photography, post-production, social marketing. | Broward can work as a hub with narrower child pages. |
| VideoHouse | Miami | Instagram Reels, YouTube, video ads, product video, event video. | Miami demand validates reels/social, but pages need tighter niche intent. |
| SoBe Films | Miami | Film/digital, social/reels, commercials, events, post-production. | Position Esteban below the premium studio tier with specific deliverables. |
| Short Form Media | Miami | TikTok, Reels, Shorts, scripting, filming, editing, captions, distribution. | Short-form is real demand; localize it and pair with bilingual/editor-led work. |
| Dragos Cinematics / Edin Studios | South Florida/Fort Lauderdale | Drone, aerial photography/video, real estate, construction, waterfront property. | Tie aerials to final edited video, not just drone capture. |

## Keyword Clusters To Build Around

| Priority | Cluster | Keywords |
| --- | --- | --- |
| Launch | Local editor core | Fort Lauderdale video editor, Broward video editing, Miami video editor, video editing services Broward County |
| Launch | Short-form / reels | Fort Lauderdale reels editor, Instagram Reels video editing Fort Lauderdale, Miami short-form video editor, social media video editing Miami |
| Launch | Property / aerial | Broward real estate video, Fort Lauderdale listing video, Fort Lauderdale drone video, aerial video Fort Lauderdale |
| Launch | Hospitality / restaurant | Miami restaurant video, Miami restaurant reels, food video editor Miami, hospitality video Miami |
| Next | Bilingual creator/editor | bilingual video editor Miami, Spanish video editor Fort Lauderdale, English Spanish video editing South Florida |

## Implemented Architecture

The code now separates SEO data from UI:

- `lib/seo/market-research.ts` stores competitor signals and keyword clusters.
- `lib/local-seo-pages.ts` stores typed page data, keyword intent, FAQs, audience segments, related links, and source ids.
- `app/[locale]/[localSlug]/page.tsx` renders from the page model and emits local Service + FAQ JSON-LD.
- `app/sitemap.ts` automatically includes every published local SEO page in both languages.

This means a future Claude/design pass can replace the visual layout while leaving the route list, metadata, schema, and content strategy intact.

## Published Launch Pages

- `/en/fort-lauderdale-video-editor`
- `/en/broward-video-editing`
- `/en/miami-video-editor`
- `/en/fort-lauderdale-reels-video-editing`
- `/en/broward-real-estate-video`
- `/en/miami-restaurant-video`
- `/en/fort-lauderdale-drone-video`

Spanish versions publish under `/es/*` with matching slugs.

## Next Data Needed

- Real portfolio assets from Esteban: 3-6 videos per niche, even if some are embeds.
- Google Business Profile category, services, photos/videos, and first review strategy.
- Confirm drone license/commercial flight constraints before making any FAA-certified claim.
- Final domain/email setup: `estebanmorenomedia.com` and a branded inbox.
