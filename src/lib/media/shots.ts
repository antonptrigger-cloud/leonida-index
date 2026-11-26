/**
 * Official Grand Theft Auto VI screenshots used as card art and thumbnails.
 *
 * Every file is an official Rockstar Games screenshot from rockstargames.com/VI (downloads /
 * screenshots), pre-cropped to 16:9 and stored as WebP with three widths: base, "-md" and "-sm".
 * They are served as plain responsive <img srcset> (no image-optimizer round trip). Credit them
 * "© Rockstar Games" wherever they appear. No Rockstar logos, no leaked material, no fan-site art.
 */

export interface Shot {
  /** Path without extension or size suffix, e.g. "/images/regions/vice-city". */
  base: string;
  /** Widths of [base, -md, -sm]. */
  widths: [number, number, number];
  alt: string;
  /** CSS object-position, when the subject is off-centre. */
  pos?: string;
}

const NEW: [number, number, number] = [1280, 800, 480];
const OLD: [number, number, number] = [1600, 800, 480];
const BG: [number, number, number] = [1600, 1080, 720];

export const SHOTS = {
  // Regions
  "vice-city": { base: "/images/regions/vice-city", widths: NEW, alt: "Vice City skyline and marina in daylight" },
  "leonida-keys": { base: "/images/regions/leonida-keys", widths: NEW, alt: "A seaplane over the islands and causeway of the Leonida Keys", pos: "50% 45%" },
  grassrivers: { base: "/images/regions/grassrivers", widths: NEW, alt: "An airboat crossing the Grassrivers wetlands" },
  "port-gellhorn": { base: "/images/regions/port-gellhorn", widths: NEW, alt: "A roadside motel in Port Gellhorn at night" },
  ambrosia: { base: "/images/regions/ambrosia", widths: NEW, alt: "A biker gang riding a country road in Ambrosia", pos: "50% 60%" },
  "mount-kalaga": { base: "/images/regions/mount-kalaga", widths: NEW, alt: "Dirt bikes on a trail in Mount Kalaga National Park" },
  // Topics
  characters: { base: "/images/topics/characters", widths: NEW, alt: "Jason and Lucia in a car at night", pos: "50% 40%" },
  wanted: { base: "/images/topics/wanted", widths: NEW, alt: "Police lights on a Vice City street at night" },
  cars: { base: "/images/topics/cars", widths: NEW, alt: "A man sitting on a pink custom car on a Vice City street" },
  activities: { base: "/images/topics/activities", widths: NEW, alt: "A diver exploring a reef off the Leonida Keys" },
  beach: { base: "/images/topics/beach", widths: NEW, alt: "A crowded Vice City beach by a lifeguard tower" },
  nightlife: { base: "/images/topics/nightlife", widths: NEW, alt: "A packed Vice City nightclub under green lights" },
  strangers: { base: "/images/topics/strangers", widths: NEW, alt: "A Grassrivers local on a porch", pos: "50% 35%" },
  airboat: { base: "/images/topics/airboat", widths: NEW, alt: "An airboat in the Grassrivers, seen from above" },
  relationship: { base: "/images/topics/relationship", widths: NEW, alt: "Jason and Lucia by a rooftop pool above Vice City" },
  cast: { base: "/images/topics/cast", widths: NEW, alt: "Lucia by a pool with a cocktail", pos: "50% 35%" },
  club: { base: "/images/topics/club", widths: NEW, alt: "A crowded strip club bar in Vice City" },
  "skyline-swamp": { base: "/images/topics/skyline-swamp", widths: NEW, alt: "The Vice City skyline beyond the Grassrivers" },
  // Existing official shots already on the site
  missions: { base: "/secrets/money-store-job", widths: OLD, alt: "Jason and Lucia holding up a store in masks" },
  ufo: { base: "/secrets/ufo-ambrosia-02", widths: OLD, alt: "Ambrosia at night, with the refinery lit up" },
  "skunk-ape": { base: "/secrets/skunk-ape-grassrivers-08", widths: OLD, alt: "Lights over the Grassrivers in the haze" },
  "easter-eggs": { base: "/secrets/easter-eggs-vice-city-08", widths: OLD, alt: "Vice City at night with the ferris wheel lit" },
  collectibles: { base: "/secrets/collectibles-vice-city-09", widths: OLD, alt: "A classic car under a Vice City overpass" },
  hidden: { base: "/secrets/hidden-vice-city-01", widths: OLD, alt: "The Vice City sign at sunset" },
  money: { base: "/secrets/strip-clubs-cash-rain", widths: OLD, alt: "Cash raining down in a Vice City club" },
  "strip-clubs": { base: "/guides/strip-clubs-nine1nine", widths: OLD, alt: "Inside a Vice City strip club" },
  weapons: { base: "/guides/weapons-jason-rifle", widths: OLD, alt: "Jason aiming a rifle" },
  safehouse: { base: "/map/pins/safehouse", widths: [960, 800, 480], alt: "A safehouse garage with cars" },
  sunset: { base: "/backgrounds/official-sunset", widths: BG, alt: "Vice City at dusk" },
  marina: { base: "/backgrounds/official-marina", widths: BG, alt: "Vice City marina and skyline" },
} satisfies Record<string, Shot>;

export type ShotId = keyof typeof SHOTS;

export const shot = (id: ShotId): Shot => SHOTS[id];

export const SHOT_CREDIT = "© Rockstar Games";

/** srcset for a shot: base, -md and -sm. */
export function srcSetOf(s: Shot) {
  const [b, m, sm] = s.widths;
  return `${s.base}-sm.webp ${sm}w, ${s.base}-md.webp ${m}w, ${s.base}.webp ${b}w`;
}

/** Map regions (slug matches /map/<slug>). */
export const REGION_SHOT: Record<string, ShotId> = {
  "vice-city": "vice-city",
  "leonida-keys": "leonida-keys",
  grassrivers: "grassrivers",
  "port-gellhorn": "port-gellhorn",
  ambrosia: "ambrosia",
  "mount-kalaga": "mount-kalaga",
};

/** Exact paths first, then prefixes (longest first). */
const EXACT: Record<string, ShotId> = {
  "/map": "vice-city",
  "/guides": "missions",
  "/guides/missions": "missions",
  "/guides/beginner": "beach",
  "/guides/wanted": "wanted",
  "/guides/stealing-cars": "cars",
  "/guides/activities": "activities",
  "/guides/money": "money",
  "/guides/cheats": "sunset",
  "/guides/trophies": "nightlife",
  "/guides/collectibles": "collectibles",
  "/guides/strangers-and-freaks": "strangers",
  "/guides/bigfoot-skunk-ape": "skunk-ape",
  "/guides/secret-vehicles": "airboat",
  "/guides/chapter-3-side-job-locations": "grassrivers",
  "/guides/map-size": "skyline-swamp",
  "/guides/fast-travel": "leonida-keys",
  "/guides/garages": "safehouse",
  "/guides/saving": "safehouse",
  "/guides/switch-characters": "characters",
  "/guides/change-clothes": "beach",
  "/guides/first-person": "wanted",
  "/guides/relationship": "relationship",
  "/guides/difficulty": "ambrosia",
  "/guides/strip-clubs": "club",
  "/guides/weapons": "weapons",
  "/tools/edition-compare": "marina",
  "/secrets": "easter-eggs",
  "/secrets/ufo": "ufo",
  "/secrets/skunk-ape": "skunk-ape",
  "/secrets/easter-eggs": "easter-eggs",
  "/secrets/strip-clubs": "strip-clubs",
  "/secrets/money": "missions",
  "/secrets/collectibles": "collectibles",
  "/secrets/hidden-locations": "hidden",
  "/database": "characters",
  "/database/characters": "characters",
  "/database/characters/cast": "cast",
  "/database/vehicles": "cars",
  "/database/weapons": "weapons",
  "/database/radio-stations": "nightlife",
  "/database/gangs-factions": "ambrosia",
  "/database/locations": "skyline-swamp",
  "/news": "sunset",
  "/news/release-date": "marina",
};

const NEWS_KEYWORDS: [RegExp, ShotId][] = [
  [/stream|n3on|viewership/, "nightlife"],
  [/album|tracklist|festival|heat-night/, "nightlife"],
  [/traffic|nbn|de-cix/, "skyline-swamp"],
  [/reviews|metacritic|awards/, "relationship"],
  [/sales|million/, "money"],
  [/prostitutes/, "club"],
  [/glitch|patch|update|servers/, "wanted"],
  [/pc|game-pass|performance|ps5/, "cars"],
  [/online|gta-plus/, "beach"],
];

/** Story-flavoured shots rotated across mission walkthroughs so a row of mission cards never repeats one picture. */
const MISSION_POOL: ShotId[] = ["missions", "characters", "relationship", "wanted", "cars", "nightlife", "airboat", "club"];

/** Stable pick from a pool by a string hash, so a page always gets the same picture. */
function pick(pool: ShotId[], key: string): ShotId {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return pool[h % pool.length];
}

/** Card art for an internal link. Falls back by section so every card has a real picture. */
export function shotForHref(href: string): ShotId {
  const path = href.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  if (EXACT[path]) return EXACT[path];
  const region = path.match(/^\/map\/([a-z-]+)$/)?.[1];
  if (region && REGION_SHOT[region]) return REGION_SHOT[region];
  if (path.startsWith("/map")) return "vice-city";
  if (path.startsWith("/guides/missions/")) return pick(MISSION_POOL, path);
  if (path.startsWith("/database/characters/")) return "characters";
  const place = path.match(/^\/database\/locations\/([a-z-]+)$/)?.[1];
  if (place) return REGION_SHOT[place] ?? (place === "key-lento" ? "leonida-keys" : "skyline-swamp");
  if (path.startsWith("/news/")) {
    const slug = path.slice(6);
    for (const [re, id] of NEWS_KEYWORDS) if (re.test(slug)) return id;
    return "sunset";
  }
  if (path.startsWith("/secrets")) return "easter-eggs";
  if (path.startsWith("/database")) return "skyline-swamp";
  if (path.startsWith("/guides")) return "missions";
  return "marina";
}
