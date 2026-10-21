# Sector offer paths: review brief

## Visitor and purpose

A restaurant operator, event organizer, charter operator, or marina manager needs to
know what to send for a useful video quote. The existing English and Spanish service
pages describe a category, but did not put the project-specific scope decision in one
short, server-rendered answer near the top.

## Evidence

`pnpm seo:measurement:run -- --force` on 2026-10-21 read final Search Console data for
2026-09-20 through 2026-10-17: 54 query rows, 92 page rows, and 103 query-page rows.
The measured demand is for broad Fort Lauderdale short-form/editing queries, including
`editor de reels fort lauderdale` (18 impressions, position 19.67) and `editor de videos
cortos fort lauderdale` (11 impressions, position 30.82). This does not establish
restaurant, networking, or yacht query demand, so the change strengthens the six existing
indexable routes rather than creating unsupported new URLs.

## Change and factual boundary

`SectorQuotePath` adds a question-shaped answer, three concrete confirmation items, and
links to the existing on-location package and contact page on the existing restaurant,
networking-event, and yacht-charter routes in English and Spanish. It promises neither a
fixed deliverable count nor a client result. The marine copy explicitly separates a public
case study from an unapproved shoot: publication requires client-approved footage and
details.

## Acceptance

- The six affected routes contain the appropriate section in server-rendered HTML.
- The section is readable and usable at mobile 375x667, mobile 390x844, and desktop.
- Links resolve to the existing local-presence/package and contact routes.
- `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm seo:verify` pass.
- Production verification checks the changed raw HTML after merge; this release does not
  claim a ranking, citation, or lead outcome.
