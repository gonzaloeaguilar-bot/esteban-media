import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

export default function setup() {
  if (!existsSync("lib/generated/page-dates.json")) {
    execFileSync("node", ["scripts/page-dates.mjs"], { stdio: "inherit" });
  }
}
