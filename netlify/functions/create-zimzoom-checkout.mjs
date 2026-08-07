const json = (statusCode, body) => ({
  statusCode,
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      ...json(405, { error: "Method not allowed" }),
      headers: { ...json(405, {}).headers, allow: "POST" },
    };
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_ZIMZOOM_PRICE_ID;
  const siteUrl = (process.env.URL || "https://dannysullivan.ai").replace(/\/$/, "");

  if (!stripeSecretKey || !priceId) {
    console.error("Stripe Checkout is missing STRIPE_SECRET_KEY or STRIPE_ZIMZOOM_PRICE_ID");
    return json(503, {
      error: "Checkout is not configured yet. Please email hello@dannysullivan.ai.",
    });
  }

  const params = new URLSearchParams({
    mode: "subscription",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: `${siteUrl}/clients/zimzoom/payment-complete/?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/clients/zimzoom/`,
    client_reference_id: "frame-game-llc-zimzoom",
    "metadata[client]": "Frame Game LLC (DBA ZimZoom)",
    "subscription_data[metadata][client]": "Frame Game LLC (DBA ZimZoom)",
  });

  const customerEmail = process.env.STRIPE_ZIMZOOM_CUSTOMER_EMAIL?.trim();
  if (customerEmail) params.set("customer_email", customerEmail);

  try {
    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${stripeSecretKey}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: params,
    });
    const session = await response.json();

    if (!response.ok || !session.url) {
      console.error("Stripe Checkout Session creation failed", response.status, session?.error?.type);
      return json(502, {
        error: "Checkout could not be started. Please email hello@dannysullivan.ai.",
      });
    }

    return {
      statusCode: 303,
      headers: {
        location: session.url,
        "cache-control": "no-store",
      },
      body: "",
    };
  } catch (error) {
    console.error("Stripe Checkout request failed", error instanceof Error ? error.message : "Unknown error");
    return json(502, {
      error: "Checkout could not be started. Please email hello@dannysullivan.ai.",
    });
  }
};
