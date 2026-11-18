import { metaFor } from "@/lib/seo/site";
import { cookies } from "next/headers";
import { PageHeader } from "@/components/PageHeader";
import { AdminLogin } from "@/components/map/AdminLogin";
import { AdminQueue } from "@/components/map/AdminQueue";
import { MOD_COOKIE, moderationConfigured, verifySessionToken } from "@/lib/map/auth";
import { getModerationQueue } from "@/lib/map/service";

export const metadata = metaFor("/map/admin");
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!moderationConfigured()) {
    return (
      <div>
        <PageHeader kicker="Moderation" title="Pending pins" source="Private" />
        <p className="text-muted">Moderation is not configured. Set MOD_PASSWORD and MOD_SESSION_SECRET (see docs/COMMUNITY_MAP.md).</p>
      </div>
    );
  }
  const jar = await cookies();
  if (!verifySessionToken(jar.get(MOD_COOKIE)?.value)) {
    return (
      <div>
        <PageHeader kicker="Moderation" title="Moderator sign-in" source="Private" />
        <AdminLogin />
      </div>
    );
  }
  const queue = await getModerationQueue();
  return (
    <div>
      <PageHeader kicker="Moderation" title="Pending pins" source="Private" />
      {queue ? (
        <AdminQueue initial={queue} />
      ) : (
        <p className="text-muted">The database isn&apos;t configured, so there&apos;s nothing to moderate yet.</p>
      )}
    </div>
  );
}
