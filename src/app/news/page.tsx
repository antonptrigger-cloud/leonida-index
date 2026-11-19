import Link from "next/link";
import { metaFor, absoluteUrl } from "@/lib/seo/site";
import { JsonLd, PageSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageBackdrop } from "@/components/PageBackdrop";
import { SectionTitle } from "@/components/hub/SectionTitle";
import { JumpNav } from "@/components/hub/JumpNav";
import { Archive, LeadCard, LiveStrip, Ticker, TopList } from "@/components/news/NewsHub";
import { buildNewsIndex, clock, shortDate } from "@/lib/news/hub";
import type { HubAccent as Accent } from "@/components/hub/TapeCard";

export const metadata = metaFor("/news");

/** The Archive groups (Today / This week / Earlier) and the "Updated" badges depend on the date, so refresh the static page every 10 minutes. */
export const revalidate = 600;

export default function Page() {
  const now = new Date();
  const idx = buildNewsIndex(now);
  const { lead, top, live, groups } = idx;

  const nav: { id: string; num: string; label: string; accent: Accent }[] = [
    ...(lead ? [{ id: "latest", num: "01", label: "Latest", accent: "pink" as Accent }] : []),
    ...(live.length ? [{ id: "trackers", num: "02", label: "Live trackers", accent: "turq" as Accent }] : []),
    ...(groups.length ? [{ id: "archive", num: "03", label: "Archive", accent: "orange" as Accent }] : []),
  ];

  const ticker = [lead, ...top].filter((e): e is NonNullable<typeof e> => Boolean(e)).map((e) => ({ label: e.tag, text: e.title }));

  // Order shown on the page: latest, top stories, live trackers, archive.
  const ordered = [...(lead ? [lead] : []), ...top, ...live, ...groups.flatMap((g) => g.items)];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GTA 6 news and updates",
    numberOfItems: ordered.length,
    itemListElement: ordered.map((e, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(e.href), name: e.title })),
  };

  return (
    <div className="gh-hub nh-hub pb-16x">
      <PageSchema path="/news" breadcrumbs={false} />
      <JsonLd data={itemList} />
      <div>
        <Breadcrumbs path="/news" />

        {/* ---------- Hero ---------- */}
        <section className="relative isolate pb-6x pt-6x md:pt-10x" aria-labelledby="news-title">
          <PageBackdrop id="skyline" dim="strong" fadeTop />
          <p className="nh-onair mb-4x">
            <i aria-hidden /> Launch week · Live coverage
          </p>
          <p className="vc-kicker mb-4x">News</p>
          <h1 id="news-title" className="vc-heading text-[clamp(3.5rem,11vw,7.5rem)]">
            Launch news
          </h1>
          <p className="mt-6x max-w-[54ch] text-base leading-relaxed text-ink-2 md:text-lg">
            Fresh GTA 6 reports up front, the trackers we keep updating, and everything older tidied into the archive. Every article links its sources and labels what is unconfirmed.
          </p>
          <dl className="nh-stats mt-10x">
            <div>
              <dt>Stories</dt>
              <dd>{idx.total}</dd>
            </div>
            <div>
              <dt>Live trackers</dt>
              <dd>{live.length}</dd>
            </div>
            {idx.latestUpdate ? (
              <div>
                <dt>Last update</dt>
                <dd>
                  {clock(idx.latestUpdate)} <small>AEST · {shortDate(idx.latestUpdate)}</small>
                </dd>
              </div>
            ) : null}
          </dl>
          <Ticker items={ticker} />
        </section>

        <JumpNav items={nav} />
      </div>

      {/* ---------- 01 Latest ---------- */}
      {lead ? (
        <section id="latest" className="gh-anchor" aria-labelledby="latest-title">
          <SectionTitle id="latest-title" num="01" kicker="Latest" title="Fresh off the wire">
            The newest report first, then the stories most worth your time today.
          </SectionTitle>
          <div className="grid gap-10x md:grid-cols-12 md:gap-gutter">
            <div className="md:col-span-7">
              <LeadCard item={lead} />
            </div>
            {top.length ? (
              <div className="md:col-span-5">
                <h3 className="vc-kicker mb-5x">Top stories</h3>
                <TopList items={top} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ---------- 02 Live trackers ---------- */}
      {live.length ? (
        <section id="trackers" className="gh-anchor" aria-labelledby="trackers-title">
          <SectionTitle id="trackers-title" num="02" kicker="Live trackers" title="Always updating">
            Pages we keep refreshing through launch week. The badge shows when each one last changed.
          </SectionTitle>
          <LiveStrip items={live} now={now} />
        </section>
      ) : null}

      {/* ---------- 03 Archive ---------- */}
      {groups.length ? (
        <section id="archive" className="gh-anchor" aria-labelledby="archive-title">
          <SectionTitle id="archive-title" num="03" kicker="Archive" title="Everything else">
            Explainers, guides and earlier launch coverage, newest first. Filter by topic.
          </SectionTitle>
          <Archive groups={groups} counts={idx.archiveCounts} total={idx.archiveTotal} />
        </section>
      ) : null}

      {/* ---------- Footer band ---------- */}
      <section className="relative overflow-hidden border-y border-pink/25 py-10x" aria-label="About this news desk">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_100%_50%,rgba(255,45,120,0.16),transparent_60%)]" />
        <div className="relative grid items-center gap-6x md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="vc-kicker">How we report</p>
            <p className="vc-display mt-3x text-[clamp(2.2rem,5vw,4rem)] leading-[0.88] text-ink">
              Official facts first. <span className="text-pink">Reports labelled.</span>
              <br />
              <span className="vc-outline">No story spoilers.</span>
            </p>
            <p className="mt-4x max-w-[56ch] text-sm text-muted">Independent fan site. Not affiliated with Rockstar Games or Take-Two Interactive.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4x pl-2x md:col-span-4 md:justify-end">
            <Link href="/guides" className="vc-cta vc-cta--xl">
              Read the guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
