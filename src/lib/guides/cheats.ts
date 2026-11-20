/**
 * Data for /guides/cheats. QC'd 19 Nov 2026 against PC Gamer, GameSpot, GamesRadar+, Push Square and Engadget.
 * Rules: a code is only listed when at least two of PC Gamer, GameSpot, GamesRadar+ and Push Square
 * print the same input. Unlock challenges are listed when at least two outlets agree; where they
 * disagree we say so. Everything is Reported: Rockstar has not published a cheats list.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const CHEATS_VERIFIED = "2026-11-19";
export const CHEATS_VERIFIED_LABEL = "19 Nov 2026";

export interface CheatCode {
  name: string;
  effect: string;
  unlock: string;
  /** D-pad directions, U/D/L/R. */
  code: string;
  /** Outlets that print this exact code. */
  seen: string;
  note?: string;
}

const A: Record<string, string> = { U: "↑", D: "↓", L: "←", R: "→" };
export const arrows = (code: string) => code.split("").map((c) => A[c]).join(" ");

export const CODES: CheatCode[] = [
  { name: "$250,000", effect: "Adds $250,000 to your cash. It is the only money cheat.", unlock: "Finish the story", code: "URDLULDR", seen: "PC Gamer, GameSpot, GamesRadar+, Push Square" },
  { name: "Unlimited Focus", effect: "Focus never runs out.", unlock: "Finish the story", code: "DUUDUDUDUR", seen: "PC Gamer, GameSpot, GamesRadar+, Push Square" },
  { name: "Raise Heat Level", effect: "Raises your heat level across the map.", unlock: "Lose a 3-star wanted level 25 times", code: "LDRDUDU", seen: "PC Gamer, GameSpot, GamesRadar+, Push Square" },
  { name: "Raise Wanted Level", effect: "Raises your wanted level across the map.", unlock: "Lose a 3-star wanted level 50 times", code: "LDRDURU", seen: "GameSpot, GamesRadar+" },
  { name: "Body Armor", effect: "Adds body armor to your loadout.", unlock: "Complete 100 workouts", code: "DULUUUUUDD", seen: "GameSpot, GamesRadar+, Push Square" },
  { name: "Max Ammo", effect: "Fills all your ammo.", unlock: "Win 25 bronze medals or better at shooting ranges", code: "DURDLLUUDL", seen: "GameSpot, GamesRadar+", note: "PC Gamer says 20 medals; GameSpot, GamesRadar+ and Push Square say 25." },
  { name: "Infinite Ammo", effect: "Ammo never runs out.", unlock: "Win 25 silver medals or better at shooting ranges", code: "DURDLLUDDD", seen: "GameSpot, GamesRadar+, Push Square" },
  { name: "No Reload", effect: "Ammo never runs out and you never need to reload.", unlock: "Win 25 gold medals at shooting ranges", code: "DURDLLUDDU", seen: "GameSpot, GamesRadar+" },
  { name: "Attack Force", effect: "Bullets and melee hits launch whoever they hit.", unlock: "Finish the story", code: "DULLRDDUD", seen: "PC Gamer, GamesRadar+, Push Square", note: "GameSpot's printed code is missing one Left, which looks like a typo." },
  { name: "Exploding Balls", effect: "Sports balls explode on impact.", unlock: "Hit 20 enemies with explosive damage", code: "DULLRDDUR", seen: "PC Gamer, GameSpot, GamesRadar+, Push Square" },
  { name: "Vehicle Force", effect: "Vehicle collisions launch whoever they hit.", unlock: "Kill 25 enemies with a vehicle", code: "DULLRDLUD", seen: "GameSpot, GamesRadar+, Push Square" },
  { name: "Spawn Maibatsu Boomazoom", effect: "Spawns the vehicle where you stand.", unlock: "Complete 5 shopping challenges", code: "LURDLLUL", seen: "PC Gamer, GameSpot, GamesRadar+" },
  { name: "Spawn MTL Pumper", effect: "Spawns the vehicle where you stand.", unlock: "Discover the MTL Pumper in the Progress menu", code: "LURDLRRU", seen: "GameSpot, GamesRadar+" },
  { name: "Spawn HVY Bulldozer", effect: "Spawns a bulldozer.", unlock: "Discover the HVY Bulldozer in the Progress menu", code: "LURDLRRD", seen: "PC Gamer, GameSpot, GamesRadar+" },
  { name: "Cycle Weather", effect: "Changes the weather.", unlock: "Sources disagree: GameSpot says finish the story, GamesRadar+ says reveal the whole map", code: "DRUDRUR", seen: "PC Gamer, GameSpot, GamesRadar+" },
  { name: "Cataclysm filter", effect: "Fills the world with murky smoke.", unlock: "Discover a particular item in the Progress menu", code: "DDURRULLRR", seen: "GameSpot, GamesRadar+" },
  { name: "Dollhouse filter", effect: "A vivid, narrow-aspect-ratio filter.", unlock: "Spend 8 hours with your partner", code: "DDURRULLDR", seen: "PC Gamer, GameSpot, GamesRadar+" },
  { name: "Faded Glory filter", effect: "A color CRT TV look.", unlock: "Rob 50 stores with your partner", code: "DDURRULLLR", seen: "GameSpot, GamesRadar+" },
];

export interface ChallengeGroup {
  title: string;
  /** [cheat, unlock challenge]. Codes for these are not yet printed by two outlets. */
  items: [string, string][];
}

export const OTHER_CHALLENGES: ChallengeGroup[] = [
  {
    title: "Player",
    items: [
      ["Drunk", "Spend $2,500 on alcohol"],
      ["No Fall Damage", "Survive a freefall from 40 feet 20 times"],
      ["Parachute", "Complete 50 skydives or base jumps from 300 feet or higher"],
      ["Repair Vehicle", "Take 1st place in 10 races across three different race venues"],
      ["Unlimited Nitrous", "Complete 50 stunt jumps"],
    ],
  },
  {
    title: "Combat",
    items: [
      ["All Explosive Weapons", "Throw 100 grenades"],
      ["Incendiary Ammo", "Burn 100 enemies with fire damage"],
      ["Exploding Bottles", "Throw 100 molotovs"],
      ["Explosive Shotgun", "Hit 100 enemies with explosive damage"],
      ["Hauners H-AT", "Blow up 100 vehicles"],
    ],
  },
  {
    title: "Environment",
    items: [
      ["Move Time Forward", "Find 10 collectible watches"],
      ["Pause Time of Day", "Find 20 collectible watches"],
    ],
  },
  {
    title: "Spawn vehicles",
    items: [
      ["Interstate Ambulance", "Discover it in the Progress menu"],
      ["Airboat 09", "Complete 5 survival challenges"],
      ["Tuff BMX", "Complete 5 fitness challenges"],
      ["Vapid Stanier G2 Taxi", "Complete 5 sports challenges"],
      ["Lapwing Mallard", "Complete 5 vehicle challenges"],
      ["Maibatsu Sanchez", "Complete 5 criminal challenges"],
      ["Nagasaki Sea Sparrow", "Complete 5 exploration challenges"],
      ["Speeder 700 GT", "Complete 5 combat challenges"],
      ["Bravado Banshee", "Complete all combat challenges"],
      ["Nagasaki Carbon RS", "Complete all exploration challenges"],
      ["'65 Vapid Dominator", "Complete all fitness challenges"],
      ["Progen Emerus", "Complete all vehicle challenges"],
      ["Brimstone Golfer", "Complete all sports challenges"],
      ["Hauners Rhino Tank", "Complete all survival challenges"],
      ["Truffade Thrax", "Complete all shopping challenges"],
      ["Western Zombie Bobber", "Complete all criminal challenges"],
      ["Hauners P-996 Lazer", "Complete all challenges"],
      ["Inflatable Flamingo", "Destroy 50 cocaine flamingos"],
    ],
  },
  {
    title: "Screen filters",
    items: [
      ["Golden Hour", "Spend 4 hours holding hands"],
      ["Powdered Sugar", "Scan all space debris with WAiNK"],
      ["Pinhole", "Clear 25 gang operations with your partner"],
      ["Neon Jungle", "Discover all 16 Girlypop vehicles"],
      ["Yesteryear", "Discover the Ridgway"],
      ["Videotape", "Complete 50 activities with your partner"],
      ["Dark Mirror", "Make $500,000 selling vehicles"],
      ["Migraine", "Survive 6 minutes at a 6-star wanted level"],
      ["Bubblegum", "Find all 24 collectible cards for the Vice City Flamingos"],
      ["Fast Forward", "Complete 50 meditations"],
      ["Fisheye", "Catch 100 fish"],
      ["Pixel Art", "Make $250,000 selling collectibles"],
      ["Hellscape", "Steal 100 cop vehicles"],
    ],
  },
];

export const CHEATS_FAQ: { question: string; answer: string }[] = [
  {
    question: "Can I use cheats before finishing the story?",
    answer:
      "No. PC Gamer and GameSpot both loaded earlier saves and fresh saves to test it, and cheats did nothing before the story was finished. GamesRadar+ and Push Square report the same (Reported).",
  },
  {
    question: "Do GTA 6 cheats disable trophies?",
    answer:
      "Yes, while a cheat is active. GamesRadar+ and Push Square say trophies and achievements are switched off for the session and saving is blocked too. Push Square says restarting or reloading an older save turns trophies back on (Reported).",
  },
  {
    question: "Is there a money cheat in GTA 6?",
    answer: "Yes, one: $250,000, unlocked by finishing the story. GameSpot notes it is the only money cheat (Reported).",
  },
  {
    question: "How many cheats are there?",
    answer: "GamesRadar+ and Push Square both count 61 cheats across player, combat, vehicle, environment and screen filter groups (Reported).",
  },
  {
    question: "Do cheats work on Xbox as well as PS5?",
    answer: "GamesRadar+ lists the same entry method for PS5 and Xbox Series X. Hold LB and RB instead of L1 and R1 (Reported).",
  },
];

export const CHEATS_SOURCES = [
  {
    label: "PC Gamer: All GTA 6 cheats and how to unlock them (18 Nov 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-cheats-list/",
    used: "Story gate, saving, entry method and codes",
  },
  {
    label: "GameSpot: All GTA 6 cheats and how to unlock them (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/all-gta-6-cheats-and-how-to-unlock-them/",
    used: "Story gate, unlock challenges, codes",
  },
  {
    label: "GamesRadar+: All GTA 6 cheats for PS5 and Xbox (18 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-cheats/",
    used: "Progress menu, trophies disabled, codes, cheat count",
  },
  {
    label: "Push Square: GTA 6 cheats and unlock conditions",
    url: "https://www.pushsquare.com/guides/gta-6-cheats-and-unlock-conditions",
    used: "Trophies and saving disabled, how to re-enable, codes, cheat count",
  },
  {
    label: "Engadget: You can't use GTA 6 cheats until you beat the game (18 Nov 2026)",
    url: "https://www.engadget.com/2320852/you-cant-use-gta-6-cheats-until-you-beat-the-game/",
    used: "Story gate and per-cheat challenges",
  },
];
