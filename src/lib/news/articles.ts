/**
 * News articles. Single source of truth for the /news index, page metadata
 * (via src/lib/seo/site.ts) and NewsArticle JSON-LD.
 *
 * `published` / `updated` are real ISO timestamps. Set `published` to the moment the
 * article goes live (the owner's approval), and bump `updated` whenever a fact changes.
 */
export interface NewsItem {
  slug: string;
  /** SEO title. The root template appends " | Leonida Vice Guide", so keep it short. */
  title: string;
  description: string;
  /** Breadcrumb label. */
  crumb: string;
  /** One line for the news index. */
  teaser: string;
  /** Index tag, e.g. "Launch". */
  tag: string;
  keywords: string[];
  published: string;
  updated: string;
  /** Sources the article relies on, emitted as JSON-LD `citation`. */
  citations: string[];
  /** Optional real Q&A, rendered visibly by <Faq> (which also emits FAQPage JSON-LD). Never invent questions. */
  faq?: { question: string; answer: string }[];

  /*
   * Optional /news index controls. All of these have sensible defaults (see src/lib/news/hub.ts),
   * so a new article only needs the fields above. Documented in docs/NEWS_INDEX.md.
   */
  /** Topic filter on the index. Default: derived from `tag` (see TAG_CATEGORY in hub.ts). */
  category?: NewsCategory;
  /** Updating/evergreen page (server tracker, reviews, release countdown). Shown in the "Live trackers" strip with an "Updated HH:MM AEST" badge instead of the story lists. */
  live?: boolean;
  /** Keep among the top stories after it stops being the newest. */
  pinned?: boolean;
  /** Send straight to the Archive, even if it is new (e.g. a superseded or pre-launch piece). */
  archived?: boolean;
}

export type NewsCategory = "launch" | "servers" | "reviews" | "sales" | "events" | "streamers" | "platforms";

export const NEWS_PUBLISHED = "2026-11-18T22:35:00+10:00";

/** Streamer stories. Set to the approval time when they go live; `updated` is when the numbers were last checked. */
export const STREAMERS_PUBLISHED = "2026-11-18T23:10:00+10:00";

/** SEO content-gap guides. Set to the moment they go live; bump `updated` on every fact change. */
export const GAPS_PUBLISHED = "2026-11-18T23:38:00+10:00";

/** Fact-update batch (tracker, file size, performance, reviews, preload). Web Bot: set to the moment the edits go live. */
export const UPDATES_AT = "2026-11-18T23:50:00+10:00";

/** 19 Nov 08:00 AEST batch (tracker refresh, reviews refresh). Web Bot: set to the moment these edits go live. */
export const UPDATES_0800_AT = "2026-11-19T08:13:00+10:00";

/** Festival set times / Heat night piece. Web Bot: set to the moment it goes live. */
export const FESTIVAL_PUBLISHED = "2026-11-19T08:13:00+10:00";

/** 19 Nov 09:00 AEST batch (tracker refresh). Set to the time of the edit. */
export const UPDATES_0900_AT = "2026-11-19T09:08:00+10:00";

/** Sales estimate piece. Set to the time of the edit. */
export const SALES_PUBLISHED = "2026-11-19T09:08:00+10:00";

/** 20 Nov 02:00 AEST run: sales piece updated with Sensor Tower's revised 19.05M estimate. Set to the time of the edit. */
export const SALES_UPDATED_0200_AT = "2026-11-20T02:00:00+10:00";

/** 20 Nov 11:00 AEST run: sales piece updated with Sensor Tower's 24.58M / $2.36B estimate (GameSpot, Deadline). Set to the PR-open time. */
export const SALES_UPDATED_1100_AT = "2026-11-20T12:04:48+10:00";

/** 19 Nov 11:00 AEST batch (tracker refresh after the UK unlock, refresh queue batch A). Set to the time of the edit. */
export const UPDATES_1100_AT = "2026-11-19T11:07:00+10:00";

/** 19 Nov 12:00 AEST batch (tracker refresh, readings 11:46-12:01 AEST). */
export const UPDATES_1200_AT = "2026-11-19T12:04:00+10:00";

/** 19 Nov 13:00 AEST batch (tracker readings 12:48-13:00 AEST, Heat result, launch streams past tense). */
export const UPDATES_1300_AT = "2026-11-19T13:05:00+10:00";

/** 19 Nov 14:00 AEST batch (tracker readings 13:54-14:04 AEST). */
export const UPDATES_1400_AT = "2026-11-19T14:09:45+10:00";

/** 19 Nov 15:00 AEST batch (tracker readings 14:59-15:10 AEST, first US readings). Set to the time of the edit. */
export const UPDATES_1500_AT = "2026-11-19T15:20:30+10:00";

/** 19 Nov 16:00 AEST batch (tracker readings 15:54-16:02 AEST, refresh queue batch B). Set to the time of the edit. */
export const UPDATES_1600_AT = "2026-11-19T16:08:22+10:00";

/** 19 Nov 17:00 AEST batch (tracker readings 17:00-17:05 AEST, GTA+ perks piece). Set to the time of the edit. */
export const UPDATES_1700_AT = "2026-11-19T17:10:14+10:00";

/** 19 Nov 18:00 AEST batch (tracker readings 17:52-17:58 AEST, NBN record piece). Set to the time of the edit. */
export const UPDATES_1800_AT = "2026-11-19T18:03:18+10:00";

/** 19 Nov 19:00 AEST batch (tracker readings 18:58-19:05 AEST, Game Awards piece). Set to the time of the edit. */
export const UPDATES_1900_AT = "2026-11-19T19:08:00+10:00";

/** 20 Nov 05:00 AEST batch (viewership update with Streams Charts day-one recap). Set to the edit time. */
export const UPDATES_0500_AT = "2026-11-20T05:03:00+10:00";

/** First-person glitch piece. Set to the draft time; Web Bot adjusts if it goes live later. */
export const FIRSTPERSON_GLITCH_PUBLISHED = "2026-11-20T19:08:24+10:00";

/** GTA VI: The Album piece. Set to the edit time; Web Bot adjusts if it goes live later. */
export const ALBUM_PUBLISHED = "2026-11-20T17:09:48+10:00";

/** Army reenlistment GTA pass piece. Set to the time the PR was opened; adjust at merge. */
export const ARMY_PASS_PUBLISHED = "2026-11-20T12:03:06+10:00";

/** No-prostitutes explainer (Rockstar statement via Shacknews). Set to the edit time; Web Bot adjusts if it goes live later. */
export const NO_PROSTITUTES_PUBLISHED = "2026-11-20T08:12:59+10:00";

/** DE-CIX traffic record piece. Set to the edit time. */
export const DECIX_RECORD_PUBLISHED = "2026-11-20T05:03:00+10:00";

/** Game Awards nominations piece. PLACEHOLDER: Web Bot sets this to the go-live time. */
export const TGA_NOMS_PUBLISHED = "2026-11-19T19:08:00+10:00";

/** NBN traffic record piece. Set to the time of the edit. */
export const NBN_RECORD_PUBLISHED = "2026-11-19T18:03:18+10:00";

/** GTA+ story-mode perks piece. Set to the time of the edit. */
export const GTA_PLUS_PUBLISHED = "2026-11-19T17:10:14+10:00";

/** Age rating quick-answer page: boards re-read 11:46-11:48 AEST 19 Nov 2026. Also used for `updated` until the first fact change; bump `updated` on every edit. */
export const AGE_RATING_PUBLISHED = "2026-11-19T11:48:00+10:00";

export const newsPath = (slug: string) => `/news/${slug}`;

export const NEWS: NewsItem[] = [
  {
    slug: "gta-6-first-person-glitch",
    title: "GTA 6 First-Person Glitch: How It Works",
    description:
      "GTA 6 has no first-person mode, but a controller-setting glitch forces one on PS5 and Xbox. PC Gamer tested it. The steps, how to get out, and what is unknown.",
    crumb: "GTA 6 first-person glitch",
    teaser: "A controller-setting trick locks GTA 6 into first person for walking, driving and shooting. PC Gamer tested it. The steps, the catch, and how to get back to third person.",
    tag: "Glitches",
    category: "launch",
    keywords: ["GTA 6 first person glitch", "GTA 6 first person mode", "how to play GTA 6 in first person", "GTA 6 first person PS5", "GTA 6 first person Xbox", "GTA 6 glitch"],
    published: FIRSTPERSON_GLITCH_PUBLISHED,
    updated: FIRSTPERSON_GLITCH_PUBLISHED,
    citations: [
      "https://www.pcgamer.com/games/grand-theft-auto/gta-6-is-playable-in-first-person-heres-how-to-activate-it/",
      "https://kotaku.com/live-updates-on-gta-6-the-biggest-launch-in-gaming-history-2000758030",
      "https://www.purexbox.com/news/2026/11/gta-6-first-person-glitch-discovered-and-it-works-on-xbox-and-ps5",
      "https://www.dexerto.com/gta/gta-6-glitch-lets-players-access-first-person-mode-3430025/",
    ],
    faq: [
      {
        question: "Does GTA 6 have a first-person mode?",
        answer: "Not officially. GTA 6 launched without a dedicated first-person mode, but PC Gamer tested a glitch that forces a first-person camera, and Kotaku passed on the same claim.",
      },
      {
        question: "How do you get first person in GTA 6 with the glitch?",
        answer: "Per PC Gamer: change the touch pad/select button to Camera 2 / 2 in the controller settings, get into a car, bring up your phone with the D-pad, press Circle or B, then quickly hit that button. Pure Xbox says it can take a few tries.",
      },
      {
        question: "How do you turn the GTA 6 first-person glitch off?",
        answer: "There is no toggle. PC Gamer says to reload a save, even one you made in first person. Kotaku's live blog says the view lasts until you exit the game, and Pure Xbox says being arrested or entering a hair salon sent the camera back to third person.",
      },
    ],
  },
  {
    slug: "gta-6-the-album-tracklist",
    title: "GTA 6 Album: Full 34-Track List",
    description:
      "Grand Theft Auto VI: The Album from Rockstar and Atlantic Records is out with 34 tracks. The full tracklist, release timing, vinyl editions and score date.",
    crumb: "GTA 6: The Album tracklist",
    teaser: "Rockstar and Atlantic's 34-track soundtrack is on streaming. The full tracklist, when it landed, vinyl and CD exclusives, and the Justice score date.",
    tag: "Music",
    category: "launch",
    keywords: ["GTA 6 album", "Grand Theft Auto VI: The Album", "GTA 6 soundtrack tracklist", "GTA 6 Atlantic Records", "GTA 6 album vinyl", "GTA 6 Justice score"],
    published: ALBUM_PUBLISHED,
    updated: ALBUM_PUBLISHED,
    citations: [
      "https://www.take2games.com/ir/news/rockstar-games-announces-grand-theft-auto-vi-now-available",
      "https://www.rockstargames.com/VI/music",
      "https://music.apple.com/us/album/grand-theft-auto-vi-the-album/6812476961",
      "https://www.billboard.com/music/music-news/grand-theft-auto-vi-the-album-1236385865/",
      "https://www.complex.com/music/a/shawn-setaro/grand-theft-auto-vi-the-album-released",
      "https://www.digitalmusicnews.com/2026/11/19/grand-theft-auto-vi-the-album/",
    ],
    faq: [
      {
        question: "How many songs are on GTA 6: The Album?",
        answer: "34. Take-Two's launch press release and Rockstar's music page both say the official soundtrack has 34 original tracks, and the Apple Music listing runs 1 hour 37 minutes.",
      },
      {
        question: "When did the GTA 6 album come out?",
        answer: "Take-Two's 19 November release said it would arrive on streaming services at midnight. Apple Music lists 20 November, and Billboard and Complex report it hit streaming on Friday 20 November.",
      },
      {
        question: "Is the Justice score on the album?",
        answer: "No. Grand Theft Auto VI: Original Score by Justice is a separate album that Rockstar says arrives on 11 December, with 30 tracks plus digital bonus tracks. Justice do have two songs on The Album itself.",
      },
    ],
  },
  {
    slug: "gta-6-army-reenlistment-four-day-pass",
    title: "43 Soldiers Took Army's GTA 6 Reenlistment Pass",
    description:
      "The Army says 43 of 130 eligible Fort Stewart soldiers took a four-day GTA 6 launch pass for reenlisting two to six more years. How the deal worked.",
    crumb: "Army GTA 6 reenlistment pass",
    teaser: "A four-day pass for GTA 6's launch in exchange for two to six more years of service. The Army's numbers, the memo, and the career counselor behind it.",
    tag: "Viral",
    category: "launch",
    keywords: ["GTA 6 Army reenlistment", "GTA 6 four-day pass", "Fort Stewart GTA 6", "soldiers reenlist GTA 6", "9th Brigade Engineer Battalion", "GTA 6 viral news"],
    published: ARMY_PASS_PUBLISHED,
    updated: ARMY_PASS_PUBLISHED,
    citations: [
      "https://www.rockstargames.com/VI/only-in-leonida",
      "https://www.axios.com/2026/11/19/gta-6-deal-perks-bonus-army",
      "https://taskandpurpose.com/culture/army-reenlistment-gta-vi/",
      "https://taskandpurpose.com/news/army-reenlistment-gta/",
      "https://www.polygon.com/gta-6-us-army-soldiers-reenlist-four-day-weekend/",
    ],
    faq: [
      {
        question: "How many soldiers reenlisted for the GTA 6 pass?",
        answer: "43 of the 130 eligible soldiers in the 9th Brigade Engineer Battalion at Fort Stewart, Georgia chose the four-day GTA 6 pass when they reenlisted, a 3rd Infantry Division spokesperson told Axios.",
      },
      {
        question: "What did soldiers have to do to get the GTA 6 pass?",
        answer: "Reenlist for two to six more years between 1 August and 14 November 2026. The pass came on top of the Army's standard reenlistment incentives, timed to GTA 6's 19 November release.",
      },
      {
        question: "Who came up with the GTA 6 reenlistment idea?",
        answer: "Staff Sgt. Brittany Wolfer, the battalion's career counselor, pitched it to her command after a senior Army career counselor floated the idea on TikTok, according to Task & Purpose.",
      },
    ],
  },
  {
    slug: "gta-6-no-prostitutes-rockstar",
    title: "GTA 6 Has No Hireable Prostitutes",
    description:
      "Shacknews reports you can't hire prostitutes in GTA 6, a series staple since GTA III. Rockstar's statement to Shacknews, what outlets say and what is still in.",
    crumb: "No prostitutes in GTA 6",
    teaser: "Shacknews and Polygon say a GTA staple since 2001 is gone. Rockstar's statement to Shacknews word for word, what it does and doesn't say, and what's still in.",
    tag: "Explainer",
    category: "launch",
    keywords: ["GTA 6 prostitutes", "can you hire prostitutes in GTA 6", "GTA 6 removed features", "GTA 6 strip clubs", "Rockstar statement Shacknews", "GTA 6 Jason and Lucia"],
    published: NO_PROSTITUTES_PUBLISHED,
    updated: NO_PROSTITUTES_PUBLISHED,
    citations: [
      "https://www.shacknews.com/article/151386/prostitutes-gta6",
      "https://www.polygon.com/gta-6-prostitutes-hookers-strippers-where-are-npcs-rockstar/",
      "https://www.pcgamer.com/games/grand-theft-auto/you-cant-cheat-on-lucia-in-gta-6-with-mandy-or-strippers-because-rockstar-doesnt-believe-thats-complementary-to-the-feeling-and-motivations-of-jason-and-lucias-story/",
    ],
    faq: [
      {
        question: "Can you hire prostitutes in GTA 6?",
        answer: "No. Shacknews reports that you cannot solicit prostitutes in GTA 6, and Polygon says hireable sex workers are not returning as an NPC type. The feature had been in the series since GTA III in 2001.",
      },
      {
        question: "Why are there no prostitutes in GTA 6?",
        answer: "Shacknews says Rockstar removed the feature. In a statement to Shacknews, Rockstar said GTA VI is about \"a couple in a bind, lovers on the run\", that many aspects of previous titles are not present, and that everything in the game was chosen to support Jason and Lucia's story. The statement does not mention prostitutes by name.",
      },
      {
        question: "Are there strip clubs in GTA 6?",
        answer: "Yes. PC Gamer and Polygon both report that you can still visit strip clubs, and PC Gamer says Jason and Lucia can go together.",
      },
    ],
  },
  {
    slug: "gta-6-game-awards-nominations",
    title: "GTA 6 Leads The Game Awards 2026",
    description:
      "GTA 6 leads The Game Awards 2026 with eight nominations, including Game of the Year. Every category, its rivals, the Lucia actor question and voting dates.",
    crumb: "Game Awards nominations",
    teaser: "Eight nominations, Game of the Year included. Every category, the rivals, what the Best Performance nod confirms and when voting closes.",
    tag: "Awards",
    category: "reviews",
    keywords: ["GTA 6 Game Awards", "The Game Awards 2026 nominees", "GTA 6 Game of the Year", "GTA 6 nominations", "Manni L. Perez", "Game Awards 2026 date"],
    published: TGA_NOMS_PUBLISHED,
    updated: TGA_NOMS_PUBLISHED,
    citations: [
      "https://thegameawards.com/nominees",
      "https://thegameawards.com/categories/best-performance",
      "https://www.shacknews.com/article/151383/gta-6-the-game-awards-2026-nominations",
      "https://www.gamespot.com/articles/here-are-the-most-nominated-games-and-publishers-at-the-game-awards-this-year/",
      "https://www.polygon.com/game-awards-2026-nominees-most-nominations-gta-6-zelda/",
      "https://www.videogameschronicle.com/news/gta-6-is-the-most-nominated-game-at-the-game-awards-2026/",
      "https://www.theverge.com/games/1035602/gta-vis-voice-actor-for-lucia-was-revealed-by-the-game-awards",
      "https://www.polygon.com/gta-6-lucia-actor-confirmed-game-awards-2026/",
      "https://www.pcgamer.com/games/live/news/grand-theft-auto-6-live-launch-coverage/",
    ],
    faq: [
      {
        question: "How many Game Awards nominations did GTA 6 get?",
        answer: "Eight, the most of any game at The Game Awards 2026: Game of the Year, Best Game Direction, Best Narrative, Best Art Direction, Best Score and Music, Best Audio Design, Best Performance (Manni L. Perez) and Best Action/Adventure. GameSpot, Polygon, Shacknews and VGC all report eight.",
      },
      {
        question: "Is GTA 6 nominated for Game of the Year?",
        answer: "Yes. The other Game of the Year nominees are 007 First Light, Control Resonant, Phantom Blade Zero, Resident Evil Requiem and The Legend of Zelda: Ocarina of Time.",
      },
      {
        question: "Does the nomination confirm who plays Lucia?",
        answer: "Not officially. The Game Awards lists Manni L. Perez as a Best Performance nominee for GTA VI without naming a character. Outlets link her to Lucia, but Polygon and The Verge say Rockstar has not confirmed its cast.",
      },
      {
        question: "When are The Game Awards 2026?",
        answer: "Thursday 10 December (US time), live from the Peacock Theater in Los Angeles, per VGC. Fan ballots must be finalised before 9pm ET on 9 December, which is 12:00 pm AEST on 10 December.",
      },
    ],
  },
  {
    slug: "gta-6-nbn-australia-traffic-record",
    title: "GTA 6 Breaks Australia's NBN Record",
    description:
      "GTA 6's launch pushed Australia's NBN to a record 36.54Tbps, says NBN Co. The numbers, what the big telcos saw, and download times by NBN plan.",
    crumb: "NBN record",
    teaser: "36.54Tbps on launch night, beating a record set a week earlier. NBN Co's numbers, what the telcos saw, and download times by plan.",
    tag: "Launch night",
    category: "launch",
    keywords: ["GTA 6 NBN record", "GTA 6 Australia download", "NBN traffic record", "GTA 6 download time NBN", "GTA 6 Telstra Optus TPG", "did GTA 6 break the internet"],
    published: NBN_RECORD_PUBLISHED,
    updated: NBN_RECORD_PUBLISHED,
    citations: [
      "https://www.techradar.com/computing/wi-fi-broadband/no-gta-6-didnt-break-the-australian-internet-but-it-sure-did-break-records",
      "https://www.gadgetguy.com.au/gta-6-breaks-two-australian-nbn-internet-records-in-one-week/",
      "https://www.whistleout.com.au/Broadband/News/Grand-Theft-Auto-6-NBN-download-record",
    ],
    faq: [
      {
        question: "Did GTA 6 break the NBN record?",
        answer: "Yes. TechRadar, GadgetGuy and WhistleOut all report that NBN Co says its network peaked at 36.54Tbps overnight heading into 19 November as GTA 6 launched, the most data it has moved in a single second. TechRadar and GadgetGuy give the previous record as 33.19Tbps, set about a week earlier.",
      },
      {
        question: "Did GTA 6 crash the internet in Australia?",
        answer: "We did not see TechRadar, GadgetGuy or WhistleOut report an NBN outage. WhistleOut says NBN Co put the launch-night peak about 20% above baseline, and TechRadar's headline says GTA 6 didn't break the Australian internet.",
      },
      {
        question: "How long does GTA 6 take to download on the NBN?",
        answer: "WhistleOut estimates almost two full days on NBN 12, just under five hours on NBN 100 and under an hour on NBN 500, assuming you max out your connection the whole time. Our own maths for the 212GB PS5 download gives about 39 hours, 4.7 hours and 56 minutes at full plan speed.",
      },
    ],
  },
  {
    slug: "gta-6-internet-traffic-record-de-cix",
    title: "GTA 6 Launch: DE-CIX Traffic Record Explained",
    description:
      "DE-CIX says its exchanges hit a record 33.03Tbps around GTA 6's launch. What was measured, when, and why it is not a reading of the whole internet.",
    crumb: "DE-CIX record",
    teaser: "33.03Tbps across DE-CIX's exchanges on launch eve, 0.02Tbps above its pre-download record. What it measured and what it doesn't.",
    tag: "Launch night",
    category: "launch",
    keywords: ["GTA 6 internet record", "GTA 6 DE-CIX", "GTA 6 internet traffic", "did GTA 6 break the internet", "GTA 6 download traffic", "33 Tbps"],
    published: DECIX_RECORD_PUBLISHED,
    updated: DECIX_RECORD_PUBLISHED,
    citations: [
      "https://www.de-cix.net/en/about-de-cix/media/press-releases/gta-vi-global-data-traffic-hits-record-breaking-high",
      "https://variety.com/2026/gaming/news/gta-6-launch-livestream-internet-traffic-records-1236953145/",
    ],
    faq: [
      {
        question: "Did the GTA 6 launch set an internet traffic record?",
        answer: "At DE-CIX, yes. The internet exchange operator says traffic across its exchanges worldwide hit a record 33.03 terabits per second at 20:20 CET on 18 November around the GTA 6 launch, just above the 33.01Tbps it recorded when pre-downloads began on 10 November. It does not say how much of the traffic was GTA 6.",
      },
      {
        question: "Did GTA 6 break the whole internet?",
        answer: "No. The 33.03Tbps record is the combined traffic across DE-CIX's own internet exchanges, not a total for all internet use, and the DE-CIX release does not report an outage. Australia's NBN reported a separate record of its own on launch night.",
      },
      {
        question: "What is DE-CIX?",
        answer: "DE-CIX runs internet exchanges, hubs where content providers and network operators swap traffic directly. Its Frankfurt exchange, which it calls Europe's largest, has more than 1,100 connected networks, and its release lists peaks at exchanges in cities including Dallas, New York, Madrid, Dubai and Singapore.",
      },
    ],
  },
  {
    slug: "gta-6-gta-plus-story-perks",
    title: "GTA 6 GTA+ Perks: What You Get",
    description:
      "GTA+ adds a free Elegy, a Crosstown garage, transit perks and 10% shop discounts to GTA 6 story mode, only while subscribed. Price, free month, opt-out.",
    crumb: "GTA+ perks",
    teaser: "A free Elegy and garage, transit perks and 10% discounts, but only while you pay $7.99 a month. What you get, and the backlash.",
    tag: "Explainer",
    category: "launch",
    keywords: ["GTA 6 GTA+", "GTA+ benefits GTA 6", "GTA 6 subscription", "GTA 6 Elegy", "GTA Plus story mode", "GTA 6 GTA+ price", "turn off GTA+ boosts"],
    published: GTA_PLUS_PUBLISHED,
    updated: GTA_PLUS_PUBLISHED,
    citations: [
      "https://www.ign.com/articles/gta-6-how-microtransactions-and-gta-benefits-work",
      "https://www.gamespot.com/articles/gta-6-gta-subscription-includes-a-free-supercar-discounts-and-more/",
      "https://www.polygon.com/gta-6-plus-membership-benefits-exclusive-car-garage/",
    ],
    faq: [
      {
        question: "What does GTA+ give you in GTA 6?",
        answer: "A free '90 Annis Venturas BLVD Elegy and a single-car Crosstown garage with a weapon locker and stolen-item fencing, transit perks (Scooter Bros Premium, RydeMe premium, free scooter, bike and Seashark rentals, free public transport), 10% off at select shops and 10% more when selling eligible owned vehicles, per IGN, GameSpot and Polygon.",
      },
      {
        question: "Do you keep GTA+ perks if you cancel?",
        answer: "No. GameSpot says the perks are only available while you are subscribed, and Polygon says cancelling means losing the car and garage along with the other perks.",
      },
      {
        question: "How much is GTA+?",
        answer: "Polygon puts it at $7.99 a month in the US (GameSpot rounds to $8), and IGN gives $7.99 or £6.99. IGN, GameSpot and Polygon all say pre-orders came with a free month, which IGN says must be redeemed before 31 March 2027 and then renews automatically unless cancelled.",
      },
      {
        question: "Can you turn GTA+ boosts off in GTA 6?",
        answer: "Yes. Polygon says to open the pause menu, go to the Account tab, find GTA Plus Boosts and switch it off. IGN also says the benefits can be switched off in the settings menu.",
      },
    ],
  },
  {
    slug: "gta-6-age-rating",
    title: "GTA 6 Age Rating: ESRB, ACB, USK & More",
    description:
      "GTA 6 is rated M 17+ by the ESRB, R 18+ in Australia and R18 in New Zealand, with no youth release from USK. Official ratings and content descriptors.",
    crumb: "Age rating",
    teaser: "ESRB M 17+, Australia R 18+, New Zealand R18 and USK no youth release. What each board lists, and where we found no entry.",
    tag: "Explainer",
    category: "launch",
    keywords: ["GTA 6 age rating", "GTA 6 ESRB", "GTA 6 PEGI", "GTA 6 R18+", "GTA 6 USK", "GTA 6 rating Australia", "is GTA 6 for kids"],
    published: AGE_RATING_PUBLISHED,
    updated: AGE_RATING_PUBLISHED,
    citations: [
      "https://www.esrb.org/ratings/41627/grand-theft-auto-vi/",
      "https://www.classification.gov.au/titles/grand-theft-auto-vi-12",
      "https://www.classificationoffice.govt.nz/find-a-rating/quick-takes/grand-theft-auto-vi/",
      "https://usk.de/?s=Grand+Theft+Auto+VI",
      "https://pegi.info/search-pegi?q=Grand+Theft+Auto+VI",
      "https://www.cero.biz/search/",
    ],
    faq: [
      {
        question: "What is GTA 6's age rating?",
        answer: "The ESRB rates it M for Mature 17+. Australia's Classification Board lists R 18+, New Zealand's Classification Office lists it as R18, and Germany's USK lists no youth release (keine Jugendfreigabe).",
      },
      {
        question: "Is GTA 6 rated PEGI 18?",
        answer: "We cannot confirm it. A search of pegi.info for Grand Theft Auto VI returned no results when we checked at 11:46 AEST on 19 Nov, so we are not quoting a PEGI rating. We will update this page if PEGI lists the game.",
      },
      {
        question: "Why is GTA 6 rated M or R 18+?",
        answer: "The ESRB lists blood and gore, intense violence, mature humor, nudity, strong language, strong sexual content and use of drugs and alcohol. Australia's advice is high impact violence, sex scenes and drug use. USK cites drastic violence, drugs and criminal role models.",
      },
      {
        question: "Is GTA 6 suitable for children?",
        answer: "No official board we could open gives it a rating below 17. The ESRB says Mature 17+, and the Australian, New Zealand and German entries are all 18 and over (R 18+, R18 and no youth release).",
      },
      {
        question: "Does GTA 6 have in-game purchases?",
        answer: "The ESRB listing carries an In-Game Purchases label, and USK lists In-Game-Käufe (in-game purchases) as a usage note.",
      },
    ],
  },
  {
    slug: "gta-6-live-new-zealand-launch-report",
    title: "GTA 6 Is Live in New Zealand: Launch Report",
    description:
      "GTA 6 unlocked in New Zealand at 11:00 UTC on 18 Nov. What is confirmed, who unlocked next, what we could not verify, and how to dodge spoilers.",
    crumb: "Live in New Zealand",
    teaser: "New Zealand unlocked first at 11:00 UTC. What is confirmed, who came next, and what we could not verify.",
    tag: "Launch night",
    pinned: true,
    keywords: ["GTA 6", "New Zealand", "launch", "unlock time", "Leonida", "Vice City", "spoilers"],
    published: NEWS_PUBLISHED,
    updated: UPDATES_1600_AT,
    citations: [
      "https://www.bbc.com/news/live/c60rkg21dl22t",
      "https://www.aa.com.tr/en/science-technology/gta-vi-global-rollout-begins-with-new-zealand-launch/4129238",
      "https://www.vice.com/en/article/gta-6-us-canada-launch-ps5-download-size-game-sharing/",
      "https://www.polygon.com/gta-6-out-now-spoiler-warning-new-zealand-release/",
      "https://www.vice.com/en/article/gta-6-new-zealand-worldwide-release-times/",
      "https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/",
      "https://www.1news.co.nz/2026/11/18/gta-6-how-to-beat-the-download-rush-and-why-gamers-abroad-envy-kiwis/",
    ],
  },
  {
    slug: "gta-6-sales-17-million-sensor-tower",
    title: "GTA 6 Sales: 24.6M Copies Estimated",
    description:
      "Sensor Tower now estimates GTA 6 at 24.58M units and $2.36B, GameSpot reports, 75% on PS5. GameSpot says Take-Two will share official data soon.",
    crumb: "Sales estimate",
    teaser: "Sensor Tower's latest estimate puts GTA 6 at 24.58 million copies and $2.36B on day one. GameSpot reports Take-Two will share official figures soon.",
    tag: "Sales",
    keywords: ["GTA 6 sales", "GTA 6 24 million", "GTA 6 19 million", "GTA 6 copies sold", "GTA 6 Sensor Tower", "GTA 6 pre-orders", "Take-Two shares GTA 6", "GTA 6 record"],
    published: SALES_PUBLISHED,
    updated: SALES_UPDATED_1100_AT,
    citations: [
      "https://deadline.com/2026/11/gta-6-sales-launch-day-surge-videogame-1237229514/",
      "https://www.gamespot.com/articles/gta-6-has-sold-almost-8-million-copies-so-far-and-ps5-is-dominating-the-split-of-course/",
      "https://gamingbolt.com/grand-theft-auto-6-nears-20-million-units-sold-and-2-billion-revenue-per-analyst-firm",
      "https://www.investing.com/news/stock-market-news/gamers-get-ready-to-enter-vice-city-as-grand-theft-auto-vi-begins-globalrollout-5035485",
      "https://www.cnbc.com/2026/11/18/gta-vi-publisher-take-two-jumps-as-gamers-relish-blockbuster-release.html",
      "https://sensortower.com/blog/gta-vi-breaks-record-greater-than-1b-pre-order-or-sensor-tower-report",
      "https://sensortower.com/grand-theft-auto-VI/sales-tracker",
      "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/take-two-interactive-software-inc-reports-results-fiscal-4/",
    ],
    faq: [
      {
        question: "How many copies has GTA 6 sold?",
        answer: "There is no official figure yet. Sensor Tower's latest estimate, reported by GameSpot at 4:19 p.m. PST on 19 Nov (10:19 AEST, 20 Nov), is 24.58 million units via pre-purchases and launch-day sales, about $2.36 billion in gross revenue: 18.44 million on PS5 and 6.15 million on Xbox Series X|S. Deadline gives 24.59 million units and cites Sensor Tower for the $2.36 billion. The previous estimate was 19.05 million units and about $1.84 billion. Before that, Reuters and CNBC reported over 17 million copies for more than $1.65 billion.",
      },
      {
        question: "Has Rockstar or Take-Two announced GTA 6 sales?",
        answer: "Not in anything we found as of 11:05 AEST on 20 Nov. GameSpot reports that Take-Two CEO Strauss Zelnick said on TBPN on 19 Nov (US time) that the company will share official GTA 6 sales data soon. Take-Two's last official written word, on 9 Nov, was that pre-orders were continuing to reach unprecedented levels.",
      },
    ],
  },
  {
    slug: "gta-6-festival-set-times-heat-night",
    title: "GTA 6 Festival Set Times and Heat Night",
    description:
      "GTA VI: The Festival set times for 21 Nov in Miami, in Brisbane time, plus the result of the Heat's Vice City night. Tickets, charities, no livestream yet.",
    crumb: "Festival set times",
    teaser: "Travis Scott closes Rockstar's Miami launch festival. Every set in Miami and Brisbane time, plus the Heat's Vice City night.",
    tag: "Launch events",
    keywords: ["GTA 6 festival", "GTA VI The Festival set times", "Travis Scott GTA 6", "Mana Wynwood", "A Night in Vice City", "Miami Heat GTA 6"],
    published: FESTIVAL_PUBLISHED,
    updated: UPDATES_1300_AT,
    citations: [
      "https://x.com/RockstarGames/status/2123068976045453338",
      "https://x.com/RockstarGames/status/2123069155775541350",
      "https://x.com/RockstarGames/status/2123098923434713278",
      "https://www.rockstargames.com/VI/gtavi-thefestival",
      "https://gtavi-thefestival.miami",
      "https://www.complex.com/music/a/tracewilliamcowen/gta-6-festival-set-times-charities",
      "https://www.espn.com/nba/story/_/id/50085674/miami-heat-night-vice-city-game",
      "https://www.nba.com/heat/game/0022600260-bucks-vs-heat-miami-fl-11-18-2026",
      "https://www.espn.com/nba/game/_/gameId/401910009",
      "https://www.nba.com/news/heat-unveil-vice-city-court",
    ],
    faq: [
      {
        question: "When is GTA VI: The Festival?",
        answer: "Saturday 21 November 2026 at Mana Wynwood in Miami, with doors at 4:00pm Miami time. That is 07:00 AEST on Sunday 22 November in Brisbane.",
      },
      {
        question: "What time is Travis Scott at the GTA 6 festival?",
        answer: "Rockstar's schedule lists Cactus Jack presents Travis Scott, Don Toliver, Kodak Black and Sofaygo from 12:40am to 2:00am Miami time, which is 15:40 to 17:00 AEST on Sunday 22 November by our conversion.",
      },
      {
        question: "Is the GTA 6 festival being livestreamed?",
        answer: "We have not found a livestream or broadcast announced by Rockstar or on the festival and DICE pages, as of 13:00 AEST on 19 November.",
      },
    ],
  },
  {
    slug: "gta-6-reviews-metacritic-99",
    title: "GTA 6 Reviews: Metacritic 99 Ties the Record",
    description:
      "GTA 6 reviews are live. Metacritic opened at 99, tying Ocarina of Time. Named scores, the performance notes critics flag, and no spoilers.",
    crumb: "GTA 6 reviews",
    teaser: "Metacritic opened at 99, level with Ocarina of Time. Scores, performance notes and what is still unconfirmed.",
    tag: "Reviews",
    live: true,
    keywords: ["GTA 6 reviews", "Metacritic", "GTA 6 score", "Ocarina of Time", "performance", "PS5 Pro"],
    published: NEWS_PUBLISHED,
    updated: UPDATES_0800_AT,
    citations: [
      "https://www.bbc.com/news/live/c60rkg21dl22t",
      "https://insider-gaming.com/gta-6-gets-a-99-in-early-metacritic-review-scores/",
      "https://www.gamingbible.com/news/gta-6-review-round-up-highest-rated-game-all-time-916887-20261118",
      "https://www.aa.com.tr/en/science-technology/gta-vi-global-rollout-begins-with-new-zealand-launch/4129238",
      "https://www.metacritic.com/game/grand-theft-auto-vi/",
      "https://www.polygon.com/gta-6-review-roundup/",
      "https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best",
      "https://www.ign.com/articles/gta-6-xbox-series-s-performance",
      "https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation",
    ],
  },
  {
    slug: "gta-6-ps5-update-patches-servers",
    title: "GTA 6 Server Status & Known Issues",
    description:
      "Live GTA 6 server status with sources and times, known launch issues, the mandatory PS5 system update, and pre-launch patches. Updated through launch week.",
    crumb: "Server status and known issues",
    teaser: "Live status readings, known issues, the PS5 system update and the two pre-launch patches.",
    tag: "Live tracker",
    live: true,
    keywords: ["GTA 6 server status", "is GTA 6 down", "GTA 6 known issues", "GTA 6 PS5 update", "GTA 6 patch", "01.002.001"],
    published: NEWS_PUBLISHED,
    updated: UPDATES_1900_AT,
    citations: [
      "https://x.com/PS_Support_US/status/2122863683881619685",
      "https://www.pushsquare.com/news/2026/11/gta-6-requires-new-ps5-firmware-update-to-play",
      "https://www.polygon.com/gta-6-grand-theft-auto-playstation-mandatory-ps5-update/",
      "https://www.theverge.com/games/1036395/if-you-want-to-play-gta-vi-on-ps5-tonight-download-yesterdays-firmware-update-first",
      "https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/",
      "https://insider-gaming.com/is-grand-theft-auto-6-down-gta-6-issues-explained/",
      "https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best",
      "https://status.playstation.com/",
      "https://support.rockstargames.com/servicestatus",
      "https://gtatracker.gg/online/server-status",
      "https://downdetector.co.nz/status/gta-vi/",
      "https://www.playstation.com/en-us/support/games/gta-vi-support/",
      "https://www.polygon.com/gta-6-grand-theft-auto-no-code-physical-edition/",
      "https://www.news.com.au/technology/gaming/gta-6-release-australia-launch-times-download-size-and-why-its-a-bad-time-to-be-a-boss/news-story/eeb2f0ed1d624c365f65e50b92c974cf",
      "https://www.1news.co.nz/2026/11/18/gta-6-how-to-beat-the-download-rush-and-why-gamers-abroad-envy-kiwis/",
      "https://downdetector.com.au/status/gta-vi/",
      "https://downdetector.com.au/status/playstation-network/",
      "https://www.axios.com/2026/11/18/gta-6-playstation-psn-servers",
      "https://www.theguardian.com/games/2026/nov/18/playstation-down-grand-theft-auto-vi-game-release",
      "https://www.androidauthority.com/playstation-outage-nov-2026-3736853/",
      "https://www.polygon.com/gta-6-is-psn-down-detector-account-services-busy-server-connection-error/",
      "https://www.gamesradar.com/games/grand-theft-auto/ps5-users-report-playstation-network-errors-as-gta-6-fever-hits-with-some-struggling-to-redeem-codes/",
      "https://downdetector.co.uk/status/gta-vi/",
      "https://allestoerungen.de/stoerung/gta-vi/",
      "https://downdetector.com/status/gta-vi/",
      "https://downdetector.com/status/playstation-network/",
      "https://downdetector.com/status/xbox-live/",
      "https://support.xbox.com/en-US/xbox-live-status",
      "https://www.vice.com/en/article/gta-6-us-canada-launch-ps5-download-size-game-sharing/",
      "https://www.bbc.com/news/live/c60rkg21dl22t",
      "https://www.standard.co.uk/news/tech/travis-scott-sony-miami-currys-grand-theft-auto-b1305482.html",
      "https://www.3djuegos.com/ps4/noticias/playstation-network-psn-se-ha-caido-espana-para-algunos-jugadores-estreno-gta-6-ha-saturado-servidores-ps5-momentos",
      "https://sea.mashable.com/games/56995/is-playstation-down-some-gamers-report-problems-with-playstation-servers-amid-gta-6-launch",
    ],
    faq: [
      {
        question: "Is GTA 6 down?",
        answer: "At 18:58-19:05 AEST on 19 Nov, about four hours after the US and Canada unlocked at 15:00 AEST, PlayStation's status feed listed no active issues for the US, Canada, Mexico, Brazil, the UK, Ireland, France, Germany, Italy, Spain, Australia, New Zealand or Japan, and Microsoft's Xbox status feed showed no incidents. Rockstar's own service status page showed all services operational, with no GTA VI entry. Shortly after the US unlock, Mashable reports Sony's status page flagged a Gaming and Social issue at 12:33 a.m. ET (15:33 AEST); it had cleared by our 16:00 AEST reading. Downdetector user reports headlined \"problems\" for PlayStation Network in the US and \"possible problems\" for PlayStation Network in Australia and for Xbox network in the US (mostly server connection, downloads and login), which the platforms' own feeds did not reflect, so that severity is disputed. For GTA VI itself, Downdetector showed no current problems in the US and New Zealand, and \"possible problems\" in the UK, Germany and Australia. User reports are not confirmed outages.",
      },
      {
        question: "Was PSN down before GTA 6 launched?",
        answer: "Yes, briefly. On 18 Nov (US afternoon) Sony's status page warned of difficulty launching games, apps or network features. Axios says the page showed all issues resolved by 2:30pm ET (05:30 AEST, 19 Nov), while Android Authority says the page showed all services operational at 3:05pm ET (06:05 AEST). Sony has not given a cause in anything we read, and outlets differ on how serious it was.",
      },
    ],
  },
  {
    slug: "gta-6-release-countdown",
    title: "GTA 6 Release Time by Region",
    description:
      "GTA 6 unlocked at midnight local time on 19 Nov 2026. Unlock times by region in local, UTC and Brisbane time, what is unconfirmed, and spoiler tips.",
    crumb: "Release time by region",
    teaser: "Midnight local time, region by region, in local, UTC and Brisbane time.",
    tag: "Countdown",
    live: false,
    keywords: ["GTA 6 release time", "GTA 6 unlock time", "GTA 6 countdown", "midnight launch", "Brisbane"],
    published: NEWS_PUBLISHED,
    updated: UPDATES_1600_AT,
    citations: [
      "https://www.rockstargames.com/VI",
      "https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/",
      "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/",
      "https://kotaku.com/gta-6-pre-load-times-install-size-and-global-release-times-confirmed-2000752787",
      "https://www.digitalfoundry.net/news/2026/11/rockstar-officially-confirms-gta-6-regional-release-times-and-theyre-not-what-we-thought",
      "https://www.vice.com/en/article/gta-6-new-zealand-worldwide-release-times/",
      "https://www.vice.com/en/article/gta-6-us-canada-launch-ps5-download-size-game-sharing/",
    ],
  },
  {
    slug: "gta-6-confirmed-so-far",
    title: "GTA 6 Confirmed: Date, Price, Platforms",
    description:
      "What Rockstar, Take-Two, Sony and Microsoft have confirmed about GTA 6: release date, platforms, price, preload size and the map, plus what is not.",
    crumb: "What is confirmed",
    teaser: "The short list of facts stated on the record, with a clear list of what is not confirmed.",
    tag: "Explainer",
    keywords: ["GTA 6 confirmed", "GTA 6 release date", "GTA 6 price", "GTA 6 platforms", "GTA 6 PC"],
    published: NEWS_PUBLISHED,
    updated: UPDATES_1600_AT,
    citations: [
      "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/",
      "https://www.rockstargames.com/VI",
      "https://www.playstation.com/en-us/games/grand-theft-auto-vi/",
      "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/",
      "https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games",
      "https://www.usatoday.com/story/tech/gaming/2026/11/09/gta-6-preload-consoles-release-date-file-size/92640419007/",
      "https://www.vice.com/en/article/gta-6-us-canada-launch-ps5-download-size-game-sharing/",
    ],
  },
  {
    slug: "gta-6-preload-editions-pricing",
    title: "GTA 6 Preload, Editions & Price",
    description:
      "Buying GTA 6 now it is out: how much space you need (212GB PS5, about 225GB Xbox), how to install, and what Standard ($79.99) and Ultimate ($99.99) include.",
    crumb: "Preload and editions",
    teaser: "GTA 6 is out. 212GB, how to install on PS5 and Xbox, and what Standard and Ultimate include.",
    tag: "Guide",
    keywords: ["GTA 6 preload", "GTA 6 file size", "GTA 6 editions", "GTA 6 Ultimate Edition", "GTA 6 price"],
    published: NEWS_PUBLISHED,
    updated: UPDATES_1100_AT,
    citations: [
      "https://www.rockstargames.com/VI/pre-load-now",
      "https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9P3H4968GRSM",
      "https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games",
      "https://www.playstation.com/en-us/games/grand-theft-auto-vi/",
      "https://www.xbox.com/en-US/games/store/grand-theft-auto-vi-ultimate-edition-upgrade/9pn4llbr8rch",
      "https://www.engadget.com/2311841/gta-6-now-available-for-preload/",
      "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/",
    ],
  },
  {
    slug: "n3on-new-zealand-gta-6-stream",
    title: "N3ON's New Zealand GTA 6 Stream",
    description:
      "N3ON travelled to New Zealand to play GTA 6 at the first unlock, outlets report. What they say, tracker viewer numbers, and an unverified ban rumour.",
    crumb: "N3ON's New Zealand stream",
    teaser: "N3ON travelled to New Zealand for the first unlock, outlets report. What they say, plus tracker numbers.",
    tag: "Streamers",
    keywords: ["N3ON GTA 6", "N3ON New Zealand", "GTA 6 stream", "Kick", "StreamStats"],
    published: STREAMERS_PUBLISHED,
    updated: UPDATES_1100_AT,
    citations: [
      "https://sports.ndtv.com/us/us-streamers/n3on-announces-gta-6-livestream-from-new-zealand-at-6-am-est-flies-across-the-world-for-early-gta-6-access-12343208",
      "https://www.moneycontrol.com/technology/gta-6-launched-in-new-zealand-american-gamer-and-streamer-n3on-travelled-there-to-play-it-hours-before-rest-of-the-world-article-14083594.html",
      "https://streamstats.io/channels/n3on?platform=kick",
    ],
  },
  {
    slug: "gta-6-streaming-viewership-peak",
    title: "GTA 6 Streams Peak at 7.9M Viewers",
    description:
      "Streams Charts says GTA 6 launch streams peaked at 7.91 million viewers, with 125 million hours watched on day one. Platform peaks, records and caveats.",
    crumb: "Streaming viewership",
    teaser: "Streams Charts puts the day-one peak at 7.91 million viewers and 125 million hours watched. Platform peaks, top streamers and caveats.",
    tag: "Streamers",
    keywords: ["GTA 6 viewers", "GTA 6 Twitch record", "GTA 6 Kick", "GTA 6 YouTube", "streaming record", "GTA 6 Streams Charts", "most watched game launch"],
    published: STREAMERS_PUBLISHED,
    updated: UPDATES_0500_AT,
    citations: [
      "https://streamscharts.com/news/gta-6-day1-recap",
      "https://x.com/StreamsCharts/status/2123408702220992617",
      "https://x.com/StreamsCharts/status/2123452504167833655",
      "https://variety.com/2026/gaming/news/gta-6-launch-livestream-internet-traffic-records-1236953145/",
      "https://www.bbc.com/news/live/c60rkg21dl22t",
      "https://nextcounts.com/games/grand-theft-auto-vi",
      "https://luciastream.com/press/",
    ],
    faq: [
      {
        question: "How many people watched GTA 6 streams at launch?",
        answer: "Analytics firm Streams Charts says GTA 6 peaked at 7.91 million concurrent viewers across livestreaming platforms in its first 24 hours, with 125.47 million hours watched. Other trackers recorded lower combined peaks: NextCounts 7.4 million and luciastream 6.4 million. These are third-party tracker figures, not official platform numbers.",
      },
      {
        question: "Did GTA 6 break the Twitch record?",
        answer: "Streams Charts says GTA 6 is now the most popular game ever on Twitch and Kick, with a Twitch peak of 3.31 million per Variety. Twitch told Variety that GTA 6 streams beat Valorant's 2020 record of 1.7 million concurrent viewers within six hours of the New Zealand unlock.",
      },
    ],
  },
  {
    slug: "gta-6-launch-streams-schedule",
    title: "GTA 6 Launch Streams: Who Goes Live",
    description:
      "Kai Cenat and IShowSpeed went live hours before their posted times. YouTube's 24-hour GTA 6 stream starts 15:00 AEST. Times in ET and Brisbane.",
    crumb: "Launch streams",
    teaser: "Kai Cenat and IShowSpeed are already live. YouTube's 24-hour stream starts midnight ET, 15:00 AEST.",
    tag: "Streamers",
    keywords: ["GTA 6 streams", "Kai Cenat GTA 6", "IShowSpeed GTA 6", "GTA 6 YouTube stream", "launch schedule"],
    published: STREAMERS_PUBLISHED,
    updated: UPDATES_1300_AT,
    citations: [
      "https://x.com/KaiCenat/status/2122427634743214114",
      "https://x.com/ishowspeedsui/status/2122463228987129932",
      "https://www.sportskeeda.com/us/streamers/news-kai-cenat-s-gta-6-marathon-livestream-date-time-livestream-link",
      "https://www.techtimes.com/articles/330968/20261117/ishowspeed-gta-6-stream-starts-3-hours-before-us-unlock-plans-10-12-hour-days-no-marathon.htm",
      "https://www.twitch.tv/kaicenat",
      "https://www.twitch.tv/ishowspeed",
      "https://tekno.kompas.com/read/2026/11/19/09050067/windah-basudara-jadi-streamer-gta-6-paling-banyak-ditonton-lampaui-ishowspeed",
      "https://blog.youtube/news-and-events/youtube-rockstar-games-gta-vi-launch/",
    ],
  },
  {
    slug: "streamers-new-zealand-trick-warnings",
    title: "Streamers and the NZ Trick: Ban Risk",
    description:
      "One German streamer says Twitch warned him about the New Zealand trick. What Twitch, Xbox and PlayStation sources say, and what is still unconfirmed.",
    crumb: "Streamers and the NZ trick",
    teaser: "One streamer says Twitch warned him about the New Zealand trick. What is reported, and what is not confirmed.",
    tag: "Streamers",
    keywords: ["New Zealand trick", "GTA 6 ban", "Twitch suspension", "Xbox region", "PSN suspension"],
    published: STREAMERS_PUBLISHED,
    updated: STREAMERS_PUBLISHED,
    citations: [
      "https://www.notebookcheck.net/Streamer-faces-ban-for-using-GTA-6-early-unlock-time-trick-on-release-date.1451653.0.html",
      "https://cybernews.com/news/new-zealand-method-gta6-twitch-account-ban/",
      "https://www.purexbox.com/news/2026/11/xbox-fans-urge-caution-over-new-zealand-trick-for-gta-6-while-others-say-its-a-non-issue",
      "https://www.bbc.com/news/live/c60rkg21dl22t",
      "https://www.rnz.co.nz/life/screens/games/the-grand-theft-auto-kiwi-hack-the-world-is-talking-about",
      "https://en.3dmgame.com/news/10688",
    ],
  },
  {
    slug: "gta-6-performance-ps5-pro-xbox",
    title: "GTA 6 Performance: PS5, PS5 Pro & Xbox",
    description:
      "GTA 6 runs at 30fps on every console with no performance mode. What PS5 Pro gets, Series S and X resolution, and what Digital Foundry and IGN measured.",
    crumb: "Performance by console",
    teaser: "30fps everywhere, no performance mode. PS5 Pro adds PSSR and ray-traced shadows. Resolutions and Digital Foundry test results.",
    tag: "Performance",
    keywords: ["GTA 6 performance", "GTA 6 60fps", "GTA 6 PS5 Pro", "GTA 6 Xbox Series X", "GTA 6 Series S", "GTA 6 graphics modes"],
    published: GAPS_PUBLISHED,
    updated: UPDATES_AT,
    citations: [
      "https://gameinformer.com/2026/11/10/grand-theft-auto-vi-will-run-at-30-fps-on-all-consoles-but-ps5-pro-will-feature-improved",
      "https://www.playstation.com/en-us/games/grand-theft-auto-vi/",
      "https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/",
      "https://wccftech.com/grand-theft-auto-vi-amd-fsr-4-xbox-series-s-ray-tracing/",
      "https://www.techradar.com/gaming/why-no-40fps-mode-for-gta-6-rockstar-says-the-complexity-of-simulating-and-rendering-our-world-requires-it-to-carefully-balance-how-we-spend-every-millisecond-of-both-the-central-processor-and-the-graphics-processor",
      "https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best",
      "https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation",
      "https://www.ign.com/articles/gta-6-xbox-series-s-performance",
      "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/",
    ],
    faq: [
      {
        question: "Does GTA 6 have a 60fps mode?",
        answer: "No. Rockstar says GTA 6 targets 30fps on PS5, PS5 Pro, Xbox Series X and Xbox Series S, and no performance or balanced mode has been announced.",
      },
      {
        question: "Is GTA 6 better on PS5 Pro?",
        answer: "In image quality, yes. Rockstar lists PSSR upscaling and ray-traced shadows as PS5 Pro features. The frame-rate target is the same 30fps as every other console.",
      },
      {
        question: "Is GTA 6 better on PS5 or Xbox Series X?",
        answer: "Rockstar gives the same numbers for both: a 1440p base resolution upscaled to 4K at a 30fps target. Rockstar says the game plays best on PS5 and lists PS5-specific haptics, Tempest 3D Audio and faster loading. Digital Foundry's test found the same 1440p and 30fps target on both, with similar dips into the high 20s and mid-20s.",
      },
      {
        question: "How does GTA 6 run on Xbox Series S?",
        answer: "Rockstar says it renders at 720p and uses AMD FSR 4 to reach about 1080p. Digital Foundry found the loosest 30fps of any console, with large parts of the game in the mid to high 20s and drops to around 20fps or lower in heavy scenes. IGN's look at only the opening section found mostly 30fps with a couple of drops to 24fps.",
      },
    ],
  },
  {
    slug: "gta-6-pc-release-status",
    title: "Is GTA 6 Coming to PC? Latest Status",
    description:
      "GTA 6 is PS5 and Xbox Series X|S only. What Rockstar and Take-Two have said about a PC version, past port gaps, and which PC rumours are unconfirmed.",
    crumb: "GTA 6 on PC",
    teaser: "No PC version announced. What is official, the GTA V and RDR2 port gaps, and which PC dates are only rumours.",
    tag: "Platforms",
    keywords: ["GTA 6 PC", "GTA 6 PC release date", "is GTA 6 on PC", "GTA 6 Steam", "GTA 6 system requirements"],
    published: GAPS_PUBLISHED,
    updated: GAPS_PUBLISHED,
    citations: [
      "https://www.rockstargames.com/VI",
      "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/",
      "https://www.polygon.com/gta-6-pc-release-date-cloud-streaming-rockstar-news-xbox-mods/",
      "https://gamerant.com/gta-6-online-take-two-statement-release-beyond/",
      "https://www.pcgamer.com/games/grand-theft-auto/the-experiences-on-console-and-pc-tend-to-be-roughly-the-same-says-take-two-ceo-in-response-to-question-about-gta-roleplaying/",
      "https://tech.yahoo.com/gaming/articles/gta-6-pc-release-date-150338948.html",
      "https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/",
    ],
    faq: [
      {
        question: "Is GTA 6 on PC?",
        answer: "No. It is not on sale for PC, and Rockstar has not announced a PC version.",
      },
      {
        question: "Can I stream GTA 6 to a PC?",
        answer: "Not through anything Rockstar or Xbox has announced. The Xbox Cloud Gaming launch names Xbox consoles only.",
      },
      {
        question: "Is there a GTA 6 PC release date?",
        answer: "No. The only timelines in circulation are unnamed-source reports, which we treat as rumour.",
      },
      {
        question: "How long did GTA V and Red Dead Redemption 2 take to reach PC?",
        answer: "Per Yahoo Tech, GTA V took about 19 months (September 2013 to April 2015) and Red Dead Redemption 2 just over a year (October 2018 to November 2019). Neither sets a date for GTA 6.",
      },
    ],
  },
  {
    slug: "gta-6-online-release-date",
    title: "GTA 6 Online: Release Date & What We Know",
    description:
      "GTA 6 launches single-player with no online mode announced. What Take-Two has said, where the 2027 talk comes from, and which leaks are unconfirmed.",
    crumb: "GTA 6 Online",
    teaser: "No GTA 6 Online date. Launch is single-player, GTA Online continues, and the 2027 talk is a partner's expectation.",
    tag: "Online",
    keywords: ["GTA 6 Online", "GTA 6 Online release date", "GTA 6 multiplayer", "GTA Online after GTA 6", "GTA 6 2027"],
    published: GAPS_PUBLISHED,
    updated: GAPS_PUBLISHED,
    citations: [
      "https://www.playstation.com/en-us/games/grand-theft-auto-vi/",
      "https://gamerant.com/gta-6-online-take-two-statement-release-beyond/",
      "https://www.vice.com/en/article/gta-6-online-release-date/",
      "https://www.theverge.com/games/997116/twitch-ceo-gta-vi-multiplayer-is-coming-in-2027",
      "https://www.pcgamer.com/games/grand-theft-auto/the-experiences-on-console-and-pc-tend-to-be-roughly-the-same-says-take-two-ceo-in-response-to-question-about-gta-roleplaying/",
      "https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/",
    ],
    faq: [
      {
        question: "Does GTA 6 have online multiplayer?",
        answer: "Not at launch. PlayStation lists it as a single-player experience, and no online mode has been announced.",
      },
      {
        question: "When is GTA 6 Online coming out?",
        answer: "There is no announced date or window. The 2027 timing is a partner's expectation, not Rockstar's.",
      },
      {
        question: "Is GTA Online ending?",
        answer: "No. Take-Two says it will keep supporting GTA Online after GTA 6 releases.",
      },
      {
        question: "Can I play GTA Online with friends on 19 November?",
        answer: "Yes, in the existing GTA Online in GTA V. GTA 6 itself is a single-player game at launch.",
      },
    ],
  },
  {
    slug: "gta-6-game-pass-ps-plus-cloud",
    title: "Is GTA 6 on Game Pass, PS Plus or Cloud?",
    description:
      "GTA 6 is a separate purchase, not on Game Pass or PS Plus lineups. How Xbox Cloud Gaming works on Xbox One and what is still unconfirmed.",
    crumb: "Game Pass, PS Plus, cloud",
    teaser: "A separate purchase. Xbox Cloud Gaming works once you own the game, including on Xbox One.",
    tag: "Platforms",
    keywords: ["GTA 6 Game Pass", "GTA 6 PS Plus", "GTA 6 Xbox Cloud Gaming", "GTA 6 Xbox One", "GTA 6 subscription"],
    published: GAPS_PUBLISHED,
    updated: GAPS_PUBLISHED,
    citations: [
      "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/",
      "https://blog.playstation.com/2026/11/10/playstation-plus-game-catalog-for-november-death-stranding-2-on-the-beach-like-a-dragon-pirate-yakuza-in-hawaii-atomfall-dragon-quest-iii-hd-2d-remake-and-more/",
      "https://www.playstation.com/en-us/games/grand-theft-auto-vi/",
      "https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/",
      "https://beebom.com/will-gta-6-be-on-xbox-game-pass/",
    ],
    faq: [
      {
        question: "Is GTA 6 free with Game Pass?",
        answer: "No. Xbox says Grand Theft Auto VI must be purchased separately.",
      },
      {
        question: "Is GTA 6 on PS Plus?",
        answer: "It is not in Sony's November PlayStation Plus Game Catalog announcement, and the PlayStation Store sells it as a standalone purchase.",
      },
      {
        question: "Can I play GTA 6 on Xbox One?",
        answer: "Only through Xbox Cloud Gaming, at Xbox Series S graphics settings. There is no native Xbox One version.",
      },
      {
        question: "Do I need a subscription to play GTA 6?",
        answer: "PlayStation's store page lists the game as one player with offline play enabled. Playing through Xbox Cloud Gaming needs cloud playtime, which Xbox says can be bought without a Game Pass subscription.",
      },
    ],
  },
  {
    slug: "gta-6-file-size-time-to-beat",
    title: "GTA 6 File Size and Time to Beat",
    description:
      "GTA 6 needs 212GB on PS5 and about 225GB on Xbox per the store listing. How long the story takes, side content, and 100%, per VGC and GameSpot.",
    crumb: "File size and length",
    teaser: "Clear 212GB on PS5, about 225GB on Xbox. About 60 to 65 hours for the story, 90 to 100 with side content, 200+ for everything.",
    tag: "Guide",
    keywords: ["GTA 6 file size", "GTA 6 storage", "how long to beat GTA 6", "GTA 6 length", "GTA 6 212GB", "GTA 6 Xbox file size"],
    published: GAPS_PUBLISHED,
    updated: UPDATES_AT,
    citations: [
      "https://www.playstation.com/en-us/games/grand-theft-auto-vi/",
      "https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9P3H4968GRSM",
      "https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games",
      "https://www.news.com.au/technology/gaming/gta-6-release-australia-launch-times-download-size-and-why-its-a-bad-time-to-be-a-boss/news-story/eeb2f0ed1d624c365f65e50b92c974cf",
      "https://www.videogameschronicle.com/guide/how-long-to-beat-grand-theft-auto-6/",
      "https://www.gamespot.com/articles/how-long-to-beat-gta-6/",
      "https://www.gamesradar.com/games/grand-theft-auto/how-long-is-gta-6-about-80-hours-according-to-one-rockstar-devs-playthrough/",
    ],
    faq: [
      {
        question: "How big is GTA 6?",
        answer: "Rockstar says the download needs up to 212GB depending on your device, and PlayStation asks for at least 212GB free on PS5. On Xbox, the Xbox Store listing carries a maximum install size of about 225GB (209.9GB in binary units). news.com.au reports about 234GB, which we could not match to any listing.",
      },
      {
        question: "How long is the GTA 6 story?",
        answer: "About 60 to 65 hours on main missions, per VGC and GameSpot.",
      },
      {
        question: "How long does it take to 100% GTA 6?",
        answer: "Both outlets estimate over 200 hours. Neither team has confirmed a full completion.",
      },
    ],
  },
];

export const newsBySlug = (slug: string) => NEWS.find((n) => n.slug === slug);
