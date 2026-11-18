import { COMMENT_IP_LIMIT } from "@/lib/map/config";
import { errorJson, ipHash, json, OFFLINE_MESSAGE, readJson } from "@/lib/map/http";
import { getStore } from "@/lib/map/store";
import { validateComment } from "@/lib/map/validation";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const store = getStore();
  if (!store) return json({ comments: [], online: false });
  const { id } = await ctx.params;
  return json({ comments: await store.listComments(id), online: true });
}

export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const store = getStore();
  if (!store) return errorJson(OFFLINE_MESSAGE, 503);
  const { id } = await ctx.params;
  const parsed = validateComment(await readJson(req));
  if (!parsed.ok) return errorJson(parsed.error, 400);
  const res = await store.addComment(id, parsed.gamerTag, parsed.body, ipHash(req), COMMENT_IP_LIMIT);
  if (!res.ok) return errorJson(res.error === "rate_limited" ? "Too many comments, try again soon." : "Pin not found", res.error === "rate_limited" ? 429 : 404);
  return json({ comment: res.value }, 201);
}
