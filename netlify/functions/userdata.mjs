import { getDeployStore } from "@netlify/blobs";

export default async (req, context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };

  if (req.method === "OPTIONS") {
    return new Response("", { status: 200, headers });
  }

  const url = new URL(req.url);
  const userId = url.searchParams.get("uid");

  if (!userId || !["kongkong", "miaomiao"].includes(userId)) {
    return new Response(JSON.stringify({ error: "invalid user" }), { status: 400, headers });
  }

  const store = getDeployStore("reading-data");

  if (req.method === "GET") {
    try {
      const data = await store.get(userId, { type: "json" });
      return new Response(JSON.stringify(data || {}), { headers });
    } catch (e) {
      return new Response(JSON.stringify({}), { headers });
    }
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      await store.setJSON(userId, body);
      return new Response(JSON.stringify({ ok: true }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500, headers });
    }
  }

  return new Response("Method not allowed", { status: 405, headers });
};

export const config = {
  path: "/api/userdata"
};
