import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { newsPath } from "@/lib/news/articles";
import { Bullets, Callout, DataTable, Ext, H2, Lead, Lede, NewsLayout, Source, Sources } from "@/components/news/NewsBits";

const SLUG = "gta-6-performance-ps5-pro-xbox";
export const metadata = metaFor(newsPath(SLUG));

const L = "text-pink underline underline-offset-2";

const ROWS: React.ReactNode[][] = [
  ["PS5", "30fps", "1440p", "Rockstar in-house TAA", "No RT shadows"],
  ["PS5 Pro", "30fps", "1440p", "PSSR (Rockstar's statement to Wccftech says \u201CPSSR2\u201D)", "Ray-traced shadows"],
  ["Xbox Series X", "30fps", "1440p", "Rockstar in-house TAA", "No RT shadows"],
  ["Xbox Series S", "30fps", "720p", "AMD FSR 4", "Ray-traced global illumination, rebalanced"],
];

export default function Page() {
  return (
    <NewsLayout slug={SLUG} kicker="News · Performance" title="GTA 6 Performance: PS5, PS5 Pro & Xbox" source="Rockstar, PlayStation, Digital Foundry, IGN">
      <Lede>
        GTA 6 targets 30fps on every console, with no performance mode. PS5 Pro gets a cleaner image and ray-traced shadows. Here is what Rockstar has said, what reviewers
        have measured so far, and what nobody has tested yet.
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
        Rockstar&rsquo;s technology team gave Wccftech a base resolution and upscaler for each console. Treat the table as Rockstar&rsquo;s own account (<Ext href="https://wccftech.com/grand-theft-auto-vi-amd-fsr-4-xbox-series-s-ray-tracing/">Wccftech</Ext>).
      </p>
      <DataTable head={["Console", "Target", "Base resolution", "Upscaler", "Ray tracing notes"]} rows={ROWS} minWidth="40rem" />
      <p className="text-xs text-muted">
        Output is 4K on PS5, PS5 Pro and Xbox Series X, and 1080p on Series S, with a 4K UI composited on all platforms, per the same Rockstar statement. Wccftech also reports that ray-traced
        global illumination runs on Series S, with each console&rsquo;s implementation rebalanced. Digital Foundry&rsquo;s captions say ray-traced global illumination and reflections run on all platforms, though its review covered PlayStation only.
        We have not seen Rockstar state Series S reflections either way.
      </p>

      <Callout title="Names differ" tone="unconfirmed">
        <p>
          Rockstar&rsquo;s November 10 blog and PlayStation call the PS5 Pro upscaler PSSR. The statement published by Wccftech says PSSR2. We have not seen a clarification, so we use
          &ldquo;PSSR&rdquo; and flag the difference. Digital Foundry also describes the base PS5 as using conventional spatial upscaling, while Rockstar says in-house TAA. We report both as stated.
        </p>
      </Callout>

      <H2>What reviewers have measured</H2>
      <Bullets>
        <li>
          <Lead>PS5 Pro (Digital Foundry):</Lead> a steady 30fps lock with &ldquo;perfect frame pacing&rdquo; across typical play, PSSR upscaling to an image Digital Foundry says convincingly mimics native 4K, and ray-traced shadows (
          <Ext href="https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation">Digital Foundry</Ext>).
        </li>
        <li>
          <Lead>Base PS5 (Digital Foundry):</Lead> generally holds 30fps, with minor dips during intense driving and possible drops into the mid-20s during prolonged encounters with explosive material. Shadows use shadow maps.
        </li>
        <li>
          <Lead>Xbox Series S (IGN, first section only):</Lead> mostly around 30fps, with a couple of drops as low as 24fps measured with Trdrop, plus aliased edges and some softness. IGN did not have early access, so this
          covers only the opening of the game (<Ext href="https://za.ign.com/grand-theft-auto-vi/245779/gta-6-xbox-series-s-performance-how-does-the-weakest-console-handle-the-biggest-game-of-all-time">IGN</Ext>).
        </li>
        <li>
          <Lead>Xbox Series X:</Lead> we have not found a published frame-rate or image-quality test yet. Rockstar&rsquo;s statement puts it at the same 1440p base and 30fps target as the base PS5. That is a spec, not a measurement.
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
        <Source href="https://www.digitalfoundry.net/reviews/grand-theft-auto-6-a-landmark-achievement-that-redefines-a-console-generation" label="Digital Foundry review (PlayStation)" kind="Technical review" />
        <Source href="https://za.ign.com/grand-theft-auto-vi/245779/gta-6-xbox-series-s-performance-how-does-the-weakest-console-handle-the-biggest-game-of-all-time" label="IGN: Xbox Series S performance, 18 Nov 2026" kind="Reputable outlet, first section only" />
        <Source href="https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/" label="Xbox Wire, 10 Nov 2026" kind="Official, platform holder" />
      </Sources>
    </NewsLayout>
  );
}
