# Gmail Lead Desk

The lead desk watches only `Esteban/Leads` in `info@estebanmorenomedia.com`.

For a new labeled message it extracts the event date, venue, hours, deliverables, guest count, edit deadline and budget. It uses `lib/pricing.ts` as its rate-card source. It creates two Gmail drafts: a reply in the lead thread and an alert addressed to Esteban. It never calls Gmail's send endpoint.

Incomplete or non-matching work gets an internal range and a list of missing details. The client draft never includes that range or a quote.

## First run

Create a Gmail OAuth client for the Workspace mailbox with `gmail.modify` and `gmail.compose` scopes. Keep its short-lived access token outside Git, then run:

```bash
GMAIL_LEAD_DESK_ACCESS_TOKEN=... \\
ESTEBAN_LEAD_ALERT_EMAIL=... \\
pnpm lead-desk:run
```

The local status log defaults to `var/lead-desk-status.json` and is ignored by Git. Once the manual run is verified, schedule this command every five minutes on the machine holding the token.

## Channel and origin (added 2026-10-28)

Every processed inquiry records `channel` (`email` for this runner) and `foundVia`, the client's own stated origin phrase in English or Spanish (for example "found you on Instagram" or "los vi en Google"). Nothing is inferred: when the inquiry does not state an origin, `foundVia` is `null` in the status record and the reply draft appends exactly one question before the sign-off ("how did you hear about us?" / "¿cómo nos encontraste?"). The owner alert shows `Found via:` so the lead ledger can be reconciled against the website's `found_via` form field. Why: on 2026-10-27/28 two real inquiries arrived with zero form submits and zero organic clicks, so no surface could attribute them.
