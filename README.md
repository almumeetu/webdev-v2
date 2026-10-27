# WebDev Software Solutions

Production website built with Next.js, React, Prisma, and PostgreSQL.

## Local development

Install dependencies and start the development server:

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Set `DATABASE_URL` and a `SESSION_SECRET` of at least 32 random bytes in the local environment. The application reads and writes CMS records through PostgreSQL; candidate applications and inquiries are not stored in browser storage.

## Database and admin setup

This repository currently has no committed Prisma migration history. For an existing database, verify its schema before creating a baseline migration. Do not run `prisma db push` against a populated production database. Once a migration is reviewed and the existing database has been baselined, deploy schema changes with:

```bash
pnpm exec prisma migrate deploy
```

Provision the administrator with `ADMIN_EMAIL` and a unique `ADMIN_PASSWORD` between 12 and 128 characters, then run `pnpm exec prisma db seed`. The seeder does not create a sample client or use a default password.

### Recover missing local careers tables

If `/api/careers` returns Prisma `P2021`, inspect the database with
`pnpm exec prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma --script`.
When **both** `public.JobPosting` and `public.JobApplication` are missing from the local development database, apply the targeted repair:

```bash
pnpm exec prisma db execute --schema prisma/schema.prisma --file prisma/repairs/add-careers-tables.sql
```

This transactional, one-time repair adds only the two careers tables and their foreign key. It fails if either table already exists and does not seed job listings. It is not a migration baseline; production still requires the migration process described above.

## Production deployment

The `deploy.sh` script deploys `main` by default (`DEPLOY_BRANCH` can override it), installs the frozen lockfile, generates Prisma Client, builds, and reloads PM2. It does not change the database when a release contains no Prisma schema change or migration. It stops if the schema changes without a migration. Configure `DATABASE_URL` and `SESSION_SECRET` in the server environment first.

`nginx.webdevss.tech.conf` expects a valid Let’s Encrypt certificate for `webdevss.tech` and `www.webdevss.tech` at `/etc/letsencrypt/live/webdevss.tech/`. Obtain the certificate before enabling the HTTPS server block.

Run the PostgreSQL setup script only on the target VPS. It requires a unique `DB_PASSWORD` environment variable and does not contain a default database password.
