// Regenerates the category seed block of supabase/migrations/20261119000500_pin_categories.sql
// from src/lib/map/seed-pins.json (only seeds that carry a `category`).
// Usage: node scripts/gen-category-sql.mjs > /tmp/cat.sql
// Idempotent: new seed rows are inserted; rows that already exist (including moderator edits) only get their category set.
import { readFileSync } from "node:fs";

const pins = JSON.parse(readFileSync(new URL("../src/lib/map/seed-pins.json", import.meta.url), "utf8")).filter((p) => p.category);
const q = (v) => (v === null || v === undefined ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const rows = pins.map(
  (p) =>
    `  (${q(p.id)}, 'approved', ${q(p.type)}, ${q(p.name)}, ${q(p.description)}, ${q(p.region)}, ${p.x}, ${p.y}, 'Leonida Vice Guide', true, ${p.approximate}, ${q(p.source ?? "official")}, ${q(p.category)}, '2026-11-19T00:00:00Z', '2026-11-19T00:00:00Z')`,
);
console.log(`insert into public.pins (id, status, type, name, description, region, x, y, gamer_tag, is_seed, approximate, source, category, created_at, reviewed_at)
values
${rows.join(",\n")}
on conflict (id) do update set category = excluded.category;`);
