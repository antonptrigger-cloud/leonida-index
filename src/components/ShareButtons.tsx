"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { SITE, SOCIAL } from "@/lib/seo/site";

function fallbackUrl(path?: string | null) {
  if (!path || path === "/") return SITE.url;
  return `${SITE.url}${path}`;
}

export function pageShareUrl(path?: string | null, search = "") {
  const base = fallbackUrl(path);
  return search ? `${base}${search}` : base;
}

export function ShareButtons({
  title,
  url,
  path,
  compact = false,
  copyTestId,
  copyLabel,
}: {
  title?: string;
  url?: string;
  path?: string;
  compact?: boolean;
  copyTestId?: string;
  copyLabel?: string;
}) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  // Canonical site URL (not the current host), so preview and local shares still point at production.
  const href = url ?? fallbackUrl(path ?? pathname);

  const shareTitle = title?.trim() || SITE.name;
  const x = `https://x.com/intent/post?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(href)}`;
  const reddit = `https://www.reddit.com/submit?url=${encodeURIComponent(href)}&title=${encodeURIComponent(shareTitle)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const linkClass = compact
    ? "text-xs text-muted underline-offset-2 hover:text-pink-2 hover:underline"
    : "text-xs font-semibold uppercase tracking-[0.16em] text-ink-2 transition-colors hover:text-pink-2";

  return (
    <div className={`flex flex-wrap items-center gap-x-3x gap-y-2x ${compact ? "" : "mt-3x sm:mt-6x"}`} role="group" aria-label="Share this page">
      {compact ? null : <span className="text-xs uppercase tracking-[0.2em] text-muted">Share</span>}
      <a href={x} target="_blank" rel="noopener noreferrer" className={linkClass}>
        X
      </a>
      <span className="text-faint" aria-hidden>
        ·
      </span>
      <a href={reddit} target="_blank" rel="noopener noreferrer" className={linkClass}>
        Reddit
      </a>
      <span className="text-faint" aria-hidden>
        ·
      </span>
      <button type="button" onClick={copy} className={linkClass} data-testid={copyTestId} aria-live="polite">
        {copied ? "Link copied" : copyLabel ?? (compact ? "Copy link to this pin" : "Copy link")}
      </button>
    </div>
  );
}

export function FollowCta({ className = "" }: { className?: string }) {
  return (
    <a
      href={SOCIAL.xUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2x text-xs font-semibold uppercase tracking-[0.16em] text-ink-2 transition-colors hover:text-pink-2 ${className}`}
    >
      Follow @{SOCIAL.xHandle} on X
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </a>
  );
}
