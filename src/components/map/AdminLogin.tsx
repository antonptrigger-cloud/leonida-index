"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/map/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Sign-in failed");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="flex max-w-sm flex-col gap-3 vc-card rounded-xl p-4">
      <label className="text-xs text-muted">
        Moderator password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          name="password"
          className="mt-1 w-full rounded-md border border-line bg-bg px-2 py-1.5 text-sm outline-none focus:border-blue"
        />
      </label>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
      <button type="submit" disabled={busy} className="vc-btn rounded-md px-3 py-2 text-sm disabled:opacity-60">
        {busy ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
