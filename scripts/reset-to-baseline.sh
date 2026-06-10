#!/usr/bin/env bash
# Put the repo back exactly at the `baseline` tag, wiping any integration install.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

git reset --hard baseline
git clean -fd
if git remote get-url origin >/dev/null 2>&1; then
  git push --force-with-lease origin main
fi
echo "back at baseline"
