import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getStore } from "@/lib/map/store";
import type { Leaderboard, LeaderboardEntry } from "@/lib/map/types";

export const metadata = { title: "Map leaderboard" };
export const dynamic = "force-dynamic";

function Board({ title, hint, rows, testId }: { title: string; hint: string; rows: LeaderboardEntry[]; testId: string }) {
  return (
    <section className="rounded-lg border border-[#2a2a2e] bg-[#161618] p-4" data-testid={testId}>
      <h2 className="text-sm uppercase tracking-widest text-[#ffd36b]">{title}</h2>
      <p className="mb-3 text-xs text-[#9a958c]">{hint}</p>
      {rows.length === 0 ? (
        <p className="text-sm text-[#9a958c]">Nobody yet. Be the first.</p>
      ) : (
        <ol className="flex flex-col">
          {rows.map((r, i) => (
            <li key={r.gamerTag} className="flex justify-between border-b border-[#2a2a2e] py-2 text-sm last:border-0">
              <span>
                <span className="mr-3 inline-block w-5 text-right text-[#6f6b64]">{i + 1}</span>
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
      <PageHeader kicker="Community map" title="Leaderboard" source="Community submissions" />
      {!store ? (
        <p className="mb-6 rounded-lg border border-[#ffd36b]/40 bg-[#ffd36b]/10 px-3 py-2 text-sm text-[#ffd36b]">
          Community submissions are offline right now.
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2">
        <Board title="Most approved submissions" hint="Every submission a moderator accepted, including confirmations of existing pins." rows={board.approved} testId="board-approved" />
        <Board title="Most “first marked”" hint="New pins that went live with this player's name on them." rows={board.firstMarked} testId="board-first" />
      </div>
      <p className="mt-6 text-sm">
        <Link href="/map" className="text-[#9a958c] hover:text-[#ff2d7b]">
          ← Back to the map
        </Link>
      </p>
    </div>
  );
}
