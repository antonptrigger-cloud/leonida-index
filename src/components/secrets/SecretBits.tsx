import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/Faq";
import { Spoiler } from "@/components/guides/Spoiler";
import { SourcesList } from "@/components/guides/MissionBits";
import {
  SECRETS_VERIFIED,
  SECRETS_VERIFIED_LABEL,
  type SecretEntry,
  type SecretLink,
} from "@/lib/secrets/entries";

export function OfficialShot({ src, alt, credit }: { src: string; alt: string; credit: string }) {
  return (
    <figure className="mt-8x overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        sizes="(min-width: 1024px) 42rem, 100vw"
        className="h-auto w-full rounded-sm object-cover"
        priority
      />
      <figcaption className="mt-2x text-xs text-muted">{credit}</figcaption>
    </figure>
  );
}

function MapLinks({ primary, more }: { primary: SecretLink; more?: SecretLink[] }) {
  const links = [primary, ...(more ?? [])];
  return (
    <section aria-labelledby="map-links" className="mt-16x">
      <h2 id="map-links" className="vc-display text-3xl text-ink">
        On the map
      </h2>
      <ul className="mt-4x flex max-w-2xl flex-col gap-3x">
        {links.map((l) => (
          <li key={l.href} className="vc-bar">
            <Link href={l.href} className="text-orange hover:text-pink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AlsoSee({ links }: { links: SecretLink[] }) {
  return (
    <section aria-labelledby="also-see" className="mt-16x">
      <h2 id="also-see" className="vc-display text-3xl text-ink">
        Also on the site
      </h2>
      <ul className="mt-4x flex max-w-2xl flex-col gap-3x">
        {links.map((l) => (
          <li key={l.href} className="vc-bar">
            <Link href={l.href} className="text-orange hover:text-pink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SecretArticle({ entry }: { entry: SecretEntry }) {
  return (
    <article>
      <OfficialShot src={entry.image.src} alt={entry.image.alt} credit={entry.image.credit} />

      <div className="mt-8x max-w-2xl space-y-4x text-lg text-ink-2">
        {entry.summary.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          <strong className="text-turq">Confirmed</strong> means at least two main outlets say so.{" "}
          <strong className="text-orange">Reported</strong> means one outlet does, or the outlets disagree, and we name them.
        </p>
      </div>

      <section aria-labelledby="chapter" className="mt-16x">
        <h2 id="chapter" className="vc-display text-3xl text-ink">
          Chapter requirement
        </h2>
        <p className="vc-bar mt-4x max-w-2xl text-ink-2">{entry.chapter}</p>
      </section>

      <section aria-labelledby="how-to-find" className="mt-16x">
        <h2 id="how-to-find" className="vc-display text-3xl text-ink">
          How to find it
        </h2>
        <ol className="mt-4x flex max-w-2xl list-decimal flex-col gap-3x pl-6x text-ink-2 marker:font-bold marker:text-pink">
          {entry.howTo.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {entry.spoilers?.map((block) => (
        <section key={block.label} aria-labelledby="spoilers" className="mt-16x">
          <h2 id="spoilers" className="vc-display text-3xl text-ink">
            Spoilers
          </h2>
          <p className="mt-2x max-w-2xl text-sm text-muted">Hidden until you ask for it. Trophy names and story payoffs live here, not in the steps above.</p>
          <div className="mt-4x max-w-2xl">
            <Spoiler label={block.label}>
              <div className="space-y-4x text-ink-2">
                {block.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Spoiler>
          </div>
        </section>
      ))}

      <MapLinks primary={entry.map} more={entry.moreMaps} />
      {entry.alsoSee?.length ? <AlsoSee links={entry.alsoSee} /> : null}
      <Faq items={entry.faq} />
      <SourcesList sources={entry.sources} verified={{ iso: SECRETS_VERIFIED, label: SECRETS_VERIFIED_LABEL }} />
    </article>
  );
}
