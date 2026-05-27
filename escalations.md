# Escalations — esteban-media

## 2026-05-27 — P1 About page halted: missing scaffold on branch

**Task:** `p1-about-esteban` — Build About Esteban page at `app/about/page.tsx`.

**Branch:** `claude/2026-05-27-p1-build-about-esteban-page-ap`.

**Why halted:** Per the task's explicit precondition:

> Scaffold (Next 15 App Router + Tailwind v4 + shadcn) must exist on this branch — context-snapshot claims it does (Next 15.5.18, 3 routes built). If branch is fresh from main and lacks scaffold, halt and write to escalations.md.

This branch was cut fresh from `main` (HEAD = `fcbc54d feat: add autonomy.md`). It has no `app/`, no `package.json`, no `next.config.ts`, no `components/`. Nothing to build an About page on top of.

**Why context-snapshot misled:** `context-snapshot.md` was generated against a different branch state (claims `Branch: claude/2026-05-25-p1-build-individual-service-pa` with 5 commits, "Scaffold: exists", "Routes built: 3"). The generator (`scripts/build-context.sh`) is not branch-aware for the current dispatch.

**Where the scaffold actually lives:** Today's P0 branch `claude/2026-05-27-p0-build-homepage-with-hero-se` (HEAD = `d3161ca`) has the full stack:
- `5de4d8d feat(scaffold): Next.js 15 + TS strict + Tailwind v4 + shadcn/ui (P0)`
- `293c47a feat(home): cinematic hero, 5-service strip, about teaser, contact CTA (P0)`
- `a87b239 feat(services): overview page + dynamic [slug] route + site header (P0)`
- `d3161ca feat(home): respect prefers-reduced-motion in hero video (P0)`

None of this has landed on `main`. Every prior dated branch (e.g. `claude/2026-05-20-p1-build-about-esteban-page-ap`) shows the same pattern: scaffold + all prior P0/P1 work is rebuilt within that branch's commit history, but never merged to `main`. The orchestrator appears to be stuck in a fork loop — work ships per-branch and gets abandoned.

**Fixes the orchestrator should make (pick one):**
1. **Merge approved work back to `main` after each overnight run** so subsequent branches inherit a real base. This is the root fix.
2. **Branch new P1/P2 tasks off the latest scaffolded branch** (e.g. today's P0 branch) instead of off `main`, until #1 is in place.
3. **Make `scripts/build-context.sh` branch-aware** — refuse to claim "Scaffold: exists" unless `app/` and `package.json` are present in the working tree of the branch the agent will actually run on. The current snapshot lies and breaks preconditions.

**What I did not do (and why):**
- Did NOT cherry-pick / merge the P0 scaffold branch into this one. The precondition says halt, not improvise. Auto-pulling another in-flight branch could collide with parallel work, hide a real orchestrator bug, and let the same fork loop persist undetected.
- Did NOT rebuild the scaffold from scratch on this branch. Would duplicate work already shipped on the P0 branch and create a third forked scaffold history.
- Did NOT touch `backlog.md`. Task is not done.

**To unblock:** rebase this branch onto `claude/2026-05-27-p0-build-homepage-with-hero-se` (or merge that branch into `main` first, then re-cut this one), then redispatch the P1 About task. The acceptance criteria in the plan are clean and the implementation is ~30 min once the scaffold is present.
