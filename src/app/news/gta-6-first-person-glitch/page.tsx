import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-first-person-glitch";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const PCGAMER = "https://www.pcgamer.com/games/grand-theft-auto/gta-6-is-playable-in-first-person-heres-how-to-activate-it/";
const KOTAKU = "https://kotaku.com/live-updates-on-gta-6-the-biggest-launch-in-gaming-history-2000758030";
const PUREXBOX = "https://www.purexbox.com/news/2026/11/gta-6-first-person-glitch-discovered-and-it-works-on-xbox-and-ps5";
const DEXERTO = "https://www.dexerto.com/gta/gta-6-glitch-lets-players-access-first-person-mode-3430025/";

// Sourcing (all four pages re-read 20 Nov 2026, evening AEST):
// - Main outlets: PC Gamer (Morgan Park tested it; Jody Macgregor, 20 Nov) and Kotaku (launch live blog, 19 Nov, "Someone Claims To Have Found A Glitch",
//   PS5 steps, relayed not tested). Two main outlets describe the same glitch, so its existence and the PS5 method are reported by both;
//   only PC Gamer says it tested it.
// - Credited corroboration (not on the main-outlet list): Pure Xbox (Xbox "View Button" wording, arrest / hair-salon exits, single source) and
//   Dexerto (credits YouTuber oneboyler, weapon animations).
// - Menu wording differs: PC Gamer "touch pad/select button" under Controller Features -> "Camera 2 / 2"; Kotaku "camera button to the touchpad" (PS5);
//   Pure Xbox "View Button" (Xbox); Dexerto "Touch Pad Button". We print each outlet's wording, not a merged menu name.
// - Getting out: PC Gamer says reload a save (even one saved in first person); Dexerto says reload your save; Kotaku says it lasts until you exit the game.
// - Not used: Kotaku's and Dexerto's differing lines about what Rockstar said earlier (no Rockstar source linked), PC Gamer's guess that Rockstar is still
//   polishing the mode and its DLC aside, Pure Xbox's guess about why it is hidden. No claim about Rockstar's intent appears on the page.
// - We found no Rockstar statement about the glitch (checked @RockstarGames / @RockstarSupport earlier this evening).

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Glitches" title="GTA 6 first-person glitch: how it works on PS5 and Xbox" source="PC Gamer, Kotaku, Pure Xbox, Dexerto">
      <Lede>
        GTA 6 shipped without a first-person mode, but players have found a way to force one. PC Gamer tested a controller-setting trick and says it is completely playable. It is a glitch, not a feature, and the catch is getting back out.
        Here is how it works, according to the outlets that covered it.
      </Lede>

      <H2>The key facts</H2>
      <Bullets>
        <li>
          <Lead>Two main outlets report it:</Lead> PC Gamer says players on Reddit found a way to run around in first person and that its own Morgan Park tested it (<Ext href={PCGAMER}>PC Gamer</Ext>). Kotaku&rsquo;s launch live blog, on 19 Nov, passed on a claim of the same glitch with PS5 steps (<Ext href={KOTAKU}>Kotaku</Ext>). Only PC Gamer says it tried it.
        </li>
        <li>
          <Lead>Not an official mode:</Lead> Pure Xbox calls the trick &ldquo;not an intended feature&rdquo; (<Ext href={PUREXBOX}>Pure Xbox</Ext>). Dexerto says the game doesn&rsquo;t include a dedicated first-person mode (<Ext href={DEXERTO}>Dexerto</Ext>). We found no Rockstar statement about it.
        </li>
        <li>
          <Lead>Both consoles:</Lead> PC Gamer gives the button as Circle or B, which covers PS5 and Xbox (<Ext href={PCGAMER}>PC Gamer</Ext>). Pure Xbox tested it on Xbox and says the same steps apply on PS5 with the touchpad (<Ext href={PUREXBOX}>Pure Xbox</Ext>).
        </li>
        <li>
          <Lead>What it looks like:</Lead> PC Gamer says it is completely playable but doesn&rsquo;t look 100% done: shoulders clip through the camera when you hold up a longarm, and breaking into a car looks rough (<Ext href={PCGAMER}>PC Gamer</Ext>). Pure Xbox says you can run around and drive, and that some items don&rsquo;t seem to work properly in first person (<Ext href={PUREXBOX}>Pure Xbox</Ext>). Dexerto says the footage shows weapon animations working (<Ext href={DEXERTO}>Dexerto</Ext>).
        </li>
        <li>
          <Lead>No toggle back:</Lead> PC Gamer and Dexerto both say you have to reload a save (<Ext href={PCGAMER}>PC Gamer</Ext>, <Ext href={DEXERTO}>Dexerto</Ext>).
        </li>
      </Bullets>

      <H2>How to trigger it</H2>
      <p>These steps combine the outlets&rsquo; accounts. Where their wording differs, both versions are shown.</p>
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Open the settings and go to Controller. PC Gamer says to find the touch pad/select button under Controller Features and change it to Camera 2 / 2. Pure Xbox calls it the View Button on Xbox and Dexerto calls it the Touch Pad Button on PS5. Each says to change it from Map to Camera.
        </li>
        <li>Get into a car and bring up your phone with the D-pad. Pure Xbox and Dexerto say Up.</li>
        <li>
          Press Circle (PS5) or B (Xbox) to put the phone away, and hit the remapped button. PC Gamer says to press Circle or B and then quickly hit it. Pure Xbox and Dexerto say to press it rapidly as you put the phone away.
        </li>
        <li>If it works, you are locked into first person. Pure Xbox says it may take a few tries. Dexerto and Kotaku say the view stays when you get out of the vehicle.</li>
      </ol>
      <p>
        PC Gamer says you have to reload a save to leave first person, so make a fresh save before you try it. Our <Link href="/guides/saving" className={L}>GTA 6 saving guide</Link> covers how saves work.
      </p>

      <H2>Getting back to third person</H2>
      <p>
        PC Gamer says the way out is to reload a save. It doesn&rsquo;t have to be an old one: if you save in first person and then load that same save, you are back in third person (<Ext href={PCGAMER}>PC Gamer</Ext>). Dexerto also says to reload your save (<Ext href={DEXERTO}>Dexerto</Ext>). Kotaku&rsquo;s live blog instead says the view is supposed to last until you exit the game (<Ext href={KOTAKU}>Kotaku</Ext>). Pure Xbox&rsquo;s writer found that being arrested or going into a hair salon sent the camera back to third person, and only Pure Xbox reports that so far (<Ext href={PUREXBOX}>Pure Xbox</Ext>).
      </p>

      <H2>Will it be patched?</H2>
      <p>
        We don&rsquo;t know. We found no Rockstar statement on the glitch, and Dexerto says it is unclear whether a full mode or a patch will follow (<Ext href={DEXERTO}>Dexerto</Ext>). Because it is an unofficial glitch, a future update could change or remove it. Our <Link href={newsPath("gta-6-ps5-update-patches-servers")} className={L}>GTA 6 patch and server tracker</Link> will log any update that does.
      </p>
      <p>
        For the first-person views the game officially supports, the stationary inspect view and scoped aiming, see our <Link href="/guides/first-person" className={L}>GTA 6 first-person guide</Link>.
      </p>

      <Callout title="Unconfirmed" tone="unconfirmed">
        <p>
          This is an unofficial glitch, not a Rockstar feature. PC Gamer tested it and Kotaku passed on the claim, and Rockstar hasn&rsquo;t commented. The menu name, the order of the button presses and the way out all differ between outlets, as shown above. The arrest and hair-salon exits come from Pure Xbox alone.
        </p>
      </Callout>

      <Sources>
        <Source href={PCGAMER} label="PC Gamer (Jody Macgregor, with Morgan Park): GTA 6 is playable in first-person, here's how to activate it, 20 Nov 2026 (read 20 Nov 2026, evening AEST)" kind="Main outlet, tested the glitch. For the steps, how it looks and the reload-a-save exit" />
        <Source href={KOTAKU} label="Kotaku: GTA 6 Launch Live Updates, entry 'Someone Claims To Have Found A Glitch To Play GTA 6 In First-Person Mode', 19 Nov 2026 (read 20 Nov 2026, evening AEST)" kind="Main outlet, passed on a claim. For the PS5 steps and the view lasting until you exit the game" />
        <Source href={PUREXBOX} label="Pure Xbox (Fraser Gilbert): GTA 6 First-Person Glitch Discovered, And It Works On Xbox & PS5 (read 20 Nov 2026, evening AEST)" kind="News outlet, credited corroboration. For the Xbox wording and the arrest and hair-salon exits" />
        <Source href={DEXERTO} label="Dexerto (Michael Gwilliam): GTA 6 glitch lets players access first-person mode, 19 Nov 2026 (read 20 Nov 2026, evening AEST)" kind="News outlet, credited corroboration. For the PS5 wording, oneboyler's footage and the reload-a-save exit" />
      </Sources>
    </NewsLayout>
  );
}
