import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const plist = new URL("../launchd/com.esteban-media.geo-intelligence-graph.plist", import.meta.url);

describe("Esteban GEO graph LaunchAgent", () => {
  it("uses the canonical checkout and waits through a normal fleet burst", async () => {
    const source = await readFile(plist, "utf8");
    expect(source).toContain("/Users/gonzalo/code/esteban-media/scripts/esteban-geo-intelligence-graph.mjs");
    expect(source).not.toContain("esteban-geo-release-final");
    expect(source).toContain("FLEET_SLOT_MAX_WAIT_SECONDS</key><string>3600</string>");
    expect(source).toContain("FleetSlotManaged</key><true/>");
  });
});
