# Daily Outreach — Operations

The daily outreach campaign runs `scripts/compliant-outreach-dispatcher.mjs` every
morning at **08:30 America/New_York** via launchd
(`ops/launchd/com.esteban-media.daily-outreach.plist`).

## Posture

- **Default = DRY-RUN.** With `ESTEBAN_SEND_LIVE` unset, the dispatcher harvests real
  contact emails, screens every recipient (fabricated/suppressed rejected), builds the
  CAN-SPAM–compliant emails it *would* send, writes them to
  `public/leads/outreach-dryrun-drafts.json`, and **sends nothing**.
- **Live send requires ALL of:**
  1. `RESEND_API_KEY` in `.env.local` (gitignored — never commit it),
  2. `ESTEBAN_SEND_LIVE=1`,
  3. `ESTEBAN_POSTAL_ADDRESS` set to a real mailing address (PO box / CMRA — **never**
     Esteban's home address). CAN-SPAM requires it in the footer; the dispatcher
     `assertLiveSendAllowed()` throws without it.

## Install / load

```sh
# prerequisites: PR #55 merged to main; the /Users/gonzalo/code/esteban-media checkout
# is on main and pulled (so scripts/compliant-outreach-dispatcher.mjs exists there).
mkdir -p /Users/gonzalo/.local/state/esteban-media-daily-outreach
cp ops/launchd/com.esteban-media.daily-outreach.plist ~/Library/LaunchAgents/
launchctl unload ~/Library/LaunchAgents/com.esteban-media.daily-outreach.plist 2>/dev/null
launchctl load  ~/Library/LaunchAgents/com.esteban-media.daily-outreach.plist
launchctl list | grep daily-outreach   # column 2 == 0 means last run OK
```

## Go live (owner)

1. Confirm `RESEND_API_KEY` is present in `.env.local` and the **leaked key
   `re_CdQhFqvt…` has been rotated** (it lives in git history).
2. Add to the plist `EnvironmentVariables` (see the commented block) or export before a
   manual run:
   ```sh
   ESTEBAN_SEND_LIVE=1 ESTEBAN_POSTAL_ADDRESS="Esteban Moreno Media, PO Box …, FL …" \
     node scripts/compliant-outreach-dispatcher.mjs
   ```
3. Reload the launchd job.

## Manual dry-run

```sh
node scripts/compliant-outreach-dispatcher.mjs      # writes drafts, sends nothing
cat public/leads/outreach-dryrun-drafts.json
```
