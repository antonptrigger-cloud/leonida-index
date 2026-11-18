import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-performance-ps5-pro-xbox";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const ROWS: React.ReactNode[][] = [
  ["PS5", "30fps", "1440p", "Rockstar in-house TAA (a spatial upscale to 4K, per Digital Foundry)", "RT global illumination and reflections, no RT shadows"],
  ["PS5 Pro", "30fps", "1440p", "PSSR (Rockstar's statement to Wccftech says \u201CPSSR2\u201D)", "Adds ray-traced shadows"],
  ["Xbox Series X", "30fps", "1440p", "Rockstar in-house TAA (a spatial upscale to 4K, per Digital Foundry)", "RT global illumination and reflections, no RT shadows"],
  ["Xbox Series S", "30fps", "720p", "AMD FSR 4, to about 1080p", "RT global illumination and reflections, at lower quality"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Performance" title="GTA 6 Performance: PS5, PS5 Pro & Xbox" source="Rockstar, PlayStation, Digital Foundry, IGN">
      <Lede>
        GTA 6 targets 30fps on every console, with no performance mode. PS5 Pro gets a cleaner image and ray-traced shadows. Here is what Rockstar has said, and what Digital Foundry and IGN
        have measured on each console.
      </Lede>

      <H2>The short version</H2>
      <Bullets>
        <li>
          <Lead>Official:</Lead> Rockstar says the game is &ldquo;targeting 30 frames per second&rdquo; on PlayStation and Xbox (as quoted by{" "}
          <Ext href="https://gameinformer.com/2026/11/10/grand-theft-auto-vi-will-run-at-30-fps-on-all-consoles-but-ps5-pro-will-feature-improved">Game Informer</Ext>).
          GameSpot reports all platforms play at the same frame rate, with no additional performance modes mentioned (<Ext href="https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/">GameSpot</Ext>).
        </li>
        <li>
          <Lead>Official:</Lead> PS5 Pro gets &ldquo;improved clarity&rdquo; through PSSR and ray-traced shadows, which are &ldquo;only available on PlayStation 5 Pro&rdquo; (Game Informer
          quoting Rockstar; the same wording is on the <Ext href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/">PlayStation Store page</Ext>).
        </li>
        <li>
          <Lead>Official:</Lead> there is no 40fps or balanced mode. TechRadar says GTA 6 &ldquo;doesn&rsquo;t offer any graphics modes&rdquo; on PS5 or Xbox Series X|S, and quotes
          Rockstar&rsquo;s Jonathon Ashcroft: &ldquo;It&rsquo;s a tremendous amount of work to do and only 33ms to do it&rdquo; (<Ext href="https://www.techradar.com/gaming/why-no-40fps-mode-for-gta-6-rockstar-says-the-complexity-of-simulating-and-rendering-our-world-requires-it-to-carefully-balance-how-we-spend-every-millisecond-of-both-the-central-processor-and-the-graphics-processor">TechRadar</Ext>).
        </li>
      </Bullets>

      <H2>Resolution and upscaling by console</H2>
      <p>
        Rockstar&rsquo;s technology team gave Wccftech a base resolution and upscaler for each console. Digital Foundry&rsquo;s four-console test, published on 18 Nov, found the same resolutions and upscalers, apart from the PSSR and PSSR2 naming (<Ext href="https://wccftech.com/grand-theft-auto-vi-amd-fsr-4-xbox-series-s-ray-tracing/">Wccftech</Ext>, <Ext href="https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best">Digital Foundry</Ext>).
      </p>
      <DataTable head={["Console", "Target", "Base resolution", "Upscaler", "Ray tracing notes"]} rows={ROWS} minWidth="40rem" />
      <p className="text-xs text-muted">
        Output is 4K on PS5, PS5 Pro and Xbox Series X, and about 1080p on Series S, with a 4K UI composited on all platforms, per Rockstar. Digital Foundry says all four versions use ray-traced global illumination and ray-traced reflections
        (the reflections are a hybrid that layers in screen-space reflections), and only PS5 Pro adds ray-traced shadows. Series S keeps strand-based hair and both ray-traced effects. Digital Foundry says PS5 and Series X look softer than PS5 Pro
        because they do not use a temporal upscaler.
      </p>

      <Callout title="Names differ" tone="unconfirmed">
        <p>
          Rockstar&rsquo;s November 10 blog, PlayStation and Digital Foundry call the PS5 Pro upscaler PSSR. The statement published by Wccftech says PSSR2. We have not seen a clarification, so we use
          &ldquo;PSSR&rdquo; and flag the difference. Digital Foundry&rsquo;s review and four-console test both say PSSR.
        </p>
      </Callout>

      <H2>What reviewers have measured</H2>
      <p>
        Digital Foundry&rsquo;s cross-console test (18 Nov) is based on over 100 hours across all four versions. John played only PS5 and PS5 Pro and Oliver played only Xbox Series X and Series S, so it is not a direct side-by-side yet. Digital Foundry says more
        cross-platform comparisons are coming (<Ext href="https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best">Digital Foundry</Ext>).
      </p>
      <Bullets>
        <li>
          <Lead>PS5 Pro (Digital Foundry):</Lead> the smoothest version, with a consistent 30fps across about 75 hours of standard play and PSSR upscaling to 4K. It can briefly drop to 24fps when destroying vehicles with a grenade launcher, and recovers quickly (
          <Ext href="https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best">Digital Foundry</Ext>).
        </li>
        <li>
          <Lead>Base PS5 and Xbox Series X (Digital Foundry):</Lead> the same 30fps target, held &ldquo;a little more loosely&rdquo;, often flicking between 30fps and the high 20s in traversal and combat. Vehicle destruction drops both into the mid-20s, and into the low 20s at worst.
          The image is a softer 1440p. Digital Foundry says the game &ldquo;looks and plays well&rdquo; on both.
        </li>
        <li>
          <Lead>Xbox Series S (Digital Foundry):</Lead> the loosest 30fps, with large parts of the game in the mid to high 20s, dense combat in the mid-20s, and as low as the teens with a grenade launcher. Digital Foundry lists cutbacks: lower-precision lighting, softer and lower-resolution
          RT reflections, lower-resolution shadow maps, some missing cutscene self-shadows, more pop-in at speed, and lower-resolution hair, clouds and depth of field. It calls Series S &ldquo;the hardest to recommend&rdquo; but says the overall look still shines through.
        </li>
        <li>
          <Lead>Xbox Series S (IGN, first section only):</Lead> mostly around 30fps, with a couple of drops as low as 24fps measured with Trdrop, plus aliased edges and some softness. IGN did not have early access, so this
          covers only the opening of the game (<Ext href="https://www.ign.com/articles/gta-6-xbox-series-s-performance">IGN</Ext>).
          Digital Foundry&rsquo;s longer test found lower frame rates in heavier scenes.
        </li>
        <li>
          <Lead>Xbox extras (Digital Foundry):</Lead> Xbox consoles can run the game in a 120Hz VRR container, an OS-level feature that gives slightly smoother presentation. PlayStation has no equivalent for a 30fps game. Digital Foundry measured about 180ms of camera-movement latency on Series X with a wireless controller, similar to Red Dead Redemption 2.
        </li>
        <li>
          <Lead>Animation:</Lead> Digital Foundry says the animation update-rate unsteadiness seen in pre-release footage and its early Xbox Series testing seems to be fixed by pre-launch patches.
        </li>
      </Bullets>

      <H2>Xbox One and cloud</H2>
      <p>
        There is no native Xbox One version. Xbox says Xbox One players can stream GTA 6 through Xbox Cloud Gaming from 1 AM ET on 19 Nov, using Xbox Series S graphics settings (<Ext href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/">Xbox Wire</Ext>).
        Details are in our <Link href={newsPath("gta-6-game-pass-ps-plus-cloud")} className={L}>Game Pass, PS Plus and cloud explainer</Link>.
      </p>

      <p>
        More on how the game plays on launch: the performance notes in our <Link href={newsPath("gta-6-reviews-metacritic-99")} className={L}>reviews round-up</Link>, the{" "}
        <Link href={newsPath("gta-6-file-size-time-to-beat")} className={L}>file size and length guide</Link>, and the <Link href="/map" className={L}>Leonida map</Link> if you are planning your first drive.
      </p>

      <Sources>
        <Source href="https://gameinformer.com/2026/11/10/grand-theft-auto-vi-will-run-at-30-fps-on-all-consoles-but-ps5-pro-will-feature-improved" label="Game Informer, 10 Nov 2026 (quotes Rockstar's blog)" kind="Reputable outlet quoting official statement" />
        <Source href="https://www.playstation.com/en-us/games/grand-theft-auto-vi/" label="PlayStation Store: Grand Theft Auto VI" kind="Official, platform holder" />
        <Source href="https://www.gamespot.com/articles/gta-6-ps5-pro-features-frame-rates-and-xbox-cloud-gaming-details-confirmed-by-rockstar/" label="GameSpot, 10 Nov 2026" kind="Reputable outlet" />
        <Source href="https://wccftech.com/grand-theft-auto-vi-amd-fsr-4-xbox-series-s-ray-tracing/" label="Wccftech: Rockstar technology Q&A, 18 Nov 2026" kind="Official statement via outlet" />
        <Source href="https://www.techradar.com/gaming/why-no-40fps-mode-for-gta-6-rockstar-says-the-complexity-of-simulating-and-rendering-our-world-requires-it-to-carefully-balance-how-we-spend-every-millisecond-of-both-the-central-processor-and-the-graphics-processor" label="TechRadar, 18 Nov 2026" kind="Reputable outlet" />
        <Source href="https://www.digitalfoundry.net/features/gta-6-ps5-vs-ps5-pro-xbox-series-x-and-series-s-which-console-plays-best" label="Digital Foundry: GTA 6 on PS5, PS5 Pro, Xbox Series X and Series S, 18 Nov 2026" kind="Technical analysis, all four consoles" />
        <Source href="https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation" label="Digital Foundry review (PlayStation), 18 Nov 2026" kind="Technical review" />
        <Source href="https://www.ign.com/articles/gta-6-xbox-series-s-performance" label="IGN: Xbox Series S performance, 18 Nov 2026" kind="Reputable outlet, first section only" />
        <Source href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" label="Xbox Wire, 10 Nov 2026" kind="Official, platform holder" />
      </Sources>
    </NewsLayout>
  );
}
