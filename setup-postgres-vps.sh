#!/bin/bash
# =============================================================================
# WebDev Software Solutions — PostgreSQL VPS Setup Script
# Run this on your VPS server as root or sudo user
# =============================================================================

set -e

: "${DB_PASSWORD:?Set DB_PASSWORD in the shell to a strong, unique PostgreSQL password before running this script.}"
if [[ ${#DB_PASSWORD} -lt 24 || "$DB_PASSWORD" == *$'\n'* || "$DB_PASSWORD" == *$'\r'* ]]; then
  echo "DB_PASSWORD must be at least 24 characters and must not contain a newline."
  exit 1
fi
SQL_DB_PASSWORD=${DB_PASSWORD//\'/\'\'}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  WebDev SS — PostgreSQL Production Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ── 1. Install PostgreSQL ──────────────────────────────────────────────────────
echo "[1/6] Installing PostgreSQL..."
apt update -y
apt install -y postgresql postgresql-contrib

# ── 2. Start & enable PostgreSQL ──────────────────────────────────────────────
echo "[2/6] Starting PostgreSQL service..."
systemctl start postgresql
systemctl enable postgresql

# ── 3. Create database user and database ──────────────────────────────────────
echo "[3/6] Creating database user and database..."
sudo -u postgres psql <<EOF
-- Create the login only if it does not already exist. Password quoting is escaped above.
SELECT format('CREATE USER webdevss_user WITH LOGIN PASSWORD %L', '${SQL_DB_PASSWORD}')
WHERE NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'webdevss_user')\gexec

-- Create database if not exists
SELECT 'CREATE DATABASE webdevss_db OWNER webdevss_user'
  WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'webdevss_db')\gexec

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE webdevss_db TO webdevss_user;
EOF

echo "[3/6] ✓ Database user 'webdevss_user' and database 'webdevss_db' ready"

# ── 4. Allow local connections ─────────────────────────────────────────────────
echo "[4/6] Configuring pg_hba.conf for local connections..."
PG_VERSION=$(psql --version | grep -oP '\d+' | head -1)
PG_HBA="/etc/postgresql/${PG_VERSION}/main/pg_hba.conf"

# Add rule for webdevss_user if not already there
if ! grep -q "webdevss_user" "$PG_HBA"; then
  echo "host    webdevss_db     webdevss_user   127.0.0.1/32    md5" >> "$PG_HBA"
  echo "host    webdevss_db     webdevss_user   ::1/128         md5" >> "$PG_HBA"
fi

systemctl reload postgresql
echo "[4/6] ✓ pg_hba.conf updated"

# ── 5. Test connection ─────────────────────────────────────────────────────────
echo "[5/6] Testing database connection..."
PGPASSWORD="$DB_PASSWORD" psql \
  -h 127.0.0.1 -U webdevss_user -d webdevss_db -c "SELECT version();" \
  && echo "[5/6] ✓ Connection test PASSED" \
  || echo "[5/6] ✗ Connection test FAILED — check password in pg_hba.conf"

# ── 6. Instructions for running Prisma migrations ─────────────────────────────
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  ✅ PostgreSQL setup complete!"
echo ""
echo "  Next steps — run in your app directory:"
echo ""
echo "  cd /path/to/your/webdev-v2"
echo "  Review and baseline a Prisma migration for this database, then run:"
echo "  pnpm exec prisma migrate deploy"
echo "  Set ADMIN_EMAIL and ADMIN_PASSWORD (12-128 chars) in the app environment before:"
echo "  pnpm exec prisma db seed"
echo ""
echo "  Make sure your .env on VPS has:"
echo "  DATABASE_URL=\"postgresql://webdevss_user:<URL-encoded-password>@localhost:5432/webdevss_db?schema=public\""
echo "  SESSION_SECRET=<at-least-32-random-bytes>"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
