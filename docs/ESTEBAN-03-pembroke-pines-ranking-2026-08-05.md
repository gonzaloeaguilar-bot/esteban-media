# ESTEBAN-03 — Pembroke Pines small-business video ranking move

## Status

Implementation is complete in an isolated clone but is **not released**. The required Claude acceptance contract, production build, preview, fresh rank read, and live production boundary are blocked by provider/network/sandbox walls recorded below. No rank movement or qualified inquiry is claimed.

## Baseline

- Implementation base: `877dce72e14f72d19fabe4c282826ac8fe0ad0b4` from the canonical checkout's verified `origin/main` reference.
- Target query: `video para pequenos negocios pembroke pines`.
- Target URL: `https://estebanmorenomedia.com/es/video-para-pequenos-negocios-pembroke-pines`.
- Retained Semrush pointer: `rankings-2026-08-05.csv` reports daily positions `2, 2, 4, 4, 2, 2, 4` for 2026-07-30 through 2026-08-05, always on the target URL. This retained export is not presented as a fresh rank read.
- Fresh 2026-08-05 ET probes:
  - browser runtime selection: `No browser is available`;
  - GSC OAuth refresh: `getaddrinfo ENOTFOUND oauth2.googleapis.com`;
  - canonical production curl: `Could not resolve host: estebanmorenomedia.com`, HTTP `000`;
  - Next production build: `getaddrinfo ENOTFOUND fonts.googleapis.com` for Geist, Geist Mono, and Newsreader;
  - local preview bind: `listen EPERM 127.0.0.1:4313`.

## Implemented move

- Replaced unsupported `accesible`, `económica`, customer-attraction, guaranteed-remote, and continuous-service wording on the Spanish target with canonical facts: Esteban operates from Fort Lauderdale, remote intake is available, and on-location production is scoped per project.
- Added an explicit visible and FAQ disclosure that the published Bar Door Monkey example is a Miami project, not a Pembroke Pines project and not evidence of commercial results.
- Tightened the proof block to the verified portfolio facts: on-location videography and editing for a published social spot in Miami.
- Added reciprocal `en-US`, `es-US`, and `x-default` hreflang between the existing English and Spanish Pembroke Pines pages; no new city page was created.
- Added an allowlisted first-party lead source, `pembroke-pines-small-business-video`. Only the exact known query parameter on `/es/contacto` can select it; all other values fall back to `brief-builder`. The visitor's email/name/phone remain in the POST body and are not added to URLs or GA events.

## Deterministic evidence

- `git diff --check`: pass.
- Focused Vitest run: 26/26 pass across ranking-page copy, metadata, structured data, and lead validation.
- `pnpm lint`: pass with 0 errors and 3 pre-existing unused-import warnings.
- `pnpm typecheck`: pass after adding an explicit metadata-language record type.
- Full `pnpm test`: 194/195 pass. The sole failure is the unrelated live Squarespace fixture: expected `Squarespace`, received `Unknown` for `www.eatatpetesaplace.com` while network resolution is unavailable.
- `pnpm build`: blocked before compilation by Google Fonts DNS, not asserted green.
- Local HTTP preview: blocked by sandbox `listen EPERM`, not asserted complete.

## 3-LLM evidence

- Claude specification attempt 1: gated decision `20260806T031009Z-cto-design-lead-esteban-media-esteban-03-spec.json`, exit 124 after 180 seconds.
- Claude specification attempt 2: gated hook-free/read-only decision `20260806T031335Z-cto-design-lead-esteban-media-esteban-03-spec2.json`, exit 124 after 120 seconds.
- Claude specification attempt 3: gated one-turn/no-tool decision `20260806T031556Z-cto-design-lead-esteban-media-esteban-03-spec3.json`, exit 124 after 90 seconds.
- No Claude-authored contract was produced. Per the three-attempt strategy cap, the release remains fail-closed.
- Antigravity final-review decision `20260806T032244Z-cto-design-lead-esteban-media-esteban-03-review.json` exited 1 before reviewing the diff because its language server could not bind `127.0.0.1:0` (`operation not permitted`). No Antigravity approval is inferred and the review gate remains open.
- The required Obsidian hot/durable-note update was attempted in the same session but the managed filesystem rejected writes outside the project (`patch rejected: writing outside of the project; rejected by user approval settings`). Repo handoff/audit/backlog are updated; vault synchronization remains an explicit release prerequisite.

## Release boundary still required

1. Claude returns the acceptance contract before release.
2. Full native suite/build passes at the exact candidate head.
3. One Vercel preview returns HTTP 200 and proves self-canonical, reciprocal hreflang, indexability, visible factual copy, matching Service/FAQ/Breadcrumb JSON-LD, proof/area/service/contact links, and an allowlisted attributed brief POST.
4. Antigravity reviews the complete final diff/evidence once, with blocking findings corrected.
5. Claude verifies the corrected exact head and live result.
6. Merge/deploy through the normal PR path, then prove the exact production SHA and repeat the HTTP/schema/link/event checks.
7. Attach a fresh Semrush rank read and fresh GSC query/page baseline. If Semrush remains unavailable, label rank `unverified`; do not reuse the retained CSV as fresh.

## Delayed KPI attachments

The existing deterministic Semrush expansion controller owns non-blocking follow-ups. Relative to the eventual production T+0 timestamp, attach at T+2, T+7, T+14, and T+45:

- fresh Semrush position and landing URL for the exact query;
- GSC clicks, impressions, CTR, and average position for the exact query/page;
- count of accepted `/api/lead` submissions with source `pembroke-pines-small-business-video` (a source-attributed submission is an inquiry signal, not automatically a qualified sales lead);
- Esteban/Gonzalo qualification outcome when available, without exposing PII.

These delayed observations do not hold the builder slot after the release boundary above is complete.
