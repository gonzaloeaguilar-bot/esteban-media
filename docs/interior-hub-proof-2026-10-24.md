# Interior hubs: first-screen project proof

## Decision

Give people who land directly on `/case-studies`, `/es/casos-de-estudio`, `/guides`, or `/es/guias` one real, recognisable piece of Esteban's published work before the directory begins. Reuse the existing `PublishedProjectProof` component and live portfolio posters; do not add stock media, new claims, autoplay, or a second homepage treatment.

## Visitor and outcome

A person arriving from search needs to understand that the reading hub belongs to an active media maker and then choose a relevant case or guide. The desired business outcome is a qualified project inquiry; the immediate observable event is a click from the hub proof to the published portfolio case. Baseline and commercial outcome are `UNKNOWN`; the existing delegated `data-cta` event on `PublishedProjectProof` will provide the event name after release. Re-read at T+7 and T+28 without claiming attribution from the visual change alone.

## Experience

At the end of each hub's existing answer-first opening, add one compact proof card. On a phone, the real poster leads, then a short, truthful title, one sentence of already-published context, and an explicit “View the project” link. On desktop, it becomes a balanced two-column block. Touch/hover gives only a restrained poster scale and arrow shift; reduced-motion removes it. The initial HTML retains all title, context, destination and action text.

The chosen proof must resolve only from an existing `status: live` portfolio entry through `resolvePublishedProjectProof`. The case-study hub points to a documented case with the strongest appropriate poster; the guide hub points to a published edit/process example. EN and ES use their corresponding published routes and copy.

## What stays unchanged

The hub headline, answer-first text, native disclosures, directory contents, schema, dates, price language, page hierarchy and bottom navigation stay in place. The proof card is not a video player and cannot add a loading or consent cost.

## Acceptance

1. Both EN/ES case-study and guide hubs render one existing-project proof card in served HTML.
2. Every destination is a live internal portfolio URL and every poster comes from the portfolio source; no invented outcome or media claim.
3. At 375x667, 390x844 and 1440x900, the proof has a fully visible action, no horizontal overflow, and is not obscured by the fixed navigation.
4. Keyboard focus and reduced-motion preserve a usable link and static poster.
5. Relevant unit tests, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, raw HTML checks and the human-consumption gate pass.
6. Antigravity reviews the rendered evidence; Claude verifies the brief/fidelity and a human browser confirms the live production result after any approved merge.
