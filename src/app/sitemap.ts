import type { MetadataRoute } from "next";
import { ROUTES, SITE, absoluteUrl } from "@/lib/seo/site";
import { getLivePins } from "@/lib/map/service";

// Rebuilt at most hourly so newly approved pins refresh the map's lastModified.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Approved (public) pins only: getLivePins never returns pending or rejected rows.
  let mapUpdated: string = SITE.updated;
  try {
    const { pins } = await getLivePins();
    const newest = pins.map((p) => p.createdAt).filter(Boolean).sort().at(-1);
    if (newest && newest > mapUpdated) mapUpdated = newest;
  } catch {
    // Store offline: fall back to the static date.
  }

  return Object.entries(ROUTES)
    .filter(([, r]) => !r.noindex)
    .map(([path, r]) => ({
      url: absoluteUrl(path),
      lastModified: path.startsWith("/map") ? mapUpdated : SITE.updated,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    }));
}
