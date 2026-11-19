/**
 * Data for /guides/change-clothes. QC'd 19 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = two main outlets (or Rockstar). Reported = one main outlet, or any non-main outlet, always named.
 * - Main outlets used: VGC, GamesRadar+, Polygon (and Push Square for the Scooter Bros delivery fee). ScreenRant is NOT on our main list:
 *   it is used only as corroboration, or for one clearly attributed Reported line. Claims that only ScreenRant makes were cut.
 * - Trunk capacity: Polygon says "up to 10 sets of clothes (five per character)". ScreenRant says "five outfits saved in the trunk"
 *   without saying per character. They don't conflict. Only Polygon is a main outlet, so it is Reported. VGC and GamesRadar+ give no number.
 * - "Police look for your outfit": VGC says the outfit is tied to how aggressively police come after you and that changing it is the quickest
 *   way to lower a wanted level. Polygon says to change even when police know your outfit. ScreenRant's "police scan" wording is its own and is not used.
 *   Our Pay 'n' Spray mission page also says (PowerPyx) that police remember your clothes.
 * - Scooter Bros delivering your car for a fee that depends on distance and damage: Polygon and Push Square (Confirmed). "A few hundred dollars" is Polygon only.
 * - Store icon: Polygon says pink T-shirt, ScreenRant says black T-shirt. Both shown, no colour asserted.
 * - Cut (ScreenRant only): the hold-Square/X add-to-trunk input, the "registered car / towing" note, gun shops selling camo, the unlock timing
 *   (it names story beats) and "at least two outfits". Cut (not backed by two main outlets): "shop racks, wear straight away".
 * - No story beats on this page. No banned sources.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const CLOTHES_PUBLISHED = "2026-11-19";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const CLOTHES_VERIFIED = "2026-11-19T22:14:00+10:00";
export const CLOTHES_VERIFIED_LABEL = "19 Nov 2026";

export const CLOTHES_FAQ: { question: string; answer: string }[] = [
  {
    question: "How do I change clothes in GTA 6?",
    answer:
      "VGC and Polygon say to use the wardrobe at your safehouse, and GamesRadar+ and Polygon describe changing from your personal vehicle's trunk once you have stored outfits there (Confirmed). Polygon also says clothing stores and gyms have changing rooms (Reported).",
  },
  {
    question: "Why aren't my new clothes in my car trunk?",
    answer: "Outfits aren't added to the trunk by default, even if you've just bought them. VGC says to save them to the car from the safehouse menu, and Polygon says to add them at a wardrobe or changing room (Confirmed).",
  },
  {
    question: "How many outfits can I store in my trunk?",
    answer:
      "Polygon says up to 10 sets, five per character (Reported). ScreenRant also says five outfits but doesn't say whether that is per character. VGC and GamesRadar+ give no number.",
  },
  {
    question: "Does changing clothes help lose the police?",
    answer:
      "VGC says your outfit is tied to how aggressively police come after you and calls changing it the quickest way to lower a wanted level. Polygon also treats a change of outfit as a way to shake police who know what you're wearing (Confirmed). Neither gives exact rules.",
  },
  {
    question: "Where are clothing stores on the map?",
    answer:
      "Look for a T-shirt icon. Polygon calls it pink and ScreenRant calls it black. Polygon also says the map legend has a Style section that filters stores by type (Reported).",
  },
];

export const CLOTHES_SOURCES = [
  {
    label: "VGC: How to change clothes in GTA 6 (18 Nov 2026)",
    url: "https://www.videogameschronicle.com/guide/how-to-change-clothes-in-gta-6/",
    used: "The safehouse wardrobe, where bought and found clothes end up, picked-up items only saving at home, storing outfits in the trunk (not by default), and outfits tied to the police response",
  },
  {
    label: "GamesRadar+: How to change and manage your loadout in GTA 6 (19 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-manage-loadout/",
    used: "Opening the trunk and loadout, the Weapons and Items tabs, the Outfits slot, and stowing longarms",
  },
  {
    label: "Polygon: How to change your appearance in GTA 6 (19 Nov 2026)",
    url: "https://www.polygon.com/gta-6-how-to-change-your-appearance-clothes-grand-theft-auto/",
    used: "Wardrobe and changing rooms, the 10-outfit (five per character) trunk, Scooter Bros delivery, the loadout path, hats, glasses and masks, hair and tattoo shops, and finding stores on the map",
  },
  {
    label: "Push Square: GTA 6 tips and tricks you need to know",
    url: "https://www.pushsquare.com/guides/gta-6-tips-and-tricks-you-need-to-know",
    used: "Scooter Bros delivering a car for a fee based on distance and condition",
  },
  {
    label: "ScreenRant: GTA 6 how to change your clothes and save outfits (18 Nov 2026), not one of our main outlets",
    url: "https://screenrant.com/gta-6-how-to-change-your-clothes-save-outfits/",
    used: "Corroboration only: the home closet and trunk, five trunk outfits, barbers, and the black T-shirt store icon",
  },
];
