import { isModeratorRequest } from "@/lib/map/auth";
import { errorJson, json } from "@/lib/map/http";
import { getModerationQueue } from "@/lib/map/service";

export const dynamic = "force-dynamic";

/** Pending submissions (with duplicate flags and issues) and community-flagged live pins. Moderator or bot only. */
export async function GET(req: Request) {
  if (!isModeratorRequest(req)) return errorJson("Unauthorized", 401);
  const queue = await getModerationQueue();
  if (!queue) return errorJson("Database not configured", 503);
  return json(queue);
}
