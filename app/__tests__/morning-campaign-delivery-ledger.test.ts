import { readFileSync, statSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  appendDeliveryRecord,
  deliveryIdempotencyKey,
  recipientHash,
} from "../../scripts/dispatch-morning-campaign.mjs";

const created: string[] = [];

afterEach(async () => {
  await Promise.all(created.splice(0).map((dir) => rm(dir, { force: true, recursive: true })));
});

describe("morning campaign delivery ledger", () => {
  it("writes append-only provider evidence without recipient PII", async () => {
    const dir = await mkdtemp(join(tmpdir(), "esteban-delivery-ledger-"));
    created.push(dir);
    const ledger = join(dir, "outreach", "ledger.jsonl");

    appendDeliveryRecord({
      observed_at: "2026-08-07T04:00:00.000Z",
      status: "accepted",
      email: "Owner@Example.com",
      provider_id: "email_123",
      response_status: 200,
    }, ledger);

    const text = readFileSync(ledger, "utf8");
    const row = JSON.parse(text.trim());
    expect(row).toMatchObject({
      status: "accepted",
      recipient_sha256: recipientHash("owner@example.com"),
      provider: "resend",
      provider_id: "email_123",
      response_status: 200,
    });
    expect(text).not.toContain("Owner@Example.com");
    expect(statSync(ledger).mode & 0o077).toBe(0);
  });

  it("appends failed attempts as separate evidence rows", async () => {
    const dir = await mkdtemp(join(tmpdir(), "esteban-delivery-ledger-"));
    created.push(dir);
    const ledger = join(dir, "ledger.jsonl");

    appendDeliveryRecord({ status: "failed", email: "one@example.com", response_status: 401 }, ledger);
    appendDeliveryRecord({ status: "failed", email: "two@example.com", error_type: "TypeError" }, ledger);

    expect(readFileSync(ledger, "utf8").trim().split("\n")).toHaveLength(2);
  });

  it("uses a stable recipient-and-day idempotency key", () => {
    expect(deliveryIdempotencyKey("Owner@Example.com", "2026-08-07")).toBe(
      deliveryIdempotencyKey("owner@example.com", "2026-08-07"),
    );
    expect(deliveryIdempotencyKey("owner@example.com", "2026-08-08")).not.toBe(
      deliveryIdempotencyKey("owner@example.com", "2026-08-07"),
    );
  });
});
