import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Callout, DataTable, Ext, H2, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-age-rating";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

// Each row is read from the board's own page. "Read" times are 19 Nov 2026, AEST, taken from the box clock when the page was opened.
// Only the rating and the descriptors the page itself shows are quoted. Do not add third-party reporting here.
const ROWS: React.ReactNode[][] = [
  [
    <Ext key="esrb" href="https://www.esrb.org/ratings/41627/grand-theft-auto-vi/">ESRB (US, Canada)</Ext>,
    "M for Mature 17+",
    "Blood and Gore, Intense Violence, Mature Humor, Nudity, Strong Language, Strong Sexual Content, Use of Drugs and Alcohol. Interactive element: In-Game Purchases.",
    "11:46",
  ],
  [
    <Ext key="acb" href="https://www.classification.gov.au/titles/grand-theft-auto-vi-12">Australian Classification</Ext>,
    "R 18+",
    "Consumer advice: \u201cHigh impact violence, sex scenes and drug use\u201d. Classified 27 August 2026.",
    "11:47*",
  ],
  [
    <Ext key="nz" href="https://www.classificationoffice.govt.nz/find-a-rating/quick-takes/grand-theft-auto-vi/">NZ Classification Office</Ext>,
    "R18",
    "Graphic violence, drug use, offensive language, sex scenes, and nudity. Rated 2 October 2026.",
    "11:46",
  ],
  [
    <Ext key="usk" href="https://usk.de/?s=Grand+Theft+Auto+VI">USK (Germany)</Ext>,
    "Keine Jugendfreigabe (no youth release) under \u00a7 14 JuSchG",
    "Reasons: Drastische Gewalt (drastic violence), Drogen (drugs), Kriminelle Rollenbilder (criminal role models). Usage note: In-Game-K\u00e4ufe (in-game purchases). Tested 13 Sep 2026 (Xbox Series) and 13 Oct 2026 (PS5).",
    "11:46",
  ],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Explainer" title="GTA 6 age rating" source="ESRB, Australian Classification, NZ Classification Office, USK">
      <Lede>
        GTA 6 is rated M for Mature 17+ by the ESRB. Every other board we could open puts it at 18 and over: R 18+ in Australia, R18 in New Zealand
        and no youth release from Germany&rsquo;s USK. This page quotes only what each board&rsquo;s own page shows.
      </Lede>

      <H2>Rating by board</H2>
      <DataTable head={["Board", "Rating", "What the board lists", "Read (AEST, 19 Nov)"]} rows={ROWS} minWidth="44rem" />
      <p className="text-xs text-muted">
        The ESRB lists the game for PlayStation 5 and Xbox Series. Times are when we opened each page on 19 November 2026. *The Australian page was read through a remote fetch service, because our own server could not reach that site, so check the linked page for the current entry. Ratings can be updated, so check the
        linked page if you need the current wording.
      </p>

      <H2>Not found</H2>
      <Callout title="No PEGI listing found" tone="unconfirmed">
        <p>
          A search of <Ext href="https://pegi.info/search-pegi?q=Grand+Theft+Auto+VI">pegi.info</Ext> for Grand Theft Auto VI, Grand Theft Auto 6 and GTA VI
          returned no results at 11:46 AEST on 19 November. PEGI says a missing title may not have been classified by PEGI, or may sit on a platform its database does not cover.
          We are not quoting a PEGI rating until the board lists one.
        </p>
      </Callout>
      <p>
        Japan&rsquo;s CERO also showed nothing. We searched the title database linked from the <Ext href="https://www.cero.gr.jp/">CERO site</Ext>, on{" "}
        <Ext href="https://www.cero.biz/search/">cero.biz</Ext>, at 11:47 AEST on 19 November, searching the Japanese title of the series. It listed 31 Grand Theft Auto titles, and none of them is GTA VI. The database footer reads 2002-2025, so it may lag behind new releases.
      </p>

      <H2>What the ratings mean for you</H2>
      <p>
        Read the descriptors, not just the number. The ESRB, Australian and New Zealand entries all name violence, sex and drug use in some form. USK is the only
        one that names criminal role models. Vice City has never been a place for kids, and the boards agree: none of them rates this game for younger players.
        We have kept this page spoiler-free, so there are no scenes or story details here.
      </p>
      <p>
        The ESRB also lists In-Game Purchases, and USK flags the same under usage notes. The{" "}
        <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>preload and editions guide</Link> covers what is sold at launch, and our{" "}
        <Link href="/tools/edition-compare" className={L}>edition compare tool</Link> shows the Standard and Ultimate lists side by side. For the wider picture,
        see <Link href={newsPath("gta-6-confirmed-so-far")} className={L}>what is confirmed so far</Link>.
      </p>
      <Sources>
        <Source href="https://www.esrb.org/ratings/41627/grand-theft-auto-vi/" label="ESRB: Grand Theft Auto VI, read 11:46 AEST 19 Nov 2026" kind="Official ratings board" />
        <Source href="https://www.classification.gov.au/titles/grand-theft-auto-vi-12" label="Australian Classification: Grand Theft Auto VI, read 11:47 AEST 19 Nov 2026" kind="Official classification board" />
        <Source href="https://www.classificationoffice.govt.nz/find-a-rating/quick-takes/grand-theft-auto-vi/" label="NZ Classification Office: Grand Theft Auto VI, read 11:46 AEST 19 Nov 2026" kind="Official classification board" />
        <Source href="https://usk.de/?s=Grand+Theft+Auto+VI" label="USK: title search for Grand Theft Auto VI, read 11:46 AEST 19 Nov 2026" kind="Official ratings board" />
        <Source href="https://pegi.info/search-pegi?q=Grand+Theft+Auto+VI" label="PEGI: search, no results at 11:46 AEST 19 Nov 2026" kind="Official ratings board" />
        <Source href="https://www.cero.biz/search/" label="CERO title search, no GTA VI entry at 11:47 AEST 19 Nov 2026" kind="Official ratings board" />
      </Sources>
    </NewsLayout>
  );
}
