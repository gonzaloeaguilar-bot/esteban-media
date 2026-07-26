---
title: "esteban-media-content-loop"
category: client-esteban-media
date: 2026-07-25
updated: 2026-07-25
status: active-loop
tags: [esteban-media, content-loop, seo, geo, aloha, faq, ai-images, bilingual]
---

# Esteban Moreno Media — Content Production Loop (SEO · GEO · ALOHA · FAQ)

**Purpose:** a repeatable loop that ships **one bilingual (EN+ES) niche page per iteration**, **lucrative keywords first**, each built to a fixed SEO + GEO + ALOHA + FAQ standard so it ranks on Google *and* gets cited in AI answers. Queue derived from [[esteban-media-deep-keyword-research-2026-07-25|deep keyword research]] (~190 keywords, Semrush 2026-07-25). Claim/positioning rules: [[esteban-media-work-boards-pack-2026-07-25]]. Baseline to move: [[esteban-media-geo-serp-baseline-2026-07-25]].

---

## Prioritization principle — LUCRATIVE FIRST

Rank each page by **Value = monetization (CPC) × winnability (low KD) × service-fit/proof.** Build high-value first; traffic-only and long-tail later.

- 💰💰💰 = CPC ≥ $10 (premium commercial) · 💰💰 = $4–10 · 💰 = < $4 / info
- 🟢 KD ≤ 25 (winnable now) · 🟡 26–45 (stretch) · exclude KD 60+ head terms.

---

## PRODUCTION STANDARD — every page must pass this (the "best practices")

### SEO
- **One primary keyword** in: URL slug, `<title>` (≤60 char, keyword-first), H1, first 100 words, one H2, meta description (≤155, with CTA), and image alt text.
- 3–6 **supporting long-tail** as H2/H3s; natural density, no stuffing.
- **Internal links:** ≥3 → relevant portfolio proof + services + one sibling page; descriptive anchors. Reciprocal EN/ES `hreflang`.
- **E-E-A-T:** author = Esteban Moreno López (bio + real credentials: Universidad de Medellín, own brand Miracle Leaf); link real portfolio proof; no invented metrics/logos/testimonials.
- **Tech:** static route, `next/image` (poster/local), Core Web Vitals green, added to `sitemap.ts`, GSC resubmitted, canonical set.

### GEO (AI-answer optimization)
- **Answer-first:** first 2 sentences directly and completely answer the page's core question → an extractable, citable passage.
- **Chunkable:** self-contained sections; each H2 answers one query; short quotable sentences with a concrete fact/number where truthful.
- **Entity consistency:** the string `Esteban Moreno López — Esteban Moreno Media — Fort Lauderdale, FL` on every page (fixes the baseline name-collision); consistent NAP; keep `public/llms.txt` updated with new pages.
- **Structured data:** matching JSON-LD (`Service`/`WebPage`/`HowTo`/`FAQPage`, plus existing `VideoObject`/`BreadcrumbList`).

### ALOHA (intent-page coverage — tag every page)
- **A·Audience** = `/for/` persona hubs (dentists, realtors, restaurants, e-commerce, personal trainers, agencies).
- **L·Location** = geo woven **in-page** (Miami · Fort Lauderdale · Boca Raton · Broward · Doral · Aventura) as H2s/links — **never thin duplicate city pages** (standing rule); one `/areas` hub allowed.
- **O·Offerings** = the service pages (video editing, AI product photography, short-form, repurposing…).
- **H·How/Help** = guides + question pages.
- **A·Alternatives** = `/vs/` comparison pages (AI vs studio photo, freelancer vs agency, DIY vs pro) — strong GEO plays.
- Goal: cover **all five buckets** in EN + ES. Current gaps to fill: Audience `/for/` hubs and Alternatives `/vs/` pages (added to the queue, Wave 4).

### FAQ (mandatory on every page)
- **3–6 FAQs** pulled from the keyword's `phrase_questions` cluster, answer-first (question as H3, 40–60-word answer).
- Render **`FAQPage` JSON-LD** on every page. Guides also get **`HowTo`**. FAQs are the highest-yield GEO + rich-result surface — no page ships without them.

---

## LOOP PROTOCOL (per iteration)
1. **PICK** topmost `[ ]` item (highest Value; skip 🔒).
2. **DEDUPE** vs `messages/en.json` + existing routes (4 guide pairs already live).
3. **BUILD** EN+ES page to the Production Standard above.
4. **TEST** `pnpm check` green (lint, typecheck, tests, build).
5. **SHIP** conventional-commit PR → CI + Cortex gate green → merge under standing authority → verify prod (200, sitemap, schema renders).
6. **RECORD** check box + one-line `esteban-media-hot.md` entry + `sitemap.ts` + GSC resubmit.
7. **REPEAT.** Monthly: re-run the SERP/AI baseline. Automated? batch **pre-7am** ([[feedback-no-automations-post-7am]]); one page/run; never L3/money/secrets.

---

## THE QUEUE — lucrative-first (Value · KD · ALOHA bucket)

### WAVE 1 — Lucrative + winnable (build these first) 💰💰💰
- [ ] **W1.1** Video marketing for **med spas & aesthetic clinics** — S. FL · `aesthetic clinic marketing` (170/🟢11/💰💰💰 $24.82), `med spa video marketing` · **[O+A·Audience]**
- [ ] **W1.2** Video marketing for **dentists** · `dental video marketing` (480/🟢17/💰💰💰 $16.92), `dentist social media marketing` (210/22/💰💰💰 $19.20), `video marketing for dentists` (110/2) · **[O+A·Audience]**
- [ ] **W1.3** Video marketing for **law firms & attorneys** · `law firm video marketing` (320/🟢16/💰💰💰 $13.02), `video for law firms` (170/15/$11.44), `video for attorneys` (70/2) · **[O+A·Audience]**
- [ ] **W1.4** **AI product photography** — Miami 🔥 · `ai product photography` (480/🟢23/💰), `ai product images` (140/24) · underserved differentiator · **[O]**
- [ ] **W1.5** **Real-estate video marketing** — S. FL · `real estate video marketing` (260/🟢10/💰💰 $6.40), `video for real estate agents` (30/0) · **[O+A·Audience]**
- [ ] **W1.6** **Content repurposing** — long video → clips · `content repurposing service` (170/🟢13/💰💰 $6.80) · edit-first core offer · **[O]**
- [ ] **W1.7** **Video production for small business** — Miami · `video production for small business` (90/🟢5/💰💰 $6.73) · **[O+A·Audience]**

### WAVE 2 — AI-image cluster (underserved, on-trend, his service) 🔥
- [ ] **W2.1** AI images for **e-commerce brands** · `ecommerce product photography` (1000/🟢20), `ai generated images for business` (20/0), `lifestyle product photography` (260/1) · **[O+A·Audience]**
- [ ] **W2.2** GUIDE: How much does **product photography** cost? · `product photography pricing` (590/🟢20/💰), `how much does product photography cost` (40/10) · **[H+Alt]**
- [ ] **W2.3** AI **real-estate photos** & virtual staging · `ai real estate photos` (40/🟢20), `virtual photoshoot` (40/8) · **[O]**
- [ ] **W2.4** AI **food photography** for restaurants · `ai food photography` (50/🟢28), `food photographer miami` (30/0) · **[O+A·Audience]**
- [ ] **W2.5** AI photography for **car dealerships** · `ai car photography` (50/🟢28) · **[O+A·Audience]**
- [ ] **W2.6** AI **jewelry & fashion** product photography · `ai jewelry photography` (20/0), `ai fashion photography` (40/0) · **[O]**
- [ ] **W2.7** GUIDE: How to use **AI for product photography** (cost · ROI) · `how to use ai for product photography` (20/0) + KD-0 Q cluster · **[H]**

### WAVE 3 — Proof verticals + volume services 💰💰
- [ ] **W3.1** Video & social content for **restaurants** — Miami/Ft.Lauderdale · `video for restaurants` (210/🟢14), `video marketing for restaurants` (40/1) · proof: Bar Door Monkey, Healthy Smile · **[O+A·Audience]**
- [ ] **W3.2** Video marketing for **hotels & hospitality** · `hotel video marketing` (170/🟢18), `airbnb video tour` (20/0) · **[O+A·Audience]**
- [ ] **W3.3** Video marketing for **contractors & home services** · `contractor video marketing` (110/🟢0/💰) · **[O+A·Audience]**
- [ ] **W3.4** Video marketing for **car dealerships** · `car dealership video marketing` (50/🟢7) · **[O+A·Audience]**
- [ ] **W3.5** **Professional & LinkedIn headshots** — Miami · `linkedin headshots` (1300/🟢21), `headshot photographer miami` (40/15) · **[O]**
- [ ] **W3.6** **Product photography (real + AI) for e-commerce** — Miami · `product photographer miami` (70/🟢13), `product photo editing` (320/21) · **[O]**
- [ ] **W3.7** **Short-form video editing** (Reels/TikTok/Shorts) · `short form video editor` (140/🟢14), `social media video editor` (320/24) · **[O]**
- [ ] **W3.8** **Real-estate photography** — Miami/Ft.Lauderdale/Boca · `real estate photographer miami` (90/🟢18), `real estate photography fort lauderdale` (30/9) · **[O+L]**
- [ ] **W3.9** Restaurant **social-media management** · `social media content for restaurants` (20/0), `content creator for restaurants` (20/0) · **[O+A·Audience]**
- [ ] **W3.10** Food & **menu photography** for restaurants · `food photography for restaurants` (90/🟡23), `menu photography` (140/33) · **[O]**
- [ ] **W3.11** UGC-style video editing for brands · `ugc for brands` (170/🟡32), `ugc video editor` (20/0) · **[O]**
- [ ] **W3.12** Fitness & gym content (personal trainers) · `fitness video editor` (20/0), `fitness content creator miami` · his PT history · **[O+A·Audience]**
- [ ] **W3.13** Podcast video editing & clips · `podcast video editing` (70/🟡40) · **[O]**
- [ ] **W3.14** Amazon & Shopify product photo/video · `product photography for amazon` (170/🟡35), `shopify product video` (20/0) · **[O+A·Audience]**

### WAVE 4 — ALOHA completion: /for/ hubs + /vs/ comparisons + guides
- [ ] **W4.1** `/for/` **audience hub index** — "Who I help" (links every vertical page) · **[A·Audience]**
- [ ] **W4.2** `/vs/` **AI product photography vs traditional studio photography** · `how to test ai product photography vs traditional` (KD0) · **[Alt]** 🔥 GEO
- [ ] **W4.3** `/vs/` **Freelance video editor vs agency** — cost & when to pick which · **[Alt]**
- [ ] **W4.4** `/vs/` **DIY phone video vs hiring a pro** for small business · **[Alt]**
- [ ] **W4.5** GUIDE: How to use **Instagram Reels for your business** · `how to use instagram reels for business` (1000/🟢13) · **[H]**
- [ ] **W4.6** GUIDE: **Video content ideas for restaurants** · `instagram reels for restaurants` (20/0) + Q cluster · **[H+A·Audience]**
- [ ] **W4.7** GUIDE: How much does a **promo video** cost? · `how much does a promo video cost` (20/0) · **[H+Alt]**
- [ ] **W4.8** GUIDE: **Best video length** for Reels & social platforms · `best video length for instagram reels` (20/low) · **[H]**
- [ ] **W4.9** GUIDE: How to shoot **360° product photography** · `how to shoot 360 product photography` (110/🟢9) · **[H]**
- [ ] **W4.10** **Areas served** hub — Miami · Ft.Lauderdale · Boca · Broward (remote + on-location) · **[L]**

### WAVE 5 — Spanish layer 🇪🇸 (underserved differentiator; ES-led, EN twin — ship concurrently with each EN page where possible)
- [ ] **W5.1** Fotografía de producto con **IA** — Miami · `fotografía con inteligencia artificial` (20), `fotos de producto con ia` · **[O]**
- [ ] **W5.2** **Imágenes con IA** para negocios · `imágenes generadas con ia`, `generador de imágenes con ia` (70/51) · **[O]**
- [ ] **W5.3** Video marketing para **dentistas / clínicas estéticas** · (ES twin of W1.1/W1.2 — same premium CPC intent) · **[O+A]**
- [ ] **W5.4** Videos y contenido para **restaurantes** · `videos para restaurantes` (20), `ideas de contenido para restaurantes` (10) · **[O+A]**
- [ ] **W5.5** Video y fotos para **agentes inmobiliarios** · `videos para bienes raíces`, `fotografía inmobiliaria miami` · **[O+A]**
- [ ] **W5.6** **Contenido para redes sociales** — Miami · `contenido para redes sociales` (140/🟢23) · **[O]**
- [ ] **W5.7** **Repurposing** de contenido / edición de clips · (ES twin of W1.6) · **[O]**
- [ ] **W5.8** Fotos de producto para **Amazon / e-commerce** · `fotos para amazon` (20) · **[O]**
- [ ] **W5.9** **Retoque fotográfico** y edición de fotos de producto · `retoque fotográfico` (20) · **[O]**
- [ ] **W5.10** GUÍA: Cómo hacer **Reels para tu negocio** · (ES twin of W4.5) · **[H]**
- [ ] **W5.11** GUÍA: Cuánto cuesta un **video promocional** · `cuanto cuesta un video promocional` · **[H+Alt]**

> **~68 page targets.** Head terms excluded (KD 60+): `youtube video editor` (84), `ai video generator` (95), `ai headshots` (66), `virtual staging` (62), `reels editor` (73). Prices stay "by project scope" until Esteban approves specifics (C2 gate).

---

## DEFINITION OF DONE (per item)
Page live EN+ES · primary kw in URL/title/H1/first-100w/meta/alt · answer-first intro · **FAQ block + FAQPage schema** · service/HowTo JSON-LD · entity string · ≥3 internal links + CTA · ALOHA bucket satisfied · in sitemap + GSC resubmitted · llms.txt updated · `pnpm check` green · PR merged + prod-verified · box checked + hot.md line.

## STATUS
- **Loop armed, lucrative-first, ~68 targets, SEO/GEO/ALOHA/FAQ standard baked in.** Backing data: [[esteban-media-deep-keyword-research-2026-07-25]].
- **Iteration 1 = W1.1 (med spa / aesthetic clinic video — CPC $24.82, KD 11).**
