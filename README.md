# Esteban Moreno Media

Bilingual marketing site for Esteban Moreno Media, a Fort Lauderdale media and content partner serving Broward, Miami-Dade, and selectively scoped Palm Beach County projects.

- Production: [estebanmorenomedia.com](https://estebanmorenomedia.com)
- Contact: `esmolopez@gmail.com` · `(305) 497-4478`
- Vercel project: `esteban-media`
- Repository: private; owned by `gonzaloeaguilar-bot`

## Current positioning

The confirmed service priorities are video editing, AI-assisted content, social content planning, and selectively scoped on-location production. The site is Spanish-first, with English support described accurately as intermediate. It does not publish fixed prices, guaranteed turnaround, unverified clients, or placeholder work as proof.

## Stack

- Next.js 15 App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Vitest
- Vercel

## Routes

- English: `/`, `/services`, `/areas`, `/areas/palm-beach-county`, `/about`, `/contact`
- Spanish core: `/es`, `/es/servicios`, `/es/areas`, `/es/areas/palm-beach-county`, `/es/sobre-esteban`, `/es/contacto`
- Spanish local-intent service pages under `/es/[slug]`
- Discovery: `/robots.txt`, `/sitemap.xml`, `/llms.txt`

## Local development

Requirements: Node.js 22 and pnpm 10.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Validation

```bash
pnpm check
```

The check command runs lint, TypeScript, unit tests, and a production build. Pull requests and `main` run the same gates in GitHub Actions.

## Opening a pull request

If you are Esteban and the PR changes public prices, service details, locations, proof, credentials, turnaround, or contact details, mark the public-claims checkbox in the PR template and write the exact approval/source in the owner approval field. Example:

```text
I, Esteban Moreno, approve the public pricing and Spanish copy in this PR.
```

You do not need to run `quality-enforce` locally. After the normal GitHub checks pass, Gonzalo's local evidence drain attaches the required Cortex quality JSON to the PR body.

## Deployment

Production is hosted on Vercel. Changes should land through a pull request, pass CI, merge to `main`, and then be smoke-tested on the canonical domain. DNS, credentials, paid services, public client proof, and unsupported business claims require explicit approval.

## Project context

- Repository rules: [AGENTS.md](AGENTS.md)
- Current engineering handoff: [.ai/handoff.md](.ai/handoff.md)
- Work queue: [backlog.md](backlog.md)
- Durable business/project context: `/Users/gonzalo/obsidian-wiki/client-esteban-media/`
