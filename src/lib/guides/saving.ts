/**
 * Data for /guides/saving. QC'd 19 Nov 2026 by re-reading every cited page.
 * Rules for this page:
 * - Confirmed = two main outlets (or Rockstar). Reported = one main outlet, or any non-main outlet (GameRant), always named.
 * - The autosave is described two ways and we show both: GamesRadar+ says it is a separate, secret 16th slot, GameSpot says it
 *   takes up one of your 15 slots. PowerPyx lists "15 manual slots" and "1 autosave" without saying which. Not settled.
 * - Prologue save lock is GameRant only (GamesRadar+ and PowerPyx say you can save almost any time), so it is Reported.
 * - "Loading an older manual save overwrites the autosave" is PowerPyx only (Reported).
 * - The early house-tasks warning (GameSpot) is kept behind the spoiler blur. No Chapter 2+ mission names appear.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const SAVING_PUBLISHED = "2026-11-19";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const SAVING_VERIFIED = "2026-11-19T19:30:00+10:00";
export const SAVING_VERIFIED_LABEL = "19 Nov 2026";

export const SAVING_STEPS: { name: string; text: string }[] = [
  { name: "Leave any active mission", text: "Saving is greyed out while a mission is running, so finish or leave the mission first." },
  { name: "Open the pause menu", text: "Press Options on PS5 or Menu on Xbox Series X|S (PowerPyx). GamesRadar+ and GameRant call the same button Start." },
  { name: "Select Game", text: "The Game tab holds both Save Game and Load Game." },
  { name: "Choose Save Game and pick a slot", text: "Use an empty slot to keep every save you have, or overwrite one you no longer need." },
];

export const SAVING_FAQ: { question: string; answer: string }[] = [
  {
    question: "How do I save in GTA 6?",
    answer:
      "Leave any active mission, open the pause menu, choose Game, then Save Game, and pick a slot. PowerPyx, PC Gamer and GamesRadar+ all describe this route (Confirmed).",
  },
  {
    question: "How many save slots does GTA 6 have?",
    answer:
      "15 manual slots (PowerPyx, PC Gamer, GamesRadar+ and GameSpot, Confirmed). There is also one autosave. GamesRadar+ calls it a separate 16th slot, while GameSpot says it takes up one of your slots, so whether you get 15 or 14 slots for manual saves isn't settled.",
  },
  {
    question: "Can I save during a mission?",
    answer: "No. PowerPyx says the save option is usually greyed out in missions, and GameSpot says you can't save while actively doing one (Confirmed).",
  },
  {
    question: "Does GTA 6 autosave?",
    answer:
      "Yes, but there is only one autosave (PowerPyx, GamesRadar+ and GameSpot, Confirmed). GamesRadar+ says it triggers after missions, when you're wasted or busted, and after major open-world encounters (Reported). Keep manual saves for anything you might want to return to.",
  },
  {
    question: "Why can't I save right now?",
    answer:
      "You're probably in a mission, or you've used a cheat this session. GamesRadar+ and PC Gamer say cheats turn saving off until you quit and reload (Confirmed). GameRant also reports that manual saving stays off through the opening sequence (Reported).",
  },
  {
    question: "Can I replay missions in GTA 6?",
    answer:
      "Not from a menu. PowerPyx, GamesRadar+, GameSpot and IGN all say there's no mission replay, so load a manual save made before the mission instead (Confirmed).",
  },
];

export const SAVING_SOURCES = [
  {
    label: "PowerPyx: GTA 6 How to Save",
    url: "https://www.powerpyx.com/gta-6-how-to-save/",
    used: "Pause-menu route and button names, 15 manual slots, one autosave, the start-and-end-of-chapter plan, and the note that loading an older save overwrites the autosave",
  },
  {
    label: "PC Gamer: How to save game in GTA 6 (18 Nov 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-save-game/",
    used: "Game tab, 15 manual slots, one save per chapter advice, loading from the same menu and cheats disabling saving",
  },
  {
    label: "GamesRadar+: How to save in GTA 6 and manage your progress (19 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-how-to-save/",
    used: "Save steps, 15 manual slots, the 'secret 16th slot' autosave and its triggers, start-and-end-of-chapter advice, cheats disabling saving",
  },
  {
    label: "GameSpot: How Do You Save Your Game In GTA 6? (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/how-do-you-save-your-game-in-gta-6/",
    used: "15 slots, no saving mid-mission, the autosave taking up one slot and overwriting the last, saving before heists, and the early house-tasks warning",
  },
  {
    label: "GameSpot: Can You Replay Missions In GTA 6? (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/can-you-replay-missions-in-gta-6/",
    used: "No mission replay from the menu, reloading a manual save instead, and the retry, quit and restart options in a mission",
  },
  {
    label: "GamesRadar+: Sadly, you can't replay missions in GTA 6",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-replay-missions-how-to/",
    used: "No mission replay, and manual saves (15 sessions) as the workaround",
  },
  {
    label: "IGN: GTA 6 Doesn't Let You Replay Story Missions, Here's Why",
    url: "https://in.ign.com/grand-theft-auto-vi/277363/gta-6-doesnt-let-you-replay-story-missions-heres-why",
    used: "No mission replay from any menu",
  },
  {
    label: "GameRant: How to Save in GTA 6 (not one of our main outlets, attributed only)",
    url: "https://gamerant.com/gta-6-save-game/",
    used: "Its claim that manual saving is off during the opening sequence, and Load Game offering the autosave and manual saves",
  },
  {
    label: "VGC: GTA 6 Tourist Trap mission walkthrough (also cited on our Tourist Trap guide)",
    url: "https://www.videogameschronicle.com/guide/gta-6-tourist-trap-mission-walkthrough/",
    used: "Second outlet, with PowerPyx, for the Chapter 1 point of no return at the start of Tourist Trap",
  },
];
