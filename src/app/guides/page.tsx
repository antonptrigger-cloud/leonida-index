import Link from "next/link";
import { metaFor, ROUTES, absoluteUrl } from "@/lib/seo/site";
import { JsonLd, PageSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTitle } from "@/components/hub/SectionTitle";
import { MediaCard, MediaGrid, MediaRow } from "@/components/cards/MediaCard";
import { JumpNav } from "@/components/hub/JumpNav";
import "@/components/hub/hub.css";
import { PageBackdrop } from "@/components/PageBackdrop";
import { MISSIONS, missionChapter, missionPath } from "@/lib/guides/missions";
import { STORY_CHAPTERS, STORY_TOTAL } from "@/lib/guides/story";
import { HUB_SECTIONS, START_FEATURE, START_SIDE, hubGuides, type Accent, type HubGuide } from "@/lib/guides/hub";

export const metadata = metaFor("/guides");

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");

export default function Guides() {
  const all = hubGuides();
  const byHref = new Map(all.map((g) => [g.href, g]));
  const feature = byHref.get(START_FEATURE);
  const side = START_SIDE.map((h) => byHref.get(h)).filter((g): g is HubGuide => Boolean(g));
  const money = all.filter((g) => g.section === "money");
  const systems = all.filter((g) => g.section === "systems");

  const chapter1 = STORY_CHAPTERS[0];
  const lockedChapters = STORY_CHAPTERS.slice(1);
  // Hidden-title missions are matched by position in Chapter 1, never by name.
  const guideFor = (title: string | null, index: number) =>
    title ? MISSIONS.find((x) => !x.hidden && norm(x.name) === norm(title)) : MISSIONS.find((x) => x.hidden && missionChapter(x) === 1 && x.order === index + 1);
  const live = chapter1.missions.filter((t, i) => guideFor(t.title, i)).length;

  const nav = [
    { id: "start", num: "01", label: "Start here", accent: "pink" as Accent },
    { id: "story", num: "02", label: "Story missions", accent: "pink" as Accent },
    ...(money.length ? [{ id: "progression", num: "03", label: "Money & progression", accent: "orange" as Accent }] : []),
    ...(systems.length ? [{ id: "systems", num: "04", label: "Systems & activities", accent: "turq" as Accent }] : []),
  ];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GTA 6 guides",
    numberOfItems: all.length,
    itemListElement: all.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(g.href),
      name: ROUTES[g.href]?.title ?? g.title,
    })),
  };

  return (
    <div className="gh-hub pb-16x">
      <PageSchema path="/guides" breadcrumbs={false} />
      <JsonLd data={itemList} />
      <div>
        <Breadcrumbs path="/guides" />

        {/* ---------- Hero ---------- */}
        <section className="relative isolate pb-10x pt-6x md:pt-10x" aria-labelledby="guides-title">
          <PageBackdrop id="boat" dim="strong" fadeTop priority />
          <p className="vc-kicker mb-4x">Guides</p>
          <h1 id="guides-title" className="vc-heading text-[clamp(3.5rem,11vw,7.5rem)]">
            How to play Leonida
          </h1>
          <p className="mt-6x max-w-[52ch] text-base leading-relaxed text-ink-2 md:text-lg">
            Our case files on Grand Theft Auto VI: every mission in order, the money and the trophies, and how the wanted system really works. Spoilers stay behind a blur until you ask.
          </p>
          <dl className="gh-stats mt-10x">
            <div>
              <dt>Guides</dt>
              <dd>{all.length}</dd>
            </div>
            <div>
              <dt>Story missions</dt>
              <dd>{STORY_TOTAL}</dd>
            </div>
            <div>
              <dt>Walkthroughs live</dt>
              <dd>{MISSIONS.length}</dd>
            </div>
          </dl>
        </section>

        {/* ---------- Jump bar ---------- */}
        <JumpNav items={nav} />
      </div>

      {/* ---------- 01 Start here ---------- */}
      <section id="start" className="gh-anchor" aria-labelledby="start-title">
        <SectionTitle id="start-title" num="01" kicker="Start here" title="The case files">
          New to Leonida? Open the big one first, then work down the list.
        </SectionTitle>
        <div className="grid gap-10x md:grid-cols-12 md:gap-gutter">
          {feature ? (
            <div className="gh-start-feature md:col-span-7">
              <MediaCard
                feature
                headingLevel={3}
                sizes="(min-width: 1152px) 660px, (min-width: 768px) 58vw, 60vw"
                item={{
                  href: feature.href,
                  title: feature.title,
                  kicker: `Most read · ${feature.tag}`,
                  blurb: `${feature.blurb} ${STORY_TOTAL} missions across ${STORY_CHAPTERS.length} chapters, ${live} of ${chapter1.missions.length} Chapter 1 walkthroughs live.`,
                }}
              />
            </div>
          ) : null}

          <ol className="flex flex-col border-t border-white/10 md:col-span-5">
            {side.map((g) => (
              <li key={g.href}>
                <MediaRow item={{ href: g.href, title: g.title, kicker: g.tag, blurb: g.blurb }} />
              </li>
            ))}
          </ol>
        </div>
        <p className="mc-credit">Screenshots © Rockstar Games</p>
      </section>

      {/* ---------- 02 Story missions ---------- */}
      <section id="story" className="gh-anchor" aria-labelledby="story-title">
        <SectionTitle id="story-title" num="02" kicker="Story missions" title="Five chapters">
          Chapter 1 is open. The rest stay blurred until you are ready.
        </SectionTitle>
        <div className="grid gap-6x md:grid-cols-12 md:gap-gutter">
          <article className="gh-file md:col-span-7" data-accent="pink">
            <div className="gh-file__body">
              <header className="gh-card__strip">
                <span className="gh-card__tag">Chapter 01 · Open</span>
                <span className="gh-card__file" aria-hidden>
                  {live}/{chapter1.missions.length} live
                </span>
              </header>
              <h3 className="vc-display gh-card__title">{chapter1.name}</h3>
              <p className="gh-card__blurb">
                {chapter1.missions.length} missions. Lit titles have a walkthrough; the rest are on the way.
              </p>
              <ol className="gh-chips">
                {chapter1.missions.map((t, i) => {
                  const guide = guideFor(t.title, i);
                  const n = String(i + 1).padStart(2, "0");
                  if (!t.title) {
                    return guide ? (
                      <li key={i}>
                        <Link href={missionPath(guide.slug)} className="gh-chip" data-state="live">
                          <span aria-hidden>{n}</span> Hidden title
                        </Link>
                      </li>
                    ) : (
                      <li key={i} className="gh-chip" data-state="hidden">
                        <span aria-hidden>{n}</span> Hidden title
                      </li>
                    );
                  }
                  return guide ? (
                    <li key={i}>
                      <Link href={missionPath(guide.slug)} className="gh-chip" data-state="live">
                        <span aria-hidden>{n}</span> {t.title}
                      </Link>
                    </li>
                  ) : (
                    <li key={i} className="gh-chip" data-state="soon">
                      <span aria-hidden>{n}</span> {t.title}
                    </li>
                  );
                })}
              </ol>
              <Link href="/guides/missions" className="gh-card__go mt-6x">
                See every chapter <span aria-hidden>→</span>
              </Link>
            </div>
          </article>

          <ul className="grid gap-6x sm:grid-cols-2 md:col-span-5 md:gap-gutter">
            {lockedChapters.map((c) => (
              <li key={c.number} className="flex">
                <Link href="/guides/missions" className="gh-card gh-locked" data-accent="pink" aria-label={`Chapter ${c.number}, ${c.missions.length} missions, contains spoilers. Open the mission list.`}>
                  <span className="gh-card__body">
                    <span className="gh-card__strip">
                      <span className="gh-card__tag">Chapter {String(c.number).padStart(2, "0")}</span>
                    </span>
                    <span className="gh-locked__lines" aria-hidden>
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="vc-display gh-card__title">{c.missions.length} missions</span>
                    <span className="gh-card__blurb">Spoilers. Titles stay hidden here.</span>
                    <span className="gh-lock" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 03 Money & progression ---------- */}
      {money.length ? (
        <section id="progression" className="gh-anchor" aria-labelledby="progression-title">
          <SectionTitle id="progression-title" num="03" kicker={HUB_SECTIONS[1].kicker} title={HUB_SECTIONS[1].title}>
            {HUB_SECTIONS[1].blurb}
          </SectionTitle>
          <MediaGrid cols={money.length >= 4 ? 4 : 3} items={money.map((g) => ({ href: g.href, title: g.title, kicker: g.tag, blurb: g.blurb }))} />
        </section>
      ) : null}

      {/* ---------- 04 Systems & activities ---------- */}
      {systems.length ? (
        <section id="systems" className="gh-anchor" aria-labelledby="systems-title">
          <SectionTitle id="systems-title" num="04" kicker={HUB_SECTIONS[2].kicker} title={HUB_SECTIONS[2].title}>
            {HUB_SECTIONS[2].blurb}
          </SectionTitle>
          <MediaGrid cols={3} items={systems.map((g) => ({ href: g.href, title: g.title, kicker: g.tag, blurb: g.blurb }))} />
        </section>
      ) : null}

      {/* ---------- Community call to action ---------- */}
      <section className="relative overflow-hidden border-y border-pink/25 py-10x" aria-label="Community map">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_100%_50%,rgba(255,45,120,0.16),transparent_60%)]" />
        <div className="relative grid items-center gap-6x md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="vc-kicker">Community map</p>
            <p className="vc-display mt-3x text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.88] text-ink">
              Guide missing a spot? <span className="text-pink">Pin it.</span>
              <br />
              <span className="vc-outline">Your tag gets the credit.</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4x pl-2x md:col-span-4 md:justify-end">
            <Link href="/map" className="vc-cta vc-cta--xl">
              Submit a location
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
