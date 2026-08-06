# ESTEBAN-02 recovery acceptance specification

Act as Claude specification lead. Return a concise, falsifiable Markdown acceptance contract only; do not edit files.

Context verified this session:

- Target route: `/es/video-inmobiliario-sunny-isles`.
- The production Spanish directory currently describes the route with “oceanfront penthouse” and “vistas de playa”.
- Primary source `docs/respuestas-audio-proyectos-esteban-2026-07-21.md` says Homeowners was editing only: Esteban received footage and edited it through agency 300 Bees. It also says no measurable project results were supplied.
- `lib/portfolio.ts` records Homeowners as a live 2021 editing project.
- Existing `messages/en.json` and `messages/es.json` attach an unsupported `+130%` CTR result to Homeowners.
- Existing Sunny Isles proof context falsely says Homeowners shows ocean views/interiors; no source establishes that Homeowners was shot in Sunny Isles.
- Fresh authenticated GSC is transport-blocked, Semrush browser is unavailable, and shell production DNS is blocked. These are completion walls, not permission to reuse stale rank data.

Define acceptance for a minimal factual correction that:

1. Preserves the existing canonical route/keyword intent and confirmed South Florida service-area positioning.
2. Reframes the service as editing client-supplied real-estate footage without claiming a Sunny Isles portfolio shoot, ocean/penthouse footage, performance result, turnaround, price, availability, or multilingual deliverable.
3. Uses Homeowners only as editing proof, explicitly bounded as not Sunny Isles location proof.
4. Replaces only the Homeowners unsupported result fields with sourced facts rather than inventing metrics.
5. Keeps visible FAQ and FAQPage JSON-LD identical, maintains area/portfolio/contact links, and registers qualified inquiry measurement through the existing contact path without new tracking infrastructure.
6. Requires focused tests, lint, typecheck, full tests, build, rendered preview HTTP/canonical/FAQ schema/link proof, independent Antigravity review, Claude exact-head/live verification, deployed SHA, production HTTP/schema/link/event proof, and fresh Semrush/GSC before/after or exact tested external walls.
7. Records T+0, T+14, and T+45 checkpoints; ranking outcome stays open until fresh data exists.

End with `VERDICT: SPEC_READY` or `VERDICT: HOLD`.
