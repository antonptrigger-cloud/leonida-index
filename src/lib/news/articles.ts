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
}

export const NEWS_PUBLISHED = "2026-11-18T22:35:00+10:00";

/** Streamer stories. Set to the approval time when they go live; `updated` is when the numbers were last checked. */
export const STREAMERS_PUBLISHED = "2026-11-18T23:02:00+10:00";

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
    slug: "gta-6-reviews-metacritic-99",
    title: "GTA 6 Reviews: Metacritic 99 Ties the Record",
    description:
      "GTA 6 reviews are live. Metacritic opened at 99, tying Ocarina of Time. Named scores, the performance notes critics flag, and no spoilers.",
    crumb: "GTA 6 reviews",
    teaser: "Metacritic opened at 99, level with Ocarina of Time. Scores, performance notes and what is still unconfirmed.",
    tag: "Reviews",
    keywords: ["GTA 6 reviews", "Metacritic", "GTA 6 score", "Ocarina of Time", "performance", "PS5 Pro"],
    published: NEWS_PUBLISHED,
    updated: NEWS_PUBLISHED,
    citations: [
      "https://www.bbc.com/news/live/c60rkg21dl22t",
      "https://insider-gaming.com/gta-6-gets-a-99-in-early-metacritic-review-scores/",
      "https://www.gamingbible.com/news/gta-6-review-round-up-highest-rated-game-all-time-916887-20261118",
      "https://www.aa.com.tr/en/science-technology/gta-vi-global-rollout-begins-with-new-zealand-launch/4129238",
      "https://www.metacritic.com/game/grand-theft-auto-vi/",
      "https://www.polygon.com/gta-6-review-roundup/",
      "https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation",
    ],
  },
  {
    slug: "gta-6-ps5-update-patches-servers",
    title: "GTA 6 PS5 Update, Patches & Servers",
    description:
      "PS5 needs a mandatory system update to play GTA 6. Pre-launch game patches, server status and what is still unconfirmed on launch night.",
    crumb: "PS5 update and patches",
    teaser: "The PS5 system update you must install, the two pre-launch patches, and how to check server status.",
    tag: "Checklist",
    keywords: ["GTA 6 PS5 update", "GTA 6 patch", "GTA 6 server status", "PS5 system software", "01.002.001"],
    published: NEWS_PUBLISHED,
    updated: NEWS_PUBLISHED,
    citations: [
      "https://x.com/PS_Support_US/status/2122863683881619685",
      "https://www.pushsquare.com/news/2026/11/gta-6-requires-new-ps5-firmware-update-to-play",
      "https://www.polygon.com/gta-6-grand-theft-auto-playstation-mandatory-ps5-update/",
      "https://www.theverge.com/games/1036395/if-you-want-to-play-gta-vi-on-ps5-tonight-download-yesterdays-firmware-update-first",
      "https://www.vice.com/en/article/gta-6-second-day-one-patch-ps5-xbox/",
      "https://insider-gaming.com/is-grand-theft-auto-6-down-gta-6-issues-explained/",
      "https://status.playstation.com/",
      "https://gtatracker.gg/online/server-status",
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
      "How to preload GTA 6 on PS5 and Xbox, how much space you need (212GB), and what Standard ($79.99) and Ultimate ($99.99) include.",
    crumb: "Preload and editions",
    teaser: "212GB, how to preload on PS5 and Xbox, and what Standard and Ultimate include.",
    tag: "Guide",
    keywords: ["GTA 6 preload", "GTA 6 file size", "GTA 6 editions", "GTA 6 Ultimate Edition", "GTA 6 price"],
    published: NEWS_PUBLISHED,
    updated: NEWS_PUBLISHED,
    citations: [
      "https://www.rockstargames.com/VI/pre-load-now",
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
    title: "GTA 6 Streams Top 5M Viewers",
    description:
      "Trackers show GTA 6 streams above 5 million concurrent viewers across Twitch, Kick and YouTube on launch night. Figures, sources and how to read them.",
    crumb: "Streaming viewership",
    teaser: "Trackers put GTA 6 streams above 5 million concurrent viewers on launch night. Figures and caveats.",
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
];

export const newsBySlug = (slug: string) => NEWS.find((n) => n.slug === slug);
