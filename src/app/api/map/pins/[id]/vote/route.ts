import { FLAG_DOWN_UP_RATIO, FLAG_MIN_DOWNVOTES, VOTE_IP_LIMIT } from "@/lib/map/config";
import { errorJson, ipHash, json, OFFLINE_MESSAGE, readJson } from "@/lib/map/http";
import { getStore } from "@/lib/map/store";
import { isVoterId } from "@/lib/map/validation";

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const store = getStore();
  if (!store) return errorJson(OFFLINE_MESSAGE, 503);
  const { id } = await ctx.params;
  const body = (await readJson(req)) as { voterId?: unknown; value?: unknown } | null;
  if (!body || !isVoterId(body.voterId)) return errorJson("Missing voter id", 400);
  const value = body.value === 1 || body.value === -1 || body.value === 0 ? body.value : null;
  if (value === null) return errorJson("Vote must be 1, -1 or 0", 400);
  const res = await store.vote(id, body.voterId, value, ipHash(req), VOTE_IP_LIMIT, {
    minDown: FLAG_MIN_DOWNVOTES,
    ratio: FLAG_DOWN_UP_RATIO,
  });
  if (!res.ok) return errorJson(res.error === "rate_limited" ? "Slow down a little." : "Pin not found", res.error === "rate_limited" ? 429 : 404);
  // needsReview is internal; don't leak it to the public.
  return json({ upCount: res.value.upCount, downCount: res.value.downCount, myVote: res.value.myVote });
}
