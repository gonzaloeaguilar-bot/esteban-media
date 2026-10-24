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

/**
 * The block from the first line matching `start` to the first later line
 * matching `end` (inclusive), or undefined when `start` is absent.
 */
export function blockBetween(root, file, start, end) {
  const abs = join(root, file);
  if (!existsSync(abs)) return undefined;
  const lines = readFileSync(abs, "utf8").split("\n");
  const i = lines.findIndex((line) => start.test(line));
  if (i < 0) return undefined;
  const j = lines.findIndex((line, k) => k > i && end.test(line));
  return { file, start: i + 1, end: j < 0 ? lines.length : j + 1 };
}

/**
 * Declared sources (overnight loop row 28, 2026-10-14). Some pages take their
 * copy from a content file by a key that is not their URL slug: an event page
 * renders <EventContentPage id="flibs">, the study pages read
 * restaurantIgStudyCopy.en/.es. contentBlocks() cannot see those, so a copy
 * edit in lib/event-content.ts left the Boat Show page dated October 11.
 * Each rule says which pages use a content file (by what their own route files
 * import) and which blocks of it are theirs. The test fails when a page
 * matches `uses` but resolves no block, so a renamed key cannot silently drop
 * a page back to an undated source set.
 */
const EVENT_BUILDERS_FILE = "lib/event-content.ts";
function eventBuilderName(root, id) {
  const abs = join(root, EVENT_BUILDERS_FILE);
  if (!existsSync(abs)) return undefined;
  const map = readFileSync(abs, "utf8").match(/const BUILDERS[^=]*= \{([\s\S]*?)\n\};/);
  if (!map) return undefined;
  for (const entry of map[1].split(",").map((e) => e.trim()).filter(Boolean)) {
    const [key, value] = entry.split(":").map((x) => x.trim().replace(/^"|"$/g, ""));
    if (key === id) return value ?? key;
  }
  return undefined;
}

export const DECLARED_SOURCES = [
  {
    name: "event page copy (lib/event-content.ts + lib/events.ts)",
    contentFile: EVENT_BUILDERS_FILE,
    uses: /<EventContentPage\b/,
    blocks(root, text) {
      const id = text.match(/<EventContentPage[^>]*\bid="([^"]+)"/)?.[1];
      if (!id) return [];
      const builder = eventBuilderName(root, id);
      return [
        builder && blockBetween(root, EVENT_BUILDERS_FILE, new RegExp(`^const ${escape(builder)}: EventCopyBuilder`), /^\}\);$/),
        // Copy every event page shows: the price section, the dates sentence, shared FAQs.
        blockBetween(root, EVENT_BUILDERS_FILE, /^const FROM = /, /^type EventCopyBuilder/),
        blockBetween(root, "lib/events.ts", new RegExp(`^\\s+id: "${escape(id)}",`), /^ {2}\},?$/),
      ].filter(Boolean);
    },
  },
  {
    name: "events hub copy (EVENTS_HUB_COPY)",
    contentFile: EVENT_BUILDERS_FILE,
    uses: /<EventsHubPage\b/,
    blocks(root) {
      return [blockBetween(root, EVENT_BUILDERS_FILE, /^export const EVENTS_HUB_COPY = /, /^\} as const;$/)].filter(Boolean);
    },
  },
  {
    name: "restaurant Instagram study copy (lib/restaurant-ig-study.ts)",
    contentFile: "lib/restaurant-ig-study.ts",
    uses: /<RestaurantIgStudyPage\b/,
    files: ["data/studies/miami-restaurant-instagram-2026.json"],
    blocks(root, text) {
      const locale = text.match(/<RestaurantIgStudyPage[^>]*\blocale="(en|es)"/)?.[1];
      if (!locale) return [];
      return [
        blockBetween(root, "lib/restaurant-ig-study.ts", new RegExp(`^const ${locale}: StudyCopy = \\{`), /^\};$/),
        // Numbers derived from the data file that both locales print.
        blockBetween(root, "lib/restaurant-ig-study.ts", /^const s = study;/, /^export type StudySection/),
      ].filter(Boolean);
    },
  },
  {
    // Portfolio watch pages (overnight loop row 70): the title, summary and
    // credits come from messages/<locale>.json Portfolio.items.<id>, keyed by
    // the dynamic [id] segment, so contentBlocks() never saw them.
    name: "portfolio watch copy (messages/<locale>.json Portfolio.items)",
    contentFile: "messages/en.json",
    // A dynamic [id] route has no static route folder, so the rule matches by path.
    paths: /^\/(portfolio|es\/portafolio)\/[^/]+$/,
    uses: /<PortfolioWatchPage\b/,
    blocks(root, text, path) {
      const locale = path?.startsWith("/es/") ? "es" : "en";
      const id = path?.split("/").filter(Boolean).pop();
      if (!id) return [];
      return [
        blockBetween(root, `messages/${locale}.json`, new RegExp(`^ {6}"${escape(id)}": \\{`), /^ {6}\},?$/),
      ].filter(Boolean);
    },
  },
];

/** The declared rules a page's own route files match, with what each resolved. */
export function declaredSources(root, files, path) {
  const text = files.map((f) => readFileSync(join(root, f), "utf8")).join("\n");
  return DECLARED_SOURCES.filter((rule) => rule.uses.test(text) || Boolean(path && rule.paths?.test(path))).map((rule) => ({
    rule,
    files: (rule.files ?? []).filter((f) => existsSync(join(root, f))),
    blocks: rule.blocks(root, text, path),
  }));
}

export function pageSources(root, path) {
  const files = routeDirs(root, path).flatMap(ownFiles).map((p) => relative(root, p));
  const declared = declaredSources(root, files, path);
  return {
    files: [...files, ...declared.flatMap((d) => d.files)],
    blocks: [...contentBlocks(root, path), ...declared.flatMap((d) => d.blocks)],
  };
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
