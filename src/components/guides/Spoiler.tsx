"use client";

import { useEffect, useId, useState } from "react";

const EVENT = "lvg:spoilers";

/**
 * Blurs story spoilers until the reader asks to see them.
 * The text stays in the HTML (so it is crawlable) but is blurred, inert and hidden from
 * assistive tech until revealed. <SpoilerAll> reveals or hides every block on the page.
 */
export function Spoiler({ label = "Story spoilers", children }: { label?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    const on = (e: Event) => setOpen(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);

  return (
    <div className="vc-spoiler" data-open={open}>
      <div id={id} className="vc-spoiler__body" aria-hidden={!open} inert={!open}>
        {children}
      </div>
      {open ? (
        <button type="button" className="vc-chip mt-3x" onClick={() => setOpen(false)} aria-controls={id} aria-expanded>
          Hide spoilers
        </button>
      ) : (
        <div className="vc-spoiler__cover">
          <button type="button" className="vc-btn-ghost vc-spoiler__btn" onClick={() => setOpen(true)} aria-controls={id} aria-expanded={false}>
            Reveal {label.toLowerCase()}
          </button>
        </div>
      )}
    </div>
  );
}

export function SpoilerAll() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      className="vc-chip"
      aria-pressed={on}
      onClick={() => {
        const next = !on;
        setOn(next);
        window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
      }}
    >
      {on ? "Hide all spoilers" : "Show all spoilers"}
    </button>
  );
}
