#!/usr/bin/env node
// Verify — or refresh — the vendored rail-kit.
//
//   node scripts/sync-rail-kit.mjs --check   # verify the copy. OFFLINE, no auth.
//   node scripts/sync-rail-kit.mjs           # re-copy from a local rail-kit checkout
//
// rail-kit is VENDORED (committed), not installed, so builds are offline-safe
// and every upstream change arrives as a reviewable diff in this repo's own PR.
// The rail is owned by gonzaloeaguilar-bot/rail-kit — change it THERE, re-run
// this sync, and commit the result. Read that repo's COORDINATION.md first:
// other sites consume the same kit, and a consumer being behind is deliberate.
//
// This site vendors a SUBSET of the kit on purpose (8 files of 47 components).
// The lock's file list is therefore the contract, not a snapshot of upstream:
// a new component upstream is not a missing file here. To adopt one, add it to
// the lock and re-run the sync.
import { readFileSync, writeFileSync, existsSync, readdirSync, copyFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { join } from "node:path";

const LOCK = "rail-kit.lock.json";
const CHECK = process.argv.includes("--check");
const sha256 = (b) => createHash("sha256").update(b).digest("hex");

if (!existsSync(LOCK)) {
  console.error(`rail-kit: missing ${LOCK}`);
  process.exit(1);
}
const lock = JSON.parse(readFileSync(LOCK, "utf8"));

if (CHECK) {
  const onDisk = readdirSync(lock.vendorPath).sort();
  const expected = Object.keys(lock.files).sort();
  if (onDisk.join(",") !== expected.join(",")) {
    console.error(
      `rail-kit: the vendored file list does not match the lock.\n` +
        `  lock  ${expected.join(", ")}\n  disk  ${onDisk.join(", ")}`,
    );
    process.exit(1);
  }
  for (const [name, hash] of Object.entries(lock.files)) {
    const actual = sha256(readFileSync(join(lock.vendorPath, name)));
    if (actual !== hash) {
      console.error(
        `rail-kit: ${name} does not match the pinned kit.\n  lock  ${hash}\n  file  ${actual}\n` +
          `The rail is owned by ${lock.repo}; change it there, re-run the sync, and commit.`,
      );
      process.exit(1);
    }
  }
  console.log(`rail-kit: ${expected.length} files match ${lock.repo}@${lock.ref.slice(0, 12)}`);
  process.exit(0);
}

// ── Refresh ──────────────────────────────────────────────────────────────
// `index.ts` is ours, not upstream's: upstream's exports all 47 components and
// would drag in files this site does not vendor. It is listed in the lock so
// an accidental edit is still caught, and skipped here so a sync never
// clobbers it.
const LOCAL_KIT = process.env.RAIL_KIT_SRC || join(process.env.HOME, "code/rail-kit");
const OURS = new Set(["index.ts"]);

if (!existsSync(join(LOCAL_KIT, "src"))) {
  console.error(
    `rail-kit: no checkout at ${LOCAL_KIT}/src.\n` +
      `Clone ${lock.repo} there, or set RAIL_KIT_SRC to where it lives.`,
  );
  process.exit(1);
}

const ref = execFileSync("git", ["-C", LOCAL_KIT, "rev-parse", "HEAD"], {
  encoding: "utf8",
}).trim();

// La lista sale de `src/` AGUAS ARRIBA, no de las claves del lock.
//
// Leyendo el lock, un sync solo puede traer lo que ya tiene: cada componente
// nuevo del kit se lo salta en silencio, y la marca se queda congelada sin que
// ninguna puerta lo diga. Medido el 20-sep: el kit paso de 51 a 80 componentes
// y este repo recibio CERO, porque su lock nombraba cuatro ficheros.
//
// Es el mismo arreglo que ya llevan flas-v2 y gainsfromgeebs-site.
const upstream = readdirSync(join(LOCAL_KIT, "src")).filter(
  (f) => /\.(tsx?|css)$/.test(f) && !OURS.has(f),
);
const dropped = Object.keys(lock.files).filter(
  (n) => !OURS.has(n) && !upstream.includes(n),
);
if (dropped.length) {
  console.warn(`rail-kit: ya no estan arriba, borra a mano: ${dropped.join(", ")}`);
}

const files = {};
for (const name of [...new Set([...upstream, ...Object.keys(lock.files)])]) {
  const dest = join(lock.vendorPath, name);
  if (!OURS.has(name)) {
    const from = join(LOCAL_KIT, "src", name);
    if (!existsSync(from)) {
      console.error(`rail-kit: ${name} is in the lock but not in ${LOCAL_KIT}/src`);
      process.exit(1);
    }
    copyFileSync(from, dest);
  }
  files[name] = sha256(readFileSync(dest));
}

writeFileSync(LOCK, `${JSON.stringify({ ...lock, ref, files }, null, 2)}\n`);
console.log(
  `rail-kit: synced ${Object.keys(files).length} files from ${LOCAL_KIT} @ ${ref.slice(0, 12)}\n` +
    `Review the diff before committing — this is how upstream changes reach the site.`,
);
