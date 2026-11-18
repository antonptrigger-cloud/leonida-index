/**
 * GTA 6 Chapter 1 mission guides.
 *
 * Drafted by Leonida Guides, QC'd against the cited sources on 18 Nov 2026 (pre-launch).
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
  | "aprasi";

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

export const CHAPTER = {
  number: 1,
  name: "Just Like Paradise",
};

export const ORDER_NOTE =
  "Order is a suggestion. PC Gamer and Press Start (from the in-game Story Recap) list Just a Scratch before Lab Fees, and count the Prologue as Chapter 1's first mission. PowerPyx lists Lab Fees first and gives the Prologue its own heading. According to PowerPyx, Gear Up, Lab Fees, Just a Scratch and Unwanted Attention all open up once Gone Fishing is done, so you can play them in any order.";

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
    sources: [PCGAMER, PRESSSTART, pp("gta-6-prologue-walkthrough", PP_FACTS), PP_INDEX, ROCKSTAR],
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
    sources: [PCGAMER, PRESSSTART, pp("gta-6-gone-fishing-walkthrough", PP_FACTS), PP_INDEX, ROCKSTAR],
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
    sources: [PCGAMER, PRESSSTART, pp("gta-6-gear-up-pick-up-another-gun-walkthrough", PP_FACTS), PP_INDEX, APRASI],
  },
  {
    slug: "lab-fees",
    order: 4,
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
    sources: [PCGAMER, PRESSSTART, pp("gta-6-lab-fees-collect-brians-rent-walkthrough", PP_FACTS), PP_INDEX, ROCKSTAR],
  },
  {
    slug: "just-a-scratch",
    order: 5,
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
    sources: [PCGAMER, PRESSSTART, pp("gta-6-just-a-scratch-fix-your-car-walkthrough", PP_FACTS), PP_INDEX],
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
      { label: "Unlocks", value: "After Gear Up, Lab Fees, Just a Scratch and Unwanted Attention", status: "reported" },
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
    ],
    sources: [PCGAMER, PRESSSTART, pp("gta-6-island-dreams-work-for-kenton-walkthrough", PP_FACTS), PP_INDEX],
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
    sources: [PCGAMER, PRESSSTART, pp("gta-6-feng-shui-meet-cal-walkthrough", PP_FACTS), PP_INDEX],
  },
];

export const missionPath = (slug: string) => `/guides/missions/${slug}`;
export const missionBySlug = (slug: string) => MISSIONS.find((m) => m.slug === slug);
