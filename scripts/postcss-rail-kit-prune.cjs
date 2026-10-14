/* eslint-disable @typescript-eslint/no-require-imports -- a CommonJS PostCSS plugin: Next loads PostCSS plugins with require(). */
// PostCSS: drop the rail-kit rules for components this site never renders.
//
// Why: app/globals.css imports the whole vendored kit (vendor/rail-kit/rail.css,
// 93 components, ~315 KB of source) into the one stylesheet every page must
// download before it can paint. The site renders about twenty of them. On a
// phone that dead weight is render-blocking: PageSpeed mobile measured FCP
// 3.2-4.1 s on the service pages on 2026-10-14 with four blocking stylesheets.
//
// How it decides — derived from the source on every build, never a hand list
// (a hand-kept allowlist makes every new section born broken):
//   1. Read every source file the site ships: app/, components/, lib/, content/,
//      config/, public/ scripts and the web-kit vendor folder.
//   2. Follow imports into vendor/rail-kit/ from those files, transitively, and
//      read only the kit modules actually reachable.
//   3. Every `rail-<name>` token found in that text is a component root in use.
//   4. A selector is dropped only when, OUTSIDE any parentheses, it requires a
//      class whose root never appears anywhere in step 3. Such a selector can
//      never match: nothing can put that class in the DOM. Anything inside
//      :not()/:is()/:where()/:has() is left alone (conservative), as are
//      attribute selectors, keyframes and custom properties.
//
// The vendored files are untouched (scripts/sync-rail-kit.mjs --check still
// passes); only the compiled bundle shrinks. RAIL_PRUNE=0 disables it.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const KIT = path.join(ROOT, "vendor", "rail-kit");
const SCAN_DIRS = ["app", "components", "lib", "content", "config", "public", "vendor/web-kit"];
const TEXT_EXT = /\.(?:[cm]?[jt]sx?|json|md|mdx|html|txt)$/;
const SKIP_DIR = new Set(["node_modules", ".next", "__tests__", "__snapshots__"]);
const TOKEN = /rail-[a-z0-9]+/g;

function walk(dir, out) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (SKIP_DIR.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (TEXT_EXT.test(e.name)) out.push(p);
  }
  return out;
}

function kitImports(text, fromFile) {
  const found = [];
  const re = /(?:from|import)\s*\(?\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(text))) {
    const spec = m[1];
    let base = null;
    if (spec === "@/vendor/rail-kit" || spec.startsWith("@/vendor/rail-kit/")) {
      base = path.join(ROOT, spec.slice(2));
    } else if (spec.startsWith(".")) {
      base = path.resolve(path.dirname(fromFile), spec);
    }
    if (!base || !base.startsWith(KIT)) continue;
    for (const cand of [base, `${base}.tsx`, `${base}.ts`, path.join(base, "index.ts"), path.join(base, "index.tsx")]) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
        found.push(cand);
        break;
      }
    }
  }
  return found;
}

function usedRoots() {
  const roots = new Set();
  const seen = new Set();
  const queue = [];
  const read = (file) => {
    if (seen.has(file)) return;
    seen.add(file);
    const text = fs.readFileSync(file, "utf8");
    for (const t of text.match(TOKEN) || []) roots.add(t);
    for (const dep of kitImports(text, file)) queue.push(dep);
  };
  for (const d of SCAN_DIRS) for (const f of walk(path.join(ROOT, d), [])) read(f);
  while (queue.length) read(queue.shift());
  return roots;
}

function stripParens(sel) {
  let depth = 0;
  let out = "";
  for (const ch of sel) {
    if (ch === "(") depth++;
    if (depth === 0) out += ch;
    if (ch === ")") depth = Math.max(0, depth - 1);
  }
  return out;
}

function splitSelectors(selector) {
  const parts = [];
  let depth = 0;
  let cur = "";
  for (const ch of selector) {
    if (ch === "(" || ch === "[") depth++;
    if (ch === ")" || ch === "]") depth--;
    if (ch === "," && depth === 0) {
      parts.push(cur);
      cur = "";
    } else cur += ch;
  }
  parts.push(cur);
  return parts;
}

function canMatch(sel, roots) {
  const bare = stripParens(sel).replace(/\[[^\]]*\]/g, "");
  const re = /\.(rail-[a-z0-9]+)/g;
  let m;
  while ((m = re.exec(bare))) if (!roots.has(m[1])) return false;
  return true;
}

const plugin = () => ({
  postcssPlugin: "rail-kit-prune",
  OnceExit(root) {
    if (process.env.RAIL_PRUNE === "0") return;
    const roots = usedRoots();
    root.walkRules((rule) => {
      if (rule.parent && rule.parent.type === "atrule" && /keyframes$/i.test(rule.parent.name)) return;
      if (!rule.selector.includes(".rail-")) return;
      const keep = splitSelectors(rule.selector).filter((s) => canMatch(s, roots));
      if (keep.length === 0) rule.remove();
      else if (keep.length !== splitSelectors(rule.selector).length) rule.selector = keep.join(",");
    });
    // Remove at-rules (media/supports/layer) the pruning left empty.
    let changed = true;
    while (changed) {
      changed = false;
      root.walkAtRules((at) => {
        if (at.nodes && at.nodes.length === 0 && !/keyframes$/i.test(at.name)) {
          at.remove();
          changed = true;
        }
      });
    }
  },
});
plugin.postcss = true;

module.exports = plugin;
module.exports.usedRoots = usedRoots;
module.exports.canMatch = canMatch;
