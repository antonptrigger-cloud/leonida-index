import Image from "next/image";
import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Related } from "@/components/Related";
import { SECRET_ENTRIES, SECRETS_VERIFIED_LABEL } from "@/lib/secrets/entries";

export const metadata = metaFor("/secrets");

export default function SecretsHub() {
  return (
    <div>
      <PageSchema path="/secrets" breadcrumbs={false} />
      <Breadcrumbs path="/secrets" />
      <PageHeader
        backdrop="pier"
        dim="light"
        kicker="Secrets"
        title="GTA 6 Secrets & Easter Eggs"
        verified={SECRETS_VERIFIED_LABEL}
        source="GameSpot, PowerPyx, PC Gamer, Polygon, GamesRadar+, Push Square"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <div className="max-w-2xl space-y-4x text-lg text-ink-2">
            <p>
              The secrets pages were an empty shell at launch. They now collect the finds main outlets have actually described: the Kelly County UFO, the Skunk Ape, a literal Easter egg on Vice City&apos;s tallest tower, the three strip clubs, money tricks, collectibles and a handful of hidden vehicles.
            </p>
            <p>
              Every entry has a short spoiler-free summary, how to find it, a chapter note where the outlets give one, a source list, and a link onto our map. Story payoffs stay behind a spoiler toggle. Nothing here invents a location, and we do not use leak material.
            </p>
          </div>

          <figure className="mt-10x overflow-hidden">
            <Image
              src="/secrets/easter-eggs-vice-city-08.webp"
              alt="Official GTA 6 screenshot of Vice City at night, with lit arenas, a ferris wheel and a tall tower on the skyline. © Rockstar Games"
              width={1600}
              height={900}
              sizes="(min-width: 1024px) 42rem, 100vw"
              className="h-auto w-full rounded-sm object-cover"
              priority
            />
            <figcaption className="mt-2x text-xs text-muted">Official screenshot (Vice City 08). © Rockstar Games</figcaption>
          </figure>

          <ul className="mt-16x grid gap-6x">
            {SECRET_ENTRIES.map((e) => (
              <li key={e.slug}>
                <Link href={e.path} className="vc-card group grid overflow-hidden sm:grid-cols-[minmax(0,16rem)_1fr]">
                  <Image
                    src={e.image.src}
                    alt=""
                    width={640}
                    height={360}
                    sizes="(min-width: 640px) 16rem, 100vw"
                    className="h-44 w-full object-cover sm:h-full"
                  />
                  <div className="p-5x">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">{e.cardTitle}</p>
                    <h2 className="vc-display mt-1x text-3xl leading-tight text-ink group-hover:text-pink">{e.title}</h2>
                    <p className="mt-3x text-ink-2">{e.blurb}</p>
                    <p className="mt-3x text-sm text-orange">Open the guide</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <section aria-labelledby="submit" className="mt-16x">
            <h2 id="submit" className="vc-display text-3xl text-ink">
              Found something we missed?
            </h2>
            <p className="mt-4x max-w-2xl text-ink-2">
              Pin it on the{" "}
              <Link href="/map" className="text-orange hover:text-pink">
                community map
              </Link>{" "}
              and we will check it against a main outlet before it lands on this list. We only publish what Rockstar, PC Gamer, GameSpot, IGN, VGC, PowerPyx, Push Square, GamesRadar+, Polygon, Digital Foundry or Kotaku have described.
            </p>
          </section>
        </div>
      </div>

      <Related path="/secrets" />
    </div>
  );
}
