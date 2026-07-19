# Weekly health and search digest operations

`com.esteban-media.weekly-digest` runs every Sunday at 08:45 while macOS is configured for `America/New_York`, after the 08:00 index-watch window. The script polls the complete B1 readiness contract for up to six minutes, which handles launchd starting both missed jobs together after wake.

The installer refuses to load the job when the Mac is not set to Eastern time because `StartCalendarInterval` follows the system timezone; the plist's `TZ` variable controls only the child process. Every digest run checks `/etc/localtime` again before reading B1, probing production, or mutating state/notes. A later timezone change therefore produces `last-error.json` instead of a wrongly dated digest.

macOS coalesces a sleep-missed calendar event after wake, but a powered-off Mac has no guaranteed weekly SLA. After a power-off miss, restore the Mac to `America/New_York`, then run `pnpm index-watch:run` and `pnpm weekly-digest:run` manually; both commands are idempotent for the current Eastern date. A status becomes `STALE` at 08:55 ET on the next scheduled Sunday if no newer digest has succeeded.

## Runtime paths

- Source state: `~/.local/state/esteban-media-index-watch/latest.json` plus `last-error.json`
- Digest state: `~/.local/state/esteban-media-weekly-digest/latest.json`
- Run/error evidence: `last-run.json`, `last-error.json`, `launchd.out.log`, and `launchd.err.log` in the digest state directory
- Hot pulse: `/Users/gonzalo/obsidian-wiki/client-esteban-media/wiki/esteban-media-hot.md`
- Detail/history: `/Users/gonzalo/obsidian-wiki/client-esteban-media/wiki/esteban-media-weekly-digest.md`
- Installed job: `~/Library/LaunchAgents/com.esteban-media.weekly-digest.plist`

The digest never calls Search Console or URL Inspection. It consumes a validated, same-Eastern-date, no-more-than-18-hours-old `esteban-media.index-watch.v1` snapshot with the Pacific analytics range expected at digest time and the exact current 46-URL hash. It then runs four bounded production probes: homepage/canonical, sitemap parity, robots directives, and the exact GA loader/config/production-host guard plus query-safe manual-page-view fields. “GA configuration present” is not a claim that collection or Realtime processing is healthy.

The exact legacy 20-URL v1 digest remains readable during the inventory transition. Its existing history retains the original denominator, same-day replay is bypassed once, and the first current run starts a fresh trend baseline instead of comparing 46 URLs against 20. Malformed or foreign inventory states fail closed.

Probe failures are monitoring observations: the job writes a `DEGRADED` digest with per-probe evidence. Credential/state/vault/contract errors are execution failures, preserve the previous digest, create `last-error.json`, and exit nonzero.

## Commands

```bash
pnpm weekly-digest:dry-run
pnpm weekly-digest:run
pnpm weekly-digest:status
sh scripts/install-weekly-digest-launch-agent.sh
launchctl print gui/$(id -u)/com.esteban-media.weekly-digest
```

The run is idempotent by Eastern calendar date. A same-date replay makes no network requests, repairs missing managed notes from persisted state, and otherwise leaves digest state, the hot pulse, and detail note byte-stable.

## Post-merge acceptance

The installer starts the job asynchronously. Do not inspect its output immediately after `kickstart`; first observe the launchd run count increase and then wait until `launchctl print` no longer reports a running process.

1. Confirm `/usr/bin/readlink /etc/localtime` ends in `/America/New_York`. Run `pnpm index-watch:status` and require the current Eastern date, no `last-error.json`, the exact 46-URL hash, and inspection counts totaling 46.
2. Run `sh scripts/install-weekly-digest-launch-agent.sh`. Confirm the installed and committed plists are byte-identical with `cmp`, mode `600`, and `launchctl print gui/$(id -u)/com.esteban-media.weekly-digest` shows Sunday 08:45, the committed absolute script path, and exit status `0` after completion.
3. Run `pnpm weekly-digest:status`. Require `READY`, overall `PASS`, probe health `PASS`, four passing real probes, the exact B1 source run ID/totals/hash, and indexed coverage reported against all 46 watched URLs.
4. Inspect the hot note and detail note. Require one managed block in each, the current Eastern date, three HTTP `200` observations, exact GA configuration evidence, finalized/all-data property totals, 46-URL coverage, and a preserved history row for each prior run. Require no `last-error.json` and a zero-byte `launchd.err.log`.
5. Hash `latest.json`, the hot note, and the detail note. Kickstart once more, wait for launchd completion, and require `ALREADY_RECORDED`, zero additional probes, byte-identical hashes, no error state, and zero-byte stderr.
