"use client";

import { usePathname } from "next/navigation";

/**
 * The /map page is a full-viewport Leaflet map under the site header, so the header strip is the only
 * "page header" it has. A CSS wash keeps the bar from going flat, without downloading a hero photo
 * into a ~49px strip (that photo was competing with the map for LCP).
 */
export function HeaderBackdrop() {
  const pathname = usePathname();
  if (pathname !== "/map") return null;
  return (
    <div
      aria-hidden
      data-backdrop="map-header"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, rgba(12,5,24,0.2) 0%, rgba(80,18,50,0.35) 45%, rgba(255,107,53,0.22) 100%)",
      }}
    />
  );
}
