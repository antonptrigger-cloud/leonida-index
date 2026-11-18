/** Simple palm tree silhouette (original SVG, decorative only). */
export function Palm({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 200"
      className={className}
      aria-hidden
      focusable="false"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        fill="currentColor"
        d="M62 58c-3 30-6 60-4 92 1 18 4 34 8 50h-9c-5-16-8-33-8-51 0-32 4-62 8-92z"
      />
      <path
        fill="currentColor"
        d="M60 60C46 44 26 38 4 44c18-1 34 6 46 20-16-6-32-4-46 8 16-6 32-4 46 4C42 82 34 98 34 116c6-16 16-28 28-34 2 14 0 30-6 46 10-14 14-30 12-48 10 8 18 20 20 36 2-18-4-34-16-44 14 0 28 6 40 18-8-16-22-26-38-28 12-8 28-10 44-4C108 50 90 46 74 54c8-12 22-20 38-22-18-4-36 4-48 18 0-14 6-26 18-36-16 6-24 20-22 36-6-12-18-20-34-22 14 6 24 16 28 28z"
      />
    </svg>
  );
}
