# UAT sweep

A real browser, driven over CDP, for the things a vitest gate cannot assert:
whether a control is on screen, whether a reveal actually fires, whether a
fixed bar covers the content underneath it.

```bash
pnpm build && PORT=4415 pnpm start &
node scripts/uat/audit.mjs http://localhost:4415 /es/videografo-en-miami /es
```

It launches headless Chrome from `/Applications`, so it needs no dependency
and installs nothing. Findings print as `[ALTO] route @viewport — what`.

## Why not the in-app browser pane

The pane reports `document.hidden: true`. A hidden document suspends
rendering: CSS transitions do not advance and `IntersectionObserver` callbacks
are never delivered, so nothing can ever intersect. Layout measurement
(`getBoundingClientRect`, fold position, line counts) is still valid there —
animation and visibility are not. Reading this wrong once produced a confident
report that the site's scroll reveal was dead in production. It was not.

## Why not jsdom

It cannot lay out text, so it cannot answer where the fold is, and a "fold
test" written against it would be decoration.

## What it does NOT catch

Shape. Every control in the action bar measured correctly on its own while the
bar itself wrapped to two rows and covered the card beneath it. Take a
screenshot (`Page.captureScreenshot`) and look at it; the numbers agreed with
each other and were all wrong together.

Inline links are excluded from the tap-target rule: WCAG 2.5.8 exempts a link
that sits inside a sentence, and counting them made the report look worse and
mean less.
