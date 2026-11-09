#!/usr/bin/env bash
# Purge Altalis-derived data from the repository's history (J.B., 8 Nov 2026).
# Removes every historical version of tool/shore.json that holds the Altalis/EPSB North Saskatchewan River outline (the two blobs below), from every
# branch. The current shore.json (CanVec Alberta, commit f0bf5d2 on site-f1, blob 2908616d...) is kept.
# Also (J.B., 8 Nov 2026 evening): every Edmonton tool screenshot ever committed, listed by path in checks/purge/edm_screenshots_2026-11-08.txt
# (183 under checks/agents/*_shots, public on overnight-2026-10-30; 36 under checks/f1, local site-f1 only). Some show Altalis lot lines.
# EXTRA_LIST=<file> overrides that list; EXTRA_LIST=none skips it. Optional: EXTRA_PATHS (space-separated globs) removes more paths too.
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
EXTRA_LIST="${EXTRA_LIST:-checks/purge/edm_screenshots_2026-11-08.txt}"
if [ "$EXTRA_LIST" != none ]; then test -s "$EXTRA_LIST" || { echo "missing $EXTRA_LIST"; exit 1; }; EXTRA_LIST="$(cd "$(dirname "$EXTRA_LIST")" && pwd)/$(basename "$EXTRA_LIST")"; cp "$EXTRA_LIST" "$(git rev-parse --git-dir)/purge_list.txt"; EXTRA_LIST="$(cd "$(git rev-parse --git-dir)" && pwd)/purge_list.txt"; fi
export BAD EXTRA_PATHS="${EXTRA_PATHS:-}" EXTRA_LIST
git filter-branch -f --prune-empty --index-filter '
  b=$(git ls-files -s tool/shore.json | cut -d" " -f2)
  for x in $BAD; do [ "$b" = "$x" ] && git rm -q --cached --ignore-unmatch tool/shore.json; done
  if [ "$EXTRA_LIST" != none ]; then git rm -q --cached --ignore-unmatch --pathspec-from-file="$EXTRA_LIST"; fi
  if [ -n "$EXTRA_PATHS" ]; then for p in $EXTRA_PATHS; do git rm -q -r --cached --ignore-unmatch -- "$p"; done; fi
  true' -- $BRANCHES
git for-each-ref --format="%(refname)" refs/original/ | xargs -r -n1 git update-ref -d
# check: no purged blob is reachable from the rewritten branches
for x in $BAD; do if git rev-list --objects $BRANCHES | grep -q "^$x"; then echo "STILL REACHABLE: $x"; exit 1; fi; done
if [ "$EXTRA_LIST" != none ]; then left=$(for b in $BRANCHES; do git log --format= --name-only $b; done | sort -u | grep -c -x -F -f "$EXTRA_LIST" || true); test "$left" = 0 || { echo "STILL IN HISTORY: $left listed screenshot paths"; exit 1; }; fi
echo "purge done on: $BRANCHES. Backups (local only): backup/$STAMP-*"
