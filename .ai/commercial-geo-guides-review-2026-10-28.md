# Commercial GEO route review packet — 2026-10-28

## Scope

Commit `7015724f1abdc57cb83f1aba580c903ca466c65a` changes five existing sources only. It adds no URL, redirect, price, client, review, availability promise, or third-party claim.

## Live decision evidence

The live Search Console command below completed on 2026-10-28 against data through 2026-10-25:

```bash
python3 /Users/gonzalo/code/portfolio-ops/scripts/esteban_gsc_snapshot.py \
  --output-dir /tmp/esteban-gsc-commercial-20261028 --days 90
```

Query × canonical page rows: `reel editor fort lauderdale` → 11 impressions, 0 clicks, average position 9.09 at `/services/reels-editor-fort-lauderdale`; `video production fort lauderdale` → 3, 0, 5.33 at `/services/video-production-fort-lauderdale`; `restaurant promo video editing miami` → 17, 0, 7.24 at `/services/restaurant-promo-video-editing-miami`.

## Exact visitor-facing changes

- English Reels adds one 132-word question section. It asks the visitor to choose one business question, send original clips, name the publishing account, and identify the approver. It links to the existing remote-editing handoff checklist.
- English Fort Lauderdale production adds one 129-word question section. It asks for the business decision, city, date, placement, existing footage, people/areas, and access limits before a scope is returned.
- English Miami restaurant editing adds one 142-word question section. It distinguishes supplied-footage editing from separately scoped filming and links to the existing restaurant idea guide and published Bar Door Monkey page.
- Spanish counterparts add equivalent visible route-specific sections. The restaurant section replaces, rather than adds to, the prior handoff/revision heading, preserving the existing four-section route shape.

## Source and link checks required from reviewer

- Inspect `git show 7015724f --` for actual code/copy.
- Confirm all five canonical route files already existed before the commit with `git show 7015724f^:<path>`.
- Confirm the four contextual targets resolve in the current production site: `/resources/remote-editing-handoff-checklist`, `/guides/video-content-ideas-for-restaurants`, `/portfolio/bar-door-monkey`, `/es/guias/entrega-para-edicion-remota-de-video`, `/es/guias/ideas-de-contenido-de-video-para-restaurantes`, and `/es/portafolio/bar-door-monkey`.
- Reject any claim that this change produced rank, citation, traffic, inquiry, or revenue impact.

## Checks already run

- `pnpm typecheck` passed.
- `pnpm lint` passed with 0 errors and 22 pre-existing warnings.
- `pnpm test` passed: 177 files, 3,690 tests.
- `pnpm rail-adoption:check` passed: 3 tests.
- `pnpm lastmod:update` passed and updated the six changed pages' visible/JSON-LD/sitemap dates.
- `git diff --check` passed.

The full `pnpm build` compiled successfully and completed lint/type validation, then its 608-page static generation outlasted the terminal's 30-second job limit. It is not represented as a successful full build until a terminal receipt is captured.
