import { MOD_COOKIE } from "@/lib/map/auth";
import { json } from "@/lib/map/http";

export async function POST() {
  const res = json({ ok: true });
  res.headers.append("Set-Cookie", `${MOD_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`);
  return res;
}
