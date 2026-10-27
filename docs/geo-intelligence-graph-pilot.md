# Esteban Local Commercial Opportunity Graph Pilot

## Goal

Turn the existing draft-only demand-content farm into an explainable ledger of
local commercial clusters. The pilot must join only evidence it can source:

1. an approved service-area claim;
2. a fresh query-to-page demand observation;
3. an owned-page coverage verdict;
4. a visible contact/conversion route; and
5. an explicit outcome-measurement status.

## Non-goals

- No new public pages, publishing, outreach, analytics credentials, or Semrush API.
- No treating a citation snapshot, Reddit wording, CTA click, or lack of data as
  proof of commercial demand, a ranking, an inquiry, or revenue.
- No production deployment in this pilot.

## Required artifact

The implementation must write/read a versioned local JSON ledger whose records
show every edge above, source timestamp, confidence/status, eligible state, and
smallest proposed action. A record missing a required edge must be
`needs_evidence` rather than promoted.

## Implementation note

The pilot adapter lives in `scripts/esteban-geo-intelligence-graph.mjs`. It
reuses the existing demand-content farm, performs a raw-HTML contact-route
check for each candidate target, and writes only a local JSON ledger. In the
absence of a configured read-only lead/outcome source, every otherwise complete
record remains `unmeasured_outcome` rather than `ready_to_review`.

## Pilot acceptance

- Deterministic unit tests cover accepted core-area rows, expansion-area rows,
  invalid/foreign areas, existing-page repair, missing coverage, missing route,
  and proxy-only outcomes.
- A dry run over Esteban's existing approved source files emits the ledger and
  never writes public site content or sends data externally.
- The output distinguishes `ready_to_review`, `needs_evidence`, and
  `unmeasured_outcome`; it does not claim a lead, booking, sale, citation, or
  ranking.
