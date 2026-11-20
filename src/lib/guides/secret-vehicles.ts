/**
 * Data for /guides/secret-vehicles. QC'd 20 Nov 2026 by re-reading every cited page (fact check: 50 claims on a viral fan map).
 * Rules for this page:
 * - Confirmed = two main outlets (or Rockstar). Reported = one main outlet, always named. Main outlets used: PC Gamer, GameSpot, PowerPyx, Push Square.
 * - Only vehicles that a main outlet places or explains are listed. Soaring Phoenix, Dodo, Maverick, Duster (by name), the Mt. Kalaga off-roader,
 *   the Meerwunder and Observatory "wrecks", Brimstone Golfer as a map spot and the Wyman wreck locations are unverified and are NOT on the page.
 * - "Hidden garage" claims are wrong: the jets and Rhino are at a guarded military base, the Wild Hog Point planes are parked in the open and
 *   PowerPyx's crop-duster planes are at open airstrips that respawn them.
 * - Push Square's Randy list is a work in progress. Rechecked 20 Nov 2026 (14:4x AEST): still "10 cars so far" of 22, last modified 18 Nov. Push Square
 *   counts 22 cars, PowerPyx's trophy guide 16 (the money guide 18). Never say the list is complete.
 * - Spoiler rules: Moses, Randy, Wyman, the Key Cloner, Chapter 2+ unlocks and mission names sit inside <Spoiler> blocks only. Block labels are neutral
 *   because the label shows on the page. Title, meta, H1, FAQ and JSON-LD are spoiler-free. Source links whose address names a story person or mission
 *   are split out into a blurred list (splitSources).
 * - Mile Zero: PC Gamer and GameSpot's plane guide write "Mile Zero". GameSpot's six-star guide writes "Mike Zero" (a typo); we use Mile Zero.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const SECRETVEH_PUBLISHED = "2026-11-20T14:50:00+10:00";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const SECRETVEH_VERIFIED = "2026-11-20T14:50:00+10:00";
export const SECRETVEH_VERIFIED_LABEL = "20 Nov 2026";

export type Label = "confirmed" | "reported";

export interface VehicleRow {
  vehicle: string;
  where: string;
  label: Label;
  by: string;
  note: string;
}

/** Jets, tanks and planes: visible. */
export const AIRCRAFT: VehicleRow[] = [
  {
    vehicle: "Hauners P-996 Lazer (combat jet)",
    where: "Mile Zero Air Station, Goose Key, in the far south-west corner of the map, west of Key Lento",
    label: "confirmed",
    by: "PC Gamer, GameSpot",
    note: "A guarded military base, so expect a gunfight and a wanted level if you're spotted. PC Gamer's easiest way in is the Mile Zero Air Station Southeast stunt jump: hit the dirt mound by the south-east fence at speed. GameSpot goes in by boat to the western side. It says jets are sometimes about to take off, and others sit in hangars you have to search.",
  },
  {
    vehicle: "Hauners Rhino (tank)",
    where: "Mile Zero Air Station",
    label: "reported",
    by: "PC Gamer",
    note: "PC Gamer lists it with the APCs at the base.",
  },
  {
    vehicle: "Single-passenger planes",
    where: "Wild Hog Point, west of Port Gellhorn on the west coast of Kelly County, between Borrachero Sound and Draper Bay",
    label: "reported",
    by: "GameSpot",
    note: "Parked in the open. GameSpot says taking one doesn't seem to get you reported if you fly low and stay out of restricted airspace. You can't keep them and they run out of fuel.",
  },
  {
    vehicle: "Double-decker crop-duster planes",
    where: "Airstrips in the south near Key Lento, in Mariana County, and in the middle of Kelly County",
    label: "reported",
    by: "PowerPyx",
    note: "PowerPyx says they respawn, carry plenty of fuel and, unlike the jets, don't bring fighter jets after you. If none has spawned, check the next airstrip.",
  },
];

/** Ultimate Edition starter vehicles: visible (Chapter 1, start of the game). */
export const STARTER: VehicleRow[] = [
  {
    vehicle: "Dinka Enduro (motorcycle)",
    where: "Jason's house, once you finish the first mission",
    label: "confirmed",
    by: "GameSpot, PowerPyx",
    note: "GameSpot says Standard Edition owners don't get it. PC Gamer places Jason's starting house in Key Lento.",
  },
  {
    vehicle: "Crest Kayak",
    where: "Jason's house",
    label: "confirmed",
    by: "GameSpot, PowerPyx",
    note: "Ultimate Edition only. GameSpot gives no maker; PowerPyx names it.",
  },
];

/** Sports cars parked around Leonida: visible. All Push Square only. */
export const PARKED: VehicleRow[] = [
  { vehicle: "Bravado Banshee", where: "Outside the Sweetbay Inn, East Buckley Dr, Capri", label: "reported", by: "Push Square", note: "Found around 3 AM." },
  { vehicle: "Pegassi Tempesta", where: "NE 3rd St, Vice City", label: "reported", by: "Push Square", note: "Not a fixed parking spot. It turned up in a random street event around 1 PM, with the owner arguing with a repo man beside a tow truck." },
  { vehicle: "Pegassi Infernus", where: "Level 7 of the Crosstown Police Station car park, NW 9th St, Crosstown", label: "reported", by: "Push Square", note: "Wait for an officer to leave the gate, then sneak in. There's a stunt jump on the top floor." },
  { vehicle: "Pegassi Vitello", where: "The garage nearest the house at a villa on Flamingo Pkwy, Waning Sands, east of Belville", label: "reported", by: "Push Square", note: "A fenced villa. The garage is on the right as you face the entrance." },
  { vehicle: "Bravado Gauntlet Hellfire", where: "M7 junkyard off Galerina St, east of Boone Speedway, Hamlet", label: "reported", by: "Push Square", note: "Gang turf. Push Square sneaked round the right side and found it at the back." },
  { vehicle: "Mamba GT", where: "A mansion in Leaf Links, Vice Beach", label: "reported", by: "Push Square", note: "Heavy security. The car is behind the main building on the right." },
  { vehicle: "Ascot Paragon", where: "Outside The Banana Hole Main Bar, Shore Dr, Ocean Beach", label: "reported", by: "Push Square", note: "Found around 6 PM." },
  { vehicle: "Piccia Furia", where: "Garage of a mansion on Palladia Ln, Peacock Estates", label: "reported", by: "Push Square", note: "Push Square's route: skip the front gate, go left and hop the hedge." },
  { vehicle: "Pegassi Toros", where: "Outside a residential building entrance on Bayside Dr, Tequesta Retreat", label: "reported", by: "Push Square", note: "Found around 6:30 PM. Security patrols the area." },
  { vehicle: "Pfister Growler", where: "Multi-storey car park on Fig St, Ocean Beach", label: "reported", by: "Push Square", note: "Found around 5 PM." },
];

/** Story-tied stolen-car jobs: inside a blur. PowerPyx and Push Square agree on all of them. */
export const JOBS: { car: string; where: string; note: string }[] = [
  { car: "'82 Canis Crawler", where: "Old Trader's Union building, Gellhorn Ave, Port Gellhorn", note: "The first job (Daily Driver). A white jeep. PowerPyx: $1,250, plus $500 for good condition." },
  { car: "Declasse Yosemite 1500", where: "Bastion St, south-west Port Gellhorn", note: "Being towed from a driveway. Stop or knock out the driver, then lower it off the hook. PowerPyx: $1,850." },
  { car: "Karin Futo", where: "Lockup at the south tip of Draper Island docks, north-west of Port Gellhorn", note: "Guarded docks. Door on the north-west side of the building, garage shutter at the west end. PowerPyx: $1,500." },
  { car: "Annis Hellion", where: "Driveway on Orchard Ave, south Port Gellhorn", note: "A dog in the yard. PowerPyx: $1,400." },
  { car: "BF Bandito", where: "Buckskin Swamp, Kelly County", note: "PowerPyx says south-east Kelly County and Push Square says the north-eastern part of the swamp. A silver one-seater among off-roaders. PowerPyx: $3,350." },
  { car: "Declasse Vamos", where: "A shed near Grayson, Lummox County (PowerPyx: north-east of town; Push Square: Rockledge Rd, east of town)", note: "Locked behind a keypad. Armed locals. PowerPyx: $4,200." },
  { car: "Western Nightblade", where: "Final Chapter motorcycle club compound, Birch St, Ambrosia", note: "Heavily armed. Bring armour. PowerPyx: $6,310." },
  { car: "Moses' Sultan (reward)", where: "The smaller garage beside Moses' shop, Port Gellhorn", note: "PowerPyx: a unique Street Racer. Push Square calls it his Emperor Sultan and says registering it costs $1,600." },
];

export const WYMAN_CARS = ["'67 Transgressor", "'70 Riata", "'64 Mamba GT", "Reynolds Kit Car", "'72 Deviant"];

/** Vehicles in blurs that carry a location or way to get them, for the counts. */
export const BLURRED_COUNT = {
  confirmed: JOBS.length + 3, // 8 stolen-car jobs + Dominator Buggy, Cheetah '95, Squalo
  reported: 2, // Zorrusso, Stanier '55
};

const all = [...AIRCRAFT, ...STARTER, ...PARKED];
export const SV_COUNTS = {
  confirmed: all.filter((r) => r.label === "confirmed").length + BLURRED_COUNT.confirmed,
  reported: all.filter((r) => r.label === "reported").length + BLURRED_COUNT.reported,
  visible: all.length,
  blurred: BLURRED_COUNT.confirmed + BLURRED_COUNT.reported,
  total: all.length + BLURRED_COUNT.confirmed + BLURRED_COUNT.reported,
  namesOnly: WYMAN_CARS.length,
};

export const SECRETVEH_FAQ: { question: string; answer: string }[] = [
  {
    question: "Where do you find the P-996 Lazer in GTA 6?",
    answer: "At Mile Zero Air Station, a guarded military base in the far south-west of the map, west of Key Lento. PC Gamer and GameSpot both place the jets there (Confirmed). Expect a wanted level and a fight if you're seen.",
  },
  {
    question: "Can you get a plane in GTA 6 without a mission?",
    answer: "Yes. GameSpot says single-passenger planes are parked in the open at Wild Hog Point, west of Port Gellhorn, and PowerPyx says crop-duster planes spawn at airstrips and respawn (both Reported). You can't keep these, and they run out of fuel.",
  },
  {
    question: "Are GTA 6's jets kept in a hidden garage?",
    answer: "Not according to our sources. GameSpot and PC Gamer put the jets inside a guarded military base, and the free planes sit at open airfields.",
  },
  {
    question: "Which vehicles are exclusive to the Ultimate Edition?",
    answer: "The Dinka Enduro motorcycle and the kayak at Jason's house. GameSpot says Standard Edition owners don't get them, and PowerPyx lists them as Ultimate Edition content (Confirmed). More Ultimate Edition vehicles unlock later in the story, so we keep those inside a blurred section on this page.",
  },
  {
    question: "Is there a complete list of GTA 6's secret vehicles?",
    answer: "No outlet has one. PowerPyx's Progress Database counts 557 vehicles, and Push Square's list of one set of sports cars is still unfinished (10 cars found so far, out of 22 it counts). We add a vehicle to this page only when a main outlet locates it.",
  },
];

export const SECRETVEH_SOURCES: { label: string; url: string; used: string; spoiler?: boolean }[] = [
  {
    label: "PC Gamer: GTA 6 military base location (18 Nov 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-military-base-location/",
    used: "Mile Zero Air Station, the Lazer, Rhino and other vehicles there, the stunt-jump way in, and Jason's house in Key Lento",
  },
  {
    label: "GameSpot: How To Get A Plane In GTA 6 (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/how-to-get-a-plane-in-gta-6/",
    used: "Wild Hog Point planes, jets at Mile Zero Air Station and the boat route in",
  },
  {
    label: "GameSpot: How To Get All GTA 6 Ultimate Edition Bonuses (18 Nov 2026)",
    url: "https://www.gamespot.com/articles/how-to-get-all-gta-6-ultimate-edition-bonuses/",
    used: "Ultimate Edition vehicles: the Enduro, kayak and the later-story ones",
  },
  {
    label: "PowerPyx: GTA 6 How to Get Ultimate Edition Rewards (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-how-to-get-ultimate-edition-rewards/",
    used: "Where the Ultimate Edition vehicles are found and when their map icons appear",
  },
  {
    label: "PowerPyx: GTA 6 How to Unfog the Map Fast (Best Plane) (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-how-to-unfog-the-map-fast-best-plane/",
    used: "Crop-duster planes at airstrips, respawns and why they don't draw fighter jets",
  },
  {
    label: "PowerPyx: GTA 6 All Cheats (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-all-cheats/",
    used: "The Lazer and Rhino spawn cheats and what unlocks them",
  },
  {
    label: "PowerPyx: GTA 6 Collectible Guide: Progress Database (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-collectible-guide-progress-database/",
    used: "The 557-vehicle count",
  },
  {
    label: "Push Square: GTA 6 vehicle drop-off locations for the Chapter 2 mechanic (18 Nov 2026)",
    url: "https://www.pushsquare.com/guides/gta-6-moses-vehicle-drop-off-locations",
    used: "The seven stolen-car jobs and the reward car",
    spoiler: true,
  },
  {
    label: "Push Square: GTA 6 vehicle locations for the Chapter 3 fence's list (work in progress, 18 Nov 2026)",
    url: "https://www.pushsquare.com/guides/gta-6-randys-wish-list-vehicle-locations",
    used: "The ten parked sports cars, their streets and times, and the 22-car count",
    spoiler: true,
  },
  {
    label: "PowerPyx: Steal Vehicles walkthrough (17 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-steal-vehicles-for-moses-walkthrough/",
    used: "The six follow-up stolen-car jobs and their payouts",
    spoiler: true,
  },
  {
    label: "PowerPyx: first stolen-car job walkthrough (17 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-daily-driver-steal-the-crawler-for-moses-walkthrough/",
    used: "The '82 Canis Crawler job",
    spoiler: true,
  },
  {
    label: "PowerPyx: reward walkthrough (17 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-collect-moses-gift-walkthrough/",
    used: "The reward Sultan",
    spoiler: true,
  },
  {
    label: "PowerPyx: Chapter 3 car-theft mission walkthrough (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-clonin-keys-makin-gs-steal-the-zorrusso-for-randy-walkthrough/",
    used: "The mission car's location, the tracker and the list size",
    spoiler: true,
  },
  {
    label: "PowerPyx: Trophy Guide & Roadmap (18 Nov 2026)",
    url: "https://www.powerpyx.com/gta-6-grand-theft-auto-vi-trophy-guide-roadmap/",
    used: "The 16-car figure for the Chapter 3 delivery list",
    spoiler: true,
  },
  {
    label: "PC Gamer: GTA 6 fence locations (18 Nov 2026)",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-fence-locations/",
    used: "That the Chapter 3 car mission and its car exist",
    spoiler: true,
  },
];
