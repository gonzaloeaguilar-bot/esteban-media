# Esteban Moreno Media — Repository Rules

Read this file before changing the repository. Obsidian is the project-context source of truth.

## Start here

1. Read `/Users/gonzalo/obsidian-wiki/client-esteban-media/wiki/esteban-media-hot.md`.
2. Read `/Users/gonzalo/obsidian-wiki/client-esteban-media/wiki/esteban-media-index.md`.
3. Read `/Users/gonzalo/obsidian-wiki/client-esteban-media/agents.md`.
4. For active engineering work, read `.ai/handoff.md`.

## Canonical systems

- Production: `https://estebanmorenomedia.com`
- Vercel project: `esteban-media`
- GitHub: `https://github.com/gonzaloeaguilar-bot/esteban-media`
- Obsidian: `/Users/gonzalo/obsidian-wiki/client-esteban-media/`
- Local repo: `/Users/gonzalo/code/esteban-media`

## Canonical business facts

- Public name: Esteban Moreno Media
- Owner: Esteban Moreno López
- Technical/project operator: Gonzalo
- Email: `esmolopez@gmail.com`
- Phone: `(305) 497-4478`
- Base: Fort Lauderdale; service-area business with no public studio
- Markets: Broward and Miami-Dade; Palm Beach County is an expansion area
- Language: Spanish-first; intermediate English
- Confirmed priorities: video editing, AI-assisted content, social content planning, and selectively scoped on-location production

Never invent clients, results, reviews, prices, turnaround, credentials, addresses, equipment, language fluency, or availability. Do not publish Esteban's home address. Do not strengthen Palm Beach positioning without real local evidence.

## Repository map

- `app/` — Next.js routes, metadata, sitemap, robots, and page-level schema
- `components/` — shared site UI
- `lib/` — canonical site data and tests
- `public/llms.txt` — agent-readable public facts; useful, not a Google ranking shortcut
- `docs/` — private project/content-source material; this repository must remain private
- `.ai/handoff.md` — compact current engineering status
- `backlog.md` — repo-local implementation queue

## Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm rail-adoption:check
pnpm check
```

All five validation gates must pass before merge or production deployment. After deployment, smoke-test changed routes and the canonical contact links.

## Shared components for public pages

Every public page contribution must use the shared Rail/common component system
before adding hand-written UI. For service pages, start from
`.ai/service-page-template.md` and the existing `components/service-depth.tsx`
pattern:

- page-specific copy goes in `lib/service-depth-content.ts`
- render `ServiceCraft`, `ServiceFaqs`, and `ServiceRelated`
- generate FAQPage JSON-LD with `buildServiceFaqSchema`
- keep conversion sections attributable with `data-section` and `data-cta`

If the needed UI does not exist in Rail/common components, add it to the shared
library and sync it into this repo instead of creating a private one-off. The
`pnpm rail-adoption:check` gate blocks new dense hand-rolled public pages unless
they use common components or an approved shared renderer.

## Git and release policy

- Work through branches and pull requests; keep `main` reproducible and deployable.
- Stage only intended files. Never reset, discard, or overwrite unrelated work.
- Never force-push `main` or perform destructive Vercel/domain operations.
- Safe code/docs/SEO improvements may ship after gates pass.
- Stop for spending, DNS transfer, credentials, CAPTCHA/2FA, paid services, public client proof, review solicitation, external outreach, or unsupported claims.
- Keep the GitHub repository private while internal interview/source documents are tracked.

## SEO / GEO / ALOHA rules

- Preserve NAP, canonicals, hreflang, sitemap, robots, structured data, and bilingual internal links.
- Favor real portfolio proof, case studies, reviews, citations, and useful answer-first pages over generic location-page volume.
- No fake storefront or address schema. Google Business Profile should be a hidden-address service-area profile when verified.
- Structured data must match visible content.

## Code intelligence

- Graphify output is generated locally in `graphify-out/` and intentionally ignored because source documents can contain private interview context.
- Query an existing graph before broad exploration: `graphify query "<question>"`.
- After meaningful committed changes, update with `graphify --update` or rebuild if the graph is stale.
- Do not create or commit `.codegraph/` unless the user explicitly opts into CodeGraph indexing.

## Completion rule

Before finishing substantive work, update:

- `.ai/handoff.md`
- the relevant Obsidian project note and `esteban-media-hot.md`
- `backlog.md` when work changes status
- `/Users/gonzalo/obsidian-wiki/_Agent_Workspace/Project_Registry.md` after a material state change
