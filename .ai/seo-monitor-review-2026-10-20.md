# Read-only review: production technical SEO monitor repair

Review commit `3cc6f03673355e294e8d0807f1f5f8a6eca1cb28` only.

## Evidence

- Before the change, the production monitor failed because `/portfolio/bar-door-monkey` used the intentional server-rendered `data-video-facade` click-to-play pattern rather than an eager YouTube iframe.
- Production raw HTML includes `VideoObject` JSON-LD and the click-to-play facade. Eager YouTube embeds would add unused third-party payload and contradict the component contract.
- The same monitor corrupted valid JSON-LD strings with escaped quotes before parsing them.
- A transient production fetch failure also produced a false failure. The repaired monitor passed `pnpm seo:verify` three consecutive times against the canonical domain.
- Full `pnpm check` passed after rebuilding the stale, intentionally changed Spanish chatbot text-parity fixture: build, 194-route text parity, and Spanish hub indexability all passed.

## Acceptance

Confirm or reject whether the verifier still catches real missing video/schema failures, whether its retry behavior masks any meaningful error, and whether the fixture refresh is justified by the rendered route. Do not modify files or external systems. Return a concise verdict with any required change.
