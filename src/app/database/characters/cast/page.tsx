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
        verified={`${CAST_VERIFIED_LABEL} (launch eve)`}
        source="Rockstar Games, The Game Awards, AP, GameSpot, Polygon"
      />

      <div className="grid gap-10x lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="max-w-2xl text-lg text-ink-2">
            Rockstar has not published a voice cast list for Grand Theft Auto VI. This page records what we can verify about who is in the game, line by line, and says how sure we are. Each line is tagged <ConfirmTag status="confirmed" />, <ConfirmTag status="reported" /> or <ConfirmTag status="tbc" />.
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
                The Game Awards publishes its 2026 Best Performance nominees on its own site. Perez appears there next to <em>Grand Theft Auto VI</em>. The category is described as honouring voice-over acting, motion capture or performance capture, so the listing shows she is credited on the game. It does not say which character she plays or whether her work is voice, capture or both.
              </p>
              <p>
                Press coverage reads the nomination as pointing to Lucia. Polygon says it all but confirms it, while VICE points out that she has not technically been confirmed in the role. Rockstar has not announced it. We therefore call her involvement <ConfirmTag status="confirmed" /> and the Lucia link <ConfirmTag status="reported" />.
              </p>
            </div>
          </section>

          <section aria-labelledby="jason" className="mt-16x">
            <h2 id="jason" className="vc-display text-3xl text-ink">Jason Duval: not confirmed</h2>
            <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
              <p>
                No source we trust names Jason&apos;s performer. Rockstar&apos;s profile describes the character and credits nobody, and no performer has claimed the role on a verified account. Guesses exist online, but a guess is not evidence, so we do not name anyone. We will update this section only when Rockstar, the end credits or the performer says it first-hand.
              </p>
            </div>
          </section>

          <section aria-labelledby="brian" className="mt-16x">
            <h2 id="brian" className="vc-display text-3xl text-ink">Brian Heder: Stephen Root</h2>
            <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
              <p>
                In a clip AP Entertainment posted on 13 September 2026, actor Stephen Root was asked about the speculation that he is in the game. He answered that fans are going to see him in it, and added that his character appeared in Rockstar&apos;s first rollout nearly a year earlier and that his recognisable voice gave the secret away. He did not say which character he plays.
              </p>
              <p>
                GameSpot and Polygon both report that the part is Brian Heder, and GameSpot notes that Root did not say so in the clip. We call his involvement <ConfirmTag status="confirmed" /> because he said it himself, and the Brian link <ConfirmTag status="reported" /> because no first-party source names the role. See <Link href={characterPath("brian-heder")} className="text-blue hover:text-pink">Brian&apos;s profile</Link>.
              </p>
            </div>
          </section>

          <section aria-labelledby="credits" className="mt-16x">
            <h2 id="credits" className="vc-display text-3xl text-ink">What about the end credits?</h2>
            <div className="mt-4x max-w-2xl space-y-4x text-lg text-ink-2">
              <p>
                Rockstar lists 19 November 2026 as the release date. We have not played the finished game, and we found no verified public transcript of its credits. Credits are the strongest source for a full cast, so we will recheck this page against them. Until then every other role stays <ConfirmTag status="tbc" />.
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
              <li><Link href={characterPath("brian-heder")} className="text-blue hover:text-pink">Brian Heder</Link></li>
              <li><Link href="/database/characters" className="text-blue hover:text-pink">All characters</Link></li>
            </ul>
            <p className="mt-4x text-xs text-muted">
              Last verified <time dateTime="2026-11-18">{CAST_VERIFIED_LABEL}</time>.
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
