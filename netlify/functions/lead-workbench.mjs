import { authorized, cleanProspect, getState, json, mergeProspects, saveState } from "../lib/acquisition-store.mjs";

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error || payload?.message || `Provider returned HTTP ${response.status}`);
  return payload;
};

const REALTOR_CAMPAIGN_NAME = "Raleigh Realtors | AI Lunch & Learn | Batch 01";
const realtorSequences = [
  {
    id: null,
    seq_number: 1,
    subject: "team training",
    email_body: "<p>Hi {{first_name}},</p><p>A lot of Triangle agents are experimenting with AI, but most haven't had a practical, office-level walkthrough of what actually saves time.</p><p>I'm offering local brokerages a lunch-and-learn session at no cost: 30 minutes showing five real estate workflows agents can use for listing copy, follow-up, market updates, and weekly content. No pitch.</p><p>I'd tailor it to {{company_name}}. Would that be useful for your office?</p><p>Danny</p>",
    seq_delay_details: { delay_in_days: 0 },
  },
  {
    id: null,
    seq_number: 2,
    subject: "",
    email_body: "<p>One detail: this is hands-on, not an AI trends talk. Agents leave with prompts and templates they can use the same day, and I can shape the examples around how your office works.</p><p>Worth considering for an upcoming team meeting?</p><p>Danny</p>",
    seq_delay_details: { delay_in_days: 4 },
  },
  {
    id: null,
    seq_number: 3,
    subject: "",
    email_body: "<p>A common question is whether agents need paid AI tools. They don't—the session focuses on useful workflows they can try with tools they likely already have.</p><p>If someone else owns training at {{company_name}}, I'm happy to coordinate with them.</p><p>Danny</p>",
    seq_delay_details: { delay_in_days: 8 },
  },
  {
    id: null,
    seq_number: 4,
    subject: "",
    email_body: "<p>I'll close the loop after this. If a practical AI lunch-and-learn would help your team later this year, reply “later” and I'll check back when timing is better. Otherwise, no need to respond.</p><p>Danny</p>",
    seq_delay_details: { delay_in_days: 15 },
  },
];

const qualification = (lead) => {
  let score = 0;
  const reasons = [];
  const location = String(lead.location || "").toLowerCase();
  const industry = String(lead.industry || "").toLowerCase();
  const title = String(lead.title || "").toLowerCase();
  const employees = Number(lead.employeeCount || 0);
  if (/raleigh|durham|cary|chapel hill|wake forest|triangle|north carolina|\bnc\b/.test(location)) { score += 25; reasons.push("Triangle market"); }
  if (/contract|construction|restoration|landscap|property|real estate|home service|hvac|plumb|roof|electr|mechanical/.test(industry)) { score += 25; reasons.push("Target service industry"); }
  if (/owner|founder|president|chief|partner|principal|operations|general manager/.test(title)) { score += 20; reasons.push("Decision-maker role"); }
  if (employees >= 2 && employees <= 200) { score += 15; reasons.push("Ideal team size"); }
  else if (employees > 0 && employees <= 500) { score += 8; reasons.push("Viable team size"); }
  if (lead.domain || lead.website) { score += 5; reasons.push("Established web presence"); }
  if (lead.emailStatus === "valid") { score += 10; reasons.push("Verified work email"); }
  return { score: Math.min(100, score), reasons };
};

const normalizeApollo = (person) => {
  const organization = person.organization || person.account || {};
  const first = person.first_name || "";
  const last = person.last_name || "";
  const city = person.city || organization.city || "";
  const state = person.state || organization.state || "";
  const lead = {
    id: `apollo-${person.id || crypto.randomUUID()}`,
    apolloId: String(person.id || person.person_id || ""),
    company: organization.name || person.organization_name || "Unknown company",
    contact: person.name || [first, last].filter(Boolean).join(" ") || "Unknown contact",
    email: person.email || "",
    title: person.title || "",
    location: [city, state].filter(Boolean).join(", "),
    industry: organization.industry || person.industry || "Unclassified",
    domain: organization.primary_domain || person.organization_domain || "",
    website: organization.website_url || person.organization_website_url || "",
    linkedin: person.linkedin_url || "",
    employeeCount: Number(organization.estimated_num_employees || person.organization_num_employees || 0),
    source: "Apollo",
    stage: person.email ? "Verified" : "Research",
    verified: Boolean(person.email),
    emailStatus: person.email_status === "verified" ? "provider_verified" : "unverified",
    nextAction: person.email ? "Verify with ZeroBounce" : "Reveal work email",
  };
  const scored = qualification(lead);
  return cleanProspect({ ...lead, score: scored.score, scoreReasons: scored.reasons });
};

const apolloSearch = async (filters = {}) => {
  if (!process.env.APOLLO_API_KEY) throw new Error("Apollo is not connected yet");
  const body = {
    organization_locations: [String(filters.location || "Raleigh, North Carolina")],
    person_seniorities: filters.seniorities || ["owner", "founder", "c_suite", "partner", "head", "director"],
    person_titles: String(filters.titles || "owner,founder,president,operations manager,general manager")
      .split(",").map((value) => value.trim()).filter(Boolean),
    organization_num_employees_ranges: [String(filters.employeeRange || "2,200")],
    q_keywords: String(filters.industry || "specialty contractor"),
    page: Math.max(1, Number(filters.page || 1)),
    per_page: Math.min(25, Math.max(1, Number(filters.limit || 15))),
  };
  const payload = await fetchJson("https://api.apollo.io/api/v1/mixed_people/api_search", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": process.env.APOLLO_API_KEY },
    body: JSON.stringify(body),
  });
  return { leads: (payload.people || []).map(normalizeApollo), total: Number(payload.pagination?.total_entries || payload.total_entries || 0) };
};

const apolloEnrich = async (leads = []) => {
  if (!process.env.APOLLO_API_KEY) throw new Error("Apollo is not connected yet");
  const enriched = [];
  for (const lead of leads.slice(0, 20)) {
    const params = new URLSearchParams({ id: lead.apolloId, reveal_personal_emails: "false", reveal_phone_number: "false" });
    const payload = await fetchJson(`https://api.apollo.io/api/v1/people/match?${params}`, {
      method: "POST", headers: { accept: "application/json", "x-api-key": process.env.APOLLO_API_KEY },
    });
    enriched.push(normalizeApollo(payload.person || payload));
  }
  return enriched;
};

const zeroBounceVerify = async (prospects = []) => {
  if (!process.env.ZEROBOUNCE_API_KEY) throw new Error("ZeroBounce is not connected yet");
  const withEmail = prospects.filter((lead) => lead.email).slice(0, 100);
  if (!withEmail.length) throw new Error("Select at least one lead with an email address");
  const payload = await fetchJson("https://api-us.zerobounce.net/v2/validatebatch", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ api_key: process.env.ZEROBOUNCE_API_KEY, email_batch: withEmail.map((lead) => ({ email_address: lead.email, ip_address: null })), activity_data: false, verify_plus: true }),
  });
  if (payload.errors?.length) throw new Error(payload.errors.map((item) => item.error).join("; "));
  const results = new Map((payload.email_batch || []).map((result) => [String(result.address || "").toLowerCase(), result]));
  return prospects.map((lead) => {
    const result = results.get(String(lead.email || "").toLowerCase());
    if (!result) return lead;
    const allowed = result.status === "valid";
    const scored = qualification({ ...lead, emailStatus: result.status });
    return cleanProspect({
      ...lead,
      emailStatus: result.status,
      emailSubStatus: result.sub_status || "",
      verified: allowed,
      stage: allowed && lead.stage === "Research" ? "Verified" : lead.stage,
      nextAction: allowed ? "Review and approve" : result.status === "catch-all" ? "Review catch-all email" : "Do not send",
      score: scored.score,
      scoreReasons: scored.reasons,
    });
  });
};

const smartleadHandoff = async (event, ids, campaignId) => {
  if (!process.env.SMARTLEAD_API_KEY) throw new Error("Smartlead is not connected");
  if (!Number(campaignId)) throw new Error("Choose a Smartlead campaign");
  const state = await getState(event);
  const selected = state.prospects.filter((lead) => ids.includes(lead.id));
  const eligible = selected.filter((lead) => lead.emailStatus === "valid" && lead.stage === "Approved" && lead.email);
  if (eligible.length !== selected.length || !eligible.length) throw new Error("Every selected lead must be ZeroBounce-valid and approved");
  const splitName = (name) => { const parts = String(name).trim().split(/\s+/); return { first: parts.shift() || "", last: parts.join(" ") }; };
  const payload = await fetchJson(`https://server.smartlead.ai/api/v1/campaigns/${Number(campaignId)}/leads?api_key=${encodeURIComponent(process.env.SMARTLEAD_API_KEY)}`, {
    method: "POST", headers: { "content-type": "application/json" },
    body: JSON.stringify({
      lead_list: eligible.map((lead) => { const name = splitName(lead.contact); return { email: lead.email, first_name: name.first, last_name: name.last, company_name: lead.company, website: lead.website, location: lead.location, linkedin_profile: lead.linkedin, custom_fields: { job_title: lead.title, industry: lead.industry, qualification_score: String(lead.score), workflow_hypothesis: lead.workflow } }; }),
      settings: { ignore_global_block_list: false, ignore_unsubscribe_list: false, ignore_duplicate_leads_in_other_campaign: false, ignore_community_bounce_list: false, return_lead_ids: true },
    }),
  });
  for (const lead of eligible) Object.assign(lead, { stage: "Outreach", campaignId: Number(campaignId), campaign: "Smartlead campaign", nextAction: "Monitor Smartlead sequence", updatedAt: new Date().toISOString() });
  state.activities.unshift({ id: crypto.randomUUID(), type: "handoff", title: `${eligible.length} lead${eligible.length === 1 ? "" : "s"} sent to Smartlead`, detail: `Campaign ${campaignId} · ${payload.added_count || 0} added · ${payload.skipped_count || 0} skipped`, at: new Date().toISOString() });
  return { state: await saveState(event, state), result: payload };
};

const queueRealtorCampaign = async () => {
  if (!process.env.SMARTLEAD_API_KEY) throw new Error("Smartlead is not connected");
  const key = encodeURIComponent(process.env.SMARTLEAD_API_KEY);
  const campaignsPayload = await fetchJson(`https://server.smartlead.ai/api/v1/campaigns/?api_key=${key}`);
  const campaigns = Array.isArray(campaignsPayload) ? campaignsPayload : campaignsPayload.campaigns || [];
  const existing = campaigns.find((campaign) => campaign.name === REALTOR_CAMPAIGN_NAME);
  if (existing) return { campaign: { id: Number(existing.id), name: existing.name, status: existing.status }, created: false };

  const campaign = await fetchJson(`https://server.smartlead.ai/api/v1/campaigns/create?api_key=${key}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: REALTOR_CAMPAIGN_NAME }),
  });
  await fetchJson(`https://server.smartlead.ai/api/v1/campaigns/${Number(campaign.id)}/sequences?api_key=${key}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sequences: realtorSequences }),
  });
  await fetchJson(`https://server.smartlead.ai/api/v1/campaigns/${Number(campaign.id)}/schedule?api_key=${key}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ schedule: { timezone: "America/New_York", days: [2, 3, 4], start_hour: "09:15", end_hour: "14:45", min_time_btw_emails: 12 } }),
  });
  return { campaign: { id: Number(campaign.id), name: campaign.name || REALTOR_CAMPAIGN_NAME, status: "DRAFTED" }, created: true };
};

const providerStatus = async () => {
  let campaigns = [];
  if (process.env.SMARTLEAD_API_KEY) {
    try {
      const payload = await fetchJson(`https://server.smartlead.ai/api/v1/campaigns/?api_key=${encodeURIComponent(process.env.SMARTLEAD_API_KEY)}`);
      campaigns = (Array.isArray(payload) ? payload : payload.campaigns || []).filter((campaign) => ["ACTIVE", "PAUSED", "DRAFTED"].includes(campaign.status)).map((campaign) => ({ id: Number(campaign.id), name: campaign.name, status: campaign.status }));
    } catch {}
  }
  const realtorCampaign = campaigns.find((campaign) => campaign.name === REALTOR_CAMPAIGN_NAME) || null;
  return { apollo: Boolean(process.env.APOLLO_API_KEY), zeroBounce: Boolean(process.env.ZEROBOUNCE_API_KEY), smartlead: Boolean(process.env.SMARTLEAD_API_KEY), hubspot: Boolean(process.env.HUBSPOT_ACCESS_TOKEN), n8n: Boolean(process.env.N8N_WEBHOOK_URL), clay: Boolean(process.env.CLAY_API_KEY), campaigns, realtorCampaign };
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  if (!authorized(event)) return json(401, { error: "Invalid dashboard key" });
  try {
    const body = JSON.parse(event.body || "{}");
    if (body.action === "status") return json(200, await providerStatus());
    if (body.action === "search") return json(200, await apolloSearch(body.filters));
    if (body.action === "enrich") return json(200, { leads: await apolloEnrich(body.leads || []) });
    if (body.action === "queue_realtor_campaign") return json(200, await queueRealtorCampaign());
    if (body.action === "verify") {
      const state = await getState(event);
      state.prospects = mergeProspects(state.prospects, await zeroBounceVerify(body.leads || []));
      state.activities.unshift({ id: crypto.randomUUID(), type: "verify", title: "ZeroBounce verification completed", detail: `${(body.leads || []).filter((lead) => lead.email).length} emails checked`, at: new Date().toISOString() });
      return json(200, await saveState(event, state));
    }
    if (body.action === "handoff") return json(200, await smartleadHandoff(event, body.ids || [], body.campaignId));
    return json(400, { error: "Unknown workbench action" });
  } catch (error) {
    console.error("Lead workbench error", error);
    return json(500, { error: error instanceof Error ? error.message : "Lead workbench request failed" });
  }
};
