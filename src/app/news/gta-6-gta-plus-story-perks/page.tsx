import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-gta-plus-story-perks";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const IGN = "https://www.ign.com/articles/gta-6-how-microtransactions-and-gta-benefits-work";
const GS = "https://www.gamespot.com/articles/gta-6-gta-subscription-includes-a-free-supercar-discounts-and-more/";
const POLY = "https://www.polygon.com/gta-6-plus-membership-benefits-exclusive-car-garage/";

// Perk list as reported by IGN (which says it is taken from the in-game store page), GameSpot and Polygon. All three agree on the items.
const PERKS: React.ReactNode[][] = [
  ["Venturas BLVD Elegy & garage", "A free \u201990 Annis Venturas BLVD Elegy with an exclusive widebody design, plus a single-car garage in Crosstown, Vice City, with a weapon locker and a way to fence stolen items directly", "From Chapter 3 (see note below)"],
  ["Transit bonuses", "Scooter Bros Premium vehicle care, RydeMe rideshare premium membership, free scooter, bike and Seashark rentals, and free rides on Leonida public transport", "While subscribed"],
  ["Store discounts", "10% off at select businesses, including weapon and clothes shops, hairdressers, tattooists and vehicle mod shops", "While subscribed"],
  ["Increased sell value", "10% more when you sell eligible owned vehicles", "While subscribed"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Explainer" title="GTA+ in GTA 6: what the story-mode perks are" source="IGN, GameSpot, Polygon">
      <Lede>
        Rockstar&rsquo;s GTA+ subscription, until now mostly a GTA Online membership, also adds perks to GTA 6&rsquo;s single-player story: a free Elegy car with a Crosstown garage, transit perks,
        10% shop discounts and 10% more when you sell eligible vehicles. GameSpot and Polygon say the perks only work while you are subscribed, and IGN and Polygon say you can switch them off.
        Polygon puts it at $7.99 a month in the US, IGN adds &pound;6.99 in the UK, and pre-orders came with a free month. Here is what you get, what it costs, and why some players are unhappy about it.
      </Lede>

      <H2>Every GTA+ perk in GTA 6</H2>
      <DataTable head={["Perk", "What it is", "When"]} rows={PERKS} minWidth="36rem" />
      <Bullets>
        <li>
          <Lead>Where the list comes from:</Lead> IGN says the benefits are listed on GTA 6&rsquo;s in-game store page (<Ext href={IGN}>IGN</Ext>). GameSpot says Rockstar revealed that GTA+ now covers both GTA Online and GTA 6 (<Ext href={GS}>GameSpot</Ext>), and Polygon lists the same perks (<Ext href={POLY}>Polygon</Ext>).
        </li>
        <li>
          <Lead>Chapter 3 timing:</Lead> IGN says the car and garage are available &ldquo;from Chapter 3 of the story onward&rdquo; and Polygon says after reaching Chapter 3, while GameSpot says after you complete Chapter 3. We have not seen Rockstar&rsquo;s own wording, so check the in-game store page.
        </li>
        <li>
          <Lead>Only while subscribed:</Lead> GameSpot says the perks &ldquo;are only available while you&rsquo;re subscribed&rdquo;, and Polygon says cancelling means losing the car and garage along with the other perks.
        </li>
      </Bullets>

      <H2>Price and the free month</H2>
      <p>
        Polygon puts GTA+ at $7.99 a month in the United States (GameSpot rounds it to $8), and IGN gives $7.99 or &pound;6.99. IGN, GameSpot and Polygon all say pre-orders came with a free month. IGN says it must be redeemed before 31 March 2027 and then renews automatically unless you cancel (<Ext href={IGN}>IGN</Ext>).
        Our <Link href={newsPath("gta-6-preload-editions-pricing")} className={L}>editions and pricing guide</Link> has what Take-Two and the PlayStation Store say about the GTA+ month, and you can compare what each edition includes with the <Link href="/tools/edition-compare" className={L}>edition comparison</Link>.
        Polygon says commenters point out that owners of more expensive editions still need GTA+ for the perks.
      </p>

      <H2>How to turn GTA+ boosts off</H2>
      <p>
        If you want the plain game while keeping your membership, Polygon says to open the pause menu, go to the Account tab, find GTA Plus Boosts and switch it off (<Ext href={POLY}>Polygon</Ext>). IGN also says the benefits can be switched off in the settings menu.
      </p>

      <H2>Why players are pushing back</H2>
      <p>
        Polygon reports that a Reddit post about the perks drew thousands of upvotes, with many players objecting to extra content behind a monthly fee in a single-player game. Polygon says some of the most popular comments argue the car and garage should be in the base game, and others point out that buyers of pricier editions still need GTA+ for them.
        Polygon adds that some players worry about what this signals for GTA Online on GTA 6 (see our <Link href={newsPath("gta-6-online-release-date")} className={L}>GTA 6 Online status</Link>). IGN&rsquo;s view is that it is &ldquo;not quite pay-to-win&rdquo; because the advantages are small and the game is single-player.
      </p>

      <Callout title="Is it worth it?" tone="note">
        <p>
          As listed by the outlets, the perks are mostly discounts, free transport and better resale, plus the car and garage. If you want to earn without them, our <Link href="/guides/money" className={L}>money guide</Link> covers the basics. We have not seen Rockstar say whether more GTA+ perks will come to the story mode.
        </p>
      </Callout>

      <Sources>
        <Source href={IGN} label="IGN (Simon Cardy): GTA 6 microtransactions and GTA+ benefits, 18 Nov 2026" kind="News outlet" />
        <Source href={GS} label="GameSpot (Darryn Bonthuys): GTA+ subscription perks, 18 Nov 2026" kind="News outlet" />
        <Source href={POLY} label="Polygon (Sam Hill): GTA 6's subscription-based perks, 18 Nov 2026" kind="News outlet" />
      </Sources>
    </NewsLayout>
  );
}
