import { connectLambda, getStore } from "@netlify/blobs";

const STORE_NAME = "client-billing-portal";
const STATE_KEY = "clients-v1";

export const defaultClient = {
  id: "zimzoom",
  slug: "zimzoom",
  company: "Zim Zoom",
  legalName: "Frame Game LLC (DBA ZimZoom)",
  contactEmail: "",
  serviceTitle: "Monthly AI consulting",
  description: "Ongoing AI consulting and implementation support under the signed consulting agreement.",
  amountCents: 50000,
  currency: "usd",
  billingInterval: "month",
  checkoutPath: "/clients/zimzoom/",
  stripePriceId: "",
  stripeProductId: "",
  createdAt: "2026-01-01T00:00:00.000Z",
};

const normalizeSlug = (value) => String(value || "")
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "")
  .slice(0, 64);

export const cleanClient = (value = {}) => {
  const slug = normalizeSlug(value.slug || value.company);
  const interval = ["month", "year", "one_time"].includes(value.billingInterval)
    ? value.billingInterval
    : "month";

  return {
    id: String(value.id || slug || crypto.randomUUID()),
    slug,
    company: String(value.company || "").trim().slice(0, 120),
    legalName: String(value.legalName || value.company || "").trim().slice(0, 160),
    contactEmail: String(value.contactEmail || "").trim().toLowerCase().slice(0, 254),
    serviceTitle: String(value.serviceTitle || "AI consulting").trim().slice(0, 140),
    description: String(value.description || "Ongoing consulting and implementation support under the signed agreement.").trim().slice(0, 600),
    amountCents: Math.max(100, Math.round(Number(value.amountCents || 0))),
    currency: "usd",
    billingInterval: interval,
    checkoutPath: String(value.checkoutPath || `/clients/pay/?client=${encodeURIComponent(slug)}`),
    stripePriceId: String(value.stripePriceId || ""),
    stripeProductId: String(value.stripeProductId || ""),
    createdAt: String(value.createdAt || new Date().toISOString()),
  };
};

export const publicClient = (client) => ({
  slug: client.slug,
  company: client.company,
  legalName: client.legalName,
  serviceTitle: client.serviceTitle,
  description: client.description,
  amountCents: client.amountCents,
  currency: client.currency,
  billingInterval: client.billingInterval,
  checkoutPath: client.checkoutPath,
});

export const privateClient = (client) => ({
  ...publicClient(client),
  contactEmail: client.contactEmail,
  createdAt: client.createdAt,
});

export const getClients = async (event) => {
  connectLambda(event);
  const store = getStore(STORE_NAME);
  const state = await store.get(STATE_KEY, { type: "json" });
  const stored = Array.isArray(state?.clients) ? state.clients.map(cleanClient) : [];
  const withoutLegacyZimZoom = stored.filter((client) => client.slug !== defaultClient.slug);
  return [defaultClient, ...withoutLegacyZimZoom];
};

export const getClient = async (event, slug) => {
  const normalized = normalizeSlug(slug);
  if (normalized === defaultClient.slug) return defaultClient;
  return (await getClients(event)).find((client) => client.slug === normalized) || null;
};

export const saveClient = async (event, client) => {
  const clients = await getClients(event);
  if (clients.some((item) => item.slug === client.slug)) {
    throw new Error("A client with that URL slug already exists");
  }
  const next = [...clients, cleanClient(client)];
  connectLambda(event);
  const store = getStore(STORE_NAME);
  await store.setJSON(STATE_KEY, { version: 1, clients: next, updatedAt: new Date().toISOString() });
  return next;
};
