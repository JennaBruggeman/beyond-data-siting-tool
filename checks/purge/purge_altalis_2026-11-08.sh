#!/usr/bin/env bash
# Purge Altalis-derived data from the repository's history (J.B., 8 Nov 2026).
# Removes every historical version of tool/shore.json that holds the Altalis/EPSB North Saskatchewan River outline (the two blobs below), from every
# branch. The current shore.json (CanVec Alberta, commit f0bf5d2 on site-f1, blob 2908616d...) is kept.
# Optional: EXTRA_PATHS (space-separated globs) removes more paths from all history in the same pass, e.g. Edmonton screenshots that show lot lines.
# Run from the repository root (Git Bash), on a clean working tree. It rewrites local branches only; pushing is a separate, manual step.
set -euo pipefail
BAD="29c291535d03dc480a9b6e1717a7316ca90da755 7ec4aa42a74f87061e9087cc9e9b511c6dc94e9e"
BRANCHES="${BRANCHES:-main overnight-2026-10-30 site-f1}"
test -z "$(git status --porcelain --untracked-files=no)" || { echo "working tree not clean: commit or stash first"; exit 1; }
git fetch origin
for b in main overnight-2026-10-30; do   # local copies must match GitHub before the rewrite
  if git show-ref -q --verify refs/heads/$b; then test "$(git rev-parse $b)" = "$(git rev-parse origin/$b)" || { echo "$b differs from origin/$b: sync it first"; exit 1; }
  else git branch $b origin/$b; fi
done
STAMP=pre-altalis-purge-2026-11-08
for b in $BRANCHES; do git branch -f backup/$STAMP-$b $b; done   # local backups: never push these
export BAD EXTRA_PATHS="${EXTRA_PATHS:-}"
git filter-branch -f --prune-empty --index-filter '
  b=$(git ls-files -s tool/shore.json | cut -d" " -f2)
  for x in $BAD; do [ "$b" = "$x" ] && git rm -q --cached --ignore-unmatch tool/shore.json; done
  if [ -n "$EXTRA_PATHS" ]; then for p in $EXTRA_PATHS; do git rm -q -r --cached --ignore-unmatch -- "$p"; done; fi
  true' -- $BRANCHES
git for-each-ref --format="%(refname)" refs/original/ | xargs -r -n1 git update-ref -d
# check: no purged blob is reachable from the rewritten branches
for x in $BAD; do if git rev-list --objects $BRANCHES | grep -q "^$x"; then echo "STILL REACHABLE: $x"; exit 1; fi; done
echo "purge done on: $BRANCHES. Backups (local only): backup/$STAMP-*"
