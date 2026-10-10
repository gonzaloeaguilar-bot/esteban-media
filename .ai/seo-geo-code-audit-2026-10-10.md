# SEO / GEO code audit — 2026-10-10

Scope: a code-only audit of `origin/main` at `4e27e38`, covering the source and the production build
(`pnpm build`, run against `.next/server/app/**/*.html`, `sitemap.xml.body`, `video-sitemap.xml.body`,
`robots.txt.body`). The one dynamic route (`/es/contacto`) was checked with `next start`. I had no
analytics, Search Console or live-site access, so impact rankings are expected impact, not
measured impact. No site code was changed.

Inventory in this build: 337 prerendered HTML pages. 28 are `noindex` (26 cohort-consolidated pages
plus the 2 privacy pages). The sitemap has 284 URLs, which matches `approvedSitemapUrlCount: 284`, and
`scripts/indexable-inventory-freeze.test.mjs` passes, so the sitemap hash matches the freeze. By type,
the sitemap holds 61 EN service pages, 76 ES service/niche pages, 41 + 41 guides, 26 portfolio watch
pages, 10 case studies, 12 pricing pages, 2 homes and 15 other pages.

## Executive summary

The technical foundation is in good shape:

- Canonicals are present on every indexable page and match the sitemap with 0 mismatches.
- Sitemap and HTML hreflang agree on all 284 URLs. 0 pairs are non-reciprocal, and no sitemap URL has hreflang pointing at a noindexed page.
- The sitemap contains no noindexed URLs.
- NAP is identical everywhere.
- Every page carries the entity graph.
- Every AI crawler is allowed.
- Guides are already answer-first: 81/82 open with a question H2 followed by a 40–180-word answer.

The gaps that matter are concentrated in a few places:

1. **The homepage loses its OG image and its other social metadata.** All social traffic lands on `/`, so this costs the most.
2. **`/fort-lauderdale` canonicalises to a URL that returns 404.** This is the base-city page.
3. **The ~38 hand-written English service pages are structurally thin for answer engines.** They have a bare `Service` node, no FAQ, no breadcrumb and no direct answer near the top. The Spanish twins are much better: 67/68 have FAQPage.
4. **No page states freshness or authorship.** Guides and case studies have no dates, and their author entities are anonymous or wrong.
5. **`public/llms.txt` has drifted.** It lists 3 noindexed URLs, contradicts the sitemap on Palm Beach sub-city coverage, and omits the real-estate rate card, every case study and 74/82 guides.
6. **Internal links are hub-only for 24 EN service pages and 44 ES pages.** Hubs also send 82 links to 26 noindexed pages.

Most fixes are mechanical: no new claims and no new URLs. Only turnaround/availability copy, authorship,
dates and inventory changes need Gonzalo or Esteban.

---

## Findings, ranked by expected impact

### 1. Homepage drops og:image, og:url, og:type, og:site_name and og:locale; twitter card falls back to `summary`  — HIGH

- File: `app/(english)/page.tsx` (the `openGraph` and `twitter` objects in `metadata`, lines ~43–52).
  Next replaces, not merges, a nested `openGraph` object, so the root defaults from
  `lib/site-metadata.ts` (`englishRootMetadata`) are lost.
- Rendered `/` has `og:title` and `og:description` only, and `twitter:card="summary"`. There is no image. `/es` keeps
  `og:image=/social-card`.
- Why it ranks first: the in-code comment says every Facebook/Instagram session lands on `/`. Link previews,
  and the answer engines that read OG for the page card, get no image.
- Count: 1 page out of 284 has no og:image, and it is the most important one.
- Fix (mechanical): spread the shared OG/twitter defaults, or call `buildPageMetadata({ path: "/", locale: "en", ... })`
  and override only `title` and `description`. Add `images: [socialImage]`, `url`, `type: "website"`, `siteName`,
  `locale: "en_US"` and `card: "summary_large_image"`. Add a metadata test asserting that `/` has an og:image.

### 2. `/fort-lauderdale` canonicalises to a 404, links to a 404, and has no inbound links  — HIGH

- File: `app/(english)/fort-lauderdale/page.tsx`. Line 85 has `path: "/areas/fort-lauderdale"`, line 90 has `pageUrl`, and line 192 has
  `href="/es/areas/fort-lauderdale"`.
- Checked with `next start`: `/fort-lauderdale` returns 200, while `/areas/fort-lauderdale` and `/es/areas/fort-lauderdale`
  return 404. There is no redirect in `next.config.ts`.
- The canonical, the WebPage `@id`/`url` in JSON-LD and the OG url all point at the 404. The page is also absent from the sitemap and has
  0 inbound internal links. It was deepened on 2026-09-30 for a commercial Fort Lauderdale buyer query, but in its
  current state it cannot be indexed under any URL.
- Fix (mechanical): set `path` and `pageUrl` to `/fort-lauderdale`, and point the ES link at an existing page
  (`/es/videografo-en-fort-lauderdale` or `/es/areas`).
- Decision: either add it to the sitemap and link it from `/areas` and the home page, which changes the freeze count, or 301 it into
  `/services/video-production-fort-lauderdale`. See finding 8.

### 3. English service pages: 38 have only a bare `Service` node; 39/61 lack FAQPage; 49/61 lack BreadcrumbList  — HIGH

- Structured data by page type, for sitemap URLs only. Every page also carries the sitewide Person, LocalBusiness and WebSite graph.

  | Type | n | Page-level Service | FAQPage | BreadcrumbList | Article | VideoObject |
  |---|---|---|---|---|---|---|
  | EN service | 61 | 61 | **22** | **12** | – | 1 |
  | ES service/niche | 68 | 68 | 67 | 61 | – | 0 |
  | EN guide | 41 | – | 11 | 41 | 41 | 0 |
  | ES guide | 41 | – | 10 | 41 | 41 | 0 |
  | Portfolio watch | 26 | – | – | 26 | – | 26 |
  | Case study | 10 | – | – | 10 | 10 | **0** |
  | Pricing | 12 | – | 10 | 2 | – | – |

- The 38 EN pages with nothing beyond `Service` are the hand-written one-offs, for example
  `/services/headshot-photographer-miami`, `/services/fitness-gym-video-marketing-miami`,
  `/services/corporate-event-videographer-miami`, `/services/video-editing-miami-beach`,
  `/services/real-estate-video-sunny-isles` and `/services/webinar-clip-editing-service`. The full list is reproducible with
  the script notes at the end. These pages also have no visible FAQ block. Their ES twins (for example
  `/es/marketing-de-video-para-gimnasios-miami`) do have FAQs and FAQPage.
- Breadcrumbs are missing on 80 sitemap URLs: 49 EN service pages, 10 pricing pages, 13 EN hub/tool pages and 7 ES pages.
- No page has FAQPage without visible questions. All FAQPage questions were found in the visible text, so parity is OK.
- Fix (mechanical): add `WebPage` and `BreadcrumbList` (Home › Services › page) to every `/services/*` page. A shared
  `buildServiceBreadcrumb(path, name)` next to `buildServiceFaqSchema` in `components/service-depth.tsx` would cover them.
- Fix (copy, see decisions): migrate the 38 pages to `lib/service-depth-content.ts` with
  `ServiceFaqs`/`buildServiceFaqSchema`, as `.ai/service-page-template.md` already prescribes. FAQ answers can come from
  facts that are already published (price bands in `lib/pricing.ts`, areas, languages, remote vs on-location). Any
  answer about turnaround or availability needs Esteban.

### 4. Answer-first structure is weak on service pages (guides are strong)  — HIGH for GEO

Method: a "question H2" is an H2 that ends in `?` or starts with `¿`. The answer is the `<p>` words that follow it up to the next heading.

| Type | n | No question H2 at all | Question H2 in first two H2s **and** a 40–180-word answer | Answer under 40 words | Lead paragraph after H1 under 40 words | No FAQPage |
|---|---|---|---|---|---|---|
| EN service | 61 | **16** | **3** | 37 | 52 | 39 |
| ES service | 68 | 1 | **6** | 60 | 49 | 1 |
| EN guide | 41 | 0 | 40 | 1 | 0 | 30 |
| ES guide | 41 | 0 | 41 | 0 | 0 | 31 |

- The 16 EN service pages with no question H2 include the main money pages:
  `/services/reels-editor-miami`, `/services/reels-editor-fort-lauderdale`,
  `/services/video-production-fort-lauderdale`, `/services/hire-remote-video-editor`,
  `/services/short-form-video-editor-miami`, `/services/real-estate-reels-video-editor-south-florida`,
  `/services/white-label-video-editing-for-agencies`, `/services/dental-video-marketing-south-florida`,
  `/services/med-spa-video-marketing-south-florida`, `/services/medical-practice-video-marketing-miami`,
  `/services/salon-barbershop-video-marketing-miami`, `/services/auto-detailing-tint-wrap-video-marketing-miami`,
  `/services/contractor-video-marketing-south-florida`, `/services/headshot-photographer-miami`,
  `/services/ai-food-photography-restaurants` and `/services/small-business-video-production-miami`.
- On 63/68 ES pages the first H2 is the same templated `¿Para qué proyecto encaja?`, rendered by
  `components/spanish-niche-page.tsx`. It is followed by a 30–51-word answer that does not answer the money query
  (who, what, price, where).
- Only 1 guide falls outside the band: `/guides/best-caption-styles-for-instagram-reels`, at 37 words.
- Section length: measured between H2s, 27 EN and 29 ES service pages and 21 guides have a section over 250 words. Measured
  between any H2/H3/H4, only **1** page has a chunk over 250 words: `/services/hire-remote-video-editor`, a 399-word
  public-reviews block. Chunking is fine, so this is low priority.
- Duplicate H2s: `/services/reels-editor-miami` ("What Miami Reels need to do quickly." twice) and
  `/services/reels-editor-fort-lauderdale` ("What Fort Lauderdale Reels need from the edit." twice).
- Fix (mechanical, no new claims): put an "In short / En corto" block directly under the H1, as a question H2 plus a
  60–120-word answer. Compose it only from facts already published: the service, the Fort Lauderdale base,
  Broward/Miami-Dade, Spanish-first with intermediate English, remote vs selectively scoped on-location, and the starting
  price taken from `PRICING_BANDS` in `lib/pricing.ts`. Never hard-code a price. Do this once in the shared
  renderers (`components/service-depth.tsx` and `components/spanish-niche-page.tsx`), not 129 times. In the ES template,
  replace the generic first H2 with the page's own buyer question.
- Decision: turnaround and on-location availability are the facts the handoff lists as blocked on Esteban. The
  block should ship without them rather than hedge.

### 5. No freshness signal and inconsistent authorship entities  — MEDIUM-HIGH

- Dates:
  - **0/82** guides and **0/10** case studies have `datePublished` or `dateModified` in their Article JSON-LD (`lib/guides.ts`
    `buildGuideStructuredData` ~L4542; `lib/case-studies.ts` `buildCaseStudyStructuredData` ~L1087).
  - 0/82 guides show a visible "Updated" date.
  - 58/61 EN service pages and ~61/68 ES pages show no visible date.
  - `app/sitemap.ts` deliberately emits no `lastmod` because the content model has no per-item date. That is correct, and it is the same gap.
- Authors:
  - Guides: `author` is an anonymous `Person` named "Esteban Moreno" with no `@id`, and `publisher` is an anonymous
    `Organization`. Neither is tied to the sitewide `#esteban` / `#business` entities. That accounts for 82 anonymous Person nodes and 82
    anonymous Organization nodes. There is **no visible byline on any guide** (0/82). AGENTS.md says structured data must
    match visible content, so the schema currently asserts an author the page does not show.
  - Case studies: `author` is `{"@type":"Person","name":"Esteban Moreno Media"}` on all 10 pages, which types the business name as a person.
  - Guide Articles have no `image`.
- Fix (mechanical):
  - Case studies: set `author` to `{ "@id": entityIds.person }` and `publisher` to `{ "@id": entityIds.business }`.
  - Guides: make `publisher` `{ "@id": entityIds.business }` and add `image` (the guide illustration or `/social-card`).
- Decision: confirm Esteban is the author of record for the guides. If he is, link `author` to `#esteban` and render a
  visible "By Esteban Moreno / Por Esteban Moreno" byline that links to `/about` and `/es/sobre-esteban`. If he is not,
  remove `author`. Also choose a date source: add `published`/`updated` fields to `Guide`/`CaseStudy`, possibly seeded
  from each entry's first git commit. Then emit visible dates, `dateModified` and sitemap `lastmod` together.

### 6. `public/llms.txt` drift  — MEDIUM-HIGH for GEO

- It lists 76 unique site URLs, and **3 are noindexed and absent from the sitemap**:
  `/services/ecommerce-product-video-editor-miami`, `/services/social-media-video-batching-miami` and
  `/services/youtube-video-editing-service-miami`. They appear under "High-intent service pages".
- It contradicts the inventory. "Service Areas" says *"Palm Beach County is a county-level expansion area … no
  sub-city coverage is currently published"*, but the sitemap holds 6 Palm Beach sub-city pages:
  `/services/video-editing-west-palm-beach`, `/services/video-editing-palm-beach-gardens`,
  `/services/video-production-delray-beach`, `/es/edicion-de-video-palm-beach-gardens`,
  `/es/produccion-de-video-delray-beach` and `/es/video-de-marca-de-lujo-jupiter`. There are also 3 county pages.
- It omits 213 of the 284 sitemap URLs: 74/82 guides, 48 EN and 65 ES service pages, **10/10 case studies**, 10 portfolio pages and
  `/pricing/real-estate` + `/es/precios/inmobiliaria`. The real-estate rate card is a published-rates page added for cost queries,
  yet llms.txt's Packages section never mentions it. `/es/editor-de-video-miami` (added 2026-10-07) is also missing.
- No `llms-full.txt` exists.
- Fix (mechanical): remove the 3 noindexed URLs. Add the case studies, the real-estate pricing pair and every guide
  (titles already exist in `lib/guides.ts`). Better still, generate the URL lists from the same sources as
  `app/sitemap.ts` via a route handler or build script, so drift cannot recur. Add a test that every llms.txt URL is in the sitemap.
- Decision: either keep the Palm Beach sub-city pages and reword the llms.txt line, or noindex those pages to match
  the stated policy. AGENTS.md forbids strengthening Palm Beach positioning without local evidence, which favours the
  latter. Also decide whether to ship an `llms-full.txt` with guide bodies.

### 7. Internal linking: hub-only service pages and links into noindexed pages  — MEDIUM

- Inbound-link distribution for sitemap URLs counts distinct linking pages, including nav, footer and language switcher, from indexable pages:
  0 → 1, 1–2 → 24, 3–5 → 102, 6–10 → 96, 11+ → 61.
- **24 EN service pages** are linked only from `/services` and `/areas`. Examples: architecture-design, boutique-hotel,
  corporate-training, corporate-video-editing-weston-fl, corporate-video-production-brickell, crowdfunding, fitness-gym,
  headshot, jewelry-product-photography, music-video, nightlife, online-course, real-estate-video-coral-gables,
  small-business-video-hollywood-fl, small-business-video-pembroke-pines, video-editing-miami-beach,
  video-editing-palm-beach-gardens, video-editing-west-palm-beach, video-podcast, video-production-delray-beach,
  video-production-doral-miami, webinar-clip-editing. `/portfolio/la-huelga` and `/es/portafolio/la-huelga` also have only 2 inbound links.
- **44 ES pages** are linked only from `/es`, `/es/areas` and `/es/servicios`, including `/es/videografo-en-fort-lauderdale` and
  `/es/produccion-de-video-fort-lauderdale`.
- **`/desk-recommendations` has 0 inbound links** and is in the sitemap. It is owner-ordered, with a follow-up due 2026-10-16.
- **82 links from 16 indexable pages point at 26 noindexed URLs.** The `/services` and `/areas` hubs each link to 12 noindexed
  EN pages, and `/es`, `/es/servicios` and `/es/areas` each link to 14 noindexed ES pages. `/guides`, `/es/guias`,
  `/services/content-creator-video-editing-miami`, `/services/ugc-video-editor-ecommerce`,
  `/services/hire-remote-video-editor`, `/services/reels-editor-fort-lauderdale`,
  `/services/short-form-video-editor-miami`, `/services/ai-product-photography-miami`,
  `/services/ai-real-estate-photo-enhancement`, `/portfolio`, `/es/editor-de-video-miami` and
  `/resources/remote-editing-handoff-checklist` also do. The most-linked noindexed targets are
  youtube-video-editing-service-miami and social-media-video-batching-miami (6 each) and ecommerce-product-video-editor-miami (5).
- Fix (mechanical): filter hub and directory cards through `isConsolidatedPath` (`lib/consolidation.ts`), the same
  filter the sitemap uses, and swap in-body links to consolidated pages for their surviving sibling. Add
  `ServiceRelated` sibling links (2–4 per page, existing URLs only) to the 24 hub-only EN pages and the 44 ES pages. Guides already do this well.

### 8. 26 indexable, self-canonical pages are not in the sitemap  — MEDIUM (decision)

- These pages are `index, follow`, self-canonical, and (for 16 of them) hreflang-paired, yet they are excluded from the sitemap:
  - 12 growth-system pages: `/services/{conversion-websites, ai-lead-capture-automation, local-presence-seo, growth-funnel-audit, custom-operations-automation, creative-production}` and their 6 ES twins.
  - 10 tool pages: `/daily-*` ×5 and their ES twins.
  - The 2 case-study hubs: `/case-studies` and `/es/casos-de-estudio`.
  - `/lens`.
  - `/fort-lauderdale` (see finding 2).
- This is deliberate per the freeze (`app/__tests__/case-studies-hub.test.ts` pins the hubs out). It is still a mixed signal: crawlable and
  indexable, but not advertised. The 10 case studies are sitemapped while their hub is not.
- Hreflang gap: 8 tool pages are paired in `lib/language-routes.ts` (the language switcher) but have no hreflang
  (`/daily-hook-planner`, `/daily-publish-prompt`, `/daily-script-timer`, `/daily-shot-list-planner` and their ES twins).
- Decision: for each URL, either add it to the sitemap (which revises `approvedSitemapUrlCount` and the hash) or mark it `noindex`. The
  case-study hubs and the growth-system pairs are the strongest candidates to add.

### 9. VideoObject coverage gaps (including the new real-estate reels)  — MEDIUM

- Coverage: 38 VideoObject nodes across 28 pages (26 portfolio watch pages, `/`, and
  `/services/real-estate-reels-video-editor-south-florida`). All 38 have name, description, thumbnailUrl,
  uploadDate, duration and contentUrl/embedUrl.
- Gaps:
  - The 6 reels from `lib/real-estate-reels.ts` are **not in `app/video-sitemap.xml/route.ts`**, which lists only the 8 portfolio videos × 2 locales.
  - The reels' VideoObject `publisher` is an anonymous `{"@type":"Organization"}`, not `{ "@id": entityIds.business }`. That puts 6 anonymous Organization nodes on each of the 2 pages.
  - The ES twin `/es/editor-de-video-real-estate-miami` and `/es` do not render the reel shelf, even though `RealEstateReels` accepts `locale="es"` and `titleEs`/`captionEs` exist.
  - **8 case-study pages embed a YouTube iframe with no VideoObject**: `/case-studies/{banacol,my-dler,healthy-smile,homeowners}` and their ES twins. The matching VideoObject data already exists for the portfolio watch pages (`lib/portfolio-schema.ts`).
  - Low priority: the hero `<video>` on `/about`, `/es` and `/es/sobre-esteban` has no VideoObject.
- Fix (mechanical): add the reels to the video sitemap under both pages that show them. Set the reels publisher to `@id`.
  Reuse the portfolio VideoObject on the case studies. Render `<RealEstateReels locale="es" />` on the ES real-estate twin.
  That last one adds visible content without new claims, but it will need an allowlisted text-parity refresh.

### 10. Metadata length, duplicates and OG images  — MEDIUM-LOW

- Missing canonical: 0. Canonical ≠ sitemap loc: 0. Description under 70 characters: 0. JSON-LD parse errors: 0.
- Titles over 60 characters: **51** (15 EN service, 13 EN hub/tool, 10 ES, 9 portfolio, 4 pricing). The worst exceed 80:
  `/es/precios/inmobiliaria` (83), `/es/casos-de-estudio/healthy-smile` (83), `/case-studies/flas-concierge` (82),
  `/pricing/real-estate` (80), `/services/yacht-hospitality-video-fort-lauderdale` (79). Most overflow comes from the
  37-character `| Esteban Moreno Media` suffix applied in `lib/site-metadata.ts`.
- Descriptions over 160 characters: **36**, of which 22 are portfolio watch pages (from `lib/portfolio-watch.ts`).
- Duplicate titles: 9. All 9 are EN/ES portfolio pairs sharing the project-name title, for example `Banacol | Esteban Moreno Media`.
- OG image: 244/284 sitemap URLs use the generic `/social-card`, including every guide and service page. `/` has none (finding 1).
- Server-rendered H1 missing on 6 tool pages: `/calculator`, `/assessment`, `/resources/social-video-kit`, `/es/calculadora`,
  `/es/evaluacion` and `/es/recursos/kit-video-social`.
- Fix (mechanical): drop or shorten the brand suffix when the title exceeds about 60 characters (`buildPageMetadata`). Trim portfolio descriptions to 155 characters.
  Localise the ES portfolio titles, for example with a "Portafolio:" prefix. Render the H1 server-side on the tool pages.
  Per-type OG cards via the existing `app/social-card` route (guide or service title on the card) are optional.

### 11. Entity consistency (Organization / LocalBusiness / Person, NAP)  — LOW-MEDIUM

- NAP is fully consistent:
  - Phone: `+13054974478` appears 2,737 times and `(305) 497-4478` 695 times. There is no other number, and every one of the 505 wa.me links uses `13054974478`.
  - Email: one address throughout.
  - Address: no `streetAddress` anywhere. The address is locality/region/country only (Fort Lauderdale, FL, US), which matches the
    service-area-business rule.
- Issues:
  - `#business` is typed `["LocalBusiness","ProfessionalService"]` in the site graph (`lib/entity-schema.ts`), but plain
    `"LocalBusiness"` in 132 sitemap pages' page-level `provider`/`publisher` stubs (EN one-off service pages, ES niche pages, case studies).
    Better: reference it by `{ "@id": entityIds.business }` only.
  - Anonymous duplicates: 94 anonymous `Organization` nodes and 92 anonymous `Person` nodes (guides, case studies, reels).
    Answer engines can read these as separate, weaker entities.
  - `personEntityJsonLd.sameAs` includes `site.googleBusinessProfile`, which is the business listing, not the person.
- Fix (mechanical): replace inline business and person stubs with `@id` references, and move the GBP URL to the business `sameAs` only.
- Decision/data: the Person entity would benefit from more profiles (LinkedIn, Vimeo and similar) and an `image`, but only for profiles Esteban actually owns.

### 12. robots and AI crawler access  — INFO (no policy change)

- The rendered `robots.txt` allows `*` at `/`, and has explicit `Allow: /` groups for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
  Claude-User, PerplexityBot and Google-Extended. **Nothing is blocked.** Sitemaps are declared for `sitemap.xml` and
  `video-sitemap.xml`. Agents that are not named (Perplexity-User, Applebot-Extended, CCBot, Bingbot) fall under `*` and are allowed.
- Notes:
  - `Host: https://estebanmorenomedia.com/` uses a full URL, while the Yandex-style directive expects a bare host. Google ignores it. Harmless.
  - `middleware.ts` excludes crawlers from the `/`→`/es` language redirect with
    `/bot|crawler|spider|.../i`. The user-initiated fetchers `ChatGPT-User`, `Claude-User` and `Perplexity-User` do
    **not** match. Such a fetch with a Spanish `Accept-Language` or a Spanish-country IP would get a 307 to `/es`. This is low impact.
    Adding `-user\b` or the named fetchers to the regex is a mechanical fix.
  - The Vercel firewall and bot-protection settings cannot be verified from code.

### 13. `/es/contacto` is dynamic while `/contact` is static  — LOW

- `app/(spanish)/es/contacto/page.tsx` awaits `searchParams` (the `?source=` attribution), so the route renders on demand.
  For user agents Next does not allowlist, the canonical, hreflang and robots tags stream into `<body>` rather than `<head>`.
  They are present for Googlebot and GPTBot. `/contact` hreflangs to this page, and it is linked 142 times.
- Fix (mechanical): read `source` client-side, as the static English page does, so the route prerenders.

### 14. Hreflang pairing summary  — INFO / decision

- 0 non-reciprocal pairs. 0 sitemap URLs with hreflang pointing at noindexed, non-sitemap or non-built pages. Sitemap
  `xhtml:link` and HTML `<link rel=alternate>` are identical for all 284 URLs. Self-reference and x-default are present on every pair.
- 26 sitemap URLs have no language partner. This is documented as deliberate in `lib/spanish-site.ts` (~L3915–3935). It breaks down as:
  - 3 `/resources/*` pages, `/desk-recommendations`, and ES pages with no unambiguous EN twin (`/es/videografo-en-miami`,
    `/es/videografo-en-fort-lauderdale`, `/es/fotografo-en-fort-lauderdale`, `/es/editor-de-video-miami`,
    `/es/reels-para-negocios-miami`, `/es/video-para-restaurantes-miami`, `/es/imagenes-con-ia-para-ecommerce-miami`,
    `/es/produccion-de-video-palm-beach-county`).
  - **11 pages whose obvious twin was noindexed on one side only.** EN indexed with ES noindexed:
    webinar-clip-editing ↔ edicion-de-clips-para-webinars, interview-video-editing ↔
    servicio-de-edicion-de-entrevistas-de-video, corporate-event-videographer ↔
    videografo-para-eventos-corporativos, small-business-video-production-miami ↔
    produccion-de-video-para-pequenos-negocios, small-business-video-hollywood-fl ↔ video-para-negocios-hollywood-fl,
    video-editing-west-palm-beach ↔ edicion-de-video-palm-beach-county. ES indexed with EN noindexed:
    marketing-de-video-para-abogados ↔ law-firm-video-production, marketing-de-video-para-contratistas-de-techos ↔
    roofing-contractor, produccion-de-video-para-entrenadores-personales ↔ fitness-trainer,
    video-de-marca-de-lujo-jupiter ↔ luxury-brand-video-jupiter-fl, produccion-masiva-de-video-para-redes ↔
    social-media-video-batching.
  - `/services/corporate-video-production-brickell` and `/es/video-corporativo-distrito-financiero-miami` are both indexed and
    unpaired. The pair was removed because that neighbourhood is a gated phrase, yet both pages stay indexed.
- Decision: the consolidation note says NOINDEX is applied symmetrically across bilingual pairs, but these 11 are
  asymmetric. Either restore the surviving side's twin, or consolidate both sides. Separately, confirm whether the
  financial-district pair should stay indexed at all.

---

## Safe mechanical fixes (no new claims, no new URLs)

1. Homepage metadata: restore og:image, url, type, site_name and locale, plus `summary_large_image`. Add a test. (`app/(english)/page.tsx`)
2. `/fort-lauderdale`: fix the canonical and JSON-LD URL to the served path, and fix the 404 ES link. (`app/(english)/fort-lauderdale/page.tsx`)
3. Add `WebPage` and `BreadcrumbList` JSON-LD to the 49 EN service pages that lack it, through one shared helper.
4. Remove the 3 noindexed URLs from `public/llms.txt`. Add the existing case-study, real-estate-pricing, all-guide and
   `/es/editor-de-video-miami` URLs. Add a test that llms.txt URLs ⊆ sitemap. Ideally, generate the lists from the sitemap sources.
5. Filter hub and directory links through `isConsolidatedPath`. Replace the 82 in-body links to the 26 noindexed pages with their surviving sibling.
6. Add `ServiceRelated` sibling links (existing URLs only) to the 24 hub-only EN service pages and the 44 hub-only ES pages.
7. Entity hygiene:
   - Case-study `author` → `{@id: #esteban}` and `publisher` → `{@id: #business}`.
   - Guide `publisher` → `{@id: #business}`, and add an Article `image`.
   - Reels `publisher` → `{@id: #business}`.
   - Replace the 132 pages' inline `LocalBusiness` provider stubs with `@id` references.
   - Move the GBP URL out of the Person `sameAs`.
8. Video: add the 6 reels to `video-sitemap.xml` for `/` and the real-estate reels page. Add VideoObject to the 8
   case-study pages that embed YouTube, reusing the portfolio data. Render the reel shelf on `/es/editor-de-video-real-estate-miami`
   (text-parity allowlist refresh).
9. Answer-first "In short / En corto" block in the shared service renderers, built only from published facts, with prices read from
   `PRICING_BANDS`. Replace the templated `¿Para qué proyecto encaja?` first H2 with each page's own question.
10. Fix the duplicate H2s on `/services/reels-editor-miami` and `/services/reels-editor-fort-lauderdale`.
11. Server-render the H1 on the 6 tool pages.
12. Title/description length: brand-suffix rule in `buildPageMetadata` (51 titles), trim 36 descriptions (22 portfolio),
    and localise the 9 ES portfolio titles.
13. Add hreflang for the 4 paired `/daily-*` tool pairs that only have switcher pairing.
14. Make `/es/contacto` static by reading `?source` client-side.
15. Add the user-initiated AI fetchers (`ChatGPT-User`, `Claude-User`, `Perplexity-User`) to the middleware crawler regex. This changes no robots policy.

## Needs Gonzalo / Esteban decision or data

1. **Turnaround and on-location availability** for the answer-first blocks and service FAQs. These are the facts the handoff already lists as blocked. Never invent them.
2. **Guide authorship**: is Esteban the author of record? This decides between a visible byline plus `author: #esteban`, and removing `author`.
3. **Date policy**: add real `published`/`updated` fields (git-derived or editorial) to guides and case studies. This would
   unlock visible dates, `dateModified` and sitemap `lastmod` together.
4. **FAQ copy for the 38 one-off EN service pages** when migrating them to `service-depth`. Answers about anything beyond already-published facts need sign-off.
5. **Inventory**: the 26 indexable-but-unsitemapped URLs (sitemap them or noindex them), `/fort-lauderdale` (sitemap it, or 301 it to
   `/services/video-production-fort-lauderdale`), and `/desk-recommendations` (follow-up due 2026-10-16).
6. **Palm Beach**: the 6 indexed sub-city pages contradict llms.txt's "no sub-city coverage" and the AGENTS.md
   caution. Either noindex them or reword llms.txt with evidence.
7. **Asymmetric consolidation**: the 11 bilingual pairs indexed on one side only, and the gated financial-district pair, which is indexed on both sides.
8. **Headshot / portrait photography** (`/services/headshot-photographer-miami` and its ES twin): confirm this is an offered
   service. It is not among the confirmed priorities in AGENTS.md.
9. **Person `sameAs`**: any additional profiles Esteban actually owns, plus a profile image.
10. **Optional `llms-full.txt`** with guide bodies.

## Reproducing the numbers

The analysis was run against `pnpm build` output with BeautifulSoup:

- Per-page head, JSON-LD and heading extraction over `.next/server/app/**/*.html`. Links are counted in `<main>`
  (excluding header, nav and footer), and separately across the whole document.
- The sitemap is parsed from `.next/server/app/sitemap.xml.body`. llms.txt URLs are extracted with a regex on the canonical host.
- "Question H2" means an H2 ending in `?` or starting with `¿`. Answer words are the `<p>` words up to the next heading.
- `/es/contacto` was fetched from `next start` with default, Googlebot and GPTBot user agents.

The scripts were scratch-only and are not committed.
