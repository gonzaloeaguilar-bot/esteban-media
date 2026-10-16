# Esteban local growth measurement operations

This lane separates four measurements that answer different questions. Do not combine them into a single "SEO score."

| Surface | Question answered | Cadence | Truthful limitation |
|---|---|---|---|
| Search Console finalized report | Which Google web queries and pages received search visibility? | Weekly | Does not measure Maps, AI citations, leads, or a causal release effect. |
| Google Business Profile export | What actions and discovery terms did the listing report? | Monthly | Does not give a local-pack rank. |
| Fixed-coordinate Maps capture | Did this one listing appear in this query at this map center? | Every 28 days and after a factual profile change | Still subject to signed-in personalization; no numeric result without a visible loaded list. |
| Bing/Ahrefs/PageSpeed/Clarity | Crawl/AI discovery, authority/technical issues, field performance, and on-page friction | Read-only review cadence | Each is a supporting diagnostic, not a substitute for Search Console or lead data. |

## Weekly settled Search Console report

`pnpm seo:measurement:run` writes a report only from authenticated Search Console `dataState: final` rows. It deliberately excludes the newest three Pacific calendar dates and uses a 28-day window. It is the page-selection queue, not a content generator.

```bash
pnpm seo:measurement:status
pnpm seo:measurement:run
```

Output paths:

- State: `~/.local/state/esteban-media-seo-measurement/latest.json`
- Durable report: `~/obsidian-wiki/client-esteban-media/wiki/esteban-seo-measurement.md`

The committed `com.esteban-media.seo-measurement` LaunchAgent runs Monday at 08:15 Eastern. It is intentionally **not installed or activated by this change**. After a manual run has produced a valid report, install it deliberately with `sh scripts/install-seo-measurement-launch-agent.sh` and verify with `launchctl print gui/$(id -u)/com.esteban-media.seo-measurement`.

## GBP export intake — no profile edit

Export the Google Business Profile performance CSV in the owner interface, save the original unchanged under:

`~/.local/share/esteban-media/gbp-exports/YYYY-MM/`

Create a companion `intake.md` using this exact template:

```md
# GBP performance intake — YYYY-MM

- Exported at: YYYY-MM-DDTHH:MM:SS-04:00
- Reporting window shown by Google: YYYY-MM-DD through YYYY-MM-DD
- Account/profile: Esteban Moreno Media (CID 12305289738935181687)
- Source file: original-export-name.csv
- Profile changed during window: none / factual description
- Views: unknown until export parsed
- Searches: unknown until export parsed
- Website clicks: unknown until export parsed
- Calls: unknown until export parsed
- Directions: unknown until export parsed
- Messages: unknown until export parsed
- Discovery terms shown by Google: unknown until export parsed
- Notes: export fields can change; preserve source headers and do not fill missing fields with zero.
```

The monthly task is collection and interpretation only. It must not change categories, hours, services, website URL/UTMs, or public profile copy.

## Fixed-coordinate Maps capture

Use the existing vault sheet `[[esteban-local-pack-measurement-2026-10-16]]`.

- Center: `26.1224, -80.1373` (Fort Lauderdale civic center)
- Zoom: `12`
- Queries: `videographer Fort Lauderdale`, `video production Fort Lauderdale`, `video editor Fort Lauderdale`, `editor de video Fort Lauderdale`, `edición de Reels Fort Lauderdale`
- Listing CID: `12305289738935181687`

For every query, capture timestamp, exact typed query, account state, center/zoom, result state, position only when visible, CID/URL and screenshot path. If the list fails to load, write **Not captured**. Never convert a failed capture into rank zero.

## Decision cadence

Monday: choose no more than one existing canonical page from finalized Search Console evidence. Monthly: compare completed windows, GBP export and Maps capture separately. A production release earns an outcome statement only after its subsequent comparable completed window and relevant lead evidence are available.
