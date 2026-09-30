# Autonomy Policy — Esteban Moreno Media

The website is production-live. Safe, reversible work remains highly autonomous, but release gates and business-claim boundaries now apply.

## Safe after validation

- Components, styles, accessibility, performance, and tests
- Factual copy corrections and approved bilingual content
- Metadata, sitemap, robots, schema, internal links, and `llms.txt`
- Documentation, handoffs, and project-system maintenance
- Production deployment after CI/local gates pass and the diff contains no hard-stop item

## Explicit approval required

- DNS/domain transfer, destructive Vercel changes, rollback, or force-push
- Credentials, secrets, CAPTCHA, 2FA, identity/address verification, or account ownership changes
- Paid services, purchases, ads, or new recurring costs
- Public client names, logos, footage, reviews, results, prices, turnaround, credentials, or other unverified claims
- External outreach, review requests, contracts, invoices, or customer commitments

## Required gates

Use a pull request, pass `pnpm check`, review production/business-claim impact, merge to `main`, and smoke-test the canonical site. Record material decisions in `.ai/handoff.md` and the Esteban Media Obsidian module.

## Esteban-owned business changes

Esteban can approve public prices, service details, Spanish copy, locations, turnaround, credentials, contact details, and proof for his own business by marking the public-claims checkbox in the pull request and writing the approval/source in the PR body. He does not need local access to `quality-enforce`; the local evidence drain adds the Cortex JSON after required checks pass.
