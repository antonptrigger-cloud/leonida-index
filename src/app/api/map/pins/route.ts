import { json } from "@/lib/map/http";
import { getLivePins } from "@/lib/map/service";

export const dynamic = "force-dynamic";

export async function GET() {
  const { pins, online } = await getLivePins();
  return json({ pins, online }, 200, { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=60" });
}
