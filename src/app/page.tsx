import Image from "next/image";
import Link from "next/link";
import { PageBackdrop } from "@/components/PageBackdrop";
import { Palm } from "@/components/Palm";
import { ShotImage } from "@/components/media/ShotImage";
import { SHOT_CREDIT, type ShotId } from "@/lib/media/shots";
import { MissionSearch } from "@/components/guides/MissionSearch";
import { HomeLocationSearch } from "@/components/home/HomeLocationSearch";
import { WhatsNew } from "@/components/WhatsNew";
import { buildMissionSearchIndex } from "@/lib/guides/mission-search";
import { TILES } from "@/lib/map/config";
import { SEED_PINS } from "@/lib/map/seed";
import { toPublicPin } from "@/lib/map/types";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import "@/components/cards/media-card.css";

const MISSION_SEARCH_ITEMS = buildMissionSearchIndex();
const HOME_PINS = SEED_PINS.filter((p) => !p.spoiler).map(toPublicPin);

export const metadata = metaFor("/");

const GUIDE = [
  { href: "/news/release-date", title: "What’s confirmed", body: "19 Nov 2026 · PS5 and Xbox Series X|S" },
  { href: "/guides/wanted", title: "Wanted system", body: "Six stars, witnesses and splitting up" },
  { href: "/database", title: "Database", body: "Characters, vehicles, weapons and radio" },
  { href: "/guides/beginner", title: "Beginner guide", body: "Your first hours and the character swap" },
  { href: "/tools/edition-compare", title: "Editions", body: "Standard vs Ultimate, side by side" },
];

type Destination = {
  slug: ShotId;
  name: string;
  tagline: string;
  /** grid placement */
  cell: string;
  nameSize: string;
  sizes: string;
};

const SMALL = "(min-width: 768px) 360px, 50vw";

const DESTINATIONS: Destination[] = [
  {
    slug: "vice-city",
    name: "Vice City",
    tagline: "Sun and fun capital. Art deco, beaches, the port.",
    cell: "col-span-2 row-span-2 md:col-span-4",
    nameSize: "text-[clamp(3rem,7vw,5rem)]",
    sizes: "(min-width: 768px) 740px, 100vw",
  },
  { slug: "leonida-keys", name: "Leonida Keys", tagline: "Islands, boats, beach bars and scuba.", cell: "col-span-2 md:col-span-2", nameSize: "text-[2rem] md:text-[2.25rem]", sizes: "(min-width: 768px) 360px, 100vw" },
  { slug: "grassrivers", name: "Grassrivers", tagline: "Mangroves, airboats and gators.", cell: "col-span-1 md:col-span-2", nameSize: "text-[1.6rem] md:text-[2.25rem]", sizes: SMALL },
  { slug: "port-gellhorn", name: "Port Gellhorn", tagline: "A faded resort on the west coast.", cell: "col-span-1 md:col-span-2", nameSize: "text-[1.6rem] md:text-[2.25rem]", sizes: SMALL },
  { slug: "ambrosia", name: "Ambrosia", tagline: "Sugar refinery country. Bikers, old-school values.", cell: "col-span-1 md:col-span-2", nameSize: "text-[1.6rem] md:text-[2.25rem]", sizes: SMALL },
  { slug: "mount-kalaga", name: "Mount Kalaga", tagline: "National park. Hunting, fishing, trails.", cell: "col-span-1 md:col-span-2", nameSize: "text-[1.6rem] md:text-[2.25rem]", sizes: SMALL },
];

function SectionTitle({ num, kicker, title, children }: { num: string; kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10x flex flex-col gap-4x md:flex-row md:items-end md:justify-between">
      <div className="vc-section-title">
        <span data-num aria-hidden>
          {num}
        </span>
        <div>
          <p className="vc-kicker">{kicker}</p>
          <h2 className="vc-heading mt-2x text-[clamp(3rem,7vw,5.25rem)]">{title}</h2>
        </div>
      </div>
      {children ? <p className="max-w-[32ch] text-sm leading-relaxed text-muted md:text-right">{children}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-24x pb-16x">
      <PageSchema path="/" />
      {/* ---------- Hero: split, left-aligned headline, official photo frame ---------- */}
      <section className="relative isolate -mt-10x grid items-center gap-10x pt-[3.5rem] md:grid-cols-12 md:gap-0 md:pt-[5rem]">
        <PageBackdrop id="car" dim="strong" priority credit={false} />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <Palm className="absolute -left-24 -top-6 h-[110%] w-auto text-pink opacity-[0.06]" />
        </div>
        <div className="relative z-10 md:col-span-7">
          <p className="vc-kicker">The unofficial field guide<span className="hidden sm:inline">&nbsp;· Issue 01</span></p>
          <h1 className="mt-6x">
            <span className="vc-display block text-[clamp(1.5rem,3.4vw,2.4rem)] leading-none tracking-[0.12em] text-ink-2">
              Welcome to{" "}
            </span>
            <span className="vc-heading -ml-1 block text-[clamp(5.75rem,29vw,13rem)]">Leonida</span>
            <span className="sr-only">: GTA 6 interactive map, guides and secrets</span>
          </h1>
          <p className="mt-6x max-w-[36ch] text-[0.95rem] leading-relaxed text-muted">
            Map, guides, database and tools for Vice City and the state of Leonida.
            Launched <span className="font-semibold text-ink">19 November 2026</span>.
          </p>
          <div className="mt-10x flex flex-wrap items-center gap-x-10x gap-y-6x pl-2x">
            <Link href="/map" className="vc-cta vc-cta--xl">
              Open the map <span aria-hidden>→</span>
            </Link>
            <Link href="/news/release-date" className="vc-btn-ghost">
              What’s confirmed
            </Link>
          </div>
          <dl className="mt-10x grid max-w-md grid-cols-3 divide-x divide-pink/30 border-y border-pink/20">
            {[
              ["06", "Regions"],
              ["02", "Leads"],
              ["19.11", "Launch"],
            ].map(([n, l]) => (
              <div key={l} className="px-4x py-3x first:pl-0">
                <dt className="sr-only">{l}</dt>
                <dd className="vc-display text-[2.4rem] leading-none text-ink">{n}</dd>
                <dd className="mt-1x text-[0.65rem] font-bold uppercase tracking-[0.3em] text-turq">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative px-2x pb-6x md:col-span-5 md:-ml-10x md:px-0">
          <Link href="/map/leonida-keys" className="hm-frame group block">
            <span className="hm-frame__img">
              <ShotImage id="leonida-keys" sizes="(min-width: 768px) 440px, 100vw" />
            </span>
            <span className="hm-frame__cap">
              <strong>Leonida Keys</strong>
              <span>Images {SHOT_CREDIT}</span>
            </span>
          </Link>
        </div>
      </section>

      {/* ---------- Quick search: missions and locations (no map bundle) ---------- */}
      <section aria-labelledby="home-find">
        <h2 id="home-find" className="sr-only">Find a mission or location</h2>
        <div className="grid gap-10x md:grid-cols-2 md:gap-gutter">
          <div>
            <h3 className="vc-display text-3xl text-ink">Find a mission</h3>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Search by name, or by chapter and number, such as &ldquo;ch3 m22&rdquo;. Matching names appear in the results.
            </p>
            <div className="mt-6x">
              <MissionSearch items={MISSION_SEARCH_ITEMS} />
            </div>
            <p className="mt-4x text-sm">
              <Link href="/guides/missions" className="text-orange hover:text-pink">All missions in order</Link>
            </p>
          </div>
          <div>
            <h3 className="vc-display text-3xl text-ink">Find a location</h3>
            <p className="mt-2x max-w-2xl text-sm text-muted">
              Search pins, regions and districts. Pick a result to open it on the map.
            </p>
            <div className="mt-6x">
              <HomeLocationSearch pins={HOME_PINS} />
            </div>
            <p className="mt-4x text-sm">
              <Link href="/map" className="text-orange hover:text-pink">Open the map</Link>
            </p>
          </div>
        </div>
      </section>

      <WhatsNew />

      {/* ---------- Field guide: one feature + a magazine index ---------- */}
      <section>
        <SectionTitle num="01" kicker="Start here" title="The field guide">
          Guides, the map and what’s confirmed, checked against official sources.
        </SectionTitle>
        <div className="grid gap-10x md:grid-cols-12 md:gap-gutter">
          <Link href="/map" className="vc-cut group block md:col-span-7" style={{ ["--cut" as string]: "28px" }}>
            <div className="relative overflow-hidden">
              <Image
                src={TILES.preview.url}
                width={TILES.preview.width}
                height={TILES.preview.height}
                alt="Illustrated fan map of Leonida"
                className="aspect-[16/10] w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1152px) 640px, (min-width: 768px) 56vw, 100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(10,10,11,0.95))]" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(0,0,0,0.18)_0_1px,transparent_1px_3px)]" />
              <span className="absolute left-6x top-6x bg-pink px-2x py-1x text-[0.65rem] font-extrabold uppercase tracking-[0.25em] text-bg">
                Live · Community map
              </span>
            </div>
            <div className="relative -mt-16x px-6x pb-6x">
              <h3 className="vc-display text-[clamp(2.75rem,6vw,4.25rem)] leading-[0.85] text-ink">
                Open the map
              </h3>
              <p className="mt-2x max-w-[44ch] text-sm leading-relaxed text-muted">
                Six regions, official landmarks and community pins. Mark a spot and your gamer tag gets the credit.
              </p>
              <span className="mt-4x inline-flex items-center gap-2x text-xs font-bold uppercase tracking-[0.25em] text-orange transition-[gap] duration-300 group-hover:gap-4x">
                Enter <span aria-hidden>→</span>
              </span>
            </div>
          </Link>

          <ol className="flex flex-col border-t border-pink/20 md:col-span-5">
            {GUIDE.map((g, i) => (
              <li key={g.href}>
                <Link href={g.href} className="vc-index-row">
                  <span className="vc-index-row__num">{String(i + 2).padStart(2, "0")}</span>
                  <span className="relative">
                    <span className="vc-display block text-[1.75rem] leading-none text-ink">{g.title}</span>
                    <span className="mt-1x block text-[0.8rem] text-muted">{g.body}</span>
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

      {/* ---------- Destinations: travel-poster bento ---------- */}
      <section>
        <SectionTitle num="02" kicker="Destinations" title="Six regions, one state">
          Pick a region. Each one has a guide and its own layer on the map.
        </SectionTitle>
        <div className="grid auto-rows-[11rem] grid-cols-2 gap-3x md:auto-rows-[13rem] md:grid-cols-6 md:gap-4x">
          {DESTINATIONS.map((d, i) => (
            <div key={d.slug} className={d.cell}>
              <Link href={`/map/${d.slug}`} className="hm-region group">
                <span className="hm-region__img">
                  <ShotImage id={d.slug} sizes={d.sizes} />
                </span>
                <span className={`hm-region__name ${d.nameSize}`}>{d.name}</span>
                <span className={`hm-region__tag ${i === 0 ? "md:text-[0.95rem]" : ""}`}>{d.tagline}</span>
                {i === 0 ? (
                  <span className="hm-region__go">
                    Explore Vice City <span aria-hidden>→</span>
                  </span>
                ) : null}
              </Link>
            </div>
          ))}
        </div>
        <p className="mc-credit">Screenshots {SHOT_CREDIT}</p>
      </section>

      {/* ---------- Community call to action ---------- */}
      <section className="relative overflow-hidden border-y border-pink/25 py-10x">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_100%_50%,rgba(255,45,120,0.16),transparent_60%)]" />
        <div className="relative grid items-center gap-6x md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="vc-kicker">Community map</p>
            <p className="vc-display mt-3x text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.88] text-ink">
              Found something? <span className="text-pink">Mark it.</span>
              <br />
              <span className="vc-outline">First marked gets the credit.</span>
            </p>
          </div>
          <div className="pl-2x md:col-span-4 md:justify-self-end">
            <Link href="/map" className="vc-cta vc-cta--xl">
              Submit a location
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
