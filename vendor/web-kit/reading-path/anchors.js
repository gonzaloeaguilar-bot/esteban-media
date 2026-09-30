/* wk-reading-path — make in-page links work when their target is collapsed.
 *
 * Three separate bugs live here, all of them shipped on a real site first:
 *
 * 1. A schema anchor can point INTO a collapsed section. FLAS publishes
 *    #documents and #approval as HowTo step URLs; collapsing them is a silent
 *    break that looks perfect in a screenshot. Opening the <details> before
 *    scrolling is the fix.
 * 2. `scroll-behavior: smooth` defeats a re-issued scrollIntoView — a smooth
 *    scroll restarted every tick never arrives. /#reviews sat 395px short
 *    through three "fixes". Programmatic landing must be instant.
 * 3. Images above the target keep resolving and push it down, so a single
 *    scroll lands short. Re-land until the position holds still, bounded, and
 *    abort the moment the visitor scrolls themselves.
 */
function wkReadingPathAnchors() {
  try {
    function open(target) {
      var d = target.closest ? target.closest("details") : null;
      while (d) {
        d.open = true;
        d = d.parentElement && d.parentElement.closest ? d.parentElement.closest("details") : null;
      }
    }

    function land(target) {
      var tries = 0;
      var lastTop = null;
      var aborted = false;
      function onUserScroll() { aborted = true; }
      window.addEventListener("wheel", onUserScroll, { once: true, passive: true });
      window.addEventListener("touchmove", onUserScroll, { once: true, passive: true });

      (function step() {
        if (aborted || tries++ > 12) {
          window.removeEventListener("wheel", onUserScroll);
          window.removeEventListener("touchmove", onUserScroll);
          return;
        }
        target.scrollIntoView({ behavior: "instant", block: "start" });
        var top = Math.round(target.getBoundingClientRect().top);
        if (lastTop !== null && Math.abs(top - lastTop) < 2) return; // it held still
        lastTop = top;
        window.setTimeout(step, 90);
      })();
    }

    // The brand moment sets overflow:hidden on <html> while it plays, so an
    // anchor landing that starts during it scrolls nowhere and then stops,
    // leaving the visitor part-way down a page they asked to jump into. Found by
    // the kit's own test: the target settled 53px short, every time, only when a
    // moment was mounted. Wait for the moment to finish, bounded, then land.
    function whenPageCanScroll(fn) {
      var waited = 0;
      (function poll() {
        var covered = document.documentElement.hasAttribute("data-brand-moment");
        if (!covered || waited > 5000) return fn();
        waited += 100;
        window.setTimeout(poll, 100);
      })();
    }

    function go(hash) {
      if (!hash || hash.length < 2) return;
      var target = null;
      try { target = document.querySelector(hash); } catch (e) { return; }
      if (!target) return;
      open(target);
      whenPageCanScroll(function () { land(target); });
    }

    window.addEventListener("hashchange", function () { go(window.location.hash); });
    if (window.location.hash) {
      // after layout, not before
      window.setTimeout(function () { go(window.location.hash); }, 0);
    }
    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      var target = null;
      try { target = document.querySelector(hash); } catch (err) { return; }
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", hash);
      go(hash);
    });
  } catch (e) {}
}
