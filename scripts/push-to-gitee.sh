#!/usr/bin/env bash
set -euo pipefail
REMOTE="${GITEE_REMOTE:-gitee}"
BRANCH="${1:-main}"
URL="${GITEE_URL:-https://gitee.com/leeyamaster/breeze-ui-for-android.git}"

if ! git remote get-url "$REMOTE" &>/dev/null; then
  git remote add "$REMOTE" "$URL"
fi

if [[ -z "${GITEE_TOKEN:-}" && -z "${GITEE_USERNAME:-}" ]]; then
  echo "未配置 Gitee 凭据（GITEE_TOKEN 或 GITEE_USERNAME/GITEE_PASSWORD）。跳过推送。" >&2
  echo "协调器可从 GitHub 镜像到 Gitee。" >&2
  exit 1
fi

if [[ -n "${GITEE_TOKEN:-}" ]]; then
  git push "https://oauth2:${GITEE_TOKEN}@gitee.com/leeyamaster/breeze-ui-for-android.git" "$BRANCH"
else
  git push -u "$REMOTE" "$BRANCH"
fi
