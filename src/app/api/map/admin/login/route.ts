import { checkPassword, createSessionToken, MOD_COOKIE, MOD_SESSION_HOURS, moderationConfigured } from "@/lib/map/auth";
import { errorJson, json, readJson } from "@/lib/map/http";

const failures = new Map<string, { n: number; until: number }>();

export async function POST(req: Request) {
  if (!moderationConfigured()) return errorJson("Moderation is not configured (set MOD_PASSWORD and MOD_SESSION_SECRET).", 503);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const f = failures.get(ip);
  if (f && f.n >= 5 && f.until > Date.now()) return errorJson("Too many attempts. Wait a few minutes.", 429);
  const body = (await readJson(req)) as { password?: unknown } | null;
  if (!checkPassword(body?.password)) {
    failures.set(ip, { n: (f && f.until > Date.now() ? f.n : 0) + 1, until: Date.now() + 10 * 60_000 });
    return errorJson("Wrong password.", 401);
  }
  failures.delete(ip);
  const token = createSessionToken();
  if (!token) return errorJson("Moderation is not configured.", 503);
  const res = json({ ok: true });
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.headers.append(
    "Set-Cookie",
    `${MOD_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MOD_SESSION_HOURS * 3600}${secure}`,
  );
  return res;
}
