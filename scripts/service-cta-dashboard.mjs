#!/usr/bin/env node

import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const outPath = process.argv.find((arg) => arg.startsWith("--out="))?.slice(6)
  || ".ai/service-cta-dashboard-2026-10-01.md";

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (
      entry.name === "node_modules" ||
      entry.name === ".next" ||
      entry.name === ".git" ||
      entry.name === ".ai" ||
      entry.name === "__tests__"
    ) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.isFile() && /\.(tsx|ts|js|mjs)$/.test(entry.name)) yield path;
  }
}

function extractCtas(file, text) {
  const literal = [...text.matchAll(/data-cta=["']([^"']+)["']/g)].map((match) => match[1]);
  const serviceTemplates = [...text.matchAll(/data-cta=\{`service_\$\{service\.serviceId\}_([^`]+)`\}/g)]
    .map((match) => `service_{serviceId}_${match[1]}`);
  return [...literal, ...serviceTemplates]
    .filter((cta) => !cta.includes("[") && !cta.includes("$"))
    .map((cta) => ({
    cta,
    file: relative(root, file),
  }));
}

const rows = [];
const serviceIds = new Set();
for await (const file of walk(root)) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/serviceId:\s*"([^"]+)"/g)) serviceIds.add(match[1]);
  rows.push(...extractCtas(file, text));
}

const templates = rows.filter((row) => row.cta.includes("{serviceId}"));
for (const template of templates) {
  for (const serviceId of serviceIds) {
    rows.push({
      cta: template.cta.replace("{serviceId}", serviceId),
      file: template.file,
    });
  }
}

const unique = [...new Map(rows.map((row) => [`${row.cta}\0${row.file}`, row])).values()]
  .filter((row) => !row.cta.includes("{serviceId}"))
  .sort((a, b) => a.cta.localeCompare(b.cta) || a.file.localeCompare(b.file));

const serviceRows = unique.filter((row) => row.cta.startsWith("service_"));
const contactRows = unique.filter((row) =>
  /(_whatsapp|_email|_phone)$/.test(row.cta) || row.cta.includes("contact"),
);

const markdown = [
  "# Service CTA dashboard",
  "",
  "Generated: 2026-10-01",
  "",
  "This is the zero-cost source inventory for quote, call, email, WhatsApp, and proof actions. The site analytics layer records `data-cta` clicks and link-based contact events; this file names the IDs to watch in GA4 or any exported report.",
  "",
  `- Total CTA IDs found: ${unique.length}`,
  `- Service quote CTA IDs found: ${serviceRows.length}`,
  `- Contact-like CTA IDs found: ${contactRows.length}`,
  "",
  "## Service quote actions",
  "",
  "| CTA ID | Source file |",
  "|---|---|",
  ...serviceRows.map((row) => `| \`${row.cta}\` | \`${row.file}\` |`),
  "",
  "## Contact and resource actions",
  "",
  "| CTA ID | Source file |",
  "|---|---|",
  ...contactRows.map((row) => `| \`${row.cta}\` | \`${row.file}\` |`),
  "",
].join("\n");

await mkdir(dirname(join(root, outPath)), { recursive: true });
await writeFile(join(root, outPath), markdown);
console.log(`wrote ${outPath}`);
console.log(`service_ctas=${serviceRows.length}`);
console.log(`contact_like_ctas=${contactRows.length}`);
