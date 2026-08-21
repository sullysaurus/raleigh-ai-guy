import assert from "node:assert/strict";
import test from "node:test";

import { handler } from "../functions/create-client-checkout.mjs";

test("ZimZoom uses the legacy price through the reusable client checkout", async () => {
  const previous = {
    secret: process.env.STRIPE_SECRET_KEY,
    price: process.env.STRIPE_ZIMZOOM_PRICE_ID,
    email: process.env.STRIPE_ZIMZOOM_CUSTOMER_EMAIL,
    url: process.env.URL,
    fetch: globalThis.fetch,
  };
  process.env.STRIPE_SECRET_KEY = "sk_test_example";
  process.env.STRIPE_ZIMZOOM_PRICE_ID = "price_zimzoom";
  process.env.STRIPE_ZIMZOOM_CUSTOMER_EMAIL = "billing@example.com";
  process.env.URL = "https://raleighaiguy.com";

  let request;
  globalThis.fetch = async (url, options) => {
    request = { url, options, body: new URLSearchParams(options.body) };
    return new Response(JSON.stringify({ url: "https://checkout.stripe.test/session" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const response = await handler({ httpMethod: "POST", body: "client=zimzoom" });
    assert.equal(response.statusCode, 303);
    assert.equal(response.headers.location, "https://checkout.stripe.test/session");
    assert.equal(request.url, "https://api.stripe.com/v1/checkout/sessions");
    assert.equal(request.body.get("mode"), "subscription");
    assert.equal(request.body.get("line_items[0][price]"), "price_zimzoom");
    assert.equal(request.body.get("customer_email"), "billing@example.com");
    assert.equal(request.body.get("success_url"), "https://raleighaiguy.com/clients/payment-complete/?client=zimzoom&session_id={CHECKOUT_SESSION_ID}");
    assert.equal(request.body.get("cancel_url"), "https://raleighaiguy.com/clients/zimzoom/");
  } finally {
    globalThis.fetch = previous.fetch;
    for (const [name, value] of Object.entries({
      STRIPE_SECRET_KEY: previous.secret,
      STRIPE_ZIMZOOM_PRICE_ID: previous.price,
      STRIPE_ZIMZOOM_CUSTOMER_EMAIL: previous.email,
      URL: previous.url,
    })) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
});

test("client checkout rejects unknown methods", async () => {
  const response = await handler({ httpMethod: "GET" });
  assert.equal(response.statusCode, 405);
});
