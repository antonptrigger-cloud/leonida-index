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
  | "pcgamerAch";

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
  /** Position in the suggested order (see ORDER_NOTE). */
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
  tips: { text: string; reported?: boolean }[];
  notes?: string[];
  /** Optional real Q&A, rendered visibly by <Faq> (which also emits FAQPage JSON-LD). Never invent questions. */
  faq?: { question: string; answer: string }[];
  sources: MissionSource[];
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
    updated: "2026-11-19T13:12:51+10:00",
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
];

export const missionPath = (slug: string) => `/guides/missions/${slug}`;
export const missionBySlug = (slug: string) => MISSIONS.find((m) => m.slug === slug);
