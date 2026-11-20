/**
 * FAQ data for the four short guides: /guides/beginner, /guides/wanted, /guides/stealing-cars and /guides/activities.
 * Added 19 Nov 2026. Every answer is spoiler-free and cites a post-launch outlet; nothing here repeats the
 * pre-launch showcase notes already on the pages.
 * - Trophy wording: GamesRadar+, PC Gamer and TrueTrophies print the same text (Confirmed).
 * - Mission replay and post-story play: PowerPyx plus Push Square (Confirmed).
 * - Heat, recognition, vehicle registration and animal counts: PowerPyx only, so attributed and marked Reported.
 * Must not import from src/lib/seo (site.ts imports it).
 */

export const BASICS_UPDATED = "2026-11-19";

type Qa = { question: string; answer: string };

export const BEGINNER_FAQ: Qa[] = [
  {
    question: "Can I replay missions in GTA 6?",
    answer:
      "No. PowerPyx and Push Square both say story missions can't be replayed once you finish them, and there are no gold medals on missions. Both recommend manual saves, such as one at the start of each chapter, if you want a way back (Confirmed).",
  },
  {
    question: "Can I keep playing after I finish the story?",
    answer:
      "Yes. Push Square says you can keep exploring Leonida after the story ends, and PowerPyx says the Strangers & Freaks questlines can still be done in free roam afterwards (Confirmed).",
  },
  {
    question: "Can I play every mission as either character?",
    answer:
      "Not always. PowerPyx's full mission list tags some missions as Jason only and others as Lucia only, so you won't get a choice every time (Reported).",
  },
  {
    question: "What if a mission marker doesn't appear?",
    answer:
      "PowerPyx says quest givers mark their missions with phone messages, and the order you play in doesn't matter. If one doesn't show up, it suggests doing other quests or trying sleeping, and you can check pending missions from the story book icon on the map (Reported).",
  },
];

export const WANTED_FAQ: Qa[] = [
  {
    question: "How do I lose the police after a chase?",
    answer:
      "PowerPyx says you need to get out of the flashing blue and red search area on the minimap. It suggests taking a few corners or going off-road, then driving flat out along a straight road to build distance. A red heat outline then stays on the map (Reported).",
  },
  {
    question: "Do the police remember what I look like?",
    answer:
      "Yes, according to PowerPyx. After you escape, they remember your clothes, your hat and glasses, and your vehicle, and red icons in the top-right corner show what is still recognised. Changing that look, switching vehicles or ducking behind the wheel while driving lowers your recognition (Reported).",
  },
  {
    question: "Are there trophies tied to the wanted level?",
    answer:
      "Two trophy descriptions are. Hot Together is for losing a 4-star wanted level with your partner and escaping the heat, and Retail Therapy is for robbing 3 shops back to back with your partner without losing your wanted level. GamesRadar+, PC Gamer and TrueTrophies print the same wording (Confirmed).",
  },
];

export const STEALING_CARS_FAQ: Qa[] = [
  {
    question: "Can I keep a car I steal as my personal vehicle?",
    answer:
      "Not early on. PowerPyx says you can steal vehicles off the street in Chapter 1 but can't register them as your personal vehicle yet, and that registering new personal vehicles unlocks automatically later in the story (Reported).",
  },
  {
    question: "Will the police recognise the car I stole?",
    answer:
      "They can. PowerPyx says police remember the vehicle you drive after a chase, and that a respray or switching to a different vehicle helps you avoid being recognised (Reported).",
  },
  {
    question: "Are there trophies about cars?",
    answer:
      "Two trophy descriptions mention vehicles. Whip It Good is for discovering 100 vehicles, and On the Spot is for registering 10 vehicles to the Scooter Bros app. GamesRadar+, PC Gamer and TrueTrophies print the same wording (Confirmed).",
  },
  {
    question: "How many vehicles do I need to scan for the 100% checklist?",
    answer:
      "PowerPyx says 200 of the 277 base-model vehicles, scanned with the WAiNK app, and that scans made during the story already count (Reported).",
  },
];

export const ACTIVITIES_FAQ: Qa[] = [
  {
    question: "Which activities have their own trophies?",
    answer:
      "Several. The trophy lists include awards for beating Cal in a fishing challenge, completing an arcade game, winning 20 different races, winning a drone race at every location, earning a gold medal in every Shooting Range challenge, meditating at every spot and completing 250 stunts. GamesRadar+, PC Gamer and TrueTrophies print the same wording (Confirmed).",
  },
  {
    question: "Is there a trophy for trying every activity?",
    answer:
      "Yes. Master of None asks you to try each type of activity once, according to GamesRadar+, PC Gamer and TrueTrophies. Only GamesRadar+ gives a number, nine types in total, so treat that figure as Reported.",
  },
  {
    question: "How many meditation spots are there?",
    answer: "GamesRadar+ counts 18 for the Positive Mental Attitude trophy, which asks you to meditate at every spot in Leonida (Reported).",
  },
  {
    question: "Do I need to study every animal?",
    answer:
      "No. PowerPyx says the 100% checklist needs any 100 of 255 animals studied, using the binoculars or by swimming near fish while diving, and that progress made during the story already counts (Reported).",
  },
];
