/**
 * Fallback art for characters Rockstar has not published a still for.
 *
 * Instead of a big monogram, the card shows an official Rockstar Games screenshot of the area the
 * character is reported in (or a neutral Leonida scene when no area is reported), tinted duotone with
 * the character's name on top, so it never reads as a portrait of them. Files are official screenshots
 * from rockstargames.com/VI, 16:9 WebP at 1280 / 800 ("-md") / 480 ("-sm") px, credited © Rockstar Games.
 * Only landscapes and places, never another character's face.
 */

export interface AreaShot {
  /** Path without extension or size suffix. */
  base: string;
  /** What the picture shows, for alt text. */
  scene: string;
  pos?: string;
}

export const AREA_SHOTS = {
  "vice-city-night": { base: "/characters/areas/vice-city-night", scene: "the Vice City skyline at night" },
  "vice-city-towers": { base: "/characters/areas/vice-city-towers", scene: "twin towers on the Vice City waterfront" },
  "vice-city-day": { base: "/characters/areas/vice-city-day", scene: "Vice City streets from above" },
  "keys-beach-bar": { base: "/characters/areas/keys-beach-bar", scene: "a beach bar in the Leonida Keys" },
  "keys-reef": { base: "/characters/areas/keys-reef", scene: "a reef under the water off the Leonida Keys" },
  "keys-seaplane": { base: "/characters/areas/keys-seaplane", scene: "a seaplane over the Leonida Keys", pos: "70% 50%" },
  "keys-boats": { base: "/characters/areas/keys-boats", scene: "boats moored off the Leonida Keys" },
  "grassrivers-stilts": { base: "/characters/areas/grassrivers-stilts", scene: "stilt houses in the Grassrivers" },
  "rural-sunset": { base: "/characters/areas/rural-sunset", scene: "a lone tree over Leonida farmland at sunset" },
  "port-gellhorn-motel": { base: "/characters/areas/port-gellhorn-motel", scene: "a roadside motel in Port Gellhorn at night" },
} satisfies Record<string, AreaShot>;

export type AreaShotId = keyof typeof AREA_SHOTS;

/** Per character: which picture, and the area line shown on the card (only when an outlet reports one in the open profile). */
export const CHARACTER_AREA: Record<string, { shot: AreaShotId; area?: string; pos?: string }> = {
  dwnply: { shot: "vice-city-night", area: "Vice City" },
  lori: { shot: "keys-beach-bar", area: "Leonida Keys" },
  kenton: { shot: "keys-reef", area: "Key Lento" },
  moses: { shot: "port-gellhorn-motel", area: "Port Gellhorn" },
  dunk: { shot: "port-gellhorn-motel", area: "Port Gellhorn", pos: "20% 60%" },
  randy: { shot: "vice-city-day", area: "Western Vice City" },
  tyrone: { shot: "vice-city-towers", area: "La Perle, Vice City" },
  yago: { shot: "vice-city-night", area: "Salton, Vice City", pos: "75% 50%" },
  andy: { shot: "vice-city-towers", area: "Belville", pos: "30% 50%" },
  kyle: { shot: "rural-sunset", area: "Kelly County" },
  kirk: { shot: "grassrivers-stilts", area: "Mariana County swamps" },
  bret: { shot: "rural-sunset", area: "Near Mount Kalaga", pos: "25% 60%" },
  billy: { shot: "keys-boats" },
  "pilot-pete": { shot: "keys-seaplane" },
  donnie: { shot: "keys-seaplane", area: "Key Lento", pos: "35% 50%" },
};

const DEFAULT: { shot: AreaShotId } = { shot: "vice-city-day" };

export function areaFor(slug: string) {
  const a = CHARACTER_AREA[slug] ?? DEFAULT;
  const s: AreaShot = AREA_SHOTS[a.shot];
  return { ...a, base: s.base, scene: s.scene, pos: ("pos" in a && a.pos) || s.pos };
}

export const areaSrcSet = (base: string) => `${base}-sm.webp 480w, ${base}-md.webp 800w, ${base}.webp 1280w`;
