import Link from "next/link";
import { metaFor, ROUTES, absoluteUrl } from "@/lib/seo/site";
import { JsonLd, PageSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionTitle } from "@/components/hub/SectionTitle";
import { TapeCard } from "@/components/hub/TapeCard";
import { HubGrid } from "@/components/hub/HubGrid";
import { JumpNav } from "@/components/hub/JumpNav";
import "@/components/hub/hub.css";
import { PageBackdrop } from "@/components/PageBackdrop";
import { MISSIONS, missionPath } from "@/lib/guides/missions";
import { STORY_CHAPTERS, STORY_TOTAL } from "@/lib/guides/story";
import { HUB_SECTIONS, START_FEATURE, START_SIDE, hubGuides, type Accent, type HubGuide } from "@/lib/guides/hub";

export const metadata = metaFor("/guides");

const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, "");

function Cassette({ label, tracks }: { label: string; tracks: number }) {
  return (
    <span className="gh-cassette" aria-hidden>
      <span className="gh-cassette__label">
        <em>Side A · {tracks} tracks</em>
        <strong>{label}</strong>
      </span>
      <span className="gh-cassette__deck">
        <i />
        <b />
        <i />
      </span>
    </span>
  );
}

export default function Guides() {
  const all = hubGuides();
  const byHref = new Map(all.map((g) => [g.href, g]));
  const feature = byHref.get(START_FEATURE);
  const side = START_SIDE.map((h) => byHref.get(h)).filter((g): g is HubGuide => Boolean(g));
  const money = all.filter((g) => g.section === "money");
  const systems = all.filter((g) => g.section === "systems");

  const chapter1 = STORY_CHAPTERS[0];
  const lockedChapters = STORY_CHAPTERS.slice(1);
  const guideFor = (title: string | null) => (title ? MISSIONS.find((x) => norm(x.name) === norm(title)) : undefined);
  const live = chapter1.missions.filter((t) => guideFor(t.title)).length;

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
          <PageBackdrop id="boat" dim="strong" fadeTop />
          <p className="gh-osd" aria-hidden>
            <span>
              <i /> Play
            </span>
            <span className="gh-osd__rec">
              <i /> Rec
            </span>
          </p>
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
            <Link href={feature.href} className="gh-feature md:col-span-7" data-accent="pink">
              <span className="gh-feature__body">
                <span className="gh-feature__art">
                  <Cassette label="All missions" tracks={STORY_TOTAL} />
                  <span className="gh-feature__badge">Most read · {feature.tag}</span>
                </span>
                <span className="gh-feature__copy">
                  <span className="vc-display block text-[clamp(2.75rem,6vw,4.25rem)] leading-[0.85] text-ink">{feature.title}</span>
                  <span className="mt-2x block max-w-[46ch] text-sm leading-relaxed text-muted">{feature.blurb}</span>
                  <span className="gh-progress mt-4x" aria-hidden>
                    {STORY_CHAPTERS.map((c) => (
                      <span key={c.number} data-live={c.number === 1} style={{ flexGrow: c.missions.length }} />
                    ))}
                  </span>
                  <span className="mt-2x block text-xs text-faint">
                    {STORY_TOTAL} missions · {STORY_CHAPTERS.length} chapters · {live} of {chapter1.missions.length} Chapter 1 walkthroughs live
                  </span>
                  <span className="gh-card__go mt-4x">
                    Open the list <span aria-hidden>→</span>
                  </span>
                </span>
              </span>
            </Link>
          ) : null}

          <ol className="flex flex-col border-t border-pink/20 md:col-span-5">
            {side.map((g, i) => (
              <li key={g.href}>
                <Link href={g.href} className="vc-index-row gh-row" data-accent={g.accent}>
                  <span className="vc-index-row__num">{String(i + 2).padStart(2, "0")}</span>
                  <span className="relative">
                    <span className="gh-pill">{g.tag}</span>
                    <span className="vc-display mt-1x block text-[1.75rem] leading-none text-ink">{g.title}</span>
                    <span className="mt-1x block text-[0.8rem] text-muted">{g.blurb}</span>
                  </span>
                  <span className="vc-index-row__arrow relative text-xl" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
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
                  const guide = guideFor(t.title);
                  const n = String(i + 1).padStart(2, "0");
                  if (!t.title) {
                    return (
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
          <HubGrid count={money.length}>
            {money.map((g, i) => (
              <li key={g.href}>
                <TapeCard href={g.href} title={g.title} blurb={g.blurb} tag={g.tag} accent={g.accent} file={i + 1} tilt={i % 2 ? 1 : -1} />
              </li>
            ))}
          </HubGrid>
        </section>
      ) : null}

      {/* ---------- 04 Systems & activities ---------- */}
      {systems.length ? (
        <section id="systems" className="gh-anchor" aria-labelledby="systems-title">
          <SectionTitle id="systems-title" num="04" kicker={HUB_SECTIONS[2].kicker} title={HUB_SECTIONS[2].title}>
            {HUB_SECTIONS[2].blurb}
          </SectionTitle>
          <HubGrid count={systems.length} stagger>
            {systems.map((g, i) => (
              <li key={g.href}>
                <TapeCard href={g.href} title={g.title} blurb={g.blurb} tag={g.tag} accent={g.accent} file={i + 1} tilt={i % 2 ? 1 : -1} />
              </li>
            ))}
          </HubGrid>
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
