import assert from "node:assert/strict";
import test from "node:test";

import { handler } from "../functions/acquisition-summary.mjs";
import { opsSessionToken } from "../lib/acquisition-store.mjs";

test("acquisition summary accepts the secure ops session cookie", async () => {
  const previousKey = process.env.OPS_DASHBOARD_KEY;
  const previousFetch = globalThis.fetch;
  process.env.OPS_DASHBOARD_KEY = "test-dashboard-password";
  globalThis.fetch = async () => { throw new Error("External requests are disabled in this test"); };

  try {
    const response = await handler({
      httpMethod: "GET",
      headers: { cookie: `rag_ops_session=${opsSessionToken()}` },
    });

    assert.equal(response.statusCode, 200);
    assert.equal(JSON.parse(response.body).services.smartlead.status, "not_configured");
  } finally {
    globalThis.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.OPS_DASHBOARD_KEY;
    else process.env.OPS_DASHBOARD_KEY = previousKey;
  }
});
