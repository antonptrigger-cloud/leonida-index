/**
 * Data for /guides/chapter-3-side-job-locations. QC'd 20 Nov 2026 by re-reading the PowerPyx labs page, the PowerPyx index, Push Square and PC Gamer.
 * Rules for this page:
 * - Standalone side-job guide, NOT part of the numbered mission chain: Push Square lists the entry at Chapter 3 #9, PC Gamer has no such entry
 *   (it lists a different mission at #9) and PowerPyx files it as a side questline that is marked as not counting toward the Strangers & Freaks trophy.
 * - Everything below the order note is PowerPyx only, so it is Reported. The $30,500 total is OUR OWN sum of PowerPyx's 13 described payouts.
 * - PowerPyx says 14 sites but describes 13. We say so and do not invent a 14th.
 * - The questline's name, the quest giver, the district names and the premise sit inside spoiler blocks. Title, meta, H1, slug, FAQ and schema are neutral.
 * - The follow-up mission and the trophy it shares a name with are not named anywhere, and PowerPyx's follow-up URL is not used.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const SIDEJOBS_PUBLISHED = "2026-11-20T13:15:47+10:00";
/** Last edit, ISO 8601 with offset (Brisbane). Drives sitemap lastmod and dateModified. */
export const SIDEJOBS_VERIFIED = "2026-11-20T13:15:47+10:00";
export const SIDEJOBS_VERIFIED_LABEL = "20 Nov 2026";

export const SIDEJOBS_PATH = "/guides/chapter-3-side-job-locations";

export const SIDEJOBS_FAQ: { question: string; answer: string }[] = [
  {
    question: "Is this a story mission?",
    answer:
      "Outlets disagree. Push Square lists it as Chapter 3 #9, PC Gamer's list has no such entry and puts a different mission at #9, and PowerPyx files it as a side questline, listed among its Strangers & Freaks questlines but marked as not counting toward the Strangers & Freaks trophy (Reported). We treat it as a side job.",
  },
  {
    question: "How many locations are there?",
    answer: "PowerPyx says 14 but describes only 13. Our list covers those 13 and will be updated when the last one is confirmed (Reported).",
  },
  {
    question: "How much does each location pay?",
    answer: "PowerPyx lists $2,000 or $2,500 per site. The 13 described sites add up to $30,500, which is our own sum of PowerPyx's figures (Reported).",
  },
  {
    question: "Do I have to wait to be told where the next site is?",
    answer: "No. PowerPyx says you can go to the locations yourself and clear them without being given them first (Reported).",
  },
  {
    question: "How do I know which sites I've already cleared?",
    answer: "PowerPyx says there's no in-game list. A cleared site stays destroyed and the building generally looks burnt when you go back (Reported).",
  },
  {
    question: "Can I miss any of the sites?",
    answer: "PowerPyx says the sites are not missable and can still be cleared in free roam after the story (Reported).",
  },
];

export const SIDEJOBS_SOURCES = [
  {
    label: "PowerPyx: side job locations guide",
    url: "https://www.powerpyx.com/gta-6-all-kitty-litter-lab-locations/",
    used: "Site count, search areas, how to clear a site, pay, the 13 described locations, codes, tracking and the not-missable note",
  },
  {
    label: "PowerPyx: full walkthrough index",
    url: "https://www.powerpyx.com/gta-6-full-walkthrough-all-missions/",
    used: "That PowerPyx lists it as a side questline that does not count toward the Strangers & Freaks trophy",
  },
  {
    label: "Push Square: GTA 6 chapters and story missions",
    url: "https://www.pushsquare.com/guides/gta-6-chapters-and-story-missions",
    used: "That Push Square lists it at Chapter 3 #9 of its story missions",
  },
  {
    label: "PC Gamer: GTA 6 mission list",
    url: "https://www.pcgamer.com/games/grand-theft-auto/gta-6-mission-list/",
    used: "That PC Gamer's list has no such entry and puts a different mission at Chapter 3 #9",
  },
];

export const SIDEJOBS_ROWS: { where: string; look: string; pay: string; watch: string }[] = [
  { where: "First (story) site", look: "A trailer in the southern middle block of its search area. Pink smoke from the roof and yellow tubes from the windows.", pay: "$2,000", watch: "Two guards outside" },
  { where: "Balsero #1", look: "A garage on a building at the north edge of the area.", pay: "$2,000", watch: "Around three enemies who shoot as soon as you enter. A paper to inspect just inside the door, on the left." },
  { where: "Balsero #2", look: "A garage in the building directly in the middle of the area, right where the marker is.", pay: "$2,500", watch: "Keypad door: PowerPyx gives the code as 1999, shown on a billboard nearby. A receipt to inspect on the counter in the back left corner." },
  { where: "Balsero #3", look: "The second-southernmost trailer in the area.", pay: "$2,500", watch: "A guard outside. Use the Snap Gun or break the door down." },
  { where: "Central Rockridge", look: "A garage in the centre of the area that looks darker than the buildings around it on the map.", pay: "$2,500", watch: "Enter from the alley to the west" },
  { where: "Crosstown #1", look: "A second-floor flat on the north side of the area, with pink containers in front of the door.", pay: "$2,000", watch: "The person inside may drop something that sets the room alight when you break in, so don't rush through the door" },
  { where: "Crosstown #2", look: "A garage on the back of the building that has Cross My Heart Tattoos.", pay: "$2,500", watch: "A guard outside" },
  { where: "Crosstown #3", look: "A garage on the east side of the building in the centre of the area.", pay: "$2,500", watch: "A cook inside you can question for another location before destroying the site" },
  { where: "Decor District", look: "A garage in the building in the north-west corner of the area, beside the highway.", pay: "$2,500", watch: "A cook inside you can question for another location" },
  { where: "Little Cuba", look: "The long building in the middle of the area.", pay: "$2,500", watch: "Locked: use the Snap Gun or break the door open" },
  { where: "Salton", look: "The apartment building that covers the whole area. Climb in through the open window on the east side to reach the locked flat.", pay: "$2,000", watch: "Two cooks inside. Shooting them may set the site on fire." },
  { where: "Tequesta", look: "The upper floor of the eastern, C-shaped motel building.", pay: "$2,500", watch: "Locked door: Snap Gun or break it open. The cook is likely holding a beaker and may throw it, which starts a fire." },
  { where: "Vice-Dale", look: "A trailer directly in the centre of the area. The doors are locked, so climb in through the window on the east side.", pay: "$2,500", watch: "No cook: a vagrant who knows nothing about the site and runs off if you tell him to leave. A business card to inspect on the counter." },
];
