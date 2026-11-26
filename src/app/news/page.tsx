import Link from "next/link";
import { metaFor, absoluteUrl } from "@/lib/seo/site";
import { JsonLd, PageSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageBackdrop } from "@/components/PageBackdrop";
import { SectionTitle } from "@/components/hub/SectionTitle";
import { Archive, LeadCard, LiveStrip, TopList } from "@/components/news/NewsHub";
import { NewsBrowser } from "@/components/news/NewsBrowser";
import { buildNewsIndex, CATEGORIES, clock, shortDate } from "@/lib/news/hub";

export const metadata = metaFor("/news");

/** The Archive groups (Today / This week / Earlier) and the "Updated" badges depend on the date, so refresh the static page every 10 minutes. */
export const revalidate = 600;

export default function Page() {
  const now = new Date();
  const idx = buildNewsIndex(now);
  const { lead, top, live, groups } = idx;

  // Topic chips: every category that has at least one story, with its count.
  const categories = CATEGORIES.map((c) => ({ ...c, count: idx.all.filter((e) => e.category === c.id).length })).filter((c) => c.count > 0);

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
          <PageBackdrop id="skyline" dim="strong" fadeTop priority />
          <p className="vc-kicker mb-4x">News</p>
          <h1 id="news-title" className="vc-heading text-[clamp(3.5rem,11vw,7.5rem)]">
            GTA 6 news
          </h1>
          <p className="mt-6x max-w-[54ch] text-base leading-relaxed text-ink-2 md:text-lg">
            The latest GTA 6 reports, the trackers we keep updating, and every older story in the archive. Search or filter by topic. Every article links its sources and labels what is unconfirmed.
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
                  <time dateTime={idx.latestUpdate}>
                    {shortDate(idx.latestUpdate)} <small>{clock(idx.latestUpdate)} AEST</small>
                  </time>
                </dd>
              </div>
            ) : null}
          </dl>
        </section>

      </div>

      <NewsBrowser entries={idx.all} categories={categories}>

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
            Explainers, guides and earlier launch coverage, newest first. Use the search and topic filters above to narrow it down.
          </SectionTitle>
          <Archive groups={groups} />
        </section>
      ) : null}

      </NewsBrowser>

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
