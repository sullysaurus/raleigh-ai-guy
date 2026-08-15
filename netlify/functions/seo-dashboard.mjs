import { createSign } from "node:crypto";

import { authorized, json } from "../lib/acquisition-store.mjs";

const dateString = (date) => date.toISOString().slice(0, 10);

const reportingWindows = () => {
  const currentEnd = new Date();
  currentEnd.setUTCDate(currentEnd.getUTCDate() - 3);
  const currentStart = new Date(currentEnd);
  currentStart.setUTCDate(currentStart.getUTCDate() - 27);
  const previousEnd = new Date(currentStart);
  previousEnd.setUTCDate(previousEnd.getUTCDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setUTCDate(previousStart.getUTCDate() - 27);
  return { currentStart, currentEnd, previousStart, previousEnd };
};

const analyticsWindows = () => {
  const currentEnd = new Date();
  currentEnd.setUTCDate(currentEnd.getUTCDate() - 1);
  const currentStart = new Date(currentEnd);
  currentStart.setUTCDate(currentStart.getUTCDate() - 27);
  const previousEnd = new Date(currentStart);
  previousEnd.setUTCDate(previousEnd.getUTCDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setUTCDate(previousStart.getUTCDate() - 27);
  return { currentStart, currentEnd, previousStart, previousEnd };
};

const base64url = (value) => Buffer.from(value).toString("base64url");

const googleAccessToken = async () => {
  const source = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!source) return null;
  const credentials = JSON.parse(source);
  const now = Math.floor(Date.now() / 1000);
  const tokenUrl = credentials.token_uri || "https://oauth2.googleapis.com/token";
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({
    iss: credentials.client_email,
    scope: [
      "https://www.googleapis.com/auth/webmasters.readonly",
      "https://www.googleapis.com/auth/analytics.readonly",
    ].join(" "),
    aud: tokenUrl,
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(credentials.private_key, "base64url")}`;
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
  });
  if (!response.ok) throw new Error(`Google OAuth returned HTTP ${response.status}`);
  const payload = await response.json();
  return payload.access_token;
};

const googleJson = async (url, accessToken, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { authorization: `Bearer ${accessToken}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error?.message || `Google returned HTTP ${response.status}`);
  return payload;
};

const searchConsoleSummary = async (accessToken) => {
  const property = process.env.GSC_PROPERTY || "https://raleighaiguy.com/";
  if (!accessToken) return { status: "not_configured", property };
  const { currentStart, currentEnd, previousStart, previousEnd } = reportingWindows();
  const query = (startDate, endDate) => googleJson(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`,
    accessToken,
    {
      startDate: dateString(startDate),
      endDate: dateString(endDate),
      dimensions: ["query", "page"],
      type: "web",
      rowLimit: 2500,
      dataState: "final",
    },
  );
  const [current, previous] = await Promise.all([
    query(currentStart, currentEnd),
    query(previousStart, previousEnd),
  ]);
  const previousRows = new Map((previous.rows || []).map((row) => [`${row.keys?.[0]}|${row.keys?.[1]}`, row]));
  const rows = (current.rows || []).map((row) => {
    const keyword = String(row.keys?.[0] || "");
    const page = String(row.keys?.[1] || "");
    const before = previousRows.get(`${keyword}|${page}`);
    return {
      keyword,
      page,
      clicks: Number(row.clicks || 0),
      impressions: Number(row.impressions || 0),
      ctr: Number(row.ctr || 0),
      position: Number(row.position || 0),
      previousPosition: before ? Number(before.position || 0) : null,
      positionChange: before ? Number(before.position || 0) - Number(row.position || 0) : null,
    };
  });
  const totals = rows.reduce((sum, row) => ({
    clicks: sum.clicks + row.clicks,
    impressions: sum.impressions + row.impressions,
  }), { clicks: 0, impressions: 0 });
  return {
    status: "connected",
    property,
    window: `${dateString(currentStart)} to ${dateString(currentEnd)}`,
    comparisonWindow: `${dateString(previousStart)} to ${dateString(previousEnd)}`,
    ...totals,
    ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
    rows,
  };
};

const metric = (row, index) => Number(row?.metricValues?.[index]?.value || 0);

const analyticsPeriod = async (accessToken, propertyId, startDate, endDate) => {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`;
  const dateRanges = [{ startDate: dateString(startDate), endDate: dateString(endDate) }];
  const [totals, channels] = await Promise.all([
    googleJson(url, accessToken, {
      dateRanges,
      metrics: [
        { name: "totalUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "engagedSessions" },
        { name: "keyEvents" },
      ],
    }),
    googleJson(url, accessToken, {
      dateRanges,
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }, { name: "engagedSessions" }, { name: "keyEvents" }],
    }),
  ]);
  const row = totals.rows?.[0];
  const organic = channels.rows?.find((item) => item.dimensionValues?.[0]?.value === "Organic Search");
  return {
    users: metric(row, 0),
    sessions: metric(row, 1),
    pageViews: metric(row, 2),
    engagedSessions: metric(row, 3),
    conversions: metric(row, 4),
    organicSessions: metric(organic, 0),
    organicEngagedSessions: metric(organic, 1),
    organicConversions: metric(organic, 2),
  };
};

const analyticsSummary = async (accessToken) => {
  const propertyId = process.env.GA4_PROPERTY_ID;
  if (!accessToken || !propertyId) return { status: "not_configured" };
  const { currentStart, currentEnd, previousStart, previousEnd } = analyticsWindows();
  const [current, previous] = await Promise.all([
    analyticsPeriod(accessToken, propertyId, currentStart, currentEnd),
    analyticsPeriod(accessToken, propertyId, previousStart, previousEnd),
  ]);
  return {
    status: "connected",
    propertyId,
    window: `${dateString(currentStart)} to ${dateString(currentEnd)}`,
    comparisonWindow: `${dateString(previousStart)} to ${dateString(previousEnd)}`,
    current,
    previous,
  };
};

const posthogSummary = async () => {
  const apiKey = process.env.POSTHOG_PERSONAL_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = (process.env.PUBLIC_POSTHOG_HOST || "https://us.posthog.com").replace(/\/$/, "");
  if (!apiKey || !projectId) return { status: "tracking_only" };
  const response = await fetch(`${host}/api/projects/${projectId}/query/`, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      query: {
        kind: "HogQLQuery",
        query: "SELECT countIf(event = '$pageview') AS pageviews, uniqIf(person_id, event = '$pageview') AS visitors, countIf(event = 'blog_post_viewed') AS article_reads, countIf(event = 'aiq_completed') AS scorecard_completions FROM events WHERE timestamp > now() - INTERVAL 30 DAY",
      },
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.detail || `PostHog returned HTTP ${response.status}`);
  const [pageviews = 0, visitors = 0, articleReads = 0, scorecardCompletions = 0] = payload.results?.[0] || [];
  return {
    status: "connected",
    pageviews30d: Number(pageviews),
    visitors30d: Number(visitors),
    articleReads30d: Number(articleReads),
    scorecardCompletions30d: Number(scorecardCompletions),
  };
};

const guarded = async (name, loader) => {
  try {
    return [name, await loader()];
  } catch (error) {
    console.error(`SEO dashboard integration failed: ${name}`, error instanceof Error ? error.message : error);
    return [name, { status: "error", message: error instanceof Error ? error.message : "Unknown integration error" }];
  }
};

export const handler = async (event) => {
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" });
  if (!authorized(event)) return json(401, { error: "Invalid dashboard key" });
  const tokenResult = await guarded("google", googleAccessToken);
  const accessToken = tokenResult[1]?.status === "error" ? null : tokenResult[1];
  const entries = await Promise.all([
    guarded("searchConsole", () => searchConsoleSummary(accessToken)),
    guarded("analytics", () => analyticsSummary(accessToken)),
    guarded("posthog", posthogSummary),
  ]);
  return json(200, {
    generatedAt: new Date().toISOString(),
    services: Object.fromEntries(entries),
  });
};
