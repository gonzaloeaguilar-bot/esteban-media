/* wk-brand-moment — the decision, taken BEFORE the browser paints.
 *
 * Paste inline. Not a module, not a bundle, not a React effect: those all run
 * after the document has painted, which is what makes a loader flash the site
 * into view and only then cover it. Measured on FLAS and on DuPont.
 *
 *   Inline it, then call:  wkBrandMoment({ key: "flas_tag_drop" })
 *
 * (Deliberately no closing script tag anywhere in this file, not even in a
 * comment: the HTML parser ends the script element at the first one it sees,
 * whatever it is inside, and the rest of the file becomes stray markup. That is
 * exactly how this kit's own test suite first came back with SyntaxError on
 * every page load.)
 *
 * Options
 *   key        sessionStorage key. Required — it is what makes it once per session.
 *   attr       attribute set on <html>. Default "data-brand-moment".
 *   failsafeMs default 4000. The attribute comes off at this point NO MATTER WHAT.
 *   only       array of pathnames it may play on. Default: everywhere.
 *   never      array of pathnames it must not interrupt (an application form).
 *
 * The failsafe is the whole reason it is safe to cover a page: if the bundle
 * never loads, or hydration throws, or the module 404s, the visitor still gets
 * the page four seconds later.
 */
function wkBrandMoment(options) {
  try {
    var o = options || {};
    var attr = o.attr || "data-brand-moment";
    var root = document.documentElement;
    var path = window.location.pathname.replace(/\/+$/, "") || "/";

    if (o.never && o.never.indexOf(path) !== -1) return false;
    if (o.only && o.only.indexOf(path) === -1) return false;
    // Someone who asked their operating system for less motion has already told
    // us not to do this.
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (!o.key) return false;
    try {
      if (sessionStorage.getItem(o.key)) return false;
      sessionStorage.setItem(o.key, "1");
    } catch (e) {
      // Private browsing throws on sessionStorage. A moment we cannot remember
      // showing would replay on every page view, so we do not show it at all.
      return false;
    }

    root.setAttribute(attr, "on");
    window.setTimeout(function () {
      root.removeAttribute(attr);
    }, o.failsafeMs || 4000);
    return true;
  } catch (e) {
    return false;
  }
}
