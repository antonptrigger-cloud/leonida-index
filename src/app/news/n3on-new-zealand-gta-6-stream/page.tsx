import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "n3on-new-zealand-gta-6-stream";
export const metadata = metaFor(newsPath(SLUG));

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Streamers" title="N3ON's New Zealand GTA 6 stream" source="NDTV, Moneycontrol, StreamStats">
      <Lede>
        Streamer N3ON said he would fly to New Zealand to play GTA 6 at the local unlock. Outlets report that he travelled there and went live around the unlock, and a third-party
        tracker showed his Kick stream above 75,000 viewers at about 22:52 AEST on 18 Nov.
      </Lede>

      <H2>What he said</H2>
      <p>
        NDTV reports that N3ON said at the Esports Awards that he would stream GTA 6 at 6 AM ET on 18 Nov, and that he was heading to New Zealand &ldquo;right after&rdquo; the show
        to get the game early (<Ext href="https://sports.ndtv.com/us/us-streamers/n3on-announces-gta-6-livestream-from-new-zealand-at-6-am-est-flies-across-the-world-for-early-gta-6-access-12343208">NDTV</Ext>).
        Moneycontrol reports that he flew there to go live as the game unlocked (
        <Ext href="https://www.moneycontrol.com/technology/gta-6-launched-in-new-zealand-american-gamer-and-streamer-n3on-travelled-there-to-play-it-hours-before-rest-of-the-world-article-14083594.html">Moneycontrol</Ext>).
        6 AM ET is midnight in New Zealand, the first region to unlock.
      </p>

      <H2>The numbers</H2>
      <Bullets>
        <li>
          <Lead>Stream:</Lead> StreamStats lists a Kick stream titled &ldquo;PLAYING GTA 6 EARLY&rdquo; that started at 10:31 UTC (20:31 AEST), about half an hour before the 11:00 UTC unlock. At about 22:52 AEST it showed 75,431
          live viewers, an average of 63,887 and a recorded peak of 73,313 for the stream. The stream was still live, so these figures will keep changing (
          <Ext href="https://streamstats.io/channels/n3on?platform=kick">StreamStats</Ext>, a third-party tracker).
        </li>
        <li>
          <Lead>Context:</Lead> the same tracker puts his 30-day average at about 32,600 viewers, so the launch stream ran at about double his usual audience.
        </li>
      </Bullets>

      <Callout title="Unverified rumour: no evidence" tone="unconfirmed">
        <p>
          A viral X post claimed N3ON was banned during the stream. We found no evidence of a ban. The post does not say what was banned or by whom, no outlet, platform or
          N3ON himself has reported one, and his Kick stream stayed live afterwards. That last point cannot rule out an issue on another service, so we treat the claim as
          unverified and are not linking to it.
        </p>
      </Callout>
      <p className="text-sm text-muted">
        We have not independently confirmed where he was or how he unlocked the game, beyond the reports above. We will update this page if N3ON or a platform says anything.
      </p>

      <H2>Clips</H2>
      <p>
        The Esports Awards clip is from a clip account on X, not from N3ON, so treat it as a repost:{" "}
        <Ext href="https://x.com/cutsfeed/status/2122825267844456821">@cutsfeed</Ext>. His channel is <Ext href="https://kick.com/n3on">kick.com/n3on</Ext>. We do not host or embed
        streams, and we are not describing gameplay here.
      </p>

      <Sources>
        <Source href="https://sports.ndtv.com/us/us-streamers/n3on-announces-gta-6-livestream-from-new-zealand-at-6-am-est-flies-across-the-world-for-early-gta-6-access-12343208" label="NDTV Sports" kind="News" />
        <Source href="https://www.moneycontrol.com/technology/gta-6-launched-in-new-zealand-american-gamer-and-streamer-n3on-travelled-there-to-play-it-hours-before-rest-of-the-world-article-14083594.html" label="Moneycontrol" kind="News" />
        <Source href="https://streamstats.io/channels/n3on?platform=kick" label="StreamStats: n3on on Kick" kind="Third-party tracker" />
        <Source href="https://x.com/cutsfeed/status/2122825267844456821" label="@cutsfeed on X: Esports Awards clip" kind="Social post (clip account, not N3ON)" />
      </Sources>
    </NewsLayout>
  );
}
