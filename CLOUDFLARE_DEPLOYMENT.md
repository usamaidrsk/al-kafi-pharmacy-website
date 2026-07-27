# Cloudflare Deployment Handover

## Stack

- Hosting/runtime: Cloudflare Workers Static Assets
- Static output: `out/` from `npm run build`
- Worker entry: `src/worker.ts`
- Public database: Cloudflare D1 database named `al-kaafi-public`
- Bot protection: Cloudflare Turnstile
- Production domain: `https://alkaafipharmacy.com`

## Owner account setup

Run these from an authenticated Cloudflare account owned by Al Kaafi Pharmacy:

```bash
npm run cf:login
WRANGLER_WRITE_LOGS=false npx wrangler d1 create al-kaafi-public
```

Copy the returned D1 binding block into `wrangler.jsonc`, keeping the binding
name as `al_kaafi_public` because the Worker reads the database through `env.al_kaafi_public`:

```json
"d1_databases": [
  {
    "binding": "al_kaafi_public",
    "database_name": "al-kaafi-public",
    "database_id": "REPLACE_WITH_CLOUDFLARE_D1_DATABASE_ID",
    "migrations_dir": "migrations",
    "remote": true
  }
]
```

Apply the migration:

```bash
npm run db:remote
```

## Secrets and identifiers

- D1 `database_id` is not a secret. It is a Cloudflare resource identifier
  required in Wrangler config so the Worker can bind to the right database.
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is public by design because it is rendered
  in the browser.
- `TURNSTILE_SECRET_KEY` is a secret and must only be set with Wrangler secret
  storage.
- `CLOUDFLARE_API_TOKEN` is a secret and must only be stored as a GitHub
  Actions secret.
- `CLOUDFLARE_ACCOUNT_ID` is an identifier, not a credential. Store it as a
  GitHub secret or protected variable so account details are not exposed in
  logs.

## Turnstile widgets

Create one production Cloudflare Turnstile widget:

- Name: `Al Kaafi Pharmacy public forms`
- Widget type: Managed
- Hostnames: `alkaafipharmacy.com`, `www.alkaafipharmacy.com`
- Used on: `/contact/` and `/consultation/`
- Frontend actions: `contact`, `consultation`

Use the production widget's site key as the GitHub Actions variable:

```text
NEXT_PUBLIC_TURNSTILE_SITE_KEY
```

Set the production widget secret on the Worker:

```bash
npm run cf:secret:turnstile
```

The Worker validates the Turnstile token server-side, then rejects submissions
unless `success === true`, the returned `action` matches the form, and the
returned `hostname` is in `TURNSTILE_HOSTNAMES`.

Optional but recommended: create a separate staging/local widget if you want to
test real forms outside production.

- Name: `Al Kaafi Pharmacy staging forms`
- Hostnames: `localhost`, `127.0.0.1`, plus any staging domain
- Use a separate staging secret and a staging `TURNSTILE_HOSTNAMES` value

Set these GitHub Actions secrets:

```text
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

The API token should be scoped only to deploy the Worker, manage Workers routes/custom domains, read the account, and access the D1 database required by this project.

## Deploy

```bash
npm run build
npm run deploy
```

The GitHub workflow `.github/workflows/cloudflare-workers-deploy.yml` deploys on pushes to `main`.

## Domain and DNS

The Worker declares custom domains for:

- `alkaafipharmacy.com`
- `www.alkaafipharmacy.com`

The Worker redirects `www.alkaafipharmacy.com` to `alkaafipharmacy.com`.

Cloudflare dashboard settings to confirm:

- SSL/TLS mode: Full (strict)
- Minimum TLS: 1.2
- TLS 1.3: enabled
- Always Use HTTPS: enabled
- DNSSEC: enabled
- HSTS: do not enable until every intended subdomain works over HTTPS

These are zone-level Cloudflare settings, not application code settings. The
repo can declare the Worker custom domains and perform the `www` redirect, but
SSL/TLS, DNSSEC, Always Use HTTPS, and HSTS must be confirmed in the Cloudflare
dashboard or managed separately through Cloudflare API/Terraform.

## Form boundaries

The public forms are intentionally low-risk. They must not be used for:

- Prescription images or uploads
- Laboratory reports
- Diagnoses or patient records
- National IDs or passports
- Insurance details
- Payment-card information

Prescription workflows should remain a separate secured application and data boundary.
