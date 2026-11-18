/**
 * Full GTA 6 story mission list for the /guides/missions hub.
 *
 * Source policy (QC'd 19 Nov 2026):
 * - Chapter 1 (22 missions, same order): PC Gamer, Press Start (in-game Story Recap), VGC (to #18).
 * - Chapters 2-5 follow Press Start's list, which reads the in-game Story Recap and totals 93.
 *   PC Gamer's list totals 91 and differs in Chapters 2 and 3 (see the notes below).
 * - Three titles are hidden on purpose because the name alone is a major spoiler.
 * - Mission names are facts; no descriptions are copied from any outlet.
 *
 * This file must not import from src/lib/seo (site.ts imports guides data to build ROUTES).
 */

export interface StoryMission {
  /** Title as shown in the Story Recap, or null when hidden for spoilers. */
  title: string | null;
  /** Outlets label this one optional. */
  optional?: boolean;
}

export interface StoryChapter {
  number: number;
  name: string;
  missions: StoryMission[];
  /** Chapter-specific notes, shown inside the spoiler blur. */
  note?: string;
}

const m = (title: string, optional = false): StoryMission => (optional ? { title, optional } : { title });
const hidden: StoryMission = { title: null };

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    number: 1,
    name: "Just Like Paradise",
    missions: [
      m("Prologue"),
      m("Gone Fishing"),
      m("Gear Up"),
      m("Just a Scratch"),
      m("Lab Fees"),
      m("Unwanted Attention"),
      m("Pipework"),
      m("Hey Arnold!"),
      m("Island Dreams"),
      m("Feng Shui"),
      m("Coming Home"),
      m("Buck Me"),
      m("Clean Up After Donnie"),
      m("Down to Earth"),
      m("Clear Skies"),
      m("Day Release"),
      m("Swamped"),
      hidden,
      m("Recalibration"),
      m("Tourist Trap"),
      m("Home Sweet Home"),
      m("Discharge Time"),
    ],
  },
  {
    number: 2,
    name: "Paradise Lost",
    missions: [
      m("What's in the Bag?"),
      m("Ambulance Chaser"),
      m("Just Moved In"),
      m("Girls' Trip"),
      m("Moses"),
      m("Daily Driver"),
      m("Slam Dunk"),
      m("Breakfast Run"),
      m("Coffee Break"),
      m("Afternoon Delight"),
      m("Thrillbillies", true),
      m("Twist Wrist, Smash, Grab", true),
      m("Checking Out"),
    ],
    note: "Press Start's Story Recap list has 13 missions here. PC Gamer's list has 11 and leaves out Thrillbillies and Twist Wrist, Smash, Grab. PowerPyx labels both as optional Billy side quests, so counts differ between sites depending on whether they are included.",
  },
  {
    number: 3,
    name: "Tits Ass Drug Money",
    missions: [
      m("Welcome to Vice City"),
      m("Dealer's Choice"),
      m("Meet the Heders"),
      m("Dubious Provenance"),
      m("Mami Knows Best"),
      m("South Leonida Real Estate"),
      m("Tyrone"),
      m("Here, Kitty Kitty"),
      m("Kitty Litter Labs"),
      m("Car Service"),
      m("Top Billing"),
      m("Boobie Time"),
      m("First Impressions"),
      m("Crosstown Traffic"),
      m("Credit Check"),
      m("Steal the Zorrusso for Randy"),
      m("Sinfrontera National Bank"),
      m("Security Expert"),
      m("Ride or Die"),
      m("Company Property"),
      m("The Missing Link"),
      m("Safe Word"),
      m("Cooties"),
      m("Bricked Up"),
      m("Hidden Charges"),
      m("The Cartel Heist"),
    ],
    note: "This chapter has 26 missions in both Press Start's and PC Gamer's lists, but they don't match exactly. PC Gamer lists Caught Slipping and not Kitty Litter Labs. Press Start lists Kitty Litter Labs and not Caught Slipping. We follow Press Start (the in-game recap) and will update this once more players confirm it.",
  },
  {
    number: 4,
    name: "Vice City, Baby",
    missions: [
      m("Ocean Beach"),
      m("Another Life"),
      m("Company Cars"),
      m("Lawyer Up"),
      m("Party Hard"),
      m("Heavy Lifting"),
      m("Photo/Shoot"),
      m("Making Gainz"),
      m("Watch It"),
      m("Cash Injections"),
      m("Amateur Hour"),
      m("Dirty Work"),
      m("Too Much Baggage"),
      m("Adventures in Babysitting"),
      m("Fresh Evidence"),
      m("Power Play"),
      m("Child's Play"),
      m("Headliners"),
      m("Close Surveillance"),
      m("Delivery Method"),
      m("Team Building"),
      m("Fully Catered"),
      m("VCIA Takedown"),
      m("Sunset"),
      hidden,
    ],
  },
  {
    number: 5,
    name: "Top of the World, Ma",
    missions: [
      m("Bird in the Hand"),
      m("Taking Liberties"),
      m("VC Baby"),
      m("Doggie Bag"),
      m("Operation Savage Glory"),
      m("Protective Custody"),
      hidden,
    ],
  },
];

export const STORY_TOTAL = STORY_CHAPTERS.reduce((n, c) => n + c.missions.length, 0);
/** The total PC Gamer's list gives (it leaves out two optional Chapter 2 missions and differs in Chapter 3). */
export const PCGAMER_TOTAL = 91;

/** Overall position (1-based) of the first mission in a chapter. */
export const chapterStart = (n: number) =>
  STORY_CHAPTERS.filter((c) => c.number < n).reduce((sum, c) => sum + c.missions.length, 0) + 1;

export const HUB_VERIFIED = "2026-11-19";
export const HUB_VERIFIED_LABEL = "19 Nov 2026";

export const HUB_FAQ: { question: string; answer: string }[] = [
  {
    question: "How many missions are in GTA 6?",
    answer:
      "Press Start counts 93 story missions across five chapters, reading from the in-game Story Recap. PC Gamer's list totals 91 because it leaves out two optional missions and differs slightly in one chapter. We use the 93 figure and mark where lists differ (Reported).",
  },
  {
    question: "How many chapters does GTA 6 have?",
    answer: "Five. Chapter 1 is Just Like Paradise. The other chapter names and missions are behind the spoiler blur on this page.",
  },
  {
    question: "Is the Prologue part of Chapter 1?",
    answer:
      "In PC Gamer's, Press Start's and VGC's lists, yes: it is Chapter 1, mission 1. PowerPyx gives it its own heading, so some counts differ by one.",
  },
  {
    question: "Do I have to play the missions in this order?",
    answer:
      "Not always. Press Start notes the list shows the order in the in-game Story Recap, but the game's open design means some missions can be done out of order. PowerPyx says Gear Up, Just a Scratch, Lab Fees and Unwanted Attention all open once Gone Fishing is done.",
  },
  {
    question: "Which comes first, Just a Scratch or Lab Fees?",
    answer: "PC Gamer, Press Start and VGC all list Just a Scratch as mission 4 and Lab Fees as mission 5. You can play them either way round.",
  },
];

export const HUB_SOURCES = [
  {
    label: "PC Gamer: GTA 6 mission list, all chapters and missions",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-mission-list/",
    used: "Chapter 1 list and order, chapter names, the 91-mission count and the differences in Chapters 2 and 3",
  },
  {
    label: "Press Start: How many story missions are in GTA 6",
    url: "https://press-start.com.au/news/2026/11/18/heres-how-many-story-missions-are-in-grand-theft-auto-6/",
    used: "Full list in Story Recap order and the 93-mission count",
  },
  {
    label: "VGC: Grand Theft Auto 6 complete walkthrough hub",
    url: "https://www.videogameschronicle.com/guide/grand-theft-auto-6-complete-walkthrough-hub/",
    used: "Second check on Chapter 1 order (missions 1 to 18)",
  },
  {
    label: "PowerPyx: GTA 6 full walkthrough (all missions)",
    url: "https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/",
    used: "Optional labels on the Chapter 2 Billy missions and the unlock order of early missions",
  },
];
