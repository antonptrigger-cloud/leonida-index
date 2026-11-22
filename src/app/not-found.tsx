import type { Metadata } from "next";
import Link from "next/link";
import { PageBackdrop } from "@/components/PageBackdrop";
import { FollowCta } from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative isolate mb-10x pb-16x pt-10x">
      <PageBackdrop id="beach" dim="heavy" fadeTop />
      <p className="vc-kicker mb-4x">Error 404</p>
      <h1 className="vc-heading text-[clamp(3.5rem,10vw,6.5rem)]">Wrong turn</h1>
      <p className="mt-6x max-w-md text-ink-2">
        That page isn’t on the map. It may have moved, or it never existed. Head back to something that does.
      </p>
      <div className="mt-10x flex flex-wrap items-center gap-x-10x gap-y-4x">
        <Link href="/map" className="vc-cta">
          Open the map <span aria-hidden>→</span>
        </Link>
        <Link href="/" className="vc-btn-ghost">
          Home
        </Link>
        <Link href="/guides" className="vc-btn-ghost">
          Guides
        </Link>
        <Link href="/news" className="vc-btn-ghost">
          News
        </Link>
        <Link href="/database" className="vc-btn-ghost">
          Database
        </Link>
      </div>
      <p className="mt-10x">
        <FollowCta />
      </p>
    </div>
  );
}
