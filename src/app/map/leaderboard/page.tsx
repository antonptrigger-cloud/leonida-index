import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getStore } from "@/lib/map/store";
import type { Leaderboard, LeaderboardEntry } from "@/lib/map/types";

export const metadata = metaFor("/map/leaderboard");
export const dynamic = "force-dynamic";

function Board({ title, hint, rows, testId }: { title: string; hint: string; rows: LeaderboardEntry[]; testId: string }) {
  return (
    <section className="vc-card p-4" data-testid={testId}>
      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-turq">{title}</h2>
      <p className="mb-3 text-xs text-muted">{hint}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-muted">Nobody yet. Be the first.</p>
      ) : (
        <ol className="flex flex-col">
          {rows.map((r, i) => (
            <li key={r.gamerTag} className="flex justify-between border-b border-line py-2 text-sm last:border-0">
              <span>
                <span className="mr-3 inline-block w-5 text-right text-faint">{i + 1}</span>
                {r.gamerTag}
              </span>
              <span className="font-medium">{r.count}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default async function LeaderboardPage() {
  const store = getStore();
  let board: Leaderboard = { approved: [], firstMarked: [] };
  if (store) {
    try {
      board = await store.leaderboard(25);
    } catch (err) {
      console.error("[map] leaderboard failed", err);
    }
  }
  return (
    <div>
      <PageSchema path="/map/leaderboard" breadcrumbs={false} />
      <Breadcrumbs path="/map/leaderboard" />
      <PageHeader kicker="Community map" title="Leaderboard" source="Community submissions" />
      {!store ? (
        <p className="mb-6 rounded-lg border border-orange/40 bg-orange/10 px-3 py-2 text-sm text-orange">
          Community submissions are offline right now.
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Board title="Most approved submissions" hint="Every submission a moderator accepted, including confirmations of existing pins." rows={board.approved} testId="board-approved" />
        <Board title="Most “first marked”" hint="New pins that went live with this player's name on them." rows={board.firstMarked} testId="board-first" />
      </div>
      <p className="mt-6 text-sm">
        <Link href="/map" className="text-muted hover:text-pink">
          ← Back to the map
        </Link>
      </p>
    </div>
  );
}
