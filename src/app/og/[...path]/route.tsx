import { ROUTES, ogImagePath } from "@/lib/seo/site";
import { renderOg } from "@/lib/seo/og";
import { newsBySlug } from "@/lib/news/articles";

/**
 * /og/<route>.png: generated share images for guides, missions and news (see `ogImagePath`).
 * Only registered, indexable routes render; anything else is a 404, so the text on the image
 * always comes from our own registry and can never be set from a URL.
 */
export const dynamicParams = false;

const paths = () => Object.keys(ROUTES).filter((p) => ogImagePath(p));

export function generateStaticParams() {
  return paths().map((p) => ({ path: `${p}.png`.split("/").filter(Boolean) }));
}

function labelFor(path: string): string {
  if (path === "/news") return "GTA 6 news";
  if (path === "/guides") return "GTA 6 guides";
  if (path === "/guides/missions") return "Mission walkthrough";
  if (path.startsWith("/guides/missions/")) return "Mission guide";
  if (path.startsWith("/news/")) {
    const item = newsBySlug(path.slice("/news/".length));
    return item ? `News · ${item.tag}` : "News";
  }
  if (path === "/secrets" || path.startsWith("/secrets/")) return "GTA 6 secrets";
  if (path === "/database" || path.startsWith("/database/")) return "GTA 6 database";
  if (path === "/map" || path.startsWith("/map/")) return "GTA 6 map";
  if (path === "/about" || path === "/sources") return "Leonida Vice Guide";
  if (path.startsWith("/tools/")) return "GTA 6 tools";
  return "GTA 6 guide";
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await params;
  const path = "/" + parts.join("/").replace(/\.png$/, "");
  const route = ROUTES[path];
  if (!route || !ogImagePath(path)) return new Response("Not found", { status: 404 });
  return renderOg({ label: labelFor(path), title: route.title, sub: "The unofficial GTA 6 field guide" });
}
