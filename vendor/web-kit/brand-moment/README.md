# wk-brand-moment

The first-paint moment. FLAS stamps a plate **NEW RIDE** for someone taking
delivery; Front Line stamps **ROAD READY**; Geebs racks a bar and stamps **DAY
ONE**; DuPont turns a key; EaseForward takes a breath.

The timing and the guards are shared. **The object is not** — pick the emotional
moment the business actually delivers. A stamp on an anxiety journal would sell
the opposite of the product.

## Paste

```html
<!-- FIRST thing in <body>, or at the end of <head>. It must run while the
     document is still parsing. -->
<script>
  /* contents of boot.js */
  wkBrandMoment({ key: "yourbrand_moment", never: ["/apply"] });
</script>
```

```html
<!-- after the body content, or from your framework's client bundle -->
<script>
  /* contents of mount.js */
  wkMountMoment({ name: "tag_drop", html: '<div class="plate">NEW RIDE</div>', runMs: 2700 });
</script>
```

Next.js: `boot.js` goes in a component rendered as the first child of `<body>`
via `dangerouslySetInnerHTML`. `next/script` with `beforeInteractive` was tried
on FLAS and **never reached the HTML**.

## Non-negotiables, each of which cost a real session

- **Decide before paint.** The inline script sets the attribute; CSS paints the
  veil in frame one. Deciding after the module loads is what made DuPont show a
  cream "LOADING" screen at 120ms and the brand moment only at 300ms.
- **The failsafe is the whole safety argument.** `failsafeMs` removes the
  attribute no matter what. Without it, a failed bundle leaves a visitor staring
  at a coloured rectangle.
- **`runMs` must be shorter than `failsafeMs`.** The timeline ends first; the
  failsafe outlives it.
- **Once per session, and never on a conversion form.**
- **The first Tab ends it** — an overlay covers a page but not its focus order.
- **The served HTML must contain no overlay markup.** `curl <url> | grep -c` = 0.

## Before you call it done

- [ ] fresh session plays it; the same tab reloaded does not
- [ ] `prefers-reduced-motion` gets nothing
- [ ] the attribute is gone afterwards and the page scrolls (test with
      `behavior:"instant"` — smooth scrolling makes a passing page look stuck)
- [ ] CLS measured with and without it
- [ ] zero `pageerror`
- [ ] `brand_moment_shown` and `brand_moment_complete` both arrive, with
      `dismissed_by` and `elapsed_ms`
- [ ] the object still reads as the object at 390px. Geebs' first frame read as
      a red dot on a slider until the plate got a hub and the bar got knurling.
