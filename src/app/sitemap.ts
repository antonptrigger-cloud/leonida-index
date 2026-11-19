import type { MetadataRoute } from "next";
import { ROUTES, absoluteUrl, lastModifiedOf } from "@/lib/seo/site";
import { getLivePins } from "@/lib/map/service";

// Rebuilt at most hourly so newly approved pins refresh the map's lastmod.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Approved (public) pins only: getLivePins never returns pending or rejected rows.
  let mapUpdated: string | undefined;
  try {
    const { pins } = await getLivePins();
    mapUpdated = pins.map((p) => p.createdAt).filter(Boolean).sort().at(-1);
  } catch {
    // Store offline: omit lastmod for map pages rather than guess.
  }

  const entries = Object.entries(ROUTES).filter(([, r]) => !r.noindex);
  // The home page changes whenever any content page does.
  const newest = entries
    .map(([path, r]) => (path.startsWith("/map") ? undefined : lastModifiedOf(r)))
    .filter((d): d is string => Boolean(d))
    .map((d) => new Date(d).getTime())
    .reduce((a, b) => Math.max(a, b), 0);

  return entries.map(([path, r]) => {
    // lastmod comes from each item's own updated (then published) date; nothing is invented.
    const own = path.startsWith("/map") ? mapUpdated : path === "/" ? (newest ? new Date(newest).toISOString() : undefined) : lastModifiedOf(r);
    return {
      url: absoluteUrl(path),
      ...(own ? { lastModified: own } : {}),
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    };
  });
}
