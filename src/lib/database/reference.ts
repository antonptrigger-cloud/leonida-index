/**
 * Reference pages for the database: vehicles, weapons and radio.
 *
 * Wording is our own. Rockstar has not published a vehicle or weapon list, so those two
 * pages rest on PowerPyx's Progress Database guide and GameSpot's guides, named line by line
 * and labelled Reported. The radio page uses Rockstar's music page for genres, hosts, the
 * album and the score, and GameSpot for station names and the trailer song list.
 *
 * Every other piece of story detail goes in `spoiler`, never in visible copy. No images and
 * no song lyrics are used.
 */
import type { FaqItem } from "@/lib/seo/jsonld";
import { PLACE_PAGES } from "@/lib/database/places";

export const DB_VERIFIED = "2026-11-18";
export const DB_VERIFIED_LABEL = "18 Nov 2026";
/** The database hub and the gangs and locations pages (batch 4) were updated on launch day. */
export const DB_UPDATED = "2026-11-19";
export const DB_UPDATED_LABEL = "19 Nov 2026";

export type RefStatus = "confirmed" | "reported" | "tbc";

export interface RefTable {
  caption: string;
  columns: string[];
  rows: string[][];
}

export interface RefSection {
  id: string;
  heading: string;
  status?: RefStatus;
  paragraphs?: string[];
  table?: RefTable;
  /** Plain bullet list. */
  list?: string[];
  /** Paragraphs after the table or list. */
  after?: string[];
  /** Internal links shown as a list (for example map pages). */
  links?: { href: string; label: string; note?: string }[];
}

export interface RefSource {
  label: string;
  url: string;
  primary: boolean;
  used: string;
}

export interface RefPage {
  path: string;
  /** ISO date of the last edit. Defaults to DB_VERIFIED. */
  updated?: string;
  /** Detail page under an index page. Shown in the sidebar under its parent, not as a database card. */
  child?: { parentPath: string; parentLabel: string };
  /** Hand-picked internal links for the sidebar. */
  related?: { href: string; label: string }[];
  /** Short crumb and card title. */
  crumb: string;
  /** Page <title> (the brand suffix is added by metaFor). */
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  h1: string;
  /** Short line shown on database cards. */
  cardTitle: string;
  cardBody: string;
  sourceLine: string;
  intro: string;
  notice: string;
  sections: RefSection[];
  spoiler?: { heading: string; label: string; intro: string; items: string[] };
  updateNote: string;
  faq: FaqItem[];
  sources: RefSource[];
}

const PP_PROGRESS: RefSource = {
  label: "PowerPyx: GTA 6 Collectible Guide: Progress Database",
  url: "https://www.powerpyx.com/gta-6-collectible-guide-progress-database/",
  primary: false,
  used: "Vehicle and weapon totals, class counts, standout groups, Ammu-Nation store list",
};

export const VEHICLES_PATH = "/database/vehicles";
export const WEAPONS_PATH = "/database/weapons";
export const RADIO_PATH = "/database/radio-stations";

/* ------------------------------------------------------------------ vehicles */

const VEHICLES: RefPage = {
  path: VEHICLES_PATH,
  crumb: "Vehicles",
  seoTitle: "GTA 6 Vehicles: Classes, Totals and Named Cars",
  seoDescription:
    "GTA 6 vehicle totals by class, the 25 standout groups, named cars, bikes and boats, and where GameSpot found planes, jets and helicopters in Leonida.",
  kicker: "Database · Vehicles",
  h1: "GTA 6 Vehicles",
  cardTitle: "Vehicles",
  cardBody: "Class totals, standout groups, named cars and where to find aircraft.",
  sourceLine: "PowerPyx and GameSpot (not Rockstar), labelled Reported",
  intro:
    "GTA 6 has hundreds of vehicles, but the outlets we use have not named every one. This page gives the class totals first, then each vehicle they have named and the aircraft spawns GameSpot found. Plot-linked unlocks are blurred near the end.",
  notice:
    "Rockstar has not published a vehicle list. Every count and name below comes from PowerPyx or GameSpot, named line by line, so all of it is Reported. We have not played the game ourselves.",
  sections: [
    {
      id: "totals",
      heading: "How many vehicles, and in which classes",
      status: "reported",
      paragraphs: [
        "PowerPyx's Progress Database guide counts 557 vehicles: 277 base models and 280 \u201Cstandout\u201D entries. The guide reads these figures from the in-game Progress Database (Map, then Progress). This is one outlet's count, so we treat it as Reported.",
      ],
      table: {
        caption: "PowerPyx's base-model counts by class",
        columns: ["Class", "Vehicles", "Group"],
        rows: [
          ["Coupes", "18", "Cars"],
          ["Muscle Cars", "26", "Cars"],
          ["Off-Road Vehicles", "8", "Cars"],
          ["Pickups", "17", "Cars"],
          ["Sedans", "29", "Cars"],
          ["Sports Cars", "13", "Cars"],
          ["Supercars", "9", "Cars"],
          ["SUVs", "23", "Cars"],
          ["VANs", "14", "Cars"],
          ["Bikes", "29", "Standalone"],
          ["Watercraft", "28", "Standalone"],
          ["Aircraft", "16", "Standalone"],
          ["Trucks", "11", "Service"],
          ["Utility Vehicles", "9", "Service"],
          ["Emergency Vehicles", "7", "Service"],
          ["Military Vehicles", "8", "Service"],
          ["Industrial Vehicles", "6", "Service"],
          ["Transport Vehicles", "6", "Service"],
        ],
      },
      after: [
        "The nine car classes add up to 157 cars, and the six service classes add up to 47. Add 29 bikes, 28 watercraft and 16 aircraft and you reach the 277 base models.",
      ],
    },
    {
      id: "standouts",
      heading: "The 25 standout groups",
      status: "reported",
      paragraphs: [
        "PowerPyx also lists 280 standout vehicles in 25 themed groups. They are tracked separately from the 277 base models, which is how the total reaches 557. The group names give a feel for the variety on the streets of Leonida.",
      ],
      table: {
        caption: "PowerPyx's standout groups and their vehicle counts",
        columns: ["Standout group", "Vehicles"],
        rows: [
          ["Leonida Man", "30"],
          ["Retro", "20"],
          ["Ultra-Luxe", "19"],
          ["All-Terrain", "17"],
          ["Fine Art", "17"],
          ["Street Racer", "16"],
          ["Girlypop", "16"],
          ["Blinged Up", "15"],
          ["Ripped & Shredded", "13"],
          ["Patriot", "12"],
          ["Race Bikes", "11"],
          ["Hot Rods", "10"],
          ["Swamp Style", "10"],
          ["Clout Chaser", "8"],
          ["Driveshaft Famous", "8"],
          ["Stock Car", "7"],
          ["Chopper", "7"],
          ["Demolition Derby", "6"],
          ["Mudder", "6"],
          ["Topper", "6"],
          ["Pedal Power", "6"],
          ["Donks", "5"],
          ["Lowriders", "5"],
          ["Law & Order", "5"],
          ["Throwback", "5"],
        ],
      },
    },
    {
      id: "named",
      heading: "Named vehicles and how to get them",
      status: "reported",
      paragraphs: [
        "These are the vehicles GameSpot has named in its Ultimate Edition and GTA+ guides, plus Jason's starting car. All are single-source, so each row says who reported it.",
      ],
      table: {
        caption: "Named vehicles reported by GameSpot",
        columns: ["Vehicle", "What the source says", "Source"],
        rows: [
          ["Vapid Ganado", "Jason's default vehicle, in rough shape when the game starts. Ultimate Edition owners can get a free Retro Build (extra mods and a custom paint job) at a body shop run by a character named Joey.", "GameSpot"],
          ["Dinka Enduro", "A motorcycle that Ultimate Edition owners find parked at Jason's house from the start.", "GameSpot"],
          ["Kayak", "Also parked at Jason's house for Ultimate Edition owners. GameSpot gives no maker.", "GameSpot"],
          ["Shitzu Squalo", "A custom boat for Ultimate Edition owners, collected from a dock in Washington Beach. It comes with a weapons crate.", "GameSpot"],
          ["'67 Vapid Dominator Buggy", "Ultimate Edition. Claimed at the Mud Club track, then stored in one of your garages.", "GameSpot"],
          ["'95 Grotti Cheetah", "Ultimate Edition. Unlocked later in the story and added to your stored vehicles.", "GameSpot"],
          ["'90 Annis Venturas BLVD Elegy", "A supercar included with GTA+, kept in a single-car garage in Crosstown. GameSpot says it is only yours while you keep the subscription.", "GameSpot"],
          ["Seashark", "Free rentals with GTA+, along with scooter and bike rentals.", "GameSpot"],
        ],
      },
      after: [
        "GameSpot says the Dinka Enduro and the kayak are not available to Standard Edition owners. For what else the editions change, see our Standard vs Ultimate comparison.",
      ],
    },
    {
      id: "aircraft",
      heading: "Where to find planes, jets and helicopters",
      status: "reported",
      paragraphs: [
        "GameSpot says aircraft are rare and lists the set spawns it found. It cautions that small-helicopter spawns are not guaranteed, and that it will update its guide as more turn up. It also warns that flying through restricted airspace is an easy way to reach a six-star wanted level.",
      ],
      table: {
        caption: "Aircraft spawns reported by GameSpot",
        columns: ["Aircraft", "Where GameSpot found it", "Notes from GameSpot"],
        rows: [
          ["Single-passenger plane", "Wild Hog Point, west of Port Gellhorn on the western side of Kelly County", "A fleet is parked in the open. GameSpot says taking one does not seem to get you reported if you stay low and out of restricted airspace. You can't keep these, and they run out of fuel."],
          ["Large passenger plane", "Vice City International Airport, in the southwest of Vice-Dale County", "Crossing the restricted gate gives you a three-star wanted level. Some of the planes are locked, so you may need to try a few."],
          ["Jet", "Mike Zero Air Station, in the far southwest corner of the map, west of Key Lento", "Guarded like a fortress. GameSpot's way in is by boat to the western side. Jets are sometimes about to take off, and you are shot down if you are caught."],
          ["Small helicopter", "Rooftop helipads, for example the Maven Residences in downtown Vice City and the Crimson Palms in north Washington Beach", "GameSpot could not guarantee a spawn for these."],
          ["Large helicopter", "Lake Tallaloko community, East Lummox County", "A gated community with three armed guards around the helipad."],
        ],
      },
    },
    {
      id: "cheats",
      heading: "Vehicles named in the cheat list",
      status: "reported",
      paragraphs: [
        "PowerPyx's cheats guide lists 21 vehicle-spawn cheats. Cheats only work after the story, and PowerPyx says they disable trophies and saving while active. The guide names these vehicles, without giving a class for them:",
      ],
      list: [
        "Interstate Ambulance",
        "Airboat 09",
        "Bravado Banshee",
        "Tuff BMX",
        "Maibatsu Boomazoom",
        "Nagasaki Carbon RS",
        "'65 Vapid Dominator",
        "Progen Emerus",
        "Inflatable Flamingo",
        "MTL Pumper",
        "Vapid Stanier G2 Taxi",
        "Hauners P-996 Lazer",
        "HVY Bulldozer",
        "Lapwing Mallard",
        "Brimstone Golfer",
        "Hauners Rhino Tank",
        "Maibatsu Sanchez",
        "Nagasaki Sea Sparrow",
        "Speeder 700 GT",
        "Truffade Thrax",
        "Western Zombie Bobber",
      ],
    },
    {
      id: "owning",
      heading: "Owning, registering and selling a car",
      status: "reported",
      paragraphs: [
        "PowerPyx says you can steal almost any vehicle off the street, but only Jason's personal vehicle is yours from the start. Later you can register a stolen car as your own, as long as it has no tracker. The Waink app scans a car for one. You begin with one garage slot, you can buy more, and once your slots are full you have to sell a car to make room.",
        "GameSpot adds that GTA+ members get 10% extra cash when they sell an eligible vehicle.",
        "Our stealing cars guide covers the theft side. This page sticks to the counts and the named vehicles.",
      ],
    },
  ],
  spoiler: {
    heading: "Spoilers: the missions and chapters behind these unlocks",
    label: "vehicle unlock spoilers",
    intro: "These lines name chapters, characters and side quests, so they stay blurred until you choose to read them.",
    items: [
      "Shitzu Squalo: GameSpot says it unlocks in Chapter 4.",
      "'95 Grotti Cheetah: GameSpot says it unlocks in Chapter 5, through the Pegassi Residences building.",
      "'67 Vapid Dominator Buggy: GameSpot says you claim it at the Mud Club track with Wyman, a character you meet at the Starlet Motel in Chapter 2.",
      "Wyman's classic cars: GameSpot says Wyman then asks you to bring him abandoned classic cars to restore. PowerPyx's Progress Database lists five \u201CWyman's Cars\u201D as Ultimate Edition exclusives.",
      "'90 Annis Venturas BLVD Elegy: GameSpot says GTA+ members receive it after completing Chapter 3.",
      "Kyle's Mallard: GameSpot says that at the end of Kyle McKittrick's side questline, at his farm in East Kelly County, you can take his single-passenger plane, which stays marked on the map where you leave it.",
      "Registering and selling: PowerPyx says registering a stolen car opens up in Chapter 2, during a mission with Moses. From early in Chapter 3 you can sell stolen vehicles at any Pay 'n' Spray and register ones with Standard Trackers.",
    ],
  },
  updateNote:
    "No outlet we use has named every vehicle yet. This page updates as more is confirmed, and we recheck the counts against the finished game after launch.",
  faq: [
    {
      question: "How many vehicles are in GTA 6?",
      answer:
        "PowerPyx's Progress Database guide counts 557 vehicles: 277 base models and 280 standout entries. That is a single outlet's count, so we label it Reported. Rockstar has not published a number.",
    },
    {
      question: "Are there planes and helicopters in GTA 6?",
      answer:
        "Yes. GameSpot lists spawns for small planes, a large passenger plane, a jet, and small and large helicopters. Several are guarded, and GameSpot says small-helicopter spawns are not guaranteed.",
    },
    {
      question: "Which vehicles come with the Ultimate Edition?",
      answer:
        "GameSpot names the Dinka Enduro motorcycle, a kayak, the Shitzu Squalo boat, the '67 Vapid Dominator Buggy, the '95 Grotti Cheetah and a free Retro Build for Jason's Vapid Ganado. It says the Enduro and kayak are not available on Standard.",
    },
    {
      question: "What vehicle does GTA+ include?",
      answer:
        "GameSpot reports a free supercar, the '90 Annis Venturas BLVD Elegy, kept in a garage in Crosstown while you are subscribed. It also lists free scooter, bike and Seashark rentals and 10% extra cash when selling eligible vehicles.",
    },
    {
      question: "Can you keep any car you steal?",
      answer:
        "PowerPyx says only your personal vehicle is permanent at first. Later you can register a stolen car if it has no tracker, and you need a free garage slot to keep it.",
    },
  ],
  sources: [
    PP_PROGRESS,
    {
      label: "GameSpot: How To Get All GTA 6 Ultimate Edition Bonuses",
      url: "https://www.gamespot.com/articles/how-to-get-all-gta-6-ultimate-edition-bonuses/",
      primary: false,
      used: "Ultimate Edition vehicles and where they are stored",
    },
    {
      label: "GameSpot: GTA 6's GTA+ Subscription Includes A Free Supercar, Discounts, And More",
      url: "https://www.gamespot.com/articles/gta-6-gta-subscription-includes-a-free-supercar-discounts-and-more/",
      primary: false,
      used: "GTA+ supercar, rentals and selling bonus",
    },
    {
      label: "GameSpot: How To Get A Plane In GTA 6",
      url: "https://www.gamespot.com/articles/how-to-get-a-plane-in-gta-6/",
      primary: false,
      used: "Aircraft spawn locations",
    },
    {
      label: "PowerPyx: GTA 6 How to Get New Personal Car",
      url: "https://www.powerpyx.com/gta-6-how-to-get-new-personal-car/",
      primary: false,
      used: "Registering, trackers, garages and selling",
    },
    {
      label: "PowerPyx: GTA 6 All Cheats",
      url: "https://www.powerpyx.com/gta-6-all-cheats/",
      primary: false,
      used: "Vehicle-spawn cheat names",
    },
  ],
};


/* ------------------------------------------------------------------- weapons */

const STORES: [string, string, string][] = [
  ["Barrage Gun Supply", "Standard", "Mariana"],
  ["Chuck's Tackle & Shot", "Limited", "Mariana"],
  ["Guns Aplenty!", "Hunting", "Mariana"],
  ["Richardson Hunting Supplies", "Standard", "Mariana"],
  ["Woodhatch", "Expanded", "Mariana (Capri)"],
  ["Big Shots", "Expanded", "Vice-Dale (Hamlet)"],
  ["Hamlet Traders", "Standard", "Vice-Dale"],
  ["Phil's Ammu-Nation", "Expanded", "Vice-Dale (Vice City)"],
  ["Tequesta Guns & Ammo", "Standard", "Vice-Dale"],
  ["Vice City Firearms", "Standard", "Vice-Dale"],
  ["Martez Empenos", "Standard", "Vice-Dale"],
  ["Jackson Firearms", "Standard", "Vice-Dale"],
  ["Vice City Gun & Pawn", "Standard", "Vice-Dale"],
  ["Pawn & Gun, Crosstown", "Standard", "Vice-Dale"],
  ["Quickscope", "Standard", "Vice-Dale"],
  ["Black Eagle", "Expanded", "Vice-Dale (north-west of Vice City)"],
  ["Zenon's Pawn Shop", "Standard", "Vice-Dale"],
  ["Iron & Oak", "Expanded", "Vice-Dale (Vice City)"],
  ["Prestige Firearms", "Expanded", "Vice-Dale (Ocean Beach, Vice City)"],
  ["Tactical Outlet Guns", "Standard", "Leonard"],
  ["Pawn & Gun, Port Gellhorn", "Standard", "Kelly"],
  ["Gellhorn Outfitters", "Standard", "Kelly"],
  ["Biff's Gun Supply", "Standard", "Kelly"],
  ["Rusty Willis Jr. Hunting Supplies", "Hunting", "Lummox"],
];

const WEAPONS: RefPage = {
  path: WEAPONS_PATH,
  crumb: "Weapons",
  seoTitle: "GTA 6 Weapons: Totals, Prices and Ammu-Nation Stores",
  seoDescription:
    "GTA 6 weapon totals, named sniper rifles and launchers with prices, and all 24 Ammu-Nation stores with their type and county, including the six Expanded shops.",
  kicker: "Database · Weapons",
  h1: "GTA 6 Weapons",
  cardTitle: "Weapons",
  cardBody: "Weapon totals, named snipers and launchers with prices, and all 24 Ammu-Nation stores.",
  sourceLine: "PowerPyx and GameSpot (not Rockstar), labelled Reported",
  intro:
    "The outlets we use have published weapon totals, a full list of gun stores, and names and prices for snipers and launchers. They have not yet named most pistols, SMGs, rifles, shotguns, melee weapons or explosives. This page lists what is named and where to buy it.",
  notice:
    "Rockstar has not published a weapon list. Everything below is Reported by PowerPyx or GameSpot, named line by line. We have not played the game ourselves.",
  sections: [
    {
      id: "totals",
      heading: "Weapon totals",
      status: "reported",
      paragraphs: [
        "PowerPyx's Progress Database guide lists 196 weapon entries. It reads the figures from the in-game Progress Database (Map, then Progress). One outlet's count, so we label it Reported.",
      ],
      table: {
        caption: "PowerPyx's weapon counts by category",
        columns: ["Category", "Count"],
        rows: [
          ["Guns", "53"],
          ["Melee", "9"],
          ["Explosives", "4"],
          ["Variants", "130"],
          ["Total", "196"],
        ],
      },
      after: [
        "PowerPyx says each Ammu-Nation also sells a unique weapon variant, and sometimes more than one. The variants are tracked in the Progress menu but are not needed for the 100% completion checklist.",
      ],
    },
    {
      id: "named",
      heading: "Named weapons and prices",
      status: "reported",
      paragraphs: [
        "These are the weapons the outlets have named so far. Prices are the ones PowerPyx listed on 18 November and may differ with discounts. GameSpot says GTA+ members get 10% off at weapon shops.",
      ],
      table: {
        caption: "Weapons named by PowerPyx and GameSpot",
        columns: ["Type", "Weapon", "Price", "Where", "Source"],
        rows: [
          ["Sniper rifle", "Fortune & Son Laird 350", "$950", "Expanded Ammu-Nation", "PowerPyx"],
          ["Sniper rifle", "Shrewsbury SM-69", "$1,850", "Expanded Ammu-Nation", "PowerPyx"],
          ["Sniper rifle", "Fairview FF-SR", "$2,950", "Expanded Ammu-Nation", "PowerPyx"],
          ["Sniper rifle", "Fairview FF-50", "$3,975", "Expanded Ammu-Nation", "PowerPyx"],
          ["Sniper rifle", "Shrewsbury SMS-01", "$2,150", "Expanded Ammu-Nation, once unlocked", "PowerPyx"],
          ["Grenade launcher", "Hillinger Boomer", "$12,000", "Expanded Ammu-Nation", "PowerPyx"],
          ["Grenade launcher", "Deever Tech GLR40", "$15,500", "Expanded Ammu-Nation", "PowerPyx"],
          ["Rocket launcher", "Hauners H-AT Rocket Launcher", "$16,000", "Expanded Ammu-Nation", "PowerPyx"],
          ["Revolvers", "Hawk & Little Morgan Revolvers", "Included", "Ultimate Edition content", "GameSpot"],
          ["Shotgun", "Mason & Keen Shortstraw (explosive shells)", "Not sold", "A cheat adds it to your loadout", "PowerPyx"],
        ],
      },
      after: [
        "PowerPyx's cheat list also adds the Hauners H-AT to your loadout, so the rocket launcher can come from a cheat as well as a shop. Cheats only work after the story, and PowerPyx says using one disables trophies and saving.",
        "Pistols, SMGs, assault rifles, light machine guns and the rest of the 53 guns are not named by these outlets yet. This page updates as more is confirmed.",
      ],
    },
    {
      id: "stores",
      heading: "Where to buy: the 24 Ammu-Nation stores",
      status: "reported",
      paragraphs: [
        "PowerPyx counts 24 Ammu-Nation stores. They sell weapons, ammo, body armour and parachutes. Hovering over a store on the map shows its selection type: Limited, Standard, Hunting or Expanded. Expanded stores carry the most weapons, including light machine guns, snipers, grenade launchers and rocket launchers.",
        "PowerPyx's sniper and launcher guides say five stores carry the full Expanded stock, but the same pages list six, and so does its store guide. We use six.",
      ],
      table: {
        caption: "Ammu-Nation stores as listed by PowerPyx",
        columns: ["Store", "Type", "County"],
        rows: STORES.map(([a, b, c]) => [a, b, c]),
      },
      after: [
        "By our count of PowerPyx's list that is 6 Expanded, 15 Standard, 2 Hunting and 1 Limited store. Some stores also sell clothes or fishing rods, and a weapon locker icon on the map means you can reach your full loadout there.",
      ],
    },
    {
      id: "keeping",
      heading: "Taking weapons with you",
      status: "reported",
      paragraphs: [
        "GameSpot says the Ultimate Edition revolvers can be claimed at any Ammu-Nation or taken from your car's trunk storage. PowerPyx says a weapon locker icon on a store's map marker means your full loadout is available there.",
      ],
    },
  ],
  spoiler: {
    heading: "Spoilers: how some of these weapons are unlocked",
    label: "weapon unlock spoilers",
    intro: "These lines name chapters and missions, so they stay blurred until you choose to read them.",
    items: [
      "Hawk & Little Morgan Revolvers: GameSpot says they become available at the \u201CCoffee Break\u201D mission in Chapter 2, for both Jason and Lucia.",
      "Personalised pistol decals: GameSpot says Jason's option is available in Chapter 1 and Lucia's in Chapter 2.",
      "Shrewsbury SMS-01: PowerPyx says it unlocks when you complete the ninth quest in a hunting questline that starts in Chapter 2.",
      "Shitzu Squalo boat: GameSpot says the Ultimate Edition boat, collected in Chapter 4, comes with a weapons crate.",
      "GTA+ garage: GameSpot says the Crosstown garage that comes with the Elegy has a weapon locker, and opens after Chapter 3.",
    ],
  },
  updateNote:
    "No outlet we use has named most weapons yet. This page updates as more is confirmed, and we recheck the totals against the finished game after launch.",
  faq: [
    {
      question: "How many weapons are in GTA 6?",
      answer:
        "PowerPyx's Progress Database guide lists 196 weapon entries: 53 guns, 9 melee weapons, 4 explosives and 130 variants. That is one outlet's count, so we label it Reported.",
    },
    {
      question: "Where can you buy sniper rifles in GTA 6?",
      answer:
        "PowerPyx says sniper rifles are sold at Expanded Ammu-Nation stores. It lists six: Woodhatch, Big Shots, Phil's Ammu-Nation, Black Eagle, Iron & Oak and Prestige Firearms.",
    },
    {
      question: "How much is a rocket launcher in GTA 6?",
      answer:
        "PowerPyx lists the Hauners H-AT Rocket Launcher at $16,000 at an Expanded Ammu-Nation. It is the only rocket launcher those guides name.",
    },
    {
      question: "How many Ammu-Nation stores are there?",
      answer:
        "PowerPyx counts 24. Each has a selection type of Limited, Standard, Hunting or Expanded, shown when you hover over it on the map.",
    },
    {
      question: "Do Ultimate Edition owners get exclusive weapons?",
      answer:
        "GameSpot reports the Hawk & Little Morgan Revolvers and a decal option for Jason's and Lucia's pistols as Ultimate Edition content.",
    },
  ],
  sources: [
    PP_PROGRESS,
    {
      label: "PowerPyx: GTA 6 All Ammu-Nation Gun Stores Locations",
      url: "https://www.powerpyx.com/gta-6-all-ammu-nation-gun-stores-locations/",
      primary: false,
      used: "The 24 stores, their types and counties",
    },
    {
      label: "PowerPyx: GTA 6 How to Get Sniper Rifle",
      url: "https://www.powerpyx.com/gta-6-how-to-get-sniper-rifle/",
      primary: false,
      used: "Sniper names, prices and where they are sold",
    },
    {
      label: "PowerPyx: GTA 6 How to Get Grenade Launcher & Rocket Launcher",
      url: "https://www.powerpyx.com/gta-6-how-to-get-grenade-launcher-rocket-launcher/",
      primary: false,
      used: "Launcher names and prices",
    },
    {
      label: "PowerPyx: GTA 6 All Cheats",
      url: "https://www.powerpyx.com/gta-6-all-cheats/",
      primary: false,
      used: "Explosive Shotgun and Hauners H-AT cheats, cheat rules",
    },
    {
      label: "GameSpot: How To Get All GTA 6 Ultimate Edition Bonuses",
      url: "https://www.gamespot.com/articles/how-to-get-all-gta-6-ultimate-edition-bonuses/",
      primary: false,
      used: "Ultimate Edition revolvers and pistol decals",
    },
    {
      label: "GameSpot: GTA 6's GTA+ Subscription Includes A Free Supercar, Discounts, And More",
      url: "https://www.gamespot.com/articles/gta-6-gta-subscription-includes-a-free-supercar-discounts-and-more/",
      primary: false,
      used: "GTA+ weapon discount and garage locker",
    },
  ],
};

/* --------------------------------------------------------------------- radio */

const RADIO: RefPage = {
  path: RADIO_PATH,
  crumb: "Radio stations",
  seoTitle: "GTA 6 Radio Stations and Soundtrack: Hosts and Songs",
  seoDescription:
    "The six revealed GTA 6 radio stations with genres and hosts, podcasts, the album's ten named singles, Justice's score and songs heard in the trailers.",
  kicker: "Database · Radio",
  h1: "GTA 6 Radio Stations",
  cardTitle: "Radio and soundtrack",
  cardBody: "The six revealed stations, hosts, podcasts, album singles, the score and trailer songs.",
  sourceLine: "Rockstar Games for genres, hosts, album and score; GameSpot for station names and trailer songs",
  intro:
    "Rockstar has revealed six GTA 6 radio stations, and its page suggests there are more. GameSpot adds podcasts you can play on foot. It has also released a 34-track album and a separate score. This page lists names and titles only, with no lyrics, and no per-station track lists, because none have been published yet.",
  notice:
    "Genres, hosts, the album singles and the score come from Rockstar's music page. Station names, the podcast detail and the trailer song list come from GameSpot, so those are Reported.",
  sections: [
    {
      id: "stations",
      heading: "The six revealed stations",
      status: "reported",
      paragraphs: [
        "Rockstar's music page describes six stations, their genres and their hosts, and says GTA 6 spans \u201Cstations dedicated to everything from Classic Rock to Talk Radio\u201D. It does not print the station names. GameSpot supplies them, so the names are Reported.",
      ],
      table: {
        caption: "The six stations Rockstar has revealed",
        columns: ["Station (per GameSpot)", "Genre (per Rockstar)", "Hosts (per Rockstar)"],
        rows: [
          ["Cocoteo FM", "Modern Latin", "El Martillo and La Gata"],
          ["Back Country Radio", "Renegade country", "MW and Delta Dawne"],
          ["AfroBank FM", "Amapiano, African classics, 3-step and more", "Burna and Palmsy"],
          ["The Chamber 106.6", "Heavy metal", "DJ Kerry and DJ Tom"],
          ["Flash FM", "Pop", "Robyn and Alex"],
          ["Dirty South Classics", "Regional rap and hip-hop classics", "Trick and Trina"],
        ],
      },
      after: [
        "Rockstar calls Flash FM \u201Cthe Vice City institution\u201D. GameSpot adds that Back Country Radio also features a roving reporter named Mud Dog Mike.",
        "GameSpot's two articles name different real people for some of the same hosts, and Rockstar's page names no performers, so we do not list any. We will add them when Rockstar or the game credits say so.",
      ],
    },
    {
      id: "podcasts",
      heading: "Podcasts you can play on foot",
      status: "reported",
      paragraphs: [
        "GameSpot says GTA 6 adds on-demand podcasts for the first time in the series. Jason and Lucia can play radio stations and podcasts through earbuds connected to their smartphones, so you do not need to be in a vehicle. Rockstar says GTA 6 has \u201Cthe biggest and widest-ranging selection of in-game radio and podcasts yet\u201D. No podcast titles have been published by these sources.",
      ],
    },
    {
      id: "album",
      heading: "GTA 6: The Album",
      status: "confirmed",
      paragraphs: [
        "Rockstar says the album has 34 original tracks and is out on 19 November. It names ten singles you can stream now. Rockstar does not say which of these songs play on in-game stations.",
      ],
      table: {
        caption: "The ten singles Rockstar lists for the album",
        columns: ["Track", "Artist"],
        rows: [
          ["That's It (feat. Future & Metro Boomin)", "Yung Lean"],
          ["RHYNO", "Travis Scott"],
          ["Sexy Magic", "CA7RIEL & Paco Amoroso, Pink Pantheress, Fred again.. & Etienne de Crécy"],
          ["Flower in a Hurricane (feat. Tame Impala, SZA, King Gizzard & The Lizard Wizard)", "Justice"],
          ["Last Thing You Need", "Morgan Wallen"],
          ["Suzuki", "Fuerza Regida"],
          ["Macacoa 2000", "Rauw Alejandro"],
          ["Don't Chart", "Cardi B"],
          ["Blood In Your Eyes", "Tove Lo"],
          ["Bright Lights, Big City", "Keith Richards"],
        ],
      },
    },
    {
      id: "score",
      heading: "The original score by Justice",
      status: "confirmed",
      paragraphs: [
        "Rockstar says the score is composed by the French duo Justice, Gaspard Augé and Xavier de Rosnay, and is adaptive: it is tuned to how you play. The score album has 30 tracks plus digital bonus tracks and arrives on 11 December. Rockstar has released two singles from it: Flower in a Hurricane (feat. Tame Impala, SZA, King Gizzard & The Lizard Wizard) and Pusher (feat. Gesaffelstein).",
      ],
    },
    {
      id: "trailers",
      heading: "Songs heard in the marketing",
      status: "reported",
      paragraphs: [
        "GameSpot's soundtrack article, published on 14 October, lists these songs as heard in the trailers. Appearing in a trailer does not mean a song is on an in-game station. GameSpot spells one band \u201CWang Cheung\u201D; the band's name is Wang Chung. We leave out GameSpot's rumoured and leaked songs.",
      ],
      table: {
        caption: "Songs GameSpot lists from GTA 6 trailers",
        columns: ["Song", "Artist", "First heard in"],
        rows: [
          ["Love is a Long Road", "Tom Petty", "Trailer 1"],
          ["Hot Together", "The Pointer Sisters", "Trailer 2"],
          ["Everybody Have Fun Tonight", "Wang Chung", "Trailer 2"],
          ["Child Support", "Zenglen", "Trailer 2"],
          ["Talkin' To Myself Again", "Tammy Wynette", "Trailer 2"],
          ["Pop Bottles", "Birdman ft. Lil Wayne", "Extended Look"],
          ["Pound Town", "Sexyy Red and Tay Keith", "Extended Look"],
          ["Skrilla", "Kodak Black", "Extended Look"],
          ["Let Your Love Flow", "The Bellamy Brothers", "Extended Look"],
          ["Love Bites", "Def Leppard", "Extended Look"],
          ["People Are People", "Depeche Mode", "Extended Look"],
          ["But I Think It's A Dream", "Captain & Tennille", "Extended Look"],
          ["Cars and Girls", "Prefab Sprout", "Extended Look"],
          ["Off the Grid", "!!! ft. Meah Pace", "Extended Look"],
          ["GTA 6 Theme Song", "DR\u00C6VEN", "Extended Look"],
          ["Devil Woman", "Cliff Richard", "Extended Look"],
          ["Se Me Nota (Agarrame)", "Chimbala and Omega", "Extended Look"],
          ["Against All Odds (Take a Look at Me Now)", "Phil Collins", "Extended Look"],
          ["Mine O' Mine", "Aluna and Jayda G", "Extended Look"],
          ["Inner Light", "Bob Moses and Elderbrook", "Extended Look"],
        ],
      },
    },
  ],
  updateNote:
    "Rockstar and GameSpot have not published per-station track lists or podcast titles yet. This page updates as more is confirmed.",
  faq: [
    {
      question: "How many radio stations are in GTA 6?",
      answer:
        "Rockstar has revealed six: Cocoteo FM, Back Country Radio, AfroBank FM, The Chamber 106.6, Flash FM and Dirty South Classics, with the names as reported by GameSpot. Rockstar's page also says stations span everything from Classic Rock to Talk Radio, so these six may not be the full line-up.",
    },
    {
      question: "Does GTA 6 have podcasts?",
      answer:
        "Yes. GameSpot reports on-demand podcasts for the first time in the series. Jason and Lucia can play them, and radio stations, through earbuds connected to their smartphones, including on foot.",
    },
    {
      question: "Who scored GTA 6?",
      answer:
        "Rockstar says the original score is by the French duo Justice. The 30-track score album is due on 11 December and has two singles out, Flower in a Hurricane and Pusher.",
    },
    {
      question: "How many songs are on GTA 6: The Album?",
      answer:
        "Rockstar says the album has 34 original tracks and releases on 19 November. It has named ten singles, including tracks by Travis Scott, Cardi B, Morgan Wallen and Keith Richards.",
    },
    {
      question: "Which songs were in the GTA 6 trailers?",
      answer:
        "GameSpot lists 20 trailer songs, from Tom Petty's Love is a Long Road in Trailer 1 to Bob Moses and Elderbrook's Inner Light in the Extended Look. Being in a trailer does not mean a song is on an in-game station.",
    },
  ],
  sources: [
    {
      label: "Rockstar Games: The Music of Grand Theft Auto VI",
      url: "https://www.rockstargames.com/VI/music",
      primary: true,
      used: "Station genres and hosts, the album and its singles, the score and its singles",
    },
    {
      label: "GameSpot: GTA 6 Reveals 6 Radio Stations, Plus Podcasts You Can Listen To On Foot",
      url: "https://www.gamespot.com/articles/gta-6-reveals-6-radio-stations-plus-podcasts-you-can-listen-to-on-foot/",
      primary: false,
      used: "Station names, Mud Dog Mike, podcasts on foot",
    },
    {
      label: "GameSpot: GTA 6 Soundtrack - All Confirmed Songs So Far",
      url: "https://www.gamespot.com/articles/gta-6-soundtrack-all-confirmed-songs-so-far/",
      primary: false,
      used: "Songs heard in the trailers (confirmed list only)",
    },
  ],
};

export const REFERENCE_PAGES: RefPage[] = [VEHICLES, WEAPONS, RADIO, ...PLACE_PAGES];
export const REFERENCE_BY_PATH: Record<string, RefPage> = Object.fromEntries(REFERENCE_PAGES.map((p) => [p.path, p]));
