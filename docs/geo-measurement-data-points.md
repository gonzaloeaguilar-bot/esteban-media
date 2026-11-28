# Esteban Media — measurement data points

Every free signal we use or can add, what it proves, and what it does not. Status is what is true in this repository today. Nothing here is a ranking, revenue, or lead claim on its own.

Status key: **live** = script/data exists and produces output on the owner's Mac · **ready** = code or docs exist, needs a first run or account step · **gap** = nothing collects it yet.

| # | Data point | Free source | Measures | Does not prove | Status | How to run / where it lands |
|---|---|---|---|---|---|---|
| 1 | Web leads (form) | Supabase `esteban_leads` (project `lioiiwupyardcksuqwyp`) | Form submissions by source and day | Email, phone, or DM inquiries | live | Written by `app/api/lead`; read with a SELECT. Baseline 2026-11-27: 4 real, 2 test rows |
| 2 | Email inquiries to info@ | none yet | Inquiries that arrive by email | — | **gap** | Not logged anywhere. Needs a daily log line (date, source as stated, outcome) |
| 3 | Search Console queries and pages | Google Search Console API | Impressions, clicks, position per query | AI answer citations | live | `pnpm seo:measurement:run` (Mac) → `~/.local/state/esteban-media-seo-measurement/latest.json` |
| 4 | Site analytics and lead events | GA4 | Sessions, `contact_click` by `lead_type` and `landing_page` | Lead quality | live | `analytics-gate` script (Mac); GA4 custom dimension `landing_page` registered 2026-11-26 |
| 5 | Google Business Profile performance | GBP Performance API | Profile views, calls, direction requests | Rankings | ready | `scripts/esteban-free-geo-sources.py` → `gbp`. Currently unmeasured: the signed-in identity has no matching managed location |
| 6 | Social analytics | Metricool | Impressions, interactions, saves, shares, reach | Website traffic | ready | `scripts/esteban-free-geo-sources.py` → `metricool`. Needs the Mac's `loaders` module |
| 7 | **AI answer citations (the citation panel)** | Manual capture from free tiers | Whether ChatGPT, Perplexity, Gemini, Google AI Overviews, and Copilot cite the owned domain and name the brand, for 12 buyer questions (EN and ES) | Traffic or leads from the citation | **ready (new)** | `config/citation-panel.json` → `pnpm geo:citation:record --observations=FILE` → `pnpm seo:citation-normalize` → `pnpm seo:capture-score` |
| 8 | Bing Webmaster, Search Performance and AI Performance | Bing Webmaster Tools (free) | Bing impressions and clicks; AI Performance shows Copilot citations | Google results | **gap** until verified | Account owner verifies the property in the Bing UI. See `docs/search-tool-setup.md`. API key: `BING_WEBMASTER_API_KEY` |
| 9 | Backlinks and site audit | Ahrefs Webmaster Tools (free for a verified site) | Referring domains; crawl errors | Rankings for other people's sites | **gap** until verified | Same doc, Ahrefs section |
| 10 | On-site behavior | Microsoft Clarity (free) | Heatmaps, session recordings | Lead intent | unknown | `docs/microsoft-clarity-activation.md`. Confirm whether it is active |
| 11 | Page speed and field data | PageSpeed Insights API (keyless quota) | Lighthouse scores, CrUX field category | Search ranking | ready | `scripts/esteban-free-geo-sources.py` → `pagespeed_crux`. Returned HTTP 429 from the container; rerun from the Mac or add a key |
| 12 | Crawl coverage | Common Crawl index | Whether public crawls captured the site | Citations | ready | `scripts/esteban-free-geo-sources.py` → `common_crawl`. Connection reset from the container |
| 13 | News and web mentions | GDELT DOC API | Articles that mention the brand | Citations in AI answers | ready | `scripts/esteban-free-geo-sources.py` → `gdelt_mentions`. Connection reset from the container |
| 14 | Search demand trends | Google Trends (free) | Relative search interest by place and term | Volume | **gap** | Add the 12 panel questions' key terms, Broward and Miami-Dade, monthly |
| 15 | Google reviews | Google Business Profile (public) | Count, average rating, verbatim quotes | Solicited reviews are not allowed (AGENTS.md) | live | `scripts/sync-google-reviews.mjs`; `data/google-reviews.json` (19 reviews, 5.0, last read 2026-11-03; stale) |
| 16 | Indexing | IndexNow | Submission status for changed URLs | Indexing outcome | live | `pnpm seo:indexnow:status` (Mac) |
| 17 | Entity and directory presence | Apple Business Connect, Bing Places, Clutch, Wikidata | Whether AI engines can find a verified business record | Citations by themselves | **gap** | Facts must match the site exactly. Account creation needs the owner. Yelp, Facebook, and LinkedIn are already linked from the site (PR #839) |

## What we cannot measure yet

- **AI citations over time.** Item 7 exists, but no run has been recorded. The first run needs answers captured on each engine. The panel is marked `draft-for-owner-review` until the owner confirms the questions.
- **Lead attribution from citations.** No lead form captures "which AI engine sent you." Add a question to the intake later if the owner agrees.
- **Email inquiries.** Item 2 is the largest blind spot. Inquiries that arrive at info@ are not in Supabase.

## Weekly routine (proposed)

1. Monday: read items 1, 3, 4, and 5 on the Mac; log item 2 by hand.
2. Monday: run the citation panel on each engine (item 7) and record the receipts.
3. Monthly: check items 8–10, 14, and 17 and update this table's status column.
