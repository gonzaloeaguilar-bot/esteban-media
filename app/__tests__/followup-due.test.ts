import { describe, expect, it } from "vitest";

import freeze from "@/config/indexable-inventory-freeze.json";
import {
  collectFollowUps,
  dueFollowUps,
  parseIsoDate,
} from "@/scripts/followup-due.mjs";

/**
 * The sentinel for the follow-up dates the freeze rule requires.
 *
 * Measured 2026-09-30: four entries carried a `followUpDate` and NOTHING read
 * them — not a test, not a script, not a loop, here or in portfolio-ops. Four
 * commitments to go back and check whether a page earned its place, with no
 * mechanism that would ever raise its hand on the day. A date in a JSON file that
 * nothing parses is a note to a future human who has no reason to open the file.
 */

describe("follow-up registry", () => {
  it("every registered follow-up has an ISO date and a note", () => {
    const entries = collectFollowUps(freeze);
    expect(entries.length).toBeGreaterThanOrEqual(5);
    for (const entry of entries) {
      expect(parseIsoDate(entry.date), `${entry.at}: ${entry.date}`).not.toBeNull();
      // A date with no note is a reminder that cannot be acted on.
      expect(entry.note, entry.at).not.toBe("(no note recorded)");
      expect(entry.note.length, entry.at).toBeGreaterThan(30);
    }
  });

  it("finds entries wherever they are nested, not just in one known array", () => {
    // A future pass recording follow-ups under another key must not become
    // invisible to the check.
    const found = collectFollowUps({
      a: { b: [{ followUpDate: "2026-01-01", followUp: "x", url: "/one" }] },
      c: { d: { e: { followUpDate: "2026-02-02", followUp: "y" } } },
    });
    expect(found.map((f) => f.date)).toEqual(["2026-01-01", "2026-02-02"]);
    expect(found[0].at).toBe("a.b.0");
    expect(found[1].at).toBe("c.d.e");
  });

  /**
   * The observable contract, not a claim about how it is implemented.
   *
   * This started as "rejects a parseable non-ISO date" with a note about the
   * regex guarding it. A negative control that DELETED the regex left every test
   * green: appending `T00:00:00Z` already makes those inputs an Invalid Date, so
   * the regex is redundant and the assertion could not fail. Nine candidate
   * inputs were checked with and without it and not one behaved differently.
   * Keeping the assertion but dropping the false claim.
   */
  it("returns a date only for an ISO-shaped string", () => {
    expect(parseIsoDate("2026-10-28")?.toISOString().slice(0, 10)).toBe("2026-10-28");
    for (const bad of ["Oct 28 2026", "2026-1-1", "20261028", "2026-13-01", "2026-10-28T12:00:00Z", ""]) {
      expect(parseIsoDate(bad), JSON.stringify(bad)).toBeNull();
    }
    expect(parseIsoDate(undefined as unknown as string)).toBeNull();
  });
});

describe("which follow-ups are due", () => {
  const entries = [
    { at: "a", date: "2026-10-16", note: "n", url: null, kind: null },
    { at: "b", date: "2026-10-28", note: "n", url: null, kind: null },
    { at: "c", date: "2026-12-01", note: "n", url: null, kind: null },
  ];
  const on = (iso: string) => new Date(`${iso}T00:00:00Z`);

  it("reports nothing before the first date", () => {
    expect(dueFollowUps(entries, { asOf: on("2026-09-30") })).toEqual([]);
  });

  it("reports an entry on its own date, and counts the overdue days", () => {
    const due = dueFollowUps(entries, { asOf: on("2026-10-28") });
    expect(due.map((d) => d.date)).toEqual(["2026-10-16", "2026-10-28"]);
    // Most overdue first — that is the one most likely to have been forgotten.
    expect(due[0].daysLate).toBe(12);
    expect(due[1].daysLate).toBe(0);
  });

  it("looks ahead with withinDays, and marks those as not yet late", () => {
    const due = dueFollowUps(entries, { asOf: on("2026-09-30"), withinDays: 30 });
    // Sorted by daysLate descending, which for future entries puts the NEAREST
    // first (-16 before -28). That is the right order — the thing due soonest is
    // the thing to act on — and this test originally asserted the reverse.
    expect(due.map((d) => d.date)).toEqual(["2026-10-16", "2026-10-28"]);
    // Negative daysLate means future. Printing "due today" for a date 16 days
    // out was a real bug in the first version of the reporter.
    expect(due.every((d) => d.daysLate < 0)).toBe(true);
  });
});

describe("the service-depth pilot registered its own follow-up", () => {
  /**
   * The pilot's whole value is the remeasurement. A commit message saying "check
   * in 28 days" is not a mechanism, which is the exact gap this sentinel exists
   * to close — so the pilot is in the registry the sentinel reads.
   */
  it("names the three pilot pages and both outcomes", () => {
    const entry = collectFollowUps(freeze).find((e) => e.kind === "depth-pilot");
    expect(entry, "no depth-pilot follow-up registered").toBeDefined();
    expect(entry!.date).toBe("2026-10-28");
    const urls = entry!.url as string[];
    expect(urls).toHaveLength(3);
    expect(urls.some((u) => u.includes("dental"))).toBe(true);
    expect(urls.some((u) => u.includes("yacht"))).toBe(true);
    expect(urls.some((u) => u.includes("med-spa"))).toBe(true);
    // A follow-up that only describes success cannot falsify anything.
    expect(entry!.note).toMatch(/If all of them stay at zero|retired rather than rewritten/);
  });
});
