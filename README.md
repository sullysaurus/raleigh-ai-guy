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

The password-protected `/clients/` ledger uses the same `OPS_DASHBOARD_KEY` secure session as the internal operations tools. It lists client payment profiles and can create a new Stripe product, Stripe price, and immediately shareable payment page without a site rebuild. New profiles are stored privately in Netlify Blobs.

The existing `/clients/zimzoom/` page remains ZimZoom's stable payment URL. New clients receive a URL in the form `/clients/pay/?client=client-slug`; the page reads only the client-facing payment details and sends the client to Stripe Checkout.

Configure these environment variables in Netlify for both test and production contexts:

- `STRIPE_SECRET_KEY`: Stripe test or live secret key
- `STRIPE_ZIMZOOM_PRICE_ID`: ID of a recurring USD price for $500 per month
- `STRIPE_ZIMZOOM_CUSTOMER_EMAIL`: optional client email to prefill in Checkout
- `OPS_DASHBOARD_KEY`: password used to unlock `/clients/`

Creating a client from the ledger creates Stripe catalog objects but does not charge the client. A charge or subscription begins only after the client completes the hosted Stripe Checkout page.

## Acquisition dashboard integrations

`/ops/acquisition/` can read aggregate metrics through the protected
`acquisition-summary` Netlify Function. Set `OPS_DASHBOARD_KEY` before using
live data. Enter that same key once; the `ops-session` function exchanges it for
a signed, HttpOnly, Secure, SameSite session cookie that lasts 30 days. The key
is never embedded in client-side code or stored in browser-readable storage.

The function activates sources only when their credentials are present:

- Stripe uses the existing `STRIPE_SECRET_KEY` and reports active MRR.
- Calendly uses `CALENDLY_ACCESS_TOKEN` and reports upcoming meetings.
- Netlify Forms uses `NETLIFY_ACCESS_TOKEN` plus Netlify's automatic `SITE_ID`.
- PostHog uses `POSTHOG_PERSONAL_API_KEY` and `POSTHOG_PROJECT_ID` for 30-day traffic. The public project token continues client-side tracking but cannot read reports.
- Smartlead uses `SMARTLEAD_API_KEY` for active campaign, lead, send, reply, bounce, tracking, and daily-limit metrics. Set `SMARTLEAD_CAMPAIGN_IDS` to a comma-separated allowlist when the dashboard should include specific campaigns instead of every active campaign.
- Apollo uses `APOLLO_API_KEY` to find Raleigh-area decision-makers and reveal selected work emails. Search does not consume enrichment credits; the dashboard asks for confirmation before a reveal.
- ZeroBounce uses `ZEROBOUNCE_API_KEY` to verify selected emails. Only addresses returned as `valid` can be approved and handed to Smartlead.
- Netlify deployment health uses the automatic `SITE_ID` and needs no extra token.

Lead records and activity are stored privately with Netlify Blobs through the protected `acquisition-data` function. The dashboard can import active Smartlead campaign leads and refreshes its reply queue automatically every 30 seconds.

The prospecting workbench follows an explicit safety sequence: Apollo search → optional email reveal → ZeroBounce verification → operator approval → Smartlead campaign handoff. Catch-all, unknown, invalid, abuse, spam-trap, and do-not-mail results are never eligible for handoff. `HUBSPOT_ACCESS_TOKEN`, `N8N_WEBHOOK_URL`, and `CLAY_API_KEY` are reserved server-only variables for the next CRM, orchestration, and enrichment phases; their status is visible in the command center, but no data is sent to them yet.

The dashboard also contains a queued `Raleigh Realtors | AI Lunch & Learn | Batch 01` playbook. Its action creates an idempotent Smartlead draft, installs the four-email sequence, and sets a Tuesday–Thursday Eastern schedule. It deliberately does not attach a sender, add leads, or activate the campaign; launch remains on hold until the secondary sending domain is approved and every recipient passes ZeroBounce.

For real-time delivery and reply updates, set `SMARTLEAD_WEBHOOK_SECRET` and create a Smartlead webhook for `SENT`, `REPLIED`, `BOUNCED`, and `UNSUBSCRIBED` events at:

`https://raleighaiguy.com/.netlify/functions/smartlead-webhook?token=SMARTLEAD_WEBHOOK_SECRET`

Clay remains an optional future enrichment layer rather than a dependency for launch. Apollo supplies the initial people database; Clay can later add research signals and more advanced scoring without replacing Apollo.

Never prefix these server credentials with `PUBLIC_` or expose them in client-side code.

Use matching modes: a `sk_test_…` key requires a test-mode price, while a `sk_live_…` key requires a live-mode price. Never expose the secret key through an Astro `PUBLIC_` variable.
