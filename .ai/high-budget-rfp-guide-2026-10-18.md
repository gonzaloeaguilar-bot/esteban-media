# High-budget buyer-guide implementation brief

## Visitor and purpose

A South Florida marketing, communications, or event team needs to prepare one comparable request before asking video-production providers for a quote. The page must help the person define the project without stating that Esteban Moreno Media provides every crew configuration, permit, insurance policy, usage-rights arrangement, or enterprise production capability.

## Scope

Create an English/Spanish guide pair through the existing guide data and renderer:

- English: `/guides/video-production-rfp-template-miami`
- Spanish: `/es/guias/plantilla-brief-rfp-produccion-video-miami`

Use the existing guide components and metadata/schema path, not a hand-built page. Add reciprocal localized routing/hreflang, sitemap/inventory wiring required by the current repository patterns, contextual internal links from the new guide to the existing corporate, brand, conference, and corporate-cost pages, plus relevant reciprocal links where the existing guide data makes that possible without duplication.

The answer-first introduction should say that the template helps compare scope, timing, and final files before a team chooses a partner. The English and Spanish sections should cover only decision questions: goal/audience; deliverable matrix; scope/budget drivers; approvals; fair proposal comparison; copy-ready template; event appendix; known permissions/rights questions; and when a tailored plan is needed. Keep normal guide sections within the dual-audience length conventions, server rendered, and use native details only if the existing guide renderer does.

The page must use conditional, buyer-directed language such as "ask the provider" and "confirm who owns this decision." It must not assert Esteban supplies insurance, permits, specific crew, rights transfer, drone work, event coverage, delivery timing, or large-budget work. Do not add price figures, client names, testimonials, equipment, or outcomes.

Use only authoritative links that directly support a narrow question: City of Miami filming guidance, Film Lauderdale permit requirements, and U.S. Copyright Office work-made-for-hire guidance. Avoid stating a universal permit or rights rule.

Update `lastmod` using the repository script. Add targeted tests that prove both guide routes, reciprocal locales, answer-first content, source links, and the no-capability-claim boundary.

## Acceptance

`pnpm check && pnpm lastmod:update && pnpm test -- --runInBand` is not necessarily a valid Vitest syntax. Instead, run the repository's correct targeted tests and then `pnpm check`. Build the production output and inspect raw generated HTML for both URLs, confirming the title, answer-first text, source links, and internal links occur before any client JavaScript requirement.

Do not commit, push, open a pull request, deploy, submit IndexNow, or modify unrelated current-branch work. Report exact changed files, commands and outputs, and anything that cannot be proved.
