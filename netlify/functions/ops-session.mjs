import { authorized, json, opsSessionToken } from "../lib/acquisition-store.mjs";

const cookie = (value, maxAge) => `rag_ops_session=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;

const response = (statusCode, body, setCookie) => ({
  ...json(statusCode, body),
  multiValueHeaders: setCookie ? { "set-cookie": [setCookie] } : undefined,
});

export const handler = async (event) => {
  if (event.httpMethod === "GET") return json(200, { authenticated: authorized(event) });
  if (event.httpMethod === "POST") {
    if (!authorized(event)) return json(401, { error: "Invalid dashboard key" });
    return response(200, { authenticated: true }, cookie(opsSessionToken(), 60 * 60 * 24 * 30));
  }
  if (event.httpMethod === "DELETE") return response(200, { authenticated: false }, cookie("", 0));
  return json(405, { error: "Method not allowed" });
};
