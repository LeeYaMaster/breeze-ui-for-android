#!/usr/bin/env bash
set -euo pipefail
REMOTE="${GITHUB_REMOTE:-github}"
BRANCH="${1:-main}"

if ! git remote get-url "$REMOTE" &>/dev/null; then
  git remote add "$REMOTE" https://github.com/LeeYaMaster/breeze-ui-for-android.git
fi

if [[ -n "${GITHUB_TOKEN:-}" ]]; then
  gh auth status &>/dev/null || gh auth login --with-token <<<"$GITHUB_TOKEN"
fi

if ! gh auth status &>/dev/null; then
  echo "GitHub CLI 未登录。请执行: gh auth login" >&2
  echo "或在环境中设置 GITHUB_TOKEN 后重试。" >&2
  exit 1
fi

git push -u "$REMOTE" "$BRANCH"
