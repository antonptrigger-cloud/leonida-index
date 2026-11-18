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
    <form onSubmit={submit} className="flex max-w-sm flex-col gap-3 rounded-lg border border-[#2a2a2e] bg-[#161618] p-4">
      <label className="text-xs text-[#9a958c]">
        Moderator password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          name="password"
          className="mt-1 w-full rounded-md border border-[#2a2a2e] bg-[#0b0b0c] px-2 py-1.5 text-sm outline-none focus:border-[#ffd36b]"
        />
      </label>
      {error ? <p className="text-sm text-[#ff2d7b]">{error}</p> : null}
      <button type="submit" disabled={busy} className="rounded-md bg-[#ff2d7b] px-3 py-2 text-sm font-semibold text-white hover:bg-[#ff4f92] disabled:opacity-60">
        {busy ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
