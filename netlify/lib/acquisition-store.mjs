import { connectLambda, getStore } from "@netlify/blobs";
import { createHash, timingSafeEqual } from "node:crypto";

const STORE_NAME = "acquisition-command-center";
const STATE_KEY = "pipeline-v1";
const stages = ["Research", "Verified", "Approved", "Outreach", "Replied", "Meeting", "Proof", "Customer", "Nurture", "Closed"];

export const json = (statusCode, body) => ({
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

export const authorized = (event) => {
  const expected = process.env.OPS_DASHBOARD_KEY;
  return Boolean(expected && safeEqual(event.headers?.["x-ops-key"], expected));
};

export const webhookAuthorized = (event) => {
  const expected = process.env.SMARTLEAD_WEBHOOK_SECRET;
  const supplied = event.queryStringParameters?.token;
  return Boolean(expected && safeEqual(supplied, expected));
};

export const emptyState = () => ({ version: 1, prospects: [], activities: [], processedEvents: [], updatedAt: new Date().toISOString() });

export const cleanProspect = (value = {}) => {
  const requestedStage = String(value.stage || "Research");
  return {
    id: String(value.id || crypto.randomUUID()),
    company: String(value.company || "").trim(),
    contact: String(value.contact || "").trim(),
    email: String(value.email || "").trim().toLowerCase(),
    industry: String(value.industry || "Unclassified").trim(),
    score: Math.min(100, Math.max(0, Number(value.score || 0))),
    stage: stages.includes(requestedStage) ? requestedStage : "Research",
    verified: Boolean(value.verified),
    campaign: String(value.campaign || "").trim(),
    campaignId: value.campaignId == null ? null : Number(value.campaignId),
    smartleadId: value.smartleadId == null ? null : Number(value.smartleadId),
    sent: Math.max(0, Number(value.sent || 0)),
    bounced: Boolean(value.bounced),
    lastTouch: String(value.lastTouch || ""),
    nextAction: String(value.nextAction || "Research account").trim(),
    nextActionDate: String(value.nextActionDate || ""),
    workflow: String(value.workflow || "").trim(),
    mrr: Math.max(0, Number(value.mrr || 0)),
    notes: String(value.notes || "").trim(),
    replySubject: String(value.replySubject || "").trim(),
    replyBody: String(value.replyBody || "").trim(),
    replyAt: String(value.replyAt || ""),
    source: String(value.source || "Manual"),
    updatedAt: String(value.updatedAt || new Date().toISOString()),
  };
};

export const eventId = (...parts) => createHash("sha256").update(parts.map((part) => String(part || "")).join("|"), "utf8").digest("hex").slice(0, 24);

export const getState = async (event) => {
  connectLambda(event);
  const store = getStore(STORE_NAME);
  const state = await store.get(STATE_KEY, { type: "json" });
  return state && Array.isArray(state.prospects) ? state : emptyState();
};

export const saveState = async (event, state) => {
  connectLambda(event);
  const store = getStore(STORE_NAME);
  const next = {
    version: 1,
    prospects: (state.prospects || []).map(cleanProspect),
    activities: (state.activities || []).slice(0, 500),
    processedEvents: (state.processedEvents || []).slice(0, 1000),
    updatedAt: new Date().toISOString(),
  };
  await store.setJSON(STATE_KEY, next);
  return next;
};

export const mergeProspects = (existing, incoming) => {
  const merged = [...existing.map(cleanProspect)];
  for (const raw of incoming) {
    const record = cleanProspect(raw);
    const found = merged.find((prospect) =>
      (record.email && prospect.email === record.email)
      || (record.smartleadId && prospect.smartleadId === record.smartleadId)
      || (prospect.company.toLowerCase() === record.company.toLowerCase() && prospect.contact.toLowerCase() === record.contact.toLowerCase()),
    );
    if (found) Object.assign(found, cleanProspect({ ...found, ...raw, id: found.id }));
    else merged.push(record);
  }
  return merged;
};
