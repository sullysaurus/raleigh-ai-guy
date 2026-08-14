import { timingSafeEqual } from "node:crypto";

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "private, no-store",
  },
  body: JSON.stringify(body),
});

const safeEqual = (left, right) => {
  const a = Buffer.from(String(left || ""));
  const b = Buffer.from(String(right || ""));
  return a.length === b.length && timingSafeEqual(a, b);
};

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload?.message || payload?.error?.message || `HTTP ${response.status}`;
    throw new Error(detail);
  }
  return payload;
};

const monthlyAmount = (item) => {
  const recurring = item?.price?.recurring;
  const amount = Number(item?.price?.unit_amount || 0) * Number(item?.quantity || 1);
  if (!recurring || !amount) return 0;
  const intervalCount = Number(recurring.interval_count || 1);
  if (recurring.interval === "year") return amount / (12 * intervalCount);
  if (recurring.interval === "week") return amount * (52 / 12) / intervalCount;
  if (recurring.interval === "day") return amount * (365 / 12) / intervalCount;
  return amount / intervalCount;
};

const stripeSummary = async () => {
  if (!process.env.STRIPE_SECRET_KEY) return { status: "not_configured" };
  const params = new URLSearchParams({ status: "active", limit: "100" });
  params.append("expand[]", "data.items.data.price");
  const data = await requestJson(`https://api.stripe.com/v1/subscriptions?${params}`, {
    headers: { authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
  });
  const subscriptions = Array.isArray(data.data) ? data.data : [];
  const mrr = subscriptions.reduce(
    (total, subscription) => total + (subscription.items?.data || []).reduce((sum, item) => sum + monthlyAmount(item), 0),
    0,
  );
  return { status: "connected", mrr: Math.round(mrr / 100), subscriptions: subscriptions.length };
};

const calendlySummary = async () => {
  const token = process.env.CALENDLY_ACCESS_TOKEN;
  if (!token) return { status: "not_configured" };
  const headers = { authorization: `Bearer ${token}` };
  const me = await requestJson("https://api.calendly.com/users/me", { headers });
  const now = new Date();
  const max = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    user: me.resource.uri,
    status: "active",
    min_start_time: now.toISOString(),
    max_start_time: max.toISOString(),
    count: "100",
  });
  const events = await requestJson(`https://api.calendly.com/scheduled_events?${params}`, { headers });
  return { status: "connected", upcoming: events.collection?.length || 0 };
};

const netlifyFormsSummary = async () => {
  const token = process.env.NETLIFY_ACCESS_TOKEN;
  const siteId = process.env.SITE_ID;
  if (!token || !siteId) return { status: "not_configured" };
  const submissions = await requestJson(`https://api.netlify.com/api/v1/sites/${siteId}/submissions?per_page=100`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const recentCutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = (Array.isArray(submissions) ? submissions : []).filter((submission) => {
    const createdAt = Date.parse(submission.created_at || "");
    return Number.isFinite(createdAt) && createdAt >= recentCutoff;
  });
  return { status: "connected", leads30d: recent.length, totalLoaded: submissions.length };
};

const smartleadSummary = async () => {
  const apiKey = process.env.SMARTLEAD_API_KEY;
  if (!apiKey) return { status: "not_configured" };
  const keyedUrl = (path, params = {}) => {
    const search = new URLSearchParams({ api_key: apiKey, ...params });
    return `https://server.smartlead.ai/api/v1${path}?${search}`;
  };
  const campaignPayload = await requestJson(keyedUrl("/campaigns/", { include_tags: "true" }));
  const allCampaigns = Array.isArray(campaignPayload) ? campaignPayload : campaignPayload.campaigns || [];
  const requestedIds = String(process.env.SMARTLEAD_CAMPAIGN_IDS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .map(Number)
    .filter(Number.isFinite);
  const selected = allCampaigns
    .filter((campaign) => requestedIds.length ? requestedIds.includes(Number(campaign.id)) : campaign.status === "ACTIVE")
    .slice(0, 10);
  const campaigns = await Promise.all(selected.map(async (campaign) => {
    const [analytics, leads] = await Promise.all([
      requestJson(keyedUrl(`/campaigns/${campaign.id}/analytics`)),
      requestJson(keyedUrl(`/campaigns/${campaign.id}/leads`, { limit: "1", offset: "0" })),
    ]);
    const sent = Number(analytics.total_sent || analytics.sent || 0);
    const bounced = Number(analytics.total_bounced || analytics.bounced || Math.round(sent * Number(analytics.bounce_rate || 0) / 100));
    return {
      id: Number(campaign.id),
      name: String(campaign.name || `Campaign ${campaign.id}`),
      status: String(campaign.status || "UNKNOWN"),
      leads: Number(leads.total_leads || leads.total || 0),
      sent,
      replied: Number(analytics.total_replied || analytics.replied || 0),
      bounced,
      maxDaily: Number(campaign.max_leads_per_day || 0),
      openTracking: !campaign.track_settings?.includes("DONT_EMAIL_OPEN"),
      clickTracking: !campaign.track_settings?.includes("DONT_LINK_CLICK"),
    };
  }));
  const totals = campaigns.reduce((sum, campaign) => ({
    leads: sum.leads + campaign.leads,
    sent: sum.sent + campaign.sent,
    replied: sum.replied + campaign.replied,
    bounced: sum.bounced + campaign.bounced,
    maxDaily: sum.maxDaily + campaign.maxDaily,
  }), { leads: 0, sent: 0, replied: 0, bounced: 0, maxDaily: 0 });
  const primary = campaigns[0];
  return {
    status: "connected",
    campaigns: campaigns.length,
    campaignName: primary?.name || "No active campaign",
    campaignStatus: primary?.status || "IDLE",
    openTracking: campaigns.some((campaign) => campaign.openTracking),
    clickTracking: campaigns.some((campaign) => campaign.clickTracking),
    ...totals,
  };
};

const posthogSummary = async () => {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = (process.env.PUBLIC_POSTHOG_HOST || "https://us.posthog.com").replace(/\/$/, "");
  if (!apiKey || !projectId) return { status: "tracking_only" };
  const result = await requestJson(`${host}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      query: {
        kind: "HogQLQuery",
        query: "SELECT count() AS pageviews, uniq(person_id) AS visitors FROM events WHERE event = '$pageview' AND timestamp > now() - INTERVAL 30 DAY",
      },
    }),
  });
  const [pageviews = 0, visitors = 0] = result.results?.[0] || [];
  return { status: "connected", pageviews30d: Number(pageviews), visitors30d: Number(visitors) };
};

const deploySummary = async () => {
  const siteId = process.env.SITE_ID;
  if (!siteId) return { status: "not_configured" };
  const deploys = await requestJson(`https://api.netlify.com/api/v1/sites/${siteId}/deploys?per_page=1`);
  const deploy = Array.isArray(deploys) ? deploys[0] : null;
  return {
    status: deploy?.state === "ready" ? "connected" : deploy?.state || "unknown",
    commit: deploy?.commit_ref?.slice(0, 7) || "",
    publishedAt: deploy?.published_at || "",
  };
};

const guarded = async (name, loader) => {
  try {
    return [name, await loader()];
  } catch (error) {
    console.error(`Acquisition integration failed: ${name}`, error instanceof Error ? error.message : error);
    return [name, { status: "error" }];
  }
};

export const handler = async (event) => {
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" });
  const expected = process.env.OPS_DASHBOARD_KEY;
  if (!expected) return json(503, { error: "OPS_DASHBOARD_KEY is not configured" });
  if (!safeEqual(event.headers?.["x-ops-key"], expected)) return json(401, { error: "Invalid dashboard key" });

  const entries = await Promise.all([
    guarded("stripe", stripeSummary),
    guarded("calendly", calendlySummary),
    guarded("netlifyForms", netlifyFormsSummary),
    guarded("smartlead", smartleadSummary),
    guarded("posthog", posthogSummary),
    guarded("netlifyDeploy", deploySummary),
    Promise.resolve(["clay", { status: "planned" }]),
  ]);

  return json(200, { generatedAt: new Date().toISOString(), services: Object.fromEntries(entries) });
};
