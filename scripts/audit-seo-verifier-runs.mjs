#!/usr/bin/env node

import { fileURLToPath } from "node:url";

export function summarizeRuns(runs, since, now = new Date()) {
  const completed = runs.filter((run) =>
    run.event === "schedule" &&
    run.status === "completed" &&
    new Date(run.created_at) >= since,
  );
  const failures = completed.filter((run) => run.conclusion !== "success");
  const slow = completed.filter((run) =>
    (new Date(run.updated_at) - new Date(run.run_started_at)) > 10 * 60 * 1000,
  );
  const latest = completed.reduce((value, run) =>
    Math.max(value, new Date(run.created_at).getTime()), 0);
  return {
    completed: completed.length,
    failed: failures.length,
    overTenMinutes: slow.length,
    wastefulFrequency: completed.length > 8,
    stale: latest === 0 || now.getTime() - latest > 48 * 60 * 60 * 1000,
  };
}

async function main() {
  const repository = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  if (!repository || !token) throw new Error("GitHub repository and read token are required");
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const endpoint = `https://api.github.com/repos/${repository}/actions/workflows/seo-production-verify.yml`;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const detailsResponse = await fetch(endpoint, {
    headers,
    signal: AbortSignal.timeout(10_000),
  });
  if (!detailsResponse.ok) throw new Error(`GitHub workflow read returned HTTP ${detailsResponse.status}`);
  const workflow = await detailsResponse.json();
  const response = await fetch(`${endpoint}/runs?per_page=100`, {
    headers: {
      ...headers,
    },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`GitHub Actions audit read returned HTTP ${response.status}`);
  const payload = await response.json();
  const summary = summarizeRuns(payload.workflow_runs || [], since);
  const minimumRuns = Date.now() - new Date(workflow.created_at).getTime() >= 7 * 24 * 60 * 60 * 1000 ? 5 : 1;
  console.log(JSON.stringify({ windowStart: since.toISOString(), ...summary }));
  if (summary.completed < minimumRuns || summary.stale || summary.failed > 0 || summary.overTenMinutes > 0 || summary.wastefulFrequency) {
    throw new Error("Production SEO loop is absent, failing, slow, or running too often");
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((error) => {
    console.error(`SEO loop audit failed: ${error.message}`);
    process.exitCode = 1;
  });
}
