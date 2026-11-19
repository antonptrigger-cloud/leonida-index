import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-nbn-australia-traffic-record";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const TR = "https://www.techradar.com/computing/wi-fi-broadband/no-gta-6-didnt-break-the-australian-internet-but-it-sure-did-break-records";
const GG = "https://www.gadgetguy.com.au/gta-6-breaks-two-australian-nbn-internet-records-in-one-week/";
const WO = "https://www.whistleout.com.au/Broadband/News/Grand-Theft-Auto-6-NBN-download-record";

// Figures are NBN Co's and the telcos' own, as relayed by the outlet named in each row. None of these outlets is on our main list and we have not seen an NBN Co press release, so every number is attributed to the outlet that reports it.
const RECORDS: React.ReactNode[][] = [
  ["Launch night, into 19 Nov", "36.54Tbps", "NBN Co's new all-time record, as reported. WhistleOut says NBN Co put it about 20% above baseline. GadgetGuy says the baseline is about 30Tbps", <span key="r1"><Ext href={TR}>TechRadar</Ext>, <Ext href={GG}>GadgetGuy</Ext>, <Ext href={WO}>WhistleOut</Ext></span>],
  ["Earlier record, set the week before", "33.19Tbps", "TechRadar dates it to 12 Nov, when boxed copies went on sale, and says a Fortnite patch the same day also added to demand. GadgetGuy says it came on the first day of pre-loading plus a major Fortnite update", <span key="r2"><Ext href={TR}>TechRadar</Ext>, <Ext href={GG}>GadgetGuy</Ext></span>],
  ["2025", "32.91Tbps", "The record before that", <span key="r3"><Ext href={TR}>TechRadar</Ext>, <Ext href={GG}>GadgetGuy</Ext></span>],
];

const TELCOS: React.ReactNode[][] = [
  ["Aussie Broadband", "Network high of 6.9Tbps at launch. Traffic to PlayStation servers up 151% and to Xbox servers up 39% during the preload period"],
  ["TPG", "Records on its network, with traffic about 15% above average on launch night. The spike started around 2:30pm and \u201creally surged in the evening\u201d"],
  ["Telstra", "No record, but its third-largest spike"],
  ["Optus", "No launch-night data shared. Its customers downloaded more than 10.1 petabytes of GTA VI since preloads started, which WhistleOut says is approximately equivalent to 47,500 copies"],
];

// Our own estimate: size (GB, decimal) x 8,000 Mb per GB / plan speed (Mbps), at full speed. 212GB: 12 Mbps 39.3h, 25 Mbps 18.8h, 50 Mbps 9.4h, 100 Mbps 4.7h, 250 Mbps 1.9h, 500 Mbps 56 min. 225GB: 41.7h, 20.0h, 10.0h, 5.0h, 2.0h, 60 min.
const TIMES: React.ReactNode[][] = [
  ["NBN 12 (12Mbps)", "about 39 hours", "about 42 hours"],
  ["NBN 25 (25Mbps)", "about 19 hours", "about 20 hours"],
  ["NBN 50 (50Mbps)", "about 9.4 hours", "about 10 hours"],
  ["NBN 100 (100Mbps)", "about 4.7 hours", "about 5 hours"],
  ["NBN 250 (250Mbps)", "about 1.9 hours", "about 2 hours"],
  ["NBN 500 (500Mbps)", "about 56 minutes", "about 1 hour"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Launch night" title="GTA 6 set a new record on Australia&rsquo;s NBN" source="NBN Co via TechRadar, GadgetGuy, WhistleOut">
      <Lede>
        TechRadar, GadgetGuy and WhistleOut all report that Australians downloading Grand Theft Auto VI on launch night pushed the NBN to 36.54Tbps, which TechRadar and WhistleOut say NBN Co describes as the most data its network has moved in a single second. That is the outlets&rsquo; relay of NBN Co&rsquo;s figures: we have not seen an NBN Co statement ourselves.
        It tops a 33.19Tbps record set about a week earlier. WhistleOut says NBN Co puts the launch peak about 20% above its baseline, and none of the outlets we read reports an NBN outage. Here are the numbers, what the big telcos told WhistleOut, and our own estimate of the download time on each plan.
      </Lede>

      <H2>The record, in numbers</H2>
      <DataTable head={["When", "Peak", "What the outlets report", "Reported by"]} rows={RECORDS} minWidth="36rem" />
      <Bullets>
        <li>
          <Lead>Launch night:</Lead> TechRadar says NBN Co told it the network hit 36.54Tbps overnight heading into 19 November, &ldquo;the most data we&rsquo;ve ever moved in a single second&rdquo; (<Ext href={TR}>TechRadar</Ext>). GadgetGuy and WhistleOut report the same 36.54Tbps figure from NBN Co, and both say NBN Co compared it to downloading the 212GB game about 21 times every second (<Ext href={GG}>GadgetGuy</Ext>, <Ext href={WO}>WhistleOut</Ext>).
        </li>
        <li>
          <Lead>A week earlier:</Lead> TechRadar quotes NBN Co&rsquo;s Rob Bates saying the network &ldquo;hit a new traffic record of 33.19Tbps&rdquo; on Thursday 12 November, the day boxed copies reached stores, and that a Fortnite patch released the same day added to demand. GadgetGuy gives the same 33.19Tbps figure and says it was set on the first day of pre-loading, alongside a major Fortnite update.
        </li>
        <li>
          <Lead>The preload period:</Lead> TechRadar quotes Bates saying NBN Co recorded more than 70 petabytes of additional traffic since preloading began, &ldquo;roughly equivalent to 330,000 GTA 6 downloads&rdquo;. GadgetGuy reports the same figures and gives the window as 12 to 18 November, which it calls the first day people could pre-load. TechRadar, like our <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>preload and editions guide</Link>, says preloading opened on 10 November, after Rockstar moved it forward from 12 November. Either way, this is extra traffic on the network, not a count of copies sold.
        </li>
        <li>
          <Lead>Who downloaded most:</Lead> over the first four days of preloads, NBN Co&rsquo;s figures put Tasmania&rsquo;s peak furthest above its usual baseline (16.3%), ahead of South Australia (14.2%), Victoria (13.9%), New South Wales (13.8%) and Queensland (13.6%). Western Australia was lowest at 6.6% (<Ext href={TR}>TechRadar</Ext>). These are rises against each state&rsquo;s normal traffic, not totals.
        </li>
      </Bullets>

      <H2>What the telcos saw</H2>
      <p>These figures come from WhistleOut only, which says spokespeople for four providers gave them to it (<Ext href={WO}>WhistleOut</Ext>). We have not seen them elsewhere:</p>
      <DataTable head={["Provider", "What they told WhistleOut"]} rows={TELCOS} minWidth="32rem" />

      <H2>Still downloading? How long it takes</H2>
      <p>
        TechRadar, GadgetGuy and WhistleOut all give the download as 212GB (on PS5), and our <Link href={newsPath("gta-6-file-size-time-to-beat")} className={L}>file size guide</Link> puts Xbox at about 225GB. This table is <strong>our own estimate</strong>: the size divided by the plan&rsquo;s full speed, with no allowance for slower real-world speeds, other devices on your network or patches, so expect longer.
      </p>
      <DataTable head={["NBN plan (full speed)", "212GB (PS5)", "225GB (Xbox)"]} rows={TIMES} minWidth="30rem" />
      <p>
        WhistleOut gives its own estimates: almost two full days on NBN 12, just under five hours on NBN 100 and under an hour on NBN 500, if you max out your connection the whole time (<Ext href={WO}>WhistleOut</Ext>). Our maths agrees for NBN 100 and NBN 500, and comes out a little lower than &ldquo;almost two days&rdquo; for NBN 12 (about 39 hours).
        If the download or sign-in stalls, check our <Link href={newsPath("gta-6-ps5-update-patches-servers")} className={L}>live server status tracker</Link> before you blame your NBN connection.
      </p>

      <Callout title="Did GTA 6 break the internet in Australia?" tone="note">
        <p>
          TechRadar&rsquo;s headline says no: &ldquo;No, GTA 6 didn&rsquo;t break the Australian internet, but it sure did break records&rdquo;, and its article says the network &ldquo;hasn&rsquo;t ground to a halt&rdquo;. We did not see any of the three outlets report an NBN outage.
          GadgetGuy adds that fixed NBN connections account for about 80% of Australian households&rsquo; internet, citing ACMA, with satellite, 4G, 5G and Opticomm making up the rest, so total download traffic was probably higher than the NBN figures alone.
          For how launch night played out across Australia and New Zealand, see our <Link href={newsPath("gta-6-live-new-zealand-launch-report")} className={L}>launch night report</Link>.
        </p>
      </Callout>

      <Sources>
        <Source href={TR} label="TechRadar (Max Langridge): GTA 6 NBN traffic records, 18 Nov 2026, updated 19 Nov with the launch-night figure" kind="News outlet, quoting NBN Co" />
        <Source href={GG} label="GadgetGuy (Chris Button): GTA 6 launch breaks two Australian internet records, 19 Nov 2026" kind="News outlet, quoting NBN Co" />
        <Source href={WO} label="WhistleOut (Alex Choros): Grand Theft Auto VI sets NBN download record, 19 Nov 2026" kind="News outlet, quoting NBN Co and telco spokespeople" />
      </Sources>
    </NewsLayout>
  );
}
