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
 * - No Rockstar images are used. Pages show a text/gradient placeholder card instead.
 *
 * This file must not import from src/lib/seo (site.ts imports it to build ROUTES).
 */

export type CharSourceId = "rockstar-profiles" | "rockstar-home" | "wikipedia-extended-look";

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
  status: "confirmed" | "tbc";
}

export interface Relation {
  /** Display name. */
  name: string;
  /** Slug of a profile on this site, when there is one. */
  slug?: string;
  note: string;
}

export type CharGroup = "leads" | "vice-city" | "keys";

export interface Character {
  slug: string;
  name: string;
  group: CharGroup;
  /** One-line role shown on cards. */
  role: string;
  /** Monogram for the placeholder card. */
  initials: string;
  /** Card accent: tints the gradient placeholder. */
  accent: "pink" | "blue" | "orange" | "turq";
  seoDescription: string;
  /** One short line Rockstar uses for the character, quoted and attributed. */
  quote: string;
  /** Non-spoiler summary in our own words, safe to show by default. */
  summary: string;
  /** Longer background paragraphs, still non-spoiler. */
  background: string[];
  facts: CharFact[];
  relationships: Relation[];
  /** Spoiler: footage and story beats reported in secondary sources. Blurred on the page. */
  spoiler?: string[];
  /** Open questions, each shown with a "To be confirmed" tag. */
  tbc: string[];
  sourceIds: CharSourceId[];
}

export const LAST_VERIFIED = "2026-11-18";
export const LAST_VERIFIED_LABEL = "18 Nov 2026";

export const SOURCES: Record<CharSourceId, CharSource> = {
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
  "wikipedia-extended-look": {
    id: "wikipedia-extended-look",
    label: "Wikipedia: Grand Theft Auto VI: An Extended Look",
    url: "https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI:_An_Extended_Look",
    used: "Secondary plot summary of the 27-minute Extended Look video (blurred spoiler section only)",
    primary: false,
  },
};

export const GROUPS: { id: CharGroup; title: string; blurb: string }[] = [
  { id: "leads", title: "The leads", blurb: "The two characters you play." },
  { id: "keys", title: "The Keys", blurb: "Jason's world: boats, bars and small-time smuggling." },
  { id: "vice-city", title: "Vice City", blurb: "Music, clubs and big scores." },
];

export const CHARACTER_NOTE =
  "Rockstar has only published short profiles so far. Everything marked Confirmed comes from those profiles, retold in our own words. Anything we could only find in secondary reporting is marked To be confirmed, and we will recheck every profile against the finished game after launch on 19 November 2026.";

export const CHARACTERS: Character[] = [
  {
    slug: "jason-duval",
    name: "Jason Duval",
    group: "leads",
    role: "Playable lead",
    initials: "JD",
    accent: "blue",
    seoDescription:
      "Jason Duval in GTA 6: the ex-Army playable lead who works for Keys drug runners and wants a quieter life. What Rockstar has said, his ties to Lucia, Brian and Cal.",
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
      { label: "Age and appearance", value: "Not given in Rockstar's text", status: "tbc" },
      { label: "Voice cast", value: "Not listed on the pages we checked", status: "tbc" },
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
      "Who voices him.",
      "How his arc plays out in the finished game.",
    ],
    sourceIds: ["rockstar-profiles", "rockstar-home", "wikipedia-extended-look"],
  },
  {
    slug: "lucia-caminos",
    name: "Lucia Caminos",
    group: "leads",
    role: "Playable lead",
    initials: "LC",
    accent: "pink",
    seoDescription:
      "Lucia Caminos in GTA 6: the fighter who just got out of Leonida Penitentiary and has a plan. What Rockstar has said about her past, her family and her partnership with Jason.",
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
      { label: "Parents' names, age and appearance", value: "Not given in Rockstar's text", status: "tbc" },
      { label: "Voice cast", value: "Not listed on the pages we checked", status: "tbc" },
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
      "Who voices her.",
    ],
    sourceIds: ["rockstar-profiles", "rockstar-home", "wikipedia-extended-look"],
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
      { label: "Exact mission role", value: "Not stated by Rockstar", status: "tbc" },
      { label: "Voice cast", value: "Not listed on the pages we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Jason Duval", slug: "jason-duval", note: "Close friend. Jason is the more ambitious of the two." },
      { name: "Brian Heder", slug: "brian-heder", note: "Fellow associate in the Keys." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video closes with Cal telling Jason and Lucia to enjoy their time as young adults.",
    ],
    tbc: ["What Cal does in the missions.", "Who voices him."],
    sourceIds: ["rockstar-profiles", "wikipedia-extended-look"],
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
      { label: "Voice cast", value: "Not listed on the pages we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Jason Duval", slug: "jason-duval", note: "Landlord, and the man Jason does favours for." },
      { name: "Cal Hampton", slug: "cal-hampton", note: "Another associate in his circle." },
      { name: "Lori", note: "His third wife. She is named in his profile but has no profile of her own yet." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video has Brian handing Jason and Lucia a job over dinner and warning Jason against sinking deeper into crime.",
    ],
    tbc: ["How central Brian is to the main story.", "Who voices him."],
    sourceIds: ["rockstar-profiles", "wikipedia-extended-look"],
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
      { label: "Full name or nickname", value: "Not stated", status: "tbc" },
      { label: "Age, appearance and voice cast", value: "Not given in Rockstar's text", status: "tbc" },
    ],
    relationships: [
      { name: "Dre'Quan Priest", slug: "dre-quan-priest", note: "Business partner in Only Raw Records. Dre'Quan books acts into Boobie's club." },
      { name: "Real Dimez", slug: "real-dimez", note: "The label's newly signed act." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video names Boobie as the client for Jason and Lucia's first drug pickup in Vice City.",
    ],
    tbc: [
      "Whether the Jack of Hearts is his club, and how it fits into the game.",
      "Whether he appears in trailer footage beyond what the Extended Look summary describes.",
      "Who voices him.",
    ],
    sourceIds: ["rockstar-profiles", "wikipedia-extended-look"],
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
      { label: "Link to the leads", value: "Not stated by Rockstar", status: "tbc" },
      { label: "Voice cast", value: "Not listed on the pages we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Boobie Ike", slug: "boobie-ike", note: "Label partner, and for now the owner of the club where he books acts." },
      { name: "Real Dimez", slug: "real-dimez", note: "The act he has just signed." },
    ],
    tbc: ["How he connects to Jason and Lucia.", "Who voices him."],
    sourceIds: ["rockstar-profiles"],
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
      { label: "Crew members", value: "Not named", status: "tbc" },
      { label: "Age, appearance and voice cast", value: "Not given in Rockstar's text", status: "tbc" },
    ],
    relationships: [
      { name: "Jason Duval and Lucia Caminos", slug: "jason-duval", note: "Rockstar's profile does not say how they connect to him." },
    ],
    spoiler: [
      "Wikipedia's summary of the Extended Look video has Jason and Lucia driving getaway for Raul after a robbery, and Raul bringing them into his crew because he is impressed by their skills.",
    ],
    tbc: ["Where he is based.", "Who is in his crew.", "Who voices him."],
    sourceIds: ["rockstar-profiles", "wikipedia-extended-look"],
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
      { label: "Who is who", value: "Rockstar gives no separate bios for Bae-Luxe and Roxy", status: "tbc" },
      { label: "Stage names or real names", value: "Not stated", status: "tbc" },
      { label: "Ages, appearance and voice cast", value: "Not given in Rockstar's text", status: "tbc" },
    ],
    relationships: [
      { name: "Dre'Quan Priest", slug: "dre-quan-priest", note: "Signed them to the label." },
      { name: "Boobie Ike", slug: "boobie-ike", note: "Co-owner of Only Raw Records." },
      { name: "DWNPLY", note: "Local rapper on their early hit. Named in the profile but without a profile of his own yet." },
    ],
    tbc: ["Which member is which in game footage.", "Whether the names are stage names.", "Who voices them."],
    sourceIds: ["rockstar-profiles"],
  },
];

export const characterPath = (slug: string) => `/database/characters/${slug}`;
export const characterBySlug = (slug: string) => CHARACTERS.find((c) => c.slug === slug);
