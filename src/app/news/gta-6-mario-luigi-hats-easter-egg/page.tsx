import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, Lead, Lede, NewsLayout, Source, Sources, Steps } from "@/components/news/NewsBits";
import { Spoiler } from "@/components/guides/Spoiler";

const SLUG = "gta-6-mario-luigi-hats-easter-egg";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const VGC = "https://www.videogameschronicle.com/guide/gta-6-where-to-find-the-mario-luigi-hats/";
const DEX = "https://www.dexerto.com/wikis/gta-6/easter-eggs/super-mario-bros/";

// Sourcing (read 26 Nov 2026, 13:45-13:50 AEST):
// - Main outlet: VGC (Jordan Middler), 24 Nov 2026. The writer describes walking the steps.
// - Dexerto is corroboration only (22 Nov 2026 wiki entry), tagged News outlet, never used as the lead source.
// - Kotaku published a 23 Nov piece, but kotaku.com returned 503 on every fetch this run, so no Kotaku details are cited.
// - Tarp colour is disputed (VGC: dusty blue; Dexerto: purple). Named mill and J/L cap initials are Dexerto-only unless VGC also said them (it did not).
// - Not a story spoiler; a short toggle still hides the exact trigger for readers who want to trip over it.

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Secrets" title="Where to find the Mario and Luigi hats in GTA 6" source="VGC, with Dexerto corroboration">
      <Lede>
        Grand Theft Auto VI has a Super Mario nod tucked into a ruined paper mill in the north of Leonida. VGC published a walkthrough on 24 November, and its writer describes doing the steps in-game: you find a hidden block in the ruins and break it, and two hats drop for Jason and Lucia.
        Dexerto, used here only as corroboration, ran a shorter wiki entry two days earlier that names the mill and the caps. This is a world secret, not a story beat. Exact trigger steps sit behind a toggle if you would rather stumble into it. For other hidden nods, see <Link href="/secrets/easter-eggs" className={L}>GTA 6 easter eggs</Link>.
      </Lede>

      <H2>Where to look</H2>
      <p>
        VGC says to travel to an abandoned paper mill in the north of the map and look for ruined brick structures near a river. You can mark it as a destination, and the old industrial buildings show up if you zoom the map in far enough (<Ext href={VGC}>VGC</Ext>).
      </p>
      <p>
        Dexerto, corroborating the same easter egg, is more specific: the Lawton Co. Paper Mill in Moreau, just north of Mount Kalaga National Park (<Ext href={DEX}>Dexerto</Ext>). VGC does not use those names, so the named mill and the Moreau placement are Dexerto&rsquo;s details. They are consistent with VGC&rsquo;s &ldquo;paper mill in the north,&rdquo; but they have not been independently repeated by VGC. The <Link href="/map/mount-kalaga" className={L}>Mount Kalaga map</Link> is the closest region page on this site.
      </p>

      <H2>What both outlets describe</H2>
      <p>
        Once you are in the ruins, both outlets point to a tarp with a bong on it. Use the bong, look up, and a hidden block appears in the air. Climb the ruins, jump into the block from below, and two hats fall to the ground. VGC&rsquo;s writer walked that path; Dexerto&rsquo;s entry matches the same sequence.
      </p>
      <p>
        One small detail is disputed: VGC says the tarp is dusty blue, Dexerto says it is purple. If you are standing in the ruins, look for the bong on a tarp rather than hunting by colour.
      </p>

      <H2>The steps</H2>
      <Spoiler label="the exact trigger and how to break the block">
        <Steps>
          <li>Reach the ruined paper mill and search for the tarp with a bong on it (dusty blue per VGC; purple per Dexerto).</li>
          <li>VGC also notes a nearby lockbox with some cash. Dexerto puts $400 in that lockbox. The dollar amount is Dexerto&rsquo;s alone.</li>
          <li>Interact with the bong and take a hit. VGC says the screen goes hazy and a strange white plume of smoke appears above the ruins; look up for the outline of a block. Dexerto also describes a white plume of smoke, then a floating cube.</li>
          <li>VGC says the block is easier to see at night or in cloudy weather, and that if you heard the sound effect, the block is there even when it is hard to spot.</li>
          <li>Climb the broken walls. VGC says to use wooden planks to reach the higher section, stand under the block and jump. If the jump will not register, VGC&rsquo;s writer found it easier at the edge of the box rather than dead centre. Dexerto also says the positioning is fiddly and to keep trying.</li>
          <li>When the block breaks, VGC says you hear another sound effect and the two hats drop. Grab them both.</li>
        </Steps>
      </Spoiler>

      <H2>The hats</H2>
      <Bullets>
        <li>
          <Lead>VGC:</Lead> two hats drop for Jason and Lucia. If one character picks up both, they wear one and the other goes into the wardrobe, and you can equip it when the pair are back at their house.
        </li>
        <li>
          <Lead>Dexerto (corroboration):</Lead> a &ldquo;J&rdquo; baseball cap for Jason and an &ldquo;L&rdquo; baseball cap for Lucia, described as Super Mario-style hats with their initials. VGC does not print the J and L labels, so those names are Dexerto&rsquo;s.
        </li>
      </Bullets>
      <p>
        For how wardrobe and quick changes work once you have the caps, see the <Link href="/guides/change-clothes" className={L}>change clothes guide</Link>.
      </p>
      <Callout title="Second preferred outlet not re-read this run" tone="unconfirmed">
        <p>
          Kotaku published a Mario and Luigi hats piece on 23 November, but its page would not load (HTTP 503) from this newsroom, so none of its details are used here. VGC is the main source. Dexerto is corroboration only.
        </p>
      </Callout>

      <Sources>
        <Source href={VGC} label="VGC (Jordan Middler): GTA 6: Where to find the Mario & Luigi hats, 24 Nov 2026, 10:47 (UK time; 20:47 AEST) (read 26 Nov 2026, 13:45 AEST)" kind="News outlet" />
        <Source href={DEX} label="Dexerto: How to complete Super Mario Bros Easter egg in GTA 6, 22 Nov 2026, 10:40 (read 26 Nov 2026, 13:48 AEST)" kind="News outlet (corroboration only)" />
      </Sources>
    </NewsLayout>
  );
}
