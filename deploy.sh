#!/usr/bin/env bash
# Production deployment for webdevss.tech.
set -Eeuo pipefail

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'
DEPLOY_BRANCH="${DEPLOY_BRANCH:-main}"

echo -e "${CYAN}======================================================${NC}"
echo -e "${CYAN}Deploying WebDev Software Solutions from ${DEPLOY_BRANCH}${NC}"
echo -e "${CYAN}======================================================${NC}"

: "${DATABASE_URL:?DATABASE_URL must be configured in the production environment}"
: "${SESSION_SECRET:?SESSION_SECRET must be configured in the production environment}"
if [[ ${#SESSION_SECRET} -lt 32 ]]; then
  echo -e "${RED}Deployment stopped: SESSION_SECRET must be at least 32 bytes.${NC}"
  exit 1
fi

echo -e "\n${YELLOW}[1/5] Updating ${DEPLOY_BRANCH}...${NC}"
git fetch origin "${DEPLOY_BRANCH}"
git checkout "${DEPLOY_BRANCH}"
git pull --ff-only origin "${DEPLOY_BRANCH}"

echo -e "\n${YELLOW}[2/5] Installing locked dependencies...${NC}"
pnpm install --frozen-lockfile

echo -e "\n${YELLOW}[3/5] Generating Prisma client and applying reviewed migrations...${NC}"
pnpm exec prisma generate

if [[ -d prisma/migrations ]] && find prisma/migrations -type f -name 'migration.sql' -print -quit 2>/dev/null | grep -q .; then
  pnpm exec prisma migrate deploy
else
  echo "No migration history is present. Comparing the production schema with Prisma (read-only)..."
  set +e
  pnpm exec prisma migrate diff \
    --from-url "$DATABASE_URL" \
    --to-schema-datamodel prisma/schema.prisma \
    --exit-code
  SCHEMA_DIFF_STATUS=$?
  set -e

  if [[ "$SCHEMA_DIFF_STATUS" == "0" ]]; then
    echo "Production schema matches prisma/schema.prisma; no database write is needed."
  elif [[ "$SCHEMA_DIFF_STATUS" == "2" ]]; then
    echo -e "${RED}Deployment stopped: production schema differs from Prisma and no migration baseline exists.${NC}"
    echo "Review and baseline a migration against the populated database before deploying schema changes."
    exit 1
  else
    echo -e "${RED}Deployment stopped: production schema could not be verified.${NC}"
    exit 1
  fi
fi

echo -e "\n${YELLOW}[4/5] Building production bundle...${NC}"
pnpm build

echo -e "\n${YELLOW}[5/5] Reloading PM2 process...${NC}"
if pm2 list | grep -q 'webdev-v2'; then
  pm2 reload webdev-v2 --update-env
else
  pm2 start pnpm --name 'webdev-v2' -- start -- -p 3000
  pm2 save
fi

echo -e "\n${GREEN}Deployment completed for https://webdevss.tech${NC}"
