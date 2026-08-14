import { eventId, getState, json, mergeProspects, saveState, webhookAuthorized } from "../lib/acquisition-store.mjs";

const normalize = (payload) => {
  const lead = payload.lead || {};
  const reply = payload.reply || {};
  const rawEvent = String(payload.event_type || payload.event || payload.type || "UNKNOWN").toUpperCase();
  const type = rawEvent.replace(/^EMAIL_/, "");
  const first = payload.lead_first_name || lead.first_name || lead.firstName || "";
  const last = payload.lead_last_name || lead.last_name || lead.lastName || "";
  return {
    type,
    at: payload.timestamp || payload.event_timestamp || new Date().toISOString(),
    campaignId: Number(payload.campaign_id || 0) || null,
    campaign: payload.campaign_name || "Smartlead campaign",
    smartleadId: Number(payload.lead_id || lead.id || 0) || null,
    email: String(payload.lead_email || lead.email || "").trim().toLowerCase(),
    contact: [first, last].filter(Boolean).join(" ") || payload.lead_email || lead.email || "Unknown contact",
    company: payload.company_name || lead.company_name || lead.company || "Unknown account",
    subject: payload.subject || reply.subject || "",
    message: payload.message || payload.email_body || reply.body || reply.text || "",
  };
};

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  if (!webhookAuthorized(event)) return json(401, { error: "Invalid webhook token" });

  try {
    const payload = JSON.parse(event.body || "{}");
    const incoming = normalize(payload);
    if (!incoming.email) return json(400, { error: "Webhook payload is missing a lead email" });
    const dedupeId = eventId(incoming.email, incoming.type, incoming.at, incoming.campaignId);
    const state = await getState(event);
    if (state.processedEvents.includes(dedupeId)) return json(200, { ok: true, duplicate: true });

    state.prospects = mergeProspects(state.prospects, [{
      company: incoming.company,
      contact: incoming.contact,
      email: incoming.email,
      campaign: incoming.campaign,
      campaignId: incoming.campaignId,
      smartleadId: incoming.smartleadId,
      verified: true,
      source: "Smartlead",
    }]);
    const prospect = state.prospects.find((item) => item.email === incoming.email);
    if (!prospect) return json(500, { error: "Could not match webhook lead" });

    prospect.lastTouch = incoming.at;
    prospect.updatedAt = new Date().toISOString();
    let title = `Smartlead: ${incoming.type.toLowerCase()}`;
    let detail = `${prospect.contact} at ${prospect.company}`;
    if (incoming.type === "SENT") {
      prospect.sent += 1;
      if (["Research", "Verified", "Approved"].includes(prospect.stage)) prospect.stage = "Outreach";
      prospect.nextAction = "Monitor Smartlead sequence";
      title = `Email sent to ${prospect.contact}`;
    } else if (incoming.type === "REPLIED") {
      prospect.stage = "Replied";
      prospect.replySubject = incoming.subject;
      prospect.replyBody = incoming.message;
      prospect.replyAt = incoming.at;
      prospect.nextAction = "Reply to lead";
      prospect.nextActionDate = new Date().toISOString().slice(0, 10);
      title = `${prospect.contact} replied`;
      detail = incoming.subject || incoming.message.slice(0, 180) || detail;
    } else if (incoming.type === "BOUNCED") {
      prospect.bounced = true;
      prospect.stage = "Closed";
      prospect.nextAction = "Find a verified email";
      title = `Email bounced for ${prospect.contact}`;
    } else if (["UNSUBSCRIBED", "UNSUBSCRIBE"].includes(incoming.type)) {
      prospect.stage = "Closed";
      prospect.nextAction = "Do not contact";
      title = `${prospect.contact} unsubscribed`;
    }

    state.processedEvents.unshift(dedupeId);
    state.activities.unshift({ id: dedupeId, type: incoming.type.toLowerCase(), title, detail, prospectId: prospect.id, at: incoming.at });
    await saveState(event, state);
    return json(200, { ok: true });
  } catch (error) {
    console.error("Smartlead webhook error", error);
    return json(500, { error: "Could not process webhook" });
  }
};
