/* wk-brand-moment — mounts the object, then gets out of the way.
 *
 *   wkMountMoment({
 *     name: "tag_drop",                       // analytics label
 *     html: '<div class="plate">NEW RIDE</div>',
 *     runMs: 2700                             // must be < failsafeMs in boot.js
 *   });
 *
 * Everything below exists because it was missing somewhere first:
 *  - the first Tab ends the moment, because an overlay covers a page but NOT its
 *    focus order — three Tabs during the FLAS loader landed on the header menu
 *    button, behind the cover, and an independent review waved it through
 *  - it reports dismissed_by and elapsed_ms, so the moment is measurable rather
 *    than decorative
 *  - it removes itself from the DOM, so nothing is left for a screen reader or a
 *    later click to find
 */
function wkMountMoment(options) {
  try {
    var o = options || {};
    var attr = o.attr || "data-brand-moment";
    var root = document.documentElement;
    if (!root.hasAttribute(attr)) return; // boot.js decided against it

    var started = (window.performance && performance.now()) ? performance.now() : Date.now();
    var closed = false;

    var el = document.createElement("div");
    el.className = "wk-moment";
    el.setAttribute("role", "presentation");
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = (o.html || "") +
      '<button type="button" class="wk-moment-skip">' + (o.skipLabel || "Skip") + "</button>";
    document.body.insertBefore(el, document.body.firstChild);

    function send(event, dismissedBy) {
      try {
        if (!window.gtag) return; // never installs a tag, never throws without one
        window.gtag("event", event, {
          moment: o.name || "brand_moment",
          dismissed_by: dismissedBy,
          elapsed_ms: Math.round(((window.performance && performance.now()) ? performance.now() : Date.now()) - started)
        });
      } catch (e) {}
    }

    function finish(by) {
      if (closed) return;
      closed = true;
      root.removeAttribute(attr);
      if (el.parentNode) el.parentNode.removeChild(el);
      send("brand_moment_complete", by);
    }

    send("brand_moment_shown", "");
    window.setTimeout(function () { finish("timeout"); }, o.runMs || 2700);
    el.querySelector(".wk-moment-skip").addEventListener("click", function () { finish("skip"); });
    window.addEventListener("keydown", function () { finish("key"); }, { once: true });
    window.addEventListener("wheel", function () { finish("scroll"); }, { once: true, passive: true });
    window.addEventListener("touchmove", function () { finish("scroll"); }, { once: true, passive: true });
    window.addEventListener("pointerdown", function () { finish("tap"); }, { once: true });
  } catch (e) {
    // Never let a decoration break a page: clear the veil and move on.
    try { document.documentElement.removeAttribute(options && options.attr || "data-brand-moment"); } catch (e2) {}
  }
}
