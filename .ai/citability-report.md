# estebanmorenomedia.com - AI-crawler access and passage citability
Retrieved 2026-11-03 with curl against raw served HTML (UA Mozilla/5.0). Read-only. Raw files: /private/tmp/claude-501/-Users-gonzalo-code/3babd8ed-3d03-4e15-963a-020456d55467/scratchpad/geo/raw/. Parser output: .../geo/out/an.txt.
Evidence labels: OBSERVED = measured this session; UNVERIFIED = not measurable here. Nothing below claims a cause of citation.

## 1. Crawler access (robots.txt, 412 bytes, HTTP 200)
| Crawler | Status | Basis |
|---|---|---|
| GPTBot | ALLOWED | explicit `Allow: /` |
| OAI-SearchBot, ChatGPT-User | ALLOWED | explicit |
| ClaudeBot, Claude-User | ALLOWED | explicit |
| PerplexityBot | ALLOWED | explicit |
| Google-Extended | ALLOWED | explicit |
| Bingbot | ALLOWED (implicit) | no named group (grep -ic bingbot = 0); falls under `User-Agent: *  Allow: /` |
| CCBot / anthropic-ai / cohere-ai | ALLOWED (implicit) | no group; training crawlers not blocked (policy choice) |
Server-level: `/services/yacht-hospitality-video-fort-lauderdale` returned HTTP 200 to UA strings GPTBot/1.2, ClaudeBot/1.0, PerplexityBot/1.0, bingbot/2.0 (no WAF block by UA; real-IP verification UNKNOWN).
Sitemap lines: sitemap.xml and video-sitemap.xml (video-sitemap HTTP 200, 27,866 bytes). `Host:` line is a Yandex-only directive, harmless.

## 2. Publisher files
- llms.txt: HTTP 200, 84,317 bytes, 844 lines, "Last updated: 2026-10-28", 690 lines contain site URLs. Optional convention only; no AI system is documented as requiring it. No ranking/citation claim made. An 84 KB file is not a usable "short index"; if kept, it costs nothing, but do not invest further.
- sitemap.xml: HTTP 200, urlset, **573 URLs** (286 under /es/, 164 /services, 51 /guides, 23 /portfolio, 15 /case-studies, 8 /events, 6 /pricing). All 573 carry lastmod. Range 2026-07-26 to 2026-11-03, 29 distinct dates. Newest cluster: 2026-10-28 (25), 10-29 (28), 10-30 (37), 11-01 (3), 11-02 (2), 11-03 (1). hreflang en-US / es-US / x-default pairs present in sitemap AND in page head. Sitemap lastmod matches on-page dateModified for 8/8 pages checked (e.g. / 2026-10-29, /pricing/starter 2026-10-14).
- Bing indexation: **UNVERIFIED.** curl_cffi impersonate=chrome returned HTTP 200 but `site:estebanmorenomedia.com` yielded "About 182,000 results" whose first 10 results were unrelated (LLM explainers); `site:.../services` yielded plumbing sites; query `site:... reels editor Fort Lauderdale` returned "About 1,220,000". The operator was not honored, so no count is attributable to the domain. The "domain hits" in the page source were only the query echoed in Bing's own vertical links. Smallest next measurement: Bing Webmaster Tools URL Inspection / Site Explorer on the 8 URLs (authenticated, owner-side).

## 3. Per-page table (raw HTML)
| Page | Words (visible) | Main | JSON-LD types (beyond shared LocalBusiness/Person/WebSite/Offer graph) | FAQ Q/A in visible text | Native details (words) | Visible updated | First-200-words answer with number? |
|---|---|---|---|---|---|---|---|
| / | 3,495 | 3,302 | FAQPage (4), Service, OfferCatalog, UnitPriceSpecification, Place | 4/4 questions, 4/4 answers match | 28 details, 1,931 words (1 open) | "Updated October 29, 2026" | Partial: "From $100 a video" appears, but first ~60 words are "REC 00:00:00:00" and the H1 is the brand line, not an answer |
| /services/reels-editor-fort-lauderdale | 2,266 | 2,073 | FAQPage (5), BreadcrumbList, Service | 5/5, 5/5 | 2 details, 195 words | Oct 30, 2026 | YES: "From $100 per video", $950, $1,600 within 200 words (answers cost, not the "what is" question in one sentence) |
| /es/editor-de-reels-fort-lauderdale | 2,861 | 2,660 | FAQPage (4), BreadcrumbList, Service | 4/4, 4/4 | 5 details, 279 words (4 open) | "Actualizado el 29 de octubre de 2026" | NO: zero numerals in first 200 words; no price in the opening |
| /services/short-form-video-editor-miami | 2,233 | 2,040 | FAQPage (4), Service, UnitPriceSpecification | 4/4, 4/4 | 2 details, 893 words | Oct 14, 2026 | Definition is good ("What is a short-form video editor?") but only numbers are "9:16"; no price/turnaround in first 200 |
| /services/video-production-fort-lauderdale | 2,141 | 1,952 | FAQPage (5), Service | 5/5, 5/5 | 2 details, 169 words | Oct 29, 2026 | YES: $100 / $950 / $1,600 |
| /services/yacht-hospitality-video-fort-lauderdale | 1,891 | 1,699 | FAQPage (5), Service | 5/5, 5/5 | 1 details, 335 words | Oct 15, 2026 | NO: no numeral in first 200 words |
| /guides/best-caption-styles-for-instagram-reels | 1,557 | 1,363 | Article, FAQPage (3) | 3/3, 3/3 | 5 details, 274 words | Oct 28, 2026 | Quick-answer present in sentence one; numeric only "9:16" (no measured safe-zone figure) |
| /pricing/starter | 437 | 245 | AggregateOffer, FAQPage (2), BreadcrumbList | 2/2, 2/2 | 5 details, 114 words | Oct 14, 2026 | YES: "Starter package is from $100 per video ... one revision round" |
FAQPage check method: every FAQ question string and the first 60 chars of every answer were found in the stripped visible text of the same page. 8/8 pages: 0 mismatches. Parse failures in JSON-LD: none.

## 4. JS dependence
- All 8 pages are server-rendered (Next.js RSC): H1, H2s, FAQ, pricing figures and details content are in the first HTML byte. No `BAILOUT_TO_CLIENT_SIDE_RENDERING` marker on any page. No `opacity:0` inline styles in the stripped body. Key phrases (e.g. "From $100 per video", FAQ answers) all present in curl HTML; none found only inside `self.__next_f` payloads.
- Details are native `<details>` in raw HTML (good, the pattern the dual-audience rule requires).
- Caveat: home has 199 `aria-hidden` nodes (42 imgs) and 59 `__next_f` chunks; the home carousel items were not individually inspected for JS-only text. UNKNOWN whether any hero/carousel copy exists only post-hydration; no evidence of it in the raw HTML.

## 5. Citability gaps (measured, with fix)
1. **/ - first screen is not an answer.** First ~60 visible words: "REC 00:00:00:00 Content - Production - Digital ... How it works 0 1 ..." (timecode and step numerals are the opening). H1 = "Esteban Moreno Media - Video editing, AI-assisted content, and social production." No sentence states who, what, where, price. Fix: one sentence under the H1 e.g. "Esteban Moreno Media edits Reels and short-form video for Fort Lauderdale and Miami businesses, from $100 per video, with a written price before work starts." Make the REC timecode aria-hidden/decorative (CSS content or aria-hidden) so it leaves the text stream.
2. **/ - sections too long and too few.** 7 H2 sections outside details: 2 exceed 250 words (max 506), median 94; the page is 3,495 words with 1,931 inside 28 details. Fix: split the 506-word section under question-shaped headings of 100-180 words each, one fact apiece; keep depth in the existing details.
3. **/es/editor-de-reels-fort-lauderdale - no number in the opening and one 1,048-word block.** 0 numerals in first 200 words (EN twin has $100/$950/$1,600). 14 sections, 1 over 250 words (max 1,048), 4 under 60. Fix: add the price sentence ("Desde $100 por video, edicion remota, en espanol") in the first paragraph; break the 1,048-word block with question H2s every 100-180 words or move the tail into `<details>`. Parity with the EN page is the target.
4. **/services/yacht-hospitality-video-fort-lauderdale - no price, turnaround or count anywhere in first 200 words** (opens with definitions and "Banacol proves..."). 2 sections over 250 words (max 408). Updated date Oct 15 (19 days old; sitemap lastmod matches). Fix: lead with a one-sentence answer plus a number (starting price from the shared pricing source, or "charter edit delivered in X days" only if Esteban confirms the figure). Do not invent figures.
5. **/services/short-form-video-editor-miami - answer lacks a commercial number; 20 days stale.** Only numerals in first 200 words are the 9:16 ratio; "From $100" appears on the EN Fort Lauderdale pages but not here. 4 sections under 60 words, 1 section 312 words. Sitemap lastmod and on-page date both Oct 14. Fix: add the price/turnaround sentence after the definition; refresh visible date only when content actually changes (and ping IndexNow).
6. **/guides/best-caption-styles-for-instagram-reels - Article schema has no datePublished or named author.** Article node: dateModified 2026-10-28 only; author and publisher both point to the business entity `#business`, not a person with credentials. Quick-answer has no measurable claim ("central safe area" without a number); the 9:16 mention is the only numeral in 200 words. Fix: add datePublished, point author at the Person node (Esteban, already in the graph), and state one verifiable figure in the quick answer (for example margin as a percentage of frame height, only if measured from Instagram UI overlays on a real export; otherwise leave unquantified).
7. **/pricing/starter - thin page, not independently citable beyond one sentence.** 437 words (245 main); 4 sections median 29 words; no section reaches 100 words. Updated Oct 14. FAQ has 2 questions. The one strong passage ("The Starter package is from $100 per video ...") is good and should be kept. Fix: add 3-4 question sections of 100-180 words (what counts as one video, length limit, revision terms, turnaround) each with one stated fact from Esteban's actual terms; add a visible turnaround figure if it is a real policy.
8. **Cross-site: schema graph is repeated verbatim and heavy.** Every page carries 39-61 JSON-LD nodes (home 61), most of it the same LocalBusiness/Person/OfferCatalog graph; the page-specific signal (FAQPage, Service) is a small fraction. Not a defect for access, but it dilutes what is page-specific. Fix: keep the shared graph on home and reference it by @id on inner pages. No claim that this affects citation.
9. **Cross-site: freshness is uneven; 3 of 8 audited pages carry dates older than 19 days** (/services/short-form-video-editor-miami Oct 14, /pricing/starter Oct 14, yacht Oct 15) while 37 URLs were bumped on Oct 30. A bulk date bump without content change is worse than staleness; only change dates with real edits.
10. **Bing visibility cannot be confirmed (see section 2).** UNVERIFIED. Smallest next measurement: Bing Webmaster Tools URL Inspection for the 8 URLs, plus IndexNow submission log, then re-query at T+14 and T+28.

## 6. What is fine (no action)
- robots.txt allows all named AI search crawlers; no UA-based block observed.
- FAQ schema matches visible text on 8/8 pages (0 mismatches).
- Native details used for depth; no client-mounted accordion detected.
- Visible updated dates exist on 8/8 pages and match sitemap lastmod and JSON-LD dateModified.
- Server-rendered content; price figures ($100 / $950 / $1,600) consistent across the pricing-bearing pages measured.

## 7. Observed citations, referrals, mentions
Not measured in this audit. Citations, brand mentions and referrals by platform: UNKNOWN (no provider query run). Earned-authority hypothesis: NO_ACTION proposed; no authority gap evidenced by this read-only fetch. Route back to cto-seo-lead: gaps 1, 3, 4, 5 (opening-sentence-with-number) are one shared template change; gap 10 is the smallest measurement.
