import { json } from "../lib/acquisition-store.mjs";
import { getClient, publicClient } from "../lib/client-store.mjs";

export const handler = async (event) => {
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" });
  const client = await getClient(event, event.queryStringParameters?.client);
  if (!client) return json(404, { error: "Client payment profile not found" });
  return json(200, { client: publicClient(client) });
};

