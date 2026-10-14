// Per-page "last modified" dates that are true, for the sitemap and the pages.
//
// Why this exists (2026-10-14): the sitemap carried 0 <lastmod> for 352 URLs and
// no page carried dateModified, and Google Search Console reported 112 sitemap
// URLs not indexed (57 of them "URL is unknown to Google"). A frozen single date
// was removed earlier for being false (see app/sitemap.ts); this replaces it
// with a date per page that moves only when that page's own content moves.
//
// How a date is decided:
//   1. Each sitemap path maps to its OWN sources: the files directly in its
//      route folder (page.tsx and siblings, not nested routes) plus the content
//      block that holds its copy in lib/*.ts (the entry whose `slug:`, `id:`,
//      `path:` or "/path": key names the page). Shared templates are left out
//      on purpose: a refactor of one template would otherwise stamp the same
//      date on 80 pages, which is the defect this file exists to avoid.
//   2. The sources are hashed. config/page-lastmod.json stores {date, hash}
//      per path. When the hash changes, `pnpm lastmod:update` sets the date to
//      today (America/New_York). The test in app/__tests__/page-lastmod.test.ts
//      fails when a page's sources changed but its date did not, so a content
//      edit cannot ship with a stale date.
//   3. A path seen for the first time is seeded from git: the newest commit
//      date that touched its files, or `git blame` over its content block.
//
// No git is needed to CHECK (Vercel builds from a shallow clone); git is only
// read when seeding a new path, which happens on a developer machine.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Content files whose entries carry page copy, keyed by slug/id/path: every
 * lib/*.ts, so a new content file (lib/guide-comparisons.ts, PR #420) is
 * covered without anyone remembering to list it.
 */
export function contentFiles(root) {
  return readdirSync(join(root, "lib"))
    .filter((name) => name.endsWith(".ts") && !name.endsWith(".d.ts") && !name.includes(".test."))
    .sort()
    .map((name) => `lib/${name}`);
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function routeDirs(root, path) {
  const rel = path === "/" ? "" : path.replace(/^\//, "");
  const candidates = [
    join(root, "app", "(english)", rel),
    join(root, "app", "(spanish)", rel),
    join(root, "app", rel),
  ];
  return candidates.filter((dir) => existsSync(join(dir, "page.tsx")));
}

/** Layout and boundary files frame every child route, so they are not one page's content. */
const FRAME_FILES = /^(layout|template|loading|error|not-found|global-error)\.(tsx|ts|jsx|js)$/;

function ownFiles(dir) {
  return readdirSync(dir)
    .filter((name) => !FRAME_FILES.test(name))
    .map((name) => join(dir, name))
    .filter((p) => statSync(p).isFile())
    .sort();
}

/** Content blocks naming this page: [{ file, start, end }] with 1-based inclusive lines. */
export function contentBlocks(root, path) {
  const slug = path.split("/").filter(Boolean).pop();
  if (!slug) return [];
  const anchors = [
    new RegExp(`^(\\s*)(slug|spanishSlug|id): "${escape(slug)}",?\\s*$`),
    new RegExp(`^(\\s*)(path|href|route): "${escape(path)}",?\\s*$`),
    new RegExp(`^(\\s*)"${escape(path)}": `),
  ];
  const blocks = [];
  for (const file of contentFiles(root)) {
    const abs = join(root, file);
    if (!existsSync(abs)) continue;
    const lines = readFileSync(abs, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const re of anchors) {
        const m = line.match(re);
        if (!m) continue;
        const indent = m[1];
        const kind = m[2] ? new RegExp(`^${indent}${m[2]}: "`) : new RegExp(`^${indent}"/`);
        let end = Math.min(lines.length, i + 600);
        for (let j = i + 1; j < Math.min(lines.length, i + 600); j += 1) {
          if (kind.test(lines[j])) {
            end = j;
            break;
          }
          // The entry's own closing brace (shallower than its fields) ends it.
          if (/^\s*[}\]]/.test(lines[j]) && lines[j].search(/\S/) < indent.length) {
            end = j + 1;
            break;
          }
        }
        blocks.push({ file, start: i + 1, end });
        break;
      }
    });
  }
  return blocks;
}

export function pageSources(root, path) {
  const files = routeDirs(root, path).flatMap(ownFiles).map((p) => relative(root, p));
  return { files, blocks: contentBlocks(root, path) };
}

export function hashSources(root, sources) {
  const h = createHash("sha256");
  for (const file of sources.files) {
    h.update(`F ${file}\n`);
    h.update(readFileSync(join(root, file)));
  }
  for (const b of sources.blocks) {
    const lines = readFileSync(join(root, b.file), "utf8").split("\n").slice(b.start - 1, b.end);
    h.update(`B ${b.file}\n`);
    h.update(lines.join("\n"));
  }
  return h.digest("hex").slice(0, 16);
}

/** Newest git date (YYYY-MM-DD) across a page's sources, or undefined without history. */
export function gitSeedDate(root, sources) {
  const dates = [];
  const git = (args) => {
    try {
      return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    } catch {
      return "";
    }
  };
  for (const file of sources.files) {
    const d = git(["log", "-1", "--format=%cs", "--", file]).trim();
    if (d) dates.push(d);
  }
  for (const b of sources.blocks) {
    const out = git(["blame", "--line-porcelain", "-L", `${b.start},${b.end}`, "--", b.file]);
    let newest = 0;
    for (const m of out.matchAll(/^committer-time (\d+)$/gm)) newest = Math.max(newest, Number(m[1]));
    if (newest) dates.push(new Date(newest * 1000).toISOString().slice(0, 10));
  }
  return dates.sort().pop();
}

export function todayNewYork(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(now);
}

export function readLedger(root) {
  const file = join(root, "config", "page-lastmod.json");
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : {};
}
