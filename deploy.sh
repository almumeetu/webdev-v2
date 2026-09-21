#!/usr/bin/env bash
# ==============================================================================
# WebDev Software Solutions - Automated Deployment Script
# Target: https://webdevss.tech
# ==============================================================================

set -e

GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}======================================================${NC}"
echo -e "${CYAN}🚀 Deploying WebDev Software Solutions (webdevss.tech)${NC}"
echo -e "${CYAN}======================================================${NC}"

# 1. Pull latest code
echo -e "\n${YELLOW}[1/5] Pulling latest updates from Git...${NC}"
git pull

# 2. Install dependencies
echo -e "\n${YELLOW}[2/5] Installing dependencies via pnpm...${NC}"
pnpm install

# 3. Apply database migrations
echo -e "\n${YELLOW}[3/5] Syncing database schema with Prisma...${NC}"
npx prisma db push

# 4. Build Next.js Production Bundle
echo -e "\n${YELLOW}[4/5] Building Next.js production bundle...${NC}"
pnpm build

# 5. Reload PM2 process
echo -e "\n${YELLOW}[5/5] Reloading application in PM2...${NC}"
if pm2 list | grep -q "webdev-v2"; then
  pm2 reload webdev-v2
  echo -e "${GREEN}✓ PM2 process reloaded with zero downtime.${NC}"
else
  pm2 start pnpm --name "webdev-v2" -- start -- -p 3000
  pm2 save
  echo -e "${GREEN}✓ PM2 process started on port 3000.${NC}"
fi

echo -e "\n${GREEN}======================================================${NC}"
echo -e "${GREEN}✨ Application successfully deployed to https://webdevss.tech${NC}"
echo -e "${GREEN}======================================================${NC}"
