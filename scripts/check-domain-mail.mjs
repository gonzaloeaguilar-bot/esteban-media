#!/usr/bin/env node
/**
 * Can the domain receive email yet?
 *
 * Why this exists: /contact publishes an @gmail.com address because
 * estebanmorenomedia.com has NO MX record — verified 2026-09-29 with
 * `dig +short MX`, `dig @8.8.8.8` and `host -t MX`. Switching the published
 * address to the domain before a mailbox exists would silently drop every email
 * a lead sends, on the one page whose job is lead capture.
 *
 * So the promise "we will use a branded address" needs an outcome sentinel, not
 * a note in a backlog: run this, and it tells you whether the switch is safe.
 *
 * $0, no LLM, no dependency. Deliberately NOT part of `pnpm check`: it makes a
 * live DNS query, and a network call inside the gate makes the gate flaky.
 *
 *   node scripts/check-domain-mail.mjs            # estebanmorenomedia.com
 *   node scripts/check-domain-mail.mjs example.com
 */
import { resolveMx } from "node:dns/promises";

const domain = process.argv[2] || "estebanmorenomedia.com";

try {
  const records = (await resolveMx(domain)).sort((a, b) => a.priority - b.priority);
  if (records.length === 0) throw Object.assign(new Error("empty"), { code: "ENODATA" });
  console.log(`MAIL READY: ${domain} has ${records.length} MX record(s)`);
  for (const r of records) console.log(`  ${String(r.priority).padStart(3)}  ${r.exchange}`);
  console.log("");
  console.log("Next: confirm one real message arrives at the alias, then switch");
  console.log("`site.email` in lib/site.ts and drop the guard in");
  console.log("app/__tests__/contact-channels.test.ts. A resolving MX proves the");
  console.log("domain ACCEPTS mail; it does not prove anybody reads it.");
  process.exit(0);
} catch (error) {
  if (error.code === "ENOTFOUND") {
    // A domain that does not resolve is NOT a domain without a mailbox. Telling
    // someone to add MX records to a domain that is not registered — or that
    // they typed wrong — sends them to configure nothing.
    console.error(`MAIL UNKNOWN: ${domain} does not resolve at all.`);
    console.error("That is a different problem from a missing mailbox: check the");
    console.error("spelling, and that the domain is registered and delegated.");
    process.exit(2);
  }
  if (error.code === "ENODATA") {
    console.error(`MAIL BLOCKED: ${domain} has no MX record, so it cannot receive email.`);
    console.error("");
    console.error("Namecheap holds this domain on its own nameservers");
    console.error("(dns1/dns2.registrar-servers.com), so the free lane is two minutes:");
    console.error("  Domain List -> Manage -> the MAIL SETTINGS dropdown");
    console.error("  -> Email Forwarding, then add an alias pointing at a mailbox");
    console.error("     that is already read.");
    console.error("Namecheap writes the MX records itself. Verified live: its five");
    console.error("forwarders eforward1-5.registrar-servers.com resolve to");
    console.error("162.255.118.51/.52.");
    console.error("");
    console.error("Paid alternative, already in use on haveo.app: Private Email");
    console.error("(mx1/mx2.privateemail.com). That one costs money, so it is a");
    console.error("decision, not a default.");
    process.exit(1);
  }
  console.error(`MAIL UNKNOWN: ${domain} lookup failed: ${error.code || error.message}`);
  console.error("This is not the same as 'no mailbox' — do not act on it.");
  process.exit(2);
}
