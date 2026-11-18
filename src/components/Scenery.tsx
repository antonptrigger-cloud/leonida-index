/**
 * Original, hand-built silhouettes for the destination posters. Pure SVG, no game assets.
 * Each scene is drawn on a 400x220 canvas anchored to the bottom of the poster.
 */
export type SceneId = "vice-city" | "leonida-keys" | "grassrivers" | "port-gellhorn" | "ambrosia" | "mount-kalaga";

export const SKIES: Record<SceneId, string> = {
  "vice-city":
    "radial-gradient(circle at 68% 58%, #ffd36b 0 9%, #ff8c42 9.2% 11%, transparent 11.3%), linear-gradient(180deg, #1a0b2e 0%, #4a1250 40%, #c41e6a 72%, #ff8c42 100%)",
  "leonida-keys":
    "radial-gradient(circle at 30% 62%, #fff1b8 0 10%, transparent 10.4%), linear-gradient(180deg, #0b3a5a 0%, #12708a 35%, #ff6b8b 75%, #ffb36b 100%)",
  grassrivers:
    "radial-gradient(circle at 75% 55%, #ffb36b 0 12%, transparent 12.4%), linear-gradient(180deg, #0c1f24 0%, #154a44 45%, #b0405a 80%, #ff8c42 100%)",
  "port-gellhorn":
    "radial-gradient(circle at 22% 60%, #ffd36b 0 11%, transparent 11.4%), linear-gradient(180deg, #2b1236 0%, #7a2a4a 45%, #e0603a 80%, #ffb36b 100%)",
  ambrosia:
    "radial-gradient(circle at 60% 60%, #ffe3a3 0 10%, transparent 10.4%), linear-gradient(180deg, #2a1208 0%, #7a2e12 45%, #e0602a 78%, #ffc06b 100%)",
  "mount-kalaga":
    "radial-gradient(circle at 80% 30%, #fff 0 2%, transparent 2.3%), linear-gradient(180deg, #08163a 0%, #1e3f8a 40%, #8a3a8a 75%, #ff6b8b 100%)",
};

const ink = "#0a0710";

function Palm({ x, y, s = 1, flip = false }: { x: number; y: number; s?: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`} fill={ink}>
      <path d="M-1 0c0-22 3-42 9-60l3 1C5-41 3-21 3 0z" />
      <path d="M9-60c-8-9-19-11-30-8 9-1 17 2 23 8-9-2-18 1-25 8 8-4 17-5 25-2-6 5-10 12-11 20 4-8 9-14 16-17 1 7 0 14-4 21 6-6 9-14 9-22 6 4 10 10 11 18 1-9-3-17-9-22 8 0 15 3 21 9-4-8-12-14-21-14 7-4 15-5 22-2-8-6-17-6-26 1 3-6 8-10 14-12-8-1-15 4-18 11-2-5-6-9-12-10 4 3 7 7 8 11z" />
    </g>
  );
}

export function Scenery({ id }: { id: SceneId }) {
  switch (id) {
    case "vice-city":
      return (
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" aria-hidden>
          <g fill="#ff8c42" opacity="0.35">
            <rect y="196" width="400" height="2" />
            <rect y="203" width="400" height="3" />
            <rect y="211" width="400" height="4" />
          </g>
          <g fill={ink}>
            <path d="M0 190h22v-40h10v-12h8v12h10v40h14v-70l8-8 8 8v70h12v-52h22v52h8v-96h6v-10h4v10h6v96h12v-60h16l6-10 6 10h4v60h14v-36h20v36h10v-78l10-14 10 14v78h12v-44h18v44h14v-58h8v-8h8v8h8v58h20v-30h18v30h12v-48h14v48h10v-64h12v-10h6v10h8v74H0z" />
            <rect y="190" width="400" height="30" />
          </g>
          <g fill="#ff5c97" opacity="0.9">
            <rect x="122" y="110" width="2" height="2" />
            <rect x="128" y="120" width="2" height="2" />
            <rect x="122" y="132" width="2" height="2" />
            <rect x="262" y="150" width="2" height="2" />
            <rect x="268" y="162" width="2" height="2" />
            <rect x="84" y="130" width="2" height="2" />
          </g>
          <g fill="#00d4ff" opacity="0.8">
            <rect x="206" y="140" width="2" height="2" />
            <rect x="212" y="152" width="2" height="2" />
            <rect x="330" y="150" width="2" height="2" />
          </g>
          <Palm x={30} y={220} s={1.15} />
          <Palm x={372} y={220} s={1.3} flip />
        </svg>
      );
    case "leonida-keys":
      return (
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" aria-hidden>
          <rect y="168" width="400" height="52" fill="#0b2a4a" />
          <g fill="#ffd36b" opacity="0.45">
            <rect x="60" y="176" width="80" height="2" />
            <rect x="80" y="186" width="50" height="2" />
            <rect x="96" y="196" width="30" height="2" />
          </g>
          <g fill={ink}>
            <path d="M0 168c30-8 60-8 90 0z" />
            <path d="M250 168c25-14 70-16 110 0z" />
            <path d="M120 150h280v5H120z" />
            {Array.from({ length: 9 }).map((_, i) => (
              <path key={i} d={`M${130 + i * 30} 155h4v13h-4z`} />
            ))}
            <path d="M40 160l14-40 2 40z" />
            <path d="M30 162h30l-4 6H34z" />
          </g>
          <Palm x={300} y={168} s={0.8} />
          <Palm x={320} y={168} s={0.65} flip />
        </svg>
      );
    case "grassrivers":
      return (
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" aria-hidden>
          <rect y="176" width="400" height="44" fill="#0a1a1c" />
          <g fill="#ffb36b" opacity="0.35">
            <rect x="250" y="184" width="90" height="2" />
            <rect x="270" y="194" width="50" height="2" />
          </g>
          <g fill={ink}>
            <path d="M0 176c20-30 40-50 70-56 10 20 30 30 50 34 20-22 40-30 70-26-10 20 0 34 20 40H0z" />
            <path d="M260 176c10-26 30-40 60-44 6 18 20 30 40 32 14-10 28-12 40-10v22z" />
            {Array.from({ length: 26 }).map((_, i) => (
              <path key={i} d={`M${i * 16} 220l${2 + (i % 3)}-${30 + ((i * 7) % 22)}l2 ${30 + ((i * 7) % 22)}z`} />
            ))}
            <path d="M150 184h46l-6 6h-36z" />
            <path d="M184 172h6v12h-6z" />
            <circle cx="187" cy="170" r="6" />
          </g>
        </svg>
      );
    case "port-gellhorn":
      return (
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" aria-hidden>
          <rect y="180" width="400" height="40" fill="#1a0a20" />
          <g fill="none" stroke={ink} strokeWidth="4">
            <circle cx="280" cy="118" r="52" />
            <path d="M280 66v104M228 118h104M243 81l74 74M317 81l-74 74" strokeWidth="2.5" />
          </g>
          <g fill={ink}>
            <path d="M262 180l18-62 18 62z" />
            <path d="M0 180h400v6H0z" />
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i} d={`M${10 + i * 28} 186h4v34h-4z`} />
            ))}
            <path d="M40 180v-48h70v48z" />
            <path d="M100 120h44v22h-44z" />
            <path d="M120 142h4v38h-4z" />
          </g>
          <g fill="#ff5c97">
            <rect x="104" y="126" width="36" height="3" />
            <rect x="104" y="133" width="24" height="3" />
          </g>
          <g fill="#ffd36b" opacity="0.85">
            <rect x="50" y="144" width="8" height="6" />
            <rect x="66" y="144" width="8" height="6" />
            <rect x="82" y="158" width="8" height="6" />
          </g>
        </svg>
      );
    case "ambrosia":
      return (
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" aria-hidden>
          <g fill={ink}>
            <path d="M0 186c80-10 160-12 240-6s120 4 160 0v40H0z" />
            <path d="M210 186V96h14v90zM236 186V70h12v116zM262 186v-70h16v70z" />
            <path d="M286 186v-56h40v56zM296 130v-14h20v14z" />
            <path d="M330 186v-40h50v40z" />
            <path d="M60 186v-44c0-8 22-8 22 0v44zM90 186v-52c0-9 24-9 24 0v52z" />
          </g>
          <g fill="#ffc06b" opacity="0.5">
            <circle cx="238" cy="62" r="7" />
            <circle cx="246" cy="52" r="5" />
            <circle cx="214" cy="88" r="6" />
          </g>
          <g fill="#ffc06b" opacity="0.35">
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x={i * 50} y={200 + (i % 2) * 8} width="40" height="2" />
            ))}
          </g>
        </svg>
      );
    case "mount-kalaga":
      return (
        <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMax slice" aria-hidden>
          <path d="M0 170l70-70 40 30 70-90 60 70 40-30 120 90v50H0z" fill="#2a1a4a" />
          <path d="M180 40l18 22-12-4-8 10-6-12-10 4z" fill="#f6e7cf" opacity="0.8" />
          <g fill={ink}>
            <path d="M0 190l60-40 50 26 80-52 70 46 50-24 90 44v30H0z" />
            {Array.from({ length: 18 }).map((_, i) => (
              <path key={i} d={`M${i * 23} 220l9-${34 + ((i * 5) % 18)}l9 ${34 + ((i * 5) % 18)}z`} />
            ))}
          </g>
        </svg>
      );
  }
}
