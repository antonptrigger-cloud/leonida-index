/**
 * GTA 6 Chapter 1 mission guides.
 *
 * Drafted by Leonida Guides, QC'd against the cited sources on 18 Nov 2026 (pre-launch); mission 1-10 FAQs and sources re-checked 19 Nov 2026.
 * Rules for this file:
 * - Mission names and one-line premises are backed by at least two outlets.
 * - Quest givers, rewards, objectives and tips that come from a single walkthrough are
 *   labelled as reported, never stated as confirmed fact.
 * - Anything that gives away story beats goes in `objectives` or `spoiler`, which the page
 *   renders behind a reveal.
 *
 * This file must not import from src/lib/seo (site.ts imports it to build ROUTES).
 */

export type SourceId =
  | "pcgamer"
  | "pressstart"
  | "powerpyxIndex"
  | "powerpyx"
  | "rockstar"
  | "aprasi"
  | "gamesgg"
  | "pushsquare"
  | "vgc"
  | "gamesradar"
  | "pcgamerAch"
  | "gamespot";

export interface MissionSource {
  id: SourceId;
  label: string;
  url: string;
  /** What we used it for. */
  used: string;
}

export interface Fact {
  label: string;
  value: string;
  /** "confirmed" = two or more independent sources; "reported" = one walkthrough. */
  status: "confirmed" | "reported";
}

export interface Mission {
  slug: string;
  /** True when the real mission name is hidden on the hub as a major spoiler. Links to and from this page use neutral text ("Next mission" / "Previous mission"), and the real name or map label may only appear inside a spoiler blur. */
  hidden?: boolean;
  /** Chapter number. Defaults to 1. */
  chapter?: number;
  /** Position inside its chapter. Defaults to `order` (Chapter 1 only). */
  chapterOrder?: number;
  /** Position in the suggested order (see ORDER_NOTE). For Chapter 2 onwards this is the overall story number. */
  order: number;
  name: string;
  /** Map / phone label shown before the mission starts, when known. */
  startLabel?: string;
  seoTitle: string;
  seoDescription: string;
  /** Non-spoiler premise in our own words, safe to show by default. */
  teaser: string;
  intro: string[];
  facts: Fact[];
  /** Spoiler: walkthrough-reported objective flow. */
  objectives: string[];
  /** Spoiler: story notes. */
  spoiler?: string;
  /** Non-spoiler tips. */
  tips: { text: string; reported?: boolean; /** Optional contextual link shown after the tip. */ link?: { href: string; label: string } }[];
  notes?: string[];
  /** Optional real Q&A, rendered visibly by <Faq> (which also emits FAQPage JSON-LD). Never invent questions. */
  faq?: { question: string; answer: string }[];
  sources: MissionSource[];
  /** Override for the "Source:" line in the page header. */
  sourceLabel?: string;
  /** ISO 8601 date or timestamp of this page's last edit. Falls back to FAQ_UPDATED. Drives sitemap lastmod and dateModified. */
  updated?: string;
}

export const LAST_VERIFIED = "2026-11-18";
export const LAST_VERIFIED_LABEL = "18 Nov 2026";
/** Date the mission 1-10 pages last changed (FAQs, sources, Island Dreams reward label). Drives sitemap lastmod and dateModified. */
export const FAQ_UPDATED = "2026-11-19";

/** Number of missions in Chapter 1 (see src/lib/guides/story.ts for the full list). */
export const CHAPTER_1_TOTAL = 22;

export const CHAPTER = {
  number: 1,
  name: "Just Like Paradise",
};

export const ORDER_NOTE =
  "Order is a suggestion. PC Gamer, Press Start (from the in-game Story Recap) and VGC all list Just a Scratch (4) before Lab Fees (5), and count the Prologue as Chapter 1's first mission. PowerPyx lists Lab Fees first and gives the Prologue its own heading. According to PowerPyx, Gear Up, Just a Scratch, Lab Fees and Unwanted Attention all open up once Gone Fishing is done, so you can play them in any order.";

const PCGAMER: MissionSource = {
  id: "pcgamer",
  label: "PC Gamer: GTA 6 mission list",
  url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-mission-list/",
  used: "Mission name, chapter, order and one-line summary",
};
const PRESSSTART: MissionSource = {
  id: "pressstart",
  label: "Press Start: How many story missions are in GTA 6",
  url: "https://press-start.com.au/news/2026/11/18/heres-how-many-story-missions-are-in-grand-theft-auto-6/",
  used: "Mission name and Story Recap order",
};
const PP_INDEX: MissionSource = {
  id: "powerpyxIndex",
  label: "PowerPyx: GTA 6 full walkthrough (all missions)",
  url: "https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/",
  used: "Map labels, alternative order, no mission replay",
};
const pp = (path: string, used: string): MissionSource => ({
  id: "powerpyx",
  label: "PowerPyx: mission walkthrough",
  url: `https://www.powerpyx.com/${path}/`,
  used,
});
const ROCKSTAR: MissionSource = {
  id: "rockstar",
  label: "Rockstar Games: Only in Leonida (characters)",
  url: "https://www.rockstargames.com/VI/only-in-leonida",
  used: "Character background",
};
const APRASI: MissionSource = {
  id: "aprasi",
  label: "Aprasi: Just Like Paradise walkthrough",
  url: "https://www.aprasi.com/de/blogs/trending-topics/gta-6-just-like-paradise-walkthrough-how-chapter-1-begins",
  used: "Early-hours tip (unverified)",
};

const PUSHSQUARE: MissionSource = {
  id: "pushsquare",
  label: "Push Square: GTA 6 chapters and story missions",
  url: "https://www.pushsquare.com/guides/gta-6-chapters-and-story-missions",
  used: "Second check on mission order, no mission replay, and that Kenton has a side questline",
};
const GAMESRADAR_TROPHIES: MissionSource = {
  id: "gamesradar",
  label: "GamesRadar+: the complete GTA 6 trophy and achievement list",
  url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-trophy-achievement-list/",
  used: "Confirms there is a trophy for finishing Kenton's final mission",
};
const PCGAMER_ACHIEVEMENTS: MissionSource = {
  id: "pcgamerAch",
  label: "PC Gamer: GTA 6 achievement list",
  url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-achievements-list/",
  used: "Second check that there is a trophy for finishing Kenton's final mission",
};

const GAMESGG_ISLAND: MissionSource = {
  id: "gamesgg",
  label: "GAMES.GG: How to complete Island Dreams",
  url: "https://games.gg/grand-theft-auto-vi/guides/island-dreams-mission-walkthrough-grand-theft-auto-6/",
  used: "Second source for the $400 reward and Kenton buying later treasure (secondary source)",
};

const vgc = (path: string, label: string, used: string): MissionSource => ({
  id: "vgc",
  label,
  url: `https://www.videogameschronicle.com/guide/${path}/`,
  used,
});

const gr = (path: string, label: string, used: string): MissionSource => ({
  id: "gamesradar",
  label,
  url: `https://www.gamesradar.com/games/grand-theft-auto/${path}/`,
  used,
});

const PP_FACTS = "Quest giver, start point, reward, objective flow";

export const MISSIONS: Mission[] = [
  {
    slug: "prologue",
    order: 1,
    name: "Prologue",
    seoTitle: "GTA 6 Prologue Mission Guide: How the Story Opens",
    seoDescription:
      "GTA 6 Prologue guide: who you play, where it starts and what to expect from Lucia's opening mission, with a spoiler-safe overview and sources.",
    teaser: "Lucia's story opens with a counseling session inside.",
    intro: [
      "GTA 6 opens with Lucia, not Jason. The Prologue is a short, story-first mission set while she is still inside, and it introduces her before the game hands control to Jason.",
      "It is mostly cutscenes and light play, so there is little to get wrong. The useful thing to know is that one sequence is scripted to end the same way however well you play it.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1, mission 1 (PC Gamer, Press Start). PowerPyx files it under a separate Prologue heading.", status: "confirmed" },
      { label: "Playable", value: "Lucia", status: "reported" },
      { label: "Starts at", value: "Hamlet Prison, at the very start of the game", status: "reported" },
      { label: "Reward", value: "None", status: "reported" },
    ],
    objectives: [
      "Start in Lucia's cell and talk to your cellmates.",
      "Follow the guard to the counselor's office.",
      "Play through the flashback that follows. It includes a police chase you cannot escape, so don't spend time trying.",
      "Once the closing cutscenes finish, the game switches to Jason for Gone Fishing.",
    ],
    spoiler:
      "The flashback shows how Lucia ended up in prison. We have kept the details off this page on purpose; they are worth seeing for yourself.",
    tips: [
      { text: "The chase in the flashback is scripted to end the same way however you drive, so treat it as a chance to learn the on-foot and police-search controls rather than a test.", reported: true },
      { text: "There is no fail state worth worrying about here. Take your time with the cutscenes, as they set up Lucia's whole arc." },
    ],
    notes: [
      "Rockstar describes Lucia as fresh out of prison and looking for a way to change her odds. The Prologue is set before that.",
    ],
    faq: [
      {
        question: "Who do you play in the Prologue?",
        answer: "Lucia. PowerPyx lists her as the playable character, and PC Gamer's list describes the mission as Lucia meeting her counselor. The game then hands you Jason for Gone Fishing (Reported).",
      },
      {
        question: "Is the Prologue part of Chapter 1?",
        answer: "Yes on PC Gamer's and Push Square's lists, where it is mission 1 of Chapter 1. PowerPyx gives it its own Prologue heading, so some mission counts differ by one (Confirmed).",
      },
      {
        question: "Is there a reward for the Prologue?",
        answer: "No. PowerPyx lists no reward for it (Reported).",
      },
      {
        question: "Does it matter how well I play the Prologue?",
        answer: "Not for one sequence, which PowerPyx says is scripted to end the same way however you play it. Treat the Prologue as a chance to get used to the controls (Reported).",
      },
    ],
    sources: [PCGAMER, PRESSSTART, pp("gta-6-prologue-walkthrough", PP_FACTS), PP_INDEX, PUSHSQUARE, ROCKSTAR],
  },
  {
    slug: "gone-fishing",
    order: 2,
    name: "Gone Fishing",
    seoTitle: "GTA 6 Gone Fishing Mission Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Gone Fishing guide: Jason's first mission, a smuggling pickup with Cal and Donnie. Objectives, stealth tips and the reported reward, spoilers hidden.",
    teaser: "A smuggling pickup with Cal and Donnie goes sideways.",
    intro: [
      "Jason's story starts on the water. Gone Fishing is a drug pickup with his friend Cal and the pilot Donnie, and it goes wrong quickly.",
      "It works as the game's tutorial for Jason: boat handling, binoculars, stealth takedowns, fist fights, gunplay and, by the end, flying.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise", status: "confirmed" },
      { label: "Playable", value: "Jason", status: "confirmed" },
      { label: "Quest giver", value: "Cal", status: "reported" },
      { label: "Starts", value: "Straight after the Prologue, in Mariana County", status: "reported" },
      { label: "Ends at", value: "Jason's house, which you can enter and use from here on (VGC and PowerPyx)", status: "confirmed" },
      { label: "Listed reward", value: "Jason's house in Key Lento (PowerPyx's reward line)", status: "reported" },
    ],
    objectives: [
      "Chase Donnie's plane by boat and slow down beside each dropped package so Cal can haul it in.",
      "Head to the swamp and watch the handover through binoculars.",
      "When the deal falls apart, go in on foot and search the Kingfishers' camp in Pelican Valley for Donnie.",
      "Get into the shack, free him and fight your way to the seaplane.",
      "Fly back to Brian's marina and land on the water.",
    ],
    spoiler:
      "Donnie is taken by the Kingfishers, and the mission ends with Jason meeting Brian, the boss he runs jobs for.",
    tips: [
      { text: "You can clear most of the camp quietly. Stay crouched and take enemies down from behind; they only hear you when you are very close.", reported: true },
      { text: "On the way out there is optional cash in a trailer. It is missable, and PowerPyx says grabbing it counts toward a 'professional' reputation.", reported: true },
      { text: "GTA 6 tracks how you deal with enemies. Wounding rather than killing reportedly keeps your reputation from sliding toward 'psychopath'.", reported: true },
      { text: "Zombix is the healing item. You can carry up to five and restock at convenience stores.", reported: true },
    ],
    faq: [
      {
        question: "Which chapter is Gone Fishing in?",
        answer: "Chapter 1, Just Like Paradise. It is mission 2 on PC Gamer's and Push Square's lists, and PowerPyx also calls it the second main mission (Confirmed).",
      },
      {
        question: "What do you get for finishing Gone Fishing?",
        answer: "PowerPyx lists Jason's house in Key Lento as the reward. VGC doesn't call it a reward, but its walkthrough has you drive back to Jason's house and go inside at the end, and its house guide says the house projects open once you control Jason after this mission. So getting access to the house is Confirmed by two outlets, while the \"reward\" wording itself is PowerPyx's (Reported).",
      },
      {
        question: "Can I play Gone Fishing quietly?",
        answer: "Mostly. PowerPyx says you can clear most of the camp with crouched takedowns from behind, because enemies only hear you when you get very close (Reported).",
      },
      {
        question: "Is anything in Gone Fishing missable?",
        answer: "One optional cash pickup in a trailer on the way out, according to PowerPyx. You can skip it and still finish the mission (Reported).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      pp("gta-6-gone-fishing-walkthrough", PP_FACTS),
      vgc("gta-6-gone-fishing-mission-walkthrough", "VGC: GTA 6 Gone Fishing mission walkthrough", "Second outlet for ending at Jason's house and entering it"),
      vgc("gta-6-jasons-house-how-to-fix-all-projects-around-jasons-house", "VGC: GTA 6 Jason's House, how to fix all projects", "House projects open after Gone Fishing"),
      PP_INDEX,
      PUSHSQUARE,
      ROCKSTAR,
    ],
    updated: "2026-11-19T12:16:13+10:00",
  },
  {
    slug: "gear-up",
    order: 3,
    name: "Gear Up",
    startLabel: "Pick Up Another Gun",
    seoTitle: "GTA 6 Gear Up Mission Guide: Buying Your First Longarm",
    seoDescription:
      "GTA 6 Gear Up (Pick Up Another Gun) guide: where to go, which longarm you can afford and what to expect when you leave the store. Spoilers hidden.",
    teaser: "A trip to the gun store for something heavier.",
    intro: [
      "A short errand. Jason wants something heavier than a pistol, so it's a trip to the Ammu-Nation near his house.",
      "It doubles as your introduction to buying weapons, and it doesn't stay quiet for long.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise", status: "confirmed" },
      { label: "Playable", value: "Jason", status: "confirmed" },
      { label: "Quest giver", value: "Jason (self-started after Gone Fishing)", status: "reported" },
      { label: "Starts at", value: "The Ammu-Nation near Jason's house, Key Lento", status: "reported" },
      { label: "Reward", value: "A longarm of your choice", status: "reported" },
    ],
    objectives: [
      "Take the car outside Jason's house to the nearby Ammu-Nation.",
      "Talk to the clerk and buy a longarm (a shotgun or a tactical rifle).",
      "Deal with the trouble waiting outside.",
    ],
    spoiler:
      "A Kingfishers crew pulls up as you leave and opens fire. Win the fight or go down: PowerPyx says either way ends the mission with no lasting effect.",
    tips: [
      { text: "Early on you can probably only afford the shotgun.", reported: true },
      { text: "Unverified: one early guide says longarms are kept in your vehicle rather than carried, so keep your car close." },
    ],
    faq: [
      {
        question: "What is Gear Up called on the map?",
        answer: "Pick Up Another Gun. PowerPyx gives that as the map label for the mission (Reported).",
      },
      {
        question: "What do you get from Gear Up?",
        answer: "A longarm of your choice, a shotgun or a tactical rifle, bought at the Ammu-Nation near Jason's house. PowerPyx says you can probably only afford the shotgun at this point (Reported).",
      },
      {
        question: "When does Gear Up unlock?",
        answer: "According to PowerPyx it opens once Gone Fishing is done, at the same time as Just a Scratch, Lab Fees and Unwanted Attention, so you can play them in any order (Reported).",
      },
      {
        question: "Can I fail Gear Up?",
        answer: "Not in a way that matters. PowerPyx says the mission can end in more than one way and none of them has a lasting impact (Reported).",
      },
    ],
    sources: [PCGAMER, PRESSSTART, pp("gta-6-gear-up-pick-up-another-gun-walkthrough", PP_FACTS), PP_INDEX, APRASI],
  },
  {
    slug: "just-a-scratch",
    order: 4,
    name: "Just a Scratch",
    startLabel: "Fix Your Car",
    seoTitle: "GTA 6 Just a Scratch Mission Guide: Fixing the Ganado",
    seoDescription:
      "GTA 6 Just a Scratch (Fix Your Car) guide: getting Jason's Ganado repaired at Coastal Auto Care, what's free, and whether car upgrades are worth it yet.",
    teaser: "The Ganado goes into the shop.",
    intro: [
      "Jason's car has seen better days. Just a Scratch is a quick trip to the garage to sort it out, and it doubles as the tutorial for repair and respray shops.",
      "There is no story twist here. It's one of the shortest missions in the chapter.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise", status: "confirmed" },
      { label: "Playable", value: "Jason", status: "confirmed" },
      { label: "Quest giver", value: "Jason (self-started after Gone Fishing)", status: "reported" },
      { label: "Starts at", value: "Coastal Auto Care, Key Lento", status: "reported" },
      { label: "Reward", value: "Free engine repair and respray", status: "reported" },
    ],
    objectives: [
      "Drive Jason's '70 Ganado to Coastal Auto Care.",
      "Talk to Joey outside, then drive into the garage.",
      "Take the free full engine repair and pick a respray colour.",
    ],
    tips: [
      { text: "If you wreck the Ganado beforehand, saving and reloading reportedly puts it back outside Jason's house.", reported: true },
      { text: "Hold off on big upgrades. PowerPyx says this car gets replaced later and the upgrades go with it. You can't register a new personal vehicle until Chapter 2.", reported: true },
    ],
    faq: [
      {
        question: "What does Just a Scratch give you?",
        answer: "A free full engine repair and a respray in any colour you like, according to PowerPyx (Reported).",
      },
      {
        question: "Does Just a Scratch come before or after Lab Fees?",
        answer: "PC Gamer and Push Square both list Just a Scratch as mission 4 and Lab Fees as mission 5, while PowerPyx lists Lab Fees first. PowerPyx says both open once Gone Fishing is done, so either order works (Confirmed for the PC Gamer and Push Square order).",
      },
      {
        question: "Should I buy car upgrades here?",
        answer: "Not big ones. PowerPyx says Jason drives the same car for the rest of Chapter 1, but it is eventually replaced and the upgrades are lost (Reported).",
      },
      {
        question: "What if I wreck the Ganado before this mission?",
        answer: "PowerPyx says to make a manual save and reload it. The car should then be back outside Jason's house (Reported).",
      },
    ],
    sources: [PCGAMER, PRESSSTART, pp("gta-6-just-a-scratch-fix-your-car-walkthrough", PP_FACTS), PP_INDEX, PUSHSQUARE],
  },
  {
    slug: "lab-fees",
    order: 5,
    name: "Lab Fees",
    startLabel: "Collect Brian's Rent",
    seoTitle: "GTA 6 Lab Fees Mission Guide: Collecting Brian's Rent",
    seoDescription:
      "GTA 6 Lab Fees (Collect Brian's Rent) guide: Jason's first rent run, how the shop pays up, and when the reported cash reward actually arrives.",
    teaser: "Brian's rent, owed by a shop with a side business.",
    intro: [
      "Rockstar says Brian lets Jason live rent-free as long as he helps with local shakedowns. This is one of them: a gift shop owes Brian rent and Jason is sent to collect.",
      "The shop has a side business, and the rent doesn't arrive in the form you'd expect.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise", status: "confirmed" },
      { label: "Playable", value: "Jason", status: "confirmed" },
      { label: "Quest giver", value: "Jason, on Brian's behalf (self-started after Gone Fishing)", status: "reported" },
      { label: "Starts at", value: "A boutique gift shop in Key Lento", status: "reported" },
      { label: "Reward", value: "$600, paid later", status: "reported" },
    ],
    objectives: [
      "Go to the shop marker. It's locked, so call Brian from outside.",
      "Talk to the clerk about the rent and persuade him to pay.",
      "Open the back room with the keypad. The code is given to you in the mission.",
      "Call Brian, then take what you collected to his lockup further south.",
    ],
    spoiler:
      "The gift shop is a front for an acid lab. The clerk has no cash, so Jason takes product instead.",
    tips: [
      { text: "Jason has no bank account yet, so the cash reward reportedly turns up in the mailbox outside his house later. Remember to check it.", reported: true },
      { text: "Brian's lockup is the first fence you meet. Fences buy stolen goods and show as green icons on the map.", reported: true },
    ],
    notes: [
      "The $600 figure comes from a single walkthrough. We will confirm it in-game after launch.",
    ],
    faq: [
      {
        question: "How much does Lab Fees pay?",
        answer: "PowerPyx lists $600. Because Jason has no bank account yet, it says the cash turns up later in the mailbox outside his house. The figure comes from one walkthrough and we haven't checked it in-game (Reported).",
      },
      {
        question: "Why is Jason collecting Brian's rent?",
        answer: "Rockstar's character profile says Brian lets Jason live rent-free as long as he helps with local shakedowns, and PowerPyx names this mission Collect Brian's Rent (Rockstar for the first part, PowerPyx for the second).",
      },
      {
        question: "Can I start Lab Fees straight after Gone Fishing?",
        answer: "Yes, according to PowerPyx. It opens at the same time as Gear Up, Just a Scratch and Unwanted Attention, so the order is up to you (Reported).",
      },
      {
        question: "What is a fence in GTA 6?",
        answer: "A buyer for stolen goods. PowerPyx lists narcotics, jewelry and marked bills as things you can sell to fences, says Brian is one, and says fences show as green icons on the world map. More unlock as the story goes on (Reported).",
      },
    ],
    sources: [PCGAMER, PRESSSTART, pp("gta-6-lab-fees-collect-brians-rent-walkthrough", PP_FACTS), PP_INDEX, ROCKSTAR],
  },
  {
    slug: "unwanted-attention",
    order: 6,
    name: "Unwanted Attention",
    startLabel: "Go See Cal",
    seoTitle: "GTA 6 Unwanted Attention Mission Guide: The Hamlet Job",
    seoDescription:
      "GTA 6 Unwanted Attention (Go See Cal) guide: Cal and Jason's trip to Hamlet, how to shake the police and the new heat system, plus the reported reward.",
    teaser: "A drive to Hamlet with Cal to recover Brian's money.",
    intro: [
      "Brian is owed money and it's sitting somewhere awkward. Cal rides along to Hamlet with Jason on a job that turns into the game's first proper lesson in police heat.",
      "Expect a chase. The second half walks you through how GTA 6 remembers your car and clothes after you escape.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise", status: "confirmed" },
      { label: "Playable", value: "Jason, with Cal", status: "confirmed" },
      { label: "Quest giver", value: "Cal", status: "reported" },
      { label: "Starts at", value: "Cal, on the beach in north Key Lento", status: "reported" },
      { label: "Reward: scanner", value: "A police scanner on Jason's phone (VGC and PowerPyx)", status: "confirmed" },
      { label: "Reward: cash", value: "$150 (PowerPyx only)", status: "reported" },
    ],
    objectives: [
      "Meet Cal and drive north-west to Hamlet.",
      "Get into the police impound and find the right car.",
      "Get away from the police.",
      "Respray the car at the Hamlet Pay 'n' Spray, then leave it at Brian's garage and pick up the cash.",
      "Follow the prompts to change your hat, glasses and outfit.",
    ],
    spoiler:
      "Brian's money is in the trunk of a car the police have impounded. Getting it out triggers a chase however carefully you play it.",
    tips: [
      { text: "After a chase, police remember your outfit and your vehicle. A respray, a different car or a change of clothes all lower your recognition.", reported: true },
      { text: "Ducking behind the wheel reportedly makes you harder to spot without changing outfits.", reported: true },
      { text: "Cal sets up a police scanner on Jason's phone here. It reportedly keeps working passively after the mission.", reported: true },
    ],
    notes: ["The scanner is confirmed by VGC and PowerPyx. The $150 still comes from PowerPyx alone (VGC only says you collect cash from the car), so we label it Reported."],
    faq: [
      {
        question: "What do you get for Unwanted Attention?",
        answer: "A police scanner on Jason's phone: VGC and PowerPyx both say you get it on the way to Hamlet (Confirmed). PowerPyx also lists $150 in cash from the car. VGC mentions collecting cash but gives no amount, so the $150 is Reported.",
      },
      {
        question: "How do I stop the police recognising me after a chase?",
        answer: "PowerPyx says police remember your clothes and your vehicle. A respray, a different vehicle, or a change of hat, glasses or outfit all lower your recognition (Reported).",
      },
      {
        question: "Does the police scanner keep working after the mission?",
        answer: "PowerPyx says it runs passively, so you can hear police chatter during crimes and chases from then on (Reported).",
      },
      {
        question: "Can I hide from the police without changing outfits?",
        answer: "PowerPyx says ducking behind the wheel while driving makes you harder to recognise, so you don't have to change clothes (Reported).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      pp("gta-6-unwanted-attention-go-see-cal-walkthrough", PP_FACTS),
      vgc("gta-6-unwanted-attention-mission-walkthrough", "VGC: GTA 6 Unwanted Attention mission walkthrough", "Second outlet for the police scanner; collecting cash at the end with no amount given"),
      PP_INDEX,
      ROCKSTAR,
    ],
    updated: "2026-11-19T12:16:13+10:00",
  },
  {
    slug: "pipework",
    order: 7,
    name: "Pipework",
    startLabel: "Collect Mandy's Rent",
    seoTitle: "GTA 6 Pipework Mission Guide: Collecting Mandy's Rent",
    seoDescription:
      "GTA 6 Pipework (Collect Mandy's Rent) guide: a rent run that turns into a plumbing job. When it unlocks, the steps and the easy-to-miss reward.",
    teaser: "A rent call that turns into a plumbing job.",
    intro: [
      "Not every rent run is a shakedown. Jason calls on Mandy, one of Brian's tenants, and she won't pay until her sink is fixed.",
      "It's a short, comic interlude, and the only reward is easy to walk past.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise", status: "confirmed" },
      { label: "Playable", value: "Jason", status: "confirmed" },
      { label: "Quest giver", value: "Brian and Mandy", status: "reported" },
      { label: "Unlocks", value: "After Gear Up, Just a Scratch, Lab Fees and Unwanted Attention", status: "reported" },
      { label: "Reward", value: "A Macizo cigar, if you pick it up", status: "reported" },
    ],
    objectives: [
      "Talk to Mandy outside her house in Key Lento.",
      "Follow her in and find the plunger.",
      "Fix the kitchen sink with the plunger and wrench.",
    ],
    spoiler:
      "Mandy has other ideas about how the visit should go. Whatever you say, the scene ends the same way, with Jason turning her down.",
    tips: [
      { text: "When Mandy throws the cigar box into the street, pick it up on your way out. It's the only reward.", reported: true },
    ],
    faq: [
      {
        question: "What is the reward for Pipework?",
        answer: "A Macizo cigar, and only if you pick it up from the street as you leave. PowerPyx lists nothing else (Reported).",
      },
      {
        question: "When does Pipework unlock?",
        answer: "PowerPyx says you need to have finished Gear Up, Lab Fees, Just a Scratch and Unwanted Attention first (Reported).",
      },
      {
        question: "Do my dialogue choices in Pipework change anything?",
        answer: "No. PowerPyx says you can interrupt the conversation or let it run, and the outcome is the same either way (Reported).",
      },
    ],
    sources: [PCGAMER, PRESSSTART, pp("gta-6-pipework-collect-mandys-rent-walkthrough", PP_FACTS), PP_INDEX],
  },
  {
    slug: "hey-arnold",
    order: 8,
    name: "Hey Arnold!",
    startLabel: "Meet Brian",
    seoTitle: "GTA 6 Hey Arnold! Mission Guide: Tracking Down the Broker",
    seoDescription:
      "GTA 6 Hey Arnold! (Meet Brian) guide: Brian, Jason and Cal go looking for a broker. Where it starts, the chase, and whether the final choice matters.",
    teaser: "Brian's broker goes quiet, so the crew goes looking.",
    intro: [
      "The trouble with the Kingfishers catches up with Brian: a business contact he has relied on for years stops answering. Brian brings in Jason, with Cal along, to find out where Arnold went.",
      "This is the chapter's first big action set piece: a driving chase with shooting from the car.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise", status: "confirmed" },
      { label: "Playable", value: "Jason, with Brian and Cal", status: "confirmed" },
      { label: "Quest giver", value: "Brian (he calls a few minutes after Pipework)", status: "reported" },
      { label: "Starts at", value: "Brian, at the pool bar in south Key Lento", status: "reported" },
      { label: "Reward", value: "None", status: "reported" },
    ],
    objectives: [
      "Meet Brian and take the wheel of his car.",
      "Pick up Cal at the liquor store.",
      "Search for Arnold near the radar station.",
      "Chase him by car, then on foot.",
      "Decide what happens to him at the docks.",
    ],
    spoiler:
      "The meeting with Arnold turns into a shootout and a chase. At the end you choose whether he lives. PowerPyx says he leaves the story either way.",
    tips: [
      { text: "You can shoot from the car during the chase, and the slow-motion aim reportedly makes the bikers much easier to hit.", reported: true },
      { text: "The route takes you over stunt jumps. Completed jumps stay marked on the map under the exploration filter.", reported: true },
    ],
    faq: [
      {
        question: "How do I start Hey Arnold!?",
        answer: "After Pipework, wait a few minutes. PowerPyx says Brian then phones and marks the mission, which starts at the pool bar in south Key Lento (Reported).",
      },
      {
        question: "Can I shoot from the car during the chase?",
        answer: "Yes. PowerPyx says you can fire from the car, and that slowing time makes the bikers easier to hit (Reported).",
      },
      {
        question: "Do the stunt jumps in this mission count?",
        answer: "PowerPyx says you hit some stunt jumps automatically along the chase route, and that completed jumps stay marked on the map under the Exploration filter (Reported).",
      },
      {
        question: "Is there a reward for Hey Arnold!?",
        answer: "No. PowerPyx lists none (Reported).",
      },
    ],
    sources: [PCGAMER, PRESSSTART, pp("gta-6-hey-arnold-meet-brian-walkthrough", PP_FACTS), PP_INDEX],
  },
  {
    slug: "island-dreams",
    order: 9,
    name: "Island Dreams",
    startLabel: "Work for Kenton",
    seoTitle: "GTA 6 Island Dreams Mission Guide: The Shipwreck Dive",
    seoDescription:
      "GTA 6 Island Dreams (Work for Kenton) guide: Jason's first dive, finding the hidden items at the wreck, oxygen and gear tips, and the reported pay.",
    teaser: "A shipwreck dive for Kenton.",
    intro: [
      "Jason picks up work from Kenton Rees, who runs a beachside dive shop called Island Dreams. The job is to take a bachelor party down to a shipwreck, but the wreck is the real reason Kenton wants someone down there.",
      "It's the game's introduction to scuba diving and the metal detector.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise", status: "confirmed" },
      { label: "Playable", value: "Jason", status: "confirmed" },
      { label: "Quest giver", value: "Kenton Rees", status: "reported" },
      { label: "Starts at", value: "Kenton's Island Dreams shop on the beach, Key Lento", status: "reported" },
      { label: "Reward", value: "$400", status: "reported" },
    ],
    objectives: [
      "Talk to Kenton at his shop.",
      "Take the boat to the dive site and put on the scuba gear.",
      "Lead the group through the underwater trench to the wreck.",
      "Use the metal detector to find all three spots near the wreck.",
      "Help the diver who gets stuck, then get everyone back to the boat.",
    ],
    spoiler:
      "Kenton is a treasure hunter, and the dive is cover. On the way back a shark turns up. Equip the harpoon before you leave the wreck: whether you save the stuck diver changes some dialogue but has no lasting effect.",
    tips: [
      { text: "Oxygen is generous, so you have time to search properly.", reported: true },
      { text: "Swim near fish to study them. It counts toward the animal list on the 100% checklist.", reported: true },
    ],
    notes: [
      "Kenton has his own side questline later, with its own trophy (PowerPyx).",
      "Kenton keeps the doubloons you recover, and the $400 is separate. He also offers to buy treasure Jason finds at other wrecks in the Keys (GAMES.GG). GameSpot says full dive spots can add up to tens of thousands of dollars over time; PC Gamer calls diving mildly lucrative but very time-consuming. See our money guide.",
    ],
    faq: [
      {
        question: "How much does Island Dreams pay?",
        answer: "PowerPyx lists $400, and GAMES.GG gives the same figure. GAMES.GG is a secondary source, so we treat the amount as Reported.",
      },
      {
        question: "Do I need to worry about running out of oxygen?",
        answer: "No. PowerPyx says there is more than enough oxygen to take your time searching (Reported).",
      },
      {
        question: "Does diving in this mission count toward the 100% checklist?",
        answer: "Studying fish by swimming near them adds them to your animal database, and PowerPyx says progress made during the story already counts toward the 100% checklist (Reported).",
      },
      {
        question: "Does Kenton have more work for Jason later?",
        answer: "Yes. Push Square lists a Kenton side questline, and GamesRadar+ and PC Gamer both list a trophy for finishing his final mission (Confirmed).",
      },
    ],
    sources: [PCGAMER, PRESSSTART, pp("gta-6-island-dreams-work-for-kenton-walkthrough", PP_FACTS), PP_INDEX, GAMESGG_ISLAND, PUSHSQUARE, GAMESRADAR_TROPHIES, PCGAMER_ACHIEVEMENTS],
  },
  {
    slug: "feng-shui",
    order: 10,
    name: "Feng Shui",
    startLabel: "Meet Cal",
    seoTitle: "GTA 6 Feng Shui Mission Guide: A Night In With Cal",
    seoDescription:
      "GTA 6 Feng Shui (Meet Cal) guide: Jason and Cal rearrange the house and try out the in-game console. What to do, and why it's a good time to save.",
    teaser: "A night in at Jason's, rearranging the furniture with Cal.",
    intro: [
      "A night in. Cal comes round to Jason's place with opinions about the furniture, and the evening drifts into beers and video games.",
      "It's the quiet beat before the chapter changes gear.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise", status: "confirmed" },
      { label: "Playable", value: "Jason, with Cal", status: "confirmed" },
      { label: "Quest giver", value: "Cal, by phone message", status: "reported" },
      { label: "Starts at", value: "Jason's house, Key Lento, after Island Dreams", status: "reported" },
      { label: "Reward", value: "None", status: "reported" },
    ],
    objectives: [
      "Head home, grab a beer and sit down with Cal.",
      "Move the TV, coffee table, couch and chair.",
      "Try the two games Cal loads up on the console.",
    ],
    spoiler:
      "Cal wants the place sorted before Lucia gets home, and the night ends with the news that sets up the next mission, Coming Home.",
    tips: [
      { text: "Neither console game can be won, so don't sink time into them.", reported: true },
      { text: "Moving the coffee table again just loops it back to where it started.", reported: true },
      { text: "PowerPyx says GTA 6 has no mission replay. This is a natural point for a manual save before the story moves on." },
    ],
    notes: [
      "PowerPyx's header lists Cal as the quest giver, but its walkthrough mentions a text from a different character before the marker appears. We will check this after launch.",
    ],
    faq: [
      {
        question: "Is there a reward for Feng Shui?",
        answer: "No. PowerPyx lists none (Reported).",
      },
      {
        question: "Can I win the console games in Feng Shui?",
        answer: "No. PowerPyx says neither game can be won, so there is no point spending time on them (Reported).",
      },
      {
        question: "How does Feng Shui start?",
        answer: "PowerPyx says a text message arrives shortly after Island Dreams, a marker then appears at Jason's house, and the mission begins when you walk in. Its header and its walkthrough name different senders for the text, so we aren't sure who sends it (Reported).",
      },
      {
        question: "Can I replay Feng Shui later?",
        answer: "No. PowerPyx and Push Square both say story missions can't be replayed, so make a manual save if you want a way back to this point (Confirmed).",
      },
    ],
    sources: [PCGAMER, PRESSSTART, pp("gta-6-feng-shui-meet-cal-walkthrough", PP_FACTS), PP_INDEX, PUSHSQUARE],
  },
  {
    slug: "coming-home",
    order: 11,
    name: "Coming Home",
    seoTitle: "GTA 6 Coming Home Mission Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Coming Home walkthrough: the optional errands and house repairs to finish first, how the mission plays out and what you can't redo. Spoilers hidden.",
    teaser: "Optional prep that shapes Jason and Lucia's relationship, then the mission itself.",
    intro: [
      "Coming Home is the 11th story mission, and it comes with a block of optional prep that you can only do beforehand. VGC and PowerPyx both say that prep affects how your relationship with Lucia starts out, so it is worth finishing before you trigger the main marker.",
      "The mission itself is hands-on rather than a set-piece job. The specifics stay behind the blur on this page.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 11 (PC Gamer, Push Square, VGC, PowerPyx)", status: "confirmed" },
      { label: "Playable", value: "Jason", status: "confirmed" },
      { label: "Optional prep", value: "Five errands and four repairs at Jason's house before the main part", status: "confirmed" },
      { label: "Unlocks after", value: "Feng Shui (PowerPyx's requirement)", status: "reported" },
      { label: "Quest giver", value: "Lucia", status: "reported" },
      { label: "Starts at", value: "Hamlet, Vice-Dale County", status: "reported" },
      { label: "Cash reward", value: "None listed", status: "reported" },
    ],
    objectives: [
      "Before the main marker, you can run five optional errands: buy Lucia a necklace, pick up groceries, collect her clothes from Andy at the bar where he works, buy flowers and get Jason a haircut. VGC and PowerPyx both list all five, and both say they can be skipped but help the relationship.",
      "Use your own car for the clothes run. Both walkthroughs say the clothes should sit in the trunk until you reach the prison.",
      "Finish the four house repairs: the front steps (you need these to get inside anyway), the leaky roof via the ladder by the door, the bedroom wall plus a coat of paint, and the railing near the workout gear on the back deck. VGC's house guide and PowerPyx agree on all four. VGC says the colour of the paint makes no difference.",
      "PowerPyx says the mission marker is live at the prison in Hamlet (Hamlet Correctional) from the start, but you have to pass time until Lucia calls to say she is out. Sleeping at Jason's house is the quickest way, and it can take a second night. PowerPyx's map label for the mission is \"Lucia's Release\".",
      "Drive to the prison and speak to the guard at reception. A short flashback plays and then you meet Lucia (VGC and PowerPyx).",
      "Walk to the car with Lucia and drive to the Rusty Anchor bar (VGC and PowerPyx). PowerPyx marks it in the north of Key Lento.",
      "Order drinks at the bar. PowerPyx says it is two Pindayho beers for $6, with the second left on the counter for you to pick up. Take them outside to Lucia and talk.",
      "After that scene the game cuts to Jason in the bathroom. Go back to Lucia, and when you are told to hang out with your friends, try a few of the marked interactions until the game moves you on (VGC and PowerPyx).",
      "Donnie offers Jason a line of cocaine. Both walkthroughs say you can accept or refuse, and PowerPyx says it changes nothing beyond an extra cutscene. They disagree on where Donnie is when he asks (VGC: the bathroom, PowerPyx: the other bar), so follow the prompts in your game.",
      "Lucia asks Jason to dance. VGC says you can accept or decline, and that accepting gives the relationship an early boost. PowerPyx treats the dance as part of the main path.",
      "Optional, VGC only: Rhonda's pet lizard runs out of the bar. Focus mode finds it in a bush across the street.",
      "Mattia arrives. Talk to him and play pool (VGC and PowerPyx). PowerPyx says your score doesn't matter, because the game is interrupted either way.",
      "Some servicemen start trouble (PowerPyx calls them the Aviators). Take it outside and deal with D-Man in a short melee fight (VGC and PowerPyx). PowerPyx's advice is to watch for an opponent winding up and hold block at that moment.",
      "Police turn up. Run with Lucia and follow her until the final cutscene (VGC and PowerPyx).",
    ],
    spoiler:
      "Lucia is released from prison, and the mission is the night out that celebrates it. PowerPyx says the flashback at the prison shows the couple's break-up (Reported). Mattia is the partner of a woman Lucia knew inside (VGC and PowerPyx agree on this; PowerPyx names her Kat), and VGC says Lucia thinks he may have work for the pair. PowerPyx says the night ends back at Jason's house, where the repairs are shown off if you did them, and that Donnie calls about a job the next morning. Lucia then lives at Jason's house (PowerPyx, Reported).",
    tips: [
      { text: "Do the optional prep before you trigger the main marker. VGC and PowerPyx both say it improves your relationship with Lucia." },
      { text: "VGC says the four house repairs close during this mission and that skipping them leaves your starting relationship meter noticeably lower, so finish them first.", reported: true },
      { text: "PowerPyx says finishing all five errands starts the relationship at 3 out of 4 on the rating in the Jason & Lucia menu.", reported: true },
      { text: "PowerPyx lists the necklace at $425 and says it matters again in Chapter 2, so it is worth buying.", reported: true },
      { text: "PowerPyx suggests turning on all HUD and progress notifications under Settings > UI so you see the heart pop-ups when the relationship changes.", reported: true },
      { text: "Keep a manual save. PowerPyx and Push Square say story missions can't be replayed, and Push Square suggests saving at the start of each chapter (Options > Game > Save Game)." },
    ],
    notes: [
      "PowerPyx says Chapter 1 missions can appear in a slightly different order and plays Clean Up After Donnie before Buck Me. PC Gamer, Push Square and Press Start list Buck Me next.",
      "VGC writes the bar owner's name as Andi. PowerPyx and Push Square write Andy, and so do we.",
      "Where VGC and PowerPyx disagree on small details, such as where a character is during one scene, we leave the detail out or attribute it to one outlet.",
    ],
    faq: [
      {
        question: "Do I have to do the optional errands before Coming Home?",
        answer: "No. VGC and PowerPyx both say they can be skipped, but both say they help your relationship with Lucia (Confirmed).",
      },
      {
        question: "Can I still repair Jason's house later?",
        answer: "VGC says no. The repair jobs close during this mission, and skipping them leaves your starting relationship lower (Reported).",
      },
      {
        question: "Can I replay Coming Home?",
        answer: "No. PowerPyx and Push Square both say story missions can't be replayed, so keep a manual save if you want a way back (Confirmed).",
      },
      {
        question: "Is there a cash reward for Coming Home?",
        answer: "PowerPyx lists none (Reported).",
      },
      {
        question: "Which missions come before and after Coming Home?",
        answer: "It is mission 11 of Chapter 1, straight after Feng Shui on PC Gamer's, Push Square's and Press Start's lists. Those lists put Buck Me next, while PowerPyx plays Clean Up After Donnie first (Confirmed for the list order).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      vgc("gta-6-coming-home-mission-walkthrough", "VGC: GTA 6 Coming Home mission walkthrough (18 Nov 2026)", "Errands, objective flow, Rusty Anchor, Mattia, the fight, the repairs link"),
      vgc("gta-6-jasons-house-how-to-fix-all-projects-around-jasons-house", "VGC: GTA 6 Jason's House, how to fix all projects", "The four house repairs, paint colour, repairs closing, effect on the relationship meter"),
      pp("gta-6-coming-home-lucias-release-walkthrough", "Start point, quest giver, objectives, drink price, relationship rating, necklace price"),
      PP_INDEX,
      PUSHSQUARE,
    ],
    updated: "2026-11-19T12:16:13+10:00",
  },
  {
    slug: "buck-me",
    order: 12,
    name: "Buck Me",
    startLabel: "Set Up Bank Account",
    seoTitle: "GTA 6 Buck Me Mission Guide: BuckMe App & Family Savings",
    seoDescription:
      "GTA 6 Buck Me walkthrough: the bank visit, how BuckMe and Family Savings work, the roughly $1,000 cash cut-off and what you can't undo. Spoilers hidden.",
    teaser: "A short errand that switches on the banking app you'll rely on for the rest of the game.",
    intro: [
      "Buck Me is the 12th story mission. It is more of an errand than an action job, but it unlocks the BuckMe banking app, which is how most of your money is handled from here on.",
      "A few minutes spent understanding pocket cash, your checking account and Family Savings now will save confusion later, so this page covers how the app works as well as the mission. The step-by-step and the story notes stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 12 (PC Gamer, Push Square, Press Start, VGC)", status: "confirmed" },
      { label: "Playable", value: "Jason", status: "confirmed" },
      { label: "Reward", value: "The BuckMe banking app", status: "confirmed" },
      { label: "Quest giver", value: "Lucia, by phone call", status: "reported" },
      { label: "Unlocks after", value: "Coming Home, with the call about half a day later (PowerPyx)", status: "reported" },
      { label: "Starts at", value: "Key Lento, Mariana County (PowerPyx)", status: "reported" },
      { label: "Welcome deposit", value: "$100 into your checking account (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Head to the bank as Jason and ask at the counter. The teller sends you to the manager (VGC and PowerPyx). PowerPyx puts the bank in Key Lento and calls it a Fleeca branch, with the manager at a table in the right-hand corner.",
      "Follow the manager into his office. VGC says Lucia joins you there.",
      "The meeting makes clear that a normal account isn't possible for the pair (VGC and PowerPyx). PowerPyx says it is down to a failed credit check and that the manager suggests the BuckMe app instead. VGC says you are asked whether Jason has any savings, and can answer that he has nothing or that there is cash at his house. Neither outlet says your answer changes anything.",
      "A cutscene returns you to Jason's house, where the phone and the BuckMe app are introduced (VGC and PowerPyx).",
      "Open your phone and select BuckMe. PowerPyx describes the icon as a purple \"B\" and says $100 has landed in your checking account as a welcome gift. GamesRadar+ says Up on the D-pad pulls out the phone.",
      "Move money into Family Savings with the \"Buck Yourself\" option (GamesRadar+ and PowerPyx both name it). PowerPyx has you move the $100.",
      "VGC says the evening ends with some TV on the couch with Lucia and then bed, which completes the mission.",
    ],
    spoiler:
      "The bank meeting shows how little financial history Jason and Lucia have between them, which is why they end up with an app rather than a branch account. PowerPyx says the manager turns them down on credit grounds and offers BuckMe instead (Reported). VGC says the night ends quietly at home with Lucia (Reported).",
    tips: [
      { text: "Treat the pocket-cash cut-off as around $1,000. PowerPyx says shops take pocket cash up to $999 and route anything over $1,000 through BuckMe, and GamesRadar+ says cash covers smaller purchases up to $1,000. Bigger purchases are charged to your BuckMe account." },
      { text: "Family Savings is one-way. Money you move in can never be withdrawn or spent (PowerPyx and GamesRadar+), so keep enough in checking and pocket cash for early spending." },
      { text: "Pocket cash is lost if you die. PowerPyx says some of your checking balance is also lost on death, but less. GamesRadar+ says pocket cash is lost if you are wasted or busted." },
      { text: "If your checking account hits its limit, incoming payments stay pending until you spend or move money (PowerPyx and GamesRadar+). Both say the limits rise as you progress." },
      { text: "PowerPyx says you can deposit at any ATM and that the app has an ATM finder that sets a waypoint. GamesRadar+ also suggests using ATMs to protect pocket cash.", reported: true },
      { text: "PowerPyx says each Family Savings goal raises your checking limit and some goals unlock price-reduction perks, tracked in an optional story-long mission called Save for the Future. GamesRadar+ describes five savings tiers and an interest boost if you reach a target before the limit increases.", reported: true },
      { text: "GamesRadar+ says the state of your savings affects some character interactions and the ending, and gives no more detail.", reported: true },
      { text: "Keep a manual save. PowerPyx and Push Square say story missions can't be replayed." },
      { text: "VGC says the RydeMe rideshare app, which lets you pay to skip trips across the map, needs this bank account and unlocks during this mission. GamesRadar+ gives a later date, so the outlets disagree.", reported: true, link: { href: "/guides/fast-travel", label: "Read our fast travel guide" } },
    ],
    notes: [
      "Order: PC Gamer, Push Square, Press Start and VGC list Buck Me 12th, straight after Coming Home and before Clean Up After Donnie. PowerPyx plays Clean Up After Donnie first and numbers Buck Me 13th. Both open the day after Coming Home, so either order works.",
      "Pocket-cash limit: PowerPyx says $999 and GamesRadar+ says $1,000. We write it as around $1,000.",
      "Details only one outlet gives, such as the bank's name and location, the $100 gift, the credit check and the icon colour, are marked Reported.",
    ],
    faq: [
      {
        question: "Can I take money back out of Family Savings?",
        answer: "No. PowerPyx and GamesRadar+ both say money moved into Family Savings can never be withdrawn or spent (Confirmed).",
      },
      {
        question: "Why can't I pay for something with cash?",
        answer: "Shops take pocket cash for smaller purchases, around $1,000 and under. PowerPyx says $999 and GamesRadar+ says $1,000. Anything bigger goes through your BuckMe account (Confirmed).",
      },
      {
        question: "What happens to my money if I die?",
        answer: "Both PowerPyx and GamesRadar+ say you lose your pocket cash. PowerPyx adds that some checking balance is lost too, but less (Confirmed for pocket cash, Reported for the checking loss).",
      },
      {
        question: "Why aren't my payments arriving?",
        answer: "If your checking account is at its limit, incoming payments sit as pending until you spend or move money (Confirmed: PowerPyx and GamesRadar+).",
      },
      {
        question: "Should I play Buck Me or Clean Up After Donnie first?",
        answer: "Either works. PC Gamer, Push Square, Press Start and VGC list Buck Me first, while PowerPyx plays Clean Up After Donnie first. Both open the day after Coming Home (Confirmed for the list order).",
      },
      {
        question: "Can I replay Buck Me?",
        answer: "No. PowerPyx and Push Square both say story missions can't be replayed, so keep a manual save if you want a way back (Confirmed).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      vgc("gta-6-buck-me-mission-walkthrough", "VGC: GTA 6 Buck Me mission walkthrough (18 Nov 2026)", "Objective flow, Lucia in the meeting, the savings question, the TV scene, mission order"),
      pp("gta-6-buck-me-set-up-bank-account-walkthrough", "Start point, quest giver, credit check, welcome deposit, BuckMe rules, $999 cash cut-off"),
      pp("gta-6-save-for-the-future-walkthrough", "Savings goals, checking-limit upgrades and perks"),
      gr("gta-6-money-buckme-bank-account-manage", "GamesRadar+: How to manage money in GTA 6 and use BuckMe bank (19 Nov 2026)", "Pocket cash, checking account, the $1,000 cut-off, lost cash, pending payments"),
      gr("gta-6-family-savings", "GamesRadar+: GTA 6 Family Savings explained (19 Nov 2026)", "Buck Yourself, one-way savings, five tiers, shared account"),
      PP_INDEX,
      PUSHSQUARE,
    ],
    updated: "2026-11-19T21:25:00+10:00",
  },
  {
    slug: "clean-up-after-donnie",
    order: 13,
    name: "Clean Up After Donnie",
    startLabel: "Donnie's Drop",
    seoTitle: "GTA 6 Clean Up After Donnie Mission Guide: Walkthrough",
    seoDescription:
      "GTA 6 Clean Up After Donnie walkthrough: how it starts, how the payout arrives, whether to play it before Buck Me and tips. Story spoilers hidden.",
    teaser: "One of Donnie's packages has gone missing and Jason is sent to track it down.",
    intro: [
      "Clean Up After Donnie is the 13th story mission. Donnie needs a missing package found, and Jason is the one sent out to look for it.",
      "It is a short job, but it can matter for your wallet: VGC says Donnie becomes a buyer for items you pick up around the swamps once it is done (Reported). The objectives and story notes stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 13 (PC Gamer, Push Square, Press Start, VGC)", status: "confirmed" },
      { label: "Playable", value: "Jason", status: "confirmed" },
      { label: "Quest giver", value: "Donnie, by phone call (PowerPyx)", status: "reported" },
      { label: "Unlocks after", value: "Coming Home, with Donnie's call the next morning (PowerPyx)", status: "reported" },
      { label: "Starts at", value: "The swamps in the south-west of Hamlet, Vice-Dale County (PowerPyx)", status: "reported" },
      { label: "Cash reward", value: "$600, paid later to Jason's mailbox (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Head for the marker as Jason. The package isn't where Donnie said it would be: VGC says it is a riverbank and the package is missing, and PowerPyx says a pink search area appears (VGC and PowerPyx).",
      "PowerPyx says a fisherman on the docks points out the package on the shore under a roof. Examine it (VGC and PowerPyx).",
      "Take the boat that sits by the package and drive it downriver to the marked shack (VGC and PowerPyx). VGC calls it a fan boat.",
      "Kingfishers gang members are at the shack (VGC and PowerPyx). VGC says you can talk to them but they turn hostile, and suggests shooting early because the boat has little cover. PowerPyx counts three of them.",
      "Go inside the shack and take the package of cocaine (VGC and PowerPyx).",
      "VGC says a sniper rifle is in the shack and that more Kingfishers arrive by boat, so you need to deal with them before moving on. PowerPyx doesn't mention a second wave.",
      "VGC says to call Donnie, who tells you to leave the package at his old tool box behind his trailer. PowerPyx says the trailer is marked in Key Lento with a green fence icon, that you can drive the boat there, and that you put the bag in the container.",
    ],
    spoiler:
      "Donnie's last delivery went wrong, and the package turns up empty by the water. Both walkthroughs send you after the Kingfishers gang, who have it at a shack downriver. Getting it back means a small boat raid on the gang's shack (VGC and PowerPyx). Afterwards VGC says Donnie buys drugs you drop at his trailer and sends you the locations of more of his lost packages (Reported).",
    tips: [
      { text: "Go in armed. VGC says the fight at the shack can't be avoided, and PowerPyx simply says to take the gang out.", reported: true },
      { text: "Don't expect the $600 straight away. PowerPyx says it arrives later in the mailbox at Jason's house.", reported: true },
      { text: "VGC says that after this mission Donnie buys narcotics you drop at his trailer, which it calls an effective early money-maker, and sends you package locations. See our money guide for other early earners.", reported: true },
      { text: "PowerPyx lists a follow-up optional job, Find the Lost Drugs, later in Chapter 1.", reported: true },
      { text: "Keep a manual save. PowerPyx and Push Square say story missions can't be replayed." },
    ],
    notes: [
      "Order: PC Gamer, Push Square, Press Start and VGC list Clean Up After Donnie 13th, straight after Buck Me. PowerPyx plays it first and numbers it 12th, with Buck Me 13th. Both open the day after Coming Home, so either order works.",
      "Where VGC and PowerPyx describe the same step differently, such as a tool box versus a container, we name both and attribute them.",
    ],
    faq: [
      {
        question: "Where does Clean Up After Donnie start?",
        answer: "PowerPyx says it starts in the swamps south-west of Hamlet, after Donnie calls the morning after Coming Home. Its map label is \"Donnie's Drop\" (Reported).",
      },
      {
        question: "I finished the mission but didn't get paid. Is it bugged?",
        answer: "Probably not. PowerPyx says the $600 arrives later in Jason's mailbox. VGC doesn't list a cash reward (Reported).",
      },
      {
        question: "Does Donnie have more work after this mission?",
        answer: "VGC says he sends you the locations of more packages and buys drugs dropped at his trailer, and PowerPyx lists a follow-up optional job, Find the Lost Drugs (Reported).",
      },
      {
        question: "Should I play this before Buck Me?",
        answer: "Either order works. PC Gamer, Push Square, Press Start and VGC list Buck Me first, while PowerPyx plays Clean Up After Donnie first. Both open the day after Coming Home (Confirmed for the list order).",
      },
      {
        question: "Can I replay Clean Up After Donnie?",
        answer: "No. PowerPyx and Push Square both say story missions can't be replayed, so keep a manual save if you want a way back (Confirmed).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      vgc("gta-6-clean-up-after-donnie-mission-walkthrough", "VGC: GTA 6 Clean Up After Donnie mission walkthrough (18 Nov 2026)", "Objective flow, fan boat, sniper rifle, tool box, Donnie as a buyer, mission order"),
      pp("gta-6-clean-up-after-donnie-donnies-drop-walkthrough", "Start point, quest giver, $600 reward, fisherman, three Kingfishers, trailer location"),
      PP_INDEX,
      PUSHSQUARE,
    ],
    updated: "2026-11-19T13:12:51+10:00",
  },
  {
    slug: "down-to-earth",
    order: 14,
    name: "Down to Earth",
    seoTitle: "GTA 6 Down to Earth Mission Guide: Walkthrough",
    seoDescription:
      "GTA 6 Down to Earth walkthrough: where it starts, seaplane landing tips, whether you must kill anyone, rewards and what you can't redo. Spoilers hidden.",
    teaser: "A job for Brian that takes Jason and Lucia out on the water and up into the air.",
    intro: [
      "Down to Earth is the 14th story mission. Jason is sent to Brian's marina, and Lucia joins him for the job that follows, which VGC and PowerPyx both say involves flying a plane.",
      "The main thing that can go wrong is the landing. VGC warns that hitting the water too hard fails the mission, so the tips below are worth a read before you take off. The objectives and story notes stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 14 (PC Gamer, Push Square, Press Start, GamesRadar+, VGC, PowerPyx)", status: "confirmed" },
      { label: "Playable", value: "Jason, with Lucia along for the job (VGC and PowerPyx)", status: "confirmed" },
      { label: "Quest giver", value: "Brian (VGC and PowerPyx)", status: "confirmed" },
      { label: "Unlocks after", value: "Clean Up After Donnie and Buck Me (PowerPyx's requirement)", status: "reported" },
      { label: "Starts at", value: "Brian's office at the marina in Key Lento, Mariana County (PowerPyx)", status: "reported" },
      { label: "Cash reward", value: "None listed (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Go to Brian as Jason and follow him down to the marina (VGC and PowerPyx). PowerPyx puts Brian's office at the marina in Key Lento and says Cal is waiting at one of the boats.",
      "Pressure-wash Brian's boat until all the grime is gone (VGC and PowerPyx). VGC says the washer works like any other weapon. PowerPyx says Lucia arrives partway through and wants to see what you do at your \"job\".",
      "Take the seaplane with Lucia and fly to Bobcat Bay, then land on the water near the boat there (VGC and PowerPyx). PowerPyx puts the marker in the far north-west of Mariana County.",
      "Collect the package. VGC says to pick up the cocaine. PowerPyx says the smugglers throw it into the water, Lucia steers the plane and you fish it out with the stick.",
      "The handover turns into a gunfight with the smugglers. VGC and PowerPyx both say you can kill or incapacitate them. PowerPyx says shooting arms and legs keeps them alive and builds Professional reputation, while killing builds Violent reputation, and that the mission doesn't care either way.",
      "Fly on to the drop-off points and land on the water at each one (VGC and PowerPyx). PowerPyx counts three drops, with Lucia handing the packages over automatically, and says the coastguard gets suspicious after the second so Lucia throws the third from the air. VGC says one stage has you flying alongside a boat.",
      "Land back at Brian's dock (VGC and PowerPyx).",
      "A cutscene moves the story to Jason's house, where Lucia's parole officer is about to arrive (VGC and PowerPyx). PowerPyx says she has 30 missed calls from him.",
      "Hide the drugs in the washing machine. VGC says it is in the shed, and PowerPyx says it is below the house.",
      "Join Lucia out front while she talks to the parole officer (VGC and PowerPyx). PowerPyx says she comes up with an excuse and he leaves, which ends the mission after a short scene.",
    ],
    spoiler:
      "Brian has Jason move drug packages by seaplane, and Lucia comes along (VGC and PowerPyx). The mission finishes back at the house, where Lucia's parole officer is about to arrive and Jason has to hide the drugs first (VGC and PowerPyx). PowerPyx says Lucia then shows Jason how to meditate on the terrace, which unlocks the first of 18 Meditation Spots (Reported).",
    tips: [
      { text: "Land gently. VGC says that if you hit the water too hard the plane explodes and the mission fails, and it recommends using L2 as much as possible as you get close to the water.", reported: true },
      { text: "A short landing is fine. VGC says that once you are on the water you can drive the plane like a boat for a short distance without taking off again.", reported: true },
      { text: "You don't have to kill anyone to finish. VGC and PowerPyx both say you can incapacitate rather than kill. PowerPyx says it only changes which reputation you build, not the mission." },
      { text: "PowerPyx says this mission unlocks the first of the game's 18 Meditation Spots, which count towards the collectibles. See our collectibles guide.", reported: true },
      { text: "Keep a manual save. PowerPyx, Push Square and GamesRadar+ all say story missions can't be replayed." },
    ],
    notes: [
      "Order: PC Gamer, Push Square, Press Start, GamesRadar+ and VGC all list Down to Earth 14th, after Clean Up After Donnie and before Clear Skies. PowerPyx's walkthrough page also calls it the 14th main mission, and says it opens once both Clean Up After Donnie and Buck Me are done.",
      "Where VGC and PowerPyx describe the same step differently, such as the exact location of an objective, we name both and attribute them.",
    ],
    faq: [
      {
        question: "Why does my seaplane keep exploding when I land?",
        answer: "VGC says that hitting the water too hard destroys the plane and fails the mission, and suggests using L2 as much as possible on the approach (Reported).",
      },
      {
        question: "Do I have to kill anyone in Down to Earth?",
        answer: "No. VGC and PowerPyx both say you can kill or incapacitate the people you fight. PowerPyx says that only changes your reputation, not the mission (Confirmed).",
      },
      {
        question: "Does Down to Earth pay anything?",
        answer: "PowerPyx lists no cash reward and VGC doesn't list one either (Reported). PowerPyx says the mission does unlock the first Meditation Spot.",
      },
      {
        question: "Do I have to finish Buck Me and Clean Up After Donnie first?",
        answer: "PowerPyx says Down to Earth requires both of them to be finished (Reported). PC Gamer, Push Square, Press Start, GamesRadar+ and VGC all list it straight after the two (Confirmed for the list order).",
      },
      {
        question: "Can I replay Down to Earth?",
        answer: "No. PowerPyx, Push Square and GamesRadar+ all say story missions can't be replayed, so keep a manual save if you want a way back (Confirmed).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      vgc("gta-6-down-to-earth-mission-walkthrough", "VGC: GTA 6 Down To Earth mission walkthrough (18 Nov 2026)", "Objective flow, seaplane landing tips and fail state, mission order"),
      pp("gta-6-down-to-earth-walkthrough", "Quest giver, start point, requirement, reward, reputation and meditation spot"),
      PP_INDEX,
      PUSHSQUARE,
      gr("gta-6-mission-list", "GamesRadar+: GTA 6 mission list", "Mission order and no mission replay"),
    ],
    updated: "2026-11-19T14:11:22+10:00",
  },
  {
    slug: "clear-skies",
    order: 15,
    name: "Clear Skies",
    startLabel: "Join Donnie On A Job",
    seoTitle: "GTA 6 Clear Skies Mission Guide: Walkthrough",
    seoDescription:
      "GTA 6 Clear Skies (Join Donnie On A Job) walkthrough: how it starts, flying and landing tips, fail states and what you can't redo. Story spoilers hidden.",
    teaser: "Jason joins Donnie on a flight for a job out in the swamps.",
    intro: [
      "Clear Skies is the 15th story mission. Jason joins Donnie on a job that starts in the air and is followed by a long fight on the ground, so it is worth going in with a full loadout and a spare save.",
      "PowerPyx says the mission is marked on your map as \"Join Donnie On A Job\" rather than Clear Skies. The objectives and story notes stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 15 (PC Gamer, Push Square, Press Start, GamesRadar+, VGC)", status: "confirmed" },
      { label: "Playable", value: "Jason (VGC and PowerPyx)", status: "confirmed" },
      { label: "Quest giver", value: "Brian, by phone call, then Donnie in person (PowerPyx)", status: "reported" },
      { label: "Unlocks after", value: "Down to Earth, with a call from Brian (PowerPyx)", status: "reported" },
      { label: "Starts at", value: "The seaplane in Southwind, Mariana County. PowerPyx says it is set for the afternoon and offers a wait prompt at other times.", status: "reported" },
      { label: "Cash reward", value: "None listed (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Go to the seaplane in Southwind and talk to Donnie, who sends you to Brian at the bar up the street (VGC and PowerPyx). PowerPyx calls it the Tiki bar.",
      "Get back to the plane and taxi it into the water (VGC and PowerPyx). VGC says the river. PowerPyx says to drive off the side of the road and adds that taking off from the road is possible but riskier.",
      "Fly to the intercept point, where Pilot Pete's plane appears (VGC and PowerPyx). PowerPyx marks it in the south-east, out over the ocean.",
      "Escort Pete's plane to the landing strip (VGC and PowerPyx). VGC says he flies close to the ground. PowerPyx says to fly directly above his plane to hide its radar signature, and puts the airstrip in the swamps.",
      "Fly on to the next airstrip and land (VGC and PowerPyx). VGC says destroying the plane here fails the mission. PowerPyx puts the airstrip in the north-west of the swamps.",
      "Follow Donnie on foot to a drug deal with The Final Chapter (VGC and PowerPyx). The deal goes wrong, Donnie is taken and the bikers open fire. Fight from cover. VGC warns they try to flank your cover, so thin them out quickly. PowerPyx says some motorbikes parked here can be scanned with the WAiNK app.",
      "Find Donnie. VGC says to head left, bash through a door and work through the buildings on the strip, and that he is held in a hangar. PowerPyx says he is in the next building up the airstrip, tied to a chair, and that you untie him once the enemies inside are dead.",
      "Escort Donnie outside and keep him alive while more enemies arrive (VGC and PowerPyx). VGC says if he is killed the mission fails. PowerPyx says you respawn at the checkpoint.",
      "Hold off the Final Chapter while Donnie climbs into the plane and takes off (VGC and PowerPyx).",
      "Grab a bike and ride after Donnie (VGC and PowerPyx). VGC says to take down the bikers who chase you and that you meet Donnie at a riverbank. PowerPyx says enemies keep spawning and can be ignored, and marks the meeting point east of Watson Bay, where you board the plane to trigger a cutscene.",
      "You end up back at Jason's house. VGC says you speak to Lucia and help her build a coffee table, with a short QTE, and that this ends the mission. PowerPyx treats that home scene as the start of a separate mission, Building a Life.",
    ],
    spoiler:
      "A drug deal between Donnie and The Final Chapter goes wrong and the bikers take Donnie (VGC and PowerPyx). Jason fights through the airstrip to free him, then holds the gang off while Donnie escapes by plane (VGC and PowerPyx). The mission then returns to Jason's house. VGC counts that as the end of Clear Skies, while PowerPyx counts it as the start of Building a Life.",
    tips: [
      { text: "Land slowly at the second airstrip. VGC says destroying the plane on landing fails the mission.", reported: true },
      { text: "While you escort the other plane, PowerPyx says to fly directly above it to hide its radar signature.", reported: true },
      { text: "Expect a long fight on foot in the second half of the mission. VGC and PowerPyx both describe waves of enemies, so stock up on ammo and health before you start." },
      { text: "Late in the mission PowerPyx says enemies keep spawning and you can ignore them and keep moving.", reported: true },
      { text: "Keep a manual save. PowerPyx, Push Square and GamesRadar+ all say story missions can't be replayed." },
    ],
    notes: [
      "Order: PC Gamer, Push Square, Press Start, GamesRadar+ and VGC all list Clear Skies 15th, between Down to Earth and Day Release, so that is the order used here. PowerPyx's walkthrough page calls it the 18th main mission, and its full list puts Day Release before it.",
      "Building a Life: PowerPyx lists Building a Life as its own mission straight after Clear Skies. PC Gamer, Push Square, Press Start and GamesRadar+ don't list a mission by that name, and VGC describes the same scene as the end of Clear Skies. We follow the outlet lists and haven't added a separate entry.",
      "Where VGC and PowerPyx describe the same step differently, such as the meeting point or the layout of the second airstrip, we name both and attribute them.",
    ],
    faq: [
      {
        question: "What is Clear Skies called on the map?",
        answer: "PowerPyx says its starting label on the map is \"Join Donnie On A Job\", and that the name changes to Clear Skies after you start it (Reported).",
      },
      {
        question: "Why did my Clear Skies attempt fail?",
        answer: "VGC says destroying the plane while landing at the second airstrip fails the mission, so land slowly (Reported). VGC and PowerPyx also both warn about a later section where an ally has to survive (Confirmed).",
      },
      {
        question: "Can I take off from the road?",
        answer: "PowerPyx says you can, but that it is riskier than taxiing into the water first (Reported).",
      },
      {
        question: "Is Building a Life a separate mission?",
        answer: "PowerPyx lists it as its own mission after Clear Skies. PC Gamer, Push Square, Press Start and GamesRadar+ list no mission by that name, and VGC treats the scene as part of Clear Skies. We have not added a separate guide.",
      },
      {
        question: "Can I replay Clear Skies?",
        answer: "No. PowerPyx, Push Square and GamesRadar+ all say story missions can't be replayed, so keep a manual save if you want a way back (Confirmed).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      vgc("gta-6-clear-skies-mission-walkthrough", "VGC: GTA 6 Clear Skies mission walkthrough (18 Nov 2026)", "Objective flow, fail states, flanking warning, mission order"),
      pp("gta-6-clear-skies-join-donnie-on-a-job-walkthrough", "Map label, quest giver, start point, requirement, reward, locations, objective flow"),
      PP_INDEX,
      PUSHSQUARE,
      gr("gta-6-mission-list", "GamesRadar+: GTA 6 mission list", "Mission order and no mission replay"),
    ],
    updated: "2026-11-19T14:11:22+10:00",
  },
  {
    slug: "day-release",
    order: 16,
    name: "Day Release",
    startLabel: "Meet Mattia & Kat",
    seoTitle: "GTA 6 Day Release Mission Guide: Walkthrough",
    seoDescription:
      "GTA 6 Day Release walkthrough: yacht party, jet ski race, the free dress pick, the night drive through Vice City and the relationship boosts to grab.",
    teaser: "Jason and Lucia head out for a day and night with Mattia and his friends.",
    intro: [
      "Day Release is the 16th story mission. VGC says Jason and Lucia celebrate Lucia's temporary freedom in Vice City, and that you control Lucia for most of the mission. Neither VGC nor PowerPyx describes any combat.",
      "What is worth knowing before you start is the handful of small choices that raise Jason and Lucia's relationship, and the free dress pick. The objectives and story notes stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 16 (PC Gamer, Push Square, Press Start, GamesRadar+, VGC)", status: "confirmed" },
      { label: "Playable", value: "Lucia for most of the mission, with control returning to Jason at the end (VGC and PowerPyx)", status: "confirmed" },
      { label: "Combat", value: "None described in either walkthrough (VGC and PowerPyx)", status: "confirmed" },
      { label: "Quest giver", value: "Mattia (PowerPyx)", status: "reported" },
      { label: "Unlocks after", value: "Down to Earth, with a call from Mattia (PowerPyx)", status: "reported" },
      { label: "Starts at", value: "The Rusty Anchor bar in Key Lento, Mariana County (PowerPyx). VGC also begins at a bar and ends at The Rusty Anchor.", status: "reported" },
      { label: "Cash reward", value: "None listed (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Meet Lucia at the bar, where her ankle monitor is taken off (VGC and PowerPyx). PowerPyx says to order a drink from the bartender at the back to start the mission.",
      "Take the speedboat out to the yacht (VGC and PowerPyx). PowerPyx says it is a long ride and the group talks along the way.",
      "Choose to ride a jet ski solo or with Jason (VGC and PowerPyx). Both say riding with Jason raises their relationship.",
      "Race Mattia back to the yacht, jumping the ramps on the way if you like (VGC and PowerPyx). PowerPyx says it doesn't matter whether you win or lose.",
      "Shoot the champagne bottles using slow-motion aim (VGC and PowerPyx). Both say hitting them only changes a short line of dialogue afterwards.",
      "Pick a dress for Lucia (VGC and PowerPyx). VGC says the dress you choose is permanently unlocked for Lucia and the others can be bought later. PowerPyx only says she wears it for the rest of the mission, so the permanent unlock is reported by VGC alone.",
      "Find Mattia on the lower decks of the yacht (VGC and PowerPyx). PowerPyx says he is in the middle room on the lowest deck, two decks down, and that you walk around the deck to reach the second staircase. VGC says there are two optional photos on the way, one of some documents to send to Cal and one at the front of the boat that raises the relationship.",
      "Keep up with Mattia in a sports car through Vice City at night (VGC and PowerPyx). VGC says the only way to fail this section is to destroy the car. PowerPyx says resetting the car after a crash fully repairs it.",
      "Drive on to the next stop (VGC and PowerPyx). VGC says Mattia stops at a hotel, and that the second drive has the game's drug filter on, which makes the road harder to see. PowerPyx points you to the Huxley Motel and says to follow the pink line on the minimap.",
      "Follow Mattia into the club and join him at his table, then dance with Jason as Lucia (VGC and PowerPyx). VGC says hitting the dance flourish prompts improves the relationship. PowerPyx says holding hands when you enter the club sometimes does.",
      "After the cutscenes, find Jason at the end of a long hallway (VGC and PowerPyx). PowerPyx says to take the right-hand door.",
      "Jason and Lucia leave over a balcony and control returns to Jason (VGC and PowerPyx). VGC ends the mission at The Rusty Anchor and PowerPyx says Key Lento. PowerPyx says you can hold hands during the exit to improve the relationship again.",
    ],
    spoiler:
      "Light story notes only: the night out ends when the party breaks up, and Jason and Lucia slip away over a balcony (VGC and PowerPyx). PowerPyx adds that security was alerted by the noise.",
    tips: [
      { text: "Ride the jet ski with Jason. VGC and PowerPyx both say it raises their relationship." },
      { text: "More relationship chances: VGC lists the photo at the front of the boat and the dance flourish prompts, and PowerPyx lists holding hands at the club and on the exit.", reported: true },
      { text: "Take your time over the dress. VGC says the one you pick is permanently unlocked, but PowerPyx only says Lucia wears it for the rest of the mission, so don't count on it staying.", reported: true },
      { text: "Don't wreck the car on the night drives. VGC says destroying it is the only way to fail, and PowerPyx says a reset after a crash repairs it.", reported: true },
      { text: "Neither walkthrough describes any combat, so there is no loadout to prepare." },
      { text: "Keep a manual save. PowerPyx, Push Square and GamesRadar+ all say story missions can't be replayed." },
    ],
    notes: [
      "Order: PC Gamer, Push Square, Press Start, GamesRadar+ and VGC all list Day Release 16th, between Clear Skies and Swamped, so that is the order used here. PowerPyx calls it the 17th main mission and says it starts via a call after Down to Earth.",
      "Dress: VGC says the chosen dress is permanently unlocked for Lucia. PowerPyx only says she wears it for the rest of the mission. We attribute the permanent unlock to VGC and don't state it as fact.",
    ],
    faq: [
      {
        question: "Does winning the jet ski race matter?",
        answer: "PowerPyx says it doesn't matter whether you win or lose (Reported). VGC doesn't mention any reward or penalty tied to the result.",
      },
      {
        question: "Do I need to hit every champagne bottle?",
        answer: "No. VGC and PowerPyx both say it only changes a short line of dialogue afterwards (Confirmed).",
      },
      {
        question: "Do I keep the dress?",
        answer: "VGC says the dress you pick is permanently unlocked for Lucia and the others can be bought later (Reported, VGC only). PowerPyx only says she wears it for the rest of the mission, so we can't confirm it stays unlocked.",
      },
      {
        question: "How do I improve Jason and Lucia's relationship here?",
        answer: "Ride the jet ski with Jason (Confirmed, VGC and PowerPyx). VGC also lists the photo at the front of the boat and the dance flourish prompts, and PowerPyx lists holding hands at the club and on the exit (Reported).",
      },
      {
        question: "Can Day Release fail?",
        answer: "VGC says the only way to fail the night driving sections is to destroy the car (Reported). Neither walkthrough describes any other fail state.",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      vgc("gta-6-day-release-mission-walkthrough", "VGC: GTA 6 Day Release mission walkthrough (18 Nov 2026)", "Objective flow, dress, photos, fail state, mission order"),
      pp("gta-6-day-release-meet-mattia-kat-walkthrough", "Map label, quest giver, start point, requirement, reward, objective flow, relationship boosts"),
      PP_INDEX,
      PUSHSQUARE,
      gr("gta-6-mission-list", "GamesRadar+: GTA 6 mission list", "Mission order and no mission replay"),
    ],
    updated: "2026-11-19T15:23:43+10:00",
  },
  {
    slug: "swamped",
    order: 17,
    name: "Swamped",
    startLabel: "Meet Brian",
    seoTitle: "GTA 6 Swamped Mission Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Swamped walkthrough: ride out with Brian, fight your way clear, chase from the helicopter and win the boat chase without failing the mission.",
    teaser: "Jason rides out with Brian to meet the Kingfishers.",
    intro: [
      "Swamped is the 17th story mission. VGC says Jason and Brian drive out to the Kingfishers' camp to try to reconcile after the violence of the last few missions, and both VGC and PowerPyx describe a fight on foot, a helicopter section and a boat chase.",
      "Go in with full health and ammo, because VGC says there are many Kingfishers at the camp. VGC says this mission covers a big early-game moment and doesn't spell it out, so the one hint we include sits behind the blur along with the objectives.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 17 (PC Gamer, Push Square, Press Start, GamesRadar+, VGC)", status: "confirmed" },
      { label: "Playable", value: "Jason (VGC and PowerPyx)", status: "confirmed" },
      { label: "Quest giver", value: "Brian (VGC and PowerPyx)", status: "confirmed" },
      { label: "Enemies", value: "The Kingfishers (VGC and PowerPyx)", status: "confirmed" },
      { label: "Unlocks after", value: "Day Release, Clear Skies and Building a Life (PowerPyx's requirement)", status: "reported" },
      { label: "Starts at", value: "Brian's marina in Key Lento, Mariana County (PowerPyx says to enter the back room of Brian's Marina; VGC says to speak to Brian at the bar)", status: "reported" },
      { label: "Cash reward", value: "None listed (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Speak to Brian and get in his truck (VGC and PowerPyx). PowerPyx says it is a long drive to the Kingfishers' camp in the north-west of Mariana County, and that you follow Brian on foot when you arrive.",
      "Walk through the camp with Brian (VGC and PowerPyx). VGC says you speak to a few Kingfishers at the far end. PowerPyx says you go to a pig pen and wait for Brian to talk to someone.",
      "When things go wrong, escape with Brian (VGC and PowerPyx). PowerPyx says Brian has a green dot on the minimap. VGC says Lori is captured during the escape, so your goal becomes reaching her with Brian, and that you don't have to kill every Kingfisher to progress but leaving is tough without killing a significant number.",
      "At the edge of the camp, take the helicopter and go after Lori (VGC and PowerPyx). PowerPyx says it is on the left of the area.",
      "Shoot the Kingfishers from the helicopter as they try to get away (VGC and PowerPyx). VGC says you are prompted to destroy a truck, which takes out a significant number of them.",
      "The outlets differ on what happens next. VGC says killing Lori's kidnapper here ends the mission, and that otherwise the kidnapper escapes on a fanboat. PowerPyx says that whatever you do, one of the Kingfishers always puts her in another boat.",
      "Chase her by boat and jump across (VGC and PowerPyx). Both say you need to get close to the side of her boat. PowerPyx says you hold the button to jump, that the jump won't trigger if you are too far, and that enemy fire can destroy your engine and force a checkpoint restart. VGC says you can instead shoot the Kingfisher driving the boat.",
      "PowerPyx says a button-mash prompt takes out the last enemy, the rest is cutscenes, and you spawn back at home. It says you can then choose to tell Lucia some news, which improves your relationship with her.",
    ],
    spoiler:
      "PowerPyx says an inspection prompt at the pig pen reveals what has already happened to someone you know, and that the meeting is an ambush set by the Kingfishers (Reported). VGC only says that things go terribly wrong.",
    tips: [
      { text: "Go in with full health and ammo. VGC says there are many Kingfishers in the first part of the mission.", reported: true },
      { text: "You don't have to kill every Kingfisher at the camp, but VGC says getting out is tough without killing a significant number. Stay with Brian and head for the edge of the camp.", reported: true },
      { text: "From the helicopter, take the truck prompt if it appears. VGC says it takes out a significant number of enemies.", reported: true },
      { text: "Watch your aim. VGC lists accidentally shooting the person you are chasing, or letting the Kingfishers get away with them, as the main fail states.", reported: true },
      { text: "Get right alongside the boat. VGC and PowerPyx both say you need to be close to jump across, and PowerPyx says enemy fire can destroy your engine and force a checkpoint restart, so close the gap quickly." },
      { text: "At home afterwards, PowerPyx says choosing to tell Lucia some news improves your relationship, while staying quiet skips the boost.", reported: true },
      { text: "Keep a manual save. PowerPyx, Push Square and GamesRadar+ all say story missions can't be replayed." },
    ],
    notes: [
      "Order: PC Gamer, Push Square, Press Start, GamesRadar+ and VGC all list Swamped 17th, straight after Day Release. PowerPyx calls it the 20th main mission and says it opens once Day Release, Clear Skies and Building a Life are done.",
      "Helicopter section: VGC and PowerPyx disagree on whether killing the target from the helicopter ends the mission. We show both and attribute them.",
    ],
    faq: [
      {
        question: "Why did Swamped fail during the chase?",
        answer: "VGC says the main fail states are the Kingfishers escaping with the person you are chasing, or you accidentally shooting them (Reported). PowerPyx adds that a destroyed boat engine sends you back to a checkpoint (Reported).",
      },
      {
        question: "Why won't the boat jump trigger?",
        answer: "You are too far away. VGC and PowerPyx both say you need to get close to the side of the other boat, and PowerPyx says to drive very close before holding the jump button (Confirmed).",
      },
      {
        question: "Can I skip the boat section by killing the target from the helicopter?",
        answer: "VGC and PowerPyx disagree. VGC says killing the target from the helicopter ends the mission (Reported). PowerPyx says that whatever you do, the chase always continues by boat (Reported). Be ready for the boat section either way.",
      },
      {
        question: "Do I have to kill every Kingfisher at the camp?",
        answer: "VGC says no, but that getting out of that part of the camp is tough without killing a significant number of them (Reported).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      vgc("gta-6-swamped-mission-walkthrough", "VGC: GTA 6 Swamped mission walkthrough (18 Nov 2026)", "Objective flow, fail states, helicopter section, mission order"),
      pp("gta-6-swamped-walkthrough", "Map label, quest giver, start point, requirement, reward, objective flow, boat chase"),
      PP_INDEX,
      PUSHSQUARE,
      gr("gta-6-mission-list", "GamesRadar+: GTA 6 mission list", "Mission order and no mission replay"),
    ],
    updated: "2026-11-19T15:23:43+10:00",
  },
  {
    slug: "chapter-1-mission-18",
    hidden: true,
    order: 18,
    name: "Chapter 1, Mission 18",
    seoTitle: "GTA 6 Chapter 1 Mission 18 Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 1 mission 18 walkthrough: pack every item in the trailer, handle the fight outside, grab the missable revolver and get rid of the car.",
    teaser: "A tidy-up job in Key Lento that comes straight after Swamped.",
    intro: [
      "This is the 18th story mission, and it comes straight after Swamped. Jason has a job to do in Key Lento: clear out a trailer, deal with some unwelcome visitors and then get rid of a car. It is short, but PowerPyx says there is a missable weapon in the car, so read the tips before you do anything to it.",
      "This mission's real name is itself a major spoiler, which is why our mission list hides it and this page uses a neutral title. The objectives and story notes stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 18 (PC Gamer, Push Square, Press Start, GamesRadar+, VGC)", status: "confirmed" },
      { label: "Starts at", value: "A trailer in Key Lento, Mariana County (VGC and PowerPyx)", status: "confirmed" },
      { label: "Combat", value: "A fistfight with three men outside the trailer (VGC and PowerPyx). PowerPyx says you can skip it.", status: "confirmed" },
      { label: "Playable", value: "Jason (PowerPyx)", status: "reported" },
      { label: "Quest giver", value: "Brian (PowerPyx). VGC ends the mission with a call to Brian.", status: "reported" },
      { label: "Unlocks after", value: "Swamped, starting automatically as soon as it ends (PowerPyx)", status: "reported" },
      { label: "Reward", value: "A unique revolver, if you take it from the car's trunk before destroying the car (PowerPyx). No cash listed.", status: "reported" },
    ],
    objectives: [
      "Go to the trailer. VGC says you can take down the flag outside first. Go inside and pick up the bag on the bed, which is marked (VGC and PowerPyx).",
      "Collect the rest of the belongings in the trailer (VGC and PowerPyx). PowerPyx says slow motion highlights them. Both list a photo on the wall by the TV, a flight schedule by the Patriot Beer neon sign, clothes, a map on the fridge and an ID on a shelf. They differ on two spots: the clothes are in the drawers or wardrobe (VGC) or on the shelf in front of the bed (PowerPyx), and the ID is on the shelf across from the fridge (VGC) or to the right of the door (PowerPyx). PowerPyx also lists a message on the phone.",
      "There is an optional drug interaction in the trailer (VGC and PowerPyx). PowerPyx says it temporarily lowers health and raises stamina and doesn't matter either way.",
      "Three men from the earlier bar fight are waiting outside (VGC and PowerPyx). VGC says to fight all three and that they are slightly more aggressive than in the bar. PowerPyx says you can either beat them up or run to the car and drive off.",
      "Drive the car out of Key Lento (VGC and PowerPyx). VGC says to follow the pink map line out of the region and PowerPyx says to follow the road north.",
      "Before you destroy the car, open its trunk. PowerPyx says it holds a missable unique weapon variant.",
      "Destroy the car (VGC and PowerPyx). VGC says to find a quiet spot first. Both mention a fuel can in the car: VGC says it is in the back and PowerPyx says it is in the trunk, and to pour it over the car and set it alight. VGC also says you can shoot the engine a few times, and PowerPyx says you can drive the car into the ocean and let it sink.",
      "Leave the area. VGC says you then call Brian, which ends the mission. PowerPyx says destroying the car finishes it.",
    ],
    spoiler:
      "PowerPyx's quest description says Brian wants the owner's place to look as if he packed up and left town (Reported). Its map label for the mission is \"Head to Donnie's Trailer\", and it names the unique revolver Donnie's H&L .38 (both PowerPyx, Reported). VGC also calls the belongings Donnie's.",
    tips: [
      { text: "Open the trunk before you destroy the car. PowerPyx says it holds a missable unique revolver.", reported: true },
      { text: "GamesRadar+ says unique weapon variants can't be modified, but once you have one it is permanently unlocked for both Jason and Lucia.", reported: true },
      { text: "Use slow motion in the trailer. PowerPyx says it highlights everything you need to pack.", reported: true },
      { text: "If you'd rather skip the fight outside, PowerPyx says you can run to the car and drive off. VGC only describes fighting and says the three men are slightly more aggressive than in the bar, so have some health ready if you stay.", reported: true },
      { text: "Pick a quiet spot before you destroy the car, as VGC suggests.", reported: true },
      { text: "Keep a manual save. PowerPyx, Push Square and GamesRadar+ all say story missions can't be replayed." },
    ],
    notes: [
      "Name: our mission list hides this mission's title because the name alone is a major spoiler. VGC, PowerPyx and Push Square all print it, so the source links below carry it in their web addresses. We label them neutrally and keep the name out of the page text, links and schema.",
      "Order: PC Gamer, Push Square, Press Start, GamesRadar+ and VGC all list this mission 18th, straight after Swamped. PowerPyx calls it the 21st main mission.",
      "Fight or flee: VGC describes fighting the three men and doesn't mention skipping the fight. PowerPyx says you can run to the car instead. We show both.",
    ],
    faq: [
      {
        question: "Where is the missable weapon in this mission?",
        answer: "PowerPyx says it is in the trunk of the car you drive away, and to open the trunk before you destroy the car (Reported).",
      },
      {
        question: "Do I have to fight the three men outside?",
        answer: "VGC describes fighting all three. PowerPyx says you can either beat them up or run to the car and drive off (Reported, each).",
      },
      {
        question: "How do I destroy the car?",
        answer: "VGC and PowerPyx both mention a fuel can in the car (Confirmed). VGC adds shooting the engine a few times, and PowerPyx adds driving the car into the ocean and letting it sink (Reported).",
      },
      {
        question: "I can't find all the items in the trailer. Any tips?",
        answer: "PowerPyx says slow motion highlights them (Reported). Both outlets list spots by the TV, the neon sign, the fridge and the shelves, and a couple of the locations differ between them.",
      },
      {
        question: "Does the optional interaction in the trailer matter?",
        answer: "PowerPyx says it only changes your health and stamina for a short while and doesn't matter either way (Reported).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      vgc("gta-6-don-gone-mission-walkthrough", "VGC walkthrough (18 Nov 2026)", "Objective flow, item spots, fight, destroying the car, mission order"),
      pp("gta-6-don-gone-head-to-donnies-trailer-walkthrough", "Quest giver, start point, requirement, reward, objective flow"),
      PP_INDEX,
      PUSHSQUARE,
      gr("gta-6-weapon-ownership-explained", "GamesRadar+: how weapon ownership works in GTA 6 (19 Nov 2026)", "Unique weapon variants stay unlocked for both characters and can't be modified"),
      gr("gta-6-mission-list", "GamesRadar+: GTA 6 mission list", "Mission order and no mission replay"),
    ],
    updated: "2026-11-19T16:13:15+10:00",
  },
  {
    slug: "recalibration",
    order: 19,
    name: "Recalibration",
    startLabel: "Talk to Lucia",
    seoTitle: "GTA 6 Recalibration Mission Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Recalibration walkthrough: buy the six-pack, take the boat out, learn the fishing controls, grill the catch and save before the Chapter 1 finale.",
    teaser: "Jason and Lucia take a six-pack to Cal, then go fishing and grill the catch.",
    intro: [
      "Recalibration is the 19th story mission. VGC says Jason and Lucia cheer Cal up after the recent events of the game with a beer run, a boat trip out fishing and a fish grill back at the dock. Neither walkthrough describes any combat.",
      "The thing to know before you start is the save advice. VGC and PowerPyx both advise a separate save before the Chapter 1 finale, and both say the point of no return is the start of Tourist Trap, the mission that follows (see the notes). What you lose stays behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 19 (PC Gamer, Push Square, Press Start, GamesRadar+, VGC)", status: "confirmed" },
      { label: "Playable", value: "Jason (VGC and PowerPyx)", status: "confirmed" },
      { label: "Combat", value: "None described in either walkthrough (VGC and PowerPyx)", status: "confirmed" },
      { label: "Quest giver", value: "Lucia (PowerPyx)", status: "reported" },
      { label: "Unlocks after", value: "A call from Lucia at some point during or after the previous story mission. The mission then starts when you return home (PowerPyx)", status: "reported" },
      { label: "Starts at", value: "Jason's house in Key Lento (PowerPyx). VGC says you start by heading to Cal's house.", status: "reported" },
      { label: "Cash reward", value: "None listed (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Head to Cal's house, stopping at the marked liquor store to buy a six-pack for Cal (VGC and PowerPyx). PowerPyx says any six-pack from the fridge works and that it is paid for as soon as you pick it up, so you don't need the till.",
      "At Cal's, talk to him (VGC and PowerPyx). PowerPyx says he is on a lounger behind the house, by the water.",
      "Take the boat to the marked fishing spot (VGC and PowerPyx). PowerPyx says it is about two minutes away.",
      "Catch some fish with Cal (VGC and PowerPyx). VGC gives the PlayStation controls: hold L2 to grip the rod, press R2 to cast, rotate the right stick to attract fish and press R2 when one bites. PowerPyx says to turn the right stick clockwise. When the fish fights, push the left stick against its pull while spinning the right stick to reel it in (VGC and PowerPyx). VGC says Jason grabs the fish automatically once it is close.",
      "Return to Cal's dock (VGC and PowerPyx).",
      "Grill the fish, flipping each piece before it burns (VGC and PowerPyx). PowerPyx says there are three pieces, the grill is to the right of where Cal stands, and you flip them until the colour change shows both sides are done.",
      "Follow Lucia when she walks off (VGC and PowerPyx). PowerPyx says she is at the front of Cal's house. Talk to her there, then drive home to finish (VGC and PowerPyx).",
    ],
    spoiler:
      "PowerPyx says you permanently lose Jason's home in Key Lento and never recover it for the rest of the game (Reported). VGC says you lose access to Jason's Ultimate Edition vehicles, and that you can return to Key Lento a few hours into Chapter 2 (Reported). These are different claims, one about the home and one about the area.",
    tips: [
      { text: "Learn the fishing here. VGC and PowerPyx describe the same controls, with the right stick to attract fish and the left stick against the fish's pull." },
      { text: "Flip the fish early. VGC says to flip them before they burn, and PowerPyx says to flip until both sides look well done." },
      { text: "PowerPyx says you will lose all the pocket cash you bring in, and recommends putting at least $5,000 into the Family Savings account first (Reported). Our money guide explains the accounts.", reported: true },
      { text: "Keep a separate manual save. VGC says not to start Tourist Trap until you have finished exploring. PowerPyx recommends keeping a permanent manual save before Tourist Trap and saving in a different slot afterwards. Story missions can't be replayed (PowerPyx and GamesRadar+).", reported: true },
    ],
    notes: [
      "Save advice: VGC and PowerPyx agree that the point of no return is the start of Tourist Trap, the first of three linked missions (Tourist Trap, Home Sweet Home and Discharge Time) that end Chapter 1. Once you start it you are locked in with no free-roam until Chapter 2 (Confirmed: VGC's Tourist Trap and Chapter 1 warning pages, and PowerPyx's Tourist Trap page). PowerPyx's Recalibration page carries the same warning, worded as the last chance to free-roam in Chapter 1, and says you won't be able to play as Jason for a long time. VGC words the cost as not being able to roam as both characters for several hours (Reported, each). Tourist Trap starts immediately after Recalibration, so save before you start it.",
      "Order: PC Gamer, Push Square, Press Start, GamesRadar+ and VGC all list Recalibration 19th. PowerPyx calls it the 22nd main mission.",
    ],
    faq: [
      {
        question: "How do I fish in GTA 6?",
        answer: "VGC gives the PlayStation controls: hold L2 to grip the rod, press R2 to cast, rotate the right stick to attract fish and press R2 when one bites. Then push the left stick against the fish's pull while spinning the right stick to reel it in. PowerPyx describes the same left and right stick technique (Confirmed).",
      },
      {
        question: "Which six-pack should I buy?",
        answer: "PowerPyx says any six-pack from the fridge works and that it is paid for when you pick it up (Reported).",
      },
      {
        question: "How do I stop the fish burning?",
        answer: "VGC says to flip each piece before it burns. PowerPyx says to flip them until both sides look well done and you can see the colour change (Reported, each).",
      },
      {
        question: "Is there a point of no return around Recalibration?",
        answer: "Yes, straight after it. VGC and PowerPyx both say the point of no return is the start of Tourist Trap, the next mission. Starting it locks you into the last missions of Chapter 1 with no free-roam until Chapter 2, so make a separate save first (Confirmed).",
      },
      {
        question: "Is there any combat in Recalibration?",
        answer: "No. Neither VGC nor PowerPyx describes a fight (Confirmed).",
      },
    ],
    sources: [
      PCGAMER,
      PRESSSTART,
      vgc("gta-6-recalibration-mission-walkthrough", "VGC: GTA 6 Recalibration mission walkthrough (18 Nov 2026)", "Objective flow, fishing controls, mission order"),
      vgc("gta-6-chapter-1-warning-read-this-before-finishing-chapter-1-of-gta-6", "VGC: GTA 6 Chapter 1 warning (18 Nov 2026)", "Where the point of no return is and what it locks"),
      pp("gta-6-recalibration-talk-to-lucia-walkthrough", "Map label, quest giver, start point, requirement, reward, objective flow, save and cash warning"),
      PP_INDEX,
      PUSHSQUARE,
      gr("gta-6-mission-list", "GamesRadar+: GTA 6 mission list", "Mission order and no mission replay"),
    ],
    updated: "2026-11-19T17:14:40+10:00",
  },
  {
    slug: "tourist-trap",
    order: 20,
    name: "Tourist Trap",
    startLabel: "Take Up Mattia's Offer",
    seoTitle: "GTA 6 Tourist Trap Mission Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Tourist Trap walkthrough: the Chapter 1 point of no return, what to save and bank first, the Visitor Center pickup, the shootout and the boat escape.",
    teaser: "Jason and Lucia pick up a bag in Key Lento, and the Chapter 1 finale begins.",
    intro: [
      "Tourist Trap is the 20th story mission and the first of three linked missions that close out Chapter 1. VGC and PowerPyx both say that once you start it you are locked into the missions that follow, with no free-roam until Chapter 2.",
      "It is a pickup job in Key Lento that turns into a long on-foot shootout and a boat escape, played as Jason and then Lucia. Neither walkthrough lists a cash reward, so the real preparation happens before you start: save in a separate slot, bank your money and finish any side jobs you still want. The story beats stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 20 (PC Gamer and VGC; Push Square lists it in the same place)", status: "confirmed" },
      { label: "Playable", value: "Jason, then Lucia (VGC and PowerPyx)", status: "confirmed" },
      { label: "Point of no return", value: "Starting it locks you into the last missions of Chapter 1, with no free-roam until Chapter 2 (VGC and PowerPyx)", status: "confirmed" },
      { label: "Combat", value: "Yes, a long on-foot shootout (VGC and PowerPyx)", status: "confirmed" },
      { label: "Quest giver", value: "Lucia and Mattia (PowerPyx)", status: "reported" },
      { label: "Unlocks after", value: "Recalibration. PowerPyx says it starts automatically and is marked afterwards", status: "reported" },
      { label: "Starts at", value: "The far south of Key Lento, where Lucia is on the beach (PowerPyx). VGC says you start by heading to the Visitor Center.", status: "reported" },
      { label: "Cash reward", value: "None listed (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Talk to Lucia on the beach in the far south of Key Lento to start the job (PowerPyx). Head to the Visitor Center. VGC says Jason and Lucia both equip a disguise first.",
      "Go up the ramp and follow the long walkway to the lockers at the far end (PowerPyx), then take the bag from the locker (VGC and PowerPyx).",
      "On the way out the police intercept you (VGC and PowerPyx). After the cutscene you are in an interrogation room under the Visitor Center (VGC).",
      "Play as Jason: shoot the enemies coming at you and head for the bag (VGC). PowerPyx says Jason gets out of his handcuffs and approaches the bag.",
      "Jason is badly hurt and you switch to Lucia (VGC and PowerPyx). Shoot the attacker and fight your way out of the Visitor Center. VGC says to pick up ammo and weapons from downed enemies and to use Zombix and any adrenaline shots you have.",
      "Protect Jason and follow him to the dock (VGC and PowerPyx). VGC says the mission fails if he is killed. PowerPyx says killing the police here does not count against your criminal profile because it is part of the story.",
      "At the dock, drag Jason to the boat while you hold the enemies off (VGC and PowerPyx). PowerPyx says to use the pistol in your other hand. When cars start driving at the dock, VGC says to shoot the flammable canisters so the cars explode, and that Focus Mode (L3 and R3 together) highlights anything flammable in red.",
      "Take the boat out to open water (VGC and PowerPyx). PowerPyx says to follow the pink waypoint. The outlets describe the last step differently: VGC says to call Cal once you are out on the water, while PowerPyx says to drive the boat all the way to Cal's house.",
    ],
    spoiler:
      "VGC says the police intercept you after you take the bag, and that the Visitor Center turns into a gunfight in which Jason is badly injured. PowerPyx says it was a trap and the police were waiting for whoever picked the bag up, and that a corrupt captain called Méndez arrives wanting the bag very badly. It says his men shoot the honest police and that Jason is shot going for the bag (Reported, each). PowerPyx also says Jason passes out on the boat and Cal takes him to hospital in Vice City for emergency surgery, and that you permanently lose Jason's home in Key Lento and never recover it for the rest of the game (Reported, PowerPyx).",
    tips: [
      { text: "Save before you talk to Lucia, in a slot you will not overwrite. PowerPyx recommends keeping a permanent manual save and saving in a different slot afterwards. VGC and PowerPyx both say starting this mission locks you in until Chapter 2.", reported: true },
      { text: "Finish what you want first. PowerPyx says Kenton's treasure diving, Cal's fishing requests and the Kingfishers hideout icons pause during the finale and become available again later in the game (Reported).", reported: true },
      { text: "Bank your cash. PowerPyx says you will lose all the pocket cash you bring into this mission, and recommends putting at least $5,000 into the Family Savings account first (Reported). Our money guide explains the accounts.", reported: true },
      { text: "Loot as you go. VGC says to pick up ammo and weapons from enemies as you pass them and to use Zombix and any adrenaline shots (Reported).", reported: true },
      { text: "Use the environment at the dock. VGC says the flammable canisters can be shot to explode the cars that drive at you, and Focus Mode shows anything flammable in red (Reported).", reported: true },
      { text: "Story missions can't be replayed (PowerPyx, Push Square and GamesRadar+), so the save matters." },
    ],
    notes: [
      "How it ends: the outlets differ on the last step. VGC says you call Cal once you are out on the open water. PowerPyx says you drive the boat all the way to Cal's house (Reported, each).",
      "Point of no return: VGC and PowerPyx both say starting Tourist Trap locks you into the last missions of Chapter 1, with no free-roam until Chapter 2 (Confirmed). VGC words the cost as not being able to roam as both characters for several hours. PowerPyx says you will not be able to play as Jason for a long time.",
      "Order: PC Gamer and VGC list Tourist Trap 20th, and Push Square lists it between Recalibration and Home Sweet Home. PowerPyx calls it the 23rd main mission.",
    ],
    faq: [
      {
        question: "Is Tourist Trap a point of no return?",
        answer: "Yes. VGC and PowerPyx both say that once you start it you are locked into the last missions of Chapter 1, with no free-roam until Chapter 2, so make a separate save first (Confirmed).",
      },
      {
        question: "Should I bank my cash before Tourist Trap?",
        answer: "PowerPyx says you lose all the pocket cash you bring into the mission and recommends putting at least $5,000 into the Family Savings account first (Reported).",
      },
      {
        question: "Who do I play as in Tourist Trap?",
        answer: "You start as Jason and switch to Lucia partway through (VGC and PowerPyx, Confirmed).",
      },
      {
        question: "Can I fail Tourist Trap?",
        answer: "VGC says there is a fail state if Jason is killed during the escape (Reported).",
      },
      {
        question: "How does Tourist Trap end?",
        answer: "VGC says you take the boat to open water and call Cal. PowerPyx says you drive the boat all the way to Cal's house (Reported, each).",
      },
    ],
    sources: [
      PCGAMER,
      vgc("gta-6-tourist-trap-mission-walkthrough", "VGC: GTA 6 Tourist Trap mission walkthrough (18 Nov 2026)", "Objective flow, point of no return, fail state, tips, mission order"),
      vgc("gta-6-chapter-1-warning-read-this-before-finishing-chapter-1-of-gta-6", "VGC: GTA 6 Chapter 1 warning (18 Nov 2026)", "Tourist Trap is the point of no return"),
      pp("gta-6-tourist-trap-take-up-mattias-offer-walkthrough", "Map label, quest giver, start point, point of no return, save and cash warning, objective flow"),
      PP_INDEX,
      PUSHSQUARE,
      gr("gta-6-mission-list", "GamesRadar+: GTA 6 mission list", "No mission replay"),
    ],
    updated: "2026-11-19T17:14:40+10:00",
  },
  {
    slug: "home-sweet-home",
    order: 21,
    name: "Home Sweet Home",
    seoTitle: "GTA 6 Home Sweet Home Mission Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Home Sweet Home walkthrough: play as Lucia, win the close-quarters fight, then pick a route out of the area on foot, by car or by water.",
    teaser: "Lucia heads into Jason's place in Key Lento on her own, then has to get away from the area.",
    intro: [
      "Home Sweet Home is the 21st story mission and the second of the three linked missions that close out Chapter 1. It starts straight after Tourist Trap, you play as Lucia, and there is no free-roam yet (VGC and PowerPyx).",
      "It is short: a close-quarters fight at Jason's house in Key Lento, then an escape from the area in which you choose how to get out. The outlets describe the routes differently, and the details stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 21 (PC Gamer and VGC; Push Square lists it in the same place)", status: "confirmed" },
      { label: "Playable", value: "Lucia (VGC and PowerPyx)", status: "confirmed" },
      { label: "Unlocks after", value: "Starts automatically straight after Tourist Trap (VGC and PowerPyx)", status: "confirmed" },
      { label: "Combat", value: "A short fight against two attackers, then an escape (VGC and PowerPyx)", status: "confirmed" },
      { label: "Starts at", value: "Jason's house in Key Lento (PowerPyx). VGC has Lucia enter the house to recover Jason's stash.", status: "reported" },
      { label: "Cash reward", value: "None listed (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Enter Jason's house as Lucia and try to recover Jason's stash (VGC and PowerPyx). VGC says masked figures are inside and fight Lucia. PowerPyx says two robbers attack her, having wrecked the house and set it on fire.",
      "Fight off both intruders (VGC and PowerPyx). VGC says to watch out for the flames around the house, because being set on fire drains your health very quickly. PowerPyx says there is not enough time to get to the cash afterwards.",
      "Leave the house straight away (VGC and PowerPyx). The outlets differ on how Lucia gets out: VGC says to grab the photos by the door on your way out, just in time to be blown off the balcony, while PowerPyx says to run out the front door immediately before the house explodes.",
      "Escape the area, with police everywhere (VGC and PowerPyx). VGC says cops are on their way when Lucia wakes up and that a police helicopter is overhead, which makes open roads very difficult. PowerPyx calls it a manhunt and says to stay crouched in the dark and avoid being seen.",
      "Choose a route. VGC says you can call Andy and sneak through the neighbourhood to her car, cutting through trailers and buildings (you will need to break into most of them), or leave by water, where boats and jet skis are moored around Jason's and his neighbours' houses, though stealing a vehicle can alert the police further. PowerPyx says to head for the main road through the middle of Key Lento, where you can steal a car and drive out of the search area or carry on on foot.",
      "Get close to the edge of the search area and a cutscene starts the final mission of Chapter 1 (PowerPyx). VGC says the cutscene differs depending on how you escaped.",
    ],
    spoiler:
      "VGC says the way you escape changes the next cutscene. If you make your way to Andy, she takes Lucia to the hospital and gives her a unique jacket. If you leave by the water or in another car you get a slightly different cutscene, but VGC says every route ends at the hospital, ready for the final mission of Chapter 1, Discharge Time (Reported, VGC). PowerPyx says the house explodes and that you permanently lose Jason's home in Key Lento, never to recover it (Reported, PowerPyx).",
    tips: [
      { text: "Don't linger once the fight is over. VGC and PowerPyx both have you leave the house as soon as the attackers are down." },
      { text: "Pick your route before you step out. VGC says police are everywhere and a helicopter makes open roads very difficult, and suggests sneaking through the neighbourhood or leaving by water. PowerPyx suggests heading for the main road to steal a car, or carrying on on foot, while avoiding police (Reported, each).", reported: true },
      { text: "Stay low. PowerPyx says to stay crouched to move stealthily through the dark (Reported).", reported: true },
      { text: "Stealing a boat or jet ski is loud. VGC says it can further alert the police. Our wanted guide explains how heat works (Reported).", reported: true },
    ],
    notes: [
      "Routes: VGC and PowerPyx describe different ways out of the area. VGC describes sneaking through trailers and buildings to a contact's car, or leaving by water. PowerPyx describes crouching through the dark to the main road, then stealing a car or carrying on on foot. Both say several routes work (Reported, each).",
      "Order: PC Gamer and VGC list Home Sweet Home 21st, and Push Square lists it between Tourist Trap and the final mission of the chapter. PowerPyx calls it the 24th main mission.",
    ],
    faq: [
      {
        question: "Who do I play as in Home Sweet Home?",
        answer: "Lucia (VGC and PowerPyx, Confirmed).",
      },
      {
        question: "How do I escape the area in Home Sweet Home?",
        answer: "VGC says you can sneak through the neighbourhood or leave by water. PowerPyx says to head for the main road and either steal a car or carry on on foot. Both say to avoid being seen by the police (Reported, each).",
      },
      {
        question: "Can I free-roam after Home Sweet Home?",
        answer: "Not yet. VGC says it is the second of three linked missions that stop you roaming the open world, and PowerPyx says the next mission starts automatically (Confirmed).",
      },
      {
        question: "Is there a reward for Home Sweet Home?",
        answer: "No cash reward is listed (PowerPyx). VGC says the way you escape changes the next cutscene and that one route has an extra reward, which we keep behind the blur (Reported).",
      },
    ],
    sources: [
      PCGAMER,
      vgc("gta-6-home-sweet-home-mission-walkthrough", "VGC: GTA 6 Home Sweet Home mission walkthrough (18 Nov 2026)", "Objective flow, escape routes, helicopter and police warnings, mission order"),
      pp("gta-6-home-sweet-home-walkthrough", "Start point, objective flow, mission order"),
      pp("gta-6-tourist-trap-take-up-mattias-offer-walkthrough", "Second check on mission order and the finale warnings"),
      PUSHSQUARE,
    ],
    updated: "2026-11-19T17:14:40+10:00",
  },
  {
    slug: "discharge-time",
    order: 22,
    name: "Discharge Time",
    seoTitle: "GTA 6 Discharge Time Mission Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Discharge Time walkthrough: the Chapter 1 finale. Find your partner, survive the shootout, then win the final chase with tips for every phase.",
    teaser: "The last mission of Chapter 1: a long shootout followed by a final chase.",
    intro: [
      "Discharge Time is the 22nd story mission and the last one in Chapter 1. It starts straight after Home Sweet Home, and VGC and PowerPyx both say there is no free-roam until the chapter is done.",
      "It is the action-heavy finale: a long shootout followed by a final chase, mostly played as Jason. VGC warns that it is very easy to die because of how many enemies there are, and recommends using focus mode as much as you can. The story and the details of each phase stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 1: Just Like Paradise, mission 22, the last of the chapter (PC Gamer and VGC; Push Square lists it in the same place)", status: "confirmed" },
      { label: "Playable", value: "Lucia at the start, then Jason for the main shooting sections (VGC and PowerPyx)", status: "confirmed" },
      { label: "Unlocks after", value: "Starts automatically straight after Home Sweet Home (VGC and PowerPyx)", status: "confirmed" },
      { label: "Combat", value: "Heavy: a long shootout, then a final chase (VGC and PowerPyx)", status: "confirmed" },
      { label: "Ends", value: "Finishing it ends Chapter 1 (VGC and PowerPyx)", status: "confirmed" },
      { label: "Cash reward", value: "None listed (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "At the hospital, Lucia notices that the men who are after them have already tracked down where Jason is being kept (VGC). Head up to the second floor and find Jason in the ICU (VGC). PowerPyx says to go left from the start and up the stairs, ask the receptionist where he is if you need to, follow the pink line on the floor through the door on the left, and look for room 203.",
      "Go to his room and wake him up, because it is time to escape (VGC). PowerPyx says Lucia puts Jason in a wheelchair to take him out of the hospital.",
      "Play as Jason in the wheelchair and shoot the enemies bursting from every door (VGC). PowerPyx says Lucia wheels you around while you shoot the attackers. VGC says it is very easy to die here and recommends focus mode as much as possible.",
      "Control switches back to Lucia and you defend Jason from the hordes of enemies (VGC).",
      "At the ambulance bay Lucia leaves Jason to find a way out (VGC and PowerPyx). PowerPyx says an enemy comes in with a shotgun that you can grab and use, and that the force of each shot pushes the wheelchair back. Jason is then knocked out of the wheelchair and has to crawl to a gun (VGC and PowerPyx). PowerPyx says an enemy shoots nearby gas canisters and that is what knocks him to the ground.",
      "Lucia returns in the ambulance (VGC). PowerPyx says she smashes an enemy with it.",
      "Sit in the back of the ambulance as Jason and shoot the vehicles chasing you (VGC and PowerPyx). VGC calls them enemy cars and says you can shoot the driver, the person shooting at you, or the engine and wheels, and that disabling the wheels can make cars ricochet onto other cars and clear the road. PowerPyx calls them pursuing police vehicles.",
      "After a while the mission ends, and so does Chapter 1 (VGC). PowerPyx says a cutscene plays and you wake up the next day in a motel.",
    ],
    spoiler:
      "VGC says Jason is being kept in the hospital's ICU and that the men after the couple have already tracked him down (Reported, VGC). PowerPyx says Vice City Hospital is where the mission starts, that the dirty cops and masked men are there for Jason and Lucia, and that the people who destroyed the house sent reinforcements (Reported, PowerPyx). On the vehicles chasing the ambulance, VGC says enemies and PowerPyx says police (Reported, each). PowerPyx says the pair flee west to Kelly County, wake up the next day in a motel, and that this marks the start of Chapter 2 (Reported, PowerPyx).",
    tips: [
      { text: "Use focus mode as much as you can. VGC says the main shooting section throws a very large number of enemies at you and that it is very easy to die (Reported).", reported: true },
      { text: "If you pick up a shotgun mid-mission, PowerPyx says the force of each shot pushes you backwards (Reported).", reported: true },
      { text: "In the final chase, VGC says you can shoot the driver, the person shooting at you, or the engine and wheels. Disabling wheels can make cars ricochet onto other cars, which clears the road quickly (Reported).", reported: true },
      { text: "Make any manual save before Tourist Trap, not here. VGC and PowerPyx both say the last three missions of Chapter 1 lock you in from Tourist Trap onwards. Push Square says you can make manual saves at the start of each chapter (Reported).", reported: true },
      { text: "Story missions cannot be replayed (Push Square and GamesRadar+), so this is your one run at the finale." },
    ],
    notes: [
      "Order: PC Gamer and VGC list Discharge Time 22nd, the last mission of Chapter 1, and Push Square lists it last in the chapter. PowerPyx calls it the 25th main mission.",
    ],
    faq: [
      {
        question: "Who do I play as in Discharge Time?",
        answer: "You start as Lucia and do most of the shooting as Jason (VGC and PowerPyx, Confirmed).",
      },
      {
        question: "How do I survive the main shootout in Discharge Time?",
        answer: "VGC says there are a lot of enemies and it is very easy to die, and recommends using focus mode as much as you can (Reported).",
      },
      {
        question: "How do I stop the cars chasing me in the final chase?",
        answer: "VGC says you can shoot the driver, the person shooting at you, or the engine and wheels. Disabling wheels can make cars ricochet onto other cars (Reported).",
      },
      {
        question: "Is Discharge Time the last mission of Chapter 1?",
        answer: "Yes. It is mission 22 of 22 (PC Gamer, VGC and Push Square), and finishing it ends Chapter 1 (VGC and PowerPyx, Confirmed).",
      },
      {
        question: "Is there a reward for Discharge Time?",
        answer: "No cash reward is listed (PowerPyx, Reported).",
      },
    ],
    sources: [
      PCGAMER,
      vgc("gta-6-discharge-time-mission-walkthrough", "VGC: GTA 6 Discharge Time mission walkthrough (18 Nov 2026)", "Objective flow, focus mode and chase tips, mission order"),
      pp("gta-6-discharge-time-walkthrough", "Start point, objective flow, reward, mission order"),
      pp("gta-6-tourist-trap-take-up-mattias-offer-walkthrough", "Lock-in warning for the last three Chapter 1 missions"),
      PUSHSQUARE,
      gr("gta-6-mission-list", "GamesRadar+: GTA 6 mission list", "No mission replay"),
    ],
    updated: "2026-11-19T23:20:00+10:00",
  },
  {
    slug: "chapter-2-mission-1",
    hidden: true,
    chapter: 2,
    chapterOrder: 1,
    order: 23,
    name: "Chapter 2, Mission 1",
    seoTitle: "GTA 6 Chapter 2 Mission 1 Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 1 walkthrough: how the opening mission of the chapter plays, how long it takes, what to save first and where it sits in the story order.",
    teaser: "A very short opening mission that starts Chapter 2, straight after Discharge Time.",
    intro: [
      "This is the first mission of Chapter 2 and the 23rd story mission overall. VGC calls it one of the shortest missions in GTA 6, and VGC and PowerPyx both describe it as mostly a cutscene with one short interactive part. Neither lists a choice, a collectible or a cash reward in it.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the objective flow and what happens all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 1, and 23rd overall (VGC; Push Square lists it first in Chapter 2). PowerPyx numbers it 26th because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Discharge Time, the last mission of Chapter 1 (VGC and PowerPyx)", status: "confirmed" },
      { label: "Length", value: "Very short, built around a cutscene (VGC and PowerPyx)", status: "confirmed" },
      { label: "Starts", value: "Straight after Discharge Time, with no marker to drive to (PowerPyx)", status: "reported" },
      { label: "Cash reward", value: "None listed (PowerPyx)", status: "reported" },
      { label: "Trophy", value: "PowerPyx says the Chapter 1 completion trophy unlocks here (see our trophies guide)", status: "reported" },
    ],
    objectives: [
      "Watch the opening scene. The mission picks up straight after Chapter 1 ends (VGC and PowerPyx).",
      "You control Lucia and look through what is in the bag the pair took earlier (VGC and PowerPyx).",
      "Inspect the first item, a small statue of a woman. Turn it over and read the note underneath (VGC and PowerPyx). PowerPyx lists the only objective as \"Read the note\".",
      "Look at the second item, a hard drive. You can't do anything with it yet, because the pair have no computer to plug it into (VGC and PowerPyx).",
      "That is the whole mission (VGC). PowerPyx lists nothing else to do.",
    ],
    spoiler:
      "The mission is called What's in the Bag? (VGC, PowerPyx and our mission list). VGC says Jason and Lucia have fled Key Lento and are staying at a motel in Kelly County, and that the early part of Chapter 2 is about playing as Lucia while Jason recovers. PowerPyx lists the start as Kelly County, Starlet Motel, though its own description says a Port Gellhorn motel room (Reported, PowerPyx). The note under the statue reads \"From my collection. She reminded me of someone.\" VGC says to keep that in mind for later (Reported, VGC). PowerPyx adds that Captain Méndez is on the news blaming the pair for the attack, and that finishing the mission lets you play as Lucia in free roam (Reported, PowerPyx). The next mission is Ambulance Chaser in Push Square's list and ours. PowerPyx's next link points to Take Care of Jason instead, which no other outlet lists (Reported, PowerPyx).",
    tips: [
      { text: "Make a manual save once it ends. It is a clean start-of-chapter point, and Push Square and GamesRadar+ say story missions can't be replayed. A separate slot, so you can come back to the start of Chapter 2, is our own suggestion.", reported: true, link: { href: "/guides/saving", label: "How to save" } },
      { text: "Don't worry about the controls. Neither VGC nor PowerPyx lists a way to fail it or any combat (Reported).", reported: true },
      { text: "Not sure who you can swap to at this point? Our switching characters guide explains when swapping opens up.", link: { href: "/guides/switch-characters", label: "Switching characters" } },
      { text: "Keep the relationship going. The relationship guide covers the four levels and the actions that add hearts.", link: { href: "/guides/relationship", label: "Relationship levels guide" } },
      { text: "PowerPyx says the Chapter 1 completion trophy unlocks here, even though this mission belongs to Chapter 2 (Reported).", reported: true, link: { href: "/guides/trophies", label: "Trophy guide" } },
    ],
    notes: [
      "Order: VGC lists this mission 23rd, and Push Square lists it first in Chapter 2, straight after Discharge Time. PowerPyx calls it the 26th main mission using its own count, so treat the overall number as Reported.",
    ],
    faq: [
      {
        question: "How long is the first mission of Chapter 2?",
        answer: "Very short. VGC calls it one of the shortest missions in the game and says it is mostly a cutscene, and PowerPyx calls it a very short mission with a single objective (Confirmed).",
      },
      {
        question: "Can you fail the first mission of Chapter 2?",
        answer: "Neither VGC nor PowerPyx lists a way to fail it or any combat in it (Reported).",
      },
      {
        question: "Is anything missable in it?",
        answer: "Neither VGC nor PowerPyx lists a collectible, a choice or a cash reward. PowerPyx says the Chapter 1 completion trophy unlocks here (Reported).",
      },
      {
        question: "Which mission number is it?",
        answer: "It is the first mission of Chapter 2 and the 23rd overall in VGC's count and Push Square's list (Confirmed). PowerPyx numbers it 26th because it counts differently (Reported).",
      },
      {
        question: "Does it start by itself?",
        answer: "PowerPyx says it starts immediately after Discharge Time, and VGC says it takes place right after Chapter 1 ends (Reported).",
      },
    ],
    sources: [
      vgc("gta-6-whats-in-the-bag-walkthrough", "VGC: GTA 6 mission walkthrough, Chapter 2 mission 1 (19 Nov 2026)", "Mission number, length, objective flow, the early-chapter focus"),
      pp("gta-6-whats-in-the-bag-walkthrough", "Start point, objective, reward, mission order and next link"),
      PUSHSQUARE,
    ],
    sourceLabel: "VGC, PowerPyx, Push Square",
    updated: "2026-11-20T00:11:00+10:00",
  },
  {
    slug: "chapter-2-mission-2",
    hidden: true,
    chapter: 2,
    chapterOrder: 2,
    order: 24,
    name: "Chapter 2, Mission 2",
    seoTitle: "GTA 6 Chapter 2 Mission 2 Guide: Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 2 walkthrough: where it sits in the story order, whether it has a reward, if it can end in different ways and what to know first.",
    teaser: "The second mission of Chapter 2, straight after Chapter 2, Mission 1.",
    intro: [
      "This is the second mission of Chapter 2 and the 24th story mission overall (VGC and Push Square's list). VGC says it can end in a few different ways, and PowerPyx lists two objectives and no reward. Neither lists a collectible or a unique weapon in it.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the steps and what happens all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 2, and 24th overall (VGC; Push Square lists it second in Chapter 2). PowerPyx numbers it 35th because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Chapter 2, Mission 1 (PowerPyx's requirement line; VGC and Push Square list it next)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says the marker appears as soon as you first step outside after the previous mission", status: "reported" },
      { label: "Endings", value: "VGC says it can end in a few different ways. PowerPyx describes only one.", status: "reported" },
      { label: "Objectives", value: "Two (PowerPyx)", status: "reported" },
      { label: "Reward", value: "None listed (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Head to the marker. VGC says Lucia is looking for the ambulance she and Jason used to escape Vice City, and that you hear voices as you get close (Reported, VGC). PowerPyx says the barn is slightly east of Starlet Motel, and that the marker appears as soon as you first leave your motel room (Reported, PowerPyx).",
      "Get into the barn. VGC and PowerPyx both say to climb the stairs at the back to the raised platform. VGC adds that a side door also works and that the stairs are probably the intended way (Confirmed for the stairs, Reported for the side door).",
      "Lucia shouts at the locals who took the ambulance and they drive off (VGC). PowerPyx says a group of addicts found it and drive away with it as you go up (Reported, each). Jump down to the barn floor and take the quad bike (VGC) or ATV (PowerPyx) parked there (Confirmed).",
      "Chase it. PowerPyx says to stay close and not crash (Reported, PowerPyx). VGC says you can shoot while riding, and that if you hit the tyres quickly the people inside flee early and you only have to blow the ambulance up (Reported, VGC).",
      "If you don't stop it, it ends up against a tree further south (VGC and PowerPyx, Confirmed). VGC says you can then kill the people and rob them, or let them go, and that it doesn't change the objective (Reported, VGC).",
      "Destroy the ambulance (VGC and PowerPyx, Confirmed). VGC only says to blow it up. PowerPyx says to pick up the red gas canister behind it, pour the fuel over it and use the Ignite prompt on the trail, or throw the canister into the back and shoot it if you have a gun (Reported, PowerPyx).",
      "Leave straight away. PowerPyx says the explosion alerts the police (Reported, PowerPyx). Destroying the ambulance finishes the mission.",
    ],
    spoiler:
      "The mission is called Ambulance Chaser (VGC, PowerPyx and our mission list), and PowerPyx shows the map label Move the Ambulance. The vehicle is the ambulance Jason and Lucia used to get away at the end of Chapter 1. Locals found it, and the point of the mission is to get rid of it before it can be used as evidence (VGC and PowerPyx). You play as Lucia (VGC and PowerPyx). The next mission is Just Moved In in Push Square's list and ours, and our guide for it is the next mission page. PowerPyx's own previous and next links point to other missions, because it uses its own order (Reported, PowerPyx).",
    tips: [
      { text: "Make a manual save once it ends. Push Square and GamesRadar+ say story missions can't be replayed.", reported: true, link: { href: "/guides/saving", label: "How to save" } },
      { text: "Be ready to leave. PowerPyx warns that finishing the mission alerts the police, so plan your exit before you finish it (Reported).", reported: true, link: { href: "/guides/wanted", label: "Wanted system guide" } },
      { text: "Don't worry about missing a reward. PowerPyx lists none, and neither it nor VGC lists a collectible or unique weapon (Reported).", reported: true },
      { text: "The ending isn't fixed. VGC says it can finish in a few different ways, so you can't miss a required step by playing it your own way (Reported).", reported: true },
    ],
    notes: [
      "Order: VGC lists this mission 24th and Push Square lists it second in Chapter 2, straight after the first mission of the chapter. PowerPyx calls it the 35th main mission using its own count, so treat the overall number as Reported.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 2?",
        answer: "It is the second mission of Chapter 2 and the 24th overall in VGC's count and Push Square's list (Confirmed). PowerPyx numbers it 35th because it counts differently (Reported).",
      },
      {
        question: "Do I need to finish Chapter 2 Mission 1 first?",
        answer: "Yes. PowerPyx lists the first mission of Chapter 2 as its requirement, and VGC and Push Square list this one second (Confirmed).",
      },
      {
        question: "How does it start?",
        answer: "PowerPyx says the marker appears as soon as you first step outside after the previous mission (Reported).",
      },
      {
        question: "Can it end in different ways?",
        answer: "VGC says it can end in a few different ways depending on how the early part goes. PowerPyx describes only one route (Reported).",
      },
      {
        question: "Is there a reward?",
        answer: "PowerPyx lists none. Neither PowerPyx nor VGC lists a collectible or a unique weapon in it (Reported).",
      },
    ],
    sources: [
      vgc("gta-6-ambulance-chaser-mission-walkthrough", "VGC: GTA 6 mission walkthrough, Chapter 2 mission 2 (19 Nov 2026)", "Mission number, objective flow, the early-stop and choice details"),
      pp("gta-6-ambulance-chaser-move-the-ambulance-walkthrough", "Start point, objectives, destroy method, reward, police warning and mission order"),
      PUSHSQUARE,
    ],
    sourceLabel: "VGC, PowerPyx, Push Square",
    updated: "2026-11-20T00:11:00+10:00",
  },
  {
    slug: "chapter-2-mission-3",
    hidden: true,
    chapter: 2,
    chapterOrder: 3,
    order: 25,
    name: "Chapter 2, Mission 3",
    seoTitle: "GTA 6 Chapter 2 Mission 3 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 3 walkthrough: step-by-step objectives, where it sits in the story order, what it rewards and what to know before you start.",
    teaser: "The third mission of Chapter 2, straight after Chapter 2, Mission 2.",
    intro: [
      "This is the third mission of Chapter 2 and the 25th story mission overall (VGC and Push Square's list). VGC and PowerPyx both describe it as a short errand, and neither mentions any combat. It rewards a relationship increase, and PowerPyx lists a single objective.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the places, the objective flow and what happens all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 3, and 25th overall (VGC; Push Square lists it third in Chapter 2). PowerPyx numbers it 29th because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Chapter 2, Mission 2 (VGC's order and Push Square's list). PowerPyx's requirement line names the first mission of the chapter instead, because it lists missions differently.", status: "reported" },
      { label: "Starts", value: "PowerPyx says it is marked on the map straight after the first mission of Chapter 2", status: "reported" },
      { label: "Reward", value: "A relationship increase between Jason and Lucia (VGC and PowerPyx). VGC says you need to collect every item for it.", status: "confirmed" },
      { label: "Cash or weapon reward", value: "None listed (VGC and PowerPyx)", status: "reported" },
      { label: "Objectives", value: "One (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Go to the store. PowerPyx names it as the Alpha convenience store, at the gas station across the street from Starlet Motel in Kelly County. VGC calls it the grocery store (Reported, PowerPyx for the name). You play as Lucia (VGC and PowerPyx).",
      "Once you are inside, eight items show up as markers on the minimap (VGC and PowerPyx, Confirmed). PowerPyx says the markers only show if the minimap is switched on in the interface settings (Reported, PowerPyx). VGC says Focus Mode (L3 and R3) highlights what you are missing (Reported, VGC).",
      "The items: soda, protein bars, gauze, a bandana, hair clippers and a makeup bag (VGC and PowerPyx, Confirmed). The other two differ. PowerPyx lists fruit and soup, and VGC lists apples and soap (Reported, conflict). Follow the minimap marker rather than the name.",
      "Take the items off the shelves. You pay as you pick each one up, so there is no need to go to the counter (VGC and PowerPyx, Confirmed).",
      "Leave and head back to your room at the motel (VGC and PowerPyx, Confirmed). VGC says that if you destroy your vehicle, or get too far away from it, you have to go back to the store (Reported, VGC).",
      "Go inside to finish. VGC says you speak to Jason, and that your relationship level goes up only if you grabbed every item (Reported, VGC). PowerPyx ends the mission when you return to your room and lists the reward as a relationship increase.",
    ],
    spoiler:
      "The mission is called Just Moved In (VGC, PowerPyx and our mission list). VGC says Lucia is getting supplies for Jason, who is still out of action after the events at the end of Chapter 1 (VGC). VGC then has the motel owner turn up about unpaid rent. You can pay it, or give up Lucia's necklace as collateral, and VGC says you are unlikely to have enough cash at this point (Reported, VGC). After that Jason asks for stronger painkillers, and asking around the motel sends Lucia to Vicki in Room 10, which leads into the next mission (Reported, VGC). PowerPyx doesn't include the rent scene. It lists a separate mission, Overnight Charges (See Linda, The Manager), as a requirement for the next mission, and no other outlet lists it, so we haven't added it to the hub (Reported, PowerPyx).",
    tips: [
      { text: "Turn the minimap on before you start. PowerPyx says the item markers only show if it is enabled in the interface settings (Reported).", reported: true },
      { text: "Stuck on the last item? VGC suggests Focus Mode (L3 and R3 on PlayStation) to highlight what you are missing (Reported).", reported: true },
      { text: "Collect every item. VGC says the relationship increase only happens if you grab them all (Reported).", reported: true, link: { href: "/guides/relationship", label: "Relationship levels guide" } },
      { text: "Keep some cash on you. PowerPyx says items are paid for the moment you pick them up (Reported).", reported: true, link: { href: "/guides/money", label: "Money guide" } },
      { text: "Make a manual save once it ends. Push Square and GamesRadar+ say story missions can't be replayed.", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: VGC lists this mission 25th and Push Square lists it third in Chapter 2, straight after the second mission. PowerPyx calls it the 29th main mission using its own count, and it lists one extra mission that the other outlets don't, so treat the overall number as Reported.",
      "The objective list is written from VGC and PowerPyx and hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 3?",
        answer: "It is the third mission of Chapter 2 and the 25th overall in VGC's count and Push Square's list (Confirmed). PowerPyx numbers it 29th because it counts differently (Reported).",
      },
      {
        question: "What is the reward?",
        answer: "A relationship increase between Jason and Lucia (VGC and PowerPyx, Confirmed). VGC says you need every item for it, and neither outlet lists cash or a weapon (Reported).",
      },
      {
        question: "Does it have any combat?",
        answer: "Neither VGC nor PowerPyx mentions any combat in it (Reported).",
      },
      {
        question: "Do the outlets agree on every detail?",
        answer: "Mostly. They agree on the number of items and the reward, but two item names differ between VGC and PowerPyx, so follow the minimap markers. The page's blurred objectives show both versions (Reported).",
      },
      {
        question: "How does it start?",
        answer: "PowerPyx says it is marked on the map straight after the first mission of Chapter 2. VGC doesn't describe a trigger (Reported).",
      },
    ],
    sources: [
      vgc("gta-6-just-moved-in-mission-walkthrough", "VGC: GTA 6 mission walkthrough, Chapter 2 mission 3 (19 Nov 2026)", "Mission number, objective flow, reward and the Focus Mode tip"),
      pp("gta-6-just-moved-in-walkthrough", "Start point, requirement, objective, item list, reward and mission order"),
      PUSHSQUARE,
    ],
    sourceLabel: "VGC, PowerPyx, Push Square",
    updated: "2026-11-20T03:14:00+10:00",
  },
  {
    slug: "chapter-2-mission-4",
    hidden: true,
    chapter: 2,
    chapterOrder: 4,
    order: 26,
    name: "Chapter 2, Mission 4",
    seoTitle: "GTA 6 Chapter 2 Mission 4 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 4 walkthrough: step-by-step objectives, where the outlets disagree, where it sits in the story order and what to know before you start.",
    teaser: "The fourth mission of Chapter 2, straight after Chapter 2, Mission 3.",
    intro: [
      "This is the fourth mission of Chapter 2 and the 26th story mission overall (VGC; Push Square lists it fourth in Chapter 2). It is a long one: PowerPyx lists 16 objectives. The outlets disagree on two points. PowerPyx says a standoff in the middle can be talked down, while VGC describes a fight, and they put the end of the chase in different places.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the people, the places and the objective flow all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 4, and 26th overall (VGC; Push Square lists it fourth in Chapter 2). PowerPyx numbers it 30th because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Chapter 2, Mission 3 (VGC's order and Push Square's list). PowerPyx lists two earlier missions as requirements, one of which the other outlets don't list.", status: "reported" },
      { label: "Starts", value: "PowerPyx says it is marked with a pink search area after the first couple of Chapter 2 missions", status: "reported" },
      { label: "Objectives", value: "16 (PowerPyx)", status: "reported" },
      { label: "The standoff", value: "PowerPyx says choosing Defuse twice in a row avoids a fight. VGC says the group turns hostile and you have to fight.", status: "reported" },
      { label: "The chase", value: "VGC says destroying the car you are chasing fails the mission", status: "reported" },
      { label: "Reward", value: "PowerPyx says the $50 you pay early on is paid back through the BuckMe app. VGC lists no reward.", status: "reported" },
    ],
    objectives: [
      "Ask around the motel. PowerPyx says a man named Zach, standing between your room and reception, sends you to Room 10 and Vicki (Reported, PowerPyx). VGC has you start by speaking to Vicki, who lives at the motel. You play as Lucia (VGC and PowerPyx, Confirmed).",
      "Buy the painkillers from Vicki. PowerPyx puts the price at $50 and says you pay her to get the pills (Reported, PowerPyx). VGC says you can use the bong while you wait, which is optional (Reported, VGC).",
      "Take them back to your room. Jason points out they are not what you need (PowerPyx says they are over-the-counter pills; VGC calls them duds), so Lucia goes back to Vicki's room (Confirmed). VGC says you can choose to help Vicki up or leave her, and she gets up herself (Reported, VGC).",
      "Drive to town in Vicki's car. PowerPyx says to Port Gellhorn, the town west of the motel, and the Delights club where Vicki works (Reported, PowerPyx; VGC also has you park at Delights, so the club stop is Confirmed).",
      "Wait while Vicki collects her pay, and follow her through the club. PowerPyx says her boss is Frankie Delight. Then go back to the car (Confirmed).",
      "Check Dunk's trailer. He isn't home. Next try the boatyard, where Dunk's friends tell you he has gone to the car wash (VGC and PowerPyx, Confirmed).",
      "Go to the car wash, get out and open the shutter. Inside, Dunk is in trouble with a gang called the Kolts, and he escapes through the shutter (VGC and PowerPyx, Confirmed). The outlets differ on what comes next: PowerPyx says choosing Defuse twice in a row earns professional reputation and the gang leaves without a fight, and lists Provoke or attacking as alternatives (Reported, PowerPyx). VGC says the gang turns hostile and attacks you, so be ready to take them out (Reported, VGC).",
      "Chase Dunk's car. VGC says destroying it fails the mission and doesn't think you can catch him before he crashes. VGC says the crash is at the gun range, and PowerPyx says a farm (Reported, conflict).",
      "Find Dunk and drive him home. VGC says he is in the far paddock to the right of the gun range's main reception building (Reported, VGC). Get him into the car and drive back to his trailer to end the mission (VGC and PowerPyx, Confirmed).",
    ],
    spoiler:
      "The mission is called Girls' Trip in our mission list (PC Gamer and Press Start spell it that way). VGC and PowerPyx write it as Girl's Trip, and Push Square's list has Girls' Trap. PowerPyx adds Find Painkillers to the name. Lucia is looking for stronger painkillers for Jason, who is recovering (VGC and PowerPyx). Vicki, a neighbour at the motel, works at the Delights club, and takes Lucia to Dunk, a dealer who is in trouble with the Kolts, a gang VGC says has several hideouts in Kelly County. At the end, Dunk doesn't have the painkillers yet but says he will have some soon (VGC and PowerPyx, Confirmed). PowerPyx says he can get more from his supplier, Doctor Bill with the Pill (Reported, PowerPyx).",
    tips: [
      { text: "Try Defuse first if you would rather skip the fight. PowerPyx says two in a row ends the standoff peacefully (Reported). VGC describes a fight, so be ready either way.", reported: true },
      { text: "Hold your fire in the chase. VGC says destroying the car you are chasing fails the mission, so stay close until it crashes (Reported).", reported: true, link: { href: "/guides/wanted", label: "Wanted system guide" } },
      { text: "Carry $50 before you start. PowerPyx says you pay it early on and get it back through BuckMe afterwards (Reported).", reported: true, link: { href: "/guides/money", label: "Money guide" } },
      { text: "Follow the on-screen marker for the end of the chase. VGC and PowerPyx put it in different places (Reported).", reported: true },
      { text: "Make a manual save once it ends. Push Square and GamesRadar+ say story missions can't be replayed.", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: VGC lists this mission 26th and Push Square lists it fourth in Chapter 2, straight after the third mission. PowerPyx calls it the 30th main mission using its own count, and it lists one extra mission that the other outlets don't, so treat the overall number as Reported.",
      "The objective list is written from VGC and PowerPyx and hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 4?",
        answer: "It is the fourth mission of Chapter 2 and the 26th overall in VGC's count and Push Square's list (Confirmed). PowerPyx numbers it 30th because it counts differently (Reported).",
      },
      {
        question: "Can you avoid the fight in the middle of it?",
        answer: "PowerPyx says yes: choose Defuse twice in a row. VGC describes the group attacking, so be ready either way (Reported, the outlets differ).",
      },
      {
        question: "Can you destroy the car you are chasing?",
        answer: "No. VGC says destroying it fails the mission, and that you can't catch it before it crashes (Reported).",
      },
      {
        question: "Do you get your money back?",
        answer: "PowerPyx says the $50 you pay early on is paid back through BuckMe. VGC lists no reward (Reported).",
      },
      {
        question: "Where does the chase end?",
        answer: "The outlets disagree. The blurred objectives show each one's version, so follow the on-screen marker (Reported).",
      },
    ],
    sources: [
      vgc("gta-6-girls-trip-mission-walkthrough", "VGC: GTA 6 mission walkthrough, Chapter 2 mission 4 (19 Nov 2026)", "Mission number, objective flow, the standoff outcome and the fail rule in the chase"),
      pp("gta-6-girls-trip-find-painkillers-walkthrough", "Start point, objectives, the Defuse route, the $50 and its repayment, and mission order"),
      PUSHSQUARE,
    ],
    sourceLabel: "VGC, PowerPyx, Push Square",
    updated: "2026-11-20T03:14:00+10:00",
  },
  {
    slug: "chapter-2-mission-5",
    hidden: true,
    chapter: 2,
    chapterOrder: 5,
    order: 27,
    name: "Chapter 2, Mission 5",
    seoTitle: "GTA 6 Chapter 2 Mission 5 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 5 walkthrough: how to get the slim jim, how car trackers work, step-by-step objectives and what the mission unlocks.",
    teaser: "The fifth mission of Chapter 2, straight after Chapter 2, Mission 4.",
    intro: [
      "This is the fifth mission of Chapter 2 and the 27th story mission overall (Push Square's list, and PC Gamer calls it the fifth in Chapter 2). It is where you get the slim jim, which PC Gamer says opens locked cars without breaking a window or setting off an alarm. What you bring with you matters: PowerPyx says a car without a tracker can be kept, and a tracked one means a detour later.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the people, the places and the objective flow all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 5, and 27th overall (Push Square's list; PC Gamer calls it the fifth mission of Chapter 2). PowerPyx numbers it 31st because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Chapter 2, Mission 4 (PC Gamer says it comes just after that mission, and PowerPyx's requirement line is the same one)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says you can bring a car with you, and that one without a tracker can be registered at the end", status: "reported" },
      { label: "Slim jim", value: "You get it here. It opens locked cars with no broken window and no alarm, using a short stick mini-game (PC Gamer and PowerPyx)", status: "confirmed" },
      { label: "Buys stolen cars", value: "A contact starts buying stolen cars after this mission (PC Gamer and PowerPyx). PC Gamer says he only buys older, low-end cars. PowerPyx says he refuses any car with a tracker.", status: "reported" },
      { label: "Free registered car", value: "Lucia gets one (PowerPyx)", status: "reported" },
      { label: "Scooter Bros app", value: "PowerPyx lists it as a reward here, to have your personal car delivered. Push Square describes the app but doesn't say when you get it.", status: "reported" },
      { label: "Objectives", value: "Seven (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Bring a car to the mechanic's garage in Port Gellhorn, Kelly County. If your car has no tracker, you can register it at the end as your personal vehicle. If it has a tracker, you will be sent out later for an untracked one (Reported, PowerPyx).",
      "Follow the mechanic to the yard behind the garage, where three cars are parked (Reported, PowerPyx).",
      "Scan the cars with your scanning app (PowerPyx calls it the Waink app, and PC Gamer says it was installed earlier in Chapter 1). The bottom right of the screen shows no tracker, a standard tracker or an advanced tracker (Confirmed, PC Gamer and PowerPyx).",
      "Pick up the slim jim, which he hands over and shows you how to use (Confirmed, PC Gamer and PowerPyx).",
      "Break into the marked car, a Montagne XL (PowerPyx). Interact with the door, then tilt the right stick to the sweet spot (Confirmed for the stick mini-game, PC Gamer and PowerPyx). PowerPyx says the bar turns from white to pink at the right spot, and Push Square also describes a pink sweet spot (Reported).",
      "Walk back to the garage with the mechanic. He now offers to register stolen cars for you (Reported, PowerPyx).",
      "Only if you didn't bring a suitable car: steal one without a tracker from the big main road in the middle of Port Gellhorn and drive it back. PowerPyx says he won't accept a car stolen too close to his garage (Reported, PowerPyx).",
      "Respray the car in a new colour, then choose Register. It becomes Lucia's personal vehicle and the mission ends (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Moses in our mission list, Push Square's list and PC Gamer, after the mechanic who runs the garage (Confirmed). PowerPyx shows the map label Take A Vehicle to Moses (Reported). PC Gamer says it comes just after Girls' Trip. PowerPyx's quest description says Vicki told Lucia that Moses could set her up with a ride if she took a low-key vehicle to his auto shop (Reported, PowerPyx). You play as Lucia (PowerPyx). PowerPyx lists Moses's questline as this mission, then Daily Driver, Steal Vehicles for Moses and Collect Moses' Gift (Reported, PowerPyx).",
    tips: [
      { text: "Scan before you steal. The scanning app shows trackers, and PowerPyx says the buyer of stolen cars refuses any car with a tracker, and PC Gamer says the app also tells you whether a car is suitable for sale to him.", reported: true },
      { text: "Know the tracker types. PowerPyx says cheap cars usually have no tracker, mid-range cars a standard one and supercars an advanced one (Reported). On what a standard tracker does, the outlets differ: PowerPyx says it alerts the police to where you stole the car, while PC Gamer says it only stops you modifying the car at a mod shop until you register it (Reported, conflict). Both say an advanced tracker brings the police if you drive too slowly.", reported: true, link: { href: "/guides/stealing-cars", label: "Stealing cars guide" } },
      { text: "The slim jim doesn't start every car. PC Gamer says it won't start a keyless car, and that keyless cars need a separate tool you get later in the story. Some cars only need to be unlocked before you can hotwire them (Reported).", reported: true },
      { text: "Check the trunk. PC Gamer says the slim jim also lets you pop a car's trunk without setting off an alarm (Reported).", reported: true },
      { text: "Mind your garage space. PowerPyx says registering a new personal car later needs a free slot, so you have to buy more garages or sell a car (Reported).", reported: true, link: { href: "/guides/garages", label: "Garages guide" } },
      { text: "Selling untracked cars is early money. PowerPyx calls it the fastest way to make money so far, with a short closed period of 1 to 2 minutes after each sale (Reported).", reported: true, link: { href: "/guides/money", label: "Money guide" } },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square lists this mission fifth in Chapter 2, straight after the fourth mission, and PC Gamer calls it the fifth mission of Chapter 2. PowerPyx calls it the 31st main mission using its own count, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far. PC Gamer confirms the slim jim, its mini-game and the rules for the buyer of stolen cars, so everything else is Reported.",
      "The objective list is written from PowerPyx and hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 5?",
        answer: "It is the fifth mission of Chapter 2 and the 27th overall in Push Square's list, and PC Gamer calls it the fifth in Chapter 2 (Confirmed). PowerPyx numbers it 31st because it counts differently (Reported).",
      },
      {
        question: "When do you get the slim jim in GTA 6?",
        answer: "In this mission. PC Gamer and PowerPyx both say it is handed over here and that it opens locked cars without a broken window or an alarm (Confirmed).",
      },
      {
        question: "What car should I bring?",
        answer: "One without a tracker. PowerPyx says you can then keep it and register it as your personal vehicle at the end (Reported).",
      },
      {
        question: "Does the slim jim work on every car?",
        answer: "No. PC Gamer says it won't start a keyless car, which needs a separate tool you get later in the story (Reported).",
      },
      {
        question: "What does a car tracker do?",
        answer: "The outlets differ on standard trackers. PowerPyx says they alert the police to where you stole the car, and PC Gamer says they only block mod-shop upgrades until the car is registered. Both say an advanced tracker brings the police if you drive too slowly (Reported).",
      },
    ],
    sources: [
      pp("gta-6-moses-take-a-vehicle-to-moses-walkthrough", "Start point, requirement, objectives, trackers, rewards, registering and selling cars, and mission order"),
      {
        id: "pcgamer",
        label: "PC Gamer: How to get a slim jim in GTA 6 (18 Nov 2026)",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-slim-jim/",
        used: "The mission it comes from and its order, the slim jim mini-game, the trunk and the keyless-car limit",
      },
      {
        id: "pcgamer",
        label: "PC Gamer: GTA 6 changes the way you steal cars (18 Nov 2026)",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-how-to-steal-cars/",
        used: "The scanning app, tracker types, the slim jim and the rules for selling stolen cars",
      },
      PUSHSQUARE,
      {
        id: "pushsquare",
        label: "Push Square: GTA 6 tips and tricks you need to know",
        url: "https://www.pushsquare.com/guides/gta-6-tips-and-tricks-you-need-to-know",
        used: "The pink sweet spot in the break-in mini-games and what the Scooter Bros app does",
      },
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T04:13:00+10:00",
  },
  {
    slug: "chapter-2-mission-6",
    hidden: true,
    chapter: 2,
    chapterOrder: 6,
    order: 28,
    name: "Chapter 2, Mission 6",
    seoTitle: "GTA 6 Chapter 2 Mission 6 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 6 walkthrough: objectives, the payout and condition bonus, and the garage and real estate app rewards reported so far.",
    teaser: "The sixth mission of Chapter 2, straight after Chapter 2, Mission 5.",
    intro: [
      "This is the sixth mission of Chapter 2 and the 28th story mission overall (PC Gamer and Push Square list it in that order). It is a short car-theft job for Lucia: you get one specific car out of a spot with enemies around and bring it back. PowerPyx lists only two objectives, and says the car's condition decides a cash bonus.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the people, the car and the places all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 6, and 28th overall (PC Gamer and Push Square). PowerPyx numbers it 38th because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Chapter 2, Mission 5 (PC Gamer and Push Square put it next in order, and PowerPyx's requirement line is the same mission)", status: "confirmed" },
      { label: "Type", value: "A car-theft job for Lucia (PC Gamer's one-line summary says Lucia does a grand theft auto)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says a phone message with a picture of the target car arrives shortly after the previous mission, and that marks the mission on the map", status: "reported" },
      { label: "Objectives", value: "Two: search the area for the car, then deliver it (PowerPyx)", status: "reported" },
      { label: "Enemies", value: "There are enemies around the car. PowerPyx says you can take them out however you like, or just run to the car and drive away", status: "reported" },
      { label: "Payout", value: "$1,250, plus $500 if the car is delivered in good condition (PowerPyx)", status: "reported" },
      { label: "Free garage", value: "A free garage comes from a story contact (GameSpot lists one as given through the main story, and PowerPyx says it arrives shortly after this mission)", status: "confirmed" },
      { label: "Real estate app", value: "PowerPyx says the Vice City Real Estate app unlocks here, for buying garages. GameSpot and PC Gamer both say garages are bought through that app.", status: "reported" },
    ],
    objectives: [
      "Wait for the phone message. PowerPyx says Moses sends a picture of the '82 Canis Crawler he wants stolen shortly after the previous mission, and that this marks the mission on the map (Reported, PowerPyx).",
      "Search the marked area for the '82 Crawler. PowerPyx says it is a white jeep standing in the middle of the search area, near the old Trader's Union building (Reported, PowerPyx).",
      "Deal with the enemies nearby however you like, or run straight to the car and drive away (Reported, PowerPyx).",
      "Drive the car to Moses's garage in Port Gellhorn, which PowerPyx says is not far away. Deliver it to finish. The car must arrive in good condition to earn the $500 bonus (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Daily Driver in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Lucia does a grand theft auto (Confirmed). PowerPyx shows the map label Steal the Crawler for Moses, and says Moses wants the car stolen from clients who didn't pay him (Reported, PowerPyx). PowerPyx lists Moses's questline as the previous mission, then Daily Driver, Steal Vehicles for Moses and Collect Moses' Gift (Reported, PowerPyx). The free garage is the Port Gellhorn Station Garage, which GameSpot says is north of Moses' auto shop and is given to you by Moses as part of the main story (Confirmed, GameSpot and PowerPyx).",
    tips: [
      { text: "The $500 bonus depends on the car arriving in good condition (PowerPyx), so avoid wrecking it on the way back. Treating it gently is our own suggestion, not a sourced step.", reported: true },
      { text: "You don't have to clear the enemies. PowerPyx says you can fight them or just run to the car and drive away (Reported).", reported: true },
      { text: "This one is a delivery job, so the car is handed over rather than kept. Your own keeper car comes from the previous mission.", reported: false, link: { href: "/guides/missions/chapter-2-mission-5", label: "Previous mission" } },
      { text: "Garage space: PC Gamer says each garage holds a single car, while GameSpot says garages hold one or a couple of cars. The outlets differ, so check the capacity in game before you buy (Reported, conflict).", reported: true, link: { href: "/guides/garages", label: "Garages guide" } },
      { text: "Selling stolen cars is still an option. PC Gamer says one buyer only takes older, low-end cars, and that the scanning app tells you whether a car is suitable for sale to him (Reported).", reported: true, link: { href: "/guides/stealing-cars", label: "Stealing cars guide" } },
      { text: "Compare the money options before you buy a garage.", reported: false, link: { href: "/guides/money", label: "Money guide" } },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: PC Gamer and Push Square both list this mission sixth in Chapter 2, straight after the fifth mission. PowerPyx calls it the 38th main mission using its own count, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, and it is short. The steps, the payout and the timing of the garage and the real estate app are PowerPyx-only, so they are labelled Reported. PC Gamer, Push Square and GameSpot confirm the order, the type of mission and the free garage.",
      "The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 6?",
        answer: "It is the sixth mission of Chapter 2 and the 28th overall (Confirmed, PC Gamer and Push Square). PowerPyx numbers it 38th because it counts differently (Reported).",
      },
      {
        question: "How do you start Chapter 2 Mission 6?",
        answer: "Finish Chapter 2 Mission 5 and wait. PowerPyx says a phone message with a picture of the target car arrives shortly afterwards and marks the mission on your map (Reported).",
      },
      {
        question: "Do you have to fight the enemies?",
        answer: "No. PowerPyx says you can take them out however you like or just run to the car and drive away (Reported).",
      },
      {
        question: "How much does Chapter 2 Mission 6 pay?",
        answer: "PowerPyx says $1,250, plus $500 if the car is delivered in good condition (Reported).",
      },
      {
        question: "When can you buy garages in GTA 6?",
        answer: "GameSpot and PC Gamer say garages are bought through the Vice City Real Estate app on your phone. PowerPyx says the app unlocks in this mission (Reported).",
      },
    ],
    sources: [
      pp("gta-6-daily-driver-steal-the-crawler-for-moses-walkthrough", "Objectives, payout and condition bonus, enemies, free garage and real estate app timing"),
      {
        id: "pcgamer",
        label: "PC Gamer: GTA 6 mission list (18 Nov 2026)",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-mission-list/",
        used: "Mission name, order and one-line summary",
      },
      {
        id: "pcgamer",
        label: "PC Gamer: GTA 6 changes the way you steal cars (18 Nov 2026)",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-how-to-steal-cars/",
        used: "The scanning app, selling stolen cars, and buying garages through the real estate app",
      },
      {
        id: "gamespot",
        label: "GameSpot: All garage locations and prices in GTA 6 (18 Nov 2026)",
        url: "https://www.gamespot.com/articles/all-garage-locations-and-prices-in-gta-6/",
        used: "The free story garage, buying garages through the real estate app, and garage capacity",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T05:08:00+10:00",
  },
  {
    slug: "chapter-2-mission-7",
    hidden: true,
    chapter: 2,
    chapterOrder: 7,
    order: 29,
    name: "Chapter 2, Mission 7",
    seoTitle: "GTA 6 Chapter 2 Mission 7 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 7 walkthrough: the objectives, tips for the combat sections, cover and healing, and the rewards PowerPyx reports so far.",
    teaser: "The seventh mission of Chapter 2, straight after Chapter 2, Mission 6.",
    intro: [
      "This is the seventh mission of Chapter 2 and the 29th story mission overall (PC Gamer and Push Square list it in that order). You play as Lucia. PowerPyx lists nine objectives, including a driving escape and a large firefight where it advises staying in cover and healing, so go in with healing items.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the people, the gang and the places all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 7, and 29th overall (PC Gamer and Push Square). PowerPyx numbers it 37th because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Chapter 2, Mission 6 (PC Gamer and Push Square put it next in order)", status: "confirmed" },
      { label: "Playable as", value: "Lucia (PC Gamer's one-line summary names her, and PowerPyx lists her as the character)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says to finish the earlier Chapter 2 main missions, then wait for two phone calls from the contact. The mission is then marked on the map.", status: "reported" },
      { label: "Objectives", value: "Nine (PowerPyx)", status: "reported" },
      { label: "Combat", value: "PowerPyx says some enemies are inside buildings, and advises staying in cover, taking it slowly and healing with Zombix", status: "reported" },
      { label: "New fence", value: "The mission's contact becomes a fence you can sell to (PowerPyx)", status: "reported" },
      { label: "Cash", value: "$1,700 sent through the BuckMe app the next day (PowerPyx)", status: "reported" },
      { label: "Robbery locations", value: "The same next-day call marks two places to rob on the map (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Wait for Dunk to call you twice. PowerPyx says that after the earlier Chapter 2 main missions the mission is then marked in Port Gellhorn at Dunk's trailer (Reported, PowerPyx).",
      "Follow Dunk. He leads you to wait behind a dumpster near a convenience store while time moves on to the afternoon. Dr. Bill arrives, you enter the store, and you follow him to his car, where Dunk forces him into it at gunpoint. PowerPyx says Bill has retired and can't get prescription medication, but used to deal with the Kolts gang (Reported, PowerPyx).",
      "Drive the car to the docks, where the Kolts gang is waiting. Dunk hopes to get painkillers from them (Reported, PowerPyx).",
      "Drive to the office. The Kolts let you through the gate, and you drive slowly after the man walking in front of the car. The gang gets suspicious that nobody knew Bill was coming, and starts shooting (Reported, PowerPyx).",
      "Escape the compound by reversing the car out quickly, then keep driving until you lose the Kolts (Reported, PowerPyx).",
      "Pick up Dr. Bill. He phones Declan, his pill dealer in the gang, then jumps out of the car and knocks himself out while running. Go after him, and a short scene puts him in the trunk (Reported, PowerPyx).",
      "Go to the meeting spot at the airstrip south-west of Port Gellhorn. The Kolts shoot Bill straight away, then open fire on you too (Reported, PowerPyx).",
      "Defend yourself. Kill all the Kolts, including those inside the buildings. PowerPyx says to heal with Zombix if needed, stay in cover and take it slowly. Then enter the main building in the centre to find Dunk, who grabs the pills (Reported, PowerPyx).",
      "Drive Dunk back to his trailer, where the mission started. A cutscene has Lucia take the painkillers to Jason at the motel, and the mission ends when you spawn outside it (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Slam Dunk in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Dunk and Lucia team up (Confirmed). PowerPyx's quest description is that Lucia goes to Dunk's trailer to find out how he plans to get stronger painkillers for Jason, (Reported, PowerPyx). Looting Dr. Bill's body at the airstrip is optional and gives around $1,000 more (Reported, PowerPyx).",
    tips: [
      { text: "Go in with healing items. PowerPyx's advice for the large firefight is to heal with Zombix if needed, stay in cover and take it slowly (Reported). Stocking up beforehand is our own suggestion.", reported: true },
      { text: "In the driving escape, PowerPyx says to reverse the car out quickly and then drive until the pursuers drop off (Reported).", reported: true, link: { href: "/guides/wanted", label: "Wanted level guide" } },
      { text: "If a fight seems over but the objective hasn't moved on, check inside the buildings. PowerPyx says some enemies are indoors (Reported).", reported: true },
      { text: "The next-day call pays $1,700 and marks two robbery locations on the map (PowerPyx), so you have extra money to plan for once you are free between missions (Reported).", reported: true, link: { href: "/guides/money", label: "Money guide" } },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: PC Gamer and Push Square both list this mission seventh in Chapter 2, straight after the sixth. PowerPyx calls it the 37th main mission using its own count, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the objectives, start condition and every reward are labelled Reported. PC Gamer and Push Square confirm the name, the order and Lucia.",
      "The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 7?",
        answer: "It is the seventh mission of Chapter 2 and the 29th overall (Confirmed, PC Gamer and Push Square). PowerPyx numbers it 37th because it counts differently (Reported).",
      },
      {
        question: "How do you start Chapter 2 Mission 7?",
        answer: "PowerPyx says to finish the earlier Chapter 2 main missions and wait for two phone calls. The mission is then marked on your map (Reported).",
      },
      {
        question: "What if I get stuck in the big fight?",
        answer: "PowerPyx says some enemies are inside the buildings, so clear those too. Stay in cover, take it slowly and heal when you need to (Reported).",
      },
      {
        question: "How much does Chapter 2 Mission 7 pay?",
        answer: "PowerPyx says $1,700 through the BuckMe app the next day, plus two robbery locations marked on your map (Reported).",
      },
      {
        question: "Does this mission unlock anything?",
        answer: "PowerPyx says it unlocks a new fence you can sell to (Reported).",
      },
    ],
    sources: [
      pp("gta-6-slam-dunk-walkthrough", "Objectives, start condition, combat advice and rewards"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T06:15:00+10:00",
  },
  {
    slug: "chapter-2-mission-8",
    hidden: true,
    chapter: 2,
    chapterOrder: 8,
    order: 30,
    name: "Chapter 2, Mission 8",
    seoTitle: "GTA 6 Chapter 2 Mission 8 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 8 walkthrough: the timed objectives, how to lose a two-star wanted level, and the rewards PowerPyx reports so far.",
    teaser: "The eighth mission of Chapter 2, straight after Chapter 2, Mission 7.",
    intro: [
      "This is the eighth mission of Chapter 2 and the 30th story mission overall (PC Gamer and Push Square list it in that order). PowerPyx lists six objectives, a run of timed sections that each give you one minute, and a police chase at the end that you can shake with a simple route.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the people, the places and what happens at the end all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 8, and 30th overall (PC Gamer and Push Square). PowerPyx numbers it 39th because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Chapter 2, Mission 7 (PC Gamer and Push Square put it next in order, and PowerPyx's requirement line is the same mission)", status: "confirmed" },
      { label: "Characters", value: "PC Gamer's one-line summary names both Jason and Lucia. PowerPyx says you start it as Lucia.", status: "reported" },
      { label: "Starts", value: "PowerPyx says to wait for a phone call after the previous mission, which takes about half a day, and that finishing any other open main missions helps trigger it. The marker then turns pink on the map.", status: "reported" },
      { label: "Objectives", value: "Six (PowerPyx)", status: "reported" },
      { label: "Timed sections", value: "A one-minute timer shows in the bottom-right corner, the same for each one, and PowerPyx says it is more than enough time", status: "reported" },
      { label: "Wanted level", value: "The mission ends with a two-star wanted level. PowerPyx says taking the small off-road paths makes the escape easy.", status: "reported" },
      { label: "Rewards", value: "Both lead characters now have a personal vehicle, and a story trophy or achievement unlocks (PowerPyx)", status: "reported" },
      { label: "What follows", value: "PowerPyx says the next mission starts straight away", status: "reported" },
    ],
    objectives: [
      "Wait for the phone call after Slam Dunk. PowerPyx says it takes half a day or so, then the motel icon turns pink on the map at the Starlet Motel in Kelly County (Reported, PowerPyx).",
      "Go to Hank's Waffles. At the start a cutscene passes time until Jason is back to full health, then he and Lucia go on to rob several stores. Drive to the waffle house first (Reported, PowerPyx).",
      "Rob the diner. Pull out your gun, aim at the staff and press the threaten button. They put the cash from the register on the counter, so grab it. A one-minute timer appears in the bottom-right corner (the same for the next robberies). Leave the store when you are done and you spawn at the next one (Reported, PowerPyx).",
      "Rob the liquor store. You spawn inside, so aim at the clerk and take the money. Get in the car to spawn at the next store (Reported, PowerPyx).",
      "Rob the thrift store. Repeat the same steps (Reported, PowerPyx).",
      "Get in the car. Jason and Lucia rob two more stores, a gas station and another liquor store, and you end up back in the car with a two-star wanted level (Reported, PowerPyx).",
      "Lose the cops. PowerPyx says taking the small off-road paths escapes the police easily. A cutscene then has them arrive back at the Starlet Motel and spend the night together. The next morning Vicki comes in to get her laptop back, and the next mission starts immediately. Jason becomes playable again, and a story trophy or achievement unlocks (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Breakfast Run in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Jason and Lucia go for waffles (Confirmed). PowerPyx shows the map label Check on Jason, and its quest description is to head back to the motel and check how Jason is doing (Reported, PowerPyx). We have not named the trophy or achievement.",
    tips: [
      { text: "Don't panic about the clock. PowerPyx says each timer is one minute, the same every time, and more than enough (Reported).", reported: true },
      { text: "Leave the main road for the chase. PowerPyx says the small off-road paths make losing the police easy (Reported).", reported: true, link: { href: "/guides/wanted", label: "Wanted level guide" } },
      { text: "Check your health and your car before you take the call. The chase is the only hard part, so this is our own suggestion.", reported: false },
      { text: "Do any shopping or side activities before you take the call. PowerPyx says the next mission starts straight away, and the advice is our own suggestion.", reported: false, link: { href: "/guides/money", label: "Money guide" } },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: PC Gamer and Push Square both list this mission eighth in Chapter 2, straight after the seventh. PowerPyx calls it the 39th main mission using its own count, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the objectives, start condition, timers and rewards are labelled Reported. PC Gamer and Push Square confirm the name, the order and the lead characters.",
      "We have left out the name of the story trophy or achievement. The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 8?",
        answer: "It is the eighth mission of Chapter 2 and the 30th overall (Confirmed, PC Gamer and Push Square). PowerPyx numbers it 39th because it counts differently (Reported).",
      },
      {
        question: "How do you start Chapter 2 Mission 8?",
        answer: "Finish Chapter 2 Mission 7 and wait for a phone call. PowerPyx says it takes about half a day, and clearing other open main missions helps (Reported).",
      },
      {
        question: "How long do the timed sections last?",
        answer: "PowerPyx says each has a one-minute timer in the bottom-right corner, and that it is more than enough (Reported).",
      },
      {
        question: "How do you lose the police at the end?",
        answer: "PowerPyx says to take the small off-road paths (Reported).",
      },
      {
        question: "What does this mission unlock?",
        answer: "PowerPyx says both lead characters get a personal vehicle, and a story trophy or achievement unlocks (Reported).",
      },
    ],
    sources: [
      pp("gta-6-breakfast-run-check-on-jason-walkthrough", "Objectives, start condition, timers, wanted level and rewards"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T06:15:00+10:00",
  },
  {
    slug: "chapter-2-mission-9",
    hidden: true,
    chapter: 2,
    chapterOrder: 9,
    order: 31,
    name: "Chapter 2, Mission 9",
    seoTitle: "GTA 6 Chapter 2 Mission 9 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 9 walkthrough: every step in order, what the mission unlocks for switching characters, and tips before you move on.",
    teaser: "The ninth mission of Chapter 2, straight after Chapter 2, Mission 8.",
    intro: [
      "This is the ninth mission of Chapter 2 and the 31st story mission overall (PC Gamer and Push Square list it in that order). PowerPyx lists four objectives, says it needs no phone call to start, and says it is where free character switching opens up and four new jobs appear on the map.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the people, the places, the plan and the names of the jobs all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 9, and 31st overall (PC Gamer and Push Square). PowerPyx numbers it 40th because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Chapter 2, Mission 8 (PC Gamer and Push Square put it next in order, and PowerPyx's requirement line is the same mission)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says there is no call to wait for: it starts straight after the previous mission, with both leads together", status: "reported" },
      { label: "Objectives", value: "Four (PowerPyx)", status: "reported" },
      { label: "Cost", value: "A $2 purchase is part of it (PowerPyx)", status: "reported" },
      { label: "Free character switching", value: "PowerPyx says it unlocks at the end of this mission. Other outlets give a looser unlock point, so see our switching guide.", status: "reported" },
      { label: "Partner menu", value: "Hold right on the D-pad to open it. PowerPyx says you can give your partner commands from it when they are with you.", status: "reported" },
      { label: "New jobs", value: "Four jobs are marked on the map together and can be done in any order (PowerPyx). Their names are in the blur.", status: "reported" },
    ],
    objectives: [
      "Go to the motel kitchen with Lucia. PowerPyx says the mission starts straight after Breakfast Run, with Jason and Lucia spawning outside the Starlet Motel in Kelly County. The kitchen is straight ahead, in the southern corner of the property. On the way you run into Wyman, who recommends checking out the Mud Club for dirt races (Reported, PowerPyx).",
      "Buy Lucia a coffee. She sits down at the table, so use the coffee machine and pay $2. A cutscene starts in which the couple go over a plan for what to do next. PowerPyx says it doesn't matter which job you pick, because you have to do all of them anyway, and they are all marked on the map together straight after the scene (Reported, PowerPyx).",
      "Go to your car (Reported, PowerPyx).",
      "Hold right on the D-pad to interact with your partner. PowerPyx says this unlocks free switching between Jason and Lucia. You can give commands if your partner is with you, or switch characters (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Coffee Break in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Jason and Lucia make plans (Confirmed). PowerPyx's quest description is that, after their string of stick-ups, Jason and Lucia decide to keep rolling together and hit something bigger, so they can move to Vice City and stay with Jason's high school friend, Dre'Quan (Reported, PowerPyx). PowerPyx lists the four jobs it opens as Thrillbillies (Check Out the Mud Club), Hit Every Pawn, Hit Kingpin Bowling and Impounded Vehicle (Reported, PowerPyx). Push Square also lists Thrillbillies as Chapter 2's 11th mission.",
    tips: [
      { text: "Don't stress the choice of job in the scene. PowerPyx says all the jobs end up on your map anyway (Reported).", reported: true },
      { text: "Open the partner menu a few times before you head off, because it is how you switch from here on. This is our own suggestion.", reported: false, link: { href: "/guides/switch-characters", label: "How to switch characters" } },
      { text: "Pick the closest job first. PowerPyx says there is no set order, and starting with the nearest one on the map is our own suggestion.", reported: false, link: { href: "/map", label: "Interactive map" } },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: PC Gamer and Push Square both list this mission ninth in Chapter 2, straight after the eighth. PowerPyx calls it the 40th main mission using its own count, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the objectives, the start condition and the unlocks are labelled Reported. PC Gamer and Push Square confirm the name and the order.",
      "Where free switching unlocks is disputed across outlets. Our switching guide shows the other versions. The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 9?",
        answer: "It is the ninth mission of Chapter 2 and the 31st overall (Confirmed, PC Gamer and Push Square). PowerPyx numbers it 40th because it counts differently (Reported).",
      },
      {
        question: "How do you start Chapter 2 Mission 9?",
        answer: "You don't need to do anything. PowerPyx says it starts straight after Chapter 2 Mission 8 ends (Reported).",
      },
      {
        question: "When can you switch characters freely in GTA 6?",
        answer: "PowerPyx says free switching unlocks at the end of this mission, when you hold right on the D-pad to talk to your partner (Reported). Other outlets give a looser unlock point, so see our switching guide.",
      },
      {
        question: "Does the job you pick after the cutscene matter?",
        answer: "No. PowerPyx says all the suggested jobs are marked on the map together, and you have to do all of them (Reported).",
      },
      {
        question: "What does this mission unlock?",
        answer: "PowerPyx says free character switching, the partner menu and four new jobs you can play in any order (Reported).",
      },
    ],
    sources: [
      pp("gta-6-coffee-break-walkthrough", "Objectives, start condition, unlocks and the follow-up jobs"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T07:08:00+10:00",
  },
  {
    slug: "chapter-2-mission-10",
    hidden: true,
    chapter: 2,
    chapterOrder: 10,
    order: 32,
    name: "Chapter 2, Mission 10",
    seoTitle: "GTA 6 Chapter 2 Mission 10 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 10 walkthrough: every step in order, how to get through the fight and the chase, the payout, and tips to stay alive.",
    teaser: "The tenth mission of Chapter 2, straight after Chapter 2, Mission 9.",
    intro: [
      "This is the tenth mission of Chapter 2 and the 32nd story mission overall (PC Gamer and Push Square list it in that order). Either lead can start it. PowerPyx lists five objectives, including a shootout and a chase, says the overall outcome is always the same, and gives a $10,000 payout.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the people, the venue, the mid-mission steps and the code all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 10, and 32nd overall (PC Gamer and Push Square). PowerPyx numbers it 42nd because it counts differently.", status: "confirmed" },
      { label: "Unlocks after", value: "Chapter 2, Mission 9 (PC Gamer and Push Square put it next in order, and PowerPyx's requirement line is the same mission)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says to finish the previous mission, clean up any other pending main missions, and wait for a phone call. It is a group call, so it doesn't matter which lead you are playing.", status: "reported" },
      { label: "Playable as", value: "Either lead. PowerPyx says that if you arrive at the start alone, the game calls your partner in automatically.", status: "reported" },
      { label: "Objectives", value: "Five (PowerPyx)", status: "reported" },
      { label: "Combat and chase", value: "PowerPyx says you have to shoot your way out, then escape a chase that it calls easy either way", status: "reported" },
      { label: "Code", value: "PowerPyx gives a code you will need during the mission. It is in the blur.", status: "reported" },
      { label: "Payout", value: "$10,000, sent through the BuckMe app the next day (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Take the call and drive to the marker. PowerPyx says Vicki phones over a group call at some point after the previous mission, and wants help to rob her boss at the Delights strip club in Port Gellhorn, where she works (Reported, PowerPyx).",
      "Find a way backstage. It's ladies' night, so the bouncer only lets Lucia in. Jason has to climb over the fence behind the club when the two bouncers walk away, then go through the open door to the dressing room of the male strippers. The lead stripper, Mario, is inspired by Jason and wants him to join the dance routine on stage (Reported, PowerPyx).",
      "Make the choice. PowerPyx says you can pick Don't Help or Help, which change the next objectives significantly, but the overall outcome is always the same. Choosing not to help is quicker but skips some scenes. See the story notes below for both routes (Reported, PowerPyx).",
      "Watch the show. Whichever you chose, you briefly play as Lucia again and walk from the bar to the stage (Reported, PowerPyx).",
      "Rob the Delights safe. The safe code is 2008. Once you rob the safe, all of the club's security is alerted (Reported, PowerPyx).",
      "Leave Delights by shooting your way out. PowerPyx says that on either route you get spotted by the club's security (Reported, PowerPyx).",
      "Escape the bikers by driving away from the club. PowerPyx says the chase is easy to escape either way, though the bikers chase more aggressively if you didn't dance (Reported, PowerPyx).",
      "Meet Vicki and hand over the bag of cash. If you danced, you appear at a clothing store after escaping, buy Jason new clothes, then drive to Vicki yourself. If you didn't, you appear at the docks and go straight to the cutscene. Either way Vicki sends you $10,000 the next day through BuckMe (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Afternoon Delight in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Jason and Lucia visit a strip club (Confirmed). PowerPyx shows the map label Rob Vicki's Boss, and says Vicki wants to rob her boss and split the cash (Reported, PowerPyx). Don't Help: the dancers quit and the club owner, Frankie, goes on stage, but the ladies don't want to see him. Jason walks on stage and shoots at the ceiling, which starts the robbery and alerts all the security. You then run backstage to the safe, and shoot your way out. Help: Jason strip-dances with Mario and Lucky on stage while Lucia goes to the safe room quietly. A security guard catches her, Jason has to save her, and you shoot your way out. Then you get an extra objective to buy Jason new clothes (Reported, PowerPyx).",
    tips: [
      { text: "Heal and reload before you take the call. The mission has a shootout and a chase, so topping up first is our own suggestion.", reported: false },
      { text: "Get off the main road for the chase. PowerPyx says it is easy to escape, and the road advice is our own suggestion.", reported: false, link: { href: "/guides/wanted", label: "Wanted level guide" } },
      { text: "The $10,000 arrives the next day through BuckMe (PowerPyx), so check your balance before you plan big purchases (Reported).", reported: true, link: { href: "/guides/money", label: "Money guide" } },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: PC Gamer and Push Square both list this mission tenth in Chapter 2, straight after the ninth. PowerPyx calls it the 42nd main mission using its own count, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start condition, the steps, the code and the payout are labelled Reported. PC Gamer and Push Square confirm the name and the order.",
      "The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 10?",
        answer: "It is the tenth mission of Chapter 2 and the 32nd overall (Confirmed, PC Gamer and Push Square). PowerPyx numbers it 42nd because it counts differently (Reported).",
      },
      {
        question: "How do you start Chapter 2 Mission 10?",
        answer: "PowerPyx says to finish Chapter 2 Mission 9, clean up any other pending main missions and wait for a group phone call (Reported).",
      },
      {
        question: "How much does Chapter 2 Mission 10 pay?",
        answer: "PowerPyx says $10,000, sent through the BuckMe app the next day (Reported).",
      },
      {
        question: "Which character do you need for Chapter 2 Mission 10?",
        answer: "Either can start it. PowerPyx says your partner is called in automatically if you arrive alone (Reported).",
      },
      {
        question: "Is there a code to remember in Chapter 2 Mission 10?",
        answer: "PowerPyx gives one. It is in the blurred objectives on this page, so it stays hidden until you reveal it (Reported).",
      },
    ],
    sources: [
      pp("gta-6-afternoon-delight-rob-vickis-boss-walkthrough", "Start condition, objectives, code, routes and payout"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T07:08:00+10:00",
  },
  {
    slug: "chapter-2-mission-11",
    hidden: true,
    chapter: 2,
    chapterOrder: 11,
    order: 33,
    name: "Chapter 2, Mission 11",
    seoTitle: "GTA 6 Chapter 2 Mission 11 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 11 walkthrough: how it starts, every step in order, what you need to finish, how the payout works, and tips to do well.",
    teaser: "The eleventh mission of Chapter 2 in our hub order, after Chapter 2, Mission 10.",
    intro: [
      "This is the eleventh mission of Chapter 2 and the 33rd overall in Push Square's list, which counts it as a story mission (Reported). PC Gamer's Chapter 2 list leaves it out and PowerPyx files it as an optional side mission, so outlets disagree on whether it counts. Either lead can start it. PowerPyx lists five objectives and says how well you finish decides the payout.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the people, the venue and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 11, and 33rd overall in Push Square's list (our hub also follows Press Start's Story Recap). PC Gamer's list leaves it out, and PowerPyx calls it an optional side mission.", status: "reported" },
      { label: "Starts", value: "PowerPyx says it is marked on your map automatically during Chapter 2, Mission 9, together with several other optional jobs. No phone call is needed.", status: "reported" },
      { label: "Playable as", value: "Either lead (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Five (PowerPyx)", status: "reported" },
      { label: "Spending", value: "PowerPyx says you buy items and rent a vehicle during the mission. It gives no prices.", status: "reported" },
      { label: "Payout", value: "Depends on how you finish: up to $2,500 for first place and $625 for third, with lower places paying less (PowerPyx)", status: "reported" },
      { label: "Strangers & Freaks trophy", value: "PowerPyx says this questline does not count towards it", status: "reported" },
    ],
    objectives: [
      "Drive to the Mud Club marker. Either lead can go (Reported, PowerPyx).",
      "Buy outfits. At the entrance, go into the souvenir shop (the merch stall) and buy clothes for both Jason and Lucia (Reported, PowerPyx).",
      "Leave the shop. A cutscene introduces Billy and his dirt-bike crew, Ricardo (Ricky), Brittney and Wyman (Reported, PowerPyx).",
      "Rent a bike at Roostere's Rentals. Billy wants you to join a race. You can rent a Manchez or a Sanchez. PowerPyx says the Sanchez costs more but is faster, and recommends it, since a better placing earns the money back (Reported, PowerPyx).",
      "Go to the race organiser. The start is marked on the map (Reported, PowerPyx).",
      "Beat a member of Billy's crew. PowerPyx says you do not have to win to complete the quest, but that to impress Billy you can't come in last. It also says not to ram other riders, so you don't get thrown off. After the race Billy says he will be in touch with more jobs (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Thrillbillies in our mission list and in Push Square's 93-mission list, where it is Chapter 2 #11 (Reported, one main outlet plus Press Start's Story Recap). PowerPyx shows the map label Check Out the Mud Club. You hear about it from Wyman at the motel during Chapter 2, Mission 9, and it takes place at Thrillbilly Mud Club in Kelly County, where you meet Billy and his dirt-bike crew. It is the first of Billy's five jobs (PowerPyx, and Push Square's Billy side-mission list). PowerPyx objective wording: Buy a new outfit at the merch stall, Leave the store, Rent a vehicle at Roostere's Rentals, Go to the race organizer, Beat a member of Billy's crew (Reported, PowerPyx).",
    tips: [
      { text: "Pay for the better ride. PowerPyx says the dearer of the two options is faster and recommended, and that a better finish earns the money back (Reported).", reported: true },
      { text: "Keep it clean. PowerPyx says ramming other riders can throw you off the bike, so give them room (Reported). Taking the corners wide is our own suggestion.", reported: true },
      { text: "Aim for a good finish rather than a win. PowerPyx says you don't have to win to complete it, but to impress your contact you can't come in last (Reported).", reported: true },
      { text: "Bring spare cash. You pay for items and a rental before it starts (PowerPyx, Reported). Our money guide covers early earning.", reported: true, link: { href: "/guides/money", label: "Money guide" } },
      { text: "There is no rush. PowerPyx doesn't mark this questline as missable, and its Strangers & Freaks page says side quests that aren't marked missable stay available after the story (Reported).", reported: true },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square and Press Start list this as the eleventh mission of Chapter 2, so our hub does too. PC Gamer's Chapter 2 has only 11 missions and leaves this one out. PowerPyx labels it an optional side mission. Push Square also lists it as the first job of a side-mission questline. Treat the position as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start condition, the steps, the placing rule and the payout are labelled Reported. Only Push Square (with Press Start's count) backs the name and position.",
      "PowerPyx says you race 13 other racers and that you must place at least 13th, which doesn't add up, so we give no number for the placing rule. The objective wording says to beat a member of the crew. We show both and don't reconcile them.",
      "The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 11?",
        answer: "It is the eleventh mission of Chapter 2 and the 33rd overall in Push Square's list (Reported). PC Gamer's list leaves it out and PowerPyx calls it an optional side mission.",
      },
      {
        question: "How do you start Chapter 2 Mission 11?",
        answer: "PowerPyx says it is marked on your map automatically during Chapter 2 Mission 9, together with several other optional jobs (Reported).",
      },
      {
        question: "Do you have to win in Chapter 2 Mission 11?",
        answer: "No. PowerPyx says you don't have to win to complete it, but that to impress your contact you can't come in last (Reported).",
      },
      {
        question: "How much does Chapter 2 Mission 11 pay?",
        answer: "It depends on how you finish. PowerPyx gives up to $2,500 for first place and $625 for third, with lower places paying less (Reported).",
      },
      {
        question: "Which character do you need for Chapter 2 Mission 11?",
        answer: "Either lead can start it (PowerPyx, Reported).",
      },
    ],
    sources: [
      pp("gta-6-thrillbillies-check-out-the-mud-club-walkthrough", "Start condition, objectives, steps, rental choice, placing rule, payout and questline"),
      pp("gta-6-all-strangers-freaks-side-missions", "Whether the questline counts towards the trophy, and the missable rule"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T08:16:52+10:00",
  },
  {
    slug: "chapter-2-mission-12",
    hidden: true,
    chapter: 2,
    chapterOrder: 12,
    order: 34,
    name: "Chapter 2, Mission 12",
    seoTitle: "GTA 6 Chapter 2 Mission 12 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 12 walkthrough: how to unlock it, every step in order, the payout, the vehicle you can keep, and tips to finish smoothly.",
    teaser: "The twelfth mission of Chapter 2, after Chapter 2, Mission 11.",
    intro: [
      "This is the twelfth mission of Chapter 2 and the 34th overall in Push Square's list, which counts it as a story mission (Reported). PC Gamer's Chapter 2 list leaves it out and PowerPyx files it as an optional side mission. It comes from the same contact as Chapter 2, Mission 11 and either lead can start it. PowerPyx lists six objectives and a $2,000 payout, and says there is a vehicle from it that you can keep.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the people, the premise, the start point and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, mission 12, and 34th overall in Push Square's list (our hub also follows Press Start's Story Recap). PC Gamer's list leaves it out, and PowerPyx calls it an optional side mission.", status: "reported" },
      { label: "Unlocks after", value: "Chapter 2, Mission 11, plus a wait of a few in-game hours (PowerPyx)", status: "reported" },
      { label: "Starts", value: "PowerPyx says a phone message marks the start on your map, and you then go there to begin", status: "reported" },
      { label: "Playable as", value: "Either lead (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Six (PowerPyx)", status: "reported" },
      { label: "Payout", value: "$2,000 (PowerPyx)", status: "reported" },
      { label: "Vehicle", value: "PowerPyx says the vehicle you use can be kept if you store and register it afterwards", status: "reported" },
      { label: "Strangers & Freaks trophy", value: "PowerPyx says this questline does not count towards it", status: "reported" },
    ],
    objectives: [
      "Meet Billy at the bench in Port Gellhorn, the start marked after his phone message. He brings you a Highwayman Sanchez dirt bike and wants you to join his crew in robbing an armored truck (Reported, PowerPyx).",
      "Get on the dirt bike and follow Billy. A cutscene eventually shows the armored truck (Reported, PowerPyx).",
      "Chase the truck with Billy's crew. PowerPyx says the truck crashes into a tree by itself, so there is no need to shoot it. Focus on driving and don't get thrown off the bike (Reported, PowerPyx).",
      "Go to the crash site. Walk to the back doors of the truck, plant a bomb and set it off (Reported, PowerPyx).",
      "Handle the security guard. He leaves the truck and walks off to the side. PowerPyx says you can knock him out or leave him alone, and describes no difference between the two (Reported, PowerPyx).",
      "Take the one bag behind the truck, get on your bike and follow Billy. He leads you up a mountain to the rest of the crew, and a cutscene ends the mission (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Twist Wrist, Smash, Grab in our mission list and in Push Square's 93-mission list, where it is Chapter 2 #12 (Reported, one main outlet plus Press Start's Story Recap). PowerPyx shows the map label Join Billy on a Job. Billy, the dirt racer from Chapter 2, Mission 11, is planning a job and needs one more rider for his crew's armored-truck robbery. It starts at a bench in Port Gellhorn, and it is the second of Billy's five jobs (PowerPyx, and Push Square's Billy side-mission list). PowerPyx says the Highwayman Sanchez is very good for off-road stunt jumps, and suggests keeping it in a garage (if you have one, for example in Port Gellhorn) and registering it as a vehicle at Moses (Reported, PowerPyx). PowerPyx objective wording: Get on the dirt bike, Follow Billy, Stop the armored van, Go to the crash site / Plant a bomb on the rear doors, Handle the security guard, Follow Billy (Reported, PowerPyx).",
    tips: [
      { text: "Keep the vehicle. PowerPyx says the one you use is very good for off-road stunt jumps and suggests storing it in a garage and registering it as your own (Reported).", reported: true, link: { href: "/guides/garages", label: "Garages guide" } },
      { text: "You don't need to shoot anything during the chase part (PowerPyx, Reported). Focus on staying upright and close to the group.", reported: true, link: { href: "/guides/stealing-cars", label: "How to steal and keep cars" } },
      { text: "Don't wait by the marker. PowerPyx says the phone message takes a few in-game hours to arrive after Chapter 2, Mission 11, so carry on with other jobs. That advice is our own suggestion, based on PowerPyx's timing note.", reported: false },
      { text: "There is no rush. PowerPyx doesn't mark this questline as missable, and its Strangers & Freaks page says side quests that aren't marked missable stay available after the story (Reported).", reported: true },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square and Press Start list this as the twelfth mission of Chapter 2, so our hub does too. PC Gamer's Chapter 2 has only 11 missions and leaves it out. PowerPyx labels it an optional side mission. Push Square also lists it as the second job of a side-mission questline. Treat the position as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start condition, the steps, the payout and the vehicle tip are labelled Reported. Only Push Square (with Press Start's count) backs the name and position.",
      "PowerPyx's page shows its button prompts as icons, which we can't read as text, so we leave them out. The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 12?",
        answer: "It is the twelfth mission of Chapter 2 and the 34th overall in Push Square's list (Reported). PC Gamer's list leaves it out and PowerPyx calls it an optional side mission.",
      },
      {
        question: "How do you unlock Chapter 2 Mission 12?",
        answer: "Finish Chapter 2 Mission 11 and wait a few in-game hours for a phone message, which marks the start on your map (PowerPyx, Reported).",
      },
      {
        question: "How much does Chapter 2 Mission 12 pay?",
        answer: "$2,000 (PowerPyx, Reported).",
      },
      {
        question: "Can you keep the vehicle from Chapter 2 Mission 12?",
        answer: "PowerPyx says yes: store it in a garage and register it as your own (Reported).",
      },
      {
        question: "Which character do you need for Chapter 2 Mission 12?",
        answer: "Either lead can start it (PowerPyx, Reported).",
      },
    ],
    sources: [
      pp("gta-6-twist-wrist-smash-grab-join-billy-on-a-job-walkthrough", "Start condition, objectives, steps, guard choice, payout, vehicle tip and questline"),
      pp("gta-6-all-strangers-freaks-side-missions", "Whether the questline counts towards the trophy, and the missable rule"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T08:16:52+10:00",
  },
  {
    slug: "chapter-2-mission-13",
    hidden: true,
    chapter: 2,
    chapterOrder: 13,
    order: 35,
    name: "Chapter 2, Mission 13",
    seoTitle: "GTA 6 Chapter 2 Mission 13 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 2 Mission 13 walkthrough: how to unlock it, what to do before you start, every step in order, a known bug and its fix, plus quick tips.",
    teaser: "The thirteenth and last mission of Chapter 2, after Chapter 2, Mission 12.",
    intro: [
      "This is the thirteenth and last mission of Chapter 2 and the 35th overall in Push Square's list. Push Square and PC Gamer both put it last in the chapter (Confirmed), but the number 13 and the overall position are Reported. Either lead can start it. PowerPyx lists five objectives and no cash reward, and says starting it is a point of no return, so save first.",
      "Our mission list keeps Chapter 2 names behind a blur, so this page uses a neutral title. The mission's name, the unlock requirements, the start point, the people and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 2, and the last mission of the chapter in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "13th of Chapter 2 and 35th overall (Push Square and Press Start). PC Gamer's shorter Chapter 2 list puts it 11th. PowerPyx calls it the 43rd main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx says you need to finish every other available Chapter 2 main mission and meet a money target. The details are in the blur.", status: "reported" },
      { label: "Starts", value: "PowerPyx says your partner phones, the start is then marked on your map, and you go there and interact to begin", status: "reported" },
      { label: "Playable as", value: "Either lead (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Five (PowerPyx)", status: "reported" },
      { label: "Point of no return", value: "PowerPyx says starting it ends Chapter 2. Make a separate manual save first.", status: "reported" },
      { label: "Known bug", value: "PowerPyx reports a bug if you die in the chase section. The fix is to restart the mission.", status: "reported" },
      { label: "Payout", value: "None (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Regroup with Lucia. After interacting with the bathroom door, pick up the shotgun from the bed. Corrupt cops have found you. Defeat them and head to the cafeteria on the side of the motel, where Lucia is (Reported, PowerPyx).",
      "Defend yourself. You switch to Lucia automatically. Keep shooting the enemies (Reported, PowerPyx).",
      "Follow Jason. Jason heads for the road. A biker drives towards Lucia: shoot him and she takes the bike, and you play as her. Jason takes a car off the street. Follow him, staying close, since he has a pink dot on the minimap, and try not to crash because you can be thrown off the bike (Reported, PowerPyx).",
      "Jump to the car. After following Jason for a while a prompt appears. Drive close to the car and hold the button shown (Reported, PowerPyx).",
      "Escape with Jason. Jason drives on his own and you can shoot the police cars as Lucia. PowerPyx says to hit them in the tyres. A cutscene follows and you drive into Vice City, which is the start of Chapter 3 (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Checking Out in our mission list, Push Square's list and PC Gamer, where it is the last mission of Chapter 2 (Confirmed). PowerPyx shows the map label Move to Vice City. To unlock it, PowerPyx says you need to finish every other available Chapter 2 main mission and hold at least $15,000 (the Prepare for Vice City goal). Your partner then phones about an article Cal sent, the Starlet Motel in Kelly County is marked, and you return to your room and interact with the bathroom door. PowerPyx's point of no return: starting it ends Chapter 2 and permanently removes the Starlet Motel as your home (Reported, PowerPyx). The next mission starts straight after it with no break (Reported, PowerPyx's page for that mission). PowerPyx lists a story trophy among the rewards of that next mission. Its name is the same as Chapter 3's title, so we do not name it.",
    tips: [
      { text: "Make a manual save in a separate slot before you start, and keep it. PowerPyx calls this a point of no return. The advice to keep a separate slot is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
      { text: "Side quests that aren't marked missable stay available after the story, according to PowerPyx's Strangers & Freaks page (Reported). Checking anything marked missable before you start is our own suggestion.", reported: true },
      { text: "Top up health and ammo before you start. This is our own suggestion.", reported: false },
      { text: "Take the middle chase section slowly. PowerPyx warns that crashing can throw you off, and that dying in that section can trigger the bug above (Reported). Going slowly is our own advice.", reported: true },
      { text: "Check the unlock requirement in the blur and plan your money. This is our own suggestion.", reported: false, link: { href: "/guides/money", label: "Money guide" } },
      { text: "Read our switching guide before Chapter 3. This is our own suggestion.", reported: false, link: { href: "/guides/switch-characters", label: "Switching characters" } },
    ],
    notes: [
      "Order: Push Square and Press Start list this thirteenth in Chapter 2, so our hub does too. PC Gamer's Chapter 2 has 11 missions and lists it last. PowerPyx numbers it 43rd using its own count, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the unlock requirements, the point of no return, the steps, the bug and the reward are labelled Reported. Push Square and PC Gamer confirm the name and that it is last in the chapter.",
      "PowerPyx's button prompts are shown as icons, which we can't read as text, so we leave the button names out. The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 2 Mission 13?",
        answer: "It is the last mission of Chapter 2 in Push Square's and PC Gamer's lists (Confirmed). Push Square numbers it 13th in the chapter and 35th overall, PC Gamer 11th in its shorter list, and PowerPyx 43rd overall (Reported).",
      },
      {
        question: "How do you unlock Chapter 2 Mission 13?",
        answer: "PowerPyx says to finish every other available Chapter 2 main mission and meet a money target. The amount and the start point are in the blurred section of this page (Reported).",
      },
      {
        question: "Is Chapter 2 Mission 13 a point of no return?",
        answer: "Yes, according to PowerPyx: starting it ends Chapter 2. Make a separate manual save first (Reported).",
      },
      {
        question: "How much does Chapter 2 Mission 13 pay?",
        answer: "Nothing. PowerPyx lists no reward (Reported).",
      },
      {
        question: "What if the bug appears in Chapter 2 Mission 13?",
        answer: "PowerPyx says that if you die in the chase section, your partner can vanish as an objective and a police search area can stay on you. Restart the mission and try not to die there (Reported).",
      },
    ],
    sources: [
      pp("gta-6-checking-out-move-to-vice-city-walkthrough", "Requirements, start, point of no return, objectives, steps, bug and fix, and reward"),
      pp("gta-6-welcome-to-vice-city-walkthrough", "That the next mission starts straight after this one, and its listed rewards"),
      pp("gta-6-all-strangers-freaks-side-missions", "The missable rule for side quests"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T09:17:06+10:00",
  },
  {
    slug: "chapter-3-mission-1",
    hidden: true,
    chapter: 3,
    chapterOrder: 1,
    order: 36,
    name: "Chapter 3, Mission 1",
    seoTitle: "GTA 6 Chapter 3 Mission 1 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 1 walkthrough: how it starts, every step in order, the optional extra you can skip, and what you unlock when it ends.",
    teaser: "The first mission of Chapter 3, straight after Chapter 2, Mission 13.",
    intro: [
      "This is the first mission of Chapter 3 and the 36th overall in Push Square's list. Push Square and PC Gamer both list it first in Chapter 3 (Confirmed), but the overall number is Reported. It starts automatically straight after Chapter 2, Mission 13, so there is no marker to find. PowerPyx lists eight objectives, describes no combat, and says one part is optional.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the places, the people and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the first mission of the chapter in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "36th overall (Push Square and Press Start). PC Gamer's shorter list would make it 34th. PowerPyx calls it the 44th main mission using its own count.", status: "reported" },
      { label: "Starts", value: "Automatically, straight after Chapter 2, Mission 13, while you are already driving (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Eight (PowerPyx)", status: "reported" },
      { label: "Combat", value: "PowerPyx's walkthrough describes none", status: "reported" },
      { label: "Optional part", value: "One part can be accepted or declined, and PowerPyx describes no penalty either way", status: "reported" },
      { label: "Rewards", value: "PowerPyx lists a new home for the chapter, a new way to keep cars (by text after the mission) and a story trophy. The details are in the blur.", status: "reported" },
    ],
    objectives: [
      "Go to the Jack of Hearts. After a short drive into the city, Jason phones Dre'Quan, who asks you to meet him at the club (Reported, PowerPyx).",
      "Enter the Jack of Hearts. As you approach, the car stops out front by itself. Walk up to the bouncer at the door (Reported, PowerPyx).",
      "Go to the back of the Jack of Hearts. Go around the building to the other entrance, where Dre'Quan comes out to meet you, and follow him through the club until he stops at the stairs (Reported, PowerPyx).",
      "Throw money to the dancers. Dre'Quan offers you money to throw at the dancers, and you can accept or decline. If you accept, focus on a dancer and throw the money until it runs out (Reported, PowerPyx; the prompts are button icons).",
      "Return to Dre'Quan when you're ready. Go back to him at the stairs and follow him upstairs to meet Boobie (Reported, PowerPyx).",
      "Go to the apartment. When the talking is done, go back to your vehicle and drive to the apartment nearby (Reported, PowerPyx).",
      "Park at the apartment. Park in the spot in the covered area. PowerPyx says your owned cars are parked here during this chapter (Reported, PowerPyx).",
      "Go to the apartment. This first time you have to walk around the front of the building (the door opposite the parking spots works later). Go up to the second floor, where the apartment is the first door in front of you, and enter to finish (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Welcome to Vice City in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Jason and Lucia meet Dre'Quan (Confirmed). PowerPyx's quest description is that Jason and Lucia meet Jason's friend Dre'Quan at Jack of Hearts, the strip club in Crosstown, Vice City, where he runs a record label. Dre'Quan introduces them to his boss, Boobie Ike, who says they can stay in his apartment nearby (Reported, PowerPyx). PowerPyx's rewards: Bayside Apartments, apartment 201, as the Chapter 3 home; Pay 'n' Sprays that buy and register cars with standard trackers, announced by Moses over text after the mission; and a story trophy named after Chapter 3's title, which we do not name here (Reported, PowerPyx).",
    tips: [
      { text: "Don't look for a marker. PowerPyx says it begins on its own straight after the previous mission (Reported).", reported: true },
      { text: "The optional part really is optional. PowerPyx says you can accept or decline it and describes no penalty either way (Reported).", reported: true },
      { text: "Remember where you park. PowerPyx says your owned cars are kept at the new home during this chapter, so leaving your favourite there is our own suggestion.", reported: false },
      { text: "Make a manual save once you're in. A fresh chapter is a good point for one. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
      { text: "Check how car registration and storage work before you go shopping for cars. This is our own suggestion.", reported: false, link: { href: "/guides/garages", label: "Garages guide" } },
    ],
    notes: [
      "Order: Push Square and PC Gamer both list this first in Chapter 3. The overall number follows Push Square and Press Start, because PC Gamer's shorter Chapter 2 would make it 34th and PowerPyx numbers it 44th using its own count. Treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start condition, the steps, the optional part and the rewards are labelled Reported. Push Square and PC Gamer confirm the name and its place at the start of Chapter 3.",
      "The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 1?",
        answer: "It is the first mission of Chapter 3 in Push Square's and PC Gamer's lists (Confirmed). Push Square makes it the 36th mission overall and PowerPyx the 44th using its own count (Reported).",
      },
      {
        question: "How do you start Chapter 3 Mission 1?",
        answer: "You don't need to. PowerPyx says it starts automatically straight after Chapter 2 Mission 13 (Reported).",
      },
      {
        question: "Is there any combat in Chapter 3 Mission 1?",
        answer: "PowerPyx's walkthrough describes none (Reported).",
      },
      {
        question: "Can you skip the optional part of Chapter 3 Mission 1?",
        answer: "Yes. PowerPyx says you can accept or decline it (Reported).",
      },
    ],
    sources: [
      pp("gta-6-welcome-to-vice-city-walkthrough", "Start, quest description, objectives, steps, the optional choice, the parking note and rewards"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T09:17:06+10:00",
  },
  {
    slug: "chapter-3-mission-2",
    hidden: true,
    chapter: 3,
    chapterOrder: 2,
    order: 37,
    name: "Chapter 3, Mission 2",
    seoTitle: "GTA 6 Chapter 3 Mission 2 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 2 walkthrough: how to start it, every step in order, what the one choice changes, and how to earn the bonus along the way.",
    teaser: "The second mission of Chapter 3, straight after Chapter 3, Mission 1.",
    intro: [
      "This is the second mission of Chapter 3 and the 37th overall in Push Square's list. Push Square and PC Gamer both list it second in Chapter 3 (Confirmed), but the overall number is Reported. PowerPyx lists six objectives, says Chapter 3, Mission 1 has to be finished first, and says there is one choice that has no later effect and a bonus for how you handle one moment.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the start point, the people, the choice and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the second mission of the chapter in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "37th overall (Push Square and Press Start). PowerPyx calls it the 45th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "Chapter 3, Mission 1 (the lists put it next in order, and PowerPyx's requirement line is the same mission)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says you start it by going to a set place. Where is in the blur.", status: "reported" },
      { label: "Playable as", value: "One lead only (PowerPyx). Which one is in the blur.", status: "reported" },
      { label: "Objectives", value: "Six (PowerPyx)", status: "reported" },
      { label: "Choice", value: "One, and PowerPyx says it does not affect anything later", status: "reported" },
      { label: "Bonus", value: "PowerPyx says resolving the key moment without violence earns a bonus", status: "reported" },
      { label: "Payout", value: "PowerPyx's own page gives conflicting answers on whether there is any cash. Both are shown in the blur.", status: "reported" },
    ],
    objectives: [
      "Start it at the club. Go back to the Jack of Hearts in Crosstown and up the same stairs as last time, but take the door at the top into the studio. Dre'Quan is in the recording booth, so wait for him to finish. He asks which hook you prefer and any answer is fine. Then follow him upstairs to Boobie, who explains the job (Reported, PowerPyx).",
      "Drive to the pick-up location. Get into Dre'Quan's car and drive to a nearby apartment block. Follow him to a room on the second floor, where he talks with Tyrone. You can interrupt if you would rather not wait (Reported, PowerPyx).",
      "Choose which product to take. Tyrone offers Cut or Pure. See the options in the story notes (Reported, PowerPyx).",
      "Walk back. Dre'Quan takes a different route back to the car to avoid some people. In the large park you get a tutorial on throwing a football back to some kids (Reported, PowerPyx).",
      "Drive to the deal location. It is a short way south, near the club. Follow Dre'Quan on foot to the group standing by the cars, wait until prompted and hand over the bag. The buyer takes a long time testing, and you can ask him to hurry (Reported, PowerPyx).",
      "Take the money. Once the testing is done, take the backpack back. PowerPyx says resolving the situation non-violently gives a Professional bonus when you collect the money (Reported, PowerPyx).",
      "Deal with the confrontation. On the way back a man insists the bag is his. PowerPyx says he eventually attacks however you answer, so knock him out with melee and get in the car (Reported, PowerPyx).",
      "Take Dre'Quan to Southside. Drive him to a shop in Southside. About halfway there a cutscene ends the mission (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Dealer's Choice in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Jason does a drug deal (Confirmed). PowerPyx shows the map label Go See Dre'Quan and says only Jason can start it (Reported). PowerPyx's quest description: Boobie says Jason owes him a favour for letting him and Lucia stay in his apartment, so sends him on a drug deal. Dre'Quan comes as backup while Jason picks up product from the local dealer, Tyrone, then sells it in Crosstown (Reported, PowerPyx). The choice: Pure is accepted and the buyer pays without trouble. Cut is noticed by the buyer, who can be offered it at half price, and PowerPyx says they then hand the product back along with the money. PowerPyx says the choice has no later effect (Reported, PowerPyx). The payout is a sourcing conflict inside PowerPyx's own page: its summary box lists $1,500 for selling the Pure product, while its walkthrough text says you do not gain any money either way. We have found no second main outlet to settle it, so we show both and give no payout as fact (Reported, PowerPyx).",
    tips: [
      { text: "Stay calm at the key moment. PowerPyx says resolving it without violence earns the bonus (Reported).", reported: true },
      { text: "Don't stress the choice. PowerPyx says it has no effect on anything later (Reported).", reported: true },
      { text: "Expect a fight near the end. PowerPyx says it can't be talked down, so being ready for it is our own suggestion.", reported: false },
      { text: "You can skip some waiting. PowerPyx notes two places where you can cut a conversation short or ask someone to hurry (Reported).", reported: true },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square and PC Gamer both list this second in Chapter 3. The overall number follows Push Square and Press Start. PowerPyx calls it the 45th main mission using its own count, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start condition, the steps, the choice, the bonus and the payout are labelled Reported. Push Square and PC Gamer confirm the name and the order.",
      "PowerPyx contradicts itself on the payout (see the blurred story notes). We give no payout as fact. The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 2?",
        answer: "It is the second mission of Chapter 3 in Push Square's and PC Gamer's lists (Confirmed). Push Square makes it the 37th overall and PowerPyx the 45th using its own count (Reported).",
      },
      {
        question: "How do you start Chapter 3 Mission 2?",
        answer: "Finish Chapter 3 Mission 1, then go to the set place PowerPyx gives. That place is in the blurred section of this page (Reported).",
      },
      {
        question: "Does the choice in Chapter 3 Mission 2 matter?",
        answer: "PowerPyx says it doesn't affect anything later (Reported).",
      },
      {
        question: "How do you get the bonus in Chapter 3 Mission 2?",
        answer: "PowerPyx says resolving the key moment without violence earns it (Reported).",
      },
      {
        question: "Is there a cash reward in Chapter 3 Mission 2?",
        answer: "PowerPyx's own page disagrees with itself, so we can't say. Both versions are in the blurred section (Reported).",
      },
    ],
    sources: [
      pp("gta-6-dealers-choice-go-see-drequan-walkthrough", "Start, requirement, playable lead, objectives, steps, choice, bonus and the conflicting payout"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T10:07:58+10:00",
  },
  {
    slug: "chapter-3-mission-3",
    hidden: true,
    chapter: 3,
    chapterOrder: 3,
    order: 38,
    name: "Chapter 3, Mission 3",
    seoTitle: "GTA 6 Chapter 3 Mission 3 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 3 walkthrough: why it may not appear straight away, every step in order, tips for the chase, and the new tool you unlock.",
    teaser: "The third mission of Chapter 3, after Chapter 3, Mission 2.",
    intro: [
      "This is the third mission of Chapter 3 and the 38th overall in Push Square's list. Push Square and PC Gamer both list it third in Chapter 3 (Confirmed), but the overall number is Reported. It may not appear the moment Chapter 3, Mission 2 ends: PowerPyx says some in-game time has to pass first. PowerPyx lists eleven objectives and a new tool as the reward.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the start trigger, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the third mission of the chapter in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "38th overall (Push Square and Press Start). PowerPyx calls it the 52nd main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "Chapter 3, Mission 2 (the lists put it next in order, and PowerPyx's requirement line is the same mission)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says some in-game time has to pass after the previous mission, and then a trigger at a set place starts it. The details are in the blur.", status: "reported" },
      { label: "Playable as", value: "Either lead can start it (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Eleven (PowerPyx)", status: "reported" },
      { label: "Reward", value: "A new tool that both leads keep and that opens a type of locked container around the map. Its name and details are in the blur (PowerPyx).", status: "reported" },
      { label: "Relationship bonus", value: "PowerPyx says one early choice gives a relationship bonus", status: "reported" },
      { label: "Optional extra", value: "PowerPyx says you can find some cash and an item along the way", status: "reported" },
    ],
    objectives: [
      "Go to the restaurant. Once Lucia is ready, drive to the restaurant on the eastern side of the city and ride the lift up (Reported, PowerPyx).",
      "Meet Brian at the bar. While Brian and Lori talk to Lucia you can pick up drinks from the bar and hand one to Lucia, then follow them to the table (Reported, PowerPyx).",
      "Order for Lucia. When the waiter comes, order the Surf and Turf, as Lucia requested, for a relationship bonus (Reported, PowerPyx).",
      "Talk at the railing. After the women leave, walk to the railing with Brian. You can accept or decline his offer of a cigar. When prompted, switch to Lucia (Reported, PowerPyx).",
      "Go to the van. As Lucia, drive across the bridge and into the car park on the right to find the white van (Reported, PowerPyx).",
      "Open the van's rear doors. This automatically puts Lucia in a disguise and behind the wheel (Reported, PowerPyx).",
      "Go to the dockyard. Drive a short way south to the entrance. After a few seconds you are let in, and you can park the van nearby (Reported, PowerPyx).",
      "Search for the SCOOP containers. PowerPyx says to look for the yellow containers with SCOOP on the side, and that the one you want is on top of the stack in the middle. If you cut through the other containers, PowerPyx says the first one holds a Magacizo Cigar and $600 (PowerPyx's spelling) (Reported, PowerPyx).",
      "Break into the container. Interact with the door to use the new cut-off tool, and hold the button to keep the filling bar lined up with the marked section on the outside, which cuts the lock faster (Reported, PowerPyx).",
      "Steal the car from the container. A scene shows the container, with the car in it, being taken away by gang members. Jump on a nearby bike and chase the trailer. Gang members shoot at you from the back, and you jump onto the back when you are close (Reported, PowerPyx).",
      "Break the car out of the container. Get into the car and hold the prompt until it breaks free and reverses out (Reported, PowerPyx).",
      "Lose the cops. PowerPyx says the car is very fast, so staying on the highway should shake them quickly, and warns not to crash it (Reported, PowerPyx).",
      "Drive to the lockup. Take the car to the lockup in the north-west corner of the city. You can drive around any remaining wanted area. Drive inside to finish (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Meet the Heders in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Jason and Lucia have a double date (Confirmed). PowerPyx's subtitle is Meet Brian & Lori. To start it, PowerPyx says you must first finish Dealer's Choice, then have Cal visit the Bayside apartment to look at the hard drive. That tends to happen about a day after you first arrive at the apartment, or straight away if time has already passed while you did other things. Brian then contacts you a day or two later in game, and you start the mission by interacting with the bag of clothes in the apartment's bedroom (Reported, PowerPyx). PowerPyx's quest description: Jason and Lucia have dinner with Brian and Lori at a rooftop bar, where Brian agrees to put them in touch with his old contact, Raul, who might get them work and decrypt the hard drive. Raul wants a car stolen from Port VC first, and Lucia does the job (Reported, PowerPyx). The reward is the Cut-off Tool. PowerPyx's reward line says it opens orange SCOOP containers around the world, while in the mission itself it describes the target containers as yellow, so its two colours differ (Reported, PowerPyx).",
    tips: [
      { text: "If it hasn't appeared, let in-game time pass. PowerPyx says the start depends on in-game days going by, and that doing other jobs moves the clock on (Reported).", reported: true },
      { text: "Take the small social options. PowerPyx says one of them gives a relationship bonus (Reported).", reported: true, link: { href: "/guides/relationship", label: "Relationship levels" } },
      { text: "You only need one target in the search section. PowerPyx says the rest are optional (Reported). Details are in the blur.", reported: true },
      { text: "Avoid crashing during the escape. PowerPyx warns against wrecking the vehicle (Reported). Our wanted guide has general advice on shaking the police.", reported: true, link: { href: "/guides/wanted", label: "Wanted guide" } },
      { text: "Make a manual save before you start, so you can retry if the mission goes wrong. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square and PC Gamer both list this third in Chapter 3. The overall number follows Push Square and Press Start. PowerPyx calls it the 52nd main mission using its own count, and its page for this mission names Chapter 3, Mission 2 as the requirement, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start trigger, the steps, the reward and the optional extra are labelled Reported. Push Square and PC Gamer confirm the name and the order.",
      "PowerPyx's button prompts are shown as icons, which we can't read as text, so we leave the button names out. The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 3?",
        answer: "It is the third mission of Chapter 3 in Push Square's and PC Gamer's lists (Confirmed). Push Square makes it the 38th overall and PowerPyx the 52nd using its own count (Reported).",
      },
      {
        question: "Why can't I start Chapter 3 Mission 3?",
        answer: "PowerPyx says some in-game time has to pass after Chapter 3 Mission 2 before it appears. The exact trigger is in the blurred section (Reported).",
      },
      {
        question: "Which character do you need for Chapter 3 Mission 3?",
        answer: "PowerPyx says either lead can start it (Reported).",
      },
      {
        question: "What do you unlock in Chapter 3 Mission 3?",
        answer: "PowerPyx says a new tool that both leads keep, which opens a type of locked container around the map (Reported).",
      },
      {
        question: "Is there anything optional to find in Chapter 3 Mission 3?",
        answer: "PowerPyx says some cash and an item can be found along the way, and that one early choice gives a relationship bonus (Reported).",
      },
    ],
    sources: [
      pp("gta-6-meet-the-heders-walkthrough", "Start trigger, requirement, objectives, steps, relationship bonus, optional extra and reward"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T10:07:58+10:00",
  },
  {
    slug: "chapter-3-mission-4",
    hidden: true,
    chapter: 3,
    chapterOrder: 4,
    order: 39,
    name: "Chapter 3, Mission 4",
    seoTitle: "GTA 6 Chapter 3 Mission 4 Walkthrough & Rewards",
    seoDescription:
      "GTA 6 Chapter 3 Mission 4 walkthrough: every part in order, which parts are optional, how to start each part and every reward you can earn.",
    teaser: "The fourth mission of Chapter 3, played in three parts.",
    intro: [
      "This is the fourth mission of Chapter 3 and the 39th overall in Push Square's list. Push Square and PC Gamer both list it fourth in Chapter 3 (Confirmed), but the overall number is Reported. PowerPyx says it comes in three parts that appear at different points, that only Part 1 is needed for the story, and that the rewards depend on how you play it.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places, the choices and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the fourth mission of the chapter in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "39th overall (Push Square and Press Start). PowerPyx calls it the 46th main mission using its own count.", status: "reported" },
      { label: "Order", value: "PowerPyx's own order puts it ahead of Chapter 3, Mission 3, while Push Square and PC Gamer put it after. We follow Push Square and PC Gamer.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx lists only Chapter 3, Mission 2 as the requirement, so it may be available before Chapter 3, Mission 3 is finished. We have not confirmed that in the game.", status: "reported" },
      { label: "Parts", value: "Three, played at different times. Only Part 1 is needed to progress the story (PowerPyx).", status: "reported" },
      { label: "Starts", value: "Each part has its own start. Where and how are in the blur (PowerPyx).", status: "reported" },
      { label: "Playable as", value: "Either lead can start it (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Thirteen across the three parts (PowerPyx)", status: "reported" },
      { label: "Rewards", value: "PowerPyx lists an accessory from Part 1 depending on a choice, nothing from Part 2, and about $2,500 in valuables plus a car from Part 3", status: "reported" },
      { label: "Missable", value: "Parts 2 and 3 can be missed or can expire. PowerPyx says that is not needed for the story or overall completion, but you lose the extra rewards.", status: "reported" },
    ],
    objectives: [
      "Part 1 (required): go to the antique store. The town is on the far west side of the map. You can drive there yourself or take a RideMe to get there more quickly. Try the front door, and a scene plays upstairs (Reported, PowerPyx).",
      "Part 1: decide whether to hand over the statue. Evelyn turns down looking at the statue, but her colleague Halifax offers to appraise it instead. If you accept, he gives you his watch as collateral straight away. If you decline, you get an optional objective to call him back later, and doing that leads to the same next part (Reported, PowerPyx).",
      "Part 1: optional exploring. You get an optional objective to explore Capri. It goes away when you visit any store or leave the town, and PowerPyx says you aren't obliged to do anything there (Reported, PowerPyx).",
      "Part 2 (optional): return to the antique store. After giving Halifax the statue he won't contact you, so you go back to the store yourself. Time passes while you wait for Evelyn to leave (Reported, PowerPyx).",
      "Part 2: get inside. You can break the door down, or get in quietly: go round the back of the store, up the stairs, jump across to the lower roof, then climb up and in through the window above the air conditioner (Reported, PowerPyx).",
      "Part 2: let Jason in. After climbing through the window, go to the door to open it for him (Reported, PowerPyx).",
      "Part 2: find the statue. Inspect the room, but the main thing is the drawer on the desk in the north corner of the room. PowerPyx then says you have an address for the motel next door (Reported, PowerPyx).",
      "Part 2: search the motel. Speak to one of the residents, who points you to the upper-floor room on the west side, and interact with its door. After a scene you can choose whether to trust Halifax or not. PowerPyx says trusting him allows you to complete Part 3 (Reported, PowerPyx).",
      "Part 3 (optional): speak with Evelyn. After a while she contacts you to say she has information, and you return to the antique store to speak with her. She gives you an address in the north-western neighbourhood of Capri (Reported, PowerPyx).",
      "Part 3: chase Halifax on the water. After a scene he drives off in a boat, and Jason jumps on a Seashark to follow. Get close, and when you are right by him hold the prompt to jump onto his boat (Reported, PowerPyx).",
      "Part 3: chase him on land. He crashes the boat and runs on foot, so swim to shore and keep chasing. He steals a golf cart, so jump on the bike in the yard and keep chasing (Reported, PowerPyx).",
      "Part 3: stop him as Lucia. He pepper-sprays Jason and you switch to Lucia when he runs into her car. When you jump out, use Focus and shoot him in the leg to stop him (Reported, PowerPyx).",
      "Part 3: approach him, then call Jason. Walk up to him so he stops running, then pull out Lucia's phone and call Jason to come over (Reported, PowerPyx).",
      "Part 3: shoot or spare Halifax. Once Jason arrives and you have the statue back, you can shoot or spare Halifax, and PowerPyx says whichever you choose is up to you (Reported, PowerPyx).",
      "Part 3: loot the storage container. After he is dealt with you can loot around $2,500 worth of jewellery and cash from the storage container. There is also the '32 Hustler, which you can take and sell for more money or keep (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Dubious Provenance in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Jason and Lucia go to an antique store (Confirmed). PowerPyx shows the map label Visit the Antique Store and its quest description says Lucia and Jason check out an antique store in Capri, looking for information on the statue. The owner, Evelyn, tells them the statue is either an incredible fake or stolen and makes them leave, and a British antiquer, Benedict Halifax, catches up to them outside and says he will appraise the statue off the books, offering his very valuable watch as collateral (Reported, PowerPyx). PowerPyx lists Chapter 3, Mission 2 (Dealer's Choice) as the requirement. Part 1 starts from the bag in the closet of the Bayside apartment, and Parts 2 and 3 start in Capri. The choices: agreeing to give Halifax the statue gets you his watch in Part 1; declining gives you an optional call-back that leads to the same next part, and if you ignore it, PowerPyx says it goes away at the end of Chapter 3 and you can't complete Parts 2 and 3. Trusting Halifax at the end of Part 2 is what PowerPyx says allows Part 3. Shooting or sparing him at the end makes no difference PowerPyx mentions (Reported, PowerPyx). Rewards, per PowerPyx: the watch is the Crowex Octane \"Bobby Ambrose\", equipped from the Accessories > Watches section at a wardrobe. PowerPyx's reward box spells it Octaine while its body text spells it Octane, so we use Octane, which is what the body text says. Part 2 gives nothing. Part 3 gives around $2,500 in jewellery and cash from the storage container, plus the '32 Hustler to keep or sell. PowerPyx also spells the house owner's name two ways, Mayram's in one heading and Maryam's elsewhere (Reported, PowerPyx).",
    tips: [
      { text: "If you want every reward, don't skip the call-backs. PowerPyx says choices in the earlier parts decide whether the later parts open, and one optional call-back can expire when Chapter 3 ends. The details are in the blur (Reported).", reported: true },
      { text: "Part 2 has a quiet way in as well as a loud one, according to PowerPyx (Reported).", reported: true },
      { text: "Have a weapon you are comfortable with ready for Part 3. PowerPyx describes one moment there that needs a precise shot, so this is our own suggestion.", reported: false },
      { text: "Check the car before selling it. PowerPyx says the car from Part 3 can be kept or sold (Reported).", reported: true, link: { href: "/guides/money", label: "Money guide" } },
      { text: "If a part doesn't show up, do other quests or try sleeping. That is PowerPyx's general advice in its full walkthrough index (Reported).", reported: true },
      { text: "Make a manual save before each part, since later parts can be missed or expire. This is our own suggestion.", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square and PC Gamer both list this fourth in Chapter 3. The overall number follows Push Square and Press Start. PowerPyx calls it the 46th main mission using its own count, and its walkthrough index lists it before Chapter 3, Mission 3, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start conditions, the steps, the choices and the rewards are labelled Reported. Push Square and PC Gamer confirm the name and the order.",
      "PowerPyx's button prompts are shown as icons, which we can't read as text, so we leave the button names out. The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Is Chapter 3 Mission 4 one mission or several parts?",
        answer: "One mission in three parts, played at different times. PowerPyx says only Part 1 is needed to progress the story (Reported).",
      },
      {
        question: "Can you miss part of Chapter 3 Mission 4?",
        answer: "Yes. PowerPyx says the later parts depend on what you do earlier and one optional call-back can expire when Chapter 3 ends. It says that is not needed for the story or overall completion, but you lose extra rewards (Reported).",
      },
      {
        question: "What are the rewards for Chapter 3 Mission 4?",
        answer: "PowerPyx lists an accessory from Part 1 depending on a choice, nothing from Part 2, and around $2,500 in valuables plus a car from Part 3. The details are in the blurred section (Reported).",
      },
      {
        question: "Why can't I start the next part of Chapter 3 Mission 4?",
        answer: "PowerPyx says later parts appear after some time has passed or after you are contacted. Its full walkthrough index also suggests doing other quests or trying sleeping if a quest doesn't appear (Reported).",
      },
      {
        question: "Which mission number is Chapter 3 Mission 4?",
        answer: "It is the fourth mission of Chapter 3 in Push Square's and PC Gamer's lists (Confirmed). Push Square makes it the 39th overall and PowerPyx the 46th using its own count (Reported).",
      },
    ],
    sources: [
      pp("gta-6-dubious-provenance-visit-the-antique-store-walkthrough", "Requirement, starts, objectives, steps, choices, missable parts and rewards"),
      pp("gta-6-full-walkthrough-all-missions", "PowerPyx's own mission order and its advice when a quest doesn't appear"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T11:12:50+10:00",
  },
  {
    slug: "chapter-3-mission-5",
    hidden: true,
    chapter: 3,
    chapterOrder: 5,
    order: 40,
    name: "Chapter 3, Mission 5",
    seoTitle: "GTA 6 Chapter 3 Mission 5 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 5 walkthrough: every step in order, how to handle the quick-reaction moment, what it rewards and the tips that matter most.",
    teaser: "The fifth mission of Chapter 3, with no choices and no reward.",
    intro: [
      "This is the fifth mission of Chapter 3 and the 40th overall in Push Square's list. Push Square and PC Gamer both list it fifth in Chapter 3 (Confirmed), but the overall number is Reported. PowerPyx lists twelve objectives, no reward, and no choices or optional objectives. One moment needs a quick reaction.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the fifth mission of the chapter in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "40th overall (Push Square and Press Start). PowerPyx calls it the 47th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx lists only Chapter 3, Mission 2 as the requirement, and its own order puts this mission right after Chapter 3, Mission 4. We have not confirmed in the game whether it can be played before Mission 3 or 4.", status: "reported" },
      { label: "Starts", value: "PowerPyx says you start it by going to a set place. Where is in the blur.", status: "reported" },
      { label: "Playable as", value: "One lead only (PowerPyx). Which one is in the blur.", status: "reported" },
      { label: "Objectives", value: "Twelve (PowerPyx)", status: "reported" },
      { label: "Reward", value: "None. PowerPyx lists the reward as \"None\".", status: "reported" },
      { label: "Choices", value: "PowerPyx's walkthrough lists no decisions and no optional objectives for this mission", status: "reported" },
    ],
    objectives: [
      "Drive to the house. As Lucia, go to Peacock Bay and meet Mia. After speaking with her, get in her car and drive to the marked neighbourhood in the town of Hamlet (Reported, PowerPyx).",
      "Follow Mia and explore the house. Follow Mia inside, then walk into the different rooms while she checks the house over (Reported, PowerPyx).",
      "Help Mia. Go back near the entrance and interact with Mia to help her up (Reported, PowerPyx).",
      "Clear the junk from the front lawn. Pick up a junk item, walk it to the blue dumpster and throw it in. Keep doing this while Mia talks on the phone (Reported, PowerPyx).",
      "Follow Mia to the backyard. After a scene showing the yard cleaned up, go back to the front door and follow Mia to the backyard (Reported, PowerPyx).",
      "Grab the mattress. Once Mia finishes talking, interact with the mattress and follow the on-screen prompts, which use held and tapped inputs, to help her pull it out of the pool (Reported, PowerPyx; the prompts are button icons).",
      "Save Mia. After the mattress comes out a gator jumps out of the pool and grabs Mia's leg. Shoot it quickly to save her (Reported, PowerPyx).",
      "Get in the excavator. After the gang members leave, Mia prompts you to get in the excavator across the street (Reported, PowerPyx).",
      "Smash up the property. Drive the excavator near the house and use it to damage the house and the cars in the driveway. You can close the claw, which lets you grab the cars and smash them around (Reported, PowerPyx).",
      "Get in Mia's car. Once you have destroyed enough of the property, get back in the car with Mia to leave (Reported, PowerPyx).",
      "Drive to Mia's office. It is nearby in town, and reaching it completes the mission (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Mami Knows Best in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Lucia meets a family member (Confirmed). PowerPyx shows the map label Catch Up With Mia, says only Lucia can start it, lists Chapter 3, Mission 2 (Dealer's Choice) as the requirement, and says it starts in Peacock Bay. PowerPyx's quest description: Lucia meets her mom, Mia, who has just opened her own real estate business. They go to the new property Mia has to sell, only to find it in an unsaleable condition. While cleaning they are confronted at gunpoint and told to stay away by M7 gang members who live next door. As they leave, Mia tells Lucia to damage the M7 house with a nearby excavator (Reported, PowerPyx).",
    tips: [
      { text: "Be ready to react quickly at one point. PowerPyx describes a moment where you need to shoot fast (Reported). Details are in the blur.", reported: true },
      { text: "Follow the on-screen prompts closely. PowerPyx says one part uses held and tapped inputs (Reported).", reported: true },
      { text: "No choices and nothing missable listed. PowerPyx's walkthrough lists no decisions or optional objectives for this mission (Reported).", reported: true },
      { text: "Make a manual save before you start. PowerPyx says GTA VI has no mission replay and suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
      { text: "If it doesn't show up, do other quests or try sleeping. That is PowerPyx's general advice in its full walkthrough index (Reported).", reported: true },
    ],
    notes: [
      "Order: Push Square and PC Gamer both list this fifth in Chapter 3. The overall number follows Push Square and Press Start. PowerPyx calls it the 47th main mission using its own count, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start condition, the steps and the reward are labelled Reported. Push Square and PC Gamer confirm the name and the order. No source gives a playtime.",
      "PowerPyx's button prompts are shown as icons, which we can't read as text, so we leave the button names out. The objective list hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 5?",
        answer: "It is the fifth mission of Chapter 3 in Push Square's and PC Gamer's lists (Confirmed). Push Square makes it the 40th overall and PowerPyx the 47th using its own count (Reported).",
      },
      {
        question: "Why can't I start Chapter 3 Mission 5?",
        answer: "PowerPyx says it needs Chapter 3 Mission 2 done and that you go to a set place, which is in the blurred section. Its full walkthrough index also suggests doing other quests or trying sleeping if a quest doesn't appear (Reported).",
      },
      {
        question: "Is there a reward for Chapter 3 Mission 5?",
        answer: "No. PowerPyx lists the reward as \"None\" (Reported).",
      },
      {
        question: "Are there any choices in Chapter 3 Mission 5?",
        answer: "PowerPyx's walkthrough lists no decisions or optional objectives (Reported).",
      },
      {
        question: "Can I play Chapter 3 Missions 4 and 5 in either order?",
        answer: "PowerPyx lists the same requirement for both and puts Mission 4 first in its own order. We have not confirmed in the game whether Mission 5 can be played first (Reported).",
      },
    ],
    sources: [
      pp("gta-6-mami-knows-best-catch-up-with-mia-walkthrough", "Requirement, playable lead, start, objectives, steps and reward"),
      pp("gta-6-full-walkthrough-all-missions", "PowerPyx's own mission order, its advice when a quest doesn't appear and the no-replay note"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T11:12:50+10:00",
  },
  {
    slug: "chapter-3-mission-6",
    hidden: true,
    chapter: 3,
    chapterOrder: 6,
    order: 41,
    name: "Chapter 3, Mission 6",
    seoTitle: "GTA 6 Chapter 3 Mission 6 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 6 walkthrough: how to make it appear, every step in order, tips for the tricky moments, and when the payout arrives.",
    teaser: "The sixth mission of Chapter 3, which can take a while to appear and pays out late.",
    intro: [
      "This is the sixth mission of Chapter 3 and the 41st overall in Push Square's list. Push Square and PC Gamer both list it sixth in Chapter 3 (Confirmed), but the overall number is Reported. PowerPyx says the call that unlocks it can take many in-game days, lists eleven objectives, and says the cash reward arrives long after the mission ends.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the sixth mission of the chapter in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "41st overall (Push Square and Press Start). PowerPyx calls it the 73rd main mission using its own count.", status: "reported" },
      { label: "Order", value: "PowerPyx's own order places it later in Chapter 3 than Push Square and PC Gamer do. We follow Push Square and PC Gamer.", status: "reported" },
      { label: "Unlocks after", value: "Chapter 3, Mission 5 (PowerPyx's requirement line; Push Square and PC Gamer list it next)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says you get a call some time after the previous mission, which can take many in-game days. After that you go to a set place. Where is in the blur.", status: "reported" },
      { label: "Playable as", value: "One lead only (PowerPyx). Which one is in the blur.", status: "reported" },
      { label: "Objectives", value: "Eleven (PowerPyx)", status: "reported" },
      { label: "Reward", value: "PowerPyx lists $2,000, paid many in-game days after the mission ends", status: "reported" },
      { label: "Choices", value: "PowerPyx's walkthrough lists no decisions and no optional objectives", status: "reported" },
    ],
    objectives: [
      "Go to the house. After you inspect the note on the door at Mia's office in Hamlet, Mia wants Lucia to meet her at the house again. Drive over there from the office (Reported, PowerPyx).",
      "Find Mia. Head inside the house to look for her, then head back outside when you have looked around (Reported, PowerPyx).",
      "Follow the car. After Mia is taken away, get in Mia's car quickly, because your own car has been moved, and follow the other car. Keep behind it but don't get too close. The arrow above the car fills yellow if they start to spot you, so stay far enough back that it stays white (Reported, PowerPyx).",
      "Search the building. The car pulls into a back alley that is blocked by a van. Get out and go on foot through the door on the south side of the alley, where the objective area is (Reported, PowerPyx).",
      "Get in the car. After Mia manages to talk down the gang members, get in the driver's seat of the car the others jump into (Reported, PowerPyx).",
      "Drive to the properties. Mia directs you to some properties to show the gang leader. Drive them to the first, the second and the final location, and be careful with the car (Reported, PowerPyx).",
      "Follow Mia. Follow her into the last house as she shows it off. You need to wait while she goes through all of the rooms and then out into the backyard (Reported, PowerPyx).",
      "Protect Mia and find Viper. After the house is shown, Viper comes back with other gang members and a gun fight starts. Deal with the M7 members in the back yard first, then the rest at the front. PowerPyx says you don't have your normal weapons here, only the pistol you start with, so watch for weapons you can pick up from defeated enemies (Reported, PowerPyx).",
      "Get back to Mia. After the enemies outside are dealt with, quickly go back into the house, where Viper has taken Mia hostage. While they are talking, you can quickly pull out your pistol and shoot Viper. A scene then completes the mission (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called South Leonida Real Estate in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Lucia has a run-in with M7 (Confirmed). PowerPyx shows the map label Meet Mia, says only Lucia can start it, lists Chapter 3, Mission 5 (Mami Knows Best) as the requirement, and starts it in Hamlet, Mariana County (Reported, PowerPyx). PowerPyx's quest description: Mia has been kidnapped by M7, and while trying to save her, Lucia is captured too. About to be executed, Mia offers to help find Terro, an M7 boss, a new headquarters in a better location for their criminal activities. Terro finds a house he likes, but Viper, his lieutenant, attempts to take over the gang. Lucia helps Terro defeat Viper. Mia and Lucia are freed by M7 and paid a generous commission (Reported, PowerPyx). The $2,000 reward comes from Mia. PowerPyx says it takes a very long time to be sent to you, but that you receive it eventually, after many in-game days (Reported, PowerPyx). PowerPyx's own order places this mission just before the final mission of Chapter 3, while Push Square and PC Gamer list it sixth (Reported).",
    tips: [
      { text: "Be patient if it doesn't appear. PowerPyx says the call that unlocks it can take many in-game days but should appear during Chapter 3 (Reported). Carrying on with other missions and activities in the meantime is our own suggestion.", reported: true },
      { text: "Keep your distance during the first following section. PowerPyx says a marker fills yellow if you are being spotted, so drop back until it is white again (Reported).", reported: true },
      { text: "Take it easy with the car when you have passengers. PowerPyx advises being careful with the car (Reported).", reported: true },
      { text: "You may be short of weapons. PowerPyx says you don't have your normal weapons at one point and start with only a pistol, so pick up what enemies drop (Reported).", reported: true },
      { text: "Be ready for a quick pistol draw at the very end (Reported, PowerPyx). Details are in the blur.", reported: true },
      { text: "Don't panic about the payout. PowerPyx says the money takes a very long time to arrive but does come (Reported).", reported: true },
      { text: "Make a manual save before you start. PowerPyx says GTA VI has no mission replay and suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square and PC Gamer both list this sixth in Chapter 3. The overall number follows Push Square and Press Start. PowerPyx calls it the 73rd main mission using its own count and its walkthrough index lists it near the end of the chapter, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start condition, the steps, the reward and its timing are labelled Reported. Push Square and PC Gamer confirm the name and the order. No source gives a playtime.",
      "PowerPyx's objective list has eleven entries and the walkthrough text folds some together. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 6?",
        answer: "It is the sixth mission of Chapter 3 in Push Square's and PC Gamer's lists (Confirmed). Push Square makes it the 41st overall and PowerPyx the 73rd using its own count (Reported).",
      },
      {
        question: "Why can't I start Chapter 3 Mission 6?",
        answer: "PowerPyx says it needs Chapter 3 Mission 5 done, then a call that can take many in-game days. Where to go after the call is in the blurred section (Reported).",
      },
      {
        question: "I finished Chapter 3 Mission 6 but got no money. Is that a bug?",
        answer: "PowerPyx says the payout arrives many in-game days later, so keep playing and it should come through (Reported).",
      },
      {
        question: "Can I use my own weapons in Chapter 3 Mission 6?",
        answer: "PowerPyx says you don't have your normal weapons at one point and start with only a pistol, so you pick up weapons from enemies (Reported).",
      },
      {
        question: "Are there any choices in Chapter 3 Mission 6?",
        answer: "PowerPyx's walkthrough lists no decisions or optional objectives (Reported).",
      },
    ],
    sources: [
      pp("gta-6-south-leonida-real-estate-meet-mia-walkthrough", "Requirement, playable lead, start, timing, objectives, steps and the delayed reward"),
      pp("gta-6-full-walkthrough-all-missions", "PowerPyx's own mission order and the no-replay note"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T12:07:48+10:00",
  },
  {
    slug: "chapter-3-mission-8",
    hidden: true,
    chapter: 3,
    chapterOrder: 8,
    order: 43,
    name: "Chapter 3, Mission 8",
    seoTitle: "GTA 6 Chapter 3 Mission 8 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 8 walkthrough: how to start it, both ways to find your lead, every step in order, tips for the tricky moments and what it unlocks.",
    teaser: "The eighth mission of Chapter 3, with two ways to find your lead and no cash reward.",
    intro: [
      "This is the eighth mission of Chapter 3 and the 43rd overall in Push Square's list. Push Square and PC Gamer both list it eighth in Chapter 3 (Confirmed), but the overall number is Reported. PowerPyx lists six objectives, says one lead can start it, and lists no cash reward. There are two ways to find your lead: one costs a small amount of cash and the other costs a little searching.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the eighth mission of the chapter in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "43rd overall (Push Square and Press Start). PowerPyx calls it the 48th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names the first part of Chapter 3, Mission 4. Push Square and PC Gamer list it after Mission 7.", status: "reported" },
      { label: "Starts", value: "PowerPyx says you go back to a contact at a set place in the city and talk to them. Who and where are in the blur.", status: "reported" },
      { label: "Playable as", value: "One lead only (PowerPyx). Which one is in the blur.", status: "reported" },
      { label: "Objectives", value: "Six (PowerPyx)", status: "reported" },
      { label: "Finding your lead", value: "Two ways, per PowerPyx: pay $20 if you have cash on you, or search instead. Both lead to the same place.", status: "reported" },
      { label: "Reward", value: "PowerPyx lists no cash. It lists the quest giver unlocking as a place to sell goods.", status: "reported" },
      { label: "What opens next", value: "PowerPyx says a Chapter 3 side job opens straight after this mission. Our side job guide covers it, and outlets disagree on whether it is a numbered mission.", status: "reported" },
    ],
    objectives: [
      "Get the job. As Jason, head back and talk to Tyrone at the apartment complex in La Perle (Reported, PowerPyx).",
      "Go to Charles' apartment. Tyrone wants Charles found, and Charles has an apartment in Rockridge (Reported, PowerPyx).",
      "Find out where Charles is. Either bribe the man standing by the doorway $20 for information, if you have cash on you, or break into the empty apartment and inspect the Aline's Thrift Store receipt in the bedroom. That prompts Jason to ask Tyrone, who gives an address (Reported, PowerPyx).",
      "Go to the camp in La Perle. Whichever way you got the information, head to the homeless camp on the north-western edge of La Perle. When you reach the building, break open the door on the lower floor to get in (Reported, PowerPyx).",
      "Chase after Charles. He runs when he spots you, so chase him up the stairs on the far side to the upper levels. If vagrants attack on the way up, you can knock them out in melee and don't need to shoot (Reported, PowerPyx).",
      "Approach Charles. He stops at the wall on the top level. Follow him over (Reported, PowerPyx).",
      "Search Charles' body. After Charles jumps off, take the stairs back down to ground level and search him. You get a bag of Kitty Litter, which completes the mission (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Here, Kitty Kitty in our mission list, Push Square's list and PC Gamer, with the map label Speak with Tyrone on PowerPyx. PC Gamer's one-line summary is that Jason looks for Charles (Confirmed for the name and position). PowerPyx's description is that Jason tracks down Charles but finds him strung out on Kitty Litter, and that Jason is the only one who can start it. It lists the first part of Chapter 3, Mission 4 (Dubious Provenance) as the requirement and the start as Tyrone's apartment complex in La Perle (Reported). Push Square and PC Gamer put a mission named Tyrone at Chapter 3 #7 before this one, and PowerPyx's lab-locations page says you meet Tyrone in a main mission called Tyrone before this one. We haven't found a main-outlet walkthrough of that mission yet (Reported). What comes next: PowerPyx's lab-locations page says the first lab you are prompted to destroy comes straight after this mission. Push Square lists Kitty Litter Labs at Chapter 3 #9, while PC Gamer has Car Services at #9 with no labs entry and PowerPyx files the labs as a side questline. We cover them as a side job, not a numbered mission (Reported).",
    tips: [
      { text: "Carry a little cash. PowerPyx says one way to find your lead is a $20 payment, which only works if you have the money on you. The other way is free but takes a little longer (Reported).", reported: true },
      { text: "Pay attention to the route. PowerPyx says your target heads for the far side of the building, so don't lose time on the nearer way (Reported). Details are in the blur.", reported: true },
      { text: "You don't need guns. PowerPyx says anyone who attacks you on the way can be knocked out in melee, so there's no need to start a shootout (Reported). Keeping quiet to avoid extra attention is our own suggestion.", reported: true },
      { text: "Keep going until the mission says it's done. PowerPyx says there's one more thing to do after the main action (Reported). Details are in the blur.", reported: true },
      { text: "Know what comes next. PowerPyx says a side job opens straight after this mission (Reported). Our guide covers where its sites are and what each pays, and it's kept out of the numbered mission chain.", reported: true, link: { href: "/guides/chapter-3-side-job-locations", label: "Chapter 3 side job locations and pay" } },
      { text: "Make a manual save before you start. PowerPyx says GTA VI has no mission replay and suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square and PC Gamer both list this eighth in Chapter 3. The overall number follows Push Square and Press Start. PowerPyx calls it the 48th main mission using its own count, so treat the overall number as Reported.",
      "PowerPyx's requirement line is earlier in Chapter 3 than the missions listed before this one by Push Square and PC Gamer, so the order you meet them in may vary. We haven't tested it.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, both routes, the steps and the reward are labelled Reported. Push Square and PC Gamer confirm the name and the order. No source gives a playtime.",
      "PowerPyx's objective list has six entries and the walkthrough text folds some together. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 8?",
        answer: "It is the eighth mission of Chapter 3 in Push Square's and PC Gamer's lists (Confirmed). Push Square makes it the 43rd overall and PowerPyx the 48th using its own count (Reported).",
      },
      {
        question: "How do I start Chapter 3 Mission 8?",
        answer: "PowerPyx says you go back and speak to a contact at a set place in the city, and that it needs the first part of Chapter 3 Mission 4 done. Who and where are in the blurred section (Reported).",
      },
      {
        question: "Do I have to pay to find the lead in Chapter 3 Mission 8?",
        answer: "No. PowerPyx says you can pay $20 for the information or search an empty apartment for a clue instead. Both lead to the same place (Reported).",
      },
      {
        question: "Should I shoot the people who attack me in Chapter 3 Mission 8?",
        answer: "You don't have to. PowerPyx says melee is enough to knock them out (Reported).",
      },
      {
        question: "Does Chapter 3 Mission 8 give a cash reward?",
        answer: "PowerPyx lists no cash reward. It lists the quest giver unlocking as a place to sell goods instead (Reported).",
      },
      {
        question: "The action is over but Chapter 3 Mission 8 hasn't ended. What now?",
        answer: "PowerPyx says there's one more step on the ground afterwards, which completes the mission. It's in the blurred section (Reported).",
      },
    ],
    sources: [
      pp("gta-6-here-kitty-kitty-speak-with-tyrone-walkthrough", "Requirement, playable lead, start, both routes to the lead, objectives, steps and the reward"),
      pp("gta-6-all-kitty-litter-lab-locations", "That the first lab you are prompted to destroy comes straight after this mission"),
      pp("gta-6-full-walkthrough-all-missions", "The no-replay note and that PowerPyx files the labs as a side questline"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T13:15:47+10:00",
  },
  {
    slug: "chapter-3-mission-10",
    hidden: true,
    chapter: 3,
    chapterOrder: 10,
    order: 45,
    name: "Chapter 3, Mission 10",
    seoTitle: "GTA 6 Chapter 3 Mission 10 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 10 walkthrough: how to start it, optional gear, losing the police, every objective in order and what the mission pays.",
    teaser: "The tenth mission of Chapter 3, a short job with optional gear near the start and a cash payout.",
    intro: [
      "This is the tenth mission of Chapter 3 and the 45th overall in Push Square's list. Push Square and PC Gamer both list it in Chapter 3 under almost the same name, but their numbering differs by one (10th in Push Square, 9th in PC Gamer), so the number is Reported. PowerPyx lists four objectives, says one lead can start it, and lists $3,000, a vehicle drop-off and some cleared wanted areas as the reward. It starts with a text message about a day after an earlier Chapter 3 mission, and PowerPyx says there is optional gear to pick up near the start.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "45th overall and 10th in the chapter (Push Square and Press Start). PC Gamer numbers it 9th in the chapter. PowerPyx calls it the 54th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 3. Push Square and PC Gamer list other missions between the two.", status: "reported" },
      { label: "Starts", value: "PowerPyx says a text message from a blocked number arrives around a day after the requirement. Where it sends you is in the blur.", status: "reported" },
      { label: "Playable as", value: "One lead only (PowerPyx). Which one is in the blur.", status: "reported" },
      { label: "Objectives", value: "Four (PowerPyx)", status: "reported" },
      { label: "Reward", value: "$3,000 (PowerPyx). PowerPyx also lists a vehicle drop-off and some cleared wanted areas, covered in the blur.", status: "reported" },
      { label: "Vehicle buyer", value: "The sources disagree on which mission opens it. The three outlets' versions are in the blur.", status: "reported" },
    ],
    objectives: [
      "Get the text and go to the marker. About a day after Meet the Heders (Chapter 3, Mission 3), Raul messages Lucia from a blocked number asking her to steal another car. Go to the marked place in Salton, in southern Vice City. When you arrive, your contact says they left items in the trunk of a nearby car, notably Flash Grenades and a silenced Klose K17 pistol. You can use them or not (Reported, PowerPyx).",
      "Search the chop shop for the Schafter V12. An easy way in is to climb the white van on the north side and walk along the metal roofing around the edge of the area. The gang members start shooting once they notice you, or if you shoot one and the others notice. From the roofing you can see two of them loading items into the van in the middle and a guard on the left and right by the gates (Reported, PowerPyx).",
      "Mind the dog. There is typically a dog by one of the gate guards. PowerPyx says to avoid shooting dogs unless they are actively attacking you, because it gives a very negative criminal bonus. If you start shooting the gang, more of them are likely to pull up at one of the gates and run in (Reported, PowerPyx).",
      "Steal the Schafter V12. It is in the centre of the covered areas, beside the small room (Reported, PowerPyx).",
      "Escape the area. Get in the car and leave quickly before the police show up. If they spot you, you need to lose them before you can progress (Reported, PowerPyx).",
      "Deliver the car to Leonida Auto World. It is in the very north-west corner of the city. When you enter the parking lot the game cuts to a scene that completes the mission (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Car Service in our mission list and Push Square's list. PC Gamer calls it Car Services, numbers it 9th in Chapter 3 because its list has no entry between Mission 8 and this one, and summarises it as Lucia doing another grand theft auto (Confirmed for the name and chapter). PowerPyx shows the map label Steal The Car for Raul and describes it as Raul having another test before he will meet Jason and Lucia, asking Lucia to take a car from a gang front chop shop in Salton and deliver it to auto dealer Randy Kozlov in Balsero, who says he is a high-end vehicle fence and will work for them. PowerPyx says only Lucia can start it, lists Chapter 3, Mission 3 (Meet the Heders) as the requirement, and gives its own count as the 54th main mission (Reported). The wanted areas PowerPyx says are cleared are in Port Gellhorn and Key Lento (Reported). When the vehicle buyer opens, as reported: PowerPyx says Randy is unlocked as a vehicle drop-off at the end of this mission and takes vehicles with Standard Trackers or items from his request list. PC Gamer's fence-locations table lists Randy (high-end vehicles, Balsero) as unlocking in Steal The Zorrusso for Randy, a later Chapter 3 mission. GameSpot says Randy is met further in the story, deals in much higher-end cars, gives you the ability to clone keys and gives you a list of over a dozen cars to steal, without naming a mission. We can't settle which is right. Check your map's buyer list after the mission (Reported).",
    tips: [
      { text: "Pick up the free gear. PowerPyx says some items are left in a car trunk near the start, and that a silenced weapon helps you stay in stealth longer if you don't have one yet (Reported).", reported: true },
      { text: "Look for a way in from above. PowerPyx calls climbing onto the roofing around the edge an easy way in (Reported). Details are in the blur.", reported: true },
      { text: "Watch the animals. PowerPyx warns that shooting a dog that isn't attacking you gives a very negative criminal bonus (Reported).", reported: true },
      { text: "Expect backup if it gets loud. PowerPyx says more gang members are likely to arrive if you start shooting (Reported).", reported: true },
      { text: "Lose the police before you move on. PowerPyx says that if they spot you, you need to lose them before you can progress (Reported). Our wanted system guide has ways to shake them.", reported: true, link: { href: "/guides/wanted", label: "Wanted system" } },
      { text: "Make a manual save before you start. PowerPyx says GTA VI has no mission replay and suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square and PC Gamer both list this in Chapter 3, but PC Gamer's list has one fewer entry before it, so it numbers this 9th and Push Square 10th. The overall number follows Push Square and Press Start. PowerPyx calls it the 54th main mission using its own count.",
      "Mission 9 in Push Square's list is covered as a side job and isn't part of this chain, so Next from Mission 8 comes straight here.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the $3,000, the vehicle drop-off and the cleared wanted areas are labelled Reported. Push Square and PC Gamer confirm the name and chapter. No source gives a playtime.",
      "PowerPyx's objective list has four entries and the walkthrough text folds some together. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 10?",
        answer: "Push Square lists it 10th in Chapter 3 and 45th overall, while PC Gamer numbers it 9th in the chapter because its list has one fewer entry before it (Reported). PowerPyx calls it the 54th main mission using its own count.",
      },
      {
        question: "How do I start Chapter 3 Mission 10?",
        answer: "PowerPyx says a text message from a blocked number arrives around a day after Chapter 3 Mission 3, and you then go to a marked place. Where is in the blurred section (Reported).",
      },
      {
        question: "Do I have to fight in Chapter 3 Mission 10?",
        answer: "PowerPyx says the gang opens fire once they notice you or see you shoot one of them, and that optional gear left near the start helps you stay in stealth longer (Reported).",
      },
      {
        question: "Why can't I progress after taking the car?",
        answer: "PowerPyx says that if the police spot you, you need to lose them before you can progress (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 10 pay?",
        answer: "PowerPyx lists $3,000 (Reported).",
      },
      {
        question: "Does Chapter 3 Mission 10 open a vehicle buyer?",
        answer: "Outlets disagree. PowerPyx says it does, PC Gamer's fence table ties the buyer to a later Chapter 3 mission, and GameSpot only says you meet the buyer further in the story. The detail is in the blurred section (Reported).",
      },
    ],
    sources: [
      pp("gta-6-car-service-steal-the-car-for-raul-walkthrough", "Requirement, playable lead, start, optional gear, objectives, steps and the reward"),
      pp("gta-6-full-walkthrough-all-missions", "The no-replay note"),
      PCGAMER,
      {
        id: "pcgamer",
        label: "PC Gamer: GTA 6 fence locations",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-fence-locations/",
        used: "Which mission PC Gamer says opens the vehicle buyer",
      },
      {
        id: "gamespot",
        label: "GameSpot: Best ways to make money fast in GTA 6",
        url: "https://www.gamespot.com/articles/best-ways-to-make-money-fast-in-gta-6/",
        used: "When GameSpot says the vehicle buyer is met and what he offers",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T14:12:41+10:00",
  },
  {
    slug: "chapter-3-mission-11",
    hidden: true,
    chapter: 3,
    chapterOrder: 11,
    order: 46,
    name: "Chapter 3, Mission 11",
    seoTitle: "GTA 6 Chapter 3 Mission 11 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 11 walkthrough: how to start it, every objective in order, how to get past the one blocker without a fight, and what it pays.",
    teaser: "The eleventh mission of Chapter 3, a long string of short steps with no reward.",
    intro: [
      "This is the eleventh mission of Chapter 3 and the 46th overall in Push Square's list. Push Square and PC Gamer both list it in Chapter 3 under the same name, but their numbering differs by one (11th in Push Square, 10th in PC Gamer), so the number is Reported. PowerPyx lists fourteen objectives, says either lead can start it, and lists no reward. It is a long run of short steps rather than a combat job: PowerPyx's walkthrough has one melee knockout and mentions no gunfights, and control passes between the two leads at points.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, in both Push Square's and PC Gamer's lists", status: "confirmed" },
      { label: "Number", value: "46th overall and 11th in the chapter (Push Square and Press Start). PC Gamer numbers it 10th in the chapter. PowerPyx calls it the 56th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "Chapter 3, Mission 10 (PowerPyx's requirement line; Push Square and PC Gamer list it next)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says you are invited to meet a contact at a set place after the previous mission. Who and where are in the blur.", status: "reported" },
      { label: "Playable as", value: "Either lead can start it (PowerPyx), and control switches between them. Details are in the blur.", status: "reported" },
      { label: "Objectives", value: "Fourteen (PowerPyx)", status: "reported" },
      { label: "Reward", value: "None (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Go backstage. You are taken into the club automatically, then need to go backstage to meet Dre'Quan. It is down the hallway to the right of the stairs you have used in previous missions (Reported, PowerPyx).",
      "Find the Dimez. After the backstage scene you leave as Lucia. Walk to the front door and speak to the host, who says they were kicked outside (Reported, PowerPyx).",
      "Go to the Dimez in the parking lot. Bae-Luxe and Roxy are arguing there (Reported, PowerPyx).",
      "Follow Roxy. After Roxy drives off, jump in the nearby car with everyone else and follow her (Reported, PowerPyx).",
      "Go to Peewees. After a while a train stops you, and Dre'Quan wants to stop at a nearby restaurant instead of going after her (Reported, PowerPyx).",
      "Order from the clerk. Inside Peewees, go to the clerk and order food for the group (Reported, PowerPyx).",
      "Get in Bae-Luxe's car. After Dre'Quan and Bae-Luxe finish talking, they decide to find Roxy. Head back outside to Bae-Luxe's car (Reported, PowerPyx).",
      "Go to the house party. PowerPyx puts it south, near VCIA (Reported, PowerPyx).",
      "Find Roxy. They send Lucia in by herself. Go round to the back door. The woman standing against the door you need, Jacki, won't move out of the way (Reported, PowerPyx).",
      "Lure Jacki away from the door. Go to the kitchen on the opposite side of the house, where her dog is pawing at a door. Interact with the door to let the dog out into the yard (Reported, PowerPyx).",
      "Go to Roxy. Go back to the other door and enter. Roxy is talking to someone (Reported, PowerPyx).",
      "Deal with Kamal. After he stands up, melee him to knock him out, which helps convince Roxy to leave (Reported, PowerPyx).",
      "Cut the power. You switch to Jason outside, where Dre'Quan says to cut the power to the house. Open the green power box on the corner of the sidewalk, look at its left side and use the on-screen prompt to turn the power off (Reported, PowerPyx).",
      "Follow Roxy. You switch back to Lucia. Follow Roxy out of the house to finish the mission (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Top Billing in our mission list, Push Square's list and PC Gamer, whose one-line summary is that Jason, Lucia and Dre'Quan see a concert (Confirmed for the name and chapter). PowerPyx shows the map label Watch the Real Dimez and describes Dre'Quan inviting Jason and Lucia to see his artists Roxy and Bae-Luxe, the Real Dimez, headline at the Jack of Hearts, where the rival rapper DWNPLY hijacks the set. Roxy runs off in anger to a house party, where the group finds her and they reconcile. PowerPyx says either Lucia or Jason can start it, lists Chapter 3, Mission 10 (Car Service) as the requirement and the Jack of Hearts in Crosstown as the start, and gives its own count as the 56th main mission (Reported). Spelling: PowerPyx writes the name Kamal in its step text and Kaamal in its objective list. We use Kamal, the spelling it uses most (Reported).",
    tips: [
      { text: "Talk before you wander. PowerPyx says the first person you need to speak to is at the front door, so you don't need to search the whole building (Reported).", reported: true },
      { text: "Look for a non-violent fix. PowerPyx says one blocker is solved with something elsewhere in the same building, not a fight (Reported). Details are in the blur.", reported: true },
      { text: "Melee is enough. PowerPyx's walkthrough handles its one confrontation with a melee knockout and mentions no weapons (Reported).", reported: true },
      { text: "Watch for the character switch. PowerPyx says control changes to the other lead for one objective and then back (Reported). If you're unsure what to do after the switch, check the objective on screen.", reported: true },
      { text: "Make a manual save before you start. PowerPyx says GTA VI has no mission replay and suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square and PC Gamer both list this straight after Chapter 3 Mission 10, but PC Gamer's list has one fewer entry before them, so it numbers this 10th and Push Square 11th. The overall number follows Push Square and Press Start. PowerPyx calls it the 56th main mission using its own count.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps and the no-reward line are labelled Reported. Push Square and PC Gamer confirm the name and chapter. No source gives a playtime.",
      "PowerPyx's objective list has fourteen entries. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 11?",
        answer: "Push Square lists it 11th in Chapter 3 and 46th overall, while PC Gamer numbers it 10th in the chapter because its list has one fewer entry before it (Reported). PowerPyx calls it the 56th main mission using its own count.",
      },
      {
        question: "How do I start Chapter 3 Mission 11?",
        answer: "PowerPyx says you are invited to meet a contact after finishing Chapter 3 Mission 10. Where is in the blurred section (Reported).",
      },
      {
        question: "Does Chapter 3 Mission 11 have any combat?",
        answer: "PowerPyx's walkthrough has one melee knockout and mentions no gunfights (Reported).",
      },
      {
        question: "I'm stuck behind someone who won't move. What do I do?",
        answer: "PowerPyx says you need to distract them with something in another room. The exact step is in the blurred section (Reported).",
      },
      {
        question: "Does Chapter 3 Mission 11 pay anything?",
        answer: "PowerPyx lists no reward for it (Reported).",
      },
    ],
    sources: [
      pp("gta-6-top-billing-watch-the-real-dimez-walkthrough", "Requirement, playable lead, start, objectives, steps and the no-reward line"),
      pp("gta-6-full-walkthrough-all-missions", "The no-replay note"),
      PCGAMER,
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, Push Square",
    updated: "2026-11-20T14:12:41+10:00",
  },
  {
    slug: "chapter-3-mission-12",
    hidden: true,
    chapter: 3,
    chapterOrder: 12,
    order: 47,
    name: "Chapter 3, Mission 12",
    seoTitle: "GTA 6 Chapter 3 Mission 12 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 12 walkthrough: how to start it, each objective in order, tips for the chase, and the new way to sell stolen goods it opens.",
    teaser: "The twelfth mission of Chapter 3, a mostly driving job that opens a new buyer for stolen goods.",
    intro: [
      "This is the twelfth mission of Chapter 3 and the 47th overall in Push Square's list. Push Square and our hub number it 12th in Chapter 3, while PC Gamer and GameSpot number it 11th because their lists have one fewer entry earlier in the chapter, so the number is Reported. PowerPyx lists eight objectives, says one lead can start it, and lists no cash reward. PowerPyx and PC Gamer's fence table both say it unlocks a new buyer for stolen goods (Confirmed). It is mostly a driving job, with a chase partway through.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, under the same name in Push Square's, PC Gamer's and GameSpot's lists", status: "confirmed" },
      { label: "Number", value: "47th overall and 12th in the chapter (Push Square and Press Start). PC Gamer and GameSpot number it 11th in the chapter. PowerPyx calls it the 51st main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names the first part of Chapter 3, Mission 4, and PowerPyx's own list puts it earlier in the chapter than Push Square's does. The marker may appear earlier than the number suggests. We follow Push Square's order.", status: "reported" },
      { label: "Starts", value: "PowerPyx says you go to a set place in the city and meet a contact there. Who and where are in the blur.", status: "reported" },
      { label: "Playable as", value: "One lead only (PowerPyx). Which one is in the blur.", status: "reported" },
      { label: "Objectives", value: "Eight (PowerPyx)", status: "reported" },
      { label: "Reward", value: "PowerPyx lists no cash", status: "reported" },
      { label: "New buyer", value: "A new buyer for stolen goods that pays on the spot. PowerPyx and PC Gamer's fence table both name this mission as the unlock. Who the buyer is is in the blur.", status: "confirmed" },
      { label: "Prices", value: "PowerPyx says this buyer pays more for jewelry and marked bills than the other drop-off locations. PC Gamer only says to check what each fence pays most for.", status: "reported" },
    ],
    objectives: [
      "Get in Boobie's car. To start it, go to the Jack of Hearts in Crosstown while playing as Jason and meet Boobie. He wants you to drive him round for some errands, so follow him outside the club and take the driver's seat of his car (Reported, PowerPyx).",
      "Go to the pick-up location. Head a few blocks south and wait for Boobie to finish talking to the people in the parking lot. A second pick-up is a short distance to the south-west. Pull up, press the horn button, then wait for Boobie to finish talking to the man on the stairs (Reported, PowerPyx).",
      "Go to the club. Drive south to the centre of the city and pull up at the side of the building near the river (Reported, PowerPyx).",
      "Retrieve the cash bag. After the scene inside, Jason automatically gets on a Seashark to chase the people who stole the bag out of the car. Chase them down the river and shoot them as you go if you like. PowerPyx says they eventually pull into a dead end and go in circles while shooting at you, which can make them easier to hit. When they are dealt with, drive over the bag and use the prompt to pick it up (Reported, PowerPyx).",
      "Return to Boobie. Drive back up the river and get off the Seashark next to Boobie (Reported, PowerPyx).",
      "Get in your car. Back on dry land, get into Boobie's car again (Reported, PowerPyx).",
      "Go to the smoke shop. Drive a short way across the river to the smoke shop Boobie points you to (Reported, PowerPyx).",
      "Enter the smoke shop. Go inside with Boobie. He introduces Jason to Yasmani, which completes the mission (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Boobie Time in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, with the map label Talk to Boobie on PowerPyx. PC Gamer's one-line summary is that Jason drives Boobie around (Confirmed for the name and chapter). PowerPyx describes Boobie collecting payments and needing Jason to drive him around town, then introducing Jason to Yasmani, a local Little Cuba businessman who buys stolen goods. It says only Jason can start it, lists the first part of Chapter 3, Mission 4 (Dubious Provenance) as the requirement and the Jack of Hearts in Crosstown as the start, and gives its own count as the 51st main mission. PowerPyx's own list places it before Meet the Heders (Reported). The new buyer is Yasmani, at his shop in Little Cuba. PowerPyx lists \"Yasmani unlocked as a Drop Off - Goods\" as the reward, and PC Gamer's fence table lists Yasmani's shop in Little Cuba as unlocking in this mission and as an immediate-sale fence (Confirmed). PC Gamer adds that after two of Yasmani's Payday Loan jobs you can leave stolen goods in one of your garages for pickup, for an extra fee (Reported).",
    tips: [
      { text: "Let the scenes finish. PowerPyx says to wait at each stop until the conversation ends, so don't drive off early (Reported). If the objective doesn't update, staying put a little longer is our own suggestion.", reported: true },
      { text: "Use the horn when asked. PowerPyx says one stop needs you to press the horn button before things move on (Reported).", reported: true },
      { text: "Be patient with the shooting in the chase. PowerPyx says the targets eventually circle in a dead end, which can make them easier to hit (Reported). Details are in the blur.", reported: true },
      { text: "Pick up what was taken. PowerPyx says you need to drive over the item and use the prompt (Reported).", reported: true },
      { text: "Think about what you sell where. PowerPyx says the new buyer pays more for jewelry and marked bills than the other drop-offs (Reported). Saving those goods for this buyer is our own suggestion. Our money guide covers other earners.", reported: true, link: { href: "/guides/money", label: "Making money" } },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square lists this 12th in Chapter 3 and our hub follows it. PC Gamer and GameSpot list it 11th, because neither list has the one entry Push Square has earlier in the chapter. The overall number follows Push Square and Press Start. PowerPyx calls it the 51st main mission using its own count and places it earlier than Push Square does, so treat the overall number as Reported.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the higher prices and the no-cash line are labelled Reported. The new buyer is Confirmed by PowerPyx and PC Gamer. No source gives a playtime.",
      "PowerPyx's objective list has eight entries and the walkthrough text folds some together. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 12?",
        answer: "Push Square lists it 12th in Chapter 3 and 47th overall, while PC Gamer and GameSpot number it 11th in the chapter because their lists have one fewer entry earlier (Reported). PowerPyx calls it the 51st main mission using its own count.",
      },
      {
        question: "How do I start Chapter 3 Mission 12?",
        answer: "PowerPyx says it needs the first part of Chapter 3 Mission 4 done, so the marker can show up earlier than you'd expect. Where to go is in the blurred section (Reported).",
      },
      {
        question: "Can I play Chapter 3 Mission 12 as either character?",
        answer: "No. PowerPyx says only one of the two leads can start it. Which one is in the blurred section (Reported).",
      },
      {
        question: "Does Chapter 3 Mission 12 pay any money?",
        answer: "PowerPyx lists no cash reward. PowerPyx and PC Gamer both say it unlocks a new buyer for stolen goods (Confirmed).",
      },
      {
        question: "What's the trick to the chase in Chapter 3 Mission 12?",
        answer: "PowerPyx says the targets eventually circle in a dead end, which can make them easier to hit (Reported).",
      },
    ],
    sources: [
      pp("gta-6-boobie-time-talk-to-boobie-walkthrough", "Requirement, playable lead, start, objectives, steps, reward and price note"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission"),
      {
        id: "pcgamer",
        label: "PC Gamer: GTA 6 fence locations",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-fence-locations/",
        used: "Which mission unlocks the new buyer, that it pays immediately, and the garage pickup",
      },
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T15:15:59+10:00",
  },
  {
    slug: "chapter-3-mission-13",
    hidden: true,
    chapter: 3,
    chapterOrder: 13,
    order: 48,
    name: "Chapter 3, Mission 13",
    seoTitle: "GTA 6 Chapter 3 Mission 13 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 13 walkthrough: how to start it, every objective in order, getting through the police chase, protecting your rating, and the payout.",
    teaser: "The thirteenth mission of Chapter 3, built around a police chase, with a $3,000 payout.",
    intro: [
      "This is the thirteenth mission of Chapter 3 and the 48th overall in Push Square's list. Push Square and our hub number it 13th in Chapter 3, while PC Gamer and GameSpot number it 12th because their lists have one fewer entry earlier in the chapter, so the number is Reported. PowerPyx lists eight objectives, says either lead can start it but you need both at the start, and lists $3,000 as the reward. It is built around a police chase where control switches between the two leads, and PowerPyx says how you shoot affects your criminal rating.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, under the same name in Push Square's, PC Gamer's and GameSpot's lists", status: "confirmed" },
      { label: "Number", value: "48th overall and 13th in the chapter (Push Square and Press Start). PC Gamer and GameSpot number it 12th in the chapter. PowerPyx calls it the 57th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 10. Push Square and PC Gamer list other missions between the two.", status: "reported" },
      { label: "Next in the lists", value: "PC Gamer and GameSpot list another mission straight after this one that Push Square's list and our hub don't include. Details are in the blur.", status: "reported" },
      { label: "Starts", value: "PowerPyx says a contact calls you to pick up a car and then meet them, and you go to a set place with both leads. Where is in the blur.", status: "reported" },
      { label: "Playable as", value: "Either lead can start it, but both are needed at the start, and you play both at different points (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Eight (PowerPyx)", status: "reported" },
      { label: "Reward", value: "$3,000 (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Open the garage. After Car Service, Raul contacts you to pick up a car and then meet him. Go to the location on Waxman Island with both Jason and Lucia. Use the panel on the wall and enter the code 2404 to open the garage (Reported, PowerPyx).",
      "Get in the car. You are switched to Lucia automatically. Get in the car and start driving to Raul (Reported, PowerPyx).",
      "Go to the meetup. Drive to the marked place on the south side of Ocean Beach. Raul gets in the car (Reported, PowerPyx).",
      "Hold off the cops. You switch to Jason, who has to fend off the police while Lucia drives. To keep a Professional or Hardened criminal rating, PowerPyx says to aim mainly for the tyres and engines to wreck the cars without injuring the cops. Shooting the driver also crashes the car, but you get a Violent rating if you do it often. After a while the car crashes and you need to stop the cops getting near it. Shoot any that get close in the legs to put them down and keep a Professional or Hardened rating. Watch Jason's health and use the inventory to heal if needed (Reported, PowerPyx).",
      "Drive on as Lucia. After a further chase, a scene plays where you stop, then you drive as Lucia. PowerPyx says to back up fully to the street first, then keep driving (Reported, PowerPyx).",
      "Drive to Rialto Islands. Raul says to go to Rialto Islands, the set of islands between the two sides of the city. Jason and Raul do the shooting, so focus on avoiding police cars in your path (Reported, PowerPyx).",
      "Go to the parking lot. After ramping off the partly open bridge, PowerPyx says you lose the cops, and you can drive on to the marked parking lot (Reported, PowerPyx).",
      "Swap vehicles. Once in the lot, get out of the car quickly, then get in the nearby van (Reported, PowerPyx).",
      "Drive Raul to the drop-off. Drive to the marked drop-off in Bayside. When you arrive Raul leaves and the mission is complete (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called First Impressions in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, with the map label Meeting with Raul on PowerPyx. PC Gamer's one-line summary is that Jason and Lucia meet Raul (Confirmed for the name and chapter). PowerPyx describes Jason and Lucia finally meeting Raul in person. He gets into the car and reveals he has just robbed a Fleeca bank, Jason and Raul hold off the cops while Lucia drives, and when they escape, Raul reveals they were merely a decoy for a bigger heist his crew is performing on the other side of the city. He pays them and says he'll be in touch soon with more work. PowerPyx lists Chapter 3, Mission 10 (Car Service) as the requirement, a garage on Waxman Island in Vice Beach as the start, and gives its own count as the 57th main mission (Reported). Order: PC Gamer and GameSpot list Caught Slipping straight after this mission, while Push Square's list and our hub don't include it and go on to Crosstown Traffic. PowerPyx lists Crosstown Traffic straight after this mission and files Caught Slipping much later in the chapter, among the heist setup missions (Reported).",
    tips: [
      { text: "Aim for the vehicles, not the people. PowerPyx says shooting tyres and engines keeps your criminal rating cleaner, and that shooting drivers often pushes it towards Violent (Reported).", reported: true },
      { text: "Non-lethal shots count. When police on foot close in, PowerPyx suggests shooting them in the legs so you stop them without lowering your rating (Reported).", reported: true },
      { text: "Watch your health. PowerPyx says to keep an eye on health during the shooting section and heal from the inventory when you need to (Reported).", reported: true },
      { text: "When you drive, just drive. PowerPyx says your passengers do the shooting in the later driving stretch, so focus on avoiding police cars (Reported). Our wanted system guide covers shaking a pursuit.", reported: true, link: { href: "/guides/wanted", label: "Wanted system" } },
      { text: "Move fast at the final swap. PowerPyx says to get out of the car quickly at the last stop and switch vehicles (Reported).", reported: true },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square lists this 13th in Chapter 3 and our hub follows it. PC Gamer and GameSpot list it 12th, because neither list has the one entry Push Square has earlier in the chapter. PC Gamer and GameSpot also list another mission straight after this one, which Push Square's list and our hub don't include, so the next entry in our chain is a different mission. The overall number follows Push Square and Press Start. PowerPyx calls it the 57th main mission using its own count.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the garage code, the rating advice and the $3,000 are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter. No source gives a playtime.",
      "\"Professional\", \"Hardened\" and \"Violent\" are PowerPyx's terms for the criminal rating. We have no main-outlet page explaining the rating system, so the page keeps to PowerPyx's advice.",
      "PowerPyx's objective list has eight entries and the walkthrough text folds some together. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 13?",
        answer: "Push Square lists it 13th in Chapter 3 and 48th overall, while PC Gamer and GameSpot number it 12th in the chapter because their lists have one fewer entry earlier (Reported). PowerPyx calls it the 57th main mission using its own count.",
      },
      {
        question: "How do I start Chapter 3 Mission 13?",
        answer: "PowerPyx says it needs Chapter 3 Mission 10 done, then a call from a contact, and both leads together at the start point. Where is in the blurred section (Reported).",
      },
      {
        question: "Does it matter how I shoot in Chapter 3 Mission 13?",
        answer: "PowerPyx says it does for your criminal rating: hitting tyres and engines keeps it cleaner than shooting drivers often (Reported).",
      },
      {
        question: "Which character do I play in Chapter 3 Mission 13?",
        answer: "Both. PowerPyx says control switches between the two leads during the mission (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 13 pay?",
        answer: "PowerPyx lists $3,000 (Reported).",
      },
    ],
    sources: [
      pp("gta-6-first-impressions-meeting-with-raul-walkthrough", "Requirement, playable leads, start, garage code, objectives, steps, rating advice and the reward"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places this mission and the one PC Gamer and GameSpot list after it"),
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T15:15:59+10:00",
  },
  {
    slug: "chapter-3-mission-14",
    hidden: true,
    chapter: 3,
    chapterOrder: 14,
    order: 49,
    name: "Chapter 3, Mission 14",
    seoTitle: "GTA 6 Chapter 3 Mission 14 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 14 walkthrough: how to start it, each objective in order, how the character swaps work, winning the final shootout, and what it pays.",
    teaser: "The fourteenth mission of Chapter 3, with several character swaps, a final shootout and a $3,000 payout.",
    intro: [
      "This is the fourteenth mission of Chapter 3 and the 49th overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 14th in Chapter 3 (Confirmed), but the overall number is Reported. PowerPyx lists seven objectives, says either lead can start it from their own start point, and lists $3,000 as the reward. Control swaps between the two leads several times, with a chase, a close-quarters fight and a final shootout, so it helps to know what each part asks of you.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 14th mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists", status: "confirmed" },
      { label: "Number", value: "49th overall (Push Square and Press Start). PowerPyx calls it the 58th main mission using its own count.", status: "reported" },
      { label: "Numbering note", value: "PC Gamer and GameSpot number the chapter differently earlier on, but the differences cancel out, so all three lists give 14th here. Details are in the blur.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 10. Push Square and PC Gamer list other missions between the two.", status: "reported" },
      { label: "Starts", value: "PowerPyx says each lead has a different start point, but going to either one starts the mission for both. Where they are is in the blur.", status: "reported" },
      { label: "Playable as", value: "Both leads, with control swapping several times (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Seven (PowerPyx)", status: "reported" },
      { label: "Reward", value: "$3,000 (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Follow the boat (Jason). After the opening scene you start as Jason on a bike following the boats. Keep to the dirt paths along the side of the river to keep up with them (Reported, PowerPyx).",
      "Go to the next station (Lucia). When Jason reaches the drop-off point you switch to Lucia, who misses her train. Sprint and follow it, running underneath the train tracks you can see on the minimap until you reach the stairs to the next station (Reported, PowerPyx).",
      "Get on the metro. Once you reach the station, go into the rear train (Reported, PowerPyx).",
      "Confront the Guardia Brother. Go to the front of the train car and hold the prompt to intimidate the gangster. Lucia pushes him to the ground, then you use the next prompts to pressure him and pull out his phone to make him do the call (Reported, PowerPyx).",
      "Hijack the boat (Jason). You switch to Jason and the gang members start shooting. Take out the two on the dock, then quickly hop on the nearby bike to chase the boats. Karim directs you to turn right at the bridge. You eventually hit a jump that launches you onto one of the boats. Shoot the gang members in the closer boat first, then the person shooting from the objective boat, and get close enough to jump across (Reported, PowerPyx).",
      "Fight on the train (Lucia). You switch back to Lucia and more gang members attack in the train. PowerPyx says to take them out with melee to continue (Reported, PowerPyx).",
      "Push the emergency stop button. Go to the back of the train and use the Stop button before it reaches the next station (Reported, PowerPyx).",
      "Defend the boat. Lucia jumps out to the boat and you defend it while Jason drives. Open the back seats to pick up one of two assault rifles and some body armor. PowerPyx says you have unlimited ammo in this section. Shoot the drivers of the Seasharks and boats behind you so they crash, then do the same to the Coast Guard. PowerPyx says shooting the helicopter's pilot through the front window makes it crash immediately. After a while Karim drops containers through a bridge, blocking the pursuers, and the mission is complete (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Crosstown Traffic in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, with the map label Meet Raul on PowerPyx. Push Square, PC Gamer and GameSpot confirm the name and chapter. PowerPyx describes Raul wanting to rob a valuable shipment belonging to the Guardia Brothers from a convoy of boats on Vice River. Lucia tails a senior member of the gang and forces him to make a call giving Jason control of the boats, but he is rumbled. They chase and gain control of the boat with the shipment anyway, evading the Guardia Brothers and the Coast Guard and getting back to Raul. PowerPyx says either Lucia or Jason can start it, lists Chapter 3, Mission 10 (Car Service) as the requirement, and gives its own count as the 58th main mission. Lucia's start point is the Courtyard Bar in Stockyard, where she meets Raul. Jason's is the boatyard in La Perle, where he meets Karim (Reported). Order: PowerPyx's own list places it straight after First Impressions and before Credit Check, and files Caught Slipping much later in the chapter. PC Gamer and GameSpot list Caught Slipping between First Impressions and this mission, but their lists also lack the Kitty Litter Labs entry Push Square has earlier in the chapter, so those two differences cancel out and all of them number this mission 14th. Push Square's list and our hub don't include Caught Slipping at this point (Reported).",
    tips: [
      { text: "Stick to the paths in the opening chase. PowerPyx says following the dirt paths is how you keep up with what you are chasing (Reported). Details are in the blur.", reported: true },
      { text: "Grab the rifle and armor first in the final shootout. PowerPyx points to the back seats of the vehicle you are in for an assault rifle and body armor, with unlimited ammo for that section (Reported).", reported: true },
      { text: "Aim for whoever is at the controls. PowerPyx says taking out the driver of a chasing vehicle crashes it, and that shooting a pilot through the front window brings theirs down immediately (Reported).", reported: true },
      { text: "Use melee in the close-quarters fight. PowerPyx says taking the gang members out with melee lets you continue (Reported).", reported: true },
      { text: "Know how the swaps work. Our switching characters guide covers swapping between the two leads.", reported: false, link: { href: "/guides/switch-characters", label: "Switching characters" } },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 14th in Chapter 3, but PC Gamer and GameSpot reach that number differently: they lack one entry earlier in the chapter and add another mission just before this one, and the two differences cancel out. Our hub follows Push Square. The overall number follows Push Square and Press Start. PowerPyx calls it the 58th main mission using its own count.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start points, the steps, the weapons and the $3,000 are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter. No source gives a playtime.",
      "PowerPyx's objective list has seven entries and the walkthrough text folds some together. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 14?",
        answer: "Push Square, PC Gamer and GameSpot all list it 14th in Chapter 3 (Confirmed). Push Square makes it the 49th overall and PowerPyx the 58th using its own count (Reported).",
      },
      {
        question: "How do I start Chapter 3 Mission 14?",
        answer: "PowerPyx says it needs Chapter 3 Mission 10 done and that either lead's start point starts it for both. Where they are is in the blurred section (Reported).",
      },
      {
        question: "Which character do I play in Chapter 3 Mission 14?",
        answer: "Both. PowerPyx says control swaps between the two leads several times (Reported).",
      },
      {
        question: "Do I need my own weapons for the final shootout?",
        answer: "PowerPyx says rifles and body armor are in the vehicle for that section, and ammo is unlimited there (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 14 pay?",
        answer: "PowerPyx lists $3,000 (Reported).",
      },
    ],
    sources: [
      pp("gta-6-crosstown-traffic-meet-raul-walkthrough", "Requirement, playable leads, start points, objectives, steps, tips and the reward"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission, and the no-replay note"),
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T16:13:00+10:00",
  },
  {
    slug: "chapter-3-mission-15",
    hidden: true,
    chapter: 3,
    chapterOrder: 15,
    order: 50,
    name: "Chapter 3, Mission 15",
    seoTitle: "GTA 6 Chapter 3 Mission 15 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 15 walkthrough: how to start it, every objective in order, handling guards, a clean getaway, and what the mission unlocks.",
    teaser: "The fifteenth mission of Chapter 3, a long one with 25 objectives, a $6,000 payout and new robbery options.",
    intro: [
      "This is the fifteenth mission of Chapter 3 and the 50th overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 15th in Chapter 3 (Confirmed), but the overall number is Reported. PowerPyx lists 25 objectives, says it needs both leads together, and lists $6,000 plus new robbery options as the reward. After a short setup it is a run of three robberies back to back, then a getaway. PowerPyx and GameSpot's robbery guide agree on how to control guards and how to split up to escape (Confirmed).",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 15th mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists", status: "confirmed" },
      { label: "Number", value: "50th overall (Push Square and Press Start). PowerPyx calls it the 59th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "Chapter 3, Mission 14 (PowerPyx's requirement line; Push Square, PC Gamer and GameSpot list it next)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says a contact calls you to meet their crew, and you go to a set place in the city with both leads. Where is in the blur.", status: "reported" },
      { label: "Playable as", value: "Both leads together (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "25 (PowerPyx), most of them repeating for each of the three jobs", status: "reported" },
      { label: "Reward", value: "$6,000 (PowerPyx). PowerPyx also lists a new robbery tool and new robbery targets on the map, covered in the blur.", status: "reported" },
    ],
    objectives: [
      "Meet the crew. After the opening scene with Raul, go upstairs and talk to Andrea, then pick either of the two sets of masks on the table beside her (Reported, PowerPyx).",
      "Collect the jammer. Talk to Karim across the room and pick up the Dye Pack Jammer from the desk. If you aren't full, PowerPyx says you can also take some stick bombs from the desk to his right (Reported, PowerPyx).",
      "Head out. Leave the planning room. Felipe has a prepared car outside for the robberies (Reported, PowerPyx).",
      "First bank, Fleeca in Washington Beach: park outside and mask up. Karim cuts the alarm as you enter. Open your inventory, go to Items and equip the mask in the top slot (Reported, PowerPyx).",
      "First bank: control the guards. Threaten the guards first, because if you are slow they may draw and shoot. If they draw, PowerPyx says to melee them or shoot the gun from their hand for a Professional rating, or shoot their knees if you don't want to kill them (Reported, PowerPyx).",
      "First bank: loot and leave. Go behind the counters and empty the marked drawers. PowerPyx says there are 4 you need to loot to progress. Get back in the car and drive away from the area (Reported, PowerPyx).",
      "Second bank, Fleeca in Ocean Beach: avoid the search area. Karim marks the next bank. PowerPyx warns that depending on your direction there may be a police search area around the first bank, so avoid it. Park outside again (Reported, PowerPyx).",
      "Second bank: leave your partner at the wheel. You are prompted to use the partner prompt to tell your partner to wait in the driver's seat for a quick getaway. Go in with one character and put your mask on again if it came off (Reported, PowerPyx).",
      "Second bank: get into the back. This bank is much smaller and the money is behind the door to the back. Use the Snap Gun or just break it open, since Karim has turned the alarm off again (Reported, PowerPyx).",
      "Second bank: get the safe. Threaten the teller to ask for the code to the safe and take the money from the drawer and anything around the counter. Plant an explosive on the door, step away and blow it open. In the back, enter the teller's code on the small safe or plant an explosive on it (Reported, PowerPyx).",
      "Second bank: get out. Your partner pulls the car round with the passenger side facing you. Get in and leave the area (Reported, PowerPyx).",
      "Third bank, Fleeca in Ocean Beach (south): park for the escape. PowerPyx says you can stop on the sidewalk facing the road for better placement when escaping. Check your mask is on (Reported, PowerPyx).",
      "Third bank: switch if your bag is full. PowerPyx says you loot faster holding only one bag, so if the character you are playing has a full stash bag, switch to the other (Reported, PowerPyx).",
      "Third bank: threaten fast. This is the largest bank, with more guards who may draw quicker. PowerPyx says that if you are quick to threaten them they drop their guns after pulling them out. Otherwise shoot their hands or knees (Reported, PowerPyx).",
      "Third bank: drawers only. Jump behind the counter and empty all 4 cash drawers. The alarm goes off and security comes out the back shooting. Deal with them and get out. PowerPyx says to skip the safe here because police are already on their way (Reported, PowerPyx).",
      "Lose the cops. Use the partner prompt to split up, which PowerPyx says divides the police attention and makes escape easier (Reported, PowerPyx).",
      "Go home and answer the door. Head to the Bayside apartment to meet your partner. After a short time you are warped there automatically. After the short scene, answer the door to complete the mission (Reported, PowerPyx).",
      "A note on the objective list: PowerPyx's list includes \"Tell your partner to wait\" at the third bank too, but its step text for that bank doesn't mention it, so we don't know whether the prompt appears there (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Credit Check in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, with the map label Meet Raul's Crew on PowerPyx. Push Square, PC Gamer and GameSpot confirm the name and chapter. PowerPyx describes Raul inviting Jason and Lucia to his base of operations in Stockyard and introducing his crew: Felipe, the driver, Karim, the tech expert, and Andrea, who manages comms and disguises. Jason and Lucia are tasked with robbing a series of small banks to get some practice before a bigger job. PowerPyx lists Chapter 3, Mission 14 (Crosstown Traffic) as the requirement, the marked spot near the Vice Vinyl mod shop in Crosstown as the start (use the intercom on the wall), and gives its own count as the 59th main mission (Reported). What it unlocks: PowerPyx says this mission gives you the Dye Pack Jammer, which lets you steal Marked Bills from banks and Payday Loan locations, and marks Bank Jobs, Big Bank Jobs and Payday Loans as robbery targets (green robbery icons) on the map. GameSpot says the dye pack jammer is the only way to disable dye packs and that you don't get it until Chapter 3, without naming the mission, so the link to this mission is Reported (PowerPyx only). GameSpot also says marked bills must be sold to a fence before you can use them (Reported).",
    tips: [
      { text: "Deal with armed guards first. PowerPyx says to threaten the guards before anything else. GameSpot's robbery guide gives the same order and adds that you should keep threatening until they kneel and put the gun down, because they will shoot if you look away too early (Confirmed).", reported: false },
      { text: "Split up to escape. PowerPyx says splitting up divides police attention. GameSpot says the same for robberies in general, and adds that if one lead is caught, the other keeps their stash bags (Confirmed).", reported: false },
      { text: "Don't rely on a code list. GameSpot says safe codes are randomized, so a code you read online probably won't work (Reported). In this mission PowerPyx gets the code from the teller, or you can blow the safe open.", reported: true },
      { text: "Avoiding kills. PowerPyx says meleeing a guard or shooting the gun from their hand gets a Professional rating, and shooting their knees avoids killing them. \"Professional\" is PowerPyx's term (Reported).", reported: true },
      { text: "Park with the getaway in mind. PowerPyx suggests stopping on the sidewalk facing the road at the last bank, and GameSpot suggests parking close to the exit if you plan to go in loud (Reported).", reported: true },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter, which is worth it on a mission this long (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
      { text: "For escaping police after each job, see our wanted system guide.", reported: false, link: { href: "/guides/wanted", label: "Wanted system" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 15th in Chapter 3. The overall number follows Push Square and Press Start. PowerPyx calls it the 59th main mission using its own count.",
      "PowerPyx is the only full walkthrough for this mission, so the start, the steps, the masks, the 4-drawer rule, the teller code, the one-bag looting tip, the $6,000 and the map unlocks are labelled Reported. GameSpot's general robbery guide Confirms guard control and splitting up. Push Square, PC Gamer and GameSpot confirm the name and chapter. No source gives a playtime.",
      "We have left out secondary-only counts of banks and loan stores, and we don't print any safe codes, because GameSpot says they are randomized.",
      "PowerPyx's objective list has 25 entries. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 15?",
        answer: "Push Square, PC Gamer and GameSpot all list it 15th in Chapter 3 (Confirmed). Push Square makes it the 50th overall and PowerPyx the 59th using its own count (Reported).",
      },
      {
        question: "How do I start Chapter 3 Mission 15?",
        answer: "PowerPyx says it needs Chapter 3 Mission 14 done and both leads together at the start point. Where is in the blurred section (Reported).",
      },
      {
        question: "Which character do I play in Chapter 3 Mission 15?",
        answer: "Both. PowerPyx says you play with the two leads together and can switch to the other when your stash bag is full (Reported).",
      },
      {
        question: "Do I need to kill the guards?",
        answer: "PowerPyx lists threatening them first, then melee, shooting the gun from their hand or shooting their knees if they draw (Reported).",
      },
      {
        question: "Should I bother with the safe at the last target?",
        answer: "PowerPyx says to skip it, because the alarm is already going off and police are on the way (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 15 pay?",
        answer: "PowerPyx lists $6,000, plus new robbery options that are covered in the blurred section (Reported).",
      },
    ],
    sources: [
      pp("gta-6-credit-check-meet-rauls-crew-walkthrough", "Requirement, playable leads, start, objectives, steps, tips, reward and unlocks"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission, and the no-replay note"),
      {
        id: "gamespot",
        label: "GameSpot: GTA 6 safe codes and robberies guide",
        url: "https://www.gamespot.com/articles/gta-6-safe-codes-and-robberies-guide/",
        used: "Guard control, randomized safe codes, marked bills and fences, the dye pack jammer arriving in Chapter 3, splitting up and parking",
      },
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T16:13:00+10:00",
  },
  {
    slug: "chapter-3-mission-16",
    hidden: true,
    chapter: 3,
    chapterOrder: 16,
    order: 51,
    name: "Chapter 3, Mission 16",
    seoTitle: "GTA 6 Chapter 3 Mission 16 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 16 walkthrough: how to start it, each objective in order, keeping a tracked car quiet, the condition bonus, and what it unlocks.",
    teaser: "The sixteenth mission of Chapter 3, a car job with a position-reporting tracker, a $21,250 payout and a condition bonus.",
    intro: [
      "This is the sixteenth mission of Chapter 3 and the 51st overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 16th in Chapter 3 (Confirmed), but the overall number is Reported. PowerPyx lists five objectives, says either lead can start it, and lists $21,250 plus a $10,000 bonus for delivering the car in good condition. You break into a parked car with a new method and drive it to a buyer. PowerPyx, PC Gamer and GameSpot all say the car's tracker reports your position to the police if you drive too slowly (Confirmed).",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places, the new tool and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 16th mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists", status: "confirmed" },
      { label: "Number", value: "51st overall (Push Square). PowerPyx calls it the 60th main mission using its own count.", status: "reported" },
      { label: "Numbering note", value: "PC Gamer and GameSpot number the chapter differently earlier on, but the differences cancel out, so all three lists give 16th here. Details are in the blur.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 14. Push Square, PC Gamer and GameSpot list Mission 15 before it.", status: "reported" },
      { label: "Starts", value: "PowerPyx says a contact messages you after an earlier mission about a car at a set place. Where is in the blur.", status: "reported" },
      { label: "Playable as", value: "Either lead can start it (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Five (PowerPyx)", status: "reported" },
      { label: "Reward", value: "$21,250, plus a $10,000 bonus for delivering the car in good condition (PowerPyx). PowerPyx also lists a new tool, a new buyer and an optional questline, covered in the blur.", status: "reported" },
    ],
    objectives: [
      "Get into the car park. Go to Hathaway Apartments in Ocean Beach. PowerPyx says the car park is walled in and you can climb over the wall to enter. Once inside you call Randy (Reported, PowerPyx).",
      "Install the key cloner. Randy tells you about the Key Cloner and that the car has an advanced tracker. PowerPyx says to open your phone and choose the bottom option to install it, which installs it for both Jason and Lucia (Reported, PowerPyx).",
      "Find the Zorrusso. PowerPyx says it is on the ground level, on the east side of the car park (Reported, PowerPyx).",
      "Clone the key. Interact with the door, then again to use the Key Cloner. PowerPyx compares it to the slim jim: when the indicator turns pink, hold the stick in that direction to fill the bar. PC Gamer also describes using the control stick to find the sweet spot, so the stick-based minigame is Confirmed (PowerPyx, PC Gamer).",
      "Drive it to Randy. PowerPyx says a red icon above the minimap shows the advanced tracker, a bar around it fills if you drive too slowly, and a full bar pings your location to the police. PowerPyx also says the tracker is disabled, shown by the icon turning grey, once you are near Randy's showroom, then you drive round the lot and through the garage door. The slow-driving tracker is Confirmed (PowerPyx, PC Gamer, GameSpot); the showroom detail is Reported (PowerPyx).",
      "Follow Randy. Randy comments on the car's condition. PowerPyx says very good condition earns a bonus and otherwise he makes fun of you. You then follow him to a nearby board, where he explains a list of specific high-end cars he is looking for and will pay a lot for (Reported, PowerPyx).",
      "PowerPyx's objective wording is: Install the key cloner, Search the area for the Zorruso, Steal the Zorrusso, Drive the Zorrusso to Randy, Follow Randy. PowerPyx spells the car two ways in its own list (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Steal the Zorrusso for Randy in our mission list and Push Square's list. PC Gamer spells it Steal the Zorruso for Randy, GameSpot spells it Steal the Zorusso for Randy, and all three number it 16th in Chapter 3. PC Gamer's one-line summary is that Jason and Lucia steal a high-end car (Confirmed for the name and chapter, with the spelling differing). PowerPyx calls it Clonin' Keys, Makin' Gs on its page title and lists Steal the Zorrusso for Randy as the map label. PowerPyx describes Randy asking Jason and Lucia to steal a high-end car parked at an apartment building in Ocean Beach. He gives them a key cloner to break into high-end cars and shows them a list of the specialty cars he wants most (Reported). PowerPyx lists Chapter 3, Mission 14 (Crosstown Traffic) as the requirement, Hathaway Apartments in Ocean Beach (Vice Beach) as the start, and gives its own count as the 60th main mission. Its index lists it straight after Credit Check (Reported). Order: PC Gamer and GameSpot list Caught Slipping before Crosstown Traffic, but their lists also lack the Kitty Litter Labs entry Push Square has earlier in the chapter, so those two differences cancel out and all of them number this mission 16th. What it unlocks: PowerPyx says this mission gives you the Key Cloner, which lets you steal high-end cars. PC Gamer says you get the key cloner in Chapter 3 during this mission, and that it unlocks and starts keyless cars. GameSpot says Randy gives you the tool, without naming the mission, and that you don't have to hotwire the car after the cloning minigame. The mission is Confirmed as the source of the Key Cloner (PowerPyx, PC Gamer). PC Gamer also says the Waink It app on your phone can identify keyless cars when you scan them (Reported). The buyer: PowerPyx says you can now sell Key Cloner cars to Randy, and PC Gamer's fence-locations table lists Randy (high-end vehicles, Balsero) as unlocking in this mission, so high-end car sales to Randy opening here is Confirmed (PowerPyx, PC Gamer). Fence-tier conflict: PowerPyx's Car Service walkthrough (Chapter 3, Mission 10) says Randy is unlocked as a vehicle drop-off at the end of that mission, for vehicles with Standard Trackers or items from his request list. PC Gamer's table names this mission for Randy instead. We can't settle which tier opens when, so check the buyer list on your map after each mission (Reported). The optional questline: PowerPyx says the board opens an optional questline for a set of specific high-end cars Randy pays a lot for. Their locations start out unknown, and you can find them yourself or ask Randy for tips, and he gives them one at a time. PowerPyx says delivering them is not needed to progress the story (Reported).",
    tips: [
      { text: "Keep moving in a tracked car. PowerPyx says the tracker only pings you if you aren't driving fast enough. PC Gamer says the same about advanced trackers, and GameSpot says a red tracker pings your location after roughly five seconds below a certain speed (Confirmed).", reported: false },
      { text: "Mind the condition. PowerPyx says delivering the car in very good condition earns a $10,000 bonus (Reported).", reported: true },
      { text: "Don't leave a red-tracker car near a mission start. GameSpot says the ping goes out as soon as you leave the car, turning the area into a crime zone that blocks missions there until your heat clears. GameSpot also says Pay 'n' Spray won't take these cars and you can't store them in your garages (Reported).", reported: true },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter, which helps if you want another go at the bonus (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
      { text: "For more on breaking into and keeping cars, see our stealing cars guide, and our garages guide for where to keep what you take.", reported: false, link: { href: "/guides/stealing-cars", label: "Stealing cars" } },
      { text: "For shaking the police if the tracker pings you, see our wanted system guide.", reported: false, link: { href: "/guides/wanted", label: "Wanted system" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 16th in Chapter 3, but PC Gamer and GameSpot reach that number differently: they lack one entry earlier in the chapter and add another mission just before Mission 14, and the two differences cancel out. Our hub follows Push Square. The overall number follows Push Square. PowerPyx calls it the 60th main mission using its own count, and its index places it straight after the mission our hub lists 15th.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the $21,250 and the $10,000 bonus are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter, and PowerPyx with PC Gamer and GameSpot confirm the tracker behaviour. No source gives a playtime.",
      "PowerPyx's objective list has five entries. It hasn't been checked against the on-screen prompts. The car's name is spelled three different ways by the main outlets, so we use the spelling from our hub.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 16?",
        answer: "Push Square, PC Gamer and GameSpot all list it 16th in Chapter 3 (Confirmed). Push Square makes it the 51st overall and PowerPyx the 60th using its own count (Reported).",
      },
      {
        question: "How do I start Chapter 3 Mission 16?",
        answer: "PowerPyx says it needs Chapter 3 Mission 14 done, after which a contact messages you, and either lead can start it. Where is in the blurred section (Reported).",
      },
      {
        question: "Why do the police keep finding me during the drive?",
        answer: "The car reports your position if you drive too slowly. PowerPyx, PC Gamer and GameSpot all say keeping your speed up stops that (Confirmed).",
      },
      {
        question: "Does damage matter in Chapter 3 Mission 16?",
        answer: "PowerPyx says a car delivered in very good condition earns a $10,000 bonus (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 16 pay?",
        answer: "PowerPyx lists $21,250 plus the $10,000 condition bonus, along with a new tool, a new buyer and an optional questline covered in the blurred section (Reported).",
      },
    ],
    sources: [
      pp("gta-6-clonin-keys-makin-gs-steal-the-zorrusso-for-randy-walkthrough", "Requirement, playable leads, start, objectives, steps, tracker, reward, unlocks and the optional questline"),
      pp("gta-6-car-service-steal-the-car-for-raul-walkthrough", "Where PowerPyx says the vehicle buyer first opens"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission, and the no-replay note"),
      {
        id: "pcgamer",
        label: "PC Gamer: GTA 6 car-theft guide (18 Nov 2026)",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-clone-keys/",
        used: "Which mission gives the new tool, the stick minigame and how advanced trackers behave",
      },
      {
        id: "pcgamer",
        label: "PC Gamer: GTA 6 fence locations",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-fence-locations/",
        used: "Which mission PC Gamer says opens the high-end vehicle buyer",
      },
      {
        id: "gamespot",
        label: "GameSpot: How to steal cars and remove trackers in GTA 6",
        url: "https://www.gamespot.com/articles/how-to-steal-cars-and-remove-trackers-in-gta-6/",
        used: "Who gives the new tool, red tracker behaviour, Pay 'n' Spray and garage limits, crime zones near mission starts",
      },
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T17:16:35+10:00",
  },
  {
    slug: "chapter-3-mission-17",
    hidden: true,
    chapter: 3,
    chapterOrder: 17,
    order: 52,
    name: "Chapter 3, Mission 17",
    seoTitle: "GTA 6 Chapter 3 Mission 17 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 17 walkthrough: how to start it, each objective in order, what to look for when the game asks you to scout, and what it pays.",
    teaser: "The seventeenth mission of Chapter 3, an on-foot mission with four objectives and no cash reward.",
    intro: [
      "This is the seventeenth mission of Chapter 3 and the 52nd overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 17th in Chapter 3 under the same name (Confirmed), but the overall number is Reported, and PowerPyx's own list places it later. PowerPyx lists four objectives, says either lead can start it, and lists no reward. Its steps cover walking in, waiting, inspecting a set of things the game highlights, and a meeting. They don't mention any shooting or driving.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places, what you inspect and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 17th mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists, under the same name", status: "confirmed" },
      { label: "Number", value: "52nd overall (Push Square). PowerPyx calls it the 63rd main mission using its own count.", status: "reported" },
      { label: "Order", value: "PowerPyx's list places it later in the chapter than the other lists do. Details are in the blur.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 15. Push Square, PC Gamer and GameSpot list Mission 16 between the two.", status: "reported" },
      { label: "Starts", value: "PowerPyx says a contact messages you to meet at a set place. Where is in the blur.", status: "reported" },
      { label: "Playable as", value: "Either lead can start it, and PowerPyx says you are in control of one of them inside (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Four (PowerPyx)", status: "reported" },
      { label: "Reward", value: "None (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Enter the building. Once you arrive, go to the top of the main steps and through the front door (Reported, PowerPyx).",
      "Follow Jason. You play Lucia here. Follow Jason to the nearby table and interact with it to lean and wait there (Reported, PowerPyx).",
      "Check for security features. Switch on the Focus highlight and hold the inspect prompt on each highlighted feature. PowerPyx lists four, in this order: the security cameras above the counter, the man in the pink suit standing behind Jason, the two security guards standing by the elevator, and the security panel between the two elevators (Reported, PowerPyx).",
      "Join Raul. After inspecting every spot, Raul calls you upstairs. Go to where he is with Andrea and interact with the chair to sit down, which completes the mission (Reported, PowerPyx).",
      "PowerPyx's objective wording is: Enter the bank, Follow Jason, Check for security features, Join Raul (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Sinfrontera National Bank in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, and all four number it 17th in Chapter 3. PC Gamer's one-line summary is that Jason and Lucia prep a heist (Confirmed for the name and chapter). PowerPyx shows the map label Scope Out the Bank and describes Raul revealing his grand plan, a heist of Sinfrontera National Bank, where the Colombian cartel La Polilla Negra launders its money (PowerPyx spells it Columbian). Jason and Lucia case the bank and meet Raul and Andrea, who task them with finding Nicole Park, a security expert for the bank (Reported). PowerPyx lists Chapter 3, Mission 15 (Credit Check) as the requirement, Sinfrontera National Bank in Tequesta as the start, and gives its own count as the 63rd main mission (Reported). Order: PowerPyx's index lists Ride Or Die and a Raul's Next Job entry before this mission, and marks it as the first of its group of Cartel Heist setup missions. Push Square, PC Gamer and GameSpot list Ride or Die after this mission and after the one that follows it, and none of them has a Raul's Next Job entry, so our hub follows them (Reported). What it sets up: PowerPyx says the meeting hands Jason and Lucia their next lead, finding the bank's security expert. PC Gamer's one-line summary of the following mission on its list is that Jason and Lucia meet Nicole (Reported).",
    tips: [
      { text: "Turn on the highlight view early. PowerPyx's method is to switch on Focus first, so the things you need stand out, and then hold the inspect prompt on each (Reported).", reported: true },
      { text: "Inspect everything it highlights. PowerPyx says the next objective only follows once every spot has been inspected (Reported).", reported: true },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
      { text: "For a refresher on swapping between the two leads, see our switching characters guide.", reported: false, link: { href: "/guides/switch-characters", label: "Switching characters" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 17th in Chapter 3, but for PC Gamer and GameSpot the numbering differs earlier in the chapter in ways that cancel out. Our hub follows Push Square. PowerPyx's index places it later in the chapter than the other lists do, so it may appear on your map in a different order. The overall number follows Push Square. PowerPyx calls it the 63rd main mission using its own count.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the four things to inspect and the lack of a reward are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter. No source gives a playtime.",
      "PowerPyx's objective list has four entries. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 17?",
        answer: "Push Square, PC Gamer and GameSpot all list it 17th in Chapter 3 under the same name (Confirmed). Push Square makes it the 52nd overall and PowerPyx the 63rd using its own count (Reported).",
      },
      {
        question: "How do I start Chapter 3 Mission 17?",
        answer: "PowerPyx says it needs Chapter 3 Mission 15 done, after which a contact messages you, and either lead can start it. Where is in the blurred section (Reported).",
      },
      {
        question: "Is there any combat in Chapter 3 Mission 17?",
        answer: "Not in PowerPyx's walkthrough, whose four objectives cover walking in, waiting, inspecting and a meeting (Reported).",
      },
      {
        question: "Why won't the next objective appear?",
        answer: "PowerPyx says you hold the inspect prompt on each highlighted feature, and the next objective only follows once all of them have been inspected. The list is in the blurred section (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 17 pay?",
        answer: "PowerPyx lists no reward for it (Reported).",
      },
    ],
    sources: [
      pp("gta-6-sinfrontera-national-bank-scope-out-the-bank-walkthrough", "Requirement, playable leads, start, objectives, steps and reward"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission, its heist-setup grouping and the no-replay note"),
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T17:16:35+10:00",
  },
  {
    slug: "chapter-3-mission-18",
    hidden: true,
    chapter: 3,
    chapterOrder: 18,
    order: 53,
    name: "Chapter 3, Mission 18",
    seoTitle: "GTA 6 Chapter 3 Mission 18 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 18 walkthrough: how it starts, every objective in order, staying unseen on foot, getting clear afterwards, and what it pays.",
    teaser: "The eighteenth mission of Chapter 3, with seven objectives, a stretch on foot where you avoid being seen, and no cash reward.",
    intro: [
      "This is the eighteenth mission of Chapter 3 and the 53rd overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 18th in Chapter 3 under the same name (Confirmed), but the overall number is Reported. PowerPyx lists seven objectives, says either lead can start it, says it starts by itself when the previous mission ends, and lists no reward. The objectives cover a slow drive, a stretch on foot and a drive away. PowerPyx's advice for the on-foot part is to stay right behind your partner so the guards don't spot you.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 18th mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists, under the same name", status: "confirmed" },
      { label: "Number", value: "53rd overall (Push Square). PowerPyx calls it the 64th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "Chapter 3, Mission 17 (PowerPyx's requirement line; Push Square, PC Gamer and GameSpot list it next)", status: "confirmed" },
      { label: "Starts", value: "PowerPyx says it starts automatically as soon as the previous mission ends and moves you to a new place, so there is no marker to find. Where is in the blur.", status: "reported" },
      { label: "Playable as", value: "Either lead can start it (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Seven (PowerPyx)", status: "reported" },
      { label: "Reward", value: "None (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Scope out the house. In the neighbourhood, drive south to the marked house and drive slowly past it, as Jason directs you to (Reported, PowerPyx).",
      "Park the vehicle. After passing the house, park nearby (Reported, PowerPyx).",
      "Find Nicole. Sneak over to the house, following behind Jason, who directs where you can go. Follow him to the back, where PowerPyx says to wait for the guard who walks out of the back door, then follow and enter the house while he stands guard. PowerPyx's wording doesn't make clear which of them is standing guard (Reported, PowerPyx).",
      "Reach the room. Walk across the hallway to the bedrooms and enter the one in the northeast corner with the closed door (Reported, PowerPyx).",
      "Pick up Nicole. After the scene she is knocked out and you can pick her up off the ground (Reported, PowerPyx).",
      "Escape with Nicole. Follow Jason around the back door and down the side of the house to the front. PowerPyx says that if you stay right behind him you won't be spotted by any guards. Go to your car and open the trunk to place her inside (Reported, PowerPyx).",
      "Escape the area. Quickly leave the general area to get away from the guards (Reported, PowerPyx).",
      "Take Nicole to the planning room. Drive to the planning room in Stockyard, which completes the mission (Reported, PowerPyx).",
      "PowerPyx's objective wording is: Find Nicole, Park the vehicle, Find Nicole, Pick up Nicole, Escape with Nicole, Escape the area, Take Nicole to the planning room (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Security Expert in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, and all four number it 18th in Chapter 3. PC Gamer's one-line summary is that Jason and Lucia meet Nicole (Confirmed for the name and chapter). PowerPyx describes Jason and Lucia taking Nicole from under the noses of her La Polilla Negra protection detail and bringing her to Raul. Raul reveals he knows she has been stealing from Polilla Negra and that they were planning to kill her after her current assignment, and Nicole agrees to join Raul's crew (Reported). PowerPyx lists Chapter 3, Mission 17 (Sinfrontera National Bank) as the requirement, says the mission starts automatically after it and moves you to Waning Sands in Leonard County to find the missing security officer, and gives its own count as the 64th main mission (Reported). Order: PowerPyx's index lists it straight after Sinfrontera National Bank and marks it as the second of its Cartel Heist setup missions, which matches Push Square, PC Gamer and GameSpot (Reported). What it sets up: PowerPyx says Nicole agrees to join Raul's crew at the end of the mission (Reported).",
    tips: [
      { text: "Stay right behind your partner on foot. PowerPyx says this is how you avoid being spotted by the guards, both going in and coming out (Reported).", reported: true },
      { text: "Leave the area quickly once you are driving. PowerPyx says to quickly leave the general area to get away from the guards (Reported).", reported: true },
      { text: "Don't expect a gap to save. PowerPyx says this mission starts automatically as soon as the previous one ends. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
      { text: "For a refresher on swapping between the two leads, see our switching characters guide.", reported: false, link: { href: "/guides/switch-characters", label: "Switching characters" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 18th in Chapter 3, and PowerPyx's index lists it straight after the mission our hub lists 17th. The overall number follows Push Square. PowerPyx calls it the 64th main mission using its own count.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the automatic start and the lack of a reward are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter. PowerPyx doesn't say which lead you play, so we don't either. No source gives a playtime.",
      "PowerPyx's objective list has seven entries and lists one of them twice. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 18?",
        answer: "Push Square, PC Gamer and GameSpot all list it 18th in Chapter 3 under the same name (Confirmed). Push Square makes it the 53rd overall and PowerPyx the 64th using its own count (Reported).",
      },
      {
        question: "How do I start Chapter 3 Mission 18?",
        answer: "PowerPyx says it starts by itself as soon as the previous story mission ends, so there is no marker to find (Reported).",
      },
      {
        question: "Is there any combat in Chapter 3 Mission 18?",
        answer: "Not in PowerPyx's walkthrough, whose seven objectives cover a slow drive, a stretch on foot where you avoid being seen, and a drive away (Reported).",
      },
      {
        question: "How do I avoid getting spotted?",
        answer: "PowerPyx says that if you stay right behind your partner on foot, the guards won't spot you (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 18 pay?",
        answer: "PowerPyx lists no reward for it (Reported).",
      },
    ],
    sources: [
      pp("gta-6-security-expert-walkthrough", "Requirement, automatic start, playable leads, start, objectives, steps and reward"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission, its heist-setup grouping and the no-replay note"),
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T18:09:23+10:00",
  },
  {
    slug: "chapter-3-mission-19",
    hidden: true,
    chapter: 3,
    chapterOrder: 19,
    order: 54,
    name: "Chapter 3, Mission 19",
    seoTitle: "GTA 6 Chapter 3 Mission 19 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 19 walkthrough: when it unlocks, every objective in order, a way to skip an optional cost, losing pursuers, and what it pays.",
    teaser: "The nineteenth mission of Chapter 3, with thirteen objectives, an optional cost you can skip, a chase at the end and no cash reward.",
    intro: [
      "This is the nineteenth mission of Chapter 3 and the 54th overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 19th in Chapter 3 under the same name (Confirmed), but the overall number is Reported. PowerPyx lists thirteen objectives, says only one of the two leads can start it, and lists no reward. PowerPyx says an item you need can be bought, but describes a way to get it without paying. It ends with a chase, and PowerPyx says you lose your pursuers by getting outside the red area on the map.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 19th mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists, under the same name", status: "confirmed" },
      { label: "Number", value: "54th overall (Push Square). PowerPyx calls it the 61st main mission using its own count.", status: "reported" },
      { label: "Order", value: "PowerPyx's own list places it before Chapter 3 Missions 17 and 18, which Push Square, PC Gamer and GameSpot place before it. Details are in the blur.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 15. Push Square, PC Gamer and GameSpot list Missions 16 to 18 between the two.", status: "reported" },
      { label: "Starts", value: "PowerPyx says a contact messages you about a day after the requirement mission, asking to meet at a set place. Where is in the blur.", status: "reported" },
      { label: "Playable as", value: "One lead only. Which one is in the blur (PowerPyx).", status: "reported" },
      { label: "Objectives", value: "Thirteen, one of which PowerPyx lists only as \"Objective 2\" (PowerPyx)", status: "reported" },
      { label: "Reward", value: "None (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Go to the store. After Dre'Quan comes out, head to the Eris Store along the water in Downtown (Reported, PowerPyx).",
      "Find a pair of DWNPLY sneakers. Enter the store with Dre'Quan, go upstairs and to the right of where Dre'Quan stops to talk to the DJ, where a man is holding a bag. He offers to sell them to you for $1,580, which you can accept (Reported, PowerPyx).",
      "Or get them for free. PowerPyx says that if you haggle he declines and walks away. Walking into him may make him drop the bag. If it doesn't, keep following him. In the outdoor area there are basketballs on a stand to the right, and throwing one at him makes him drop the bag, which you can then pick up (Reported, PowerPyx).",
      "Return to Dre'Quan. Go back inside and speak to him just inside the door (Reported, PowerPyx).",
      "Follow Dre'Quan to the VIP lounge. The bouncer stops you at the door. PowerPyx says to look at him and select the Show Shoes option, which has him let you up for free (Reported, PowerPyx).",
      "Approach DWNPLY. Head upstairs to where he is sitting with a group to the left of the bar, then hand him the shoes (Reported, PowerPyx).",
      "Take DWNPLY's keys. While he is signing the shoes, hold the prompt to take his keys. He interrupts to ask who it is for. After you respond, PowerPyx says to continue holding to go for the keys (Reported, PowerPyx).",
      "Escape with Dre'Quan. After Jason grabs the keys, run downstairs to Dre'Quan and follow him to the parking lot (Reported, PowerPyx).",
      "Search the parking lot for DWNPLY's car. Trigger the car horn and follow the noise to the east side of the lot, where the car is parked in one of the lit-up VIP spots. Get in and wait for Dre'Quan (Reported, PowerPyx).",
      "Drive to the Speedshop. Drive the car to the Stockyard Speedshop to drop it off. As soon as you leave the parking lot a gang member jumps on the hood, and PowerPyx says to swerve back and forth to knock them off (Reported, PowerPyx).",
      "Escape with DWNPLY's car. Depending on how quickly you leave the area, gang members may chase you. PowerPyx says you need to lose them by getting out of the red area on the map before you continue to the shop, which completes the mission (Reported, PowerPyx).",
      "PowerPyx's objective wording is: Go to the Eris store, Objective 2, Find a pair of DWNPLY sneakers, Return to Dre'Quan, Follow Dre'Quan to the VIP lounge, Approach DWNPLY, Hand DWNPLY the shoes, Take DWNPLY's keys, Escape with Dre'Quan, Search the parking lot for DWNPLY's car, Steal DWNPLY's car, Drive to the Speedshop, Escape with DWNPLY's car (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Ride or Die in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, and all four number it 19th in Chapter 3. PC Gamer's one-line summary is that Jason helps out Dre'Quan (Confirmed for the name and chapter). PowerPyx shows the map label Meet Dre'Quan and describes Dre'Quan having a plan to get revenge on DWNPLY and get the Dimez back on top. Jason helps him steal DWNPLY's car from the Eris Flagship store by posing as a fan. The two drive away while escaping DWNPLY's personal bodyguard, Bush, and a gang called Cash City, who DWNPLY pays for protection (Reported). PowerPyx lists Chapter 3, Mission 15 (Credit Check) as the requirement and says Jason is the only lead who can start it, going alone. Around a day after the requirement, Dre'Quan messages Jason to meet at the Jack of Hearts in Crosstown, Vice City, and PowerPyx says you can sit on the ledge outside the club to wait for him. PowerPyx gives its own count as the 61st main mission (Reported). Order: PowerPyx's index lists it straight after the mission our hub lists 16th, then a Raul's Next Job entry, and only then Sinfrontera National Bank (63rd) and Security Expert (64th). Push Square, PC Gamer and GameSpot list it after both of those, so our hub follows them (Reported).",
    tips: [
      { text: "You don't have to pay for the item. PowerPyx says it can be bought, but that it is possible to get it for free, and the steps are in the blurred section (Reported).", reported: true },
      { text: "Get moving straight away at the end. PowerPyx says whether you are chased depends on how quickly you leave the area, and that you lose pursuers by getting out of the red area on the map (Reported).", reported: true, link: { href: "/guides/wanted", label: "Wanted system" } },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 19th in Chapter 3. PowerPyx's index places it earlier in the chapter, before the missions our hub lists 17th and 18th, so it may sit in a different place in PowerPyx's order. The overall number follows Push Square. PowerPyx calls it the 61st main mission using its own count.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the price, the free method and the lack of a reward are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter. No source gives a playtime.",
      "PowerPyx's objective list has thirteen entries, one of which it labels only \"Objective 2\". It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 19?",
        answer: "Push Square, PC Gamer and GameSpot all list it 19th in Chapter 3 under the same name (Confirmed). Push Square makes it the 54th overall and PowerPyx the 61st using its own count (Reported).",
      },
      {
        question: "When does Chapter 3 Mission 19 unlock?",
        answer: "PowerPyx says it needs Chapter 3 Mission 15 done and then starts about a day later with a message from a contact. Its own list places it before Missions 17 and 18. The start point is in the blurred section (Reported).",
      },
      {
        question: "Do I have to spend money in Chapter 3 Mission 19?",
        answer: "PowerPyx says an item you need can be bought, but that it is possible to get it for free (Reported).",
      },
      {
        question: "How do I lose the people chasing me?",
        answer: "PowerPyx says to get out of the red area on the map, then carry on to the drop-off (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 19 pay?",
        answer: "PowerPyx lists no reward for it (Reported).",
      },
    ],
    sources: [
      pp("gta-6-ride-or-die-meet-drequan-walkthrough", "Requirement, playable lead, start, objectives, steps, price, free method and reward"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission and the no-replay note"),
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T18:09:23+10:00",
  },
  {
    slug: "chapter-3-mission-20",
    hidden: true,
    chapter: 3,
    chapterOrder: 20,
    order: 55,
    name: "Chapter 3, Mission 20",
    seoTitle: "GTA 6 Chapter 3 Mission 20 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 20 walkthrough: when it unlocks, every objective in order, a long firefight, a vehicle defence section and why it matters later.",
    teaser: "The twentieth mission of Chapter 3, with nine objectives, a long firefight, a vehicle defence section and an effect on a later mission.",
    intro: [
      "This is the twentieth mission of Chapter 3 and the 55th overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 20th in Chapter 3 under the same name (Confirmed), but the overall number is Reported. PowerPyx lists nine objectives, says either lead can start it, and lists no cash reward.",
      "It is mostly action: a short drive, a long on-foot firefight, a fast getaway and a section where you stop chasing vehicles from ramming yours. PowerPyx says how much of the load survives that section decides how many resources you get in a later Chapter 3 mission, so it is the part to take care over.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 20th mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists, under the same name", status: "confirmed" },
      { label: "Number", value: "55th overall (Push Square). PowerPyx calls it the 67th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 18. Push Square, PC Gamer and GameSpot list Mission 19 between the two.", status: "reported" },
      { label: "Starts", value: "You go to a set meeting point once the requirement is done. Where is in the blur (PowerPyx).", status: "reported" },
      { label: "Playable as", value: "Either lead can start it (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Nine (PowerPyx)", status: "reported" },
      { label: "Reward", value: "No cash. PowerPyx's reward line is an effect on a later Chapter 3 mission.", status: "reported" },
    ],
    objectives: [
      "Follow Brian. After you speak with Brian at the bar, follow him out and get in his truck (Reported, PowerPyx).",
      "Drive to the airfield. Drive to the airfield south of Hamlet to wait for Pete (Reported, PowerPyx).",
      "Place the weapons crate in the truck. After Pete arrives he hands weapons crates to Lucia and Jason; walk them over to the back of Brian's truck (Reported, PowerPyx).",
      "Pick up a weapons crate. After placing the first crates, go back over, pick up another crate off the ground and walk it to the truck (Reported, PowerPyx).",
      "Escape with Pete. Lucia and Brian leave, and you first play as Jason holding off IAA agents coming into the airfield. Pete opens the garage door on the right to enter the hangar; follow him inside. Opposite the door PowerPyx says you can pick up an assault rifle and some health items, then follow Pete to the next room and deal with the enemies who enter the building. Pete then runs out the back door: follow him out and south down the road, dealing with more enemies. He climbs onto the roof of a nearby building, so climb up with him and watch for enemies arriving in cars down the road. Keep following him through the trees and across the runway to the other hangar, watching for more cars from the far side of the runway (Reported, PowerPyx).",
      "Escape the area. In the hangar you automatically jump in the plane with Pete. Quickly drive out of the hangar and left down the runway at full speed, then pull back to get in the air as soon as possible to avoid the cars that keep coming (Reported, PowerPyx).",
      "Protect the cargo. Once you are in the air you switch to Lucia in the back of Brian's truck. PowerPyx says she has an LMG with unlimited ammo here, and to reload when no vehicles are immediately behind you. Stop vehicles ramming the back of the truck: each hit makes you lose cargo boxes, which affects how many explosives you have in the later mission Hidden Charges. If you keep all the cargo you also get a Professional bonus once the section finishes (Reported, PowerPyx).",
      "Return to the planning room. After Lucia jumps in the car, keep following the objective along the road until you switch back to Jason (Reported, PowerPyx).",
      "Land the plane. The plane is too damaged to land normally, so you have to crash-land. PowerPyx says there is a bunch of fields ahead and to aim for the colourful one to the right of the river. Landing completes the mission (Reported, PowerPyx).",
      "PowerPyx's objective wording is: Follow Brian, Drive to the airfield, Place the weapons crate in the truck, Pick up a weapons crate, Escape with Pete, Escape the area, Protect the cargo, Return to the planning room, Land the plane (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Company Property in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, and all four number it 20th in Chapter 3. PC Gamer's one-line summary is that Jason and Lucia help with a weapons shipment (Confirmed for the name and chapter). PowerPyx shows the map label Meet Brian. In its quest description, Raul has told Brian he owes him a favour for giving Jason and Lucia a place in his crew, so Brian arranges to receive a shipment of weapons from an old smuggler contact, Pilot Pete, that Raul needs for his heist. Jason, Lucia, Brian and Pete are unloading the weapons when the IAA and police show up and they are forced to flee (Reported). PowerPyx lists Chapter 3, Mission 18 (Security Expert) as the requirement and says either Lucia or Jason can start it. You play as Jason for the hangar fight and the plane, and as Lucia for the section in the truck. After the requirement you go to Skeeter's, a bar on the south side of Hamlet in Vice-Dale County, to meet Brian (Reported). PowerPyx gives its own count as the 67th main mission and tags it as part of The Cartel Heist (Reported). Order: PowerPyx's index lists it before Safe Word and then The Missing Link. Push Square, PC Gamer and GameSpot list The Missing Link 21st and Safe Word 22nd, so our hub follows them (Reported). What it feeds: PowerPyx says the cargo you keep decides how many explosives you have in Hidden Charges, which Push Square, PC Gamer and GameSpot all list 25th in Chapter 3 (Reported).",
    tips: [
      { text: "PowerPyx says a rifle and some health items can be picked up near the start of the firefight (Reported).", reported: true },
      { text: "Move off quickly in the getaway. PowerPyx says to get clear as fast as you can, because enemy vehicles keep arriving (Reported).", reported: true },
      { text: "Time your reloads in the vehicle defence section. PowerPyx's advice is to reload when nothing is directly behind you, since being rammed costs you part of the load (Reported).", reported: true },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
      { text: "For a refresher on the police and wanted levels, see our wanted system guide.", reported: false, link: { href: "/guides/wanted", label: "Wanted system" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 20th in Chapter 3. The overall number follows Push Square. PowerPyx calls it the 67th main mission using its own count, and the order of the missions after it differs in PowerPyx's index, which is explained in the blur.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the objectives, the effect on a later mission and the lack of cash are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter. No source gives a playtime.",
      "PowerPyx's objective list has nine entries. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 20?",
        answer: "Push Square, PC Gamer and GameSpot all list it 20th in Chapter 3 under the same name (Confirmed). Push Square makes it the 55th overall and PowerPyx the 67th using its own count (Reported).",
      },
      {
        question: "When does Chapter 3 Mission 20 unlock?",
        answer: "PowerPyx says it needs Chapter 3 Mission 18 done. The start point is in the blurred section (Reported).",
      },
      {
        question: "Does how I play this mission matter later?",
        answer: "Yes, according to PowerPyx. Losing part of the load during the vehicle defence section reduces what you have to work with in a later Chapter 3 mission (Reported).",
      },
      {
        question: "Do I run out of ammo in the vehicle defence section?",
        answer: "PowerPyx says the gun you use there has unlimited ammo, but you still need to reload (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 20 pay?",
        answer: "PowerPyx lists no cash for it. Its reward line is the effect on a later mission (Reported).",
      },
    ],
    sources: [
      pp("gta-6-company-property-walkthrough", "Requirement, playable leads, start, objectives, steps, unlimited ammo, reload advice, effect on a later mission and reward"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission, its heist grouping and the no-replay note"),
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T19:17:26+10:00",
  },
  {
    slug: "chapter-3-mission-21",
    hidden: true,
    chapter: 3,
    chapterOrder: 21,
    order: 56,
    name: "Chapter 3, Mission 21",
    seoTitle: "GTA 6 Chapter 3 Mission 21 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 21 walkthrough: when it unlocks, every objective in order, a unique pistol you can grab, the shootout and a careful final section.",
    teaser: "The twenty-first mission of Chapter 3, with eighteen objectives, a unique pistol you can pick up, a shootout and a careful final section.",
    intro: [
      "This is the twenty-first mission of Chapter 3 and the 56th overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 21st in Chapter 3 under the same name (Confirmed), but the overall number is Reported. PowerPyx lists eighteen objectives, several of them repeats in the final section, says only one of the two leads can start it, and lists no cash reward.",
      "It opens with some following and waiting, then a short minigame and a melee fight, then a room-by-room shootout and a drive, and it ends with a slow, careful section. PowerPyx says a unique pistol can be picked up early in the shootout, but you have to go back for it before pushing on, and it ties a Professional bonus to the final section.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 21st mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists, under the same name", status: "confirmed" },
      { label: "Number", value: "56th overall (Push Square). PowerPyx calls it the 69th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 20 (Push Square, PC Gamer and GameSpot also list it straight after that mission)", status: "confirmed" },
      { label: "Starts", value: "You go to a set meeting point once the requirement is done. Where is in the blur (PowerPyx).", status: "reported" },
      { label: "Playable as", value: "One lead only. Which one is in the blur (PowerPyx).", status: "reported" },
      { label: "Objectives", value: "Eighteen, several of them repeated (PowerPyx)", status: "reported" },
      { label: "Reward", value: "No cash. A unique pistol if you pick it up during the mission (PowerPyx).", status: "reported" },
    ],
    objectives: [
      "Follow Andrea. Once Lucia has changed, follow Andrea across the street to the warehouse building (Reported, PowerPyx).",
      "Check in with Andrea. Inside, wait around a bit while Andrea texts the contact. When prompted, go over and check in with her at the north door by the bouncer in the white suit (Reported, PowerPyx).",
      "Meet Monty. Keep following Andrea to the back of the area, then enter the room at the back when Monty prompts you (Reported, PowerPyx).",
      "Pose for the photos. Monty asks you to take pictures for his social media. In the picture section you change pose and take pictures (Reported, PowerPyx).",
      "Knock out Monty. After the pictures you fight Monty in melee; knock him out (Reported, PowerPyx).",
      "Grab the pistol first. You now have to shoot your way out. PowerPyx's advice is to defeat the first enemy, then go back to the photo room where Andrea was and pick Monty's 1992 Pistol up off the floor before going any further (Reported, PowerPyx).",
      "Clear a path for Andrea. Keep progressing through the area, watching for enemies stepping through doorways or coming around corners. In the large room where the chickens were, PowerPyx says more enemies arrive in vehicles from the garage on the right (Reported, PowerPyx).",
      "Get in the car. Once the enemies inside are defeated, Lucia and Andrea throw Monty in a car outside automatically. Quickly jump in after her (Reported, PowerPyx).",
      "Go to the site. Make your way towards Vice City to meet the others. More gang members follow, but PowerPyx says you can focus on driving to the objective and you lose them quickly on the way out of Hamlet. About halfway there, once Lucia and Andrea finish talking, the game prompts you to switch to Jason (Reported, PowerPyx).",
      "Meet Lucia and walk Monty in. As Jason, go out to the front of the building to meet Lucia and Andrea. When they open the trunk, interact with Monty to pull him out, then keep walking behind him with your gun out so he walks to the backyard. When Raul prompts you, melee Monty to knock him down (Reported, PowerPyx).",
      "Work the loader. You control a loader and move Monty around: rotate him over the pool and lower him closer to the water. PowerPyx says Raul keeps asking you to move him up or down to get him to talk, and not to lower him fully into the water or he dies. You receive a Professional bonus if you get through all the questions without accidentally killing him (Reported, PowerPyx).",
      "Deal with Monty. After Raul finishes talking, PowerPyx says you can either put Monty on land or drop him into the pool to be eaten by the alligator, whichever you prefer, and the mission is then complete (Reported, PowerPyx).",
      "PowerPyx's objective wording is: Follow Andrea, Check in with Andrea, Follow Andrea, Enter the room, Knock out Monty, Clear a path for Andrea, Get in the car, Go to the site, Go and meet Lucia, Pick up Monty, Keep Monty walking, Knock Monty down, Lower Monty, Wait for Monty to answer, Raise Monty, Lower Monty, Wait for Monty to answer, Deal with Monty (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called The Missing Link in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, and all four number it 21st in Chapter 3. PC Gamer's one-line summary is that Lucia goes to a cockfight (Confirmed for the name and chapter). PowerPyx shows the map label Meet Andrea. In its quest description, Andrea has arranged a meeting with Monty, a high-up La Polilla Negra enforcer, at a cockfight in Watson Bay. He makes Andrea and Lucia pose for the cartel's social media, before Andrea and Lucia escape with Monty to Vice City, where they and the rest of Raul's crew interrogate him for information by hanging him over an alligator-infested pool (Reported). PowerPyx lists Chapter 3, Mission 20 (Company Property) as the requirement and says Lucia is the only lead who can start it. After the requirement she meets Andrea alone at Sloppy Molly's in Watson Bay, Mariana County. Partway through the drive the game prompts you to switch to Jason, who handles the last part (Reported). PowerPyx gives its own count as the 69th main mission and tags it as part of The Cartel Heist (Reported). The unique pistol is Monty's 1992 Pistol, which PowerPyx gives as the reward if it is picked up during the mission (Reported). Ending: PowerPyx says that after Raul finishes talking you can either put Monty on land or drop him into the pool, and the mission is complete either way (Reported). Order: PowerPyx's index lists Company Property, then Safe Word, then this mission. Push Square, PC Gamer and GameSpot all list it 21st in Chapter 3, straight after Company Property and before Safe Word, so our hub follows them (Reported).",
    tips: [
      { text: "Go back for the pistol early. PowerPyx says to defeat the first enemy and collect it before going any further (Reported).", reported: true },
      { text: "Watch the corners in the shootout. PowerPyx warns that enemies step through doorways and around corners, and that more arrive by vehicle later on (Reported).", reported: true },
      { text: "Keep driving on the way out. PowerPyx says you can focus on driving to the objective and the gang members behind you fall away quickly (Reported).", reported: true },
      { text: "Take the final section carefully. PowerPyx ties the Professional bonus to getting all the way through it without a mistake. What to avoid is in the blur (Reported).", reported: true },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Reported).", reported: true, link: { href: "/guides/saving", label: "How to save" } },
      { text: "For a refresher on swapping between the two leads, see our switching characters guide.", reported: false, link: { href: "/guides/switch-characters", label: "Switching characters" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 21st in Chapter 3. The overall number follows Push Square. PowerPyx calls it the 69th main mission using its own count, and its index orders the missions around it differently, which is explained in the blur.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the objectives, the pistol, the bonus and the lack of cash are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter. No source gives a playtime.",
      "PowerPyx's objective list has eighteen entries, several of them repeated. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 21?",
        answer: "Push Square, PC Gamer and GameSpot all list it 21st in Chapter 3 under the same name (Confirmed). Push Square makes it the 56th overall and PowerPyx the 69th using its own count (Reported).",
      },
      {
        question: "When does Chapter 3 Mission 21 unlock?",
        answer: "PowerPyx says it needs Chapter 3 Mission 20 done. The start point is in the blurred section (Reported).",
      },
      {
        question: "Is there a weapon to pick up in this mission?",
        answer: "Yes, according to PowerPyx: a unique pistol early in the shootout. You need to go back for it before moving on (Reported).",
      },
      {
        question: "How do I get the Professional bonus?",
        answer: "PowerPyx ties it to the final section. The details are in the blurred section (Reported).",
      },
      {
        question: "How much does Chapter 3 Mission 21 pay?",
        answer: "PowerPyx lists no cash, only the pistol if you pick it up during the mission (Reported).",
      },
    ],
    sources: [
      pp("gta-6-the-missing-link-meet-andrea-walkthrough", "Requirement, playable lead, start, objectives, steps, pistol, bonus, ending and reward"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission, its heist grouping and the no-replay note"),
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T19:17:26+10:00",
  },
  {
    slug: "chapter-3-mission-22",
    hidden: true,
    chapter: 3,
    chapterOrder: 22,
    order: 57,
    name: "Chapter 3, Mission 22",
    seoTitle: "GTA 6 Chapter 3 Mission 22 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 22 walkthrough: when it unlocks, every objective in order, an optional minigame that pays a pistol and cash, and chase tips.",
    teaser: "The twenty-second mission of Chapter 3, with eighteen objectives, a chase, and an optional minigame that pays a unique pistol and $1,500.",
    intro: [
      "This is the twenty-second mission of Chapter 3 and the 57th overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 22nd in Chapter 3 under the same name (Confirmed), but the overall number is Reported. PowerPyx lists eighteen objectives, says either lead can start it, and says it changes pace several times: a quiet way in, a string of short on-screen prompts, a chase, and an optional practice minigame at the end.",
      "PowerPyx says the minigame is the only way to get the mission's rewards, a unique pistol and $1,500, and that you can repeat it as many times as you like. It also warns that hitting certain things during the chase gives you a Psycho criminal rating.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places, the choice and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 22nd mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists, under the same name", status: "confirmed" },
      { label: "Number", value: "57th overall (Push Square). PowerPyx calls it the 68th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 20. Push Square, PC Gamer and GameSpot list Mission 21 between the two.", status: "reported" },
      { label: "Starts", value: "You go back to a set place once the requirement is done. Where is in the blur (PowerPyx).", status: "reported" },
      { label: "Playable as", value: "Either lead can start it (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Eighteen (PowerPyx)", status: "reported" },
      { label: "Reward", value: "A unique pistol and $1,500, only if you finish the optional minigame at the end (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Take the truck. After the briefing with Nicole, take the big truck parked outside the compound (Reported, PowerPyx).",
      "Drive to Gil's mansion. Head to Peacock Estates, at the very south edge of the city (Reported, PowerPyx).",
      "Find a way in. You switch to playing as Jason and have to sneak into the mansion. PowerPyx says to go through the front gate and crouch to stay hidden, then move carefully around the right side of the house through the archway. A woman comes out of a door and stops you, and you need to blend in (Reported, PowerPyx).",
      "Follow Gil's assistant and go to your mark. Follow the assistant back to the backyard. After Jason gets put in makeup, walk to the pool where the skimmer is sitting and pick it up when directed (Reported, PowerPyx).",
      "Skim the pool. Move back and forth to keep skimming until you are told to stop (Reported, PowerPyx).",
      "Look at Samantha and spread lotion on Sasha. When prompted, look at Samantha on one of the loungers, then go back to skimming. When prompted, interact with the lotion to pick it up and spread it on the woman's back (Reported, PowerPyx).",
      "Fight Rodney. When prompted, melee Rodney to stay in the scene. After hitting him a few times, stop and let him hit you back. When prompted again, keep meleeing him until he is knocked out (Reported, PowerPyx).",
      "The choice. You are then asked whether you want to participate further or not. PowerPyx says that if you don't want to make Lucia angry, it recommends choosing not to participate (Reported, PowerPyx).",
      "Get into the office. Run around the mansion to the door you almost entered before. Inside, go through the first double doors, then through the closed doors on the right side of the hallway (Reported, PowerPyx).",
      "Search the office. You can look around, but PowerPyx says the remote for the safe is found by interacting with the drawer on the left side of the desk (Reported, PowerPyx).",
      "Open the window and attach the winch. Once Lucia backs the truck up, interact with the window to open it, then interact with the safe to attach the winch. When you switch to Lucia, hold the prompted button until the safe is pulled out of the house (Reported, PowerPyx).",
      "Escape with the safe. You drive the truck with the safe dragging behind. PowerPyx says turning left and right swings the safe, so you can use it to hit the vehicles chasing you (Reported, PowerPyx).",
      "Deliver the safe to Felipe. Head west towards the marked location, with cops chasing you along the way. PowerPyx says to watch out for the cyclists when Jason calls them out, and to avoid the gravestones when you turn into the cemetery, because hitting them with the safe gives you a Psycho criminal rating. Keep following the path to the garage and drive in to deliver the safe (Reported, PowerPyx).",
      "Practise on the safe. You are taken back to Raul's compound to practise. PowerPyx recommends doing it, because the mechanics are the same as the heist at the end of the chapter, and you can practise as many times as you want. You also get a variant weapon for finishing it:",
      "Drill. Hold the prompted buttons at the correct position to drill a hole. The left gauge slowly increases as you drill, so you need to adjust it, but hold the right gauge in the same spot the entire time. The light on the back of the drill also shows how you are doing, and you don't want it to reach red (Reported, PowerPyx).",
      "Cable. Use one stick to push the cable forward and backward and the other to rotate the view. Follow along the cable without touching it or the other walls, then hook onto the gold ring at the end (Reported, PowerPyx).",
      "Hold the door. Hold the prompted buttons and mash the prompt to secure the door while Nicole drills and enters the combination (Reported, PowerPyx).",
      "Finish. When the safe opens you get the variant weapon Gil's Kalinga .50 and can take the $1,500 from inside. You can keep practising, and quitting completes the mission (Reported, PowerPyx).",
      "PowerPyx's objective wording is: Drive to Gil's mansion, Find a way into the mansion, Follow Gil's assistant, Go to your mark, Skim the pool, Look at Samantha, Spread lotion on Sasha, Punch Rodney, Take punches from Rodney, Knock out Rodney, Enter the mansion, Enter Gil's office, Search Gil's office, Open the window, Attach the winch to the safe, Escape with the safe, Deliver the safe to Felipe, Practice on the safe (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Safe Word in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, and all four number it 22nd in Chapter 3. PC Gamer's one-line summary is that Lucia learns a new skill (Confirmed for the name and chapter). PowerPyx shows the map label Steal the Practice Safe. In its quest description, Nicole knows what safe is in Sinfrontera National Bank but wants Lucia to practise her safe cracking first, so she sends Jason and Lucia to steal a smaller version of the same safe from a pornographer's mansion. After Jason locates the safe, they pull it from the house with a truck and drag it through the streets of Vice City before delivering it to Raul's base (Reported). PowerPyx lists Chapter 3, Mission 20 (Company Property) as the requirement, says either Lucia or Jason can start it, and says you return to Raul's compound in Stockyard, Vice City, to speak with Nicole. You play Jason to get into the house and Lucia for the winch, the drive and the practice (Reported). PowerPyx gives its own count as the 68th main mission and tags it as part of The Cartel Heist (Reported). The choice is whether to participate further in the shoot, and PowerPyx recommends not participating if you don't want to make Lucia angry (Reported). The pistol is Gil's Kalinga .50, which PowerPyx gives as the reward for finishing the safecracking practice (Reported). Order: PowerPyx's index lists Company Property, then this mission, then The Missing Link. Push Square, PC Gamer and GameSpot list The Missing Link 21st and this mission 22nd, so our hub follows them. PowerPyx's requirement line names only Company Property (Reported). What it sets up: PowerPyx says the practice works the same way as the safe at the end of the chapter, in The Cartel Heist (Reported).",
    tips: [
      { text: "Don't skip the minigame at the end. PowerPyx says the pistol and the $1,500 only come from opening the safe in the practice, and that you can repeat it as often as you like before quitting (Reported).", reported: true },
      { text: "Keep an eye on what you hit in the chase. PowerPyx says hitting certain bystanders and scenery the game points out gives you a Psycho criminal rating (Reported).", reported: true, link: { href: "/guides/wanted", label: "Wanted system" } },
      { text: "Watch the drill's warning light in the minigame. PowerPyx says the light on the drill shows how you are doing and that you don't want it to reach red (Reported).", reported: true },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Confirmed).", reported: false, link: { href: "/guides/saving", label: "How to save" } },
      { text: "For a refresher on swapping between the two leads, see our switching characters guide.", reported: false, link: { href: "/guides/switch-characters", label: "Switching characters" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 22nd in Chapter 3. The overall number follows Push Square. PowerPyx calls it the 68th main mission using its own count, and its index orders the missions around it differently, which is explained in the blur.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the objectives, the reward, the choice advice and the Psycho rating warning are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter. No source gives a playtime.",
      "PowerPyx's objective list has eighteen entries. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 22?",
        answer: "Push Square, PC Gamer and GameSpot all list it 22nd in Chapter 3 under the same name (Confirmed). Push Square makes it the 57th overall and PowerPyx the 68th using its own count (Reported).",
      },
      {
        question: "When does Chapter 3 Mission 22 unlock?",
        answer: "PowerPyx says it needs Chapter 3 Mission 20 done. The start point is in the blurred section (Reported).",
      },
      {
        question: "What does Chapter 3 Mission 22 reward?",
        answer: "According to PowerPyx, a unique pistol and $1,500, but only if you complete the optional minigame at the end (Reported).",
      },
      {
        question: "Can I repeat the minigame?",
        answer: "Yes. PowerPyx says you can practise as many times as you like before quitting, which finishes the mission (Reported).",
      },
      {
        question: "How do I keep a clean criminal rating in this mission?",
        answer: "PowerPyx says to avoid hitting the bystanders and scenery the game points out during the chase. The specifics are in the blurred section (Reported).",
      },
    ],
    sources: [
      pp("gta-6-safe-word-steal-the-practice-safe-walkthrough", "Requirement, playable leads, start, objectives, steps, minigame, reward and rating warnings"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission, its heist grouping and the no-replay note"),
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T20:18:43+10:00",
  },
  {
    slug: "chapter-3-mission-23",
    hidden: true,
    chapter: 3,
    chapterOrder: 23,
    order: 58,
    name: "Chapter 3, Mission 23",
    seoTitle: "GTA 6 Chapter 3 Mission 23 Walkthrough & Tips",
    seoDescription:
      "GTA 6 Chapter 3 Mission 23 walkthrough: when it unlocks, all three objectives, the scripted driving and prompts, the getaway and the weapon reward.",
    teaser: "The twenty-third mission of Chapter 3, with just three objectives, a scripted opening, a getaway and a unique melee weapon as the reward.",
    intro: [
      "This is the twenty-third mission of Chapter 3 and the 58th overall in Push Square's list. Push Square, PC Gamer and GameSpot all list it 23rd in Chapter 3 under the same name (Confirmed), but the overall number is Reported. PowerPyx lists three objectives, says either lead can start it, and says most of the first part is scripted.",
      "After the scripted opening it turns into a getaway. PowerPyx's advice is to keep driving until nobody is chasing you and you are outside the red area on the map, then drop the car off. The reward is a unique melee weapon and no cash.",
      "Our mission list keeps Chapter 2 and later names behind a blur, so this page uses a neutral title. The mission's name, the premise, the people, the places and the step-by-step all stay behind the blur.",
    ],
    facts: [
      { label: "Chapter", value: "Chapter 3, and the 23rd mission of the chapter in Push Square's, PC Gamer's and GameSpot's lists, under the same name", status: "confirmed" },
      { label: "Number", value: "58th overall (Push Square). PowerPyx calls it the 70th main mission using its own count.", status: "reported" },
      { label: "Unlocks after", value: "PowerPyx's requirement line names Chapter 3, Mission 19, with a message from a contact about a couple of in-game days later. Push Square, PC Gamer and GameSpot list Missions 20 to 22 between the two.", status: "reported" },
      { label: "Starts", value: "You go to a set meeting point after the message. Where is in the blur (PowerPyx).", status: "reported" },
      { label: "Playable as", value: "Either lead can start it (PowerPyx)", status: "reported" },
      { label: "Objectives", value: "Three (PowerPyx)", status: "reported" },
      { label: "Reward", value: "A unique melee weapon, no cash (PowerPyx)", status: "reported" },
    ],
    objectives: [
      "Shoot the music video. After meeting up, most of this section is scripted and you control Lucia. While she drives, hold the prompted button to keep the car moving, then use the stick to shift around the circle you are driving in. After the drive through the city, the car stops: get out, press the prompt to pull the guy off Roxy, then fight the other guy who comes at you (Reported, PowerPyx).",
      "Join in on the car. After recording the girls beating up the car, they hand Lucia a bat and you can take some swings at it too. Finally, use the prompt to shake the spray can, then spray the side of the car (Reported, PowerPyx).",
      "Escape with DWNPLY's car. DWNPLY and his crew show up and you need to run away from them. PowerPyx says that, like when you stole it before, you just keep driving until you lose all the cars chasing you and get outside the red danger area on the map (Reported, PowerPyx).",
      "Drive to the studio. After escaping, drive to the studio to drop the car off. Arriving completes the mission (Reported, PowerPyx).",
      "PowerPyx's objective wording is: Shoot the music video, Escape with DWNPLY's car, Drive to the studio (Reported, PowerPyx).",
    ],
    spoiler:
      "The mission is called Cooties in our mission list, Push Square's list, PC Gamer's list and GameSpot's list, and all four number it 23rd in Chapter 3. PC Gamer's one-line summary is that Lucia makes a music video (Confirmed for the name and chapter). PowerPyx shows the map label Shoot the Music Video. In its quest description, Lucia helps Dre'Quan and the Dimez film a music video for their song Cooties, trashing DWNPLY's car and humiliating him in the process (Reported). PowerPyx lists Chapter 3, Mission 19 (Ride or Die) as the requirement and says either Lucia or Jason can start it, but you control Lucia during the shoot. After the requirement, Dre'Quan contacts you after a couple of in-game days to shoot the video, and you head to a location in Crosstown, Vice City (Reported). The reward is a variant weapon, Bae-Luxe's Bat (Reported). PowerPyx gives its own count as the 70th main mission (Reported). Order: PowerPyx's index lists it after The Missing Link and two optional side missions, and its requirement line names only Ride or Die, the 19th mission on our hub. PowerPyx's index also says missions can appear in a slightly different order. Push Square, PC Gamer and GameSpot all list it 23rd in Chapter 3, so our hub follows them (Reported).",
    tips: [
      { text: "Expect a scripted opening. PowerPyx says most of the first section is scripted and runs on short prompts (Reported).", reported: true },
      { text: "In the getaway, keep driving until nobody is chasing you. PowerPyx says you are clear once every pursuer is gone and you are outside the red area on the map (Reported).", reported: true, link: { href: "/guides/wanted", label: "Wanted system" } },
      { text: "Make a manual save before you start. PowerPyx and Push Square say story missions can't be replayed, and PowerPyx suggests a manual save at the start and end of each chapter (Confirmed).", reported: false, link: { href: "/guides/saving", label: "How to save" } },
    ],
    notes: [
      "Order: Push Square, PC Gamer and GameSpot all list this 23rd in Chapter 3. The overall number follows Push Square. PowerPyx calls it the 70th main mission using its own count, and its index places it differently, which is explained in the blur.",
      "PowerPyx is the only full walkthrough for this mission so far, so the start, the steps, the objectives, the reward and the escape rule are labelled Reported. Push Square, PC Gamer and GameSpot confirm the name and chapter. No source gives a playtime.",
      "PowerPyx's objective list has three entries. It hasn't been checked against the on-screen prompts.",
    ],
    faq: [
      {
        question: "Which mission number is Chapter 3 Mission 23?",
        answer: "Push Square, PC Gamer and GameSpot all list it 23rd in Chapter 3 under the same name (Confirmed). Push Square makes it the 58th overall and PowerPyx the 70th using its own count (Reported).",
      },
      {
        question: "When does Chapter 3 Mission 23 unlock?",
        answer: "PowerPyx says it appears a couple of in-game days after you finish Chapter 3 Mission 19, once a contact gets in touch. The start point is in the blurred section (Reported).",
      },
      {
        question: "What does Chapter 3 Mission 23 reward?",
        answer: "According to PowerPyx, a unique melee weapon and no cash (Reported).",
      },
      {
        question: "How do I escape in Chapter 3 Mission 23?",
        answer: "PowerPyx says to keep driving until you've lost every pursuer and left the red area on the map, then drop the car off (Reported).",
      },
    ],
    sources: [
      pp("gta-6-cooties-shoot-the-music-video-walkthrough", "Requirement, playable leads, start, objectives, steps, escape rule and reward"),
      pp("gta-6-full-walkthrough-all-missions", "Where PowerPyx's own list places the mission, its order note and the no-replay note"),
      PCGAMER,
      {
        id: "gamespot",
        label: "GameSpot: How long to beat GTA 6, full missions list",
        url: "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
        used: "Mission name and Chapter 3 order. No playtime used.",
      },
      PUSHSQUARE,
    ],
    sourceLabel: "PowerPyx, PC Gamer, GameSpot, Push Square",
    updated: "2026-11-20T20:18:43+10:00",
  },
];

/** Chapter a mission belongs to (Chapter 1 unless stated). */
/** Push Square entries that sit in a chapter's numbering but are covered as standalone side jobs, so no "coming soon" note. */
export const NON_CHAIN_ENTRIES: Record<number, number[]> = { 3: [9] };
export const missionChapter = (m: Mission) => m.chapter ?? 1;
/** Position of a mission inside its chapter. */
export const missionChapterOrder = (m: Mission) => m.chapterOrder ?? m.order;

export const missionPath = (slug: string) => `/guides/missions/${slug}`;
export const missionBySlug = (slug: string) => MISSIONS.find((m) => m.slug === slug);
