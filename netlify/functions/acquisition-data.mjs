import { authorized, getState, json, mergeProspects, saveState } from "../lib/acquisition-store.mjs";

const requestJson = async (url) => {
  const response = await fetch(url);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.message || `Smartlead returned HTTP ${response.status}`);
  return payload;
};

const smartleadProspects = async () => {
  const apiKey = process.env.SMARTLEAD_API_KEY;
  if (!apiKey) throw new Error("SMARTLEAD_API_KEY is not configured");
  const url = (path, params = {}) => `https://server.smartlead.ai/api/v1${path}?${new URLSearchParams({ api_key: apiKey, ...params })}`;
  const campaignPayload = await requestJson(url("/campaigns/", { include_tags: "true" }));
  const campaigns = (Array.isArray(campaignPayload) ? campaignPayload : campaignPayload.campaigns || []).filter((campaign) => campaign.status === "ACTIVE");
  const prospects = [];
  for (const campaign of campaigns.slice(0, 10)) {
    let offset = 0;
    while (offset < 5000) {
      const payload = await requestJson(url(`/campaigns/${campaign.id}/leads`, { limit: "100", offset: String(offset) }));
      const leads = payload.data || payload.leads || payload.results || [];
      for (const item of leads) {
        const lead = item.lead || item;
        const first = lead.first_name || lead.firstName || "";
        const last = lead.last_name || lead.lastName || "";
        prospects.push({
          company: lead.company_name || lead.company || "Unknown account",
          contact: [first, last].filter(Boolean).join(" ") || lead.email || "Unknown contact",
          email: lead.email || "",
          industry: lead.custom_fields?.industry || "Unclassified",
          stage: Number(item.sent_count || lead.sent_count || 0) > 0 ? "Outreach" : "Approved",
          verified: true,
          campaign: campaign.name,
          campaignId: Number(campaign.id),
          smartleadId: Number(lead.id || item.id) || null,
          sent: Number(item.sent_count || lead.sent_count || 0),
          lastTouch: item.last_email_sent_at || lead.last_email_sent_at || "",
          nextAction: "Monitor Smartlead sequence",
          source: "Smartlead",
        });
      }
      const total = Number(payload.total_leads || payload.total || leads.length);
      offset += leads.length;
      if (!leads.length || offset >= total || leads.length < 100) break;
    }
  }
  return { prospects, campaigns: campaigns.length };
};

export const handler = async (event) => {
  if (!["GET", "PUT", "POST"].includes(event.httpMethod)) return json(405, { error: "Method not allowed" });
  if (!authorized(event)) return json(401, { error: "Invalid dashboard key" });

  try {
    const state = await getState(event);
    if (event.httpMethod === "GET") return json(200, state);
    const body = JSON.parse(event.body || "{}");

    if (event.httpMethod === "POST" && body.action === "sync_smartlead") {
      const imported = await smartleadProspects();
      state.prospects = mergeProspects(state.prospects, imported.prospects);
      state.activities.unshift({
        id: crypto.randomUUID(), type: "sync", title: "Smartlead roster synced", detail: `${imported.prospects.length} leads loaded from ${imported.campaigns} active campaign${imported.campaigns === 1 ? "" : "s"}.`, at: new Date().toISOString(),
      });
      return json(200, await saveState(event, state));
    }

    if (!Array.isArray(body.prospects)) return json(400, { error: "prospects must be an array" });
    state.prospects = body.replace ? body.prospects : mergeProspects(state.prospects, body.prospects);
    if (Array.isArray(body.activities)) state.activities = body.activities;
    return json(200, await saveState(event, state));
  } catch (error) {
    console.error("Acquisition data error", error);
    return json(500, { error: error instanceof Error ? error.message : "Could not update command center" });
  }
};

