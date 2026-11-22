import { SEED_PINS } from "./seed";
import { findDuplicates, type DuplicateMatch } from "./similarity";
import { submissionIssues, validateEdit } from "./validation";
import { getStore } from "./store";
import { toPublicPin, type Pin, type PublicPin } from "./types";

const SEED_BY_ID = new Map(SEED_PINS.map((s) => [s.id, s]));

/**
 * Public name, description, type and category for a seed pin come from the seed file.
 * That lets us relabel imported pins (for example gtadb-L190) without writing to production
 * Supabase. Votes, coordinates, status and the rest stay on the stored row.
 * Seed pins with no category in the file keep any category already stored.
 */
export function applySeedLabels(pin: Pin): Pin {
  const seed = SEED_BY_ID.get(pin.id);
  if (!seed) return pin;
  return {
    ...pin,
    name: seed.name,
    description: seed.description,
    type: seed.type,
    category: seed.category ?? pin.category,
    spoiler: seed.spoiler,
    image: seed.image,
    imageCredit: seed.imageCredit,
    imageAlt: seed.imageAlt,
  };
}

/** Live pins for the public map. Falls back to the seed pins when the database is offline or erroring. */
export async function getLivePins(): Promise<{ pins: PublicPin[]; online: boolean }> {
  const store = getStore();
  if (!store) return { pins: SEED_PINS.map(toPublicPin), online: false };
  try {
    const pins = (await store.listPins(["approved"])).map(applySeedLabels);
    // Seed pins always show, even if the seed migration hasn't been run yet.
    const ids = new Set(pins.map((p) => p.id));
    const merged = [...pins, ...SEED_PINS.filter((s) => !ids.has(s.id))];
    return { pins: merged.map(toPublicPin), online: true };
  } catch (err) {
    console.error("[map] failed to load pins", err);
    return { pins: SEED_PINS.map(toPublicPin), online: false };
  }
}

export interface QueueItem {
  pin: Pin;
  duplicates: DuplicateMatch[];
  issues: string[];
}

export interface ModerationQueue {
  pending: QueueItem[];
  flagged: QueueItem[];
  recent: Pin[];
  counts: { pending: number; flagged: number; live: number };
}

export async function getModerationQueue(): Promise<ModerationQueue | null> {
  const store = getStore();
  if (!store) return null;
  const all = await store.listPins(["pending", "approved", "rejected", "merged", "hidden"]);
  const ids = new Set(all.map((p) => p.id));
  const live = [...all.filter((p) => p.status === "approved"), ...SEED_PINS.filter((s) => !ids.has(s.id))];
  const pendingPins = all.filter((p) => p.status === "pending").sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const pending = pendingPins.map((pin) => ({
    pin,
    duplicates: findDuplicates(pin, [...live, ...pendingPins]),
    issues: submissionIssues(pin),
  }));
  const flagged = live
    .filter((p) => p.needsReview)
    .map((pin) => ({ pin, duplicates: findDuplicates(pin, live), issues: submissionIssues(pin) }));
  const recent = all
    .filter((p) => p.status !== "pending" && p.reviewedAt && !p.isSeed)
    .sort((a, b) => (b.reviewedAt ?? "").localeCompare(a.reviewedAt ?? ""))
    .slice(0, 20);
  return { pending, flagged, recent, counts: { pending: pending.length, flagged: flagged.length, live: live.length } };
}

export const MOD_ACTIONS = ["approve", "reject", "edit", "merge", "clear_flag", "hide", "restore"] as const;
export type ModAction = (typeof MOD_ACTIONS)[number];

export type ModResult = { ok: true; pin: Pin } | { ok: false; status: number; error: string };

export async function moderate(id: string, action: ModAction, body: Record<string, unknown>): Promise<ModResult> {
  const store = getStore();
  if (!store) return { ok: false, status: 503, error: "Database not configured" };
  const pin = await store.getPin(id);
  if (!pin) return { ok: false, status: 404, error: "Pin not found" };
  const now = new Date().toISOString();

  // An edit can ride along with approve.
  const edit = body.edit ? validateEdit(body.edit) : action === "edit" ? validateEdit(body) : {};
  const edited: Pin = { ...pin, ...edit };

  switch (action) {
    case "edit": {
      const updated = await store.updatePin(id, edit);
      return updated ? { ok: true, pin: updated } : { ok: false, status: 404, error: "Pin not found" };
    }
    case "approve": {
      if (pin.status !== "pending" && pin.status !== "hidden") return { ok: false, status: 409, error: `Pin is ${pin.status}` };
      const issues = submissionIssues(edited);
      if (issues.length) return { ok: false, status: 422, error: `Held: ${issues.join("; ")}. Edit it first.` };
      const updated = await store.updatePin(id, { ...edit, status: "approved", reviewedAt: now, needsReview: false, reviewReason: null });
      return updated ? { ok: true, pin: updated } : { ok: false, status: 404, error: "Pin not found" };
    }
    case "reject": {
      const updated = await store.updatePin(id, { status: "rejected", reviewedAt: now, needsReview: false });
      return updated ? { ok: true, pin: updated } : { ok: false, status: 404, error: "Pin not found" };
    }
    case "merge": {
      const target = typeof body.into === "string" ? body.into : null;
      if (!target || target === id) return { ok: false, status: 400, error: "Missing merge target" };
      const t = await store.getPin(target);
      if (!t || t.status !== "approved") return { ok: false, status: 400, error: "Merge target must be a live pin" };
      const updated = await store.updatePin(id, { status: "merged", mergedInto: target, reviewedAt: now });
      return updated ? { ok: true, pin: updated } : { ok: false, status: 404, error: "Pin not found" };
    }
    case "clear_flag": {
      const updated = await store.updatePin(id, { needsReview: false, reviewReason: null, reviewedAt: now });
      return updated ? { ok: true, pin: updated } : { ok: false, status: 404, error: "Pin not found" };
    }
    case "hide": {
      // Unpublish without deleting; votes and comments are kept.
      const updated = await store.updatePin(id, { status: "hidden", reviewedAt: now });
      return updated ? { ok: true, pin: updated } : { ok: false, status: 404, error: "Pin not found" };
    }
    case "restore": {
      if (pin.status === "approved") return { ok: false, status: 409, error: "Pin is already live" };
      const updated = await store.updatePin(id, { status: "pending", reviewedAt: null, mergedInto: null });
      return updated ? { ok: true, pin: updated } : { ok: false, status: 404, error: "Pin not found" };
    }
  }
}
