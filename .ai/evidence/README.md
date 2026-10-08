# Language and package detail implementation

Scope: persistent header language control, root-only preference detection, and eight package detail routes. Provider: Codex. Coordinator: cto-dev-lead. Independent verifier: cto-qa-lead. No recursive provider dispatch.

The Graphify map and supplied shared context packet were read before editing. Their dependency paths scoped the change to the header, package content/pricing, bilingual route registry, sitemap and dependent inventory/watch contracts. Shared RailPrice is reused; package content remains in lib/packages.ts and amounts remain in lib/pricing.ts. No new pricing figures were introduced. No capability lab was activated.

## Review notes

- Explicit language selection uses a normal anchor after setting em_lang, so a prefetched client-router response cannot override the new cookie.
- Only `/` is matched by middleware. It emits a temporary redirect, preserves query strings, varies on every decision input, and disables shared caching. Known crawlers bypass redirection before saved preferences can affect them.
- All-In remains custom priced. Its copy explains that the calculator covers video rather than the entire digital package.
- Sitemap inventory and Search Console watch set include the owner-requested routes. This is recorded as an owner request, not new evidence of search demand.
- The text fixture is patched by token and link, never re-snapshotted. Every existing Spanish route receives only EN and the English accessible label from the shared header. Only es/precios.html receives the package detail button words and destinations. Unrelated historical nav drift is preserved.
- Browser review caught a white-on-cream price qualifier. Page-scoped RailPrice tokens correct it without altering the vendored library.

## Evidence

- `tests.log`: full test suite.
- `check.log`: required rail-kit, lint, typecheck, tests, build and text-parity gate.
- `analytics.log`: shared analytics gate.
- `negative-controls.log`: old header restored, middleware disabled, detail routes removed temporarily; twelve assertions fail. Two unchanged-behaviour controls stay green. All implementation files restored in a finally block.
- `focused-tests.log`: fourteen focused assertions pass after restoration.
- `browser-results.json`, `header-*.png`, `all-in-mobile.png`: rendered dimensions, menu, cookie, navigation and expanded-card interaction.
- `http-results.json`: HTTP preference handling and all eight pages with hreflang.

## Next role

The top-level coordinator should dispatch the independent rendered review and verification as sibling calls before merge. Production deployment and production analytics collection have not been claimed. This bounded call confines writes to this worktree; the coordinator owns copying the completion note to Obsidian hot.md, a durable project page, and Project_Registry.md.

## Framework response-header correction

The first HTTP check proved that Next 15.5.18's generated App Router handler replaces middleware `Vary` rather than preserving it. This is visible in `node_modules/next/dist/build/templates/app-page.js` and its ESM counterpart. A narrow pnpm patch merges the pre-existing header with Next's required RSC dimensions. It is pinned in `pnpm-workspace.yaml` and `pnpm-lock.yaml`; no framework version changed. `http-vary-negative.log` records the failed real boundary before the patch. The final HTTP probe asserts Accept-Language and no-store for both redirects and ordinary root responses. Independent review should include this patch, and a future Next upgrade must re-run that probe before retiring it.

The card-to-detail browser check also found client navigation retaining a mid-page scroll position. Detail links now use normal anchors so a shared package URL opens at its heading. The browser probe asserts scrollY is zero after following the card link.

Applicable visual rules: E01–E03 preserve the existing photos and embedded text with uncropped, natural-ratio images and actions outside images; E09 has labeled working links; E10 introduces no emoji or motion; E13 keeps price and purpose concise with expandable price factors; E16 derives claims and prices from approved sources; E17 uses inspected screenshots rather than DOM-only approval; E18 measures header controls and overlap. Carousel-specific rules are unchanged. Independent craft review remains for the coordinator.
