import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Moderator auth without user accounts:
 * - Browser: POST the MOD_PASSWORD to /api/map/admin/login, which sets an
 *   httpOnly cookie "<expiry>.<hmac>" signed with MOD_SESSION_SECRET.
 * - Bot: send "Authorization: Bearer <MOD_API_TOKEN>" (falls back to MOD_PASSWORD
 *   when MOD_API_TOKEN isn't set).
 */

export const MOD_COOKIE = "lvg_mod";
export const MOD_SESSION_HOURS = 12;

function sessionSecret(): string | null {
  const s = process.env.MOD_SESSION_SECRET;
  if (s && s.length >= 16) return s;
  // Local dev convenience only: derive a secret from the password.
  if (process.env.NODE_ENV !== "production" && process.env.MOD_PASSWORD) {
    return createHash("sha256").update(`dev-session:${process.env.MOD_PASSWORD}`).digest("hex");
  }
  return null;
}

export function moderationConfigured(): boolean {
  return Boolean(process.env.MOD_PASSWORD && sessionSecret());
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkPassword(password: unknown): boolean {
  const expected = process.env.MOD_PASSWORD;
  return typeof password === "string" && !!expected && safeEqual(password, expected);
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(): string | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const exp = String(Date.now() + MOD_SESSION_HOURS * 3600_000);
  return `${exp}.${sign(exp, secret)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  const secret = sessionSecret();
  if (!token || !secret || !process.env.MOD_PASSWORD) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp, secret));
}

export function verifyBearer(header: string | null): boolean {
  if (!header?.startsWith("Bearer ")) return false;
  const expected = process.env.MOD_API_TOKEN || process.env.MOD_PASSWORD;
  return !!expected && safeEqual(header.slice(7).trim(), expected);
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return null;
}

/** True when the request carries a valid moderator cookie or bot bearer token. */
export function isModeratorRequest(req: Request): boolean {
  if (!moderationConfigured()) return false;
  return verifyBearer(req.headers.get("authorization")) || verifySessionToken(readCookie(req.headers.get("cookie"), MOD_COOKIE));
}
