import { memoryStore } from "./memory";
import { createSupabaseStore } from "./supabase";
import type { MapStore } from "./types";

export type { MapStore } from "./types";

let cached: MapStore | null | undefined;

/**
 * Picks the data adapter:
 * - Supabase when SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY are set.
 * - The in-memory adapter in `next dev` (NODE_ENV=development) when Supabase isn't configured,
 *   unless MAP_STORE=off.
 * - Otherwise null: the map is read-only with the seed pins and submissions are offline.
 */
export function getStore(): MapStore | null {
  if (cached !== undefined) return cached;
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) cached = createSupabaseStore(url, key);
  else if (process.env.NODE_ENV === "development" && process.env.MAP_STORE !== "off") cached = memoryStore;
  else cached = null;
  return cached;
}
