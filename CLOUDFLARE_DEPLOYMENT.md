# Cloudflare Deployment Handover

## Stack

- Hosting/runtime: Cloudflare Workers Static Assets
- Static output: `out/` from `npm run build`
- Worker entry: `src/worker.ts`
- Public database: Cloudflare D1 database named `al-kaafi-public`
- Bot protection: Cloudflare Turnstile
- Email notifications: Cloudflare Email Sending binding named `EMAIL`
- Production domain: `https://alkaafipharmacy.com`
- Required local/CI runtime: Node.js 22 or newer

## Owner account setup

Install dependencies with Node.js 22 or newer before running Wrangler commands.

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

Apply the migrations:

```bash
npm run db:remote
```

The D1 database stores:

- `public_enquiries`: contact and pharmacist-consultation submissions.
- `newsletter_subscribers`: newsletter subscriptions from the homepage and footer.

Useful production checks:

```bash
WRANGLER_WRITE_LOGS=false npx wrangler d1 execute al-kaafi-public --remote --command "SELECT enquiry_type, full_name, email, phone, topic, created_at FROM public_enquiries ORDER BY created_at DESC LIMIT 20;"
WRANGLER_WRITE_LOGS=false npx wrangler d1 execute al-kaafi-public --remote --command "SELECT email, full_name, source, status, created_at, updated_at FROM newsletter_subscribers ORDER BY updated_at DESC LIMIT 20;"
```

## Email notifications

Public form submissions are stored in D1 first, then emailed in the background:

- `/contact/` notifications go to `feedback@alkaafipharmacy.com`
- `/consultation/` notifications go to `rx@alkaafipharmacy.com`
- Newsletter signup notifications go to `feedback@alkaafipharmacy.com`
- Notification sender: `feedback@alkaafipharmacy.com`

Enable Cloudflare Email Sending before expecting notifications:

```bash
WRANGLER_WRITE_LOGS=false npx wrangler email sending enable alkaafipharmacy.com
WRANGLER_WRITE_LOGS=false npx wrangler email sending dns get alkaafipharmacy.com
```

Or use the dashboard:

1. Cloudflare Dashboard > Compute & AI > Email Service > Email Sending.
2. Onboard `alkaafipharmacy.com`.
3. Let Cloudflare add SPF and DKIM records.
4. Confirm the domain is active for sending.

Also configure incoming inboxes or forwarding through Email Routing:

- `feedback@alkaafipharmacy.com`
- `rx@alkaafipharmacy.com`
- `admin@alkaafipharmacy.com`
- `hr@alkaafipharmacy.com`
- `ceo@alkaafipharmacy.com`
- `coo@alkaafipharmacy.com`

Cloudflare Email Routing forwards these addresses to verified destination
mailboxes. It does not provide a full mailbox UI by itself.

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
- Used on: `/contact/`, `/consultation/`, homepage newsletter, and footer newsletter
- Frontend actions: `contact`, `consultation`, `newsletter`

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

Both values must be single-line values. Do not include quotes, spaces, blank
lines, or a `Bearer ` prefix. If CI reports `Headers.set` with an invalid
header value, recreate `CLOUDFLARE_API_TOKEN` first, then `CLOUDFLARE_ACCOUNT_ID`
if the error remains.

The GitHub workflow also normalizes accidental whitespace, `KEY=value` prefixes,
and surrounding quotes before deploying, but the secrets should still be stored
cleanly in GitHub.

The workflow verifies `CLOUDFLARE_API_TOKEN` against Cloudflare before running
Wrangler. If verification fails with `Invalid format for Authorization header`,
the saved GitHub secret is not the raw API token value. Delete the GitHub secret
and create a new Cloudflare API token; Cloudflare only shows the token value
once.

The API token should be scoped only to deploy the Worker, manage Workers custom
domains, update the DNS records Cloudflare creates for those custom domains, and
access the D1 database required by this project.

Recommended token permissions:

- Account > Workers Scripts > Edit
- Account > D1 > Edit
- Zone > Zone > Read
- Zone > DNS > Edit
- Zone > Workers Routes > Edit

Token resources:

- Account resources: the Al Kaafi Pharmacy Cloudflare account
- Zone resources: `alkaafipharmacy.com`

## Deploy

```bash
npm run build
npm run db:remote
npm run deploy
```

The GitHub workflow `.github/workflows/cloudflare-workers-deploy.yml` deploys on
pushes to `main`. It runs `npm run db:remote` before `npm run deploy:worker` so
new D1 migrations are applied before the Worker starts using new tables.

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

If Wrangler uploads the Worker but fails at `/workers/scripts/.../domains/records`,
the problem is in the custom-domain step. Check both:

- The API token has `Zone > Zone > Read` and `Zone > DNS > Edit`.
- Old Firebase or hosting DNS records do not conflict with the Worker custom
  domains. Custom Domains cannot be created on hostnames with conflicting DNS
  records. Delete old `A`, `AAAA`, or `CNAME` records for `alkaafipharmacy.com`
  and `www` if the Worker should own those hostnames.

## Form boundaries

The public forms are intentionally low-risk. They must not be used for:

- Prescription images or uploads
- Laboratory reports
- Diagnoses or patient records
- National IDs or passports
- Insurance details
- Payment-card information

Prescription workflows should remain a separate secured application and data boundary.

Newsletter signup only collects an email address, optional name, consent
confirmation, source page, limited browser metadata, and Turnstile verification
data.
