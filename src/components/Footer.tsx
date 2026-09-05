import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#2a2a2e] py-8 text-xs text-[#9a958c]">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 sm:flex-row sm:justify-between">
        <p>
          Fan site. Not affiliated with Rockstar Games or Take-Two Interactive.
          Grand Theft Auto is a trademark of Take-Two.
        </p>
        <p className="flex gap-3">
          <Link href="/sources">Sources</Link>
          <Link href="/about">About</Link>
        </p>
      </div>
    </footer>
  );
}
