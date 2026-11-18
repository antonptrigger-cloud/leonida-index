/**
 * Data for /guides/trophies. QC'd 19 Nov 2026.
 * Verified: TrueTrophies (55 trophies, 28 secret, platinum "Vice Got a Price!"), TrueAchievements
 * (55 achievements, 1,000 Gamerscore, all flagged Offline Mode / Single Player) and GamesRadar+
 * (names, grades and requirements, including the secret ones).
 * Trophy names are facts; requirements are paraphrased in our own words.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const TROPHIES_VERIFIED = "2026-11-19";
export const TROPHIES_VERIFIED_LABEL = "19 Nov 2026";

export type Grade = "Platinum" | "Gold" | "Silver" | "Bronze";

export interface Trophy {
  name: string;
  grade: Grade;
  how: string;
  /** Slug of our own mission guide, when one exists. */
  guide?: string;
}

/** Trophies that PlayStation shows by name before you earn them (27, including the platinum). */
export const VISIBLE: Trophy[] = [
  { name: "Vice Got a Price!", grade: "Platinum", how: "Earn every other trophy." },
  { name: "A Long Road", grade: "Gold", how: "Reach 100% completion." },
  { name: "Cunning Stunts", grade: "Silver", how: "Complete 250 stunts." },
  { name: "Master of None", grade: "Bronze", how: "Try every type of activity once (GamesRadar+ counts 9)." },
  { name: "The Shootist", grade: "Silver", how: "Earn a gold medal in every shooting range challenge (GamesRadar+ counts 42)." },
  { name: "Top Fun", grade: "Bronze", how: "Win a Top Fun drone race at every location (GamesRadar+ counts 14)." },
  { name: "Earn Cash, Not Kudos", grade: "Bronze", how: "Win 20 different races." },
  { name: "Baited My Tackle", grade: "Bronze", how: "Beat Cal in a fishing challenge." },
  { name: "Stick Fiddler", grade: "Bronze", how: "Complete an arcade game." },
  { name: "Strangers & Freaks", grade: "Silver", how: "Complete 8 stranger mission strands across Leonida." },
  { name: "Positive Mental Attitude", grade: "Bronze", how: "Meditate at every spot in Leonida (GamesRadar+ counts 18)." },
  { name: "Don't Touch My Deck", grade: "Silver", how: "Complete 3 collectible card sets." },
  { name: "You WAiNKer!", grade: "Silver", how: "Use WAiNK at 100 locations." },
  { name: "One Last Thing", grade: "Bronze", how: "Complete 50 challenges." },
  { name: "Hot Together", grade: "Bronze", how: "Lose a 4-star wanted level with your partner and escape the heat." },
  { name: "Retail Therapy", grade: "Bronze", how: "Rob 3 shops back to back with your partner without losing your wanted level." },
  { name: "Whip It Good", grade: "Bronze", how: "Discover 100 vehicles." },
  { name: "Gunslinger", grade: "Bronze", how: "Take down 5 enemies in a single use of Combat Focus." },
  { name: "Sneakthief", grade: "Bronze", how: "Rob a jewelry store without being detected." },
  { name: "Maximum Withdrawal", grade: "Silver", how: "Rob 5 bank vaults and escape." },
  { name: "A Classic Blitz Play", grade: "Bronze", how: "Rob an armored truck and escape." },
  { name: "The Goodtime State", grade: "Bronze", how: "Explore all of Leonida." },
  { name: "Pest Control", grade: "Bronze", how: "Rob an illegal operation belonging to each gang (GamesRadar+ counts 9)." },
  { name: "Dime on the Dollar", grade: "Bronze", how: "Earn $250,000 laundering marked bills through your contacts." },
  { name: "Treat Yo Self", grade: "Bronze", how: "Spend $100,000 across all shops." },
  { name: "Little Boxes", grade: "Bronze", how: "Buy every garage property (GamesRadar+ counts 8)." },
  { name: "On the Spot", grade: "Bronze", how: "Register 10 vehicles to the Scooter Bros app." },
];

/** The 28 secret trophies. Names and requirements give away story, so the page blurs them. */
export const STORY: Trophy[] = [
  { name: "Just Like Paradise", grade: "Bronze", how: "Finish Gone Fishing.", guide: "gone-fishing" },
  { name: "Paradise Lost", grade: "Bronze", how: "Finish Chapter 1." },
  { name: "T**s Ass Drug Money", grade: "Bronze", how: "Finish Chapter 2." },
  { name: "Vice City, Baby!", grade: "Bronze", how: "Finish Chapter 3." },
  { name: "Top Of The World, Ma", grade: "Bronze", how: "Finish Chapter 4." },
  { name: "You Gotta Know When to Get Off", grade: "Gold", how: "Finish the final mission." },
  { name: "Trust", grade: "Bronze", how: "Finish Breakfast Run." },
  { name: "Break the Bank", grade: "Bronze", how: "Finish The Cartel Heist." },
  { name: "Family Matters", grade: "Bronze", how: "Finish Child's Play." },
  { name: "DWNFALL", grade: "Bronze", how: "Finish Headliners." },
  { name: "Hi-Jacked", grade: "Bronze", how: "Finish VCIA Takedown." },
  { name: "Snow Storm", grade: "Bronze", how: "Finish Operation Savage Glory." },
];

export const SECRET_OTHER: Trophy[] = [
  { name: "Road to Rehabilitation", grade: "Bronze", how: "Finish the final mission for Andy." },
  { name: "This Was No Boat Accident", grade: "Bronze", how: "Finish the final mission for Kenton." },
  { name: "The Lone Rider", grade: "Bronze", how: "Finish the final mission for Billy." },
  { name: "Supply & Demand", grade: "Bronze", how: "Finish the final mission for Randy." },
  { name: "Spin On This!", grade: "Bronze", how: "Finish the final mission for Tyrone." },
  { name: "Fair Game", grade: "Bronze", how: "Hunt a unique animal for Bret." },
  { name: "Catch Me If You Can", grade: "Bronze", how: "Make an unscheduled departure at VCIA." },
  { name: "Challenging Tank", grade: "Bronze", how: "Cryptic: \u201CKinda hot in these Rhinos.\u201D" },
  { name: "In The Beginning\u2026", grade: "Bronze", how: "Enjoy a cocktail with a view on Ocean Beach." },
  { name: "Capital Offense", grade: "Bronze", how: "Smash your way out of a vehicle showroom in classic style." },
  { name: "Let\u2019s Go Bowling", grade: "Bronze", how: "Follow through at the Kolt & Associates bowling alley." },
  { name: "Personal Best", grade: "Bronze", how: "Cryptic: \u201CA partnership with mass appeal.\u201D" },
  { name: "Actions Speak Louder", grade: "Bronze", how: "Make choices, for better or worse (GamesRadar+ counts 500)." },
  { name: "Bad Luck, I Guess", grade: "Bronze", how: "Cryptic: \u201CSecond time\u2019s the charm.\u201D" },
  { name: "The Truth Is Out There", grade: "Bronze", how: "Cryptic: \u201CWhat the hell just happened?\u201D" },
  { name: "Ten Pin", grade: "Bronze", how: "Knock bowling pins over with a melee drive-by." },
];

export const TROPHY_FAQ: { question: string; answer: string }[] = [
  {
    question: "How many trophies does GTA 6 have?",
    answer:
      "55 on PS5, according to TrueTrophies and GamesRadar+: 1 platinum, 2 gold, 6 silver and 46 bronze. TrueTrophies says 28 of them are secret (Reported).",
  },
  {
    question: "What is the GTA 6 platinum trophy called?",
    answer: "Vice Got a Price!, which is earned by getting every other trophy (Reported).",
  },
  {
    question: "Are there online trophies in GTA 6?",
    answer: "No. TrueAchievements flags all 55 achievements as offline and single player, and the PlayStation list matches (Reported).",
  },
  {
    question: "Are there Xbox achievements too?",
    answer: "Yes. TrueAchievements lists 55 achievements worth 1,000 Gamerscore in total (Reported).",
  },
  {
    question: "Do cheats disable trophies?",
    answer: "Yes, while a cheat is active. GamesRadar+ and Push Square both say trophies and saving are switched off for the session. See our cheats guide for details (Reported).",
  },
];

export const TROPHY_SOURCES = [
  {
    label: "TrueTrophies: Grand Theft Auto VI trophy list drops for PlayStation 5",
    url: "https://www.truetrophies.com/news/grand-theft-auto-vi-playstation-trophies",
    used: "Trophy count (55), the 28 secret trophies, the platinum and its name, and which names are public",
  },
  {
    label: "TrueAchievements: Grand Theft Auto VI achievements",
    url: "https://www.trueachievements.com/game/Grand-Theft-Auto-VI/achievements?secrets=1",
    used: "Second check on all 55 names, the 1,000 Gamerscore total and the offline and single-player flags",
  },
  {
    label: "GamesRadar+: The complete GTA 6 trophy and achievement list (18 Nov 2026)",
    url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-trophy-achievement-list/",
    used: "Grades, requirements and totals in brackets, including the secret trophies",
  },
  {
    label: "Push Square: GTA 6 cheats and unlock conditions",
    url: "https://www.pushsquare.com/guides/gta-6-cheats-and-unlock-conditions",
    used: "Cheats disable trophies and saving",
  },
];
