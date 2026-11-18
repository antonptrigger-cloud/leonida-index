import { SUBMISSION_WINDOW_MINUTES } from "@/lib/map/config";
import { errorJson, ipHash, json, OFFLINE_MESSAGE, readJson } from "@/lib/map/http";
import { getStore } from "@/lib/map/store";
import { validateSubmission } from "@/lib/map/validation";

export async function POST(req: Request) {
  const store = getStore();
  if (!store) return errorJson(OFFLINE_MESSAGE, 503);
  const parsed = validateSubmission(await readJson(req));
  if (!parsed.ok) return errorJson("Please fix the highlighted fields.", 400, { fields: parsed.errors });
  const res = await store.createSubmission(parsed.value, ipHash(req), SUBMISSION_WINDOW_MINUTES);
  if (!res.ok) {
    if (res.error === "rate_limited") {
      const mins = res.retryAfterMinutes;
      return errorJson(
        `One submission per gamer tag per hour.${mins ? ` Try again in about ${mins} minute${mins === 1 ? "" : "s"}.` : ""}`,
        429,
        { retryAfterMinutes: mins ?? null },
      );
    }
    return errorJson("Submission rejected.", 400);
  }
  return json({ ok: true, id: res.value.id, status: res.value.status }, 201);
}
