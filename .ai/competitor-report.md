# Competitor citation study: Fort Lauderdale / Miami video editing and production

Date: 2026-11-03. Read-only. Decision this unlocks: which $0 page and profile changes are worth shipping on estebanmorenomedia.com before any new build. Verdict: TRIAL the moves below, each with a measurable gate. Nothing here proves a cause.

## 0. Premise correction (read first)

The ask said estebanmorenomedia.com is not cited. The probe files say otherwise (`data/probe-sonar.json`, `data/probe-gpt-online.json`, counted by script):

- Sonar returned the domain on 5 of 10 prompts (ES reels FTL, real estate South Florida, ES Miami small business, Reels cost South Florida, yacht FTL).
- GPT-4o-mini with web search returned it on 8 of 10 (all but "best video production company FTL for small businesses" and "remote video editor for small businesses").
- estebanmorenomedia.com is the most frequent domain across both files: 13 of 125 returned-domain slots. Next: linkedin 6, opticvault 4, markstudios 4.
- Prompts where Esteban is absent in BOTH engines: "Best video production company in Fort Lauderdale for small businesses" and "Remote video editor for small businesses". Absent in Sonar only: EN Reels editor FTL, short-form Miami, Restaurant editor Miami.

So the real question is the narrower gap: company/agency-framed and generic-remote prompts, plus English Sonar prompts.

Limits (class: inference about the probes): n=10 prompts, one run each. Memory notes 1-run flips are noise. Cited URLs were not stored, only domains, so which competitor page was cited is UNKNOWN. Where I say "money page" below I used the best-matching page I could fetch. A rerun that stores full URLs is the smallest test to close this.

## 1. Competitor table (direct evidence: fetched today with curl_cffi impersonate=chrome; raw HTML in `comp-raw/`)

Class labels: DIRECT = read from the fetched page; SEARCH = WebSearch snippet (secondary, noisy); UNVERIFIED = not confirmed.

| Domain | Where it co-occurred | Page structure observed (DIRECT) | Reviews and Google profile | Off-site listings |
|---|---|---|---|---|
| markstudios.com | Sonar 4/10 (ES reels FTL, real estate SoFla, Reels cost, restaurant Miami) | Home 3,423 words, 11-Q FAQPage. Reels page (`/services/video-editing/instagram-reels-editing`) has 8-Q FAQPage, "Updated October 22, 2026", answer-first intro, sourced stat (Meta 50% of Instagram time, linked), specs table "read September 2026", human-vs-AI table, per-plan prices in the FAQ ($750 / $2,000 / $2,700 / $3,500). FTL page (`/locations/fort-lauderdale/videographer`) names Las Olas, Bahia Mar, Pier Sixty-Six, Port Everglades, New River, has "Who is the best videographer in Fort Lauderdale?" answered with its own name, and a cost answer that admits it has not checked Broward rates and cites other studios' ranges with a check date. JSON-LD: Organization, ProfessionalService (areaServed, priceRange), Person, FAQPage. 15 location links, `/best/...` lists, glossary. | "4.9 out of 5 from 4,500+ reviews" above the fold; footnote on the same page says these are Fiverr. Same page says "5.0 on Google (6 reviews)". SEARCH: Fiverr counts vary 3,944 to 4,633 across pages. | sameAs lists Clutch, The Manifest, techbehemoths, pbfilm, Yelp, g.page link, Fiverr, Upwork, Wikidata (self-listed), Facebook. Only The Manifest verified live (HTTP 200, "1 Review"). Clutch and Yelp 403 (Cloudflare), so UNVERIFIED. Address conflict: site says Lake Worth FL; one SEARCH snippet said St. Petersburg. UNVERIFIED which is right. |
| opticvaultmarketing.com | GPT 4/10 (EN reels FTL, ES reels FTL, Reels cost) and Sonar ES reels FTL | A contractor-marketing agency, not a video editor. Home 3,775 words, 9 `<details>`, FAQPage 9 Q, first Q "Who is Optic Vault Marketing?" with a full definitional answer. Visible prices ($1,650/mo, $14,900 build). County list in LocalBusiness areaServed (Miami-Dade, Broward, Palm Beach). "Do you work in Spanish?" Q. Mentions "reel maker and filmer". FTL page has 5-Q FAQPage incl. cost. Person schema for 3 staff. | No reviews found. SEARCH: DesignRush listing shows no reviews, names 3 clients, says founded 2026. No Clutch review profile found. GBP UNVERIFIED. | sameAs: Clutch (403, UNVERIFIED), BBB (Hialeah), Yelp (403), Pinterest, Alignable, Facebook, Instagram, TikTok, YouTube. DesignRush profile verified live (HTTP 200). |
| robbiesantana.com | GPT 3/10 (Miami short-form, real estate SoFla, ES Miami) | 912 words, ZERO JSON-LD, no FAQ. Title "Video Editor & Colorist - Miami". Two visible price cards ($300 per project up to 60s, 1 revision; $800 up to 3 min, 2 revisions). EN/ES toggle. Neighborhoods and events named (Wynwood, Brickell, Art Basel). Case blurbs, no client names. | "What Clients Say" section exists on page; no source or count. No GBP found. UNVERIFIED. | Only Vimeo and YouTube links. No directories seen. |
| shortscreation.com | GPT 2/10 (Miami short-form, ES Miami) | 814 words, Organization JSON-LD only, no FAQ. Three tiers with explicit deliverables (15 / 30 / 30+ videos per month, filming hours). No prices shown. Miami in one place only. | None found. UNVERIFIED. | None seen. |
| ballmediainnovations.com | Sonar 1/10 (real estate SoFla), GPT 1/10 (best production company FTL) | Title "Corporate, Event & Marketing Video Production in Miami & Orlando". 1,279 words, VideoObject + Organization schema, no FAQ, no prices. "Trusted for more than 25 years", "since 2002". Testimonial videos. | Testimonials on page; no count or source. GBP UNVERIFIED. | sameAs: Facebook, X, LinkedIn, Pinterest, YouTube. |
| c-istudios.com | Sonar (best production company FTL) | LocalBusiness + ProfessionalService + Offer schema, nine office addresses incl. 1111 Brickell Ave, no FAQ, no prices. Title "Global Creative Studio for Brands". | None on page. | Yelp, Vimeo, LinkedIn links. |
| foundationdigitalmedia.com | Sonar (best production company FTL) | A Washington DC company (title and meta say DC, MD, VA). FAQPage 5 Q incl. "How much does it cost to hire a professional video production company?" with a prose answer, no figure. Miami and Fort Lauderdale appear only in a city list. "Emmy Award-winning", "since 2009". | None found. | Social links only. |
| shoutcreative.tv | Sonar (best production company FTL) | Home is the FTL page: title "Fort Lauderdale Video Production Company - Shout Creative", 2,424 words, no FAQ, no prices, Article/Organization schema. | DesignRush profile verified live: shows "5.0" reviews dated 2023 and 2024. SEARCH: G2 0 reviews. GBP link present in page (google.com/maps) but not opened. | DesignRush (200), Giggster list, Clutch (not found in snippets), Gartner agency page. |
| coastalcreativemedia.com | GPT (yacht FTL) | DEAD today: HTTP 404 "Site not found" on www, apex and robots.txt. Not copyable. Shows the engine can return a domain that no longer resolves. | n/a | n/a |
| offmenustudio.com | GPT (restaurant Miami) | 781 words, minimal LocalBusiness JSON-LD, FAQ in text (not schema). Named restaurant clients with measured follower growth (e.g. "Serious Sanji: 2K to 82.5K Instagram"). No prices. | None on page. GBP UNVERIFIED. | Instagram, TikTok. |
| insideeditors.com | Sonar 2/10 (Miami short-form, ES Miami) | Cambridge MA company, no Miami content. 2,245 words, title "Video Editing Services $14", AggregateOffer $14-$350, ProfessionalService, one Instagram Reels sub-page link. Visible "$100 per video" and package prices. | Trustpilot link in sameAs (403, UNVERIFIED count). | Clutch, Trustpilot, LinkedIn. |

## 2. What the data does and does not show (falsification attempts)

- Local address is not needed to co-occur: Foundation Digital Media (DC) and Inside Editors (Cambridge MA) both appear on South Florida prompts.
- JSON-LD is not needed: robbiesantana.com has none and co-occurs 3 times. Esteban's pages already carry more schema types than most rows above (LocalBusiness/ProfessionalService, Offer x5, FAQPage x5 Q, Person, BreadcrumbList), so schema is not where Esteban is thin.
- Reviews are not needed: Optic Vault (founded 2026 per DesignRush snippet) has none and appears 5 times. Reviews cannot explain the pattern.
- Visible prices appear on 4 of the 10 live competitors (Mark, Optic Vault, Robbie, Inside Editors). Esteban already shows "From $100 per video" and four package prices on the FTL page: parity.
- On "best company" prompts, Sonar's other returned sources were mostly aggregators: across both files the aggregator and job-board slots were clutch.co 3, linkedin 6, indeed 3, 50pros 2, themanifest 2, designrush 2, craigslist 2, bark 1, bbb 1. Co-occurs with the engine citing lists instead of brand sites on those prompts. Inference: being listed on those lists may matter more than on-page edits for that prompt class. Not proved.

## 3. Esteban comparison (DIRECT, from `raw/p1.html`, `p2.html`, `p5.html`)

Has: answer-first H1 and price table on `/services/video-production-fort-lauderdale` (Starter $100, Growth $950, Local Presence $1,600, All-In custom; videographer from $125/hour), 5-Q FAQPage, "Updated October 29, 2026", phone/WhatsApp/email, 573 sitemap URLs including restaurant pages (`/services/restaurant-promo-video-editing-miami`, `/services/waterfront-restaurant-video-fort-lauderdale`). Home LocalBusiness sameAs lists Google Maps cid, Bing Maps, Instagram, Behance, Vimeo, Nextdoor and a Clutch URL.

Lacks (counted by grep, 0 hits in `p1`, `p2`, `p5` text):
1. Reviews on the money pages. Home carries "5.0 rating, 18 public reviews on Google" with eight named reviews (class: site claim, not re-verified here; Google Maps page is JS-rendered), but `p2` and `p5` carry none.
2. Any venue or neighborhood name (Las Olas, Bahia Mar, Wynwood, Brickell, Port Everglades): 0 hits.
3. Any externally sourced figure with a link and check date: 0 on the Reels page.
4. FAQPage parity with visible Q&A: `p5` JSON-LD lists 5 Qs, none of which is the visible "How much does a videographer cost in Fort Lauderdale?" or "Who can help me with video production in Fort Lauderdale?". Visible and schema FAQ diverge.
5. Named clients: the page states it publishes only real work and invents none, so this is a deliberate choice, not a defect.
6. Directory presence: Clutch (403, UNVERIFIED), The Manifest URL returns 200 but my negative control also hit a WAF so it may be a stub (UNVERIFIED), Upwork URL returns a generic page (UNVERIFIED). No BBB, Yelp, Alignable, DesignRush (404 on guessed slug), Bark (404 guessed slug) found.

## 4. Copyable moves, ranked by cost (all $0 cash; times are builder estimates, inference)

| # | Move | Evidence on competitor | What Esteban lacks | Cost | Gate |
|---|---|---|---|---|---|
| 1 | Sync FAQPage JSON-LD with the visible Q&A on `p5` and `p2`. Add the cost Q and the "who can help" Q, answered first-sentence with the brand name. | markstudios.com/locations/fort-lauderdale/videographer: "Who is the best videographer in Fort Lauderdale?" and cost Q both in schema. opticvaultmarketing.com first FAQ "Who is Optic Vault Marketing?" | `p5` schema Qs differ from the visible ones. | 20 min | Rich results test shows 7 Qs; rerun the 10 prompts. |
| 2 | Add a short real-reviews block with source and count to the FTL, Reels and Miami money pages, reusing the Google reviews already on home. Label the source ("Google, 18 public reviews") exactly as Mark labels Fiverr. | markstudios.com home: "4.9 out of 5 from 4,500+ reviews" plus footnote naming Fiverr and "5.0 on Google (6 reviews)". | `p2`, `p5` have none. Precondition: re-read the live Google count first (UNVERIFIED today). Do not add self-serving aggregateRating markup to the business. Keep names as already public. | 30 min | Count on page equals live Google count on the day. |
| 3 | Name real Fort Lauderdale venues and districts Esteban has actually worked or can scope (only those supported by portfolio items), with one sentence on what is filmed there. | markstudios.com FTL page: Las Olas, Bahia Mar, Pier Sixty-Six, Port Everglades, New River. robbiesantana.com: Wynwood, Brickell, Art Basel. | 0 hits on `p1`, `p2`, `p5`. | 30 min | Every named place maps to a portfolio piece or is labeled "scopable". |
| 4 | Add one sourced fact per money page with link and check date, e.g. platform specs or Reels share of time, copied from the primary source. | markstudios.com Reels page: Meta 50% stat linked, specs table "read September 2026". | None on `p2`. | 45 min | Each figure has URL and retrieval date; no unsourced numbers. |
| 5 | Claim free profiles and keep NAP identical: Yelp, Alignable, BBB basic listing (not accreditation, that is paid), Upwork, DesignRush, Bark. Verify existing Clutch and Manifest first. | opticvaultmarketing.com sameAs: Clutch, BBB, Yelp, Alignable, Pinterest; DesignRush profile live (founded 2026 per snippet). markstudios.com: Clutch, Manifest, Yelp, Upwork, Fiverr. | Esteban's sameAs verified-live: Google Maps, Nextdoor only. | 20 min each | Each URL returns 200 with the exact business name and phone; add to sameAs. |
| 6 | Add a "who is" paragraph and a plain-language comparison page: "How to choose a video production company in Fort Lauderdale: 7 questions", with criteria, no claim of being best. | markstudios.com `/best/video-editing-services`; foundationdigitalmedia.com FAQ "What should I look for when hiring a video production company?" | No selection-criteria page; Esteban absent on the "best company" prompt in both engines. | 2 hours | Esteban returned on that prompt in 2 of 3 reruns per engine. |
| 7 | Bilingual line on the FTL page header: "Spanish and English", and a "Do you work in Spanish?" FAQ. | opticvaultmarketing.com Q; robbiesantana.com EN/ES toggle. | Spanish pages exist (`/es/editor-de-reels-fort-lauderdale`) but the English money page has no such Q (inferred from schema list). | 15 min | FAQ present in raw HTML via curl. |
| 8 | Restaurant: publish measured outcomes ONLY for clients who consented and for numbers you can show. | offmenustudio.com: "Wan's: 0 to 97.2K TikTok". | Esteban has restaurant pages; no consented before/after numbers visible in the fetched pages. | Needs client consent; owner gate | Written client approval on file, source screenshot linked. Else AVOID. |

## 5. UNKNOWN or AVOID

- UNKNOWN: which competitor URL each engine cited; competitor Google Business Profile review counts (Maps is JS-rendered); Clutch, Yelp and Trustpilot contents (Cloudflare 403); Mark Studios' true HQ; whether Esteban's Manifest, Clutch and Upwork pages are real or stubs.
- AVOID: copying "4,500+ reviews"-style headline numbers without a labeled source; self-serving aggregateRating markup; Wikidata entry (needs notability sources; Mark self-lists one, I did not verify it); paid BBB accreditation or any paid directory tier; claiming any move causes citation.
- Co-occurs only: Mark Studios is returned most often among competitors, and also has the largest page set (139 internal links, 15 location links), but a larger site is not shown to cause it.

## 6. Next test (smallest, $0)

Rerun the 10 prompts x 3 runs per engine after moves 1 to 4 and store the full cited URLs, then compare Esteban's presence on the two gap prompts. Keep a control prompt set untouched. Note the memory warning that the OpenRouter key has had a $0 limit; the GPT file was written today, so the lane worked at that time.

## 7. Route

- Build of moves 1 to 4 and 7: cto-dev-lead with the Esteban site fixer, acceptance by curl of raw HTML plus the analytics gate.
- Public wording on reviews and venues: cto-copy-lead.
- Profile claims need Esteban's login or consent: owner gate.
- Re-measurement: this lead.

Sources (all retrieved 2026-11-03): the competitor home and sub-pages listed in section 1 fetched by curl_cffi; `https://themanifest.com/company/mark-studios` (200, "1 Review"); `https://www.designrush.com/agency/profile/optic-vault-marketing` (200); `https://www.designrush.com/agency/profile/shout-creative` (200, 5.0 reviews 2023 and 2024); `https://nextdoor.com/pages/esteban-moreno-media-fort-lauderdale-fl/` (200); WebSearch snippets for Mark Studios, Optic Vault, Shout Creative and Esteban (secondary, noisy). Scripts: `scripts/fetch.py`, `scripts/ld.py`, `scripts/txt.py` under the same geo folder.
