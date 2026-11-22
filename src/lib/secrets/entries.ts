/**
 * Data for /secrets and /secrets/[slug].
 * Verified 22 Nov 2026 against the cited main outlets only.
 * Rules: Confirmed = two or more allowed outlets. Reported = one allowed outlet, always named.
 * Visible copy is spoiler-free (no trophy names, no plot payoffs). Those stay in spoiler fields.
 * Must not import from src/lib/seo (site.ts must not depend on this file).
 */

import type { BackdropId } from "@/components/PageBackdrop";
import type { FaqItem } from "@/lib/seo/jsonld";
import type { PlainSource } from "@/components/guides/MissionBits";

export const SECRETS_VERIFIED = "2026-11-22";
export const SECRETS_VERIFIED_LABEL = "22 Nov 2026";

export type SecretSlug =
  | "ufo"
  | "skunk-ape"
  | "easter-eggs"
  | "strip-clubs"
  | "money"
  | "collectibles"
  | "hidden-locations";

export interface SecretLink {
  href: string;
  label: string;
}

export interface SecretSpoiler {
  label: string;
  paragraphs: string[];
}

export interface SecretEntry {
  slug: SecretSlug;
  path: string;
  /** Hub card title, also used as the page kicker line when needed. */
  cardTitle: string;
  kicker: string;
  title: string;
  source: string;
  backdrop: BackdropId;
  image: { src: string; alt: string; credit: string };
  /** Spoiler-free one-liner for the hub card. */
  blurb: string;
  summary: string[];
  chapter: string;
  howTo: string[];
  map: SecretLink;
  moreMaps?: SecretLink[];
  alsoSee?: SecretLink[];
  spoilers?: SecretSpoiler[];
  faq: FaqItem[];
  sources: PlainSource[];
}

export const SECRET_ENTRIES: SecretEntry[] = [
  {
    slug: "ufo",
    path: "/secrets/ufo",
    cardTitle: "UFO encounter",
    kicker: "Secrets · Night-time close encounter in Kelly County",
    title: "GTA 6 UFO Encounter in Kelly County",
    source: "GameSpot, PowerPyx",
    backdrop: "pier",
    image: {
      src: "/secrets/ufo-ambrosia-02.webp",
      alt: "Official GTA 6 screenshot of a quiet Leonida shoreline at night under a heavy sky. © Rockstar Games",
      credit: "Official screenshot (Ambrosia 02). © Rockstar Games",
    },
    blurb: "A nighttime encounter on a back road in Kelly County, once Chapter 1 is done.",
    summary: [
      "Leonida has a UFO encounter you can trigger yourself, rather than just watching a light in the sky. GameSpot and PowerPyx both describe the same first sighting on a road north-west of the Starlet Motel in Kelly County.",
      "The visible steps below get you to the spot without giving away what happens when you get there. GameSpot also describes a later follow-up; that stays behind the spoiler toggle.",
    ],
    chapter: "GameSpot says you need to have finished Chapter 1 first (Reported, GameSpot). PowerPyx does not give a chapter, but agrees on the time, the road and that you have to arrive alone.",
    howTo: [
      "Go to the road north-west of the Starlet Motel in Kelly County. GameSpot and PowerPyx both use that landmark (Confirmed).",
      "Arrive after 2 AM in-game, and come alone (Confirmed, GameSpot and PowerPyx).",
      "Look for a car stopped at the roadside with its lights flashing. PowerPyx calls the spawn slightly random: if the car is not there, drive away and come back (Reported, PowerPyx).",
      "The car points to a trail into the woods. Follow it toward the blue glow in the trees. You will meet someone who asks for help. What happens if you agree sits behind the spoiler toggle.",
    ],
    map: { href: "/map?place=olabel-kelly-county", label: "Kelly County on the map" },
    moreMaps: [{ href: "/map?q=Starlet+Motel", label: "Search the map for Starlet Motel" }],
    alsoSee: [
      { href: "/secrets/skunk-ape", label: "Skunk Ape" },
      { href: "/secrets/easter-eggs", label: "Easter eggs" },
      { href: "/guides/bigfoot-skunk-ape", label: "Full Bigfoot guide" },
    ],
    spoilers: [
      {
        label: "what happens at the clearing, and GameSpot's later follow-up",
        paragraphs: [
          "PowerPyx and GameSpot both say that as you get close, a UFO stops abducting a woman and sets her down. Talk to her, agree to help, and fetch her car from the roadside as she asks. The craft then comes back for you (Confirmed).",
          "PowerPyx adds that you wake up three days later in the morning, with the suggestion that something was put in your neck (Reported, PowerPyx). GameSpot says either Jason or Lucia can trigger the event (Reported, GameSpot).",
          "GameSpot then describes a second mystery after some time has passed: the abducted character has a dream that hints at a code, usually 2134, and at a visit to South Point Airfield in Hamlet. There you climb a fenced radio-tower building, enter the marked code on a keypad, and go down to a hidden basement (Reported, GameSpot).",
          "In GameSpot's steps, a control room tape, a panel of lights, a bottle of milk and a capsule lead to a trapped visitor. Getting it outside draws a UFO back to collect it, and also deals with agents who arrive to arrest you. GameSpot does not describe this as required for 100% (Reported, GameSpot).",
        ],
      },
    ],
    faq: [
      {
        question: "Where is the UFO in GTA 6?",
        answer:
          "GameSpot and PowerPyx both place the first encounter on the road north-west of the Starlet Motel in Kelly County (Confirmed).",
      },
      {
        question: "What time does the GTA 6 UFO appear?",
        answer:
          "After 2 AM in-game, and you need to arrive alone (Confirmed, GameSpot and PowerPyx). PowerPyx says the roadside car is not a guaranteed spawn, so you may have to leave and return (Reported, PowerPyx).",
      },
      {
        question: "Do I need to finish a chapter first?",
        answer:
          "GameSpot says yes: complete Chapter 1 before you go (Reported, GameSpot). PowerPyx does not mention a chapter requirement on its UFO page.",
      },
    ],
    sources: [
      {
        label: "GameSpot: GTA 6 Has Aliens, And Here's How To Find Them (20 Nov 2026)",
        url: "https://www.gamespot.com/articles/gta-6-has-aliens-and-heres-how-to-find-them/",
        used: "Chapter 1 requirement, motel road, time, going alone, flashing car, woods trail, later Hamlet follow-up",
      },
      {
        label: "PowerPyx: GTA 6 UFO Aliens Easter Egg Location (19 Nov 2026)",
        url: "https://www.powerpyx.com/gta-6-ufo-aliens-easter-egg-location/",
        used: "Same Kelly County road, after 2 AM, solo visit, random blinking-car spawn, woods path and blue light",
      },
    ],
  },
  {
    slug: "skunk-ape",
    path: "/secrets/skunk-ape",
    cardTitle: "Skunk Ape (Bigfoot)",
    kicker: "Secrets · Free-roam sighting and Kirk's swamp quests",
    title: "GTA 6 Skunk Ape: Where to Find Bigfoot",
    source: "GamesRadar+, GameSpot, Polygon, PowerPyx",
    backdrop: "boat",
    image: {
      src: "/secrets/skunk-ape-grassrivers-08.webp",
      alt: "Official GTA 6 screenshot of hunters on an airboat in a night swamp, with a gator in the water. © Rockstar Games",
      credit: "Official screenshot (Grassrivers 08). © Rockstar Games",
    },
    blurb: "Leonida's Bigfoot is the Skunk Ape. You can spot it in the swamps, and a side questline goes looking for it.",
    summary: [
      "Bigfoot is in GTA 6, and Leonida's version is the Skunk Ape. GamesRadar+, GameSpot, Polygon and PowerPyx all describe it (Confirmed).",
      "You can run into it in the swamps, and you can also start a three-part side questline for a man named Kirk. The short version is here; the full walkthrough, including the tree-effigy search, is in our Bigfoot guide.",
    ],
    chapter: "PowerPyx treats Kirk's first outing as a Chapter 1 side mission (Reported, PowerPyx). The later parts of his line wait until you have moved the story on; those details stay on the full guide, behind a spoiler blur.",
    howTo: [
      "For a free-roam sighting, GameSpot points to Gullet Marsh (Reported, GameSpot). Head into the Grassrivers swamps at night and give yourself time to look around.",
      "To start Kirk's quests, read a Skunk Ape flyer to save his number, then call him from your contacts. Polygon and PowerPyx both describe this (Confirmed). Polygon says the flyers show up in shopping areas and mentions Shrimp & Save in Key Lento (Reported, Polygon). PowerPyx found one at Skeeter's bar in Hamlet (Reported, PowerPyx).",
      "An airboat helps once you are deep in the mangroves. The step-by-step for each of Kirk's three parts, and what happens at the end, is in the full guide.",
    ],
    map: { href: "/map?q=Gullet+Marsh", label: "Search the map for Gullet Marsh" },
    moreMaps: [
      { href: "/map?place=olabel-grassrivers", label: "Grassrivers on the map" },
      { href: "/map?place=olabel-pelican-valley", label: "Pelican Valley on the map" },
    ],
    alsoSee: [
      { href: "/guides/bigfoot-skunk-ape", label: "Full Bigfoot and Skunk Ape guide" },
      { href: "/secrets/ufo", label: "UFO encounter" },
      { href: "/guides/strangers-and-freaks", label: "Strangers and Freaks" },
    ],
    faq: [
      {
        question: "Is Bigfoot in GTA 6?",
        answer:
          "Yes, as the Skunk Ape. GamesRadar+, GameSpot, Polygon and PowerPyx all describe it (Confirmed).",
      },
      {
        question: "Where do I look for the Skunk Ape?",
        answer:
          "GameSpot places a sighting in Gullet Marsh (Reported, GameSpot). Kirk's quests also take you into the Grassrivers and Pelican Valley swamps.",
      },
      {
        question: "How do I start the Skunk Ape quest?",
        answer:
          "Read a Skunk Ape flyer, then call Kirk from your phone contacts. Polygon and PowerPyx both describe this (Confirmed).",
      },
    ],
    sources: [
      {
        label: "GameSpot: GTA 6 Easter Eggs Are Everywhere, But These Are The Best Ones (18 Nov 2026)",
        url: "https://www.gamespot.com/articles/gta-6-easter-eggs-list-and-locations/",
        used: "Gullet Marsh sighting, confirmation that the creature is in the game",
      },
      {
        label: "Polygon: Where to find the tree effigies for the Skunk Ape mission in GTA 6 (19 Nov 2026)",
        url: "https://www.polygon.com/gta-6-skunk-ape-tree-effigies-locations-where-to-find/",
        used: "Flyer start, shopping-area flyers and the Key Lento lead",
      },
      {
        label: "PowerPyx: GTA 6 Search for the Skunk Ape Walkthrough (18 Nov 2026)",
        url: "https://www.powerpyx.com/gta-6-search-for-the-skunk-ape-walkthrough/",
        used: "Chapter 1 start, Skeeter's bar flyer, Kirk's questline",
      },
      {
        label: "GamesRadar+: GTA 6 Bigfoot sightings are already ramping up (18 Nov 2026)",
        url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-bigfoot-sightings-are-already-ramping-up-as-rockstar-honors-a-22-year-old-grand-theft-auto-legend/",
        used: "Independent confirmation that the Skunk Ape is in the game"
      },
    ],
  },
  {
    slug: "easter-eggs",
    path: "/secrets/easter-eggs",
    cardTitle: "Easter eggs",
    kicker: "Secrets · A literal Easter egg, plus film and TV nods",
    title: "GTA 6 Easter Eggs: Tower Nest and Hidden Nods",
    source: "GameSpot, GamesRadar+",
    backdrop: "skyline",
    image: {
      src: "/secrets/easter-eggs-vice-city-08.webp",
      alt: "Official GTA 6 screenshot of Vice City at night, with lit arenas, a ferris wheel and a tall tower on the skyline. © Rockstar Games",
      credit: "Official screenshot (Vice City 08). © Rockstar Games",
    },
    blurb: "A painted egg on Vice City's tallest tower, plus Dexter, Fast and Furious and Red Dead nods.",
    summary: [
      "GTA 6 is packed with small nods, but a few are worth a special trip. GameSpot's launch-week list is the backbone of what follows, with GamesRadar+ adding film and TV finds from a couple of days later.",
      "Nothing below gives away a story mission. A couple of payoffs, including what happens if you throw the tower egg, stay behind the spoiler toggle.",
    ],
    chapter: "Several of these are in Vice City, which you can drive to early if you want to, though the story takes a while to send you there (Reported, GameSpot). The Liberty City book is on Jason's table in Chapter 1 (Reported, GameSpot).",
    howTo: [
      "A literal Easter egg sits on Vice City's tallest tower. GameSpot, crediting the player who found it, says the climb takes about seven minutes. At the top is a nest of painted eggs; you can take one and throw it. What happens next is behind the spoiler toggle (Reported, GameSpot).",
      "Dexter's apartment is on Washington Island, a Vice City sub-region near Vice Beach, close to the Top Fun Drones shop. GameSpot and GamesRadar+ both place it there (Confirmed). You cannot go inside (Reported, GameSpot). GamesRadar+ adds that the building is in a complex called Trinity Apartments, and that there are tools on the roof and a boat nearby that players have compared to the Slice of Life (Reported, GamesRadar+).",
      "GamesRadar+ says you can take Brian O'Conner's 1995 Mitsubishi Eclipse from The Fast and the Furious by breaking into a garage on Vespucci Island, part of the Rialto Islands (Reported, GamesRadar+).",
      "For a Red Dead Redemption nod, GameSpot points to a Western novel about a cowboy in New Austin. One early copy is at Jacob's Tavern in Millport, and you can read excerpts (Reported, GameSpot).",
      "A memoir on Jason's dining-room table early in Chapter 1, near the back door, is written by a former member of a Liberty City crime ring and refers to events in 2008, the year GTA 4 is set (Reported, GameSpot).",
    ],
    map: { href: "/map?place=olabel-vice-city", label: "Vice City on the map" },
    moreMaps: [
      { href: "/map?place=olabel-vice-beach", label: "Vice Beach on the map" },
      { href: "/map?place=olabel-vespucci-island", label: "Vespucci Island on the map" },
      { href: "/map?place=olabel-millport", label: "Millport on the map" },
    ],
    alsoSee: [
      { href: "/secrets/ufo", label: "UFO encounter" },
      { href: "/secrets/skunk-ape", label: "Skunk Ape" },
      { href: "/secrets/hidden-locations", label: "Hidden locations and secret vehicles" },
    ],
    spoilers: [
      {
        label: "the tower-egg payoff, and other pop-culture nods",
        paragraphs: [
          "GameSpot's follow-up, built around a clip posted by xGarbett, shows the thrown egg hitting a scummy-sounding real estate agent or lawyer on the ground below (Reported, GameSpot).",
          "GamesRadar+ also notes Marvel gags: a comic called RX Men with a Magneto-like figure named Dr. Placebo, and a strawberry side quest that ends with a character in a Hulk-like state, clothes ripped (Reported, GamesRadar+). Later story missions, it says, pastiche films such as Die Hard and Heat, without spelling out which jobs (Reported, GamesRadar+).",
        ],
      },
    ],
    faq: [
      {
        question: "Where is the literal Easter egg in GTA 6?",
        answer:
          "On top of the tallest tower in Vice City. GameSpot says the climb takes about seven minutes, and you can take a painted egg from the nest and throw it (Reported, GameSpot).",
      },
      {
        question: "Where is Dexter's apartment?",
        answer:
          "On Washington Island in Vice City, near Vice Beach and the Top Fun Drones shop. GameSpot and GamesRadar+ both place it there (Confirmed). You cannot go inside (Reported, GameSpot).",
      },
      {
        question: "Is there a Fast and Furious car?",
        answer:
          "GamesRadar+ says Brian O'Conner's 1995 Mitsubishi Eclipse is in a garage on Vespucci Island, and you can take it (Reported, GamesRadar+).",
      },
    ],
    sources: [
      {
        label: "GameSpot: GTA 6 Easter Eggs Are Everywhere, But These Are The Best Ones (18 Nov 2026)",
        url: "https://www.gamespot.com/articles/gta-6-easter-eggs-list-and-locations/",
        used: "Tower nest, Dexter apartment, Red Dead novel, Liberty City memoir, Gullet Marsh mention",
      },
      {
        label: "GameSpot: GTA 6 Has A Hilarious Riff On Easter Eggs (18 Nov 2026)",
        url: "https://www.gamespot.com/articles/gta-6-has-a-hilarious-riff-on-easter-eggs/",
        used: "Climb time and the thrown-egg payoff (spoiler block only)",
      },
      {
        label: "GamesRadar+: GTA 6 is a movie and TV goldmine (20 Nov 2026)",
        url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-is-a-movie-and-tv-goldmine-as-players-discover-everything-from-fast-and-furious-cars-to-dexters-apartment/",
        used: "Fast and Furious car on Vespucci Island, Dexter tools and boat, Marvel nods",
      },
    ],
  },
  {
    slug: "strip-clubs",
    path: "/secrets/strip-clubs",
    cardTitle: "Strip clubs",
    kicker: "Secrets · Three clubs, three price points, cash only",
    title: "GTA 6 Strip Club Locations and Prices",
    source: "PC Gamer, Polygon, GamesRadar+",
    backdrop: "pier",
    image: {
      src: "/secrets/strip-clubs-cash-rain.webp",
      alt: "Official GTA 6 screenshot of a dancer lying in a shower of banknotes under pink and blue club lights. © Rockstar Games",
      credit: "Official screenshot. © Rockstar Games",
    },
    blurb: "Three clubs: Delights in Port Gellhorn, NINE1NINE downtown, and Jack of Hearts in Crosstown from Chapter 3.",
    summary: [
      "There are three strip clubs in Leonida, and the main outlets agree on the names and towns. NINE1NINE is the fancy Downtown option, Delights Cabaret is the cheap Port Gellhorn dive, and Jack of Hearts in Crosstown opens later in the story.",
      "Polygon says private dances and tips are cash only, so use an ATM first if you are short (Reported, Polygon). Outlets disagree on one price, and we show both figures rather than picking a winner.",
    ],
    chapter: "Polygon says Delights Cabaret and NINE1NINE are open from Chapter 1, and Jack of Hearts opens at the start of Chapter 3 (Reported, Polygon). GamesRadar+ also says Jack of Hearts is locked behind a Chapter 3 story mission (Confirmed with Polygon). PC Gamer could not get in when it visited and guessed Chapter 3 (Reported, PC Gamer).",
    howTo: [
      "NINE1NINE is in Downtown Vice City, next to The Vault. PC Gamer and Polygon both say so (Confirmed). GamesRadar+ puts it in the north of Downtown, just south of the overpass (Reported, GamesRadar+). Polygon's more precise pin is south-east of the large intersection, on NE 7th Street (Reported, Polygon). A private dance is $300 (Confirmed, PC Gamer and Polygon). PC Gamer adds a $50 tip and lists drinking and club dancing (Reported, PC Gamer).",
      "Delights Cabaret is in Port Gellhorn. PC Gamer, Polygon and GamesRadar+ all place it there (Confirmed). GamesRadar+ says central Port Gellhorn; Polygon puts it just south-east of Dunk's trailer, on the corner of the I-404 and Glenwood Ave (Reported, Polygon). PC Gamer's route from the Keys is route 1 to Hamlet, then 82 toward Capri, 103 onto the 404, and a right turn in town at the Delights billboard (Reported, PC Gamer).",
      "Private dances at Delights are where the guides split. PC Gamer lists a $40 private dance, a $10 tip and a $5 stage tip, and calls it the cheapest club, with stage dancing and pool (Reported, PC Gamer). Polygon says you can watch the dancers here but cannot order a private dance, and that only NINE1NINE and Jack of Hearts offer them (Reported, Polygon). If a private dance is the point of the trip, NINE1NINE is the one both outlets agree on.",
      "Jack of Hearts is in Crosstown, Vice City. PC Gamer places it directly north of NINE1NINE; GamesRadar+ says the north end of Crosstown (Confirmed on the district). Polygon puts it just north-west of the three tall skyscrapers near the bridge, on Mirimar Dr (Reported, Polygon). A private dance is $1,000 according to Polygon, the most expensive of the three (Reported, Polygon). PC Gamer did not get a price because it could not enter (Reported, PC Gamer).",
    ],
    map: { href: "/map?pin=gtadb-L190", label: "NINE1NINE on the map" },
    moreMaps: [
      { href: "/map?place=olabel-port-gellhorn", label: "Port Gellhorn on the map" },
      { href: "/map?place=olabel-crosstown", label: "Crosstown on the map" },
      { href: "/map?q=Delights+Cabaret", label: "Search for Delights Cabaret" },
    ],
    alsoSee: [
      { href: "/secrets/money", label: "Money secrets" },
      { href: "/map?place=olabel-downtown", label: "Downtown Vice City on the map" },
      { href: "/guides/money", label: "Full money guide" },
    ],
    faq: [
      {
        question: "How many strip clubs are in GTA 6?",
        answer:
          "Three, according to PC Gamer, Polygon and GamesRadar+: Delights Cabaret in Port Gellhorn, NINE1NINE in Downtown Vice City, and Jack of Hearts in Crosstown (Confirmed).",
      },
      {
        question: "How much is a private dance?",
        answer:
          "NINE1NINE is $300 (Confirmed, PC Gamer and Polygon). Jack of Hearts is $1,000 (Reported, Polygon). For Delights, PC Gamer lists $40 and Polygon says private dances are not offered there, so we report both (Reported).",
      },
      {
        question: "When does Jack of Hearts open?",
        answer:
          "At the start of Chapter 3, according to Polygon, and GamesRadar+ also ties it to a Chapter 3 story mission (Confirmed). PC Gamer could not enter earlier in the story (Reported, PC Gamer).",
      },
    ],
    sources: [
      {
        label: "PC Gamer: I reviewed every strip club in GTA 6 (19 Nov 2026)",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-strip-club-locations/",
        used: "Locations, NINE1NINE $300 and $50 tip, Delights $40 and route, Jack of Hearts story lock",
      },
      {
        label: "Polygon: Where to find strip clubs in GTA 6 (19 Nov 2026)",
        url: "https://www.polygon.com/gta-6-strip-club-locations-private-dances/",
        used: "All three locations, Chapter 1 / Chapter 3 access, $300 and $1,000 dances, cash-only rule, Delights with no private dance",
      },
      {
        label: "GamesRadar+: GTA 6 strip club locations (19 Nov 2026)",
        url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-strip-club-locations/",
        used: "District placements and the Chapter 3 lock on Jack of Hearts",
      },
    ],
  },
  {
    slug: "money",
    path: "/secrets/money",
    cardTitle: "Money secrets",
    kicker: "Secrets · What is worth stealing, and when",
    title: "GTA 6 Money Secrets and Best Payouts",
    source: "PowerPyx, GameSpot, PC Gamer",
    backdrop: "car",
    image: {
      src: "/secrets/money-store-job.webp",
      alt: "Official GTA 6 screenshot of a crew in a store hold-up, masks on and guns raised over the counter. © Rockstar Games",
      credit: "Official screenshot. © Rockstar Games",
    },
    blurb: "Don't farm cash in Chapter 1. Cars and stores carry you for a while; the biggest vault jobs come late.",
    summary: [
      "The best way to make money in GTA 6 changes as the story moves on. The headline figure, from PowerPyx, is that large bank vault robberies can pay up to $205,000 each, but they only open late (Reported, PowerPyx).",
      "Until then, stolen cars are the steadiest earner, with jewelry and other high-end stores on top once they become available. Every figure below is Reported, because Rockstar has not published payouts.",
    ],
    chapter: "PowerPyx says cash you are carrying is lost when Chapter 1 ends, so farming in the opening chapter is a waste (Reported, PowerPyx). Spend what you need on gear or repairs and play the story. Chapter-by-chapter unlocks for the bigger jobs sit behind the spoiler toggle.",
    howTo: [
      "In the early game, PowerPyx lists store hold-ups, gang hideouts (yellow icons on the map) and race wins as the practical earners (Reported, PowerPyx). GameSpot also points at hideouts, which it says pay almost as soon as you hand the goods to a dealer (Reported, GameSpot).",
      "Bank what you want to keep. Several guides, including our full money page, note that you lose what you are carrying if you die or get busted.",
      "Treasure diving is optional. GameSpot says Kenton eventually pays tens of thousands if you clear every piece at each dive spot; PC Gamer calls diving only mildly lucrative and very slow (Reported, both).",
      "GameSpot says small pawn shops are often not worth the wanted level, and that the better targets are high-end stores in richer areas (Reported, GameSpot). The exact later payouts are in the spoiler block and in the full money guide.",
    ],
    map: { href: "/map", label: "Open the interactive map" },
    alsoSee: [
      { href: "/guides/money", label: "Full money guide" },
      { href: "/secrets/hidden-locations", label: "Hidden locations and secret vehicles" },
      { href: "/secrets/collectibles", label: "Collectibles" },
    ],
    spoilers: [
      {
        label: "later-chapter payouts and when the big jobs open",
        paragraphs: [
          "PowerPyx says jewelry robberies open early in Chapter 3 and pay $10,000 to $25,000 a store, with a fence called Yasmani paying well for the haul. PC Gamer puts back-door store jobs at $6,000 to $15,000. Both mention a back-room safe. GameSpot prefers high-end stores in places such as Capri, Ocean Beach and downtown Vice City (Reported, each outlet as named).",
          "PowerPyx says the large bank vault jobs open at the end of Chapter 4 through an optional mission, shortly before the story's final stretch. The method it describes is to follow a security van to a bank and slip in while the vault is open. A large bank can pay up to about $205,000 in a few minutes and immediately gives a four-star wanted level. A fast motorcycle, then a vehicle swap, is the escape it suggests (Reported, PowerPyx).",
        ],
      },
    ],
    faq: [
      {
        question: "What is the biggest payout in GTA 6?",
        answer:
          "PowerPyx reports that large bank vault robberies, which open late in the story, can pay up to $205,000 each (Reported, PowerPyx).",
      },
      {
        question: "Should I farm money in Chapter 1?",
        answer:
          "No. PowerPyx says money you are carrying is lost when Chapter 1 ends, so there is no point stocking up (Reported, PowerPyx).",
      },
      {
        question: "What should I do for cash early on?",
        answer:
          "PowerPyx lists store hold-ups, gang hideouts and races. GameSpot also recommends hideouts for a quick payout once you hand the goods in (Reported).",
      },
    ],
    sources: [
      {
        label: "PowerPyx: GTA 6 money guide, how to get money fast (18 Nov 2026)",
        url: "https://www.powerpyx.com/gta-6-money-guide-how-to-get-money-fast/",
        used: "Chapter 1 cash loss, early earners, jewelry and vault payouts",
      },
      {
        label: "GameSpot: Best ways to make money fast in GTA 6 (18 Nov 2026)",
        url: "https://www.gamespot.com/articles/best-ways-to-make-money-fast-in-gta-6/",
        used: "Hideouts, diving, high-end stores versus small pawn shops",
      },
      {
        label: "PC Gamer: GTA 6, the fastest ways to make money (18 Nov 2026)",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-how-to-make-money/",
        used: "Back-door store job range and the diving time-versus-payout view"
      },
    ],
  },
  {
    slug: "collectibles",
    path: "/secrets/collectibles",
    cardTitle: "Collectibles",
    kicker: "Secrets · Cards, WAiNK scans and what 100% actually wants",
    title: "GTA 6 Collectibles: Cards and WAiNK Scans",
    source: "PowerPyx, Push Square",
    backdrop: "skyline",
    image: {
      src: "/secrets/collectibles-vice-city-09.webp",
      alt: "Official GTA 6 screenshot of a Vice City underpass covered in murals, with a parked car on the street. © Rockstar Games",
      credit: "Official screenshot (Vice City 09). © Rockstar Games",
    },
    blurb: "480 collectible cards in 18 sets, plus 100 WAiNK scans. You do not need every collectible for 100%.",
    summary: [
      "The collectible hunt in GTA 6 is large, but you do not have to finish every list for 100% completion. PowerPyx's Progress Database and Push Square's card and WAiNK guides agree on the headline numbers.",
      "This page is the short version. The full set lists, WAiNK groups and tracking menu path are in our collectibles guide.",
    ],
    chapter: "Cards and scans are available as you explore, including early on. Push Square says it will flag any card that turns out to be missable; none has been confirmed yet.",
    howTo: [
      "There are 480 collectible cards in 18 sets, according to PowerPyx. Push Square lists the same 18 sets and the same size for each one (Reported, both). The sets include sports teams, dancer collections tied to the three strip clubs, comics and more.",
      "PowerPyx and Push Square both say pawn shops will buy cards, and that selling one does not remove it from your Collections log. Push Square adds that not every pawn shop deals in cards (Reported).",
      "WAiNK scans are a separate list. PowerPyx says 100 scans are what the 100% checklist wants, and that street art does not count toward that total (Reported, PowerPyx).",
      "You do not need every collectible for 100%. PowerPyx says the checklist only wants certain categories in part, including 15 of the 18 card sets and those 100 WAiNK scans (Reported, PowerPyx). Track progress from the in-game Progress or Collections menu, as both outlets describe.",
    ],
    map: { href: "/map", label: "Open the interactive map" },
    alsoSee: [
      { href: "/guides/collectibles", label: "Full collectibles guide" },
      { href: "/secrets/strip-clubs", label: "Strip clubs" },
      { href: "/secrets/hidden-locations", label: "Hidden locations" },
    ],
    faq: [
      {
        question: "How many collectible cards are in GTA 6?",
        answer:
          "480 cards in 18 sets, according to PowerPyx. Push Square lists the same 18 sets and the same size for each one (Reported).",
      },
      {
        question: "How many WAiNK scans do I need?",
        answer:
          "PowerPyx says 100 scans are what the 100% checklist wants (Reported, PowerPyx).",
      },
      {
        question: "Do I need every collectible for 100%?",
        answer:
          "No. PowerPyx says the checklist only needs some categories in part, including 15 of the 18 card sets and 100 WAiNK scans (Reported, PowerPyx).",
      },
    ],
    sources: [
      {
        label: "PowerPyx: GTA 6 collectible guide, Progress Database (18 Nov 2026)",
        url: "https://www.powerpyx.com/gta-6-collectible-guide-progress-database/",
        used: "Category totals, 100% requirements, WAiNK counts",
      },
      {
        label: "PowerPyx: GTA 6 all collectible card sets (18 Nov 2026)",
        url: "https://www.powerpyx.com/gta-6-all-collectible-card-sets-locations/",
        used: "480 cards, 18 sets, selling cards, 15 sets for 100%",
      },
      {
        label: "Push Square: GTA 6 collectible card locations",
        url: "https://www.pushsquare.com/guides/gta-6-collectible-card-locations",
        used: "Second check on the 18 sets and sizes, selling, missable flag",
      },
      {
        label: "Push Square: GTA 6 WAiNK landmark locations",
        url: "https://www.pushsquare.com/guides/gta-6-waink-landmark-locations",
        used: "Second check on WAiNK scans and the Progress menu path",
      },
    ],
  },
  {
    slug: "hidden-locations",
    path: "/secrets/hidden-locations",
    cardTitle: "Hidden locations",
    kicker: "Secrets · Jets, free planes and a hidden garage car",
    title: "GTA 6 Hidden Locations and Secret Vehicles",
    source: "PC Gamer, GameSpot, PowerPyx, GamesRadar+",
    backdrop: "car",
    image: {
      src: "/secrets/hidden-vice-city-01.webp",
      alt: "Official GTA 6 screenshot of a jet flying over the Vice City hillside sign at sunset. © Rockstar Games",
      credit: "Official screenshot (Vice City 01). © Rockstar Games",
    },
    blurb: "A combat jet at a military base, free planes on the west coast, a Fast and Furious car in a Vespucci garage, and a laptop secret in Boobie Ike's apartment.",
    summary: [
      "Some of the best finds in Leonida are not marked as missions. The ones below are vehicles and spots that main outlets have actually placed, not rumour pins from fan maps.",
      "Each one is labelled Confirmed or Reported. The full list, including Ultimate Edition starter vehicles and parked sports cars, is in our secret vehicles guide.",
    ],
    chapter: "The Fast and Furious car can be grabbed once you can reach Vespucci Island (Reported, GamesRadar+). The jet and the west-coast planes are open-world thefts; expect a fight at the air station. Story-locked cars from later buyers stay on the full vehicles guide, behind a spoiler blur.",
    howTo: [
      "The Hauners P-996 Lazer combat jet is at Mile Zero Air Station on Goose Key, in the far south-west of the map, west of Key Lento. PC Gamer and GameSpot both place it there (Confirmed). It is a guarded military base, so expect a gunfight and a wanted level if you are seen. PC Gamer's easier way in is the south-east stunt jump over a dirt mound by the fence; GameSpot approaches by boat on the western side (Reported, each outlet).",
      "GameSpot also reports single-passenger planes parked in the open at Wild Hog Point, west of Port Gellhorn on the west coast of Kelly County, between Borrachero Sound and Draper Bay. It says taking one does not seem to get you reported if you fly low and stay out of restricted airspace, but you cannot keep them and they run out of fuel (Reported, GameSpot).",
      "PowerPyx points to double-decker crop-duster planes at airstrips in the south near Key Lento, in Mariana County, and in the middle of Kelly County. It says they respawn, carry plenty of fuel and, unlike the jets, do not bring fighters after you (Reported, PowerPyx).",
      "For a pop-culture find, GamesRadar+ says Brian O'Conner's 1995 Mitsubishi Eclipse from The Fast and the Furious is in a garage on Vespucci Island, in the Rialto Islands, and you can take it (Reported, GamesRadar+). That one also appears on our Easter eggs page.",
      "Once you have access to Boobie Ike's apartment in Chapter 3 (PowerPyx names it as the Chapter 3 home, at Bayside Apartments), there is a locked laptop inside. Clues around the apartment lead to the password; logging in reveals the location of a secret garage that holds a pink Porsche (Player-verified by our team). We have not placed a map pin for the garage yet, because the exact street has not been confirmed by a main outlet.",
    ],
    map: { href: "/map?place=olabel-vespucci-island", label: "Vespucci Island on the map" },
    moreMaps: [
      { href: "/map?q=Mile+Zero", label: "Search the map for Mile Zero" },
      { href: "/map?place=olabel-kelly-county", label: "Kelly County on the map" },
      { href: "/map?place=olabel-rialto-islands", label: "Rialto Islands on the map" },
    ],
    alsoSee: [
      { href: "/guides/secret-vehicles", label: "Full secret vehicles guide" },
      { href: "/secrets/easter-eggs", label: "Easter eggs" },
      { href: "/guides/stealing-cars", label: "Stealing cars" },
    ],
    faq: [
      {
        question: "Where is the GTA 6 fighter jet?",
        answer:
          "The Hauners P-996 Lazer is at Mile Zero Air Station on Goose Key, west of Key Lento. PC Gamer and GameSpot both place it there (Confirmed). It is a guarded base.",
      },
      {
        question: "Are there free planes I can just take?",
        answer:
          "GameSpot reports open-air planes at Wild Hog Point, west of Port Gellhorn (Reported, GameSpot). PowerPyx reports respawning crop-dusters at several airstrips (Reported, PowerPyx).",
      },
      {
        question: "Where is the Fast and Furious car?",
        answer:
          "GamesRadar+ places Brian O'Conner's 1995 Mitsubishi Eclipse in a garage on Vespucci Island (Reported, GamesRadar+).",
      },
      {
        question: "Is there a secret in Boobie Ike's apartment?",
        answer:
          "Yes. Once you can enter the apartment in Chapter 3, a locked laptop inside can be opened using clues found in the apartment. Logging in reveals the location of a secret garage with a pink Porsche (Player-verified by our team).",
      },
    ],
    spoilers: [
      {
        label: "the laptop password, and what it unlocks",
        paragraphs: [
          "The laptop password is muffinsqueen15, entered without spaces (Player-verified by our team).",
          "Once you are logged in, the messages on the laptop give you the location of a secret garage that holds a pink Porsche. We have not pinned the garage, because the exact street has not been confirmed by a main outlet.",
        ],
      },
    ],
    sources: [
      {
        label: "PC Gamer: GTA 6 military base location",
        url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-military-base-location/",
        used: "Mile Zero Air Station Lazer and the south-east stunt-jump approach",
      },
      {
        label: "GameSpot: How To Get A Plane In GTA 6 (18 Nov 2026)",
        url: "https://www.gamespot.com/articles/how-to-get-a-plane-in-gta-6/",
        used: "Lazer at Mile Zero, boat approach, Wild Hog Point planes",
      },
      {
        label: "PowerPyx: GTA 6 How to Unfog the Map Fast (Best Plane) (18 Nov 2026)",
        url: "https://www.powerpyx.com/gta-6-how-to-unfog-the-map-fast-best-plane/",
        used: "Respawning crop-dusters near Key Lento, Mariana County and Kelly County",
      },
      {
        label: "GamesRadar+: GTA 6 is a movie and TV goldmine (20 Nov 2026)",
        url: "https://www.gamesradar.com/games/grand-theft-auto/gta-6-is-a-movie-and-tv-goldmine-as-players-discover-everything-from-fast-and-furious-cars-to-dexters-apartment/",
        used: "Fast and Furious car in a Vespucci Island garage",
      },
    ],
  },
];

export const SECRET_BY_SLUG: Record<SecretSlug, SecretEntry> = Object.fromEntries(
  SECRET_ENTRIES.map((e) => [e.slug, e]),
) as Record<SecretSlug, SecretEntry>;

export function isSecretSlug(value: string): value is SecretSlug {
  return value in SECRET_BY_SLUG;
}
