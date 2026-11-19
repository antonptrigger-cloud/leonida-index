import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-no-prostitutes-rockstar";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const SHACK = "https://www.shacknews.com/article/151386/prostitutes-gta6";
const POLY = "https://www.polygon.com/gta-6-prostitutes-hookers-strippers-where-are-npcs-rockstar/";
const PCG = "https://www.pcgamer.com/games/grand-theft-auto/you-cant-cheat-on-lucia-in-gta-6-with-mandy-or-strippers-because-rockstar-doesnt-believe-thats-complementary-to-the-feeling-and-motivations-of-jason-and-lucias-story/";

// Sourcing (read 20 Nov 2026, 08:05-08:10 AEST):
// - The Rockstar quote is copied from the Shacknews page; Polygon and PC Gamer print the same statement and credit Shacknews.
// - Rockstar's reply does not use the word "prostitutes". The "feature was removed" wording is Shacknews's framing, so it is attributed to Shacknews, not Rockstar.
// - Skipped: Vice (calls it an "interview" and paraphrases a romance-plot reason), X trend summaries, and PC Gamer's named side character (light story spoiler).

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Explainer" title="No hireable prostitutes in GTA 6: what Rockstar said" source="Rockstar statement via Shacknews + reported">
      <Lede>
        You cannot hire prostitutes in Grand Theft Auto VI. Shacknews reported on 18 November (US time) that the feature, part of the series since GTA III in 2001, is not in the game, and it printed a written reply from Rockstar explaining what the studio did and did not carry over from earlier games.
        Polygon and PC Gamer have since run the same Rockstar statement. Here is exactly what Rockstar said, what the outlets add, and what is still in Leonida. No story spoilers.
      </Lede>

      <H2>What Rockstar told Shacknews</H2>
      <p>
        Shacknews&rsquo; Bill Lavoy writes that he contacted Rockstar about the missing feature and received this reply (<Ext href={SHACK}>Shacknews</Ext>):
      </p>
      <Callout title="Rockstar Games, via Shacknews" tone="note">
        <p>
          &ldquo;GTAVI is a game about a couple in a bind, lovers on the run. While we have taken a lot forward from previous GTA titles, everything we have implemented in VI has been done to support the spirit of the story we wanted to tell, and the gameplay systems we wanted to expand upon - things like wanted system, the radio, robberies and car theft. Many aspects of previous titles are not present in GTAVI, but the elements we have we believe are all necessary and complementary to the feeling and motivations we wanted to emphasize as you play through Jason and Lucia&rsquo;s story.&rdquo;
        </p>
      </Callout>
      <p>
        Note what the statement does and does not say. Rockstar does not use the word &ldquo;prostitutes&rdquo; and does not describe the feature as cut. It says many parts of earlier GTA games are not in GTA VI, and that what made it in was chosen to fit Jason and Lucia&rsquo;s story. Shacknews, which asked the question, says in its own words that Rockstar removed the feature to stay true to that story.
      </p>

      <H2>What the outlets report</H2>
      <Bullets>
        <li>
          <Lead>Not in the game:</Lead> Shacknews says plainly that you cannot solicit prostitutes in GTA 6, and its writer says he checked while playing through the game (<Ext href={SHACK}>Shacknews</Ext>).
        </li>
        <li>
          <Lead>Gone as a visible NPC type:</Lead> Polygon says hireable sex workers are not returning and that, as a highly visible type of NPC, they are gone. It leaves room for one to turn up somewhere among the game&rsquo;s many encounters (<Ext href={POLY}>Polygon</Ext>).
        </li>
        <li>
          <Lead>Strip clubs are still there:</Lead> PC Gamer and Polygon both say you can still visit strip clubs, and PC Gamer says Jason and Lucia can go together. PC Gamer adds, as its own view, that Rockstar has not added the ability to do much more because it does not fit the story, which is built around the couple (<Ext href={PCG}>PC Gamer</Ext>).
        </li>
        <li>
          <Lead>Fan reaction:</Lead> Polygon says the decision has disappointed fans who saw the feature as a franchise staple, while most players do not seem to mind. That is Polygon&rsquo;s read, not a survey.
        </li>
      </Bullets>

      <H2>Why it was a GTA tradition</H2>
      <p>
        Polygon traces the feature back to GTA III in 2001 and through GTA V, and notes that it was tied to some of the series&rsquo; biggest controversies, including San Andreas&rsquo; &ldquo;Hot Coffee&rdquo; content in 2005 (<Ext href={POLY}>Polygon</Ext>). Polygon links the change to GTA VI&rsquo;s more realistic tone and its story about a couple.
      </p>

      <H2>What Rockstar says it expanded instead</H2>
      <p>
        The systems Rockstar names in its reply are the wanted system, the radio, robberies and car theft. Our guides cover those from the player&rsquo;s side: <Link href="/guides/wanted" className={L}>how the wanted system works</Link>, <Link href="/guides/stealing-cars" className={L}>stealing cars in GTA 6</Link> and, since the couple sits at the centre of all this, the <Link href="/guides/relationship" className={L}>Jason and Lucia relationship guide</Link>. For the wider list of what Rockstar has confirmed about the game, see <Link href={newsPath("gta-6-confirmed-so-far")} className={L}>GTA 6: confirmed so far</Link>.
      </p>

      <Sources>
        <Source href={SHACK} label="Shacknews (Bill Lavoy): Can you hire prostitutes in GTA 6?, 18 Nov 2026, with Rockstar's statement (read 20 Nov 2026, 08:05 AEST)" kind="News outlet, primary for the Rockstar statement" />
        <Source href={POLY} label="Polygon (Patricia Hernandez): GTA 6 officially cuts a controversial franchise feature after 25 years, 18 Nov 2026 (read 20 Nov 2026, 08:05 AEST)" kind="News outlet" />
        <Source href={PCG} label="PC Gamer (Elie Gould): Rockstar's statement on relationships in GTA 6, 19 Nov 2026 (read 20 Nov 2026, 08:08 AEST)" kind="News outlet" />
      </Sources>
    </NewsLayout>
  );
}
