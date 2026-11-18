"use client";

import { usePathname } from "next/navigation";
import { PageBackdrop } from "@/components/PageBackdrop";

/**
 * The /map page is a full-viewport Leaflet map under the site header, so the header strip is the only
 * "page header" it has. Show the neon pier behind it there (and nowhere near the map itself).
 */
export function HeaderBackdrop() {
  const pathname = usePathname();
  if (pathname !== "/map") return null;
  return <PageBackdrop id="pier" dim="light" contained fadeBottom={false} />;
}
