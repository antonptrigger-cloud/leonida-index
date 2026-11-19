/**
 * Data for /guides/fast-travel. QC'd 19 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = two main outlets (or Rockstar). Reported = one outlet, or outlets that disagree, always named.
 * - RydeMe unlock timing CONFLICTS. VGC says the app is "unlocked during BuckMe" because it needs the bank account that mission gives
 *   (a Chapter 1 mission, which our own Buck Me page also lists). GamesRadar+ says "In Chapter 2, you'll be given access to the RydeMe app".
 *   Push Square gives no date for RydeMe but says the BuckMe bank "will unlock as part of Chapter 1", which sits with VGC. Both are shown.
 * - The $100 skip fee is VGC, GamesRadar+ and Push Square (Confirmed). "Longer trips cost more" is Push Square only.
 * - Single-outlet lines, all labelled Reported: Paradise Taxi (GamesRadar+), BuckMe Premium 20% off (GamesRadar+), skipping on buses and
 *   trains (GamesRadar+), cancelled rides (VGC), Scooter Bros delivery (Push Square), the active-waypoint requirement (Push Square).
 * - Spoilers: the Chapter 2 and Chapter 3 unlock details sit inside a <Spoiler> block, in line with how the money guide and vehicles
 *   database blur Chapter 2+ detail. Chapter 1 facts (Buck Me, the early Paradise Taxi number) are visible, as on the Buck Me page.
 * - Secondary sources seen but not used: VICE, IndiaTimes, gta6.house, gamerbolt, libertycity.net. No banned sources.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const FASTTRAVEL_PUBLISHED = "2026-11-19";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const FASTTRAVEL_VERIFIED = "2026-11-19T21:25:00+10:00";
export const FASTTRAVEL_VERIFIED_LABEL = "19 Nov 2026";

export const FASTTRAVEL_FAQ: { question: string; answer: string }[] = [
  {
    question: "Can you fast travel in GTA 6?",
    answer:
      "Only by paying. Push Square says there is no traditional fast travel, and VGC calls RydeMe the only way to do it in the usual sense. You book a ride, then pay extra to skip the journey and arrive straight away (Confirmed).",
  },
  {
    question: "How much does it cost to skip a ride?",
    answer:
      "$100 on top of the normal fare, according to VGC, GamesRadar+ and Push Square (Confirmed). Push Square adds that longer journeys cost more than short ones (Reported).",
  },
  {
    question: "When do you unlock RydeMe?",
    answer:
      "With your BuckMe bank account, but the outlets disagree on timing. VGC says it unlocks during the Chapter 1 mission Buck Me, because the app needs the bank account. GamesRadar+ puts it in a later chapter. Push Square doesn't date it. Reported, sources differ.",
  },
  {
    question: "Why was my RydeMe ride cancelled?",
    answer: "VGC says RydeMe cancels the booking if a car can't reach where you're standing (Reported). Walk to a road and book again.",
  },
  {
    question: "Can I fast travel before I have a BuckMe account?",
    answer:
      "GamesRadar+ says you get Paradise Taxi's number early in Chapter 1 and that the service takes pocket cash, not bank money, so it may be the option that works first. That is one outlet's report, so we mark it Reported.",
  },
];

export const FASTTRAVEL_SOURCES = [
  {
    label: "VGC: GTA 6 fast travel explained (18 Nov 2026)",
    url: "https://www.videogameschronicle.com/guide/gta-6-fast-travel-explained-how-to-fast-travel-in-gta-6/",
    used: "RydeMe as the only traditional fast travel, the BuckMe bank account it needs, its unlock timing, the three destinations, the minimap, cancelled rides and the $100 skip fee",
  },
  {
    label: "GamesRadar+: How to fast travel in GTA 6 (19 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-how-to-fast-travel/",
    used: "Paradise Taxi, RydeMe's own unlock timing and BuckMe billing, the $100 skip and its buttons, the BuckMe Premium discount, and buses and trains",
  },
  {
    label: "Push Square: GTA 6 tips and tricks you need to know",
    url: "https://www.pushsquare.com/guides/gta-6-tips-and-tricks-you-need-to-know",
    used: "No traditional fast travel, booking a Ryde with a waypoint, the $100 skip, longer trips costing more, the hold-Down nearby view, Scooter Bros, and the BuckMe bank unlocking in Chapter 1",
  },
];
