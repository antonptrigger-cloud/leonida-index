/**
 * GTA 6 character profiles (batch 1).
 *
 * Drafted by Leonida Database, QC'd by Master on 18 Nov 2026 (pre-launch).
 * Rules for this file:
 * - "Confirmed" means Rockstar's own "Only in Leonida" profile (or its game overview) says so.
 * - "To be confirmed" means we only have secondary reporting, or nothing yet. We re-check
 *   everything against the finished game after launch.
 * - Wording is our own. Quotes are single short lines, attributed to Rockstar.
 * - Anything that gives away footage or story beats lives in `spoiler`, which the page
 *   renders behind the reveal pattern used by the mission guides.
 * - Official Rockstar stills from the Only in Leonida People pages are stored as
 *   compressed webp and credited "© Rockstar Games". We do not use images with
 *   Rockstar logos, and we do not use leaked material.
 *
 * Batch 2 (contacts and fences) adds characters Rockstar has not profiled. Those carry
 * `tier: "reported"`: every claim comes from launch-eve guides (GameSpot, PowerPyx) and is
 * shown as Reported, never Confirmed. A reported profile needs at least two independent
 * established outlets. Mission names, rewards and plot beats live in `spoiler`.
 *
 * This file must not import from src/lib/seo (site.ts imports it to build ROUTES).
 */

import { BATCH4_CHARACTERS, BATCH4_SOURCES } from "@/lib/characters/batch4";

type LegacyCharSourceId =
  | "rockstar-profiles"
  | "rockstar-home"
  | "rockstar-credits"
  | "wikipedia-extended-look"
  | "gamespot-money"
  | "pp-fences"
  | "pp-island-dreams"
  | "pp-moses"
  | "pp-key-cloner"
  | "pp-slam-dunk"
  | "pp-spin-on-this"
  | "ap-root"
  | "gamespot-root"
  | "polygon-root"
  | "tga-best-performance"
  | "verge-perez"
  | "polygon-perez"
  | "vice-perez";

export type CharSourceId = LegacyCharSourceId | keyof typeof BATCH4_SOURCES;

export interface CharSource {
  id: CharSourceId;
  label: string;
  url: string;
  /** What we used it for. */
  used: string;
  /** Rockstar's own pages are primary; everything else is secondary. */
  primary: boolean;
}

export interface CharFact {
  label: string;
  value: string;
  status: "confirmed" | "tbc" | "reported";
}

export interface Relation {
  /** Display name. */
  name: string;
  /** Slug of a profile on this site, when there is one. */
  slug?: string;
  note: string;
}

export type CharGroup = "leads" | "vice-city" | "keys" | "contacts" | "side-quests";

export interface Character {
  slug: string;
  name: string;
  /**
   * "rockstar" (default): backed by Rockstar's own profile text.
   * "reported": Rockstar has published nothing; everything is Reported from launch-eve guides.
   */
  tier?: "rockstar" | "reported";
  /** Page title when "<name> (GTA 6 Character)" is not the best fit (60 characters or fewer). */
  seoTitle?: string;
  group: CharGroup;
  /** One-line role shown on cards. */
  role: string;
  /** Monogram for the placeholder card. */
  initials: string;
  /** Card accent: tints the gradient placeholder. */
  accent: "pink" | "blue" | "orange" | "turq";
  seoDescription: string;
  /** One short line Rockstar uses for the character, quoted and attributed. Omit when Rockstar has none. */
  quote?: string;
  /** Non-spoiler summary in our own words, safe to show by default. */
  summary: string;
  /** Longer background paragraphs, still non-spoiler. */
  background: string[];
  facts: CharFact[];
  relationships: Relation[];
  /** Spoiler: footage and story beats reported in secondary sources. Blurred on the page. */
  spoiler?: string[];
  /** Heading for the blurred block (default "Seen in footage"). */
  spoilerTitle?: string;
  /** Provenance line under the spoiler heading. */
  spoilerNote?: string;
  /** Optional link shown inside the blurred block, e.g. the matching mission guide. */
  spoilerLink?: { href: string; label: string };
  /** Open questions, each shown with a "To be confirmed" tag. */
  tbc: string[];
  sourceIds: CharSourceId[];
  /** ISO date of this profile's last edit, when it differs from LAST_VERIFIED (batch 4 onwards). */
  updated?: string;
  /** Source line for the page header, when "GameSpot and PowerPyx (not Rockstar)" is not right. */
  sourceLine?: string;
  /** Replaces REPORTED_NOTE on reported profiles. */
  reportedNote?: string;
  /** Map pages that cover this character. Only routes that exist under /map. */
  mapLinks?: { href: string; label: string; status: "confirmed" | "reported" | "tbc"; note?: string }[];
  /** Optional real Q&A, rendered visibly by <Faq> (which also emits FAQPage JSON-LD). Never invent questions. */
  faq?: { question: string; answer: string }[];
  /** Official Rockstar still from Only in Leonida, stored locally as compressed webp. */
  portrait?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    credit: "© Rockstar Games";
  };
}

export const LAST_VERIFIED = "2026-11-22";
export const LAST_VERIFIED_LABEL = "22 Nov 2026";

const BASE_SOURCES: Record<LegacyCharSourceId, CharSource> = {
  "rockstar-profiles": {
    id: "rockstar-profiles",
    label: "Rockstar Games: Only in Leonida",
    url: "https://www.rockstargames.com/VI/only-in-leonida",
    used: "Official character profiles: backgrounds, relationships, taglines and quotes",
    primary: true,
  },
  "rockstar-home": {
    id: "rockstar-home",
    label: "Rockstar Games: Grand Theft Auto VI",
    url: "https://www.rockstargames.com/VI",
    used: "Official game overview and the 19 November 2026 release date",
    primary: true,
  },
  "rockstar-credits": {
    id: "rockstar-credits",
    label: "Rockstar Games: Grand Theft Auto VI credits",
    url: "https://www.rockstargames.com/VI/credits",
    used: "Official post-launch credits, checked 22 Nov 2026: performer names and credited character names",
    primary: true,
  },
  "wikipedia-extended-look": {
    id: "wikipedia-extended-look",
    label: "Wikipedia: Grand Theft Auto VI: An Extended Look",
    url: "https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI:_An_Extended_Look",
    used: "Secondary plot summary of the 27-minute Extended Look video (blurred spoiler section only)",
    primary: false,
  },
  "gamespot-money": {
    id: "gamespot-money",
    label: "GameSpot: Best Ways To Make Money Fast In GTA 6 (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/best-ways-to-make-money-fast-in-gta-6/",
    used: "Describes the fences and contacts (Kenton, Randy, Tyrone and others) and what each offers",
    primary: false,
  },
  "pp-fences": {
    id: "pp-fences",
    label: "PowerPyx: GTA 6 All Fence Locations (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-all-fence-locations-how-to-fence-stolen-goods/",
    used: "Where each fence is, what they buy and what they pay",
    primary: false,
  },
  "pp-island-dreams": {
    id: "pp-island-dreams",
    label: "PowerPyx: Island Dreams (Work for Kenton) walkthrough (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-island-dreams-work-for-kenton-walkthrough/",
    used: "Kenton's name, shop and first mission (blurred spoiler section)",
    primary: false,
  },
  "pp-moses": {
    id: "pp-moses",
    label: "PowerPyx: Moses (Take A Vehicle to Moses) walkthrough (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-moses-take-a-vehicle-to-moses-walkthrough/",
    used: "Moses's shop, rules and first mission (blurred spoiler section)",
    primary: false,
  },
  "pp-key-cloner": {
    id: "pp-key-cloner",
    label: "PowerPyx: How to Get the Key Cloner (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-how-to-get-key-cloner/",
    used: "Randy's first mission and the Key Cloner unlock (blurred spoiler section)",
    primary: false,
  },
  "pp-slam-dunk": {
    id: "pp-slam-dunk",
    label: "PowerPyx: Slam Dunk walkthrough (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-slam-dunk-walkthrough/",
    used: "Dunk's trailer and his first mission (blurred spoiler section)",
    primary: false,
  },
  "ap-root": {
    id: "ap-root",
    label: "AP Entertainment (YouTube): Stephen Root confirms his role in Grand Theft Auto VI (posted 13 Sep 2026, US Pacific)",
    url: "https://www.youtube.com/watch?v=kTFxs3AcBCQ",
    used: "Root's own words: he says he is in the game. He does not name the character in the clip",
    primary: false,
  },
  "gamespot-root": {
    id: "gamespot-root",
    label: "GameSpot: First GTA 6 Actor Officially Confirmed",
    url: "https://www.gamespot.com/articles/first-gta-6-actor-officially-confirmed-and-its-a-big-name/",
    used: "Reports Root's AP comments and says he plays Brian Heder, while noting he did not say so in the clip",
    primary: false,
  },
  "polygon-root": {
    id: "polygon-root",
    label: "Polygon: GTA 6 actor beats Rockstar to the punch with surprise reveal (14 Sep 2026)",
    url: "https://www.polygon.com/gta-6-first-actor-confirmed-stephen-root-widows-bay/",
    used: "Reports Root's AP comments and says he is playing Brian Heder",
    primary: false,
  },
  "tga-best-performance": {
    id: "tga-best-performance",
    label: "The Game Awards: Best Performance nominees 2026",
    url: "https://thegameawards.com/categories/best-performance",
    used: "Official nominee list. It names Manni L. Perez next to Grand Theft Auto VI and does not name a character",
    primary: false,
  },
  "verge-perez": {
    id: "verge-perez",
    label: "The Verge: GTA VI's voice actor for Lucia was revealed by... The Game Awards (17 Nov 2026)",
    url: "https://www.theverge.com/games/1035602/gta-vis-voice-actor-for-lucia-was-revealed-by-the-game-awards",
    used: "Reports that the Game Awards nominee video lists Perez for her work in the game, and that Rockstar has not named its leads' performers",
    primary: false,
  },
  "polygon-perez": {
    id: "polygon-perez",
    label: "Polygon: GTA 6's rumored Lucia actor confirmed for cast by Game Awards nomination",
    url: "https://www.polygon.com/gta-6-lucia-actor-confirmed-game-awards-2026/",
    used: "Says the nomination does not name Perez's role and that Rockstar has confirmed no cast members",
    primary: false,
  },
  "vice-perez": {
    id: "vice-perez",
    label: "VICE: GTA 6 earns 8 nominations at The Game Awards",
    url: "https://www.vice.com/en/article/gta-6-earns-8-nominations-at-the-game-awards-and-confirms-manni-l-perez-performance/",
    used: "Notes that Perez has not technically been confirmed as playing Lucia",
    primary: false,
  },
  "pp-spin-on-this": {
    id: "pp-spin-on-this",
    label: "PowerPyx: Spin On This (Shut Down the Labs) walkthrough (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-spin-on-this-shut-down-the-labs-walkthrough/",
    used: "Tyrone's side-mission series (blurred spoiler section)",
    primary: false,
  },
};

export const GROUPS: { id: CharGroup; title: string; blurb: string }[] = [
  { id: "leads", title: "The leads", blurb: "The two characters you play." },
  { id: "keys", title: "The Keys", blurb: "Jason's world: boats, bars and small-time smuggling." },
  { id: "vice-city", title: "Vice City", blurb: "Music, clubs and big scores." },
  { id: "side-quests", title: "Side-quest characters", blurb: "People who hand out Strangers & Freaks side quests. Rockstar has not profiled them, so everything is Reported by launch-day guides." },
  { id: "contacts", title: "Contacts and fences", blurb: "The people who buy stolen goods and hand out side work. Reported by launch-eve guides, not profiled by Rockstar." },
];

export const CHARACTER_NOTE =
  "Rockstar has published eight short People profiles on Only in Leonida, and official credits since launch. Everything marked Confirmed comes from those Rockstar pages, retold in our own words. Official stills on the profile pages are credited © Rockstar Games. The contacts and fences still have no People profiles, so guide claims about them stay Reported and attributed to GameSpot or PowerPyx, while a name or performer listed in the official credits is marked Confirmed. Anything we could not find is marked To be confirmed.";

export const REPORTED_NOTE =
  "Rockstar has not published a profile for this character. Everything below comes from launch-eve guides by GameSpot and PowerPyx and is marked Reported. Story and mission details are blurred.";

const BASE_CHARACTERS: Character[] = [
  {
    slug: "jason-duval",
    name: "Jason Duval",
    group: "leads",
    role: "Playable lead",
    initials: "JD",
    accent: "blue",
    seoDescription:
      "Jason Duval in GTA 6: the ex-Army playable lead who runs errands for Keys drug runners and wants a quieter life. His ties to Lucia, Brian and Cal.",
    quote: "Jason wants an easy life, but things just keep getting harder.",
    summary:
      "Jason is one of the two characters you play in GTA 6. He is an ex-soldier who wants a calm life and keeps being pulled back into crime.",
    background: [
      "Rockstar says Jason grew up around hustlers and thieves. He joined the Army to leave a rough youth behind, then ended up in the Keys running errands for local drug runners because that was the work he knew. Rockstar adds that he may be ready to change course.",
      "His story is tied to Lucia's. Rockstar describes their meeting as a gamble: it could turn out very well or very badly for him, and he has a preferred outcome in mind. In the game's official overview, a simple job goes wrong for the pair and drops them into a criminal conspiracy that spreads across Leonida, with each relying on the other to get through it.",
    ],
    facts: [
      { label: "Role", value: "Playable lead, alongside Lucia Caminos", status: "confirmed" },
      { label: "Background", value: "Served in the Army; grew up around con artists and criminals", status: "confirmed" },
      { label: "Work", value: "Runs jobs for local drug runners in the Keys", status: "confirmed" },
      { label: "Home", value: "Lives rent-free in a property owned by Brian Heder", status: "confirmed" },
      { label: "Location", value: "Leonida Keys", status: "confirmed" },
      { label: "Age and appearance", value: "Not given in Rockstar's text", status: "tbc" },
      { label: "Performer", value: "Dylan Rourke, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Lucia Caminos", slug: "lucia-caminos", note: "Co-lead and partner. Rockstar treats their meeting as a turning point for him." },
      { name: "Brian Heder", slug: "brian-heder", note: "Landlord, and the man he does favours for. The rent is free in exchange for help with local shakedowns." },
      { name: "Cal Hampton", slug: "cal-hampton", note: "Friend, and another of Brian's associates." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video has Jason and Lucia collecting a drug pickup for Boobie Ike that is interrupted by a police raid, then taking a job from Brian over dinner while Brian tells Jason not to sink further into crime.",
      "The same summary has the pair driving getaway for Raul Bautista after one of his robberies, and Raul inviting them into his crew afterwards.",
    ],
    tbc: [
      "Age, height and other physical details.",
      "How his story plays out beyond what Rockstar's public profile says.",
    ],
    updated: "2026-11-22",
    portrait: {
      src: "/characters/jason-duval.webp",
      width: 1600,
      height: 900,
      alt: "Jason Duval astride a green motorcycle under palm trees, an official Rockstar Games screenshot",
      credit: "© Rockstar Games",
    },
    sourceIds: ["rockstar-profiles", "rockstar-home", "rockstar-credits", "wikipedia-extended-look"],
  },
  {
    slug: "lucia-caminos",
    name: "Lucia Caminos",
    group: "leads",
    role: "Playable lead",
    initials: "LC",
    accent: "pink",
    seoDescription:
      "Lucia Caminos in GTA 6: the fighter fresh out of Leonida Penitentiary with a plan. What Rockstar says about her past, her family and her partnership with Jason.",
    quote: "The only thing that matters is who you know and what you got.",
    summary:
      "Lucia is the second playable lead of GTA 6: a fighter fresh out of prison who is determined to make her own luck this time.",
    background: [
      "Rockstar says Lucia's father started teaching her to fight almost as soon as she could walk, and life has kept hitting back ever since. Standing up for her family sent her to Leonida Penitentiary. She got out through a lucky break and has decided to be far more careful with every move from now on.",
      "Her mother has long dreamed of a better life, a dream that goes back to the family's years in Liberty City. Lucia wants to make it real through her own plan rather than wishful thinking, and Rockstar says she will do whatever it takes. It also frames a life with Jason as a possible way out for her.",
    ],
    facts: [
      { label: "Role", value: "Playable lead, alongside Jason Duval", status: "confirmed" },
      { label: "Past", value: "Served time in Leonida Penitentiary after defending her family", status: "confirmed" },
      { label: "Status", value: "Recently released, according to Rockstar's profile", status: "confirmed" },
      { label: "Family", value: "Her mother's dream of a better life dates from the family's time in Liberty City", status: "confirmed" },
      { label: "Crime and sentence length", value: "Not specified by Rockstar", status: "tbc" },
      { label: "Parents' names, age and appearance", value: "Not given in Rockstar's People profile", status: "tbc" },
      { label: "Performer", value: "Manni L. Perez, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Jason Duval", slug: "jason-duval", note: "Co-lead and partner. Rockstar presents the partnership as a potential escape for her." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video has Lucia working jobs with Jason, including the getaway drive for Raul Bautista and a stint protecting guests at a party, which sets up the pair as contractors with a growing reputation.",
    ],
    tbc: [
      "Where she was born. Rockstar only ties her family's earlier years to Liberty City.",
      "What she was convicted of and how long the sentence was.",
    ],
    updated: "2026-11-22",
    portrait: {
      src: "/characters/lucia-caminos.webp",
      width: 1600,
      height: 900,
      alt: "Lucia Caminos striking a punching bag in a gym, an official Rockstar Games screenshot",
      credit: "© Rockstar Games",
    },
    sourceIds: ["rockstar-profiles", "rockstar-home", "rockstar-credits", "wikipedia-extended-look", "tga-best-performance", "polygon-perez"],
  },
  {
    slug: "cal-hampton",
    name: "Cal Hampton",
    group: "keys",
    role: "Jason's friend",
    initials: "CH",
    accent: "turq",
    seoDescription:
      "Cal Hampton in GTA 6: Jason's conspiracy-minded friend in the Leonida Keys, who monitors Coast Guard radio from home. What Rockstar says about him.",
    quote: "What if everything on the internet was true?",
    summary:
      "Cal is Jason's friend in the Keys, a stay-at-home conspiracy theorist who is happy with his small corner of the world.",
    background: [
      "Cal belongs to Brian Heder's circle, but he is happiest indoors, with a few beers within reach, listening to Coast Guard radio chatter while a stack of private browser tabs stays open. Rockstar describes him as sitting at the low tide of America and perfectly content there.",
      "He is a friend of Jason's, and Rockstar notes that Jason has bigger plans than Cal's easygoing paranoia.",
    ],
    facts: [
      { label: "Role", value: "Supporting character; Jason's friend", status: "confirmed" },
      { label: "Affiliation", value: "Associate of Brian Heder", status: "confirmed" },
      { label: "Habits", value: "Stays home, monitors Coast Guard radio, keeps private browser tabs open", status: "confirmed" },
      { label: "Age and appearance", value: "Not given in Rockstar's text", status: "tbc" },
      { label: "Location", value: "Leonida Keys", status: "confirmed" },
      { label: "Exact mission role", value: "Not stated by Rockstar", status: "tbc" },
      { label: "Performer", value: "Bobby Moynihan, listed in Rockstar's official credits as Cal", status: "confirmed" },
    ],
    relationships: [
      { name: "Jason Duval", slug: "jason-duval", note: "Close friend. Jason is the more ambitious of the two." },
      { name: "Brian Heder", slug: "brian-heder", note: "Fellow associate in the Keys." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video closes with Cal telling Jason and Lucia to enjoy their time as young adults.",
    ],
    tbc: ["What Cal does in the missions."],
    updated: "2026-11-22",
    portrait: {
      src: "/characters/cal-hampton.webp",
      width: 1600,
      height: 900,
      alt: "Cal Hampton on a mini-golf course in a Hawaiian shirt and bucket hat, an official Rockstar Games screenshot",
      credit: "© Rockstar Games",
    },
    sourceIds: ["rockstar-profiles", "rockstar-credits", "wikipedia-extended-look"],
  },
  {
    slug: "brian-heder",
    name: "Brian Heder",
    group: "keys",
    role: "Keys drug runner",
    initials: "BH",
    accent: "orange",
    seoDescription:
      "Brian Heder in GTA 6: the veteran Keys drug runner who runs a boat yard with his wife Lori and lets Jason live rent-free. What Rockstar has said so far.",
    quote: "Looks like a Leonida beach bum — moves like a great white shark.",
    summary:
      "Brian is an old-school smuggler in the Keys who looks laid back and plays rough. He is Jason's landlord, and Jason does work for him.",
    background: [
      "Rockstar calls Brian a classic drug runner from the Keys' smuggling heyday. He still moves product through his boat yard, which he runs with his third wife, Lori, but at this stage he gets other people to take the risks.",
      "Jason lives in one of Brian's properties for free. In return he helps Brian lean on locals and turns up now and then for Lori's sangria. Rockstar's featured line from Brian is a boast about how much marijuana he once flew in on a plane.",
    ],
    facts: [
      { label: "Role", value: "Supporting character; veteran drug runner", status: "confirmed" },
      { label: "Base", value: "A boat yard in the Keys", status: "confirmed" },
      { label: "Family", value: "Third wife, Lori", status: "confirmed" },
      { label: "Link to Jason", value: "Lets him live rent-free in return for help with local shakedowns", status: "confirmed" },
      { label: "Age and appearance", value: "Rockstar only says he looks like a beach bum", status: "tbc" },
      { label: "Performer", value: "Stephen Root, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Jason Duval", slug: "jason-duval", note: "Landlord, and the man Jason does favours for." },
      { name: "Cal Hampton", slug: "cal-hampton", note: "Another associate in his circle." },
      { name: "Lori Heder", slug: "lori", note: "His third wife. Rockstar's People profile names her Lori; the official credits list Lori Heder." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video has Brian handing Jason and Lucia a job over dinner and warning Jason against sinking deeper into crime.",
    ],
    tbc: ["How central Brian is to the main story."],
    updated: "2026-11-22",
    portrait: {
      src: "/characters/brian-heder.webp",
      width: 1600,
      height: 900,
      alt: "Brian Heder leaning from a truck window in the Keys, an official Rockstar Games screenshot",
      credit: "© Rockstar Games",
    },
    sourceIds: ["rockstar-profiles", "rockstar-credits", "wikipedia-extended-look", "ap-root", "gamespot-root", "polygon-root"],
  },
  {
    slug: "boobie-ike",
    name: "Boobie Ike",
    group: "vice-city",
    role: "Vice City businessman",
    initials: "BI",
    accent: "pink",
    seoDescription:
      "Boobie Ike in GTA 6: the Vice City legend with a real-estate, strip club and studio empire, and co-owner of Only Raw Records. What Rockstar has said about him.",
    quote: "It's all about heart — the Jack of Hearts.",
    summary:
      "Boobie Ike is a Vice City local legend who turned his street years into a business empire, and he knows how good his reputation is.",
    background: [
      "Rockstar says Boobie is one of the few people to turn a past on the streets into a legitimate-looking operation spanning real estate, a strip club and a recording studio. He is friendly right up until money is on the table.",
      "The venture he cares about most is Only Raw Records, which he runs with the young, ambitious Dre'Quan Priest. A hit is what the label is missing. In his featured line, the club pays for the studio and drug money pays for everything.",
    ],
    facts: [
      { label: "Role", value: "Supporting character; Vice City businessman", status: "confirmed" },
      { label: "Businesses", value: "Real estate, a strip club and a recording studio", status: "confirmed" },
      { label: "Label", value: "Only Raw Records, with Dre'Quan Priest", status: "confirmed" },
      { label: "The Jack of Hearts", value: "Rockstar's tagline for him refers to it; the page does not say what it is", status: "tbc" },
      { label: "Location", value: "Vice City", status: "confirmed" },
      { label: "Full name or nickname", value: "Not stated beyond Boobie Ike", status: "tbc" },
      { label: "Performer", value: "Mike Forbs, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Dre'Quan Priest", slug: "dre-quan-priest", note: "Business partner in Only Raw Records. Dre'Quan books acts into Boobie's club." },
      { name: "Real Dimez", slug: "real-dimez", note: "The label's newly signed act." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video names Boobie as the client for Jason and Lucia's first drug pickup in Vice City.",
    ],
    tbc: [
      "Whether the Jack of Hearts is the name of his club, and how it fits into the game. Rockstar's tagline uses the phrase; the People page does not spell it out.",
      "Whether he appears in trailer footage beyond what the Extended Look summary describes.",
    ],
    updated: "2026-11-22",
    portrait: {
      src: "/characters/boobie-ike.webp",
      width: 1600,
      height: 900,
      alt: "Boobie Ike seated in an office, counting a stack of cash, an official Rockstar Games screenshot",
      credit: "© Rockstar Games",
    },
    sourceIds: ["rockstar-profiles", "rockstar-credits", "wikipedia-extended-look"],
  },
  {
    slug: "dre-quan-priest",
    name: "Dre'Quan Priest",
    group: "vice-city",
    role: "Aspiring music mogul",
    initials: "DP",
    accent: "orange",
    seoDescription:
      "Dre'Quan Priest in GTA 6: the hustler-turned-label-boss behind Only Raw Records, who signed Real Dimez. What Rockstar says about his plans in Vice City.",
    quote: "Dancers are like my A&Rs.",
    summary:
      "Dre'Quan is a hustler with a record label to build. He sees himself as more of an entrepreneur than a gangster.",
    background: [
      "Rockstar says Dre'Quan was always more hustler than gangster. Street dealing paid the bills, but music was the plan all along.",
      "He now runs Only Raw Records with Boobie Ike and has signed the duo Real Dimez, hoping they deliver a breakout hit. Until now he has booked acts into Boobie's strip club, but Rockstar suggests that arrangement may not last as he aims for the wider Vice City music scene. In his featured line he treats the club's dancers as his talent scouts.",
    ],
    facts: [
      { label: "Role", value: "Supporting character; aspiring music mogul", status: "confirmed" },
      { label: "Label", value: "Only Raw Records, with Boobie Ike", status: "confirmed" },
      { label: "Signed act", value: "Real Dimez", status: "confirmed" },
      { label: "Spelling", value: "Written Dre'Quan on Rockstar's own page", status: "confirmed" },
      { label: "Age and appearance", value: "Not given in Rockstar's text", status: "tbc" },
      { label: "Location", value: "Vice City", status: "confirmed" },
      { label: "Link to the leads", value: "Not stated by Rockstar", status: "tbc" },
      { label: "Performer", value: "Naiqui Macabroad, listed in Rockstar's official credits as Dre'Quan", status: "confirmed" },
    ],
    relationships: [
      { name: "Boobie Ike", slug: "boobie-ike", note: "Label partner, and for now the owner of the club where he books acts." },
      { name: "Real Dimez", slug: "real-dimez", note: "The act he has just signed." },
    ],
    tbc: ["How he connects to Jason and Lucia."],
    updated: "2026-11-22",
    portrait: {
      src: "/characters/dre-quan-priest.webp",
      width: 1600,
      height: 900,
      alt: "Dre'Quan Priest in a club with two other people, an official Rockstar Games screenshot",
      credit: "© Rockstar Games",
    },
    sourceIds: ["rockstar-profiles", "rockstar-credits"],
  },
  {
    slug: "raul-bautista",
    name: "Raul Bautista",
    group: "vice-city",
    role: "Professional bank robber",
    initials: "RB",
    accent: "blue",
    seoDescription:
      "Raul Bautista in GTA 6: the seasoned bank robber with his own crew who recruits risk-takers for big scores. What Rockstar says about him so far.",
    quote: "Experience counts.",
    summary:
      "Raul is a veteran bank robber who recruits people willing to gamble for a bigger cut.",
    background: [
      "Rockstar paints Raul as smooth, self-assured and sly, a seasoned robber who is always looking for talent ready to take big risks for big rewards.",
      "He is also getting careless. Rockstar says each score pushes him to take bigger chances, and that his crew will eventually face a choice: commit even harder or get out.",
    ],
    facts: [
      { label: "Role", value: "Supporting character; professional bank robber", status: "confirmed" },
      { label: "Crew", value: "Leads his own crew and looks for new recruits", status: "confirmed" },
      { label: "Spelling", value: "Bautista, as spelled on Rockstar's own page", status: "confirmed" },
      { label: "Base of operations", value: "Not stated by Rockstar", status: "tbc" },
      { label: "Crew members", value: "Not named on the People page", status: "tbc" },
      { label: "Performer", value: "Manny Perez, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Jason Duval and Lucia Caminos", slug: "jason-duval", note: "Rockstar's profile does not say how they connect to him." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video has Jason and Lucia driving getaway for Raul after a robbery, and Raul bringing them into his crew because he is impressed by their skills.",
    ],
    tbc: ["Where he is based.", "Who is in his crew."],
    updated: "2026-11-22",
    portrait: {
      src: "/characters/raul-bautista.webp",
      width: 1600,
      height: 900,
      alt: "Raul Bautista on a phone in a dim room, an official Rockstar Games screenshot",
      credit: "© Rockstar Games",
    },
    sourceIds: ["rockstar-profiles", "rockstar-credits", "wikipedia-extended-look"],
  },
  {
    slug: "real-dimez",
    name: "Real Dimez",
    group: "vice-city",
    role: "Rap duo: Bae-Luxe and Roxy",
    initials: "RD",
    accent: "turq",
    seoDescription:
      "Real Dimez in GTA 6: the rap duo Bae-Luxe and Roxy, signed to Only Raw Records. What Rockstar says about their past, their hit with DWNPLY and their label.",
    quote: "One hit away from fame.",
    summary:
      "Real Dimez is a duo, not one person: Bae-Luxe and Roxy, friends since school and now signed to Only Raw Records.",
    background: [
      "Rockstar names the two members as Bae-Luxe and Roxy and publishes them as a single profile. They have been friends since school. Rockstar says they used the street smarts from shaking down local dealers to build an income from risqué rap tracks and constant posting online.",
      "An early single with the local rapper DWNPLY raised their profile. Five years and plenty of trouble later, they have signed with Only Raw Records and are hoping to repeat that success.",
    ],
    facts: [
      { label: "Members", value: "Two people: Bae-Luxe and Roxy", status: "confirmed" },
      { label: "Friendship", value: "Friends since high school", status: "confirmed" },
      { label: "Earlier hit", value: "A single with local rapper DWNPLY", status: "confirmed" },
      { label: "Label", value: "Only Raw Records (Boobie Ike and Dre'Quan Priest)", status: "confirmed" },
      { label: "Location", value: "Vice City", status: "confirmed" },
      { label: "Who is who", value: "Rockstar gives no separate bios for Bae-Luxe and Roxy on the People page", status: "tbc" },
      { label: "Credited names", value: "Official credits list Bae-Luxe and Roxy Rashad", status: "confirmed" },
      { label: "Performers", value: "Hood Brat as Bae-Luxe and Krissy Celess as Roxy Rashad, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Dre'Quan Priest", slug: "dre-quan-priest", note: "Signed them to the label." },
      { name: "Boobie Ike", slug: "boobie-ike", note: "Co-owner of Only Raw Records." },
      { name: "DWNPLY", slug: "dwnply", note: "Local rapper named on their official profile for an early hit single." },
    ],
    tbc: ["Which member is which in game footage.", "Whether Bae-Luxe and Roxy Rashad are stage names."],
    updated: "2026-11-22",
    portrait: {
      src: "/characters/real-dimez.webp",
      width: 1600,
      height: 900,
      alt: "A member of Real Dimez in a recording studio, holding headphones, an official Rockstar Games screenshot",
      credit: "© Rockstar Games",
    },
    sourceIds: ["rockstar-profiles", "rockstar-credits"],
  },
  {
    slug: "dwnply",
    name: "DWNPLY",
    group: "vice-city",
    role: "Local rapper",
    initials: "DW",
    accent: "orange",
    seoTitle: "DWNPLY in GTA 6: Real Dimez's Early-Hit Rapper",
    seoDescription:
      "DWNPLY in GTA 6: the local rapper named on Rockstar's Real Dimez profile for an early hit, listed in the official credits as Denzel Curry.",
    summary:
      "DWNPLY is a Vice City rapper Rockstar names in the official Real Dimez profile as the partner on an early hit single.",
    background: [
      "Rockstar has not given DWNPLY a People profile of his own. He appears in the Real Dimez write-up: after years of viral tracks, an early hit single with the local rapper DWNPLY took Bae-Luxe and Roxy to new heights, and they later signed to Only Raw Records.",
      "The official Grand Theft Auto VI credits, published by Rockstar after launch, list DWNPLY and name Denzel Curry in that part. The People page itself does not mention a performer.",
    ],
    facts: [
      { label: "Role", value: "Local rapper, named on the official Real Dimez profile", status: "confirmed" },
      { label: "Link to Real Dimez", value: "Featured on an early hit single with the duo", status: "confirmed" },
      { label: "Affiliation", value: "Named alongside Only Raw Records' new signing, Real Dimez", status: "confirmed" },
      { label: "Performer", value: "Denzel Curry, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Real Dimez", slug: "real-dimez", note: "Rockstar names him as the local rapper on their early hit single." },
      { name: "Dre'Quan Priest", slug: "dre-quan-priest", note: "Signed Real Dimez to Only Raw Records after that early hit." },
      { name: "Boobie Ike", slug: "boobie-ike", note: "Co-owner of Only Raw Records, the label Real Dimez later joined." },
    ],
    tbc: [
      "Whether Rockstar will add a full People profile.",
      "Any further public details about his music beyond that early hit.",
    ],
    updated: "2026-11-22",
    sourceIds: ["rockstar-profiles", "rockstar-credits"],
    faq: [
      {
        question: "Who is DWNPLY in GTA 6?",
        answer: "DWNPLY is a local rapper named in Rockstar's official Real Dimez profile as the featured artist on an early hit single. Rockstar has not given him a People page of his own.",
      },
      {
        question: "Who plays DWNPLY in GTA 6?",
        answer: "Rockstar's official credits list Denzel Curry as DWNPLY.",
      },
    ],
  },
  {
    slug: "lori",
    name: "Lori Heder",
    group: "keys",
    role: "Brian Heder's third wife",
    initials: "L",
    accent: "orange",
    seoTitle: "Lori Heder in GTA 6: Brian's Third Wife",
    seoDescription:
      "Who is Lori Heder in GTA 6? What Rockstar says about Brian's third wife, her link to Jason, and the official credits listing for Orlagh Cassidy.",
    summary:
      "Lori Heder is Brian Heder's third wife. Rockstar names her as Lori in Brian's People profile; the official credits add the surname Heder.",
    background: [
      "Rockstar mentions Lori twice, both times in Brian's entry. The first is a passing line: Brian still moves product through his boat yard together with his third wife, Lori. The profile does not say what part, if any, she plays in the business.",
      "The second is her sangria. Jason lives rent-free in one of Brian's properties and, as part of that deal, is expected to drop by for Lori's sangria now and then. That invitation is the only personal detail Rockstar gives about her.",
    ],
    facts: [
      { label: "Role", value: "Brian Heder's wife; Rockstar calls her his third", status: "confirmed" },
      { label: "Link to Jason", value: "Jason is expected to stop by for her sangria from time to time", status: "confirmed" },
      { label: "Where she lives or works", value: "Not stated. She is mentioned next to Brian's boat yard, which Rockstar places in the Keys", status: "tbc" },
      { label: "Surname", value: "Heder, listed in Rockstar's official credits as Lori Heder", status: "confirmed" },
      { label: "Location", value: "Mentioned next to Brian's boat yard in the Keys", status: "confirmed" },
      { label: "Performer", value: "Orlagh Cassidy, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Brian Heder", slug: "brian-heder", note: "Her husband. She appears only in his profile." },
      { name: "Jason Duval", slug: "jason-duval", note: "Rockstar has him visiting for her sangria as part of his rent-free arrangement with Brian." },
    ],
    tbc: [
      "What she does at the boat yard, if anything.",
      "Whether she appears in any missions.",
    ],
    updated: "2026-11-22",
    sourceIds: ["rockstar-profiles", "rockstar-credits"],
    faq: [
      {
        question: "Who is Lori in GTA 6?",
        answer: "Lori Heder is Brian Heder's third wife. Rockstar names her as Lori in Brian's official People profile and has not given her a profile of her own. The official credits list her as Lori Heder.",
      },
      {
        question: "How does Lori connect to Jason Duval?",
        answer: "Rockstar says Jason lives rent-free in one of Brian's properties and is expected to visit for Lori's sangria now and then.",
      },
      {
        question: "Does Lori have a surname or a voice actor?",
        answer: "Yes. Rockstar's official credits list her as Lori Heder and name Orlagh Cassidy in the part. The People profile itself used only the name Lori.",
      },
    ],
  },
  {
    slug: "kenton",
    name: "Kenton Rees",
    tier: "reported",
    group: "contacts",
    role: "Dive-shop owner and treasure contact",
    initials: "K",
    accent: "turq",
    seoTitle: "Kenton Rees in GTA 6: Key Lento Treasure Diver",
    seoDescription:
      "Kenton Rees in GTA 6: the Key Lento dive-shop owner who hires Jason for treasure dives. What guides report, plus the official credits. Missions are blurred.",
    summary:
      "Kenton owns a beachside scuba-boat shop in Key Lento and sends Jason out to dive for treasure, according to launch-eve guides.",
    background: [
      "GameSpot says Kenton used to run with Brian Heder back in their prime and has since opened a scuba-boat tourist shop in Key Lento. PowerPyx says the shop is called Island Dreams and sits by the beach.",
      "GameSpot adds that Kenton also does illegal treasure diving on the side and, as he has got older, wants someone younger to do the actual dives. He gives Jason rough dive locations around Key Lento. Jason takes a boat and scuba gear out to each one and searches the seabed. GameSpot says clearing every dive spot eventually brings in tens of thousands of dollars.",
    ],
    facts: [
      { label: "Role", value: "Scuba-shop owner who hands out treasure-diving work (GameSpot)", status: "reported" },
      { label: "Where", value: "Key Lento (PowerPyx lists the area under Mariana County)", status: "reported" },
      { label: "Shop", value: "Island Dreams, by the beach (PowerPyx)", status: "reported" },
      { label: "Past", value: "Once ran with Brian Heder (GameSpot)", status: "reported" },
      { label: "Full name", value: "Kenton Rees, listed in Rockstar's official credits", status: "confirmed" },
      { label: "Age and appearance", value: "Not given in the sources", status: "tbc" },
      { label: "Performer", value: "Machel Montano, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Jason Duval", slug: "jason-duval", note: "Works for Kenton on his treasure dives (GameSpot)." },
      { name: "Brian Heder", slug: "brian-heder", note: "Kenton used to run with him, according to GameSpot." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's Island Dreams walkthrough. Reported, not confirmed by Rockstar.",
    spoiler: [
      "PowerPyx names his first job Island Dreams (Work for Kenton). It is the ninth main mission, set in Chapter 1, and Jason can start it after Hey Arnold! (Meet Brian). The listed reward is $400.",
      "In the mission Jason leads a bachelor party on a dive to a shipwreck. PowerPyx says the trip is cover: Kenton really wants treasure recovered near the wreck.",
      "The dive goes wrong when a diver gets stuck and then a shark appears. PowerPyx says whether the diver survives only changes some closing dialogue and has no long-term effect. By the end Jason has agreed to keep working with Kenton.",
    ],
    spoilerLink: { href: "/guides/missions/island-dreams", label: "Read our Island Dreams mission guide" },
    tbc: [
      "His age, appearance and how long he ran with Brian.",
    ],
    updated: "2026-11-22",
    sourceIds: ["rockstar-credits", "gamespot-money", "pp-island-dreams"],
    faq: [
      {
        question: "Who is Kenton in GTA 6?",
        answer: "Kenton runs a scuba-boat shop in Key Lento and gives Jason treasure-diving work, according to GameSpot and PowerPyx. Rockstar has not published a profile, so everything about him is Reported.",
      },
      {
        question: "Where is Kenton's shop?",
        answer: "GameSpot places it in Key Lento. PowerPyx says it is called Island Dreams, sits by the beach and lists the area under Mariana County.",
      },
      {
        question: "How much can you earn from Kenton's dives?",
        answer: "GameSpot says finding all the treasure at every dive spot eventually pays tens of thousands of dollars. That is one outlet's estimate, so we mark it Reported.",
      },
    ],
  },
  {
    slug: "moses",
    name: "Moses \"Mo\" Watkins",
    tier: "reported",
    group: "contacts",
    role: "Mechanic and car fence",
    initials: "M",
    accent: "blue",
    seoTitle: "Moses in GTA 6: Port Gellhorn Mechanic and Fence",
    seoDescription:
      "Moses in GTA 6: the Port Gellhorn mechanic who buys and registers stolen cars. What launch-eve guides report about him, with sources. Missions blurred.",
    summary:
      "Moses is a mechanic with a garage in Port Gellhorn who buys and registers stolen cars, according to launch-eve guides.",
    background: [
      "PowerPyx describes Moses as a mechanic with an auto shop in Port Gellhorn, in Kelly County. GameSpot says he is one of two characters who hand out vehicle contracts, and the first of them you meet. He explains the basics of stealing cars and supplies the tools for mid-range vehicles.",
      "GameSpot says a delivery to Moses often pays upwards of $10,000. PowerPyx lists his rules: early on he only takes cars without a tracker, he refuses cars stolen too close to his garage, and the garage closes for a minute or two after each sale. PowerPyx also says he is still available as a fence once the story is over.",
    ],
    facts: [
      { label: "Role", value: "Mechanic who buys and registers stolen cars (PowerPyx)", status: "reported" },
      { label: "Where", value: "Port Gellhorn, Kelly County (PowerPyx; GameSpot says Port Gellhorn)", status: "reported" },
      { label: "Buys", value: "Cars only. Early on, only cars without a tracker (PowerPyx)", status: "reported" },
      { label: "Typical payout", value: "Often upwards of $10,000 per car (GameSpot)", status: "reported" },
      { label: "Full name", value: "Moses \"Mo\" Watkins, listed in Rockstar's official credits", status: "confirmed" },
      { label: "Age and appearance", value: "Not given in the sources", status: "tbc" },
      { label: "Performer", value: "Aaron Morton, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "Randy", slug: "randy", note: "The second car fence, who deals in higher-end cars later in the story (GameSpot)." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's walkthrough. Reported, not confirmed by Rockstar.",
    spoiler: [
      "PowerPyx names the introduction Moses (Take A Vehicle to Moses). It is the 31st main mission, set in Chapter 2, and only Lucia can start it, after Girl's Trip (Find Painkillers). Vicki sets it up by telling Lucia that a mechanic named Moses could get her a ride.",
      "Moses leads Lucia to a yard behind his garage where three cars are parked. A phone app called Waink scans them for trackers. Lucia picks up the Slim Jim, a tool for opening locked cars without setting off the alarm, and uses it on a Montagne XL.",
      "Moses then registers a car as Lucia's personal vehicle once she has resprayed it. If she did not bring a suitable car, she steals an untracked one from the main road in the middle of Port Gellhorn. PowerPyx also lists a Scooter Bros app, for having a personal vehicle delivered, among the rewards.",
    ],
    tbc: ["His age and appearance.", "Whether his rules change later in the story."],
    updated: "2026-11-22",
    sourceIds: ["rockstar-credits", "gamespot-money", "pp-moses", "pp-fences"],
    faq: [
      {
        question: "Who is Moses in GTA 6?",
        answer: "Moses is a mechanic with a garage in Port Gellhorn who buys and registers stolen cars, according to PowerPyx and GameSpot. Rockstar has not published a profile, so everything about him is Reported.",
      },
      {
        question: "How much does Moses pay for a stolen car?",
        answer: "GameSpot says deliveries to Moses often pay upwards of $10,000. That is one outlet's description, so we mark it Reported.",
      },
      {
        question: "Does Moses buy every stolen car?",
        answer: "No. PowerPyx says that early on he refuses cars with trackers and cars stolen too close to his garage, and that the garage is closed for a minute or two after each sale.",
      },
    ],
  },
  {
    slug: "randy",
    name: "Randy Kozlov",
    tier: "reported",
    group: "contacts",
    role: "High-end car fence",
    initials: "R",
    accent: "pink",
    seoTitle: "Randy in GTA 6: Vice City High-End Car Fence",
    seoDescription:
      "Randy in GTA 6: the Vice City fence who buys high-end cars with advanced trackers. What launch-eve guides report, with sources. Missions are blurred.",
    summary:
      "Randy is a Vice City fence who buys high-end cars, according to launch-eve guides.",
    background: [
      "GameSpot says Randy deals in much higher-end cars than the Port Gellhorn mechanic and that you meet him further into the story. GameSpot places him in western Vice City, while PowerPyx's fence list puts him in Balsero. Neither gives an exact address, so we mark his location Reported.",
      "GameSpot says Randy gives the player a list of more than a dozen cars to find around the map. The payout is large and gets bigger if the cars are delivered in decent condition. PowerPyx says he accepts certain high-end cars that carry advanced trackers, and that he is still available after the story.",
    ],
    facts: [
      { label: "Role", value: "Fence for high-end cars (GameSpot)", status: "reported" },
      { label: "Where", value: "Western Vice City (GameSpot); Balsero (PowerPyx)", status: "reported" },
      { label: "Buys", value: "Certain high-end cars with advanced trackers (PowerPyx)", status: "reported" },
      { label: "Extras", value: "A list of more than a dozen cars to find, with a bonus for good condition (GameSpot)", status: "reported" },
      { label: "Full name", value: "Randy Kozlov, listed in Rockstar's official credits", status: "confirmed" },
      { label: "Age and appearance", value: "Not given in the sources", status: "tbc" },
      { label: "Performer", value: "Serge Didenko, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "A Port Gellhorn mechanic", slug: "moses", note: "The car fence who handles cheaper vehicles (GameSpot)." },
      { name: "Tyrone", slug: "tyrone", note: "Another Vice City fence in PowerPyx's list, though he buys narcotics, jewelry and marked bills rather than cars." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's Key Cloner guide and GameSpot. Reported, not confirmed by Rockstar.",
    spoiler: [
      "PowerPyx names his first job Clonin' Keys, Makin' GS (Steal the Zorrusso for Randy). It is a main mission about halfway through Chapter 3 and, by PowerPyx's estimate, around 40 hours into the game.",
      "At the start of that mission the Key Cloner installs itself in the phone settings. PowerPyx says it lets the player hack into high-end cars, which often carry advanced trackers that alert the police if you slow down. GameSpot likewise says Randy is the one who lets you clone keys to open more modern vehicles.",
    ],
    tbc: ["His age and appearance.", "His exact location in Vice City."],
    updated: "2026-11-22",
    sourceIds: ["rockstar-credits", "gamespot-money", "pp-fences", "pp-key-cloner"],
    faq: [
      {
        question: "Who is Randy in GTA 6?",
        answer: "Randy is a car fence in Vice City who deals in high-end vehicles, according to GameSpot and PowerPyx. Rockstar has not published a profile, so everything about him is Reported.",
      },
      {
        question: "Where is Randy in GTA 6?",
        answer: "GameSpot places him in western Vice City and PowerPyx lists him in Balsero. Neither gives an exact address, so the spot is Reported.",
      },
      {
        question: "What kind of cars does Randy buy?",
        answer: "GameSpot says he deals in much higher-end cars than the Port Gellhorn mechanic does, and PowerPyx says he accepts certain high-end cars with advanced trackers. Both are Reported.",
      },
    ],
  },
  {
    slug: "dunk",
    name: "Dunk",
    tier: "reported",
    group: "contacts",
    role: "Dealer and fence",
    initials: "D",
    accent: "orange",
    seoTitle: "Dunk in GTA 6: Port Gellhorn Dealer and Fence",
    seoDescription:
      "Dunk in GTA 6: the Port Gellhorn dealer with a trailer who later fences stolen goods. What launch-eve guides report, with sources. Missions are blurred.",
    summary:
      "Dunk is a dealer with a trailer in Port Gellhorn who later buys stolen goods, according to launch-eve guides.",
    background: [
      "PowerPyx places Dunk in Port Gellhorn, in Kelly County, and gives him a trailer there. GameSpot lists him alongside Tyrone and Donnie as a dealer who pays out almost instantly when you drop off goods from gang hideouts.",
      "As a fence, PowerPyx says Dunk pays low prices for narcotics and jewelry and very low prices for marked bills. It also says he stays available after the story, with a gap in the middle of it when he is temporarily unavailable.",
    ],
    facts: [
      { label: "Role", value: "Dealer who also works as a fence (GameSpot, PowerPyx)", status: "reported" },
      { label: "Where", value: "A trailer in Port Gellhorn, Kelly County (PowerPyx)", status: "reported" },
      { label: "Pays", value: "Narcotics Low, jewelry Low, marked bills Very Low (PowerPyx)", status: "reported" },
      { label: "Payment speed", value: "Almost instant for hideout goods (GameSpot)", status: "reported" },
      { label: "Age and appearance", value: "Not given in the sources", status: "tbc" },
      { label: "Performer", value: "Brad Fleischer, listed in Rockstar's official credits as Dunk", status: "confirmed" },
    ],
    relationships: [
      { name: "Tyrone", slug: "tyrone", note: "Another dealer GameSpot lists with Dunk as paying almost instantly." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's walkthrough and GameSpot. Reported, not confirmed by Rockstar. Big story spoilers.",
    spoiler: [
      "PowerPyx says Dunk is unlocked as a fence after Slam Dunk, the 37th main mission, set in Chapter 2. Only Lucia can start it. Dunk phones her twice once the other Chapter 2 missions are done, then marks his trailer on the map.",
      "GameSpot places Dunk in the stretch where Jason and Lucia are hiding out at the Starlet Motel in Port Gellhorn. Jason is bedridden after an injury, so Lucia is the one playable, and she needs stronger painkillers for him as well as cash for the room.",
      "In PowerPyx's walkthrough, Dunk's plan is to lean on a retired doctor, Dr. Bill, who used to deal with a gang called the Kolts. The deal at the Kolts' docks turns into a shootout. At a second meeting spot Bill is shot, and Dunk takes the pills from the main building. Lucia brings them back to Jason.",
      "The next day Dunk sends $1,700 through BuckMe and marks two robbery locations on the map.",
    ],
    tbc: ["His surname, age and appearance.", "Why he is unavailable for part of the story."],
    updated: "2026-11-22",
    sourceIds: ["rockstar-credits", "gamespot-money", "pp-fences", "pp-slam-dunk"],
    faq: [
      {
        question: "Who is Dunk in GTA 6?",
        answer: "Dunk is a dealer with a trailer in Port Gellhorn who also works as a fence, according to PowerPyx and GameSpot. Rockstar has not published a profile, so everything about him is Reported.",
      },
      {
        question: "What does Dunk pay for stolen goods?",
        answer: "PowerPyx lists low prices for narcotics and jewelry and very low prices for marked bills. GameSpot says dealers like Dunk pay almost instantly. Both are Reported.",
      },
      {
        question: "Is Dunk available after the story?",
        answer: "PowerPyx says yes. It says he is still available after the story but becomes temporarily unavailable during it.",
      },
    ],
  },
  {
    slug: "tyrone",
    name: "Tyrone Russo",
    tier: "reported",
    group: "contacts",
    role: "Fence and side-mission giver",
    initials: "T",
    accent: "turq",
    seoTitle: "Tyrone in GTA 6: La Perle Fence and Side Missions",
    seoDescription:
      "Tyrone in GTA 6: the La Perle fence who pays well for narcotics and hands out side missions. What guides report, with sources. Missions are blurred.",
    summary:
      "Tyrone is a fence in La Perle, Vice City, who also hands out a run of side missions, according to launch-eve guides.",
    background: [
      "PowerPyx places Tyrone in La Perle, in Vice City, and says he is still available after the story. In its fence list he pays High for narcotics and Medium for jewelry and marked bills.",
      "GameSpot lists Tyrone with Donnie and a Port Gellhorn dealer as dealers who pay almost instantly when you drop off goods from gang hideouts. PowerPyx also credits him with a questline of side missions. The mission names are in the blurred section below.",
    ],
    facts: [
      { label: "Role", value: "Fence who also gives side missions (PowerPyx)", status: "reported" },
      { label: "Where", value: "La Perle, Vice City (PowerPyx)", status: "reported" },
      { label: "Pays", value: "Narcotics High, jewelry Medium, marked bills Medium (PowerPyx)", status: "reported" },
      { label: "Payment speed", value: "Almost instant for hideout goods (GameSpot)", status: "reported" },
      { label: "Full name", value: "Tyrone Russo, listed in Rockstar's official credits", status: "confirmed" },
      { label: "Age and appearance", value: "Not given in the sources", status: "tbc" },
      { label: "Performer", value: "Taylor Novak, listed in Rockstar's official credits", status: "confirmed" },
    ],
    relationships: [
      { name: "A Port Gellhorn dealer", slug: "dunk", note: "Another dealer GameSpot lists with Tyrone as paying almost instantly." },
      { name: "Randy", slug: "randy", note: "Another Vice City fence in PowerPyx's list, though Randy buys cars." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's Spin On This walkthrough. Reported, not confirmed by Rockstar.",
    spoiler: [
      "PowerPyx lists Tyrone's questline as Here, Kitty Kitty, then Kitty Litter Labs, then Spin On This (Shut Down the Labs). The last one needs enough Kitty Litter Labs destroyed first, can only be started as Jason, pays $10,000 and begins near the town of Grayson in Lummox County.",
      "In that mission Jason works with Tyrone and a man called Dook to raid a motel with a synthetics lab hidden under it. Jason plants explosives on two vats and chases a man named Rocky through a pipe as the lab goes up. The chase ends outside with Rocky being shot.",
    ],
    tbc: ["His age and appearance.", "What the Kitty Litter operation is in the wider story."],
    updated: "2026-11-22",
    sourceIds: ["rockstar-credits", "gamespot-money", "pp-fences", "pp-spin-on-this"],
    faq: [
      {
        question: "Who is Tyrone in GTA 6?",
        answer: "Tyrone is a fence in La Perle, Vice City, who also gives side missions, according to PowerPyx and GameSpot. Rockstar has not published a profile, so everything about him is Reported.",
      },
      {
        question: "What does Tyrone pay for stolen goods?",
        answer: "PowerPyx lists High for narcotics and Medium for jewelry and marked bills. GameSpot says dealers like Tyrone pay almost instantly. Both are Reported.",
      },
      {
        question: "Is Tyrone available after the story?",
        answer: "PowerPyx says yes, he is still available as a fence after the story.",
      },
    ],
  },
];

export const SOURCES: Record<CharSourceId, CharSource> = {
  ...BASE_SOURCES,
  ...(BATCH4_SOURCES as Record<keyof typeof BATCH4_SOURCES, CharSource>),
};

export const CHARACTERS: Character[] = [...BASE_CHARACTERS, ...BATCH4_CHARACTERS];

export const characterPath = (slug: string) => `/database/characters/${slug}`;
export const characterBySlug = (slug: string) => CHARACTERS.find((c) => c.slug === slug);
