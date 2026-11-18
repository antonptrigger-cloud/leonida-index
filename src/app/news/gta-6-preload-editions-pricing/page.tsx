import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, H3, Lead, Lede, NewsLayout, Source, Sources, Steps } from "@/components/news/NewsBits";

const SLUG = "gta-6-preload-editions-pricing";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Guide" title="Preload and editions" source="Official">
      <Lede>
        Preload has been open since 10 November. If you pre-ordered and have not started yet, clear 212GB now. This guide covers how to
        preload on PS5 and Xbox, then what Standard and Ultimate include.
      </Lede>
      <Callout title="Correction note">
        <p>
          Rockstar&rsquo;s June pre-order announcement gave 12 November for preload. On 3 November Rockstar moved it to 10 November. 12 November
          is now when boxed copies (a download code in a box) reach retailers.
        </p>
      </Callout>

      <H2>Preload basics</H2>
      <Bullets>
        <li>
          <Lead>Who can preload:</Lead> anyone with a digital pre-order, or a redeemed code from a boxed copy (
          <Ext href="https://www.rockstargames.com/VI/pre-load-now">Rockstar</Ext>).
        </li>
        <li>
          <Lead>Space:</Lead> up to 212GB, depending on device (
          <Ext href="https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games">The Verge</Ext>). Sony says to clear at least 212GB on PS5 (
          <Ext href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/">PlayStation</Ext>). The Xbox Store listing carries a maximum install size of about 225GB (209.9GB in binary units), and news.com.au reports about 234GB on Xbox, so leave extra room there (
          <Ext href="https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9P3H4968GRSM">Xbox Store</Ext>, <Link href={newsPath("gta-6-file-size-time-to-beat")} className={L}>file size guide</Link>).
        </li>
        <li>
          <Lead>It does not unlock early.</Lead> The game stays locked until midnight local time on 19 November. Check your region in the{" "}
          <Link href={newsPath("gta-6-release-countdown")} className={L}>release time by region</Link>.
        </li>
        <li>
          <Lead>Patches:</Lead> reports say two small pre-launch updates have appeared (about 1GB, then about 600MB on PS5) with no patch notes. See the{" "}
          <Link href={newsPath("gta-6-ps5-update-patches-servers")} className={L}>PS5 update and patch checklist</Link>.
        </li>
      </Bullets>

      <H2>How to preload</H2>
      <H3>PlayStation 5 and PS5 Pro</H3>
      <Steps>
        <li>Pre-order GTA VI on PlayStation Store, or redeem your boxed code.</li>
        <li>Open the GTA VI page and choose pre-load. Preload opened at midnight local time on 10 November.</li>
        <li>Optional: in Game Library, select the pre-order and switch on Auto-Download.</li>
        <li>Before launch, highlight the game, press Options, then Check for Update.</li>
      </Steps>
      <H3>Xbox Series X|S</H3>
      <Steps>
        <li>Pre-order on the Microsoft Store, or redeem your boxed code.</li>
        <li>Open Store, search Grand Theft Auto VI and select Install. Preload opened at midnight GMT on 10 November.</li>
        <li>Optional: turn on Settings, System, Updates, Keep my games &amp; apps up to date, and leave the console on or in Sleep.</li>
      </Steps>
      <p className="text-xs text-muted">
        Menu paths as described by <Ext href="https://www.engadget.com/2311841/gta-6-now-available-for-preload/">Engadget</Ext>. Store menus can differ by region and
        system version. Engadget also reports that a 512GB Xbox Series S has roughly 362GB usable, so 212GB takes more than half of it.
      </p>
      <p>
        Xbox One owners cannot install the game. Xbox Cloud Gaming streams it from 1 AM ET on 19 November, and the game must be bought separately (
        <Ext href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/">Xbox Wire</Ext>).
      </p>

      <H2>Editions and price</H2>
      <DataTable
        head={["", "Standard", "Ultimate"]}
        rows={[
          ["US price", "$79.99", "$99.99"],
          ["Game", "Full game", "Full game plus the extras below"],
          ["Pre-order bonus", "Vintage Vice City Pack", "Vintage Vice City Pack"],
          ["Upgrade later", "Ultimate Edition Upgrade, $20 on the Xbox Store", "n/a"],
        ]}
      />
      <p className="text-xs text-muted">
        Prices from{" "}
        <Ext href="https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/">Take-Two</Ext> and the{" "}
        <Ext href="https://www.xbox.com/en-US/games/store/grand-theft-auto-vi-ultimate-edition-upgrade/9pn4llbr8rch">Xbox Store listing</Ext>. Regional prices differ, so check your own store.
        On PlayStation, Sony says the upgrade is only sold through PlayStation Store (
        <Ext href="https://www.playstation.com/en-us/support/games/gta-vi-support/">PlayStation Support</Ext>). We have not confirmed its price there.
      </p>

      <H3>Vintage Vice City Pack (pre-order bonus)</H3>
      <p>
        Per the <Ext href="https://www.xbox.com/en-US/games/store/grand-theft-auto-vi-vintage-vice-city-pack/9plvssh8849x">Xbox Store listing</Ext>, the pack is a &rsquo;55 Vapid Stanier sedan with a
        garage, outfits and hairstyles for Jason and Lucia, and an exclusive weapon pattern. Take-Two says digital pre-orders and purchases before 20
        November 2026 include it, plus a free month of GTA+ on digital pre-orders. The PlayStation Store words the cut-off as 19 November, and says
        the GTA+ month must be claimed by 31 March 2027, after which it renews at the regular price until you cancel. Cut-offs differ by store, so read yours.
      </p>

      <H3>What Ultimate adds</H3>
      <p>
        The store listings name these extras, spread across Jason and Lucia&rsquo;s story rather than all unlocked at the start:
      </p>
      <Bullets>
        <li><Lead>Vehicles:</Lead> &rsquo;95 Grotti Cheetah, &rsquo;67 Vapid Dominator Buggy and garage, Shitzu Squalo watercraft, Dinka Enduro motorcycle and Crest Kayak, Ganado retro build mod kit.</li>
        <li><Lead>Weapons:</Lead> Hawk &amp; Little Morgan revolvers and personalised sidearms for Jason and Lucia.</li>
        <li><Lead>Style:</Lead> exclusive outfits, hairstyles and tattoos, plus Goodtime Gear apparel.</li>
        <li><Lead>Shops:</Lead> Rideout Customs, Sara&rsquo;s Unisex Salon, Stock 305, Electric Fang Tattoo, One-Eyed Willie&rsquo;s.</li>
        <li><Lead>Activities:</Lead> the PTT Youngin$ compound and a Classic Car Collection commission.</li>
      </Bullets>
      <p>
        Our <Link href="/tools/edition-compare" className={L}>edition compare tool</Link> has the side-by-side view. Item details come from the store listings and
        we have not checked them in game.
      </p>

      <Sources>
        <Source href="https://www.rockstargames.com/VI/pre-load-now" label="Rockstar: Pre-Load Now, 10 Nov 2026" kind="Official" />
        <Source href="https://taketwointeractivesoftwareinc.gcs-web.com/news-releases/news-release-details/rockstar-games-announces-pre-orders-grand-theft-auto-vi/" label="Take-Two press release, 24 Jun 2026" kind="Official" />
        <Source href="https://www.xbox.com/en-US/games/store/grand-theft-auto-vi-ultimate-edition-upgrade/9pn4llbr8rch" label="Xbox Store: Ultimate Edition Upgrade" kind="Official, platform holder" />
        <Source href="https://www.xbox.com/en-US/games/store/grand-theft-auto-vi-vintage-vice-city-pack/9plvssh8849x" label="Xbox Store: Vintage Vice City Pack" kind="Official, platform holder" />
        <Source href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" label="Xbox Wire, 10 Nov 2026" kind="Official, platform holder" />
        <Source href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/" label="PlayStation Store: Grand Theft Auto VI" kind="Official, platform holder" />
        <Source href="https://www.playstation.com/en-us/support/games/gta-vi-support/" label="PlayStation Support: GTA VI" kind="Official, platform holder" />
        <Source href="https://www.theverge.com/games/1025271/gta-vi-storage-space-rockstar-games" label="The Verge, 3 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.engadget.com/2311841/gta-6-now-available-for-preload/" label="Engadget, 10 Nov 2026" kind="Reputable outlet" />
      </Sources>
    </NewsLayout>
  );
}
