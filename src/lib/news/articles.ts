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

/** 19 Nov 09:00 AEST batch (tracker refresh). PLACEHOLDER, Web Bot: set to the moment these edits go live. */
export const UPDATES_0900_AT = "2026-11-19T09:08:00+10:00";

/** Sales estimate piece. PLACEHOLDER, Web Bot: set to the moment it goes live. */
export const SALES_PUBLISHED = "2026-11-19T09:08:00+10:00";

export const newsPath = (slug: string) => `/news/${slug}`;

export const NEWS: NewsItem[] = [
  {
    slug: "gta-6-live-new-zealand-launch-report",
    title: "GTA 6 Is Live in New Zealand: Launch Report",
    description:
      "GTA 6 unlocked in New Zealand at 11:00 UTC on 18 Nov. What is confirmed, who unlocks next, what we could not verify, and how to dodge spoilers.",
    crumb: "Live in New Zealand",
    teaser: "New Zealand unlocked first at 11:00 UTC. What is confirmed, who is next, and what we could not verify.",
    tag: "Launch night",
    pinned: true,
    keywords: ["GTA 6", "New Zealand", "launch", "unlock time", "Leonida", "Vice City", "spoilers"],
    published: NEWS_PUBLISHED,
    updated: NEWS_PUBLISHED,
    citations: [
      "https://www.bbc.com/news/live/c60rkg21dl22t",
      "https://www.aa.com.tr/en/science-technology/gta-vi-global-rollout-begins-with-new-zealand-launch/4129238",
      "https://www.polygon.com/gta-6-out-now-spoiler-warning-new-zealand-release/",
      "https://www.vice.com/en/article/gta-6-new-zealand-worldwide-release-times/",
      "https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/",
      "https://www.1news.co.nz/2026/11/18/gta-6-how-to-beat-the-download-rush-and-why-gamers-abroad-envy-kiwis/",
    ],
  },
  {
    slug: "gta-6-sales-17-million-sensor-tower",
    title: "GTA 6 Sales: 17M Copies Estimated",
    description:
      "Sensor Tower estimates GTA 6 has sold over 17 million copies for $1.65B+, per Reuters and CNBC. Not an official figure yet. Take-Two shares rose.",
    crumb: "Sales estimate",
    teaser: "Sensor Tower puts GTA 6 at over 17 million copies and $1.65B+. Rockstar and Take-Two have not published a sales figure.",
    tag: "Sales",
    keywords: ["GTA 6 sales", "GTA 6 copies sold", "GTA 6 Sensor Tower", "GTA 6 pre-orders", "Take-Two shares GTA 6", "GTA 6 record"],
    published: SALES_PUBLISHED,
    updated: SALES_PUBLISHED,
    citations: [
      "https://www.investing.com/news/stock-market-news/gamers-get-ready-to-enter-vice-city-as-grand-theft-auto-vi-begins-globalrollout-5035485",
      "https://www.cnbc.com/2026/11/18/gta-vi-publisher-take-two-jumps-as-gamers-relish-blockbuster-release.html",
      "https://sensortower.com/blog/gta-vi-breaks-record-greater-than-1b-pre-order-or-sensor-tower-report",
      "https://sensortower.com/grand-theft-auto-VI/sales-tracker",
      "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/take-two-interactive-software-inc-reports-results-fiscal-4/",
    ],
    faq: [
      {
        question: "How many copies has GTA 6 sold?",
        answer: "There is no official figure yet. Sensor Tower estimates over 17 million copies for more than $1.65 billion, as reported by Reuters, and CNBC cites its tracker at roughly 17.1 million units as of early Wednesday 18 Nov (US time).",
      },
      {
        question: "Has Rockstar or Take-Two announced GTA 6 sales?",
        answer: "Not in anything we found as of 09:05 AEST on 19 Nov. Take-Two's last official word, on 9 Nov, was that pre-orders were continuing to reach unprecedented levels.",
      },
    ],
  },
  {
    slug: "gta-6-festival-set-times-heat-night",
    title: "GTA 6 Festival Set Times and Heat Night",
    description:
      "Rockstar's GTA VI: The Festival set times for 21 Nov in Miami, in Brisbane time, plus the Heat's Vice City night. Tickets, charities, no livestream yet.",
    crumb: "Festival set times",
    teaser: "Travis Scott closes Rockstar's Miami launch festival. Every set in Miami and Brisbane time, plus the Heat's Vice City night.",
    tag: "Launch events",
    keywords: ["GTA 6 festival", "GTA VI The Festival set times", "Travis Scott GTA 6", "Mana Wynwood", "A Night in Vice City", "Miami Heat GTA 6"],
    published: FESTIVAL_PUBLISHED,
    updated: FESTIVAL_PUBLISHED,
    citations: [
      "https://x.com/RockstarGames/status/2123068976045453338",
      "https://x.com/RockstarGames/status/2123069155775541350",
      "https://x.com/RockstarGames/status/2123098923434713278",
      "https://www.rockstargames.com/VI/gtavi-thefestival",
      "https://gtavi-thefestival.miami",
      "https://www.complex.com/music/a/tracewilliamcowen/gta-6-festival-set-times-charities",
      "https://www.espn.com/nba/story/_/id/50085674/miami-heat-night-vice-city-game",
      "https://www.nba.com/heat/game/0022600260-bucks-vs-heat-miami-fl-11-18-2026",
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
        answer: "We have not found a livestream or broadcast announced by Rockstar or on the festival and DICE pages, as of 08:13 AEST on 19 November.",
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
    updated: UPDATES_0900_AT,
    citations: [
      "https://x.com/PS_Support_US/status/2122863683881619685",
      "https://www.pushsquare.com/news/2026/11/gta-6-requires-new-ps5-firmware-update-to-play",
      "https://www.polygon.com/gta-6-grand-theft-auto-playstation-mandatory-ps5-update/",
      "https://www.theverge.com/games/1036395/if-you-want-to-play-gta-vi-on-ps5-tonight-download-yesterdays-firmware-update-first",
      "https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/",
      "https://insider-gaming.com/is-grand-theft-auto-6-down-gta-6-issues-explained/",
      "https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best",
      "https://status.playstation.com/",
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
    ],
    faq: [
      {
        question: "Is GTA 6 down?",
        answer: "At 08:59-09:03 AEST on 19 Nov, PlayStation's status feed listed no active issues for the US, UK, Europe, Australia or New Zealand, and Rockstar, PSN and Xbox feeds relayed by GTATracker showed up. Downdetector user reports showed \"possible problems\" in Germany just after its 09:00 AEST unlock and \"problems\" in the UK, which had not yet unlocked, while Australia was back to no current problems. User reports are not confirmed outages, and we could not see what the UK and German reports were about.",
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
      "GTA 6 unlocks at midnight local time on 19 Nov 2026. Unlock times by region in local, UTC and Brisbane time, what is unconfirmed, and spoiler tips.",
    crumb: "Release time by region",
    teaser: "Midnight local time, region by region, in local, UTC and Brisbane time.",
    tag: "Countdown",
    live: true,
    keywords: ["GTA 6 release time", "GTA 6 unlock time", "GTA 6 countdown", "midnight launch", "Brisbane"],
    published: NEWS_PUBLISHED,
    updated: NEWS_PUBLISHED,
    citations: [
      "https://www.rockstargames.com/VI",
      "https://blog.playstation.com/2026/11/10/pre-load-grand-theft-auto-vi-on-ps5-starting-today/",
      "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/",
      "https://kotaku.com/gta-6-pre-load-times-install-size-and-global-release-times-confirmed-2000752787",
      "https://www.digitalfoundry.net/news/2026/11/rockstar-officially-confirms-gta-6-regional-release-times-and-theyre-not-what-we-thought",
      "https://www.vice.com/en/article/gta-6-new-zealand-worldwide-release-times/",
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
    updated: NEWS_PUBLISHED,
    citations: [
      "https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/",
      "https://www.rockstargames.com/VI",
      "https://www.playstation.com/en-us/games/grand-theft-auto-vi/",
      "https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/",
      "https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games",
      "https://www.usatoday.com/story/tech/gaming/2026/11/09/gta-6-preload-consoles-release-date-file-size/92640419007/",
    ],
  },
  {
    slug: "gta-6-preload-editions-pricing",
    title: "GTA 6 Preload, Editions & Price",
    description:
      "How to preload GTA 6 on PS5 and Xbox, how much space you need (212GB PS5, about 225GB Xbox), and what Standard ($79.99) and Ultimate ($99.99) include.",
    crumb: "Preload and editions",
    teaser: "212GB, how to preload on PS5 and Xbox, and what Standard and Ultimate include.",
    tag: "Guide",
    keywords: ["GTA 6 preload", "GTA 6 file size", "GTA 6 editions", "GTA 6 Ultimate Edition", "GTA 6 price"],
    published: NEWS_PUBLISHED,
    updated: UPDATES_AT,
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
      "N3ON said he would fly to New Zealand to play GTA 6 at the local unlock. What outlets report, tracker viewer numbers, and an unverified ban rumour.",
    crumb: "N3ON's New Zealand stream",
    teaser: "N3ON said he would fly to New Zealand for the first unlock. What outlets report, plus tracker numbers.",
    tag: "Streamers",
    keywords: ["N3ON GTA 6", "N3ON New Zealand", "GTA 6 stream", "Kick", "StreamStats"],
    published: STREAMERS_PUBLISHED,
    updated: STREAMERS_PUBLISHED,
    citations: [
      "https://sports.ndtv.com/us/us-streamers/n3on-announces-gta-6-livestream-from-new-zealand-at-6-am-est-flies-across-the-world-for-early-gta-6-access-12343208",
      "https://www.moneycontrol.com/technology/gta-6-launched-in-new-zealand-american-gamer-and-streamer-n3on-travelled-there-to-play-it-hours-before-rest-of-the-world-article-14083594.html",
      "https://streamstats.io/channels/n3on?platform=kick",
    ],
  },
  {
    slug: "gta-6-streaming-viewership-peak",
    title: "GTA 6 Streams Top 4M Viewers",
    description:
      "Trackers show GTA 6 streams above 4 million concurrent viewers across Twitch, Kick and YouTube on launch night. Figures, sources and how to read them.",
    crumb: "Streaming viewership",
    teaser: "Trackers put GTA 6 streams above 4 million concurrent viewers on launch night. Figures and caveats.",
    tag: "Streamers",
    keywords: ["GTA 6 viewers", "GTA 6 Twitch", "GTA 6 Kick", "GTA 6 YouTube", "streaming record"],
    published: STREAMERS_PUBLISHED,
    updated: STREAMERS_PUBLISHED,
    citations: [
      "https://www.bbc.com/news/live/c60rkg21dl22t",
      "https://nextcounts.com/games/grand-theft-auto-vi",
      "https://luciastream.com/press/",
    ],
  },
  {
    slug: "gta-6-launch-streams-schedule",
    title: "GTA 6 Launch Streams: Who Goes Live",
    description:
      "Kai Cenat, IShowSpeed and YouTube's 24-hour stream start before the US unlock. Start times in ET and Brisbane time, plus what is unconfirmed.",
    crumb: "Launch streams",
    teaser: "Kai Cenat starts 8 PM ET, IShowSpeed 9 PM, YouTube at midnight ET. Times in ET and Brisbane.",
    tag: "Streamers",
    keywords: ["GTA 6 streams", "Kai Cenat GTA 6", "IShowSpeed GTA 6", "GTA 6 YouTube stream", "launch schedule"],
    published: STREAMERS_PUBLISHED,
    updated: STREAMERS_PUBLISHED,
    citations: [
      "https://x.com/KaiCenat/status/2122427634743214114",
      "https://x.com/ishowspeedsui/status/2122463228987129932",
      "https://www.sportskeeda.com/us/streamers/news-kai-cenat-s-gta-6-marathon-livestream-date-time-livestream-link",
      "https://www.techtimes.com/articles/330968/20261117/ishowspeed-gta-6-stream-starts-3-hours-before-us-unlock-plans-10-12-hour-days-no-marathon.htm",
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
