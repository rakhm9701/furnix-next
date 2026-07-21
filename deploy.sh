#!/bin/sh
set -eu

cd "$(dirname "$0")"

BRANCH="${DEPLOY_BRANCH:-master}"

git fetch origin "$BRANCH"
git checkout -B "$BRANCH" "origin/$BRANCH"
git reset --hard "origin/$BRANCH"

if [ -f .env ] && grep -Eq '147\.93\.103\.154|REACT_APP_API_WS=ws://' .env; then
	echo ".env ichida eski IP yoki ws:// bor. HTTPS uchun API qiymatlarini yangilang."
	echo "REACT_APP_API_URL=https://api.furnix.uz"
	echo "REACT_APP_API_GRAPHQL_URL=https://api.furnix.uz/graphql"
	echo "REACT_APP_API_WS=wss://api.furnix.uz"
	exit 1
fi

cleanup_docker() {
	docker image prune -f || true
	docker builder prune -f || true
}

if docker compose version >/dev/null 2>&1; then
	docker compose up -d --build
	docker compose ps
elif command -v docker-compose >/dev/null 2>&1; then
	docker-compose up -d --build
	docker-compose ps
else
	echo "Docker Compose is not installed"
	exit 1
fi

cleanup_docker
