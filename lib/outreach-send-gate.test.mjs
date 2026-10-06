import { describe, expect, it } from "vitest";

import { buildPlainOutreachEmail } from "./plain-outreach-email.mjs";
import {
  bodyFingerprint,
  checkBatch,
  checkMessageShape,
  checkSendingDomain,
  countLinks,
  countWords,
} from "./outreach-send-gate.mjs";

const ADDRESS = "1234 Example Ave Ste 100, Miami FL 33130";

function goodMessage(overrides = {}) {
  const m = buildPlainOutreachEmail({
    businessName: "Palm Garden Events",
    angle: "Cada fin de semana el salón termina con material del evento y nadie que arme el resumen",
    detail: "Vi que están en Fort Lauderdale",
    language: "es",
    postalAddress: ADDRESS,
    senderPhone: "786-000-0000",
    portfolioUrl: "https://estebanmorenomedia.com/es/portafolio",
  });
  return { ...m, to: "bookings@palmgardenevents.com", ...overrides };
}

describe("the builder produces something the gate accepts", () => {
  it("passes every shape check when the opt-out is honoured", () => {
    const reasons = checkMessageShape({
      ...goodMessage(),
      postalAddress: ADDRESS,
      optOutHonoured: true,
    });
    expect(reasons).toEqual([]);
  });

  it("never returns an html body", () => {
    expect(goodMessage().html).toBeUndefined();
  });
});

describe("checkMessageShape blocks", () => {
  const base = { ...goodMessage(), postalAddress: ADDRESS, optOutHonoured: true };

  it("an html body", () => {
    expect(checkMessageShape({ ...base, html: "<p>hi</p>" }).join(" ")).toMatch(/html body present/);
  });

  it("an open-tracking artefact", () => {
    expect(
      checkMessageShape({ ...base, text: `${base.text}\nhttps://t.example.com/open.gif` }).join(" "),
    ).toMatch(/tracking artefact|links in the body/);
  });

  it("a missing postal address", () => {
    expect(checkMessageShape({ ...base, postalAddress: "" }).join(" ")).toMatch(/postal address/);
  });

  it("an opt-out nobody processes", () => {
    expect(checkMessageShape({ ...base, optOutHonoured: false }).join(" ")).toMatch(/not being processed/);
  });

  it("a promotional subject", () => {
    expect(checkMessageShape({ ...base, subject: "FREE video offer!!" }).join(" ")).toMatch(/promotional token|all caps/);
  });

  it("a body that is too long", () => {
    const long = `${base.text}\n${"palabra ".repeat(200)}`;
    expect(checkMessageShape({ ...base, text: long }).join(" ")).toMatch(/over the 160-word maximum/);
  });

  it("more than one link", () => {
    const two = base.text.replace("Ejemplos:", "Ejemplos: https://otro.example.com y");
    expect(checkMessageShape({ ...base, text: two }).join(" ")).toMatch(/links in the body/);
  });
});

describe("checkBatch", () => {
  it("catches the same body going to two recipients", () => {
    const a = goodMessage({ to: "a@x.com" });
    const b = { ...a, to: "b@y.com" };
    expect(checkBatch([a, b], { optOutHonoured: true }).join(" ")).toMatch(/share an identical body/);
  });

  it("catches a body already sent before", () => {
    const a = goodMessage();
    const reasons = checkBatch([a], { priorFingerprints: [bodyFingerprint(a.text)] });
    expect(reasons.join(" ")).toMatch(/identical to a message already sent/);
  });

  it("enforces the daily cap", () => {
    const msgs = Array.from({ length: 5 }, (_, i) => goodMessage({ to: `x${i}@y.com`, text: `cuerpo distinto numero ${i} ${goodMessage().text}` }));
    expect(checkBatch(msgs, { dailyCap: 40, alreadySentToday: 38 }).join(" ")).toMatch(/exceed the daily cap/);
  });
});

describe("checkSendingDomain", () => {
  const ok = {
    resolveMx: async () => [{ exchange: "aspmx.l.google.com", priority: 1 }],
    resolveTxt: async (name) =>
      name.startsWith("_dmarc.") ? [["v=DMARC1; p=none; rua=mailto:x@y.com"]] : [["v=spf1 include:_spf.google.com ~all"]],
  };

  it("passes a domain that can send and receive", async () => {
    expect(await checkSendingDomain("example.com", { resolver: ok })).toEqual([]);
  });

  it("blocks a domain with no MX, no SPF and no DMARC", async () => {
    const none = { resolveMx: async () => { throw new Error("ENOTFOUND"); }, resolveTxt: async () => { throw new Error("ENOTFOUND"); } };
    const reasons = await checkSendingDomain("estebanmorenomedia.com", { resolver: none });
    expect(reasons.join(" ")).toMatch(/no MX record/);
    expect(reasons.join(" ")).toMatch(/no SPF record/);
    expect(reasons.join(" ")).toMatch(/no DMARC record/);
  });

  it("blocks a domain that can send but cannot receive the replies it asks for", async () => {
    const noMx = { ...ok, resolveMx: async () => [] };
    expect((await checkSendingDomain("example.com", { resolver: noMx })).join(" ")).toMatch(/replies to this outreach would bounce/);
  });
});

describe("helpers", () => {
  it("counts words and links", () => {
    expect(countWords(" uno dos  tres ")).toBe(3);
    expect(countLinks("a https://x.com b https://y.com")).toBe(2);
  });

  it("fingerprints past punctuation and links", () => {
    expect(bodyFingerprint("Hola, ¿qué tal? https://x.com")).toBe(bodyFingerprint("hola qué tal"));
  });
});

describe("subject length is bounded by construction", () => {
  it("cuts a long legal business name instead of overflowing", () => {
    const { subject } = buildPlainOutreachEmail({
      businessName: "Tropical Paradise Banquet and Conference Center of South Florida",
      postalAddress: ADDRESS,
    });
    expect(subject.length).toBeLessThanOrEqual(60);
    expect(checkMessageShape({ subject, text: goodMessage().text, postalAddress: ADDRESS, optOutHonoured: true })).toEqual([]);
  });

  it("drops a marketing suffix the owner never says out loud", () => {
    const { subject } = buildPlainOutreachEmail({
      businessName: "Brito Marketing | Advertising Agency | Agencia de Publicidad",
      postalAddress: ADDRESS,
    });
    expect(subject).toBe("edición de video para Brito Marketing");
  });
});
