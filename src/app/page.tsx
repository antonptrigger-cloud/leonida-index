import Link from "next/link";

const JOBS = [
  { href: "/map", title: "Open map", body: "Six regions of Leonida" },
  { href: "/tools/edition-compare", title: "Editions", body: "Standard vs Ultimate" },
  { href: "/guides/wanted", title: "Wanted system", body: "Six stars, witnesses, split-up" },
  { href: "/database/characters", title: "Characters", body: "Lucia, Jason, and the rest" },
  { href: "/guides/beginner", title: "Beginner", body: "First hours, character swap" },
  { href: "/news/release-date", title: "What’s confirmed", body: "19 Nov 2026, PS5 / Xbox" },
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
      <section>
        <p className="text-xs uppercase tracking-[0.25em] text-[#ffd36b]">GTA VI fan utility</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Leonida Vice Guide</h1>
        <p className="mt-3 max-w-xl text-[#9a958c]">
          Map, guides, database and tools for Vice City and the state of Leonida.
          Launch 19 November 2026.
        </p>
      </section>

      <section className="grid gap-3 sm:grid-cols-2">
        {JOBS.map((job) => (
          <Link
            key={job.href}
            href={job.href}
            className="rounded-lg border border-[#2a2a2e] bg-[#161618] p-4 hover:border-[#ff2d7b]"
          >
            <h2 className="font-medium text-[#f4f1ea]">{job.title}</h2>
            <p className="mt-1 text-sm text-[#9a958c]">{job.body}</p>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="mb-3 text-sm uppercase tracking-widest text-[#9a958c]">Regions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {REGIONS.map((r) => (
            <Link
              key={r.slug}
              href={`/map/${r.slug}`}
              className="rounded-lg border border-[#2a2a2e] px-3 py-4 text-center hover:border-[#ffd36b]"
            >
              {r.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}