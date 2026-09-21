/*!
 * analytics/track.js — the ONE measurement layer for every brand site.
 * Contract: ~/.claude/durable/ANALYTICS_CONTRACT.md
 *
 * Auto-instruments, with no per-component wiring:
 *   page_view, scroll_depth, section_view, cta_click, outbound_click,
 *   contact_click, item_click, share_click, form_start/step/error/submit,
 *   media_play, search, filter_apply, error_shown
 * `lead` and `experiment_exposure` stay explicit: only the app knows a server
 * confirmed the lead, or which variant it rendered.
 *
 * Framework-agnostic. Works as <script src> on a static page and as an import
 * in a Next/React client component. No dependencies.
 */
(function (root, factory) {
  var api = factory();
  root.Analytics = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var CONTRACT = {
    page_view: [], section_view: ["section_id"], scroll_depth: ["percent"],
    page_dwell: ["seconds"],
    cta_click: ["cta_id", "cta_text", "cta_position"],
    outbound_click: ["destination_domain", "link_context"],
    contact_click: ["method"], form_start: ["form_id"],
    form_step: ["form_id", "step"], form_error: ["form_id", "error_code", "field"],
    form_submit: ["form_id"], lead: ["form_id", "lead_type"],
    media_play: ["media_id", "media_type"], search: ["search_term"],
    filter_apply: ["filter_name", "filter_value"],
    item_view: ["item_id", "item_category"], item_click: ["item_id", "list_name"],
    share_click: ["channel"], experiment_exposure: ["experiment_id", "variant"],
    error_shown: ["error_code", "surface"]
  };

  var PII_KEYS = /(^|_)(email|phone|tel|name|address|ssn|dob|password|message|notes?|comment)s?($|_)/i;
  var PII_VALUE = /[\w.+-]+@[\w-]+\.\w{2,}|\+?\d[\d\s().-]{7,}\d/;

  var cfg = {
    brand: "", locale: "", variant: "control",
    pageType: null, debug: false, sink: null,
    // Any <section> counts, not only the ones that happen to carry an id.
    // Measured on adupont 2026-09-19: 152 sections, 9 with an id — keyed on
    // ids alone, section_view would have described 6% of the site.
    sections: "[data-section], section, [role=region], main > article",
    // Events a host page already measures with its own layer. Listing them here
    // keeps exactly one writer per event name: adding this module beside an
    // existing one without it is how a counter gets written twice.
    disable: []
  };
  var started = false;
  var seen = Object.create(null);   // once-per-pageview keys
  var startedForms = Object.create(null);

  /* ---------- helpers ---------- */
  function slug(s) {
    return String(s || "").toLowerCase().trim()
      .replace(/[\s-]+/g, "_").replace(/[^a-z0-9_.:]/g, "").slice(0, 60) || "unknown";
  }
  function text(el) {
    var t = (el.getAttribute && (el.getAttribute("aria-label") || el.getAttribute("title"))) ||
      (el.innerText || el.textContent || "");
    return String(t).replace(/\s+/g, " ").trim().slice(0, 80);
  }
  function closestAttr(el, attr) {
    for (var n = el; n && n.nodeType === 1; n = n.parentElement)
      if (n.hasAttribute && n.hasAttribute(attr)) return n;
    return null;
  }
  // A stable id for a section that was never given one. The first class name is
  // authored, meaningful and survives copy edits ("authority-hero" ->
  // authority_hero); an ordinal index would renumber the whole page the day
  // somebody inserts a section above.
  // CSS-module and utility-hash class names: build-unstable, so useless as an id.
  function isHashed(name) {
    return /__[A-Za-z0-9_-]{5,}__/.test(name) ||      // foo_module__a1b2c3__bar
      /^[a-z]+-[A-Za-z0-9]{5,}$/.test(name) ||        // emotion/styled: css-1ab2c3d
      /_[A-Za-z0-9]{5,}$/.test(name) ||               // next css modules: hero_a1b2c3
      /^[A-Za-z0-9]{8,}$/.test(name) && !/[aeiou]{1}/i.test(name);
  }

  function sectionId(el) {
    if (!el || !el.getAttribute) return "page";
    var explicit = el.getAttribute("data-section") || el.id;
    if (explicit) return slug(explicit);
    var label = el.getAttribute("aria-label") || el.getAttribute("aria-labelledby");
    if (label) return slug(label);
    var cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || "";
    var names = String(cls).trim().split(/\s+/).filter(Boolean);
    for (var i = 0; i < names.length; i++) {
      if (!isHashed(names[i])) return slug(names[i]);
    }
    // A CSS-module class is content-hashed and changes on every build, so a
    // section keyed on one cannot be compared with itself a week later. Caught
    // on flas 2026-09-19: "luxury_module__jtyn0g__heroproto".
    var h = el.querySelector && el.querySelector("h1, h2, h3");
    if (h) return slug((h.textContent || "").slice(0, 40));
    return "section";
  }
  function sectionOf(el) {
    for (var p = el; p && p.nodeType === 1; p = p.parentElement) {
      if (p.hasAttribute && p.hasAttribute("data-section")) return slug(p.getAttribute("data-section"));
      if (p.tagName === "SECTION") return sectionId(p);
    }
    return "page";
  }
  function inferPageType() {
    if (typeof cfg.pageType === "function") return slug(cfg.pageType());
    if (cfg.pageType) return slug(cfg.pageType);
    var el = document.querySelector("[data-page-type]");
    if (el) return slug(el.getAttribute("data-page-type"));
    var p = location.pathname.replace(/\/+$/, "");
    if (!p || p === "") return "home";
    if (/\/(blog|articles?|guias?|guides?)\//.test(p + "/")) return "blog";
    if (/\/(blog|articles?|guias?|guides?)$/.test(p)) return "listing";
    if (/(privacy|terms|legal|aviso|politica)/.test(p)) return "legal";
    if (/(contact|apply|quote|form|contacto|solicitar)/.test(p)) return "form";
    if (/\/(inventory|listings?|shop|products?|inventario)\/[^/]+$/.test(p)) return "listing_detail";
    if (/\/(inventory|listings?|shop|products?|inventario)$/.test(p)) return "listing";
    if (/\/(locations?|areas?|cities|ciudad)/.test(p)) return "location";
    if (p.split("/").filter(Boolean).length === 1) return "service";
    return "other";
  }
  function shared() {
    return {
      brand: cfg.brand || "unknown",
      page_type: inferPageType(),
      locale: cfg.locale || (document.documentElement.lang || "en").slice(0, 5).toLowerCase(),
      variant: typeof cfg.variant === "function" ? slug(cfg.variant()) : slug(cfg.variant || "control")
    };
  }
  function clean(params) {
    var out = {};
    for (var k in params) {
      if (!Object.prototype.hasOwnProperty.call(params, k)) continue;
      var v = params[k];
      if (v === undefined || v === null || v === "") continue;
      if (PII_KEYS.test(k)) continue;
      if (typeof v === "string") {
        if (PII_VALUE.test(v) && k !== "cta_text") continue;
        v = v.slice(0, 120);
      }
      out[k] = v;
    }
    return out;
  }
  // A host page that already emits its own event for an interaction CLAIMS it.
  // Without this, a site whose buttons each fire their own named event gets a
  // second cta_click from the delegated layer for the same click — two events,
  // one interaction. Measured on flas, where 40 legacy names normalise to
  // cta_click.
  var claimedUntil = 0;
  function claim(ms) {
    claimedUntil = Date.now() + (ms || 400);
  }
  function isClaimed() {
    return Date.now() < claimedUntil;
  }

  function once(key) {
    if (seen[key]) return false;
    seen[key] = 1;
    return true;
  }

  /* ---------- the one emit path ---------- */
  function track(event, params) {
    if (cfg.disable && cfg.disable.indexOf(event) !== -1) return;
    if (!CONTRACT[event]) {
      if (cfg.debug) console.warn("[analytics] off-contract event refused:", event);
      return;
    }
    var payload = clean(Object.assign({}, shared(), params || {}));
    var missing = CONTRACT[event].filter(function (p) { return payload[p] === undefined; });
    if (missing.length) {
      if (cfg.debug) console.warn("[analytics]", event, "missing", missing.join(", "));
      missing.forEach(function (p) { payload[p] = "unknown"; });
    }
    if (cfg.debug) console.debug("[analytics]", event, payload);
    if (typeof cfg.sink === "function") { cfg.sink(event, payload); return; }
    if (typeof window.gtag === "function") { window.gtag("event", event, payload); return; }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({ event: event }, payload));
  }

  /* ---------- auto-instrumentation ---------- */
  function pageView() {
    seen = Object.create(null);
    startedForms = Object.create(null);
    track("page_view", { page_path: location.pathname });
    observeSections();
  }

  function onScroll() {
    var h = document.documentElement;
    var view = window.innerHeight || h.clientHeight || 0;
    var max = (h.scrollHeight - view) || 1;
    if (h.scrollHeight <= view + 4) return;   // nothing to scroll: not a 100%
    var pct = Math.min(100, Math.round(((window.scrollY || h.scrollTop || 0) / max) * 100));
    [25, 50, 75, 100].forEach(function (m) {
      if (pct >= m && once("scroll:" + m)) track("scroll_depth", { percent: m });
    });
  }

  var io = null;
  var sectionWatcher = null;
  function attachSections() {
    if (!io) return;
    Array.prototype.forEach.call(document.querySelectorAll(cfg.sections), function (el) {
      if (el.__anObserved) return;
      el.__anObserved = 1;
      io.observe(el);
    });
  }
  function observeSections() {
    if (!("IntersectionObserver" in window)) return;
    // The module is commonly loaded BEFORE the sections exist (a <script> in the
    // head or above the fold, or a React tree that mounts after hydration).
    // Measured 2026-09-19 on a real page: a single querySelectorAll at init time
    // found 0 sections and section_view never fired once.
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", observeSections, { once: true });
      return;
    }
    if (io) io.disconnect();
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        // A section TALLER than the viewport can never reach a 0.4 ratio, so a
        // single threshold silently drops exactly the long sections people
        // actually read. Measured on flas 2026-09-19: 21 sections on the home
        // page, 3 ever fired. Count it as seen when 40% of the SECTION is
        // visible OR it covers half the viewport.
        var view = window.innerHeight || document.documentElement.clientHeight || 1;
        var visible = e.intersectionRect ? e.intersectionRect.height : 0;
        var tall = e.boundingClientRect ? e.boundingClientRect.height : 0;
        var enough = e.intersectionRatio >= 0.4 ||
          (tall > 0 && visible >= Math.min(0.4 * tall, 0.5 * view));
        if (!enough) return;
        var sid = sectionId(e.target);
        // Two sections can resolve to the same name (no id, hashed classes, no
        // heading), and a name-only dedupe key then collapses them into one
        // event. Measured on flas: 21 sections, one section_view. The DOM index
        // keeps them distinct; section_id still carries the meaning.
        var idx = e.target.__anIndex;
        if (idx === undefined) {
          idx = Array.prototype.indexOf.call(document.querySelectorAll(cfg.sections), e.target);
          e.target.__anIndex = idx;
        }
        if (once("section:" + sid + ":" + idx)) {
          track("section_view", { section_id: sid, section_index: idx });
          var item = e.target.getAttribute("data-item-id");
          if (item) track("item_view", {
            item_id: slug(item),
            item_category: slug(e.target.getAttribute("data-item-category") || "unknown")
          });
        }
      });
    }, { threshold: [0, 0.1, 0.25, 0.4, 0.6] });
    Array.prototype.forEach.call(document.querySelectorAll(cfg.sections), function (el) {
      el.__anObserved = 1;
      io.observe(el);
    });
    if (!sectionWatcher && "MutationObserver" in window) {
      sectionWatcher = new MutationObserver(throttle(attachSections, 300));
      sectionWatcher.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  var CONTACT = [
    [/^tel:/i, "phone"], [/^sms:/i, "sms"], [/^mailto:/i, "email"],
    [/wa\.me|whatsapp/i, "whatsapp"], [/calendly|cal\.com|booking|agenda/i, "booking"],
    [/maps\.(google|apple)|goo\.gl\/maps|\/directions/i, "directions"]
  ];

  function onClick(ev) {
    if (isClaimed()) return;
    var t = ev.target;
    if (!t || t.nodeType !== 1) t = t && t.parentElement;
    if (!t) return;
    var el = t.closest("a, button, [role=button], [data-cta], input[type=submit], [data-share]");
    if (!el) return;
    var href = el.getAttribute && (el.getAttribute("href") || el.getAttribute("data-href")) || "";
    var pos = sectionOf(el);
    var label = text(el);

    if (el.hasAttribute && el.hasAttribute("data-share")) {
      track("share_click", { channel: slug(el.getAttribute("data-share") || "copy") });
      return;
    }
    for (var i = 0; i < CONTACT.length; i++) {
      if (CONTACT[i][0].test(href)) {
        track("contact_click", { method: CONTACT[i][1], cta_text: label, cta_position: pos });
        return;
      }
    }
    var item = closestAttr(el, "data-item-id");
    if (item) {
      track("item_click", {
        item_id: slug(item.getAttribute("data-item-id")),
        list_name: slug(item.getAttribute("data-list-name") || pos),
        cta_text: label
      });
      return;
    }
    if (href && /^https?:\/\//i.test(href)) {
      var host = "";
      try { host = new URL(href, location.href).hostname; } catch (e) { host = ""; }
      if (host && host !== location.hostname) {
        track("outbound_click", { destination_domain: host, link_context: pos, cta_text: label });
        return;
      }
    }
    track("cta_click", {
      cta_id: slug(el.getAttribute("data-cta") || el.id || label || el.tagName),
      cta_text: label || "(no label)",
      cta_position: pos,
      destination: href ? String(href).slice(0, 120) : undefined
    });
  }

  function formId(form) {
    return slug(form.getAttribute("data-form-id") || form.id || form.getAttribute("name") || "form");
  }
  function onFocusIn(ev) {
    var f = ev.target && ev.target.closest && ev.target.closest("form");
    if (!f) return;
    var id = formId(f);
    if (startedForms[id]) return;
    startedForms[id] = 1;
    track("form_start", { form_id: id });
  }
  function onSubmit(ev) {
    var f = ev.target;
    if (!f || f.tagName !== "FORM") return;
    var id = formId(f);
    var step = f.getAttribute("data-step");
    if (step) track("form_step", { form_id: id, step: slug(step) });
    track("form_submit", { form_id: id });
  }
  function onInvalid(ev) {
    var el = ev.target;
    var f = el && el.closest && el.closest("form");
    if (!f) return;
    track("form_error", {
      form_id: formId(f),
      field: slug(el.name || el.id || "unknown"),
      error_code: slug((el.validity && firstValidityKey(el.validity)) || "invalid")
    });
  }
  function firstValidityKey(v) {
    for (var k in v) if (k !== "valid" && v[k]) return k;
    return "invalid";
  }
  function onChange(ev) {
    var el = ev.target;
    if (!el || !el.closest) return;
    var f = closestAttr(el, "data-filter");
    if (f || (el.hasAttribute && el.hasAttribute("data-filter"))) {
      var node = f || el;
      track("filter_apply", {
        filter_name: slug(node.getAttribute("data-filter") || el.name || "filter"),
        filter_value: slug(el.value)
      });
    }
  }
  function onSearch(ev) {
    var f = ev.target;
    if (!f || f.tagName !== "FORM") return;
    var input = f.querySelector('input[type=search], [data-search]');
    if (!input) return;
    track("search", { search_term: slug(input.value) });
  }
  function onPlay(ev) {
    var el = ev.target;
    if (!el || (el.tagName !== "VIDEO" && el.tagName !== "AUDIO")) return;
    track("media_play", {
      media_id: slug(el.getAttribute("data-media-id") || el.id || (el.currentSrc || "").split("/").pop()),
      media_type: el.tagName.toLowerCase()
    });
  }
  // Only seconds the tab is actually visible count: a tab left open all
  // afternoon is not a reader.
  var activeSeconds = 0;
  function startDwell() {
    if (typeof window.setInterval !== "function") return;
    window.setInterval(function () {
      if (document.visibilityState && document.visibilityState !== "visible") return;
      activeSeconds += 5;
      [15, 30, 60, 120].forEach(function (mark) {
        if (activeSeconds >= mark && once("dwell:" + mark)) track("page_dwell", { seconds: mark });
      });
    }, 5000);
  }

  function watchErrors() {
    if (!("MutationObserver" in window)) return;
    new MutationObserver(function (muts) {
      muts.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes || [], function (n) {
          if (!n || n.nodeType !== 1) return;
          var e = n.matches && n.matches("[data-error-code], [role=alert]") ? n :
            (n.querySelector && n.querySelector("[data-error-code], [role=alert]"));
          if (!e) return;
          var code = slug(e.getAttribute("data-error-code") || "alert");
          if (once("error:" + code)) track("error_shown", { error_code: code, surface: sectionOf(e) });
        });
      });
    }).observe(document.documentElement, { childList: true, subtree: true });
  }

  function patchHistory() {
    ["pushState", "replaceState"].forEach(function (m) {
      var orig = history[m];
      if (!orig || orig.__an) return;
      var wrapped = function () {
        var r = orig.apply(this, arguments);
        setTimeout(pageView, 0);
        return r;
      };
      wrapped.__an = 1;
      history[m] = wrapped;
    });
    window.addEventListener("popstate", function () { setTimeout(pageView, 0); });
  }

  function init(options) {
    if (typeof document === "undefined") return api;
    Object.assign(cfg, options || {});
    if (!cfg.brand) {
      var s = document.currentScript || document.querySelector("script[data-brand]");
      if (s) {
        cfg.brand = cfg.brand || s.getAttribute("data-brand");
        cfg.locale = cfg.locale || s.getAttribute("data-locale");
      }
    }
    if (started) { pageView(); return api; }
    started = true;
    // Bubble phase on purpose: a host component's own onClick runs first and can
    // claim the interaction, which capture phase would make impossible.
    document.addEventListener("click", onClick, false);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("submit", onSubmit, true);
    document.addEventListener("submit", onSearch, true);
    document.addEventListener("invalid", onInvalid, true);
    document.addEventListener("change", onChange, true);
    document.addEventListener("play", onPlay, true);
    var scrollHandler = throttle(onScroll, 250);
    window.addEventListener("scroll", scrollHandler, { passive: true });
    document.addEventListener("scroll", scrollHandler, { passive: true, capture: true });
    watchErrors();
    startDwell();
    patchHistory();
    pageView();
    return api;
  }

  function throttle(fn, ms) {
    var last = 0, timer = null;
    return function () {
      var now = Date.now();
      if (now - last >= ms) { last = now; fn(); }
      else if (!timer) timer = setTimeout(function () { timer = null; last = Date.now(); fn(); }, ms - (now - last));
    };
  }

  var api = {
    init: init, track: track,
    lead: function (form_id, lead_type, extra) {
      track("lead", Object.assign({ form_id: slug(form_id), lead_type: slug(lead_type) }, extra || {}));
    },
    exposure: function (experiment_id, variant) {
      track("experiment_exposure", { experiment_id: slug(experiment_id), variant: slug(variant) });
    },
    pageView: pageView, claim: claim, CONTRACT: CONTRACT, _cfg: cfg
  };
  if (typeof document !== "undefined") {
    var auto = document.currentScript;
    if (auto && auto.hasAttribute("data-auto")) {
      if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { init(); });
      else init();
    }
  }
  return api;
});
