# Search Console index-watch operations

`com.esteban-media.index-watch` runs at 08:00 every Wednesday, Friday, and Sunday while macOS is configured for `America/New_York`; same-day idempotency prevents duplicate collection. The installer refuses to load the job in another system timezone because `StartCalendarInterval` follows macOS, not the child process's `TZ` variable. macOS coalesces a sleep-missed calendar event after wake; after a power-off miss, use the manual run command below. The job reads only Search Console performance and indexed-version URL Inspection data for the fixed 46-URL sitemap set.

## Runtime paths

- Credential source: `~/.config/geebs/google_oauth_webmasters_token.json` (read-only; never copied or rewritten)
- Latest state: `~/.local/state/esteban-media-index-watch/latest.json`
- Run/error evidence: `last-run.json`, `last-error.json`, `launchd.out.log`, and `launchd.err.log` in the same state directory
- Durable report: `/Users/gonzalo/obsidian-wiki/client-esteban-media/wiki/esteban-media-index-watch.md`
- Installed job: `~/Library/LaunchAgents/com.esteban-media.index-watch.plist`

The job writes state and the managed report atomically per file, rolls state back if the report write fails, and repairs a missing same-day report without calling Google again. API/auth/quota failures leave the previous baseline intact and are operational errors, never de-indexing evidence. A de-indexing alert requires a confirmed `PASS` to `NEUTRAL` or `FAIL` transition. First observed impressions alert once from the all-data property total; watched-page rows provide detail when Search Console returns them. The milestone remains latched in state.

Pending local notifications are a durable outbox. Each non-dry run drains and persists that outbox immediately after acquiring the lock, before fresh API collection or report writes; failed deliveries remain queued for the next launch.

The exact legacy 20-URL v1 state is migrated in place when the 46-URL release reaches production. Existing history, events, notifications, and confirmed verdicts are retained; the 26 new URLs begin unconfirmed, and a fresh run is forced even when a legacy run already exists for the same Eastern date. Historical rows keep their original 20-URL denominator. Any malformed state or inventory other than the exact legacy/current contract fails closed.

## Commands

```bash
pnpm index-watch:dry-run
pnpm index-watch:run
pnpm index-watch:status
sh scripts/install-index-watch-launch-agent.sh
launchctl print gui/$(id -u)/com.esteban-media.index-watch
```

`run` is idempotent by Eastern calendar date unless `--force` is supplied. The install script validates the committed plist, installs it with owner-only permissions, bootstraps it, and kickstarts the first run.
