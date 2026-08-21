import { authorized, json } from "../lib/acquisition-store.mjs";
import { cleanClient, getClient, getClients, privateClient, saveClient } from "../lib/client-store.mjs";

const stripeRequest = async (path, secretKey, params) => {
  const response = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${secretKey}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error?.message || `Stripe returned HTTP ${response.status}`);
  return payload;
};

const createStripePrice = async (client, secretKey) => {
  const product = await stripeRequest("products", secretKey, new URLSearchParams({
    name: `${client.serviceTitle} — ${client.company}`,
    description: client.description,
    "metadata[client_slug]": client.slug,
    "metadata[client_name]": client.legalName,
  }));
  const priceParams = new URLSearchParams({
    product: product.id,
    currency: client.currency,
    unit_amount: String(client.amountCents),
    "metadata[client_slug]": client.slug,
  });
  if (client.billingInterval !== "one_time") {
    priceParams.set("recurring[interval]", client.billingInterval);
  }
  const price = await stripeRequest("prices", secretKey, priceParams);
  return { stripeProductId: product.id, stripePriceId: price.id };
};

export const handler = async (event) => {
  if (!authorized(event)) return json(401, { error: "Invalid dashboard key" });

  if (event.httpMethod === "GET") {
    const clients = await getClients(event);
    return json(200, { clients: clients.map(privateClient) });
  }

  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  try {
    const body = JSON.parse(event.body || "{}");
    const client = cleanClient({ ...body, amountCents: Number(body.amountDollars || 0) * 100 });
    if (!client.company || !client.slug) return json(400, { error: "Company name and URL slug are required" });
    if (!/^\S+@\S+\.\S+$/.test(client.contactEmail)) return json(400, { error: "Enter a valid billing email" });
    if (client.amountCents < 100) return json(400, { error: "The fee must be at least $1" });
    if (await getClient(event, client.slug)) return json(409, { error: "A client with that URL slug already exists" });
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) return json(503, { error: "STRIPE_SECRET_KEY is not configured" });

    const stripe = await createStripePrice(client, secretKey);
    const saved = cleanClient({ ...client, ...stripe });
    await saveClient(event, saved);
    return json(201, { client: privateClient(saved) });
  } catch (error) {
    console.error("Client creation failed", error instanceof Error ? error.message : error);
    const message = error instanceof Error ? error.message : "Client creation failed";
    return json(message.includes("already exists") ? 409 : 500, { error: message });
  }
};
