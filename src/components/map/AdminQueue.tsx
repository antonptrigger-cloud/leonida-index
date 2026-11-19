"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LIMITS, PIN_TYPES, REGIONS, TILES, type PinType } from "@/lib/map/config";
import { toSource } from "@/lib/map/geo";
import type { ModerationQueue, QueueItem } from "@/lib/map/service";
import type { Pin } from "@/lib/map/types";

const field = "mt-1x w-full border border-pink/25 bg-[#0c0a10] px-3x py-2x text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-blue";
const btn = "rounded-md border px-3 py-1.5 text-xs font-medium disabled:opacity-40";

/** Small crop of the base map centred on the pin. */
function MiniMap({ id, x, y }: { id: string; x: number; y: number }) {
  const w = 168;
  const h = 112;
  // Show the whole base map at ~1.5x the original 1168px width, centred on the pin.
  const bgW = 1752;
  const bgH = (bgW * TILES.height) / TILES.width;
  const { sx, sy } = toSource(x, y, undefined, id);
  const px = (sx / TILES.width) * bgW;
  const py = (sy / TILES.height) * bgH;
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded border border-line"
      style={{
        width: w,
        height: h,
        backgroundImage: `url(${TILES.preview.url})`,
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${w / 2 - px}px ${h / 2 - py}px`,
        backgroundRepeat: "no-repeat",
        backgroundColor: TILES.background,
      }}
      aria-label={`Map position ${Math.round(x)}, ${Math.round(y)}`}
    >
      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-bg bg-orange shadow-[0_0_0_2px_#ff2d78]" />
    </div>
  );
}

function EditForm({ pin, onSave, onCancel, busy }: { pin: Pin; onSave: (edit: Partial<Pin>, approve: boolean) => void; onCancel: () => void; busy: boolean }) {
  const [type, setType] = useState<PinType>(pin.type);
  const [name, setName] = useState(pin.name);
  const [description, setDescription] = useState(pin.description);
  const [region, setRegion] = useState(pin.region ?? "");
  const [occupant, setOccupant] = useState(pin.occupant ?? "");
  const [spoiler, setSpoiler] = useState(pin.spoiler);
  const [approximate, setApproximate] = useState(pin.approximate);
  const edit = { type, name, description, region: region || null, occupant: occupant || null, spoiler, approximate };
  return (
    <div className="mt-3 grid gap-2 rounded-md border border-line p-3 sm:grid-cols-2" data-testid="edit-form">
      <label className="text-xs text-muted">
        Type
        <select value={type} onChange={(e) => setType(e.target.value as PinType)} className={field}>
          {(Object.keys(PIN_TYPES) as PinType[]).map((t) => (
            <option key={t} value={t}>
              {PIN_TYPES[t].label}
            </option>
          ))}
        </select>
      </label>
      <label className="text-xs text-muted">
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={LIMITS.nameMax} className={field} name="edit-name" />
      </label>
      <label className="text-xs text-muted sm:col-span-2">
        Description ({description.trim().length} chars)
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} maxLength={LIMITS.descriptionMax} className={field} name="edit-description" />
      </label>
      <label className="text-xs text-muted">
        Region
        <select value={region} onChange={(e) => setRegion(e.target.value)} className={field}>
          <option value="">None</option>
          {REGIONS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <label className="text-xs text-muted">
        Who / what is there
        <input value={occupant} onChange={(e) => setOccupant(e.target.value)} maxLength={LIMITS.occupantMax} className={field} />
      </label>
      <div className="flex gap-4 text-xs text-muted">
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={spoiler} onChange={(e) => setSpoiler(e.target.checked)} className="accent-pink" /> Spoiler
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" checked={approximate} onChange={(e) => setApproximate(e.target.checked)} className="accent-pink" /> Approximate
        </label>
      </div>
      <div className="flex flex-wrap justify-end gap-2 sm:col-span-2">
        <button onClick={onCancel} className={`${btn} border-line text-muted`} disabled={busy}>
          Cancel
        </button>
        <button onClick={() => onSave(edit, false)} className={`${btn} border-orange text-orange`} disabled={busy}>
          Save
        </button>
        {pin.status === "pending" ? (
          <button onClick={() => onSave(edit, true)} className={`${btn} border-ok bg-ok text-bg`} disabled={busy}>
            Save &amp; approve
          </button>
        ) : null}
      </div>
    </div>
  );
}

function Card({ item, mode, onAction, busy }: { item: QueueItem; mode: "pending" | "flagged"; onAction: (id: string, body: Record<string, unknown>) => Promise<void>; busy: boolean }) {
  const { pin, duplicates, issues } = item;
  const [editing, setEditing] = useState(false);
  const held = issues.length > 0;
  return (
    <li className="vc-card p-4" data-testid={`${mode}-item`}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <MiniMap id={pin.id} x={pin.x} y={pin.y} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-[0.2em]" style={{ color: PIN_TYPES[pin.type]?.color }}>
              {PIN_TYPES[pin.type]?.label ?? pin.type}
            </span>
            {pin.region ? <span className="text-xs text-muted">· {pin.region}</span> : null}
            {pin.spoiler ? <span className="rounded bg-[#a663cc]/20 px-1.5 text-[10px] text-[#d6b2ef]">spoiler</span> : null}
          </div>
          <h3 className="vc-display truncate text-2xl leading-tight text-ink" data-testid="queue-name">
            {pin.name}
          </h3>
          <p className="whitespace-pre-line break-words text-sm text-ink-2">{pin.description}</p>
          {pin.occupant ? <p className="mt-1 text-xs text-muted">Who/what: {pin.occupant}</p> : null}
          <p className="mt-2 text-xs text-muted">
            by <span className="text-ink">{pin.gamerTag}</span> · {new Date(pin.createdAt).toLocaleString()} · ({Math.round(pin.x)}, {Math.round(pin.y)})
            {mode === "flagged" ? (
              <>
                {" "}
                · 👍 {pin.upCount} 👎 {pin.downCount}
              </>
            ) : null}
          </p>

          <div className="mt-2 flex flex-col gap-1">
            {mode === "flagged" ? (
              <p className="rounded border border-pink/50 bg-pink/10 px-2 py-1 text-xs text-[#ff8fb8]" data-testid="flag-reason">
                Flagged for re-review: {pin.reviewReason ?? "community downvotes"}. Still live; nothing is deleted automatically.
              </p>
            ) : null}
            {held ? (
              <p className="rounded border border-orange/50 bg-orange/10 px-2 py-1 text-xs text-[#ffb27f]" data-testid="hold-flag">
                Hold: {issues.join("; ")}
              </p>
            ) : null}
            {duplicates.map((d) => (
              <div key={d.id} className="flex flex-wrap items-center gap-2 rounded border border-orange/50 bg-orange/10 px-2 py-1 text-xs text-orange" data-testid="dup-flag">
                Possible duplicate of “{d.name}” ({d.status}) · {d.distanceM} m away · {Math.round(d.similarity * 100)}% name match
                {mode === "pending" && d.status === "approved" ? (
                  <button onClick={() => onAction(pin.id, { action: "merge", into: d.id })} disabled={busy} className="ml-auto underline hover:text-ink">
                    Merge into it
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {mode === "pending" ? (
              <>
                <button
                  onClick={() => onAction(pin.id, { action: "approve" })}
                  disabled={busy || held}
                  title={held ? "Fix the held issues first (Edit)" : undefined}
                  className={`${btn} border-ok bg-ok text-bg`}
                >
                  Approve
                </button>
                <button onClick={() => onAction(pin.id, { action: "reject" })} disabled={busy} className={`${btn} border-pink text-pink`}>
                  Reject
                </button>
              </>
            ) : (
              <>
                <button onClick={() => onAction(pin.id, { action: "clear_flag" })} disabled={busy} className={`${btn} border-ok text-ok`}>
                  Keep (clear flag)
                </button>
                <button onClick={() => onAction(pin.id, { action: "hide" })} disabled={busy} className={`${btn} border-pink text-pink`}>
                  Unpublish
                </button>
              </>
            )}
            <button onClick={() => setEditing((v) => !v)} disabled={busy} className={`${btn} border-line text-ink`}>
              Edit
            </button>
          </div>
          {editing ? (
            <EditForm
              pin={pin}
              busy={busy}
              onCancel={() => setEditing(false)}
              onSave={async (edit, approve) => {
                await onAction(pin.id, approve ? { action: "approve", edit } : { action: "edit", ...edit });
                setEditing(false);
              }}
            />
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function AdminQueue({ initial }: { initial: ModerationQueue }) {
  const router = useRouter();
  const [queue, setQueue] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  async function reload() {
    const res = await fetch("/api/map/admin/queue", { cache: "no-store" });
    if (res.status === 401) return router.refresh();
    if (res.ok) setQueue(await res.json());
  }

  async function onAction(id: string, body: Record<string, unknown>) {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/map/admin/pins/${encodeURIComponent(id)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) setMessage({ text: data.error ?? "Action failed", error: true });
      else setMessage({ text: `“${data.pin.name}” is now ${data.pin.status}${data.pin.needsReview ? " (flagged)" : ""}.`, error: false });
      await reload();
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/map/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-6" data-testid="admin-queue">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span className="rounded-full border border-line px-3 py-1">
          Pending <strong data-testid="pending-count">{queue.counts.pending}</strong>
        </span>
        <span className="rounded-full border border-line px-3 py-1">
          Flagged <strong>{queue.counts.flagged}</strong>
        </span>
        <span className="rounded-full border border-line px-3 py-1">
          Live <strong>{queue.counts.live}</strong>
        </span>
        <button onClick={reload} className="text-muted hover:text-pink">
          Refresh
        </button>
        <button onClick={logout} className="ml-auto text-muted hover:text-pink">
          Sign out
        </button>
      </div>
      {message ? (
        <p className={`text-sm ${message.error ? "text-pink" : "text-ok"}`} data-testid="admin-message">
          {message.text}
        </p>
      ) : null}

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-turq">Pending submissions</h2>
        {queue.pending.length === 0 ? (
          <p className="text-sm text-muted">Queue is empty.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {queue.pending.map((item) => (
              <Card key={item.pin.id} item={item} mode="pending" onAction={onAction} busy={busy} />
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-turq">Flagged by the community</h2>
        {queue.flagged.length === 0 ? (
          <p className="text-sm text-muted">No live pins flagged.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {queue.flagged.map((item) => (
              <Card key={item.pin.id} item={item} mode="flagged" onAction={onAction} busy={busy} />
            ))}
          </ul>
        )}
      </section>

      {queue.recent.length ? (
        <section>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-turq">Recent decisions</h2>
          <ul className="flex flex-col text-sm">
            {queue.recent.map((p) => (
              <li key={p.id} className="flex items-center gap-3 border-b border-line py-2">
                <span className="w-20 text-xs uppercase text-muted">{p.status}</span>
                <span className="truncate">{p.name}</span>
                <span className="text-xs text-faint">by {p.gamerTag}</span>
                {p.status !== "approved" ? (
                  <button onClick={() => onAction(p.id, { action: "restore" })} disabled={busy} className="ml-auto text-xs text-muted hover:text-pink">
                    Back to queue
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
