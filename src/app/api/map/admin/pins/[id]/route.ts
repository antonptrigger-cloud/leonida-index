import { isModeratorRequest } from "@/lib/map/auth";
import { errorJson, json, readJson } from "@/lib/map/http";
import { MOD_ACTIONS, moderate, type ModAction } from "@/lib/map/service";

/**
 * POST { action: "approve" | "reject" | "edit" | "merge" | "clear_flag" | "hide" | "restore", ... }
 * - edit: send the fields to change (type, name, description, region, occupant, spoiler, approximate, x, y)
 * - approve: optional { edit: {...} } applied in the same step
 * - merge: { into: "<live pin id>" } marks the submission as a duplicate of an existing pin
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!isModeratorRequest(req)) return errorJson("Unauthorized", 401);
  const { id } = await ctx.params;
  const body = ((await readJson(req)) ?? {}) as Record<string, unknown>;
  const action = body.action as ModAction;
  if (!MOD_ACTIONS.includes(action)) return errorJson(`action must be one of ${MOD_ACTIONS.join(", ")}`, 400);
  const res = await moderate(id, action, body);
  if (!res.ok) return errorJson(res.error, res.status);
  return json({ ok: true, pin: res.pin });
}
