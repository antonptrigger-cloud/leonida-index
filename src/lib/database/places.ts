/**
 * Database batch 4: the gangs and locations pages.
 *
 * Wording is our own. Rockstar names six regions and a few Vice City places; county names,
 * sub-regions, counts and gang operations come from PowerPyx (its world map, train, ferry,
 * Ammu-Nation, gang-operation and Progress Database guides) and from GameSpot, so they are
 * Reported. Where outlets spell a name differently we say so and do not pick one as fact.
 * Story detail lives in the blurred `spoiler` block only.
 *
 * Imported by reference.ts (type-only import back), so these pages ride the same route
 * registration, sitemap and related-links plumbing as vehicles, weapons and radio.
 */
import type { RefPage, RefSource } from "@/lib/database/reference";

export const GANGS_PATH = "/database/gangs-factions";
export const LOCATIONS_PATH = "/database/locations";
export const VICE_CITY_PATH = "/database/locations/vice-city";
export const KEY_LENTO_PATH = "/database/locations/key-lento";
export const PORT_GELLHORN_PATH = "/database/locations/port-gellhorn";

const UPDATED = "2026-11-19";

const pp = (slug: string, label: string, used: string): RefSource => ({
  label: `PowerPyx: ${label} (18 Nov 2026)`,
  url: `https://www.powerpyx.com/${slug}/`,
  primary: false,
  used,
});

const ROCKSTAR_REGIONS: RefSource = {
  label: "Rockstar Games: GTA VI, Only in Leonida (region text)",
  url: "https://www.rockstargames.com/VI/vice-city",
  primary: true,
  used: "Region taglines and descriptions for Vice City, the Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga",
};

const ROCKSTAR_SHOTS: RefSource = {
  label: "Rockstar Games: GTA VI screenshots",
  url: "https://www.rockstargames.com/VI/downloads/screenshots",
  primary: true,
  used: "Screenshot set names only, such as PTT YOUNGIN$ Illegal Goods Store and Mount Kalaga National Park",
};

const ROCKSTAR_PROFILES: RefSource = {
  label: "Rockstar Games: GTA VI, Only in Leonida (character profiles)",
  url: "https://www.rockstargames.com/VI/vice-city",
  primary: true,
  used: "Jason, Brian Heder, Cal Hampton and Lucia profile text",
};

const PP_MAP = pp("gta-6-full-world-map-revealed", "GTA 6 Full World Map Revealed", "Counties, sub-regions, map size and the Vice City area list");
const PP_TRAINS = pp("gta-6-all-train-stations-locations", "GTA 6 All Train Stations Locations", "Train station count and names by county");
const PP_FERRY = pp("gta-6-all-ferry-terminals-locations", "GTA 6 All Ferry Terminals Locations", "The two ferry terminals and the $50 fare");
const PP_AMMU = pp("gta-6-all-ammu-nation-gun-stores-locations", "GTA 6 All Ammu-Nation Gun Stores Locations", "Store counts by county and store type");
const PP_GANGS = pp("gta-6-all-illegal-gang-operations-locations", "GTA 6 All Illegal Gang Operations Locations", "The nine gang groups, operation counts and named sites");
const PP_PROGRESS = pp("gta-6-collectible-guide-progress-database", "GTA 6 Collectible Guide: Progress Database", "The 9 Gangs (39 Gang Operations) line");
const PP_GONE_FISHING = pp("gta-6-gone-fishing-walkthrough", "Gone Fishing walkthrough", "Kingfishers, Pelican Valley, Key Lento reward (blurred section)");
const PP_DONNIES_DROP = pp("gta-6-clean-up-after-donnie-donnies-drop-walkthrough", "Clean Up After Donnie walkthrough", "Hamlet start, Kingfisher shack, Donnie's trailer in Key Lento (blurred section)");
const PP_CLEAR_SKIES = pp("gta-6-clear-skies-join-donnie-on-a-job-walkthrough", "Clear Skies walkthrough", "Final Chapter and the swamp airstrips (blurred section)");
const PP_KYLE_CHEM = pp("gta-6-collect-chemicals-for-kyle-walkthrough", "Collect Chemicals for Kyle walkthrough", "Final Chapter compound in Leonard County (blurred section)");
const PP_DON_GONE = pp("gta-6-don-gone-head-to-donnies-trailer-walkthrough", "Don Gone walkthrough", "Trailer location in Key Lento (blurred section)");
const PP_FULL = pp("gta-6-full-walkthrough-all-missions", "GTA 6 Full Walkthrough: All Missions", "Mission order and chapter names (blurred section)");
const PP_MUD_CLUB = pp("gta-6-thrillbillies-check-out-the-mud-club-walkthrough", "Thrillbillies (Check Out the Mud Club) walkthrough", "Mud Club in Kelly County; the one page that spells it Scarlet Motel");
const PP_COFFEE = pp("gta-6-coffee-break-walkthrough", "Coffee Break walkthrough", "Starlet Motel in Kelly County");
const PP_BILLY2 = pp("gta-6-twist-wrist-smash-grab-join-billy-on-a-job-walkthrough", "Twist Wrist, Smash, Grab walkthrough", "Billy's second job starts in Port Gellhorn (blurred section)");
const PP_PETE1 = pp("gta-6-the-last-mile-passing-the-torch-recover-petes-plane-walkthrough", "The Last Mile: Passing the Torch walkthrough", "Sundown Private Airfield and the airstrip south of Port Gellhorn (blurred section)");
const PP_PETE2 = pp("gta-6-the-last-mile-backseat-pilot-deliver-packages-walkthrough", "The Last Mile: Backseat Pilot walkthrough", "Wild Hog Airfield in Kelly County (blurred section)");
const PP_YAGO2 = pp("gta-6-bumper-to-bumper-mentor-yago-walkthrough", "Bumper to Bumper (Mentor Yago) walkthrough", "Yago's restaurant in Little Cuba (blurred section)");
const PP_YAGO1 = pp("gta-6-join-a-street-race-walkthrough", "Join a Street Race walkthrough", "Salton starting area (blurred section)");

const GS_UE: RefSource = {
  label: "GameSpot: How To Get All GTA 6 Ultimate Edition Bonuses (18 Nov 2026)",
  url: "https://www.gamespot.com/articles/how-to-get-all-gta-6-ultimate-edition-bonuses/",
  primary: false,
  used: "Southside, Crosstown, Stockyard, Key Lento and Lake Leonida shop locations; Starlet Motel",
};
const GS_PLANE: RefSource = {
  label: "GameSpot: How To Get A Plane In GTA 6 (18 Nov 2026)",
  url: "https://www.gamespot.com/articles/how-to-get-a-plane-in-gta-6/",
  primary: false,
  used: "Wild Hog Point, Vice City International Airport, Mile Zero Air Station, helipads, Lake Tallaloko",
};
const GS_SIX_STAR: RefSource = {
  label: "GameSpot: How To Get A Six-Star Wanted Level In GTA 6 (18 Nov 2026)",
  url: "https://www.gamespot.com/articles/how-to-get-a-six-star-wanted-level-in-gta-6/",
  primary: false,
  used: "The one GameSpot page that spells the air station Mike Zero",
};

const MAP_NOTE =
  "Map status: Confirmed means Rockstar places the name in that region. Reported means an outlet places it there, or the link is an inference we flag. To be confirmed means no matching map page exists yet.";

/* ------------------------------------------------------------------ gangs */

const GANGS: RefPage = {
  path: GANGS_PATH,
  updated: UPDATED,
  crumb: "Gangs and factions",
  seoTitle: "GTA 6 Gangs and Factions: Every Named Group",
  seoDescription:
    "GTA 6 gangs and factions: the nine groups behind 39 gang operations, what Rockstar names, where they operate and what is still unknown.",
  kicker: "Database · Gangs",
  h1: "GTA 6 Gangs and Factions",
  cardTitle: "Gangs and factions",
  cardBody: "The nine gang groups behind 39 operations, and what Rockstar has and has not named.",
  sourceLine: "Rockstar Games for names, PowerPyx and GameSpot for the rest (Reported)",
  intro:
    "GTA 6 has more gangs than Rockstar has talked about. Rockstar names one gang in its own material and describes one more without a name. PowerPyx lists nine gang groups by reading the in-game Progress menu. This page keeps those two levels of proof apart.",
  notice:
    "Rockstar has not published a gang list. The nine groups come from PowerPyx's gang guide and Progress Database, so they are Reported. Rockstar facts are marked Confirmed. We have not played the game ourselves. Mission links are in the blurred section at the end.",
  sections: [
    {
      id: "rockstar",
      heading: "What Rockstar says",
      status: "confirmed",
      paragraphs: [
        "Rockstar's Ultimate Edition screenshot sets include one titled \"PTT YOUNGIN$ Illegal Goods Store\". That set name is the only gang name Rockstar uses in the material we could read.",
        "Rockstar's Ambrosia text says the local sugar refinery provides the jobs, \"while the local biker gang provides almost everything else\". It does not name that gang.",
        "Rockstar also says Jason found work \"for local drug runners\" in the Keys before the story begins. It does not name those drug runners either.",
      ],
    },
    {
      id: "nine-groups",
      heading: "The nine gang groups",
      status: "reported",
      paragraphs: [
        "PowerPyx lists 39 gang operations across nine groups, and its Progress Database guide has the matching \"9 Gangs (39 Gang Operations)\" line. Eight groups are named gangs. The ninth, Other Criminals, is a catch-all.",
      ],
      table: {
        caption: "PowerPyx's gang groups, operation counts and the sites it names",
        columns: ["Group", "Operations", "Sites PowerPyx names"],
        rows: [
          ["Kingfishers", "3", "Fishing Shacks, Sunrise RV Park, Manatee Motel"],
          ["Kolts & Associates", "5", "Kingpin Bowling, June Warehouse, La Cascara Motel, Brooks Boatworks"],
          ["M7", "2", "M7 Compound"],
          ["La Polilla Negra", "2", "Palmer Fishing Warehouse"],
          ["Final Chapter", "4", "Farm Fix Meth Lab, Irons Building Supply"],
          ["San4San", "5", "Sound4Sond Studio (spelled as printed), JanJak's Garage"],
          ["PTT Youngin$", "2", "None named"],
          ["The Guardia Brothers", "3", "Casa Guardia"],
          ["Other Criminals", "13", "Slator Towing Inc, Chatfield Storage & Logistics, Leonida Carrier Warehouse, Cigar Import Front, Gas Station Meth Front, Backroom Weed Front, Carter Mining Boathouse"],
        ],
      },
      after: [
        "PowerPyx shows the remaining sites as \"Robbery Opportunity\" or \"Unknown\". Those are the labels the in-game map uses until you visit a site.",
        "PowerPyx adds a third PTT Youngin$ robbery that exists only for Ultimate Edition owners. The in-game gang stats do not count it.",
      ],
    },
    {
      id: "how-it-works",
      heading: "How gang operations work",
      status: "reported",
      paragraphs: [
        "PowerPyx says entering a site marks it on the map with a yellow icon, and the Progress menu then shows how many operations you have found and finished for each gang.",
        "It says each site holds key valuables, usually unique weapon variants, luxury watches and a cash safe. Narcotics found inside can be sold to a fence. A cleared site greys out for a while and then respawns.",
        "PowerPyx says robbing one operation of each gang is what the Pest Control trophy asks for.",
      ],
    },
    {
      id: "where",
      heading: "Where each gang operates",
      status: "reported",
      paragraphs: [
        "Very few groups have a place in the text we could check. We leave the rest as To be confirmed rather than guess from fan wikis.",
      ],
      list: [
        "PTT Youngin$: GameSpot says the Illegal Goods Store compound is in the Southside part of Vice City.",
        "Kingfishers and Final Chapter: PowerPyx's walkthroughs place both at named spots. Those places are in the blurred section below.",
        "Kolts & Associates, M7, La Polilla Negra, San4San and The Guardia Brothers: no outlet we checked gives a region in text. To be confirmed.",
        "Which gang is Rockstar's Ambrosia biker gang: not stated by any main outlet we checked. To be confirmed.",
      ],
    },
    {
      id: "map",
      heading: "Map links",
      status: "reported",
      paragraphs: [MAP_NOTE],
      links: [
        { href: "/map/vice-city", label: "Vice City map", note: "Reported: home of the PTT Youngin$ compound, per GameSpot." },
        { href: "/map/ambrosia", label: "Ambrosia map", note: "Confirmed region for Rockstar's unnamed biker gang. The gang's name is To be confirmed." },
      ],
      after: ["Every other gang has no matching map page. To be confirmed."],
    },
    {
      id: "tbc",
      heading: "Still to be confirmed",
      status: "tbc",
      list: [
        "Which gang is Rockstar's Ambrosia biker gang.",
        "A region for five of the nine groups.",
        "Leaders, members and history for every group.",
        "Whether gang wars, turf or joinable gangs exist.",
      ],
    },
  ],
  spoiler: {
    heading: "Where the gangs show up in missions",
    label: "mission places",
    intro: "This lists mission places and plot beats from launch-day guides. Reveal it only if you are happy to see them.",
    items: [
      "PowerPyx places the Kingfishers in Pelican Valley, a swamp sub-region of Mariana County, and a Kingfisher shack in the swamps south-west of Hamlet.",
      "PowerPyx places Final Chapter members at an airstrip in the swamps and at a compound in Leonard County.",
      "In Gone Fishing the Kingfishers capture the pilot Donnie at a swamp dock deal and Jason has to free him. In Clean Up After Donnie, Jason fights three Kingfishers at a shack to recover a stolen package.",
      "In Clear Skies, bikers from Final Chapter break up a deal and take Donnie away. In Collect Chemicals for Kyle, Final Chapter members at a Leonard County compound ask $5,000 for a van of chemicals.",
      "GameSpot says the PTT Youngin$ compound can be robbed from Chapter 1 for special items and contraband.",
      "PowerPyx's Clear Skies page mentions a contact it calls \"Devil's Dozen\", and its Don Gone page mentions three men called Aviators. Whether either is a gang is To be confirmed.",
    ],
  },
  updateNote:
    "We update this page as the community works through the game and Rockstar publishes more. Rockstar facts are retold in our own words; nothing here is copied from a fan wiki.",
  related: [
    { href: "/database/locations", label: "GTA 6 locations" },
    { href: "/database/characters/brian-heder", label: "Brian Heder" },
    { href: "/database/characters/raul-bautista", label: "Raul Bautista" },
    { href: "/database/characters/donnie", label: "Donnie" },
  ],
  faq: [
    {
      question: "How many gangs are in GTA 6?",
      answer:
        "PowerPyx's Progress Database counts 9 gang groups. Eight are named gangs and the ninth is a catch-all called Other Criminals. Only one outlet reports this, so it is Reported.",
    },
    {
      question: "How many gang operations are there?",
      answer:
        "PowerPyx counts 39 illegal gang operations. They are hideouts you can rob, and the map shows them with a yellow icon once you enter.",
    },
    {
      question: "What is inside a gang operation?",
      answer:
        "PowerPyx says they hold cash safes and often narcotics you can sell to a fence. Many also hold key valuables such as unique weapon variants and luxury watches.",
    },
    {
      question: "Which gang does Rockstar name?",
      answer:
        "Rockstar names the PTT Youngin$ in the title of an Ultimate Edition screenshot set. Rockstar also describes a local biker gang in Ambrosia but does not name it in the text we could read.",
    },
    {
      question: "Can you join a gang in GTA 6?",
      answer:
        "We found no main outlet that says you can. PowerPyx treats gangs as targets to rob. We will update this page if that changes.",
    },
  ],
  sources: [ROCKSTAR_REGIONS, ROCKSTAR_SHOTS, PP_GANGS, PP_PROGRESS, GS_UE, PP_GONE_FISHING, PP_DONNIES_DROP, PP_CLEAR_SKIES, PP_KYLE_CHEM, PP_DON_GONE],
};

/* ------------------------------------------------------------------ locations index */

const LOCATIONS: RefPage = {
  path: LOCATIONS_PATH,
  updated: UPDATED,
  crumb: "Locations",
  seoTitle: "GTA 6 Locations: Regions, Counties and Named Places",
  seoDescription:
    "GTA 6 locations: Rockstar's six regions, the five counties PowerPyx lists, named places, transport counts and a map page for every region.",
  kicker: "Database · Locations",
  h1: "GTA 6 Locations",
  cardTitle: "Locations",
  cardBody: "Rockstar's six regions, PowerPyx's five counties and the named places inside them.",
  sourceLine: "Rockstar Games for regions, PowerPyx and GameSpot for the rest (Reported)",
  intro:
    "Leonida has two layers of names. Rockstar's layer is six regions. PowerPyx's layer is five counties with many sub-regions. The two do not line up one to one, and no outlet we checked explains how they fit together. We list both and link each region to the site's map pages.",
  notice:
    "Rockstar confirms the six regions and a few Vice City places. County names and most place names come from PowerPyx's world map, so they are Reported. Spellings follow the pages we read. We have not played the game ourselves. Mission-linked places are in the blurred section.",
  sections: [
    {
      id: "regions",
      heading: "The six regions",
      status: "confirmed",
      paragraphs: ["Rockstar describes each region on its Only in Leonida pages. The county column is PowerPyx's grouping and is Reported."],
      table: {
        caption: "Rockstar's six regions with their map pages and PowerPyx's county",
        columns: ["Region", "Map page", "What Rockstar says", "County per PowerPyx"],
        rows: [
          ["Vice City", "/map/vice-city", "A glamorous city of art deco hotels, beaches, a port and a flea market.", "Vice-Dale"],
          ["Leonida Keys", "/map/leonida-keys", "A tropical archipelago where life is easy and the water is dangerous.", "To be confirmed"],
          ["Grassrivers", "/map/grassrivers", "A mangrove wetland where alligators are the best-known attraction.", "Mariana"],
          ["Port Gellhorn", "/map/port-gellhorn", "A run-down former holiday coast with a painkiller and malt liquor economy.", "Kelly"],
          ["Ambrosia", "/map/ambrosia", "A sugar refinery town where a biker gang provides most other things.", "To be confirmed"],
          ["Mount Kalaga", "/map/mount-kalaga", "A northern national landmark with hunting, fishing and off-road trails.", "Lummox"],
        ],
      },
      after: [
        "Rockstar's screenshot sets name the last region Mount Kalaga National Park. PowerPyx's train list has an Ambrosia station under Kelly County, which hints at that region's county, but no outlet says so outright.",
      ],
    },
    {
      id: "counties",
      heading: "Counties and map size",
      status: "reported",
      paragraphs: [
        "PowerPyx says the in-game map has five counties: Mariana, Vice-Dale, Kelly, Leonard and Lummox. It gives the map size as 175 square kilometres (about 16 km by 10.9 km), with roughly 35% water. Rockstar has not published a size, so treat this as unofficial.",
        "PowerPyx lists these sub-regions, spelled as it prints them. The nesting on its page is hard to read, so treat the groupings as approximate.",
      ],
      list: [
        "Mariana County: Mile Zero Air Station, Southwind, Key Lento, Pelican Valley, Watson Bay, Grassrivers, Capri and North Mariana County.",
        "Vice-Dale County: Hamlet, South Vice-Dale County, VCIA, Vice City, West Vice-Dale County and Vice Beach.",
        "Kelly County: South Kelly County, Port Gellhorn, Draper Island and North Kelly County.",
        "Leonard County: South Leonard County, Belville, Waning Sands and North Leonard County.",
        "Lummox County: South West Lummox County, Grayson, Bonanza, East Lummox County and Millport.",
      ],
      after: [
        "PowerPyx lists 23 named areas under Vice City, including Southside, Downtown, Little Cuba, Salton, Crosstown, La Perle, Stockyard, Starfish Island, Waxman Island and Dalton Island. It lists Ocean Beach and Washington Beach under Vice Beach.",
      ],
    },
    {
      id: "places",
      heading: "Named places and map links",
      status: "reported",
      paragraphs: [MAP_NOTE],
      table: {
        caption: "Named places, what outlets say about each and the nearest map page",
        columns: ["Place", "What the outlets say", "Map page", "Map status"],
        rows: [
          ["Ocean Beach", "Rockstar names it in Vice City for pastel art deco hotels and white sand.", "/map/vice-city", "Confirmed"],
          ["Little Cuba", "Rockstar names it in Vice City for its bakeries.", "/map/vice-city", "Confirmed"],
          ["Tisha-Wocka flea market", "Rockstar names it in Vice City for bootleg brands.", "/map/vice-city", "Confirmed"],
          ["VC Port", "Rockstar calls it the cruise ship capital of the world.", "/map/vice-city", "Confirmed"],
          ["Southside", "GameSpot places the PTT Youngin$ compound in this part of Vice City.", "/map/vice-city", "Reported"],
          ["Crosstown", "GameSpot places a mod shop here, north of the Vice City label on the map.", "/map/vice-city", "Reported"],
          ["Stockyard", "GameSpot places a clothing store and a tattoo shop here. PowerPyx lists it under Vice City.", "/map/vice-city", "Reported"],
          ["Salton", "PowerPyx lists it under Vice City.", "/map/vice-city", "Reported"],
          ["Washington Beach", "PowerPyx lists it under Vice Beach in Vice-Dale County. GameSpot names a building there.", "/map/vice-city", "To be confirmed"],
          ["Key Lento", "PowerPyx lists it under Mariana County.", "/map/leonida-keys", "Reported (inferred)"],
          ["Mile Zero Air Station", "PowerPyx and GameSpot's plane guide write Mile Zero. GameSpot's wanted-level guide writes Mike Zero. All put it west of Key Lento or in Mariana County.", "/map/leonida-keys", "To be confirmed"],
          ["Hamlet", "PowerPyx lists it under Vice-Dale County.", "None", "To be confirmed"],
          ["Capri", "PowerPyx lists it under Mariana County.", "None", "To be confirmed"],
          ["Wild Hog Point", "PowerPyx lists it under Port Gellhorn. GameSpot puts it west of Port Gellhorn.", "/map/port-gellhorn", "Reported"],
          ["Lake Leonida", "PowerPyx lists it under North Leonard County. GameSpot places a mod shop there.", "None", "To be confirmed"],
          ["Lake Tallaloko", "PowerPyx lists it under East Lummox County. GameSpot places a gated community there, north of Millport.", "None", "To be confirmed"],
          ["Millport", "PowerPyx lists it under Lummox County.", "None", "To be confirmed"],
          ["Belville", "PowerPyx lists it under Leonard County.", "None", "To be confirmed"],
          ["Waning Sands", "PowerPyx lists it under Leonard County.", "None", "To be confirmed"],
          ["Allied Crystal sugar refinery", "Rockstar says it is the main employer in Ambrosia.", "/map/ambrosia", "Confirmed"],
          ["Pelican Valley", "PowerPyx lists this swamp area under Mariana County, apart from Grassrivers.", "None", "To be confirmed"],
          ["Mount Kalaga National Park", "PowerPyx lists it under South West Lummox County. Rockstar's screenshot sets use the name.", "/map/mount-kalaga", "Confirmed"],
          ["Leonida Penitentiary", "Rockstar names it in Lucia's profile and gives no location.", "None", "To be confirmed"],
        ],
      },
    },
    {
      id: "spellings",
      heading: "Where outlets disagree on a name",
      status: "tbc",
      list: [
        "Mile Zero or Mike Zero Air Station: PowerPyx and GameSpot's plane guide write Mile Zero, and GameSpot's wanted-level guide writes Mike Zero. We use Mile Zero for now and flag it.",
        "Starlet or Scarlet Motel: GameSpot and most PowerPyx pages write Starlet. PowerPyx's Mud Club walkthrough prints Scarlet once.",
        "Emerald River and Emerland Springs: both appear on PowerPyx's own list, spelled as printed.",
      ],
    },
    {
      id: "transport",
      heading: "Getting around",
      status: "reported",
      paragraphs: [
        "PowerPyx counts 25 train stations: 2 in Mariana County, 17 in Vice-Dale County, 1 in Leonard County, 3 in Kelly County and 2 in Lummox County. Named stops include Capri, Crosstown, Vice City Central, Waning Sands, Port Gellhorn, Millport and Grayson.",
        "PowerPyx counts two ferry terminals, Waxman Island and Dalton Island, and says the crossing costs $50.",
        "PowerPyx counts 24 Ammu-Nation stores: 5 in Mariana County, 14 in Vice-Dale County, 1 in Leonard County, 3 in Kelly County and 1 in Lummox County.",
      ],
    },
    {
      id: "map",
      heading: "Region map pages",
      status: "confirmed",
      links: [
        { href: "/map/vice-city", label: "Vice City" },
        { href: "/map/leonida-keys", label: "Leonida Keys" },
        { href: "/map/grassrivers", label: "Grassrivers" },
        { href: "/map/port-gellhorn", label: "Port Gellhorn" },
        { href: "/map/ambrosia", label: "Ambrosia" },
        { href: "/map/mount-kalaga", label: "Mount Kalaga" },
      ],
    },
    {
      id: "tbc",
      heading: "Still to be confirmed",
      status: "tbc",
      list: [
        "How Rockstar's six regions fit inside the five counties.",
        "The county for the Leonida Keys and Ambrosia.",
        "A map page for Hamlet, Capri and the inland counties.",
        "An official Rockstar map. Do not treat the map size as final.",
      ],
    },
  ],
  spoiler: {
    heading: "Places tied to missions",
    label: "mission places",
    intro: "This lists places that matter to missions and chapters. Reveal it only if you are happy to see them.",
    items: [
      "Key Lento: PowerPyx says finishing the second main mission, Gone Fishing, gives Jason a house here.",
      "Pelican Valley: the Kingfishers hold Donnie at a swamp dock in the opening missions, per PowerPyx.",
      "Starlet Motel: PowerPyx puts it in Kelly County, and GameSpot says you meet Wyman there in Chapter 2.",
      "Ocean Beach: PowerPyx's full walkthrough lists a Chapter 4 main mission called \"Ocean Beach\".",
    ],
  },
  updateNote:
    "We update this page as more of the map is explored. County and sub-region names follow PowerPyx's spelling until Rockstar publishes its own list.",
  related: [
    { href: "/database/locations/vice-city", label: "Vice City" },
    { href: "/database/locations/key-lento", label: "Key Lento" },
    { href: "/database/locations/port-gellhorn", label: "Port Gellhorn" },
    { href: "/database/gangs-factions", label: "Gangs and factions" },
  ],
  faq: [
    {
      question: "How many regions are in GTA 6?",
      answer: "Rockstar names six: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia and Mount Kalaga.",
    },
    {
      question: "How many counties does Leonida have?",
      answer: "PowerPyx says the in-game map has five: Mariana, Vice-Dale, Kelly, Leonard and Lummox. Only one outlet reports this, so it is Reported.",
    },
    {
      question: "How big is the GTA 6 map?",
      answer: "PowerPyx gives 175 square kilometres, about 16 km by 10.9 km, with roughly 35% water. Rockstar has not published a size, so this is Reported.",
    },
    {
      question: "Which county is Vice City in?",
      answer: "PowerPyx lists Vice City under Vice-Dale County. It also lists Hamlet, the airport and the beaches there.",
    },
    {
      question: "Where does the game start?",
      answer: "Rockstar says Jason was working for drug runners in the Keys before the story. PowerPyx lists the opening missions in Mariana County.",
    },
  ],
  sources: [ROCKSTAR_REGIONS, ROCKSTAR_PROFILES, ROCKSTAR_SHOTS, PP_MAP, PP_TRAINS, PP_FERRY, PP_AMMU, GS_UE, GS_PLANE, GS_SIX_STAR, PP_GONE_FISHING, PP_COFFEE, PP_MUD_CLUB, PP_FULL],
};

/* ------------------------------------------------------------------ Vice City */

const VICE_CITY: RefPage = {
  path: VICE_CITY_PATH,
  updated: UPDATED,
  child: { parentPath: LOCATIONS_PATH, parentLabel: "GTA 6 Locations" },
  crumb: "Vice City",
  seoTitle: "Vice City in GTA 6: Districts, Beaches and Transport",
  seoDescription:
    "Vice City in GTA 6: the four places Rockstar names, the 23 areas PowerPyx lists, Ocean Beach, transport stops and the map page to open next.",
  kicker: "Database · Locations",
  h1: "Vice City",
  cardTitle: "Vice City",
  cardBody: "Districts, beaches and transport in Vice City.",
  sourceLine: "Rockstar Games for region text, PowerPyx and GameSpot for the rest (Reported)",
  intro:
    "Vice City is the main city of Leonida and the first region Rockstar lists. This page collects every Vice City place that an outlet we trust names, including Ocean Beach, and does not claim anything about layout beyond what they say.",
  notice:
    "Region text is Confirmed from Rockstar. County, sub-region and transport lists come from PowerPyx and GameSpot and are Reported. We have not played the game ourselves. Story-linked places are in the blurred section.",
  sections: [
    {
      id: "rockstar",
      heading: "What Rockstar says",
      status: "confirmed",
      paragraphs: [
        "Rockstar's tagline for the region is \"Everything in Excess\", and it calls Vice City \"the sun and fun capital of America\". It describes the city as the glamour, hustle and greed of America in one place, and it names four neighbourhoods and landmarks.",
      ],
      list: [
        "Ocean Beach: pastel art deco hotels and bright white sands.",
        "Little Cuba: busy panaderias.",
        "Tisha-Wocka flea market: bootleg brands.",
        "VC Port: the \"cruise ship capital of the world\".",
      ],
    },
    {
      id: "counties",
      heading: "Counties and sub-regions",
      status: "reported",
      paragraphs: [
        "PowerPyx lists Vice City under Vice-Dale County and names 23 areas under it: Southside, Peacock Bay, Tequesta, Tequesta Retreat, Downtown, Little Cuba, Salton, Rockridge, Crosstown, Bayside, La Perle, Balsero, Stockyard, Decor District, Leaf Links, Rialto Islands, Starfish Island, Waxman Island, Port Vice City, Catalan Bay, Catalan Key, Gloriana Key and Dalton Island.",
        "PowerPyx lists Vice Beach as a separate sub-region of Vice-Dale County, with Ocean Beach, Washington Beach and the Atlantic Ocean under it. It lists Vice City International Airport as VCIA in the same county.",
      ],
    },
    {
      id: "ocean-beach",
      heading: "Ocean Beach",
      status: "reported",
      paragraphs: [
        "Rockstar names Ocean Beach first among Vice City's neighbourhoods, for its pastel art deco hotels and bright white sands. That part is Confirmed.",
        "PowerPyx files Ocean Beach under Vice Beach rather than among its 23 Vice City areas. The two lists use different names for the same coast, and no outlet explains how they fit. To be confirmed.",
      ],
    },
    {
      id: "gamespot",
      heading: "Places named by GameSpot",
      status: "reported",
      list: [
        "Southside: the PTT Youngin$ Illegal Goods Store compound is in this part of Vice City.",
        "Crosstown: the Rideout Customs mod shop is here, north of the Vice City label on the map.",
        "Stockyard: the Stock 305 clothing store and the Electric Fang tattoo parlor are here.",
        "Downtown: the Maven Residences skyscraper is south-west of Panos Plaza and has a helicopter on its roof.",
        "Washington Beach: the large Crimson Palms building in the north has a rooftop helipad.",
        "Airport: Vice City International Airport is in south-west Vice-Dale County, just north of Mariana County.",
      ],
    },
    {
      id: "transport",
      heading: "Getting around",
      status: "reported",
      paragraphs: [
        "PowerPyx counts 17 of the game's 25 train stations in Vice-Dale County. They include Downtown, Courthouse, Crosstown, Vice City Arts Center, Vice City Central and Vice City Airport Central.",
        "A ferry runs between Waxman Island and Dalton Island, and PowerPyx says the fare is $50.",
        "PowerPyx counts 14 Ammu-Nation stores in Vice-Dale County. Five of them carry the Expanded range, which has the widest weapon selection: Big Shots, Phil's Ammu-Nation, Black Eagle, Iron & Oak and Prestige Firearms.",
      ],
    },
    {
      id: "map",
      heading: "Map link",
      status: "confirmed",
      paragraphs: ["The link is Confirmed because Rockstar names the region and the four places above."],
      links: [{ href: "/map/vice-city", label: "Vice City map" }],
    },
    {
      id: "tbc",
      heading: "Still to be confirmed",
      status: "tbc",
      list: [
        "An official Rockstar list of districts.",
        "Whether Hamlet counts as part of Vice City or as a separate town.",
        "How Vice Beach, and so Ocean Beach, relates to the 23 Vice City areas.",
      ],
    },
  ],
  spoiler: {
    heading: "Story places in Vice City",
    label: "story places",
    intro: "This lists chapter and mission details for Vice City. Reveal it only if you are happy to see them.",
    items: [
      "PowerPyx's full walkthrough ends Chapter 2 with \"Checking Out (Move to Vice City)\" and opens Chapter 3 with \"Welcome to Vice City\".",
      "PowerPyx lists a Chapter 4 main mission called \"Ocean Beach\".",
      "PowerPyx says a street racer named Yago, who has a restaurant in Little Cuba, gives side quests. The first street race starts in Salton.",
    ],
  },
  updateNote: "We update this page as more of the city is mapped. Sub-region names follow PowerPyx's spelling.",
  related: [
    { href: "/map/vice-city", label: "Vice City map" },
    { href: "/database/locations", label: "GTA 6 locations" },
    { href: "/database/characters/yago", label: "Yago" },
    { href: "/database/vehicles", label: "GTA 6 vehicles" },
  ],
  faq: [
    {
      question: "What does Rockstar say about Vice City?",
      answer: "Rockstar calls it the \"sun and fun capital of America\". It names Ocean Beach, Little Cuba, the Tisha-Wocka flea market and VC Port as parts of the city.",
    },
    {
      question: "Which county is Vice City in?",
      answer: "PowerPyx lists it under Vice-Dale County, along with Hamlet, the airport and Vice Beach.",
    },
    {
      question: "How do you travel between Vice City islands?",
      answer: "PowerPyx says a ferry links Waxman Island and Dalton Island for $50. It lists 17 train stations in Vice-Dale County.",
    },
    {
      question: "Is Ocean Beach part of Vice City?",
      answer: "Rockstar names Ocean Beach as a Vice City neighbourhood. PowerPyx lists it under Vice Beach in Vice-Dale County instead, so the two lists do not match.",
    },
  ],
  sources: [ROCKSTAR_REGIONS, PP_MAP, PP_TRAINS, PP_FERRY, PP_AMMU, GS_UE, GS_PLANE, PP_FULL, PP_YAGO1, PP_YAGO2],
};

/* ------------------------------------------------------------------ Key Lento */

const KEY_LENTO: RefPage = {
  path: KEY_LENTO_PATH,
  updated: UPDATED,
  child: { parentPath: LOCATIONS_PATH, parentLabel: "GTA 6 Locations" },
  crumb: "Key Lento",
  seoTitle: "Key Lento in GTA 6: Where It Is and What Is Nearby",
  seoDescription:
    "Key Lento in GTA 6: where PowerPyx places it, the areas listed beneath it, what GameSpot puts nearby and which map page to open.",
  kicker: "Database · Locations",
  h1: "Key Lento",
  cardTitle: "Key Lento",
  cardBody: "Where Key Lento sits, what is nearby and how it links to the Keys.",
  sourceLine: "PowerPyx and GameSpot (not Rockstar), labelled Reported",
  intro:
    "PowerPyx ties an early-game location to Key Lento, while Rockstar's own text only says Jason found work in the Keys. This page joins the two layers and flags where the link is an inference.",
  notice:
    "Rockstar does not name Key Lento in the text we could read. Everything about the town comes from PowerPyx and GameSpot and is Reported. We have not played the game ourselves. Story places are in the blurred section.",
  sections: [
    {
      id: "where",
      heading: "Where it sits",
      status: "reported",
      paragraphs: [
        "PowerPyx lists Key Lento under Mariana County, the southern county on its map, and shows five areas beneath it: Gambit Bay, Shoeless Keys, Corsair Key, Peregrine Bay and Leonida Straits. The formatting on its page is hard to read, so these could be sub-areas or neighbours.",
        "PowerPyx also lists Mile Zero Air Station, Southwind, Riquezas Keys, Permit Keys, Maroon Key and Abismo Key in Mariana County, and says the county has two train stations, Amloco Railway and Capri.",
      ],
    },
    {
      id: "rockstar",
      heading: "What Rockstar says about the Keys",
      status: "confirmed",
      paragraphs: [
        "Rockstar calls the Keys a \"tropical archipelago\" where the dress code is casual and the bars are loaded, and says you are on the doorstep of some of the most beautiful and dangerous waters in America.",
        "Rockstar says Jason ended up in the Keys \"working for local drug runners\". Its Brian Heder profile describes a boat yard in the Keys, and its Cal Hampton profile says he listens to Coast Guard chatter from home.",
        "Rockstar does not say which island or town any of these people live in. That is To be confirmed.",
      ],
    },
    {
      id: "gamespot",
      heading: "Places GameSpot ties to the area",
      status: "reported",
      list: [
        "Wonder Whale: a store in Key Lento sells the Ultimate Edition Goodtime Gear merchandise.",
        "Mile Zero Air Station: GameSpot's plane guide puts it in the far south-west corner of the map, west of Key Lento. Its wanted-level guide spells the name Mike Zero.",
        "Air station defences: GameSpot says the base is guarded like a fortress and that jets sit in its hangars.",
        "Boat access: GameSpot says the best way in is by boat, around the western side.",
      ],
    },
    {
      id: "map",
      heading: "Map link",
      status: "reported",
      paragraphs: [
        "The link is Reported, not Confirmed. PowerPyx places an early-game location in Key Lento and describes it as being in the Keys, and that is the only link between the town and the region.",
      ],
      links: [{ href: "/map/leonida-keys", label: "Leonida Keys map" }],
    },
    {
      id: "tbc",
      heading: "Still to be confirmed",
      status: "tbc",
      list: [
        "Whether Key Lento is a town, an island or both.",
        "Rockstar's own description of Key Lento.",
        "Which Keys island holds Brian's boat yard.",
        "Whether the Mile Zero or Mike Zero spelling is the in-game one.",
      ],
    },
  ],
  spoiler: {
    heading: "Story places in Key Lento",
    label: "story places",
    intro: "This lists chapter and mission details for Key Lento. Reveal it only if you are happy to see them.",
    items: [
      "PowerPyx says finishing Gone Fishing in Chapter 1 gives Jason a house in Key Lento, and that the mission ends when he flies a sea plane to Brian's Marina and meets Brian.",
      "PowerPyx says the pilot Donnie's trailer is in Key Lento and shows as a fence on the map. The mission Don Gone (Head to Donnie's Trailer) starts there.",
    ],
  },
  updateNote: "We update this page as the Keys are explored. Rockstar facts are retold in our own words.",
  related: [
    { href: "/map/leonida-keys", label: "Leonida Keys map" },
    { href: "/database/locations", label: "GTA 6 locations" },
    { href: "/database/characters/brian-heder", label: "Brian Heder" },
    { href: "/database/characters/donnie", label: "Donnie" },
    { href: "/guides/missions/gone-fishing", label: "Gone Fishing guide" },
  ],
  faq: [
    {
      question: "Where is Key Lento?",
      answer: "PowerPyx lists Key Lento under Mariana County. It lists Gambit Bay, Shoeless Keys, Corsair Key, Peregrine Bay and Leonida Straits right after it.",
    },
    {
      question: "Is Key Lento in the Leonida Keys?",
      answer: "Rockstar says Jason worked in the Keys before the story, and PowerPyx ties an early-game location to Key Lento. No outlet we checked states the link in one sentence, so it is Reported, not Confirmed.",
    },
    {
      question: "What is near Key Lento?",
      answer: "GameSpot puts Mile Zero Air Station in the far south-west of the map, west of Key Lento, and a Wonder Whale store in Key Lento. Its wanted-level guide spells the air station Mike Zero.",
    },
    {
      question: "Which map page covers Key Lento?",
      answer: "Use /map/leonida-keys. The link is inferred, so we mark it Reported.",
    },
  ],
  sources: [ROCKSTAR_REGIONS, ROCKSTAR_PROFILES, PP_MAP, PP_GONE_FISHING, PP_DON_GONE, PP_DONNIES_DROP, GS_UE, GS_PLANE, GS_SIX_STAR],
};

/* ------------------------------------------------------------------ Port Gellhorn */

const PORT_GELLHORN: RefPage = {
  path: PORT_GELLHORN_PATH,
  updated: UPDATED,
  child: { parentPath: LOCATIONS_PATH, parentLabel: "GTA 6 Locations" },
  crumb: "Port Gellhorn",
  seoTitle: "Port Gellhorn in GTA 6: The Forgotten Coast",
  seoDescription:
    "Port Gellhorn in GTA 6: Rockstar's description, the Kelly County places PowerPyx lists, nearby gun stores and planes, and the map page to open.",
  kicker: "Database · Locations",
  h1: "Port Gellhorn",
  cardTitle: "Port Gellhorn",
  cardBody: "Rockstar's forgotten coast, its Kelly County places and what is nearby.",
  sourceLine: "Rockstar Games for region text, PowerPyx and GameSpot for the rest (Reported)",
  intro:
    "Port Gellhorn is one of the six regions Rockstar names. It is the run-down coastal region, and it has its own train stop and map page. This page collects the places that outlets tie to it.",
  notice:
    "Region text is Confirmed from Rockstar. County and place lists come from PowerPyx and GameSpot and are Reported. We have not played the game ourselves. Story-linked places are in the blurred section.",
  sections: [
    {
      id: "rockstar",
      heading: "What Rockstar says",
      status: "confirmed",
      paragraphs: [
        "Rockstar's tagline is \"Live Hard\", and it calls the region \"Leonida's forgotten coast\". It lists cheap motels, shut-down attractions and empty strip malls, and says a new economy has grown up there, fuelled by malt liquor, painkillers and truck stop energy drinks. Its closing line tells you to jump on a dirt bike and hold onto your wallet.",
      ],
    },
    {
      id: "counties",
      heading: "County and sub-regions",
      status: "reported",
      paragraphs: [
        "PowerPyx lists Port Gellhorn as a sub-region of Kelly County and places four areas under it: Wild Hog Point, Borrachero Sound, Crude Islands and Sandbars.",
        "Draper Island, with Draper Bay, is a separate Kelly County sub-region. South Kelly County lists Buckskin Swamp, Emerald River, Emerland Springs and Gellhorn. The spelling Emerland is PowerPyx's own.",
      ],
    },
    {
      id: "transport",
      heading: "Transport and shops",
      status: "reported",
      paragraphs: [
        "PowerPyx says Kelly County has three train stations: Ambrosia, Port Gellhorn and Draper Island.",
        "It also lists three Ammu-Nation stores in Kelly County, all Standard: Pawn & Gun in Port Gellhorn, Gellhorn Outfitters and Biff's Gun Supply.",
      ],
    },
    {
      id: "gamespot",
      heading: "Places GameSpot ties to the area",
      status: "reported",
      list: [
        "Wild Hog Point lies west of Port Gellhorn on the western side of Kelly County, between Borrachero Sound and Draper Bay.",
        "A fleet of single-passenger planes is parked in the open there.",
        "You cannot own one of these planes, and it will run out of fuel.",
        "GameSpot says you do not appear to be reported to the police for taking one.",
      ],
    },
    {
      id: "map",
      heading: "Map link",
      status: "confirmed",
      paragraphs: ["The link is Confirmed because Rockstar names the region and PowerPyx lists a sub-region of the same name."],
      links: [{ href: "/map/port-gellhorn", label: "Port Gellhorn map" }],
    },
    {
      id: "tbc",
      heading: "Still to be confirmed",
      status: "tbc",
      list: [
        "Whether the Starlet Motel and the Mud Club count as part of the Port Gellhorn region. PowerPyx's Mud Club page spells the motel Scarlet once; GameSpot and its other pages write Starlet.",
        "Rockstar's own list of places in the region.",
        "The gang or gangs active there.",
      ],
    },
  ],
  spoiler: {
    heading: "Story places around Port Gellhorn",
    label: "story places",
    intro: "This lists side-quest and chapter details near Port Gellhorn. Reveal it only if you are happy to see them.",
    items: [
      "PowerPyx says the car fence Moses has his shop in Port Gellhorn.",
      "PowerPyx says Billy's second mission, Twist Wrist, Smash, Grab, starts at a bench in Port Gellhorn.",
      "PowerPyx puts Thrillbilly Mud Club and the Starlet Motel in Kelly County.",
      "In Chapter 4, PowerPyx says Pilot Pete's first delivery ends at an airstrip south of Port Gellhorn, and his second job starts at Wild Hog Airfield in Kelly County.",
    ],
  },
  updateNote: "We update this page as more of Kelly County is explored. Rockstar facts are retold in our own words.",
  related: [
    { href: "/map/port-gellhorn", label: "Port Gellhorn map" },
    { href: "/database/locations", label: "GTA 6 locations" },
    { href: "/database/characters/billy", label: "Billy" },
    { href: "/database/characters/pilot-pete", label: "Pilot Pete" },
    { href: "/database/characters/moses", label: "Moses" },
  ],
  faq: [
    {
      question: "What does Rockstar say about Port Gellhorn?",
      answer: "Rockstar calls it \"Leonida's forgotten coast\". It describes cheap motels, shut-down attractions and empty strip malls.",
    },
    {
      question: "Which county is Port Gellhorn in?",
      answer: "PowerPyx lists Port Gellhorn as a sub-region of Kelly County. Wild Hog Point, Borrachero Sound, Crude Islands and Sandbars are listed under it.",
    },
    {
      question: "Can you buy guns near Port Gellhorn?",
      answer: "PowerPyx lists three Ammu-Nation stores in Kelly County: Pawn & Gun in Port Gellhorn, Gellhorn Outfitters and Biff's Gun Supply. All three are Standard stores.",
    },
    {
      question: "Can you fly from Port Gellhorn?",
      answer: "GameSpot says a fleet of single-passenger planes is parked at Wild Hog Point, west of Port Gellhorn. You can take one but cannot own it.",
    },
  ],
  sources: [ROCKSTAR_REGIONS, PP_MAP, PP_TRAINS, PP_AMMU, GS_PLANE, PP_COFFEE, PP_MUD_CLUB, PP_BILLY2, PP_PETE1, PP_PETE2],
};

export const PLACE_PAGES: RefPage[] = [GANGS, LOCATIONS, VICE_CITY, KEY_LENTO, PORT_GELLHORN];
