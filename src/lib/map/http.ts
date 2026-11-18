import { createHash } from "node:crypto";

export function json(data: unknown, status = 200, headers?: Record<string, string>): Response {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export function errorJson(error: string, status: number, extra?: Record<string, unknown>): Response {
  return json({ error, ...extra }, status);
}

export async function readJson(req: Request): Promise<unknown> {
  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > 20_000) return null;
  try {
    return await req.json();
  } catch {
    return null;
  }
}

/** Hashed client IP for light rate limiting. Raw IPs are never stored. */
export function ipHash(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = fwd || req.headers.get("x-real-ip") || "unknown";
  const salt = process.env.MOD_SESSION_SECRET || "leonida-vice-guide";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

export const OFFLINE_MESSAGE = "Community submissions are offline right now. The map is read-only.";
