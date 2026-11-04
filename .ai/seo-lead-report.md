# Esteban Moreno Media - SEO lead pass, 2026-11-03 (read-only)

Sources: GSC CSV (28d 2026-10-05..11-02) and growth brief 2026-11-03 in scratchpad/geo/data/. Live title/meta/canonical/hreflang read by curl on 2026-11-03. The Search Console MCP was not available to this agent, so nothing here is a live GSC read beyond the CSV. A live Google SERP could not be fetched (curl_cffi returned a JS/"enablejs" wall on 3 of 3 queries), so every SERP-layout statement is UNVERIFIED.

Standing constraint from vault hot.md (2026-11-03 verdict): new-page and new-FAQ freeze until 11-17; only title/meta/link work on existing pages; #652 reels retitle read at 11-11. Gaps below that need a new page are marked and parked.

Scale warning: whole site is 8 clicks / 967 impressions / 28d. CTR benchmarks used for lift (assumption, not measured here): pos 1 ~25-30%, pos 3-4 ~8-10%, pos 6-10 ~2-4%, pos 10-20 ~0.5-1.5%. All lifts are single-digit clicks per 28d. Treat as sequencing, not forecast.

Verified hreflang: every EN/ES pair checked carries reciprocal en-US / es-US / x-default in page head AND sitemap (e.g. /services/reels-editor-fort-lauderdale <-> /es/editor-de-reels-fort-lauderdale). Self-canonical on all 24 pages fetched. So no hreflang or canonical defect exists; do not "fix" them.

---

## Gap 1 - Spanish queries answered by the English homepage (language mismatch)
- Queries: "editor de video fort lauderdale" 22 impr pos 3.2; "editor de video miami" 5 impr pos 4.2; "edicion de video en fort lauderdale" 3 impr pos 3.3. Total 30 impr, 0 clicks.
- Page: `/` . Live title: "Fort Lauderdale Video Production & Editing | Esteban Moreno" (English). Live meta: "Video editing, on-location capture and social content ... Spanish-first, English available." No ES page exists for the query: /es/editor-de-video-fort-lauderdale and /es/edicion-de-video-fort-lauderdale both return 404. /es home (title "Esteban Moreno Media | Edicion de Video en Fort Lauderdale") appears in zero GSC rows; /es/editor-de-video-miami exists but also shows no rows.
- Verdict: real snippet/intent failure (a Spanish searcher at pos 3 sees an English title and no word "editor"). Not a sitelinks artifact: pos 3-4, not 1.0.
- Fix (no new page, respects freeze): 
  1. EN home title -> "Fort Lauderdale Video Production & Editing | Editor de Video | Esteban Moreno" (still under ~65 chars of visible weight; keep English lead).
  2. EN home meta -> "Video editing and production for Fort Lauderdale and Miami businesses, from $100 a video. Editor de video en espanol - cotiza por WhatsApp." (keep the existing facts; add one Spanish clause).
  3. /es title -> "Editor de Video en Fort Lauderdale | Esteban Moreno Media" (current one lacks the word "editor", the exact query token).
  4. Add one visible link on EN home hero area to /es/editor-de-video-miami and /es with anchor "Editor de video en espanol". EN home currently links to /es only (verified: /es, /es/precios, /es/eventos, /es/evaluacion).
  5. Parked until 11-17: a dedicated /es/editor-de-video-fort-lauderdale page (needs original proof: Spanish case study, price, WhatsApp flow) - only if the title change does not move impressions to /es.
- Expected lift: 30 impr at pos ~3.5; EN-title mismatch CTR ~0-3% -> bilingual title ~6-9% = +1 to +2 clicks/28d. Window: read 2026-11-17 and 12-01 on exact queries.
- Original value: Spanish-first operator, $100/video price, WhatsApp quote - real, already on site. Candidate: YES (title/meta only).
- Boundary: Organic only. Local pack/Maps unaffected; AI-feature impact unknown.

## Gap 2 - EN/ES cannibalization on "editor de reels fort lauderdale"
- Query: "editor de reels fort lauderdale". EN `/services/reels-editor-fort-lauderdale` 22 impr pos 10.0 vs ES `/es/editor-de-reels-fort-lauderdale` 2 impr pos 57. (Brief shows 20 impr pos 17.9 blended.) 0 clicks both.
- Related: "editor de videos cortos fort lauderdale" 2 impr pos 2.5 also lands on the EN page.
- Live: EN title "Reel Editor in Fort Lauderdale | Esteban Moreno Media" (post-#652); ES title "Editor de Reels en Fort Lauderdale | Esteban Moreno Media" - exact query token match, yet pos 57. hreflang/canonical are correct, so the ES page is losing on internal-link weight, not tagging. Inbound evidence: /es links to it, EN home, /services/* hub do not (EN home does not link either reels page; /areas and /services link only the EN one).
- Fix: do NOT canonicalize or merge (hreflang pair is right). Add 3 internal links with anchor "editor de reels en Fort Lauderdale" to the ES page from /es/editor-de-video-miami, /es/editor-de-reels-miami and the ES freelance-vs-agency guide; add EN-page language-switch link (already via hreflang; add a visible "Espanol" link in the reels page hero). Add ES meta: keep as is.
- Expected lift: ES page 57 -> ~25-30 over 2-4 weeks = 0 clicks directly; value is moving the Spanish SERP URL to the Spanish page for the long term. Real near-term lever is the EN page at pos 10 with 22 impr: #652 retitle read 11-11 (do not stack a second title change before that read).
- Original value: modest. Candidate: YES, links only. KPI: ES page pos < 30 by 12-01.

## Gap 3 - Other Spanish queries answered by EN pages (same defect, 3 more rows)
- "editor de reels miami" 6 impr pos 11.5 on EN `/services/short-form-video-editor-miami`; "editor de youtube miami" 4 impr pos 16 same page; "reel editor miami" 5 impr pos 16 on `/services/reels-editor-miami`. ES counterparts exist and are live: `/es/editor-de-reels-miami` (title "Editor de Reels en Miami | Esteban Moreno Media"), `/es/editor-de-video-corto-para-redes-miami`. Neither appears for these queries.
- Total Spanish-intent impressions served by EN URLs across gaps 1-3: 22+5+3+6+4+2+22 = 64 of 967 (6.6%).
- Fix: apply Gap 2 internal-link pattern (anchor = exact Spanish query) from ES hubs; add "Editor de video / Reels en espanol" clause to EN short-form page meta (current: "Short-form video editing for Instagram Reels, TikTok, and YouTube Shorts for influencers, creators and businesses in Miami and Fort Lauderdale. From $100 per video." - no Spanish hook, and "youtube" query "editor de youtube miami" is served by a page whose title omits YouTube: retitle "Short Form Video Editor Miami | Reels, TikTok & YouTube Shorts").
- Expected lift: 15 impr at pos 11-16 -> +0 to 1 click. Low; bundle with Gap 2. Candidate: YES (bundle). Caution: short-form page was just touched by spark-2026-11-03-103 (commit 55781bde); read that before editing title.

## Gap 4 - Yacht videography: wrong page and zero visual proof
- Query "miami yacht videography" 14 impr pos 67.6 (brief: 13 impr pos 66.8), 0 clicks. Page `/services/yacht-party-videographer-miami`, title "Yacht Party Videographer Miami | Esteban Moreno Media", H1 "Yacht Party Videographer.", 829 words, phrase "yacht videography" appears 0 times in body.
- Server HTML of that page: 0 <img>, 0 <video>, 0 <iframe> (curl, 2026-11-03), despite 28 /portfolio links. Siblings on the same topic: yacht-event-videographer-miami ("yacht event videography" in meta), yacht-charter-video-marketing-miami, yacht-hospitality-video-fort-lauderdale, plus ES equivalents - four near-duplicate yacht intents, none targeting the generic "yacht videography" head.
- Verdict: pos 67 means Google sees no strong page; the page is party-intent, the query is generic. Own-cluster dilution is likely but unproven (no GSC rows for siblings).
- Fix: (a) choose ONE hub for the generic query: `/services/yacht-event-videographer-miami` (closest existing intent) - retitle "Miami Yacht Videography: Events, Charters & Parties | Esteban Moreno Media"; (b) party/charter pages link to the hub with anchor "Miami yacht videography"; (c) add 3+ real stills or one embedded clip from existing yacht footage - only if real yacht footage exists (UNVERIFIED: portfolio inventory not checked this pass; if none, mark NO_ACTION and do not generate imagery per Real-Assets rule).
- Expected lift: pos 67 -> 30-40 is invisible in CTR (0 clicks). Value is moving into striking distance (<20) over 4-8 weeks; realistic 0 clicks in the 28d window. Candidate: CONDITIONAL on real footage. KPI: query pos < 40 by 12-15.

## Gap 5 - Product photography: ranks 78 with a page that shows no photographs
- "product photography miami" 14 impr pos 78.6; "miami product photographer" 4 impr pos 57.8; "product photographer miami" 4 impr pos 63.8 -> 22 impr, 0 clicks, same page `/services/product-photography-miami`.
- Live title "Product Photographer in Miami | Real Product Photos"; meta "Product photography for Miami and Broward businesses. Ask Esteban Moreno Media about a real product shoot..." (no proof, no price, no deliverable). Page 1,077 words; curl shows 0 <img>, 0 <video> in server HTML. A photography page with no photographs is the clearest original-value gap on the site. ES twin `/es/fotografia-de-producto-miami` says "desde $500" - EN page meta omits the price.
- Also `/es/guias/cuanto-cuesta-la-fotografia-de-producto` "fotografia ecommerce tarifas" 4 impr pos 90.3, title "Guia Precios Fotos de Producto" (does not contain "fotografia", "ecommerce" or "tarifas").
- Fix: (1) add a visible before/after or 6-photo gallery of real shoots (portfolio-product-visual set already linked) with alt text naming product type; (2) meta -> "Product photography in Miami and Broward for Amazon, Shopify and local brands. Real shoots from $500, files in 5 days." (confirm turnaround before publishing; only use price that matches ES page and lib/pricing.ts); (3) ES guide title -> "Tarifas de Fotografia de Producto para Ecommerce | Esteban Moreno Media"; (4) link from /portfolio product items and /services hub with anchor "product photographer in Miami".
- Expected lift: pos 78 -> 40-50 in 4-6 weeks; still 0 clicks in a 28d window. Candidate: YES, because it adds real evidence (photos, price), not words. KPI: avg pos of 3 queries < 50 by 12-15.

## Gap 6 - Remote editing Colombia: query typo plus thin target
- "video editing services columbia" 8 impr pos 67.5, 0 clicks, page `/services/remote-video-editing-colombia` (776 words). Title "Remote Video Editing Colombia | Esteban Moreno Media"; phrase "video editing services" appears 0 times; "colombia" 14 times. The query is misspelled "columbia" (also ambiguous: Columbia University/SC).
- Fix: do NOT chase the misspelling. Retitle "Video Editing Services for Colombia | Remote Bilingual Editor" to carry "video editing services"; link from `/es/edicion-de-video-remota-colombia` (EN page reachable from /services and /areas only; ES page linked from /es only). Existing page-to-page hreflang is fine.
- Expected lift: negligible (8 impr). Candidate: LOW PRIORITY title tweak only; real Colombia demand unproven in this data. Bundle, do not spend a dedicated PR.

## Gap 7 - Orlando executive-interview query served by a Miami page
- "executive interview filming orlando" 11 impr pos 6.8, 0 clicks. Page `/services/executive-interview-videographer-miami`, title "Executive Interview Videographer Miami" (no brand suffix, no Orlando); 0 mentions of Orlando in body; no Orlando URL in the 573-URL sitemap.
- Pos 6.8 with 0 clicks from 11 impressions: searcher sees "Miami" for an Orlando query.
- Decision: NO_ACTION unless Esteban confirms he travels to Orlando for interviews. UNVERIFIED service area; adding an Orlando section without it is a false-claim risk. If confirmed: one 120-word "Travel to Orlando / Central Florida" section on the existing page plus title "Executive Interview Videographer Miami & Orlando | Esteban Moreno Media" (also restore the missing brand suffix). Lift if confirmed: 11 impr at pos 6.8 x ~3% = +0.3 click.

## Gap 8 - Homepage at position 1.0 on 7 generic queries with 0 clicks (decision: artifact, do not treat as CTR failure)
- Rows: "fort lauderdale video production" 14, "video production services" 14, "product video production" 6, "video editing services" 2, "video editor fort lauderdale" 1, "media production studio miami" 1, "website designer" 2 = 40 impr (4.1% of 967), pos 1.0 on all, 0 clicks.
- Live snippet: title "Fort Lauderdale Video Production & Editing | Esteban Moreno" and meta (above) match "fort lauderdale video production" and "video production services" intent. No snippet defect found; canonical self, index,follow, 200.
- Why it is likely not a real rank-1: the same domain sits at avg pos 18 elsewhere and 56-90 on service pages; an unaligned head term like "website designer" (no web-design intent in the title) at exactly 1.0 is not plausible as an organic ranking for a site this size. Candidate explanations: AI Overview / SERP-feature citation (GSC reports every link in such a block at the block's position), a Local/brand sitelinks block, or very few personalised impressions. I could not confirm which: SERP fetch hit a JS wall, GSC search-appearance cannot be joined to query. Status: UNVERIFIED.
- Action: NO_ACTION on title/meta. Verification step (owner: seo-dataforseo, cost: one bounded SERP pull per query, 7 queries, US/en, desktop+mobile): record Local Pack/AI Overview/PAA presence and whether `estebanmorenomedia.com` is an organic URL or a citation. Re-read GSC by device/country for these 7 queries on 11-17; if impressions come with clicks the artifact theory is wrong.
- Bonus signal for Gap 1: if an AI Overview is the cause, EN-only citations of Spanish-first services confirm the language mismatch.

## Gap 9 - Utility/pricing pages ranking for the brand query instead of the brand pages
- "esteban moreno media": `/daily-publish-prompt` 8 impr pos 10.3 and `/pricing/starter` 6 impr pos 9.3 and `/services/reels-editor-fort-lauderdale` 13 impr pos 9.3 and `/services/product-photography-miami` 7 impr pos 4.6, vs brand pages `/about` 27 impr pos 3.0 (2 clicks), `/` 33 impr pos 5.7 (1 click), `/contact` 28 impr pos 5.5 (1 click), `/portfolio` 26 impr pos 5.8 (0 clicks). 
- Of 148 brand impressions in the CSV, 34 (23%) go to pages that are not the brand pages. `/daily-publish-prompt` live title "Daily Video Publishing Prompt | Esteban Moreno Media" is a tool page, index,follow, in sitemap.
- Fix: no noindex (the brand suffix makes them show for the brand; harmless). Fix the brand SERP instead: home meta/title should contain the full brand "Esteban Moreno Media" (home title currently ends "| Esteban Moreno", missing "Media") - change to "... | Esteban Moreno Media". Same edit as Gap 1 title; keep "Media".
- Expected lift: brand CTR is already 10.8% (4/37, pos 3.0); moving home from pos 5.7 toward 3 on 33 impr = +1 click. Candidate: YES (rides on Gap 1 edit).

## Gap 10 - Spanish freelance and event pages at pos 40-55 with ES-only intent
- "editora video freelance" 6 impr pos 44.2 on `/es/guias/editor-de-video-freelance-vs-agencia-de-postproduccion`, title "Editor Freelance vs Agencia Video" (no accent/ "de"; meta is one generic sentence, no price or number). "video para eventos florida" 4 impr pos 52.8 on `/es/videografo-para-eventos-corporativos-fort-lauderdale`, title "Video Eventos Fort Lauderdale" - the query says Florida, title says Fort Lauderdale + "Eventos" order reversed from "video para eventos".
- Fix: ES freelance title -> "Editor de Video Freelance o Agencia: Cual Conviene | Esteban Moreno Media", meta with the $100-per-video vs agency range from lib/pricing.ts; events title -> "Video para Eventos en Florida y Fort Lauderdale | Esteban Moreno Media".
- Expected lift: 10 impr at pos 44-53: invisible in 28d. Candidate: LOW; bundle in the same PR as Gap 2/3 ES-only edits. NO new content.

---

## Recommended execution (one bounded PR, titles/meta/internal links only, honors the freeze)
Order: (1) Gap 1+9 home title/meta + /es title; (2) Gap 2/3 ES internal links + short-form title (after reading commit 55781bde); (3) Gap 5 product page photos + meta (requires real photos; otherwise skip photos and ship meta only); (4) Gaps 6/10 title tweaks. Do NOT touch `/services/reels-editor-fort-lauderdale` title before 11-11. Routing: cto-dev-lead -> esteban actuator; cto-qa-lead verifies served HTML by curl (title, hreflang, links) and runs the analytics gate. Measurement: GSC exact-query read 11-17 and 12-01; success = non-brand clicks >= 10/28d by 12-01 (the vault kill criterion), and Spanish queries answered by an ES URL.

## Unknowns (fail-closed)
- Live GSC beyond the CSV; per-page impressions for yacht siblings and `/es/*` pages (absent from CSV = either 0 or filtered; not proven 0).
- Live SERP layout for all queries (JS wall); Gap 8 cause.
- Whether real yacht footage and product photographs are cleared for the pages; whether Esteban serves Orlando.
- CTR benchmark values are assumptions.

## Coverage
Configured scheduled web projects in this task: 1 (esteban). Evaluated 1. Enriched with SERP-pattern evidence: 0 (collector fields not read; live SERP blocked). Candidates advanced: 5 (Gaps 1+9 combined, 2+3 combined, 5, plus conditional 4, low-priority 6/10 bundle). NO_ACTION: 2 (Gap 7 pending service-area confirmation; Gap 8 title/meta). Stale/blocked: SERP fetch blocked; GSC MCP unavailable. Next verification: 2026-11-11 (#652 CTR read), then 2026-11-17.
