# Native hero autoplay repair — 2026-10-23

## Scope

The owner reported that the homepage hero did not begin playing automatically. Preserve the supplied on-location clip, poster, copy, actions, and reduced-motion still fallback. Add native muted inline autoplay to the existing video element so compatible normal-motion browsers can begin playback without waiting for client JavaScript or an IntersectionObserver callback.

## Acceptance

- The video remains muted, inline, looped, and decorative.
- Normal-motion browser markup includes `autoplay`, and playback begins without interaction.
- `prefers-reduced-motion: reduce` still renders only the meaningful poster.
- The server-rendered title and both actions remain unchanged.
- Phone and desktop hero visuals remain readable; lint, typecheck, tests, build, and live post-deploy playback checks pass.


PREVIOUS ATTEMPT FAILED AT THE ACCEPTANCE CHECK. Run this check FIRST, read the failure, fix it, then re-run it before reporting done:
{"boundary": "context_packet", "evidence": "shared context packet could not be built; exit=1; stderr=Traceback (most recent call last):\n  File \"/Users/gonzalo/.claude/durable/cto-context-packet.py\", line 129, in <module>\n    raise SystemExit(main())\n                     ~~~~^^\n  File \"/Users/gonzalo/.claude/durable/cto-context-packet.py\", line 108, in main\n    \"experience_direction\": experience_context(decision, args.project),\n                            ~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/Users/gonzalo/.claude/durable/cto_experience_contract.py\", line 155, in context\n    raise ValueError('cto-web-lead requires <spec-path>.experience.json; use phase plan to frame work first')\nValueError: cto-web-lead requires <spec-path>.experience.json; use phase plan to frame work first; diagnostic=/Users/gonzalo/.claude/state/cto-decisions/20261023T030955Z-cto-web-lead-esteban-media-1792724996843946000-36823-5e8222434b808c17.context.stderr.log"}


PREVIOUS ATTEMPT FAILED AT THE ACCEPTANCE CHECK. Run this check FIRST, read the failure, fix it, then re-run it before reporting done:
{"boundary": "context_packet", "evidence": "shared context packet could not be built; exit=1; stderr=Traceback (most recent call last):\n  File \"/Users/gonzalo/.claude/durable/cto-context-packet.py\", line 129, in <module>\n    raise SystemExit(main())\n                     ~~~~^^\n  File \"/Users/gonzalo/.claude/durable/cto-context-packet.py\", line 108, in main\n    \"experience_direction\": experience_context(decision, args.project),\n                            ~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/Users/gonzalo/.claude/durable/cto_experience_contract.py\", line 149, in context\n    result['visual_evidence'] = bind_visual_evidence(\n                                ~~~~~~~~~~~~~~~~~~~~^\n        doc, Path(spec_path), shared / 'gonzalo-design-taste.md',\n        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n        Path(str(decision.get('cwd') or Path(spec_path).parent)))\n        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n  File \"/Users/gonzalo/.claude/durable/cto_visual_evidence.py\", line 121, in bind\n    raise ValueError('spec changed after visual brief; reframe the handoff before dispatch')\nValueError: spec changed after visual brief; reframe the handoff before dispatch; diagnostic=/Users/gonzalo/.claude/state/cto-decisions/20261023T031008Z-cto-web-lead-esteban-media-1792725009379922000-37379-5d31a1b30091af19.context.stderr.log"}
