import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Original artwork in the site's Vice City style (dusk sky, striped sun, palms). No Rockstar assets.
export const alt = "Leonida Vice Guide: GTA 6 interactive map, guides and secrets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PALM =
  "M-1 0c0-22 3-42 9-60l3 1C5-41 3-21 3 0zM9-60c-8-9-19-11-30-8 9-1 17 2 23 8-9-2-18 1-25 8 8-4 17-5 25-2-6 5-10 12-11 20 4-8 9-14 16-17 1 7 0 14-4 21 6-6 9-14 9-22 6 4 10 10 11 18 1-9-3-17-9-22 8 0 15 3 21 9-4-8-12-14-21-14 7-4 15-5 22-2-8-6-17-6-26 1 3-6 8-10 14-12-8-1-15 4-18 11-2-5-6-9-12-10 4 3 7 7 8 11z";

export default async function OgImage() {
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
        {/* Sun with horizon stripes */}
        <div
          style={{
            position: "absolute",
            right: 120,
            top: 140,
            width: 380,
            height: 380,
            borderRadius: 9999,
            overflow: "hidden",
            background: "linear-gradient(180deg, #ffe08a 0%, #ffb04a 45%, #ff5a5f 80%, #ff2d78 100%)",
            boxShadow: "0 0 120px rgba(255,107,53,0.65)",
            display: "flex",
          }}
        >
          {stripes.map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                width: 380,
                top: 215 + i * 28,
                height: 5 + i * 2.5,
                background: "#4a1240",
                display: "flex",
              }}
            />
          ))}
        </div>
        {/* Sea */}
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
        {/* Palms */}
        <svg width="420" height="560" viewBox="-60 -80 120 160" style={{ position: "absolute", right: -70, bottom: 40 }}>
          <g transform="translate(0 80) scale(1.3)" fill="#0a0710">
            <path d={PALM} />
          </g>
        </svg>
        <svg width="300" height="400" viewBox="-60 -80 120 160" style={{ position: "absolute", right: 360, bottom: 60 }}>
          <g transform="translate(0 80) scale(-1 1)" fill="#0a0710">
            <path d={PALM} />
          </g>
        </svg>
        {/* Copy */}
        <div style={{ position: "absolute", left: 72, top: 52, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 52,
                display: "flex",
                background: "linear-gradient(180deg, #2a0d2e, #ff2d78 55%, #ff8c42)",
                transform: "skewX(-14deg)",
                border: "2px solid #ff5c97",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
              <span style={{ fontSize: 46, letterSpacing: 1 }}>LEONIDA</span>
              <span style={{ fontSize: 20, letterSpacing: 8, color: "#ff8cb3" }}>VICE GUIDE</span>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 40, fontSize: 28, letterSpacing: 8, color: "#00e5cc" }}>
            THE UNOFFICIAL FIELD GUIDE
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 6,
              fontSize: 138,
              lineHeight: 0.86,
              textShadow: "6px 6px 0 #ff2d78",
            }}
          >
            <span>GTA 6</span>
            <span>INTERACTIVE MAP</span>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 36, letterSpacing: 3, color: "#ffe0ec" }}>
            VICE CITY · LEONIDA · GUIDES · SECRETS
          </div>
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
            fontSize: 34,
            letterSpacing: 4,
            boxShadow: "6px 6px 0 #00d4ff",
          }}
        >
          LEONIDAVICEGUIDE.COM
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Bebas", data: bebas, style: "normal", weight: 400 }] },
  );
}
