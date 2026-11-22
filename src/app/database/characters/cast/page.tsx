import Link from "next/link";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { Related } from "@/components/Related";
import { CharSources, ConfirmTag } from "@/components/characters/CharacterBits";
import { SOURCES, characterPath } from "@/lib/characters/characters";
import {
  CAST_FAQ,
  CAST_PATH,
  CAST_ROWS,
  CAST_SHORT_ANSWER,
  CAST_SOURCE_IDS,
  CAST_VERIFIED_LABEL,
} from "@/lib/characters/cast";

export const metadata = metaFor(CAST_PATH);

export default function CastPage() {
  const sources = CAST_SOURCE_IDS.map((id) => SOURCES[id]);
  return (
    <article>
      <PageSchema path={CAST_PATH} breadcrumbs={false} />
      <Breadcrumbs path={CAST_PATH} />
      <PageHeader
        kicker="Database · Cast"
        title="GTA 6 Cast"
        verified={`${CAST_VERIFIED_LABEL} (after launch)`}
        source="Rockstar Games official credits, plus The Game Awards, AP, GameSpot and Polygon"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="max-w-2xl text-lg text-ink-2">
            Rockstar published official Grand Theft Auto VI credits after launch. This page records the performers for the characters we have profiles for, line by line, and says how sure we are. Each line is tagged <ConfirmTag status="confirmed" />, <ConfirmTag status="reported" /> or <ConfirmTag status="tbc" />. We do not repeat the rest of the credits list, because it includes later-story names.
          </p>

          <section aria-labelledby="short" className="mt-16x">
            <h2 id="short" className="vc-display text-3xl text-ink">The short answer</h2>
            <ul className="mt-4x flex flex-col gap-3x">
              {CAST_SHORT_ANSWER.map((l) => (
                <li key={l.text} className="vc-bar flex flex-wrap items-baseline gap-x-3x gap-y-1x text-ink-2">
                  <ConfirmTag status={l.status} />
                  <span>{l.text}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="glance" className="mt-16x">
            <h2 id="glance" className="vc-display text-3xl text-ink">Cast at a glance</h2>
            <div className="vc-card mt-4x overflow-x-auto p-4x">
              <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.18em] text-muted">
                    <th scope="col" className="pb-3x pr-4x font-semibold">Character</th>
                    <th scope="col" className="pb-3x pr-4x font-semibold">Person</th>
                    <th scope="col" className="pb-3x pr-4x font-semibold">In the game?</th>
                    <th scope="col" className="pb-3x pr-4x font-semibold">Linked to the role?</th>
                    <th scope="col" className="pb-3x font-semibold">What the evidence shows</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink/15 align-top text-ink-2">
                  {CAST_ROWS.map((r) => (
                    <tr key={r.character}>
                      <th scope="row" className="py-3x pr-4x font-semibold text-ink">
                        {r.slug ? (
                          <Link href={characterPath(r.slug)} className="text-blue hover:text-pink">{r.character}</Link>
                        ) : (
                          r.character
                        )}
                      </th>
                      <td className="py-3x pr-4x">{r.person}</td>
                      <td className="py-3x pr-4x">
                        <ConfirmTag status={r.involvement.status} />
                        <span className="mt-1x block">{r.involvement.text}</span>
                      </td>
                      <td className="py-3x pr-4x">
                        <ConfirmTag status={r.role.status} />
                        <span className="mt-1x block">{r.role.text}</span>
                      </td>
                      <td className="py-3x">{r.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="lucia" className="mt-16x">
            <h2 id="lucia" className="vc-display text-3xl text-ink">Lucia Caminos: Manni L. Perez</h2>
            <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
              <p>
                Rockstar&apos;s official credits, checked on 22 November 2026, list Manni L. Perez as Lucia Caminos. That is a first-party credit, so both her involvement and the Lucia role are <ConfirmTag status="confirmed" />. See <Link href={characterPath("lucia-caminos")} className="text-blue hover:text-pink">Lucia&apos;s profile</Link>.
              </p>
              <p>
                Before launch, The Game Awards listed Perez as a 2026 Best Performance nominee for <em>Grand Theft Auto VI</em> without naming a character. Press reports already linked that nomination to Lucia. The official credits close that gap.
              </p>
            </div>
          </section>

          <section aria-labelledby="jason" className="mt-16x">
            <h2 id="jason" className="vc-display text-3xl text-ink">Jason Duval: Dylan Rourke</h2>
            <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
              <p>
                Rockstar&apos;s official credits list Dylan Rourke as Jason Duval. Rockstar had not named Jason&apos;s performer on the People pages, so this is the first official credit we have for the role. Both the involvement and the link to Jason are <ConfirmTag status="confirmed" />. See <Link href={characterPath("jason-duval")} className="text-blue hover:text-pink">Jason&apos;s profile</Link>.
              </p>
            </div>
          </section>

          <section aria-labelledby="brian" className="mt-16x">
            <h2 id="brian" className="vc-display text-3xl text-ink">Brian Heder: Stephen Root</h2>
            <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
              <p>
                In a clip AP Entertainment posted on 13 September 2026, Stephen Root said fans would see him in the game. He did not name the character in that clip. GameSpot and Polygon both reported that the part was Brian Heder.
              </p>
              <p>
                Rockstar&apos;s official credits now list Stephen Root as Brian Heder, so the role itself is <ConfirmTag status="confirmed" />. See <Link href={characterPath("brian-heder")} className="text-blue hover:text-pink">Brian&apos;s profile</Link>.
              </p>
            </div>
          </section>

          <section aria-labelledby="credits" className="mt-16x">
            <h2 id="credits" className="vc-display text-3xl text-ink">The official credits</h2>
            <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
              <p>
                Rockstar published official credits at <a href="https://www.rockstargames.com/VI/credits" target="_blank" rel="noopener noreferrer nofollow" className="text-blue hover:text-pink">rockstargames.com/VI/credits</a> after launch on 19 November 2026. We checked that page on 22 November 2026. This page lists the characters we already profile. Performers for the contacts and side-quest characters are on those profile pages. We do not copy the rest of the credits list here, because it includes later-story names.
              </p>
            </div>
          </section>

          <section aria-labelledby="labels" className="mt-16x">
            <h2 id="labels" className="vc-display text-3xl text-ink">How we label sources</h2>
            <ul className="mt-4x flex max-w-2xl list-disc flex-col gap-2x pl-6x text-ink-2 marker:text-pink">
              <li>Rockstar&apos;s pages and a performer speaking in their own words are first-party sources.</li>
              <li>The Game Awards is an official awards site, but it is not Rockstar.</li>
              <li>Press reports are labelled Reported until a first-party source says the same thing.</li>
              <li>Fan wikis, leaks and community guesses are not used for cast claims, and we do not name rumoured actors.</li>
            </ul>
          </section>
        </div>

        <aside className="flex flex-col gap-6x lg:col-span-4">
          <div className="vc-card p-6x [border-left-color:#00d4ff]">
            <h2 className="vc-kicker">Profiles</h2>
            <ul className="mt-4x flex flex-col gap-2x text-sm">
              <li><Link href={characterPath("lucia-caminos")} className="text-blue hover:text-pink">Lucia Caminos</Link></li>
              <li><Link href={characterPath("jason-duval")} className="text-blue hover:text-pink">Jason Duval</Link></li>
              <li><Link href={characterPath("cal-hampton")} className="text-blue hover:text-pink">Cal Hampton</Link></li>
              <li><Link href={characterPath("brian-heder")} className="text-blue hover:text-pink">Brian Heder</Link></li>
              <li><Link href={characterPath("dwnply")} className="text-blue hover:text-pink">DWNPLY</Link></li>
              <li><Link href="/database/characters" className="text-blue hover:text-pink">All characters</Link></li>
            </ul>
            <p className="mt-4x text-xs text-muted">
              Last verified <time dateTime="2026-11-22">{CAST_VERIFIED_LABEL}</time>.
            </p>
          </div>
        </aside>
      </div>

      <Faq items={CAST_FAQ} />

      <CharSources sources={sources} />

      <Related path={CAST_PATH} />
    </article>
  );
}
