## Summary

## Production and business impact

- [ ] No production behavior changes
- [ ] Production behavior changes are described above
- [ ] Any public claims, client proof, pricing, turnaround, credentials, locations, or contact changes are verified

## Cortex Quality Enforcement

Run `quality-enforce` locally before requesting review, then paste the resulting JSON here.

```json
{
  "status": "quality_enforced_passed",
  "allowed": true,
  "recorded": true,
  "project": "esteban-media",
  "target_type": "pr",
  "target_id": "PR-<number>",
  "quality_result": {
    "status": "quality_passed"
  }
}
```

## Validation

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] Relevant local/live smoke checks are listed above
- [ ] Obsidian handoff is recorded.
- [ ] No hard stop was bypassed.
