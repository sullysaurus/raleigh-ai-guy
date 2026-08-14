# Raleigh AI Guy

Personal site for Danny Sullivan, built with Astro and Tailwind CSS.

## Stack

- Astro
- Tailwind CSS
- MDX/content collections
- `@lexingtonthemes/seo`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

The production site is configured for `https://raleighaiguy.com`.

## Stripe Checkout

The private `/clients/zimzoom/` page starts a Stripe Checkout subscription through the `create-zimzoom-checkout` Netlify Function. Configure these environment variables in Netlify for both test and production contexts:

- `STRIPE_SECRET_KEY`: Stripe test or live secret key
- `STRIPE_ZIMZOOM_PRICE_ID`: ID of a recurring USD price for $500 per month
- `STRIPE_ZIMZOOM_CUSTOMER_EMAIL`: optional client email to prefill in Checkout

## Acquisition dashboard integrations

`/ops/acquisition/` can read aggregate metrics through the protected
`acquisition-summary` Netlify Function. Set `OPS_DASHBOARD_KEY` before using
live data. Enter that same key in the dashboard; it is kept in session storage
and sent only to the same-origin function.

The function activates sources only when their credentials are present:

- Stripe uses the existing `STRIPE_SECRET_KEY` and reports active MRR.
- Calendly uses `CALENDLY_ACCESS_TOKEN` and reports upcoming meetings.
- Netlify Forms uses `NETLIFY_ACCESS_TOKEN` plus Netlify's automatic `SITE_ID`.
- PostHog uses `POSTHOG_PERSONAL_API_KEY` and `POSTHOG_PROJECT_ID` for 30-day traffic. The public project token continues client-side tracking but cannot read reports.
- Smartlead uses `SMARTLEAD_API_KEY` for active campaign, lead, send, reply, bounce, tracking, and daily-limit metrics. Set `SMARTLEAD_CAMPAIGN_IDS` to a comma-separated allowlist when the dashboard should include specific campaigns instead of every active campaign.
- Netlify deployment health uses the automatic `SITE_ID` and needs no extra token.

Lead records and activity are stored privately with Netlify Blobs through the protected `acquisition-data` function. The dashboard can import active Smartlead campaign leads and refreshes its reply queue automatically every 30 seconds.

For real-time delivery and reply updates, set `SMARTLEAD_WEBHOOK_SECRET` and create a Smartlead webhook for `SENT`, `REPLIED`, `BOUNCED`, and `UNSUBSCRIBED` events at:

`https://raleighaiguy.com/.netlify/functions/smartlead-webhook?token=SMARTLEAD_WEBHOOK_SECRET`

Clay is reserved as the future enrichment layer. The intended flow is Clay → a protected dashboard webhook → the pipeline, followed by Smartlead campaign assignment. Clay recommends webhooks/HTTP actions for this kind of table workflow; no Clay credential is needed until that workflow is created.

Never prefix these server credentials with `PUBLIC_` or expose them in client-side code.

Use matching modes: a `sk_test_…` key requires a test-mode price, while a `sk_live_…` key requires a live-mode price. Never expose the secret key through an Astro `PUBLIC_` variable.
