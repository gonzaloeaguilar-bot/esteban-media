# ESTEBAN-02 recovery evidence — 2026-08-05

Status: **release hold / ranking outcome open**. This document does not claim shipment, a top-three rank, or a qualified inquiry.

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

## Completion gates still required

1. Exact final head passes focused tests, lint, typecheck, full suite, and production build.
2. Antigravity independently reviews the complete final diff/evidence once.
3. Claude verifies that exact corrected head and live result.
4. GitHub PR/preview is green and proves HTTP 200, self-canonical, visible FAQ matching `FAQPage`, Homeowners/area/contact links, and a real inquiry-event boundary.
5. Merge/deployed SHA is attached and the same checks pass on canonical production.
6. Fresh Semrush or GSC before/after rank and a qualified-inquiry KPI are attached, or a tested external wall remains explicitly open. An external wall does not convert the ranking outcome to complete.

## Scheduled checks

- T+14: `2026-08-19` — fresh GSC/Semrush query/page rank, indexing/canonical state, and qualified inquiry count for the route.
- T+45: `2026-09-19` — repeat the same checks and decide whether the proof/copy move produced movement or requires a new strategy.
