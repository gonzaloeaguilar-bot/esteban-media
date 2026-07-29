import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import os from "os";
import path from "path";

import {
  isFabricatedEmail,
  loadSuppressionList,
  isSuppressed,
  screenRecipient,
  sendGateEnabled,
  assertLiveSendAllowed,
  postalAddress,
  complianceFooterHtml,
  complianceFooterText,
  appendComplianceFooterHtml,
  unsubscribeUrl,
  listUnsubscribeHeaders,
  addToSuppressionList,
} from "../../lib/outreach-compliance.mjs";
import { buildDrafts } from "../../scripts/compliant-outreach-dispatcher.mjs";

const ENV_KEYS = ["ESTEBAN_SEND_LIVE", "RESEND_API_KEY", "ESTEBAN_POSTAL_ADDRESS"];
let savedEnv: Record<string, string | undefined>;

beforeEach(() => {
  savedEnv = {};
  for (const k of ENV_KEYS) {
    savedEnv[k] = process.env[k];
    delete process.env[k];
  }
});
afterEach(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
});

describe("fabricated-email rejection (no-fabrication guarantee)", () => {
  it("rejects empty, .example, 555, self-referencing, and malformed addresses", () => {
    expect(isFabricatedEmail("")).toBe(true);
    expect(isFabricatedEmail(null as unknown as string)).toBe(true);
    expect(isFabricatedEmail("info@davieblvdbistro.example")).toBe(true);
    expect(isFabricatedEmail("contact@stateroad7seafood.example")).toBe(true);
    expect(isFabricatedEmail("events@wynwooddining.example")).toBe(true);
    expect(isFabricatedEmail("hello@place555.com")).toBe(true);
    expect(isFabricatedEmail("contact@estebanmorenomedia.com")).toBe(true);
    expect(isFabricatedEmail("not-an-email")).toBe(true);
    expect(isFabricatedEmail("noreply@realsite.com")).toBe(true);
  });

  it("accepts a genuine business email", () => {
    expect(isFabricatedEmail("hola@monserraterestaurante.com")).toBe(false);
    expect(isFabricatedEmail("info@lauderale.com")).toBe(false);
  });
});

describe("suppression list", () => {
  let tmp: string;
  beforeEach(() => {
    tmp = path.join(os.tmpdir(), `supp-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  });
  afterEach(() => {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  });

  it("returns empty lists when the file is absent", () => {
    const list = loadSuppressionList(tmp);
    expect(list).toEqual({ unsubscribed: [], bounced: [] });
  });

  it("skips unsubscribed and bounced addresses (case-insensitive)", () => {
    fs.writeFileSync(
      tmp,
      JSON.stringify({ unsubscribed: ["Opt@Out.com"], bounced: ["dead@bounce.com"] }),
    );
    const list = loadSuppressionList(tmp);
    expect(isSuppressed("opt@out.com", list)).toBe(true);
    expect(isSuppressed("DEAD@BOUNCE.COM", list)).toBe(true);
    expect(isSuppressed("fresh@lead.com", list)).toBe(false);
  });

  it("fails CLOSED (suppresses everyone) when the file is corrupt", () => {
    fs.writeFileSync(tmp, "{ not json");
    const list = loadSuppressionList(tmp);
    expect(list).toBeNull();
    expect(isSuppressed("anyone@site.com", list)).toBe(true);
  });

  it("addToSuppressionList records an opt-out idempotently", () => {
    expect(addToSuppressionList("x@y.com", "unsubscribed", tmp)).toBe(true);
    addToSuppressionList("x@y.com", "unsubscribed", tmp);
    const list = loadSuppressionList(tmp);
    expect(list?.unsubscribed.filter((e: string) => e === "x@y.com").length).toBe(1);
  });

  it("screenRecipient checks suppression before allowing a send", () => {
    const list = { unsubscribed: ["opted@out.com"], bounced: [] };
    expect(screenRecipient("opted@out.com", list)).toEqual({ ok: false, reason: "suppressed" });
    expect(screenRecipient("info@place.example", list)).toEqual({
      ok: false,
      reason: "fabricated_or_invalid_email",
    });
    expect(screenRecipient("real@lead.com", list)).toEqual({ ok: true, reason: "ok" });
  });
});

describe("CAN-SPAM compliance footer", () => {
  it("includes a working unsubscribe link and the physical postal address", () => {
    process.env.ESTEBAN_POSTAL_ADDRESS = "PO Box 1234, Fort Lauderdale, FL 33301";
    const html = complianceFooterHtml("lead@site.com", { language: "es" });
    expect(html).toContain("PO Box 1234, Fort Lauderdale, FL 33301");
    expect(html).toContain("/unsubscribe?email=lead%40site.com");
    expect(html.toLowerCase()).toContain("cancelar suscripci");

    const text = complianceFooterText("lead@site.com", { language: "en" });
    expect(text).toContain("PO Box 1234, Fort Lauderdale, FL 33301");
    expect(text).toContain("/unsubscribe?email=lead%40site.com");
    expect(text.toLowerCase()).toContain("unsubscribe");
  });

  it("shows a clear pending placeholder when no postal address is configured", () => {
    const html = complianceFooterHtml("lead@site.com", { language: "en" });
    expect(html).toContain("Postal address pending");
    expect(postalAddress()).toBeNull();
  });

  it("appendComplianceFooterHtml injects the footer before </body>", () => {
    process.env.ESTEBAN_POSTAL_ADDRESS = "PO Box 9, FL";
    const out = appendComplianceFooterHtml("<body><p>hi</p></body>", "a@b.com", { language: "en" });
    expect(out).toContain("PO Box 9, FL");
    expect(out.indexOf("PO Box 9, FL")).toBeLessThan(out.indexOf("</body>"));
  });

  it("emits RFC 8058 one-click unsubscribe headers", () => {
    const h = listUnsubscribeHeaders("a@b.com");
    expect(h["List-Unsubscribe"]).toContain("mailto:unsubscribe@estebanmorenomedia.com");
    expect(h["List-Unsubscribe"]).toContain(unsubscribeUrl("a@b.com"));
    expect(h["List-Unsubscribe-Post"]).toBe("List-Unsubscribe=One-Click");
  });
});

describe("send gate (OFF by default)", () => {
  it("is disabled unless BOTH ESTEBAN_SEND_LIVE=1 and RESEND_API_KEY are set", () => {
    expect(sendGateEnabled()).toBe(false);
    process.env.ESTEBAN_SEND_LIVE = "1";
    expect(sendGateEnabled()).toBe(false); // still no key
    process.env.RESEND_API_KEY = "re_test_key";
    expect(sendGateEnabled()).toBe(true);
    process.env.ESTEBAN_SEND_LIVE = "0";
    expect(sendGateEnabled()).toBe(false);
  });

  it("assertLiveSendAllowed throws without the flag, without the key, and without a postal address", () => {
    expect(() => assertLiveSendAllowed()).toThrow(/ESTEBAN_SEND_LIVE/);

    process.env.ESTEBAN_SEND_LIVE = "1";
    expect(() => assertLiveSendAllowed()).toThrow(/RESEND_API_KEY/);

    process.env.RESEND_API_KEY = "re_test_key";
    expect(() => assertLiveSendAllowed()).toThrow(/ESTEBAN_POSTAL_ADDRESS/);

    process.env.ESTEBAN_POSTAL_ADDRESS = "PO Box 1, FL";
    expect(() => assertLiveSendAllowed()).not.toThrow();
  });
});

describe("buildDrafts drops fabricated recipients (dispatcher no-fabrication)", () => {
  const prospects = [
    { id: "R1", name: "Real Cafe", city: "Hollywood", language: "es", igHandle: "@realcafe", website: "https://realcafe.test" },
    { id: "R2", name: "Example Bistro", city: "FTL", language: "en", igHandle: "", website: "https://example-bistro.test" },
    { id: "R3", name: "Five Fives", city: "FTL", language: "en", igHandle: "", website: "https://fivefives.test" },
    { id: "R4", name: "No Site", city: "FTL", language: "en", igHandle: "@nosite", website: "" },
  ];

  const socialHandles = { instagram: null, facebook: null, linkedin: null };
  const harvestFn = async (url: string) => {
    if (url.includes("realcafe")) return { emails: ["hola@realcafe.test"], socialHandles };
    if (url.includes("example-bistro")) return { emails: ["info@place.example"], socialHandles };
    if (url.includes("fivefives")) return { emails: ["events@555place.test"], socialHandles };
    return { emails: [], socialHandles };
  };

  it("only produces drafts for prospects with a real harvested email", async () => {
    const { drafts, skipped } = await buildDrafts({
      prospects,
      suppressionList: { unsubscribed: [], bounced: [] },
      harvestFn,
    });
    expect(drafts.map((d) => d.id)).toEqual(["R1"]);
    expect(drafts[0].to).toBe("hola@realcafe.test");
    const skippedIds = skipped.map((s) => s.id).sort();
    expect(skippedIds).toEqual(["R2", "R3", "R4"]);
    expect(skipped.every((s) => s.reason === "fabricated_or_invalid_email")).toBe(true);
  });

  it("skips a suppressed address even when the email is real", async () => {
    const { drafts, skipped } = await buildDrafts({
      prospects: [prospects[0]],
      suppressionList: { unsubscribed: ["hola@realcafe.test"], bounced: [] },
      harvestFn,
    });
    expect(drafts.length).toBe(0);
    expect(skipped[0].reason).toBe("suppressed");
  });
});
