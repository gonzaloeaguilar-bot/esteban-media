# wk-reading-path

The fold-out. Front Line went from 31,175px of mobile scroll between the hero and
the phone number to 14,628px — **53% less, zero content removed**.

## Markup

```html
<details class="wk-keep-reading" id="more">
  <summary>
    <span>
      <strong>Need more before you call?</strong>
      <small>Shop photos, repair answers, service list, certification, and reviews.</small>
    </span>
  </summary>
  <!-- everything that only supports reading -->
</details>
<script src="/assets/wk-reading-path-anchors.js"></script>
<script>wkReadingPathAnchors();</script>
```

## Where the split goes

**Above:** hero, offer, price, proof-of-method, social proof.
**Inside:** photo galleries, explainers, service lists, regional pages, reviews.
**Outside, below:** FAQ and contact — they are the tail of the decision path.

## Before you collapse anything

- [ ] **Audit the schema anchors.** Extract every fragment from the page's JSON-LD
      and check which live inside the `<details>`. FLAS publishes `#documents` and
      `#approval` as HowTo step URLs and `#five-hundred-down-answer` as a speakable
      selector. Collapsing one of those is invisible in a screenshot.
- [ ] **Check the CI job list, not `npm test`.** Front Line's `visual-uat.mjs` runs
      only in CI and asserted a now-collapsed section was visible. It was the one
      gate that caught the change.
- [ ] **Check whether a generator writes the page.** `es/index.html` is written by
      `renderEsHomepage`; the first hand edit was wiped by the next build, silently.
- [ ] Navigate to every `#id` on the page and assert it lands (`top` ≈ 0).
- [ ] Assert the word count in the DOM is unchanged. Collapsed is not removed.

## One definition, not a copy per page

FLAS shipped `KeepReading` as a component and applied it to 22 routes; a static
site gets one CSS block and one script. Never paste the markup per page — the
homepage carried this thesis alone for a day while 106 other pages did not.
