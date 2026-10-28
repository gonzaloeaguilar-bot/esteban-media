# Esteban commercial market-ownership extension

## Decision

Extend the draft-only opportunity graph with an optional, source-bound market
ownership layer. It records what an observed answer engine cited for a query,
and the commercial SERP attributes already present in Esteban's authenticated
Semrush UI export. It does not infer rankings, recommendations, demand, or
conversion from either source.

## Inputs and truth boundaries

| Input | What the graph may say | What it must not say |
| --- | --- | --- |
| Esteban coverage/GSC candidate | first-party query/page observation | total market demand or competitor rank |
| Semrush UI organic-position export | dated estimated volume, difficulty, position and SERP-feature labels | a live Google result or causal reason for a result |
| Local SERP snapshot | dated Google response or explicitly labeled fallback response | competitor ownership when result URLs are absent or Google is blocked |
| AI-citation JSONL | a dated engine/prompt citation observation and cited URLs | citation frequency, recommendation rate, or business outcome |
| Raw owned route response | visible contact path exists in served HTML | lead, booking, or revenue |

`MISSING`, `UNMEASURED`, auth-gated, or a nonmatching prompt remain explicit
measurement gaps. They are never converted to a losing score or zero.

## New optional graph edge

`market_ownership` is optional; it never makes a cluster eligible. Its fields
are:

- `citation_observation`: `observed` only when an `ok` Esteban engine row
  matches the candidate query; otherwise `unmeasured` with a reason.
- `winning_domains`: counts cited non-owned domains/URLs from those matching
  rows, retaining the source classification when supplied.
- `commercial_serp_context`: Semrush UI fields already attached to the
  candidate, including the dated export and observed SERP labels.
- `serp_observation`: the local SERP snapshot, retaining a blocked Google
  response as `unmeasured` even when a Bing fallback is present.
- `reusable_patterns`: deterministic candidates only: source type and observed
  SERP feature labels. It does not claim a competitor page feature unless a
  future raw-page evidence collector records it.
- `our_delta`: missing owned-page coverage, not a claim that copying a winner
  will improve rank or citations.

## Acceptance

1. Unit tests prove citation competitors are retained only for matching,
   measured observations and exclude Esteban-owned URLs.
2. A `MISSING` citation row produces `unmeasured`; it never creates a zero
   count or market-winner claim.
3. Semrush UI context is carried with the source date and remains explicitly
   modeled/estimated.
4. Existing promotion states remain determined only by the required service
   area, demand, coverage, conversion-route, and outcome edges.
5. The graph remains draft-only and performs no public write or external send.
