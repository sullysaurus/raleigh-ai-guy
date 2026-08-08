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

Use matching modes: a `sk_test_…` key requires a test-mode price, while a `sk_live_…` key requires a live-mode price. Never expose the secret key through an Astro `PUBLIC_` variable.
