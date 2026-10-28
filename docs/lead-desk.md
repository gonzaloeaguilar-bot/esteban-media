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
