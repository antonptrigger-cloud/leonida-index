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
      { label: "Reward", value: "Jason's house in Key Lento", status: "reported" },
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
        answer: "PowerPyx lists Jason's house in Key Lento as the reward (Reported).",
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
    sources: [PCGAMER, PRESSSTART, pp("gta-6-gone-fishing-walkthrough", PP_FACTS), PP_INDEX, PUSHSQUARE, ROCKSTAR],
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
      { label: "Reward", value: "Police scanner app and $150", status: "reported" },
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
    notes: ["The scanner and the $150 come from a single walkthrough. We will confirm both after launch."],
    faq: [
      {
        question: "What do you get for Unwanted Attention?",
        answer: "PowerPyx lists a police radio scanner on Jason's phone and $150. Both come from that one walkthrough, so we are treating them as unconfirmed for now (Reported).",
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
    sources: [PCGAMER, PRESSSTART, pp("gta-6-unwanted-attention-go-see-cal-walkthrough", PP_FACTS), PP_INDEX, ROCKSTAR],
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
];

export const missionPath = (slug: string) => `/guides/missions/${slug}`;
export const missionBySlug = (slug: string) => MISSIONS.find((m) => m.slug === slug);
