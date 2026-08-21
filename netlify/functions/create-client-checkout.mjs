import { getClient } from "../lib/client-store.mjs";

const json = (statusCode, body) => ({
  statusCode,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const form = new URLSearchParams(event.body || "");
  const client = await getClient(event, form.get("client"));
  if (!client) return json(404, { error: "Client payment profile not found" });

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = client.slug === "zimzoom"
    ? process.env.STRIPE_ZIMZOOM_PRICE_ID
    : client.stripePriceId;
  const siteUrl = (process.env.URL || "https://raleighaiguy.com").replace(/\/$/, "");
  if (!stripeSecretKey || !priceId) {
    console.error(`Stripe Checkout is not configured for ${client.slug}`);
    return json(503, { error: "Checkout is not configured yet. Please email danny@raleighaiguy.com." });
  }

  const params = new URLSearchParams({
    mode: client.billingInterval === "one_time" ? "payment" : "subscription",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: `${siteUrl}/clients/payment-complete/?client=${encodeURIComponent(client.slug)}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: client.checkoutPath.startsWith("/") ? `${siteUrl}${client.checkoutPath}` : `${siteUrl}/clients/pay/?client=${encodeURIComponent(client.slug)}`,
    client_reference_id: client.slug,
    "metadata[client]": client.legalName,
  });
  if (client.billingInterval !== "one_time") {
    params.set("subscription_data[metadata][client]", client.legalName);
  }
  const email = client.slug === "zimzoom"
    ? process.env.STRIPE_ZIMZOOM_CUSTOMER_EMAIL?.trim()
    : client.contactEmail;
  if (email) params.set("customer_email", email);

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${stripeSecretKey}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    const session = await response.json().catch(() => ({}));
    if (!response.ok || !session.url) {
      console.error("Stripe Checkout Session creation failed", response.status, session?.error?.type);
      return json(502, { error: "Checkout could not be started. Please email danny@raleighaiguy.com." });
    }
    return { statusCode: 303, headers: { location: session.url, "cache-control": "no-store" }, body: "" };
  } catch (error) {
    console.error("Stripe Checkout request failed", error instanceof Error ? error.message : "Unknown error");
    return json(502, { error: "Checkout could not be started. Please email danny@raleighaiguy.com." });
  }
};
