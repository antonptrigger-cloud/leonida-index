import Link from "next/link";
import { Palm } from "@/components/Palm";

const JOBS = [
  { href: "/map", title: "Open map", body: "Six regions of Leonida", accent: "#ff2d78" },
  { href: "/tools/edition-compare", title: "Editions", body: "Standard vs Ultimate", accent: "#00d4ff" },
  { href: "/guides/wanted", title: "Wanted system", body: "Six stars, witnesses, split-up", accent: "#ff8c42" },
  { href: "/database/characters", title: "Characters", body: "Lucia, Jason, and the rest", accent: "#00e5cc" },
  { href: "/guides/beginner", title: "Beginner", body: "First hours, character swap", accent: "#ff8c42" },
  { href: "/news/release-date", title: "What’s confirmed", body: "19 Nov 2026, PS5 / Xbox", accent: "#ff2d78" },
];

const REGIONS = [
  { slug: "vice-city", name: "Vice City" },
  { slug: "leonida-keys", name: "Leonida Keys" },
  { slug: "grassrivers", name: "Grassrivers" },
  { slug: "port-gellhorn", name: "Port Gellhorn" },
  { slug: "ambrosia", name: "Ambrosia" },
  { slug: "mount-kalaga", name: "Mount Kalaga" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <section className="vc-hero -mx-4 -mt-10 px-5 pb-32 pt-12 sm:mx-0 sm:mt-0 sm:rounded-2xl sm:border sm:border-pink/30 sm:px-10 sm:pb-40 sm:pt-16">
        <div className="vc-sun" aria-hidden />
        <div className="vc-grid" aria-hidden />
        <Palm className="vc-palm left-[-22px] h-40 w-auto opacity-90 sm:left-[-6px] sm:h-52" />
        <Palm flip className="vc-palm right-[-14px] h-40 w-auto sm:right-4 sm:h-56" />
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-turq">GTA VI fan utility</p>
        <h1 className="vc-heading mt-3 text-6xl sm:text-8xl">
          Leonida
          <br />
          Vice Guide
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-2 sm:text-lg">
          Map, guides, database and tools for Vice City and the state of Leonida.
          Launch <span className="font-semibold text-ink">19 November 2026</span>.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/map" className="vc-btn rounded-md px-5 py-2.5 text-sm uppercase tracking-wider">
            Open the map
          </Link>
          <Link href="/news/release-date" className="vc-btn-ghost rounded-md px-5 py-2.5 text-sm font-semibold uppercase tracking-wider">
            What’s confirmed
          </Link>
        </div>
      </section>

      <section>
        <h2 className="vc-heading mb-4 text-4xl">Start here</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {JOBS.map((job) => (
            <Link key={job.href} href={job.href} className="vc-card group relative overflow-hidden rounded-xl p-4 pl-5">
              <span
                className="absolute inset-y-3 left-0 w-[3px] rounded-r"
                style={{ background: job.accent, boxShadow: `0 0 10px ${job.accent}` }}
                aria-hidden
              />
              <h3 className="vc-display text-2xl leading-none text-ink transition-colors group-hover:text-pink-2">
                {job.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted">{job.body}</p>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-faint transition-all group-hover:translate-x-1 group-hover:text-orange" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="vc-heading mb-4 text-4xl">Regions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {REGIONS.map((r) => (
            <Link
              key={r.slug}
              href={`/map/${r.slug}`}
              className="vc-card vc-display rounded-xl px-3 py-5 text-center text-xl tracking-wider text-ink-2 hover:text-turq"
            >
              {r.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
