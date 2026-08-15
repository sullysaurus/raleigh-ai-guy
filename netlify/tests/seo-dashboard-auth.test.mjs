import assert from "node:assert/strict";
import test from "node:test";

import { handler } from "../functions/seo-dashboard.mjs";
import { opsSessionToken } from "../lib/acquisition-store.mjs";

test("SEO dashboard accepts the shared secure ops session", async () => {
  const previous = {
    key: process.env.OPS_DASHBOARD_KEY,
    google: process.env.GSC_SERVICE_ACCOUNT_JSON,
    ga4: process.env.GA4_PROPERTY_ID,
    posthogKey: process.env.POSTHOG_PERSONAL_API_KEY,
    posthogProject: process.env.POSTHOG_PROJECT_ID,
  };
  process.env.OPS_DASHBOARD_KEY = "test-dashboard-password";
  delete process.env.GSC_SERVICE_ACCOUNT_JSON;
  delete process.env.GA4_PROPERTY_ID;
  delete process.env.POSTHOG_PERSONAL_API_KEY;
  delete process.env.POSTHOG_PROJECT_ID;

  try {
    const response = await handler({
      httpMethod: "GET",
      headers: { cookie: `rag_ops_session=${opsSessionToken()}` },
    });
    const payload = JSON.parse(response.body);
    assert.equal(response.statusCode, 200);
    assert.equal(payload.services.searchConsole.status, "not_configured");
    assert.equal(payload.services.analytics.status, "not_configured");
    assert.equal(payload.services.posthog.status, "tracking_only");
  } finally {
    const restore = (name, value) => value === undefined ? delete process.env[name] : process.env[name] = value;
    restore("OPS_DASHBOARD_KEY", previous.key);
    restore("GSC_SERVICE_ACCOUNT_JSON", previous.google);
    restore("GA4_PROPERTY_ID", previous.ga4);
    restore("POSTHOG_PERSONAL_API_KEY", previous.posthogKey);
    restore("POSTHOG_PROJECT_ID", previous.posthogProject);
  }
});

test("SEO dashboard rejects an unauthenticated request", async () => {
  const previousKey = process.env.OPS_DASHBOARD_KEY;
  process.env.OPS_DASHBOARD_KEY = "test-dashboard-password";
  try {
    const response = await handler({ httpMethod: "GET", headers: {} });
    assert.equal(response.statusCode, 401);
  } finally {
    if (previousKey === undefined) delete process.env.OPS_DASHBOARD_KEY;
    else process.env.OPS_DASHBOARD_KEY = previousKey;
  }
});
