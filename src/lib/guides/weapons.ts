/**
 * Data for /guides/weapons. Checked 22 Nov 2026 against the cited pages.
 * Rules: every figure is labelled Reported and attributed. Where outlets disagree we give both sides.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const WEAPONS_PUBLISHED = "2026-11-22";
export const WEAPONS_VERIFIED = "2026-11-22";
export const WEAPONS_VERIFIED_LABEL = "22 Nov 2026";

export const WEAPONS_FAQ: { question: string; answer: string }[] = [
  {
    question: "How do I keep a gun I find in GTA 6?",
    answer:
      "Buying it at an Ammu-Nation store is the sure way, according to GameSpot and GamesRadar+. GamesRadar+ says a purchase (with pocket cash or a BuckMe account) gives a copy to both Jason and Lucia. Looted “unowned” guns are different: GamesRadar+ says they cannot be modified, cannot be recovered if you lose them, and are gone for good if you are wasted or busted. GameSpot’s advice for longarms you want to keep is to stow them in the trunk of a personal vehicle and to check the green weapons locker.",
  },
  {
    question: "Where is the weapons locker in GTA 6?",
    answer:
      "GameSpot says there is a tall green weapons locker at every Ammu-Nation store, and that some purchased garages have one too. GamesRadar+ says most Ammu-Nation stores have a locker, but not the pawn-shop variants. At the locker you can manage your loadout or open Manage Weapons to recover owned guns, including unique variants.",
  },
  {
    question: "How many gun stores are in GTA 6?",
    answer:
      "PowerPyx counts 24 Ammu-Nation locations, marked with an orange gun icon once you clear the fog, and filterable under Map > Ammu-Nations. Hovering a pin shows its stock type: Limited, Standard, Hunting or Expanded. Expanded stores, PowerPyx says, carry the widest range, including LMGs, sniper rifles, grenade launchers and rocket launchers.",
  },
  {
    question: "What are the best guns in GTA 6?",
    answer:
      "That depends who you ask, and we only have GameSpot’s published picks for the default (non-legendary) guns. GameSpot recommends the Girardi ES9 as the best sidearm pistol, a Hawk & Little revolver in the second sidearm slot, the Duke 556 as the most consistent assault rifle, the Girardi AZ1200 or Shrewsbury Drifter for a shotgun slot, and the Fairview FF-50 as the best overall sniper, with the Fairview FF-SR for maximum range. It also says a legendary unique you find in the world is often better than a base gun.",
  },
  {
    question: "Do both characters get a gun I buy?",
    answer:
      "GamesRadar+ says yes: buying a weapon gives a copy to both Jason and Lucia, whoever paid. You still have to modify and equip each character’s copy separately.",
  },
];

export const WEAPONS_SOURCES = [
  {
    label: "GameSpot: How to save guns and weapons you find in GTA 6 (19 Nov 2026)",
    url: "https://www.gamespot.com/articles/how-to-save-weapons-you-find-in-gta-6/",
    used: "Buying vs looting, stowing longarms in a personal vehicle trunk, green locker, Manage Weapons and Variants tab, lost-gun warning",
  },
  {
    label: "GameSpot: Best guns in GTA 6 and all guns to buy (20 Nov 2026)",
    url: "https://www.gamespot.com/articles/best-guns-in-gta-6-and-all-guns-to-buy/",
    used: "34 standard guns, class list, recommended default loadout",
  },
  {
    label: "GamesRadar+: GTA 6 weapon ownership explained (19 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-weapon-ownership-explained/",
    used: "Owned vs unowned guns, both characters get a purchased copy, unique variants with a gold gun icon, stock expanding as you buy, premium stores",
  },
  {
    label: "GamesRadar+: How to store, manage and recover guns at Ammu-Nation in GTA 6 (19 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/how-to-remove-guns-from-trunk-recover-weapons-ammu-nation-gta-6/",
    used: "Locker controls, pawn shops without lockers, adding or removing trunk categories, unique-variant sub-menu",
  },
  {
    label: "PowerPyx: GTA 6 all Ammu-Nation gun store locations (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-all-ammu-nation-gun-stores-locations/",
    used: "24 stores, Limited/Standard/Hunting/Expanded types, map filter, Expanded heavy-weapon stock, unique variants per store",
  },
];
