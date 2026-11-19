import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Share-image renderer for guides and news (used by src/app/og/[...path]/route.tsx).
 * Original art only: a dusk gradient, a striped sun, the site wordmark and the page title in
 * Bebas Neue (OFL, bundled in src/assets/fonts). No Rockstar or third-party assets, and no game screenshots.
 */
export const OG_SIZE = { width: 1200, height: 630 };

/** Smaller type for longer titles so three or four lines still fit beside the sun. */
export function titleSize(title: string): number {
  if (title.length <= 24) return 120;
  if (title.length <= 45) return 96;
  return 80;
}

export async function renderOg({ label, title, sub }: { label: string; title: string; sub?: string }) {
  const bebas = await readFile(join(process.cwd(), "src/assets/fonts/BebasNeue-Regular.ttf"));
  const stripes = [0, 1, 2, 3, 4, 5];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(180deg, #120818 0%, #2a0d2e 38%, #6a1646 66%, #c42a5c 84%, #ff6b35 100%)",
          fontFamily: "Bebas",
          color: "#fff",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -60,
            top: 190,
            width: 360,
            height: 360,
            borderRadius: 9999,
            overflow: "hidden",
            background: "linear-gradient(180deg, #ffe08a 0%, #ffb04a 45%, #ff5a5f 80%, #ff2d78 100%)",
            boxShadow: "0 0 120px rgba(255,107,53,0.55)",
            display: "flex",
          }}
        >
          {stripes.map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                width: 360,
                top: 200 + i * 26,
                height: 5 + i * 2.4,
                background: "#4a1240",
                display: "flex",
              }}
            />
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 96,
            background: "linear-gradient(180deg, #2b1a5a, #0d1440)",
            borderTop: "4px solid #00d4ff",
            display: "flex",
          }}
        />
        <div style={{ position: "absolute", left: 72, top: 48, display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 46,
              display: "flex",
              background: "linear-gradient(180deg, #2a0d2e, #ff2d78 55%, #ff8c42)",
              transform: "skewX(-14deg)",
              border: "2px solid #ff5c97",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
            <span style={{ fontSize: 40, letterSpacing: 1 }}>LEONIDA</span>
            <span style={{ fontSize: 18, letterSpacing: 8, color: "#ff8cb3" }}>VICE GUIDE</span>
          </div>
        </div>
        <div style={{ position: "absolute", left: 72, top: 150, width: 800, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 32, letterSpacing: 8, color: "#00e5cc" }}>{label.toUpperCase()}</div>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              fontSize: titleSize(title),
              lineHeight: 0.92,
              textShadow: "5px 5px 0 #ff2d78",
              textTransform: "uppercase",
            }}
          >
            {title}
          </div>
          {sub ? (
            <div style={{ display: "flex", marginTop: 22, fontSize: 32, letterSpacing: 3, color: "#ffe0ec" }}>{sub}</div>
          ) : null}
        </div>
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 24,
            display: "flex",
            padding: "8px 26px 4px",
            background: "#ff2d78",
            color: "#0a0a0b",
            fontSize: 32,
            letterSpacing: 4,
            boxShadow: "6px 6px 0 #00d4ff",
          }}
        >
          LEONIDAVICEGUIDE.COM
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Bebas", data: bebas, style: "normal", weight: 400 }] },
  );
}
