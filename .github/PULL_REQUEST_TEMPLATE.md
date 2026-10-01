## Summary

What changed, in one or two sentences:

## Production and business impact

- [ ] No production behavior changes
- [ ] Production behavior changes are described above
- [ ] Any public claims, client proof, pricing, turnaround, credentials, locations, or contact changes are verified by the business owner or source

If this PR changes public prices, services, locations, proof, credentials, turnaround, or contact details, write the exact approval/source here:

> Owner/source approval:
>
> Example: I, Esteban Moreno, approve the public pricing and Spanish copy in this PR.

## Cortex Quality Enforcement

After the PR is opened and the normal checks pass, the local evidence drain attaches the Cortex JSON here. Esteban does not need to run a local command.

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

- [ ] I ran `pnpm check`, or I am relying on GitHub Actions to run the same validation
- [ ] New public page UI uses Rail/common components, or the missing component was added to the shared library and synced here
- [ ] Service-page changes follow `.ai/service-page-template.md`
- [ ] Relevant local/live smoke checks are listed above
- [ ] No hard stop was bypassed
