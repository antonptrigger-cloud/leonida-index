import { BASE_MAP, LIMITS, REGIONS, SUBMIT_TYPES, PIN_TYPES, type PinType, type SubmitType } from "./config";
import type { PinEdit, SubmissionInput } from "./types";

/** Strip control characters and angle brackets, collapse whitespace. Output is always rendered as text. */
export function cleanText(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  let s = value.normalize("NFC");
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g, "");
  s = s.replace(/[<>]/g, "");
  s = multiline ? s.replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n") : s.replace(/\s+/g, " ");
  s = s.trim();
  return s.length > max ? s.slice(0, max) : s;
}

export function cleanGamerTag(value: unknown): string {
  return cleanText(value, LIMITS.gamerTagMax).replace(/\n/g, " ");
}

export type FieldErrors = Partial<Record<keyof SubmissionInput | "position", string>>;

export function isSubmitType(t: unknown): t is SubmitType {
  return typeof t === "string" && (SUBMIT_TYPES as readonly string[]).includes(t);
}

export function isPinType(t: unknown): t is PinType {
  return typeof t === "string" && t in PIN_TYPES;
}

function inBounds(x: unknown, y: unknown): boolean {
  return (
    typeof x === "number" &&
    typeof y === "number" &&
    Number.isFinite(x) &&
    Number.isFinite(y) &&
    x >= 0 &&
    y >= 0 &&
    x <= BASE_MAP.width &&
    y <= BASE_MAP.height
  );
}

/** Shared by the submit form (client) and the API (server). */
export function validateSubmission(raw: unknown): { ok: true; value: SubmissionInput } | { ok: false; errors: FieldErrors } {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const errors: FieldErrors = {};
  const name = cleanText(r.name, LIMITS.nameMax);
  const description = cleanText(r.description, LIMITS.descriptionMax, true);
  const gamerTag = cleanGamerTag(r.gamerTag);
  const occupant = cleanText(r.occupant, LIMITS.occupantMax) || null;
  const regionRaw = cleanText(r.region, 40);
  const region = regionRaw && (REGIONS as readonly string[]).includes(regionRaw) ? regionRaw : null;

  if (!isSubmitType(r.type)) errors.type = "Pick a type.";
  if (name.length < LIMITS.nameMin) errors.name = `Name needs at least ${LIMITS.nameMin} characters.`;
  if (description.length < LIMITS.descriptionMin)
    errors.description = `Description needs at least ${LIMITS.descriptionMin} characters (${description.length} so far).`;
  if (gamerTag.length < LIMITS.gamerTagMin) errors.gamerTag = "Gamer tag / name is required.";
  if (regionRaw && !region) errors.region = "Unknown region.";
  const x = typeof r.x === "number" ? Math.round(r.x * 10) / 10 : NaN;
  const y = typeof r.y === "number" ? Math.round(r.y * 10) / 10 : NaN;
  if (!inBounds(x, y)) errors.position = "Drop a pin on the map first.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    value: {
      type: r.type as SubmitType,
      name,
      description,
      region,
      occupant,
      gamerTag,
      spoiler: r.spoiler === true,
      x,
      y,
    },
  };
}

/** Problems that mean a pending pin must be held rather than approved. */
export function submissionIssues(p: { name: string; description: string; gamerTag: string; type: string }): string[] {
  const issues: string[] = [];
  if (p.description.trim().length < LIMITS.descriptionMin) issues.push(`Description under ${LIMITS.descriptionMin} characters`);
  if (p.name.trim().length < LIMITS.nameMin) issues.push("Name missing or too short");
  if (p.gamerTag.trim().length < LIMITS.gamerTagMin) issues.push("Gamer tag missing");
  if (!isPinType(p.type)) issues.push("Unknown type");
  return issues;
}

export function validateEdit(raw: unknown): PinEdit {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const e: PinEdit = {};
  if (isPinType(r.type)) e.type = r.type;
  if (typeof r.name === "string") e.name = cleanText(r.name, LIMITS.nameMax);
  if (typeof r.description === "string") e.description = cleanText(r.description, LIMITS.descriptionMax, true);
  if ("region" in r) {
    const reg = cleanText(r.region, 40);
    e.region = (REGIONS as readonly string[]).includes(reg) ? reg : null;
  }
  if ("occupant" in r) e.occupant = cleanText(r.occupant, LIMITS.occupantMax) || null;
  if (typeof r.spoiler === "boolean") e.spoiler = r.spoiler;
  if (typeof r.approximate === "boolean") e.approximate = r.approximate;
  if (inBounds(r.x, r.y)) {
    e.x = r.x as number;
    e.y = r.y as number;
  }
  return e;
}

export function validateComment(raw: unknown): { ok: true; gamerTag: string; body: string } | { ok: false; error: string } {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const gamerTag = cleanGamerTag(r.gamerTag);
  const body = cleanText(r.body, LIMITS.commentMax + 1, true);
  if (gamerTag.length < LIMITS.gamerTagMin) return { ok: false, error: "Gamer tag is required." };
  if (body.length < 2) return { ok: false, error: "Comment is empty." };
  if (body.length > LIMITS.commentMax) return { ok: false, error: `Keep comments under ${LIMITS.commentMax} characters.` };
  return { ok: true, gamerTag, body };
}

export function isVoterId(v: unknown): v is string {
  return typeof v === "string" && /^[A-Za-z0-9_-]{8,64}$/.test(v);
}
