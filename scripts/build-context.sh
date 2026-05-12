#!/usr/bin/env bash
# Cortex pre-flight: writes context-snapshot.md before the planner reads backlog.
# This is the autonomy-stress-test project — full speed ahead, no real users yet.
set -euo pipefail
cd "$(dirname "$0")/.."

OUT="context-snapshot.md"
TS=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
COMMIT_COUNT=$(git rev-list --count HEAD 2>/dev/null || echo 0)
RECENT_COMMITS=$(git log --since="48 hours ago" --oneline 2>/dev/null | head -10 || true)

# Build status — does the scaffold exist yet?
if [ -f package.json ]; then
  SCAFFOLD="exists"
  NEXT_VERSION=$(node -p "require('./package.json').dependencies.next || 'not-installed'" 2>/dev/null || echo "unknown")
  ROUTES=$(find app -maxdepth 3 -name "page.tsx" 2>/dev/null | wc -l | tr -d ' ')
else
  SCAFFOLD="not-yet — first night still"
  NEXT_VERSION="n/a"
  ROUTES=0
fi

if [ -f backlog.md ]; then
  P0=$(grep -c '^- \[ \] `P0`' backlog.md 2>/dev/null || echo 0)
  P1=$(grep -c '^- \[ \] `P1`' backlog.md 2>/dev/null || echo 0)
  P2=$(grep -c '^- \[ \] `P2`' backlog.md 2>/dev/null || echo 0)
  DONE=$(grep -c '^- \[x\] `P[0-2]`' backlog.md 2>/dev/null || echo 0)
else
  P0=0; P1=0; P2=0; DONE=0
fi

cat > "$OUT" <<EOF
---
project: esteban-media
generated: $TS
data_age_minutes: 0
generator: scripts/build-context.sh
---

## STATUS
- Branch: $BRANCH (total commits: $COMMIT_COUNT)
- Scaffold: $SCAFFOLD
- Next.js version: $NEXT_VERSION
- Routes built: $ROUTES
- Backlog: P0=$P0 P1=$P1 P2=$P2 (done so far: $DONE)

## RECENT COMMITS (last 48h)
${RECENT_COMMITS:-  (none — fresh project)}

## PLANNER DIRECTIVE

This is the **autonomy stress test**. No real users yet. Domain TBD. Cost of a bad ship ≈ \$0.

**Auto-mergeable:** Everything except major dep bumps, DNS/domain config, deploy target switches, and paid-service additions. See CLAUDE.md for the full policy.

**Focus order:**
1. P0 first (scaffold → homepage → services overview). Don't jump to P1 until P0 is fully closed.
2. Test \`pnpm dev\` boots clean before marking any P0 done.
3. Use placeholders for missing assets/copy — never AI-generate photos or video.
4. Bilingual ES copy: structure scaffolding only, leave \`<!-- TRANSLATION REVIEW NEEDED -->\` markers for Gonzalo.

**Esteban's services (don't drift):** aerial/drone, photography (portraits/events/commercial/lifestyle), videography, video editing, photo editing. Positioning is "visual storyteller" — drone is one tool, not the whole brand.
EOF

echo "Built $OUT ($(wc -c < "$OUT") bytes)"
