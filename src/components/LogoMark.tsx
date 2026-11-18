/**
 * Original brand mark: a slanted sunset tile with a striped sun and a palm.
 * Pure SVG, not derived from any Rockstar logo.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="lvg-mark-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a0d2e" />
          <stop offset="0.55" stopColor="#ff2d78" />
          <stop offset="1" stopColor="#ff8c42" />
        </linearGradient>
        <linearGradient id="lvg-mark-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="1" stopColor="#ff6b35" />
        </linearGradient>
        <clipPath id="lvg-mark-clip">
          <path d="M10 0h38l-10 40H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#lvg-mark-clip)">
        <rect width="48" height="40" fill="url(#lvg-mark-sky)" />
        <circle cx="26" cy="27" r="11" fill="url(#lvg-mark-sun)" />
        <g fill="#2a0d2e">
          <rect x="0" y="27" width="48" height="1.6" />
          <rect x="0" y="30.6" width="48" height="2" />
          <rect x="0" y="34.4" width="48" height="2.4" />
        </g>
        <rect x="0" y="37" width="48" height="3" fill="#00d4ff" opacity="0.9" />
        {/* palm */}
        <g fill="#0a0a0b">
          <path d="M14.6 40c.4-6 1.6-12 3.8-17.4l1.2.4c-2 5.4-3 11-3.2 17z" />
          <path d="M19 22.6c-2.6-2.8-6.2-3.6-9.6-2.6 2.8-.2 5.4.8 7.4 2.6-2.8-.6-5.6.2-7.8 2.4 2.6-1.2 5.4-1.4 8-.6-2 1.4-3.2 3.6-3.4 6.2 1.2-2.4 3-4.2 5.2-5.2.2 2.2-.2 4.4-1.2 6.4 1.8-1.8 2.8-4.2 2.8-6.8 1.8 1.2 3 3 3.4 5.4.2-2.8-.8-5.2-2.8-6.8 2.4 0 4.6 1 6.4 2.8-1.2-2.6-3.6-4.2-6.2-4.4 2-1.2 4.4-1.6 6.8-.8-2.4-1.8-5.4-1.8-8 .6.8-1.8 2.4-3.2 4.4-3.8-2.6-.2-4.8 1.2-5.8 3.4-.6-1.6-2-2.8-3.8-3.2 1.4 1 2.2 2.2 2.6 3.6z" />
        </g>
      </g>
      <path d="M10 0h38l-10 40H0z" fill="none" stroke="#ff5c97" strokeWidth="1" opacity="0.9" />
    </svg>
  );
}
