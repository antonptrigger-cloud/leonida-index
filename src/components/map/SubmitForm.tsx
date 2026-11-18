"use client";

import { useEffect, useState } from "react";
import { LIMITS, PIN_TYPES, REGIONS, SUBMIT_TYPES, type SubmitType } from "@/lib/map/config";
import { validateSubmission, type FieldErrors } from "@/lib/map/validation";
import { getSavedGamerTag, saveGamerTag } from "./local";

const field = "w-full rounded-md border border-[#2a2a2e] bg-[#0b0b0c] px-2 py-1.5 text-sm outline-none focus:border-[#ffd36b]";

export function SubmitForm({
  draft,
  onCancel,
  onDone,
}: {
  draft: { x: number; y: number } | null;
  onCancel: () => void;
  onDone: () => void;
}) {
  const [type, setType] = useState<SubmitType | "">("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("");
  const [occupant, setOccupant] = useState("");
  const [gamerTag, setGamerTag] = useState("");
  const [spoiler, setSpoiler] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [serverFields, setServerFields] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGamerTag((t) => t || getSavedGamerTag());
  }, []);

  const payload = { type, name, description, region: region || null, occupant: occupant || null, gamerTag, spoiler, x: draft?.x, y: draft?.y };
  // Live client-side validation once the user has tried to submit.
  const live = attempted ? validateSubmission(payload) : null;
  const errors: FieldErrors = { ...serverFields, ...(live && !live.ok ? live.errors : {}) };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);
    setAttempted(true);
    setServerFields({});
    const check = validateSubmission(payload);
    if (!check.ok) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/map/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(check.value),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setServerFields(data.fields);
        setServerError(data.error ?? "Submission failed");
        return;
      }
      saveGamerTag(check.value.gamerTag);
      setDone(true);
    } catch {
      setServerError("Network error, try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col gap-3" data-testid="submit-done">
        <h2 className="text-xl font-semibold">Thanks, it&apos;s in the queue</h2>
        <p className="text-sm text-[#cfc9be]">
          Your pin is pending review. Once a moderator approves it, it goes live with “First marked by {gamerTag.trim()}”.
        </p>
        <button onClick={onDone} className="self-start rounded-md border border-[#2a2a2e] px-3 py-1.5 text-sm hover:border-[#ffd36b]">
          Back to the map
        </button>
      </div>
    );
  }

  const err = (k: keyof FieldErrors) => (errors[k] ? <p className="mt-1 text-xs text-[#ff2d7b]">{errors[k]}</p> : null);

  return (
    <form onSubmit={submit} className="flex flex-col gap-3" data-testid="submit-form" noValidate>
      <div className="flex items-start justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Submit a location</h2>
        <button type="button" onClick={onCancel} className="text-sm text-[#9a958c] hover:text-[#ff2d7b]" aria-label="Cancel">
          ✕
        </button>
      </div>
      <p className={`rounded border px-2 py-1.5 text-xs ${draft ? "border-[#3bb273] text-[#3bb273]" : "border-[#ffd36b] text-[#ffd36b]"}`}>
        {draft ? `Pin dropped. Drag it to fine-tune (${Math.round(draft.x)}, ${Math.round(draft.y)}).` : "Click the map to drop your pin."}
      </p>
      {err("position")}

      <label className="text-xs text-[#9a958c]">
        Type *
        <select value={type} onChange={(e) => setType(e.target.value as SubmitType)} className={field} name="type">
          <option value="">Choose…</option>
          {SUBMIT_TYPES.map((t) => (
            <option key={t} value={t}>
              {PIN_TYPES[t].label.replace(/s$/, "")}
            </option>
          ))}
        </select>
        {err("type")}
      </label>

      <label className="text-xs text-[#9a958c]">
        Name *
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={LIMITS.nameMax} className={field} name="name" />
        {err("name")}
      </label>

      <label className="text-xs text-[#9a958c]">
        Description * <span className="text-[#6f6b64]">(min {LIMITS.descriptionMin} characters)</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={LIMITS.descriptionMax}
          rows={4}
          className={field}
          name="description"
        />
        <span className={`block text-right ${description.trim().length < LIMITS.descriptionMin ? "text-[#6f6b64]" : "text-[#3bb273]"}`}>
          {description.trim().length}/{LIMITS.descriptionMin}+
        </span>
        {err("description")}
      </label>

      <label className="text-xs text-[#9a958c]">
        Region <span className="text-[#6f6b64]">(optional)</span>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className={field} name="region">
          <option value="">Not sure</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {err("region")}
      </label>

      <label className="text-xs text-[#9a958c]">
        Who / what is there <span className="text-[#6f6b64]">(optional)</span>
        <input value={occupant} onChange={(e) => setOccupant(e.target.value)} maxLength={LIMITS.occupantMax} className={field} name="occupant" />
      </label>

      <label className="text-xs text-[#9a958c]">
        Gamer tag / name *
        <input value={gamerTag} onChange={(e) => setGamerTag(e.target.value)} maxLength={LIMITS.gamerTagMax} className={field} name="gamerTag" />
        {err("gamerTag")}
      </label>

      <label className="flex items-center gap-2 text-xs text-[#9a958c]">
        <input type="checkbox" checked={spoiler} onChange={(e) => setSpoiler(e.target.checked)} className="accent-[#ff2d7b]" name="spoiler" />
        Contains story spoilers
      </label>

      {serverError ? (
        <p className="text-sm text-[#ff2d7b]" data-testid="submit-error">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-md bg-[#ff2d7b] px-3 py-2 text-sm font-semibold text-white hover:bg-[#ff4f92] disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send for review"}
      </button>
      <p className="text-xs text-[#6f6b64]">
        Pins are checked before they go public. One submission per gamer tag per hour. No leaks or datamined content, please.
      </p>
    </form>
  );
}
