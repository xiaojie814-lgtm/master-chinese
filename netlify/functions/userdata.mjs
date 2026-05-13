import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const store = getStore("reading-data");
  const url = new URL(req.url);
  const userId = url.searchParams.get("uid");

  if (!userId || !["kongkong", "miaomiao"].includes(userId)) {
    return new Response(JSON.stringify({ error: "invalid user" }), { status: 400 });
  }

  if (req.method === "GET") {
    try {
      const data = await store.get(userId, { type: "json" });
      return new Response(JSON.stringify(data || {}), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({}), {
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      await store.setJSON(userId, body);
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = {
  path: "/api/userdata"
};
