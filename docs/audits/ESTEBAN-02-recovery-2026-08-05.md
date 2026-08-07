# ESTEBAN-02 recovery evidence — 2026-08-05

Status: **merged and deployed / ranking outcome open / release-gate order violated**. The factual correction is live on canonical production and independently verified below. This document does not claim a rank improvement or a qualified inquiry. See the 2026-08-06 verification section for what was actually gated and what was skipped.

## Bounded move

- Preserve `/es/video-inmobiliario-sunny-isles`, its keyword intent, confirmed service-area position, canonical metadata, area link, portfolio link, and `/es/contacto` inquiry path.
- Replace unsupported oceanfront/penthouse/Sunny Isles-project implications with editing of client-supplied property footage.
- Use Homeowners only as a 2021 editing-only sample from footage supplied by 300 Bees; explicitly state that it is not Sunny Isles location proof.
- Replace the unsupported Homeowners `+130%` CTR and `9:16` result fields. The primary audio note says no measurable result was supplied.

## T+0 evidence (`check_at=2026-08-06T01:11:44Z`)

- Source truth: `docs/respuestas-audio-proyectos-esteban-2026-07-21.md` says Homeowners was editing only, via 300 Bees, and records `resultados medibles ... ninguno aportó cifra`.
- Live production directory: the external web cache for `/es` still exposes the old Sunny Isles description with `oceanfront penthouse` and `vistas de playa`, proving production is not corrected yet. Direct target fetch returned cache miss.
- Authenticated rank: the local GSC refresh-token request failed with `TypeError: fetch failed` before any HTTP response; zero fresh rows returned. The retained position-4 observation is stale and is not asserted as current.
- Browser: the browser runtime returned `No browser is available`, so authenticated Semrush/GSC UI readback is unavailable.
- GitHub/production shell: `gh api` could not connect to `api.github.com`; `curl` could not resolve `estebanmorenomedia.com`.
- Claude specification: CTO record `20260806T010539Z-cto-copy-lead-esteban-media-esteban-02-recovery-spec.json` ended exit `124` after 120 seconds with zero contract output.
- Focused deterministic boundary: `pnpm vitest run lib/__tests__/sunny-isles-proof.test.ts components/__tests__/sunny-isles-page.test.ts` passed `4/4`. It checks visible proof, canonical metadata, identical visible/JSON-LD FAQ content, area/portfolio/contact links, and absence of the unsupported claims.
- Native gates at candidate head `c043a2db33af93faa2aeec00c9381351212b0c61`: `pnpm lint` passed with `0` errors and `3` pre-existing warnings; `pnpm typecheck` passed. `pnpm test` passed `197/198`; only the pre-existing live Squarespace detector failed because `eatatpetesaplace.com` returned `Unknown` rather than `Squarespace`.
- Build: `pnpm build` reached Next compilation but failed because `fonts.googleapis.com` was `ENOTFOUND` for Geist, Geist Mono, and Newsreader.
- Preview: `pnpm dev --port 3017` failed with `listen EPERM 0.0.0.0:3017`; no preview HTTP claim is made. Static server rendering is covered by the focused render test, but it is not substituted for the required preview HTTP boundary.
- Inquiry KPI: the existing global analytics source emits `contact_cta_click` for `/es/contacto` and `contact_intent` for email/phone/Instagram while retaining page location. No fresh qualified inquiry exists yet.

## Claude exact-head + live verification — 2026-08-06T17:40Z

Verified head `b8f2ad89c81e4b743c2fbba4fc4dda69cf4978d4`. The diff `5244f6e..b8f2ad8` touches only `.ai/*` and `.cortex/*` evidence files, so the shipped source and tests are byte-identical at both heads. Every T+0 gate below was re-run at the exact head; the earlier `c043a2db` numbers are superseded.

- `pnpm vitest run lib/__tests__/sunny-isles-proof.test.ts components/__tests__/sunny-isles-page.test.ts` → `4/4` pass.
- `pnpm test` → `32` files, `200/200` pass. The previously failing live Squarespace detector now passes; the earlier `197/198` was a network artifact, not a code defect.
- `pnpm lint` → `0` errors, `3` pre-existing warnings, none in a file this change touched.
- `pnpm typecheck` → clean.
- `pnpm build` → production build succeeds. The earlier Google Fonts `ENOTFOUND` failure was a network artifact and did not reproduce.
- Preview HTTP boundary (`pnpm start`, port `4319`, `/es/video-inmobiliario-sunny-isles`): `HTTP 200`; self-canonical `https://estebanmorenomedia.com/es/video-inmobiliario-sunny-isles`; visible FAQ question and answer byte-identical to the `FAQPage` `mainEntity`; `/es/portafolio/homeowners`, `/es/areas#miami-dade`, and `/es/contacto` all present; zero matches for `oceanfront|penthouse|vistas de playa|vistas al mar|+130%|portugués`. The earlier `listen EPERM` preview block did not reproduce.
- Production `/es/video-inmobiliario-sunny-isles`: `HTTP 200`, self-canonical, H1 `Edición de video inmobiliario para Sunny Isles Beach.`, corrected meta description, `FAQPage` present with visible-copy parity, bounded Homeowners disclaimer rendered, all three links present, zero banned-claim matches.
- Production `/es/portafolio/homeowners`: zero matches for `+130%` or `Tasa de Clics`; renders `Proyecto de edición publicado`, `Solo edición`, `Material aportado por 300 Bees`.
- Inquiry KPI boundary: unchanged existing instrumentation. `lib/google-analytics-script.ts` maps `/es/contacto` to `contact_cta_click` and email/phone/Instagram to `contact_intent`. No tracking infrastructure was added by this diff.
- Deployed SHA: PR #64 merged `2026-08-06T17:01:01Z` as `53153cf30ab90d8c95beeaa785692a803fd8b084` on `main`.

### Gate violations found

1. **No independent Antigravity verdict exists.** `.ai/esteban-02-antigravity-review.md` is an unanswered dispatch prompt that ends with "Respond with VERDICT: CODE_READY … No PR merge, branch push, or production deployment occurs until this verdict is received." `gh pr view 64 --json reviews` returns `[]`. The `.cortex/quality-payloads/PR-64.json` builder/skeptic/taste ensemble is same-provider self-review, not independent review.
2. **Merge and deploy preceded the gates they were declared to wait on.** The merge landed before this Claude exact-head verification ran and with no Antigravity verdict on record.

### Corrected external walls

- **Semrush: real wall, previously mis-stated.** The blocker is not "no browser". A live `mcp__semrush__organic_research` call returned an active subscription with insufficient API units. Additional units are required; see `https://www.semrush.com/mcp-access`.
- **GSC: not a wall.** The recorded "transport-blocked / `TypeError: fetch failed`" condition did not reproduce. The refresh token at `~/.config/geebs/google_oauth_webmasters_token.json` exchanged successfully and the Search Analytics API returned `HTTP 200`.

### Fresh GSC T+0 baseline (`2026-07-09`..`2026-08-05`, property `https://estebanmorenomedia.com/`, `siteOwner`)

- Target page `/es/video-inmobiliario-sunny-isles`: **0 rows** — no impressions, no clicks, no position.
- Property is live and returning data (`292` impressions, `2` clicks, average position `34.7` site-wide), so the zero is a genuine absence for this page, not an empty property.
- The retained "Semrush position 4" observation is therefore **withdrawn as the working baseline**. It is unsupported by fresh authenticated data and must not be cited as a before-value. The correct before-value for this route is zero recorded search presence.
- `sc-domain:estebanmorenomedia.com` returns `HTTP 403`; only the URL-prefix property is accessible with the current credential.

## Completion gate status

1. **Met.** Exact final head passes focused tests, lint, typecheck, full suite, and production build.
2. **Not met.** Antigravity has not independently reviewed the complete final diff/evidence. No verdict exists.
3. **Met.** Claude verified the exact corrected head and the live result.
4. **Met.** Rendered preview proves HTTP 200, self-canonical, visible FAQ matching `FAQPage`, Homeowners/area/contact links, and the pre-existing inquiry-event boundary.
5. **Met, but out of order.** Deployed SHA `53153cf30ab90d8c95beeaa785692a803fd8b084` is attached and the same checks pass on canonical production. The merge preceded gates 2 and 3.
6. **Partially met / outcome open.** The GSC before-value is now fresh and authenticated: zero recorded search presence for the route. The after-value is open. Semrush remains a real, tested wall (insufficient API units). An external wall does not convert the ranking outcome to complete.
7. **Open.** No qualified inquiry has been recorded for this route.

## Scheduled checks

- T+14: `2026-08-19` — fresh GSC/Semrush query/page rank against the zero baseline, indexing/canonical state, and qualified inquiry count for the route.
- T+45: `2026-09-19` — repeat the same checks and decide whether the proof/copy move produced movement or requires a new strategy.
