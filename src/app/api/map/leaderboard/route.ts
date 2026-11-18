import { json } from "@/lib/map/http";
import { getStore } from "@/lib/map/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = getStore();
  if (!store) return json({ approved: [], firstMarked: [], online: false });
  return json({ ...(await store.leaderboard(25)), online: true });
}
