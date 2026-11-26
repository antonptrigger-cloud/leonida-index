import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, Lead, Lede, NewsLayout, Source, Sources, Steps } from "@/components/news/NewsBits";
import { Spoiler } from "@/components/guides/Spoiler";
import { CreditImage } from "@/components/guides/CreditImage";

const SLUG = "gta-6-mario-luigi-hats-easter-egg";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const VGC = "https://www.videogameschronicle.com/guide/gta-6-where-to-find-the-mario-luigi-hats/";

// Sourcing (QC 26 Nov 2026, 13:52 AEST):
// - VGC-only. Dexerto's wiki section was removed after QC: it counts under the fan-wiki ban.
//   Removed with it: Lawton Co. / Moreau, the $400 lockbox figure, J/L cap labels, tarp-colour dispute, and the Mount Kalaga map link (that pin was only justified by Dexerto).
// - Kotaku published a 23 Nov piece, but kotaku.com returned 503 on every fetch, so no Kotaku details are cited.
// - Image: official screenshot already on main (public/images/regions/ambrosia.webp), credited © Rockstar Games. It is atmosphere only, not a claim that the mill is in Ambrosia.
// - Not a story spoiler; a short toggle still hides the exact trigger for readers who want to trip over it.

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Secrets" title="Where to find the Mario and Luigi hats in GTA 6" source="VGC">
      <Lede>
        Grand Theft Auto VI has a Super Mario nod tucked into a ruined paper mill in the north of Leonida. VGC published a walkthrough on 24 November, and its writer describes doing the steps in-game: you find a hidden block in the ruins and break it, and two hats drop for Jason and Lucia.
        This is a world secret, not a story beat. Exact trigger steps sit behind a toggle if you would rather stumble into it. For other hidden nods, see <Link href="/secrets/easter-eggs" className={L}>GTA 6 easter eggs</Link>.
      </Lede>
      <CreditImage
        src="/images/regions/ambrosia.webp"
        alt="Official GTA 6 screenshot of a biker gang riding a country road in Ambrosia. © Rockstar Games"
        width={1280}
        height={720}
        credit="© Rockstar Games"
      />

      <H2>Where to look</H2>
      <p>
        VGC says to travel to an abandoned paper mill in the north of the map and look for ruined brick structures near a river. You can mark it as a destination on the <Link href="/map" className={L}>interactive map</Link>, and the old industrial buildings show up if you zoom the map in far enough (<Ext href={VGC}>VGC</Ext>).
      </p>
      <p>
        VGC does not name the mill or a region, so we are not pinning it to a district. The description above is all the location the outlet gives.
      </p>

      <H2>What VGC describes</H2>
      <p>
        Once you are in the ruins, VGC points to a dusty blue tarp with a bong on it. Use the bong, look up, and a hidden block appears in the air. Climb the ruins, jump into the block from below, and two hats fall to the ground. VGC&rsquo;s writer walked that path.
      </p>

      <H2>The steps</H2>
      <Spoiler label="the exact trigger and how to break the block">
        <Steps>
          <li>Reach the ruined paper mill and search for the dusty blue tarp with a bong on it.</li>
          <li>VGC also notes a nearby lockbox with some cash. It does not give an amount.</li>
          <li>Interact with the bong and take a hit. VGC says the screen goes hazy and a strange white plume of smoke appears above the ruins; look up for the outline of a block.</li>
          <li>VGC says the block is easier to see at night or in cloudy weather, and that if you heard the sound effect, the block is there even when it is hard to spot.</li>
          <li>Climb the broken walls. VGC says to use wooden planks to reach the higher section, stand under the block and jump. If the jump will not register, VGC&rsquo;s writer found it easier at the edge of the box rather than dead centre.</li>
          <li>When the block breaks, VGC says you hear another sound effect and the two hats drop. Grab them both.</li>
        </Steps>
      </Spoiler>

      <H2>The hats</H2>
      <Bullets>
        <li>
          <Lead>VGC:</Lead> two hats drop for Jason and Lucia. If one character picks up both, they wear one and the other goes into the wardrobe, and you can equip it when the pair are back at their house.
        </li>
      </Bullets>
      <p>
        For how wardrobe and quick changes work once you have the caps, see the <Link href="/guides/change-clothes" className={L}>change clothes guide</Link>.
      </p>
      <Callout title="Single-outlet report" tone="unconfirmed">
        <p>
          This piece is based on VGC alone. Kotaku published a Mario and Luigi hats piece on 23 November, but its page would not load (HTTP 503) from this newsroom, so none of its details are used here.
        </p>
      </Callout>

      <Sources>
        <Source href={VGC} label="VGC (Jordan Middler): GTA 6: Where to find the Mario & Luigi hats, 24 Nov 2026, 10:47 (UK time; 20:47 AEST) (read 26 Nov 2026, 13:45 AEST)" kind="News outlet" />
      </Sources>
    </NewsLayout>
  );
}
