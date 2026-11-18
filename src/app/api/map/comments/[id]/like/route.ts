import { VOTE_IP_LIMIT } from "@/lib/map/config";
import { errorJson, ipHash, json, OFFLINE_MESSAGE, readJson } from "@/lib/map/http";
import { getStore } from "@/lib/map/store";
import { isVoterId } from "@/lib/map/validation";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const store = getStore();
  if (!store) return errorJson(OFFLINE_MESSAGE, 503);
  const { id } = await ctx.params;
  const body = (await readJson(req)) as { voterId?: unknown } | null;
  if (!body || !isVoterId(body.voterId)) return errorJson("Missing voter id", 400);
  const res = await store.toggleCommentLike(id, body.voterId, ipHash(req), VOTE_IP_LIMIT);
  if (!res.ok) return errorJson(res.error === "rate_limited" ? "Slow down a little." : "Comment not found", res.error === "rate_limited" ? 429 : 404);
  return json(res.value);
}
