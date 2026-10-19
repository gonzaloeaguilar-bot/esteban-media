# Published-work proof cards for buyer pages

## Brief

**Visitor:** a phone-first buyer comparing an on-location or high-budget video project before they contact Esteban.

**Problem evidenced in production:** the two new corporate and brand service routes lead with a primary action but show proof only as a text card; the new English and Spanish RFP pages answer clearly but use an abstract illustration. The homepage establishes the appropriate Esteban pattern: visible real work before a larger commitment.

**Build:** create one brand-local `PublishedProjectProof` component. Its input is an existing internal portfolio path, title, existing scope note, and CTA label. It resolves that path only when it matches `^/(es/)?portfolio/<id>$`, then calls `getPortfolioItemById(id)` and `getPoster(item)`. It renders only when the item is `live` and has a local poster; otherwise it returns `null`. It uses `next/image`, meaningful project-specific alt text, a normal server-rendered `Link`, and existing `data-cta` delegation—no new event name or client tracking code.

Adopt it in the shared English `GeoServicePage` proof block whenever that existing page's own `proofHref` meets that resolution rule. Use it directly on the two new corporate and brand routes and the matching Weston corporate-editing route, which are hand-authored and do not use that shared renderer. On the RFP guide pair only, use the component in the introduction by opting in through a new `heroProof` field; it replaces the abstract illustration only on those two routes. The existing lower guide proof card stays unchanged. Do not alter the homepage hero, make video autoplay, duplicate a portfolio carousel, fabricate work, add a new claim, or turn all guides into media cards.

**Human path:** service/guide promise → see actual work and exact role → inspect the published project → start a scoped inquiry.

**Acceptance:**

1. 390x664, 390x844 and desktop show an approved project poster, project label, scope note, and working link on the two new service pages, the matching Weston corporate-editing route, and guide pair.
2. Service pages using `GeoServicePage` inherit the card only where their own existing proof link points at an approved local portfolio poster.
3. The answer-first sentence and primary action remain before or alongside proof; nothing critical depends on JavaScript; reduced-motion changes nothing essential.
4. No claims beyond the existing portfolio entry and proof text; image alt text identifies the published project.
5. Targeted tests assert the valid EN/ES portfolio resolution cases, reject external/non-portfolio/placeholder items, assert the two service and two RFP routes use the component, preserve the abstract illustration on a non-RFP guide, and assert `data-cta` is present. Then run `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm rail-adoption:check`, and `python3 $HOME/.claude/durable/analytics-gate.py --repo <repo>`.
6. Production-event baseline: `public/track.js` already delegates every `data-cta` click to the closed-vocabulary `cta_click` event. Current high-budget proof-card click volume is **UNKNOWN** because this card does not exist yet; the component will use `data-cta="published_project_proof_<id>"`, making T+28 readout possible without a new event type. Browser verification must inspect the emitted event after a click; no click count is inferred before release.


PREVIOUS ATTEMPT FAILED AT THE ACCEPTANCE CHECK. Run this check FIRST, read the failure, fix it, then re-run it before reporting done:
{"boundary": "cmd:pnpm test && pnpm typecheck && python3 $HOME/.claude/durable/analytics-gate.py --repo /Users/gonzalo/code/esteban-human-proof-cards", "evidence": "\ncto-gate: provider budget violation \u2014 {\"cost_usd\": 0.1389698, \"max_cost_usd\": 0.75, \"max_total_tokens\": 16000, \"provider\": \"claude\", \"reasons\": [\"token_cap_exceeded\"], \"status\": \"fail\", \"total_tokens\": 141103}"}
