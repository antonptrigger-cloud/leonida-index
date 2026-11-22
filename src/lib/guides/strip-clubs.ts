/**
 * Data for /guides/strip-clubs. Checked 22 Nov 2026 against the cited pages.
 * Rules: every figure is labelled Reported and attributed. Where outlets disagree we give both sides.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const STRIP_PUBLISHED = "2026-11-22";
export const STRIP_VERIFIED = "2026-11-22";
export const STRIP_VERIFIED_LABEL = "22 Nov 2026";

export const STRIP_FAQ: { question: string; answer: string }[] = [
  {
    question: "How many strip clubs are in GTA 6?",
    answer:
      "Three, according to PC Gamer, GameSpot, GamesRadar+, Polygon and PowerPyx: NINE1NINE, Delights Cabaret and Jack of Hearts. PowerPyx also lists two other venues that are not strip clubs: The Vault nightclub in Vice City and The Rusty Anchor tavern in Key Lento.",
  },
  {
    question: "Where is NINE1NINE in GTA 6?",
    answer:
      "PC Gamer, GameSpot, GamesRadar+ and Polygon place NINE1NINE in Downtown Vice City, next to The Vault. Polygon puts it on NE 7th Street, southeast of the big interchange; GamesRadar+ says it is just south of the overpass. PowerPyx instead files it in the Crosstown district. It is the closest of the three to the Key Lento house, about five miles away, according to GamesRadar+.",
  },
  {
    question: "How much is a private dance in GTA 6?",
    answer:
      "It depends on the club, and the outlets do not fully agree. PC Gamer reports $300 at NINE1NINE, plus a $50 tip, and $40 at Delights Cabaret, plus a $10 tip and a $5 stage tip. Polygon also reports $300 at NINE1NINE, and $1,000 at Jack of Hearts, but says you cannot order a private dance at Delights Cabaret. GameSpot says all three clubs offer private dances, each at a different price, without publishing the figures. PC Gamer could not get into Jack of Hearts when it visited, so it does not list a price there.",
  },
  {
    question: "Do I need cash for a private dance?",
    answer:
      "Yes, according to Polygon. It says both the starting price and the tips are cash only, and that you should use one of the club ATMs (BuckMe) if you do not have cash on hand. GameSpot also notes ATMs inside the clubs and says you need cash in your pockets.",
  },
  {
    question: "When does Jack of Hearts open?",
    answer:
      "GamesRadar+ says it is locked behind a Chapter 3 story mission. Polygon says it unlocks at the start of Chapter 3. PC Gamer was turned away on an early visit and assumed Chapter 3, when you meet the owner, but it had not been inside yet.",
  },
];

export const STRIP_SOURCES = [
  {
    label: "PC Gamer: GTA 6 strip club locations (19 Nov 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-strip-club-locations/",
    used: "Downtown NINE1NINE next to The Vault, directions from the Keys, $300 / $50 and $40 / $10 / $5 prices, Delights activities, Jack of Hearts still locked on an early visit",
  },
  {
    label: "Polygon: Where to find strip clubs in GTA 6 (19 Nov 2026)",
    url: "https://www.polygon.com/gta-6-strip-club-locations-private-dances/",
    used: "Map filter, street-level locations, $300 and $1,000 prices, no private dance at Delights, cash-only rule, ATMs, dancing and relationship notes, Chapter 3 unlock",
  },
  {
    label: "GamesRadar+: GTA 6 strip club locations (19 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-strip-club-locations/",
    used: "Three clubs, NINE1NINE north of Downtown just south of the overpass, five miles from Key Lento, Jack of Hearts locked behind a Chapter 3 mission, Delights in central Port Gellhorn",
  },
  {
    label: "GameSpot: All strip clubs in GTA 6 (19 Nov 2026)",
    url: "https://www.gamespot.com/articles/all-strip-clubs-in-gta-6/",
    used: "Three clubs, Downtown NINE1NINE, Delights on the Port Gellhorn highway strip, Jack of Hearts up the road, ATMs, private dances at all three, story-role notes",
  },
  {
    label: "PowerPyx: GTA 6 all strip club locations (20 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-all-strip-club-locations/",
    used: "Three strip clubs plus The Vault and The Rusty Anchor, map filter, NINE1NINE filed in Crosstown",
  },
];
