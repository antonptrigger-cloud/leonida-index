/**
 * Character batch 4: Kyle, Kirk, Billy (with Wyman), Yago, Andy, Pilot Pete, Donnie and Bret Vogel.
 *
 * Rockstar has published nothing on any of them, so every profile is `tier: "reported"`.
 * Sources are launch-day guides from PowerPyx, GameSpot and (for Bret) Push Square. A fact
 * from one outlet is attributed to it by name. "Confirmed" is used only where two main
 * outlets agree (Bret's name and business). Mission names, chapters, rewards and money live
 * in `spoiler`, which the page blurs. Titles, metas and FAQs carry none of that.
 *
 * Where outlets spell a name differently the profile says so instead of picking one:
 * Starlet or Scarlet Motel, Cellerica or Celeria, Killtelligence or Shrewsbury SM-69.
 *
 * Type-only imports from characters.ts, because characters.ts imports this file.
 */
import type { Character, CharSource } from "@/lib/characters/characters";

const UPDATED = "2026-11-19";

type Src = Omit<CharSource, "id"> & { id: string };

const pp = (id: string, slug: string, label: string, used: string): Src => ({
  id,
  label: `PowerPyx: ${label} (18 Nov 2026)`,
  url: `https://www.powerpyx.com/${slug}/`,
  used,
  primary: false,
});

export const BATCH4_SOURCES = {
  "pp-world-map": pp("pp-world-map", "gta-6-full-world-map-revealed", "GTA 6 Full World Map Revealed", "County and sub-region names, such as Hamlet in Vice-Dale County"),
  "pp-sf-list": pp("pp-sf-list", "gta-6-all-strangers-freaks-side-missions", "GTA 6 All Strangers & Freaks Side Missions", "Which questlines count toward the trophy, who can start them and how many parts each has"),
  "pp-kyle-farm": pp("pp-kyle-farm", "gta-6-check-out-mckittrick-farm-walkthrough", "Check Out McKittrick Farm walkthrough", "Kyle's flyer, farm and first mission (blurred section)"),
  "pp-kyle-chem": pp("pp-kyle-chem", "gta-6-collect-chemicals-for-kyle-walkthrough", "Collect Chemicals for Kyle walkthrough", "Kyle's second mission (blurred section)"),
  "pp-kirk": pp("pp-kirk", "gta-6-search-for-the-skunk-ape-walkthrough", "Search for the Skunk Ape walkthrough", "Kirk's flyers, night-only rule and first mission (blurred section)"),
  "pp-billy1": pp("pp-billy1", "gta-6-thrillbillies-check-out-the-mud-club-walkthrough", "Thrillbillies (Check Out the Mud Club) walkthrough", "Billy's crew, the Mud Club and the one page that spells the motel Scarlet"),
  "pp-billy2": pp("pp-billy2", "gta-6-twist-wrist-smash-grab-join-billy-on-a-job-walkthrough", "Twist Wrist, Smash, Grab walkthrough", "Billy's second job in Port Gellhorn (blurred section)"),
  "pp-coffee-break": pp("pp-coffee-break", "gta-6-coffee-break-walkthrough", "Coffee Break walkthrough", "Starlet Motel in Kelly County; where Wyman is met"),
  "pp-yago1": pp("pp-yago1", "gta-6-join-a-street-race-walkthrough", "Join a Street Race walkthrough", "Yago's racing area and first quest (blurred section)"),
  "pp-yago2": pp("pp-yago2", "gta-6-bumper-to-bumper-mentor-yago-walkthrough", "Bumper to Bumper (Mentor Yago) walkthrough", "Yago's restaurant and second quest (blurred section)"),
  "pp-andy": pp("pp-andy", "gta-6-climbing-the-cellerichain-walkthrough", "Climbing the Cellerichain walkthrough", "Andy's home, Lucia-only rule and first quest (blurred section); prints both Cellerica and Celeria"),
  "pp-pete1": pp("pp-pete1", "gta-6-the-last-mile-passing-the-torch-recover-petes-plane-walkthrough", "The Last Mile: Passing the Torch walkthrough", "Pete's first airfield and first quest (blurred section)"),
  "pp-pete2": pp("pp-pete2", "gta-6-the-last-mile-backseat-pilot-deliver-packages-walkthrough", "The Last Mile: Backseat Pilot walkthrough", "Pete's second airfield and delivery rules (blurred section)"),
  "pp-gone-fishing": pp("pp-gone-fishing", "gta-6-gone-fishing-walkthrough", "Gone Fishing walkthrough", "Donnie's role in Brian's operation (blurred section)"),
  "pp-donnies-drop": pp("pp-donnies-drop", "gta-6-clean-up-after-donnie-donnies-drop-walkthrough", "Clean Up After Donnie walkthrough", "Donnie's trailer in Key Lento (blurred section)"),
  "pp-clear-skies": pp("pp-clear-skies", "gta-6-clear-skies-join-donnie-on-a-job-walkthrough", "Clear Skies walkthrough", "Donnie's flight and the Southwind start (blurred section)"),
  "pp-don-gone": pp("pp-don-gone", "gta-6-don-gone-head-to-donnies-trailer-walkthrough", "Don Gone walkthrough", "Donnie's trailer and his unique weapon (blurred section)"),
  "pp-bret": pp("pp-bret", "gta-6-veteran-hunted-meet-bret-walkthrough", "Veteran Hunted (Meet Bret) walkthrough", "Bret Vogel's name, business, army link and first quest"),
  "rockstar-regions": {
    id: "rockstar-regions",
    label: "Rockstar Games: GTA VI, Only in Leonida (region text)",
    url: "https://www.rockstargames.com/VI/vice-city",
    used: "Region descriptions, such as Mount Kalaga as one of six regions and Little Cuba as a Vice City neighbourhood",
    primary: true,
  },
  "gs-ue-bonuses": {
    id: "gs-ue-bonuses",
    label: "GameSpot: How To Get All GTA 6 Ultimate Edition Bonuses (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/how-to-get-all-gta-6-ultimate-edition-bonuses/",
    used: "Wyman, the Starlet Motel and the Mud Club track",
    primary: false,
  },
  "gs-plane": {
    id: "gs-plane",
    label: "GameSpot: How To Get A Plane In GTA 6 (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/how-to-get-a-plane-in-gta-6/",
    used: "Kyle's farm in East Kelly County and Wild Hog Point (blurred section)",
    primary: false,
  },
  "ps-bret": {
    id: "ps-bret",
    label: "Push Square: GTA 6, Bret's Hunting Target Deck Locations (WIP), by Sammy Barker (Nov 2026)",
    url: "https://www.pushsquare.com/guides/gta-6-brets-hunting-target-deck-locations",
    used: "Bret Vogel's name, Killtelligence Provisions, the 15 Hunting Target Decks and hunting rules",
    primary: false,
  },
} satisfies Record<string, Src>;

const NOTE_PP = "Rockstar has not published a profile for this character. Everything below comes from PowerPyx and is marked Reported. Mission details are blurred.";
const NOTE_PP_GS = "Rockstar has not published a profile for this character. Everything below comes from PowerPyx and GameSpot and is marked Reported. Mission details are blurred.";

export const BATCH4_CHARACTERS: Character[] = [
  /* ---------------------------------------------------------------- Kyle */
  {
    slug: "kyle",
    name: "Kyle",
    tier: "reported",
    updated: UPDATED,
    reportedNote: NOTE_PP_GS,
    sourceLine: "PowerPyx and GameSpot (not Rockstar)",
    seoTitle: "Kyle in GTA 6: Crop-Duster Pilot of McKittrick Farm",
    group: "side-quests",
    role: "Side-quest character; farmer and crop-duster pilot",
    initials: "K",
    accent: "orange",
    seoDescription:
      "Kyle in GTA 6: the farmer-pilot behind McKittrick Farm, where his flyers appear, his three-part side quest and what is still unconfirmed.",
    summary:
      "Kyle is a farmer who also flies a crop duster. PowerPyx and GameSpot both describe his farm and his three-part side quest, but Rockstar has not published a profile.",
    background: [
      "GameSpot places Kyle's farm in East Kelly County and writes \"Kyle McKittrick's farm\". PowerPyx names only McKittrick Farm. We use his first name alone until a second outlet gives a surname.",
      "Kyle advertises with flyers. PowerPyx says one hangs on a wall at a place in Kelly County, and that reading it marks his quest on the map. The flyer mentions a pilot job at his farm.",
      "PowerPyx lists three parts in his questline, which either Jason or Lucia can start. The follow-up quests arrive by phone message after long gaps, and PowerPyx says the questline counts toward the Strangers & Freaks trophy. GameSpot calls it \"one of the wilder ones in GTA 6\".",
    ],
    facts: [
      { label: "Role", value: "Farmer and crop-duster pilot", status: "reported" },
      { label: "Farm", value: "McKittrick Farm, in East Kelly County per GameSpot", status: "reported" },
      { label: "First flyer", value: "On a wall in Kelly County (PowerPyx)", status: "reported" },
      { label: "Questline", value: "Three parts; either lead can start it; counts toward Strangers & Freaks (PowerPyx)", status: "reported" },
      { label: "Surname", value: "GameSpot writes McKittrick; PowerPyx names only the farm", status: "tbc" },
      { label: "Age and voice actor", value: "Not given by any outlet we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Jason Duval and Lucia Caminos", slug: "jason-duval", note: "Either lead can take on Kyle's side quest, per PowerPyx." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's walkthroughs and GameSpot. Reported, not confirmed by Rockstar.",
    spoilerLink: { href: "/guides/strangers-and-freaks", label: "Strangers & Freaks guide" },
    spoiler: [
      "Check Out McKittrick Farm (Chapter 2): Kyle lands his crop duster, says he hurt his hand and asks you to dust his crops. You fly the plane, spray chemicals over his field and land back at the airstrip. It pays $400.",
      "Collect Chemicals for Kyle: about a day later he texts you to fetch chemicals from a compound in Leonard County, where Final Chapter gang members want $5,000 for them. PowerPyx says you can steal the van instead, but the gang chases you and you get a two-star wanted level. It pays $1,000.",
      "Why he wants them: Kyle grows mutated strawberries and has a worrying cough from handling the chemicals. Eating one temporarily boosts your stats.",
      "Buddy? (Check on Kyle): this last mission ends the questline. GameSpot says you can then freely take \"Kyle's Mallard\", a single-passenger plane that stays marked on the map wherever you leave it.",
    ],
    tbc: ["His surname and age.", "His voice actor.", "What happens in the last part beyond the plane GameSpot mentions."],
    sourceIds: ["pp-kyle-farm", "pp-kyle-chem", "pp-sf-list", "gs-plane"],
    faq: [
      { question: "Who is Kyle in GTA 6?", answer: "Kyle is a side-quest character who runs McKittrick Farm and flies a crop duster. PowerPyx and GameSpot both describe him; Rockstar has not published a profile." },
      { question: "How do you meet Kyle?", answer: "PowerPyx says you find one of his flyers on a wall in Kelly County. Reading it marks his quest on the map." },
      { question: "Does Kyle count toward the Strangers & Freaks trophy?", answer: "Yes. PowerPyx marks his questline as one of the strands that count." },
      { question: "Where is Kyle's farm?", answer: "GameSpot places it in East Kelly County. PowerPyx calls it McKittrick Farm and puts the first flyer at a place in Kelly County." },
    ],
  },

  /* ---------------------------------------------------------------- Kirk */
  {
    slug: "kirk",
    name: "Kirk",
    tier: "reported",
    updated: UPDATED,
    reportedNote: NOTE_PP,
    sourceLine: "PowerPyx (not Rockstar)",
    seoTitle: "Kirk in GTA 6: Skunk Ape Side Quest",
    group: "side-quests",
    role: "Side-quest character; cryptid hunter",
    initials: "K",
    accent: "turq",
    seoDescription:
      "Kirk in GTA 6: the night-time cryptid hunter whose flyers appear in Hamlet, what PowerPyx says about his side quest and what is not yet confirmed.",
    summary:
      "Kirk hunts a creature he calls the Skunk Ape, also known as Mr. Mangrove. Only PowerPyx describes him so far, and Rockstar has not published a profile.",
    background: [
      "PowerPyx says Kirk spreads flyers about the creature. You can find one in Hamlet, at Skeeter's bar, and reading it adds Kirk to your phone contacts. You then call him to mark the quest on the map.",
      "PowerPyx lists his questline under Strangers & Freaks and says it counts toward the trophy. Either Jason or Lucia can start it. PowerPyx marks the first and third parts as night only, and the third as Lucia only. You can sleep in bed to move the time forward.",
      "PowerPyx lists Hamlet under Vice-Dale County and puts the quest site in the swamps of Mariana County, near Pelican River. Because PowerPyx lists Pelican Valley and Grassrivers as separate Mariana County areas, we cannot match the swamps to the Grassrivers map page.",
    ],
    facts: [
      { label: "Role", value: "Hunts the Skunk Ape, also called Mr. Mangrove (PowerPyx)", status: "reported" },
      { label: "Flyer", value: "Skeeter's bar in Hamlet (PowerPyx)", status: "reported" },
      { label: "Quest site", value: "Swamps of Mariana County, near Pelican River (PowerPyx)", status: "reported" },
      { label: "Questline", value: "Three parts; counts toward Strangers & Freaks; night only for parts one and three (PowerPyx)", status: "reported" },
      { label: "Map page", value: "None matches the swamp quest site", status: "tbc" },
      { label: "Surname, age and voice actor", value: "Not given by any outlet we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Jason Duval and Lucia Caminos", slug: "jason-duval", note: "Either lead can start Kirk's side quest. The third part is Lucia only, per PowerPyx." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's Search for the Skunk Ape walkthrough and its side-quest list. Reported, not confirmed by Rockstar.",
    spoilerLink: { href: "/guides/strangers-and-freaks", label: "Strangers & Freaks guide" },
    spoiler: [
      "Search for the Skunk Ape (Skunk Apeology 101), Chapter 1: you meet Kirk at his truck in the swamps at night. PowerPyx says he is badly disfigured from contact with skunk ape pollen. He hunts the creature with a drone and asks you to follow him. It pays $1,000.",
      "The trail: Kirk stops at a nesting site, and you can ask him about the pollen, the smell and the sound. You then check a feeding site and claw marks on a tree.",
      "The chase: you chase Mr. Mangrove but do not catch him. At the edge of the woods you find an effigy on a tree, which Kirk thinks is meant to look like him and was made to scare him off.",
      "The boar: a huge wild boar appears by the effigy and you run back to the truck. It rams you as you reach it, and Kirk rescues you.",
      "Later missions: \"Search for Tree Effigies\" and \"Help Kirk Find Mr. Mangrove (Advanced Skunk Apeonomics)\" follow. PowerPyx says the questline starts in Chapter 1 but cannot finish until Chapter 2.",
    ],
    tbc: ["His surname, age and voice actor.", "What happens in his second and third parts.", "Whether Mr. Mangrove is real."],
    sourceIds: ["pp-kirk", "pp-sf-list", "pp-world-map"],
    faq: [
      { question: "Who is Kirk in GTA 6?", answer: "Kirk is a side-quest character who hunts a creature he calls the Skunk Ape, also known as Mr. Mangrove. PowerPyx describes him; Rockstar has not published a profile." },
      { question: "How do you start Kirk's quests?", answer: "PowerPyx says you read one of his skunk ape flyers, such as the one at Skeeter's bar in Hamlet, and then call him from your phone contacts." },
      { question: "Can you do Kirk's quests in the day?", answer: "No. PowerPyx marks the first and third parts as night only. You can sleep in bed to move the time forward." },
      { question: "Does Kirk count toward the Strangers & Freaks trophy?", answer: "Yes. PowerPyx lists his questline among the strands that count." },
    ],
  },

  /* ---------------------------------------------------------------- Billy */
  {
    slug: "billy",
    name: "Billy",
    tier: "reported",
    updated: UPDATED,
    reportedNote: NOTE_PP_GS,
    sourceLine: "PowerPyx and GameSpot (not Rockstar)",
    seoTitle: "Billy in GTA 6: Dirt-Bike Crew Leader Side Quest",
    group: "side-quests",
    role: "Side-quest character; dirt-bike crew leader",
    initials: "B",
    accent: "orange",
    seoDescription:
      "Billy in GTA 6: the dirt-bike crew leader, how his five-part side quest starts, who rides with him and what is still to be confirmed.",
    summary:
      "Billy leads a crew of dirt-bike racers, according to PowerPyx. Rockstar has not published a profile.",
    background: [
      "PowerPyx lists five parts in Billy's questline. Either Jason or Lucia can start the first part, and Billy contacts you by phone for the next ones, with a delay between them.",
      "PowerPyx says the questline does not count toward the Strangers & Freaks trophy, but that it has a trophy of its own.",
      "Wyman is folded into this page. PowerPyx lists him as one of Billy's crew, alongside Ricardo, Brittney and Billy. GameSpot says Wyman is tied to two Ultimate Edition bonuses: the '67 Vapid Dominator Buggy, which you claim through him, and the Classic Car Collection, a set of abandoned classic cars you restore. Wyman has too little sourced detail for his own page.",
      "PowerPyx and GameSpot spell one Kelly County place name two ways. We do not treat either spelling as settled.",
    ],
    facts: [
      { label: "Role", value: "Leads a crew of dirt-bike racers (PowerPyx)", status: "reported" },
      { label: "Questline", value: "Five parts; does not count toward Strangers & Freaks but has its own trophy (PowerPyx)", status: "reported" },
      { label: "Crew", value: "Ricardo (Ricky), Brittney and Wyman (PowerPyx)", status: "reported" },
      { label: "Wyman", value: "Tied to two Ultimate Edition bonuses (GameSpot)", status: "reported" },
      { label: "Surname, age and voice actor", value: "Not given by any outlet we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Jason Duval and Lucia Caminos", slug: "jason-duval", note: "Either lead can start the first part, per PowerPyx." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's walkthroughs and GameSpot. Reported, not confirmed by Rockstar.",
    spoilerLink: { href: "/database/locations/port-gellhorn", label: "Port Gellhorn" },
    spoiler: [
      "Thrillbillies (Check Out the Mud Club), Chapter 2: PowerPyx places Thrillbilly Mud Club in Kelly County, and it is the base for the first part. The mission is marked automatically after the story mission \"Coffee Break\". You buy new outfits for both leads at the merch stall, and a cutscene introduces Billy and his crew.",
      "How you meet Wyman: PowerPyx says you run into him during \"Coffee Break\" at the motel cafeteria, and he tells you about the dirt races. GameSpot says he contacts you from Chapter 2 once you redeem the buggy, and offers the classic-car restoration.",
      "The race: you rent a dirt bike at Roostere's Rentals and race 13 other riders. Finishing last does not impress Billy. First place pays up to $2,500.",
      "Twist Wrist, Smash, Grab (Join Billy on a Job): a few in-game hours later Billy texts you to a bench in Port Gellhorn and gives you a Highwayman Sanchez dirt bike. The crew chases an armored truck until it crashes into a tree, and you plant a charge on its rear doors. It pays $2,000.",
      "The rest: PowerPyx lists \"Mall Rats (Join Billy on a Job)\", \"The Impaler (Steal the Impaler)\" and \"Hometown Heroes (Join Billy on a Job)\", and tags the last one \"The Lone Rider\". What that tag means is To be confirmed.",
    ],
    tbc: ["Billy's surname, age and voice actor.", "What the last three parts involve.", "How the crew connects to the gangs listed in our gangs page."],
    mapLinks: [{ href: "/map/port-gellhorn", label: "Port Gellhorn map", status: "reported", note: "The second part starts in Port Gellhorn, so this is the closest map page." }],
    sourceIds: ["pp-billy1", "pp-billy2", "pp-coffee-break", "pp-sf-list", "gs-ue-bonuses"],
    faq: [
      { question: "Who is Billy in GTA 6?", answer: "Billy leads a crew of dirt-bike racers. PowerPyx describes him. Rockstar has not published a profile." },
      { question: "Who rides with Billy?", answer: "PowerPyx lists Ricardo (Ricky), Brittney and Wyman as members of his crew." },
      { question: "Does Billy count toward the Strangers & Freaks trophy?", answer: "No. PowerPyx says Billy's questline does not count toward it, though it has its own trophy." },
      { question: "How many parts does Billy's side quest have?", answer: "PowerPyx lists five." },
    ],
  },

  /* ---------------------------------------------------------------- Yago */
  {
    slug: "yago",
    name: "Yago",
    tier: "reported",
    updated: UPDATED,
    reportedNote: NOTE_PP,
    sourceLine: "PowerPyx (not Rockstar)",
    seoTitle: "Yago in GTA 6: Vice City Street Racing Side Quest",
    group: "side-quests",
    role: "Side-quest character; street racer",
    initials: "Y",
    accent: "pink",
    seoDescription:
      "Yago in GTA 6: the Vice City street racer PowerPyx links to a Little Cuba restaurant, how his four-part side quest starts and what is unconfirmed.",
    summary:
      "Yago is a street racer whose questline starts in Vice City. PowerPyx says he has a restaurant in Little Cuba. Rockstar has not published a profile.",
    background: [
      "PowerPyx says Yago races with a group called Hit 'n' Run VC, and puts the racing area in Salton, which it lists under Vice City. His questline has four parts and counts toward the Strangers & Freaks trophy.",
      "PowerPyx marks the first, second and fourth parts as Jason only. It calls Yago the person the questline is really about, while the first part introduces street races in general.",
      "The follow-up parts arrive by phone message after long delays of several in-game days. PowerPyx says you can sleep at your apartment to pass the time.",
    ],
    facts: [
      { label: "Role", value: "Street racer with the Hit 'n' Run VC racers (PowerPyx)", status: "reported" },
      { label: "Restaurant", value: "Little Cuba, per PowerPyx. Rockstar names Little Cuba as a Vice City neighbourhood", status: "reported" },
      { label: "Racing area", value: "Salton, listed under Vice City by PowerPyx", status: "reported" },
      { label: "Questline", value: "Four parts; counts toward Strangers & Freaks; parts one, two and four are Jason only (PowerPyx)", status: "reported" },
      { label: "Map region", value: "Vice City, because Rockstar names Little Cuba as part of it", status: "confirmed" },
      { label: "Surname, age and voice actor", value: "Not given by any outlet we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Jason Duval", slug: "jason-duval", note: "Most of Yago's questline is Jason only, per PowerPyx." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's walkthroughs and side-quest list. Reported, not confirmed by Rockstar.",
    spoilerLink: { href: "/database/locations/vice-city", label: "Vice City" },
    spoiler: [
      "Join a Street Race, Chapter 3: it is marked a few minutes after the mission \"Dealer's Choice (Go See Dre'Quan)\", by a message from Manuel, a contact of Dre'Quan's. You rent one of three cars for $600 to $900 and race. First place pays $3,000.",
      "Meeting Yago: you meet him at the start of that race. He talks to you afterwards and sends the next missions later.",
      "Bumper to Bumper (Mentor Yago): the quest description says to visit his restaurant in Little Cuba. In the walkthrough you meet Yago at a street shop and then go to a nearby mod shop, where he pays for a full custom street racing build and a nitrous boost. The race itself pays nothing, and the police chase you afterwards. The mission pays $500.",
      "The meetup: after you lose the police, you meet Yago in the north of Vice City. He is impressed that you escaped.",
      "Race Against Yago: this third mission is time-sensitive and can be missed.",
      "Brother to Brother (Back Up Yago): the last mission is Jason only. What happens in it is To be confirmed.",
    ],
    tbc: ["Yago's surname, age and voice actor.", "The plot of the last two parts."],
    mapLinks: [{ href: "/map/vice-city", label: "Vice City map", status: "confirmed", note: "Confirmed for the region. Yago's restaurant itself is Reported." }],
    sourceIds: ["pp-yago1", "pp-yago2", "pp-sf-list", "rockstar-regions"],
    faq: [
      { question: "Who is Yago in GTA 6?", answer: "Yago is a street racer whose questline starts in Vice City. PowerPyx says he has a restaurant in Little Cuba. Rockstar has not published a profile." },
      { question: "Can Lucia do Yago's quests?", answer: "Not most of them. PowerPyx marks the first, second and fourth parts as Jason only." },
      { question: "Does Yago count toward the Strangers & Freaks trophy?", answer: "Yes. PowerPyx lists his questline among the strands that count." },
      { question: "Which map page covers Yago?", answer: "Use /map/vice-city. Rockstar names Little Cuba as part of Vice City." },
    ],
  },

  /* ---------------------------------------------------------------- Andy */
  {
    slug: "andy",
    name: "Andy",
    tier: "reported",
    updated: UPDATED,
    reportedNote: NOTE_PP,
    sourceLine: "PowerPyx (not Rockstar)",
    seoTitle: "Andy in GTA 6: Lucia-Only Side Quest Character",
    group: "side-quests",
    role: "Side-quest character; Lucia-only contact",
    initials: "A",
    accent: "pink",
    seoDescription:
      "Andy in GTA 6: the Lucia-only side-quest character, the group PowerPyx says she joined and what it says about her five-part side quest.",
    summary:
      "Andy is a side-quest character who appears only for Lucia. PowerPyx describes her five-part questline, and Rockstar has not published a profile.",
    background: [
      "PowerPyx says Andy phones Lucia and then texts her new home address, which marks the first part on the map. Jason cannot receive the message, so you must play as Lucia to start it. Her home is in Belville, which PowerPyx lists under Leonard County.",
      "PowerPyx says she belongs to a group it calls Cellerica. The same guide prints the name as Celeria once, so we do not treat either spelling as settled.",
      "Her questline has five parts, all Lucia only. PowerPyx says it does not count toward the Strangers & Freaks trophy, although it has a trophy of its own.",
    ],
    facts: [
      { label: "Role", value: "Side-quest contact who appears only for Lucia (PowerPyx)", status: "reported" },
      { label: "Group", value: "Cellerica per PowerPyx, which also prints Celeria once", status: "tbc" },
      { label: "Home", value: "Belville, listed under Leonard County (PowerPyx)", status: "reported" },
      { label: "Questline", value: "Five parts, all Lucia only; does not count toward Strangers & Freaks but has its own trophy (PowerPyx)", status: "reported" },
      { label: "Map page", value: "Belville has no matching map page", status: "tbc" },
      { label: "Surname, age and voice actor", value: "Not given by any outlet we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Lucia Caminos", slug: "lucia-caminos", note: "Andy's calls and texts go to Lucia only, per PowerPyx." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's Climbing the Cellerichain walkthrough and its side-quest list. Reported, not confirmed by Rockstar.",
    spoilerLink: { href: "/guides/strangers-and-freaks", label: "Strangers & Freaks guide" },
    spoiler: [
      "Timing: Andy's call comes in Chapter 3. PowerPyx saw it after Lucia's missions \"Mami Knows Best (Catch Up With Mia)\" and \"Car Service (Steal The Car for Raul)\", and says the timing may differ for other players.",
      "The group: Andy says she joined a group that sells vape sticks branded as \"Manifesticks\", and Lucia asks whether it is a cult. A woman called Bailey, whom Andy calls her pillar, joins the first meeting.",
      "The welcome kit: Andy gives Lucia a kit with a cap and a Manifestick. Those items are the first mission's reward.",
      "Delivery one: Lucia takes a package to a backyard in Waning Sands, where women are discussing erotica books.",
      "Delivery two: Lucia photographs Andy for a promo and delivers a package to a market stall in the north of Vice City.",
      "Delivery three: Lucia takes a package from Andy's garage to a house in Ambrosia. A man posing as the owner tries to steal it, and you can refuse. The real owner then opens the garage.",
      "The rest: the later parts are \"Pay the Cellerica Fee\", \"Peach!\", \"Read the Label\" and \"Puff Puff Pass\". All are Lucia only.",
    ],
    tbc: ["Andy's surname, age and voice actor.", "What happens in the last four parts.", "How the group's name is spelled in the finished game."],
    mapLinks: [
      { href: "/map/vice-city", label: "Vice City map", status: "reported", note: "A place her side quest visits." },
      { href: "/map/ambrosia", label: "Ambrosia map", status: "reported", note: "A place her side quest visits." },
    ],
    sourceIds: ["pp-andy", "pp-sf-list", "pp-world-map"],
    faq: [
      { question: "Who is Andy in GTA 6?", answer: "Andy is a side-quest character who appears only for Lucia. PowerPyx says she has joined a group it calls Cellerica. Rockstar has not published a profile." },
      { question: "Can Jason meet Andy?", answer: "No. PowerPyx says her calls and texts go to Lucia only, so you must play as Lucia to start her questline." },
      { question: "Does Andy count toward the Strangers & Freaks trophy?", answer: "No. PowerPyx says her questline does not count, although it has its own trophy." },
      { question: "How many parts does Andy's side quest have?", answer: "PowerPyx lists five parts." },
    ],
  },

  /* ---------------------------------------------------------------- Pilot Pete */
  {
    slug: "pilot-pete",
    name: "Pilot Pete",
    tier: "reported",
    updated: UPDATED,
    reportedNote: NOTE_PP_GS,
    sourceLine: "PowerPyx and GameSpot (not Rockstar)",
    seoTitle: "Pilot Pete in GTA 6: Jason's Delivery Pilot Side Quest",
    group: "side-quests",
    role: "Side-quest character; pilot",
    initials: "PP",
    accent: "blue",
    seoDescription:
      "Pilot Pete in GTA 6: the pilot who hands Jason his delivery runs, where his airfields are and what is still unconfirmed.",
    summary:
      "Pilot Pete is a pilot who gives Jason delivery jobs, according to PowerPyx. Rockstar has not published a profile.",
    background: [
      "PowerPyx says Pete reaches Jason by phone, and later parts arrive by text after a delay. All five parts are Jason only, and the questline counts toward the Strangers & Freaks trophy. PowerPyx says the jobs involve dropping packages from a plane.",
      "PowerPyx lists Sundown Private Airfield, in Leonard County, as the start. It puts an airstrip south of Port Gellhorn in his questline and calls a second airfield Wild Hog Airfield, in Kelly County. GameSpot calls a nearby spot Wild Hog Point, and we do not know whether the two names mean the same place.",
      "Sundown has no matching map page. The Port Gellhorn map page is the nearest one, but the match is loose.",
    ],
    facts: [
      { label: "Role", value: "Pilot who gives Jason delivery jobs (PowerPyx)", status: "reported" },
      { label: "First airfield", value: "Sundown Private Airfield, Leonard County (PowerPyx)", status: "reported" },
      { label: "Other places", value: "An airstrip south of Port Gellhorn and Wild Hog Airfield in Kelly County (PowerPyx)", status: "reported" },
      { label: "Questline", value: "Five parts, all Jason only; counts toward Strangers & Freaks (PowerPyx)", status: "reported" },
      { label: "Real name, age and voice actor", value: "Not given by any outlet we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Jason Duval", slug: "jason-duval", note: "Every part of Pete's questline is Jason only, per PowerPyx." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's walkthroughs and side-quest list. Reported, not confirmed by Rockstar.",
    spoilerLink: { href: "/database/locations/port-gellhorn", label: "Port Gellhorn" },
    spoiler: [
      "Timing: the first call comes early in Chapter 4, shortly after the story mission \"Pool Day\". PowerPyx compares the drops with an earlier sea plane mission in Chapter 1.",
      "The Last Mile: Passing the Torch (Recover Pete's Plane): Jason collects Pete's plane and makes his drops for him. In the hangar he can take a unique rifle called Pete's KZ-59 Assault Rifle.",
      "The drops: Jason flies over three marked sites and drops cocaine for buyers, then returns the plane. It pays $12,000.",
      "The Last Mile: Backseat Pilot (Deliver Packages): a text arrives about half a day later. Jason has two hours to drop seven packages, and flying into the big red circles on the map raises a wanted level. It pays $20,000 for finishing in time.",
      "The rest: PowerPyx lists \"Pete's Deliveries\" at Southpoint Airfield and Avery Allen & Co., then a final \"Deliver Packages\", and says the follow-up delivery quests each pay $20,000.",
      "Earlier appearance: in the main mission \"Clear Skies\" in Chapter 1, Jason escorts a plane that PowerPyx calls Pilot Pete's plane. Whether it is the same Pete is To be confirmed.",
    ],
    tbc: ["Pete's real name, age and voice actor.", "Where the packages come from.", "How his jobs connect to the gangs in the story."],
    mapLinks: [{ href: "/map/port-gellhorn", label: "Port Gellhorn map", status: "reported", note: "The nearest map page, but the match is loose. Sundown has no map page." }],
    sourceIds: ["pp-pete1", "pp-pete2", "pp-sf-list", "pp-clear-skies", "gs-plane"],
    faq: [
      { question: "Who is Pilot Pete in GTA 6?", answer: "Pilot Pete is a side-quest pilot who gives Jason delivery runs. PowerPyx describes him. Rockstar has not published a profile." },
      { question: "Can Lucia do Pilot Pete's side quest?", answer: "No. PowerPyx marks every part of his questline as Jason only." },
      { question: "Does Pilot Pete count toward the Strangers & Freaks trophy?", answer: "Yes. PowerPyx lists his questline among the strands that count." },
      { question: "Where does Pilot Pete's side quest start?", answer: "PowerPyx lists Sundown Private Airfield in Leonard County as the start." },
    ],
  },

  /* ---------------------------------------------------------------- Donnie */
  {
    slug: "donnie",
    name: "Donnie",
    tier: "reported",
    updated: UPDATED,
    reportedNote: NOTE_PP,
    sourceLine: "PowerPyx (not Rockstar)",
    seoTitle: "Donnie in GTA 6: The Pilot Linked to Brian Heder",
    group: "keys",
    role: "Supporting character; smuggling pilot",
    initials: "D",
    accent: "blue",
    seoDescription:
      "Donnie in GTA 6: the pilot PowerPyx links to Brian Heder's smuggling operation, where his trailer sits, how he links to the Keys and what is unconfirmed.",
    summary:
      "Donnie is a pilot who drops drug packages for Brian Heder's smuggling operation, according to PowerPyx. Rockstar has not published a profile for him.",
    background: [
      "PowerPyx says Brian runs that operation and that Jason works as his fixer, and that Donnie is a contact of Jason's in the early game. Rockstar's profile of Brian describes a drug runner who is still moving product through his boat yard. That matches the setting, but Rockstar does not mention Donnie.",
      "PowerPyx says Donnie's trailer is in Key Lento and shows as a fence on the map. It links him to a sea plane and a start point in Southwind, in Mariana County, and to swamp locations near Hamlet and Pelican Valley.",
      "The Leonida Keys map page is the closest match, but the link is inferred from the Key Lento trailer. Southwind and Pelican Valley have no matching map page.",
    ],
    facts: [
      { label: "Role", value: "Pilot in Brian Heder's smuggling operation (PowerPyx)", status: "reported" },
      { label: "Trailer", value: "Key Lento, shown as a fence on the map (PowerPyx)", status: "reported" },
      { label: "Other places", value: "Southwind in Mariana County, plus swamps near Hamlet and Pelican Valley (PowerPyx)", status: "reported" },
      { label: "Rockstar profile", value: "None. Rockstar describes Brian's operation but does not name Donnie", status: "tbc" },
      { label: "Surname, age and voice actor", value: "Not given by any outlet we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Brian Heder", slug: "brian-heder", note: "Runs the smuggling operation Donnie flies for, per PowerPyx. Rockstar describes Brian as a drug runner with a boat yard in the Keys." },
      { name: "Jason Duval", slug: "jason-duval", note: "PowerPyx calls Donnie a contact of Jason's in the early game." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's walkthroughs. Reported, not confirmed by Rockstar. This includes plot beats.",
    spoilerLink: { href: "/guides/missions/gone-fishing", label: "Gone Fishing guide" },
    spoiler: [
      "Gone Fishing (Chapter 1): Donnie drops drug packages from his plane into the ocean while Jason and Cal fish them out. At the swamp docks the Kingfishers gang captures him, and Jason sneaks in to untie him. Jason flies a sea plane back to Brian's Marina, where he meets Brian.",
      "Clean Up After Donnie (Donnie's Drop): the morning after Lucia's release, Donnie calls about a stray package near Hamlet. Jason recovers the cocaine from a Kingfisher shack and takes it to Donnie's trailer. The $600 reward arrives later in Jason's mailbox.",
      "Clear Skies (Join Donnie On A Job): Brian sends Jason to Southwind to join Donnie on a flight. A deal with a contact PowerPyx calls \"Devil's Dozen\" goes wrong, and bikers from Final Chapter take Donnie. Jason rescues him and holds them off.",
      "Don Gone (Head to Donnie's Trailer): PowerPyx says Donnie was fed to the pigs, and Brian orders Jason to make the trailer look as if Donnie packed up and left town.",
      "The clean-up: Jason packs Donnie's belongings, deals with three men called Aviators and destroys Donnie's car. Before he does, he can take a unique revolver variant called Donnie's H&L .38 from the trunk. The reward is missable.",
    ],
    tbc: ["Donnie's surname, age and voice actor.", "Whether Rockstar will profile him."],
    mapLinks: [{ href: "/map/leonida-keys", label: "Leonida Keys map", status: "reported", note: "Inferred from the Key Lento trailer." }],
    sourceIds: ["pp-gone-fishing", "pp-donnies-drop", "pp-clear-skies", "pp-don-gone", "rockstar-profiles"],
    faq: [
      { question: "Who is Donnie in GTA 6?", answer: "Donnie is a pilot who flies drug packages in Brian Heder's smuggling operation. PowerPyx describes him. Rockstar has not published a profile." },
      { question: "Where does Donnie live?", answer: "PowerPyx says his trailer is in Key Lento and is marked on the map as a fence." },
      { question: "Has Rockstar profiled Donnie?", answer: "No. Rockstar's Brian Heder profile covers the drug-running operation, but Rockstar has not published a profile for Donnie." },
      { question: "Which map page covers Donnie?", answer: "Use /map/leonida-keys. The link is Reported, because it relies on PowerPyx placing his trailer in Key Lento." },
    ],
  },

  /* ---------------------------------------------------------------- Bret */
  {
    slug: "bret",
    name: "Bret Vogel",
    tier: "reported",
    updated: UPDATED,
    reportedNote:
      "Rockstar has not published a profile for Bret. Push Square and PowerPyx both give his name and business, so those are Confirmed. Everything else is Reported and credited to the outlet that says it. Missions, chapters and rewards are blurred.",
    sourceLine: "Push Square and PowerPyx (not Rockstar)",
    seoTitle: "Bret Vogel in GTA 6: Killtelligence Hunting Boss",
    group: "side-quests",
    role: "Supporting character; hunting contact",
    initials: "BV",
    accent: "turq",
    seoDescription:
      "Bret Vogel in GTA 6: the Killtelligence hunting boss named by Push Square and PowerPyx, his Mount Kalaga link and what is still unconfirmed.",
    summary:
      "Bret Vogel runs Killtelligence, a hunting business. Push Square and PowerPyx both name him, and Rockstar has not published a profile.",
    background: [
      "Push Square calls him the \"Killtelligence Provisions boss, Bret Vogel\". PowerPyx lists the quest giver as Bret Vogel and says Bret tells you he runs a business called Killtelligence. Both outlets agree on the first name, the surname and the company name.",
      "PowerPyx calls him an old friend of Jason and says they served together in the army. Push Square does not mention their history, and Rockstar's own Jason profile does not mention Bret, so the friendship rests on PowerPyx alone.",
      "Bret sends hunting jobs, which Push Square calls Hunting Target Decks and says there are 15 of. Each time you finish one, Push Square says he texts you about the next, and his texts often hint at the animals. Push Square says he accepts animals only in Pristine or Good condition and recommends hitting vitals such as the head or heart, a good scope and a pick-up truck for smaller animals. It also mentions Randy in connection with carcass pick-ups.",
      "PowerPyx says only Jason can receive his first text and that Jason must go alone. It places his hunting business near Mount Kalaga, in Lummox County in the far north. Push Square names Mount Kalaga National Park as a hunting area. Rockstar lists Mount Kalaga as one of its six regions.",
    ],
    facts: [
      { label: "Name", value: "Bret Vogel (Push Square and PowerPyx agree)", status: "confirmed" },
      { label: "Business", value: "Killtelligence (Push Square writes Killtelligence Provisions)", status: "confirmed" },
      { label: "History with Jason", value: "Old friends from the army, per PowerPyx only", status: "reported" },
      { label: "Hunting jobs", value: "15 Hunting Target Decks (Push Square)", status: "reported" },
      { label: "First quest", value: "Jason only; the questline has a trophy of its own (PowerPyx)", status: "reported" },
      { label: "Where", value: "Near Mount Kalaga, Lummox County (PowerPyx); Lummox County has no matching map page", status: "reported" },
      { label: "Age, appearance and voice actor", value: "Not given by any outlet we checked", status: "tbc" },
    ],
    relationships: [
      { name: "Jason Duval", slug: "jason-duval", note: "Old friend, per PowerPyx. Only Jason receives Bret's first text." },
      { name: "Randy", slug: "randy", note: "Push Square mentions Randy in connection with carcass pick-ups." },
    ],
    spoilerTitle: "Missions and story",
    spoilerNote: "From PowerPyx's walkthrough and Push Square's deck guide. Reported, not confirmed by Rockstar.",
    spoilerLink: { href: "/guides/strangers-and-freaks", label: "Strangers & Freaks guide" },
    spoiler: [
      "Timing: PowerPyx says Jason gets Bret's text in Chapter 2, after the story mission \"Coffee Break\", while he is saving $15,000 for \"Prepare for Vice City\".",
      "First quest: \"Veteran Hunted (Meet Bret)\" starts in Lummox County, and Lucia cannot be with Jason. PowerPyx says it acts as a tutorial on hunting.",
      "Reward: PowerPyx says it pays $500 through BuckMe and gives Jason a unique rifle variant, which it calls the \"Killtelligence SM-69\".",
      "The hunt: Jason follows a scent trail from a truck to a deer, studies it and shoots it. A single shot to the heart or head leaves it in pristine condition. He then loads the carcass into the truck and drops it in a processing area at the cabin.",
      "Kill Salt: during the drive Bret says he sells a salt he calls \"Kill Salt\", which PowerPyx says is infused with adrenaline and cortisol from freshly hunted animals. Bret claims it makes meat taste like fresh game.",
      "The decks: PowerPyx lists the questline as \"Veteran Hunted\" followed by \"Bret's Target Decks\", and its Strangers & Freaks page names the second part \"Bret's Hunting Decks\" with the tag \"Fair Game\".",
      "Deck one: Push Square names it \"Adrenal Glands and Venison\". It asks for a Whitetail Buck and a Whitetail Doe, found around Mount Kalaga National Park and an abandoned concrete plant.",
      "Deck two: Push Square names it \"Hog Endocrine Glands\". It asks for a white turkey, an Eastern Spotted Skunk and a Wild Boar, found around Adler Creek, Bonanza and Mount Kalaga National Park.",
      "Deck three: Push Square names it \"Cane Toad Venom Glands\". It asks for a Cane Toad, a Nutria and a Nile Monitor, found around West and East Buckskin Swamp and Pelican Valley.",
      "Weapon names disagree: PowerPyx calls the reward rifle the \"Killtelligence SM-69\", while Push Square says it used a \"Shrewsbury SM-69\". Whether these are the same gun is To be confirmed.",
      "Push Square marks its deck list as a work in progress, with only some decks covered so far.",
    ],
    tbc: [
      "Bret's age, appearance and army service details.",
      "His voice actor.",
      "Whether Lummox County matches the Mount Kalaga map page exactly.",
      "Whether the two outlets' weapon names refer to one weapon.",
      "Whether his questline counts toward the main Strangers & Freaks total. PowerPyx lists it with its own trophy and does not say.",
    ],
    mapLinks: [
      { href: "/map/mount-kalaga", label: "Mount Kalaga map", status: "reported", note: "Rockstar confirms the region. PowerPyx and Push Square tie Bret's jobs to it." },
    ],
    sourceIds: ["ps-bret", "pp-bret", "pp-sf-list", "rockstar-regions", "rockstar-profiles"],
    faq: [
      { question: "Who is Bret Vogel in GTA 6?", answer: "Bret Vogel is the boss of Killtelligence, a hunting business. Push Square and PowerPyx both name him, and PowerPyx calls him an old friend of Jason. Rockstar has not published a profile." },
      { question: "Is Bret's full name confirmed?", answer: "Yes, by two main outlets. Push Square writes \"Bret Vogel\", and so does PowerPyx. Rockstar itself has not named him." },
      { question: "Can Lucia meet Bret?", answer: "No. PowerPyx marks his first side quest as Jason only, so you must play as Jason to start it." },
      { question: "Which map page covers Bret?", answer: "Use /map/mount-kalaga. PowerPyx places his hunting business near Mount Kalaga, and Push Square lists Mount Kalaga National Park among his hunting areas." },
      { question: "How many hunting jobs does Bret offer?", answer: "Push Square says there are 15 Hunting Target Decks to complete for him." },
      { question: "Does Bret count toward the Strangers & Freaks trophy?", answer: "PowerPyx lists him as a Strangers & Freaks character with a trophy of his own. Whether he counts toward the main Strangers & Freaks total is To be confirmed." },
    ],
  },
];
