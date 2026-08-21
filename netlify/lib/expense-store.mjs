import { getStore } from "@netlify/blobs";

const STORE_NAME = "admin-expense-ledger";
const STATE_KEY = "expenses-v1";

const seeds = [
  ["supabase", "Supabase", "Database & infrastructure", "https://supabase.com/dashboard"],
  ["vercel", "Vercel", "Hosting & deployment", "https://vercel.com/dashboard"],
  ["smartlead", "Smartlead", "Sales & outreach", "https://app.smartlead.ai/"],
  ["apollo", "Apollo", "Sales & prospecting", "https://app.apollo.io/"],
  ["netlify", "Netlify", "Hosting & deployment", "https://app.netlify.com/"],
  ["posthog", "PostHog", "Analytics", "https://us.posthog.com/"],
  ["zerobounce", "ZeroBounce", "Email verification", "https://app.zerobounce.net/"],
  ["calendly", "Calendly", "Scheduling", "https://calendly.com/app/"],
  ["github", "GitHub", "Developer tools", "https://github.com/settings/billing"],
  ["claude", "Claude", "AI tools", "https://claude.ai/settings/billing"],
].map(([id, vendor, category, accountUrl]) => ({
  id,
  vendor,
  category,
  amountCents: 0,
  billingInterval: "month",
  billingDay: null,
  renewalDate: "",
  status: "active",
  accountUrl,
  notes: "Detected or requested service · add the current plan cost",
  createdAt: "2026-08-21T00:00:00.000Z",
  updatedAt: "2026-08-21T00:00:00.000Z",
}));

const cleanUrl = (value) => {
  const input = String(value || "").trim();
  if (!input) return "";
  try {
    const url = new URL(input);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch { return ""; }
};

export const cleanExpense = (value = {}) => {
  const interval = ["month", "year", "one_time", "usage"].includes(value.billingInterval)
    ? value.billingInterval
    : "month";
  const status = ["active", "trial", "paused", "canceled"].includes(value.status)
    ? value.status
    : "active";
  const day = Number(value.billingDay || 0);
  return {
    id: String(value.id || crypto.randomUUID()).slice(0, 80),
    vendor: String(value.vendor || "").trim().slice(0, 120),
    category: String(value.category || "Other").trim().slice(0, 80),
    amountCents: Math.max(0, Math.round(Number(value.amountCents || 0))),
    billingInterval: interval,
    billingDay: day >= 1 && day <= 31 ? day : null,
    renewalDate: String(value.renewalDate || "").slice(0, 10),
    status,
    accountUrl: cleanUrl(value.accountUrl),
    notes: String(value.notes || "").trim().slice(0, 500),
    createdAt: String(value.createdAt || new Date().toISOString()),
    updatedAt: String(value.updatedAt || new Date().toISOString()),
  };
};

export const defaultExpenses = () => seeds.map(cleanExpense);

const getExpenseStore = (event) => {
  const blobContext = JSON.parse(Buffer.from(event.blobs, "base64").toString("utf8"));
  return getStore({
    name: STORE_NAME,
    siteID: event.headers["x-nf-site-id"],
    token: blobContext.token,
  });
};

export const readExpenses = async (store) => {
  const state = await store.get(STATE_KEY, { type: "json", consistency: "strong" });
  return Array.isArray(state?.expenses) ? state.expenses.map(cleanExpense) : defaultExpenses();
};

export const getExpenses = async (event) => {
  return readExpenses(getExpenseStore(event));
};

export const saveExpenses = async (event, expenses) => {
  const cleaned = expenses.map(cleanExpense);
  const store = getExpenseStore(event);
  await store.setJSON(STATE_KEY, { version: 1, expenses: cleaned, updatedAt: new Date().toISOString() });
  return cleaned;
};
